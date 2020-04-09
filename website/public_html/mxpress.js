/**
 * This is the driver code for the website, init initalizes the website elements
 */
function mxpress() {

    const layerArray = getLayers();
    var mxpressMap = initMap(layerArray);
    mxpressMap = locateUser(mxpressMap);
    L.control.layers(getLayerElements(layerArray)).addTo(mxpressMap);
    mxpressMap = initRouting(mxpressMap);
  
}

/**
 * This function accepts the map from the mxpress function and initalizes the routing plugin
 * @param {*} mxpressMap this is the map as part of the Leaflet library 
 */
function initRouting(mxpressMap) {

    L.Routing.control({
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.bing("Atykyd__1yOLIeRcYL87DENn51slA-VNIB8VVtAyKVo7tvkA1Zmtpz5dqudgaxqd"),
        serviceUrl: 'http://mxpress.ca:5000/route/v1'
    }).addTo(mxpressMap);

    return mxpressMap;
}
/**
 * This function creates a UI element to select layers
 * @param {*} layerArray 
 */
function getLayerElements(layerArray) {
    const layerElement = {
        "Dark": layerArray[0],
        "Streets": layerArray[1],
        "Light": layerArray[2],
        "Outdoors": layerArray[3],
        "Satellite": layerArray[4],
        "ESRI": layerArray[5]
    };
    return layerElement
}

/**
 * this function uses gelocation to locate the user, if location is denied it informs the user 
 * @param {*} mxpressMap 
 */
function locateUser(mxpressMap) {
    mxpressMap.locate({
        setView: true, maxZoom: 16
    });

    function onLocationFound(msg) {
        var radius = msg.accuracy;
    
        L.marker(msg.latlng).addTo(mxpressMap)
            .bindPopup("Your location is " + radius + " meters from this point").openPopup();
    
        L.circle(msg.latlng, radius).addTo(mxpressMap);
    }
    
    mxpressMap.on('locationfound', onLocationFound);

    function onLocationError(e) {
        alert(e.message);
    }
    
    mxpressMap.on('locationerror', onLocationError);
    return mxpressMap;
}

/**
 * this function initalizes the leaflet map
 * @param {*} layerArray 
 */
function initMap(layerArray) {

    var mxpressMap = L.map('mapid', {
        center: [50.507695, -104.667333],
        zoom: 14,
        layers: layerArray
    });

    return mxpressMap;
}

/**
 * This function returns the basemap layers
 */
function getLayers() {
    var layerArray = [L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        attribution: '#TeamMX',
                        maxZoom: 18,
                        id: 'mapbox/dark-v9',
                        accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                    }),
                    
                        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        attribution: '#TeamMX',
                        maxZoom: 18,
                        id: 'mapbox/streets-v11',
                        accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                    }),
                        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        attribution: '#TeamMX',
                        maxZoom: 18,
                        id: 'mapbox/light-v9',
                        accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                    }),
                        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        attribution: '#TeamMX',
                        maxZoom: 18,
                        id: 'mapbox/outdoors-v9',
                        accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                    }),
                        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        attribution: '#TeamMX',
                        maxZoom: 18,
                        id: 'mapbox/satellite-streets-v9',
                        accessToken: 'pk.eyJ1Ijoicm1mNzU3IiwiYSI6ImNrNmp0d2pscDAxY3cza3AxZTJscGM2engifQ.WKqWyaCGIh-g5_3FxgKJhg'
                    }),
                        esri_streets = L.esri.basemapLayer('Streets')];


                    //Scott's servers are too slow to use our own tile servers :(
                    //MX_Dark_Matter   = L.tileLayer('192.168.10.9:32768/styles/{id}/?raster#{z}/{x}/{y}/', {
                    //            attribution: '#TeamMX',
                    //            maxZoom: 18,
                    //            id: 'dark-matter',
                    //            });
                
    return layerArray;
}

//TODO
function initSpeedLayer() {
    //var traffic =  L.vectorGrid.protobuf("http://192.168.10.2:5000/tile/v1/car/tile({x},{y},{z}).mvt");
    
    //var trafficMap = {
    //    "Traffic": traffic
    //};
    //L.control.layers(trafficMap).addTo(mxpressMap);


    //L.vectorGrid.protobuf("http://192.168.10.2:5000/tile/v1/car/tile({x},{y},{z}).mvt", {
    //}).addTo(mxpressMap);
}