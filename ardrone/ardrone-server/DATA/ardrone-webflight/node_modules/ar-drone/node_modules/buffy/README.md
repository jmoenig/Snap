# buffy (The Buffer Slayer)

A module to read / write binary data and streams.

## Install

```bash
npm install buffy
```

## Usage

Let's say you want to parse a simple C struct, buffy can help:

```js
var buffy = require('buffy');

var buffer = new Buffer([23, 0, 0, 0, 15, 116, 101, 115, 116]);
var reader = buffy.createReader(buffer);

var record = {
  version : reader.uint8(),
  id      : reader.uint32(),
  name    : reader.ascii(4),
};

// {version: 23, id: 15, name: 'test'}
```

Parsing a buffer is nice, but what about streams? Well, buffy has your back:

```js
var buffy      = require('buffy');
var net        = require('net');
var connection = net.createConnection(1337, 'example.org');

var reader = buffy.createReader();
connection.pipe(reader);

reader.on('data', function() {
  while (reader.bytesAhead() >= 9) {
    var record = {
      version : reader.uint8(),
      id      : reader.uint32(),
      name    : reader.ascii(4),
    };
  }
});
```

Future version may also support a declarative syntax for defining structs and
their sequences.

## Reader API

### reader.write(buffer)

Appends the given `buffer` to the internal buffer. Whenever possible, existing
space inside the internal buffer will be reused, otherwise a new / bigger buffer
will be created.

### reader.bytesAhead()

Returns the number of unread bytes available to the reader.

### reader.bytesBuffered()

Returns the number of bytes that are buffered by the Reader internally.

### reader.int8() / reader.uint8()

Returns the next (un)signed 8 bit integer.

### reader.int16BE() / reader.uint16BE() / reader.int16LE() / reader.uint16LE()

Returns the next (un)signed 16 bit integer in the chosen endianness.

### reader.int32BE() / reader.uint32BE() / reader.int32LE() / reader.uint32LE()

Returns the next (un)signed 32 bit integer in the chosen endianness.

### reader.float32BE() / reader.float32LE()

Returns the next 32 bit float in the chosen endianness.

### reader.double64BE() / reader.double64LE()

Returns the next 64 bit double in the chosen endianness.

### reader.ascii([bytes]) / reader.utf8([bytes])

Returns the next `bytes` as a string of the chosen encoding. If `bytes` is
omitted, a null terminated string is assumed.

### reader.buffer([bytes])

Returns the next `bytes` as a buffer.

### reader.skip(bytes)

Skips `bytes` bytes of the buffer.


## Writer API

The Writer has not been implemented yet.

## Error Handling

The reader will throw an exception whenever an operation exceeds the boundary
of the internal buffer.
