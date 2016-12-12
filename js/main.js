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

    function cargarAlumnos() {
        var datos = $.ajax({ 'http://localhost:2403/alumnos',
            type: 'GET',
            success: function( resp ) {
                console.log( resp.people );
            },
            error: function( req, status, err ) {
                console.log( 'something went wrong', status, err );
            }
        });
        for (var i = 0; i < cantidad; i++)
        {
            var dni = datos[i].dni;
            var nombre = nombres[dni];
            var apellido = apellidos[dni];
            var notas = new Array();
            notas['UF1841'] = nUF1841[dni];
            notas['UF1842'] = nUF1842[dni];
            notas['UF1843'] = nUF1843[dni];
            notas['UF1844'] = nUF1844[dni];
            notas['UF1845'] = nUF1845[dni];
            notas['UF1846'] = nUF1846[dni];
            insertarAlumnoTabla(dni, nombre, apellido, notas);
        }
        mostrarNAlumnos();
    }
    function insertarAlumnoTabla(id, dni, nombre, apellido, notas) {
        var html_text = "<tr>" +
            "<tr>" +
            "<td align='center'><input type='checkbox' value='" + id + "'/></td>" +
            "<td>" + nombre + "</td>" +
            "<td>" + apellido + "</td>" +
            "<td>" + notas['UF1841'] + "</td>" +
            "<td>" + notas['UF1842'] + "</td>" +
            "<td>" + notas['UF1843'] + "</td>" +
            "<td>" + notas['UF1844'] + "</td>" +
            "<td>" + notas['UF1845'] + "</td>" +
            "<td>" + notas['UF1846'] + "</td>" +//GET ByID (dni)-->
            "<td>" + calcularMedia([notas['UF1841'], notas['UF1842'], notas['UF1843'], notas['UF1844'], notas['UF1845'], notas['UF1846']]).toFixed(2) + "</td>" +
            "<td align='center'><button>Editar</button></td>" +
            "</tr>";
        $('#listado-alumnos tbody').append(html_text);
    }

    function calcularMedia(numeros) {
        var media = 0;
        var len = numeros.length
        for (var i = 0; i < len; i++)
        {
            media += numeros[i];
        }
        media = media / len;
        return media;
    }
});