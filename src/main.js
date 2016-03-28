let apiKey = 'AIzaSyB2e4nLfLBwK_5O7ofehrIi2394m5UbNkk';

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    makeApiCall();
    // window.setTimeout(makeApiCall, 1);
}

async function loadApi() {
    await gapi.client.load('storage', 'v1');
}

async function getObject(bucket, object) {
    console.time(`async ${bucket}-get`);
    let trails = await gapi.client.storage.objects.get({
        bucket: bucket,
        object: object
    });
    console.timeEnd(`async ${bucket}-get`);
    console.time(`async ${bucket}-media`);
    let res = await gapi.client.request({
        path: trails.result.mediaLink
    });
    console.timeEnd(`async ${bucket}-media`);
    return res;
}

async function testBucket(bucket) {
    console.log(`async ${bucket}`);
    console.time(`async ${bucket}`);
    let res = await getObject(bucket, 'trails.json');
    console.timeEnd(`async ${bucket}`);
    console.log(`async ${bucket}:`, res);
}

async function makeApiCall() {
    console.profile('async');
    await loadApi();
    await testBucket('atgardner');
    await testBucket('atgardner-blog');
    console.profileEnd('async');
}

function getObject2(bucket, object) {
    console.time(`promises ${bucket}-get`);
    return gapi.client.storage.objects.get({
            bucket: bucket,
            object: object
        })
        .then(trails => {
            console.timeEnd(`promises ${bucket}-get`);
            console.time(`promises ${bucket}-media`);
            return gapi.client.request({
                    path: trails.result.mediaLink
                })
                .then(res => {
                    console.timeEnd(`promises ${bucket}-media`);
                    return res;
                });
        });
}

function testBucket2(bucket) {
    console.log(`promises ${bucket}`);
    console.time(`promises ${bucket}`);
    return getObject2(bucket, 'trails.json')
        .then(res => {
            console.timeEnd(`promises ${bucket}`);
            console.log(`promises ${bucket}: `, res);
        });
}

function makeApiCall2() {
    console.profile('promises');
    loadApi()
        .then(() => {
            return testBucket2('atgardner');
        })
        .then(()=> {
            return testBucket2('atgardner-blog');
        })
        .then(() => {
            console.profileEnd('promises');
        })
}

window.onload = handleClientLoad;
