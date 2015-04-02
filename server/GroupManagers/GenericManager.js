/*
 * GenericManager groups the sockets by their roles. Assumes nothing about the 
 * client app except that each role should be unique for each game.
 *
 * @author brollb / https://github/brollb
 */

'use strict';
var defaultRolePrefix = 'default_';

var GenericManager = function() {
    // A group is a hash map of role names to ids
    this.groups = [];
    this.globalGroup = {};

    // Dictionary records
    this.id2Group = {};
    this.id2Role = {};
    this.id2Socket = {};
};

// Public API
/**
 * Get the peers of the given socket.
 *
 * @param {String} id
 * @return {Array<Id>}
 */
GenericManager.prototype.getGroupMembers = function(socket) {
    var self = this,
        id = socket.id,
        group = this.id2Group[id],
        roles = Object.keys(group),
        getSocketFromRole = function(role) {
            var socketId = group[role];
            return self.id2Socket[socketId];
        };
    console.log('\nGROUPS:',this.groups);
    console.log('GLOBAL:',this.globalGroup);
    console.log(socket.id+' has peers:', roles.map(function(r) {return group[r];})+'\n');
    return roles.map(getSocketFromRole).filter(function(s) { return s !== socket;});
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

    this._addClientToGroup(id, this.globalGroup);
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
                this._findGroupForClient(id);
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
        delete this.id2Group[id][role];
        // Remove group registry for id
        delete this.id2Group[id];
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
GenericManager.prototype._addClientToGroup = function(id, group) {
    var role = this.id2Role[id];

    console.log('Adding',id,'to',group);
    group[role] = id;
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

GenericManager.prototype._findGroupForClient = function(id) {
    var role = this.id2Role[id];

    // Add client to group based on it's role
    for (var i = 0; i < this.groups.length; i++) {
        if (!this.groups[i][role]) {  // If not in the group, add it
            return this._addClientToGroup(id, this.groups[i]);
        }
    }

    // Create a new group
    this.groups.push({});
    this._addClientToGroup(id, this.groups[this.groups.length-1]);
};

GenericManager.prototype._canSwitchRolesInCurrentGroup = function(id, newRole) {
    var group = this.id2Group[id];

    return !group[newRole] && group !== this.globalGroup;
};

module.exports = GenericManager;
