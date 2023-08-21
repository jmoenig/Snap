/* globals UndoManager, SERVER_ADDRESS, ActionManager, SnapActions, NetsBloxSerializer,
   HintInputSlotMorph, Action, copy*/
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

SnapActions.onMessage = function(msg) {
    ActionManager.prototype.onMessage.apply(this, arguments);
    if (location.hash.indexOf('collaborate') !== -1) {
        location.hash = '';
    }
    if (msg.type === 'session-user-count') {
        this.sessionUsersCount = msg.value;
    }
};

SnapActions.requestMissingActions = async function(silent) {
    const {sockets, cloud, room} = this.ide();
    if (!sockets.inActionRequest && !room.isLeader()) {
        sockets.inActionRequest = true;
        const leader = room.getLeaderID();
        const response = await sockets.sendIDERequest({
            type: 'request-actions',
            projectId: cloud.projectId,
            roleId: cloud.roleId,
            actionId: this.lastSeen,
        }, leader);
        console.log({response});
        sockets.inActionRequest = false;
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
        return this.requestMissingActions(false);
    }

    ActionManager.prototype.onReceiveAction.apply(this, arguments);
};

SnapActions.completeAction = function(error) {
    if (error) {
        try {
            this.ide().submitBugReport(null, error);
        } catch(err) {
            console.error('Unable to submit bug report:', err);
        }
    }
    return ActionManager.prototype.completeAction.apply(this, arguments);
};

SnapActions.submitIfAllowed = function(event) {
    var myself = this,
        ide = this.ide(),
        room = ide.room;

    if (event.type === 'openProject') {
        this.submitAction(event);
    } else if (room.isCapturingTrace()) {
        ide.promptExitTraceCapture(function() {
            myself.submitIfAllowed(event);
        });
    } else if (room.isReplayingTrace()) {
        ide.promptExitTraceReplay(function() {
            myself.submitIfAllowed(event);
        });
    } else if (!room.isEditable()) {
        ide.tryElevatePermissions(ide.cloud.projectId, room);
    } else {
        ActionManager.prototype.submitIfAllowed.call(this, event);
    }
};

SnapActions.isReadOnly = function() {
    var room = this.ide().room;
    var isEditable = room.isEditable() &&
        !room.isCapturingTrace() &&
        !room.isReplayingTrace() &&
        !this.ide().isReplayMode;

    return !isEditable;
};
