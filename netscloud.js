/* global localize, SERVER_URL, nop, Cloud, SnapActions */
NetCloud.prototype = new Cloud();

function NetCloud(clientId, url) {
    this.clientId = clientId;
    Cloud.call(this, url);
}

NetCloud.prototype.login = function (
    username,
    password,
    remember,
    callBack,
    errorCall
) {
    // both callBack and errorCall are two-argument functions
    var request = new XMLHttpRequest(),
        usr = JSON.stringify({
            __h: password,
            __u: username,
            remember: remember,
            socketId: SnapCloud.clientId
        }),
        myself = this;
    this.setRoute(username);
    try {
        request.open(
            'POST',
            (this.hasProtocol() ? '' : 'http://') +
                this.url +
                '?SESSIONGLUE=' +
                this.route,
            true
        );
        request.setRequestHeader(
            'Content-Type',
            'application/json; charset=utf-8'
        );
        // glue this session to a route:
        request.setRequestHeader('SESSIONGLUE', this.route);
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    myself.api = myself.parseAPI(request.responseText);
                    // Update session info
                    myself.session = true;
                    if (myself.api.logout) {
                        myself.username = username;
                        myself.password = password;
                        callBack.call(null, myself.api, 'NetsBlox Cloud');
                    } else {
                        errorCall.call(
                            null,
                            request.responseText,
                            'connection failed'
                        );
                    }
                } else if (request.status === 403) {
                    errorCall.call(
                        null,
                        '',
                        localize(request.responseText || 'wrong username or password')
                    );
                } else {
                    errorCall.call(
                        null,
                        myself.url,
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(usr);
    } catch (err) {
        errorCall.call(this, err.toString(), 'NetsBlox Cloud');
    }
};

NetCloud.prototype.cloneRole = function(onSuccess, onFail, args) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'cloneRole',
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

NetCloud.prototype.moveToRole = function(dstId, onSuccess, onFail) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'moveToRole',
                onSuccess,
                onFail,
                [myself.projectId, dstId, myself.clientId]
            );
        },
        function(err) {
            myself.ide.showMessage(err, 2);
        }
    );
};

NetCloud.prototype.invitationResponse = function (id, accepted, onSuccess, onFail) {
    var myself = this,
        args = [id, accepted, SnapCloud.clientId];

    this.reconnect(
        function () {
            myself.callService(
                'invitationResponse',
                function(response) {
                    var project = response[0];
                    if (accepted) {
                        myself.setProjectID(project.ProjectID);
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

NetCloud.prototype.inviteGuest = function () {
    var myself = this,
        args = arguments;

    this.reconnect(
        function () {
            myself.callService(
                'inviteGuest',
                nop,
                nop,
                args
            );
        },
        nop
    );
};

NetCloud.prototype.inviteToCollaborate = function () {
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

NetCloud.prototype.joinActiveProject = function (id, callback, onError) {
    var myself = this;
    this.callService(
        'joinActiveProject',
        function(response) {
            // Update the projectID
            var projectInfo = response[0];
            myself.setProjectID(projectInfo.ProjectID);
            callback(projectInfo);
        },
        onError,
        [id]
    );
};

NetCloud.prototype.evictCollaborator = function (id) {
    var myself = this,
        args = [SnapCloud.clientId, id];

    this.reconnect(
        function () {
            myself.callService(
                'evictCollaborator',
                nop,
                nop,
                args
            );
        },
        nop
    );
};

NetCloud.prototype.collabResponse = function (id, accepted, onSuccess, onFail) {
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

NetCloud.prototype.getFriendList = function (callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'getFriendList',
                function (response, url) {
                    var ids = Object.keys(response[0] || {});
                    ids = ids.map(function(id) {
                        return {
                            username: id
                        };
                    });
                    callBack.call(null, ids, url);
                },
                errorCall
            );
        },
        errorCall
    );
};

NetCloud.prototype.getCollaboratorList = function (callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'getCollaborators',
                function (response, url) {
                    var usernames = Object.keys(response[0] || {}),
                        users = [];

                    for (var i = usernames.length; i--;) {
                        users.push({
                            username: usernames[i],
                            collaborating: response[0][usernames[i]] !== 'false',
                            value: response[0][usernames[i]]
                        });
                    }
                    callBack.call(null, users, url);
                },
                errorCall,
                [SnapCloud.clientId]
            );
        },
        errorCall
    );
};

NetCloud.prototype.deleteRole = function(onSuccess, onFail, args) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'deleteRole',
                function () {
                    onSuccess.call(null);
                },
                onFail,
                args
            );
        },
        onFail
    );
};

