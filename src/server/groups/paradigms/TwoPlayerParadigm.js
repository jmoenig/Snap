/*
 * This paradigm assumes we are playing 2 player game (not turn based)
 *
 * @author brollb / https://github/brollb
 */

'use strict';

var BaseParadigm = require('./Basic.js'),
    Utils = require('../../Utils.js'),
    assert = require('assert'),
    _debug = require('debug'),
    log = _debug('NetsBlocks:GroupManager:log'),
    info = _debug('NetsBlocks:GroupManager:info'),
    debug = _debug('NetsBlocks:GroupManager:debug'),
    R = require('ramda'),
    COUNT = 0;

var getId = R.partialRight(Utils.getAttribute, 'id');
var TwoPlayerParadigm = function() {
    BaseParadigm.call(this);
    this.groups = [];
    info('Created '+this.getName());

    // Record keeping
    this.id2Group = {};
};

Utils.inherit(TwoPlayerParadigm.prototype, BaseParadigm.prototype);

TwoPlayerParadigm.prototype.getName = function() {
    return 'TwoPlayer';
};

/**
 * Get the group id given the username
 *
 * @param {WebSocket} id
 * @return {Int} group id
 */
TwoPlayerParadigm.prototype.getGroupId = function(socket) {
    return this.id2Group[socket.id].id;
};

TwoPlayerParadigm.prototype.getAllGroups = function() {
    return R.clone(this.groups);
};

TwoPlayerParadigm.prototype.getGroupMembersToMessage = function(socket) {
    var members = this.getGroupMembers(socket);
    info('Getting group members to message for '+socket.id+': '+members.map(getId));
    return members;
};

TwoPlayerParadigm.prototype.getGroupMembers = function(socket) {
    var group = this.id2Group[socket.id] || [],
        isSocketId = R.partial(R.eq, socket.id),
        members = R.reject(R.pipe(getId, isSocketId), group);

    log('Group members of', socket.id, 'are', members.map(getId));
    this._printGroups();
    assert(members.length < 2);
    return members;
};

TwoPlayerParadigm.prototype.onMessage = function(socket) {
    this._printGroups();
};

TwoPlayerParadigm.prototype.onConnect = function(socket) {
    this._addToGroup(socket);
};

TwoPlayerParadigm.prototype.onDisconnect = function(socket) {
    var group = this.id2Group[socket.id],
        index,
        peer;

    info('Removing #'+socket.id+' from '+TwoPlayerParadigm._printGroup(group));

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

TwoPlayerParadigm.prototype._addToGroup = function(socket) {
    for (var i = 0; i < this.groups.length; i++) {
        if (this.groups[i].length < 2) {
            this.groups[i].push(socket);
            return this.id2Group[socket.id] = this.groups[i]; // jshint ignore:line
        }
    }

    // Create a new group
    var group = [];
    group.id = COUNT++;
    group.push(socket);
    this.groups.push(group);
    return this.id2Group[socket.id] = group; //jshint ignore:line
};

// debugging
TwoPlayerParadigm.prototype._printGroups = function() {
    debug('Groups are', this._printableGroups(),
        '(',this.groups.length,')');
};

TwoPlayerParadigm.prototype._printableGroups = function() {
    return this.groups.map(TwoPlayerParadigm._printGroup);
};

TwoPlayerParadigm._printGroup = function(group) {
    return group.map(function(s) {
        return s.id;
    });
};

module.exports = TwoPlayerParadigm;
