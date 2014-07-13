/*

    cloud.js

    a backend API for SNAP!

    written by Jens Mönig

    Copyright (C) 2014 by Jens Mönig

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

/*global modules, IDE_Morph, SnapSerializer, hex_sha512, alert, nop,
localize*/

modules.cloud = '2014-May-26';

// Global stuff

var Cloud;

var SnapCloud = new Cloud(
    'https://snapcloud.miosoft.com/miocon/app/login?_app=SnapCloud'
);

// Cloud /////////////////////////////////////////////////////////////

function Cloud(url) {
    this.username = null;
    this.password = null; // hex_sha512 hashed
    this.url = url;
    this.session = null;
    this.api = {};
}

Cloud.prototype.clear = function () {
    this.username = null;
    this.password = null;
    this.session = null;
    this.api = {};
};

Cloud.prototype.hasProtocol = function () {
    return this.url.toLowerCase().indexOf('http') === 0;
};

// Cloud: Snap! API

Cloud.prototype.signup = function (
    username,
    email,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'http://')
                + this.url + 'SignUp'
                + '&Username='
                + encodeURIComponent(username)
                + '&Email='
                + encodeURIComponent(email),
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('ERROR') === 0) {
                        errorCall.call(
                            this,
                            request.responseText,
                            'Signup'
                        );
                    } else {
                        callBack.call(
                            null,
                            request.responseText,
                            'Signup'
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + 'SignUp',
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.getPublicProject = function (
    id,
    callBack,
    errorCall
) {
    // id is Username=username&projectName=projectname,
    // where the values are url-component encoded
    // callBack is a single argument function, errorCall take two args
    var request = new XMLHttpRequest(),
        responseList,
        myself = this;
    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'http://')
                + this.url + 'Public'
                + '&'
                + id,
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('ERROR') === 0) {
                        errorCall.call(
                            this,
                            request.responseText
                        );
                    } else {
                        responseList = myself.parseResponse(
                            request.responseText
                        );
                        callBack.call(
                            null,
                            responseList[0].SourceCode
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + 'Public',
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.resetPassword = function (
    username,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'http://')
                + this.url + 'ResetPW'
                + '&Username='
                + encodeURIComponent(username),
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('ERROR') === 0) {
                        errorCall.call(
                            this,
                            request.responseText,
                            'Reset Password'
                        );
                    } else {
                        callBack.call(
                            null,
                            request.responseText,
                            'Reset Password'
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + 'ResetPW',
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.connect = function (
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'http://') + this.url,
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    myself.api = myself.parseAPI(request.responseText);
                    myself.session = request.getResponseHeader('MioCracker')
                        .split(';')[0];
                    if (myself.api.login) {
                        callBack.call(null, myself.api, 'Snap!Cloud');
                    } else {
                        errorCall.call(
                            null,
                            'connection failed'
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url,
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};


Cloud.prototype.login = function (
    username,
    password,
    callBack,
    errorCall
) {
    var myself = this;
    this.connect(
        function () {
            myself.rawLogin(username, password, callBack, errorCall);
            myself.disconnect();
        },
        errorCall
    );
};

Cloud.prototype.rawLogin = function (
    username,
    password,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var myself = this,
        pwHash = hex_sha512("miosoft%20miocon,"
            + this.session.split('=')[1] + ","
            + encodeURIComponent(username.toLowerCase()) + ","
            + password // alreadey hex_sha512 hashed
            );
    this.callService(
        'login',
        function (response, url) {
            if (myself.api.logout) {
                myself.username = username;
                myself.password = password;
                callBack.call(null, response, url);
            } else {
                errorCall.call(
                    null,
                    'Service catalog is not available,\nplease retry',
                    'Connection Error:'
                );
            }
        },
        errorCall,
        [username, pwHash]
    );
};

Cloud.prototype.reconnect = function (
    callBack,
    errorCall
) {
    if (!(this.username && this.password)) {
        this.message('You are not logged in');
        return;
    }
    this.login(
        this.username,
        this.password,
        callBack,
        errorCall
    );
};

Cloud.prototype.saveProject = function (ide, callBack, errorCall) {
    var myself = this,
        pdata,
        media;

    ide.serializer.isCollectingMedia = true;
    pdata = ide.serializer.serialize(ide.stage);
    media = ide.hasChangedMedia ?
            ide.serializer.mediaXML(ide.projectName) : null;
    ide.serializer.isCollectingMedia = false;
    ide.serializer.flushMedia();

    // check if serialized data can be parsed back again
    try {
        ide.serializer.parse(pdata);
    } catch (err) {
        ide.showMessage('Serialization of program data failed:\n' + err);
        throw new Error('Serialization of program data failed:\n' + err);
    }
    if (media !== null) {
        try {
            ide.serializer.parse(media);
        } catch (err) {
            ide.showMessage('Serialization of media failed:\n' + err);
            throw new Error('Serialization of media failed:\n' + err);
        }
    }
    ide.serializer.isCollectingMedia = false;
    ide.serializer.flushMedia();

    myself.reconnect(
        function () {
            myself.callService(
                'saveProject',
                function (response, url) {
                    callBack.call(null, response, url);
                    myself.disconnect();
                    ide.hasChangedMedia = false;
                },
                errorCall,
                [
                    ide.projectName,
                    pdata,
                    media,
                    pdata.length,
                    media ? media.length : 0
                ]
            );
        },
        errorCall
    );
};

Cloud.prototype.getProjectList = function (callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'getProjectList',
                function (response, url) {
                    callBack.call(null, response, url);
                    myself.disconnect();
                },
                errorCall
            );
        },
        errorCall
    );
};

Cloud.prototype.changePassword = function (
    oldPW,
    newPW,
    callBack,
    errorCall
) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'changePassword',
                function (response, url) {
                    callBack.call(null, response, url);
                    myself.disconnect();
                },
                errorCall,
                [oldPW, newPW]
            );
        },
        errorCall
    );
};

