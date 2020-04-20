module.exports = {
    // Especificamos que atributos queremos que sea salvados de sesión a base de datos
    ATRIBUTOS_PERSISTENTES: ['nombre', 'ciclo', 'curso', 'sessionCounter'],
    
    //PERMISOS por ejemplo para acceder al nombre: de lectura
    PERMISO_NOMBRE_USUARIO: ['alexa::profile:given_name:read'],
    
    // Permisos para recordatorios
    PERMISO_RECORDATORIO: ['alexa::alerts:reminders:skill:readwrite'],
    
    // número máximo de famosos a consultar en el servicio
   MAX_FAMOSOS: 5, 
    
    // APL Interfaces, uno por cada fichero de recursos
    APL: {
        launchIU: require('./recursos/interfaz/launchScreen.json'),         // Lanzaminrto
        creatorIU: require('./recursos/interfaz/creatorScreen.json'),       // Mi Creador
        contactIU: require('./recursos/interfaz/contactScreen.json'),       // Contacto    
        listProgrammingIU: require('./recursos/interfaz/listProgrammingScreen.json') // Lista de lenguajes de programacion
    },
    
    // Datos con los que trabajar 
    DATA: {
        curriculo: require('./recursos/datos/curriculo'),
        chistes: require('./recursos/datos/chistes')
    }
}
