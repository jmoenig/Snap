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
var socket2Role = {},
    roles2Sockets = {};

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
            socket2Role[socketId] = role;
            roles2Sockets[role] = socket;
            break;

        case 'message':
            // broadcast the message, role to all peers
            var peers = Object.keys(roles2Sockets),
                s;
            role = socket2Role[socketId];
            msg.push(role);
            for (var i = peers.length; i--;) {
                s = roles2Sockets[peers[i]];
                console.log('Sending message to '+peers[i]);
                s.send(msg.join(' '));
            }
            break;
    }
};

var counter = 0;
wss.on('connection', function(socket) {
    // ID the socket
    socket.id = ++counter;
    console.log('WebSocket connection established!');
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
    console.log('socket is closing...');
});
