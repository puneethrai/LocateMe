/*globals google*/
/*jslint browser:true*/
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        // Options: throw an error if no update is received every 30 seconds.
        this.watchID = navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, {
            maximumAge: 3000,
            timeout: 10000,
            enableHighAccuracy: true
        });
    },
    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    onSuccess: function (position) {
        var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var mapOptions = {
            zoom: 8,
            center: myLatlng,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: true,
            overviewMapControl: false
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Your Location',
            animation: google.maps.Animation.DROP
        });
        marker.setMap(map);
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<p id="firstHeading" class="firstHeading">Your Location:</p>' +
            '<div id="bodyContent">' +
            '<p>latitude:' + position.coords.latitude + '</p>' +
            '<p>longitude:' + position.coords.longitude + '</p>' +
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'latLng': myLatlng
        }, function (results, status) {
            console.log(results, status);
            var printAddressDom = document.getElementById('Adddress');
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    printAddressDom.innerHTML = results[1].formatted_address;
                } else {
                    printAddressDom.innerHTML = 'No results found';
                }
            } else {
                printAddressDom.innerHTML = 'Failed to retreive address due to: ' + status;
            }
        });
    },
    // onError Callback receives a PositionError object
    //
    onError: function (error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

};

app.initialize();