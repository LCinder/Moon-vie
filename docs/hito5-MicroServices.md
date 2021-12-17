
# :book: Hito 5 : Microservicio :book:

***

## Elección framework microservicio

### Koa


Existen numerosos *frameworks* que existen para *node.js* 
para la creación de microservicios, *API's* y *routing.* Cada uno tiene sus características, 
ventajas, desventajas, etc. por lo que es necesario analizar las necesidades
del sistema, testear varios frameworks y realizar _microbenmchmarks_ para elegir empíricamente
cuál es el mejor para nuestro servicio.

He probado muchos, no voy a nombrarlos todos, pero entre ellos estaban *sails.js*,  *ringo.js*, 
*moleculer.js*, *meteor.js*,  *vulcan.js*,  *adonis.js*, etc. 
Todos los he descartado, ya que o la documentación era muy mala o escasa, 
o sobre todo era difícil de crear un sencillo ejemplo, por lo que ya usarlo para un proyecto me parecía que me
darían bastantes problemas. Se probó también con _nest.js_ y siendo un candidato a utilizar, se descartó 
debido a que se trata de un framework que permite crear proyectos muy rápidamente con patrones ya definidos, , por lo que pasé a buscar otros *frameworks* y básicamente encontré  3 uqe me parecieron muy sencillos de usar:
además de que se sigue una estructura muy parecida a la del framework de _frontend Angular,_ lo que crea demasiados archivos
por defecto que por ahora no se necesitan. Por tanto, finalmente nos quedamos con 3 por su sencillez, utilidad y documentación:
- Koa.js
- Restify.js
- Fastify.js

Pasamos a analizar cada uno de ellos

### Koa.js
Creado por el equipo desarrollador de *express.js* lo cuál directamente lo hace candidato, ya que se considera una versión más ligera del mismo.
Es muy sencillo de utilizar, y para este y el resto de ejemplos, se aplicará a nuestro sistema de manera que solicitamos una película en concreto,
devolviendo un _JSON_ con la información de la misma,
para que todas las pruebas sean equitativas.

El código queda de la forma:

```
import {Movie} from "./movie" ;
import {Movies} from "./movies";
import koa from "koa";

const serverKoa = new koa();

serverKoa.use(ctx => {
    try {
        ctx.code(200).body(controller.movies);
    } catch (err) {
        ...
    }
});
```


### Restify.js
Usado por *npm* y *Netflix,* me pareció que si una empresa tan grande lo usaba debía ser porque aporta funcionalidades
importantes y/o destaca por encima de los demás. Está destinado a la creación de *RESTFul API's.*


El código queda de la forma:

```
import {Movie} from "./movie" ;
import {Movies} from "./movies";
import restify from "restify";
import {Controller} from "./controller";
const controller = new Controller();

const server = restify.createServer();

server.get("/", (req, res) => {
    try {
        res.code(200).send(controller.movies);
    } catch (err) {
        res.code(400).send({error: err.message, code: 400});
    }
});
```



### Fastify.js
Dice ser el *framework más rápido actualmente* 
superando en casi el doble de rapidez a *express.js,* 
proporcionando en consecuencia un enrutamiento más rápido, 
además de tener una sintaxis más limpia para escribir código asíncrono. Otra funcionalidad importante que se
comentará posteriormente es la posibilidad de testear una _API_ sin tener que levantar el servidor.

El código del ejemplo queda de la forma:

```
import {Movie} from "./movie" ;
import fastify from "fastify";
import {Controller} from "./controller";


export const server = fastify();

const controller = new Controller();
/**********************************************************************************************************************/
/**********************************************************************************************************************/
server.get("/movies", async (request, reply) => {
    try {
        request.log.info("Movies sent");
        reply.code(200).send(controller.movies);
    } catch(err: any) {
        request.log.error(err.message);
        reply.code(400).send({error: err.message, code: 400});
    }
});
```



Ahora vamos a realizar *minibenchmarks* para comprobar cuál objetivamente es mejor **para nuestro sistema*,
atendiendo al nº de peticiones que pueden recibir por segundo, latencia, etc.
Para ello usaremos **autocannon,**  una biblioteca de *node.js* para realizar _minibenchmarks_, 
concretamente vamos a establecer que realice:
- En un máximo de *10s (por defecto)* el mayor nº de peticiones que pueda
- Con *100 conexiones concurrentes,* ya que supondremos que el sistema en producción
soportará ésta carga de un nº de usuarios medio realizando peticiones.

Con todo lo anterior, ejecutamos _autocannon_ y obtenemos los resultados para todos los frameworks:

- Ejecutando para *Koa.js:*



