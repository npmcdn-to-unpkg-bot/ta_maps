import ol from "openlayers";
import "../style/main.css";
import "openlayers/dist/ol.css";
import "ol3-layerswitcher/src/ol3-layerswitcher";
import "ol3-layerswitcher/src/ol3-layerswitcher.css";

function getUSTopoLayer() {
    const html = 'Source: Copyright:© 2013 National Geographic Society, i-cubed</a>.';
    let url = 'http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.png',
        attribution = new ol.Attribution({html}),
        source = getXYZSource(url, attribution);
    return new ol.layer.Tile({
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
}

function getXYZSource(url, attribution) {
    return new ol.source.XYZ({
        attributions: [
            attribution
        ],
        maxZoom: 15,
        url: url
    });
}

function getTrailLayer() {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://dl.dropboxusercontent.com/u/3679475/CDT.kml',
            format: new ol.format.KML({
                showPointNames: true
            })
        }),
        updateWhileAnimating: true,
        updateWhileInteracting: true
    });
}

function onLoad() {
    let view = new ol.View({
            center: ol.proj.fromLonLat([
                -106.8260192,
                37.4833574
            ]),
            extent: ol.proj.fromLonLat([
                -179.999988540844,
                -88.9999999216112
            ]).concat(ol.proj.fromLonLat([
                179.999988540844,
                88.999999921611
            ])),
            maxZoom: 15,
            minZoom: 5,
            zoom: 5
        }),
        map = new ol.Map({
            target: 'map-cdt',
            controls: [
                new ol.control.Attribution(),
                new ol.control.ScaleLine(),
                new ol.control.Zoom(),
                new ol.control.ZoomSlider()
            ],
            layers: [
                getUSTopoLayer(),
                getTrailLayer()
            ],
            loadTilesWhileAnimating: true,
            loadTilesWhileInteracting: true,
            view: view
        });
}

function createSource({attribution, url}) {
    return new ol.source.XYZ({
        attributions: [
            attribution
        ],
        maxZoom: 15,
        url: url
    });
}

function createLayer({title, source, extent}) {
    source = createSource(source);
    return new ol.layer.Tile({
        title: title,
        type: 'base',
        extent: extent,
        preload: 7,
        source: source
    });
}

function createView({center, extent}) {
    return new ol.View({
        center: center,
        extent: extent,
        maxZoom: 15,
        minZoom: 5,
        zoom: 5
    });
}

//target, [title, attribution, url, extent], {center, extent}
function createMap({target, layers: [], view}) {
    layers = layers.forEach(l => createLayer(l));
    view = createView({center, extent});
    return new ol.Map({
        target: target,
        controls: [
            new ol.control.Attribution(),
            new ol.control.ScaleLine(),
            new ol.control.Zoom(),
            new ol.control.ZoomSlider()
        ],
        layers: layers,
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
        view: view
    });
}

document.addEventListener('DOMContentLoaded', onLoad);