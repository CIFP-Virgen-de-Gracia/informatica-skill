'use strict';

// Fichero para clases y métodos de prueba
const configuracion = require('./configuracion');// Fichero de configuración de permisos y variables globales

module.exports = {

    



    /**
     * Obtiene un ciclo en base a su id (DAM, DAW, ASIR o SMR)
     * @param {string} idCiclo 
     */
    getCiclo(idCiclo){
         // Nos conectamos al repositorio y obtenemos la info
         let ciclos = configuracion.DATA.ciclos;
         try { ciclos = JSON.parse(ciclos); } catch (e) {}
         console.log('Lista de Ciclos: ' + JSON.stringify(ciclos));
         
         //operamos, filtramos aquellos ciclos (find devuelve el primer valor, filter un array con todas las ocurrencias)
         return ciclos.find(ciclo => ciclo.id === idCiclo);
    },

    /**
     * Obtiene la lista de ciclos desde nuestro repositorio principal
     */
    getListaCiclos() {
        // Nos conectamos al repositorio y obtenemos la info
        let ciclos = configuracion.DATA.ciclos;
        try { ciclos = JSON.parse(ciclos); } catch (e) {}
        console.log('Lista de Ciclos: ' + JSON.stringify(ciclos));
        
        //Devolvemos la lista de ciclos
        return ciclos;
    },

    /**
     * Mensaje de pruebas
     */
    getPruebaMsg(){
        return 'Prueba';
    }
}