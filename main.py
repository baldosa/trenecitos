import os
from fastapi import FastAPI, Depends, HTTPException, Request
from sqlmodel import Session, select
from contextlib import asynccontextmanager
from typing import Union

from app.models import Estacion, Ramal, EstacionesRamales
from fastapi.middleware.cors import CORSMiddleware
import app.database as database
from fastapi.staticfiles import StaticFiles

from app.api_auth import gen_user, gen_passwd

from pydantic import BaseModel, field_validator
import requests



def login_api():
    user = gen_user()
    passwd = gen_passwd(user)
    config = {
        "url": os.getenv('API_URL'),
        "username": user,
        "password": passwd,
    }
    headers = {
        "Content-type": "application/json",
    }

    data = {"username": config["username"], "password": config["password"]}

    response = requests.post(
        f"{config['url']}/v1/auth/authorize", headers=headers, json=data
    )

    return response.json()["token"]


data = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    data["token"] = login_api()
    yield


app = FastAPI(
    title="ChimichangApp",
    description="asdasdasds",
    summary="Deadpool's favorite app. Nuff said.",
    version="0.0.1",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Deadpoolio the Amazing",
        "url": "http://x-force.example.com/contact/",
        "email": "dp@x-force.example.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    docs_url="/api/docs",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/ping")
async def pong():
    return {"message": data["token"]}


@app.get("/api/lineas")
async def lineas():
    headers = {
        "authorization": data["token"],
        "Content-type": "application/json",
    }
    response = requests.get(
        f"{os.getenv('API_URL')}/v1/infraestructura/gerencias",
        headers=headers,
    )
    if response.status_code == 403:
        return "reauth pls"
    elif response.status_code == 200:
        return response.json()


@app.get("/api/lineas/{linea_id}/ramales")
async def lineas_id(linea_id):
    # return 'memes'
    headers = {
        "authorization": data["token"],
        "Content-type": "application/json",
    }
    response = requests.get(
        f"{os.getenv('API_URL')}/v1/infraestructura/ramales/?idGerencia={linea_id}",
        headers=headers,
    )
    if response.status_code == 403:
        return "reauth pls"
    elif response.status_code == 200:
        return response.json()


@app.get("/api/ramales")
async def ramales(db: Session = Depends(database.get_session)):
    with db as session:
        ramales = session.exec(select(Ramal)).all()
        return ramales


@app.get("/api/ramales/{ramal_id}")
async def ramales_id(ramal_id, db: Session = Depends(database.get_session)):
    with db as session:
        ramales = session.exec(select(Ramal).where(Ramal.id == ramal_id)).all()
        return ramales


@app.get("/api/ramales/{ramal_id}/estaciones")
async def ramales_estaciones(ramal_id, db: Session = Depends(database.get_session)):
    with db as session:

        estaciones_ramal = session.exec(
            select(EstacionesRamales).where(EstacionesRamales.id_ramal == ramal_id)
        ).all()
        estaciones_ramal = [x["id_estacion"] for x in estaciones_ramal]
        print(type(estaciones_ramal))
        estaciones_ramal = session.exec(
            select(Estacion).where(Estacion.id.in_(estaciones_ramal))
        ).all()

        return estaciones_ramal


@app.get("/api/ramales-status")
async def ramales_status():
    # return 'memes'
    headers = {
        "authorization": data["token"],
        "Content-type": "application/json",
    }
    response = requests.get(
        f"{os.getenv('API_URL')}/v1/infraestructura/ramales",
        headers=headers,
    )
    if response.status_code == 403:
        return "reauth pls"
    elif response.status_code == 200:
        return response.json()


@app.get("/api/ramales-status/{linea_id}")
async def ramales_status_by_id(linea_id):
    # return 'memes'
    headers = {
        "authorization": data["token"],
        "Content-type": "application/json",
    }
    response = requests.get(
        f"{os.getenv('API_URL')}/v1/infraestructura/ramales/?idGerencia={linea_id}",
        headers=headers,
    )
    if response.status_code == 403:
        return "reauth pls"
    elif response.status_code == 200:
        # return [d for d in response.json() if d["id_gerencia"] == int(linea_id)]
        return response.json()


@app.get("/api/estaciones")
async def estaciones(
    nombre: Union[str, None] = None,
    ramal_id: Union[int, None] = None,
    db: Session = Depends(database.get_session),
):
    with db as session:
        nombre = nombre.lower() if nombre else ""
        if ramal_id:
            estciones_ramal = session.exec(
                select(EstacionesRamales).where(EstacionesRamales.id_ramal == ramal_id)
            ).all()

            estaciones_ramal = (
                [x["id_estacion"] for x in estaciones_ramal]
                if len(estaciones_ramal) > 0
                else []
            )
        else:
            estaciones_ramal = []
        estaciones = session.exec(
            select(Estacion).where(Estacion.nombre.contains(nombre.lower()))
            # .where(
            #     Estacion.id.in_(estaciones_ramal)
            # )
        ).all()
        return estaciones


@app.get("/api/estaciones/{estacion_id}")
async def estaciones_id(estacion_id, db: Session = Depends(database.get_session)):
    with db as session:
        ramales = session.exec(select(Estacion).where(Estacion.id == estacion_id)).all()
        return ramales


@app.get("/api/trenes")
async def trenes(desde: int = 0, hasta: int = 0):
    if desde == 0 or hasta == 0:
        return "Falta desde o hasta"
    else:
        headers = {
            "authorization": data["token"],
            "Content-type": "application/json",
        }

        response = requests.get(
            f"{os.getenv('API_URL')}/v1/arribos/estacion/{desde}?hasta={hasta}",
            headers=headers,
        )
        if response.status_code == 403:
            return "reauth pls"
        elif response.status_code == 200:
            response = response.json()
            trenes = []
            for r in response["results"]:

                estaciones = []
                for e in r["servicio"]["estaciones"]:
                    if e["parada"]:
                        estaciones.append(
                            {
                                "id_estacion": e["idElemento"],
                                "estacion": e["nombre"],
                                "mark": (
                                    True
                                    if e["idElemento"] == r["arribo"]["idElemento"]
                                    else False
                                ),
                                "llegada": (
                                    e["llegada"]["real"]
                                    if "real" in e["llegada"].keys()
                                    else e["salida"]["programada"]
                                ),
                            }
                        )

                rr = {
                    "arribo": {
                        "id_estacion": r["arribo"]["idElemento"],
                        "estacion": r["arribo"].get("nombre", "-"),
                        "nro_anden": (
                            r["arribo"]["anden"]["nombre"]
                            if "anden" in r["arribo"].keys()
                            else "-"
                        ),
                        # "llegada_estacion": r["arribo"]["llegada"].get(
                        #     "real", e["programada"]
                        # ),
                        "llegada_estacion": (
                            r["llegada"]["real"]
                            if "real" in r["arribo"]["llegada"].keys()
                            else r["arribo"]["llegada"]["programada"]
                            if "programada" in r["arribo"]["llegada"].keys()
                            else None
                        ),
                        "salida_estacion": r["arribo"]["salida"]["programada"],
                    },
                    "servicio": {
                        "id_servicio": r["servicio"]["id"],
                        "ramal": r["servicio"]["ramal"]["nombre"],
                        "cancelacion": r["servicio"]["cancelacion"],
                        "location": r["servicio"]["location"],
                    },
                    "estaciones": estaciones,
                }
                trenes.append(rr)
            results = {"total": response["total"], "trenes": trenes}
            return results


app.mount("/", StaticFiles(directory="web", html=True), name="frontend")
