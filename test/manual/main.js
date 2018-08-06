/* globals WSMonkey, SnapDriver */
/* eslint-disable no-console, no-unused-vars */

const frames = Array.prototype.slice.call(document.getElementsByTagName('iframe'));
var driver = null,
    monkey = null;

frames.forEach(frame => {
    frame.setAttribute('src', window.origin);
});

function startTests() {
    return frames
        .reduce((promise, frame) => {
            return promise.then(() => {
                driver = new SnapDriver(frame.contentWindow.world);
                driver.setWindow(frame.contentWindow);
                monkey = new WSMonkey(frame.contentWindow.world);
                return driver.login('test');
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

window.onload = checkLoaded;

function onIframesReady() {
    console.log('all iframes ready');
}



