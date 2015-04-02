/*globals describe,it,before,beforeEach*/
'use strict';

// 
var NetsBlocks = require('../NetsBlocksServer'),
    WebSocket = require('ws'),  // jshint ignore:line
    assert = require('assert'),
    host = 'ws://localhost:5432';

// Test helper
var addFn = function(socket, newFn) {
    var oldFn = socket.onopen;
    socket.on('open', function() {
        if (oldFn) {
            oldFn();
        }
        newFn();
    });
};

var sendMessage = function(socket, msg) {
    addFn(socket, function() {
        console.log('----- Sending '+msg);
        socket.send('message '+msg);
    });
};

var closeSocket = function(socket) {
    addFn(socket, function() {
        socket.close();
    });
};

describe('NetsBlocksServer tests', function() {
    var server, socket;

    before(function() {
        server = new NetsBlocks();
        server.start({port: 5432, path: ''});
    });

    beforeEach(function() {
        if (!socket || socket.readyState !== 1) {
            socket = new WebSocket(host);
        }
    });

    describe('Basic tests', function() {
        it('should connect to server', function(done) {
            setTimeout(function() {
                assert.equal(socket.readyState, 1);
                done();
            },100);
        });

        it('should detect socket disconnect', function(done) {
            socket.close();
            // Check that the server removed the socket
            setTimeout(function() {
                assert.equal(server.sockets.length, 0);
                done();
            }, 500);
        });

        describe('multi-socket tests', function() {
            var newSocket;

            beforeEach(function() {
                if (!newSocket || newSocket.readyState !== 1) {
                    newSocket = new WebSocket(host);
                }
            });

            it('should broadcast/receive "join" on socket connect', function(done) {
                var joinCount = 0,
                    countFn = function(msg) {
                        if (msg.indexOf('join') > -1) {
                            ++joinCount;
                        }
                    },
                    checkFn = function() {
                        assert.equal(joinCount,2);
                        done();
                    };

                socket.on('message', countFn);
                newSocket.on('message', countFn);
                setTimeout(checkFn, 100);
            });

            it('should broadcast "leave" on socket disconnect', function(done) {
                var s1 = new WebSocket(host),
                    s2 = new WebSocket(host),
                    count = 0,
                    onAllConnected = function() {
                        if (++count === 2) {
                            s2.send('register listenSocket');
                            s1.send('register leaveSocket');
                            s1.close();
                        }
                    };
                s2.on('message', function(msg) {
                    console.log('--------Received:', msg);
                    if(msg.indexOf('leave leaveSocket') !== -1) {
                        done();
                    }
                });
                s1.on('open', onAllConnected);
                s2.on('open', onAllConnected);
            });

            it('should broadcast messages to members of the group', function(done) {
                var socket2 = new WebSocket(host),
                    sentMsg = 'Hello world!',
                    matches = false;

                socket2.on('open', function() {
                    socket2.on('message', function(data) {
                        var msg, 
                            sender;
                            
                        data = data.split(' ');
                        sender = data.pop();
                        msg = data.join(' ');

                        matches = msg === sentMsg && sender.indexOf('default') > -1;
                        if (matches) {
                            done();
                        }
                    });
                    socket.send('message '+sentMsg);
                });
            });

        });
    });

    describe('GroupManager Testing', function() {
        var sockets,
            socketCount = 3;

        // Helper functions
        var register = function(socket, role) {
            if (socket.readyState !== 1) {
                socket.on('open', function() {
                    socket.send('register '+role);
                });
            } else {
                socket.send('register '+role);
            }
        };

        beforeEach(function() {
            sockets = [];

            for (var i = socketCount; i--;) {
                if (!sockets[i] || sockets[i].readyState !== 1) {
                    sockets[i] = new WebSocket(host);
                }
            }
        });

        describe('N-player tests', function() {

            it('should group players into groups by role name', function(done) {
                register(sockets[0], 'p1');
                register(sockets[1], 'p2');
                register(sockets[2], 'p2');

                // Verify that 0,1 are in the same group but 2 is not
                var received = 0;
                sockets[1].on('message', function(msg) {
                    if (msg.indexOf('Hello_world') > -1) {
                        received++;
                    }
                });

                sockets[2].on('message', function(msg) {
                    if (msg.indexOf('Hello_world') > -1) {
                        received++;
                    }
                });

                sendMessage(sockets[0], 'Hello_world!');


                setTimeout(function() {
                    assert.equal(received,1);
                    done();
                }, 200);
            });

            it.skip('unregistered clients should be placed in a default group', function(done) {
                // TODO
            });

            it.skip('join messages should include registered role', function(done) {
            });

            it.skip('should group players by game id', function(done) {
                // TODO
            });

        });

        describe('2 player tests', function() {
            it.skip('should group players into group', function(done) {
                // TODO
            });

            it.skip('should create a new group for 3rd person', function(done) {
                // TODO
            });

            it.skip('should pass messages between the two players', function(done) {
                // TODO
            });

            it.skip('should pass messages between the two players', function(done) {
                // TODO
            });

        });
    });

});
