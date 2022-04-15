from pydantic import BaseModel, Field

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
        regex = "^[A-Za-z][A-Za-z0-9 ]+$"
    )

class PersonaIn(Persona):
    correo: str = Field(
        ...,
        min_length = 1,
        max_length = 50,
    )
    descripcion: str = Field(
        min_length = 1,
        max_length = 255
    )

class PersonaOut(Persona):
    pass


class CalificacionIn(BaseModel):
    calificacion: int = Field(
        ...,
        ge = 0,
        le = 5
    )
