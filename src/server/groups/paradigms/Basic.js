/*
 * This paradigm simply puts all group members in a single global group and broadcasts
 * messages to all peers.
 *
 * @author brollb / https://github/brollb
 */

// Some group managers may need to broadcast information to the 
// other members on group change (eg, if the group manager is 
// assigning the role)
'use strict';

var globalGroup = [];
var BasicParadigm = function() {
};

BasicParadigm.prototype.getName = function() {
    return 'Basic';
};

BasicParadigm.prototype.getDescription = function() {
    // TODO
    return 'Every one can receive messages from everyone else';
};

/**
 * Return arrays of sockets grouped by their groups.
 *
 * @return {undefined}
 */
BasicParadigm.prototype.getAllGroups = function() {
    return globalGroup.slice();
};

/**
 * Members to receive a message from the given socket
 *
 * @param socket
 * @return {undefined}
 */
BasicParadigm.prototype.getGroupMembersToMessage = function(socket) {
    return globalGroup.slice();
};

BasicParadigm.prototype.getGroupMembers = function(socket) {
    return globalGroup.filter(function(s) { 
        return s !== socket;
    });
};

/**
 * Get the group id given the username
 *
 * @param {WebSocket} id
 * @return {Int} group id
 */
BasicParadigm.prototype.getGroupId = function(socket) {
    return 1;
};

BasicParadigm.prototype.onConnect = function(socket) {
    globalGroup.push(socket);
};

/**
 * Filter socket messages.
 *
 * @param {WebSocket} socket
 * @param {String} message
 * @return {undefined}
 */
BasicParadigm.prototype.isMessageAllowed = function(socket, message) {
    return true;
};

BasicParadigm.prototype.onMessage = function(socket, message) {
    return null;
};

BasicParadigm.prototype.onDisconnect = function(socket) {
    var i = globalGroup.indexOf(socket);
    globalGroup.splice(i,1);
};

module.exports = BasicParadigm;
