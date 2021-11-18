
# :whale2: Hito 3 : Docker :whale2:

***


## Elección contenedor base

Existen diferentes tipos de imágenes a usar, depende tanto del uso que queramos hacer, 
como del tamaño, el tiempo de ejecución, los módulos a incluir y a usar, etc.
Por eso debemos testear y probar diferentes tipos de imágenes para ver cuál es la que mejor se ajusta a nuestro objetivo a realizar.

Además las imágenes están destinadas a un uso específico, incluyendo herramientas que suelen usarse
juntas, para evitar instalar las dependencias necesarias. Veremos una imagen que contiene los módulos
que justamente se utilizan en este proyecto, y la compararemos con otras imágenes.

Como en este proyecto se utiliza el entorno _node.js_ vamos a utilizar diferentes tipos de imágenes
del mismo, que se comentan
a continuación.

***
### node: \<version>

Es la imagen por defecto. Puede ser usada tanto como contenedor como base para crear
otras imágenes. Se recomienda usarla si no se tiene ni idea de lo que necesitamos, ni paquetes ni nada,
al incluir todo lo necesario para crear aplicaciones _node_.



---
### node:alpine
Ésta imagen está basada en el proyecto Alpine de Linux que tiene un tamaño muy inferior a muchas imágenes y nos 
permite crear contenedores extremadamente ligeros. Solamente tenemos que indicar las cosas que 
necesitamos en el Dockerfile para poder usarla sin problemas. Incluye tanto Node.js como npm como gestor de paquetes.
Adecuado para restricciones de espacio ya que pesa muy poco.

---
### node:slim
Ésta imagen no contiene ningún paquete común incluido. Trae lo mínimo imprescindible para ejecutar node. Está dirigida 
a entornos en los que la restricción de espacio es extremadamente importante (parecido al anterior).

---
### alpine
Imagen no oficial del lenguaje _node.js_ pero muy utilizada actualmente, ya que pesa únicamente 5MB, además
de ser completamente personalizable.


---

### Comparación imágenes y Dockerfile

Para la creación de las imágenes, vamos a partir de las anteriores y crearemos diferentes archivos de configuración 
(Dockerfiles) para crear diferentes imágenes docker que utilicen las distintas imágenes base anteriormente comentadas, 
y las analizaremos y compararemos **en función de 2 restricciones: espacio y tiempo.**

¿Por qué reducir en espacio?
Principalmente por 3 temas:
- Seguridad, ya que las imágenes más pequeñas vienen con menos bibliotecas,
lo cuál permite menos agujeros de seguridad. Esto se observa en DockerHub, donde las imágenes más grandes
están predispuestas a tener más vulnerabilidades.
- Rendimiento y eficiencia: En construcción y en uso de memoria.
- Mantenibilidad: Se tiene más control cuando se usan menos bibliotecas, ya que es más fácil
administrarlas.


Los archivos Dockerfile creados mantienen conjuntos de operaciones en común, ya que desde su creación
se pretende optimizarlos al máximo y aplicar una serie de buenas prácticas que se comentarán posteriormente.

En concreto, el Dockerfile utilizado para la imagen _alpine_ es el siguiente: 

```
FROM alpine AS base_image

# Se crea el usuario con privilegios especificos para el directorio node_modules
RUN adduser -S node && apk add --no-cache --update nodejs npm make && mkdir /node_modules && chown node /node_modules

USER node

# Multi-stage: Optimizacion imagen al isntalar en imagen intermedia
# los modulos
FROM base_image as install

COPY package*.json ./

# npm ci es especifico para entornos CI
RUN npm ci && npm cache clean --force

FROM base_image

# De la etapa anterior se copia la carpeta con los modulos
COPY --from=install /node_modules /node_modules

# Se cambia el directorio de trabajo
WORKDIR /app/test

ENV PATH=/node_modules/.bin:$PATH

CMD ["gulp", "test-ts"]


 ```


Donde hay que tener en cuenta las siguientes instrucciones y optimizar la imagen
de la siguiente manera:

