// vim: ts=2:sw=2

var common = require('../common');
var test   = require('utest');
var assert = require('assert');
var Reader = require(common.lib + '/Reader');

test('Constructor', {
  'offset option': function() {
    var buffer = new Buffer([0, 127]);
    var reader = new Reader({buffer: buffer, offset: 1});

    assert.equal(reader.uint8(), 127);
  },
});

test('WritableStream interface', {
  'is writable by default': function() {
    var reader = new Reader();
    assert.equal(reader.writable, true);
  },

  'write: returns true when active': function() {
    var reader = new Reader();
    assert.equal(reader.write(new Buffer(0)), true);
  },

  'write: returns false when paused': function() {
    var reader = new Reader();

    reader.pause();
    assert.equal(reader.write(new Buffer(0)), false);
  },

  'write: returns true when resumed': function() {
    var reader = new Reader();

    reader.pause();
    assert.equal(reader.write(new Buffer(0)), false);

    reader.resume();
    assert.equal(reader.write(new Buffer(0)), true);
  },

  'resume: emits drain': function() {
    var reader = new Reader();
    var drainEmitted = false;
    reader.on('drain', function () {
      drainEmitted = true;
    });
    reader.resume();
    assert.equal(drainEmitted, true, 'calling resume emits drain event');
  },

  'write: collects buffer data': function() {
    var reader = new Reader();

    reader.write(new Buffer([1, 2]));
    assert.equal(reader.uint8(), 1);

    reader.write(new Buffer([3]));
    assert.equal(reader.uint8(), 2);
    assert.equal(reader.uint8(), 3);
  },

  'passes stream-spec' : function () {
    var spec = require('stream-spec');
    var reader = new Reader();
    var tester = require('stream-tester');
    var randomWriter = tester.createRandomStream(
      function () { return 'line ' + Math.random() + '\n';},
      5000
    );

    spec(reader)
      .writable()
      .drainable()
      .validateOnExit();

    randomWriter.pipe(reader);
    randomWriter.on('end', function () {
      // consume buffer to emit end()
      reader.buffer(reader.bytesAhead());
    });
  },

  'write: uses existing buffer if possible': function() {
    var reader = new Reader();

    reader.write(new Buffer([1, 2, 3]));
    assert.equal(reader.uint8(), 1);
    reader.write(new Buffer([4]));

    assert.equal(reader.bytesBuffered(), 3);
    assert.equal(reader.uint8(), 2);
    assert.equal(reader.uint8(), 3);
    assert.equal(reader.uint8(), 4);
  },

  'write: grows buffer if neccessary': function() {
    var reader = new Reader();

    reader.write(new Buffer([1, 2]));
    assert.equal(reader.uint8(), 1);
    reader.write(new Buffer([3, 4, 5]));
    assert.equal(reader.uint8(), 2);
    assert.equal(reader.uint8(), 3);
    assert.equal(reader.uint8(), 4);
    assert.equal(reader.uint8(), 5);
  },

  'end: writes optional buffer' : function() {
    var reader = new Reader();
    reader.end(new Buffer([1]));
    assert.equal(reader.uint8(), 1);
  },

  'end: emits close' : function() {
    var reader = new Reader();
    var closeEmitted = false;
    reader.on('close', function () {
      closeEmitted = true;
    });
    reader.end();
    assert.equal(closeEmitted, true, 'calling end emits close event');
  },

  'end: does not emit close with unread buffer' : function() {
    var reader = new Reader();
    var closeEmitted = false;
    reader.on('close', function () {
      closeEmitted = true;
    });
    reader.end(new Buffer([1]));
    assert.equal(
      closeEmitted,
      false,
      'calling end with non-empty buffer does not emit close event'
    );
  },

  'end: does emit close after buffer is read' : function() {
    var reader = new Reader(new Buffer([1]));
    var closeEmitted = false;
    reader.on('close', function () {
      closeEmitted = true;
    });
    reader.end();
    reader.buffer(1);
    process.nextTick(function () {
      assert.equal(
        closeEmitted, true, 'emptying buffer after end emits close event'
      );
    });
  },
});

