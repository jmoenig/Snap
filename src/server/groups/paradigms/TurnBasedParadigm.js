/*
 * This paradigm assumes we are playing 2 player turn based games
 *
 * @author brollb / https://github/brollb
 */

'use strict';

var TwoPlayerParadigm = require('./TwoPlayerParadigm'),
    Utils = require('../../Utils.js'),
    assert = require('assert'),
    _debug = require('debug'),
    log = _debug('NetsBlocks:GroupManager:log'),
    info = _debug('NetsBlocks:GroupManager:info'),
    debug = _debug('NetsBlocks:GroupManager:debug'),
    R = require('ramda');

var getId = R.partialRight(Utils.getAttribute, 'id');
var TurnBasedParadigm = function() {
    TwoPlayerParadigm.call(this);
};

Utils.inherit(TurnBasedParadigm.prototype, TwoPlayerParadigm.prototype);

TurnBasedParadigm.prototype.getName = function() {
    return 'TurnBased';
};

TurnBasedParadigm.prototype.isMessageAllowed = function(socket, message) {
    var group = this.id2Group[socket.id],
        index = group.indexOf(socket),
        msgType = message.split(' ')[0];

    // Only count messages of type "message"
    if (msgType !== 'message') {
        return true;
    }

    if (group.lastTurn !== index) {
        group.lastTurn = index;
        return true;
    }
    return false;
};

module.exports = TurnBasedParadigm;
