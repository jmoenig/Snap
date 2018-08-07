/* globals WSMonkey, SnapDriver, Vue */
/* eslint-disable no-console, no-unused-vars */

const frames = Array.prototype.slice.call(document.getElementsByTagName('iframe'));
var driver = null,
    monkey = new WSMonkey();

setupVue();

frames.forEach(frame => {
    frame.setAttribute('src', window.origin);
});

function startTests() {
    return frames
        .reduce((promise, frame) => {
            return promise.then(() => {
                driver = new SnapDriver(frame.contentWindow.world);
                driver.setWindow(frame.contentWindow);
                monkey._world = frame.contentWindow.world; // update the world view for our monkey
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

function setupVue() {
    const app = new Vue({
        el: '#footer',
        data: {
            wsToggleBtn: 'start',
            monkey: monkey, // to watch for changes in monkey. Is there a better way? watchers?
        },

        computed: {
            isPlaying() {
                return !this.monkey._playOver;
            }
        },

        methods: {
            toggleWsMonkey() {
                if (monkey.isPlaying) {
                    monkey.stopPlaying();
                    this.wsToggleBtn = 'start';
                } else {
                    monkey.startPlaying();
                    this.wsToggleBtn = 'stop';
                }
            },
        }
    });
}