- ![Koa Benchmark](https://github.com/LCinder/Order-n-Go/blob/master/docs/img/koaBenchmark.PNG)

- Ejecutando para *Restify.js:*


- ![Restify Benchmark](https://github.com/LCinder/Order-n-Go/blob/master/docs/img/restifyBenchmark.PNG)

- Ejecutando para *Fastify.js:*


- ![Fastify Benchmark](https://github.com/LCinder/Order-n-Go/blob/master/docs/img/fastifyBenchmark.PNG)




Como se puede ver, *fastify.js* hace honor a su nombre y es el más rápido de los 3, ya que atendiendo al nº de peticiones 
realiza 2k peticiones más que *koa.js* y  6 más que *restify.js* superando a éste por mucho. 
En cuanto a **latencia media,** *fastify* y *koa* se mantienen prácticamente igual con un valor alrededor de los `58ms`,
y *Restify* se queda muy atrás en media de peticiones/s, por lo que *Restify* queda desclasificado. 

Entre los 2 anteriores, `fastify.js` queda por encima de _koa.js_ en rapidez, y atendiendo también
a la claridad y facilidad del primer framework, además de que la documentación
es mucho más clara, elegimos `fastify.js` como framework a utilizar.

---


## Diseño general del API


Para crear todo lo relacionado con rutas, _URI's,_ etc. primero debemos entender que queremos un proyecto 
donde  la lógica de negocio no estará relacionada  con la _API_, por lo que crearemos una clase
[controller.ts](https://github.com/LCinder/Moon-vie/blob/master/src/controller.ts)
que nos permitirá realizar ese desacople, donde ésta clase incluirá lo necesario para la API pero supondrá una caja negra
para la misma. Este desacople nos permitirá cambiar, modificar añadir o borrar cualquier elemento del código sin que 
afecte al resto de apartados en ningún aspecto, además de que el código queda mucho más limpio y organizado.
Ésta clase `controller.ts`  contiene todo el código necesario que se usará para las rutas en funciones específicas 
para cada una de las mismas, en donde todas devolverán un código correspondiente al estado devuelto siguiendo los 
[códigos de HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Status) y un mensaje en el cuerpo de la respuesta. 

Además, el cuerpo del _API_ está descrito en la clase [routes.ts](https://github.com/LCinder/Moon-vie/blob/master/src/routes.ts)
incluye todas las rutas a utilizar con los parámetros, etc. y toda la funcionalidad que debería realizarse, 
creando antes un objeto de la clase *controller* anterior mediante la cual se llamarán a las funciones.

---


## Rutas API

Se han creado funcionalidades atendiendo a las **HU's,** creando rutas por cada *HU* para satisfacerla.
Las rutas para nuestro sistema se basan en peticiones para recibir una respuesta (*GET*) de acuerdo
a la petición realizada, las cuáles son:
- `/movies`: Devuelve un array con todas las películas disponibles con la información de cada una(descripción, reviews, título, etc.)
- `/movies/:movie` _(HU4)_: Devuelve una película específica indicando su título y/o año. **IMPORTANTE:** Debido a la utilización de un archivo
_json_ como recuperación de información, cada película vendrá descrita y localizada por un **id único,**
el cuál será el título completo (sin espacios) junto con el año del estreno. Es decir, `TheHobbit:AnUnexpectedJourney(2012)`
es una película, mientras que `Hobbit(2012)` no es una película.
- `/movies/:movie/keywords` _(HU3)_ : Devuelve un array con las palabras clave que definen a la película (recordemos que se extraían
mediante *lda* tanto de las reviews como de la descripción de la película)

Todas las peticiones anteriores devuelve un estado correcto _(200)_ si se ha obtenido lo esperado, 
o un error de tipo _40x_ si ha habido algún error (por ejemplo, se obtiene _404_ y un mensaje de _Movie does not exists_
cuando no existe la película) atrapando el error en un `try/catch.`

Además, se siguen las buenas prácticas en el diseño de la _API,_ como no utilizar verbos, 
utilizar sustantivos plurales `(/movies)` y buscar a través de ellos específicamente `(/movies/Película),`
devolver _JSON_ en todas las peticiones,
realizar `try/catch` si ha habido error y devolver códigos de estado correspondientes, etc.

---

## Configuración distribuida
Como configuración distribuida, se utilizará para establecer el puerto y el host en donde
se ejecutará la aplicación.

Para ello, se utilizará `etcd` que se trata de un almacén clave-valor distribuido que permite
una configuración compartida, entre otros. Se establece 
en [etcd-service.ts](https://github.com/LCinder/Moon-vie/blob/master/src/etcd-service.ts)
y se exporta la configuración de manera `export ETCDCTL_API=3` para que el cliente funcione.

Nos permite centralizar la configuración garantizando la seguridad, consistencia y tolerancia a fallos.
Es además rápida y fiable. Nos servirá en el hito siguiente para la composición de contenedores,
por lo que probablemente tendremos que extender su funcionalidad más específicamente, pero por ahora
crearemos una clave `HOST:PORT` para iniciarnos en la configuración y comprobar que funciona de manera básica.

Se han realizado además tests para comprobar el correcto funcionamiento básico de la configuración
distribuida, en el archivo [etcd-tests.ts](https://github.com/LCinder/Moon-vie/blob/master/test/etcd-tests.ts)
donde se han realizado los test siguientes

```
describe("Test basicos Etcd3", async () => {
    let service: EtcdService = new EtcdService();
    it("Deberia existir",() => {
        assert.exists(service);
    });
    it("Deberia devolver un cliente", () => {
        const res = service.client;
        assert.instanceOf(res, Etcd3);
    });
    it("Deberia funcionar etcd3", async () => {
        const key: string = "Testing";
        const expected: string = "Ok";
        process.env[key] = expected;

        const res = await service.get(key);
        assert.equal(res, expected);
    });
});
```

Y vemos cómo pasan los test correctamente:

![Test etcd funcionan](https://github.com/LCinder/Moon-vie/blob/master/docs/img/tests-etcd-funciona.PNG)

---

## Logs

A estas alturas del desarrollo del sistema, y con la previsión de un futuro despliegue del mismo,
es necesario y conveniente tener un registro de la información, errores, y _warnings_ del mismo
para la solución de posibles _bugs_ por ejemplo.

Para la elección de un framework de _logs_ hay que tener en cuenta
algunas necesidades, como mostrar la información, formatearla o almacenarla, entre otros.
También puede ser interesante tener en cuenta el rendimiento o velocidad, ya que se utiliza
mucho durante la ejecución del sistema. Es por eso que elegir un adecuado framework es imprescindible, por lo que
estudiaremos varios frameworks actualmente disponibles para *node.js* y aunque muchos ofrecen
características similares, existen diferencias a tener en cuenta. Los frameworks analizados son:

- **Winston:** Es sin duda el más popular. Ofrece muchas características y configuraciones, como
el formateo de la información, almacenamiento en archivos de la misma, etc. Permite manejar excepciones, 
crear errores personalizados, etc.
- **Bunyan:** Otro _logger_ muy utilizado por sus funcionalidades. Los logs siguen el estilo JSON. Como ventajas frente a _winston_
destacan actualizaciones más frecuentes, menos dependencias, y sobre todo la utilización de _childs loggers_
que amplían la funcionalidad aportando más información, permitiendo crear campos personalizados en el _log._
- **Pino:** Logger no tan potente como los anteriores, pero debido a que está enfocado a la velocidad y rendimiento, indicando
en su [página oficial](https://getpino.io/#/?id=low-overhead) que es hasta 5 vecees más rápido que sus competidores.
Además, el framework de microservicios elegido `fastify.js` utiliza por defecto `pino` como logger, debido precisamente
a la mejora de velocidad en todos los ámbitos.

Entre los 3 anteriores, es difícil elegir uno antes que otro, pero debido a la integración de `pino`
con `fastify` sin tener que instalarlo como módulo ya que está integrado y la buena combinción entre
los 2 para la mejora del rendimiento y velocidad, además de la sencilla utilización de `pino,` me hace decantarme
por el mismo. Se instalará además `pino-pretty` que es una dependencia ligera que permite formatear el mensaje
de log, pasando de uno del tipo:
``` 
{"level":30,"time":1639132432018,"pid":7416,"hostname":"DESKTOP-6DLA2TU","reqId":"req-2","req":{"method":"GET","url":"/movies","hostname":"localhost:80","remoteAddress":"127.0.0.1"},"m
sg":"incoming request"}
 ```

a otro del tipo:

```
[10-12-2021 10:34:59] INFO: incoming request [GET /movies ]
[10-12-2021 10:34:59] INFO: Movies sent [  ]
[10-12-2021 10:34:59] INFO: request completed [  200]
 ```

lo cuál era un requisito a tener en cuenta, y `pino` también es capaz de realizarlo.
Entre otras opciones, se ha cambiado el display de la hora, y se ha eliminado el pid del proceso y el
nombre del host, además de incluir el tipo de ruta, código y mensaje de la petición realizada. 

## Test API

Por último, se van a testear las rutas especificadas, asegurando  que se obtienen los códigos adecuados, 
tanto de error como los correctos, y probando diferentes tipos de películas (existentes y no existentes)
y se ha creado un archivo [api-Test.ts](https://github.com/LCinder/Moon-vie/blob/master/test/api-test.ts) que contiene
todos los tests necesarios para comprobar el funcionamiento de la _API._


Para ello, `fastify.js` incluye una funcionalidad que también hizo imprescindible su elección, 
la cuál se trata de `inject,` que permite comprobar el funcionamiento de la _API_ sin necesidad
de levantar un servidor, testeando las rutas como funciones pasando por argumento un _url_ de la ruta de la forma:
```
const res = await server.inject({
    url: "/movies/TheHobbit:AnUnexpectedJourney(2012)/keywords"
});
```

donde `res` es un objeto del mismo tipo que el devuelto cuando el servidor está escuchando, teniendo como propiedades
un código, _body_, etc. Por tanto, ésta es la manera de testear nuestro sistema.
Como los test de la _API_ siguen siendo test, se incluye dentro de la tarea del _task runner_
`gulp` la ejecución de esos mismos test, observando que pasan correctamente:

![Tests API Funcionan](https://github.com/LCinder/Moon-vie/blob/master/docs/img/tests-API-funciona.PNG)


Y que además los test son útiles ya que al ejecutar test de cobertura se obtiene un 100% de cobertura del código:


![Tests API Cobertura](https://github.com/LCinder/Moon-vie/blob/master/docs/img/tests-API-coverage.png)


