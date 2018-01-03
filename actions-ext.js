/* globals UndoManager, SERVER_ADDRESS, ActionManager, SnapActions, NetsBloxSerializer,
   HintInputSlotMorph, SnapCloud, Action, copy*/
// NetsBlox Specific Actions
SnapActions.addActions(
    'addMessageType',
    'deleteMessageType'
);

ActionManager.URL = 'ws://' + SERVER_ADDRESS + '/collaboration';
ActionManager.prototype._deleteMessageType = function(name) {
    var fields = this.ide().stage.messageTypes.getMsgType(name).fields;
    return [name, fields];
};

ActionManager.prototype.onAddMessageType = function(name, fields) {
    var ide = this.ide();
    ide.stage.addMessageType({
        name: name,
        fields: fields
    });
    ide.flushBlocksCache('network');  //  b/c of inheritance
    ide.refreshPalette();
    this.completeAction();
};

ActionManager.prototype.onDeleteMessageType = function(name) {
    var ide = this.ide();
    ide.stage.deleteMessageType(name);
    ide.flushBlocksCache('network');  //  b/c of inheritance
    ide.refreshPalette();
    this.completeAction();
};

// HintInputSlotMorph support
ActionManager.prototype._setField = function(field, value) {
    var fieldId = this.getId(field),
        oldValue = field.contents().text;

    if (field instanceof HintInputSlotMorph && field.empty) {
        oldValue = '';
    }

    return [
        fieldId,
        value,
        oldValue
    ];
};

UndoManager.Invert.addMessageType = function() {
    return 'deleteMessageType';
};

UndoManager.Invert.deleteMessageType = function() {
    return 'addMessageType';
};

SnapActions.serializer = new NetsBloxSerializer();
SnapActions.__sessionId = Date.now();
SnapActions.enableCollaboration =
SnapActions.disableCollaboration = function() {};
SnapActions.isCollaborating = function() {
    return this.ide().room.getCurrentOccupants().length > 1;
};

// Recording user actions
SnapActions.send = function(event) {
    // Netsblox addition: start
    var socket = this.ide().sockets;

    this._ws = socket.websocket;

    // Netsblox addition: end
    event.id = event.id || this.lastSeen + 1;
    this.lastSent = event.id;
    if (event.type !== 'openProject') {
        // Netsblox addition: start
        socket.send(JSON.stringify({
            type: 'user-action',
            action: event
        }));
        // Netsblox addition: end
    }
};

SnapActions.submitAction = function(action) {
    this.recordActionNB(copy(action));
    return ActionManager.prototype.submitAction.call(this, action);
};

SnapActions.onMessage = function(msg) {
    ActionManager.prototype.onMessage.apply(this, arguments);
    if (location.hash.indexOf('collaborate') !== -1) {
        location.hash = '';
    }
    if (msg.type === 'session-user-count') {
        this.sessionUsersCount = msg.value;
    }
};

SnapActions.requestMissingActions = function() {
    var socket = this.ide().sockets;
    if (!socket.inActionRequest) {
        socket.inActionRequest = true;
        return socket.sendJSON({
            type: 'request-actions',
            actionId: this.lastSeen
        });
    }
};

SnapActions.onReceiveAction = function(msg) {
    // If the message is not building on the current commit, then
    // request the commits up until our current commit

    var lastId = this.lastSeen;
    if (this.queuedActions.length) {
        lastId = this.queuedActions[this.queuedActions.length-1].id;
    }
    var missingActions = lastId < (msg.id - 1);

    if (missingActions) {
        return this.requestMissingActions();
    }

    ActionManager.prototype.onReceiveAction.apply(this, arguments);
};

SnapActions.recordActionNB = function(action) {
    var socket = this.ide().sockets,
        msg = {};

    // Record the action
    msg.type = 'record-action';
    msg.sessionId = this.__sessionId;
    msg.action = action;
    socket.sendMessage(msg);
};

SnapActions.completeAction = function(error) {
    if (error) {
        this.ide().submitBugReport(null, error);
    }
    return ActionManager.prototype.completeAction.apply(this, arguments);
};

SnapActions.applyEvent = function(event) {
    var ide = this.ide();
    if (ide.room.isEditable() || event.type === 'openProject') {
        event.user = this.id;
        event.id = this.lastSeen + 1;
        event.time = event.time || Date.now();

        // Skip duplicate undo/redo events
        if (event.replayType && this.lastSent === event.id) {
            return;
        }

        // if in replay mode, check that the event is a replay event
        var myself = this;

        if (ide.isReplayMode && !event.isReplay && event.type !== 'openProject') {
            ide.promptExitReplay(function() {
                myself.submitAction(event);
            });
        } else {
            myself.submitAction(event);
        }

        return new Action(this, event);
    } else {
        // ask the user if he/she would like to request to be a collaborator
        ide.confirm(
            'Edits cannot be made on projects by guests.\n\nWould ' +
            'you like to request to be made a collaborator?',
            'Request Collaborator Priviledges?',
            function () {
                ide.sockets.sendMessage({
                    type: 'permission-elevation-request',
                    guest: SnapCloud.username
                });
            }
        );
    }
};
