/*

    cloud.js

    a backend API for SNAP!

    written by Jens Mönig

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

/*global modules, hex_sha512, nop, localize, CLIENT_ID, SERVER_URL, utils*/

modules.cloud = '2020-September-1';

// Global stuff

var Cloud;
var SnapCloud = new Cloud(CLIENT_ID, SERVER_URL + '/api/');

// Cloud /////////////////////////////////////////////////////////////

function Cloud(clientId, url) {
    this.clientId = clientId;
    this.roleId = null;
    this.username = null;
    this.password = null; // hex_sha512 hashed
    this.url = url;
    this.session = null;
    this.limo = null;
    this.route = null;
    this.api = null;
}

Cloud.prototype.clear = function () {
    this.username = null;
    this.password = null;
    this.session = null;
    this.limo = null;
    this.route = null;
    this.api = null;
};

Cloud.prototype.hasProtocol = function () {
    return this.url.toLowerCase().indexOf('http') === 0;
};

Cloud.prototype.setRoute = function (username) {
    var routes = 20,
        userNum = 0,
        i;

    for (i = 0; i < username.length; i += 1) {
        userNum += username.charCodeAt(i);
    }
    userNum = userNum % routes + 1;
    this.route = '.sc1m' +
        (userNum < 10 ? '0' : '') +
        userNum;
};

// Cloud: Snap! API

Cloud.prototype.getPublicProject = async function (
    id,
) {
    // id is Username=username&projectName=projectname,
    // where the values are url-component encoded
    // callBack is a single argument function, errorCall take two args
    const deferred = utils.defer();
    const request = new XMLHttpRequest();

    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'http://')
                + this.url + 'RawPublic'
                + '?'
                + id,
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('ERROR') === 0) {
                        deferred.reject(new Error(request.responseText));
                    } else {
                        deferred.resolve(request.responseText);
                    }
                } else {
                    deferred.reject(new Error(localize('could not connect to:') + this.url));
                }
            }
        };
        request.send(null);
    } catch (err) {
        deferred.reject(err);
    }
    return deferred.promise;
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
                + '?Username='
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

Cloud.prototype.login = function (
    username,
    password,
    remember,
    strategy,
) {
    const deferred = utils.defer();
    var request = new XMLHttpRequest(),
        usr = JSON.stringify({
            projectId: this.projectId,
            __h: password,
            __u: username,
            remember: remember,
            clientId: SnapCloud.clientId
        });

    this.setRoute(username);
    try {
        let url = (this.hasProtocol() ? '' : 'http://') +
            this.url +
            '?SESSIONGLUE=' +
            this.route;

        if (strategy) {
            url += `&strategy=${strategy}`;
        }
        request.open(
            'POST',
            url,
            true
        );
        request.setRequestHeader(
            'Content-Type',
            'application/json; charset=utf-8'
        );
        // glue this session to a route:
        request.setRequestHeader('SESSIONGLUE', this.route);
        request.withCredentials = true;
        request.onreadystatechange = async () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    const user = await this.getUserData();
                    this.username = user.username;
                    this.credentials = {username, password, strategy};
                    return deferred.resolve(user);
                } else if (request.status === 403) {
                    return deferred.reject(
                        new Error(localize(request.responseText || 'wrong username or password'))
                    );
                } else {
                    return deferred.reject(
                        new Error(localize('could not connect to cloud.'))
                    );
                }
            }
        };
        request.send(usr);
    } catch (err) {
        deferred.reject(err);
    }
    return deferred.promise;
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

Cloud.prototype.getSharedProjectList = function(callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'getSharedProjectList',
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
                [hex_sha512(oldPW), hex_sha512(newPW)]
            );
        },
        errorCall
    );
};

// Cloud: backend communication

