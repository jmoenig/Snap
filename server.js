'use strict';
var express = require('express'),
    app = express(),
    port = process.argv[2] || 8080;

// Simple static web server
app.set('views', __dirname);
console.log('dirname is ', __dirname);
app.get('/', function(req, res) {
    res.sendFile(__dirname+'/snap.html');
});

var server = app.listen(port, function() {
    var host = server.address().address,
        port = server.address().port;

    console.log('NetsBlocks server listening at http://'+host+':'+port);
});
