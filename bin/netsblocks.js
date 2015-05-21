'use strict';

var fs = require('fs'),
    argv = require('yargs').argv,
    wsPort = process.env.WS_PORT || 5432,
    port = process.env.PORT || 8080,
    path = require('path');

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
    def = 'basic',
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
