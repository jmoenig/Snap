/*
 * This paradigm groups the sockets by their roles. Assumes nothing about the 
 * client app except that each role should be unique for each game.
 *
 * @author brollb / https://github/brollb
 */

'use strict';
var BaseParadigm = require('./Basic.js'),
    Utils = require('../../Utils.js'),
    assert = require('assert'),
    R = require('ramda'),
    defaultRolePrefix = 'default_',
    ID_KEY = '__id__',
    COUNT = 0;

var UniqueRoleParadigm = function() {
    // A group is a hash map of role names to ids
    this.groups = [];
    this.globalGroup = this._createNewGroup();

    // Dictionary records
    this.id2Group = {};
    this.id2Role = {};
    this.id2Socket = {};
};

Utils.inherit(UniqueRoleParadigm.prototype, BaseParadigm.prototype);

// Public API
UniqueRoleParadigm.prototype.getName = function() {
    return 'UniqueRole';
};

/**
 * Get the group id given the username
 *
 * @param {WebSocket} id
 * @return {Int} group id
 */
UniqueRoleParadigm.prototype.getGroupId = function(socket) {
    return this.id2Group[socket.id][ID_KEY];
};

UniqueRoleParadigm.prototype.getAllGroups = function() {
    var groups = this.groups.concat([this.globalGroup]);
    return groups.map(this._getGroupSockets);
};

UniqueRoleParadigm.prototype.getGroupMembersToMessage = function(socket) {
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
UniqueRoleParadigm.prototype.getGroupMembers = function(socket) {
    var group = this.getGroupMembersToMessage(socket),
        getId = R.partialRight(Utils.getAttribute, 'id'),
        isSocketId = R.partial(R.eq, socket.id);

    return R.reject(R.pipe(getId, isSocketId), group);
};

/**
 * Event handler for a socket connection. Socket id is added to the global
 * group.
 *
 * @param {WebSocket} socket
 * @return {undefined}
 */
UniqueRoleParadigm.prototype.onConnect = function(socket) {
    var id = socket.id;
    this.id2Socket[id] = socket;
    this.id2Role[id] = 'default_'+id;  // Unique default role

    this._addClientToGroup(socket, this.globalGroup);
};

/**
 * If the message is a 'register' message, then update the role and group. If 
 * the group changes, return the old group members;
 *
 * @param {String} id
 * @return {Array<Ids>|null} 
 */
UniqueRoleParadigm.prototype.onMessage = function(socket, message) {
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
UniqueRoleParadigm.prototype.onDisconnect = function(socket) {
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
UniqueRoleParadigm.prototype._removeClientFromGroup = function(id, role) {
    var oldGroup = this.id2Group[id];

    if (Object.keys(oldGroup).length === 1) {
        this.notifyGroupClose(this.id2Socket[id]);
    }

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
UniqueRoleParadigm.prototype._addClientToGroup = function(socket, group) {
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

UniqueRoleParadigm.prototype._findGroupForClient = function(socket) {
    var id = socket.id,
        role = this.id2Role[id];

    // Add client to group based on it's role
    for (var i = 0; i < this.groups.length; i++) {
        if (!this.groups[i][role]) {  // If not in the group, add it
            return this._addClientToGroup(socket, this.groups[i]);
        }
    }

    // Create a new group
    this.groups.push(this._createNewGroup());
    this._addClientToGroup(socket, this.groups[this.groups.length-1]);
};

UniqueRoleParadigm.prototype._canSwitchRolesInCurrentGroup = function(id, newRole) {
    var group = this.id2Group[id];

    return !group[newRole] && group !== this.globalGroup;
};

UniqueRoleParadigm.prototype._getGroupSockets = function(group) {
    var roles = R.difference(Object.keys(group), [ID_KEY]);

    return roles.map(function(role) {
        return group[role];
    });
};

UniqueRoleParadigm.prototype._createNewGroup = function() {
    var group = {};
    group[ID_KEY] = COUNT++;
    return group;
};

UniqueRoleParadigm.prototype._printGroups = function() {
    console.log('Printing groups:');
    this.groups.forEach(this._printGroup.bind(this));
};

UniqueRoleParadigm.prototype._printGroup = function(group) {
    var number = this.groups.indexOf(group);
    console.log('Group', number, ':', R.mapObj(function(s){return s.id;}, group));
};

module.exports = UniqueRoleParadigm;
