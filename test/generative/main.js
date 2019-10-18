/* globals SnapDriver, InteractionGenerator */
/* eslint-disable no-console, no-unused-vars */

const frame = document.getElementsByTagName('iframe')[0];
const url = window.location.href
    .replace(window.location.pathname, '')
    .replace(window.location.hash, '');

let driver;
window.onload = async function onIframeReady() {
    document.body.style.visibility = 'visible';
    const options = getOptions();
    driver = new SnapDriver();
    frame.style.setProperty('width', `${options.width}px`);
    frame.style.setProperty('height', `${options.height}px`);

    while (true) {
        frame.setAttribute('src', url);
        driver.setWindow(frame.contentWindow);
        await driver.waitUntil(() => isIDELoaded(driver));
        driver.disableExitPrompt();
        setOptions(options);
        await runTest(driver, options);
        options.seed = Date.now();
    }
};

async function runTest(driver, options) {
    const {SnapActions, SnapUndo, UndoManager, copy} = driver.globals();
    const tester = new InteractionGenerator(driver, null, options.seed);
    let remainingActions = options.count;
    let undoCount = 0;

    while (remainingActions--) {
        await tester.act();
        // Test that the last action can be undone (and redone)
        if (undoCount < SnapUndo.allEvents.length) {
            const lastEvent = copy(SnapUndo.allEvents[SnapUndo.allEvents.length - 1]);
            if (lastEvent && !lastEvent.replayType && !lastEvent.isUserAction) {
                const event = SnapUndo.getInverseEvent(lastEvent);
                event.replayType = UndoManager.UNDO;
                event.owner = lastEvent.owner;
                event.isReplay = true;
                lastEvent.isReplay = true;
                await SnapActions.applyEvent(event);
                await driver.sleep(250);
                await SnapActions.applyEvent(lastEvent);
            }
            undoCount = SnapUndo.allEvents.length;
        }
        await driver.sleep(250);
    }
}

function isIDELoaded(driver) {
    if (driver.world()) {
        const hasUnloadedPrevious = driver.globals().SnapUndo.allEvents
            .filter(event => event.type !== 'openProject').length === 0;
        const sprite = driver.ide().currentSprite;
        const aProjectIsLoaded = sprite && !!sprite.id;
        return hasUnloadedPrevious && aProjectIsLoaded;
    }
    return false;
}

function getOptions() {
    const opts = {};

    window.location.hash.substring(1).split('&')
        .map(chunk => chunk.split('='))
        .forEach(chunk => {
            const [key, value] = chunk;
            opts[key] = value;
        });

    // Set defaults
    opts.seed = opts.seed ? parseInt(opts.seed) : Date.now();
    opts.width = opts.width || document.body.getBoundingClientRect().width;
    opts.height = opts.height || document.body.getBoundingClientRect().height;
    opts.count = opts.count || -1;

    return opts;
}

function setOptions(opts) {
    opts.width = opts.width || frame.getBoundingClientRect().width;
    opts.height = opts.height || frame.getBoundingClientRect().height;

    window.location.hash = Object.entries(opts)
        .map(pair => pair.join('=')).join('&');
}
