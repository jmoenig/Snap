'use strict';
var express = require('express'),
    app = express(),
    port = 8080,
    NetsBlocksServer = require('./NetsBlocksServer');

app.use(express.static(__dirname + '/client/'));

app.get('/', function(req, res) {
    res.redirect('/snap.html');
});

app.listen(port);

console.log('NetsBlocks server listening on port '+port);

// Parse cmd line options for group manager?
// TODO

var TwoPlayerTurn = require('./GroupManagers/TurnBasedManager');
var opts = {port: 5432, 
             path: '', 
             GroupManager: TwoPlayerTurn};
var nbApp = new NetsBlocksServer(opts);
nbApp.start(opts);
