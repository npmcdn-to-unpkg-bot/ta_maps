import '../style/main.css';
import getTrailMap from './trails';
import createMap from './maps';

async function onLoad() {
    debugger;
    console.log('onLoad INT');
    try {
        let m = await getTrailMap('int');
        m.target = 'map-int';
        createMap(m);
    } catch (e) {
        console.error('Failed INT', e);
    }
}

document.addEventListener('DOMContentLoaded', onLoad);