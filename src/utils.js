'use strict';
// loaded before main nb scripts
/* globals ensureFullUrl */

var utils = {};

utils.requestPromise = function(request, data) {
    // takes an xhr request
    return new Promise(function(resolve, reject) {
        // stringifying undefined => undefined
        if (data) {
            request.setRequestHeader(
                'Content-Type',
                'application/json; charset=utf-8'
            );
        }
        request.send(JSON.stringify(data));
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve(request);
                } else {
                    var err = new Error(request.statusText || 'Unsuccessful Xhr response');
                    err.request = request;
                    reject(err);
                }
            }
        };
    });
};

utils.memoize = function(func){
    var cache = {};
    return function(){
        var key = JSON.stringify(arguments);
        if (cache[key]){
            return cache[key];
        }
        else{
            var val = func.apply(null, arguments);
            cache[key] = val;
            return val;
        }
    };
};

utils.getUrlSync = function(url, parser = x => x) {
    url = ensureFullUrl(url);
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    if (request.status === 200) {
        return parser(request.responseText);
    }
    throw new Error('unable to retrieve ' + url);
};

utils.getUrlSyncCached = utils.memoize(utils.getUrlSync);

utils.defer = function() {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });

    return deferred;
};

utils.sleep = function(time=0) {
    return new Promise(resolve => setTimeout(resolve, time));
};

utils.isNetsBloxDomain = function (url) {
    return !!url.match(/^(?:\w+:\/+)?[^/]*\bnetsblox\.org\b\/?/i)
};
