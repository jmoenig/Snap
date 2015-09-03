// The RPC Manager manages the contexts of rooms handles rpcs
//
// It will need to load RPC's from the RPC directory and then mantain a separate
// RPC context for each room.

'use strict';

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    PROCEDURES_DIR = path.join(__dirname,'procedures'),
    debug = require('debug'),
    log = debug('NetsBlox:RPCManager:log'),
    info = debug('NetsBlox:RPCManager:info');

/**
 * RPCManager
 *
 * @constructor
 */
var RPCManager = function(groupManager) {
    this.rpcs = RPCManager.loadRPCs();
    this.router = this.createRouter();

    // The RPCManager contains groups with the same ids as those owned by the 
    // communication manager. In this object, they contain the RPC's owned by
    // the group.
    this.groupManager = groupManager;
    this.groupManager.onGroupClose(this.onGroupClose.bind(this));
    this.groups = {};
};

/**
 * Load all supported procedures from the local /procedures directory
 *
 * @return {Array<ProcedureConstructor>}
 */
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

RPCManager.prototype.addRoute = function(router, RPC) {
    info('Adding route for '+RPC.getPath());
    router.route(RPC.getPath()+'/:action')
        .get(this.handleRPCRequest.bind(this, RPC));
};

RPCManager.prototype.handleRPCRequest = function(RPC, req, res) {
    var groupId,
        group,
        action,
        rpc;

    action = req.params.action;
    info('Received request to '+RPC.getPath()+' for '+action);
    // Get the group id
    groupId = this.groupManager.getGroupId(req.query.username);
    if (!groupId) {
        log('Could not find group for user "'+req.query.username+'"');
        return res.status(401).send('ERROR: user not found. who are you?');
    }

    // Look up the specific RPC and call the given action on it
    if (!this.groups[groupId]) {
        this.groups[groupId] = {};
    }
    group = this.groups[groupId];

    // If the RPC hasn't been created for the given room, create one 
    if (!group[RPC.getPath()]) {
        info('Creating new RPC ('+RPC.getPath()+') for '+groupId);
        group[RPC.getPath()] = new RPC();
    }
    rpc = group[RPC.getPath()];

    // Then pass the call through
    if (RPC.getActions().indexOf(action) !== -1) {
        console.log('About to call '+RPC.getPath()+'=>'+action);
        return rpc[action](req, res);
    } else {
        log('Invalid action requested for '+RPC.getPath()+': '+action);
        return res.status(400).send('unrecognized action');
    }
};

RPCManager.prototype.onGroupClose = function(groupId) {
    delete this.groups[groupId];
};

module.exports = RPCManager;