Cloud.prototype.callURL = function (url, callBack, errorCall) {
    // both callBack and errorCall are optional two-argument functions
    var request = new XMLHttpRequest(),
        stickyUrl,
        myself = this;
    try {
        // set the Limo. Also set the glue as a query paramter for backup.
        stickyUrl = url +
            '&SESSIONGLUE=' +
            this.route +
            '&_Limo=' +
            this.limo;
        request.open('GET', stickyUrl, true);
        request.withCredentials = true;
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.setRequestHeader('MioCracker', this.session);
        // Set the glue as a request header.
        request.setRequestHeader('SESSIONGLUE', this.route);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    var responseList = myself.parseResponse(request);
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

Cloud.prototype.supportsService = function (serviceName) {
    return !!this.api[serviceName];
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

Cloud.prototype.parseResponse = function (request) {
    var src = request.responseText;
    if (request.getResponseHeader('content-type').indexOf('application/json') > -1) {
        return JSON.parse(src);
    } else if (request.getResponseHeader('content-type').indexOf('xml') > -1) {
        return src;
    } else {
        return this.parseSnapResponse(src);
    }
};

Cloud.prototype.parseSnapResponse = function (src) {
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

Cloud.prototype.getUserData = async function() {
    const url = (this.hasProtocol() ? '' : 'http://') +
        this.url;
    const request = new XMLHttpRequest();
    request.open(
        'GET',
        url,
        true
    );
    request.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
    );
    request.withCredentials = true;
    try {
        await utils.requestPromise(request);
        return JSON.parse(request.responseText);
    } catch (err) {
        console.warn('Unable to fetch user data:', err);
    }
};

Cloud.prototype.addRole = function(name, onSuccess, onFail) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'addRole',
                onSuccess,
                onFail,
                [name, myself.clientId, myself.projectId]
            );
        },
        onFail
    );
};

Cloud.prototype.renameRole = function(roleId, name, onSuccess, onFail) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'renameRole',
                onSuccess,
                onFail,
                [roleId, name, myself.projectId]
            );
        },
        onFail
    );
};

Cloud.prototype.cloneRole = function(roleName, onSuccess, onFail) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'cloneRole',
                onSuccess,
                onFail,
                [roleName, myself.projectId]
            );
        },
        onFail
    );
};

Cloud.prototype.respondToInvitation = function (id, accepted, onSuccess, onFail) {
    var myself = this,
        args = [id, accepted, SnapCloud.clientId];

    this.reconnect(
        function () {
            myself.callService(
                'invitationResponse',
                function(response) {
                    var project = response[0];
                    if (accepted) {
                        myself.setLocalState(project.ProjectID, project.RoleID);
                    }
                    onSuccess(project);
                },
                onFail,
                args
            );
        },
        function(err) {
            myself.ide.showMessage(err, 2);
        }
    );
};

Cloud.prototype.inviteGuest = function (userId, roleId) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'inviteGuest',
                nop,
                nop,
                [SnapCloud.clientId, userId, roleId, myself.projectId]
            );
        },
        nop
    );
};

Cloud.prototype.inviteToCollaborate = function () {
    var myself = this,
        args = Array.prototype.slice.call(arguments);

    this.reconnect(
        function () {
            myself.callService(
                'inviteToCollaborate',
                nop,
                nop,
                args.concat(myself.projectId)
            );
        },
        nop
    );
};

Cloud.prototype.joinActiveProject = function (id, callback, onError) {
    var myself = this;
    this.callService(
        'joinActiveProject',
        function(response) {
            // Update the projectID
            var projectInfo = response[0];
            myself.setLocalState(projectInfo.ProjectID, projectInfo.RoleID);
            callback(projectInfo);
        },
        onError,
        [id]
    );
};

Cloud.prototype.evictCollaborator = function (id, projectId) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'evictCollaborator',
                nop,
                nop,
                [id, projectId || myself.projectId]
            );
        },
        nop
    );
};

Cloud.prototype.collabResponse = function (id, accepted, onSuccess, onFail) {
    var myself = this,
        args = [id, accepted, SnapCloud.clientId];

    this.reconnect(
        function () {
            myself.callService(
                'inviteCollaboratorResponse',
                onSuccess,
                onFail,
                args
            );
        },
        function(err) {
            myself.ide.showMessage(err, 2);
        }
    );
};

Cloud.prototype.getFriendList = function (callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'getFriendList',
                function (usernames) {
                    callBack(usernames);
                },
                errorCall
            );
        },
        errorCall
    );
};

Cloud.prototype.getProject = function (id, callBack, errorCall, roleId) {
    var myself = this,
        args = [id];

    if (roleId) {
        args.push(roleId);
    }

    this.reconnect(
        function () {
            myself.callService(
                'getProject',
                function (response) {
                    var xml = response[0];
                    myself.setLocalState(xml.ProjectID, xml.RoleID);
                    callBack(xml);
                },
                errorCall,
                args
            );
        },
        errorCall
    );
};

Cloud.prototype.getProjectByName = async function (owner, name) {
    const deferred = utils.defer();
    await this.reconnect(() => {
            this.callService(
                'getProjectByName',
                response => {
                    const xml = response[0];
                    this.setLocalState(xml.ProjectID, xml.RoleID);
                    deferred.resolve(xml);
                },
                deferred.reject,
                [owner, name]
            );
        },
        deferred.reject
    );
    return deferred.promise;
};

Cloud.prototype.getCollaboratorList = function (callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'getCollaborators',
                callBack,
                errorCall,
                [myself.projectId]
            );
        },
        errorCall
    );
};

