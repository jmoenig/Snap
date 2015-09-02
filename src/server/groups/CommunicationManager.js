// Communication Manager
// Handles the groups and websocket communication 
// TODO: Change this to be a group manager which manages multiple paradigms

'use strict';

// Web Sockets
var WebSocketServer = require('ws').Server,
    path = require('path'),
    fs = require('fs'),
    counter = 0,
    GenericManager = require('./paradigms/UniqueRoleParadigm'),
    R = require('ramda'),
    Utils = require('../Utils'),
    _ = require('lodash'),
    defOptions = {
        wsPort: 5432,
        GroupManager: require('./paradigms/Basic')
    },
    debug = require('debug'),
    log = debug('NetsBlocks:log'),
    info = debug('NetsBlocks:info'),
    HandleSocketRequest = require('./RequestTypes');

// Settings
var DEFAULT_PARADIGM = 'sandbox';
var CommunicationManager = function(opts) {
    opts = _.extend({}, defOptions, opts);
    this._wsPort = opts.wsPort;
    this.sockets = [];
    this.socket2Role = {};
    this.socket2Paradigm = {};

    this.socket2Username = {};
    this.username2Socket = {};

    info('Default messaging paradigm: '+DEFAULT_PARADIGM);
    this.paradigms = this.loadParadigms();
    // Set the default to Sandbox
    this.defaultParadigm = this.paradigms[DEFAULT_PARADIGM];
};

CommunicationManager.prototype.getGroupId = function(username) {
    var socket = this.username2Socket[username],
        paradigm = this.socket2Paradigm[socket.id];
    return paradigm.getName()+'_'+paradigm.getGroupId(socket);
};

CommunicationManager.prototype.loadParadigms = function() {
    var paradigmDir = path.join(__dirname, 'paradigms'),
        result = {};

    Utils.loadJsFiles(paradigmDir)
        .map(function(Paradigm) {
            return new Paradigm();
        })
        .forEach(function(paradigm) {
            result[paradigm.getName().toLowerCase()] = paradigm;
        });
    return result;
};

/**
 * Start the WebSocket server and start the socket updating interval.
 *
 * @param {Object} opts
 * @return {undefined}
 */
CommunicationManager.prototype.start = function() {
    this._wss = new WebSocketServer({port: this._wsPort});

    this._wss.on('connection', function(socket) {
        log('WebSocket connection established! ('+counter+')');

        // ID the socket
        socket.id = ++counter;
        this.sockets.push(socket);
        this.socket2Role[socket.id] = 'default_'+socket.id;

        // Add the socket to the default paradigm
        this.joinParadigm(socket, this.defaultParadigm);

        // Set up event handlers
        socket.on('message', function(data) {
            log('Received message: ',data);
            this.onMsgReceived(socket, data);
        }.bind(this));

        socket.on('close', function() {
            this.updateSocket(socket);
            info('socket #'+socket.id+' closed!');
        }.bind(this));

    }.bind(this));
};

CommunicationManager.prototype.stop = function() {
    this._wss.close();
};

CommunicationManager.prototype.joinParadigm = function(socket, paradigm) {
    // Add the client to the global group
    this.socket2Paradigm[socket.id] = paradigm;
    paradigm.onConnect(socket);
    // Broadcast 'join' on connect
    this.notifyGroupJoin(socket);
};

CommunicationManager.prototype.leaveParadigm = function(socket) {
    var role, 
        paradigm,
        peers;

    paradigm = this.socket2Paradigm[socket.id];
    role = this.socket2Role[socket.id];

    // Broadcast the leave message to peers of the given socket
    peers = paradigm.getGroupMembers(socket);

    console.log('socket', socket.id, 'is leaving');
    paradigm.onDisconnect(socket);
    this.broadcast('leave '+role, peers);
};

/**
 * Broadcast the given message to the given peers.
 *
 * @param {String} message
 * @param {WebSocket} peers
 * @return {undefined}
 */
CommunicationManager.prototype.broadcast = function(message, peers) {
    log('Broadcasting '+message,'to', peers.map(function(r){return r.id;}));
    var s;
    for (var i = peers.length; i--;) {
        s = peers[i];
        // Check if the socket is open
        if (s.readyState === s.OPEN) {
            info('Sending message "'+message+'" to socket #'+s.id);
            s.send(message);
        }
    }
};

/**
 * Check if the socket is still open. If not, clean up the groups and broadcast updates.
 *
 * @param {WebSocket} socket
 * @return {Boolean} connected?
 */
CommunicationManager.prototype.updateSocket = function(socket) {
    if (socket.readyState !== socket.OPEN) {
        info('Removing disconnected socket ('+socket.id+')');

        this.leaveParadigm(socket);
        this._removeFromRecords(socket);
        return false;
    }
    return true;
};

CommunicationManager.prototype._removeFromRecords = function(socket) {
    var index = this.sockets.indexOf(socket),
        role = this.socket2Role[socket.id];

    delete this.socket2Role[socket.id];
    this.sockets.splice(index,1);
    return socket;
};

/**
 * Broadcast a JOIN message to the other members in the group.
 *
 * @param {WebSocket} socket
 * @return {undefined}
 */
CommunicationManager.prototype.notifyGroupJoin = function(socket) {
    var role,
        paradigm,
        peers;

    role = this.socket2Role[socket.id];
    paradigm = this.socket2Paradigm[socket.id];
    peers = paradigm.getGroupMembers(socket);
    // Send 'join' messages to peers in the 'group'
    this.broadcast('join '+role, peers);

    // Send new member join messages from everyone else
    for (var i = peers.length; i--;) {
        if (peers[i] !== socket.id) {
            socket.send('join '+this.socket2Role[peers[i].id]);
        }
    }
};

/**
 * Handle a WebSocket message from a client.
 *
 * @param {WebSocket} socket
 * @param {String} message
 * @return {undefined}
 */
CommunicationManager.prototype.onMsgReceived = function(socket, message) {
    var msg = message.split(' '),
        type = msg.shift(),
        oldRole = this.socket2Role[socket.id],
        paradigm = this.socket2Paradigm[socket.id],
        peers,
        group,
        oldMembers,
        role;

    // Early return..
    if (!paradigm.isMessageAllowed(socket, message)) {
        info('GroupManager blocking message "'+message+'" from '+socket.id);
        return;
    }

    log('Received msg: '+ message+ ' from '+socket.id);

    oldMembers = paradigm.onMessage(socket, message);

    // Handle the different request types
    if (HandleSocketRequest[type] !== undefined) {
        HandleSocketRequest[type].call(this,socket, msg);
    } else {
        log('Received invalid message type: '+type);
    }

    if (oldMembers) { // Update group change
        var k;

        // Broadcast 'leave' to old peers
        k = oldMembers.indexOf(socket);
        oldMembers.splice(k,1);
        this.broadcast('leave '+oldRole, oldMembers);

        this.notifyGroupJoin(socket);
    }
};

module.exports = CommunicationManager;
