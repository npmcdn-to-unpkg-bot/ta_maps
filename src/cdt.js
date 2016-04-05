import {getTrailMap} from "./trails";

function onLoad() {
    getTrailMap('cdt', 'map-cdt');
}

// window.handleClientLoad = onLoad;
window.onload = onLoad;