- `FROM x` indica el inicio de una etapa de construcción y establece una imagen base.
- `RUN x` se ejecuta cuando se está construyendo una imagen para realizar una acción, creando una capa nueva. 
Se pasa como comando al sistema y se ejecuta. Una buena práctica (en adelante, BP) implica
ejecutar varias instrucciones en un solo `RUN` para minimizar el nº de capas.
- `WORKDIR` que establece un directorio de trabajo para otras instrucciones de Dockerfile, como RUN y CMD,
y el directorio de trabajo para ejecutar instancias de la imagen del contenedor.
Establecemos un `WORKDIR` explícitamente, ya que por defecto se crea y es mejor tenerlo creado por nosotros mismos.
- `COPY x y` que copia archivos y directorios en el sistema de archivos del contenedor. 
Los archivos y los directorios deben encontrarse en una ruta de acceso relativa al archivo Dockerfile.
Se pueden copiar archivos desde una imagen anterior, creando _etapas intermedias_ que se almacenan
en caché y no están presentes en la imagen final, ahorrando espacio. Hay que incluir los mínimos archivos necesarios. 
Ésto es referenciado con `--from etapa_anterior` y  es una _BP_ llamada **multi-stage.**
- `USER` que establece el usuario para ejecutar los contenedores de la imagen. En el caso de _alpine_ es necesario 
crearlo y gestionar los permisos, etc.
- **BP:** NUNCA utilizar usuario _root_ para nada (por temas de seguridad). Creamos un usuario (en este caso _node_) con
los permisos justos (sobre el directorio _node_modules_) y todo se ejecuta con el
usuario no privilegiado. Además, de manera predeterminada  las imágenes _node_ incluyen un usuario _node_ no root 
ya que se prefiere restringir las capacidades del contenedor sólo a las imprescindibles necesarias para mantener 
una seguridad recomendada.
- `CMD ["...", "..."] ` que se encarga de pasar valores por defecto a un contenedor, pudiendo pasar ejecutables. 
A diferencia del comando `RUN`, los comandos que se pasen de esta manera se ejecutan una vez que el contenedor 
se ha inicializado, mientras que `RUN` se utiliza para crear la imagen de un contenedor.

Otras **BP**:
- Con ` npm cache clean --force ` podemos limpiar la caché una vez instalados los módulos, ahorrando bastante espacio, 
ya que me dí cuenta que ésto parece que no, pero ocupa bastante en memoria.
- Al instalar las dependencias necesarias, se utiliza `npm ci` en vez de `npm i`
que está destinado a ser utilizado en entornos CI, para garantizar una instalación
limpia de las dependencias. Es mucho más rápido cuando existe un `package-lock.json` y la carpeta
`node_modules` está vacía, como es el caso.
- Elegir imagen ligera: Por esto mismo hemos elegido varias imágenes base que se basan en alpine, ya que son muy ligeras
y mejoran en gran medida el tamaño del contenedor.

Una vez creadas las diferentes imágenes, podemos clasificarlas en base a los requisitos comentados anteriormente, 
obteniendo la siguiente tabla:


| Imagen | Build (s) | Size | Ejecución (Media 5 ejecuciones) |
|:---------:|:---------:|:--------:|:------------:|
| node | 388.5s |  1.19GB | 3.3s |
| node:slim | 150.5s | 440MB | 2.87s |
| node:alpine | 111.1s |  367MB | 3.33s |
| alpine | 69s |  144MB | 3.2s |

Las imágenes están ordenadas por contenido de las mismas, siendo _node_ la que contiene
cualquier paquete para ejecutar cualquier imagen y _alpine_ la que no contiene prácticamente nada,
se le deja todo al usuario.