test('Read Methods', {
  'bytesAhead': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var reader = new Reader(buffer);

    assert.equal(reader.bytesAhead(), 4);
    reader.uint8();
    reader.uint8();

    assert.equal(reader.bytesAhead(), 2);
  },

  'bytesAhead: reports correctly with smaller buffer': function() {
    var reader = new Reader();

    reader.write(new Buffer([1, 2]));
    reader.buffer(2);
    reader.write(new Buffer([3]));
    assert.equal(reader.bytesAhead(), 1);
  },

  'uint8': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var reader = new Reader(buffer);

    assert.equal(reader.uint8(), 1);
    assert.equal(reader.uint8(), 127);
    assert.equal(reader.uint8(), 128);
    assert.equal(reader.uint8(), 255);
  },

  'int8': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var reader = new Reader(buffer);

    assert.equal(reader.int8(), 1);
    assert.equal(reader.int8(), 127);
    assert.equal(reader.int8(), -128);
    assert.equal(reader.int8(), -1);
  },

  'uint16BE': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var reader = new Reader(buffer);

    assert.equal(reader.uint16BE(), 1 * 256 + 127);
    assert.equal(reader.uint16BE(), 128 * 256 + 255);
  },

  'int16BE': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var reader = new Reader(buffer);

    assert.equal(reader.int16BE(), 1 * 256 + 127);
    assert.equal(reader.int16BE(), -128 * 256 + 255);
  },

  'uint16LE': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var reader = new Reader(buffer);

    assert.equal(reader.uint16LE(), 1 + 127 * 256);
    assert.equal(reader.uint16LE(), 128 + 255 * 256);
  },

  'int16LE': function() {
    var buffer = new Buffer([1, 127, 128, 255]);
    var reader = new Reader(buffer);

    assert.equal(reader.int16LE(), 1 + 127 * 256);
    assert.equal(reader.int16LE(), -128);
  },

  'uint32BE': function() {
    var buffer = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 255, 254, 253, 252]);
    var reader = new Reader(buffer);

    assert.equal(reader.uint32BE(), 16909060);
    assert.equal(reader.uint32BE(), 84281096);
    assert.equal(reader.uint32BE(), 4294901244);
  },

  'int32BE': function() {
    var buffer = new Buffer([1, 2, 3, 4, 255, 254, 253, 252]);
    var reader = new Reader(buffer);

    assert.equal(reader.int32BE(), 16909060);
    assert.equal(reader.int32BE(), -66052);
  },

  'uint32LE': function() {
    var buffer = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 252, 253, 254, 255]);
    var reader = new Reader(buffer);

    assert.equal(reader.uint32LE(), 67305985);
    assert.equal(reader.uint32LE(), 134678021);
    assert.equal(reader.uint32LE(), 4294901244);
  },

  'int32LE': function() {
    var buffer = new Buffer([1, 2, 3, 4, 255, 254, 253, 252]);
    var reader = new Reader(buffer);

    assert.equal(reader.int32LE(), 67305985);
    assert.equal(reader.int32LE(), -50462977);
  },

  'float32BE': function() {
    var buffer = new Buffer([
      0x41, 0xb8, 0x00, 0x00, // 23
      0xbf, 0x80, 0x00, 0x00, // -1
    ]);

    var reader = new Reader(buffer);

    assert.equal(reader.float32BE(), 23);
    assert.equal(reader.float32BE(), -1);
  },

  'float32LE': function() {
    var buffer = new Buffer([
      0x00, 0x00, 0xb8, 0x41, // 23
      0x00, 0x00, 0x80, 0xbf, // -1
    ]);
    var reader = new Reader(buffer);

    assert.equal(reader.float32LE(), 23);
    assert.equal(reader.float32LE(), -1);
  },

  'double64BE': function() {
    var buffer = new Buffer([
      0x40, 0x37, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0xbf, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ]);
    var reader = new Reader(buffer);

    assert.equal(reader.double64BE(), 23);
    assert.equal(reader.double64BE(), -1);
  },

  'double64LE': function() {
    var buffer = new Buffer([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x37, 0x40,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0xbf,
    ]);
    var reader = new Reader(buffer);

    assert.equal(reader.double64LE(), 23);
    assert.equal(reader.double64LE(), -1);
  },

  'ascii: fixed length ascii': testParseFixedLengthAsciiWith('ascii'),
  'ascii: fixed length snowman': testParseFixedLengthSnowmanWith('ascii'),
  'ascii: null terminated ascii': testParseNullTerminatedAsciiWith('ascii'),

  'utf8: fixed length ascii': testParseFixedLengthAsciiWith('utf8'),
  'utf8: fixed length snowman': testParseFixedLengthSnowmanWith('utf8'),
  'utf8: null terminated ascii': testParseNullTerminatedAsciiWith('utf8'),

  'buffer': function() {
    var buffer = new Buffer([1, 2, 3, 4, 5]);
    var reader = new Reader(buffer);

    assert.deepEqual(reader.buffer(3), new Buffer([1, 2, 3]));
    assert.deepEqual(reader.buffer(2), new Buffer([4, 5]));
  },
  'buffer: return a copy' : function () {
    var reader = new Reader(new Buffer([1]));
    var origResult = reader.buffer(1);
    reader.write(new Buffer([2]));
    assert.deepEqual(origResult, new Buffer([1]));
  },

  'skip' : function() {
    var reader = new Reader(new Buffer([1, 2, 3, 4, 5]));
    reader.skip(2);
    assert.deepEqual(reader.buffer(3), new Buffer([3, 4, 5]));
  }
});

