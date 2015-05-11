/*
 * GenericManager groups the sockets by their roles. Assumes nothing about the 
 * client app except that each role should be unique for each game.
 *
 * @author brollb / https://github/brollb
 */

'use strict';
var BaseManager = require('./Basic.js'),
    Utils = require('../Utils.js'),
    assert = require('assert'),
    R = require('ramda'),
    defaultRolePrefix = 'default_';

var GenericManager = function() {
    // A group is a hash map of role names to ids
    this.groups = [];
    this.globalGroup = {};

    // Dictionary records
    this.id2Group = {};
    this.id2Role = {};
    this.id2Socket = {};
};

Utils.inherit(GenericManager.prototype, BaseManager.prototype);

// Public API
GenericManager.prototype.getName = function() {
    return 'GenericManager';
};

GenericManager.prototype.getAllGroups = function() {
    var groups = this.groups.concat([this.globalGroup]);
    return groups.map(this._getGroupSockets);
};

GenericManager.prototype.getGroupMembersToMessage = function(socket) {
    var self = this,
        group = this.id2Group[socket.id];

    assert(group, 'Socket '+socket.id+' does not have a group');
    return this._getGroupSockets(group);
};

/**
 * Get the peers of the given socket.
 *
 * @param {String} id
 * @return {Array<Id>}
 */
GenericManager.prototype.getGroupMembers = function(socket) {
    var group = this.getGroupMembersToMessage(socket),
        getId = R.partialRight(Utils.getAttribute, 'id'),
        isSocketId = R.partial(R.eq, socket.id);

    return R.reject(R.pipe(getId, isSocketId), group);
};

/**
 * Event handler for a socket connection. Socket id is added to the global
 * group.
 *
 * @param {String} id
 * @return {undefined}
 */
GenericManager.prototype.onConnect = function(socket) {
    var id = socket.id;
    this.id2Socket[id] = socket;
    this.id2Role[id] = 'default_'+id;  // Unique default username

    this._addClientToGroup(socket, this.globalGroup);
};

/**
 * If the message is a 'register' message, then update the role and group. If 
 * the group changes, return the old group members;
 *
 * @param {String} id
 * @return {Array<Ids>|null} 
 */
GenericManager.prototype.onMessage = function(socket, message) {
    var id = socket.id,
        data = message.split(' '),
        type = data.shift(),
        role,
        oldRole = this.id2Role[id],
        oldGroupMembers = null;

    if (type === 'register') {
        role = data.join(' ');
        if (oldRole !== role) {
            this.id2Role[id] = role;
            // Check if can stay in current group
            if (this._canSwitchRolesInCurrentGroup(id, role)) {
                delete this.id2Group[id][oldRole];
            } else {
                oldGroupMembers = this.getGroupMembers(socket);
                // Remove the socket from the current group
                this._removeClientFromGroup(id, oldRole);
                this._findGroupForClient(socket);
            }
        }
    }

    return oldGroupMembers;
};

/**
 * Event handler for socket disconnect. Remove the socket from it's group.
 *
 * @param id
 * @return {undefined}
 */
GenericManager.prototype.onDisconnect = function(socket) {
    // Update the groups
    var id = socket.id,
        role = this.id2Role[id],
        group = this.id2Group[id];

    if (group !== undefined) {
        // Remove role from group
        this._removeClientFromGroup(id, role);
    }
 
};

// Internal API
GenericManager.prototype._removeClientFromGroup = function(id, role) {
    var oldGroup = this.id2Group[id];

    delete oldGroup[role];
    delete this.id2Group[id];
};

/**
 * Add the client to the given group.
 *
 * @param {String} id
 * @param {Group} group
 * @return {undefined}
 */
GenericManager.prototype._addClientToGroup = function(socket, group) {
    var id = socket.id,
        role = this.id2Role[id];

    group[role] = socket;
    this.id2Group[id] = group;
};

/**
 * Find a group for the client that doesn't have that role filled. Create a
 * new group if needed.
 *
 * @param {String} id
 * @param {String} role
 * @return {undefined}
 */

GenericManager.prototype._findGroupForClient = function(socket) {
    var id = socket.id,
        role = this.id2Role[id];

    // Add client to group based on it's role
    for (var i = 0; i < this.groups.length; i++) {
        if (!this.groups[i][role]) {  // If not in the group, add it
            return this._addClientToGroup(socket, this.groups[i]);
        }
    }

    // Create a new group
    this.groups.push({});
    this._addClientToGroup(socket, this.groups[this.groups.length-1]);
};

GenericManager.prototype._canSwitchRolesInCurrentGroup = function(id, newRole) {
    var group = this.id2Group[id];

    return !group[newRole] && group !== this.globalGroup;
};

GenericManager.prototype._getGroupSockets = function(group) {
    var roles = Object.keys(group);

    return roles.map(function(role) {
        return group[role];
    });
};

GenericManager.prototype._printGroups = function() {
    console.log('Printing groups:');
    this.groups.forEach(this._printGroup.bind(this));
};

GenericManager.prototype._printGroup = function(group) {
    var number = this.groups.indexOf(group);
    console.log('Group', number, ':', R.mapObj(function(s){return s.id;}, group));
};

module.exports = GenericManager;
