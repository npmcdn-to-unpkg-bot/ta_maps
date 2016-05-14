import {createMap} from "./maps";

// let apiKey = 'AIzaSyB2e4nLfLBwK_5O7ofehrIi2394m5UbNkk',
//     loadPromise;
//
// async function loadApi() {
//     if (!loadPromise) {
//         gapi.client.setApiKey(apiKey);
//         loadPromise = gapi.client.load('storage', 'v1');
//     }
//
//     await loadPromise;
// }
//
// async function getObject(bucket, object) {
//     await loadApi();
//     console.time('getObject');
//     let trails = await gapi.client.storage.objects.get({
//         bucket: bucket,
//         object: object
//     });
//     let res = await gapi.client.request({
//         path: trails.result.mediaLink
//     });
//     console.timeEnd('getObject');
//     return res.result;
// }

async function getTrailData() {
    let response = await fetch('https://storage.googleapis.com/atgardner-blog/trails.json');
    return await response.json();
}

export async function getTrailMap(trailName, target) {
    let data = await getTrailData(),
        trails = data.trails,
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
