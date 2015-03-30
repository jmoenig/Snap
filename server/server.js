'use strict';
var express = require('express'),
    app = express(),
    port = 8080;

app.use(express.static(__dirname + '/..'));

app.get('/', function(req, res) {
    res.redirect('/snap.html');
});

app.listen(port);

// Web Sockets
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 5432,  // FIXME Put these on the same port
                               path: ''});

// Create "rooms" or "groups"
// TODO
var groups = [],  // records of 
// project ids Dictionary<project_ids>
// -> group (Array)
// -> Dictionary<roles>
    socket2Role = {},
    socket2Group = {},
    roles2Sockets = {};

var broadcast = function(message, group) {
    console.log('broadcasting '+message);
    var peers = Object.keys(group),
        s;
    for (var i = peers.length; i--;) {
        s = group[peers[i]];
        // Check if the socket is open
        // TODO
        //console.log('s.send:', s.send);
        s.send(message);
    }
};

var unregisterSocket = function(socket) {
    console.log('unregistering '+socket.id);
    // Update the groups
    var role = socket2Role[socket.id],
        group = socket2Group[socket.id];

    if (group !== undefined) {
        broadcast('leave '+role, group);
        console.log('removing '+role+' from group');
        // Remove socket from group
        delete socket2Group[socket.id][role];
        // Remove group registry
        console.log('group now contains', Object.keys(socket2Group[socket.id]));
        delete socket2Group[socket.id];
    }
};

/**
 * Add a client to a group that doesn't have that role filled. Create a
 * new group if needed.
 *
 * @param {WebSocket} socket
 * @param {String} role
 * @return {undefined}
 */
var addClientToGroup = function(socket, role) {
    // Add client to group based on it's role
    for (var i = 0; i < groups.length; i++) {
        if (!groups[i][role]) {  // If not in the group, add it
            groups[i][role] = socket;
            socket2Group[socket.id] = groups[i];
            console.log('Adding socket #'+socket.id+' ('+role+') to '+i);
            return;
        }
    }

    // Create a new group
    var group = {};
    group[role] = socket;
    groups.push(group);
    socket2Group[socket.id] = group;
    console.log('Adding socket #'+socket.id+' ('+role+') to '+(groups.length-1));

    // Send new member join messages from everyone else
    //socket.send('join '+role);
};

/**
 * Handle a websocket message.
 *
 * @param {WebSocket} socket
 * @param {String} message
 * @return {undefined}
 */
var onMsgReceived = function(socket, message) {
    // Handle a WebSocket message from NetsBlocks
    var msg = message.split(' '),
        socketId = socket.id,  // FIXME
        type = msg.shift(),
        role;

    // Handle the different request types
    switch (type) {
        case 'register':
            role = msg.shift();  // record the roleId
            // Remove from previous group
            unregisterSocket(socket);
            socket2Role[socketId] = role;
            roles2Sockets[role] = socket;
            // Add client to group
            addClientToGroup(socket, role);
            // Send 'join' messages to peers in the 'group'
            broadcast('join '+role, socket2Group[socketId]);
            break;

        case 'message':
            // broadcast the message, role to all peers
            role = socket2Role[socketId];
            msg.push(role);
            console.log('About to broadcast '+msg.join(' ')+
                        ' from socket #'+socketId+' ('+role+')');
            broadcast(msg.join(' '), socket2Group[socketId]);
            break;
    }
};

var counter = 0;
wss.on('connection', function(socket) {
    // ID the socket
    socket.id = ++counter;
    console.log('WebSocket connection established! ('+counter+')');
    // When the "register" block is used, the client
    // will send a message with:
    //      + gameId: GAME_UUID 
    //      + playerId: PLAYER_ID
    //
    // The server will then find a game that does not have 
    // the given role filled

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
        onMsgReceived(socket, data);
    });
});

wss.on('close', function(socket) {
    // TODO send 'leave' messages to everyone in the socket group
    var role = socket2Role[socket.id];
    broadcast('leave '+role, socket2Group[socket.id]);
    console.log('socket is closing...');
});
