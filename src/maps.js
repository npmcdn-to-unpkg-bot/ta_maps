import ol from 'openlayers';
import 'openlayers/dist/ol.css';

const MAP_DEFAULTS = {
        controls: [
            'Attribution',
            'ScaleLine',
            'Zoom',
            'ZoomSlider'
        ],
        loadTilesWhileAnimating: true,
        loadTilesWhileInteracting: true
    },
    LAYER_DEFAULTS = {
        type: 'base',
        preload: 7,

        // for VectorLayer
        updateWhileAnimating: true,
        updateWhileInteracting: true
    },
    VIEW_DEFAULTS = {
        maxZoom: 15,
        zoom: 5
    },
    SOURCE_DEFAULTS = {
        maxZoom: 15
    };

function createControl(config) {
    let className = typeof config === 'string' ? config : config.className;
    return new ol.control[className](config);
}

function createControls(controls) {
    return controls && controls.map(createControl);
}

function createAttribution(config) {
    return new ol.Attribution(config);
}

function createAttributions(attributions) {
    return attributions && attributions.map(createAttribution);
}

function createFormat(config) {
    return config && new ol.format[config.className](config);
}

function createSource(config) {
    config = Object.assign({}, SOURCE_DEFAULTS, config);
    Object.assign(config, {
        attributions: createAttributions(config.attributions),
        format: createFormat(config.format)
    });

    return new ol.source[config.className](config);
}

function createGeometryCollection(config) {
    config = Object.assign({}, config);
    config.geometries = config.geometries.map(createGeometry);
    return new ol.geom.GeometryCollection(config);
}

function createGeometry(config) {
    if (!config) {
        return;
    }

    //TODO: create geometries
    return config.className === 'GeometryCollection' ? createGeometryCollection(config) : undefined; //new ol.geom[config.className](config);
}

function createFill(config) {
    return config && new ol.style.Fill(config);
}

function createImage(config) {
    if (!config) {
        return;
    }

    config = Object.assign({}, config);
    Object.assign(config, {
        fill: createFill(config.fill),
        stroke: createStroke(config.stroke)
    });
    return new ol.style[config.className](config);
}

function createStroke(config) {
    return config && new ol.style.Stroke(config);
}

function createText(config) {
    if (!config) {
        return;
    }

    config = Object.assign({}, config);
    Object.assign(config, {
        fill: createFill(config.fill),
        stroke: createStroke(config.stroke)
    });
    return new ol.style.Text(config);
}

function createStyle(config) {
    if (!config) {
        return;
    }

    config = Object.assign({}, config);
    Object.assign(config, {
        geometry: createGeometry(config.geometry),
        fill: createFill(config.fill),
        image: createImage(config.image),
        stroke: createStroke(config.stroke),
        text: createText(config.text)
    });
    return new ol.style.Style(config);
}

// function createVectorLayer(config) {
//     layer.getSource().once('change', (e) => {
//         layer.setExtent(e.target.getExtent());
//     });
//     return layer;
// }

function createLayer(config) {
    config = Object.assign({}, LAYER_DEFAULTS, config);
    Object.assign(config, {
        source: createSource(config.source),
        style: createStyle(config.style)
    });
    return new ol.layer[config.className](config);
}

function createLayers(layers) {
    return layers && layers.map(createLayer);
}

function createCenter(config) {
    return config ? ol.proj.fromLonLat(config.center, config.projection) : ol.proj.fromLonLat([0, 0]);

}

function createView(config) {
    config = Object.assign({}, VIEW_DEFAULTS, config);
    Object.assign(config, {
        center: createCenter(config.center)
    });
    return new ol.View(config);
}

export function createMap(config) {
    config = Object.assign({}, MAP_DEFAULTS, config);
    Object.assign(config, {
        controls: createControls(config.controls),
        //interactions: createInteractions(config.interactions),
        layers: createLayers(config.layers),
        //overlays: createOverlays(config.overlays),
        //renderer: createRenderer(config.renderer),
        view: createView(config.view)
    });
    let map = new ol.Map(config);
    map.getLayers().forEach(l => {
        if (l instanceof ol.layer.Vector) {
            l.once('change:extent', (e) => {
                let view = map.getView(),
                    extent = e.target.getExtent();
                view.fit(extent, map.getSize());
            });
        }
    });
    window.m = map;
    return map;
}
