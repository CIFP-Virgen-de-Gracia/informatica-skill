module.exports = {
    // Especificamos que atributos queremos que sea salvados de sesión a base de datos
    ATRIBUTOS_PERSISTENTES: ['nombre', 'ciclo', 'curso', 'cursoNombre', 'cicloNombre', 'sessionCounter', 'recordatorioID', 'dia', 'mesID', 'mesNombre', 'anno'],
    
    //PERMISOS por ejemplo para acceder al nombre: de lectura
    PERMISO_NOMBRE_USUARIO: ['alexa::profile:given_name:read'],
    
    // Permisos para recordatorios
    PERMISO_RECORDATORIO: ['alexa::alerts:reminders:skill:readwrite'],
    
    // número máximo de cumpleaños a consultar de famosos por el servicio
   MAX_CUMPLES: 5, 
    
    // APL Interfaces, uno por cada fichero de recursos
    // APL Interfaces, uno por cada fichero de recursos
    APL: {
        launchDoc: require('./recursos/launchScreen.json'),
        creatorDoc: require('./recursos/creatorScreen.json'),
        listDoc: require('./recursos/listScreen.json')
    }
}
