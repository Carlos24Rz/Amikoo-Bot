
<img src="/img/Logo-header.svg" alt="drawing" width="100"/>
<img src="/img/Logo-text.png" alt="drawing" width="300"/>

<br></br>
Amikoo-Bot es un rule-based chatbot implementado en Pyton utilizando el web framework [FastAPI][1]

# Requisitos
**Servidor**
- Sistema Operativo basado en Linux ***(Se recomienda Ubuntu 20.04)***
- Servidor Web ***(Se recomienda NGINX 1.18+)***

**Cliente**
- Conexión a internet
- Navegador ***(Recomendado Google Chrome, Firefox)***

----
# Instalación
## Python
Instalar Python3
```bash
$ sudo apt-get install python3
```
Instalar PIP
``` bash
$ sudo apt install python3-pip
```
Instalar Python venv
```bash
$ sudo apt install python3.8-venv
```

## MySQL
```bash
$ sudo apt install mysql-server
```

## NGINX
```bash
$ sudo apt install nginx
```


------------------
# Configuración

## NGINX
Clonar el proyecto `Chatbot` a la carpeta `/var/www/html`

# Config de nginx

## MySQL
Crear usuario
```sql
mysql> create database [DATABASE];
mysql> use [DATABASE];
mysql> create user [USER]@'localhost' identified by '[PASSWORD]';
mysql> grant all privileges on [DATABASE].* to [USER]@'localhost';
mysql> flush privileges;
```
Estando en la carpeta `Chatbot` Crear tablas e insertar información
```sql
mysql> use [DATABASE]
mysql> source mysql/create.sql
mysql> source mysql/insert.sql
```

## Python
Crear un ambiente virtual
```bash
$ python3 -m venv venv
```
Activar el ambiente virtual
```bash
$ source ./venv/bin/activate
```
Instalar dependencias (Ubicadas en `Chatbot/app/requirements.txt`)
```bash
$ pip install -r requirements.txt
```
Modificar el archivo ```Chatbot/app/config.py``` con las credenciales del usuario de **MySQL**
```python
database='[DATABASE]'
user='[USER]'
password='[PASSWORD]'
 ```
## JavaScript
Para que el chatbot funcione correctamente, es necesario modificar la variable `activeURL` de los archivos `JavaScript`.

Modificar la variable `activeURL` por la IP (***IP pública***) y el puerto (por default ***8080***) sobre el cual la API está ejecutándose.

```js
const activeURL = "http://54.164.250.82/:8080";
```
Ubicada en los archivos
- `Chatbot/script.js`
- `Chatbot/crud/js/crudCalificaciones.js`
- `Chatbot/crud/js/crudPersonas.js`
- `Chatbot/crud/js/crudPreguntas.js`




# Ejecución
## API
Estando en la carpeta `Chatbot/app` inicializar la API
```bash
$ gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker -D
```

## Página de administrador
Para acceder a la página de administrador hay que ir a la dirección [IP:PORT/admin/index.php][2] e iniciar sesión

Dentro de está página es posible realizar modificaciones a las preguntas del chatbot, observar los formularios y las calificaciones recibidas.

<img src="/img/preguntascrud.jpeg" alt="Pagina de admin preguntas" width="250"/>


# Troubleshoot
## Reiniciar API
En caso de que algún error inesperado ocurra, es necesario reiniciar la API, para ello hay que:
### 1. Matar el proceso
```bash
$ pkill -f gunicorn
```

### 2. Reiniciar el proceso
```bash
$ gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker -D
```

### 3. Verificar funcionamiento
Ir a la dirección de la página y corroborar que se despliegan las preguntas

## Comprobar funcionamiento de FASTAPI
### 1. Habilitar documentación de la API

En caso de que ocurra algun problema con la API de python, es posible habilitar la documentación.

Sustituir ***linea 56***

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`app = FastAPI(openapi_tags=tags_metadata)`

Por

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`app = FastAPI(openapi_url=None, openapi_tags=tags_metadata)`

### 2. Acceder a la documentación
Para comprobar el funcionamiento es necesario correr el comando `uvicorn main:app --reload`, el cual te indicará si existe algún problema.

<img src="/img/uvicorn.jpeg" alt="Documentacion" width="400"/>
<br></br>

* Si estás en un servidor **Local** con interfaz gráfica y un navegador ->[``127.0.0.1:8000/docs``][3]
* Si estás en un servidor **Remoto** ->[``IP:PUERTO/docs``][3]


<img src="/img/docs.jpeg" alt="Documentacion" width="400"/>
<br></br>
Esta documentación te permite comprobar el funcionamiento de cada uno de los métodos de la API


### 3. Desactivar documentación

Una vez finalizado, hay que desactivar la documentación automática.

Sustituir ***linea 56***

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`app = FastAPI(openapi_url=None,`

Por

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`app = FastAPI(openapi_tags=tags_metadata)
openapi_tags=tags_metadata)`



[1]: https://fastapi.tiangolo.com/ "FastAPI"
[2]: 127.0.0.1:8000/admin "127.0.0.1:8000/admin/index.php"
[3]: 127.0.0.1:8000/docs "Localhost"
