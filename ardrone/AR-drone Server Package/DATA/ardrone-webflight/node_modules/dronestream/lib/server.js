/*
 * Drone Stream listen:
 * Takes a) a port number or b) a server object (node http or express, etc);
 */
var staticDir = 'dronestream',
    check = new RegExp('^/' + staticDir, 'i'),
    dist = __dirname + '/../dist';

module.exports.listen = function listen(server, options) {
    'use strict';
    var port, oldHandlers;

    if (typeof server === 'number') {
        port = server;
        server = require('http').createServer();
        server.listen(port);
    }

    /*
     * Serving up the static files needed
     */
    oldHandlers = server.listeners('request').splice(0);
    server.removeAllListeners('request');

    server.on('request', function (req, res) {
        var i = 0;
        if (handler(req, res)) {
            return;
        }

        for (; i < oldHandlers.length; ++i) {
            oldHandlers[i].call(server, req, res);
        }
    });

    function handler(req, res, next) {
        var path, read;
        if (!check.test(req.url)) {
            return false;
        }
        path = dist + req.url.replace(check, '');
        console.log('checking static path: %s', path);
        read = require('fs').createReadStream(path);
        read.pipe(res);
        read.on('error', function (e) {
            console.log('Stream error: %s', e.message);
        });

        return true;
    }

    /*
     * Connecting stream + websocket server
     */
    return require('./stream').attach(server, options);
};
