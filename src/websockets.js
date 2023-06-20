/*globals nop, 
  StageMorph, SnapActions, DialogBoxMorph, IDE_Morph, isObject, NetsBloxSerializer,
  localize, VariableFrame, isSnapObject*/
// WebSocket Manager

var WebSocketManager = function (ide, config) {
    this.ide = ide;
    this.uuid = config.clientId;
    this.websocket = null;
    this.messages = [];
    this.msgHandlerQueues = [];
    this.url = config.cloudUrl.replace(/^http/, 'ws') + `/network/${config.clientId}/connect`;
    this.lastSocketActivity = Date.now();
    this._connectWebSocket();
    this.version = Date.now();
    this.serverVersion = null;

    this.errored = false;
    this.hasConnected = false;
    this.connected = false;
    this.inActionRequest = false;
    this._requests = {};
    this._counter = 1;
    this.serializer = new NetsBloxSerializer();
};

WebSocketManager.HEARTBEAT_INTERVAL = 25*1000;  // 25 seconds
class MessageHandler {
    constructor() {
        this._handlers = {};
    }

    handle(msg) {
        if (this._handlers[type]) {
            return this._handlers[type].call(self, msg);
        } else {
            console.error('Unknown message:', msg);
        }
    }

    addHandler(type, fn) {
        if (this._handlers[type]) {
            throw new Error(`Handler already defined for ${type}`);
        }
        this._handlers[type] = fn;
    }
}

WebSocketManager.IDEMessageHandlers = {
    'action-rejected': function(msg) {
        if (msg.reason) {
            this.ide.showMessage(localize(msg.reason));
        }
    },
    'user-action': function(msg, sender) {
        const cloud = this.ide.cloud;
        if (msg.projectId === cloud.projectId && msg.roleId === cloud.roleId) {
            const response = SnapActions.onMessage(msg.action);
            if (response) {
                this.sendIDEMessage(response, sender);
            }
        }
    },
    'request-actions': function(msg, sender) {
        const cloud = this.ide.cloud;
        if (msg.projectId === cloud.projectId && msg.roleId === cloud.roleId) {
            const actions = utils.takeWhile(
                SnapUndo.allEvents.reverse(),
                event => event.id > msg.actionId
            ).reverse();

            const starterAction = {id: actionId};
            const actionAndNext = utils.zip([starterAction].concat(actions), actions);
            const isMissingActions = actionAndNext.reduce(
                (isMissingActions, [action, nextAction]) => isMissingActions ||
                    (nextAction.id - action.id > 1),
                false
            );
            if (isMissingActions) {
                throw new Errors.MissingActionsError();
            }
            return actions;
        } else {
            // No longer at the given role, try again
            throw new Errors.NoLongerLeaderError();
        }
    },
    'share-msg-type': function(msg) {
        // only share with intended role
        const msgType = msg.data;
        if (this.ide.cloud.roleId === msg.roleId) {
            var myself = this,
                dialog = new DialogBoxMorph();

            // reject duplicates
            if (this.ide.stage.messageTypes.msgTypes[msgType.name]) {
                this.ide.showMessage(msg.from + ' tried sending you message type \'' + msgType.name + '\' when you already have it!', 2);
            } else {
                // Prepare dialog & prompt user
                var request =
                    msg.from + ' requested to send you a message type:\n\'' +
                    msgType.name + '\' with ' +
                    msgType.fields.length +
                    (msgType.fields.length !== 1 ? ' fields.' : ' field.') + '\n' +
                    'Would you like to accept?';

                dialog.askYesNo('Message Share Request', request, myself.ide.root());

                // Accept the request
                dialog.ok = function() {
                    var ide = myself.ide.root().children[0].parentThatIsA(IDE_Morph);
                    SnapActions.addMessageType(msgType.name, msgType.fields)
                        .then(function() {
                            // format fields
                            var fields = [];
                            for (var i = 0; i < msgType.fields.length; i++) {
                                fields.push(' ' + '\'' + msgType.fields[i] + '\'');
                            }

                            // format notification
                            var notification = 'Received message type \'' + msgType.name + '\' with ' + msgType.fields.length +
                                (msgType.fields.length === 0 ? ' fields.' : (msgType.fields.length === 1 ? ' field: ' + msgType.fields : ' fields: ' + msgType.fields));

                            // notify
                            myself.ide.showMessage(notification, 2);

                            // refresh message palette
                            if (ide && ide.currentTab === 'room') {
                                ide.spriteBar.tabBar.tabTo('room');
                            }
                        });
                    dialog.destroy();
                };
            }
        }
    },
    'permission-elevation-request': function(msg) {
        var myself = this,
            username = msg.guest;

        this.ide.confirm(
            username + localize(' would like to be made a collaborator on ') +
            myself.ide.room.name + '\n\n' + localize('Would you like to make ') + username +
            localize(' a collaborator?'),
            'Collaboration Request',
            function() {
                this.ide.cloud.addCollaborator(msg.projectId, username);
            }
        );
    },

};

