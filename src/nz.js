import {getTrailMap} from "./trails";

function onLoad() {
    getTrailMap('ta', 'map-nz');
}

document.addEventListener('DOMContentLoaded', onLoad);