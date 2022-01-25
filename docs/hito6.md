
# :whale2: Hito 6 : Docker Compose :whale2:

***

```
IMPORTANTE: Esta práctica, al ser opcional, se ha desarrollado y explicado esquemáticamente
```

## Composición cluster

Para la composición del cluster se han determinado que se necesitan, al menos 2 contenedores:
- Para la base de datos
- Pare el servicio desarrollado hasta el hito 5 (microservicio)

Para ello, se ha creado un archivo [docker-compose.yml](https://github.com/LCinder/Moon-vie/blob/master/docker-compose.yml) que contiene lo siguiente:

```
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - 27017:27017
    volumes:
      - mongodb:/data/db
  app:
    depends_on:
      - mongodb
    build: .
    volumes:
      - app:/app/test
volumes:
  mongodb:
  app:
```

Como se puede ver, se incluyen 2 servicios, que son los 2 contenedores que vamos a crear.
Para el primero, se ha elegido el contenedor `mongodb` como BBDD NoSQL, ya que necesitábamos una BBDD
de este tipo por ómo estaba configurado el proyecto desde un inicio, y `mongo` es una de las BBDD
NoSQL más famosas y con más documentación. Lo que ha hecho que me decante por su uso ha sido sobre todo
la facilidad de importar datos, ya que mediante un cliente me ha permitido seleccionar el fichero `movies.json`
y cargar rápidamente todas las películas, lo que facilita el uso desde el principio.

La imagen que nos descargamos es la más reciente de `mongodb,` y en el apartado `ports` se especifican los puertos
desde donde se accederá al servicio proporcionado por el contenedor. Es necesario especificar 2 ya que uno
de ellos es el propio que utiliza `mongodb` en el contenedor, y otro es el que se mapea para acceder desde fuera
del contenedor (el que se va a usar). El puerto por defecto es el _27017_ por lo que podemos dejarlo establecido así.

Para poder almacenar los datos y que no se borren en cada desconexión del cluster, montamos un volumen
en `/data/db` que se especifica en la creación del contenedor y también en el apartado inferior `volumes` que indica
los volúmenes a utilizar.

El otro servicio creado es la aplicación desarrollada en la asignatura: se ha creado una tarea en el gestor de tareas
para poder levantar el servidor y que quede a la escucha. El `Dockerfile` con el que se ha construido es muy parecido
al del hito 3 excepto que se ha cambiado el comando a ejecutar por este último.

Una vez con todo esto, se puede construir los contenedores con `docker-compose up -d` y al realizarlo vemos
que se construyen con éxito

![Construccion compose](https://github.com/LCinder/Moon-vie/blob/master/docs/img/docker-compose.PNG)


A la hora de especificar el _host_y el _puerto_ es necesario tener precaución con su asignación, por lo que haremos uso
de la configuración distribuida del hito anterior. Dentro de la clase _movies_ creamos un objeto `service` del tipo `EtcdService`
y podemos asignarle los valores de la forma

```
async setURI() {
    const host = await this.service.get("HOST");
    const port = await this.service.get("PORT");
    this.URI = `mongodb://${host}:${port}`;
}
```

Si hacemos un `export` de los valores _host_ y _port_ el servicio los detecta y los lee al llamar a la función, por lo que
mantenemos la configuración adecuadamente y los valores no son accesibles desde fuera.

Como es lógico, hemos tenido que cambiar toda la lectura de datos de películas en la clase _movies_ ya que ahora se leen desde `mongodb.`
Para ello, una vez configurada la uri anterior, se han modificado tanto la función de búsqueda de películas
como el controlador con el que se buscaban en la API. La nueva función es la siguiente:

```
async findDb(movieTitle: string): Promise<IMovie> {
    if (this.dbClient === undefined)
        await this.initializeDb();

    let movie;
    if(movieTitle !== "")
        movie = await this.dbClient!.collection("movies").findOne({id:  movieTitle});
    else
        movie = await this.dbClient!.collection("movies").find({});
    return movie;
}
```

Es una función asíncrona que devuelve una promesa de tipo interfaz de película. Primero se comprueba
si el objeto cliente de `mongodb` llamado _dbClient_ está inicializado o no, y en caso negativo, se inicializa (no he encontrado manera
de realizarlo en el constructor para que sea asíncrono también). Luego se busca una película por el id con la función `findOne`
que devuelve un _documento_ (forma en que `mongodb` guarda los datos, parecido a JSON) o si el id es vacío, devuelve
todas las películas (para la ruta _/movies_).

Con todo esto, el servicio está preparado para funcionar. Para hacerlo funcionar, 
simplemente tenemos que ejecutar `docker-compose up` y lo tendremos listo.
Ahora podremos acceder al microservicio desde la uri que disponíamos en el hito anterior, pero ahora los datos son obtenidos
desde la BBDD `mongodb` y comprobamos como al lanzarlo se ejecutan los contenedores


![hito6Funciona](https://github.com/LCinder/Moon-vie/blob/master/docs/img/hito6Funciona.PNG)


La forma de desplegarlo es, por ejemplo, subirlo a DockerHub o a GitHub Container Registry al igual
que hicimos en el hito 3, y al ejecutar `docker-compose up` si no tenemos descargadas las imágenes, 
se descargarán automáticamente y se ejecutarán de igual manera que antes, es decir, no es necesario subir
la composición de los contenedores tal cual, sino que se tratan por separado y se descargan y ejecutan a la vez.

## Terminación proyecto

Como funcionalidad extra para la terminación del proyecto, se ha avanzado en la HU4 que permite extraer el
_sentimiento_ de una película, es decir, un porcentaje de positividad/negatividad que se obtiene de los comentarios 
y la descripción de la película. Para ello se ha creado la ruta _/sentiment_ que está accesible para cada película, de forma 
que se devuelven 2 nºs que indica el porcentaje de positividad/negatividad de una película.
Esto se ha realizado con una biblioteca llamada _sentiment_ que devuelve un _score_ con la puntuación de la película,
pasándole un _string_ que en este caso son las reviews y la descripción comentadas anteriormente. Se realiza en la clase
_movie.ts_

Como se ve en la siguiente imagen, para la película _Tenet_ se obtiene un 67% de buenas críticas y un 33% de malas críticas,
que junto con las palabras claves de la película, permite conocer a primera vista la información de cómo de buena es la misma,
terminando así el proyecto iniciado en la asignatura

![sentiment](https://github.com/LCinder/Moon-vie/blob/master/docs/img/sentiment.PNG)