// vim: ts=2:sw=2

var util         = require('util');
var Stream       = require('stream').Stream;

module.exports = Reader;
util.inherits(Reader, Stream);
function Reader(options) {
  Stream.call(this);

  if (Buffer.isBuffer(options)) {
    options = {buffer: options};
  }

  options = options || {};

  this.writable = true;

  this._buffer = options.buffer || new Buffer(0);
  this._compact = options.compact || false;
  this._paused = false;
  this._setOffset(options.offset || 0);
}

Reader.prototype.write = function(newBuffer) {
  var bytesAhead = this.bytesAhead();

  // existing buffer has enough space in the beginning?
  var reuseBuffer = (this._offset >= newBuffer.length);

  if (reuseBuffer) {
    // move unread bytes forward to make room for the new
    this._buffer.copy(this._buffer, this._offset - newBuffer.length, this._offset);
    this._moveOffset(- newBuffer.length);

    // add the new bytes at the end
    newBuffer.copy(this._buffer, this._buffer.length - newBuffer.length);
    if (this._compact) {
      this.compact();
    }
  } else {
    var oldBuffer = this._buffer;

    // grow a new buffer that can hold both
    this._buffer = new Buffer(bytesAhead + newBuffer.length);

    // copy the old and new buffer into it
    oldBuffer.copy(this._buffer, 0, this._offset);
    newBuffer.copy(this._buffer, bytesAhead);
    this._setOffset(0);
  }

  return !this._paused;
};

Reader.prototype.pause = function() {
  this._paused = true;
};

Reader.prototype.resume = function() {
  this._paused = false;
  this.emit('drain');
};

Reader.prototype.bytesAhead = function() {
  return this._buffer.length - this._offset;
};

Reader.prototype.bytesBuffered = function() {
  return this._buffer.length;
};

Reader.prototype.uint8 = function() {
  return this._buffer[this._moveOffset(1)];
};

Reader.prototype.int8 = function() {
  var unsigned = this.uint8();
  return (unsigned & 0x80) ? ((0xff - unsigned + 1) * -1) : unsigned;
};

Reader.prototype.uint16BE = function() {
  this._moveOffset(2);
  return (this._buffer[this._offset - 2] << 8) | this._buffer[this._offset - 1];
};

Reader.prototype.int16BE = function() {
  var unsigned = this.uint16BE();
  return unsigned & 0x8000 ? (0xffff - unsigned + 1) * -1 : unsigned;
};

Reader.prototype.uint16LE = function() {
  this._moveOffset(2);
  return this._buffer[this._offset - 2] | this._buffer[this._offset - 1] << 8;
};

Reader.prototype.int16LE = function() {
  var unsigned = this.uint16LE();
  return unsigned & 0x8000 ? (0xffff - unsigned + 1) * -1 : unsigned;
};

Reader.prototype.uint32BE = function() {
  this._moveOffset(4);

  return (
    this._buffer[this._offset - 3] << 16 |
    this._buffer[this._offset - 2] <<  8 |
    this._buffer[this._offset - 1] +
    (this._buffer[this._offset - 4] << 24)
  ) >>> 0;
};

Reader.prototype.int32BE = function() {
  var unsigned = this.uint32BE();
  return unsigned & 0x80000000 ? (0xffffffff - unsigned + 1) * -1 : unsigned;
};

Reader.prototype.uint32LE = function() {
  this._moveOffset(4);

  return (
    this._buffer[this._offset - 2] << 16 |
    this._buffer[this._offset - 3] <<  8 |
    this._buffer[this._offset - 4] +
    (this._buffer[this._offset - 1] << 24)
  ) >>> 0;
};

Reader.prototype.int32LE = function() {
  var unsigned = this.uint32LE();
  return unsigned & 0x80000000 ? (0xffffffff - unsigned + 1) * -1 : unsigned;
};

Reader.prototype.float32BE = function() {
  return this._buffer.readFloatBE(this._moveOffset(4));
};

Reader.prototype.float32LE = function() {
  return this._buffer.readFloatLE(this._moveOffset(4));
};

Reader.prototype.double64BE = function() {
  return this._buffer.readDoubleBE(this._moveOffset(8));
};

Reader.prototype.double64LE = function() {
  return this._buffer.readDoubleLE(this._moveOffset(8));
};

Reader.prototype.ascii = function(bytes) {
  return this._string('ascii', bytes);
};

Reader.prototype.utf8 = function(bytes) {
  return this._string('utf8', bytes);
};

Reader.prototype._string = function(encoding, bytes) {
  var nullTerminated = (bytes === undefined);
  if (nullTerminated) {
    bytes = this._nullDistance();
  }

  var offset = this._offset;
  this._moveOffset(bytes);

  var value = this._buffer.toString(encoding, offset, this._offset);

  if (nullTerminated) {
    this._moveOffset(1);
  }

  return value;
};

Reader.prototype._nullDistance = function() {
  for (var i = this._offset; i < this._buffer.length; i++) {
    var byte = this._buffer[i];
    if (byte === 0) {
      return i - this._offset;
    }
  }
};

Reader.prototype.buffer = function(bytes) {
  this._moveOffset(bytes);
  var ret = new Buffer(bytes);
  this._buffer.copy(ret, 0, this._offset -  bytes, this._offset);
  return ret;
};

Reader.prototype.skip = function(bytes) {
  if (bytes < 0) {
    this.emit('error', new Error('tried to skip outsite of the buffer'));
  }
  this._moveOffset(bytes);
};

Reader.prototype.compact = function() {
  if (this.offset < 1) {
    return;
  }

  this._buffer = this._buffer.slice(this._offset);
  this._setOffset(0);
};

Reader.prototype.end = function(newBuffer) {
  if (undefined !== newBuffer) {
    this.write(newBuffer);
  }
  this.writable = false;
  if (0 === this.bytesAhead()) {
    this.destroy();
  }
  // performance hack: switch to slightly slower version of _setOffset()
  this._setOffset = this._setOffsetNotWritable;
  return true;
};

Reader.prototype.destroy = function() {
  this._buffer = null;
  this._offset = 0;
  this.writable = false;
  this.emit('close');
};


Reader.prototype._setOffset = function(offset) {
  this._offset = offset;
};

Reader.prototype._setOffsetNotWritable = function(offset) {
  this._offset = offset;

  // handle end()
  if (! this.writable) {
    this._maybeDestroy();
  }
};

Reader.prototype._maybeDestroy = function () {
  var that = this;
  process.nextTick(function () {
    if (that.bytesAhead() === 0) {
      that.destroy();
    }
  });
};

Reader.prototype._moveOffset = function(relativeOffset) {
  this._setOffset(this._offset + relativeOffset);
  return this._offset - relativeOffset;
};
