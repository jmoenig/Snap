'use strict';
var debug = require('debug');
var log = debug('NetsBlocks:RequestTypes:log');
var Requests = {
        /**
         * Register the socket's role.
         *
         * @param {WebSocket} socket
         * @param {Array<String>} msg
         * @return {undefined}
         */
        register: function(socket, msg) {
            var role = msg.shift();  // record the roleId
            console.log('registering '+socket.id+' as '+role);
            this.socket2Role[socket.id] = role;
        },

        /**
         * Change the paradigm. 
         *
         * @param {WebSocket} socket
         * @param {Array<String>} msg
         * @return {undefined}
         */
        paradigm: function(socket, msg) {
            // Set the paradigm for this message
            var name = msg.shift().toLowerCase();
            if (this.paradigms[name]) {
                // Leave the current paradigm
                this.leaveParadigm(socket);
                // Join the new one
                this.joinParadigm(socket, this.paradigms[name]);
                console.log('moved '+socket.id+' to '+this.paradigms[name].getName());
                return;
            }
            // TODO: Log an error
        },

        /**
         * Record the username for the WebSocket.
         *
         * @param {WebSocket} socket
         * @param {Array<String>} msg
         * @return {undefined}
         */
        //username: function(socket, msg) {
            //// Set the username for the socket
            //var username = msg.join(' ');
            //this.socket2Username[socket.id] = username;
            //this.username2Socket[username] = socket;
        //},

        /**
         * Message to be emitted to the user's peers wrt the given paradigm.
         *
         * @param {WebSocket} socket
         * @param {Array<String>} msg
         * @return {undefined}
         */
        message: function(socket, msg) {
            var role,
                peers,
                paradigm;
            // broadcast the message, role to all peers
            paradigm = this.socket2Paradigm[socket.id];
            role = this.socket2Role[socket.id];
            msg.push(role);
            log('About to broadcast '+msg.join(' ')+
                        ' from socket #'+socket.id+' ('+role+')');
            peers = paradigm.getGroupMembersToMessage(socket);
            this.broadcast(msg.join(' '), peers);
        }
};
module.exports = Requests;
