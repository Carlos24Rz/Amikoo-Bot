# uvicorn main:app --reload
# http://127.0.0.1:8000
# FASTAPI
# Core
from fastapi import FastAPI
from fastapi import Request, status
from fastapi import Query, Path, Body
from fastapi import HTTPException

# Others
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse
from fastapi.responses import JSONResponse

# ORM MODELS
from database import database as connection
from database import Pregunta
from database import Persona
from database import Calificacion

# SCHEMAS
from schemas import PreguntaIn
from schemas import PreguntaUpdate
from schemas import PreguntaPadre
from schemas import PersonaIn
from schemas import PersonaOut
from schemas import PersonaUpdate
from schemas import Calificacion as CalificacionIn

# EXTRAS
from playhouse.shortcuts import model_to_dict
from datetime import datetime
from datetime import date
from typing import Optional
import json


app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:3000/fetch/",
    "http://127.0.0.1:3000/"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=["*"],
    # allow_methods=['GET', 'POST'],
    allow_headers=["*"],
    allow_credentials=True,
)

def getDateTime():
    return datetime.today().strftime('%Y-%m-%d %H:%M:%S')

def getDate():
    return datetime.today().strftime('%Y-%m-%d')

def create_tables():
    with connection:
        connection.create_tables([Pregunta, Persona, Calificacion])


# EVENTS
@app.on_event('startup')
async def startup():
    global startupTime
    startupTime = datetime.today().strftime("%d/%m/%Y %H:%M:%S")
    if connection.is_closed():
        connection.connect()
    create_tables()

@app.on_event('shutdown')
async def shutdown():
    shutdownTime = datetime.today().strftime("%d/%m/%Y %H:%M:%S")
    # with open("log.txt", mode="a") as log:
    #     log.write("Application shutdown: " + startupTime + " - " + shutdownTime + "\n")
    if not connection.is_closed():
        connection.close()

# Error Handling
# @app.exception_handler(RequestValidationError)
# async def validation_exception_handler(request: Request, exc: RequestValidationError):
#     return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Couldnt perform action")


# PREGUNTAS
# TODO: Response model
@app.get("/pregunta/text", status_code = status.HTTP_200_OK)
async def show_texto(
    nombre: Optional[str] = Query(
        None,
        title = "Nombre de la pregunta",
        description = "Nombre de la pregunta de la cual obtener su texto",
        min_length = 1,
        max_length = 80,
        example = "Inicio"
    ),
    child: Optional[str] = Query(
        None,
        title = "Nombre del hijo",
        description = "Nombre del hijo del cual obtener el texto de su padre",
        min_length = 1,
        max_length = 80,
        example = "Nosotros"
    )
):
    if (nombre):
        query = (Pregunta.select(Pregunta.texto)
                .where(Pregunta.nombre == nombre)
                )
    elif (child):
        query_parent_id = (Pregunta.select(Pregunta.padre_id)
                            .where(Pregunta.nombre == child))

        query = (Pregunta.select()
                .where(Pregunta.id == query_parent_id)
                )
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="No se pasó ningun parámetro")
    if query.exists():
        result = [model_to_dict(item) for item in query]
        return result
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Pregunta invalida")


# JSONRESPONSE all methods
# @app.get("/pregunta/show", response_model=PreguntaIn, status_code = status.HTTP_200_OK)
@app.get("/pregunta/show", status_code = status.HTTP_200_OK)
async def get_pregunta(
    id: Optional[int] = Query(
        None,
        title="Id de la pregunta",
        description="Id de la pregunta de la cual obtener sus datos",
        ge = 1,
        example = 2
    ),
    nombre: Optional[str] = Query(
        None,
        title="Nombre de la pregunta",
        description="Nombre de la pregunta de la cual obtener sus datos",
        min_length = 1,
        max_length = 80,
        example = "Inicio"
    ),
    parent: Optional[str] = Query(
        None,
        title="Nombre del padre",
        description="Nombre del padre del cual obtener sus hijos",
        min_length = 1,
        max_length = 80,
        example = "Inicio"
    ),
    child: Optional[str] = Query(
        None,
        title="Nombre del hijo",
        description="Nombre del hijo del cual obtener su padre",
        min_length = 1,
        max_length = 80,
        example = "Nosotros"
    )
):
    Parent = Pregunta.alias()
    if (id):
        query = (Pregunta.select()
                .where(Pregunta.id == id)
                )
    elif (nombre):
        query = (Pregunta.select()
                .where(Pregunta.nombre == nombre)
                )
    elif (parent):
        query = (Pregunta.select()
                .join_from(Pregunta, Parent,
                on=(Pregunta.padre_id == Parent.id))
                .where(Parent.nombre == parent)
                )
    elif (child):
        query_parent_id = (Pregunta.select(Pregunta.padre_id)
                            .where(Pregunta.nombre == child)
                            )

        query = (Pregunta.select()
                .where(Pregunta.padre_id == query_parent_id)
                )
    else:
        query = Pregunta.select()

    result = [model_to_dict(item) for item in query]
    return result


