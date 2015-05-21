/*
 * This GroupManager assumes we are playing 2 player game (not turn based)
 *
 * @author brollb / https://github/brollb
 */

'use strict';

var BaseManager = require('./Basic.js'),
    Utils = require('../Utils.js'),
    assert = require('assert'),
    _debug = require('debug'),
    log = _debug('NetsBlocks:GroupManager:log'),
    info = _debug('NetsBlocks:GroupManager:info'),
    debug = _debug('NetsBlocks:GroupManager:debug'),
    R = require('ramda');

var getId = R.partialRight(Utils.getAttribute, 'id');
var TwoPlayerManager = function() {
    BaseManager.call(this);
    this.groups = [];
    info('Created '+this.getName());

    // Record keeping
    this.id2Group = {};
};

Utils.inherit(TwoPlayerManager.prototype, BaseManager.prototype);

TwoPlayerManager.prototype.getName = function() {
    return 'TwoPlayerManager';
};

TwoPlayerManager.prototype.getAllGroups = function() {
    return R.clone(this.groups);
};

TwoPlayerManager.prototype.getGroupMembersToMessage = function(socket) {
    var members = this.getGroupMembers(socket);
    info('Getting group members to message for '+socket.id+': '+members.map(getId));
    return members;
};

TwoPlayerManager.prototype.getGroupMembers = function(socket) {
    var group = this.id2Group[socket.id] || [],
        isSocketId = R.partial(R.eq, socket.id),
        members = R.reject(R.pipe(getId, isSocketId), group);

    log('Group members of', socket.id, 'are', members.map(getId));
    this._printGroups();
    assert(members.length < 2);
    return members;
};

TwoPlayerManager.prototype.onMessage = function(socket) {
    this._printGroups();
};

TwoPlayerManager.prototype.onConnect = function(socket) {
    this._addToGroup(socket);
};

TwoPlayerManager.prototype.onDisconnect = function(socket) {
    var group = this.id2Group[socket.id],
        index,
        peer;

    info('Removing #'+socket.id+' from '+TwoPlayerManager._printGroup(group));

    // Remove the given group and add the other socket back to a group
    if (group.length === 2) {
        peer = group[0] === socket ? group[1] : group[0];
    }

    index = this.groups.indexOf(group);
    this.groups.splice(group, 1);
    delete this.id2Group[socket.id];
    
    if (peer) {
        info('Adding #'+socket.id+' back to groups');
        this._addToGroup(peer);
        this._printGroups();
    }
};

TwoPlayerManager.prototype._addToGroup = function(socket) {
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
TwoPlayerManager.prototype._printGroups = function() {
    debug('Groups are', this.groups.map(TwoPlayerManager._printGroup),
        '(',this.groups.length,')');
};

TwoPlayerManager._printGroup = function(group) {
    return group.map(function(s) {
        return s.id;
    });
};

module.exports = TwoPlayerManager;
