import '../style/main.css';

async function onLoad() {
    console.log('onLoad TA');
    try {
        let m = await trails.getTrailMap('ta');
        m.target = 'map-ta';
        maps.createMap(m);
    } catch (e) {
        console.error('Failed TA', e);
    }
}

document.addEventListener('DOMContentLoaded', onLoad);