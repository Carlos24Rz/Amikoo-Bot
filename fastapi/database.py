from peewee import *
from datetime import datetime


database = MySQLDatabase(
    'chatbot',
    user='Tec',
    password='tecPass',
    host='localhost',
    port=3306,
    charset='utf8mb4'
)


class Categoria(Model):
    nombre = CharField(max_length=50)
    texto = CharField(max_length=50)

    def __str__(self):
        return self.nombre

    class Meta:
        database = database
        table_name = 'categoria'

class Pregunta(Model):
    categoria_id = IntegerField()
    nombre = CharField(max_length=30)
    emoji = CharField()
    visitas = IntegerField()

    def __str__(self):
        return self.nombre

    class Meta:
        database = database
        table_name = 'pregunta'

class Persona(Model):
    nombre = CharField(max_length=50)
    correo = CharField(max_length=50)
    descripcion = IntegerField()

    def __str__(self):
        return self.nombre

    class Meta:
        database = database
        table_name = 'persona'

class Calificacion(Model):
    calificacion = IntegerField()
    fecha = DateTimeField(default=datetime.today().strftime('%Y-%m-%d'))

    def __str__(self):
        return self.calificacion

    class Meta:
        database = database
        table_name = 'calificacion'
