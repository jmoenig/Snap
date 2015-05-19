/*globals VariableFrame,SpriteMorph, StageMorph*/
// WebSocket Manager

var WebSocketManager = function (stage) {
    this.stage = stage;
    this.websocket = null;
    this.messages = [];
    this._connectWebSocket();
};

WebSocketManager.prototype._connectWebSocket = function() {
    // Connect socket to the server
    console.log('Creating new websocket!');
    var address = 'ws://'+window.location.hostname+':5432',
        self = this;
    this.websocket = new WebSocket(address);
    // Set up message firing queue
    this.websocket.onopen = function() {
        while (self.messages.length) {
            self.websocket.send(self.messages.shift());
        }
    };

    // Set up message events
    // Where should I set this up now?
    this.websocket.onmessage = function(message) {
        var data = message.data.split(' '),
            type = data.shift(),
            role = data.pop(),
            content = JSON.parse(data.join(' '));
        console.log('received', type, 'from', role);
        self.onMessageReceived(type, content, role);
    };
};

WebSocketManager.prototype.sendMessage = function(message) {
    // Should send role, game, etc on every message?
    // FIXME
    var state = this.websocket.readyState;
    if (state === this.websocket.OPEN) {
        this.websocket.send(message);
    } else if (state !== this.websocket.CONNECTING) {
        this.messages.push(message);
        this._connectWebSocket();
    }
};

/**
 * Callback for receiving a websocket message.
 *
 * @param {String} message
 * @return {undefined}
 */
WebSocketManager.prototype.onMessageReceived = function (message, content, role) {
    var self = this,
        hats = [],
        procs = [],
        varFrame;

    if (message !== '') {
        this.stage.lastMessage = message;
        this.stage.children.concat(this.stage).forEach(function (morph) {
            if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
                hats = hats.concat(morph.allHatSocketBlocksFor(message, role));
            }
        });
        hats.forEach(function (block) {
            // Initialize the variable frame with the message content for 
            // receiveSocketMessage blocks
            if (block.selector === 'receiveSocketMessage') {
                varFrame = new VariableFrame();
                for (var i = content.length; i--;) {
                    varFrame.addVar(i, content[i]);
                }
                procs.push(self.stage.threads.startProcess(
                    block, 
                    self.stage.isThreadSafe, 
                    undefined,
                    undefined,
                    varFrame));
            } else {
                procs.push(self.stage.threads.startProcess(block, self.stage.isThreadSafe));
            }
        });
    }
    return procs;
};

WebSocketManager.prototype.destroy = function () {
    this.websocket.close();
};