![Imagenes Docker](https://github.com/LCinder/Moon-vie/blob/master/docs/img/docker-images.PNG)

Se puede ver cómo la imagen _node_ pesa significativamente más que cualquiera, ya que
contiene demasiados paquetes que en este caso nunca serán utilizados, implicando también
que la _build_ sea más lenta al tener que descargar la imagen. Conforme vamos utilizando
imágenes más simples, tanto la _build_ como el tamaño decrece, lo cuál cumple 1 requisito
que necesitábamos. El otro es el tiempo, siendo curioso cómo la imagen _slim_ es la que tarda
menos que cualquiera. En este caso, nos quedaríamos entre _node:slim_ y _alpine_, y viendo
que aunque es un **11%** más lenta, _alpine_ es un **305%** más ligera que _node:slim:_
lo cuál implica mucha más diferencia, y como los _test_ se ejecutan rápidamente, preferimos la imagen más ligera,
siendo **alpine** la elegida.


Los test se han ejecutado directamente desde el script tests.ts sin transpilarlo, ya que al no tener
permisos de escritura en el directorio /app/test/ se intentó crear los archivos .js en otro llamado
/app/dist/. Aunque ésto sí funciona se descartó, ya que era necesario o bien copiar el archivo movies.json
(datos de películas) al mismo
directorio /app/dist/ ya que si no no lo encontraba, o bien cambiar la ruta desde la que se importa
movies.json  en todos los archivos que lo utilizan lo cuál no era buena idea, ya que si no en local
no funcionaría al ser directorios diferentes. Como existe un plugin llamado _gulp-mocha_ que permite
ejecutar los test desde typescript, se optó por éste método, ya que no se veían factible los anteriores.


Ejecutamos los test con el contenedor creado, y obtenemos que se pasan satisfactoriamente:

![Docker Tests](https://github.com/LCinder/Moon-vie/blob/master/docs/img/docker-test.PNG)

También se puede comprobar en la
[_action_](https://github.com/LCinder/Moon-vie/runs/4250487253?check_suite_focus=true#step:7:26) creada para desplegar y ejecutar el contenedor:


## Contenedor Subido y Actualización Automática

Además, para que se suba la imagen automáticamente cada vez que se actualice el _Dockerfile,_
nos ayudamos de los _webhooks_ de _GitHub Actions._

Antes estaba puesto a que se lanzaran cuando se cambiaba el Dockerfile, 
pero he visto más necesario que se lance cuando desde cualquier commit se incluye `[docker deploy]` cuando se hace push a la rama master.

Es necesario antes haber proporcionado el _username_ y la contraseña en el apartado _secrets_ del repositorio.

```
name: Publish Docker image

on:
  push:
    branches:
      - master
      
jobs:
  push_to_registry:
     - name: Push Docker image to Docker Hub
        runs-on: ubuntu-latest
        if: contains(github.event.head_commit.message, '[docker deploy]')
        steps:
        ...
```

Las versiones utilizadas para los _webhooks_ y obtenidas de los repositorios de _docker_ son
las siguientes:
- actions/checkout@v2
- docker/login-action@v1
- docker/metadata-action@v3
- docker/build-push-action@v2

Se utilizan esas versiones con esos tag's específicos ya que son las más adecuadas [según el mismo repositorio](https://github.com/docker/login-action)
y las más utilizadas por la comunidad.

Además, se ha creado dentro del mismo _webhook_ un _step_ tanto para ejecutar el contenedor una vez desplegado
como para subir la imagen también a
*GitHub Container Registry,* incluyendo lo siguiente:
```
- name: Login to GHCR
      uses: docker/login-action@v1
      with:
        registry: ghcr.io
        username: ${{ github.repository_owner }}
        password: ${{ secrets.GHCR_TOKEN }}
        
   ...
    with:
        images: |
            lcinder/moon-vie
            ghcr.io/lcinder/moon-vie
        tags: |
            latest

- name: Run docker tests
    run: docker run -t -v `pwd`:/app/test lcinder/moon-vie
```

Modificando los _tags y las _images_ a hacer _push_

Y nos aseguramos que está la imagen subida a _DockerHub_

![Docker Push 1](https://github.com/LCinder/Moon-vie/blob/master/docs/img/docker-push1.png)

Y que el _webhook_ funciona:

![Docker Push](https://github.com/LCinder/Moon-vie/blob/master/docs/img/docker-push.PNG)


---

## GitHub Container Registry

Para subir la imagen a un registro alternativo se ha optado por GitHub Container Registry ya que se valoró subirlo a 
Azure, pero existía una versión de prueba al igual que AWS, por lo que al final se ha decidido subido a ghcr 
y enlazarlo a GitHub.

A continuación se demuestra cómo se despliega nuestro contenedor a GitHub Container Registry:

Se siguen los siguientes pasos incluidos en la documentación oficial:

- Creamos un TOKEN desde el apartado _Developer Settings_ en GitHub y lo copiamos y guardamos en una variable 
de la manera: `export TOKEN=TOKEN`

- Nos logueamos con nuestro _TOKEN_ en docker para poder subir la imagen de la forma: 
`echo $CR_PAT | docker login ghcr.io -u lcinder --password-stdin`

- Una vez realizado lo anterior simplemente nos queda subir la imagen con la extensión adecuada: 
`docker push ghcr.io/lcinder/moon-vie` y comprobamos que se ha subido correctamente:


![Login docker](https://github.com/LCinder/Moon-vie/blob/master/docs/img/ghcr_login.PNG)

Ahora nos queda enlazarlo a GitHub para que nos aparezca como _Package,_ simplemente hay que cambiar
la visibilidad del paquete a _público_ y conectarlo al repositorio, quedando de la forma:


![Packages](https://github.com/LCinder/Moon-vie/blob/master/docs/img/ghcr_packages.PNG)


Y si vamos al repositorio en la parte derecha nos aparecerá el paquete subido:
![GHCR Settings](https://github.com/LCinder/Moon-vie/blob/master/docs/img/ghcr_settings.PNG)
