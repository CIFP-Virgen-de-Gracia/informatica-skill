'use strict';

// Fichero para clases y métodos de prueba
const configuracion = require('./configuracion');// Fichero de configuración de permisos y variables globales

module.exports = {

  
    getModulos(){
        // Nos conectamos al repositorio y obtenemos la info
        let modulos= configuracion.DATA.modulos;
        try { modulos = JSON.parse(modulos); } catch (e) {}
        console.log('Lista de Modulos: ' + JSON.stringify(modulos));

        // Añadimos el path completo de la imagen
        //modulos.forEach((modulo)=>{
        //    ciclo.imagen = util.getS3PreSignedUrl('Media/'+ciclo.imagen);
        //});
        
        //Devolvemos la lista de ciclos
        return modulos;
    },  

    /**
     * Mensaje de pruebas
     */
    getPruebaMsg(){
        return 'Prueba';
    }
}