NetCloud.prototype.evictUser = function(onSuccess, onFail, args) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'evictUser',
                onSuccess.bind(null),
                onFail,
                args
            );
        },
        onFail
    );
};

// Override
NetCloud.prototype.saveProject = function (ide, callBack, errorCall, overwrite, name) {
    var myself = this,
        serialized = ide.sockets.getSerializedProject();

    myself.reconnect(
        function () {
            myself.callService(
                'saveProject',
                function (response, url) {
                    myself.setProjectID(response.projectId);
                    callBack.call(null, response, url);
                },
                errorCall,
                [
                    ide.room.getCurrentRoleName(),
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

// FIXME: I shouldn't have to override this...
NetCloud.prototype.callService = function (
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
        stickyUrl = this.url + '/' + service.url;

        request.open(service.method, stickyUrl, true);
        request.withCredentials = true;
        request.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded'
        );
        //request.setRequestHeader('MioCracker', this.session);
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
                if (serviceName === 'login') {
                    myself.api = myself.parseAPI(request.responseText);
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

NetCloud.prototype.reconnect = function (callback, errorCall) {
    if (!(this.username && this.password)) {
        this.message('You are not logged in');
        return;
    }
    this.login(
        this.username,
        this.password,
        undefined,
        callback,
        errorCall
    );
};

NetCloud.prototype.disconnect = nop;

NetCloud.prototype.logout = function (callBack, errorCall) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'logout',
                callBack,
                errorCall,
                [myself.clientId]
            );
            myself.clear();
        },
        errorCall
    );
};

NetCloud.prototype.signup = function (
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

NetCloud.prototype.isProjectActive = function (projectId, callBack, errorCall) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'isProjectActive',
                function(response) {
                    var isActive = response[0].active === 'true';

                    return callBack(isActive);
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

NetCloud.prototype.hasConflictingStoredProject = function (name, callBack, errorCall) {
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

NetCloud.prototype.saveProjectCopy = function(callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'saveProjectCopy',
                function (response, url) {
                    myself.setProjectID(response.projectId);
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

NetCloud.prototype.request = function (url, dict) {
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

NetCloud.prototype.setProjectID = function (id) {
    this.projectId = id;
};

NetCloud.prototype.newProject = function (name) {
    var myself = this,
        data = {
            clientId: SnapCloud.clientId,
            name: name || ''
        };

    if (!this.newProjectRequest) {
        this.newProjectRequest = this.request('/api/newProject', data)
            .then(function(result) {
                myself.setProjectID(result.projectId);
                myself.newProjectRequest = null;
                return result;
            })
            .catch(function(req) {
                myself.setProjectID(myself.clientId + '-' + Date.now());
                myself.newProjectRequest = null;
                throw new Error(req.responseText);
            });
    }

    return this.newProjectRequest;
};

NetCloud.prototype.setClientState = function (room, role, owner, actionId) {
    var myself = this,
        newProjectRequest = this.newProjectRequest || Promise.resolve();

    return newProjectRequest
        .then(function() {
            var data = {
                clientId: myself.clientId,
                projectId: myself.projectId,
                roomName: room,
                roleName: role,
                owner: owner,
                actionId: actionId
            };
            return myself.request('/api/setClientState', data);
        })
        .then(function(result) {
            // Only change the project ID if no other moves/newProjects/etc have occurred
            myself.setProjectID(result.projectId);
            return result;
        })
        .catch(function(req) {
            myself.setProjectID(myself.clientId + '-' + Date.now());
            throw new Error(req.responseText);
        });
};

NetCloud.prototype.setProjectName = function(name) {
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
            return result.name;
        });
};

NetCloud.prototype.importProject = function (name, role, roles) {
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
            myself.setProjectID(result.projectId);
            return result;
        })
        .catch(function(req) {
            myself.setProjectID(myself.clientId + '-' + Date.now());
            throw new Error(req.responseText);
        });
};

var SnapCloud = new NetCloud(SnapCloud.clientId, SERVER_URL + '/api/');
