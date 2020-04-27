'use strict';

/**
 * MODULO DE FUNCIONES
 * Funciones o elementos de la lógia de la skill que complementan a los controladores Handlers
 */

// LIBRERÍAS A USAR
const moment = require('moment-timezone'); // manejo de fechas con TimeZone
const axios = require('axios'); // servicios HTTP y REST 
const configuracion = require('./configuracion'); // Configuración
const util = require('./util'); // funciones de utilidad. Aquí está la persistencia, recordatorios,  ahora y se exporta como util. Mirad en = Alexa.SkillBuilders

/**
 * MODULOS A EXPORTAR
 */
module.exports = {

    /**
     * Obtiene una lista de módulos asociados a un ciclo y un curso. 
     * En un futuro podemos implementar variantes para que de todos los módulos, los de un curso o los de un ciclo
     * @param {string} ciclo ID del Ciclo, puede ser DAM/DAW/ASIR/SMR
     * @param {number} curso Número del curso, puede ser 1 o 2
     */
    getModulos(ciclo, curso){
        // Podría pasarlo a múniscula, pero no es necesario como en otros procedimientos.
        console.log('Módulos de:  ' + curso + ' de: ' + ciclo);

        // Nos conectamos al repositorio y obtenemos la info. Todos sabemos que lo de conectarse es simbólico, pero podríamos simular el servicio
        let modulos = configuracion.DATA.modulos;
        try { modulos = JSON.parse(modulos); } catch (e) {}
        console.log('Lista de Modulos: ' + JSON.stringify(modulos));

        // Filtramos con la condición, como son varios a devolver se usa filter
        modulos = modulos.filter(modulo=> (modulo.cicloID.toLowerCase() === ciclo.toLowerCase()) && (modulo.curso === curso));
         
        // Devolvemos
        return modulos
    },

    /**
     * Comvierte un a lista de módulos en mensajes de voz y texto
     * @param {} handlerInput Handler de entrada
     * @param {*} modulos lista de módulos
     */
    convertirModulosResponse(handlerInput, modulos){
        let textoSalida = '';
        let textoEscrito = '';
        let salida;
        // Si la llamada API falla, simplemente no agregamos los modulos porque no existen
        if (!modulos || modulos.length === 0)
            return {
                voz: '',
                texto: ''
            };
        
        console.log('Modulos: ' + JSON.stringify(modulos));
             
        // Recorremos los modulos y lo almacenamos en el objeto modulo
        modulos.forEach((modulo, index) => {
            textoSalida += handlerInput.t('MODULO_NAME_MSG', {modulo: modulo});
            textoEscrito += handlerInput.t('MODULO_NAME_MSG', {modulo: modulo});
            
            // Juntamos con Y
            if (index === Object.keys(modulos).length - 2){
                textoSalida += handlerInput.t('CONJUNCTION_MSG');
                textoEscrito += handlerInput.t('CONJUNCTION_MSG');
            }
            else {
               textoSalida += '. ';
               textoEscrito += '. ';
            }
        });
       return {
                voz: textoSalida,
                texto: textoEscrito
            };
    },


    /**
     * Obtiene los detalles de un módulo en base a su indenticador o nombre
     * @param {string} modulo Dato identificativo del modulo, puede ser un id o el nombre (PROG o Programación)
     */
    getModulo(modulo){
        // Primero quitamos los acentos y psamos a minúscula
        // La normalización es por si me han metido los datos sin acento o han pronunciado mal
        modulo = modulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); 
        console.log('Mi modulo a buscar es: ' + modulo);

        // Nos conectamos al repositorio y obtenemos la info
        let modulos = configuracion.DATA.modulos;
        try { modulos = JSON.parse(modulos); } catch (e) {}
        console.log('Lista de Modulos: ' + JSON.stringify(modulos));
        
        //operamos, filtramos aquellos modulos que su id o nombre coicida con el nuestro y devolvemos su id. En nuestro caso solo filtramso el nombre
        return modulos.find(m => (m.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === modulo));
    },


    /**
     * Obtiene la lista de ciclos desde nuestro repositorio principal
     */
    getCiclos() {
        // Nos conectamos al repositorio y obtenemos la info
        let ciclos = configuracion.DATA.ciclos;
        try { ciclos = JSON.parse(ciclos); } catch (e) {}
        console.log('Lista de Ciclos: ' + JSON.stringify(ciclos));
        
        //Devolvemos la lista de ciclos
        return ciclos;
    },


    /**
     * Convierte la salida de la lista de ciclos en mensaje de texto y voz
     * @param {*} handlerInput handller
     * @param {*} ciclos lista de ciclos a convertir con la entrada de datos JSON
     */
    convertirCiclosResponse(handlerInput, ciclos){
        let textoSalida = '';
        let textoEscrito = '';
        let salida;
        // Si la llamada API falla, simplemente no agregamos los ciclos porque no existen
        if (!ciclos || ciclos.length === 0)
            return {
                voz: '',
                texto: ''
            };
        
        console.log('Ciclos: ' + JSON.stringify(ciclos));
             
        // Recorremos los ciclos y lo almacenamos en el objeto ciclo
        ciclos.forEach((ciclo, index) => {
            textoSalida += handlerInput.t('CICLO_NAME_MSG', {ciclo: ciclo});
            textoEscrito += handlerInput.t('CICLO_NAME_MSG', {ciclo: ciclo});
            
            // Juntamos con Y
            if (index === Object.keys(ciclos).length - 2){
                textoSalida += handlerInput.t('CONJUNCTION_MSG');
                textoEscrito += handlerInput.t('CONJUNCTION_MSG');
            }
            else {
               textoSalida += '. ';
               textoEscrito += '. ';
            }
        });
       return {
                voz: textoSalida,
                texto: textoEscrito
            };
    },

    
    /**
     * Obtiene los detales de un ciclo en base su indentificador o nombre
     * @param {string} ciclo Dato identificativo del ciclo, puede ser un id o el nombre (DAM o desarrollo de aplicaciones multiplataforma)
     */
    getCiclo(ciclo) {
        // Primero quitamos los acentos y psamos a minúscula
        // La normalización es por si me han metido los datos sin acento o han pronunciado mal
        ciclo = ciclo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); 

        console.log('Mi ciclo a buscar es: ' +ciclo);

        // Nos conectamos al repositorio y obtenemos la info
        let ciclos = configuracion.DATA.ciclos;
        try { ciclos = JSON.parse(ciclos); } catch (e) {}
        console.log('Lista de Ciclos: ' + JSON.stringify(ciclos));
        
        //operamos, filtramos aquellos ciclos que su id o nombre coicida con el nuesro y devolvemos su id
        return ciclos.find(c => (c.id.toLowerCase() === ciclo) || (c.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === ciclo));
    },

    
    /***
     * Obtiene los datos del contacto del centro desde nuestro repositorio
     */
    getContacto(){
        // Nos conectamos al repositorio y obtenemos la info
        let contacto = configuracion.DATA.contacto;
        try { contacto = JSON.parse(contacto); } catch (e) {}
        console.log('Contacto: ' + JSON.stringify(contacto));

        //Devolvemos 
        return contacto;
    },


    /**
     * Obtiene una lista de las noticias desde un RSS existente en configuración
     * @param {number} max Número máximo de noticias
     * @param {*} timezone TimeZone
     */
    async getNoticias(max, timezone){
        let noticias = [];
        let url = configuracion.DATA.RSS;
        console.log("Cargando Parseer");
        let Parser = require('rss-parser');
        let parser = new Parser({
            // Renombramos los campos que nos interesa obtener del RSS
            customFields: {
                item: [
                     ['content:encoded', 'contenido'],
                ]
            }
        });
        
        // Obtenemos las noticias
        let feed = await parser.parseURL(url);
        console.log(feed.title);
        
        // Por cada item, creamos una notica y lo salvamos en nuestra lista de noticias
        feed.items.forEach(
            item => { 
                let noticia = {
                    titular: item.title,
                    fecha: moment(item.isoDate).tz(timezone).locale('es').format('LLLL'), //moment(item.isoDate).tz(timezone),
                    contenido: item.contentSnippet,
                    imagen: item.contenido.substring(
                            item.contenido.indexOf("data-orig-file=") + 16, 
                            item.contenido.indexOf("?fit="))
                };
                noticias.push(noticia);
            }
        );
        return noticias.slice(0,max);
    },

    
    /**
     * Convierte una lista de noticias en un objeto de texto por voz y salida textual
     * @param {*} handlerInput handler
     * @param {*} noticias respuesta de noticias, texto de entrada en JSON
     */
    convertirNoticiasResponse(handlerInput, noticias){
        let textoSalida = '';
        let textoEscrito = '';
        // Si la llamada API falla, simplemente no agregamos los famosos a la respuesta
        if (!noticias || noticias.length === 0)
            return {
                voz: '',
                texto: ''
            };
        
        console.log('Resultados: ' + JSON.stringify(noticias));
        
        //Texto de salida
        textoSalida += handlerInput.t('ALSO_NEWS_MSG');
        textoEscrito += handlerInput.t('ALSO_NEWS_MSG');
        
        // Recorremos los resultados y lo almacenamos en el objeto noticia
        // Vamos recogiendo tanto la noticia como su indice y creamos la salida
        noticias.forEach((noticia, index) => {
            textoSalida += handlerInput.t('NEWS_TITTLE_MSG', {titular: noticia.titular});
            let fecha = noticia.fecha; //moment(noticia.fecha).tz(timezone).locale('es').format('LLLL');
            textoSalida += handlerInput.t('NEWS_DATE_MSG', {fecha: fecha});
            //textoSalida += handlerInput.t('NEWS_CONTENT_MSG', {fecha: noticia.fecha});
            textoEscrito += noticia.titular + ', ' + fecha ;
            // Juntamos más
            if (index === Object.keys(noticias).length - 2){
                textoSalida += handlerInput.t('CONJUNCTION_MSG');
                textoEscrito += handlerInput.t('CONJUNCTION_MSG');
            }
            else {
            textoSalida += '. ';
            textoEscrito += '. ';
            }
        });
    // Mi salida;
    return {
                voz: textoSalida,
                texto: textoEscrito
            };
    },


    /**
     * Devuelve un chiste aleatorio de nuesto Servicio de lamacenamiento de chistes
     */
    getChiste(){
        // Simulamos que nos conectamos a un servicio y cogemos los chistes, en nuestro caso están en un fichero estaticos, obtendríamos la lista de
        let chistes = configuracion.DATA.chistes; // Vector de chistes
        try { chistes = JSON.parse(chistes); } catch (e) {}
        console.log('Objetos de chistes: ' + JSON.stringify(chistes));
        //Devolvemos entre 0 y el máximo de vector menos 1
        return chistes[Math.floor(Math.random() * chistes.length)];
    },
    
    
    /**
     * Lista de creadores de lenguajes
     * Esto es un ejemplo de consumo de un servico web, de la misma manera que consumo esto puedo consumir cualquier cosa tipo REST/WEB con JSON y AXIOS
     * Me traigo una lista de creadores de lenguajes de programación, con su año e imagen de ordenación aleatoria
     * Dame el lenguajem programado por con su imagen y año de creacion :)
     * @param {number} limite Máximo de creadores de lenguajes de programación a obtener desde el servicio
     */
    async getCreadoresLenguajesProgramacion(limite){
        const endpoint = configuracion.DATA.WIKI;
        // Consulta Lista de lenguajes y personas que lo han creado con su foto y año, la ordenación aleatoria
        const consultaSparql =
        `SELECT DISTINCT ?langLabel ?langDate ?humanLabel ?picture WHERE {
            ?lang (wdt:P31/(wdt:P279*)) wd:Q9143.
            ?human wdt:P31 wd:Q5;
            wdt:P18 ?picture.
            { ?lang wdt:P287 ?human. }
            UNION
            { ?lang wdt:P170 ?human. }
            UNION
            { ?lang wdt:P943 ?human. }
            UNION
            { ?lang wdt:P178 ?human. }
            SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
            OPTIONAL { ?lang wdt:P571 ?langDate. }
        }
        ORDER BY RAND()
        LIMIT ${limite}`;
        const url = endpoint + '?query=' + encodeURIComponent(consultaSparql);
        console.log(url); // por si queremos verla en el explorador
        // Configuración de acceso al servicoo y tiempos de respuesta
        let config = {
            timeout: 6500, // timeout api 8 seg timeout, se puede cambiar en  axios.defaults.timeout
            headers: {'Accept': 'application/sparql-results+json'} // Queremos JSON
        };
        
        // aqui hacemos la función asíncrona para obtener la respuesta de JSON mediante GET
        async function getJsonResponse(url, config){
            const res = await axios.get(url, config);
            return res.data;
        }
        
        // Devolvermos la respuesta encapsulada en un JSON
        try {
            const result = await getJsonResponse(url, config);
            return result;
        }
        catch (error) {
            return null;
        }
    },
    

    /**
     * Convierte la salida de la lista de noticias en mensaje de texto y voz
     * @param {*} handlerInput handller
     * @param {*} famosos respuesta a convertir con la entrada de datos JSON
     * @param {*} timezone timezone
     */
    convertirFamososResponse(handlerInput, famosos, timezone){
        let textoSalida = '';
        let textoEscrito = '';
        // Si la llamada API falla, simplemente no agregamos los famosos a la respuesta
        if (!famosos || !famosos.results || !famosos.results.bindings || !Object.keys(famosos.results.bindings).length > 0)
            return {
                voz: '',
                texto: ''
            };
        
        famosos = famosos.results.bindings; // Obtenemos el JSON segun la respuesta de Wikidata esta en result.bindigs
        console.log('Resultados Famosos: ' + JSON.stringify(famosos));
        
        //Texto de salida
        textoSalida += handlerInput.t('ALSO_PROGRAMMING_MSG');
        textoEscrito += handlerInput.t('ALSO_PROGRAMMING_MSG');
        
        // Recorremos los famosos y lo almacenamos en el objeto lenguaje (lenguaje de programación)
        // La idea es dedir, Lenguae X creado por Y en Z. (X: Nombre del lenguaje, Y: Creador, Z: año)
        famosos.forEach((lenguaje, index) => {
            textoSalida += handlerInput.t('PROGRAMMING_NAME_MSG', {lenguaje: lenguaje.langLabel.value});
            textoSalida += handlerInput.t('PROGRAMMING_CREATOR_MSG', {creador: lenguaje.humanLabel.value});
            textoEscrito += lenguaje.langLabel.value + ', ' + lenguaje.humanLabel.value;
            
            // si tiene fecha de creación almacenada...
            console.log(lenguaje.hasOwnProperty('langDate'));
            if (lenguaje.hasOwnProperty('langDate')) {
                textoSalida += handlerInput.t('PROGRAMMING_AT_MSG');
                // Convertimos la fecha 
                const momento = moment(lenguaje.langDate.value).tz(timezone);
                console.log('año: ' + momento.year());
                textoSalida += momento.year();
                textoEscrito += ' en ' + momento.year();
                lenguaje.langDate.value = momento.year(); // Ponemos el año en la propiedad
            }
            // Juntamos más
            if (index === Object.keys(famosos).length - 2){
                textoSalida += handlerInput.t('CONJUNCTION_MSG');
                textoEscrito += handlerInput.t('CONJUNCTION_MSG');
            }
            else {
               textoSalida += '. ';
               textoEscrito += '. ';
            }
        });
       return {
                voz: textoSalida,
                texto: textoEscrito
            };
    }


}