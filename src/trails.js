const trails = {
    "layers": {
        "IsraelHiking": {
            "olClass": "layer.Tile",
            "source": {
                "olClass": "source.XYZ",
                "url": "http://osm.org.il/IsraelHiking/Tiles/{z}/{x}/{y}.png",
                "attributions": [
                    "Data © <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>"
                ],
                "minZoom": 7
            }
        },
        "Landcare Research": {
            "olClass": "layer.Group",
            "title": "Landcare Research",
            "type": "base",
            "combine": true,
            "layers": [
                {
                    "olClass": "layer.Tile",
                    "source": {
                        "olClass": "source.XYZ",
                        "url": "http://maps.scinfo.org.nz/cached/tms/1.0.0/topobasemap_notext@g/{z}/{x}/{-y}.png",
                        "attributions": [
                            "Source: Landcare Research and licensed by Landcare Research for re-use under <a href=\"http://creativecommons.org/licenses/by/3.0/nz/\">Creative Commons CC-BY New Zealand license</a>."
                        ]
                    }
                },
                {
                    "olClass": "layer.Tile",
                    "source": {
                        "olClass": "source.XYZ",
                        "url": "http://maps.scinfo.org.nz/cached/tms/1.0.0/text@g/{z}/{x}/{-y}.png"
                    }
                }
            ]
        },
        "Land Information": {
            "olClass": "layer.Group",
            "title": "Land Information",
            "type": "base",
            "combine": true,
            "layers": [
                {
                    "olClass": "layer.Tile",
                    "maxZoom": 11,
                    "source": {
                        "olClass": "source.XYZ",
                        "url": "http://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=65bc0122063d4dbebe7a16f80eb5f97e/tiles/v4/layer=2343/EPSG:3857/{z}/{x}/{y}.png",
                        "attributions": [
                            "CC-By Land Information New Zealand. This product uses data sourced from Landcare Research under <a href=\"http://creativecommons.org/licenses/by/3.0/nz\">CC-BY</a>"
                        ]
                    }
                },
                {
                    "olClass": "layer.Tile",
                    "minZoom": 11,
                    "source": {
                        "olClass": "source.XYZ",
                        "url": "http://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=65bc0122063d4dbebe7a16f80eb5f97e/tiles/v4/layer=2324/EPSG:3857/{z}/{x}/{y}.png",
                        "attributions": [
                            "CC-By Land Information New Zealand. This product uses data sourced from Landcare Research under <a href=\"http://creativecommons.org/licenses/by/3.0/nz\">CC-BY</a>"
                        ]
                    }
                }
            ]
        },
        "USA Topo": {
            "olClass": "layer.Tile",
            "source": {
                "olClass": "source.XYZ",
                "url": "http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.png",
                "attributions": [
                    "Source: Copyright:© 2013 National Geographic Society, i-cubed."
                ]
            }
        }
    },
    "trails": {
        "cdt": {
            "layers": [
                "USA Topo"
            ],
            "fit": [
                -12683252.084670175,
                3665379.860532432,
                -11759216.929447813,
                6282807.977100443
            ],
            "path": "https://dl.dropboxusercontent.com/u/3679475/CDT.kml",
            "omfg": [
                {
                    "type": "BCNav",
                    "url": "https://storage.googleapis.com/atgardner/CDT%20-%20USA%20Topo%20Maps%20-%200-15%20-%20BCNav.zip"
                },
                {
                    "type": "MBTiles",
                    "url": "https://storage.googleapis.com/atgardner/CDT%20-%20USA%20Topo%20Maps%20-%200-15%20-%20MBTiles.zip"
                }
            ]
        },
        "int": {
            "layers": [
                "IsraelHiking"
            ],
            "fit": [
                3850897.48500718,
                3729133.2989488943,
                3951488.6142304717,
                3780040.3597868215
            ],
            "path": "https://dl.dropboxusercontent.com/u/3679475/INT.gpx",
            "omfg": [
                {
                    "type": "BCNav",
                    "url": "https://storage.googleapis.com/atgardner/TA%20-%20Land%20Information%20-%200-15%20-%20BCNav.zip"
                },
                {
                    "type": "MBTiles",
                    "url": "https://storage.googleapis.com/atgardner/TA%20-%20Land%20Information%20-%200-15%20-%20MBTiles.zip"
                }
            ]
        },
        "ta": {
            "layers": [
                "Landcare Research",
                "Land Information"
            ],
            "fit": [
                18681940.61222152,
                -5881125.010165848,
                19555203.40186669,
                -4086242.168897377
            ],
            "controls": [
                "Attribution",
                "ScaleLine",
                "LayerSwitcher",
                "Zoom",
                "ZoomSlider"
            ],
            "path": "https://dl.dropboxusercontent.com/u/3679475/TeAraroaTrail_asTrack.gpx",
            "omfg": [
                {
                    "type": "BCNav",
                    "url": "https://storage.googleapis.com/atgardner/TA%20-%20Land%20Information%20-%200-15%20-%20BCNav.zip"
                },
                {
                    "type": "MBTiles",
                    "url": "https://storage.googleapis.com/atgardner/TA%20-%20Land%20Information%20-%200-15%20-%20MBTiles.zip"
                }
            ]
        }
    }
    },
    MAP_DEFAULTS = {
        controls: [
            {
                olClass: 'control.Attribution'
            },
            {
                olClass: 'control.ScaleLine',
            },
            {
                olClass: 'control.Zoom',
            },
            {
                olClass: 'control.ZoomSlider'
            }
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
        olClass: 'View',
        maxZoom: 15,
        zoom: 5
    },
    SOURCE_DEFAULTS = {
        maxZoom: 15
    };

async function getTrailsData() {
    if (window.location.hostname === 'localhost') {
        return trails;
    } else {
        const response = await fetch('https://storage.googleapis.com/atgardner-blog/trails.json');
        return await response.json();
    }
}

export async function getTrailConfig(trailName) {
    const {trails: {[trailName]: trail}, layers} = await getTrailsData();
    trail.layers = trail.layers.map(l => {
        const layer = Object.assign({}, layers[l], LAYER_DEFAULTS);
        layer.source = Object.assign({}, layer.source, SOURCE_DEFAULTS);
        return layer;
    });
    const pathClass = trail.path.split('.').pop().toUpperCase(),
        format = `format.${pathClass}`,
        pathLayer = {
            olClass: 'layer.Vector',
            type: 'overlay',
            source: Object.assign({
                olClass: 'source.Vector',
                url: trail.path,
                format: {
                    olClass: format
                }
            }, SOURCE_DEFAULTS)
        };
    if (pathClass === 'GPX') {
        pathLayer.style = {
            olClass: 'style.Style',
            stroke: {
                olClass: 'style.Stroke',
                color: 'red',
                width: 1
            }
        }
    }

    trail.layers.push(pathLayer);
    trail.view = Object.assign({}, trail.view, VIEW_DEFAULTS);
    return Object.assign({}, trail, MAP_DEFAULTS);
}