WebSocketManager.MessageHandlers = {
    'ide-message': function(msg) {
        const {data, sender} = msg;
        let response, error;
        try {
            response = WebSocketManager.IDEMessageHandlers[data.type].call(this, data, sender);
        } catch (err) {
            error = err.message;
        }
        if (msg.reqID) {
            this.sendIDEMessage({
                type: 'response',
                reqID,
                response,
                error,
            });
        }
    },

    'response': function(msg) {
        const deferred = this._requests[msg.reqID];
        if (deferred) {
            if (msg.error) {
                deferred.reject(new Error(msg.error));
            } else {
                deferred.resolve(msg.response);
            }
            delete this._requests[msg.reqID];
        }
    },

    'request-actions-complete': function() {
        this.inActionRequest = false;
    },

    'reload-project': function(msg) {
        this.ide.requestProjectReload(msg.message);
    },

    'report-version': function(msg) {
        var version = msg.body;
        if (!this.serverVersion) {
            this.serverVersion = version;
        }
        if (this.serverVersion !== version) {
            this.ide.showUpdateNotification();
        }
    },

    'message': function(msg) {
        var messageType = msg.msgType,
            content = msg.content;

        // When replaying a network trace, actual messages to the client are ignored
        if (this.ide.room.isReplayingTrace()) {
            if (!this.ide.room.trace.notified) {
                this.ide.showMessage(localize('Ignoring messages received while\nviewing network trace'));
                this.ide.room.trace.notified = true;
            }
            return;
        }

        content = this.deserializeMessage(msg);
        this.onMessageReceived(messageType, content, msg);
    },

    // Update on the current roles at the given room
    'room-roles': function(msg) {
        this.ide.room.onRoomStateUpdate(msg);
    },

    'close-invite': function(msg) {
        const dialog = DialogBoxMorph.prototype.instances[msg.id];
        if (dialog) {
            dialog.destroy();
        }
    },

    // Receive an invite to join a room
    'room-invitation': function(msg) {
        const {projectId, roleId, projectName, inviter} = msg;
        const isCurrentRole = projectId === this.ide.cloud.projectId && roleId === this.ide.cloud.roleId;
        if (!isCurrentRole) {
            this.ide.room.promptInvite(projectId, roleId, projectName, inviter);
        }
    },

    'collab-invitation': function(msg) {
        this.ide.promptCollabInvite(msg);
    },

    'project-closed': function() {
        var owner = this.ide.room.ownerId;
        this.ide.showMessage(owner + ' closed the room. ' +
            'You can ask to join again once ' + owner + ' opens the project again');
        this.ide.newProject();
    },

    'eviction-notice': function() {
        this.ide.showMessage('You have been evicted from the project.');
        this.ide.newProject();
    },

    'role-data-request': function(msg) {
        const data = this.getSerializedProject();
        const id = msg.id;
        this.ide.cloud.reportLatestRole(id, data);
    },

    'notification': function(msg) {
        this.ide.showMessage(msg.message);
    },

    'pong': function() {
        setTimeout(() => this.sendMessage({type: 'ping'}), WebSocketManager.HEARTBEAT_INTERVAL);
    },

    'action-rejected': function(msg) {
        SnapActions.onActionReject(msg.action, msg.error.message);
    }
};

WebSocketManager.prototype.isConnected = function() {
    return this.websocket.readyState === this.websocket.OPEN;
};

WebSocketManager.prototype.isStale = function() {
    var sinceLastMsg = Date.now() - this.lastSocketActivity;
    // if stale, assume that the connection has broken
    return sinceLastMsg > 2*WebSocketManager.HEARTBEAT_INTERVAL;
};

