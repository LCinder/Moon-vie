# :mag: Moon-vie :mag:
---
### Proyecto asignatura Cloud Computing del Máster En Ingeniería Informática de la UGR.

Sistema de análisis de películas basado en críticas de usuarios

***

![https://github.com/LCinder/Moon-vie/blob/master/docs/img/LOGO%202.png](Moon-vie)

## :pencil2: Descripción :pencil2:

¿Cuántas veces has intentado ver una película, sólo o en compañía, y has tardado más en decidir la película que en verla?
¿Al final siempre acabas viendo la misma película en bucle porque no se te ocurre otra que ver?

La idea de este sistema es precisamente suplir ese problema, ya que plataformas como Netflix realizan 
recomendaciones pero basándose en el seguimiento habitual del usuario, sin dar 
opción de poder disfrutar de una película que tenga características diferentes a las típicamente recomendadas para el usuario.

---

Inicialmente el sistema dispondrá de acceso a una [API externa](https://developers.themoviedb.org/) para la obtención de películas, ya usada anteriormente de donde se pueden
recuperar mucha información de películas como su nombre, género, descripción, y sobretodo **comentarios**, de tal manera
que obtendrá todos los comentarios (o los más relevantes) de esa película introducida por
el usuario para, mediante algoritmos de *machine learning,* ser capaz de obtener
las palabras clave de esa película y dar una idea general de la misma.

### Ejemplo
El usuario Diego quiere saber si ver la película **TeneT** pero no dispone del tiempo
o de las ganas suficientes para leerse todos los comentarios y saber si ver esa película o no.
Introduce en el sistema el nombre de la película y el mismo le responde de la manera:
- 70% de los usuarios incluyen palabra *fascinante*
- 10% incluyen palabra *obra de arte*
- 5% incluyen palabra *thriller*
- 5% incluyen palabra *compleja*

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