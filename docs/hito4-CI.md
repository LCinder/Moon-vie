
# :scroll: Hito 4 : CI - Integración Continua :scroll:

***


## Elección sistema CI

Para la elección del sistema CI se ha realizado una búsqueda para ver qué sistemas existen, qué ofrecen, diferencias, 
lenguajes y funcionalidades que soportan, etc.
Para ello encontramos:
- Shippable: Por desgracia este sistema ya no existe. Funcionaba muy bien y era fácil de configurar, pero
al parecer ha sido absorbido por JFrog.
- JFrog: Sistema que permite centralizar _artifactorys_ y dependencias, estando más enfocado por tanto
para Java y sistemas que usen Maven. Hay que solicitar una demo que además tarda varios días (o por lo menos
a mí no me han aceptado todavía)
- Jenkins: También está más enfocado para Java. Hay que descargar un ejecutable para correrlo
localmente (no hay versión en cloud), por lo que la configuración es más complicada.
- Travis: Permite configuración sencilla, conexión con repositorio de GitHub, pero
en IV gasté todos los créditos, por lo que no es posible utilizarla.
- Circle-CI: Sistema que destaca mucho más que cualquier otro (se posiciona siempre el primero en las búsquedas)
y permite la ejecución de contenedores docker, lo que sumado a la fácil configuración y la obtención de créditos
suficientes para su uso hace que sea la mejor elección.
- Buddy-CI: Es un sistema de CI bastante grande, donde se permite también CD
entre otras cosas, el plan gratuito es muy amplio y la utilización es muy diferente
a la de cualquier otro CI, ya que es más cercano al usuario, disponiendo de una GUI. Se verá posteriormente.

### Circle-CI
Circle-CI dispone de una característica muy útil, los `orbs,` que son fragmentos de código reutilizable
para automatizar procesos sin escribir gran cantidad de código. Permite su integración de forma muy sencilla
y facilita la creación de archivos de configuración legibles y más complejos. Además 
dispone de varias imágenes oficiales pre-diseñadas, como las de docker, que permiten utilizar el entorno de
docker sin configurar prácticamente nada. Lo veremos a continuación.

Previamente, tenemos que registrarnos en Circle-CI. El proceso es sencillo si se utiliza GitHub ya que
sólo hay que iniciar sesión e indicar qué repositorio queremos conectar.

Una vez que hemos iniciado sesión y hemos elegido el repositorio, automáticamente nos escaneará en busca
del directorio `.circleci` que debería además contener un archivo de configuración de nombre `config.yml`
como se ve en la siguiente imagen, en mi caso está en la rama `hito-4`

