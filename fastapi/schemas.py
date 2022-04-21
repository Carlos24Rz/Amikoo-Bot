from pydantic import BaseModel, Field
from pydantic import ValidationError, validator
from typing import Optional


# Path Operation Schemas
class CategoriaIn(BaseModel):
    nombre: str = Field(
        ...,
        min_length = 1,
        max_length = 20
    )
    texto: str = Field(
        ...,
        min_length = 1,
        max_length = 500
    )

class PreguntaIn(BaseModel):
    categoria: str = Field(
        ...,
        min_length = 1,
        max_length = 20
    )
    nombre: str = Field(
        ...,
        min_length = 1,
        max_length = 30,
        regex = "^[A-Za-z][A-Za-z0-9,. ]+$"
    )
    emoji: str = Field(
        ...,
        min_length = 1,
        max_length = 3
    )



class Persona(BaseModel):
    nombre: str = Field(
        ...,
        min_length = 1,
        max_length = 50,
        regex = "^[A-Za-z][A-Za-z ]+$"
    )

class PersonaIn(Persona):
    correo: str = Field(
        ...,
        min_length = 1,
        max_length = 50,
        regex = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    )
    descripcion: str = Field(
        min_length = 1,
        max_length = 255
    )

class PersonaOut(Persona):
    pass

class PersonaUpdate(Persona):
    nombre: Optional[str] = Field(
        None,
        min_length = 1,
        max_length = 50,
        regex = "^[A-Za-z][A-Za-z ]+$"
    )
    correo: Optional[str] = Field(
        None,
        min_length = 1,
        max_length = 50,
        regex = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
    )
    descripcion: Optional[str] = Field(
        None,
        min_length = 1,
        max_length = 255
    )



class CalificacionIn(BaseModel):
    calificacion: int = Field(
        ...,
        ge = 0,
        le = 5
    )
