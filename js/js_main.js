var shapes = [];
var countries_EEZ;
var ocean_50m;
var view;
//var ocean_50m

require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/GeoJSONLayer",
    "esri/renderers/ClassBreaksRenderer",
    "esri/renderers/SimpleRenderer",
    "esri/geometry/projection",
    "esri/geometry/SpatialReference",
    "esri/geometry/Geometry"
], function (esriConfig, Map, MapView, Graphic, GraphicsLayer, FeatureLayer, GeoJSONLayer, ClassBreaksRenderer, SimpleRenderer, projection, SpatialReference, Geometry) {


//        esriConfig.apiKey = "API_KEY";
        esriConfig.apiKey = "AAPKa58952a2265747bd9ac145fad44dc2f2cXQ2oX59X30MA6KOKodC8iHVppnYE4SgGj57QKKCzNfr3hVjBQIzMCF4DZBclLm2";

    //PROJECTION
    //load the projection module 
        projection.load().then(function() { 

        const geoSpatialReference = new SpatialReference({
            wkid: 4326
        });
        const viewSpatialReference = new SpatialReference({
            wkid: 54042
                //53008 
               // 54042 // Winkel Tripel
        });

        console.log(viewSpatialReference)




        //load layers
        countries_EEZ = new GeoJSONLayer({
            url: "http://127.0.0.1:8887/country_EEZ.geojson",
            renderer: countries_renderer,
            spatialReference: viewSpatialReference
        });
            countries_EEZ.load()
        console.log("Test1")
        shapes.push(countries_EEZ)

        ocean_50m = new GeoJSONLayer({
            url: "http://127.0.0.1:8887/ocean_110.geojson",
            renderer: ocean_renderer,
            spatialReference: viewSpatialReference
        });
            ocean_50m.load()


        countries_EEZ.geometry = projection.project(countries_EEZ, viewSpatialReference);
        ocean_50m.geometry = projection.project(ocean_50m, viewSpatialReference);
    

        const map = new Map({
            //            basemap: "arcgis-topographic" // Basemap layer service
            layers: [ocean_50m, countries_EEZ]
        });

            view = new MapView({
                map: map,
                center: {
                    x: 0,
                    y: 0
                }, // Longitude, latitude
                zoom: 2, // Zoom level
                container: "viewDiv", // Div element
 //               spatialReference: viewSpatialReference,
                scale: 166418924
            });

            view.graphics.add({
                symbol: {
                    type: "simple-fill",
                    color: null,
                    outline: {
                        width: 0.5,
                        color: [208, 208, 203, 0.7]
                    }
                },
                geometry: {
                    type: "extent",
                    xmin: -180,
                    xmax: 180,
                    ymin: -90,
                    ymax: 90,
                    // This geometry automatically reprojects
                    // when added to the view
                    spatialReference: SpatialReference.WGS84
                }
            });
/* Point Layer
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const point = {
        type: "point",
        longitude: -118.80657463861,
        latitude: 34.0005930608889
    };
    const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40], 
        outline: {
            color: [255, 255, 255],
            width: 1
        }
    };

    const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
    });
    graphicsLayer.add(pointGraphic);
*/








            //shapes.forEach(function (graphic) {
            //    graphic.geometry = projection.project(graphic.geometry, viewSpatialReference)
            //});
       



 //       map.add(countries_EEZ);
   //     map.add(ocean_50m);
        });
});