WebSocketManager.prototype.checkAlive = function() {
    if (this.isStale()) {
        if (this.websocket.readyState !== this.websocket.CONNECTING) {
            this.lastSocketActivity = Date.now();
            this.disconnect();  // reconnect should start automatically
        }
        return false;
    }
    return true;
};

WebSocketManager.prototype.disconnect = function() {
    this.websocket.close();
    this.onClose();  // ensure onClose is called
};

WebSocketManager.prototype._connectWebSocket = function() {
    // Connect socket to the server
    var self = this,
        isReconnectAttempt = this.websocket !== null;

    // Don't connect if the already connected
    if (isReconnectAttempt) {
        if (this.isConnected()) {
            return;
        } else if (this.websocket.readyState === this.websocket.CONNECTING) {
            // Check if successful in 500 ms
            setTimeout(self._connectWebSocket.bind(self), 500);
            return;
        }
    }

    this.websocket = new WebSocket(this.url);
    // Set up message firing queue
    this.websocket.onopen = () => {
        if (this.errored === true) {
            this.ide.showMessage((this.hasConnected ? 're' : '') + 'connected!', 2);
            this.errored = false;
        }
        if (!this.hasConnected) {
            setInterval(this.checkAlive.bind(this), WebSocketManager.HEARTBEAT_INTERVAL);
        }

        this.lastSocketActivity = Date.now();
        this.connected = true;
        this.onConnect(this.hasConnected);
        this.hasConnected = true;
    };

    // Set up message events
    // Where should I set this up now?
    this.websocket.onmessage = function(rawMsg) {
        var msg = JSON.parse(rawMsg.data),
            type = msg.type;

        self.lastSocketActivity = Date.now();
        if (WebSocketManager.MessageHandlers[type]) {
            const response = WebSocketManager.MessageHandlers[type].call(self, msg);
        } else {
            console.error('Unknown message:', msg);
        }
    };

    this.websocket.onclose = function() {
        self.onClose();
    };
};

WebSocketManager.prototype.onClose = function() {
    var errMsg;

    if (this.connected) {
        this.version = Date.now();
        this.connected = false;
    }

    if (!this.errored && Date.now() - this.version > 5000) {  // tried connecting for 5 seconds
        errMsg = this.hasConnected ?
            'Temporarily disconnected.\nSome network functionality may be ' +
            'nonfunctional.\nTrying to reconnect...' :

            'Could not fully connect to NetsBlox.\nPlease try refreshing ' +
            'your browser or try a different browser';

        this.ide.showMessage(errMsg);
        this.errored = true;
    }

    setTimeout(this._connectWebSocket.bind(this), 500);
};

WebSocketManager.prototype.sendJSON = function(message) {
    return this.send(JSON.stringify(message));
};

WebSocketManager.prototype.send = function(message) {
    this.checkAlive();
    if (this.isConnected()) {
        this.websocket.send(message);
    } else {
        this.messages.push(message);
    }
};

WebSocketManager.prototype.sendMessage = function(message) {
    message.projectId = this.ide.cloud.projectId;
    message = this.serializeMessage(message);
    this.send(message);
};

WebSocketManager.prototype.sendIDEMessage = function(data, ...recipients) {
    // TODO: add support for req-reply
    console.log('sending IDE message to', recipients, data);
    return this.sendMessage({
        type: 'ide-message',
        recipients,
        data,
    });
};

WebSocketManager.prototype.sendIDERequest = async function(data, ...recipients) {
    data.reqID = ++this._counter;
    this._requests[data.reqID] = utils.defer();
    setTimeout(() => {
        const deferred = this._requests[data.reqID];
        if (deferred) {
            deferred.reject(new Error('Timeout exceeded.'));
            delete this._requests[data.reqID];
        }
    }, 5000);
    return this.sendIDEMessage(data, ...recipients);
};

WebSocketManager.prototype.serializeMessage = function(message) {
    if (message.content) {
        var fields = Object.keys(message.content),
            content;

        this.serializer.flush();
        for (var i = fields.length; i--;) {
            content = message.content[fields[i]];
            if (isObject(content)) {
                message.content[fields[i]] = this.serializer.getPortableXML(content);
            }
        }
        this.serializer.flush();
    }

    return JSON.stringify(message);
};

