var colorRamp
var countries_renderer
var ocean_renderer

require(["esri/renderers/ClassBreaksRenderer", "esri/renderers/SimpleRenderer"], function (ClassBreaksRenderer, SimpleRenderer) {

    colorRamp = ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000']
    countries_renderer = new ClassBreaksRenderer({
        type: "class-breaks",
        field: "datum_anal",
            classBreakInfos: [
            {
                minValue: 0,
                maxValue: 2.0,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: colorRamp[0],
                    style: "solid",
                    outline: {
                        width: 0.7,
                        color: "#828282"
                    }
                    },
                label: "0 - 2"
            },
            {
                minValue: 2.1,
                maxValue: 9.0,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: colorRamp[1],
                    style: "solid",
                    outline: {
                        width: 0.7,
                        color: "#828282"
                    }
                },
                label: "3 - 9"
            },
            {
                minValue: 9.1,
                maxValue: 17.0,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: colorRamp[2],
                    style: "solid",
                    outline: {
                        width: 0.7,
                        color: "#E1E1E1"
                    }
                },
                label: "10 - 17"
            },
            {
                minValue: 17.1,
                maxValue: 22.0,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: colorRamp[3],
                    style: "solid",
                    outline: {
                        width: 0.7,
                        color: "#E1E1E1"
                    }
                },
                label: "18 - 22"
            },
            {
                minValue: 22.1,
                maxValue: 35,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: colorRamp[4],
                    style: "solid",
                    outline: {
                        width: 0.7,
                        color: "#E1E1E1"
                    }
                },
                label: "23 - 28"
            }
        ]
    }
    );

    ocean_renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill",
            color: [221, 243, 255, 0.5],
            outline: {
                width: 1.0,
                color: "#343434"
            }


        }
    };

    highlight_renderer = {

    }

});