![Repositorio CI](https://github.com/LCinder/Moon-vie/blob/master/docs/img/circleci-1.PNG)


Una vez seleccionado, se nos abre un _dashboard_ para poder ver los _workflows_ que se han ejecutado,
en qué rama, etc.

El archivo de configuración usado en este caso es el siguiente:

```
version: 2.1
jobs:
  build:
    docker:
      - image: lcinder/moon-vie
    steps:
      - checkout
      - run:
          name: Running container
          command: gulp test-ts
```

Primero hay que especificar la versión de Circle-CI a utilizar, en este caso la versión 2.1
que es la última disponible actualmente y otorga muchas funcionalidades nuevas, como la de los `orbs` comentados
anteriormente.

Luego se indica los `jobs` o trabajos a realizar, en este caso como vamos a utilizar docker
incluimos los campos `build` y `docker` y dentro de este la imagen que queramos usar, la última
imagen que pasa nuestros tests. Estamos usando la imagen pre-diseñada de Circle-CI para docker como dijimos antes, 
donde le indicamos que construya nuestra imagen (con `build`) como paso previo a realizar cualquier acción.

Posteriormente, le indicamos una serie de pasos (`steps`) a realizar con la imagen construida.
Se ejecuta la acción `checkout,` que se trata de un comando muy curioso, ya que utilizando 
la imagen de Circle-CI `docker,` nos permite ejecutar comandos **dentro del contenedor** por lo que
no es necesario montar volúmenes ni nada parecido. Es entonces cuando ejecutamos (dentro del apartado `run`)
los comandos que queramos, en este caso la tarea de ejecución de test con `gulp test-ts`, y vemos que 
todo funciona perfectamente


![Funciona Docker CI](https://github.com/LCinder/Moon-vie/blob/master/docs/img/circleci-funciona.PNG)

### Otros sistemas: GitHub Actions

Se pueden utilizar otros sistemas, como GitHub Actions que funciona perfectamente, permite la ejecución
de _workflows_ las veces que queramos sin créditos ni nada, y está integrado dentro de GitHub.

En el hito anterior se utilizó para
[desplegar construir, desplegar y ejecutar](https://github.com/LCinder/Moon-vie/runs/4250487253?check_suite_focus=true#step:7:26)
el contenedor docker de los tests, pero se va a crear otro _workflow_ que se ha visto necesario, 
en este caso se pretende que cada vez que se hace un cambio en el README se ejecute un **linter** que compruebe
que el código sigue las mejores prácticas del lenguaje a utilizar (`typescript`).

Para ello se ha creado el archivo `lint.yml` que contiene:
```
name: Lint code

on:
  push:
    paths:
      "README.md"

jobs:
  linter:
    name: Install linter
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v2

      - name: Install dependencies
        run: npm i

      - name: Run linter
        run: gulp lint
```

Donde se utiliza la imagen `ubuntu` como imagen base, la action `actions/checkout@v2` que
nos permite acceder al repositorio, posteriormente se instalan las dependencias necesarias y se
ejecuta la tarea correspondiente, en este caso `gulp lint.` Se comprueba que el _workflow_ funciona en la siguiente imagen


![Funciona Lint CI](https://github.com/LCinder/Moon-vie/blob/master/docs/img/lint-ci-funciona.PNG)


Otra tarea que se ha visto necesaria para seguir las buenas prácticas de desarrollo es la de comprobar
el `coverage code,` es decir, el nivel de _cobertura_ de los tests para el código que tenemos.
Indica qué porcentaje de funcionalidad abarcan los tests, donde queremos que sea cuanto mayor mejor,
ya que indicarán que nuestros tests son realmente útiles, necesarios y se puede confiar en que si se pasan, 
el riesgo de error será muy bajo. He tenido que utilizar el plugin de `gulp` llamado
`shell` ya que se intentó utilizar `gulp.istanbul` pero surgía un bug de que se
pasaban los tests al 100% cuando en verdad no se ejecutaba ningún test, al parecer es un
bug que se comenta en este [hilo](https://github.com/SBoudrias/gulp-istanbul/issues/37) y no he podido solucionar.

Para ello se ha instalado el módulo `nyc` de `istambul.js` que nos permite justamente comprobar
la cobertura del código y funciona muy bien con `mocha,` nuestro _test runner._

Los pasos a seguir son muy parecidos a los utilizados con el _linter_

```
coverage:
    name: Install nyc
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v2

      - name: Install dependencies
        run: npm i

      - name: Run coverage tests
        run: gulp test-ts:coverage
```

Con la única diferencia del comando a ejecutar.

Comprobamos que funciona en la siguiente imagen

![Funciona Coverage CI](https://github.com/LCinder/Moon-vie/blob/master/docs/img/coverageg-ci-funciona.PNG)


### Otro más: Buddy-CI

Este sistema es curioso, ya que como se comentó antes es más cercano al usuario
tanto en la configuración como en la ejecución de cualquier _workflow,_ y dispone
de una GUI para que sea más ameno su uso, además de otras configuraciones como trigger en un click además
de push, lo que lo hase sencillo de empezar a utilizar.

La configuración se realiza de forma muy sencilla:
- Primero hay que autorizar a Buddy-CI a acceder a nuestros repositorios

![Buddy CI - 1](https://github.com/LCinder/Moon-vie/blob/master/docs/img/buddy-1.PNG)

- Una vez autorizado, nos lleva a un _dashboard_ donde mediante una UI podemos crear tareas con diferentes opciones

![Buddy CI - 2](https://github.com/LCinder/Moon-vie/blob/master/docs/img/buddy-2.PNG)

- Automáticamente nos detectará cualquier módulo, etc. en nuestro repositorio, en mi caso
me recomienda crear tareas para `gulp` o `docker` con una visita guiada que facilita todo mucho,
y un editor de código que automáticamente nos rellena con instrucciones comunes, como `npm install`

- Posteriormente a escribir un _workflow_ nos muestra gráficamente cómo está ejecutándose, 
qué módulo corresponde a ese _workflow_ etc. En la siguiente imagen se ve como detecta que se ejecuta una
tarea de `gulp`



![Buddy CI - 4](https://github.com/LCinder/Moon-vie/blob/master/docs/img/buddy-4.PNG)

- Y podemos ver cómo los sistemas de CI han pasado satisfactoriamente


![CI Funciona](https://github.com/LCinder/Moon-vie/blob/master/docs/img/ci-funciona.PNG)

### Conclusión - ¿Cuál es mejor?
Aunque los 3 sistemas (Circle-CI, Buddy-CI y GitHub Actions) trabajan bastante bien,
se puede hacer la siguiente distinción:

- **Más fácil de utilizar:** Buddy sin duda, si se tiene manejo con GitHub entonces GHA no dará problemas
- **Más sencillo de configurar :** Buddy, aunque GHA le pisa los talones, ya que ofrece más funcionalidades
- **Más completo:** GitHub Actions, ya que dispone de un _marketplace_ con distintas _workflows_ a poder usar fácilmente,
- y no dispone de créditos que se acaben (Buddy sí pero la versión de prueba da suficiente a corto plazo, pero no a largo plazo)