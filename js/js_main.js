var shapes = [];
var countries_EEZ;
var ocean_50m;
var view;
var analysis
var datums
var innerString
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
    "esri/geometry/Geometry",
    "esri/widgets/Popup"

], function (esriConfig, Map, MapView, Graphic, GraphicsLayer, FeatureLayer, GeoJSONLayer, ClassBreaksRenderer, SimpleRenderer, projection, SpatialReference, Geometry, Popup) {


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

            console.log(viewSpatialReference);


//POPUP WORK

// get the datum data
//            $.getJSON("http://127.0.0.1:8887/df_analysis.json", function (data) {
            $.getJSON("data/df_analysis.json", function (data) {
                analysis = data;
                console.log(data);
            });

            function findDatums(feature) {
                console.log(feature)
                const name = []
                const extent = []
                const type = [] 
                const datumCode = []
                const country = feature.graphic.attributes.UNION_
                console.log("HERE2!" + country)
                datums = analysis[country].Datums_List;
                for (var datum in datums) {
                    name.push(datums[datum].datum_name)
                    extent.push(datums[datum].extent_name_1)
                    type.push(datums[datum].datum_type)
                    datumCode.push(datums[datum].object_code)
                }
                console.log("HERE3! " + datums)

                innerString = 
                    "<div><p>" + country + " has <b>" + analysis[country].Number_Datums + "</b> non-global datums.</p>" +
                    "<table id='t01' style='width: 100 % '>" +
                "<tr>" +
                    "<th>Datum</th>" +
                    "<th>EPSG Code</th>" +
                "<th>Type</th>" +
                    "<th>EPSG-Database</th>" +
                    "</tr >"

                for (var item in name) {
                    var entry = "<tr>" +
                        "<th>" + name[item] + "</th>" +
                        "<th>" + datumCode[item] +"</th>" +
                        "<th>" + type[item] + "</th>" +
                        "<th><a href='https://epsg.org/datum_" + datumCode[item] + "/" + name[item] + ".html'>Link</a></th>" +
                        "</tr >"  
                    innerString = innerString.concat(entry)
                }

                var div = innerString + "</table></div>";
                console.log(innerString)
                console.log("hi!")
                return div

            }


            var basicPopup = new Popup({
                content: " < p > { UNION } has { datum_anal } different datums, excluding global datums.</p >"
            });


//Define the popup template
            var template = {
              
                title: "{UNION_}",
                content: findDatums            

            };
             


        //load layers

            countries_EEZ = new FeatureLayer({
                url: "https://services8.arcgis.com/r4ZrjsxaQDDQnsYP/arcgis/rest/services/EEZ_country/FeatureServer",
                layerId: 2,
                renderer: countries_renderer,
                spatialReference: viewSpatialReference,
                popupTemplate: template


            });


            countries_EEZ.load();

            ocean_50m = new FeatureLayer({
            url: "https://services8.arcgis.com/r4ZrjsxaQDDQnsYP/arcgis/rest/services/ne_50m_ocean/FeatureServer/2",
            renderer: ocean_renderer,
            spatialReference: viewSpatialReference,
            minScale: 29999999
        });
            ocean_50m.load();


            ocean_110m = new FeatureLayer({
                url: "https://services8.arcgis.com/r4ZrjsxaQDDQnsYP/arcgis/rest/services/ne_110m_ocean/FeatureServer/2",
                renderer: ocean_renderer,
                spatialReference: viewSpatialReference,
                maxScale: 30000000
            });
            ocean_110m.load();


        countries_EEZ.geometry = projection.project(countries_EEZ, viewSpatialReference);
        ocean_50m.geometry = projection.project(ocean_50m, viewSpatialReference);
    

        const map = new Map({
            //            basemap: "arcgis-topographic" // Basemap layer service
            layers: [countries_EEZ, ocean_50m, ocean_110m]
        });

            view = new MapView({
                map: map,
                center: {
                    x: 0,
                    y: 0
                }, // Longitude, latitude
                zoom: 4, // Zoom level
                container: "viewDiv", // Div element
 //               spatialReference: viewSpatialReference,
                popup: basicPopup
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


            $('#description').on("click", function () {
                $('#backdrop').remove();
                $('#header').remove();
                $('#description').fadeOut(4000);
                $('#viewDiv').css({ "animation": "noBlur 1s ease 0s 1 normal forwards" });
            });


            $('#backdrop').on("click", function () {
                $('#backdrop').remove();
                $('#header').remove();
                $('#description').fadeOut(4000);
                $('#viewDiv').css({ "animation": "noBlur 1s ease 0s 1 normal forwards" });

            });









            //shapes.forEach(function (graphic) {
            //    graphic.geometry = projection.project(graphic.geometry, viewSpatialReference)
            //});
       



 //       map.add(countries_EEZ);
   //     map.add(ocean_50m);
        });
});