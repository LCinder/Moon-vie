


***

## CC: A tener en cuenta

---

- El contexto en una HU es sumamente importante, p.ej: semanalmente, 
consulta de datos, etc.
- Producto Mínimamente Viable: Con lo mínimo necesario, se 
deduce qué necesito, es decir, con 2 HU's se deduce qué se va a hacer
- _Domain Driven Design_
- **Issue:** Plantea el problema: Necesito hacer esto, dividir en varios issues lo que quiero hacer

---

- No se cierra el _issue_ hasta que el test este escrito y funcione
- Test Unitario = test de caja blanca: son conscientes del código que ejecutan
- Escribir test sobre HU: Si el usuario quiere esto, el código devuelve esto, y el test lo comprueba
- Objetos valor: Sin logica de negocio, pero se testean, entidades: logica de negocio, clases, agregados
- Al hacer tests, afirmamos que algo no va a cambiar, si se pone el nombre a una
funcion y se testea ya no se cambiara
- Se testea **todo**
- TDD: assert, ...
- BDD: object.to.be.equals...
- Test runner: Cualquier libreria devuelve un objeto del tipo TAP,
y el test runner muestra un informe que dice cuantos han fallado, etc.
- Biblioteca de aserciones y por encima esta el marco de pruebas
- Issue hito 2: Crear un programa que al ejecutar test haga no se que, ...
  - Ese issue no se linkea a ninguna HU
- Las tareas como _si se quiere realizar test hacer no se que_ deben estar bajo un
gestor de tareas, que al ejecutar un comando rapidamente se realice, cmo `npm run test, npm run start,...`
- **NPM, pip:** Gestor de dependencias, para instalar paquetes
- Build manager: Maven, Gradle, Make, ...
- Task runner: No gestiona nada, solo hace tareas. NPM gestiona tareas
pero no del todo, no permite ordenar primero una y luego ejecutar otro, etc.
- Formas imperativo: haz esto, _Grunt,_ declarativa: Yo quiero que pase esto al ejecutar lo otro, _Gulp_
- Metadatos: Nombre proyecto, version, dependencias, ...
- Cuando sucede un bug hay que crear un test que asegure que ese bug no va a 
volver a suceder
- Los issues plantean problemas, el codigo es la solucion al problema, el
commit indica como se ha solucionado
- Se testea el **comportamiento**

---

### Docker

 