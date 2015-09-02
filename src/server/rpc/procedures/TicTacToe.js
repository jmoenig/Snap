// This is the TicTacToe RPC. It will maintain the game board and can be queried 
// for win/tie/ongoing as well as turn

'use strict';

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

TicTacToeRPC.getActions = function() {
    return ['isOpen', // Check if a space is open
            'getTile', // Get the tile at a location
            'getWinner',  // Get the winner
            'play',  // Play a tile at the given location
            'isGameOver'];  // Check for game over
};

// Actions
TicTacToeRPC.prototype.isOpen = function(req, res) {
    var row = req.query.row,
        column = req.query.column,
        open = this.board[row][column] === null;

    res.send(open);
};

TicTacToeRPC.prototype.getTile = function(req, res) {
    var row = req.query.row,
        column = req.query.column;

    // TODO
};

TicTacToeRPC.prototype.getWinner = function(req, res) {
    res.send(this.winner);
};

TicTacToeRPC.prototype.play = function(req, res) {
    var username = req.session.username,
        row = req.query.row,
        column = req.query.column,
        open = this.board[row][column] === null;

    if (this.winner) {
        return res.status(400).send('Game is over');
    }

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
    var flippedBoard = board.map(board.reverse.call);
    possibleWinners.push(TicTacToeRPC.getVerticalWinner(board) || 
        TicTacToeRPC.getVerticalWinner(flippedBoard));

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

TicTacToeRPC.getVerticalWinner = function(board) {
};

TicTacToeRPC.getHorizontalWinner = function(board) {
    for (var i = 0; i < board.length; i++) {
        if (TicTacToeRPC.areEqualNonNull(board[i])) {
            return board[i][0];
        }
    }
    return null;
};

TicTacToeRPC.areEqualNonNull = function(row) {
    return row[0] && row[0] === row[1] && row[1] === row[2];
};

module.exports = TicTacToeRPC;
