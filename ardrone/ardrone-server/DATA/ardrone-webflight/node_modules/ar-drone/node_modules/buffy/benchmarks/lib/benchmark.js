var path          = require('path');
var FixtureStream = require('./FixtureStream');

module.exports = function(moduleName, fixturePath) {
  var lib         = require(moduleName);
  var packageJSON = require(moduleName + '/package.json');

  var fixtureName = path.basename(fixturePath, '.bin');

  return function benchmark(name, benchmarkFn) {
    if (name !== fixtureName) {
      return;
    }

    run(benchmarkFn, fixturePath, lib, packageJSON);
  };
};

function run(benchmarkFn, fixturePath, lib, packageJSON) {
  var stream     = new FixtureStream(fixturePath);
  var iterations = 100;

  console.log(['time', 'bytesPerSec', 'memoryUsage', 'lib', 'version'].join('\t'));

  function nextIteration() {
    var start = Date.now();

    benchmarkFn(lib, stream, function(err, checksum) {
      if (err) throw err;

      var duration = Date.now() - start;

      if (checksum !== 124067628) {
        //throw new Error('bad checksum: ' + checksum);
      }

      stream.removeAllListeners();

      var bytesPerSec = Math.round(stream.length / (duration / 1000));

      console.log([
        Date.now(),
        bytesPerSec,
        process.memoryUsage().rss,
        packageJSON.name,
        packageJSON.version
      ].join('\t'));

      iterations--;
      if (iterations) {
        process.nextTick(nextIteration);
      }
    });

    stream.resume();
  }

  nextIteration();
}
