/*globals SpriteMorph, StageMorph*/
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
    var data;
    this.websocket.onmessage = function(message) {
        data = message.data.split(' ');
        console.log('received', data[0], 'from', data[1]);
        self.onMessageReceived(data[0], data[1]);
    };
};

WebSocketManager.prototype.sendMessage = function(message) {
    // Should send role, game, etc on every message?
    // FIXME
    var state = this.websocket.readyState;
    if (state === this.websocket.OPEN) {
        console.log('sending message:', message);
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
WebSocketManager.prototype.onMessageReceived = function (message, role) {
    var self = this,
        hats = [],
        procs = [];

    if (message !== '') {
        this.stage.lastMessage = message;
        this.stage.children.concat(this.stage).forEach(function (morph) {
            if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
                hats = hats.concat(morph.allHatSocketBlocksFor(message, role));
            }
        });
        hats.forEach(function (block) {
            procs.push(self.stage.threads.startProcess(block, self.stage.isThreadSafe));
        });
    }
    return procs;
};

WebSocketManager.prototype.destroy = function () {
    console.log('Closing socket...');
    this.websocket.close();
};
