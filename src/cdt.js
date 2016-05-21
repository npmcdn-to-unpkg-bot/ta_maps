import '../style/main.css';

async function onLoad() {
    console.log('onLoad CDT');
    try {
        let m = await trails.getTrailMap('cdt');
        m.target = 'map-cdt';
        maps.createMap(m);
    } catch (e) {
        console.error('Failed CDT', e);
    }
}

document.addEventListener('DOMContentLoaded', onLoad);