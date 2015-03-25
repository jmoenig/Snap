'use strict';
var express = require('express'),
    app = express(),
    port = 8080;

app.use(express.static(__dirname + '/..'));

// Web Sockets
var io = require('socket.io').listen(app.listen(port));

var onMsgReceived = function() {
    // Handle a WebSocket message from NetsBlocks
};

io.sockets.on('connection', function(socket) {
});
