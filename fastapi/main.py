# uvicorn main:app --reload
# http://127.0.0.1:8000
# FASTAPI
from fastapi import FastAPI, status
from fastapi import Query, Path
from fastapi.middleware.cors import CORSMiddleware

# EXTRAS
from playhouse.shortcuts import model_to_dict
from datetime import datetime
from datetime import date
from typing import Optional

# ORM MODELS
from database import database as connection
from database import Categoria
from database import Pregunta
from database import Persona
from database import Calificacion

# SCHEMAS
from schemas import CategoriaIn
from schemas import PreguntaIn
from schemas import PersonaIn
from schemas import PersonaOut
from schemas import CalificacionIn


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
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def getFecha():
    return datetime.today().strftime('%Y-%m-%d')

def create_tables():
    with connection:
        connection.create_tables([Categoria, Pregunta, Persona, Calificacion])

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
    with open("log.txt", mode="a") as log:
        log.write("Application shutdown: " + startupTime + " - " + shutdownTime + "\n")
    if not connection.is_closed():
        connection.close()

@app.get("/")
async def home():
    return [{"Hello": "World"}]


# CATEGORIA
@app.get("/categoria/show", status_code = status.HTTP_200_OK)
async def show_categoria(
    nombre: Optional[str] = Query(
        None,
        min_length = 1,
        max_length = 20,
        example = "Inicio"
    )
):
    if (nombre):
        query = Categoria.select().where(Categoria.nombre == nombre)
    else:
        query = Categoria.select()
    result = [model_to_dict(item) for item in query]
    return result

@app.post("/categoria/create", status_code = status.HTTP_201_CREATED)
def create_categoria(categoria: CategoriaIn):
    newCategoria = Categoria.create(
        nombre=categoria.nombre,
        texto=categoria.texto
    )
    return "Categoria creada"


# PREGUNTAS
@app.get("/pregunta/show", status_code = status.HTTP_200_OK)
async def show_pregunta(
    categoria: Optional[str] = Query(
        None,
        title = "Name of category",
        description = "Name of category selected",
        min_length = 1,
        max_length = 20,
        # regex = "^[_A-Za-z0-9-, ]+$",
        example = "Inicio"
    )
):
    if (categoria):
        query = (Pregunta.select()
                .join_from(Pregunta, Categoria, on=(Pregunta.categoria_id == Categoria.id))
                .where(Categoria.nombre==categoria))
    else:
        query = Pregunta.select()
    result = [model_to_dict(item) for item in query]
    return result

@app.post("/pregunta/create")
async def create_pregunta(pregunta: PreguntaIn):
    arrayCat = []
    query = (Categoria.select(Categoria.id)
            .where(Categoria.nombre == pregunta.categoria))
    for category in query:
        arrayCat.append(category.id)
    if (arrayCat != []):
        newPregunta = Pregunta.create(
            categoria_id = arrayCat[0],
            nombre = pregunta.nombre,
            emoji = pregunta.emoji,
            visitas = 0
        )
        return pregunta
    else:
        return "No se pudo crear la pregunta"

# PERSONAS
@app.get("/persona/show", status_code = status.HTTP_200_OK)
async def show_persona(
    name: Optional[str] = Query(
        None,
        title = "Name of person",
        description = "Name of person you want to look up.",
        min_length = 1,
        max_length = 50
    ),
    correo: Optional[str] = Query(
        None,
        title = "Email of person",
        description = "Email of person you want to look up.",
        min_length = 1,
        max_length = 50
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
def create_persona(persona: PersonaIn):
    newPerson = Persona.create(
        nombre=persona.nombre,
        correo=persona.correo,
        descripcion=persona.descripcion
    )
    return persona


# CALIFICACIONES
@app.get("/calificacion/show", status_code = status.HTTP_200_OK)
async def show_calificacion(
    dateBegin: Optional[date] = Query(
        None,
        title = "Begin date",
        description = "Lower end date for selection.",
        example = getFecha()
    ),
    dateEnd: Optional[date] = Query(
        None,
        title = "Ending date",
        description = "Upper end date for selection.",
        example = getFecha()
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
def calificar_chatbot(userCal: CalificacionIn):
    newCal = Calificacion.create(
        calificacion = userCal.calificacion,
        fecha = getFecha()
    )
    return "Gracias por calificarnos"
