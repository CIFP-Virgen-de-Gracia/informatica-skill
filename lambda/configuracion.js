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
        launchIU: require('./recursos/interfaz/launchScreen.json'),                     // Lanzaminrto
        creatorIU: require('./recursos/interfaz/creatorScreen.json'),                   // Mi Creador
        contactIU: require('./recursos/interfaz/contactScreen.json'),                   // Contacto    
        listProgrammingIU: require('./recursos/interfaz/listProgrammingScreen.json'),   // Lista de lenguajes de programacion
        listNewsIU: require('./recursos/interfaz/listNewsScreen.json'),                 // Lista de Noticias
        listGradesIU: require('./recursos/interfaz/listGradesScreen.json'),             // Lista de Noticias
        listModulesIU: require('./recursos/interfaz/listModulesScreen.json')            // Lista de Modulos
    },
    
    // Repositorio de los datos donde vamos a trabajar, puede ser las url a donde nos conectamos de servicios propios
    // O de otros lados o ficheros internos JSON o similares
    DATA: {
        contacto: require('./recursos/datos/contacto.json'),
        ciclos: require('./recursos/datos/ciclos.json'),
        modulos: require('./recursos/datos/modulos.json'),
        chistes: require('./recursos/datos/chistes.json'),
        RSS: 'https://cifpvirgendegracia.com/feed',
        WIKI: 'https://query.wikidata.org/sparql'
    },

    // Repositorio de imagenes, podríamos sacarlas de media, pero nos e verían bien en nuestras tarjetas
    // Tambien tiene caducidad de, por eso usamos un servidor externo de imagenes
    IMAGES: {
        creador: 'https://i.imgur.com/cHMvdEJ.jpg',
        fondo: 'https://i.imgur.com/dk7CqzY.jpg',
        logoIcon: 'https://i.imgur.com/jiEIs6P.png',
        logoPrincipal: 'https://i.imgur.com/Ncuu1es.png',
        logoBlanco: 'https://i.imgur.com/nkWiwuv.png'
    }
}
