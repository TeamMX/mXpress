function mxpress() {
    //TODO: Fix geolocation
    //var pos = getGeolocation();
    //alert(pos);
    var pos;
    if (pos == undefined) {
        pos = [50.507695, -104.667333];
    }
    //alert(pos);
    var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: '#TeamMX',
                    maxZoom: 18,
                    id: 'mapbox/dark-v9',
                    accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                    }),
    streets   = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: '#TeamMX',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                }),
    light   = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: '#TeamMX',
                maxZoom: 18,
                id: 'mapbox/light-v9',
                accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                }),
    outdoors   = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: '#TeamMX',
                maxZoom: 18,
                id: 'mapbox/outdoors-v9',
                accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                }),
    satellite   = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: '#TeamMX',
                maxZoom: 18,
                id: 'mapbox/satellite-streets-v9',
                accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                });
    //Scott's servers are too slow :(
    //MX_Dark_Matter   = L.tileLayer('192.168.10.9:32768/styles/{id}/?raster#{z}/{x}/{y}/', {
    //            attribution: '#TeamMX',
    //            maxZoom: 18,
    //            id: 'dark-matter',
    //            });
                
    var esri_streets = L.esri.basemapLayer('Streets');


    var traffic =  L.vectorGrid.protobuf("http://192.168.10.2:5000/tile/v1/car/tile({x},{y},{z}).mvt");
    
    //192.168.10.9:32768/styles/{id}/?vector#{z}/{x}/{y}/ 
    
    var mymap = L.map('mapid', {
        center: pos,
        zoom: 14,
        layers: [light, dark, streets, outdoors, satellite, traffic]
    });

    mymap.locate({setView: true, maxZoom: 16});

    function onLocationFound(e) {
        var radius = e.accuracy;
    
        L.marker(e.latlng).addTo(mymap)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();
    
        L.circle(e.latlng, radius).addTo(mymap);
    }
    
    mymap.on('locationfound', onLocationFound);

    function onLocationError(e) {
        alert(e.message);
    }
    
    mymap.on('locationerror', onLocationError);

    var baseMaps = {
        "Light": light,
        "Dark": dark,
        "Streets": streets,
        "Outdoors": outdoors,
        "Satellite": satellite,
        "ESRI": esri_streets
    };
    
    var trafficMap = {
        "Traffic": traffic
    };

    L.control.layers(baseMaps, trafficMap).addTo(mymap);

    L.Routing.control({
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.bing("Atykyd__1yOLIeRcYL87DENn51slA-VNIB8VVtAyKVo7tvkA1Zmtpz5dqudgaxqd"),
        serviceUrl: 'http://192.168.10.2:5000/route/v1'
    }).addTo(mymap);

    L.vectorGrid.protobuf("http://192.168.10.2:5000/tile/v1/car/tile({x},{y},{z}).mvt", {
    }).addTo(mymap);

    //var popup = L.popup();
  //  var url = 'http://192.168.10.2:5000/tile/v1/car/tile(50.507695,-104.667333,10).mvt';
//    var speedVectorTile = L.vectorGrid.protobuf(url).addTo(mymap);


 /*   function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    }

    mymap.on('click', onMapClick); */



/*    var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);
    marker.bindPopup("<b>Hello world!</b><br>hey").openPopup();
    circle.bindPopup("I am a circle.");

    var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("its all broken")
    .openOn(mymap);
    
    var marker = L.marker([51.5, -0.09]).addTo(mymap);
    
    function createButton(label, container) {
        var btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    }

    mymap.on('click', function(e) {
        var container = L.DomUtil.create('div'),
            startBtn = createButton('Start from this location', container),
            destBtn = createButton('Go to this location', container);

        L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(mymap);
    });
*/


    //function getGeolocation() {
    //    if (navigator.geolocation) {
    //        var pos = navigator.geolocation.getCurrentPosition(showPosition);
    //        return pos;
    //   } 
    //}

    //FIX
    function getGeolocation(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position){
                    callback([position.coords.latitude, position.coords.longitude])
                }
            );
        } else {
          return "Unknown";
        }
    }
    
    getLocation(function(res) { alert(res); return res;});

   // function showPosition(pos) {
   //     return [position.coords.latitude, position.coords.longitude];
   // }

}
