// This is the TicTacToe RPC. It will maintain the game board and can be queried 
// for win/tie/ongoing as well as turn

'use strict';

var R = require('ramda'),
    debug = require('debug'),
    log = debug('NetsBlocks:RPCManager:TicTacToe:log'),
    info = debug('NetsBlocks:RPCManager:TicTacToe:info');

/**
 * TicTacToeRPC - This constructor is called on the first request to an RPC
 * from a given room
 *
 * @constructor
 * @return {undefined}
 */
var TicTacToeRPC = function() {
    this.board = TicTacToeRPC.getNewBoard();
    this.winner = null;
};

/**
 * Return the path to the given RPC
 *
 * @return {String}
 */
TicTacToeRPC.getPath = function() {
    return '/tictactoe';
};

/**
 * This function is used to expose the public API for RPC calls
 *
 * @return {Array<String>}
 */
TicTacToeRPC.getActions = function() {
    return ['isOpen', // Check if a space is open
            'getTile', // Get the tile at a location
            'getWinner',  // Get the winner
            'clear',
            'play',  // Play a tile at the given location
            'isGameOver'];  // Check for game over
};

// Actions
TicTacToeRPC.prototype.isOpen = function(req, res) {
    var row = req.query.row-1,
        column = req.query.column-1,
        open,
        isOnBoard = [row, column].every(this.isValidPosition.bind(this));

    if (!isOnBoard) {
        return res.status(400).send('ERROR: invalid position');
    }
    open = this.board[row][column] === null;
    return res.send(open);
};

TicTacToeRPC.prototype.clear = function(req, res) {
    this.winner = null;
    this.board = TicTacToeRPC.getNewBoard();
    info(req.query.username+' is clearing board');
    res.status(200).send(true);
};

TicTacToeRPC.prototype.getTile = function(req, res) {
    var row = req.query.row-1,
        column = req.query.column-1,
        isOnBoard = [row, column].every(this.isValidPosition.bind(this));

    if (isOnBoard) {
        info('Requesting tile at '+row+', '+column+' ('+this.board[row][column]+') from '+
            req.query.username);
        res.send(this.board[row][column]);
    } else {
        log('Received invalid position in tile request: '+row+', '+column);
        res.status(400).send('ERROR: invalid position');
    }
};

TicTacToeRPC.prototype.getWinner = function(req, res) {
    res.send(this.winner);
};

TicTacToeRPC.prototype.play = function(req, res) {
    var username = req.query.username,
        row = req.query.row-1,
        column = req.query.column-1,
        open = this.board[row][column] === null,
        isOnBoard = [row, column].every(this.isValidPosition.bind(this));

    // Check that...

    // ...the game is still going
    if (this.winner) {
        log('"'+username+'" is trying to play after the game is over');
        return res.status(400).send('ERROR: game is over. '+
            TicTacToeRPC.getWinner(this.board)+' won.');
    }

    // ...it's a valid position
    if (!isOnBoard) {
        log('"'+username+'" is trying to play in an invalid position ('+row+','+column+')');
        return res.status(400).send('ERROR: invalid position. Please select a '+
            'position between 1 and 3');
    }

    // ...it's not occupied
    if (open) {
        this.board[row][column] = username;
        this.winner = TicTacToeRPC.getWinner(this.board);
        return res.status(200).send(true);
    }
    return res.status(400).send(false);
};

TicTacToeRPC.prototype.isGameOver = function(req, res) {
    res.send(this.winner !== null);
};

// Helper functions
/**
 * Get the winner from the given board layout.
 *
 * @param board
 * @return {String} winner
 */
TicTacToeRPC.getWinner = function(board) {
    var possibleWinners = [];
    // Check for horizontal wins
    possibleWinners.push(TicTacToeRPC.getHorizontalWinner(board));

    // Check vertical
    var rotatedBoard = TicTacToeRPC.rotateBoard(board);
    possibleWinners.push(TicTacToeRPC.getHorizontalWinner(rotatedBoard));

    // Check diagonals
    var flippedBoard = board.map(function(row) {
        return row.slice().reverse();
    });
    possibleWinners.push(TicTacToeRPC.getDiagonalWinner(board) || 
        TicTacToeRPC.getDiagonalWinner(flippedBoard));

    return possibleWinners.reduce(function(prev, curr) {
        return prev || curr;
    }, null);
};

TicTacToeRPC.getNewBoard = function() {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
};

TicTacToeRPC.rotateBoard = function(board) {
    var rotatedBoard = TicTacToeRPC.getNewBoard();
    for (var row = 0; row < board.length; row++) {
        for (var col = 0; col < board[row].length; col++) {
            rotatedBoard[col][row] = board[row][col];
        }
    }
    return rotatedBoard;
};

TicTacToeRPC.getDiagonalWinner = function(board) {
    var items;

    // Get the diagonal
    items = [1,2,3]
        .map(R.nthArg(1))
        .map(function(i) {
            return board[i][i];
        });

    // Test it
    if (TicTacToeRPC.areEqualNonNull(items)) {
        return items[0];
    }
    return null;
};

TicTacToeRPC.getHorizontalWinner = function(board) {
    for (var i = 0; i < board.length; i++) {
        if (TicTacToeRPC.areEqualNonNull(board[i])) {
            return board[i][0];
        }
    }
    return null;
};

/**
 * Check if it is in the range of the board and a number
 *
 * @param {Number} pos
 * @return {Boolean}
 */
TicTacToeRPC.prototype.isValidPosition = function(pos) {
    return !isNaN(pos) && 0 <= pos && pos < this.board.length;
};

TicTacToeRPC.areEqualNonNull = function(row) {
    return row[0] && row[0] === row[1] && row[1] === row[2];
};

module.exports = TicTacToeRPC;
