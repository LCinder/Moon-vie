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
el usuario para, mediante algoritmos de *machine learning* y/o de minería de textos 
y en concreto, un modelo generativo **[LDA,](https://es.wikipedia.org/wiki/Latent_Dirichlet_Allocation)** ser capaz de obtener
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
- Enlace para acceder al inicio del proyecto, [creación de primeras clases](https://github.com/LCinder/Moon-vie/blob/master/docs/hito1-Codigo.md) e HU

---

## :pencil2: Tests :pencil2:
- Enlace para acceder a la [documentación de los test](https://github.com/LCinder/Moon-vie/blob/master/docs/hito2-Test.md)
incluyendo elección de librería de aserciones, marco de pruebas y gestor de tareas y prueba de los test
- Enlace al script [tests.ts](https://github.com/LCinder/Moon-vie/blob/master/src/tests.ts) que incluye los tests que comprueban las HU
- Enlace al script [gulpfile.js](https://github.com/LCinder/Moon-vie/blob/master/src/gulpfile.js) como archivo de configuración del gestor de tareas *Gulp*
- Enlace a las clases [movie.ts](https://github.com/LCinder/Moon-vie/blob/master/src/movie.ts) y [movies.ts](https://github.com/LCinder/Moon-vie/blob/master/src/movies.ts) que se han avanzado para continuar
con las HU indicadas (en concreto HU [#2](https://github.com/LCinder/Moon-vie/issues/2), [#3](https://github.com/LCinder/Moon-vie/issues/3) y [#5](https://github.com/LCinder/Moon-vie/issues/5))