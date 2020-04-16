// LIBRERÍAS
const Alexa = require('ask-sdk-core');
const func = require('./funciones'); // Mis funciones y otras cosas usadas aqui: operaciones de fechas, crear recordatorio
const configuracion = require('./configuracion');// Fichero de configuración de permisos y variables globales
const interceptors = require('./interceptors'); // Interceptores
const util = require('./util'); // funciones de utilidad. Aquí está la persistencia, recordatorios,  ahora y se exporta como util. Mirad en = Alexa.SkillBuilders
const moment = require('moment-timezone'); // Para manejar fechas

// INFO CICLO - INTENCION
const InfoCicloIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InfoCicloIntent';
    },
    //Proceso
    handle(handlerInput) {
        // Recogemos los la entrada entrada - handler Input
        const {attributesManager,requestEnvelope, responseBuilder} = handlerInput;
        // Tomamos su intención y con ello la estructura de datos donde nos llega los slots
        const {intent} = requestEnvelope.request;
        
        // Obtenemos el ciclo 
        const ciclo = Alexa.getSlotValue(requestEnvelope, 'ciclo');
        const detalle = func.getDetallesCiclo(ciclo);
        // Creamos mensaje
        let mensajeHablado = detalle.tipo + detalle.nombre + detalle.horas + detalle.descripcion;
        
        // Pintamos la pantalla 
            if(util.supportsAPL(handlerInput)) {
                const {Viewport} = handlerInput.requestEnvelope.context;
                const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
                handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.1',
                        document: configuracion.APL.launchIU,
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: detalle.id,
                                    mainText: detalle.nombre,
                                    hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                    logoImage: util.getS3PreSignedUrl('Media/'+ detalle.imagen),
                                    logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                    cursoText: detalle.tipo +' '+ detalle.horas,
                                    backgroundImage: util.getS3PreSignedUrl('Media/fondo.jpg'),
                                    backgroundOpacity: "0.5"
                                },
                                transformers: [{
                                    inputPath: 'hintString',
                                    transformer: 'textToHint',
                                }]
                            }
                        }
                    });
            
            }
            
        // Devolvemos la salida
       return handlerInput.responseBuilder
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


// LISTAR CICLOS - INTENCION
const ListarCiclosIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListarCiclosIntent';
    },
    //Proceso
    handle(handlerInput) {
        // Recogemos los la entrada entrada - handler Input
        const {attributesManager,requestEnvelope, responseBuilder} = handlerInput;
        // Tomamos su intención y con ello la estructura de datos donde nos llega los slots
        const {intent} = requestEnvelope.request;
        // Atributos de sesiónconst 
        const sessionAttributes = attributesManager.getSessionAttributes();
         const nombre = sessionAttributes['nombre'] || '';
        // Creamos mensaje
        let mensajeHablado = handlerInput.t('LISTAR_CICLO_MSG', {nombre: nombre});
        mensajeHablado += func.getListaNombreCiclos();
        mensajeHablado += handlerInput.t('POST_LISTAR_CICLOS_HELP_MSG');
        
        // Pintamos la pantalla 
            if(util.supportsAPL(handlerInput)) {
                const {Viewport} = handlerInput.requestEnvelope.context;
                const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
                handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.1',
                        document: configuracion.APL.launchIU,
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: handlerInput.t('LISTAR_CICLO_HEADER_MSG'),
                                    mainText: func.getListaIDCiclos(),
                                    hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                    logoImage: util.getS3PreSignedUrl('Media/titulaciones.png'),
                                    logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                    cursoText: handlerInput.t('LISTAR_CICLO_TEXT_MSG'),
                                    backgroundImage: util.getS3PreSignedUrl('Media/fondo.jpg'),
                                    backgroundOpacity: "0.5"
                                },
                                transformers: [{
                                    inputPath: 'hintString',
                                    transformer: 'textToHint',
                                }]
                            }
                        }
                    });
            
            }

        // Devolvemos la salida
       return handlerInput.responseBuilder
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


