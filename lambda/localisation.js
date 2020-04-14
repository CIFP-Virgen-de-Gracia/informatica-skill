// CONSTANTES DE LOCALIZACION
//Creamos un objeto de cadenas de lenguaje que contiene todas nuestras cadenas.
//Las claves para cada cadena se referenciarán en nuestro código, p. handlerInput.t ('WELCOME_MSG')
// Frases y entonaciones: https://developer.amazon.com/es-ES/docs/alexa/custom-skills/speechcon-reference-interjections-spanish.html
module.exports = {
    es: {
        translation: {
            DPTO_MSG: 'Dpto. de Informática',
            
            WELCOME_MSG: '¡Bienvenido al Departamento de Informática del CIFP Virgen de Gracia de Puertollano {{nombre}}. ',
            WELCOME_BACK_MSG: ['¡Hola {{nombre}}! Me alegra verte de nuevo por el Departamento de Informática. ', '¡Me alegro de verte otra vez por el departamento de informática {{nombre}}. ', 
            'Encantada de volver a verte por el departamento de informática otra vez {{nombre}}. '],
            
            LAUNCH_HEADER_MSG: 'Dpto. Informatica',
            LAUNCH_TEXT_MSG: '¡Hola {{nombre}}!, ¿cómo estás?',
            LAUNCH_HINT_MSG: ['Nuestros ciclos', '¿háblame de un módulo?', 'pide ayuda'],
            
            START_TEXT_MSG: '¡Hola {{nombre}}!, ¿en qué puedo ayudarte?',
        
            
            REPROMPT_MSG: 'Si no sabes como continuar intenta pedir ayuda. Si quieres salir solo dí para. ¿Qué quieres hacer? ',
            GOODBYE_MSG: ['¡Hasta luego {{nombre}}! ', '¡Adiós {{nombre}}! ', '¡Hasta pronto {{nombre}}! ', '¡Nos vemos {{nombre}}! '],
            ERROR_MSG: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez. ',
            REFLECTOR_MSG: 'Acabas de activar {{intent}} ',
            FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez. ',
            UNSUPPORTED_DEVICE_MSG: 'Este dispositivo no soporta la operación que estás intentando realizar. ',
            CANCEL_MSG: 'Vale. Lo cancelamos. ',
            
            HELP_MSG: 'Puedo indicarte las titulaciones que puedes cursar, darte información de un módulo concreto o volver a inicio. ¿Qué quieres hacer? ',
            POST_SAY_HELP_MSG: 'Si quieres saber las titulaciones, o información de un módulo, solo has de pedírmelo o solicitar ayuda. ¿Qué quieres hacer? ',
            POST_DEVELOPER_HELP_MSG: 'Ahora que lo conoces, puedes preguntarme por nuestras titulaciones, módulos, o puedes pedir ayuda. ¿Qué quieres hacer? ',
            POST_START_HELP_MSG: 'Puedes preguntarme por titulaciones, un módulo o pedir ayuda. ',
            
            MISSING_NAME_MSG: '$t(DOUBT_SPEECHCON). Aún no sé cómo te llamas, porque no has autorizado que acceda a tu nombre. Te he enviado una tarjeta a la app Alexa para que lo habilites. ',
            
            DOUBT_SPEECHCON: `<say-as interpret-as="interjection">hmm</say-as>`,
            
            DEVELOPER_HEADER_MSG: 'Mi Creador',
            DEVELOPER_NAME_MSG: 'José Luis González Sánchez',
            DEVELOPER_MSG: '$t(POSITIVE_SOUND) Mi creador es José Luis González Sánchez. Puedes saber más de él consultando su Twitter. Cualquier cosa siempre puedes preguntarle y por una cerveza... $t(DEVELOPER_INFINITO). o darle. $t(DEVELOPER_MIL). $t(DEVELOPER_MOLA). ', 
            DEVELOPER_TWITTER_MSG: 'https://twitter.com/joseluisgonsan ', 
            DEVELOPER_INFINITO: `<say-as interpret-as="interjection">hasta el infinito y más allá</say-as>`,
            DEVELOPER_MIL: `<say-as interpret-as="interjection">mil euros</say-as>`,
            DEVELOPER_MOLA: `<say-as interpret-as="interjection">mola</say-as>`,
            
           
           
            POSITIVE_SOUND: `<audio src='soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02'/>`,
            GREETING_SPEECHCON: `<say-as interpret-as="interjection">¡Felicidades!</say-as>`,
            
            REJECTED_MSG: 'No pasa nada. Por favor dime la fecha otra vez y lo corregimos. ',
            DAYS_LEFT_MSG: 'Queda {{count}} día ',
            DAYS_LEFT_MSG_plural: 'Quedan {{count}} días ',
            WILL_TURN_MSG: 'para que cumplas {{count}} año. ',
            WILL_TURN_MSG_plural: 'para que cumplas {{count}} años. ',
            GREET_MSG: '$t(POSITIVE_SOUND) $t(GREETING_SPEECHCON) ¡Hoy es tu cumpleaños {{nombre}}!. ',
            FELICITACION_MSG: '¡Felicidades! ¡Hoy es tu cumpleaños {{nombre}}!. ',
            NOW_TURN_MSG: '¡Hoy cumples {{count}} año! ',
            NOW_TURN_MSG_plural: '¡Hoy cumples {{count}} años! ',
            
            
            MISSINGN_MSG: '$t(DOUBT_SPEECHCON). Parece que aun no me has dicho tu fecha de cumpleaños. ',
           
         
           
            
           
            REGISTER_MSG: 'Recordaré que tu fecha de cumpleaños es el {{dia}} de {{mes}} de {{anno}}. ',
            NO_TIMEZONE_MSG: 'No he podido determinar tu zona horaria. Verifica la configuración de tu dispositivo, abre otraa vez la skill e inténtalo otra vez. ',
            REMINDER_CREATED_MSG: '{{nombre}} Tu recordatorio se ha creado con éxito. ',
            REMINDER_ERROR_MSG: 'Perdona, ha habido un error al crear el recordatorio. ',
           
           
            MISSING_PERMISSION_MSG: 'Parece que no has autorizado el envío de recordatorios. Te he enviado una tarjeta a la app Alexa para que lo habilites. ',
            POST_REMINDER_HELP_MSG: 'Si quieres saber cuando se aactivará tu recordatorio puedes decir, ¿cuánto falta para mi cumpleaños?. ¿Qué quieres hacer ahora? ',
            API_ERROR_MSG: 'Lo siento, ha habido un problema de acceso a la API externa. Por favor inténtalo otra vez. ',
            PROGRESSIVE_MSG: 'Déjame ver quién cumple hoy {{nombre}}. ',
            CONJUNCTION_MSG: ' y ',
            TURNING_YO_MSG: ' cumple {{count}} años ',
            TURNING_YO_MSG_plural: ' cumple {{count}} años ',
            CELEBRITY_BIRTHDAYS_MSG: 'En esta fecha cumplen años: ',
            ALSO_TODAY_MSG: 'También hoy cumplen: ',
            POST_CELEBRITIES_HELP_MSG: 'Quizá ahora puedes preguntar por cuántos días quedan hasta tu cumpleaños. Y recuerda que también puedes configurar un recordatorio para no olvidarlo. ¿Qué quieres hacer ahora? ', 
            POST_CELEBRITIES_APL_HELP_MSG: 'Puedes intentar tocar las fotos para obtener más información. O quizá quieres preguntar cuantos días quedan para tu cumpleaños. ¿Qué otra cosa te gustaría hacer? ',
            
            LIST_HEADER_MSG: 'Cumpleaños de Hoy',
            LIST_HINT_MSG: '¿quién cumple años hoy?',
            LIST_YO_ABBREV_MSG: '{{count}} año',
            LIST_YO_ABBREV_MSG_plural: '{{count}} años',
            LIST_PERSON_DETAIL_MSG: `{{person.humanLabel.value}} nació hace {{person.date_of_birth.value}} en <lang xml:lang="en-US">{{person.place_of_birthLabel.value}}</lang>. `,
            POST_TOUCH_HELP_MSG: `Intenta tocar en otras fotos para obtenr más información. Sino, puedes ver cuántos días quedan para tu cumpleaños o crear un recordatorio para no olvidarlo. ¿Qué quieres hacer?`
        }
    }
}