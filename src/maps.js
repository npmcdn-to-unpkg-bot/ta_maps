import ol from 'openlayers';
import 'openlayers/dist/ol.css';

function createXYZSource({html, url}) {
    return new ol.source.XYZ({
        attributions: [
            new ol.Attribution({html})
        ],
        maxZoom: 15,
        url
    });
}

function createVectorSource({url}) {
    return new ol.source.Vector({
        url,
        format: new ol.format.KML({
            showPointNames: true
        })
    });
}

function createSource({type}) {
    return type === 'xyz' ? createXYZSource.apply(this, arguments) : createVectorSource.apply(this, arguments);
}

function createTileLayer({source}) {
    return new ol.layer.Tile({
        type: 'base',
        preload: 7,
        source: createSource(source)
    });
}

function createVectorLayer({source}) {
    let layer = new ol.layer.Vector({
        source: createSource(source),
        updateWhileAnimating: true,
        updateWhileInteracting: true
    });
    layer.getSource().once('change', (e) => {
        layer.setExtent(e.target.getExtent());
    });
    return layer;
}

function createLayer({type}) {
    return type === 'tile' ? createTileLayer.apply(this, arguments) : createVectorLayer.apply(this, arguments);
}

function createView({center}) {
    return new ol.View({
        center: ol.proj.fromLonLat(center),
        maxZoom: 15,
        zoom: 5
    });
}

export function createMap({target, layers, view} = {layers: []}) {
    let map = new ol.Map({
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
    map.getLayers().forEach(l => {
        if (l instanceof ol.layer.Vector) {
            l.once('change:extent', (e) => {
                let view = map.getView(),
                    extent = e.target.getExtent();
                view.fit(extent, map.getSize());
                view.setExtent(extent);
            });
        }
    });
    return map;
}