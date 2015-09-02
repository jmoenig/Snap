// The RPC Manager manages the contexts of rooms handles rpcs
//
// It will need to load RPC's from the RPC directory and then mantain a separate
// RPC context for each room.

'use strict';

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    PROCEDURES_DIR = path.join(__dirname,'procedures');

/**
 * RPCManager
 *
 * @constructor
 */
var RPCManager = function(groupManager) {
    this.rpcs = RPCManager.loadRPCs();
    this.router = this.createRouter();
    this.groupManager = groupManager;
};

RPCManager.loadRPCs = function() {
    // Load the rpcs from the __dirname+'/procedures' directory
    return fs.readdirSync(PROCEDURES_DIR).filter(function(name) {
            return path.extname(name) === '.js';
        })
        .map(function(rpc) {
            var fullPath = path.join(PROCEDURES_DIR,rpc),
                RPCConstructor = require(fullPath);
            return RPCConstructor;
        });
};

RPCManager.prototype.createRouter = function() {
    var router = express.Router({mergeParams: true});
    // For each RPC, create the respective endpoints
    this.rpcs.forEach(this.addRoute.bind(this, router));

    return router;
};

RPCManager.prototype.addRoute = function(router, rpc) {
    router.route(rpc.getPath()+'/:action')
        .get(function(req, res) {
            // Get the group id
            //
            // Look up the specific rpc and call the given action on it
            //
            // If the RPC hasn't been created for the given room, create one 
            // TODO

            // Then pass the call through
            // TODO
        });
};

module.exports = RPCManager;