WebSocketManager.prototype.deserializeMessage = function(message) {
    var content = message.content,
        fields = Object.keys(content),
        values = fields.map(function(field) {
            return content[field];
        });

    this.deserializeData(values).forEach(function(value, index) {
        message.content[fields[index]] = value;
    });

    return message.content;
};

WebSocketManager.prototype.deserializeData = function(dataList) {
    var project,
        model;

    SnapActions.serializer.project = {
        stage: new StageMorph(),
        sprites: {}
    };

    return dataList.map(function(value) {
        if (value[0] === '<') {
            try {
                console.log('Received serialized format:', value.length);
                model = SnapActions.serializer.parse(value);
                project = model.allChildren().find(function(node) {
                    return node.tag === 'project';
                });

                if (project) {
                    SnapActions.serializer.rawLoadProjectModel(project);
                }

                return SnapActions.serializer.loadValue(model);
            } catch(e) {  // must not have been XML
                console.error('Could not deserialize!', e);
                return value;
            }
        }
        return value;
    });
};

WebSocketManager.prototype.onConnect = async function(isReconnect) {
    this.sendMessage({type: 'ping'});
    if (isReconnect) {
        // Disable error handler when reconnecting in case it is recoverable
        // TODO: make this more ergonomic in the client library...
        const silent = () => {};
        const handler = this.ide.cloud.onerror;
        this.ide.cloud.onerror = silent;

        try {
            await this.updateRoomInfo();
            this.ide.cloud.onerror = handler;

            if (this.ide.cloud.projectId) {
                SnapActions.requestMissingActions(true);
            }
        } catch (err) {
            this.ide.cloud.onerror = handler;

            // Try to recover from missing project. It's possible that the computer is
            // recovering from a broken connection after an arbitrarily long time while
            // working on an unsaved project. In this case, the server has likely garbage
            // collected the project so it will need to be re-imported.
            //
            // Additional roles will not be stored on the client but they can only be
            // made by logged in users or as part of the example/public project that
            // was opened. In these cases, we can just reload the page.
            if (err.message.includes('Project not found')) {
                const ide = this.ide;
                const roleCount = ide.room.getRoleCount();
                const currentUrl = window.location.href;

                const xml = ide.exportProjectXml(ide.room.name, [ide.getSerializedRole()]);
                await ide.droppedText(xml);
                this.messages = [];

                if (roleCount > 1) {
                    const isLoggedIn = ide.cloud.username !== null;
                    if (!isLoggedIn) {
                        // reload the example/public project (refresh the page) to recover missing roles
                        const message = localize(
                            'Other roles in the project not found after reconnect.' +
                            '\nWould you like to refresh the page to reload the project with ' +
                            'the missing roles?'
                        );
                        const title = localize('Reload Project?');
                        const confirmed = await ide.confirm(message, title);
                        if (confirmed) {
                            window.location.href = currentUrl;
                        }
                    } else {
                        const message = localize(
                            'Other roles in the project not found after reconnect.\n' +
                            '\nIn the future, please save multi-role projects' +
                            '\nto prevent losing progress.'
                        );
                        ide.cloudError()(message);
                    }
                }

            } else {
                handler(err);
            }
        }
    }
    while (this.messages.length) {
        this.websocket.send(this.messages.shift());
    }
};

WebSocketManager.prototype.updateRoomInfo = function() {
    return this.ide.cloud.setClientState();
};

/**
 * Callback for receiving a websocket message.
 *
 * @param {String} message
 * @return {undefined}
 */
WebSocketManager.prototype.onMessageReceived = function (message, content, msg) {
    var idle = !this.msgHandlerQueues.length,
        stage = this.ide.stage;

    content = content || [];
    if (message !== '') {
        // if the message is for requestId
        const isReplyMsg = message === '__reply__';
        stage.threads.processes.forEach(function (p) {
            if (isReplyMsg && (p.requestId === msg.requestId)) p.reply = msg;
        });

        stage.children.concat(stage).forEach(morph => {
            if (isSnapObject(morph)) {
                morph.allHatBlocksForSocket(message).forEach(block => {
                    const variables = new VariableFrame();
                    variables.addVar('__message__', content);
                    variables.addVar('__requestId__', msg.requestId);
                    variables.addVar('__srcId__', msg.srcId);

                    this.addMsgToQueue(morph, block, message, variables);
                });
            }
        });

        if (idle) {
            // This is done in a setTimeout to allow for some of the processes to accumulate
            // and not block the main UI thread. Otherwise, it would simply try to start the
            // last message each time (we are more efficient when we can batch it like this).
            setTimeout(this.tryStartQueuedMsgs.bind(this), 50);
        }
    }
};

