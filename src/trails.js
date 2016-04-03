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

export async function getTrailMap(trailName) {
    let trails = await getObject('atgardner-blog', 'trails.json'),
        trail = trails[trailName];
    console.log(trails);
}

//document.addEventListener('DOMContentLoaded', onLoad);
// window.onload = handleClientLoad;
