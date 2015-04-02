/*
 * This GroupManager simply puts all group members in a single global group.
 *
 * @author brollb / https://github/brollb
 */

// Some group managers may need to broadcast information to the 
// other members on group change (eg, if the group manager is 
// assigning the role)
'use strict';

var globalGroup = {};
var BasicGroupManager = function() {
};

BasicGroupManager.prototype.getGroupMembers = function(id) {
    return Object.keys(globalGroup);
};

BasicGroupManager.prototype.onConnect = function(id) {
    globalGroup[id] = true;
};

BasicGroupManager.prototype.onMessage = function(id) {
};

BasicGroupManager.prototype.onDisconnect = function(id) {
    delete globalGroup[id];
};

module.exports = BasicGroupManager;
