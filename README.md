
<img src="/img/Logo-header.svg" alt="drawing" width="100"/>
<img src="/img/Logo-text.png" alt="drawing" width="300"/>

<br></br>
Amikoo-Bot es un rule-based chatbot implementado en Python utilizando el web framework [FastAPI][1]

# Requisitos
**Servidor**
- Sistema Operativo basado en Linux ***(Se recomienda Ubuntu 20.04)***
- Servidor Web ***(Se recomienda NGINX 1.18+)***

**Cliente**
- Conexión a internet
- Navegador ***(Recomendado Google Chrome, Firefox)***

## Instalación
```bash
$ sudo apt-get update
```

* ### Python
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
Instalar gunicorn
```bash
$ sudo apt install gunicorn
```

* ### MySQL
Instalar MySQL
```bash
$ sudo apt install mysql-server
```

* ### Servidor
  * #### NGINX
```bash
$ sudo apt-get install nginx
```
  * #### PHP
Instalar php-fpm
```bash
$ sudo apt install php-fpm
```
Instalar php-mysql
```bash
$ sudo apt-get install php-mysql
```


------------------
# Configuración
## Nginx y Php
Clonar el proyecto `Chatbot` a la carpeta `/var/www/html`.

Crear y editar `/etc/nginx/sites-enabled/fastapi_nginx` y modificar **[IP PUBLICA]** con la IP del servidor
```
server {
  listen 8080;
  server_name [IP PUBLICA];
  location / {
    proxy_pass http://127.0.0.1:8000;
  }
}
```
Editar y descomentar de `/etc/php/7.4/fpm/php.ini` las siguientes lineas
```
  max_execution_time = 300
  max_input_time = 300
  memory_limit = 256M
  post_max_size = 32M
  upload_max_filesize = 32M
  date.timezone = America/Chicago
```
Editar y descomentar de `/etc/nginx/sites-available/default` las lineas
```
location ~ \.php$ {
  include snippets/fastcgi-php.conf;
  fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
}
```
Reiniciar Nginx
```bash
$ sudo systemctl reload nginx
```

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
mysql> source mysql/create.sql;
mysql> source mysql/insert.sql;
```

## Python
Crear un ambiente virtual en la carpeta `Chatbot/app`
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
- `Chatbot/admin/js/crudCalificaciones.js`
- `Chatbot/admin/js/crudPersonas.js`
- `Chatbot/admin/js/crudPreguntas.js`

## Php
Modificar las credenciales del archivo `/var/www/html/chatbot/admin/includes/dbh.inc.php`


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

# Sugerencias
## Manejo de procesos

Es recomendable utilizar alguna herramienta externa como para correr la API en arranque y para manejar reinicios automáticos en caso de fallas, como: Docker o Kubernetes

## Motor de procesamiento de lenguaje natural

Para implementar el NLP, habrá que crear el método en el archivo `app/main.py` y realizar el fetch desde el archivo `chatbot/js/script.js` para enviar la respuesta al archivo `chatbot/index.html`


[1]: https://fastapi.tiangolo.com/ "FastAPI"
[2]: 127.0.0.1:8000/admin "127.0.0.1:8000/admin/index.php"
[3]: 127.0.0.1:8000/docs "Localhost"
