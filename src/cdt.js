import '../style/main.css';
import {createMap} from './maps';

const CDT_MAP = {
    target: 'map-cdt',
    layers: [
        {
            type: 'tile',
            source: {
                type: 'xyz',
                html: 'Source: Copyright:© 2013 National Geographic Society, i-cubed.',
                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.png'
            }
        },
        {
            type: 'vector',
            source: {
                type: 'kml',
                url: 'https://dl.dropboxusercontent.com/u/3679475/CDT.kml'
            }
        }
    ],
    view: {
        center: [
            -106.8260192,
            37.4833574
        ]
    }
};

function onLoad() {
    createMap(CDT_MAP);
}

document.addEventListener('DOMContentLoaded', onLoad);