// TODO: Refactor this file 
'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    _ = require('lodash'),
    Utils = _.extend(require('./Utils'), require('./ServerUtils.js')),
    R = require('ramda'),
    NetsBlocksServer = require('./NetsBlocksServer'),
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
    hash = require('./client/sha512').hex_sha512,

    // Session and cookie info
    sessionSecret = process.env.SESSION_SECRET || 'DoNotUseThisInProduction',
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser');

var Server = function(opts) {
    opts = _.extend({}, DEFAULT_OPTIONS, opts);
    NetsBlocksServer.call(this, opts);
    this._port = opts.port;
    this.app = express();

    // Connect to mongo
    this._users = null;
    this._server = null;
    MongoClient.connect(opts.mongoURI, function(err, db) {
        if (err) {
            throw err;
        }

        this._users = db.collection('users');
        this.configureRoutes();
        console.log('Connected to '+opts.mongoURI);
        if (this.onComplete) {
            this.start(this.onComplete);
        }
    }.bind(this));
};

Server.prototype.configureRoutes = function() {
    this.app.use(express.static(__dirname + '/client/'));
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

    // TODO: Storage endpoints
    //this.app.all('/api', function(req, res) {
        //console.log('req:', req);
    //});

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
            console.log('User is:', user, '('+uname+')');
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
                                   // FIXME: Change password to something meaningful
                    if (err) {
                        return res.serverError(err);
                    }
                    return res.sendStatus(200);
                });
                return;
            }
            console.log('User exists');
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
    API.forEach(this.addAPIRoute.bind(this));
};

Server.prototype.addAPIRoute = function(api) {
    // TODO: Add an authentication step (check the cookie)
    var method = api.Method.toLowerCase();
    this.app[method]('/api/'+api.URL, api.Handler.bind(this));
};

Server.prototype.emailPassword = function(user, password) {
    // TODO
};

_.extend(Server.prototype, NetsBlocksServer.prototype);

Server.prototype.start = function(done) {
    done = done || Utils.nop;
    if (this._users) {
        this._server = this.app.listen(this._port, done);
        NetsBlocksServer.prototype.start.call(this);
    }
    this.onComplete = done;
};

Server.prototype.stop = function(done) {
    done = done || Utils.nop;
    NetsBlocksServer.prototype.stop.call(this);
    this._server.close(done);
};

module.exports = Server;