WebSocketManager.prototype.addMsgToQueue = function(morph, block, messageType, variables) {
    let queue = this.getMessageQueue(block);

    if (!queue) {
        queue = new MessageHandlerQueue(this.ide.stage, block, morph);
        this.msgHandlerQueues.push(queue);
    }
    queue.addMessage({variables, messageType});
};

WebSocketManager.prototype.getMessageQueue = function (handler) {
    return this.msgHandlerQueues.find(queue => queue.handler === handler);
};

WebSocketManager.prototype.tryStartQueuedMsgs = function () {
    for (let i = 0; i < this.msgHandlerQueues.length; i++) {
        const queue = this.msgHandlerQueues[i];
        queue.tryHandleNextMessage();
        if (queue.isEmpty()) {
            this.msgHandlerQueues.splice(i, 1);
            i--;
        }
    }

    if (this.msgHandlerQueues.length) {
        setTimeout(() => this.tryStartQueuedMsgs(), 5);
    }
};

WebSocketManager.prototype.getSerializedProject = function() {
    var ide = this.ide,
        pdata,
        media;

    ide.serializer.flush();
    ide.serializer.isCollectingMedia = true;
    pdata = ide.serializer.serialize(ide.stage);
    media = ide.serializer.mediaXML(ide.projectName);
    ide.serializer.isCollectingMedia = false;
    ide.serializer.flushMedia();

    // check if serialized data can be parsed back again
    try {
        ide.serializer.parse(pdata);
    } catch (err) {
        ide.showMessage('Serialization of program data failed:\n' + err);
        throw new Error('Serialization of program data failed:\n' + err);
    }
    if (media !== null) {
        try {
            ide.serializer.parse(media);
        } catch (err) {
            ide.showMessage('Serialization of media failed:\n' + err);
            throw new Error('Serialization of media failed:\n' + err);
        }
    }
    ide.serializer.isCollectingMedia = false;
    ide.serializer.flushMedia();
    ide.serializer.flush();

    return {
        name: ide.projectName,
        code: pdata,
        media: media,
    };
};

WebSocketManager.prototype.destroy = function () {
    if (this.websocket.readyState === this.websocket.OPEN) {
        this._destroy();
    } else {
        this.websocket.onopen = this._destroy.bind(this);
    }
};

WebSocketManager.prototype._destroy = function () {
    this.websocket.onclose = nop;
    this.websocket.close();
};

class MessageHandlerQueue {
    constructor (stage, handler, receiver) {
        this.stage = stage;
        this.receiver = receiver;
        this.handler = handler;
        this.contents = [];
    }

    addMessage(msg) {
        this.contents.push(msg);
    }

    tryHandleNextMessage() {
        if (this.isHandlerIdle()) {
            const msg = this.getNextMessage();
            this.handler.updateReadout();
            if (msg) {
                this.handleMessage(msg);
            }
        }
    }

    handleMessage(msg) {
        this.stage.threads.startProcess(
            this.handler,
            this.receiver,
            this.stage.isThreadSafe,
            null,
            null,
            null,
            false,
            null,
            msg.variables
        );
    }

    isEmpty() {
        return this.contents.length === 0;
    }

    empty() {
        this.contents = [];
    }

    isHandlerIdle() {
        return !this.stage.threads.findProcess(this.handler, this.receiver);
    }

    getExpectedMsgType() {
        return this.handler.inputs()[0].contents().text;
    }

    getNextMessage() {
        const msgType = this.getExpectedMsgType();
        let nextMsg = this.contents.shift();
        while (nextMsg && nextMsg.messageType !== msgType) {
            nextMsg = this.contents.shift();
        }
        return nextMsg;
    }
}

const Errors = (function() {
    class NoLongerLeaderError extends Error {
        constructor() {
            super('No longer the leader.');
        }
    }

    class MissingActionsError extends Error {
        constructor() {
            super('Could not retrieve all missing actions.');
        }
    }

    return {
        NoLongerLeaderError,
        MissingActionsError,
    };
})();


WebSocketManager.MessageHandlerQueue = MessageHandlerQueue;
