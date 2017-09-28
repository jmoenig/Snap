/*

    cloud.js

    a backend API for SNAP!

    written by Bernat Romagosa
    inspired in old cloud API by Jens Mönig

    Copyright (C) 2017 by Bernat Romagosa
    Copyright (C) 2015 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// Global settings /////////////////////////////////////////////////////

/*global modules, IDE_Morph, SnapSerializer, nop, localize*/

modules.cloud = '2015-December-15';

// Global stuff

var Cloud;

// Cloud /////////////////////////////////////////////////////////////

function Cloud(url) {
    this.init(url);
};

Cloud.prototype.init = function (url) {
    this.url = url;
    this.username = null;
    this.checkCredentials();
};

Cloud.prototype.clear = function () {
    this.username = null;
};

// Dictionary handling

Cloud.prototype.parseDict = function (src) {
    var dict = {};
    if (!src) {return dict; }
    src.split("&").forEach(function (entry) {
        var pair = entry.split("="),
            key = decodeURIComponent(pair[0]),
            val = decodeURIComponent(pair[1]);
        dict[key] = val;
    });
    return dict;
};

Cloud.prototype.encodeDict = function (dict) {
    var str = '',
        pair,
        key;
    if (!dict) {return null; }
    for (key in dict) {
        if (dict.hasOwnProperty(key)) {
            pair = encodeURIComponent(key)
                + '='
                + encodeURIComponent(dict[key]);
            if (str.length > 0) {
                str += '&';
            }
            str += pair;
        }
    }
    return str;
};

// Low level functionality

Cloud.prototype.get = function (path, onSuccess, onError, errorMsg) {
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open(
            'GET',
            this.url + path,
            true
        );
        request.setRequestHeader(
            'Content-Type',
            'application/json; charset=utf-8'
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    var response = JSON.parse(request.responseText);
                    if (response.errors) {
                       onError.call(
                            null,
                            response.errors[0],
                            errorMsg
                        );
                    } else {
                        onSuccess.call(null, response.message || response);
                    }
                } else {
                    onError.call(
                        null,
                        myself.url,
                        errorMsg
                    );
                }
            }
        };
        request.send();
    } catch (err) {
        onError.call(this, err.toString(), 'Cloud Error');
    }
};

Cloud.prototype.post = function (path, body, onSuccess, onError, errorMsg) {
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open(
            'POST',
            this.url + path,
            true
        );
        request.setRequestHeader(
            'Content-Type',
            'application/json'
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    var response = JSON.parse(request.responseText);
                    if (response.errors) {
                        onError.call(
                            this,
                            response.errors[0],
                            'Cloud Error'
                        );
                    } else {
                        onSuccess.call(null, response.message || response);
                    }
                } else {
                    onError.call(
                        null,
                        myself.url + path,
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(body);
    } catch (err) {
        onError.call(this, err.toString(), 'Cloud Error');
    }
};

// Credentials management

Cloud.prototype.checkCredentials = function (onSuccess, onError) {
    var myself = this;
    this.getCurrentUser(
        function (user) { 
            if (user.username) {
                myself.username = user.username;
            }
            if (onSuccess) { onSuccess.call(null, user.username); }
        },
        onError);
};

Cloud.prototype.getCurrentUser = function (onSuccess, onError) {
    this.get('/users/c', onSuccess, onError, 'Could not retrieve current user');
};

Cloud.prototype.logout = function (onSuccess, onError) {
    this.post(
        '/users/' + this.username + '/logout',
        null,
        onSuccess,
        onError,
        'logout failed');
};

Cloud.prototype.login = function (username, password, onSuccess, onError) {
    var myself = this;
    this.post(
        '/users/' + username + '/login?' + this.encodeDict({ password: password }),
        null,
        function () {
            myself.checkCredentials(onSuccess, onError);
        },
        onError,
        'login failed');
};

Cloud.prototype.signup = function (username, password, password_repeat, email, onSuccess, onError){
    this.post(
        '/users/' + username + '?' + this.encodeDict({
            email: email,
            password: password,
            password_repeat: password_repeat
        }),
        null,
        onSuccess,
        onError,
        'signup failed');
};

var SnapCloud = new Cloud('http://localhost:8080');