//LANZAMIENTO - INTENCION
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    // Proceso
    handle(handlerInput) {
       // Necesitamos serviceClientFactory para acceder a la API
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        // Para manejar la sesion
        const sessionAttributes = attributesManager.getSessionAttributes();
         
        // Cargamos los atrinbutos de sesion 
        const nombre = sessionAttributes['nombre'] || '';
        const curso = sessionAttributes['curso'] || '';
        const ciclo = sessionAttributes['ciclo'] || '';
        const sessionCounter = sessionAttributes['sessionCounter']; // Contador de sesiones
        
        // Variable de mensaje
        // Si no hay sesión, damos la bienvenida, si existe le damos bienvenida de registrado
        let mensajeHablado = !sessionCounter ? handlerInput.t('WELCOME_MSG', {nombre: nombre}) : handlerInput.t('WELCOME_BACK_MSG', {nombre: nombre});
         
         // Si no existe el nombre
        mensajeHablado +=  nombre ==='' ? handlerInput.t('MISSING_NAME_MSG'):'';
        
        mensajeHablado += handlerInput.t('POST_SAY_HELP_MSG');
        // Pintamos la pantalla 
            if(util.supportsAPL(handlerInput)) {
                const {Viewport} = handlerInput.requestEnvelope.context;
                const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
                handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.1',
                        document: configuracion.APL.launchIU,
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: handlerInput.t('LAUNCH_HEADER_MSG'),
                                    mainText: handlerInput.t('LAUNCH_TEXT_MSG', {nombre: nombre}),
                                    hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                    logoImage: util.getS3PreSignedUrl('Media/logoPrincipal.png'),
                                    logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                    cursoText:curso + ' ' + ciclo,
                                    backgroundImage: util.getS3PreSignedUrl('Media/fondo.jpg'),
                                    backgroundOpacity: "0.5"
                                },
                                transformers: [{
                                    inputPath: 'hintString',
                                    transformer: 'textToHint',
                                }]
                            }
                        }
                    });
            
            }
        
        // Mostramos las cosas 
        return handlerInput.responseBuilder
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

// INICIO - INTENCION
const InicioIntentHandler = {
    canHandle(handlerInput) {
         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InicioIntent';
    },
            
   // Proceso
    handle(handlerInput) {
// Necesitamos serviceClientFactory para acceder a la API
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        // Para manejar la sesion
        const sessionAttributes = attributesManager.getSessionAttributes();
        // Cargamos los atrinbutos de sesion 
        const nombre = sessionAttributes['nombre'] || '';
        const curso = sessionAttributes['curso'] || '';
        const ciclo = sessionAttributes['ciclo'] || '';
    
        let mensajeHablado = handlerInput.t('POST_START_HELP_MSG');
        
        // Pintamos la pantalla 
            if(util.supportsAPL(handlerInput)) {
                const {Viewport} = handlerInput.requestEnvelope.context;
                const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
                handlerInput.responseBuilder.addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.1',
                        document: configuracion.APL.launchIU,
                        datasources: {
                            launchData: {
                                type: 'object',
                                properties: {
                                    headerTitle: handlerInput.t('LAUNCH_HEADER_MSG'),
                                    mainText: handlerInput.t('START_TEXT_MSG', {nombre:nombre}),
                                    hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                    logoImage: util.getS3PreSignedUrl('Media/logoPrincipal.png'),
                                    logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                    cursoText:curso + ' ' + ciclo,
                                    backgroundImage: util.getS3PreSignedUrl('Media/fondo.jpg'),
                                    backgroundOpacity: "0.5"
                                },
                                transformers: [{
                                    inputPath: 'hintString',
                                    transformer: 'textToHint',
                                }]
                            }
                        }
                    });
            
            }
        
        return handlerInput.responseBuilder
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
            
    }
    
};

