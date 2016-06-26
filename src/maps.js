import ol from 'openlayers';

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

function addListeners(object, config) {
    if (!config.listeners) {
        return;
    }

    for (let type in config.listeners) {
        let listener = config.listeners[type];
        let fn,
            scope,
            once = false;
        if (listener.fn) {
            fn = listener.fn;
            scope = listener.opt_this;
            once = listener.once;
        } else {
            fn = listener;
        }

        object[once ? 'once' : 'on'](type, fn, scope);
    }
}

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
    if (!config) {
        return;
    }

    config = Object.assign({}, SOURCE_DEFAULTS, config);
    Object.assign(config, {
        attributions: createAttributions(config.attributions),
        format: createFormat(config.format)
    });

    let source = new ol.source[config.className](config);
    addListeners(source, config);
    return source
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

function createLayer(config) {
    config = Object.assign({}, LAYER_DEFAULTS, config);
    Object.assign(config, {
        layers: createLayers(config.layers),
        source: createSource(config.source),
        style: createStyle(config.style)
    });
    let layer = new ol.layer[config.className](config);
    addListeners(layer, config);
    return layer;
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

function calcResolutionForZoom(view, zoom) {
    return zoom && view.constrainResolution(view.getResolution() * Math.pow(2, view.getZoom()), zoom);
}

export default function createMap(config) {
    config = Object.assign({}, MAP_DEFAULTS, config);
    Object.assign(config, {
        controls: createControls(config.controls),
        //interactions: createInteractions(config.interactions),
        layers: createLayers(config.layers),
        //overlays: createOverlays(config.overlays),
        //renderer: createRenderer(config.renderer),
        view: createView(config.view)
    });
    let map = new ol.Map(config),
        view = map.getView(),
        setMinMaxZoom = layer => {
            if (layer.get('minZoom')) {
                layer.setMinResolution(calcResolutionForZoom(view, layer.get('minZoom')));
            }

            if (layer.get('maxZoom')) {
                layer.setMaxResolution(calcResolutionForZoom(view, layer.get('maxZoom')));
            }

            if (layer.getLayers && layer.getLayers()) {
                layer.getLayers().forEach(setMinMaxZoom);
            }
        };
    if (config.fit) {
        view.fit(config.fit, map.getSize());
    }

    map.getLayers().forEach(setMinMaxZoom);
    return map;
}
