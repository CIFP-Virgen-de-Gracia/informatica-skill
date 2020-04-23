/**
 * MODULO DE UTILIDADES
 */

 // LIBRERÍAS
const AWS = require('aws-sdk');

// Cliente de la hostedSkill
const s3SigV4Client = new AWS.S3({
    signatureVersion: 'v4'
});


/**
 * MODULOS A EXPORTAR
 */
module.exports = {
    
    /**
     * Obtiene la firma y el punto de acceso a nuestra skill
     * @param {*} s3ObjectKey Objeto de configuración
     */
    getS3PreSignedUrl(s3ObjectKey) {
        const bucketName = process.env.S3_PERSISTENCE_BUCKET;
        const s3PreSignedUrl = s3SigV4Client.getSignedUrl('getObject', {
            Bucket: bucketName,
            Key: s3ObjectKey,
            Expires: 60*1 // the Expires is capped for 1 minute
        });
        console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
        return s3PreSignedUrl;
    
    }, 
    

    /**
     * Obtiene los datos de almacenamineto y persistencia
     * @param {*} tableName Nombre de la tabla
     */
    getPersistenceAdapter(tableName) {
        // Esto lo ponemos porque esta almacenanda en el propio sistema de Alexa Hosted
        function isAlexaHosted() {
            return process.env.S3_PERSISTENCE_BUCKET; // Como es un Hosted Node.js usamos este
        }
        if (isAlexaHosted()) {
            const {S3PersistenceAdapter} = require('ask-sdk-s3-persistence-adapter');
            return new S3PersistenceAdapter({
                bucketName: process.env.S3_PERSISTENCE_BUCKET
            });
        } else {
            // Si es una base de datos externa
            // IMPORTANTE: no olvides dar acceso a DynamoDB al rol que está utilizando para ejecutar este lambda (a través de la política de IAM)
            const {DynamoDbPersistenceAdapter} = require('ask-sdk-dynamodb-persistence-adapter');
            return new DynamoDbPersistenceAdapter({
                tableName: tableName || 'informatica_virgen',
                createTable: true
            });
        }
    },
    
    /**
     * Crea un recordatorio siendo la API Reminders
     * @param {*} requestMoment Momento requerido
     * @param {*} scheduledMoment Momento planificado
     * @param {*} timezone Timezone
     * @param {*} locale locale
     * @param {*} message mensaje del recordatorio
     */
    createReminder(requestMoment, scheduledMoment, timezone, locale, message) {
        console.log('createReminder: requestMoment: ' + requestMoment);
        console.log('createReminder: scheduledMoment: ' + scheduledMoment);
        return {
            requestTime: requestMoment.format('YYYY-MM-DDTHH:mm:00.000'),
            trigger: {
                type: 'SCHEDULED_ABSOLUTE',
                scheduledTime: scheduledMoment.format('YYYY-MM-DDTHH:mm:00.000'),
                timeZoneId: timezone
            },
            alertInfo: {
                spokenInfo: {
                    content: [{
                        locale: locale,
                        text: message
                    }]
                }
            },
            pushNotification: {
                status: 'ENABLED'
            }
        }
    }, 
    

    /**
     * Crea una directiva de servicio y la encola
     * @param {*} handlerInput Handler que lo procesa
     * @param {*} msg Mensaje
     */
    callDirectiveService(handlerInput, msg) {
        // llama a Alexa, Directiva de servicio
        const {requestEnvelope} = handlerInput;
        const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();
        const requestId = requestEnvelope.request.requestId;
        const {apiEndpoint, apiAccessToken} = requestEnvelope.context.System;
        // Construye la respuesta progresiva
        const directive = {
            header: {
                requestId
            },
            directive:{
                type: 'VoicePlayer.Speak',
                speech: msg
            }
        };
        // envia la directiva de servicio
        return directiveServiceClient.enqueue(directive, apiEndpoint, apiAccessToken);
    }, 
    
    /**
     * Indica si el dispositivo soporta APLL (interfaz gráfica)
     * @param {*} handlerInput 
     */
    supportsAPL(handlerInput) {
        const {supportedInterfaces} = handlerInput.requestEnvelope.context.System.device;
        return !!supportedInterfaces['Alexa.Presentation.APL'];
    }
}