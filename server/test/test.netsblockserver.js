/*globals after,afterEach,describe,it,before,beforeEach*/
'use strict';

// 
var NetsBlocks = require('../src/NetsBlocksServer'),
    WebSocket = require('ws'),  // jshint ignore:line
    R = require('ramda'),
    assert = require('assert'),
    host = 'ws://localhost:5432',
    opts = {port: 5432, path: ''};

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
        socket.send('message '+msg);
    });
};

describe('NetsBlocksServer tests', function() {
    var server;

    describe('Basic tests', function() {
        var socket;

        describe('Connection tests', function() {
            beforeEach(function() {
                server = new NetsBlocks();
                server.start(opts);
                if (!socket || socket.readyState !== 1) {
                    socket = new WebSocket(host);
                }
            });

            afterEach(function() {
                server.stop();
            });

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
        });

        describe('multi-socket tests', function() {
            var newSocket;

            beforeEach(function() {
                server = new NetsBlocks();
                server.start(opts);
                if (!socket || socket.readyState !== 1) {
                    socket = new WebSocket(host);
                }
                if (!newSocket || newSocket.readyState !== 1) {
                    newSocket = new WebSocket(host);
                }
            });

            afterEach(function() {
                server.stop();
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

});

describe('GroupManager Testing', function() {
    var server,
        sockets,
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

    var createOnStart = function(socketCount, cb) {
        var count = 0;
        return function() {
            if (++count === socketCount) {
                cb();
            }
        };
    };

    var refreshSockets = function(count) {
        // Throw out all old sockets and start fresh!
        for (var i = count; i--;) {
            console.log('connecting socket['+i+']');
            sockets[i] = new WebSocket(host);
        }
    };

    describe('N-player tests', function() {
        beforeEach(function() {
            var GenericManager = require('../src/GroupManagers/GenericManager');
            server = new NetsBlocks({GroupManager: GenericManager});
            server.start(opts);
            sockets = [];

            // Throw out all old sockets and start fresh!
            refreshSockets(socketCount);
        });

        afterEach(function() {
            server.stop();
            sockets.forEach(function(s) {
                s.close();
            });
        });

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

        it('unregistered clients should be placed in a default group', function(done) {
            var count = 0,
                counter = function(msg) { 
                    if (msg.indexOf('hey') > -1) {
                        if (++count === 2) {
                            done();
                        }
                    }
                },
                onStart = function() {
                    // Testing logic
                    sockets[0].send('message hey');
                },
                onAllConnected = createOnStart(3, onStart);

            sockets[0].on('open', onAllConnected);
            sockets[1].on('open', onAllConnected);
            sockets[2].on('open', onAllConnected);

            sockets[1].on('message', counter);
            sockets[2].on('message', counter);
        });

        it('join messages should include registered role', function(done) {
            var onStart = function() {
                    // Testing logic
                    sockets[0].send('register hey');
                    sockets[1].send('register hey2');
                },
                onAllConnected = createOnStart(2, onStart),
                test = function(msg) {
                    if (msg.indexOf('hey') > -1) {
                        done();
                    }
                };

            sockets[0].on('open', onAllConnected);
            sockets[1].on('open', onAllConnected);

            sockets[0].on('message', test);
        });

        it.skip('should group players by game id', function(done) {
            // TODO
        });

    });

    describe('2 player tests', function() {
        beforeEach(function() {
            var TwoPlayerTurn = require('../src/GroupManagers/TurnBasedManager');
            server = new NetsBlocks({GroupManager: TwoPlayerTurn});
            server.start(opts);
            sockets = [];
        });

        afterEach(function() {
            server.stop();
            sockets.forEach(function(s) {
                s.close();
            });
        });

        it('should group players into groups', function(done) {
            var count = 0,
                onStart = function() {
                    // Testing logic
                    sockets[0].send('message hey');
                },
                onAllConnected = createOnStart(3, onStart),
                checkReceive = function(msg) {
                    if (msg.indexOf('hey') > -1) {
                        count++;
                    }
                };

            refreshSockets(4);
            sockets[0].on('open', onAllConnected);
            sockets[1].on('open', onAllConnected);
            sockets[2].on('open', onAllConnected);

            sockets[0].on('message', checkReceive);
            sockets[1].on('message', checkReceive);
            sockets[2].on('message', checkReceive);

            setTimeout(function() {
                assert.equal(count, 2);
                done();
            }, 100);
        });

        // FIXME: Only works when run individually
        it.skip('should broadcast "leave" on socket disconnect', function(done) {
            var socketCount = refreshSockets(2),
                onStart = function() {
                    sockets[0].send('register listenSocket');
                    sockets[1].send('register leaveSocket');
                    sockets[0].close();

                    setTimeout(server.updateSockets.bind(server), 100);
                },
                onAllConnected = createOnStart(sockets.length, onStart);

            sockets.forEach(function(socket) {
                socket.on('open', onAllConnected);
                socket.on('message', function(msg) {
                    if(msg.indexOf('leave')+1 && msg.indexOf('Socket')+1) {
                        done();
                    }
                });
            });
        });

        it('should block multiple turns by same person', function(done) {
            var count = 0,
                onStart = function() {
                    // Testing logic
                    sockets[0].send('message Hey!');
                    sockets[0].send('message Listen!');
                },
                onAllConnected = createOnStart(2, onStart),
                checkReceive = function(msg) {
                    if (msg.indexOf('Hey') + msg.indexOf('Listen') > -2) {
                        count++;
                    }
                };

            refreshSockets(2);
            sockets[0].on('open', onAllConnected);
            sockets[1].on('open', onAllConnected);

            sockets[0].on('message', checkReceive);
            sockets[1].on('message', checkReceive);

            setTimeout(function() {
                assert.equal(count, 2);
                done();
            }, 100);
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
