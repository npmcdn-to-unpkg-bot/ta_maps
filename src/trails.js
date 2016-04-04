import {createMap} from "./maps";

const a = {
    "layers": {
        "USA Topo": {
            "className": "Tile",
            "source": {
                "className": "XYZ",
                "url": "http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.png",
                "attributions": [
                    {
                        "html": "Source: Copyright:© 2013 National Geographic Society, i-cubed."
                    }
                ]
            }
        },
        "Landcare Research": {
            "className": "Group",
            "title": "Landcare Research",
            "type": "base",
            "combine": true,
            "layers": [
                {
                    "className": "Tile",
                    "source": {
                        "className": "XYZ",
                        "url": "http://maps.scinfo.org.nz/cached/tms/1.0.0/topobasemap_notext@g/{z}/{x}/{-y}.png",
                        "attributions": [
                            {
                                "html": "Source: Landcare Research and licensed by Landcare Research for re-use under <a href=\"http://creativecommons.org/licenses/by/3.0/nz/\">Creative Commons CC-BY New Zealand license</a>."
                            }
                        ]
                    }
                },
                {
                    "className": "Tile",
                    "source": {
                        "className": "XYZ",
                        "url": "http://maps.scinfo.org.nz/cached/tms/1.0.0/text@g/{z}/{x}/{-y}.png"
                    }
                }
            ]
        },
        "Land Information": {
            "className": "Group",
            "title": "Land Information",
            "type": "base",
            "combine": true,
            "layers": [
                {
                    "className": "Tile",
                    "maxZoom": 11,
                    "source": {
                        "className": "XYZ",
                        "url": "http://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=65bc0122063d4dbebe7a16f80eb5f97e/tiles/v4/layer=2343/EPSG:3857/{z}/{x}/{y}.png",
                        "attributions": [
                            {
                                "html": "CC-By Land Information New Zealand. This product uses data sourced from Landcare Research under <a href=\"http://creativecommons.org/licenses/by/3.0/nz\">CC-BY</a>"
                            }
                        ]
                    }
                },
                {
                    "className": "Tile",
                    "minZoom": 11,
                    "source": {
                        "className": "XYZ",
                        "url": "http://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=65bc0122063d4dbebe7a16f80eb5f97e/tiles/v4/layer=2324/EPSG:3857/{z}/{x}/{y}.png",
                        "attributions": [
                            {
                                "html": "CC-By Land Information New Zealand. This product uses data sourced from Landcare Research under <a href=\"http://creativecommons.org/licenses/by/3.0/nz\">CC-BY</a>"
                            }
                        ]
                    }
                }
            ]
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
};

let apiKey = 'AIzaSyB2e4nLfLBwK_5O7ofehrIi2394m5UbNkk',
    loadPromise;

async function loadApi() {
    if (!loadPromise) {
        gapi.client.setApiKey(apiKey);
        loadPromise = gapi.client.load('storage', 'v1');
    }

    await loadPromise;
}

async function getObject(bucket, object) {
    await loadApi();
    console.time('getObject');
    let trails = await gapi.client.storage.objects.get({
        bucket: bucket,
        object: object
    });
    let res = await gapi.client.request({
        path: trails.result.mediaLink
    });
    console.timeEnd('getObject');
    return res.result;
}

export async function getTrailMap(trailName, target) {
    let data = a, //await getObject('atgardner-blog', 'trails.json'),
        trails = a.trails,
        trail = trails[trailName];
    trail.target = target;
    trail.layers = trail.layers.map(l => data.layers[l]);
    let pathClass = trail.path.split('.').pop().toUpperCase(),
        pathLayer = {
            className: 'Vector',
            type: 'overlay',
            source: {
                className: 'Vector',
                url: trail.path,
                format: {
                    className: pathClass
                }
            }
        };
    if (pathClass === 'GPX') {
        pathLayer.style = {
            stroke: {
                color: 'red',
                width: 1
            }
        }
    }

    trail.layers.push(pathLayer);
    createMap(trail);
}
