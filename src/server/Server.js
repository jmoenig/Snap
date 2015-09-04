// TODO: Refactor this file 
'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    _ = require('lodash'),
    Utils = _.extend(require('./Utils'), require('./ServerUtils.js')),
    R = require('ramda'),
    CommunicationManager = require('./groups/CommunicationManager'),
    RPCManager = require('./rpc/RPCManager'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    API = require('./UserAPI.js'),
    EXTERNAL_API = R.map(R.partial(R.omit,['Handler']), API),
    DEFAULT_OPTIONS = {
        port: 8080,
        path: '',
        mongoURI: 'mongodb://localhost:27017'
    },
    key = process.env.SECRET_KEY || 'change this',
    hash = require('../client/sha512').hex_sha512,

    // Logging
    debug = require('debug'),
    log = debug('NetsBlocks:API:log'),
    info = debug('NetsBlocks:API:info'),

    // Session and cookie info
    sessionSecret = process.env.SESSION_SECRET || 'DoNotUseThisInProduction',
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser');

var Server = function(opts) {
    opts = _.extend({}, DEFAULT_OPTIONS, opts);
    this._port = opts.port;
    this.app = express();

    // Mongo variables
    this._users = null;
    this._server = null;
    this._mongoURI = opts.mongoURI;

    // Group and RPC Managers
    this.groupManager = new CommunicationManager(opts);
    this.rpcManager = new RPCManager(this.groupManager);
};

Server.prototype.connectToMongo = function(callback) {
    MongoClient.connect(this._mongoURI, function(err, db) {
        if (err) {
            throw err;
        }

        this._users = db.collection('users');
        this.configureRoutes();

        console.log('Connected to '+this._mongoURI);
        callback(err);
    }.bind(this));
};

Server.prototype.configureRoutes = function() {
    this.app.use(express.static(__dirname + '/../client/'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Session & Cookie settings
    this.app.use(cookieParser());
    this.app.use(expressSession({secret: sessionSecret}));

    // Initial page
    this.app.get('/', function(req, res) {
        res.redirect('/snap.html');
    });

    // TODO: Move this to a subrouter
    this.app.get('/api/ResetPW', function(req, res) {
        console.log('password reset request:', req.query.Username);
        // Change the password
        // TODO
        // Look up the email
        // TODO
        // Email the user the temporary password
        // TODO
        res.sendStatus(200);
    });

    this.app.get('/api/SignUp', function(req, res) {
        console.log('Sign up request:', req.query.Username, req.query.Email);
        var uname = req.query.Username,
            email = req.query.Email,
            tmpPassword = 'password';

        this._users.findOne({username: uname}, function(e, user) {
            if (!user) {
                // Default password is "password". Change this to update password
                // and email it to the user 
                // FIXME
                var newUser = {username: uname, 
                               email: email,
                               hash: hash(tmpPassword),
                               projects: []};

                this.emailPassword(newUser, tmpPassword);
                this._users.insert(newUser, function (err, result) {
                    if (err) {
                        return res.serverError(err);
                    }
                    log('Created new user: "'+uname+'"');
                    return res.sendStatus(200);
                });
                return;
            }
            log('User "'+uname+'" already exists. Could not make new user.');
            return res.status(401).send('ERROR: user exists');
        }.bind(this));
    }.bind(this));

    this.app.post('/api', function(req, res) {
        this._users.findOne({username: req.body.__u, hash: req.body.__h}, function(e, user) {
            if (e) {
                return res.serverError(e);
            }
            if (user) {  // Sign in 
                req.session.username = req.body.__u;
                return res.send(Utils.serializeArray(EXTERNAL_API));
            }

            return res.sendStatus(403);
        }.bind(this));
    }.bind(this));

    // Add User API routes (routes requiring logged in user)
    // I would make this a sub router but the client expects the structure
    // TODO: There may still be a better way to do this
    API.forEach(this.addAPIRoute.bind(this));

    // Add RPC routes
    this.app.use('/rpc', this.rpcManager.router);
};

Server.prototype.addAPIRoute = function(api) {
    // TODO: Add an authentication step (check the cookie)
    var method = api.Method.toLowerCase();
    this.app[method]('/api/'+api.URL, api.Handler.bind(this));
};

Server.prototype.emailPassword = function(user, password) {
    // TODO
};

Server.prototype.start = function(done) {
    done = done || Utils.nop;
    this.connectToMongo(function (err) {
        this._server = this.app.listen(this._port, done);
        this.groupManager.start();
    }.bind(this));
};

Server.prototype.stop = function(done) {
    done = done || Utils.nop;
    this.groupManager.stop();
    this._server.close(done);
};

module.exports = Server;
