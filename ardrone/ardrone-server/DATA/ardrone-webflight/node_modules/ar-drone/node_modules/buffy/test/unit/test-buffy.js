var common = require('../common');
var test   = require('utest');
var assert = require('assert');
var buffy  = require(common.root);
var Reader = require(common.lib + '/Reader');

test('buffy', {
  'exports: Reader': function() {
    assert.strictEqual(buffy.Reader, Reader);
  },

  'createReader: maps to Reader constructor': function() {
    var reader = buffy.createReader(new Buffer(23));
    assert.equal(reader instanceof Reader, true);
    assert.equal(reader.bytesAhead(), 23);
  },
});
