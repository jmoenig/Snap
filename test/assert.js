function assert (cond, msg) {
    if (!cond) {
        throw new Error(msg || 'Assert Failed');
    }
}

assert.equal = function(first, second, msg) {
    msg = msg || `Expected ${second} but found ${first}`;
    assert(first === second, msg);
};

assert.notEqual = function(first, second, msg) {
    msg = msg || `Expected ${first} to *not* equal ${second}`;
    assert(first !== second, msg);
};