Cloud.prototype.deleteRole = function(roleId, onSuccess, onFail) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'deleteRole',
                onSuccess,
                onFail,
                [roleId, myself.projectId]
            );
        },
        onFail
    );
};

Cloud.prototype.evictUser = function(userId, onSuccess, onFail) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'evictUser',
                onSuccess,
                onFail,
                [userId, myself.projectId]
            );
        },
        onFail
    );
};

Cloud.prototype.saveProject = function (ide, callBack, errorCall, overwrite, name) {
    var myself = this,
        serialized = ide.sockets.getSerializedProject();

    myself.reconnect(
        function () {
            myself.callService(
                'saveProject',
                function (response, url) {
                    myself.setLocalState(response.projectId, response.roleId);
                    callBack.call(null, response, url);
                },
                errorCall,
                [
                    myself.roleId,
                    ide.projectName,
                    name || ide.room.name,
                    SnapCloud.projectId,
                    ide.room.ownerId,
                    overwrite === true,
                    serialized.SourceCode,
                    serialized.Media
                ]
            );
        },
        errorCall
    );
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
        stickyUrl,
        postDict;

    if (!this.api) {
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
            if (args[idx] !== undefined) {
                postDict[parm] = args[idx];
            }
        });
    }
    try {
        stickyUrl = this.url + '/' + service.url;

        request.open(service.method, stickyUrl, true);
        request.withCredentials = true;
        request.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded'
        );
        //request.setRequestHeader('SESSIONGLUE', this.route);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                var responseList = [];
                var hasErrorContent = request.responseText &&
                        request.responseText.indexOf('ERROR') === 0;
                var isErrorStatus = request.status < 200 || request.status > 399;
                if (isErrorStatus || hasErrorContent) {
                    errorCall.call(
                        this,
                        request.responseText,
                        localize('Service:') + ' ' + localize(serviceName)
                    );
                    return;
                }
                responseList = myself.parseResponse(request);
                callBack.call(null, responseList, service.url);
            }
        };
        request.send(this.encodeDict(postDict));
    } catch (err) {
        errorCall.call(this, err.toString(), service.url);
    }
};

Cloud.prototype.reconnect = function (callback, errorCall) {
    if (!this.username) {
        this.message('You are not logged in');
        return;
    }

    // need to set 'api' from setClientState
    let promise = this.setClientState();
    if (callback && errorCall) {
        promise = promise.then(callback)
            .catch(errorCall);
    }
    return promise;
};

Cloud.prototype.disconnect = nop;

Cloud.prototype.logout = function (callBack, errorCall) {
    this.reconnect(
        () => {
            this.callService(
                'logout',
                callBack,
                errorCall,
                [this.clientId]
            );
            this.clear();
        },
        errorCall
    );
};

Cloud.prototype.signup = function (
    username,
    email,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var request = new XMLHttpRequest(),
        myself = this,
        data = 'Username=' + encodeURIComponent(username) + '&Email=' +
            encodeURIComponent(email);
    try {
        request.open(
            'POST',
            (this.hasProtocol() ? '' : 'http://')
                + this.url + 'SignUp',
            true
        );
        request.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded'
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
        request.send(data);
    } catch (err) {
        errorCall.call(this, err.toString(), 'NetsBlox Cloud');
    }
};

Cloud.prototype.isProjectActive = function (projectId, callBack, errorCall) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'isProjectActive',
                function(response) {
                    return callBack(response.active);
                },
                errorCall,
                [
                    myself.clientId,
                    projectId
                ]
            );
        },
        errorCall
    );
};

Cloud.prototype.hasConflictingStoredProject = function (name, callBack, errorCall) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'hasConflictingStoredProject',
                function(response) {
                    var hasConflicting = response[0].hasConflicting === 'true';

                    return callBack(hasConflicting);
                },
                errorCall,
                [
                    myself.projectId,
                    name
                ]
            );
        },
        errorCall
    );
};

Cloud.prototype.saveProjectCopy = function(callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'saveProjectCopy',
                function (response, url) {
                    myself.setLocalState(response.projectId, myself.roleId);
                    callBack.call(null, response, url);
                    myself.disconnect();
                },
                errorCall,
                [
                    myself.clientId,
                    myself.projectId
                ]
            );
        },
        errorCall
    );
};

