'use strict';
// loaded before main nb scripts
/* globals ensureFullUrl */

var utils = {};

utils.requestPromise = function(request, data) {
    // takes an xhr request
    return new Promise((resolve, reject) => {
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
                    let err = new Error(request.statusText || 'Unsuccessful Xhr response');
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

utils.getUrlSync = function(url) {
    url = ensureFullUrl(url);
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    if (request.status === 200) {
        return request.responseText;
    }
    throw new Error('unable to retrieve ' + url);
};

utils.getUrlSyncCached = utils.memoize(utils.getUrlSync);
