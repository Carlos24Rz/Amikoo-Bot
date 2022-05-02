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

# TODO: Checar selects de cada path
# TODO: Select count before delete, is it correct?
# TODO: Function to check if ID exists in a table

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
@app.get("/pregunta/text", status_code = status.HTTP_200_OK)
async def show_texto(
    nombre: Optional[str] = Query(
        None,
        title = "Name of pregunta",
        description = "Name of pregunta from which to get it's text",
        min_length = 1,
        max_length = 80,
        example = "Inicio"
    ),
    child: Optional[str] = Query(
        None,
        title = "Name of child",
        description = "Name of child from which to get it's parent's text",
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
        return "No se pasó ningun parámetro"
    if query.exists():
        result = [model_to_dict(item) for item in query]
        return result
    else:
        return "Pregunta invalida"


@app.get("/pregunta/show", status_code = status.HTTP_200_OK)
async def get_pregunta(
    id: Optional[str] = Query(
        None,
        min_length = 1,
        max_length = 80,
        example = "2"
    ),
    nombre: Optional[str] = Query(
        None,
        min_length = 1,
        max_length = 80,
        example = "Inicio"
    ),
    parent: Optional[str] = Query(
        None,
        min_length = 1,
        max_length = 80,
        example = "Inicio"
    ),
    child: Optional[str] = Query(
        None,
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


# @app.get("/pregunta/{id}/details"):
# async def get_details():


@app.put("/pregunta/{nombre}/visit", status_code = status.HTTP_200_OK)
async def visit_pregunta(
    nombre: str = Path(
        ...,
        min_length = 1,
        max_length = 80,
        example = "Inicio"
    )
):
    query = (Pregunta
            .update({Pregunta.visitas: Pregunta.visitas + 1})
            .where(Pregunta.nombre == nombre))
    query.execute()
    return "Updated"


# TODO: Id fetching works, but should be improved
# TODO: Check if parent is_final is true to make it false
@app.post("/pregunta/create")
async def create_pregunta(pregunta: PreguntaIn):
    query = Pregunta.get_or_none(Pregunta.nombre == pregunta.padre)
    if (query != None):
        nameTaken = Pregunta.get_or_none(Pregunta.nombre == pregunta.nombre)
        if nameTaken:
            return "Nombre ya existe"
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
                        return 'Pregunta creada and updated'
                    except:
                        transaction.rollback()
                        return 'Failure'

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
        return "Padre no existe"


@app.put("/pregunta/update/{id}")
async def update_pregunta(
    id: int,
    preguntaUpdate: PreguntaUpdate
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
    return "Updated"

@app.put("/pregunta/move/{id}")
async def move_pregunta(
    id: int,
    new_padre: PreguntaPadre
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
        # print(pregunta.nombre)
        # print("New padre id: " + str(new_padre))
        # print("New padre count: " + str(new_count))
        # print("Old padre id: " + str(old_padre))
        # print("Old padre count: " + str(old_count))
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
                    return 'Moved and updated both'
                except:
                    transaction.rollback()
                    return 'Failure'
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
                    return 'Moved and updated old'
                except:
                    transaction.rollback()
                    return 'Failure'
        elif (new_count == 0):
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
                    return 'Moved and updated new'
                except:
                    transaction.rollback()
                    return 'Failure'
            # Move and update new
        else:
            query = (Pregunta
                     .update({Pregunta.padre_id: new_padre})
                     .where(Pregunta.id == id))
            query.execute()
            return "Moved"
    else:
        return "Padre no existe"


@app.delete("/pregunta/{id}/delete", status_code = status.HTTP_200_OK)
async def delete_pregunta(
    id: int = Path(...)
):
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
                    return 'Deleted and updated'
                except:
                    transaction.rollback()
                    return 'Failure'
        else:
            delete = (Pregunta.delete()
            .where(Pregunta.id == id))
            delete.execute()
            return 'Deleted'
    else:
        return "Cannot delete a pregunta with children"







# PERSONAS
# TODO: Buscar por fecha
@app.get("/persona/show", status_code = status.HTTP_200_OK)
async def get_persona(
    name: Optional[str] = Query(
        None,
        title = "Name of person",
        description = "Exact name of the person you want to look up.",
        min_length = 1,
        max_length = 60,
        regex = "^[A-Za-z][A-Za-z ]+$"
    ),
    correo: Optional[str] = Query(
        None,
        title = "Email of person",
        description = "Exact email of person you want to look up.",
        min_length = 1,
        max_length = 50,
        regex = "(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
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

# TODO: Check Response Model
# @app.post("/persona/create", status_code = status.HTTP_201_CREATED)
@app.post("/persona/create", response_model = PersonaOut, status_code = status.HTTP_201_CREATED)
def create_persona(persona: PersonaIn):
    newPerson = Persona.create(
        nombre=persona.nombre,
        correo=persona.correo,
        descripcion=persona.descripcion
    )
    return persona

# TODO: Is this a right way to update?
@app.put("/persona/update/{id}", status_code = status.HTTP_200_OK)
async def update_persona(
    id: int = Path(
        ...
    ),
    personaUpdate: PersonaUpdate = Body(...)
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
    return "Updated"
    # result = [model_to_dict(item) for item in query]

# TODO: Check Response Model
@app.delete("/persona/delete/{id}", status_code = status.HTTP_200_OK)
async def delete_persona(
    id: int = Path
):
    query = (Persona.delete()
            .where(Persona.id == id))
    query.execute()
    return "Deleted"




# CALIFICACIONES
# TODO: REGEX OF FECHA
@app.get("/calificacion/show", status_code = status.HTTP_200_OK)
async def get_calificacion(
    dateBegin: Optional[date] = Query(
        None,
        title = "Begin date",
        description = "Lower end date for selection.",
        example = getDate()
    ),
    dateEnd: Optional[date] = Query(
        None,
        title = "Ending date",
        description = "Upper end date for selection.",
        example = getDate()
    )
):
    if (dateBegin and dateEnd):
        if (dateBegin > dateEnd):
            return "Invalid dates"
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
async def calificar_chatbot(userCal: CalificacionIn):
    newCal = Calificacion.create(
        calificacion = userCal.calificacion,
        fecha = getDateTime()
    )
    return "Gracias por calificarnos"


@app.delete("/calificacion/delete/{id}", status_code = status.HTTP_200_OK)
async def delete_calificacion(
    id: int = Path
):
    query = (Calificacion.delete()
            .where(Calificacion.id == id))
    query.execute()
    return "Deleted"


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