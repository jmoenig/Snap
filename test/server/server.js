/*globals describe,it,before,beforeEach,after*/
'use strict';

var supertest = require('supertest'),
    assert = require('assert'),
    port = 8493,
    api = supertest('http://localhost:'+port+'/storage'),  // https?
    Server = require('../../src/Server'),
    not = function(checkCode) {
        return function(v) {
            assert(checkCode !== +v.statusCode);
        };
    };

// TODO: Add API message
describe('Server Storage Tests', function() {
    var username = 'test',
        email = 'test@test.com',
        server;

    before(function(done) {
        server = new Server({port: port});
        server.start(done);
    });

    after(function(done) {
        server.stop(done);
    });

    describe('SignUp tests', function() {
        it('should exist', function(done) {
            api.get('/SignUp?Username='+username+'&Email='+email)
                .expect(not(404))
                .end(done);
        });
    });

    describe('Reset Password tests', function() {
        it('should exist', function(done) {
            api.get('/ResetPW?Username='+username)
                .expect(not(404))
                .end(done);
        });
    });

    describe('login tests', function() {
        it('should exist', function(done) {
            api.post('/')
                .expect(403)
                .end(done);
        });

        it.skip('should return API details', function(done) {
            var key = process.env.SECRET_KEY || 'change this',
                hasher = require('crypto').createHmac('sha512', key);

            hasher.update('password');
            api.post('/')
                .set('__u', username)
                .set('__h', hasher.digest('hex'))
                .expect(function(res) {
                    console.log('res.text', res.text);
                    assert(res.text.indexOf('Service') === 0);
                })
                .end(done);
        });
    });

    describe('unregister tests', function() {
        it.skip('should exist', function(done) {
            api.post('/Goodbye')
                .expect(200)
                .end(done);
        });
    });

    describe('SignUp tests', function() {
        it.skip('should create user account /SignUp', function(done) {
        });
    });

    describe('SignUp tests', function() {
    });

    describe('Static function tests', function() {
        it('should return valid serialized API', function() {
            assert(Server.serializeAPI() === 'Service=saveProject&Parameters=ProjectName,SourceCode,Media,SourceSize,MediaSize&Method=Post&Note=&URL=.1.00.9266A6C94DF6696CCB7C6A8E57654C0B Service=getProjectList&Parameters=&Method=Get&Note=&URL=.2.00.9266A6C94DF6696CCB7C6A8E57654C0B%3F Service=getProject&Parameters=ProjectName&Method=Post&Note=&URL=.3.00.9266A6C94DF6696CCB7C6A8E57654C0B Service=deleteProject&Parameters=ProjectName&Method=Post&Note=&URL=.4.00.9266A6C94DF6696CCB7C6A8E57654C0B Service=publishProject&Parameters=ProjectName&Method=Post&Note=&URL=.5.00.9266A6C94DF6696CCB7C6A8E57654C0B Service=unpublishProject&Parameters=ProjectName&Method=Post&Note=&URL=.6.00.9266A6C94DF6696CCB7C6A8E57654C0B Service=logout&Parameters=&Method=Get&Note=&URL=.7.00.9266A6C94DF6696CCB7C6A8E57654C0B Service=changePassword&Parameters=OldPassword,NewPassword&Method=Post&Note=&URL=.8.00.9266A6C94DF6696CCB7C6A8E57654C0B');
        });
    });

});
