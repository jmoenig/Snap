var benchmark = require('./lib/benchmark')('buffy', process.argv[2]);

benchmark('ascii-strings', function(buffy, stream, cb) {
  var reader = buffy.createReader();

  var checksum     = 0;
  var stringLength = undefined;

  stream
    .on('data', function(buffer) {
      reader.write(buffer);

      while (true) {
        if (stringLength === undefined) {
          if (reader.bytesAhead() < 1) {
            break;
          }

          stringLength = reader.uint8();
        }

        if (reader.bytesAhead() < stringLength) {
          break;
        }

        var string = reader.ascii(stringLength);

        checksum += stringLength;
        stringLength = undefined;
      }
    })
    .on('end', function() {
      cb(null, checksum);
    });
});
