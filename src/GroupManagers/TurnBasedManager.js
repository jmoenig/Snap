/*
 * This GroupManager assumes we are playing 2 player turn based games
 *
 * @author brollb / https://github/brollb
 */

'use strict';

var BaseManager = require('./Basic.js'),
    Utils = require('../Utils.js'),
    R = require('ramda');

var TurnBasedManager = function() {
    this.groups = [];

    // Record keeping
    this.id2Group = {};
};

Utils.inherit(TurnBasedManager.prototype, BaseManager.prototype);

TurnBasedManager.prototype.getName = function() {
    return 'TurnBasedManager';
};

TurnBasedManager.prototype.getAllGroups = function() {
    return R.clone(this.groups);
};

TurnBasedManager.prototype.getGroupMembersToMessage = function(socket) {
    return this.getGroupMembers(socket);
};

TurnBasedManager.prototype.getGroupMembers = function(socket) {
    var group = this.id2Group[socket.id] || [],
        getId = R.partialRight(Utils.getAttribute, 'id'),
        isSocketId = R.partial(R.eq, socket.id);

    return R.reject(R.pipe(getId, isSocketId), group);
};

TurnBasedManager.prototype.onConnect = function(socket) {
    this._addToGroup(socket);
};

TurnBasedManager.prototype.isMessageAllowed = function(socket, message) {
    var group = this.id2Group[socket.id],
        index = group.indexOf(socket);

    if (group.lastTurn !== index) {
        group.lastTurn = index;
        return true;
    }
    return false;
};

TurnBasedManager.prototype.onDisconnect = function(socket) {
    var group = this.id2Group[socket.id],
        index;

    if (group.length === 2) {
        index = group.indexOf(socket);
        group.splice(index,1);
    } else {
        index = this.groups.indexOf(group);
        this.groups.splice(group);
    }

    delete this.id2Group[socket.id];
};

TurnBasedManager.prototype._addToGroup = function(socket) {
    for (var i = 0; i < this.groups.length; i++) {
        if (this.groups[i].length < 2) {
            this.groups[i].push(socket);
            return this.id2Group[socket.id] = this.groups[i]; // jshint ignore:line
        }
    }

    // Create a new group
    var group = [];
    group.push(socket);
    this.groups.push(group);
    return this.id2Group[socket.id] = group; //jshint ignore:line
};

// debugging
TurnBasedManager.prototype._printGroups = function() {
    console.log('Groups are', this.groups.map(function(group) {
        return group.map(function(s) {
            return s.id;
        });
    }), '(',this.groups.length,')');
};

module.exports = TurnBasedManager;
