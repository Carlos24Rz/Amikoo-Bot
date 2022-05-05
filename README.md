
<img src="/img/Logo-header.svg" alt="drawing" width="100"/>
<img src="/img/Logo-text.png" alt="drawing" width="300"/>

<br></br>
Amikoo-Bot es un rule-based chatbot implementado en Pyton

## Requisitos
**Servidor**
- Sistema Operativo basado en Linux ***(Se recomienda Ubuntu 20.04)***
- Servidor Web ***(Se recomienda NGINX 1.18+)***

**Cliente**
- Conexión a internet
- Navegador ***(Recomendado Google Chrome, Firefox)***


## Instalación
### Python
Instalar Python3 y PIP
```bash
$ sudo apt-get install python3
$ sudo apt install python3-pip
```
<!--- <br></br>-->
Instalar dependencias (Ubicadas en `Chatbot/requirements.txt`)
```bash
$ pip install -r requirements.txt
```
----------------
### MySQL
Instalar MySQL
```bash
$ sudo apt install mysql-server
```
Crear usuario
```bash
$ sudo mysql
```
<pre><code>mysql> create database <b>[DATABASE]</b>;
mysql> use <b>[DATABASE]</b>;
mysql> create user <b>[USER]</b>@'localhost' identified by '<b>[PASSWORD]</b>';
mysql> grant all privileges on <b>[DATABASE]</b>.* to <b>[USER]</b>@'localhost';
mysql> flush privileges;</code></pre>
Crear tablas e insertar información
```sql
mysql> source mysql/create.sql
mysql> source mysql/insert.sql
```
### NGINX
```
MODIFICAR
MODIFICAR
MODIFICAR
MODIFICAR
MODIFICAR
```

------------------
## Codigo
### Python
Modificar el archivo ```Chatbot/app/config.py``` con las credenciales del usuario de **MySQL**
```python
database='[DATABASE]'
user='[USER]'
password='[PASSWORD]'
 ```


## Run it
### Ejecutar FastAPI
Estando en la carpeta `Chatbot/` ejecutar el comando
```bash
 gunicorn app/main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker -D
```

### Modificar JavaScript
Para que el chatbot funcione correctamente, es necesario asegurarse que la variable `activeURL` de los archivos `JavaScript` sea la correcta.

Modificar la variable `activeURL` por la IP y el puerto sobre el cual FastAPI esta corriendo, por ejemplo:
```js
const activeURL = "http://127.0.0.1:8000";
```
Ubicada en los archivos
- `Chatbot/script.js`
- `Chatbot/crud/js/crudCalificaciones.js`
- `Chatbot/crud/js/crudPersonas.js`
- `Chatbot/crud/js/crudPreguntas.js`


## Debugger
### Habilitar documentación de la API
En caso de que ocurra algun problema con la API de python, es posible habilitar la documentación
Sustituir ***linea 56***
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`app = FastAPI(openapi_tags=tags_metadata)`
Por
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`app = FastAPI(openapi_url=None, openapi_tags=tags_metadata)`

Esto habilitará la documentación automática, la cual puede ser accedida a través de `uvicorn main:app reload`
Si estás debugeando desde **Local** ->``127.0.0.1:8000/docs``
Si estás debugeando desde **Remoto** ->``ip:puerto/docs``

Esto permitirá ver la documentación automática de FastAPI
#### IMAGEN

Una vez finalizado, hay que deshabilitar la documentación automática.
Sustituir ***linea 56***
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`app = FastAPI(openapi_url=None,`
Por
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`app = FastAPI(openapi_tags=tags_metadata)
openapi_tags=tags_metadata)`
