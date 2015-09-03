/*globals describe,it,before,beforeEach,afterEach,after*/
'use strict';

var supertest = require('supertest'),
    assert = require('assert'),
    port = 4493,
    wsPort = 4492,
    WebSocket = require('ws'),  // jshint ignore:line
    api = supertest('http://localhost:'+port+'/rpc/tictactoe'),  // https?
    Server = require('../../src/server/Server'),
    not = function(checkCode) {
        return function(v) {
            assert(checkCode !== +v.statusCode);
        };
    };

describe('RPC Manager Tests', function() {
    var username = 'test',
        server;

    before(function(done) {
        server = new Server({port: port, wsPort: wsPort});
        server.start(done);
    });

    after(function(done) {
        server.stop(done);
    });

    // Testing an example RPC
    describe('Basic tests', function() {
        it('should exist', function(done) {
            api.get('/isGameOver?username='+username)
                .expect(401)
                .end(done);
        });
    });

    describe('TicTacToe tests', function() {
        var socket,
            host = 'http://localhost:'+wsPort+'/rpc';

        // Connect a websocket
        before(function(done) {
            socket = new WebSocket(host);
            socket.on('open', function() {
                socket.send('username '+username);
                setTimeout(done, 100);
            });
        });

        afterEach(function(done) {
            api.get('/clear?username='+username)
                .expect(200)
                .end(done);
        });

        it('should return 400 if bad action', function(done) {
            api.get('/I_dont_exist?username='+username)
                .expect(400)
                .end(done);
        });

        it('should respond to queries', function(done) {
            api.get('/isGameOver?username='+username)
                .expect(function(res) {
                    assert.equal(res.body, false);
                })
                .end(done);
        });

        it('should maintain state', function(done) {
            var play = api.get('/play?username='+username+'&row=1&column=1')
                .expect(200)
                .end(function() {
                    api.get('/getTile?username='+username+'&row=1&column=1')
                        .expect(function(res) {
                            assert.equal(res.text, username);
                        })
                        .end(done);
                });
        });

        describe('Second connection', function() {
            var newSocket,
                username2 = 'I want to play, too';  // This is an intentionally challenging name

            before(function(done) {
                newSocket = new WebSocket(host);
                newSocket.on('open', function() {
                    newSocket.send('username '+username2);
                    done();
                });
            });

            beforeEach(function(done) {
                api.get('/play?username='+username+'&row=1&column=1')
                    .expect(200)
                    .end(done);
            });

            afterEach(function(done) {
                api.get('/clear?username='+username)
                    .expect(200)
                    .end(function() {
                        api.get('/clear?username='+username2)
                            .expect(200)
                            .end(done);
                    });
            });

            describe('Sandboxed', function() {
                it('should have a new, unique game board', function(done) {
                    var size = [1,2,3],
                        count = Math.pow(size.length, 2),
                        positions = size.map(function(row) {
                            return size.map(function(col) {
                                return [row, col];
                            });
                        });

                    positions.forEach(function(row) {
                        row.forEach(function(pos) {
                            api.get('/isOpen?username='+username+'&row='+pos[0]+'&column='+pos[1])
                                .expect(200)
                                .end(function(res) {
                                    assert.equal(res, null);
                                    if (--count === 0) {
                                        done();
                                    }
                                });
                        });
                    });
                });
            });

            describe('Grouped', function() {
                before(function() {
                    socket.send('paradigm basic');
                    newSocket.send('paradigm basic');
                });

                it('should share a state with both sockets', function(done) {
                    api.get('/play?username='+username+'&row=1&column=1')
                        .expect(200)
                        .end(function() {
                            // Check for the played position
                            api.get('/getTile?username='+username2+'&row=1&column=1')
                                .expect(function(res) {
                                    assert.equal(res.text, username);
                                })
                                .end(done);
                        });
                });

            });
        });
    });
});
