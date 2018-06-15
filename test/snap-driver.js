function SnapDriver(world) {
    this._world = world;
    this._window = window;
}

SnapDriver.prototype.setWindow = function(window) {
    this._window = window;
};

SnapDriver.prototype.globals = function() {
    return this._window;
};

// Convenience Getters
SnapDriver.prototype.world = function() {
    return this._world;
};

SnapDriver.prototype.ide = function() {
    return this._world.children[0];
};

SnapDriver.prototype.palette = function() {
    return this.world().children[0].palette;
};

SnapDriver.prototype.dialogs = function() {
    return this.world().children.slice(1);
};

SnapDriver.prototype.dialog = function() {
    var dialogs = this.dialogs();
    var len = dialogs.length;
    return dialogs[len-1];
};

// Controlling the IDE
SnapDriver.prototype.reset = function() {
    var world = this.world();

    // Close all open dialogs
    var dialogs = world.children.slice(1);
    dialogs.forEach(dialog => dialog.destroy());

    this.ide().exitReplayMode();
    return this.ide().newProject();
};

SnapDriver.prototype.setProjectName = function(name) {
    this.setProjectNameNoConfirm(name);
    return this.expect(
        () => this.ide().room.name === name,
        `Project name did not update after setProjectName (${this.ide().room.name} vs ${name})`
    );
};

SnapDriver.prototype.setProjectNameNoConfirm = function(name) {
    // rename from the room tab
    this.selectTab('room');
    const room = this.ide().room;
    this.click(room.roomName);

    this.keys(name);
    this.dialog().accept();
};

SnapDriver.prototype.selectCategory = function(cat) {
    var categories = this.ide().categories.children;
    var category = categories.find(btn => btn.labelString.toLowerCase() === cat.toLowerCase());

    category.mouseClickLeft();
    return category;
};

SnapDriver.prototype.selectTab = function(cat) {
    const localize = this.globals().localize;
    let tabs = this.ide().spriteBar.tabBar.children;
    let label = localize(cat.substring(0,1).toUpperCase() + cat.substring(1));
    let tab = tabs.find(tab => tab.labelString === label);

    this.click(tab);
};

SnapDriver.prototype.selectStage = function() {
    var ide = this.ide();

    return ide.selectSprite(ide.stage);
};

SnapDriver.prototype.selectSprite = function(name) {
    var ide = this.ide(),
        sprite = ide.sprites.asArray().find(sprite => sprite.name === name);

    return ide.selectSprite(sprite);
};

SnapDriver.prototype.keys = function(text) {
    let world = this.world();
    let keyboard = world.keyboardReceiver;

    text.split('').forEach(letter => {
        const event = {
            keyCode: letter.charCodeAt(0)
        };
        world.currentKey = event.keyCode;
        keyboard.processKeyPress(event);
        world.currentKey = null;
    });
};

// Add block by spec
SnapDriver.prototype.addBlock = function(spec, position) {
    const SpriteMorph = this.globals().SpriteMorph;
    const Point = this.globals().Point;
    const SnapActions = this.globals().SnapActions;
    var block = typeof spec === 'string' ?
        SpriteMorph.prototype.blockForSelector(spec, true) : spec;
    var sprite = this.ide().currentSprite;

    position = position || new Point(400, 400);
    let action = SnapActions.addBlock(block, sprite.scripts, position);
    return action;
    //return SnapActions.addBlock(block, sprite.scripts, position);
};

// morphic interactions
SnapDriver.prototype.click = function(morphOrPosition) {
    const Point = this.globals().Point;
    let hand = this.world().hand;
    let position = morphOrPosition;
    let morphAtPointer = hand.morphAtPointer;

    if (!(morphOrPosition instanceof Point)) {
        position = morphOrPosition.center();
        hand.morphAtPointer = () => morphOrPosition;
    }

    hand.setPosition(position);
    hand.processMouseDown({button: 1});
    hand.processMouseUp();
    hand.morphAtPointer = morphAtPointer;
};

SnapDriver.prototype.rightClick = function(morph) {
    let hand = this.world().hand;
    hand.setPosition(morph.center());
    hand.processMouseDown({button: 2});
    hand.processMouseUp();
};

SnapDriver.prototype.mouseDown = function(position) {
    let hand = this.world().hand;
    hand.setPosition(position);
    hand.processMouseDown({button: 1});
};

SnapDriver.prototype.mouseUp = function(position) {
    let hand = this.world().hand;
    hand.setPosition(position);
    hand.processMouseUp();
};

SnapDriver.prototype.dragAndDrop = function(srcMorph, position) {
    this.mouseDown(srcMorph.center());
    this.world().hand.grab(srcMorph);
    this.mouseUp(position);
};

SnapDriver.prototype.sleep = function(duration) {
    const deferred = this._defer();

    setTimeout(deferred.resolve, duration);

    return deferred.promise;
};

SnapDriver.prototype._defer = function() {
    let resolve, reject;
    let promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return {
        resolve,
        reject,
        promise
    };
};

SnapDriver.prototype.waitUntil = function(fn, maxWait) {
    const deferred = this._defer();

    var startTime = Date.now();
    var check = function() {
        let result = fn();
        if (result || Date.now()-startTime > maxWait) {
            if (result) {
                deferred.resolve(result);
            } else {
                deferred.reject(result);
            }
        } else {
            setTimeout(check, 25);
        }
    };
    maxWait = maxWait || 4000;
    check();

    return deferred.promise;
};

SnapDriver.prototype.expect = function(fn, msg) {
    return this.waitUntil(fn)
        .catch(() => {
            throw new Error(msg);
        });
};

// netsblox additions
SnapDriver.prototype.newRole = function(name) {
    this.selectTab('room');

    // Click on the plus icon
    let btn = this.ide().spriteEditor.addRoleBtn;
    this.click(btn);
    this.keys(name);
    let dialog = this.dialog();
    dialog.ok();
};

SnapDriver.prototype.moveToRole = function(name) {
    const role = this.ide().room.getRole(name);

    this.selectTab('room');
    this.click(role);

    let dialog = this.dialog();
    const moveBtn = dialog.buttons.children.find(btn => btn.action === 'moveToRole');
    this.click(moveBtn);

    // Click on "save"
    dialog = this.dialog();
    if (dialog.buttons) {
        const saveBtn = dialog.buttons.children.find(btn => btn.action === 'ok');
        this.click(saveBtn);
    }
};

SnapDriver.prototype.disconnect = function() {
    this.ide().sockets.onClose = () => {};
    this.ide().sockets.websocket.close();
};

SnapDriver.prototype.connect = function() {
    delete this.ide().sockets.onClose;
    this.ide().sockets.onClose();
};
