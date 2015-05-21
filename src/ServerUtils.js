// These are utils for server specific tasks
'use strict';

var R = require('ramda'),
    assert = require('assert');

var serializeArray = function(content) {
    assert(content instanceof Array);
    return content.map(serialize).join(' ');
};

var serialize = function(service) {
    var pairs = R.toPairs(service);
    return encodeURI(pairs.map(R.join('=')).join('&'));
};

module.exports = {
    serialize: serialize,
    serializeArray: serializeArray
};
