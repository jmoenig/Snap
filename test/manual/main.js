/* globals WSMonkey, SnapDriver */
/* eslint-disable no-console, no-unused-vars */

const frames = Array.prototype.slice.call(document.getElementsByTagName('iframe'));
var driver = null,
    monkey = new WSMonkey();

frames.forEach(frame => {
    const url = window.location.href.replace(window.location.pathname, '');
    frame.setAttribute('src', url);
});

function startTests() {
    return frames
        .reduce((promise, frame) => {
            return promise.then(() => {
                driver = new SnapDriver();
                driver.setWindow(frame.contentWindow);
                monkey.setWorld(frame.contentWindow.world); // update the world view for our monkey
            });
        }, Promise.resolve())
        .then(() => {
            onIframesReady();
        });
}

function checkLoaded() {
    const allLoaded = frames.reduce((isLoaded, frame) => {
        return isLoaded && !!frame.contentWindow.world;
    }, true);

    if (allLoaded) {
        startTests();
    } else {
        setTimeout(checkLoaded, 10);
    }
}

window.onload = () => {
    fitIframes();
    checkLoaded();
};

// computes the appropriate height for iframes
// handles one iframe for now
function fitIframes() {
    let idealHeight = window.innerHeight - document.getElementById('footer').clientHeight;
    frames[0].style.height = idealHeight;
}

function onIframesReady() {
    console.log('all iframes ready');
    document.body.style.visibility = 'visible';
}

const connectionStatus = document.getElementById("connection-status");
monkey.onStateChange = connected => {
    if (connected) {
        connectionStatus.classList.remove('red');
        connectionStatus.classList.add('green');
    } else {
        connectionStatus.classList.remove('green');
        connectionStatus.classList.add('red');
    }
};

const connectionProfile = document.getElementById("websocket-connection");
connectionProfile.onchange = function() {
    const profile = connectionProfile.value;

    monkey.stopPlaying();
    if (profile === 'online') {
        monkey.connect();
    } else if (profile === 'offline') {
        monkey.disconnect();
    } else {
        monkey.startPlaying();
    }
};
