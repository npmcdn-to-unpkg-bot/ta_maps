// import ol from 'openlayers';
// import 'openlayers/dist/ol.css';
// import 'ol3-layerswitcher/src/ol3-layerswitcher';
// import 'ol3-layerswitcher/src/ol3-layerswitcher.css';
import "../style/main.css";
import {createMap} from "./maps";

const NZ_MAP = {
    target: 'map-nz1',
    fit: [18681940.61222152, -5881125.010165848, 19555203.40186669, -4086242.168897377],
    controls: [
        'Attribution',
        'ScaleLine',
        'LayerSwitcher',
        'Zoom',
        'ZoomSlider'
    ],
    layers: [
        {
            className: 'Group',
            title: 'Land Information',
            preload: 7,
            layers: [
                {
                    className: 'Tile',
                    title: 'Land Information 1',
                    maxZoom: 11,
                    source: {
                        className: 'XYZ',
                        url: getLINZUrl(2343),
                        attributions: [
                            {
                                html: 'CC-By Land Information New Zealand. This product uses data sourced from Landcare Research under <a href="http://creativecommons.org/licenses/by/3.0/nz">CC-BY</a>'
                            }
                        ]
                    }
                },
                {
                    className: 'Tile',
                    title: 'Land Information 2',
                    minZoom: 11,
                    source: {
                        className: 'XYZ',
                        url: getLINZUrl(2324),
                        attributions: [
                            {
                                html: 'CC-By Land Information New Zealand. This product uses data sourced from Landcare Research under <a href="http://creativecommons.org/licenses/by/3.0/nz">CC-BY</a>'
                            }
                        ]
                    }
                },
            ]
        },
        {
            className: 'Vector',
            type: 'overlay',
            source: {
                className: 'Vector',
                url: 'https://dl.dropboxusercontent.com/u/3679475/TeAraroaTrail_asTrack.gpx',
                format: {
                    className: 'GPX'
                }
            },
            style: {
                stroke: {
                    color: 'red',
                    width: 2
                }
            }
        }
    ]
};

function getTrailLayer() {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://dl.dropboxusercontent.com/u/3679475/TeAraroaTrail_asTrack.gpx',
            format: new ol.format.GPX()
        }),
        style: new ol.style.Style({
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
        })
    });
}

function getLINZUrl(layer) {
    return `http://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=65bc0122063d4dbebe7a16f80eb5f97e/tiles/v4/layer=${layer}/EPSG:3857/{z}/{x}/{y}.png`;
}

function getLINZLayer() {
    const html = 'CC-By Land Information New Zealand. This product uses data sourced from Landcare Research under <a href="http://creativecommons.org/licenses/by/3.0/nz">CC-BY</a>';
    let url50 = getLINZUrl(2343),
        url250 = getLINZUrl(2324),
        source50 = getXYZSource(url50, html),
        source250 = getXYZSource(url250, html),
        layer = new ol.layer.Tile({
            title: 'Land Information',
            type: 'base',
            extent: ol.proj.fromLonLat([
                166.31571873,
                -47.5345551556
            ]).concat(ol.proj.fromLonLat([
                178.610868168,
                -34.030252207
            ])),
            preload: 7,
            source: source250
        });
    layer.set('source50', source50);
    layer.set('source250', source250);
    return layer;
}

function getLandcareLayers() {
    const html = 'Source: Landcare Research and licensed by Landcare Research for re-use under <a href="http://creativecommons.org/licenses/by/3.0/nz/">Creative Commons CC-BY New Zealand license</a>.';
    let topobaseLayer = getLandcareLayer('topobasemap_notext', html),
        textLayer = getLandcareLayer('text', html, true);
    topobaseLayer.set('textLayer', textLayer);
    return topobaseLayer;
}

function getLandcareLayer(layer, html, overlay = false) {
    let url = 'http://maps.scinfo.org.nz/cached/tms/1.0.0/' + layer + '@g/{z}/{x}/{-y}.png',
        source = getXYZSource(url, html);
    return new ol.layer.Tile({
        title: 'Landcare Research',
        type: overlay ? 'overlay' : 'base',
        extent: ol.proj.fromLonLat([
            165,
            -48
        ]).concat(ol.proj.fromLonLat([
            179.5,
            -33
        ])),
        preload: 7,
        source: source
    });
}

function getXYZSource(url, html) {
    let attribution = new ol.Attribution({html});
    return new ol.source.XYZ({
        attributions: [
            attribution
        ],
        maxZoom: 15,
        url: url
    });
}

function onLoad() {
    // let landcareLayer = getLandcareLayers(),
    //     linzLayer = getLINZLayer(),
    //     view = new ol.View({
    //         center: ol.proj.fromLonLat([
    //             174.6217726,
    //             -41.244027
    //         ]),
    //         extent: ol.proj.fromLonLat([
    //                 166.31571873,
    //                 -47.5345551556])
    //             .concat(ol.proj.fromLonLat([
    //                 178.610868168,
    //                 -34.030252207
    //             ])),
    //         maxZoom: 15,
    //         minZoom: 5,
    //         zoom: 5
    //     }),
    //     map = new ol.Map({
    //         target: 'map-nz',
    //         controls: [
    //             new ol.control.Attribution(),
    //             new ol.control.ScaleLine(),
    //             new ol.control.LayerSwitcher(),
    //             new ol.control.Zoom(),
    //             new ol.control.ZoomSlider()
    //         ],
    //         layers: [
    //             landcareLayer,
    //             linzLayer,
    //             getTrailLayer()
    //         ],
    //         loadTilesWhileAnimating: true,
    //         loadTilesWhileInteracting: true,
    //         view: view
    //     });
    // landcareLayer.on('change:visible', function (e) {
    //     let newValue = landcareLayer.getVisible();
    //     if (newValue !== e.oldValue) {
    //         let textLayer = landcareLayer.get('textLayer'),
    //             mapElement = document.getElementById('map-nz');
    //         if (newValue) {
    //             mapElement.classList.remove('linz');
    //             mapElement.classList.add('landcare');
    //             textLayer.setMap(map);
    //         } else {
    //             mapElement.classList.add('linz');
    //             mapElement.classList.remove('landcare');
    //             textLayer.setMap();
    //         }
    //     }
    // });
    // view.on('change:resolution', function () {
    //     let z = view.getZoom(),
    //         newSource = z < 12 ? linzLayer.get('source250') : linzLayer.get('source50');
    //     linzLayer.setSource(newSource);
    // });
    // window.m1 = map;
    createMap(NZ_MAP);
}

document.addEventListener('DOMContentLoaded', onLoad);