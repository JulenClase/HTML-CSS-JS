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
        directionsDisplay.addListener('directions_changed', function() {
            computeTotalDistance(directionsDisplay.getDirections());
        });

        var element = document.getElementById('map');
        var myCenter = new google.maps.LatLng(coordenadas.latitude, coordenadas.longitude);
        var mapOptions = {
            center: new google.maps.LatLng(coordenadas.latitude, coordenadas.longitude),
            zoom: 19,
            scrollwheel: true
        };
        var infowindow = new google.maps.InfoWindow({
            content: "Posicion Actual."
        });
        var map = new google.maps.Map(element, mapOptions);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

        var marker = new google.maps.Marker({position: myCenter});
        marker.setMap(map);

        var poscasa = {lat:43.2334945, lng:-2.8537471}
        var marker2 = new google.maps.Marker({position:poscasa});
        //marker2.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay , myCenter, poscasa);

        infowindow.open(map, marker, marker2);
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay, myCenter, poscasa) {
        directionsService.route({
            origin: myCenter,
            destination: poscasa,
            travelMode: 'DRIVING'
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
});