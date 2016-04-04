import {getTrailMap} from "./trails";

function onLoad() {
    getTrailMap('cdt', 'map-cdt');
}

window.onload = onLoad;
// document.addEventListener('DOMContentLoaded', onLoad);