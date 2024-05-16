# Proyecto django

Este es un pequeño proyecto "DEMO" para explicar las principales bases y fundamento de django.

Consiste en un blog/foro personal que todos los usuarios pueden ver pero no pueden crear publicaciones ya que deberan iniciar sesion con su cuenta y para ello tendran que ser administradores por eso la idea de que es un blog personal ya que solo el administrador del sitio puede crear publicaciones y puede dar permiso de hacerlo

Este tambien contiene una api a la cual se pueden hacer peticiones para que te devuelva la informacion de un post

## ¿Como lanzarlo?

El proyecto esta configurado para lanzarse en un entorno de produccion con docker, para esto se proporciona un docker file y un docker-compose

Primero vamos a crear un archivo `.env` en la misma carpeta que nuestro archivo settings.py que contenga las siguientes variables:

```dotenv
# API
SECRET_KEY='Tu clave privada para la api de tu proyecto'

# Debug mode
DEBUG='Modo de debug (Debe ser false para produccion)'

# Database
ENGINE='Driver'
NAME='Nombre'
USER='Usuario'
PASSWORD='Contraseña'
HOST='IP'
PORT='Puerto'
```

También en nuestro archivo settings.py hay que configurar las variables de seguridad como puede ser los host permitidos, y los host csrf permitidos.

Una vez definido nuestro fichero de entorno del mismo modo configuraremos nuestro `docker-compose`, para ello vamos a crear un archivo en la misma carpeta que este donde definiremos las siguientes variables:

```dotenv
MYSQL_ROOT_PASSWORD='Contraseña ROOT'
MYSQL_DATABASE='Base de datos'
```

**PD:** puedes usar los archivos `.env-example` pero recuerda cambiar los nombres al terminar

Despues de esto vamos a ejecutar nuestro contenedor docker

```Docker
docker compose build
docker compose up
```

Y ya lo tendriamos funcionando en, este caso en el puerto 10000:10001 porque es el que yo he elegido y he definido en el docker compose pero siempre podras cambiarlo tu mismo.

**IMPORTANTE:** recuerda ejecutar una terminal en el contenedor django para cargar las migraciones
