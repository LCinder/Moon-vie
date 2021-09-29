
# :globe_with_meridians: Creación repositorio :globe_with_meridians:

***



Vamos a realizar la autenticación por _ssh_ ya que es mucho más segura y
nos va a prmitir tener controlados los dispotivos que modifican nuestros repositorios.

Como podemos ver en la siguiente imagen, intentamos clonar el repositorio y no nos lo permitirá 
ya que no hemos incluido las claves necesarias y no está nuestro dispositivo autentificado, si vemos en la carpeta
_.ssh (donde se guardan las claves ssh generadas)_ no existe ninguna clave creada, así que vamos a crearla.

![hito0](https://github.com/LCinder/No-se-que-hacer/blob/master/docs/img/hito0_0.PNG)


Esto se hace de la siguiente manera:




` ssh-keygen -t rsa -b 4096 -C "email@gmail.com"`

Donde _-t rsa_ indica el tipo de algoritmo para generar claves públicas, 
en este caso_rsa_ que se trata de un algoritmo típicamente utilizado y aunque es un poco antiguo 
es el más utilizado y aceptado, _-b 4096_ indica el tamaño de _bits_ de la clave, _4096_ 
es un valor aceptable.

De esta manera se genera una clave pública almacenada por defecto en la carpeta _.ssh_ cuyo valor 
tendremos que copiar para posteriormente incluirla como clave SSH en configuración 
de GitHub.

Una vez generada la clave, podemos ver que nos aparece nuestro dispositivo enlazado y el día
de su creación (Ordenador Nuevo - 29/09/2021) por lo que toda la configuración es correta.

![hito1](https://github.com/LCinder/No-se-que-hacer/blob/master/docs/img/hito0_1.PNG)



Ahora podemos acceder a nuestro repositorio y realizar cualquier tipo de cambio, como por ejemplo clonarlo 
localmente, y sí nos permitirá hacerlo como se ve en la siguiente imagen.


![hito2](https://github.com/LCinder/No-se-que-hacer/blob/master/docs/img/hito0_2.PNG)

