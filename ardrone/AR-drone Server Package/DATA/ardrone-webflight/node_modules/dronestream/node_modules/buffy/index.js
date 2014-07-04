var buffy = exports;

buffy.Reader = require('./lib/Reader');
buffy.createReader = function(options) {
  return new buffy.Reader(options);
};