@app.get("/pregunta/{id}/details")
async def get_details():
    return "hola"


# Validar si nombre existe
@app.put("/pregunta/{nombre}/visit", status_code = status.HTTP_200_OK)
async def visit_pregunta(
    nombre: str = Path(
        ...,
        title="Nombre de la pregunta",
        description="Nombre de la pregunta a la cual agregarle una visita",
        min_length = 1,
        max_length = 80,
        example = "Inicio"
    )
):
    query = (Pregunta
            .update({Pregunta.visitas: Pregunta.visitas + 1})
            .where(Pregunta.nombre == nombre))
    query.execute()
    return "Actualizado"

# Example of body request?
@app.post("/pregunta/create", status_code = status.HTTP_201_CREATED)
async def create_pregunta(pregunta: PreguntaIn):
    query = Pregunta.get_or_none(Pregunta.nombre == pregunta.padre)
    if (query != None):
        nameTaken = Pregunta.get_or_none(Pregunta.nombre == pregunta.nombre)
        if nameTaken:
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Nombre ya existe")
        else:
            count = Pregunta.select().where(Pregunta.padre_id == query.id).count()
            if (count == 0):
                with connection.atomic() as transaction:
                    try:
                        newPregunta = Pregunta.create(
                            padre_id = query,
                            nombre = pregunta.nombre,
                            emoji = pregunta.emoji,
                            texto = pregunta.texto,
                            visitas = 0,
                            is_final = True
                        )
                        update = (Pregunta
                                 .update({Pregunta.is_final: False})
                                 .where(Pregunta.id == query))
                        update.execute()
                        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Pregunta creada y actualizada")
                    except:
                        transaction.rollback()
                        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Failure")

            else:
                newPregunta = Pregunta.create(
                    padre_id = query,
                    nombre = pregunta.nombre,
                    emoji = pregunta.emoji,
                    texto = pregunta.texto,
                    visitas = 0,
                    is_final = True
                )
                return "Pregunta creada"
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Padre no existe")


# Validar si id existe
@app.put("/pregunta/update/{id}", status_code = status.HTTP_200_OK)
async def update_pregunta(
    id: int = Path(
        ...,
        title="Id de la pregunta",
        description="Id de la pregunta de la cual modificar sus datos",
        ge = 1
    ),
    preguntaUpdate: PreguntaUpdate = Body(
        ...,
        title="Body Request",
        description="Datos a modificar"
    )
):
    if (preguntaUpdate.nombre):
        query = (Pregunta
                 .update({Pregunta.nombre: preguntaUpdate.nombre})
                 .where(Pregunta.id == id))
        query.execute()
    if (preguntaUpdate.emoji):
        query = (Pregunta
                .update({Pregunta.emoji: preguntaUpdate.emoji})
                .where(Pregunta.id == id))
        query.execute()
    if (preguntaUpdate.texto):
        query = (Pregunta
                .update({Pregunta.texto: preguntaUpdate.texto})
                .where(Pregunta.id == id))
        query.execute()
    return "Actualizada"


