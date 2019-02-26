/* globals SnapCloud, SERVER_URL, NetsBloxMorph, WorldMorph*/

var world;

function requestPromise(request, data) {
    // takes an xhr request
    return new Promise((resolve, reject) => {
        // stringifying undefined => undefined
        if (data) {
            request.setRequestHeader(
                'Content-Type',
                'application/json; charset=utf-8'
            );
        }
        request.send(JSON.stringify(data));
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve(request);
                } else {
                    let err = new Error(request.statusText || 'Unsuccessful Xhr response');
                    err.request = request;
                    reject(err);
                }
            }
        };
    });
}


window.onload = function () {
    world = new WorldMorph(document.getElementById('world'));
    world.worldCanvas.focus();
    new NetsBloxMorph().openIn(world);
    loop();

    // if not logged in, make sure
    if (!SnapCloud.username) {
        // gets user info: username, email
        var getProfile = function() {
            const request = new XMLHttpRequest();
            request.open('POST', `${SERVER_URL}/api`, true);
            request.withCredentials = true;
            const data = {
                api: false,
                return_user: true,
                silent: true
            };
            return requestPromise(request, data)
                .then(function(res) {
                    if (!res.responseText) throw new Error('Access denied. You are not logged in.');
                    let user = JSON.parse(res.responseText);
                    return user;
                });
        };

        // check to see if loggedin
        getProfile().then(user => {
            // notify the client that we are logged in
            SnapCloud.username = user.username;
            SnapCloud.password = true;
        });

    }
};

function loop() {
    requestAnimationFrame(loop);
    world.doOneCycle();
}
