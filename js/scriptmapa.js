/**
 * Created by Curso on 19/12/2016.
 */
$.noConflict();
jQuery(document).ready(function($) {
    function getPreciseLocation() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (position) {
                resolve({latitude: position.coords.latitude, longitude: position.coords.longitude});
            });
        });
    }

    function cargarMapa(coordenadas) {
        console.log(coordenadas);

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true
        });
        /*directionsDisplay.addListener('directions_changed', function() {
            computeTotalDistance(directionsDisplay.getDirections());
        });*/

        var element = document.getElementById('map');
        var myCenter = new google.maps.LatLng(coordenadas.latitude, coordenadas.longitude);
        var mapOptions = {
            center: new google.maps.LatLng(coordenadas.latitude, coordenadas.longitude),
            zoom: 19,
            scrollwheel: true
        };
        /*var infowindow = new google.maps.InfoWindow({
            content: "Posicion Actual."
        });*/
        var map = new google.maps.Map(element, mapOptions);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

        var marker = new google.maps.Marker({
            position: myCenter,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        //marker.addListener('click', toggleBounce);

        //marker.setMap(map);

        var poscasa = {lat:43.2334945, lng:-2.8537471}
        var marker2 = new google.maps.Marker({
            position:poscasa,
            draggable: true,
            animation: google.maps.Animation.DROP
        });
        //marker2.addListener('click', toggleBounce);
        //marker2.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay , myCenter, poscasa);

        //infowindow.open(map, marker);
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay, myCenter, poscasa) {
        //console.log(directionsService);
        directionsService.route({
            origin: myCenter,
            destination: poscasa,
            travelMode: 'DRIVING',

        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }
    getPreciseLocation()
        .then(cargarMapa)
        .then(calculateAndDisplayRoute())
        .catch(function errorHandler(error) {
            console.log(error);
        });

    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);

        }
    }
});
/*
 https://developers.google.com/maps/documentation/javascript/maptypes?hl=ES

 https://developers.google.com/maps/documentation/javascript/examples/directions-panel?hl=es

 https://developers.google.com/maps/documentation/javascript/geocoding?hl=es
 */
//https://developers.google.com/chart/interactive/docs/gallery/ganttchart