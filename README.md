# Informatica-Skill
Proceso de creación de una skill para Alexa del Dpto. de Informática del CIFP Virgen de Gracia de Puertollano (Ciudad Real). 

### Acerca de
Es un ejemplo didático de cómo realizar una Skill con distintas funcionalidades. Técnicamente está orientada a su uso docente y no profesional ya que se pueden optimizar aún más las cosas pero complicaría su código, es por ello que ha primado el efoque docente para conocer el proceso de creación de una Skill de Amazón Alexa. El objetivo marcado es conocer el proceso de desarrollo y diseño de interacción de voz (frontented) y el procesamiento de intenciones y eventos (backend).

Sería interesante haber usado bases de datos o servicios webs para hacer búsquedas más potentes y no ficheros sobre todo para los datos locales JSON. 
Aún así se ha simulado como si estos ficheros nos hubiesen llegado a través de un servicio REST mostrando su procesamiento.
El motio es que no tengas que tener de servicios web para ello y puedas hacerlo más fácilmente.
Asún así se ha usado servicios web para acceso a las noticias del RSS del centro y consulta de lenguajes famosos desde la wikipedia.



## Tecnologías
* Alexa Developer Doc: https://developer.amazon.com/es/documentation/
* Alexa Skill Kit: https://developer.amazon.com/es-ES/docs/alexa/ask-overviews/build-skills-with-the-alexa-skills-kit.html
* Alexa Voice Service: https://developer.amazon.com/es-ES/docs/alexa/alexa-voice-service/get-started-with-alexa-voice-service.html
* Node.js: en el Backend.
* Lambda Function. Como parte del AWS Serveless.

## Seguimiento
* 06/04/2020. Inicio de la Skill y Configuración. Presentación
* 07/04/2020. Manejo de diálogos
* 14/04/2020. Launch, Inicio, Creador. Interfaces y Entonaciones
* 15/04/2020. Contacto. Registrar estudios
* 16/04/2020. Datos de Ciclos y modulos. Curriculo. Listar ciclos y detalles de ciclos. Listar Módulos y detalles de módulos. Media
* 17/04/2020. Mi Matrícula o datos de de lo que estoy matriculado.
* 18/04/2020. Añadir recordatorios para tareas, examenes o práticas.
* 19/04/2020. Consulta de servicio Lenguajes Famosos en Wikidata y respuesta progresiva. Interfaz de usuario de lenguajes famosos en forma de lista y evento Touch.
* 20/04/2020. Chistes, función para contar un chiste aleatorio desde su repositorio de chistes.
* 21/04/2020. Consulta de servicio Noticias del RSS del CIFP Virgen de Gracia y detección de elementos para la respuesta progresiva.
* 21/04/2020. Interfaz de usuario de noticas en forma de lista y evento Touch.
* 23/04/2020. Chistes en JSON simulando un servicio.
* 24/04/2020. Ciclos y Contacto en JSON simulando un servicio. Optimización con Contacto y información de un ciclo usando este mecanismo.
* 25/04/2020. Listar Ciclos ahora con IU de lista y evento táctil que indica la información o detalles de un ciclo.


## Acerca de
José Luis González Sánchez: [@joseluisgonsan](https://twitter.com/joseluisgonsan). Abril de 2020. En mi cuarentena por Coronavid-19.