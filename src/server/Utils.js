// These are general utils for more convenient functional programming
// Basically, these are predominantly small functions that are convenient
// for composing other useful functions (such as negating a function with
// "not")
'use strict';

var inherit = function(child, parents) {
    for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
            child[key] = arguments[i][key];
        }
    }
};

var getAttribute = function(object, attr) {
    return object[attr];
};

/**
* Remove passing values from the list (destructively).
*
* @param {Function} fn
* @param {Array} list
* @return {Array}
*/
var extract = function(fn, list) {
    var result = [];
    for (var i = list.length; i--;) {
        if (fn(list[i])) {
            result.unshift(list.splice(i,1)[0]);
        }
    }
    return result;
};

/**
* Return the negation of the given function.
*
* @param {Function} fn
* @return {Function}
*/
var not = function(fn) {
    return function() {
        return !fn.apply(this, arguments);
    };
};

var nop = function() {
};

module.exports = {
    inherit: inherit,
    extract: extract,
    not: not,
    nop: nop,
    getAttribute: getAttribute
};
