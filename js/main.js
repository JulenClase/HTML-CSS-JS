/**
 * Created by Julen Rodriguez Costa on 29/11/2016.
 *//**
$.noConflict();
jQuery( document ).ready(function( $ ) {
    alert("Mensaje de alerta")
    console.log("Mensaje de consola")
});*/
$.noConflict();
const URL = "http://localhost:2403/alumnos";
jQuery( document ).ready(function( $ ) {
    function ajax(opciones) {
        return new Promise(function (resolve, reject) {
            $.ajax(opciones).done(resolve).fail(reject);
        });
    }
});