// CREADOR - INTENCION
const CreadorIntentHandler = {
    canHandle(handlerInput) {
         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CreadorIntent';
    },
            
    handle(handlerInput) {
       // Necesitamos serviceClientFactory para acceder a la API

        // Variable de mensaje
        // Si no hay sesión, damos la bienvenida, si existe le damos bienvenida de registrado
        let mensajeHablado = handlerInput.t('DEVELOPER_MSG');
        mensajeHablado += handlerInput.t('POST_DEVELOPER_HELP_MSG');
        
        // Pintamos la pantalla 
        if(util.supportsAPL(handlerInput)) {
            const {Viewport} = handlerInput.requestEnvelope.context;
            const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
            handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.1',
                    document: configuracion.APL.creatorIU,
                    datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: handlerInput.t('DEVELOPER_HEADER_MSG'),
                                mainText:handlerInput.t('DEVELOPER_NAME_MSG'),
                                hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                logoImage: util.getS3PreSignedUrl('Media/jlgs.jpg'),
                                logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                twitterUrl: handlerInput.t('DEVELOPER_TWITTER_MSG'),
                                backgroundImage: util.getS3PreSignedUrl('Media/fondo.jpg'),
                                backgroundOpacity: "0.5"
                            },
                            transformers: [{
                                inputPath: 'hintString',
                                transformer: 'textToHint',
                            }]
                        }
                    }
                });
        
        }
        
        // Mostramos las cosas 
        return handlerInput.responseBuilder
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
    
};

// CONTACTO - INTENCION
const ContactoIntentHandler = {
    canHandle(handlerInput) {
         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'ContactoIntent' ||
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'DireccionIntent' ||
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'TelefonoIntent' ||
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'CorreoIntent');
    },
            
    handle(handlerInput) {
        // Recogemos el tipo
        const intentTipo = String(Alexa.getIntentName(handlerInput.requestEnvelope));
        let mensajeHablado = ''
        
        // Según el tipo construimos el mensaje
        switch (intentTipo) {
            case 'ContactoIntent':
                mensajeHablado = handlerInput.t('CONTACT_DIRE_MSG') + handlerInput.t('CONTACT_TELF_MSG') + handlerInput.t('CONTACT_MAIL_MSG');
                break;
            case 'DireccionIntent':
                mensajeHablado = handlerInput.t('CONTACT_DIRE_MSG');
                break;
            case 'TelefonoIntent':
                mensajeHablado = handlerInput.t('CONTACT_TELF_MSG');
                break;
            case 'CorreoIntent':
                mensajeHablado = handlerInput.t('CONTACT_MAIL_MSG');
                break;
            default:
                mensajeHablado = intentTipo;
            break;
        }

        mensajeHablado += handlerInput.t('POST_CONTACT_HELP_MSG');
        
        // Pintamos la pantalla 
        if(util.supportsAPL(handlerInput)) {
            const {Viewport} = handlerInput.requestEnvelope.context;
            const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
            handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.1',
                    document: configuracion.APL.contactIU,
                    datasources: {
                        launchData: {
                            type: 'object',
                            properties: {
                                headerTitle: handlerInput.t('CONTACT_HEADER_MSG'),
                                mainText:handlerInput.t('CONTACT_MSG'),
                                direCalle: handlerInput.t('CONTACT_CALLE'),
                                direPoblacion: handlerInput.t('CONTACT_POBLACION'),
                                telefono:  handlerInput.t('CONTACT_TELF'),
                                email:  handlerInput.t('CONTACT_EMAIL'),
                                hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                backgroundImage: util.getS3PreSignedUrl('Media/fondo.jpg'),
                                backgroundOpacity: "0.5"
                            },
                            transformers: [{
                                inputPath: 'hintString',
                                transformer: 'textToHint',
                            }]
                        }
                    }
                });
        
        }
    
        // Mostramos las cosas 
        return handlerInput.responseBuilder
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
            
    }
    
};


