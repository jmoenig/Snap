/*globals after,afterEach,describe,it,before,beforeEach*/
'use strict';

var NetsBlocks = require('../../src/server/groups/CommunicationManager'),
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

        describe('Paradigm Selection tests', function() {
            before(function(done) {
                server = new NetsBlocks();
                if (!socket || socket.readyState !== 1) {
                    socket = new WebSocket(host);
                    socket.on('open', function() {
                        socket.send('username socket1');
                        done();
                    });
                }
                server.start();
            });

            after(function() {
                server.stop();
            });

            it('should use sandbox by default', function(done) {
                setTimeout(function() {
                    var id = server.username2Socket.socket1.id;
                    assert(server.socket2Paradigm[id].getName(), 'Sandbox');
                    done();
                }, 200);
            });

            it('should change the paradigm with "paradigm"', function(done) {
                socket.send('paradigm uniquerole');
                setTimeout(function() {
                    var id = server.username2Socket.socket1.id;
                    assert(server.socket2Paradigm[id].getName(), 'UniqueRole');
                    done();
                }, 200);
            });

            it('should support multiple paradigms at once', function(done) {
                var newSocket = new WebSocket(host);
                socket.send('paradigm uniquerole');
                newSocket.on('open', function() {
                    newSocket.send('username socket2');
                    setTimeout(function() {
                        var expectedParadigms = ['UniqueRole', 'Sandbox'];
                        ['socket1', 'socket2'].map(function(username) {
                            var id = server.username2Socket[username].id;
                            // Get the paradigm
                            return server.socket2Paradigm[id];
                        })
                        .forEach(function(paradigm, index) {
                            assert.equal(paradigm.getName(), expectedParadigms[index]);
                        });
                        done();
                    }, 200);
                });
            });
        });

        describe('Connection tests', function() {
            beforeEach(function() {
                server = new NetsBlocks();
                if (!socket || socket.readyState !== 1) {
                    socket = new WebSocket(host);
                }
                server.start();
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

            beforeEach(function(done) {
                var count = 0;
                server = new NetsBlocks();
                server.start();
                if (!socket || socket.readyState !== 1) {
                    count++;
                    socket = new WebSocket(host);
                    socket.on('open', function() {
                        socket.send('paradigm uniquerole');
                        if (--count === 0) {
                            done();
                        }
                    });
                }
                if (!newSocket || newSocket.readyState !== 1) {
                    count++;
                    newSocket = new WebSocket(host);
                    newSocket.on('open', function() {
                        newSocket.send('paradigm uniquerole');
                        if (--count === 0) {
                            done();
                        }
                    });
                }
                if (count === 0) {
                    done();
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
                    console.log('<< Received:', msg);
                    if(msg.indexOf('leave leaveSocket') !== -1) {
                        done();
                    }
                });
                s2.on('open', function() {
                    s2.send('paradigm uniquerole');
                    setTimeout(onAllConnected,100);
                });
                s1.on('open', function() {
                    s1.send('paradigm uniquerole');
                    setTimeout(onAllConnected,100);
                });
            });

            it('should broadcast messages to members of the group', function(done) {
                var socket2 = new WebSocket(host),
                    sentMsg = 'Hello world!',
                    matches = false;

                socket2.on('open', function() {
                    socket2.send('paradigm uniquerole');
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
            console.log('socket connected!');
            if (++count === socketCount) {
                cb();
            }
        };
    };

    var refreshSockets = function(count) {
        // Throw out all old sockets and start fresh!
        for (var i = count; i--;) {
            sockets[i] = new WebSocket(host);
        }
    };

    var refreshSocketsWithParadigm = function(count, paradigm, callback) {
        refreshSockets(count);
        sockets.forEach(function(socket) {
            socket.on('open', function() {
                socket.send('paradigm '+paradigm);
                socket.send('username s'+sockets.indexOf(socket));
                if (--count === 0) {
                    callback();
                }
            });
        });
    };

    describe('N-player tests', function() {
        beforeEach(function(done) {
            server = new NetsBlocks();
            server.start();
            sockets = [];

            refreshSockets(socketCount);
            var count = sockets.length;
            sockets.forEach(function(socket) {
                socket.on('open', function() {
                    socket.send('paradigm uniquerole');
                    socket.send('username s'+sockets.indexOf(socket));
                    if (--count === 0) {
                        done();
                    }
                });
            });
        });

        afterEach(function() {
            sockets.forEach(function(s) {
                s.close();
            });
            server.stop();
        });

        it('should group 3 players w/ 2 roles into 2 rooms', function(done) {
            var usernames = ['s0', 's1', 's2'];
            register(sockets[0], 'p1');
            register(sockets[1], 'p2');
            register(sockets[2], 'p2');

            // Verify that 0,1 are in the same group but 2 is not
            sendMessage(sockets[0], 'Hello_world!');

            setTimeout(function() {
                var groups = usernames.map(server.getGroupId.bind(server));
                assert.equal(R.uniq(groups).length,2);
                done();
            }, 200);
        });

        it('should group players into groups by role name', function(done) {
            var usernames = ['s0', 's1', 's2'];
            register(sockets[0], 'p1');
            register(sockets[1], 'p2');
            register(sockets[2], 'p2');

            // Verify that 0,1 are in the same group but 2 is not
            sendMessage(sockets[0], 'Hello_world!');

            setTimeout(function() {
                var groups = usernames.map(server.getGroupId.bind(server));
                assert.notEqual(groups[1],groups[2]);
                assert(groups[0] === groups[2] || groups[0] === groups[1]);
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
                };
            sockets[1].on('message', counter);
            sockets[2].on('message', counter);
            sockets[0].send('message hey');
        });

        it('join messages should include registered role', function(done) {
            var test = function(msg) {
                    console.log('MSG:', msg);
                    if (msg.indexOf('hey') > -1) {
                        done();
                    }
                };

            sockets[0].on('message', test);
            sockets[0].send('register hey');
            sockets[1].send('register hey2');
        });

        it.skip('should group players by game id', function(done) {
            // TODO
        });

    });

    describe('2 player tests', function() {
        beforeEach(function() {
            server = new NetsBlocks();
            server.start();
            sockets = [];
        });

        afterEach(function() {
            sockets.forEach(function(s) {
                s.close();
            });
            server.stop();
        });

        it('should place 3 people in 2 groups', function(done) {
            var count = 0,
                checkFn = function() {
                    // Testing logic
                    var groups = ['s0', 's1', 's2'].map(server.getGroupId.bind(server));
                    assert.equal(R.uniq(groups).length, 2, 'Incorrect number of groups. '+
                        'Expected 2 but found '+R.uniq(groups).length+'.\n'+
                        JSON.stringify(server.paradigms.twoplayer._printableGroups()));
                    done();
                };

            refreshSocketsWithParadigm(3, 'twoplayer', function() {
                setTimeout(checkFn, 100);
            });
        });

        it('should pass messages between 2 of 3 people', function(done) {
            var count = 0,
                onStart = function() {
                    sockets[0].on('message', checkReceive);
                    sockets[1].on('message', checkReceive);
                    sockets[2].on('message', checkReceive);

                    sockets[0].send('message hey!');
                    sockets[1].send('message listen!');
                    sockets[2].send('message listen!');
                },
                checkReceive = function(msg) {
                    if (msg.indexOf('hey') + msg.indexOf('listen') > -2) {
                        count++;
                    }
                };

            refreshSocketsWithParadigm(4, 'twoplayer', onStart);

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

        describe('2 player turn based tests', function() {
            beforeEach(function(done) {
                refreshSocketsWithParadigm(2, 'turnbased', done);
            });

            afterEach(function() {
                sockets.forEach(function(s) {
                    s.close();
                });
            });

            // Sometimes fails when run with all the other tests...
            it('should block multiple turns by same person', function(done) {
                var count = 0,
                    checkReceive = function(msg) {
                        if (msg.indexOf('Hey') + msg.indexOf('Listen') > -2) {
                            count++;
                        }
                    };

                //sockets[0].on('message', checkReceive);
                sockets[1].on('message', checkReceive);
                sockets[0].send('message Hey!');
                sockets[0].send('message Listen!');

                setTimeout(function() {
                    assert.equal(count, 1);
                    done();
                }, 100);
            });

            it('should receive join message from the other player', function(done) {
                var counts = [0, 0],
                    checkFn = R.partial(assert.equal, 1),
                    checkReceive = function(index, msg) {
                        counts[index]++;
                    };

                sockets[0].on('message', checkReceive.bind(null, 0));
                sockets[1].on('message', checkReceive.bind(null, 1));
                setTimeout(function() {
                    counts.forEach(checkFn);
                    done();
                }, 100);
            });

        });
    });
});
