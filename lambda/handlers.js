'use strict';

// LIBRERÍAS
const Alexa = require('ask-sdk-core');
const func = require('./funciones'); // Mis funciones y otras cosas usadas aqui: operaciones de fechas, crear recordatorio
const configuracion = require('./configuracion');// Fichero de configuración de permisos y variables globales
//const interceptors = require('./interceptors'); // Interceptores
const util = require('./util'); // funciones de utilidad. Aquí está la persistencia, recordatorios,  ahora y se exporta como util. Mirad en = Alexa.SkillBuilders
const moment = require('moment-timezone'); // Para manejar fechas

// Librería de pruebas 
const p = require('./prueba'); 

/**
 * INTENT: PRUEBAS
 */
const PruebaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PruebaIntent';
    },

    // Codigo   
    handle(handlerInput) {

        const mensajeHablado = 'Prueba ' + p.getPruebaMsg();
        
        // Listado de todos los ciclos
        p.getListaCiclos();

        // Listado de un ciclo por id
        let id = 'SMR'; // uppercase
        p.getCiclo(id);


        return handlerInput.responseBuilder
            //.withStandardCard('Dpto. Informatica',mensajeHablado, util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};







// HANDLER DE DE EVENTO TOUCH - INTENT 
const TouchIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'; // Los datos que nos vienen del evento
    },
    handle(handlerInput) {
        const {request} = handlerInput.requestEnvelope; // Datos de entrada
        
        //Tipo de intent, esto lo hacemos ya que el evento Touch o más bien Alexa.Presentation.APL.UserEvent se disparará siempre que lo tengamos
        // así que lo filtrammos 
        let tipo = request.arguments[0];
        // Datos del que recibimos  
        let datos = request.arguments[1];
        // Variables a usar
        let mensajeHablado ='';
        let mensajeEscrito ='';
        let encabezado = '';
        
        // Si es la lista de ListProgramming, Famosos
        if(tipo === 'Famosos'){
            console.log("Evento Famosos");
            // Cogemos el objeto y parseamos el JSON a Objeto JS
             let lenguaje = datos;
             try { lenguaje = JSON.parse(lenguaje); } catch (e) {}
                console.log('Evento Touch argumentos: ' + JSON.stringify(lenguaje));
            // Construimos el mensaje de salida 
            // Fijate que podemos coger sus atributos directamente del objeto aunque podríamos parametrizarlo de distinta manera pasando varios y no del tirón
            mensajeHablado = handlerInput.t('LIST_PROGRAMMING_DETAIL_MSG', {lenguaje: lenguaje});
            mensajeEscrito = mensajeHablado;
            encabezado =  handlerInput.t('PROGRAMMING_HEADER_MSG');
        
        // Si es una noticia  
        }else if(tipo === 'Noticias'){
            console.log("Evento Noticias");
            // Cogemos el objeto y parseamos el JSON a Objeto JS
             let noticia = datos;
             try { noticia = JSON.parse(noticia); } catch (e) {}
                console.log('Evento Touch argumentos: ' + JSON.stringify(noticia));
            // Construimos el mensaje de salida 
            // Fijate que podemos coger sus atributos directamente del objeto aunque podríamos parametrizarlo de distinta manera pasando varios y no del tirón
            mensajeHablado = handlerInput.t('LIST_NEWS_DETAIL_MSG', {noticia: noticia});
            mensajeEscrito = mensajeHablado;
            encabezado =  handlerInput.t('NEWS_HEADER_MSG');
            
        //Si es un ciclo
        }else if (tipo === 'Ciclos'){
             console.log("Evento ciclos");
            // Cogemos el objeto y parseamos el JSON a Objeto JS
             let ciclo = datos;
             try { ciclo = JSON.parse(ciclo); } catch (e) {}
                console.log('Evento Touch argumentos: ' + JSON.stringify(ciclo));
            // Construimos el mensaje de salida 
            // Fijate que podemos coger sus atributos directamente del objeto aunque podríamos parametrizarlo de distinta manera pasando varios y no del tirón
            mensajeHablado = handlerInput.t('CICLO_DETALLE_MSG', {ciclo: ciclo});
            mensajeEscrito = mensajeHablado;
            encabezado =  handlerInput.t('CICLO_HEADER_MSG');
        }
       
        
        // Devolvermos la salida
        return handlerInput.responseBuilder
            .withStandardCard(
                encabezado,
                mensajeEscrito,
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};



// MIS ESTUDIOS  - INTENCION
const MiMatriculaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MiMatriculaIntent';
    },
    //Proceso
    handle(handlerInput) {
        // Recogemos los la entrada entrada - handler Input
        const {attributesManager,requestEnvelope, responseBuilder} = handlerInput;
        // Tomamos su intención y con ello la estructura de datos donde nos llega los slots
        const {intent} = requestEnvelope.request;
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        // Obtenemos los datos que tenemos 
        const nombre = sessionAttributes['nombre'] || '';
        const curso = sessionAttributes['curso'] || '';
        const ciclo = sessionAttributes['ciclo'] || '';
        
        // Creamos mensaje
        let mensajeHablado ='';

        // Si no sabemos su nombre, ciclo y curso
        if (nombre && curso && ciclo){
            // Obtenemos el detalle del ciclo.
            let nombreCiclo = func.getCicloNombre(ciclo);
            let detalleCiclo = func.getDetallesCiclo(nombreCiclo);
            let detalleModulos = func.getListaNombreModulos(detalleCiclo.id, curso);
            
            mensajeHablado += handlerInput.t('MATRICULA_MSG', {nombre: nombre, curso:curso, ciclo:nombreCiclo});
            mensajeHablado += detalleModulos;
            
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
                                    headerTitle: handlerInput.t('MATRICULA_HEADER_MSG'),
                                    mainText: detalleCiclo.nombre,
                                    hintString: handlerInput.t('MATRICULA_HEADER_MSG'),
                                    logoImage: util.getS3PreSignedUrl('Media/'+ detalleCiclo.imagen),
                                    logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                    cursoText: curso +' '+ detalleCiclo.id,
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
            
        }
        // Si no
        else{
            if(!nombre){
                 mensajeHablado = handlerInput.t('MISSING_NAME_MSG');
            }else{
                  mensajeHablado = handlerInput.t('MISSINGN_MODULOS_MSG');
            }
        }
        
        mensajeHablado += handlerInput.t('POST_DETALLE_CICLO_HELP_MSG');
        // Devolvemos la salida
       return handlerInput.responseBuilder
            .withStandardCard(
                handlerInput.t('LAUNCH_HEADER_MSG'),
                handlerInput.t(mensajeHablado),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


// INFO CICLO - INTENCION
const InfoModuloIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InfoModuloIntent';
    },
    //Proceso
    handle(handlerInput) {
        // Recogemos los la entrada entrada - handler Input
        const {attributesManager,requestEnvelope, responseBuilder} = handlerInput;
        // Tomamos su intención y con ello la estructura de datos donde nos llega los slots
        const {intent} = requestEnvelope.request;
        
        // Obtenemos el modulo
        const modulo = Alexa.getSlotValue(requestEnvelope, 'modulo');
        const detalle = func.getDetallesModulo(modulo);
        
        // Creamos mensaje
        let mensajeHablado = detalle.nombre + detalle.descripcion;
        mensajeHablado += handlerInput.t('POST_DETALLE_MODULO_HELP_MSG');
        
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
                                    headerTitle: handlerInput.t('LISTAR_MODULOS_HEADER_MSG'),
                                    mainText: detalle.nombre,
                                    hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                    logoImage: util.getS3PreSignedUrl('Media/modulo.png'),
                                    logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                    cursoText: handlerInput.t('LISTAR_MODULOS_TEXT_MSG'),
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
            .withStandardCard(
                handlerInput.t('LAUNCH_HEADER_MSG'),
                handlerInput.t(mensajeHablado),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

// LISTAR MODULOS - INTENCION
const ListarModulosIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListarModulosIntent';
    },
    //Proceso
    handle(handlerInput) {
        // Recogemos los la entrada entrada - handler Input
        const {attributesManager,requestEnvelope, responseBuilder} = handlerInput;
        // Tomamos su intención y con ello la estructura de datos donde nos llega los slots
        const {intent} = requestEnvelope.request;
        const sessionAttributes = attributesManager.getSessionAttributes();
         const nombre = sessionAttributes['nombre'] || '';
         // Obtenemos el ciclo y curso 
        const ciclo = Alexa.getSlotValue(requestEnvelope, 'ciclo');
        const curso = Alexa.getSlotValue(requestEnvelope, 'curso');
        // Obtenemos el detalle del ciclo
        const detalle = func.getDetallesCiclo(ciclo);
        
        // Creamos mensaje
        let mensajeHablado = handlerInput.t('LISTAR_MODULOS_MSG', {nombre: nombre, curso:curso, ciclo:ciclo});
        mensajeHablado += func.getListaNombreModulos(ciclo, curso);
        mensajeHablado += handlerInput.t('POST_LISTAR_MODULOS_HELP_MSG');
        
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
                                    headerTitle: handlerInput.t('LISTAR_MODULOS_HEADER_MSG'),
                                    mainText: handlerInput.t('LISTAR_MODULOS_MAIN_MSG',{curso:curso, ciclo: detalle.id}),
                                    hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                    logoImage: util.getS3PreSignedUrl('Media/'+ detalle.imagen),
                                    logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                    cursoText: handlerInput.t('LISTAR_MODULOS_TEXT_MSG'),
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
            .withStandardCard(
                handlerInput.t('LAUNCH_HEADER_MSG'),
                handlerInput.t(mensajeHablado),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};




/**
 * LISTAR CICLOS INTENT
 * Lista los ciclos que tenemos en nuestro repositorio.
 * Opcionalmente los presenta en una interfaz en foma de lista que al pulsar da sus detalles.
 */
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

        // obtenemos los ciclos
        const ciclos = func.getCiclos();
        
        // Construimos el mensaje
        console.log("llamando a la conversion ciclos");
        const sal = func.convertirCiclosResponse(handlerInput, ciclos);
        console.log("Ciclos Respuesta: " + sal);

        // Creamos mensaje
        let mensajeHablado = handlerInput.t('LISTAR_CICLO_MSG', {nombre: nombre});
        let mensajeEscrito = mensajeHablado;
        
         // Si tenemos respuesta hacemos lo siguiente
        if (sal.voz) {
            mensajeHablado += sal.voz;
            mensajeEscrito += sal.texto;
        }else{
            mensajeHablado += handlerInput.t('POST_LISTAR_CICLOS_HELP_MSG');
        }
       // Creamos la pantalla APL// 
       if (util.supportsAPL(handlerInput) && sal.voz) { 
          mensajeHablado += handlerInput.t('POST_CICLOS_APL_HELP_MSG');
         // Para saber la resolución
         const {Viewport} = handlerInput.requestEnvelope.context;
         const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
         handlerInput.responseBuilder.addDirective({
             type: 'Alexa.Presentation.APL.RenderDocument',
             version: '1.1',
             document: configuracion.APL.listGradesIU, // Cargamos la interfaz de listas
             // Lo cogemos estos datos siguiendo la estructura de listSampleDataSource.json
             datasources: {
                 listData: {
                     type: 'object',
                     properties: {
                         config: {
                             backgroundImage: util.getS3PreSignedUrl('Media/fondo.jpg'),
                             title: handlerInput.t('CICLOS_HEADER_MSG'),
                             skillIcon: util.getS3PreSignedUrl('Media/logoURL.png'),
                             hintText: handlerInput.t('LAUNCH_HINT_MSG')
                         },
                         list: {
                             // Le añadimos como items, el json adjunto
                             listItems: ciclos
                         }
                     },
                     transformers: [{
                         inputPath: 'config.hintText',
                         transformer: 'textToHint'
                     }]
                 }
             }
         });
    }
        /*
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
            */

        // Devolvemos la salida
       return handlerInput.responseBuilder
            .withStandardCard(
                handlerInput.t('CICLOS_HEADER_MSG'),
                handlerInput.t(mensajeEscrito),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


/**
 * IFORMACION DE CICLO INTENT
 * Obtiene la información de un ciclo y lo muestra en pantalla
 */
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
        
        // Obtenemos el ciclo del slot y lo buscamos
        let ciclo = Alexa.getSlotValue(requestEnvelope, 'ciclo');
        ciclo = func.getCiclo(ciclo);

        // Creamos mensaje
        let mensajeHablado = handlerInput.t('CICLO_DETALLE_MSG', {ciclo:ciclo});
        mensajeHablado += handlerInput.t('POST_DETALLE_CICLO_HELP_MSG');
        
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
                                    headerTitle: ciclo.id,
                                    mainText: ciclo.nombre,
                                    hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                    logoImage: util.getS3PreSignedUrl('Media/'+ ciclo.imagen),
                                    logoUrl: util.getS3PreSignedUrl('Media/logoURL.png'),
                                    cursoText: ciclo.tipo +' '+ ciclo.horas + ' horas.',
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
            .withStandardCard(
                handlerInput.t('LAUNCH_HEADER_MSG'),
                handlerInput.t(mensajeHablado),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


/**
 * REGISTRAS INFORMACION INTENT
 * Registra información del alumnado: ciclo y curso.
 */
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
            sessionAttributes['ciclo'] = func.getCiclo(ciclo).id; // Nos devuelve un objeto ciclo, y cogemos su id
            sessionAttributes['curso'] = curso; 
            
            // Una vez tengamos los dias volvemos a inicio
            return LaunchRequestHandler.handle(handlerInput);
            
        }
    // Devolvemos la salida
       return handlerInput.responseBuilder
            .speak(handlerInput.t('REJECTED_MSG'))
            .withSimpleCard(
                "Dpto. Informatica", 
                handlerInput.t('REJECTED_MSG'), 
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


/**
 * CONTANCTO INTENT
 * Nos ofrece el contacto al instituto. Este controlador responde a cuatro intenciones
 * Contacto: ofrece todo el contacto
 * Dirección: ofrece la dirección
 * Telefono: ofrece el teéfono
 * Correo: ofrece el correo
 */
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

        // Obtenemos el cobntacto
        const contacto = func.getContacto();
        
        // Según el tipo construimos el mensaje
        switch (intentTipo) {
            case 'ContactoIntent':
                mensajeHablado = handlerInput.t('CONTACT_DIRE_MSG', {contacto:contacto}) + handlerInput.t('CONTACT_TELF_MSG', {contacto:contacto}) + handlerInput.t('CONTACT_MAIL_MSG', {contacto:contacto});
                break;
            case 'DireccionIntent':
                mensajeHablado = handlerInput.t('CONTACT_DIRE_MSG', {contacto:contacto});
                break;
            case 'TelefonoIntent':
                mensajeHablado = handlerInput.t('CONTACT_TELF_MSG', {contacto:contacto});
                break;
            case 'CorreoIntent':
                mensajeHablado = handlerInput.t('CONTACT_MAIL_MSG', {contacto:contacto});
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
                                direCalle: handlerInput.t('CONTACT_CALLE', {contacto:contacto}),
                                direPoblacion: handlerInput.t('CONTACT_POBLACION', {contacto:contacto}),
                                telefono:  handlerInput.t('CONTACT_TELF', {contacto:contacto}),
                                email:  handlerInput.t('CONTACT_EMAIL', {contacto:contacto}),
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
            .withStandardCard(
                handlerInput.t('LAUNCH_HEADER_MSG'),
                handlerInput.t(mensajeHablado),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
            
    }
    
};


/**
 * RECORDATORIO INTENT
 * Crea un recordatorio para un examen o tarea en una fecha o día específico
 * Es importante el manejo de los timeZone y de los permisos, así como el API Rimender
 * Asegñurate que la app tiene permisos para recordatorios
 */
const RecordatorioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RecordatorioIntent';
    },
    //Proceso
    async handle(handlerInput) {
      // Recogemos los la entrada entrada - handler Input
        const {attributesManager, serviceClientFactory, requestEnvelope, responseBuilder} = handlerInput;
        // Tomamos su intención y con ello la estructura de datos donde nos llega los slots
        const {intent} = requestEnvelope.request;
        const sessionAttributes = attributesManager.getSessionAttributes();
        
        // Obtenemos nombre
        const nombre = sessionAttributes['nombre'] || '';
        
          // Recogemos fecha hora y texto, como slots del intent
        const fecha = Alexa.getSlotValue(requestEnvelope, 'fecha');
        const hora = Alexa.getSlotValue(requestEnvelope, 'hora');
        const texto = Alexa.getSlotValue(requestEnvelope, 'texto');
        
        // timezone y datos de hora
        // Obtenemos el moment-timezone
        let timezone = sessionAttributes['timezone'];
        if (!timezone){
            //timezone = 'Europe/Madrid'; 
            return handlerInput.responseBuilder
                .speak(handlerInput.t('NO_TIMEZONE_MSG'))
                .getResponse();
        }

        const locale = Alexa.getLocale(requestEnvelope); // Local para fechas
        const momento = moment().tz(timezone);//; .format('YYYY-MM-DDTHH:mm:00.000'); // Hoy, momento actual
        const disparador = moment.tz(fecha +' '+hora, timezone);// .format('YYYY-MM-DDTHH:mm:00.000'); // La fecha que queremos
        
        // Confirmamos
        // Si NO esta confirmado
        if (intent.confirmationStatus !== 'CONFIRMED') {
            return handlerInput.responseBuilder
                .speak(handlerInput.t('CANCEL_MSG') + handlerInput.t('REPROMPT_MSG'))
                .reprompt(handlerInput.t('REPROMPT_MSG'))
                .getResponse();
        }
        
        let mensajeHablado = '';
        let errorFlag = false; // Variable de los errores
        // Creamos el recordatorio usando la API Remiders
        // Hay que darle permisos en Build -> Prmissions
        // o saltara la excepción.
        try {
            // Para accedera los permisos
            const {permissions} = requestEnvelope.context.System.user;
            
            if (!(permissions && permissions.consentToken))
                throw { statusCode: 401, message: 'No tienes permisos disponibles' }; // No tienes permisos o no has inicializado la API
            
            // Obtenemos el cliente para manejar recordatorios, por ejemplo para obtener una lista de estos 
            const recordatorioServiceClient = serviceClientFactory.getReminderManagementServiceClient();
            // los recordatorios antiguis se conservan durante 3 días después de que 'recuerden' al cliente antes de ser eliminados
           // Esto es pcional y lo quitaré, pero es para opbtener la lista de recordatorios que tenemos
            //const recordatorioList = await recordatorioServiceClient.getReminders();
            //console.log('Recordatorios actuales: ' + JSON.stringify(recordatorioList));
            
            // Creamos el recordatoro, con la fución de utils 
            const recordatorio = util.createReminder(momento, disparador, timezone, locale, texto); 
            const recordatorioResponse = await recordatorioServiceClient.createReminder(recordatorio); // la respuesta incluirá un "alertToken" que puede usar para consultar este recordatorio
            console.log('Recordatorio creado con ID: ' + recordatorioResponse.alertToken);
            // Texto de respuesta
            mensajeHablado = handlerInput.t('REMINDER_CREATED_MSG', {nombre: nombre});
            mensajeHablado += handlerInput.t('POST_REMINDER_HELP_MSG');
        } catch (error) {
            console.log(JSON.stringify(error));
            errorFlag = true;
            switch (error.statusCode) {
                case 401: // el usuario debe habilitar los permisos para recordatorios, adjuntemos una tarjeta de permisos a la respuesta
                    handlerInput.responseBuilder.withAskForPermissionsConsentCard(configuracion.PERMISO_RECORDATORIO);
                    mensajeHablado += handlerInput.t('MISSING_PERMISSION_MSG');
                    break;
                case 403: // dispositivos como el simulador no admiten la gestión de recordatorios
                    mensajeHablado += handlerInput.t('UNSUPPORTED_DEVICE_MSG');
                    break;
                //case 405: METHOD_NOT_ALLOWED, please contact the Alexa team
                default:
                    mensajeHablado += handlerInput.t('REMINDER_ERROR_MSG'); // + ' El error es: ' + error.message +'. ';
            }
            mensajeHablado += handlerInput.t('REPROMPT_MSG');
        }
           // Pintamos la pantalla si no ha habido errores
        if(!errorFlag) {
            if (util.supportsAPL(handlerInput)) {
                const {Viewport} = handlerInput.requestEnvelope.context;
                const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.1',
                    // Preparamos la pantalla a lanzar
                    document: configuracion.APL.launchDoc,
                    datasources: {
                        launchData: {
                            type: 'object',
                            // Las propiedades que usa, las cambiamos dinamicamente
                            properties: {
                                headerTitle: handlerInput.t('REMINDER_HEADER_MSG'),
                                mainText: handlerInput.t('REMINDER_CREATED_MSG', {nombre: nombre}),
                                hintString: handlerInput.t('LAUNCH_HINT_MSG'),
                                logoImage: util.getS3PreSignedUrl('Media/logoPrincipal.png'),
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
            // Agregar tarjeta de inicio a la respuesta de tipo standard
            // Si estás usando una habilidad alojada de Alexa, las imágenes a continuación caducarán
            // y no se pudo mostrar en la tarjeta. Debes reemplazarlos con imágenes estáticas
            handlerInput.responseBuilder.withStandardCard(
                handlerInput.t('LAUNCH_HEADER_MSG'),
                mensajeHablado,
               util.getS3PreSignedUrl('Media/logoPrincipal.png'));
        }else{
            handlerInput.responseBuilder.withStandardCard(
                handlerInput.t('LAUNCH_HEADER_MSG'),
                handlerInput.t('REMINDER_CREATED_MSG', {nombre: nombre}),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'));
        }
            
        // Devolvemos la salida
       return handlerInput.responseBuilder
            .withStandardCard(
                 handlerInput.t('LAUNCH_HEADER_MSG'),
                handlerInput.t('REMINDER_CREATED_MSG', {nombre: nombre}),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


/**
 * LANZAMIENTO INTENT
 * Lanzamiento de la skill
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return (
            // Somos lanzamiento
            (Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest') ||
            // O somos el intent de tipo Inicio o volver
            (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'InicioIntent')
        );
    },
    // Proceso
    handle(handlerInput) {
       // Necesitamos serviceClientFactory para acceder a la API
        const {attributesManager, serviceClientFactory, requestEnvelope} = handlerInput;
        // Para manejar la sesion
        const sessionAttributes = attributesManager.getSessionAttributes();
        // Para manejar el tipo de entrada
        const tipoRequest = Alexa.getRequestType(handlerInput.requestEnvelope);
         
        // Cargamos los atrinbutos de sesion 
        const nombre = sessionAttributes['nombre'] || '';
        const curso = sessionAttributes['curso'] || '';
        const ciclo = sessionAttributes['ciclo'] || '';
        const sessionCounter = sessionAttributes['sessionCounter']; // Contador de sesiones
        
        // Variable de mensaje
        // Si no hay sesión, damos la bienvenida, si existe le damos bienvenida de registrado
        let mensajeHablado='';
        
        // Si estamos lanzando la Skill
        if(tipoRequest === 'LaunchRequest'){
            mensajeHablado = !sessionCounter ? handlerInput.t('WELCOME_MSG', {nombre: nombre}) : handlerInput.t('WELCOME_BACK_MSG', {nombre: nombre});
            // Si no existe el nombre
            mensajeHablado +=  nombre ==='' ? handlerInput.t('MISSING_NAME_MSG'):'';
            mensajeHablado += handlerInput.t('POST_SAY_HELP_MSG');
        // Si venidmos de Volver
        }else{
            mensajeHablado = handlerInput.t('POST_START_HELP_MSG');
        }

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
            .withStandardCard(
                handlerInput.t('LAUNCH_HEADER_MSG'),
                handlerInput.t(mensajeHablado),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


/**
 * NOTICIAS INTENT
 * Devuelve una lista de noticias obtenida desde nuestro repositorio
 */
const NoticiasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NoticiasIntent';
    },
    // Como vamos a acceder a una API externa lo hacemos async 
    async handle(handlerInput) {
         const {attributesManager, requestEnvelope, responseBuilder} = handlerInput;
        // Obtenemos los atributos de sesión que necesitamos
        const sessionAttributes = attributesManager.getSessionAttributes();
        // Obtenemos nombre y el timezone
        const nombre = sessionAttributes['nombre'] || '';
        let timezone = sessionAttributes['timezone'];
         // Obtenemos el TimeZone
        if (!timezone){
           //timezone = 'Europe/Rome'; 
            return handlerInput.responseBuilder
                .speak(handlerInput.t('NO_TIMEZONE_MSG'))
                .getResponse();
        }
        
        // Vamos con el servicio
        // Lo primero es constrir la respuesta progresiva, es decir, algo que responda mientras hacemos otra tarea en backgroud 
        try {
            // llame al servicio de respuesta progresiva
            await util.callDirectiveService(handlerInput, handlerInput.t('PROGRESSIVE_NEWS_MSG', {nombre: nombre}));
        } catch (error) {
            // si falla podemos continuar, pero el usuario esperará sin una respuesta progresiva
            console.log("Error de respuesta progresiva : " + error);
        }
        
        // ahora buscaremos en la api externa 
        console.log("Consultando Noticias");
        const respuesta = await func.getNoticias(configuracion.MAX_NOTICIAS, timezone);
        console.log('Mi Respuesta: ' + JSON.stringify(respuesta)); // Lo imprimo por pantalla en mi log :) // Nuestro array de objetos json nos ha llegado
        
        // Vamos a presentarlo tanto hablado como por tarjeta, pero teniendo en cuenta que la información a mostrar por cada lado debe ser distinta
        // porque debemos seleccionar qué información se dice, y qué se visualiza. Puede que no sea siempre todo igual.
        // convertimos la respuesta API a texto que Alexa puede leer
        console.log("llamando a la conversion noticias");
        const sal = func.convertirNoticiasResponse(handlerInput, respuesta);
        console.log("Noticias Respuesta: " + sal);
        
        let mensajeHablado = 'Noticias'; // handlerInput.t('API_ERROR_MSG'); // Por si hemos tenido un error al obtener el JSON
        let mensajeEscrito = mensajeHablado;
        
         // Si tenemos respuesta hacemos lo siguiente
        if (sal.voz) {
            mensajeHablado = sal.voz;
            mensajeEscrito = sal.texto;
        }else{
            mensajeHablado += handlerInput.t('POST_NEWS_HELP_MSG');
        }
        // Creamos la pantalla APL// 
       if (util.supportsAPL(handlerInput) && sal.voz) { 
           // Vamos a covertir la respuesta por su fecha
             mensajeHablado += handlerInput.t('POST_NEWS_APL_HELP_MSG');
            // Para saber la resolución
            const {Viewport} = handlerInput.requestEnvelope.context;
            const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: configuracion.APL.listNewsIU, // Cargamos la interfaz de listas
                // Lo cogemos estos datos siguiendo la estructura de listSampleDataSource.json
                datasources: {
                    listData: {
                        type: 'object',
                        properties: {
                            config: {
                                backgroundImage: util.getS3PreSignedUrl('Media/fondo.jpg'),
                                title: handlerInput.t('NEWS_HEADER_MSG'),
                                skillIcon: util.getS3PreSignedUrl('Media/logoURL.png'),
                                hintText: handlerInput.t('LAUNCH_HINT_MSG')
                            },
                            list: {
                                // Le añadimos como items, el json adjunto
                                listItems: respuesta
                            }
                        },
                        transformers: [{
                            inputPath: 'config.hintText',
                            transformer: 'textToHint'
                        }]
                    }
                }
            });
       }

        // Devolvemos la salida
       return handlerInput.responseBuilder
            .withStandardCard(
                handlerInput.t('NEWS_HEADER_MSG'),
                mensajeEscrito,
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
        
    }
};


/**
 * FAMOSOS CREADORES LENGUAJES INTENT
 * Devuelve una lista de famosos creadores de lenguajes obtenida de nuestro repositorio 
 */
const FamososIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FamososIntent';
    },
    // Como vamos a acceder a una API externa lo hacemos async 
    async handle(handlerInput) {
         const {attributesManager, requestEnvelope, responseBuilder} = handlerInput;
        // Obtenemos los atributos de sesión que necesitamos
        const sessionAttributes = attributesManager.getSessionAttributes();
        // Obtenemos nombre y el timezone
        const nombre = sessionAttributes['nombre'] || '';
        let timezone = sessionAttributes['timezone'];
         // Obtenemos el TimeZone
        if (!timezone){
           //timezone = 'Europe/Rome'; 
            return handlerInput.responseBuilder
                .speak(handlerInput.t('NO_TIMEZONE_MSG'))
                .getResponse();
        }
        
        // Vamos con el servicio
        // Lo primero es constrir la respuesta progresiva, es decir, algo que responda mientras hacemos otra tarea en backgroud 
        try {
            // llame al servicio de respuesta progresiva
            await util.callDirectiveService(handlerInput, handlerInput.t('PROGRESSIVE_PROGRAMMING_MSG', {nombre: nombre}));
        } catch (error) {
            // si falla podemos continuar, pero el usuario esperará sin una respuesta progresiva
            console.log("Error de respuesta progresiva : " + error);
        }
        
        // ahora buscaremos en la api externa 
        const respuesta = await func.getCreadoresLenguajesProgramacion(configuracion.MAX_FAMOSOS);
        console.log('Mi Respuesta: ' + JSON.stringify(respuesta)); // Lo imprimo por pantalla en mi log :) // Nuestro array de objetos json nos ha llegado
        
        // Vamos a presentarlo tanto hablado como por tarjeta, pero teniendo en cuenta que la información a mostrar por cada lado debe ser distinta
        // porque debemos seleccionar qué información se dice, y qué se visualiza. Puede que no sea siempre todo igual.
        // convertimos la respuesta API a texto que Alexa puede leer
        console.log("llamando a la conversion famosos");
        const sal = func.convertirFamososResponse(handlerInput, respuesta, timezone);
        console.log("Famosos Respuesta: " + sal);
        
        let mensajeHablado = 'Famosos'; // handlerInput.t('API_ERROR_MSG'); // Por si hemos tenido un error al obtener el JSON
        let mensajeEscrito = mensajeHablado;
        
         // Si tenemos respuesta hacemos lo siguiente
        if (sal.voz) {
            mensajeHablado = sal.voz;
            mensajeEscrito = sal.texto;
        }else{
            mensajeHablado += handlerInput.t('POST_PROGRAMMING_HELP_MSG');
        }
        // Creamos la pantalla APL// 
       if (util.supportsAPL(handlerInput) && sal.voz) { 
             mensajeHablado += handlerInput.t('POST_PROGRAMMING_APL_HELP_MSG');
            // Para saber la resolución
            const {Viewport} = handlerInput.requestEnvelope.context;
            const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: configuracion.APL.listProgrammingIU, // Cargamos la interfaz de listas
                // Lo cogemos estos datos siguiendo la estructura de listSampleDataSource.json
                datasources: {
                    listData: {
                        type: 'object',
                        properties: {
                            config: {
                                backgroundImage: util.getS3PreSignedUrl('Media/fondo.jpg'),
                                title: handlerInput.t('PROGRAMMING_HEADER_MSG'),
                                skillIcon: util.getS3PreSignedUrl('Media/logoURL.png'),
                                hintText: handlerInput.t('LAUNCH_HINT_MSG')
                            },
                            list: {
                                // Le añadimos como items, el json adjunto
                                listItems: respuesta.results.bindings 
                            }
                        },
                        transformers: [{
                            inputPath: 'config.hintText',
                            transformer: 'textToHint'
                        }]
                    }
                }
            });
       }
        
        // Devolvemos la salida
       return handlerInput.responseBuilder
            .withStandardCard(
                handlerInput.t('PROGRAMMING_HEADER_MSG'),
                mensajeEscrito,
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
        
    }
};


/**
 * CHISTE INTENT
 * Cuenta un chiste obtenido de nuestro repositorio de chistes
 */
const ChisteIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChisteIntent';
    },
    // Proceso
    handle(handlerInput) {
        const {attributesManager, requestEnvelope, responseBuilder} = handlerInput;
        // Obtenemos los atributos de sesión que necesitamos
        const sessionAttributes = attributesManager.getSessionAttributes();
        // Obtenemos nombre y el timezone
        const nombre = sessionAttributes['nombre'] || '';
        
        // Presentamos
        let mensajeHablado= handlerInput.t('CHISTE_PRESENTATION_MSG', {nombre: nombre});
        // obtenemos el el chiste y tomamos su texto
        mensajeHablado += func.getChiste().texto;
        // Post mensaje
        mensajeHablado +=  handlerInput.t('CHISTE_SOUND') + handlerInput.t('CHISTE_END_MSG') + handlerInput.t('POST_CHISTE_HELP_MSG');
        
        // Devolvemos la salida
        return handlerInput.responseBuilder
            .withStandardCard(
                handlerInput.t('CHISTE_HEADER_MSG:'),
                mensajeHablado,
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


/**
 * CREADOR INTENT
 * Devuelve una pantalla y un mensaje sobre el creador
 */
const CreadorIntentHandler = {
    canHandle(handlerInput) {
         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CreadorIntent';
    },
    // Proceso     
    handle(handlerInput) {
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
            .withStandardCard(
                handlerInput.t('LAUNCH_HEADER_MSG'),
                handlerInput.t(mensajeHablado),
                util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
    
};


/**
 * AYUDA INTENT
 * Reproduce un mensaje cuando se pide ayuda
 */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const mensajeHablado = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .withStandardCard('Dpto. Informatica',mensajeHablado, util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensajeHablado)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};


/**
 * CANCELACION Y PARADA INTENT
 * Cancela o para el intent actual o skil
 */
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
        
        if(intentTipo==='AMAZON.CancelIntent')
            return LaunchRequestHandler.handle(handlerInput);
        else{
            const mensajeHablado = handlerInput.t('GOODBYE_MSG', {nombre: nombre});
    
        // Preparamos la salida
            return handlerInput.responseBuilder
                 .withStandardCard('Dpto. Informatica',mensajeHablado, util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
                .speak(mensajeHablado)
                //.reprompt(handlerInput.t('REPROMPT_MSG'))
                .getResponse();
             }
    }
};


/**
 * FALLBACK INTENT
 * se activa cuando un cliente dice algo que no se asigna a ninguna intención en su habilidad
 * También debe definirse en el modelo de idioma (si la configuración regional lo admite)
 * Este controlador se puede agregar de forma segura, pero se ignorará en las configuraciones regionales que aún no lo admiten
 */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const mensaje = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .withStandardCard('Dpto. Informatica',mensaje, util.getS3PreSignedUrl('Media/logoPrincipal_Blanco.png'))
            .speak(mensaje)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};


/**
 * SESION ENDED
 * SessionEndedRequest notifica que una sesión ha finalizado. Este controlador se activará cuando se abra actualmente
 * la sesión se cierra por uno de los siguientes motivos: 
 * 1) El usuario dice "salir" o "salir". 
 * 2) El usuario no responde o dice algo que no coincide con una intención definida en su modelo de voz. 
 * 3) se produce un error
 */
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


/**
 * INTENT: REFLECTOR
 * Intent reflector se utiliza para probar y depurar modelos de interacción.
 * Simplemente repetirá la intención que dijo el usuario. Puedes crear manejadores personalizados para tus intentos definiéndolos arriba, 
 * luego también agregándolos a la cadena de manejador de solicitudes a continuación
 */
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


/**
 * ERROR HANDLE
 * Generic error para capturar cualquier errores de sintaxis o errores de enrutamiento. Si recibes un error
 * indicando que no se encuentra la cadena del controlador de solicitudes, no ha implementado un controlador para
 * la intención invocada o incluida en el generador de habilidades a continuación
 */
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


/**
 * EXPORTACIÓN DE MODULOS
 */
module.exports = {
    LaunchRequestHandler,
    // Handler de prueba
    PruebaIntentHandler,
    //Funcinalidad
    CreadorIntentHandler,
    ContactoIntentHandler,
    RegistrarCursoIntentHandler,
    ListarCiclosIntentHandler,
    InfoCicloIntentHandler,
    ListarModulosIntentHandler,
    InfoModuloIntentHandler,
    MiMatriculaIntentHandler,
    RecordatorioIntentHandler,
    FamososIntentHandler,
    TouchIntentHandler,
    ChisteIntentHandler,
    NoticiasIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler,
    ErrorHandler
}

