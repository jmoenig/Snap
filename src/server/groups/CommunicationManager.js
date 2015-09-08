// Communication Manager
// Handles the groups and websocket communication 

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
    log = debug('NetsBlox:CommunicationManager:log'),
    info = debug('NetsBlox:CommunicationManager:info'),
    HandleSocketRequest = require('./RequestTypes');

// Settings
var DEFAULT_PARADIGM = 'sandbox';
var CommunicationManager = function(opts) {
    opts = _.extend({}, defOptions, opts);
    this._wsPort = opts.wsPort;
    this._wss = null;
    this.sockets = [];
    this.socket2Role = {};
    this.socket2Paradigm = {};

    this.socket2Uuid = {};
    this.uuid2Socket = {};

    // Group close callbacks
    this._groupCloseListeners = [];

    this.paradigms = this.loadParadigms();
    // Set the default to Sandbox
    this.defaultParadigm = this.paradigms[DEFAULT_PARADIGM];
    info('Default messaging paradigm: "'+this.defaultParadigm.getName()+'"');
};

CommunicationManager.prototype.getGroupId = function(username) {
    var socket,
        paradigm;

    socket = this.uuid2Socket[username];
    if (!socket) {  // Return null if no socket has the given username
        return null;
    }

    paradigm = this.socket2Paradigm[socket.id];
    return paradigm.getName()+'_'+paradigm.getGroupId(socket);
};

CommunicationManager.prototype.onGroupClose = function(fn) {
    this._groupCloseListeners.push(fn);
};

CommunicationManager.prototype.fireGroupCloseEvents = function(groupId) {
    this._groupCloseListeners.forEach(function(fn) {
        fn(groupId);
    });
};

CommunicationManager.prototype.loadParadigms = function() {
    var paradigmDir = path.join(__dirname, 'paradigms'),
        result = {};

    Utils.loadJsFiles(paradigmDir)
        .map(function(Paradigm) {
            return new Paradigm();
        })
        .forEach(function(paradigm) {
            // Set 'onGroupClose' callback
            paradigm.onGroupClose = this.fireGroupCloseEvents.bind(this);
            result[paradigm.getName().toLowerCase()] = paradigm;
        },this);
    return result;
};

/**
 * Start the WebSocket server and start the socket updating interval.
 *
 * @param {Object} opts
 * @return {undefined}
 */
CommunicationManager.prototype.start = function() {
    var uuid;
    this._wss = new WebSocketServer({port: this._wsPort});
    info('WebSocket server listening on '+this._wsPort);

    this._wss.on('connection', function(socket) {

        // ID the socket
        socket.id = ++counter;
        this.sockets.push(socket);
        this.socket2Role[socket.id] = 'default_'+socket.id;

        // Provide a uuid
        uuid = 'user_'+socket.id;
        this.socket2Uuid[socket.id] = uuid;
        this.uuid2Socket[uuid] = socket;
        socket.send('uuid '+uuid);

        log('A new NetsBlox client has connected! UUID: '+uuid);

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
