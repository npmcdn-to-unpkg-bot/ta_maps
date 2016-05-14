import {getTrailMap} from './trails';

function onLoad() {
    console.log('onLoad');
    try {
        getTrailMap('int', 'map-int');
    } catch (e) {
        console.error('Failed int', e);
    }
}

document.addEventListener('DOMContentLoaded', onLoad);