test('Meta Methods', {
  'compact' : function() {
    var reader = new Reader(new Buffer([1, 2, 3, 4, 5]));
    reader.buffer(2);
    assert.equal(reader.bytesBuffered(), 5);
    reader.compact();
    assert.equal(reader.bytesBuffered(), 3);
    assert.deepEqual(reader.buffer(3), new Buffer([3, 4, 5]));
  },

  'compactOption disabled does not shrink buffer' : function() {
    var reader = new Reader(new Buffer([1, 2, 3, 4, 5]));
    reader.buffer(5);
    reader.write(new Buffer([6]));
    assert.equal(reader.bytesBuffered(), 5);
  },

  'compactOption enable does shrink buffer' : function() {
    var reader = new Reader({
      buffer : new Buffer([1, 2, 3, 4, 5]),
      compact : true
    });
    reader.buffer(5);
    reader.write(new Buffer([6]));
    assert.equal(reader.bytesBuffered(), 1);
  }

});


function testParseFixedLengthAsciiWith(encoding) {
  return function() {
    var buffer = new Buffer([
      'a'.charCodeAt(),
      'b'.charCodeAt(),
      'c'.charCodeAt(),
      'd'.charCodeAt(),
      'e'.charCodeAt(),
    ]);
    var reader = new Reader(buffer);

    assert.equal(reader[encoding](3), 'abc');
    assert.equal(reader[encoding](2), 'de');
  };
}

function testParseFixedLengthSnowmanWith(encoding) {
  return function() {
    var buffer = new Buffer('\u2603', 'utf8');
    var reader = new Reader(buffer);

    assert.equal(reader[encoding](3), '☃');
  };
}

function testParseNullTerminatedAsciiWith(encoding) {
  return function() {
    var buffer = new Buffer([
      'a'.charCodeAt(),
      'b'.charCodeAt(),
      'c'.charCodeAt(),
      0,
      'd'.charCodeAt(),
      'e'.charCodeAt(),
      0,
    ]);
    var reader = new Reader(buffer);

    assert.equal(reader[encoding](), 'abc');
    assert.equal(reader[encoding](), 'de');
  };
}
