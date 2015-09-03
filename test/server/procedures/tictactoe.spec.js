/*globals describe,it,before,beforeEach,afterEach*/
'use strict';

var TicTacToe = require('../../../src/server/rpc/procedures/TicTacToe.js'),
    RPCMock = require('../../assets/MockRPC'),
    tictactoe = new RPCMock(TicTacToe),
    assert = require('assert');

// Quick mocks for express req, res objects

describe('TicTacToe Tests', function() {
    describe('play', function() {
        afterEach(function() {
            tictactoe.clear();
        });
        beforeEach(function() {
            tictactoe.clear();
        });

        it('should not reverse the board', function() {
            tictactoe.play({username: 'p1', row: 3, column: 3});
            assert(!tictactoe.isOpen({row: 3, column: 3}).response);
            assert(tictactoe.isOpen({row: 3, column: 1}).response);
        });

        it('should not play in bad position', function() {
            var code = tictactoe.play({username: 'p1', row: 3, column: -1}).code;
            assert.equal(code, 400);
        });

        it('should not play if winner is found', function() {
            var code;
            tictactoe._rpc.winner = 'cat';
            code = tictactoe.play({username: 'p1', row: 3, column: -1}).code;
            assert.equal(code, 400);
        });
    });

    describe('clear', function() {
        it('should clear a move', function() {
            tictactoe.play({username: 'p1', row: 3, column: 3});
            tictactoe.clear();
            assert(tictactoe.isOpen({row: 3, column: 3}).response);
            assert(tictactoe.isOpen({row: 3, column: 1}).response);
        });
    });

    describe('isOpen', function() {
        beforeEach(function() {
            tictactoe.clear();
        });

        it('should be 1 indexed', function() {
            assert(tictactoe.play({username: 'p1', row: 3, column: 3}).response);
        });

        it('should return 400 if bad position', function() {
            var code = tictactoe.isOpen({username: 'p1', row: 5, column: 3}).code;
            assert.equal(code, 400);
        });

        it('should detect that every tile is open to start', function() {
            for (var i = 1; i < 4; i++) {
                for (var j = 1; j < 4; j++) {
                    var res = tictactoe.isOpen({row: i, column: j});
                    assert(res.response, 'Not open: '+JSON.stringify(res));
                }
            }
        });
    });

    describe('getTile', function() {
        beforeEach(function() {
            tictactoe.clear();
        });

        it('should return 400 if bad position', function() {
            var code = tictactoe.getTile({username: 'p1', row: 5, column: 3}).code;
            assert.equal(code, 400);
        });

        it('should return the player\'s username', function() {
            var username = 'p2';
            tictactoe.play({username: username, row: 1, column: 2});
            assert.equal(tictactoe.getTile({row: 1, column: 2}).response, username);
        });
    });

    describe('getWinner', function() {
        beforeEach(function() {
            tictactoe.clear();
        });

        it('should detect horizontal victory', function() {
            var username = 'p2',
                columns = [1,2,3],
                row = 3;

            columns.forEach(function(col) {
                tictactoe.play({username: username, row: row, column: col});
            });
            assert.equal(tictactoe.getWinner().response, username);
        });

        it('should detect vertical victory', function() {
            var username = 'p2',
                rows = [1,2,3],
                col = 2;

            rows.forEach(function(row) {
                tictactoe.play({username: username, row: row, column: col});
            });
            assert.equal(tictactoe.getWinner().response, username);
        });

        it('should detect diagonal victory', function() {
            var username = 'p2',
                positions = [[1,3],[2,2],[3,1]];

            positions.forEach(function(pos) {
                tictactoe.play({username: username, row: pos[0], column: pos[1]});
            });
            assert.equal(tictactoe.getWinner().response, username);
        });
    });

    describe('isGameOver', function() {
        beforeEach(function() {
            var username = 'p2',
                columns = [1,2,3],
                row = 3;

            columns.forEach(function(col) {
                tictactoe.play({username: username, row: row, column: col});
            });
            assert(tictactoe.isGameOver().response);
        });

        it('should detect game over after victory', function() {
            assert(tictactoe.isGameOver().response);
        });

        it('should reset after clear', function() {
            tictactoe.clear();
            assert(!tictactoe.isGameOver().response);
        });
    });
});