Cloud.prototype.logout = function (callBack, errorCall) {
    this.clear();
    this.callService(
        'logout',
        callBack,
        errorCall
    );
};

Cloud.prototype.disconnect = function () {
    this.callService(
        'logout',
        nop,
        nop
    );
};

// Cloud: backend communication

Cloud.prototype.callURL = function (url, callBack, errorCall) {
    // both callBack and errorCall are optional two-argument functions
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open('GET', url, true);
        request.withCredentials = true;
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.setRequestHeader('MioCracker', this.session);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    var responseList = myself.parseResponse(
                        request.responseText
                    );
                    callBack.call(null, responseList, url);
                } else {
                    errorCall.call(
                        null,
                        url,
                        'no response from:'
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), url);
    }
};

Cloud.prototype.callService = function (
    serviceName,
    callBack,
    errorCall,
    args
) {
    // both callBack and errorCall are optional two-argument functions
    var request = new XMLHttpRequest(),
        service = this.api[serviceName],
        myself = this,
        postDict;

    if (!this.session) {
        errorCall.call(null, 'You are not connected', 'Cloud');
        return;
    }
    if (!service) {
        errorCall.call(
            null,
            'service ' + serviceName + ' is not available',
            'API'
        );
        return;
    }
    if (args && args.length > 0) {
        postDict = {};
        service.parameters.forEach(function (parm, idx) {
            postDict[parm] = args[idx];
        });
    }
    try {
        request.open(service.method, service.url, true);
        request.withCredentials = true;
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.setRequestHeader('MioCracker', this.session);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                var responseList = [];
                if (request.responseText &&
                        request.responseText.indexOf('ERROR') === 0) {
                    errorCall.call(
                        this,
                        request.responseText,
                        localize('Service:') + ' ' + localize(serviceName)
                    );
                    return;
                }
                if (serviceName === 'login') {
                    myself.api = myself.parseAPI(request.responseText);
                }
                responseList = myself.parseResponse(
                    request.responseText
                );
                callBack.call(null, responseList, service.url);
            }
        };
        request.send(this.encodeDict(postDict));
    } catch (err) {
        errorCall.call(this, err.toString(), service.url);
    }
};

// Cloud: payload transformation

Cloud.prototype.parseAPI = function (src) {
    var api = {},
        services;
    services = src.split(" ");
    services.forEach(function (service) {
        var entries = service.split("&"),
            serviceDescription = {},
            parms;
        entries.forEach(function (entry) {
            var pair = entry.split("="),
                key = decodeURIComponent(pair[0]).toLowerCase(),
                val = decodeURIComponent(pair[1]);
            if (key === "service") {
                api[val] = serviceDescription;
            } else if (key === "parameters") {
                parms = val.split(",");
                if (!(parms.length === 1 && !parms[0])) {
                    serviceDescription.parameters = parms;
                }
            } else {
                serviceDescription[key] = val;
            }
        });
    });
    return api;
};

Cloud.prototype.parseResponse = function (src) {
    var ans = [],
        lines;
    if (!src) {return ans; }
    lines = src.split(" ");
    lines.forEach(function (service) {
        var entries = service.split("&"),
            dict = {};
        entries.forEach(function (entry) {
            var pair = entry.split("="),
                key = decodeURIComponent(pair[0]),
                val = decodeURIComponent(pair[1]);
            dict[key] = val;
        });
        ans.push(dict);
    });
    return ans;
};

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

// Cloud: user messages (to be overridden)

Cloud.prototype.message = function (string) {
    alert(string);
};
