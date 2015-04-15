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

module.exports = {
    inherit: inherit,
    getAttribute: getAttribute
};
