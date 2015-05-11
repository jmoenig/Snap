/*
 * This GroupManager simply puts all group members in a single global group.
 *
 * @author brollb / https://github/brollb
 */

// Some group managers may need to broadcast information to the 
// other members on group change (eg, if the group manager is 
// assigning the role)
'use strict';

var globalGroup = [];
var BasicGroupManager = function() {
};

/**
 * Return arrays of sockets grouped by their groups.
 *
 * @return {undefined}
 */
BasicGroupManager.prototype.getAllGroups = function() {
    return globalGroup.slice();
};

/**
 * Members to receive a message from the given socket
 *
 * @param socket
 * @return {undefined}
 */
BasicGroupManager.prototype.getGroupMembersToMessage = function(socket) {
    return globalGroup.slice();
};

BasicGroupManager.prototype.getGroupMembers = function(socket) {
    return globalGroup.filter(function(s) { 
        return s !== socket;
    });
};

BasicGroupManager.prototype.onConnect = function(socket) {
    globalGroup.push(socket);
};

/**
 * Filter socket messages.
 *
 * @param {WebSocket} socket
 * @param {String} message
 * @return {undefined}
 */
BasicGroupManager.prototype.isMessageAllowed = function(socket, message) {
    return true;
};

BasicGroupManager.prototype.onMessage = function(socket, message) {
    return null;
};

BasicGroupManager.prototype.onDisconnect = function(socket) {
    var i = globalGroup.indexOf(socket);
    globalGroup.splice(i,1);
};

module.exports = BasicGroupManager;
