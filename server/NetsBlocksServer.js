// NetsBlocks Server
// Handles the groups and websocket communication 

'use strict';

// Web Sockets
var WebSocketServer = require('ws').Server,
    counter = 0,
    GenericManager = require('./GroupManagers/GenericManager');

var NetsBlocksServer = function(opts) {
    // Create "rooms" or "groups"
    // records of 
    // project ids Dictionary<project_ids>
    // -> group (Array)
    // -> Dictionary<roles>
    this.sockets = [];
    this.socket2Role = {};

    this.groupManager = new GenericManager();
};

NetsBlocksServer.prototype.start = function(opts) {
    this._wss = new WebSocketServer(opts);

    var self = this;
    this._wss.on('connection', function(socket) {
        console.log('WebSocket connection established! ('+counter+')');

        // ID the socket
        socket.id = ++counter;
        self.sockets.push(socket);
        self.socket2Role[socket.id] = 'default_'+socket.id;

        // Add the client to the global group
        self.groupManager.onConnect(socket);
        // Broadcast 'join' on connect
        self.notifyGroupJoin(socket);

        /**
         * When the "broadcast" block is used, the server will receive 
         * a message labeled 'message' from the client.
         *
         * On receiving this message, the server will then broadcast this
         * message to all the other members in the group.
         * 
         */
        socket.on('message', function(data) {
            console.log('Received message: ',data);
            self.onMsgReceived(socket, data);
        });
    });

    // Check if the sockets are alive
    setInterval(function() {
        self.updateSockets();
    }, 500);

};

NetsBlocksServer.prototype.broadcast = function(message, peers) {
    console.log('broadcasting '+message,'to', peers.map(function(r){return r.id;}));
    var s;
    for (var i = peers.length; i--;) {
        s = peers[i];
        // Check if the socket is open
        if (this.updateSocket(s)) {
            s.send(message);
        }
    }
};

NetsBlocksServer.prototype.updateSockets = function() {
    for (var i = this.sockets.length; i--;) {
        this.updateSocket(this.sockets[i]);
    }
};

/**
 * Check if the socket is still open. If not, clean up the groups and broadcast updates.
 *
 * @param {WebSocket} socket
 * @return {Boolean} connected?
 */
NetsBlocksServer.prototype.updateSocket = function(socket) {
    if (socket.readyState !== socket.OPEN) {
        console.log('Removing disconnected socket');
        // Update the groups as necessary
        var index = this.sockets.indexOf(socket),
            role = this.socket2Role[socket.id];

        //console.log('Global group is', globalGroup);
        delete this.socket2Role[socket.id];
        this.sockets.splice(index,1);

        // Broadcast the leave message to peers of the given socket
        var peers = this.groupManager.getGroupMembers(socket);

        this.broadcast('leave '+role, peers);

        this.groupManager.onDisconnect(socket);
        return false;
    }
    return true;
};

NetsBlocksServer.prototype.notifyGroupJoin = function(socket, isSilent) {
    var role = this.socket2Role[socket.id],
        peers = this.groupManager.getGroupMembers(socket);

    // Send 'join' messages to peers in the 'group'
    this.broadcast('join '+role, peers);

    // Send new member join messages from everyone else
    if (!isSilent) {
        for (var i = peers.length; i--;) {
            if (peers[i] !== socket.id) {
                socket.send('join '+this.socket2Role[peers[i]]);
            }
        }
    }
};

/**
 * Handle a websocket message.
 *
 * @param {WebSocket} socket
 * @param {String} message
 * @return {undefined}
 */
NetsBlocksServer.prototype.onMsgReceived = function(socket, message) {
    // Handle a WebSocket message from NetsBlocks
    var msg = message.split(' '),
        socketId = socket.id,
        type = msg.shift(),
        oldRole = this.socket2Role[socket.id],
        peers,
        group,
        role;

    // Handle the different request types
    console.log(new Array(20).join('- '));
    console.log('Received msg:', message, 'from',socket.id);
    var leftMembers = this.groupManager.onMessage(socket, message);
    switch (type) {
        case 'register':

            role = msg.shift();  // record the roleId
            this.socket2Role[socket.id] = role;
            break;

        case 'message':
            // broadcast the message, role to all peers
            role = this.socket2Role[socketId];
            msg.push(role);
            console.log('About to broadcast '+msg.join(' ')+
                        ' from socket #'+socketId+' ('+role+')');
            peers = this.groupManager.getGroupMembers(socket);
            peers.push(socket);
            this.broadcast(msg.join(' '), peers);
            break;

        default:
            break;
    }

    if (leftMembers) { // Update group change
        var k,
            r;

        // Broadcast 'leave' to old peers
        k = leftMembers.indexOf(socket);
        leftMembers.splice(k,1);
        this.broadcast('leave '+oldRole, leftMembers);

        this.notifyGroupJoin(socket);
    }
};

module.exports = NetsBlocksServer;
