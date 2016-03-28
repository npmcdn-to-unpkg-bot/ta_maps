import ol from "openlayers";
import "../style/main.css";
import "openlayers/dist/ol.css";
import "ol3-layerswitcher/src/ol3-layerswitcher";
import "ol3-layerswitcher/src/ol3-layerswitcher.css";

const CDT_MAP = {
    target: 'map-cdt',
    layers: [
        {
            type: 'tile',
            source: {
                attribution: 'Source: Copyright:© 2013 National Geographic Society, i-cubed</a>.',
                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.png'
            },
            extent: [
                -179.999988540844,
                -88.9999999216112,
                179.999988540844,
                88.999999921611
            ]
        },
        {
            type: 'vector',
            url: 'https://dl.dropboxusercontent.com/u/3679475/CDT.kml'
        }
    ],
    view: {
        center: [
            -106.8260192,
            37.4833574
        ],
        extent: [
            -179.999988540844,
            -88.9999999216112,
            179.999988540844,
            88.999999921611
        ]
    }
};

function onLoad() {
    createMap(CDT_MAP);
}

function createSource({attribution, url}) {
    return new ol.source.XYZ({
        attributions: [
            new ol.Attribution({attribution})
        ],
        maxZoom: 15,
        url
    });
}

function createTileLayer({source, extent}) {
    return new ol.layer.Tile({
        type: 'base',
        extent: ol.proj.fromLonLat([
            extent[0],
            extent[1]
        ]).concat(ol.proj.fromLonLat([
            extent[2],
            extent[3]
        ])),
        preload: 7,
        source: createSource(source)
    });
}

function createVectorLayer({url}) {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            url,
            format: new ol.format.KML({
                showPointNames: true
            })
        }),
        updateWhileAnimating: true,
        updateWhileInteracting: true
    });
}

function createLayer({type}) {
    return type === 'tile' ? createTileLayer.apply(this, arguments) : createVectorLayer.apply(this, arguments);
}

function createView({center, extent}) {
    return new ol.View({
        center: ol.proj.fromLonLat(center),
        extent: ol.proj.fromLonLat([
            extent[0],
            extent[1]
        ]).concat(ol.proj.fromLonLat([
            extent[2],
            extent[3]
        ])),
        maxZoom: 15,
        minZoom: 5,
        zoom: 5
    });
}

//target, [{attribution, url}, extent], {center, extent}
function createMap({target, layers, view} = {layers: []}) {
    return new ol.Map({
        target,
        controls: [
            new ol.control.Attribution(),
            new ol.control.ScaleLine(),
            new ol.control.Zoom(),
            new ol.control.ZoomSlider()
        ],
        layers: layers.map(createLayer),
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true,
        view: createView(view)
    });
}

document.addEventListener('DOMContentLoaded', onLoad);