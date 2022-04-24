from peewee import *
from datetime import datetime
from config import password

database = MySQLDatabase(
    'chatbot',
    user='Tec',
    password=password,
    host='localhost',
    port=3306,
    charset='utf8mb4'
)

# TODO: FIELD VALIDATIONS % INITIALIZATION ARGUMENTS
# http://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=table%20generation#field-initialization-arguments
class Categoria(Model):
    nombre = CharField(max_length=50)
    texto = CharField(max_length=50)
    visitas = IntegerField()
    is_final = BooleanField()

    def __str__(self):
        return self.nombre

    class Meta:
        database = database
        table_name = 'categoria'

class Pregunta(Model):
    categoria_id = IntegerField()
    nombre = CharField(max_length=30)
    emoji = CharField()

    def __str__(self):
        return self.nombre

    class Meta:
        database = database
        table_name = 'pregunta'

class Persona(Model):
    id = IntegerField()
    nombre = CharField(max_length=50)
    correo = CharField(max_length=50)
    fecha = DateTimeField(default=datetime.today().strftime('%Y-%m-%d %H:%M:%S'))
    descripcion = IntegerField()

    def __str__(self):
        return self.nombre

    class Meta:
        database = database
        table_name = 'persona'

class Calificacion(Model):
    id = IntegerField()
    calificacion = IntegerField()
    fecha = DateTimeField(default=datetime.today().strftime('%Y-%m-%d %H:%M:%S'))

    def __str__(self):
        return self.calificacion

    class Meta:
        database = database
        table_name = 'calificacion'