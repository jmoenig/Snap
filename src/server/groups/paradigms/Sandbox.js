/*
 * This paradigm simply isolates all users in their own group so there is no
 * communication (potentially useful in development).
 *
 * Currently, it allows the user to message themselves.
 *
 * @author brollb / https://github/brollb
 */

'use strict';

var BaseParadigm = require('./Basic.js'),
    Utils = require('../../Utils.js'),
    groups = [],
    count = 0;

var SandboxParadigm = function() {
};

Utils.inherit(SandboxParadigm.prototype, BaseParadigm.prototype);

SandboxParadigm.prototype.getName = function() {
    return 'Sandbox';
};

/**
 * Return arrays of sockets grouped by their groups.
 *
 * @return {Array<WebSocket>}
 */
SandboxParadigm.prototype.getAllGroups = function() {
    return groups.map(function(group) {
        return [group.user];
    });
};

/**
 * Members to receive a message from the given socket
 *
 * @param {WebSocket} socket
 * @return {Array<WebSocket>}
 */
SandboxParadigm.prototype.getGroupMembersToMessage = function(socket) {
    return [socket];  // Allow the user to hear it's own messages
};

SandboxParadigm.prototype.getGroupMembers = function(socket) {
    return [];
};

/**
 * Get the unique group id given the socket
 *
 * @param {WebSocket} socket
 * @return {Int} group id
 */
SandboxParadigm.prototype.getGroupId = function(socket) {
    var group = this._findGroupContaining(socket);
    if (group) {
        return group.id;
    }
    return -1;
};

SandboxParadigm.prototype.onConnect = function(socket) {
    groups.push({id: count++, user: socket});
};

/**
 * Filter socket messages.
 *
 * @param {WebSocket} socket
 * @param {String} message
 * @return {Boolean}
 */
SandboxParadigm.prototype.isMessageAllowed = function(socket, message) {
    return true;
};

SandboxParadigm.prototype.onMessage = function(socket, message) {
    return null;
};

SandboxParadigm.prototype.onDisconnect = function(socket) {
    var group = this._findGroupContaining(socket),
        index;
    if (group) {
        this.notifyGroupClose(socket);
        index = groups.indexOf(group);
        groups.splice(index,1);
    }
};

SandboxParadigm.prototype._findGroupContaining = function(socket) {
    for (var i = groups.length; i--;) {
        if (groups[i].user === socket) {
            return groups[i];
        }
    }
    return null;
};

module.exports = SandboxParadigm;
