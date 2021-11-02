
# :globe_with_meridians: Hito2 : Test :globe_with_meridians:

***

Para realizar pruebas unitarias o *test unitarios,* normalmente se utilizan diferentes
métodos que son englobados jerárquicamente, donde la biblioteca de aserciones comprueba
a bajo nivel que las estructuras de datos, objetos a utilizar, etc. son los correctos, 
el marco de pruebas contiene esas pruebas realizadas y las organiza en base
a criterios propios, y el gestor de tareas es el encargado de ejecutar esos *test,* entre otras cosas.

Por tanto se describe a continuación las librerías seleccionadas y su por qué:

### Biblioteca de aserciones
De entre las posibilidades a elegir, se pensó sobre todo en *assert, sinon.js y chai.js.*
La primera permite realizar diferentes tipos de aserciones y pruebas que cubren un amplio
rango de posibilidades, pero en comparación con *chai.js* no ofrece un entendimiento del *test*
tan directo, por ejemplo en *assert* un *test* sería de la forma: `assert(foo === null)` y en *chai.js* sería: `assert.isNull(foo).`

El segundo realiza lo anterior incluyendo funcionalidades llamadas *spies, stubs y mocks*
que permite *espiar* el comportamiento de funciones, las llamadas que se realizan, 
registro de argumentos, etc. lo cual puede llevarse el *test* a un nivel superior. 
Sin embargo, su utilización es bastante compleja y aunque he intentado entenderlo y probarlo, 
no se ha llegado a comprender del todo cómo funciona además de que está destinado a otro tipo
de pruebas más específicas.

Por tanto, se utiliza **chai.js** como biblioteca de aserciones del tipo *TDD*, ya que aunque
permite *BDD* personalmente prefiero la primera. *Chai.js* ofrece muchos tipos de aserciones
y es muy sencilla de utilizar.

### Marco de pruebas
Como marco de pruebas, al estar buscando me di cuenta de que en cualquier web
mencionaban siempre la misma biblioteca. Investigando más llegó a un punto en el que
 hay una que destaca muy por encima de las demás, **Mocha.**
Esta biblioteca tiene un apoyo muy destacable por parte de la comunidad, es sin duda
la más utilizada y su sencillez y las diversas funcionalidades que ofrece hicieron que me decantara
por este _framework._

Otra biblioteca que utilicé en *IV* fue **AVA,** y aunque me gustó su funcionamiento
y fácil configuración y sencillez, me dio demasiados problemas en *docker* lo que imposibilitaba
la creación de contenedores y fue lo que me hizo transladar todos los *test* a **mocha**
que no dio ni un problema.

### Gestor de tareas
Por las razones anteriormente comentadas, mi criterio a la hora de seleccionar
una biblioteca es encontrar cuáles son las más utilizadas por la comunidad (que si son
tan utilizadas es por algo bueno y no van a dar errores inesperados ejem ejem _AVA_) y con ese filtro, selecciono la que más me interesa.
Para este caso, las más comunes de lejos son **Grunt.js** y **Gulp.js**.

Aunque **Grunt.js** pueda considerarse mejor para proyectos pequeños y está dedicado más a 
configuración, **Gulp** es más sencillo de utilizar y configurar, ya que usa menos código, 
además de que en ejecución es más rápido,  provee módulos individuales y dispone de muchos
*plugins* para ralizar tareas específicas que, aunque no me guste tener 27000 *plugins* descargados para hacer una
sola cosa, funcionan bastante bien y son sencillos, por lo que ya tenemos el gestor de tareas elegido. 

El archivo de configuración es **gulpfile.js** que permite crear varias tareas, como por ejemplo:

``` 
gulp.task("default", () => {
    const tsProject = ts.createProject("../tsconfig.json");
    return gulp.src("./*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest("./"));
});
```

Donde la tarea anterior compila todos los archivos de tipo *typescript,* permitiendo
incluir el archivo *tsconfig.json* como configuración y añadir el destino de los archivos transpilados.
Es necesario incluir el *plugin* específico para compilarlo, y todas las configuraciones siguientes
se incluyen mediante *pipes.* De esta forma se utilizará para lanzar los tests una vez transpilados
los archivos de tipo *Typescript,* con el comando:

```
gulp --guplfile src/gulpfile.ts test
```

---
## Test realizados
En este caso se han testeado funcionalidades referentes a la _HU2 (Como usuario quiero, mediante el nombre de una película, obtener información de la misma)_
y la _HU3 (Como usuario quiero saber la clasificación temática que define una película)_ debido a que se tratan de las primeras funcionalidades a implementar.

De esta manera, para la HU2 se comprueba:
- Si una película existe y además
  - Tiene un id
  - Tiene una overview
  - Tiene un array de reviews no vacío
  - Tiene un vote average que es un nº entre 0 y 10

Para la HU3 se comprueba, aplicando ua técnica de extracción de palabras clave (habiendo avanzado el código) si:
- Al extraer palabras clave de una película, se obtiene un array de palabras no vacío
- En el caso concreto de _El Hobbit: Un viaje inesperado_ se obtiene las palabras:
_historia, hobbit, dragon (entre otras muchas)_


Ejecutando la tarea de _gulpfile test_ se obtiene el siguiente _feedback_:

![testCorrectos](https://github.com/LCinder/Moon-vie/blob/master/docs/img/test.PNG)

Donde se observa que se pasan todos los test correctamente.

---

### Cómo realizar tests
Se pretende realizar lso *tests* siguiendo el método FIRST (transparencias de JJ y [blog.softtek.com](https://blog.softtek.com/es/testing-unitario))

**Principio FIRST**
- **Fast:** Permtie rápida ejecución.
- **Isolated:** Cada test es independiente de otros test.
- **Repeatable:** Se puede repetir en el tiempo.
- **Self-Validating:** Cada test debe poder validar si es correcto o no a sí mismo.
- **Timely:** Desarrollar las pruebas antes que el código.

Además se seguirá la idea que **se comprueban comportamientos reflejados en las historias de usuario**