/*globals google*/
/*jslint browser:true*/
var app = {
    // Application Constructor
    scriptLoaded: false,
    deviceReady: false,
    initialize: function () {
        this.bindEvents();
    },
    loadGoogleAPI: function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?region=GB&callback=initialize';
        script.onload = function () {
            app.scriptLoaded = true;
            app.getCurrentPosition();
            return true;
        };
        script.onerror = function () {
            navigator.notification.confirm('We need active internet connection for our application. Retry?', function (index) {
                if (index === 1) {
                    script.remove ? script.remove() : script.removeNode();
                    app.loadGoogleAPI();
                } else {
                    document.getElementById('Adddress').innerHTML = "Need active internet connection";
                }
            }, 'No Network');
        };
        document.body.appendChild(script);
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
        app.deviceReady = true;
        app.loadGoogleAPI();
    },
    getCurrentPosition: function () {
        if (app.deviceReady && app.scriptLoaded) {
            this.watchID = navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, {
                maximumAge: 3000,
                timeout: 10000,
                enableHighAccuracy: true
            });
        }
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
            overviewMapControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            }
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
            var printAddressDom = document.getElementById('Adddress');
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    printAddressDom.innerHTML = results[1].formatted_address;
                } else {
                    printAddressDom.innerHTML = 'No results found';
                }
            } else {
                printAddressDom.innerHTML = 'Failed to retreive address ';
            }
        });
    },
    // onError Callback receives a PositionError object
    //
    onError: function (error) {
        navigator.notification.alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n', null, 'Location Error');
    }

};

app.initialize();
window.initialize = app.getCurrentPosition;
