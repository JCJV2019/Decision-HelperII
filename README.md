# Decision Helper by Giacomo y Carlos

![Logo](https://jcjv2019.github.io/ejemploMD/imagenes/Logo.jpg "logo")

Aplicación de Angular 8 para la ayuda a la toma de decisiones.

Se ha de introducir la pregunta o decisión a tomar

	Se introducirán los aspectos positivos con una valoración para cada uno de 1 a 4.
	Se introducirán los aspectos negativos con una valoración para cada uno de 1 a 4.
	Una vez introducidos los aspectos se pulsará el botón de Consejo y la aplicación dará un coeficiente 
	para positivos y uno para negativos.
	Si la diferencia en valor absoluto es menor de 1 no dará un valor positivo o negativo.
	Siendo mayor de 1 será positivo o negativo en función de los operadores.

## Primeras ideas (Wareframes)

![Wireframe1](https://jcjv2019.github.io/ejemploMD/imagenes/Wireframe1.jpg "wireframe1")

# Iteración 1

Aplicación con CRUD para los items Positivos y Negativos. Estructura de los Items:
  'id': string;
  'desc': string;
  'point': number;
  'question': string;
Menu en dos componentes navbar y side-navbar; con Home, Helper, Login/Logout y Register

    El directorio de json-server contiene la API para Logearse con los usuarios y los items positivos y negativos para el entorno de desarrollo

    Se ha hospedado la API en Heroku en la dirección https://json-server-decision-helper.herokuapp.com/
    Se ha hospedado la aplicación en GITHUB en https://jcjv2019.github.io/Decision-Helper/

## Sabado y Domingo

Comenzamos la carga de los Módulos:

    Commons: Home, navbar, notfound, side-navbar
    members: member-list
    services: api, auth
    shared: clases: negatives, positives
    guards: auth
    interfaces: user
    material: material
    users: login, register

Generamos todo el routing.
Comenzamos a trabajar en nuestro componente members-list
haciendo una primera versión de presentación sin bootstrap:

![Sin Bootstrap](https://jcjv2019.github.io/ejemploMD/imagenes/Imagen1.jpg "Sin Bootstrap")

Problemas: 

Ajustes de routing.
Cuando volcamos el radio button, problema de funcionamiento...
Ajustes de refresco de los inputs...

![Pizarra1](https://jcjv2019.github.io/ejemploMD/imagenes/Pizarra1.jpg "Pizarra1")


## Lunes

Realizamos ajustes a la presentación obtenemos una primera versión con bootstrap.
Ajustes del menu navbar y side-navbar
Añadimos el boton de borrar la pregunta y recomenzar de nuevo

![Bootstrap1](https://jcjv2019.github.io/ejemploMD/imagenes/Imagen2.jpg "Con Bootstrap 1ª")

Problemas: 

Cuando haciamos Logout desde el side-navbar no se enteraba el navbar y no se coordinaban en el estado controlado por isLogged.
Al añadir el botón de borrar la pregunta no refrescaba la vista, ya que no utilizamos Form.

## Martes

Terminamos ajustes de Login y Register; register con Nombre, email y password.
Resolvemos el problema entre el navbar y el side-navbar. Para cambiar el valor de isLooged del navbar desde el side-navbar utilizamos:

    @ViewChild('NavbarComponent', {static: true}) public navbar: NavbarComponent.

Este decorador nos da acceso al componente que queramos desde otro.

Resolvemos el refresco de la vista con una promesa que encontramos:

    this.routeOut.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
      this.routeOut.navigate(['/member-list']));

Esta fromesa nos permite refrescar la vista de /member-list

![Final1](https://jcjv2019.github.io/ejemploMD/imagenes/Imagen3.png "Final Bootstrap")
![Final2](https://jcjv2019.github.io/ejemploMD/imagenes/Imagen4.png "Final Bootstrap")

Problemas:

En la subida a producción error de MIME.

## Miercoles

Solventamos el error de MIME. Se trataba de la imagen en svg que no era soportada y la hemos cambiado por un jpg.
Ultimas pruebas y subida a producción.

# Iteración 2 (En un futuro)

Hacer que la aplicación pueda guardar n preguntas asociadas a un usuario concreto. Cada usuario tendrá sus preguntas. (Multiusuario-Multipreguntas).

# Iteración 3 (En un futuro)

Hacer una estadística de preguntas, items y puntuación, valoraciones positivas, negativas y neutras...
