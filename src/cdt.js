import {createMap} from "./maps";
import {getTrailMap} from "./trails";

const CDT_MAP = {
    target: 'map-cdt',
    layers: [
        {
            className: 'Tile',
            source: {
                className: 'XYZ',
                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.png',
                attributions: [
                    {
                        html: 'Source: Copyright:© 2013 National Geographic Society, i-cubed.'
                    }
                ]
            }
        },
        {
            className: 'Vector',
            type: 'overlay',
            source: {
                className: 'Vector',
                url: 'https://dl.dropboxusercontent.com/u/3679475/CDT.kml',
                format: {
                    className: 'KML'
                }
            }
        }
    ],
    fit: [-12683252.084670175, 3665379.860532432, -11759216.929447813, 6282807.977100443]
};

function onLoad() {
    createMap(CDT_MAP);
    getTrailMap('cdt');
}

window.onload = onLoad;
// document.addEventListener('DOMContentLoaded', onLoad);