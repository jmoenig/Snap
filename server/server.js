'use strict';
var express = require('express'),
    app = express(),
    port = 8080,
    NetsBlocksServer = require('./NetsBlocksServer');

app.use(express.static(__dirname + '/..'));

app.get('/', function(req, res) {
    res.redirect('/snap.html');
});

app.listen(port);

var nbApp = new NetsBlocksServer();
nbApp.start({port: 5432, path: ''});
