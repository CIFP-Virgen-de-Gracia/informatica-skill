'use strict';

/**
 * CONFIGURACION Y COSTANTES DE LA SKILL
 */
module.exports = {
    // Especificamos que atributos queremos que sea salvados de sesión a base de datos
    ATRIBUTOS_PERSISTENTES: ['nombre', 'ciclo', 'curso', 'sessionCounter'],
    
    //PERMISOS por ejemplo para acceder al nombre: de lectura
    PERMISO_NOMBRE_USUARIO: ['alexa::profile:given_name:read'],
    
    // Permisos para recordatorios
    PERMISO_RECORDATORIO: ['alexa::alerts:reminders:skill:readwrite'],
    
    // número máximo de famosos a consultar en el servicio
   MAX_FAMOSOS: 5, 
   
   // número máximo de noticias
   MAX_NOTICIAS: 5, 
    
    // APL Interfaces, uno por cada fichero de recursos
    APL: {
        launchIU: require('./recursos/interfaz/launchScreen.json'),         // Lanzaminrto
        creatorIU: require('./recursos/interfaz/creatorScreen.json'),       // Mi Creador
        contactIU: require('./recursos/interfaz/contactScreen.json'),       // Contacto    
        listProgrammingIU: require('./recursos/interfaz/listProgrammingScreen.json'), // Lista de lenguajes de programacion
        listNewsIU: require('./recursos/interfaz/listNewsScreen.json'), // Lista de Noticias
        listGradesIU: require('./recursos/interfaz/listGradesScreen.json') // Lista de Noticias
    },
    
    // Repositorio de los datos donde vamos a trabajar, puede ser las url a donde nos conectamos de servicios propios
    // O de otros lados o ficheros internos JSON o similares
    DATA: {
        curriculo: require('./recursos/datos/curriculo'),
        contacto: require('./recursos/datos/contacto.json'),
        ciclos: require('./recursos/datos/ciclos.json'),
        modulos: require('./recursos/datos/modulos.json'),
        chistes: require('./recursos/datos/chistes.json'),
        RSS: 'https://cifpvirgendegracia.com/feed',
        WIKI: 'https://query.wikidata.org/sparql'
    }
}
