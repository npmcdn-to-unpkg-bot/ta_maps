import {createMap} from "./maps";

const NZ_MAP = {
    target: 'map-nz',
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
            title: 'Landcare Research',
            type: 'base',
            combine: true,
            layers: [
                getLancdareLayer('topobasemap_notext'),
                getLancdareLayer('text')
            ]
        },
        {

            className: 'Group',
            title: 'Land Information',
            type: 'base',
            combine: true,
            layers: [
                getLINZLayer({layer: 2343, maxZoom: 11}),
                getLINZLayer({layer: 2324, minZoom: 11})
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

function getLINZLayer({layer, minZoom, maxZoom}) {
    return {
        className: 'Tile',
        minZoom,
        maxZoom,
        source: {
            className: 'XYZ',
            url: `http://tiles-{a-d}.data-cdn.linz.govt.nz/services;key=65bc0122063d4dbebe7a16f80eb5f97e/tiles/v4/layer=${layer}/EPSG:3857/{z}/{x}/{y}.png`,
            attributions: [
                {
                    html: 'CC-By Land Information New Zealand. This product uses data sourced from Landcare Research under <a href="http://creativecommons.org/licenses/by/3.0/nz">CC-BY</a>'
                }
            ]
        }
    }
}

function getLancdareLayer(layer) {
    return {
        className: 'Tile',
        source: {
            className: 'XYZ',
            url: `http://maps.scinfo.org.nz/cached/tms/1.0.0/${layer}@g/{z}/{x}/{-y}.png`,
            attributions: [
                {
                    html: 'Source: Landcare Research and licensed by Landcare Research for re-use under <a href="http://creativecommons.org/licenses/by/3.0/nz/">Creative Commons CC-BY New Zealand license</a>.'
                }
            ]
        }
    };
}

function onLoad() {
    createMap(NZ_MAP);
}

document.addEventListener('DOMContentLoaded', onLoad);