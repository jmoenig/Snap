/*globals describe,it,before,beforeEach*/

var ServerUtils = require(__dirname+'/../../src/server/ServerUtils'),
    assert = require('assert');

describe('Server Utils', function() {
    'use strict';
    
    describe('loadJsFiles', function() {
        it('should load js files from a directory', function() {
            ServerUtils.loadJsFiles(__dirname+'/../../src/server/rpc/procedures')
                .forEach(function(procedure) {
                    assert.equal(typeof procedure.getPath(), 'string');
                    assert.equal(typeof procedure, 'function');
                });
        });
    });
});
