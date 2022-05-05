from pydantic import BaseModel, Field
from pydantic import ValidationError, validator
from typing import Optional


# Path Operation Schemas
class PreguntaIn(BaseModel):
    padre: str = Field(
        ...,
        min_length = 1,
        max_length = 80,
        regex = "^[A-Za-z][A-Za-z0-9\,\. ]+$"
    )
    nombre: str = Field(
        ...,
        min_length = 1,
        max_length = 80,
        regex = "^[A-Za-z][A-Za-z0-9\,\. ]+$"
    )
    emoji: str = Field(
        ...,
        min_length = 1,
        max_length = 3
    )
    texto: str = Field(
        ...,
        min_length = 1,
        max_length = 800
    )

class PreguntaUpdate(BaseModel):
    nombre: Optional[str] = Field(
        None,
        min_length = 1,
        max_length = 80,
        regex = "^[A-Za-z][A-Za-z0-9\,\. ]+$"
    )
    emoji: Optional[str] = Field(
        None,
        min_length = 1,
        max_length = 3
    )
    texto: Optional[str] = Field(
        None,
        min_length = 1,
        max_length = 800
    )

class PreguntaPadre(BaseModel):
    padre: str = Field(
        ...,
    )




class Persona(BaseModel):
    nombre: str = Field(
        ...,
        min_length = 1,
        max_length = 60,
        regex = "^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF][a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ]+$"
    )

class PersonaIn(Persona):
    correo: str = Field(
        ...,
        min_length = 1,
        max_length = 50,
        regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    )
    descripcion: str = Field(
        ...,
        min_length = 1,
        max_length = 600
    )

class PersonaOut(Persona):
    pass

class PersonaUpdate(BaseModel):
    nombre: Optional[str] = Field(
        None,
        min_length = 1,
        max_length = 60,
        regex = "^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF][a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ]+$"
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
        max_length = 600
    )



class Calificacion(BaseModel):
    calificacion: int = Field(
        ...,
        ge = 1,
        le = 5
    )
