import {createMap} from "./maps";

let apiKey = 'AIzaSyB2e4nLfLBwK_5O7ofehrIi2394m5UbNkk',
    loadPromise;

async function loadApi() {
    if (!loadPromise) {
        gapi.client.setApiKey(apiKey);
        loadPromise = gapi.client.load('storage', 'v1');
    }

    await loadPromise;
}

async function getObject(bucket, object) {
    await loadApi();
    console.time('getObject');
    let trails = await gapi.client.storage.objects.get({
        bucket: bucket,
        object: object
    });
    let res = await gapi.client.request({
        path: trails.result.mediaLink
    });
    console.timeEnd('getObject');
    return res.result;
}

export async function getTrailMap(trailName, target) {
    let data = await getObject('atgardner-blog', 'trails.json'),
        trails = a.trails,
        trail = trails[trailName];
    trail.target = target;
    trail.layers = trail.layers.map(l => data.layers[l]);
    let pathClass = trail.path.split('.').pop().toUpperCase(),
        pathLayer = {
            className: 'Vector',
            type: 'overlay',
            source: {
                className: 'Vector',
                url: trail.path,
                format: {
                    className: pathClass
                }
            }
        };
    if (pathClass === 'GPX') {
        pathLayer.style = {
            stroke: {
                color: 'red',
                width: 1
            }
        }
    }

    trail.layers.push(pathLayer);
    createMap(trail);
}
