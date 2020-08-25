/* globals SnapCloud, SERVER_URL, NetsBloxMorph, WorldMorph, utils */

var world;


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
            return utils.requestPromise(request, data)
                .then(function(res) {
                    if (res.responseText) {
                        let user = JSON.parse(res.responseText);
                        return user;
                    }
                });
        };

        // check to see if loggedin
        getProfile().then(user => {
            // notify the client that we are logged in
            if (user) {
                SnapCloud.username = user.username;
                SnapCloud.password = true;
            }
        });

    }
};

function loop() {
    requestAnimationFrame(loop);
    world.doOneCycle();
}
