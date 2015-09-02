'use strict';
var express = require('express'),
    app = express(),
    argv = require('yargs').argv,
    port = process.env.PORT || 8080,
    wsPort = process.env.WS_PORT || 5432,
    fs = require('fs'),
    path = require('path');

app.use(express.static(__dirname + '/client/'));

app.get('/', function(req, res) {
    res.redirect('/snap.html');
});

// Parse cmd line options for group manager

var getParadigmsDict = function() {
    var result = {},
        files = fs.readdirSync(__dirname + '/../src/server/groups/paradigms'),
        name;

    for (var i = files.length; i--;) {
        if (path.extname(files[i]) === '.js') {
            name = files[i].toLowerCase().replace('manager', '');
            name = name.replace('.js', '');
            result[name] = require('../src/server/groups/paradigms/'+files[i]);
        }
    }
    return result;
};

var paradigms = getParadigmsDict(),
    def = 'TwoPlayer',
    group = argv.g || def,
    manager = paradigms[group.toLowerCase()] || paradigms[def];

// Set the group manager
var opts = {port: port,
            wsPort: wsPort,
            path: '',
            GroupManager: manager};

var Server = require('../src/server/Server'),
    server = new Server(opts);

server.start();