// REGISTRAR CURSO - INTENCION
const RegistrarCursoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RegistrarCursoIntent';
    },
    //Proceso
    handle(handlerInput) {
        // Recogemos los la entrada entrada - handler Input
        const {attributesManager,requestEnvelope, responseBuilder} = handlerInput;
        // Tomamos su intención y con ello la estructura de datos donde nos llega los slots
        const {intent} = requestEnvelope.request;
        // Atributos de sesiónconst 
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        
        // Creamos mensaje
        let mensajeHablado = handlerInput.t('REJECTED_MSG');
        //Tomamos los slots y los almacenamos en variables
        const ciclo = Alexa.getSlotValue(requestEnvelope, 'ciclo');
        const curso = Alexa.getSlotValue(requestEnvelope, 'curso');
        
        // Si existen
        if (ciclo && curso) {
            // Almacenamos en la sesión
            sessionAttributes['ciclo'] = func.getCicloID(ciclo);
            sessionAttributes['curso'] = curso; 
            
            // Una vez tengamos los dias volvemos a inicio
            return InicioIntentHandler.handle(handlerInput);
            
        }
    // Devolvemos la salida
       return handlerInput.responseBuilder
            .speak(handlerInput.t('REJECTED_MSG'))
            .withSimpleCard("Dpto. Informatica", handlerInput.t('REJECTED_MSG'))
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

// AYUDA - INTENT
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const mensajeHablado = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .withStandardCard('Dpto. Informatica',mensajeHablado, util.getS3PreSignedUrl('Media/logoPrincipal.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

// CANCELACIÓN Y PARADA INTENT
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        // Para decir su nombre
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const nombre = sessionAttributes['nombre'] || '';
        
        const intentTipo = String(Alexa.getIntentName(handlerInput.requestEnvelope));
        
        //if(intentTipo==='AMAZON.CancelIntent')
        //    return InicioIntentHandler.handle(handlerInput);
        
        const mensajeHablado = handlerInput.t('GOODBYE_MSG', {nombre: nombre});
    
        // Preparamos la salida
            return handlerInput.responseBuilder
                 //.withStandardCard('Dpto. Informatica',mensajeHablado, util.getS3PreSignedUrl('Media/logoPrincipal.png'))
                .speak(mensajeHablado)
                //.reprompt(handlerInput.t('REPROMPT_MSG'))
                .getResponse();
             }
};


// FallbackIntent se activa cuando un cliente dice algo que no se asigna a ninguna intención en su habilidad
// También debe definirse en el modelo de idioma (si la configuración regional lo admite)
//Este controlador se puede agregar de forma segura, pero se ignorará en las configuraciones regionales que aún no lo admiten
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const mensaje = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(mensaje)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};

// SessionEndedRequest notifica que una sesión ha finalizado. Este controlador se activará cuando se abra actualmente
// la sesión se cierra por uno de los siguientes motivos: 1) El usuario dice "salir" o "salir". 2) El usuario no
// responde o dice algo que no coincide con una intención definida en su modelo de voz. 3) se produce un error
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Sesión Terminada: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};


// Intent reflector se utiliza para probar y depurar modelos de interacción.
// Simplemente repetirá la intención que dijo el usuario. Puedes crear manejadores personalizados para tus intentos
// definiéndolos arriba, luego también agregándolos a la cadena de manejador de solicitudes a continuación
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speechText = handlerInput.t('REFLECTOR_MSG', {intent: intentName});

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error para capturar cualquier errores de sintaxis o errores de enrutamiento. Si recibes un error
// indicando que no se encuentra la cadena del controlador de solicitudes, no ha implementado un controlador para
// la intención invocada o incluida en el generador de habilidades a continuación
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speechText = handlerInput.t('ERROR_MSG');
        console.log(`~~~~ Error de Handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};

module.exports = {
    LaunchRequestHandler,
    InicioIntentHandler,
    CreadorIntentHandler,
    ContactoIntentHandler,
    RegistrarCursoIntentHandler,
    ListarCiclosIntentHandler,
    InfoCicloIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler,
    ErrorHandler
}

