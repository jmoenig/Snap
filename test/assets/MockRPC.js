// I should probably rename this. This is a wrapper for testing the RPC's
'use strict';

var MockRPC = function(RPC) {
    this._rpc = new RPC();
    this.createMethods(RPC);
};

MockRPC.prototype.createMethods = function(RPC) {
    RPC.getActions().forEach(this.addMethod.bind(this));
};

MockRPC.prototype.addMethod = function(name) {
    this[name] = function(args) {
        var req = {query: (args||{})},
            res = new MockResponse();

        this._rpc[name](req, res);
        return res;
    };
};
var MockResponse = function() {
    this.code = null;
    this.response = null;
};

MockResponse.prototype.status = function(code) {
    this.code = code;
    return this;
};

MockResponse.prototype.send = function(text) {
    this.response = text;
    return this;
};

module.exports = MockRPC;
