/*
 * This GroupManager assumes we are playing 2 player turn based games
 *
 * @author brollb / https://github/brollb
 */

'use strict';

var TwoPlayerManager = require('./TwoPlayerManager'),
    Utils = require('../Utils.js'),
    assert = require('assert'),
    _debug = require('debug'),
    log = _debug('NetsBlocks:GroupManager:log'),
    info = _debug('NetsBlocks:GroupManager:info'),
    debug = _debug('NetsBlocks:GroupManager:debug'),
    R = require('ramda');

var getId = R.partialRight(Utils.getAttribute, 'id');
var TurnBasedManager = function() {
    this.groups = [];
    info('Created '+this.getName());

    // Record keeping
    this.id2Group = {};
};

Utils.inherit(TurnBasedManager.prototype, TwoPlayerManager.prototype);

TurnBasedManager.prototype.getName = function() {
    return 'TurnBasedManager';
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

module.exports = TurnBasedManager;
