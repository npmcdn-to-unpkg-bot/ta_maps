import ol from "openlayers";
import "../style/main.css";
import "openlayers/dist/ol.css";
import "ol3-layerswitcher/src/ol3-layerswitcher";
import "ol3-layerswitcher/src/ol3-layerswitcher.css";

function getUSTopoLayer() {
    const html = 'Source: Copyright:© 2013 National Geographic Society, i-cubed</a>.';
    let url = 'http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.png',
        attribution = new ol.Attribution({html}),
        source = getXYZSource(url, attribution),
        layer = new ol.layer.Tile({
            title: 'Land Information',
            type: 'base',
            extent: ol.proj.fromLonLat([
                -179.999988540844,
                -88.9999999216112
            ]).concat(ol.proj.fromLonLat([
                179.999988540844,
                88.999999921611
            ])),
            preload: 7,
            source: source
        });
    return layer;
}

function getXYZSource(url, attribution) {
    return new ol.source.XYZ({
        attributions: [
            attribution
        ],
        maxZoom: 16,
        url: url
    });
}

let style = new ol.style.Style({
    image: new ol.style.Circle({
        fill: new ol.style.Fill({
            color: 'blue'
        }),
        radius: 3
    }),
    stroke: new ol.style.Stroke({
        color: 'red',
        width: 3
    }),
    text: new ol.style.Text({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 3
        })
    })
});

function getTrailLayer() {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            // url: 'https://doc-00-1g-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/5rc6qig8jduo8rehoj4j3isv0cefacev/1457265600000/12298955068936497401/*/0B_DXc1YJDxkHU0VoMW93eGhKM1k?e=download',
            url: 'https://dl.dropboxusercontent.com/u/3679475/doc.kml',
            format: new ol.format.KML({
                extractStyles: false,
                showPointNames: true
            })
        }),
        style: function (feature, resolution) {
            return style;
        },
        updateWhileAnimating: true,
        updateWhileInteracting: true
    });
}

function onLoad() {
    let view = new ol.View({
            center: ol.proj.fromLonLat([
                -108.2964364,
                32.7730533
            ]),
            extent: ol.proj.fromLonLat([
                -179.999988540844,
                -88.9999999216112
            ]).concat(ol.proj.fromLonLat([
                179.999988540844,
                88.999999921611
            ])),
            maxZoom: 16,
            minZoom: 5,
            zoom: 12
        }),
        map = new ol.Map({
            target: 'map',
            controls: [
                new ol.control.Attribution(),
                new ol.control.ScaleLine(),
                new ol.control.Zoom(),
                new ol.control.ZoomSlider()
            ],
            layers: [
                getUSTopoLayer(),
                // getTrailLayer()
            ],
            loadTilesWhileAnimating: true,
            loadTilesWhileInteracting: true,
            view: view
        });
    view.on('change:resolution', function () {
        let z = view.getZoom(),
            newSource = z < 12 ? linzLayer.get('source250') : linzLayer.get('source50');
        linzLayer.setSource(newSource);
    });
}

document.addEventListener('DOMContentLoaded', onLoad);