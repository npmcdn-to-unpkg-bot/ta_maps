import '../style/main.css';

async function onLoad() {
    console.log('onLoad INT');
    try {
        let m = await trails.getTrailMap('int');
        m.target = 'map-int';
        maps.createMap(m);
    } catch (e) {
        console.error('Failed INT', e);
    }
}

document.addEventListener('DOMContentLoaded', onLoad);