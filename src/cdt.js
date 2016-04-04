import {getTrailMap} from "./trails";

function onLoad() {
    getTrailMap('cdt', 'map-cdt');
}

document.addEventListener('DOMContentLoaded', onLoad);