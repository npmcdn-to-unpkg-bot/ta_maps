import "../style/main.css";
import {getTrailConfig} from "./trails";

async function onLoad() {
    debugger;
    console.log('onLoad INT');
    try {
        const config = await getTrailConfig('int');
        config.target = 'map-int';
        const map = olWrapper.createOlObject(config),
            view = map.getView();
        view.fit(config.fit, map.getSize());
        console.log('Done loading INT');
    } catch (e) {
        console.error('Failed INT', e);
    }
}

document.addEventListener('DOMContentLoaded', onLoad);