# TODO: TestCase: Mover el padre de una pregunta a uno de sus hijos
@app.put("/pregunta/move/{id}", status_code = status.HTTP_200_OK)
async def move_pregunta(
    id: int = Path(
        ...,
        title="Id de la pregunta",
        description="Id de la pregunta a mover",
        ge = 1
    ),
    new_padre: PreguntaPadre = Body(
        ...,
        title="Body Request",
        description="Nombre del nuevo padre"
    )
):
    new_padre = Pregunta.get_or_none(Pregunta.nombre == new_padre.padre)
    if (new_padre != None):
        pregunta = Pregunta.get_or_none(Pregunta.id == id)
        old_padre = Pregunta.get_or_none(Pregunta.id == pregunta.padre_id)
        old_count = (Pregunta.select()
                        .where(Pregunta.padre_id == pregunta.padre_id)
                        .count()
                        )
        new_count = (Pregunta.select()
                        .where(Pregunta.padre_id == new_padre)
                        .count()
                        )
        if (old_count == 1 and new_count == 0):
            # Move and update both
            with connection.atomic() as transaction:
                try:
                    move = (Pregunta
                             .update({Pregunta.padre_id: new_padre})
                             .where(Pregunta.id == id))
                    old_update = (Pregunta
                             .update({Pregunta.is_final: True})
                             .where(Pregunta.id == id))
                    new_update = (Pregunta
                             .update({Pregunta.is_final: False})
                             .where(Pregunta.id == id))
                    move.execute()
                    old_update.execute()
                    new_update.execute()
                    return "Movida y actualizado ambos padres"
                except:
                    transaction.rollback()
                    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Ha ocurrido un error")
        elif (old_count == 1):
            # Move and update old
            with connection.atomic() as transaction:
                try:
                    move = (Pregunta
                             .update({Pregunta.padre_id: new_padre})
                             .where(Pregunta.id == id))
                    old_update = (Pregunta
                             .update({Pregunta.is_final: True})
                             .where(Pregunta.id == id))
                    move.execute()
                    old_update.execute()
                    return "Movida y actualizado el padre anterior"
                except:
                    transaction.rollback()
                    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Ha ocurrido un error")
        elif (new_count == 0):
            # Move and update new
            with connection.atomic() as transaction:
                try:
                    move = (Pregunta
                             .update({Pregunta.padre_id: new_padre})
                             .where(Pregunta.id == id))
                    new_update = (Pregunta
                             .update({Pregunta.is_final: False})
                             .where(Pregunta.id == id))
                    move.execute()
                    new_update.execute()
                    return "Movida y actualizado el nuevo padre"
                except:
                    transaction.rollback()
                    return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Ha ocurrido un error")
        else:
            query = (Pregunta
                     .update({Pregunta.padre_id: new_padre})
                     .where(Pregunta.id == id))
            query.execute()
            return "Movida"
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Padre no existe")


@app.delete("/pregunta/{id}/delete", status_code = status.HTTP_200_OK)
async def delete_pregunta(
    id: int = Path(
        ...,
        title="Id de la pregunta",
        description="Id de la pregunta a eliminar",
        ge = 1
    ),
):
    preguntaExists = Pregunta.get_or_none(Pregunta.id == id)
    if (preguntaExists):
        preguntaChild = Pregunta.get_or_none(Pregunta.padre_id == id)
        if (preguntaChild == None):
            pregunta = Pregunta.get_or_none(Pregunta.id == id)
            parent_count = Pregunta.select().where(Pregunta.padre_id == pregunta.padre_id).count()

            if (parent_count == 1):
                with connection.atomic() as transaction:
                    try:
                        delete = (Pregunta.delete()
                                 .where(Pregunta.id == id))
                        update_parent = (Pregunta
                                 .update({Pregunta.is_final: False})
                                 .where(Pregunta.id == pregunta.padre_id))
                        delete.execute()
                        update_parent.execute()
                        return "Eliminada y actualizado"
                    except:
                        transaction.rollback()
                        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Ha ocurrido un error")
            else:
                delete = (Pregunta.delete()
                .where(Pregunta.id == id))
                delete.execute()
                return 'Deleted'
        else:
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="No se puede eliminar una pregunta que tenga hijos")
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="La pregunta no existe")






# PERSONAS
# TODO: Feature: Buscar por fecha
# TODO: Response model of personaIn
@app.get("/persona/show", status_code = status.HTTP_200_OK)
async def get_persona(
    name: Optional[str] = Query(
        None,
        title = "Nombre de la persona",
        description = "Nombre exacto de la persona",
        min_length = 1,
        max_length = 60,
        regex = "^[A-Za-z][A-Za-z ]+$"
    ),
    correo: Optional[str] = Query(
        None,
        title = "Correo de la persona",
        description = "Nombre exacto del correo de la persona",
        min_length = 1,
        max_length = 50,
        regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    )
):
    if (name and correo):
        query = (Persona.select()
                .where(Persona.nombre == name and Persona.correo == correo))
    elif (name):
        query = (Persona.select()
                .where(Persona.nombre == name))
    elif (correo):
        query = (Persona.select()
                .where(Persona.correo == correo))
    else:
        query = (Persona.select())
    result = [model_to_dict(item) for item in query]
    return result

