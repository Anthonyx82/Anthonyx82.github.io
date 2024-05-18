# Supabase && React

Proyecto de supabase y react con el cual se ofrece un gestor de tareas con subida de fotos para cada tarea y posibilidad de filtrar por tareas completadas/pendientes

Con esta aplicacion se pretende ayudar a comprender como funcionan las tecnologias de react y de supabase juntas tocando todas las funcionalidades posibles para que no quede ningun cabo suelto y pueda servir de gia

## Despliege

Para desplegar el proyecto lo primero tendremos que configurar un archivo `.env.local` en la carpeta principal del proyecto el cual va a contener las siguientes variables de entorno

```dotenv
REACT_APP_SUPABASE_URL='URL del proyecto'
REACT_APP_ANON_KEY=Clave anonima supabase
```
Se ofrece un archivo `.env.local-example` que puede utilizarse pero es importante cambiar el nombre del archivo al indicado antes de arrancar el proyecto

Una vez configurado esto, y habiendo creado las bases de datos y bucket correspondiente en supabase 

**PD:** Si no sabes de que estoy hablando revisa [esta pagina](https://anthonyx82.github.io/html/programacion/supabaseReact/supabaseReact.html)

Ahora vamos a ejecutar el proyecto en el cual vamos a ejecutar el `Dockerfile`

```Docker
docker build .
docker run -p PuertoAnfrition:PuertoMaquina "id imagen"
```

**NOTA:** El puerto de la maquina sera el que hemos indicado dentro del Dockerfile en mi caso es el 20000 pero lo puedes cambiar por otro y el puerto anfrition es el puerto de tu maquina donde luego te vas a conectar para ver el proyecto ejecutado

Y con esto ya lo tendriamos desplegado y podriamos usarlo sin problemas
