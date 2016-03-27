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
    view.on('change:resolution', function () {
        let z = view.getZoom(),
            newSource = z < 12 ? linzLayer.get('source250') : linzLayer.get('source50');
        linzLayer.setSource(newSource);
    });
}

document.addEventListener('DOMContentLoaded', onLoad);