@app.post("/persona/create", response_model = PersonaOut, status_code = status.HTTP_201_CREATED)
def create_persona(
    persona: PersonaIn = Body(
        ...,
        title="Body Request",
        description="Datos de la persona"
    )
):
    newPerson = Persona.create(
        nombre=persona.nombre,
        correo=persona.correo,
        descripcion=persona.descripcion
    )
    return persona


@app.put("/persona/update/{id}", status_code = status.HTTP_200_OK)
async def update_persona(
    id: int = Path(
        ...,
        title="Id de la persona",
        description="Id de la persona de la cual modificar sus datos",
        ge = 1
    ),
    personaUpdate: PersonaUpdate = Body(
        ...,
        title="Body Request",
        description="Datos a modificar"
    )
):
    if (personaUpdate.nombre):
        query = (Persona
                 .update({Persona.nombre: personaUpdate.nombre})
                 .where(Persona.id == id))
        query.execute()
    if (personaUpdate.correo):
        query = (Persona
                .update({Persona.correo: personaUpdate.correo})
                .where(Persona.id == id))
        query.execute()
    if (personaUpdate.descripcion):
        query = (Persona
                .update({Persona.descripcion: personaUpdate.descripcion})
                .where(Persona.id == id))
        query.execute()
    return "Actualizado"


@app.delete("/persona/delete/{id}", response_model = PersonaOut, status_code = status.HTTP_200_OK)
async def delete_persona(
    id: int = Path(
        ...,
        title="Id de la persona",
        description="Id de la persona a eliminar",
        ge = 1
    ),
):
    personaExists = Persona.get_or_none(Persona.id == id)
    if (personaExists != None):
        query = (Persona.delete()
                .where(Persona.id == id))
        query.execute()
        return personaExists.__data__
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Persona no existe")



# CALIFICACIONES
@app.get("/calificacion/show", status_code = status.HTTP_200_OK)
async def get_calificacion(
    dateBegin: Optional[date] = Query(
        None,
        title = "Fecha inferior",
        description = "Fecha inicial",
        example = getDate()
    ),
    dateEnd: Optional[date] = Query(
        None,
        title = "Fecha superior",
        description = "Fecha final",
        example = getDate()
    )
):
    if (dateBegin and dateEnd):
        if (dateBegin > dateEnd):
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="Fechas inválidas")
        else:
            query = (Calificacion.select().where(Calificacion.fecha.between(dateBegin, dateEnd)))
    elif (dateBegin):
        query = (Calificacion.select()
        .where(Calificacion.fecha >= dateBegin))
    elif (dateEnd):
        query = (Calificacion.select()
        .where(Calificacion.fecha <= dateEnd))
    else:
        query = Calificacion.select()

    result = [model_to_dict(item) for item in query]
    return result


@app.post("/calificacion/create", status_code = status.HTTP_201_CREATED)
async def calificar_chatbot(userCal: CalificacionIn = Body(
        ...,
        title="Body Request",
        description="Datos de la calificacion"
    )
):
    newCal = Calificacion.create(
        calificacion = userCal.calificacion,
        fecha = getDateTime()
    )
    return "Gracias por calificarnos"


@app.delete("/calificacion/delete/{id}", status_code = status.HTTP_200_OK)
async def delete_calificacion(
    id: int = Path
):
    preguntaExists = Pregunta.get_or_none(Pregunta.id == id)
    if (preguntaExists):
        query = (Calificacion.delete()
                .where(Calificacion.id == id))
        query.execute()
        return "Calificacion eliminada"
    else:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content="La calificacion no existe")



# @app.exception_handler(RequestValidationError)
# return PlainTextResponse(str(exc), status_code=400)
# return JSONResponse(
#     status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
#     content=jsonable_encoder({
#             # 'code': "status_code=400"
#             "detail": exc.errors(),
#             "body": exc.body,
# #             "your_additional_errors": {"Will be": "Inside", "This":" Error message"}
#              }),
# )

# app.add_exception_handler(PersonaException, persona_exception_handler)
