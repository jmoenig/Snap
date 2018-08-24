/* global localize, SERVER_URL, nop, Cloud, CLIENT_ID */
NetCloud.prototype = new Cloud();

function NetCloud(clientId, url) {
    this.clientId = clientId;
    this.roleId = null;
    Cloud.call(this, url);
    this.api = null;
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
            projectId: this.projectId,
            __h: password,
            __u: username,
            remember: remember,
            clientId: SnapCloud.clientId
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
                    myself.api = JSON.parse(request.responseText);
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

NetCloud.prototype.addRole = function(name, onSuccess, onFail) {
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

NetCloud.prototype.renameRole = function(roleId, name, onSuccess, onFail) {
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

NetCloud.prototype.cloneRole = function(roleName, onSuccess, onFail) {
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

NetCloud.prototype.inviteGuest = function (userId, roleId) {
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
            myself.setLocalState(projectInfo.ProjectID, projectInfo.RoleID);
            callback(projectInfo);
        },
        onError,
        [id]
    );
};

NetCloud.prototype.evictCollaborator = function (id) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'evictCollaborator',
                nop,
                nop,
                [id, myself.projectId]
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
                function (usernames) {
                    callBack(usernames);
                },
                errorCall
            );
        },
        errorCall
    );
};

NetCloud.prototype.getProject = function (id, callBack, errorCall, roleId) {
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

NetCloud.prototype.getProjectByName = function (owner, name, callBack, errorCall) {
    var myself = this;

    this.reconnect(
        function () {
            myself.callService(
                'getProjectByName',
                function (response) {
                    var xml = response[0];
                    myself.setLocalState(xml.ProjectID, xml.RoleID);
                    callBack(xml);
                },
                errorCall,
                [owner, name]
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
                callBack,
                errorCall,
                [myself.projectId]
            );
        },
        errorCall
    );
};

NetCloud.prototype.deleteRole = function(roleId, onSuccess, onFail) {
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

NetCloud.prototype.evictUser = function(userId, onSuccess, onFail) {
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

// Override
NetCloud.prototype.saveProject = function (ide, callBack, errorCall, overwrite, name) {
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

NetCloud.prototype.reconnect = function (callback, errorCall) {
    var myself = this;

    if (!(this.username && this.password)) {
        this.message('You are not logged in');
        return;
    }

    console.log('reconnecting...', myself.projectId);
    // need to set 'api' from setClientState
    return myself.setClientState()
        .then(() => console.log('reconnected!', myself.projectId))
        .then(callback)
        .catch(errorCall);
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

NetCloud.prototype.setLocalState = function (projectId, roleId) {
    this.projectId = projectId;
    this.roleId = roleId;
};

NetCloud.prototype.resetLocalState = function () {
    var baseId = this.clientId + '-' + Date.now();
    var projectId = 'tmp-project-id-' + baseId;
    var roleId = 'tmp-role-id-' + baseId;
    this.setLocalState(projectId, roleId);
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

NetCloud.prototype.getClientState = function () {
    return {
        username: this.username,
        clientId: this.clientId,
        projectId: this.projectId,
        roleId: this.roleId
    };
};

NetCloud.prototype.setClientState = function (room, role, actionId) {
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
            return result;
        })
        .catch(req => {
            var connError = 'Could not connect to ' + myself.url;
            throw new Error(req.responseText || connError);
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
            myself.setLocalState(result.projectId, result.roleId);
            return result.state;
        })
        .catch(function(req) {
            myself.resetLocalState();
            throw new Error(req.responseText);
        });
};

NetCloud.prototype.getEntireProject = function(projectId, callback, errorCall) {
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

var SnapCloud = new NetCloud(CLIENT_ID, SERVER_URL + '/api/');