Cloud.prototype.request = function (url, dict) {
    var resolve,
        reject,
        promise = new Promise(function(res, rej) {
            resolve = res;
            reject = rej;
        }),
        data = JSON.stringify(dict);

    url = SERVER_URL + url;
    var request = new XMLHttpRequest();

    request.open('POST', url, true);
    request.setRequestHeader(
        'Content-Type',
        'application/json'
    );
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var badStatusCode = request.status > 299 || request.status < 200;
            if (badStatusCode || request.responseText &&
                    request.responseText.indexOf('ERROR') === 0) {
                return reject(request);
            }
            resolve(JSON.parse(request.responseText));
        }
    };

    request.send(data);
    return promise;
};

Cloud.prototype.setLocalState = function (projectId, roleId) {
    this.projectId = projectId;
    this.roleId = roleId;
};

Cloud.prototype.resetLocalState = function () {
    var baseId = this.clientId + '-' + Date.now();
    var projectId = 'tmp-project-id-' + baseId;
    var roleId = 'tmp-role-id-' + baseId;
    this.setLocalState(projectId, roleId);
};

Cloud.prototype.newProject = function (name) {
    var myself = this,
        data = {
            clientId: SnapCloud.clientId,
            name: name || ''
        };

    if (!this.newProjectRequest) {
        this.newProjectRequest = this.request('/api/newProject', data)
            .then(function(result) {
                myself.setLocalState(result.projectId, result.roleId);
                myself.newProjectRequest = null;
                return result;
            })
            .catch(function(req) {
                myself.resetLocalState();
                myself.newProjectRequest = null;
                throw new Error(req.responseText);
            });
    }

    return this.newProjectRequest;
};

Cloud.prototype.getClientState = function () {
    return {
        username: this.username,
        clientId: this.clientId,
        projectId: this.projectId,
        roleId: this.roleId
    };
};

Cloud.prototype.setClientState = function (room, role, actionId) {
    var myself = this,
        newProjectRequest = this.newProjectRequest || Promise.resolve();

    return newProjectRequest
        .then(function() {
            var data = {
                __u: myself.username,
                __h: myself.password,
                clientId: myself.clientId,
                socketId: myself.clientId,
                projectId: myself.projectId,
                roleId: myself.roleId,
                roomName: room,
                roleName: role,
                actionId: actionId
            };
            return myself.request('/api/setClientState', data);
        })
        .then(function(result) {
            // Only change the project ID if no other moves/newProjects/etc have occurred
            myself.setLocalState(result.projectId, result.roleId);
            if (!myself.api) {  // Set the api, if available...
                myself.api = result.api;
            }

            return result;
        })
        .catch(function(req) {
            var connError = 'Could not connect to ' + myself.url;
            throw new Error(req.responseText || connError);
        });
};

Cloud.prototype.setProjectName = function(name) {
    var myself = this,
        newProjectRequest = this.newProjectRequest || Promise.resolve();

    return newProjectRequest
        .then(function() {
            var data = {
                projectId: myself.projectId,
                name: name
            };
            return myself.request('/api/setProjectName', data);
        })
        .then(function(result) {
            return result;
        })
        .catch(function(req) {
            var connError = 'Could not connect to ' + myself.url;
            throw new Error(req.responseText || connError);
        });
};

Cloud.prototype.importProject = function (name, role, roles) {
    var myself = this,
        data = {
            projectId: this.projectId,
            clientId: this.clientId,
            name: name,
            role: role,
            roles: roles
        };

    return this.request('/api/importProject', data)
        .then(function(result) {
            myself.setLocalState(result.projectId, result.roleId);
            return result.state;
        })
        .catch(function(req) {
            myself.resetLocalState();
            throw new Error(req.responseText);
        });
};

Cloud.prototype.getEntireProject = function(projectId, callback, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'getEntireProject',
                function (response) {
                    callback(response);
                    myself.disconnect();
                },
                errorCall,
                [
                    projectId
                ]
            );
        },
        errorCall
    );
};

Cloud.prototype.linkAccount = async function(username, password, type) {
    await this.request(`/api/linkAccount/${type}`, {username, password});
};

Cloud.prototype.unlinkAccount = async function(account) {
    await this.request('/api/unlinkAccount', account);
};

Cloud.prototype.exportProject = async function(projectId=this.projectId) {
    const response = await fetch(`/api/v2/projects/${projectId}/latest?clientId=${this.clientId}`);
    return await response.text();
};

Cloud.prototype.exportRole = async function(projectId=this.projectId, roleId=this.roleId) {
    const response = await fetch(`/api/v2/projects/${projectId}/${roleId}/latest?clientId=${this.clientId}`);
    return await response.text();
};

// Cloud: user messages (to be overridden)

Cloud.prototype.message = function (string) {
    alert(string);
};

class CloudError extends Error {
    constructor(label, message) {
        super(message);
        this.label = label;
    }
}

