
// LIBRERÍAS
const Alexa = require('ask-sdk-core'); // Librería de Alexa
const util = require('./util'); // Utilidades
const interceptors = require('./interceptors'); // Interceptores
const handlers = require('./handlers'); // Handelers
const configuracion = require('./configuracion');


// Este controlador (handler) actúa como el punto de entrada para la skill, enrutando todas las solicitudes y respuestas
// a los controladores anteriores. Todos deben estar definidos o incluídos aquí. El orden importa: se procesan de arriba a abajo
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        handlers.LaunchRequestHandler,
        handlers.InicioIntentHandler,
        handlers.ContactoIntentHandler,
        handlers.CreadorIntentHandler,
        handlers.RegistrarCursoIntentHandler,
        handlers.ListarCiclosIntentHandler,
        handlers.InfoCicloIntentHandler,
        handlers.ListarModulosIntentHandler,
        handlers.InfoModuloIntentHandler,
        handlers.MiMatriculaIntentHandler,
        handlers.RecordatorioIntentHandler,
        handlers.FamososIntentHandler,
        handlers.TouchIntentHandler,
        handlers.ChisteIntentHandler,
        handlers.NoticiasIntentHandler,
        handlers.HelpIntentHandler,
        handlers.CancelAndStopIntentHandler,
        handlers.FallbackIntentHandler,
        handlers.SessionEndedRequestHandler,
        handlers.IntentReflectorHandler)
    .addErrorHandlers(
        handlers.ErrorHandler)
    .addRequestInterceptors(
        interceptors.LoadAttributesRequestInterceptor,
        interceptors.LocalisationRequestInterceptor,
        interceptors.LoggingRequestInterceptor,
        interceptors.LoadNameRequestInterceptor,
        interceptors.LoadTimezoneRequestInterceptor)
    .addResponseInterceptors(
        interceptors.LoggingResponseInterceptor,
        interceptors.SaveAttributesResponseInterceptor)
    .withPersistenceAdapter(util.getPersistenceAdapter()) // indicamos las persistencia
    .withApiClient(new Alexa.DefaultApiClient()) // indicamos que vamos a usar una API
    .withCustomUserAgent('sample/informatica-virgen/mod8')
    .lambda();
