from sqlmodel import SQLModel, Field
from typing import Optional


class Ramal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    id_estacion_inicial: int
    id_estacion_final: int
    id_gerencia: int
    nombre: str
    estaciones: int
    operativo: int
    es_electrico: int
    tipo_id: int
    puntualidad_tolerancia: int
    siglas: Optional[str] = None
    publico: bool
    cabecera_inicial: int
    cabecera_final: int


class Estacion(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    id_tramo: int
    orden: int
    id_referencia: int
    latitud: str
    longitud: str
    referencia_orden: int
    andenes_habilitados: int


class EstacionesRamales(SQLModel, table=True):
    id_estacion: int | None = Field(
        default=None, foreign_key="estacion.id", primary_key=True
    )
    id_ramal: int | None = Field(default=None, foreign_key="ramal.id", primary_key=True)
    orden: Optional[int] = None

    def __getitem__(self, field):
        return self.__dict__[field]
