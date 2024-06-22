import os

import requests
import pandas as pd
from sqlalchemy.orm import Session
from app.api_auth import gen_user, gen_passwd
from app.models import Estacion, Ramal, EstacionesRamales
from app.database import create_metadata, engine


def login(config):
    """
    login contra la api de trenes
    """
    headers = {
        "Content-type": "application/json",
    }

    data = {"username": config["username"], "password": config["password"]}

    response = requests.post(
        f"{config['url']}/v1/auth/authorize", headers=headers, json=data
    )

    return response.json()["token"]


def search_stations(url, letter, token):
    """
    busco estaciones por letra así tengo `todos` los resultados en teoría
    """
    headers = {
        "authorization": token,
        "Content-type": "application/json",
    }

    params = {
        "nombre": letter,
    }

    response = requests.get(
        f"{url}/v1/infraestructura/estaciones", params=params, headers=headers
    )
    return response.json()


def get_stations(token):
    """
    genero listado entero de estaciones y de ramales en los que está cada estación
    """
    stations = []
    vowels = ["a", "e", "i", "o", "u"]
    for vowel in vowels:
        sa = search_stations(config["url"], vowel, token)
        stations = stations + sa
    stations = pd.DataFrame(stations)
    num_cols = [
        "id_estacion",
        "id_tramo",
        "orden",
        "id_referencia",
        "referencia_orden",
        "radio",
        "andenes_habilitados",
    ]
    for col in num_cols:
        stations[col] = pd.to_numeric(stations[col])
    stations = stations.sort_values(by="id_estacion").drop_duplicates(
        subset="id_estacion"
    )

    incluida_en_ramales = (
        stations[["id_estacion", "incluida_en_ramales"]]
        .explode("incluida_en_ramales")
        .rename(columns={"incluida_en_ramales": "id_ramal"})
    )

    incluida_en_ramales["id_ramal"] = incluida_en_ramales["id_ramal"].astype("int64")

    operativa_en_ramales = (
        stations[["id_estacion", "operativa_en_ramales"]]
        .explode("operativa_en_ramales")
        .rename(columns={"operativa_en_ramales": "id_ramal"})
    )

    operativa_en_ramales["id_ramal"] = operativa_en_ramales["id_ramal"].astype("int64")

    stations = stations.drop(
        columns=["operativa_en_ramales", "incluida_en_ramales", "visibilidad"]
    )
    stations = stations.rename(columns={"id_estacion": "id"})
    return stations, incluida_en_ramales, operativa_en_ramales


def get_ramales(token):
    """
    genero listado entero de ramales
    """
    headers = {
        "authorization": token,
        "Content-type": "application/json",
    }

    response = requests.get(
        f"{config['url']}/v1/infraestructura/ramales", headers=headers
    )

    ramales = pd.DataFrame(response.json())
    ramales["cabecera_inicial"] = ramales.cabecera_inicial.apply(lambda x: x["id"])
    ramales["cabecera_final"] = ramales.cabecera_final.apply(lambda x: x["id"])
    ramales = ramales.drop(columns="alerta")
    num_cols = [
        "id",
        "id_estacion_inicial",
        "id_estacion_final",
        "id_gerencia",
        "estaciones",
        "operativo",
        "es_electrico",
        "tipo_id",
        "puntualidad_tolerancia",
        "publico",
        "cabecera_inicial",
        "cabecera_final",
    ]
    for col in num_cols:
        ramales[col] = pd.to_numeric(ramales[col])

    return ramales

def estacion_ramales(ramales, operativa_en_ramales, token):
    headers = {
        "authorization": token,
        "Content-type": "application/json",
    }
    
    operativa_en_ramales["orden"] = None
    for idx, ramal in ramales.iterrows():
        response = requests.get(
            f"{config['url']}/v1/arribos/estacion/{ramal['id_estacion_inicial']}?hasta={ramal['id_estacion_final']}",
            headers=headers,
        )
        try:
            for i, idE in enumerate(
                response.json()["results"][0]["servicio"]["estaciones"]
            ):
                operativa_en_ramales.loc[
                    (operativa_en_ramales.id_ramal == ramal["id"])
                    & (operativa_en_ramales.id_estacion == idE["idElemento"]),
                    "orden",
                ] = (
                    i + 1
                )
        except Exception as e:
            pass
    return operativa_en_ramales
if __name__ == "__main__":

    user = gen_user()
    passwd = gen_passwd(user)

    config = {
        "url": os.getenv("API_URL"),
        "username": user,
        "password": passwd,
    }

    token = login(config)

    ramales = get_ramales(token)

    stations, incluida_en_ramales, operativa_en_ramales = get_stations(token)

    operativa_en_ramales = estacion_ramales(ramales, operativa_en_ramales, token)
    
    create_metadata()

    with Session(engine) as session:
        session.bulk_insert_mappings(Estacion, stations.to_dict("records"))

        session.bulk_insert_mappings(Ramal, ramales.to_dict("records"))

        session.bulk_insert_mappings(
            EstacionesRamales, operativa_en_ramales.to_dict("records")
        )

        session.commit()
