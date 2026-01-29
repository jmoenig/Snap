/* globals NetsBloxMorph, WorldMorph, */

var world;
var CLIENT_ID;

async function getConfiguration(serverUrl) {
    const opts = {
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
    };
    const config = await (await fetch(serverUrl + '/configuration', opts)).json(); // TODO: Ideally, configuration and whomai endpoints returned
                                                                                       // the authenticated user object instead of just the username.
                                                                                       // It would add a small payload size increase and avoid two network calls. 
    config.cloudUrl = serverUrl;  // TODO: Update the server?
    if(config.username) {        
        config.groupId = (await (await fetch(serverUrl + `/users/${config.username}`, opts)).json()).groupId
    }
    return config;
}

async function startEnvironment(serverUrl) {
    const config = await getConfiguration(serverUrl);
    CLIENT_ID = config.clientId;

    world = new WorldMorph(document.getElementById('world'));
    world.worldCanvas.focus();
    new NetsBloxMorph(true, config).openIn(world);
    loop();
}

function loop() {
    requestAnimationFrame(loop);
    world.doOneCycle();
}
