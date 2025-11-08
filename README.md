# Apiapp

APK desarrollada con Ionic - Angular con la funcion de consumir distintas API's de las tematicas: chistes, fotografias de gatos y fotografias de perros.

## Integrantes

-   Joshua Morocho
-   Kevin Muñoz

## 1) Login

En el archivo **login.page.ts** se maneja la logica para loggear al usuario cuando este este registrado en la aplicación y tambien ofrece la opcion de recuperar la contraseña si la olvida, por lo tanto, dentro del codigo:

En las importaciones se usó el servicio llamado **AuthService** que maneja las peticiones a la API para autenticar al usuario, luego se crea el formulario llamado *credentials* con los campos de email y password:

<img width="490" height="296" alt="image" src="https://github.com/user-attachments/assets/26ad301b-ecf4-41a0-ac11-d14628af56b5" />

Luego estan las funciones como **login()** y **forgotpassword()** que llama a authService.login(email,password) la cual se conecta con la API para validar las credenciales. Tmabien esta el escenario cuando el usuario ingresa su correo y si lo envia se llama a **authService.resetPassword(email)** para que la API mande un correo de recuperacion, si algo falla se muestra el mensaje de error:

<img width="541" height="730" alt="image" src="https://github.com/user-attachments/assets/2bc604b1-6c84-4e1b-afc5-dbcebaff222a" />
<img width="628" height="825" alt="image" src="https://github.com/user-attachments/assets/e0c68ef6-3a68-4a5f-b86a-2463c4c32cd4" />

Y finalmente estan los getters que faclitan el acceso a loa valores y validaciones del formulario desde **login.page,html**.

## 2) Register

En el archivo **registrer.page.ts** se maneja la logica para registrar al usuario cuando este complete lps campos requeridos y permite crear una cuenta nueva usando un correo y contraseña, valida los datos y muestra mensajes según el resultado, por lo tanto dentro del codigo:

Al igual que en la pagina de Login se usa el servicio **AuthService** para registrar al usuario, entonces, se crea el formulario con los tres campos obligatorios: email, password y confirmpassword

<img width="460" height="334" alt="image" src="https://github.com/user-attachments/assets/07b59151-2a8b-405d-bb05-e689274e1306" />

La funcion *registrer()* llama a **authService.register(email, password)** y si el registro es exitoso, cierra el loading, muestra un mensaje de exito, informando que se envio un correo de verificacion:

<img width="833" height="587" alt="image" src="https://github.com/user-attachments/assets/314841a8-def6-43a9-874b-f21cacf835cd" />

Finalmente los getters para acceder a los campos del formulario como el mostrar los errores o las validaciones.

<img width="353" height="252" alt="image" src="https://github.com/user-attachments/assets/74d74d0f-91de-4d60-9408-1ca99fdd48ee" />

## 3) Api's

El servicio de las API's estan en el archivo **api.service.ts** en donde su funcion principal es conectarse a las distintas apis y traer de la internet datos que luego se muestran en la app.

Los gets llaman a las API's y retorna un observable que es como un canal de los datos al que la app puede suscribirse para recibir la respuesta, tambien con la informacion de la imagen gato y las imagenes aleatorias del perro.  

<img width="505" height="303" alt="image" src="https://github.com/user-attachments/assets/8d781345-99e8-4f18-84f5-d46532b91c41" />

### Api Cats

Em el archivo **cats.page.ts** se define la página que muestra imágenes de gatos en la aplicación.

Cada vez que se abre o se actualiza la página, obtiene una imagen aleatoria de un gato desde una API externa.

Se crea la variable *catImage* que guardará la URL de la imagen del gato que se obtiene de la API y se usa en el HTML para mostrar la imagen en pantalla.

<img width="212" height="27" alt="image" src="https://github.com/user-attachments/assets/4172d57f-85e2-44bd-8824-5085c6930721" />

Luego el metodo *ngOnInit()* llama a **getNewCat()** para obtener la primera imagen apenas se entra a la interfaz y la funcion de este metodo llama a **getCat()** del ApiService, que obtiene una imagen aleatoria. Como la api devuelve un arreglo, accede a la primera posición **response[0].url** para guardar la URL de la imagen.

<img width="476" height="309" alt="image" src="https://github.com/user-attachments/assets/0fa7bef6-d903-4b92-af70-21dda19aaeab" />

Y asi en la pagina **cats.page.html** se muestra gracias a esta logica donde se llama a la variable antes mencionada y la "pintamos" en la interfaz:

<img width="321" height="183" alt="image" src="https://github.com/user-attachments/assets/a60a2c0c-57fe-4098-b17f-a53f69a99f00" />

### Api Dogs

En el archivo **dogs.page.ts** se define la interfaz que muestra imagenes de perros en la aplicación.

Al igual que la API Cats, trabaja con la misma logica el API Dogs, donde se crea la variable DogImage y guarda la URL de la imagen, luego se usa la logica anterior para el metodo *ngOnInit* de la siguiente manera:

<img width="499" height="314" alt="image" src="https://github.com/user-attachments/assets/5faba5cf-8da2-4186-8c79-ae5e1f04ece7" />

Y se muestra en dogs.page.html de la siguiente manera:

<img width="320" height="187" alt="image" src="https://github.com/user-attachments/assets/7f93cff1-ff07-4d48-a499-a259b78cd825" />

### Api Joke

En el archivo **jokes.page.ts** se define la logica de la interfaz que muestra la respuesta de la api de chistes en la aplicación.

Y nuevamente al igual que las API's anteriores, se trabaja con la misma logica para API joke donde la diferencia esta en la variable creada para guardar la informacion del chiste que llega desde la api y puede ser en texto o en un objeto con varias partes.

<img width="81" height="34" alt="image" src="https://github.com/user-attachments/assets/51c91d0c-a53f-4b90-b691-4bc2ea8a82ad" />

Usa el método getJoke() del ApiService para pedir un chiste aleatorio, cuando recibe la respuesta, la guarda en la variable joke.

Y si ocurre un error (por ejemplo, si la API no responde), lo muestra en la consola.

Luego en el archivo **jokes.page.html** pintamos la informacion de la variable de esta manera:

<img width="417" height="249" alt="image" src="https://github.com/user-attachments/assets/fda7a98a-31ca-4ee2-b0ec-c64cf84b2786" />




