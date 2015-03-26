'use strict';
var express = require('express'),
    app = express(),
    port = 8080;

app.use(express.static(__dirname + '/..'));

// Web Sockets
var io = require('socket.io').listen(app.listen(port));

var onMsgReceived = function() {
    // Handle a WebSocket message from NetsBlocks
    // TODO
};

io.sockets.on('connection', function(socket) {
    console.log('WebSocket connection established!');
    // When the "register" block is used, the client
    // will send a message with:
    //      + gameId: GAME_UUID 
    //      + playerId: PLAYER_ID
    //
    // The server will then find a game that does not have 
    // the given role filled
    socket.on('register', function(data) {
        var gameId = data.gameId,
            role = data.roleId;

        console.log('Received registration message from '+role);

        // Add the socket to the given group
        // TODO

        // Broadcast the join message to all the members of the given game 
        // instance and broadcast a join message from all current members 
        // to the new guy
        // TODO
    });


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
    });
});
