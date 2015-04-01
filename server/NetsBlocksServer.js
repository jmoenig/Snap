// NetsBlocks Server
// Handles the groups and websocket communication 

'use strict';

// Web Sockets
var WebSocketServer = require('ws').Server,
    globalGroup = {},  // For all unregistered clients
    counter = 0;

var NetsBlocksServer = function(opts) {
    // Create "rooms" or "groups"
    // records of 
    // project ids Dictionary<project_ids>
    // -> group (Array)
    // -> Dictionary<roles>
    this.groups = [];
    this.sockets = [];
    this.socket2Role = {};
    this.socket2Group = {};
};

NetsBlocksServer.prototype.start = function(opts) {
    this._wss = new WebSocketServer(opts);

    var self = this;
    this._wss.on('connection', function(socket) {
        console.log('WebSocket connection established! ('+counter+')');

        // ID the socket
        socket.id = ++counter;
        self.sockets.push(socket);

        // Add the client to the global group
        self.addClientToGroup(socket, globalGroup);

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
    }, 1000);

};

NetsBlocksServer.prototype.broadcast = function(message, group) {
    console.log('broadcasting '+message);
    var peers = Object.keys(group),
        s;
    for (var i = peers.length; i--;) {
        s = group[peers[i]];
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
        var group = this.socket2Group[socket.id],
            role = this.socket2Role[socket.id],
            index = this.sockets.indexOf(socket);

        delete group[role];
        delete this.socket2Role[socket.id];
        delete this.socket2Group[socket.id];
        this.sockets.splice(index,1);

        // Broadcast the leave message
        this.broadcast('leave '+role, group);
        return false;
    }
    return true;
};

NetsBlocksServer.prototype.unregisterSocket = function(socket) {
    console.log('unregistering '+socket.id);
    // Update the groups
    var role = this.socket2Role[socket.id],
        group = this.socket2Group[socket.id];

    if (group !== undefined) {
        console.log('removing '+role+' from group');
        // Remove role from group
        delete this.socket2Group[socket.id][role];
        // Remove group registry for socket
        console.log('group now contains', Object.keys(this.socket2Group[socket.id]));
        delete this.socket2Group[socket.id];
    }
};

NetsBlocksServer.prototype.notifyGroupJoin = function(group, socket, isSilent) {
    var roles = Object.keys(group),
        role = this.socket2Role[socket.id];

    // Send 'join' messages to peers in the 'group'
    this.broadcast('join '+role, group);

    // Send new member join messages from everyone else
    if (!isSilent) {
        for (var i = roles.length; i--;) {
            if (roles[i] !== role) {
                socket.send('join '+roles[i]);
            }
        }
    }
};

/**
 * Notify remaining members of client leaving.
 *
 * @param {Group} group
 * @param {WebSocket} socket
 * @return {undefined}
 */
NetsBlocksServer.prototype.notifyGroupLeave = function(group, socket) {
};

NetsBlocksServer.prototype.addClientToGroup = function(socket, group, isSilent) {
    var role = this.socket2Role[socket.id] || 'default';

    // REMOVE
    console.assert(!!group);

    group[role] = socket;
    this.socket2Group[socket.id] = group;
    console.log('Adding socket #'+socket.id+' ('+role+')');
    return this.notifyGroupJoin(group, socket, isSilent);
};

/**
 * Find a group for the client that doesn't have that role filled. Create a
 * new group if needed.
 *
 * @param {WebSocket} socket
 * @param {String} role
 * @return {undefined}
 */
NetsBlocksServer.prototype.findGroupForClient = function(socket) {
    var role = this.socket2Role[socket.id];
    // Add client to group based on it's role
    for (var i = 0; i < this.groups.length; i++) {
        if (!this.groups[i][role]) {  // If not in the group, add it
            return this.groups[i];
        }
    }

    return null;
};

NetsBlocksServer.prototype.canSwitchRolesInCurrentGroup = function(socket, newRole) {
    var group = this.socket2Group[socket.id],
        oldRole = this.socket2Role[socket.id];

    if (!group) {
        return false;
    }

    return !group[newRole] || newRole === oldRole;
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
        role;

    // Handle the different request types
    switch (type) {
        case 'register':
            var group,
                oldRole;

            role = msg.shift();  // record the roleId
            // Update old group of leaving...
            group = this.socket2Group[socket.id];
            oldRole = this.socket2Role[socket.id];
            if (!!group && !!oldRole) {
                this.broadcast('leave '+oldRole, group);
            }

            if (this.canSwitchRolesInCurrentGroup(socket, role)) {
                delete group[oldRole];
                this.socket2Role[socket.id] = role;
                this.addClientToGroup(socket, group, true);
                
            } else {
                // Remove from previous group
                this.unregisterSocket(socket);
                this.socket2Role[socketId] = role;
                // Add client to group
                group = this.findGroupForClient(socket, role);

                // Create a new group
                if (group === null) {
                    group = {};
                    this.groups.push(group);
                }

                this.addClientToGroup(socket, group);
            }
            break;

        case 'message':
            // broadcast the message, role to all peers
            role = this.socket2Role[socketId];
            msg.push(role);
            console.log('About to broadcast '+msg.join(' ')+
                        ' from socket #'+socketId+' ('+role+')');
            this.broadcast(msg.join(' '), this.socket2Group[socketId]);
            break;
    }
};

module.exports = NetsBlocksServer;
