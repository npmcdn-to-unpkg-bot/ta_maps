import '../style/main.css';
import {createMap} from './maps';

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
            },
            minZoom: 5
        },
        {
            className: 'Vector',
            source: {
                className: 'Vector',
                url: 'https://dl.dropboxusercontent.com/u/3679475/CDT.kml',
                format: {
                    className: 'KML',
                    showPointNames: true
                }
            }
        }
    ]
};

function onLoad() {
    createMap(CDT_MAP);
}

document.addEventListener('DOMContentLoaded', onLoad);