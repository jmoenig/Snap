function WebSocketController (owner) {
    this.init(owner);
};

WebSocketController.prototype.init = function (owner) {
    this.owner = owner;
    this.socket = null;
};

WebSocketController.prototype.connect = function (address) {
    if (this.socket?.readyState < 3) {
        this.socket.close();
        this.socket = null;
    }
    this.socket = new WebSocket(address);
};

WebSocketController.prototype.isConnected = function () {
    return (this.socket !== null) && (this.socket.readyState == WebSocket.OPEN);
};

WebSocketController.prototype.disconnect = function (address) {
    if (this.socket?.readyState < 2) {
        this.socket.close();
        this.socket = null;
    }
};

WebSocketController.prototype.send = function (message) {
    if (this.socket.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket not connected');
    }
    this.socket.send(message);
};

WebSocketController.prototype.onreceive = function (callback) {
    if (this.socket.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket not connected');
    }
    this.socket.addEventListener('message', (event) => {
        invoke(callback, new List([event.data]), this.owner);
    });
};

SnapExtensions.primitives.set(
    'ws_connect(address)',
    function (address) {
        var owner = this.parentThatIsAnyOf([SpriteMorph, StageMorph]);
        if (!owner.ws) { owner.ws = new WebSocketController(owner); }
        owner.ws.connect(address);
    }
);

SnapExtensions.primitives.set(
    'ws_connected()',
    function () {
        var owner = this.parentThatIsAnyOf([SpriteMorph, StageMorph]);
        return (owner.ws !== undefined) && (owner.ws.isConnected());
    }
);

SnapExtensions.primitives.set(
    'ws_disconnect()',
    function () {
        var owner = this.parentThatIsAnyOf([SpriteMorph, StageMorph]);
        if (owner.ws !== undefined) { owner.ws.disconnect(); }
    }
);

SnapExtensions.primitives.set(
    'ws_send(message)',
    function (message) {
        var owner = this.parentThatIsAnyOf([SpriteMorph, StageMorph]);
        if (!owner.ws) { throw new Error('WebSocket not connected'); }
        owner.ws.send(message);
    }
);

SnapExtensions.primitives.set(
    'ws_onreceive(callback)',
    function (callback) {
        var owner = this.parentThatIsAnyOf([SpriteMorph, StageMorph]);
        if (!owner.ws) { throw new Error('WebSocket not connected'); }
        owner.ws.onreceive(callback);
    }
);

