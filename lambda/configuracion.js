module.exports = {
    // Especificamos que atributos queremos que sea salvados de sesión a base de datos
    ATRIBUTOS_PERSISTENTES: ['nombre', 'ciclo', 'curso', 'sessionCounter'],
    
    //PERMISOS por ejemplo para acceder al nombre: de lectura
    PERMISO_NOMBRE_USUARIO: ['alexa::profile:given_name:read'],
    
    // Permisos para recordatorios
    PERMISO_RECORDATORIO: ['alexa::alerts:reminders:skill:readwrite'],
    
    // número máximo de cumpleaños a consultar de famosos por el servicio
   MAX_CUMPLES: 5, 
    
    // APL Interfaces, uno por cada fichero de recursos
    APL: {
        launchIU: require('./recursos/interfaz/launchScreen.json'),
        creatorIU: require('./recursos/interfaz/creatorScreen.json'),
        contactIU: require('./recursos/interfaz/contactScreen.json'),
        listDoc: require('./recursos/interfaz/listScreen.json')
    },
    
    // Datos con los que trabajar 
    DATA: {
        curriculo: require('./recursos/datos/curriculo')
    }
}
