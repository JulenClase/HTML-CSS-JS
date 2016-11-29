/**
 * Created by Julen Rodriguez Costa on 29/11/2016.
 *//**
$.noConflict();
jQuery( document ).ready(function( $ ) {
    alert("Mensaje de alerta")
    console.log("Mensaje de consola")
});*/
$.noConflict();
jQuery( document ).ready(function( $ ) {
   var txtBusqueda = $().val();
    console.log(txtBusqueda);
});