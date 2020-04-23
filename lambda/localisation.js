/**
 * CONSTANTES DE LOCALIZACION
 * Creamos un objeto de cadenas de lenguaje que contiene todas nuestras cadenas.
 * Las claves para cada cadena se referenciarán en nuestro código, p. handlerInput.t ('WELCOME_MSG')
 * en base a los interceptores
 * Frases y entonaciones: https://developer.amazon.com/es-ES/docs/alexa/custom-skills/speechcon-reference-interjections-spanish.html
 */

 /** *
 * MODULO A EXPORTAR
 */
module.exports = {
    es: {
        translation: {
            DPTO_MSG: 'Dpto. de Informática',
            
            // De bienvenida
            WELCOME_MSG: '¡Bienvenido al Departamento de Informática del CIFP Virgen de Gracia de Puertollano {{nombre}}. ',
            WELCOME_BACK_MSG: ['¡Hola {{nombre}}! Me alegra verte de nuevo por el Departamento de Informática. ', '¡Me alegro de verte otra vez por el departamento de informática {{nombre}}. ', 
            'Encantada de volver a verte por el departamento de informática otra vez {{nombre}}. '],
            
            // Lanzamiento
            LAUNCH_HEADER_MSG: 'Dpto. Informatica',
            LAUNCH_TEXT_MSG: '¡Hola {{nombre}}!, ¿cómo estás?',
            LAUNCH_HINT_MSG: ['nuestros ciclos', '¿háblame de un módulo?', 'pide ayuda'],
            
            // Inicio
            START_TEXT_MSG: '¡Hola {{nombre}}!, ¿en qué puedo ayudarte?',
        
            // Genéricos
            REPROMPT_MSG: 'Si no sabes como continuar intenta pedir ayuda. Si quieres salir solo dí para. ¿Qué quieres hacer? ',
            GOODBYE_MSG: ['¡Hasta luego {{nombre}}! ', '¡Adiós {{nombre}}! ', '¡Hasta pronto {{nombre}}! ', '¡Nos vemos {{nombre}}! '],
            ERROR_MSG: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez. ',
            REFLECTOR_MSG: 'Acabas de activar {{intent}} ',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez. ',
            UNSUPPORTED_DEVICE_MSG: 'Este dispositivo no soporta la operación que estás intentando realizar. ',
            CANCEL_MSG: 'Vale {{nombre}}. Lo cancelamos. ',
            API_ERROR_MSG: 'Lo siento, ha habido un problema de acceso a la API externa. Por favor inténtalo otra vez. ',
            
            
            // Ayuda y refuerzo de cada intent
            HELP_MSG: 'Puedo indicarte los ciclos que puedes cursar, darte información de un módulo concreto, registrar tu curso, hablarte de tu matrícula, indicarte cómo contactar, crear recordatorios para tus tareas o volver a inicio. ¿Qué quieres hacer? ',
            POST_SAY_HELP_MSG: 'Si quieres saber los ciclos o titulaciones, información de un módulo, registrar tus estudios, recordatorios o contactar, solo has de pedírmelo o solicitar ayuda. ¿Qué quieres hacer? ',
            POST_DEVELOPER_HELP_MSG: 'Ahora que ya sabes quien es, puedes preguntarme por nuestros ciclos, módulos, registrar tu curso o recordatorio, cómo contactar, o puedes pedir ayuda. ¿Qué quieres hacer? ',
            POST_START_HELP_MSG: 'Puedes preguntarme por los ciclos, módulos, registrar tus datos, poner un recordatorio, cómo contactar o pedir ayuda. ',
            POST_CONTACT_HELP_MSG: 'Puedo repetirte la dirección, el teléfono o email, también puedo darte información de ciclos o módulos, recordar tu curso o tarea, o puedes pedir ayuda. ¿Qué quieres hacer? ',
            POST_LISTAR_CICLOS_HELP_MSG: 'Puedo darte detalles de un ciclo concreto si lo deseas pidiendo información de ciclo y su nombre, o puedes pedir ayuda. ¿Qué quieres hacer? ',
            POST_DETALLE_CICLO_HELP_MSG: 'Si quieres saber sobre otros ciclos, pídemelo. También puedes saber de módulos, formas de contactar, recordar tu curso o tareas o puedes pedir ayuda. ¿Qué quieres hacer? ',
            POST_LISTAR_MODULOS_HELP_MSG: 'Puedo darte detalles de un módulo concreto si lo deseas pidiendo información sobre módulos de un ciclo y curso, o puedes pedir ayuda. ¿Qué quieres hacer? ',
            POST_DETALLE_MODULO_HELP_MSG: 'Si quieres saber sobre otros módulos, pídemelo. También puedes saber sobre ciclos, formas de contactar o puedes pedir ayuda. ¿Qué quieres hacer? ',
            POST_DETALLE_MATRICULA_HELP_MSG: 'Ahora que ya sabes algo más de tu matrícula, puedes pedirme otra cosa, como cómo contactar, información de otros ciclos, recordar tus tareas o exámenes o pedir ayuda. ¿Qué quieres hacer? ',
            POST_REMINDER_HELP_MSG: 'Puedes añadir nuevos recordatorios, consultar información de ciclos o módulos o pedir ayuda para conocer más opciones. ¿Qué quieres hacer ahora? ',
            POST_PROGRAMMING_HELP_MSG: 'Quizás ahora puedes preguntar por ciclos, módulos. Y recuerda que también puedes configurar un recordatorio para no olvidarlo, o pedir ayuda. ¿Qué quieres hacer ahora? ', 
            POST_PROGRAMMING_APL_HELP_MSG: 'Puedes intentar tocar las fotos para obtener más información. O quizás quieras saber sobre módulos, o recordar algo. ¿Qué otra cosa te gustaría hacer? ',
            POST_TOUCH_HELP_MSG: 'Intenta tocar en otras fotos para obtenr más información. Si no, puedes volver al inicio o pedir ayuda. ¿Qué quieres hacer?' ,
            POST_CHISTE_HELP_MSG: 'Si quieres otro chiste solo pídelo, si no pídeme información de nuestros estudios, o crea un recordatorio o pídeme ayuda para saber lo que puedo hacer. ¿Qué quieres hacer ahora? ', 
            POST_NEWS_HELP_MSG: 'Quizás ahora puedes preguntar por ciclos o módulos. Y recuerda que también puedes configurar un recordatorio para no olvidarlo, o pedir ayuda. ¿Qué quieres hacer ahora? ', 
            POST_NEWS_APL_HELP_MSG: 'Puedes intentar tocar las fotos para saber el contenido de la noticia. Si necesitas ayuda, por favor indícalo. ¿Qué otra cosa te gustaría hacer? ',
            
            // Falta de datos y permisos 
            MISSING_NAME_MSG: '$t(DOUBT_SPEECHCON). Aún no sé cómo te llamas, porque no has autorizado que acceda a tu nombre. Te he enviado una tarjeta a la app Alexa para que lo habilites. ',
            NO_TIMEZONE_MSG: 'No he podido determinar tu zona horaria. Verifica la configuración de tu dispositivo, abre otraa vez la skill e inténtalo otra vez. ',
            MISSING_PERMISSION_MSG: 'Parece que no has autorizado el envío de recordatorios. Te he enviado una tarjeta a la app Alexa para que lo habilites. ',
            MISSINGN_MODULOS_MSG: '$t(DOUBT_SPEECHCON). No sé ni tu ciclo ni tu modulo. Lo mejor es que me pidas que registre tu información para que te pueda hablar de ella. ', 
            
            // Creador
            DEVELOPER_HEADER_MSG: 'Mi Creador',
            DEVELOPER_NAME_MSG: 'José Luis González Sánchez',
            DEVELOPER_MSG: '$t(POSITIVE_SOUND) Mi creador es José Luis González Sánchez. Puedes saber más de él consultando su Twitter. Cualquier cosa siempre puedes preguntarle y por una cerveza... $t(DEVELOPER_INFINITO). o darle. $t(DEVELOPER_MIL). $t(DEVELOPER_MOLA). ', 
            DEVELOPER_TWITTER_MSG: 'https://twitter.com/joseluisgonsan ', 
            
            // Contacto
            CONTACT_HEADER_MSG: 'Contacto',
            CONTACT_MSG: '¿Dónde estamos?',
            CONTACT_DIRE_MSG: 'Puedes encontrarnos en el Paseo de San Gregorio, 82-84. 13500. Puertollano, Ciudad Real. ',
            CONTACT_TELF_MSG: 'Nuestro teléfono es: 926 42 62 50. ', 
            CONTACT_MAIL_MSG: 'El correo electrónico del departamento es: informatica@cifpvirgendegracia.com. ', 
            CONTACT_CALLE: 'Paseo de San Gregorio, 82-84',
            CONTACT_POBLACION: '13500. Puertollano (Ciudad Real)',
            CONTACT_TELF: 'Telf.: 926 42 62 50',
            CONTACT_EMAIL: 'informatica@cifpvirgendegracia.com',
            
            // Registrar curso
            REJECTED_MSG: 'No pasa nada. Por favor dime el ciclo y el curso y lo corregimos. ',
            
            //Listar ciclo y detalles de ciclo
            LISTAR_CICLO_MSG: '{{nombre}}. Nuestras titulaciones y ciclos son: ', 
            LISTAR_CICLO_HEADER_MSG: 'Titulaciones',
            LISTAR_CICLO_TEXT_MSG: 'Nuestros ciclos, ¿Te interesa alguno?',
            
             //Listar modulos y detalles de modulo
            LISTAR_MODULOS_MSG: '{{nombre}}. Los módulos de {{curso}} de {{ciclo}} son: ', 
            LISTAR_MODULOS_MAIN_MSG: 'Módulos de {{curso}} de {{ciclo}}',
            LISTAR_MODULOS_HEADER_MSG: 'Modulos',
            LISTAR_MODULOS_TEXT_MSG: 'Nuestros módulos, ¿Te interesa alguno?',
            
            //Matricula
            MATRICULA_HEADER_MSG: 'Matricula',
            MATRICULA_MSG: '{{nombre}}, estás matriculado en {{curso}} del ciclo de {{ciclo}}. Los módulos que cursas son: ',
            
            // Recordatorio
            REMINDER_HEADER_MSG: 'Recordatorio',
            REGISTER_MSG: 'Recordaré lo que me has indicado el {{fecha}} a las {{hora}}. ',
            REMINDER_CREATED_MSG: '{{nombre}} Tu recordatorio se ha creado con éxito. ',
            REMINDER_ERROR_MSG: 'Perdona, ha habido un error al crear el recordatorio. ',
           
            // Listado de programadores y lenguajes famosos
            PROGRESSIVE_PROGRAMMING_MSG: 'Déjame que busque algo de información sobre lenguajes y sus creadores, {{nombre}}. ',
            PROGRAMMING_HEADER_MSG: 'Lenguajes de programacion',
            PROGRAMMING_MSG: 'He encontrado para ti esta información: ',
            PROGRAMMING_NAME_MSG: '<lang xml:lang="en-US">{{lenguaje}}</lang> ', // Pongo acento ingles 
            PROGRAMMING_CREATOR_MSG: ' cuyo creador es: <lang xml:lang="en-US">{{creador}}</lang>', // Pongo acento ingles
            CONJUNCTION_MSG: ' y ',
            PROGRAMMING_AT_MSG: ' en ',
            ALSO_PROGRAMMING_MSG: 'Los lenguajes que he seleccionado son: ',
            LIST_PROGRAMMING_DETAIL_MSG: `El lenguaje <lang xml:lang="en-US">{{lenguaje.langLabel.value}}</lang> ha sido creado por <lang xml:lang="en-US">{{lenguaje.humanLabel.value}}</lang>. {{lenguaje.langDate.value}}  . `,
            
            // Chistes 
            CHISTE_HEADER_MSG: 'Un Chiste',
            CHISTE_PRESENTATION_MSG: '$t(DOUBT_SPEECHCON). Aquí va un chiste, {{nombre}}. ',
            CHISTE_END_MSG: ['¿Te ha gustado? Sí, lo sé, es malo. ', '¡Vaya! hoy estoy que lo bordo. ', '¡Seguro que te has reído!. '],
            
            // Noticias
            PROGRESSIVE_NEWS_MSG: 'Voy a consultar las noticias del centro, {{nombre}}. ',
            NEWS_HEADER_MSG: 'Noticias',
            ALSO_NEWS_MSG: 'Las últimas noticias son: ',
            NEWS_TITTLE_MSG: '{{titular}}. ',
            NEWS_DATE_MSG :' del {{fecha}}. ',
            NEWS_CONTENT_MSG: ' {{contenido}}. ',
            LIST_NEWS_DETAIL_MSG: '{{noticia.titular}}. {{noticia.contenido}}. Publicada el: {{noticia.fecha}}. ',
            
            
           // Emociones y sonidos
            DOUBT_SPEECHCON: `<say-as interpret-as="interjection">hmm</say-as>`,
            DEVELOPER_INFINITO: `<say-as interpret-as="interjection">hasta el infinito y más allá</say-as>`,
            DEVELOPER_MIL: `<say-as interpret-as="interjection">mil euros</say-as>`,
            DEVELOPER_MOLA: `<say-as interpret-as="interjection">mola</say-as>`,
            POSITIVE_SOUND: `<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>`,
            GREETING_SPEECHCON: `<say-as interpret-as="interjection">¡Felicidades!</say-as>`,
            CHISTE_SOUND: `<audio src="soundbank://soundlibrary/musical/amzn_sfx_drum_comedy_02"/>`,
            
        }
    }
}