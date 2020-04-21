// MIS FUNCIONES AXIALIARES O PARTE DE LA FUNCINALIDAD O LÓGICA DE LA SKILL

// LIBRERÍAS A USAR
const moment = require('moment-timezone'); // manejo de fechas con TimeZone
const util = require('./util'); // Utilidades
const axios = require('axios'); // servicios HTTP y REST 
const configuracion = require('./configuracion');

module.exports = {
    
     // Convertimos las noticias en mensajes procesables
   convertirNoticiasResponse(handlerInput, response, timezone){
        let textoSalida = '';
        let textoEscrito = '';
        let salida;
        // Si la llamada API falla, simplemente no agregamos los famosos a la respuesta
        if (!response || response.length === 0)
            return {
                voz: '',
                texto: ''
            };
        
        const noticias = response; // Obtenemos el JSON segun la respuesta de Wikidata esta en result.bindigs
        console.log('Resultados: ' + JSON.stringify(noticias));
        
        //Texto de salida
        textoSalida += handlerInput.t('ALSO_NEWS_MSG');
        textoEscrito += handlerInput.t('ALSO_NEWS_MSG');
        
        // Recorremos los resultados y lo almacenamos en el objeto lenguaje (lenguaje de programación)
        // La idea es dedir, Lenguae X creado por Y en Z. (X: Nombre del lenguaje, Y: Creador, Z: año)
        noticias.forEach((noticia, index) => {
            textoSalida += handlerInput.t('NEWS_TITTLE_MSG', {titular: noticia.titular});
            let fecha = moment(noticia.fecha).tz(timezone).locale('es').format('LLLL');
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
    
    
    // Obtiene las noticias de manera asíncrona al llamar a aun await
    async getNoticias(max, timezone){
        let noticias = [];
        let url = 'https://cifpvirgendegracia.com/feed';
        console.log("Cargando Parseer");
        let Parser = require('rss-parser');
        let parser = new Parser({
            // Renombramos los campos
            customFields: {
                item: [
                     ['content:encoded', 'contenido'],
                ]
            }
        });
        
        let feed = await parser.parseURL('https://cifpvirgendegracia.com/feed');
        console.log(feed.title);
        
        feed.items.forEach(
            item => {
                var noticia = {
                    titular: item.title,
                    fecha: moment(item.isoDate).tz(timezone),
                    contenido: item.contentSnippet,
                    imagen: item.contenido.substring(
                            item.contenido.indexOf("data-orig-file=") + 16, 
                            item.contenido.indexOf("?fit="))
                };
                noticias.push(noticia);
                /*
                console.log(item);
                console.log(item.title); // Titular
                console.log(moment(item.isoDate).tz(timezone)); // Fecha 
                console.log(item.contentSnippet); // contenido
                console.log(item.contenido.substring(
                            item.contenido.indexOf("data-orig-file=") + 16, 
                            item.contenido.indexOf("?fit="))
                            );
            */
            
            }
        );
        return noticias.slice(0,max);
    },
    
    // Función que devuelve un chiste al azar de nuestro fichero de chistes
    getChiste(){
        const chistes = configuracion.DATA.chistes.chistes; // Vector de chistes
        let max = chistes.length;
        let index = Math.floor(Math.random() * max); 
        let salida = chistes[index].texto +'...   .';
        return salida;
    },
    
    // Esto es un ejemplo de consumo de un servico web, de la misma manera que consumo esto puedo consumir cualquier cosa tipo REST/WEB con JSON y AXIOS
    // Me traigo una lista de creadores de lenguajes de programación, con su año e imagen de ordenación aleatoria
    // Dame el lenguajem programado por con su imagen y año de creacion :)
    getCreadoresLenguajesProgramacion(limite){
        const endpoint = 'https://query.wikidata.org/sparql';
        // Lista de lenguajes y personas que lo han creado con su foto y año, la ordenación aleatoria
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
        var config = {
            timeout: 6500, // timeout api 8 seg timeout, se puede cambiar en  axios.defaults.timeout
            headers: {'Accept': 'application/sparql-results+json'} // Queremos JSON
        };
        
        // aqui hacemos la función asíncrona para obtener la respuesta de JSON mediante GET
        async function getJsonResponse(url, config){
            const res = await axios.get(url, config);
            return res.data;
        }
        
        // Devolvermos la respuesta encapsulada en un JSON
        return getJsonResponse(url, config).then((result) => {
            return result;
        }).catch((error) => {
            return null;
        });
    },
    
    // Convertimos las respuesta de famosos en texto hablado
   convertirFamososResponse(handlerInput, response, timezone){
        let textoSalida = '';
        let textoEscrito = '';
        let salida;
        // Si la llamada API falla, simplemente no agregamos los famosos a la respuesta
        if (!response || !response.results || !response.results.bindings || !Object.keys(response.results.bindings).length > 0)
            return {
                voz: '',
                texto: ''
            };
        
        const resultados = response.results.bindings; // Obtenemos el JSON segun la respuesta de Wikidata esta en result.bindigs
        console.log('Resultados: ' + JSON.stringify(resultados));
        
        //Texto de salida
        textoSalida += handlerInput.t('ALSO_PROGRAMMING_MSG');
        textoEscrito += handlerInput.t('ALSO_PROGRAMMING_MSG');
        
        // Recorremos los resultados y lo almacenamos en el objeto lenguaje (lenguaje de programación)
        // La idea es dedir, Lenguae X creado por Y en Z. (X: Nombre del lenguaje, Y: Creador, Z: año)
        resultados.forEach((lenguaje, index) => {
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
            if (index === Object.keys(resultados).length - 2){
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
    
    // Obtiene los detalles de un módulo
    getDetallesModulo(moduloNombre){
        let salida;
        const ciclos = configuracion.DATA.curriculo.ciclos;
        moduloNombre = moduloNombre+'.'.toLowerCase().trim(); // Porque en el fichero tiene un espacio. Lo sé es algo cutre, pero esto lo haremos con servcios.
        console.log("Consultando modulo: " + moduloNombre);
        // Recorro todos los ciclos
        for (var ciclo in ciclos) {
            let miCiclo = ciclos[ciclo];
            // Filtro por el mío
                console.log(miCiclo.id);
                 //recorro todos los cursos
                for (var curso in miCiclo.cursos) {
                    let miCurso = miCiclo.cursos[curso];
                        console.log(miCurso.descripcion);
                        //recorro los módulos
                        for(var modulo in miCurso.modulos){
                            let miModulo = miCurso.modulos[modulo];
                            console.log(miModulo.nombre);
                            if(miModulo.nombre.toLowerCase().trim() === moduloNombre) {
                                // Si es mi modulo 
                                console.log(miModulo.id);
                                console.log(miModulo.nombre);
                                salida = miModulo;
                            }
                        }

                }
        }
        return salida;
    },
    
    //obtiene la lista de nombres de modulos
    getListaNombreModulos(cicloNombre, cursoNumero){
        let listaModulos='';
        const ciclos = configuracion.DATA.curriculo.ciclos;
        let idCiclo = module.exports.getCicloID(cicloNombre);
        console.log("listando todos modulos de curso " + cursoNumero + " del ciclo " + idCiclo);
        // Recorro todos los ciclos
        for (var ciclo in ciclos) {
            let miCiclo = ciclos[ciclo];
            // Filtro por el mío
            if(miCiclo.id === idCiclo) {
                console.log(miCiclo.id);
                 //recorro todos los cursos
                for (var curso in miCiclo.cursos) {
                    let miCurso = miCiclo.cursos[curso];
                    // filtro el mío
                    if(miCurso.numero === cursoNumero){
                        console.log(miCurso.descripcion);
                        //recorro los módulos
                        for(var modulo in miCurso.modulos){
                            let miModulo = miCurso.modulos[modulo];
                            console.log(miModulo.nombre);
                            listaModulos+= miModulo.nombre;
                        }
                    }
                }
            }
        }
        
        return listaModulos;
    },
    
    // Obtiene los detalles de un ciclos
    getDetallesCiclo(cicloNombre){
        let salida;
        let id = module.exports.getCicloID(cicloNombre);
        salida = id;
        console.log("Detalle ciclo id: " + id);
        const ciclos = configuracion.DATA.curriculo.ciclos;
        for (var ciclo in ciclos) {
            if(ciclos[ciclo].id === id) {
                console.log(ciclos[ciclo].id);
                console.log(ciclos[ciclo].nombre);
                salida = ciclos[ciclo];
            }
        }
        return salida;
    },
    
    
    //Obtiene la lista de nombre de ciclos y devuelve una cadena con ella.
    getListaNombreCiclos(){
        let listaCiclos='';
        const ciclos = configuracion.DATA.curriculo.ciclos;
        console.log("listando todos los ciclos Ciclos");
        for (var ciclo in ciclos) {
            console.log(ciclos[ciclo].id);
            listaCiclos += ciclos[ciclo].nombre;
        }
        return listaCiclos;
    },
    
    //Obtiene la lista de nombre de ciclos y devuelve una cadena con ella.
    getListaIDCiclos(){
        let listaCiclos='';
        const ciclos = configuracion.DATA.curriculo.ciclos;
        console.log("listando todos los ciclos Ciclos");
        for (var ciclo in ciclos) {
            console.log(ciclos[ciclo].id);
            listaCiclos += ciclos[ciclo].id + ' ';
        }
        return listaCiclos;
    },
    
    // Dado el ID de un ciclo devuelve su nombre 
    getCicloNombre(cicloID){
       if(cicloID ==='DAM')
            return 'Desarrollo de Aplicaciones Multiplataforma';
        else if(cicloID === 'DAW')
            return 'Desarrollo de Aplicaciones Web';
        else if(cicloID === 'ASIR')
            return 'Administración de Sistemas Informáticos y Redes';
        else if(cicloID === 'SMR')
            return 'Sistemas Microinformáticos y Redes';
    },
    
     // Dado un ciclo devuelve sus siglas
    getCicloID(ciclo) {
        // Primero quitamos los acentos
        ciclo = ciclo.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); 
        if(ciclo === 'desarrollo de aplicaciones multiplataforma' || ciclo ==='dam')
            return 'DAM';
        else if(ciclo === 'desarrollo de aplicaciones web' || ciclo ==='daw')
            return 'DAW';
        else if(ciclo === 'administracion de sistemas informaticos y redes' || ciclo ==='asir')
            return 'ASIR';
        else if(ciclo === 'sistemas microinformaticos y redes' || ciclo ==='smr')
            return 'SMR';
    },
    
    // Dado un nombre de un mes devuelve su número
    getIDMes(mesNombre) {
       var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]; 
       return  meses.indexOf( mesNombre) + 1;
    },
}