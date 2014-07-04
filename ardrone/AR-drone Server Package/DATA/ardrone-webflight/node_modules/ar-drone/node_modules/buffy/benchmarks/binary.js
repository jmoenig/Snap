var benchmark = require('./lib/benchmark')('binary', process.argv[2]);

benchmark('ascii-strings', function(binary, stream, cb) {
  var checksum = 0;
  var reachedEnd = false;

  var ws = binary()
    .loop(function (end) {
      this
        .word8('stringLength')
        .buffer('string', 'stringLength')
        .tap(function(vars) {
          checksum += vars.string.length;

          if (checksum === 650303) {
            cb(null, checksum);
          }
        })
    });

  stream
    .on('data', function(buffer) {
      ws.write(buffer);
    })
    .on('end', function() {
      ws.end();
    });
});
