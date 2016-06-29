import "../style/main.css";
import {getTrailConfig} from "./trails";

async function onLoad() {
    try {
        const config = await getTrailConfig('int');
        config.target = 'map-int';
        const map = olWrapper.createOlObject(config),
            view = map.getView();
        view.fit(config.fit, map.getSize());
    } catch (e) {
        console.error('Failed INT', e);
    }
}

document.addEventListener('DOMContentLoaded', onLoad);