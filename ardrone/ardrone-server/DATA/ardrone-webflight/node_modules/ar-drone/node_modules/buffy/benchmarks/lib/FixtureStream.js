var fs     = require('fs');
var Stream = require('stream').Stream;
var util   = require('util');

module.exports = FixtureStream;
util.inherits(FixtureStream, Stream);
function FixtureStream(path, bufferSize) {
  bufferSize = bufferSize || 64 * 1024;

  this.readable = true;
  this._buffers = [];

  var buffer = fs.readFileSync(path).slice(0, bufferSize * 10);
  var start = 0;

  while (start < buffer.length) {
    var bytesLeft = buffer.length - start ;
    var size = (bytesLeft >= bufferSize)
      ? bufferSize
      : bytesLeft;

    this._buffers.push(buffer.slice(start, start + size));
    start += size;
  }

  this.length = buffer.length;
}

FixtureStream.prototype.resume = function() {
  for (var i = 0; i < this._buffers.length; i++) {
    this.emit('data', this._buffers[i]);
  }

  this.emit('end');
};
