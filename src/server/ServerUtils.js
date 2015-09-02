// These are utils for server specific tasks
'use strict';

var R = require('ramda'),
    assert = require('assert'),
    path = require('path'),
    fs = require('fs');

var serializeArray = function(content) {
    assert(content instanceof Array);
    return content.map(serialize).join(' ');
};

var serialize = function(service) {
    var pairs = R.toPairs(service);
    return encodeURI(pairs.map(R.join('=')).join('&'));
};

var loadJsFiles = function(dir) {
    return fs.readdirSync(dir)
        // Get only js files
        .filter(R.pipe(path.extname, R.eq.bind(R, '.js')))
        // Require the files
        .map(R.pipe(
            R.nthArg(0),
            path.join.bind(path, dir), 
            require
        ));
};

module.exports = {
    serialize: serialize,
    loadJsFiles: loadJsFiles,
    serializeArray: serializeArray

};
