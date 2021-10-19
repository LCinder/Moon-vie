# :mag: Moon-vie :mag:
---
### Proyecto asignatura Cloud Computing del Máster En Ingeniería Informática de la UGR.

Sistema de análisis de películas basado en críticas de usuarios

***

![Moon-vie](https://github.com/LCinder/Moon-vie/blob/master/docs/img/LOGO%2011.png)

## :pencil2: Descripción :pencil2:

¿Cuántas veces has intentado ver una película, sólo o en compañía, y has tardado más en decidir la película que en verla?
¿Al final siempre acabas viendo la misma película en bucle porque no se te ocurre otra que ver?

La idea de este sistema es precisamente suplir ese problema, ya que plataformas como Netflix realizan 
recomendaciones pero basándose en el seguimiento habitual del usuario, sin dar 
opción de poder disfrutar de una película que tenga características diferentes a las típicamente recomendadas para el usuario
y se pretende, **en un sólo vistazo, saber si una película le gustará al usuario o no.**

---

Inicialmente el sistema dispondrá de películas obtenidas de API's como [TheMovieDB](https://developers.themoviedb.org/)
e [IMDB](https://imdb-api.com/) pero almacenadas en un archivo JSON local para la obtención de películas de donde se pueden
recuperar mucha información de las mismas como su nombre, género, descripción, y sobretodo **comentarios**, de tal manera
que obtendrá todos los comentarios (o los más relevantes) de esa película introducida por
el usuario para, mediante algoritmos de *machine learning* y/o de minería de textos y 
métodos de recuperación de información como **[TF-IDF,](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)** ser capaz de obtener
las palabras clave de esa película y dar una idea general de la misma.

### Ejemplo
El usuario Diego quiere saber si ver la película **TeneT** pero no dispone del tiempo
o de las ganas suficientes para leerse todos los comentarios y saber si ver esa película o no.
Introduce en el sistema el nombre de la película y el mismo le responde de la manera:
- 70% de los usuarios incluyen palabra *fascinante*
- 75% incluyen palabra *thriller*
- 50% incluyen palabra *compleja*
- 10% incluyen palabra *obra de arte*
- Las críticas son en general: 
  - 90% positivas
  - 10% negativas

Con esos datos en apenas segundos, Diego puede decidir si ver la película o elegir otra
en base a nuevos gustos.

La intención de que la aplicación esté disponible en la nube es para garantizar el desacople de la misma de dispositivos móviles
en forma de aplicación, ya que gracias a no necesitar su instalación permite su acceso de forma efectiva, y
en su acceso por múltiples usuarios, además de obtener información de la API ya mencionada anteriormente.

Se hace especial énfasis en que este software quiere incluir funcionalidades novedosas que no existan en ninguna plataforma
y que realmente puedan ser de utilidad, por lo que se irán incluyendo conforme el proyecto avance y se detecten oportunidades de mejora.

***

## :rocket: Creación y configuración del repositorio :rocket:

- Enlace al archivo que contiene [toda la configuración del repositorio](https://github.com/LCinder/Moon-vie/blob/master/docs/hito0.md), como la creación del mismo 
y de la clave pública

---

## :chart_with_upwards_trend: Código :chart_with_upwards_trend:
- Enlace para acceder a la clase [index.ts](https://github.com/LCinder/Moon-vie/blob/master/src/index.ts)
que llama a las clases imprescindibles para comprobar el funcionamiento
- Enlace para acceder a la clase [movie.ts](https://github.com/LCinder/Moon-vie/blob/master/src/movie.ts) que
guarda la información de una película, junto con funciones básicas necesarias
- Enlace para acceder a la clase [movies.ts](https://github.com/LCinder/Moon-vie/blob/master/src/movies.ts) que
carga la información del archivo JSON junto con funciones básicas necesarias
- Enlace para acceder a la [|HU1| - Como usuario quiero poder buscar películas por su nombre](https://github.com/LCinder/Moon-vie/issues/1)
- Enlace para acceder a la [|HU2| - Como usuario quiero, mediante el nombre de una película, obtener información de la misma](https://github.com/LCinder/Moon-vie/issues/2)
- Enlace para acceder a la [|HU3| - Como usuario quiero saber la clasificación temática que define una película](https://github.com/LCinder/Moon-vie/issues/3)
- Enlace para acceder a la [
  |HU4| - Como usuario quiero saber si una película es buena o mala teniendo en cuenta el resumen y las reviews](https://github.com/LCinder/Moon-vie/issues/4)
- Enlace para acceder a la [|HU5| - Como desarrollador, quiero buscar una película por el título y almacenar su información (reviews, id, etc)](https://github.com/LCinder/Moon-vie/issues/5)
- Enlace a los [milestones, en concreto al del hito 1](https://github.com/LCinder/Moon-vie/milestone/1)
- Enlace para acceder al archivo [cc.yaml](https://github.com/LCinder/Moon-vie/blob/master/cc.yaml)
- Enlace para acceder al archivo [movies.json](https://github.com/LCinder/Moon-vie/blob/master/data/movies.json) de donde se obtiene la información de las películas,
previamente habiendo realizado varias *querys* (bastantes en verdad) mediante un *script* para obtener miles de películas
junto con sus *reviews* y almacenarlas en este archivo, eliminando la necesidad de utilizar la API.
- Para la ejecución del código, es necesario tener instalado *node.js* y *typescript* y se ejecuta de la forma:
`npm run start`