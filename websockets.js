/*globals nop, SnapCloud, SERVER_URL, SERVER_ADDRESS, Context, SpriteMorph,
  StageMorph, SnapActions, DialogBoxMorph, IDE_Morph, isObject, NetsBloxSerializer,
  localize*/
// WebSocket Manager

var WebSocketManager = function (ide) {
    this.ide = ide;
    this.uuid = SnapCloud.clientId;
    this.websocket = null;
    this.messages = [];
    this.processes = [];  // Queued processes to start
    this._protocol = SERVER_URL.substring(0,5) === 'https' ? 'wss:' : 'ws:';
    this.url = this._protocol + '//' + SERVER_ADDRESS;
    this.lastSocketActivity = Date.now();
    this._connectWebSocket();
    this.version = Date.now();
    this.serverVersion = null;

    this.errored = false;
    this.hasConnected = false;
    this.connected = false;
    this.inActionRequest = false;
    this.serializer = new NetsBloxSerializer();
};

WebSocketManager.HEARTBEAT_INTERVAL = 25*1000;  // 25 seconds
WebSocketManager.MessageHandlers = {
    'request-actions-complete': function() {
        this.inActionRequest = false;
    },

    'reload-project': function(msg) {
        console.error(msg.err);
        var message = msg.message + '\n\nPlease reopen the project to continue editing.';
        this.ide.inform(localize('Project Reload Required'), message);
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

    'connected': function() {
        this.onConnect();
    },

    'message': function(msg) {
        var dstId = msg.dstId,
            messageType = msg.msgType,
            content = msg.content;

        // When replaying a network trace, actual messages to the client are ignored
        if (this.ide.room.isReplayingTrace()) {
            if (!this.ide.room.trace.notified) {
                this.ide.showMessage(localize('Ignoring messages received while\nviewing network trace'));
                this.ide.room.trace.notified = true;
            }
            return;
        }

        if (dstId === this.ide.projectName || dstId === 'others in room' || dstId === 'everyone in room') {
            content = this.deserializeMessage(msg);
            this.onMessageReceived(messageType, content, msg);
        }
    },

    'export-room': function(msg) {
        if (msg.action === 'export') {
            this.ide.exportRoom(msg.content);
        } else if (msg.action === 'save') {
            this.ide.saveRoomLocal(msg.content);
        }
    },

    // Update on the current roles at the given room
    'room-roles': function(msg) {
        this.ide.room.onRoomStateUpdate(msg);
    },

    'close-invite': function(msg) {
        if (this.ide.room.invitations[msg.id]) {
            this.ide.room.invitations[msg.id].destroy();
            delete this.ide.room.invitations[msg.id];
        }
    },

    // Receive an invite to join a room
    'room-invitation': function(msg) {
        this.ide.room.promptInvite(msg.id, msg.role, msg.roomName, msg.inviter);
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

    'evicted': function() {
        this.ide.showMessage('You have been evicted from the project.');
        this.ide.newProject();
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
                myself.sendMessage({
                    type: 'elevate-permissions',
                    projectId: msg.projectId,
                    username: username
                });
            }
        );
    },

    'project-request': function(msg) {
        var project = this.getSerializedProject();
        msg.type = 'project-response';
        msg.project = project;

        this.sendMessage(msg);
    },

    'rename-role': function(msg) {
        if (msg.roleId === this.ide.projectName) {  // role name and project name are the same
            this.ide.silentSetProjectName(msg.name);
        }
    },

    'notification': function(msg) {
        this.ide.showMessage(msg.message);
    },

    'share-msg-type': function(msg) {
        // only share with intended role
        if (this.ide.projectName === msg.roleId) {
            var myself = this,
                dialog = new DialogBoxMorph();
            // reject duplicates
            if (this.ide.stage.messageTypes.msgTypes[msg.name]) {
                this.ide.showMessage(msg.from + ' tried sending you message type \'' + msg.name + '\' when you already have it!', 2);
            } else {
                // Prepare dialog & prompt user
                var request =
                    msg.from + ' requested to send you a message type:\n\'' +
                    msg.name + '\' with ' +
                    msg.fields.length +
                    (msg.fields.length !== 1 ? ' fields.' : ' field.') + '\n' +
                    'Would you like to accept?';

                dialog.askYesNo('Message Share Request', request, myself.ide.root());

                // Accept the request
                dialog.ok = function() {
                    var ide = myself.ide.root().children[0].parentThatIsA(IDE_Morph);
                    SnapActions.addMessageType(msg.name, msg.fields)
                        .then(function() {
                            // format fields
                            var fields = [];
                            for (var i = 0; i < msg.fields.length; i++) {
                                fields.push(' ' + '\'' + msg.fields[i] + '\'');
                            }

                            // format notification
                            var notification = 'Received message type \'' + msg.name + '\' with ' + msg.fields.length +
                                (msg.fields.length === 0 ? ' fields.' : (msg.fields.length === 1 ? ' field: ' + msg.fields : ' fields: ' + msg.fields));

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
    'ping': function() {
        this.sendMessage({type: 'pong'});
    },
    'user-action': function(msg) {
        SnapActions.onMessage(msg.action);
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
    this.websocket.onopen = function() {
        if (self.errored === true) {
            self.ide.showMessage((self.hasConnected ? 're' : '') + 'connected!', 2);
            self.errored = false;
        }
        if (!self.hasConnected) {
            setInterval(self.checkAlive.bind(self), WebSocketManager.HEARTBEAT_INTERVAL);
        }

        self.lastSocketActivity = Date.now();
        self.connected = true;

        self.sendMessage({
            type: 'set-uuid',
            clientId: SnapCloud.clientId
        });
        self.hasConnected = true;
    };

    // Set up message events
    // Where should I set this up now?
    this.websocket.onmessage = function(rawMsg) {
        var msg = JSON.parse(rawMsg.data),
            type = msg.type;

        self.lastSocketActivity = Date.now();
        if (WebSocketManager.MessageHandlers[type]) {
            WebSocketManager.MessageHandlers[type].call(self, msg);
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
    message.projectId = SnapCloud.projectId;
    message = this.serializeMessage(message);
    this.send(message);
};

WebSocketManager.prototype.serializeMessage = function(message) {
    if (message.content) {
        var fields = Object.keys(message.content),
            content;

        this.serializer.flush();
        this.serializer.isSavingHistory = false;
        for (var i = fields.length; i--;) {
            content = message.content[fields[i]];
            if (isObject(content)) {
                message.content[fields[i]] = this.serializer.store(content);
            }
        }
        this.serializer.isSavingHistory = true;
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
    var receiver,
        project,
        nodes,
        model;

    SnapActions.serializer.project = {
        stage: new StageMorph(),
        sprites: {}
    };

    return dataList.map(function(value) {
        if (value[0] === '<') {
            try {
                model = SnapActions.serializer.parse(value);
                nodes = model.children;
                project = null;

                // Check if the project is the receiver somewhere
                for (var i = 0; !project && i < nodes.length; i++) {
                    receiver = nodes[i].childNamed('receiver');
                    project = receiver && receiver.childNamed('project');
                }

                // If the receiver is the project...
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

WebSocketManager.prototype.onConnect = function() {
    var myself = this;
    SnapActions.requestMissingActions();
    return this.updateRoomInfo()
        .then(function() {
            while (myself.messages.length) {
                myself.websocket.send(myself.messages.shift());
            }
        });
};

WebSocketManager.prototype.getClientState = function() {
    var owner = this.ide.room.ownerId,
        roleName = this.ide.projectName || 'myRole',
        roomName = this.ide.room.name || '__new_project__',
        state = {
            room: roomName,
            role: roleName
        };

    if (owner) {
        state.owner = owner;
        // Implicitly request actions
        state.actionId = SnapActions.lastSeen;
    }

    return state;
};

WebSocketManager.prototype.updateRoomInfo = function() {
    var myself = this,
        state = this.getClientState();

    return SnapCloud.setClientState(state.room, state.role, state.actionId)
        .catch(function() {
            myself.ide.cloudError().apply(null, arguments);
        });
};

/**
 * Callback for receiving a websocket message.
 *
 * @param {String} message
 * @return {undefined}
 */
WebSocketManager.prototype.onMessageReceived = function (message, content, msg) {
    var hats = [],
        context,
        idle = !this.processes.length,
        stage = this.ide.stage,
        block;

    content = content || [];
    if (message !== '') {
        // if the message is for requestId
        stage.threads.processes.forEach(function (p) {
            if (message === '__reply__' && (p.requestId === msg.requestId) ) p.reply = msg;
        });
        stage.children.concat(stage).forEach(function (morph) {
            if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
                hats = hats.concat(morph.allHatBlocksForSocket(message));
            }
        });

        for (var h = hats.length; h--;) {
            block = hats[h];
            // Initialize the variable frame with the message content for
            // receiveSocketMessage blocks
            context = null;
            if (block.selector === 'receiveSocketMessage') {
                // Create the network context
                context = new Context();
                context.variables.addVar('__message__', content);
                context.variables.addVar('__requestId__', msg.requestId);
                context.variables.addVar('__srcId__', msg.srcId);
            }

            // Find the process list for the given block
            this.addProcess({
                block: block,
                isThreadSafe: stage.isThreadSafe,
                context: context
            });
        }

        if (idle) {
            // This is done in a setTimeout to allow for some of the processes to accumulate
            // and not block the main UI thread. Otherwise, it would simply try to start the
            // last message each time (we are more efficient when we can batch it like this).
            setTimeout(this.startProcesses.bind(this), 50);
        }
    }
};

/**
 * Add a process to the queue of processes to run. These processes are sorted
 * by their top block
 *
 * @param process
 * @return {undefined}
 */
WebSocketManager.prototype.addProcess = function (process) {
    for (var i = 0; i < this.processes.length; i++) {
        if (process.block === this.processes[i][0].block) {
            this.processes[i].push(process);
            return;
        }
    }
    this.processes.push([process]);
};

/**
 * We will create a mutex on the network message/event listening blocks. That is,
 * network messages will not trigger a process until the currently running
 * process for the network event has terminated
 *
 * @return {undefined}
 */
WebSocketManager.prototype.startProcesses = function () {
    var process,
        block,
        stage = this.ide.stage,
        activeBlock;

    // Check each set of processes to see if the block is free
    for (var i = 0; i < this.processes.length; i++) {
        block = this.processes[i][0].block;
        activeBlock = !!stage.threads.findProcess(block);
        if (!activeBlock) {  // Check if the process can be added
            process = this.processes[i].shift();
            process.block.updateReadout();
            stage.threads.startProcess(
                process.block,
                process.isThreadSafe,
                null,
                null,
                null,
                true,
                process.context
            );
            if (!this.processes[i].length) {
                this.processes.splice(i,1);
                i--;
            }
        }
    }

    if (this.processes.length) {
        setTimeout(this.startProcesses.bind(this), 5);
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
        ProjectName: ide.projectName,
        SourceCode: pdata,
        Media: media,
        SourceSize: pdata.length,
        MediaSize: media ? media.length : 0,
        RoomName: this.ide.room.name
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
