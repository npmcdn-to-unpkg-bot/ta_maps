import ol from "openlayers";
import "openlayers/dist/ol.css";

function createXYZSource({html, url}) {
    return new ol.source.XYZ({
        attributions: [
            new ol.Attribution({html})
        ],
        maxZoom: 15,
        url
    });
}

function createKmlSource({url}) {
    return new ol.source.Vector({
        url,
        format: new ol.format.KML({
            showPointNames: true
        })
    });
}

function createGpxSource({url}) {
    return new ol.source.Vector({
        url,
        format: new ol.format.GPX()
    });
}

function createSource(config) {
    switch (config.type) {
        case 'xyz':
            return createXYZSource(config);
        case 'kml':
            return createKmlSource(config);
        case 'gpx':
            return createGpxSource(config);
        default:
            throw new Error(`Invalid source type ${type}`);
    }
}

function createTileLayer({source, minResolution, maxResolution} = {minResolution: 10, maxResolution: 13}) {
    return new ol.layer.Tile({
        type: 'base',
        preload: 7,
        source: createSource(source),
        minResolution,
        maxResolution
    });
}

function createVectorLayer({source}) {
    let layer = new ol.layer.Vector({
        source: createSource(source),
        updateWhileAnimating: true,
        updateWhileInteracting: true
    });
    if (source.type === 'gpx') {
        layer.setStyle(new ol.style.Style({
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
        }));
    }

    layer.getSource().once('change', (e) => {
        layer.setExtent(e.target.getExtent());
    });
    return layer;
}

function createLayer(config) {
    switch (config.type) {
        case 'tile':
            return createTileLayer(config);
        case 'vector':
            return createVectorLayer(config);
        default:
            throw new Error(`Invalid layer type ${type}`);
    }
}

function createView({center} = {center: [0, 0]}) {
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
            });
        }
    });
    return map;
}