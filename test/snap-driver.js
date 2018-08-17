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

/**
 * Simulates mouse inputs to pick up a Morph and place it somewhere else.
 * @param {Morph} srcMorph Morph to drag and drop
 * @param {Point} position Position to drag center of srcMorph to 
 * @param {Point=} start Position to initiate drag at, if not speficied middle of left side of srcMorph is used
 */
SnapDriver.prototype.dragAndDrop = function(srcMorph, position, start = null) {
    const {MorphicPreferences, Point} = this.globals();
    
    // Drag from the upper left corner if not told otherwise
    if(start == null)
    {
        start = srcMorph.topLeft().add(new Point(2, srcMorph.height() / 2));
    }
    
    // If the Morph is not grabbed at center, final position will no longer be correct
    let offset = start.subtract(srcMorph.center());
    
    this.mouseDown(start);
    this.world().hand.processMouseMove({
        pageY: start.y,
        pageX: start.x + MorphicPreferences.grabThreshold + 1
    });
    this.mouseUp(position.add(offset));
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
    maxWait = maxWait || 6000;
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

SnapDriver.prototype.login = function(name, password='password') {
    const btn = this.ide().controlBar.cloudButton;
    this.click(btn);

    const dropdown = this.dialog();
    const logoutBtn = dropdown.children.find(item => item.action === 'logout');
    const isLoggedIn = !!logoutBtn;
    let prepare = Promise.resolve();

    if (isLoggedIn) {
        this.click(logoutBtn);
        prepare = this.expect(
            () => this.isShowingDialogTitle(title => title.includes('disconnected')),
            `Did not see logout message`
        );
    }

    return prepare
        .then(() => {
            this.click(btn);

            // click the login button
            const dropdown = this.dialog();
            const loginBtn = dropdown.children.find(item => item.action === 'initializeCloud');
            this.click(loginBtn);

            // enter login credentials
            console.log(`logging in as ${name}`);
            this.keys(name);
            this.keys('\t');
            this.keys(password);
            this.dialog().ok();
            return this.expect(
                () => this.isShowingDialogTitle(title => title.includes('connected')),
                `Did not see connected message`
            );
        });
};

SnapDriver.prototype.logout = async function() {
    const btn = this.ide().controlBar.cloudButton;
    this.click(btn);

    const dropdown = this.dialog();
    const logoutBtn = dropdown.children.find(item => item.action === 'logout');
    const isLoggedIn = !!logoutBtn;

    if (isLoggedIn) {
        this.click(logoutBtn);
        await this.expect(
            () => this.isShowingDialogTitle(title => title.includes('disconnected')),
            `Did not see logout message`
        );
    } else {
        throw new Error('no one is logged in');
    }
};

SnapDriver.prototype.inviteCollaborator = function(username) {
    const controlBar = this.ide().controlBar;
    this.click(controlBar.cloudButton);

    const dropdown = this.dialog();
    const collabs = dropdown.children.find(item => item.action === 'manageCollaborators');
    this.click(collabs);

    console.log('inviting', username);
    return this
        .expect(
            () => this.dialog(),
            `Collaborator dialog did not appear`
        )
        .then(() => {
            const dialog = this.dialog();
            console.log(dialog);
            const otherUserItem = dialog.listField.elements
                .find(element => element.username === username);

            dialog.listField.select(otherUserItem);

            // click the invite button
            const inviteBtn = dialog.buttons.children.find((btn => btn.action === 'ok'));
            this.click(inviteBtn);
        });
};

SnapDriver.prototype.isShowingDialog = function(testFn) {
    const dialogs = this.dialogs();
    return dialogs.find(testFn);
};

SnapDriver.prototype.isShowingDialogTitle = function(testFn) {
    return this.isShowingDialog(dialog => dialog.title && testFn(dialog.title));
};

SnapDriver.prototype.isShowingDialogKey = function(testFn) {
    return this.isShowingDialog(dialog => dialog.key && testFn(dialog.key));
};

SnapDriver.prototype.isShowingSavedMsg = function() {
    const menu = this.dialog();
    const message = menu && menu.title && menu.title.toLowerCase();
    if (message) {
        return message.includes('saved') && message.includes('cloud');
    }
    return false;
};

SnapDriver.prototype.saveProjectAs = function(name, waitForSave=true) {
    // save as
    const controlBar = this.ide().controlBar;
    this.click(controlBar.projectButton);

    const menu = this.dialog();
    const saveBtnIndex = menu.children
        .findIndex(child => child.action === 'save');
    const saveAsBtn = menu.children[saveBtnIndex+1];
    this.click(saveAsBtn);

    // Wait for the project list to be updated
    return this.waitUntilProjectsLoaded()
        .then(() => {
            // Enter the new project name
            this.keys(name);
            const dialog = this.dialog();
            const saveBtn = dialog.buttons.children[0];
            this.click(saveBtn);
            if (waitForSave) {
                // TODO
                return this.expect(
                    () => this.isShowingSavedMsg(),
                    `Did not see save message after "Save"`
                );
            }
        });
};

SnapDriver.prototype.getProjectList = function(projectDialog) {
    return projectDialog.listField.listContents.children
        .map(item => item.labelString);
};

SnapDriver.prototype.waitForDialogBox = function() {
    return this.expect(
        () => {
            const dialog = this.dialog();
            return dialog && dialog instanceof this.globals().DialogBoxMorph;
        },
        'No dialog box appeared'
    );
};

SnapDriver.prototype.waitUntilProjectsLoaded = function() {
    const dialog = this.dialog();
    if (dialog && dialog.source.includes('cloud')) {
        return this.expect(
            () => {
                const isShowingUpdateMsg = this.dialogs().length === 2;
                const projectDialog = this.dialogs()
                    .find(d => d instanceof this.globals().ProjectDialogMorph);
                const hasLoadedProjects = this.getProjectList(projectDialog)[0] !== '(empty)';
                return isShowingUpdateMsg || hasLoadedProjects;
            },
            'Did not see "update project list" message'
        )
        .then(() => this.expect(
                () => this.dialogs().length === 1,
                '"update project list" message did not disappear'
            )
        );
    } else {
        return Promise.resolve();
    }
};

SnapDriver.prototype.openProjectsBrowser = function() {
    const controlBar = this.ide().controlBar;

    this.click(controlBar.projectButton);
    let menu = this.dialog();
    const openBtn = menu.children.find(child => child.action === 'openProjectsBrowser');

    this.click(openBtn);

    // Open the saved project
    return this.waitUntilProjectsLoaded()
        .then(() => this.dialog());
};

SnapDriver.prototype.openProject = function(name, waitForComplete=true) {
    // Open the project dialog
    let projectDialog;
    return this.openProjectsBrowser()
        .then(dialog => {
            projectDialog = dialog;
            return this.expect(
                () => this.getProjectList(projectDialog).includes(name),
                `Could not find ${name} in project list`
            );
        })
        .then(() => {
            const projectList = projectDialog.listField.listContents.children;
            const listItem = projectList.find(item => item.labelString === name);
            this.click(listItem);
            projectDialog.accept();

            // Check for the if-else block
            if (waitForComplete) {
                return this.expect(
                    () => {
                        const blockCount = this.ide().currentSprite.scripts.children.length;
                        return blockCount > 0;
                    },
                    `Did not see blocks after loading saved project`
                );
            }
        });
};

SnapDriver.prototype.disconnect = function() {
    this.ide().sockets.onClose = () => {};
    this.ide().sockets.websocket.close();
};

SnapDriver.prototype.connect = function() {
    delete this.ide().sockets.onClose;
    this.ide().sockets.onClose();
};
