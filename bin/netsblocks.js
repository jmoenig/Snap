'use strict';
var express = require('express'),
    app = express(),
    argv = require('yargs').argv,
    port = process.env.PORT || 8080,
    wsPort = process.env.WS_PORT || 5432,
    NetsBlocksServer = require('./NetsBlocksServer'),
    fs = require('fs'),
    path = require('path');

console.log('port:', port);
app.use(express.static(__dirname + '/client/'));

app.get('/', function(req, res) {
    res.redirect('/snap.html');
});

app.get('/Examples', function(req, res) {
    var files = fs.readdirSync(__dirname+'/client/Examples');
    console.log('Received request for examples:', files);
    res.json(files);
});

var server = app.listen(port);

console.log('NetsBlocks server listening on port '+port);

// Parse cmd line options for group manager

var getGroupManagerDict = function() {
    var result = {},
        files = fs.readdirSync(__dirname + '/../src/GroupManagers'),
        name;

    for (var i = files.length; i--;) {
        if (path.extname(files[i]) === '.js') {
            name = files[i].toLowerCase().replace('manager', '');
            name = name.replace('.js', '');
            result[name] = require('../src/GroupManagers/'+files[i]);
        }
    }
    return result;
};

var GroupManagers = getGroupManagerDict(),
    def = 'TwoPlayer',
    group = argv.g || def,
    manager = GroupManagers[group.toLowerCase()] || GroupManagers[def];

// Set the group manager
var opts = {port: port,
            wsPort: wsPort,
            path: '',
            GroupManager: manager};

var Server = require('../src/Server'),
    server = new Server(opts);

server.start();
