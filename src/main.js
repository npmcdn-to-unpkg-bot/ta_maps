let apiKey = 'AIzaSyB2e4nLfLBwK_5O7ofehrIi2394m5UbNkk';

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(makeApiCall, 1);
}

async function makeApiCall() {
    await gapi.client.load('storage', 'v1');
    let trails = await gapi.client.storage.objects.get({
        bucket: 'atgardner',
        object: 'trails.json'
    });
    let res = await gapi.client.request({
        path: trails.result.mediaLink
    });
    console.log(res);
}

window.onload = handleClientLoad;
