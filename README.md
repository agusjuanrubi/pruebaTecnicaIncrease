# pruebaTecnicaIncrease
Buen dia, gracias por tomarte el tiempo de ver este trabajo. 

<h3>Armado de la API:</h3>

Para el armado use un boilerplate con el que ya habia practicado.
La API está hecha con PERN stack. Está divida en servidor y cliente. Toda la lógica de la obtención de datos y manipulación mas compleja está en el servidor. 

<h3>
Obtencion de Información y manejo:
</h3>

Para poder obtener la información y empezar a cargar la db con los datos, hice una función que se ejecuta cuando se levanta el servidor, y le agregué ua funcion que se ejecuta cada 10 mins, para no perder la información.
Al ejecutarse la función, hago una llamada al endpoint GET /file.txt que me dieron. Recorro todo el archivo, lo desgloso, y por partes lo voy guardando a la db.
(nota: al utilizar el endpoint GET/client/:id, generaba errores, causando que informacion del cliente no la recopilase. Estimo que será una limitacion de la Api de Increase, demasiadas llamadas muy seguido, no lo sé. O quizá es un error mío. Por favor, si me pueden confirmar esto, así se que puedo haber hecho mal.)
Yo consideré que los clientes no se repetían, pero, en caso de repetirse, habría que hacer una función para actualizar los registros del cliente.

<h3>
db
</h3>

Utilicé sequelize como ORM para hacer todo el manejo de la db. Lo trabajé durante el bootcamp y me sentí muy cómodo con los métodos.
En la db cree 4 tablas, siguiendo los 4 tipos de registros que me proveyeron ustedes. Podría haber metido todo en una sola (de hecho, arme el arreglo de todos los objeto clientes, como para crearlo todo de una), pero creo que es mas conveniente tener todos los datos separados, relacionados entre si por el ID del cliente, para poder escalar en un futuro.
Las relaciones entre las tablas, son de n a n entre clientes y pagos, y de m a n entre clientes y transacciones, y clientes y descuentos. 

<h3>
Rutas
</h3>

Al momento solo hay dos rutas que utilizo desde el cliente. Una me trae un array con toda la info de los clientes (la que viene del endpoint GET/cliente/:id), y la otra me trae un objeto con la info de cada cliente en particular, asociando todas las tablas. cree una ruta (getApiInfo) que la utilice para hacer pruebas antes de tener el cliente listo. No está en uso con el cliente funcionando.
Cree mas rutas, pero al final solo necesité esas dos.

<h3>
Respuestas del servidor
</h3>
si puede obtener la info de la db, status 200.
si hay error en la obtención, status 404.
Para cualquier otro error, utilizo un middleware de express, utilizando el next(error), manejando el error desde el middleware.

<h3>
Frontend
</h3>

Para el front, utlicé React y redux para el manejo de estados globales. 
El arreglo de clientes, lo volque a una tabla de material ui, que permite filtrar y ordenar.
El objeto con los datos de cada cliente en particular, en primera medida muestran los datos del endpoint GET/cliente/:id, y luego se puede seleccionar, ver los datos de pago, de transacciones y de descuentos desglosados.

<h3>
Interpretación de tareas
</h3>

Yo interpreté que los montos a cobrar, podían llegar a tener fechas pasadas, por lo que ahi se determinaría si ya había cobrado, o si iba a cobrar. (Traspasé los datos de una llamada a un excel, los parsee e identifique cada dato.Sume y reste todo. Las transacciones aprobadas, son igual al monto total, y los descuentos son igual a los descuentos totales. Restando la suma de transacciones aprobadas a la suma de los descuentos de cada cliente, me da el monto a cobrar/cobrado).

<h3>
Posibles mejoras:
</h3>

-obtención de información y manejo:
    -la información que no se llega a obtener por medio del endpoint de cliente/:id, se puede volver a pedir. Armé un arreglo con esos id. To Do: hacer función que si hay elementos en el arreglo, repetir llamada con el id, y hacer un update al registro de ese cliente.
    -Podría haber descargado el archivo, e ir leyendo linea a linea, y utilizar la info, para no ocupar tanto espacio en memoria al tener que leer todo el archivo de corrido y recorrerlo todo.

-db:
    -Tendría que haber definido la longiutd de caracteres de cada dato a guardar en la db
    -Era mas eficiente no parsear los datos tipo de las transacciones y descuentos, dejarlos con numeros, y al momento de requerirlos usarlos con aprobado o rechazado, o segun el tipo de descuento a aplicar

- respuestas del servidor:
    - no utilicé los status ni las respuestas del servidor en el front. En caso de error, solo le hago un console.log
    -no maneje todas las posibilidades de errores posibles.

-Frontend: 
    -No tuve tiempo de darle mucho CSS. Falta un monton, al momento estoy solo presentando la informacion.

-Interpretación de tareas:
    -Creo que no está muy bien explicado el archivo, y se torna medio engorroso. Tarde en darle una interpretación que me convenciera, y las respuestas a mis preguntas llegaron un poco tarde, por lo que me manejé más que nada con mis interpretaciones.


//////////////////////////////

<h2>Instrucciones:</h2>

- Instalar postgreSQL
- crear una db con el nombre que deseen. Yo le puse nombre increaseApp. Ese nombre hay que ponerlo en la linea 9 del index.js de la carpeta api
-crear un archivo .env en el mismo nivel que el archivo index.js de la carpeta api.
        DB_USER=postgres
        DB_PASSWORD=1
        DB_HOST=localhost

ese es el contenido de como yo configure mi db de postgreSQL. Son los valores por defecto, expceto la password, que la puse yo.

-una vez configurada la db, hay que instalar las dependencias. Pararse en la carpeta api, en la terminal, y utilzar comando npm i. 
- hacer lo mismo en el cliente. dentro de la carpeta cliente, npm i.

- una vez instaladas las dependencias, hacer npm start en la consola del servidor y del cliente
(como mejora, podría haber hecho un comando para que corran los dos a la vez.)






