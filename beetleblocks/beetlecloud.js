// Beetle Blocks cloud
// Inspired in Snap! cloud

function BeetleCloud (url) {
    this.init(url);
};

BeetleCloud.prototype.init = function (url) {
    this.url = url;
    this.checkCredentials();
};

BeetleCloud.prototype.parseDict = Cloud.prototype.parseDict;
BeetleCloud.prototype.encodeDict = Cloud.prototype.encodeDict;

BeetleCloud.prototype.clear = function () {
    this.username = null;
};

BeetleCloud.prototype.get = function (path, callBack, errorCall, errorMsg) {
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
                    if (!response.error) {
                        callBack.call(null, response);
                    } else {
                        errorCall.call(
                            null,
                            response.error,
                            errorMsg
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url,
                        errorMsg
                    );
                }
            }
        };
        request.send();
    } catch (err) {
        errorCall.call(this, err.toString(), 'BeetleCloud');
    }

};

BeetleCloud.prototype.post = function (path, body, callBack, errorCall, errorMsg) {
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
                    if (response.error) {
                        errorCall.call(
                            this,
                            response.error,
                            'BeetleCloud'
                        );
                    } else {
                        callBack.call(
                            null,
                            response.text,
                            'BeetleCloud'
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + path,
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(body);
    } catch (err) {
        errorCall.call(this, err.toString(), 'BeetleCloud');
    }

};

BeetleCloud.prototype.getCurrentUser = function (callback, errorCallback) {
    this.get('/user', callback, errorCallback, 'Could not retrieve current user');
};

BeetleCloud.prototype.checkCredentials = function (callback, errorCallback) {
    var myself = this;
    this.getCurrentUser(
            function (user) { 
                if (user.username) {
                    myself.username = user.username;
                }
                if (callback) { callback.call(null, user); }
            },
            errorCallback);
};

BeetleCloud.prototype.logout = function (callBack, errorCall) {
    this.get('/users/logout', callBack, errorCall, 'logout failed');
};

BeetleCloud.prototype.shareProject = function (shareOrNot, projectName, callBack, errorCall) {
    var myself = this;

    this.checkCredentials(
            function (user) {
                if (user.username) { 
                    myself.get('/users/' + encodeURIComponent(user.username)
                            + '/projects/' + encodeURIComponent(projectName)
                            + '/visibility?ispublic=' + shareOrNot, // path
                            callBack, // ok callback
                            errorCall, // error callback
                            (shareOrNot ? 'S' : 'Uns') + 'haring failed'); // error message
                } else {
                    errorCall.call(this, 'You are not logged in', 'BeetleCloud');
                }
            },
            errorCall
            );
};

BeetleCloud.prototype.saveProject = function (ide, callBack, errorCall) {
    var myself = this;

    ide.stage.reRender();

    this.checkCredentials(
            function (user) {
                if (user.username) {
                    var pdata = ide.serializer.serialize(ide.stage);
                    // check if serialized data can be parsed back again
                    try {
                        ide.serializer.parse(pdata);
                    } catch (err) {
                        ide.showMessage('Serialization of program data failed:\n' + err);
                        throw new Error('Serialization of program data failed:\n' + err);
                    }

                    ide.showMessage('Uploading project...'); 

                    //(path, body, callBack, errorCall, errorMsg)
                    myself.post(
                            '/projects/save?projectname='
                            + encodeURIComponent(ide.projectName)
                            + '&username='
                            + encodeURIComponent(myself.username)
                            + '&ispublic=false', // path
                            pdata, // body
                            callBack,
                            errorCall,
                            'Project could not be saved' // error message
                            )

                } else {
                    errorCall.call(this, 'You are not logged in', 'BeetleCloud');
                    return;
                }
            }
    );

};

// Backwards compatibility with old cloud, to be removed

BeetleCloud.prototype.getPublicProject = function (
    id,
    callBack,
    errorCall
) {
    // id is Username=username&projectName=projectname,
    // where the values are url-component encoded
    // callBack is a single argument function, errorCall takes two args

    var parsedId = id.split('&').map(function(each){return each.split('=')[1]}),
        username = decodeURIComponent(parsedId[0]),
        projectName = decodeURIComponent(parsedId[1]);

    this.fetchProject(projectName, callBack, errorCall, username);
};

BeetleCloud.prototype.fetchProject = function (projectName, callBack, errorCall, publicUsername) {
    var myself = this;

    this.checkCredentials(
            function (user) {
                var username = publicUsername || user.username;
                if (!username) {
                    errorCall.call(this, 'Project could not be fetched', 'BeetleCloud');
                    return;
                } else {
                    myself.get(
                            '/users/'
                            + encodeURIComponent(username)
                            + '/projects/'
                            + encodeURIComponent(projectName),
                            function (response) { callBack.call(null, response.contents); },
                            errorCall,
                            'Could not fetch project'
                            )
                }
            },
            errorCall
            );
};

BeetleCloud.prototype.deleteProject = function (projectName, callBack, errorCall) {
    var myself = this;

    this.checkCredentials(
            function (user) {
                if (!user.username) {
                    errorCall.call(this, 'You are not logged in', 'BeetleCloud');
                    return;
                } else {
                    myself.get(
                            '/users/'
                            + encodeURIComponent(user.username)
                            + '/projects/'
                            + encodeURIComponent(projectName)
                            + '/delete',
                            function (response) { callBack.call(null, response.text); },
                            errorCall,
                            'Could not delete project'
                            );
                }
            },
            errorCall
            );
}

BeetleCloud.prototype.getProjectList = function (callBack, errorCall) {
    var myself = this;

    this.checkCredentials(
            function (user) {
                if (!user.username) {
                    errorCall.call(this, 'You are not logged in', 'BeetleCloud');
                    return;
                } else {
                    myself.get(
                            '/users/'
                            + encodeURIComponent(myself.username)
                            + '/projects',
                            function (response) { 
                                if (Object.keys(response).length > 0) {
                                    response.forEach(function(eachProject) {
                                        // This looks absurd, but PostgreSQL doesn't respect case
                                        eachProject.Public = eachProject.ispublic ? 'true' : 'false'; // compatibility with old cloud
                                        eachProject.ProjectName = eachProject.projectname;
                                        eachProject.Thumbnail = eachProject.thumbnail;
                                        eachProject.Updated = eachProject.updated;
                                        eachProject.Notes = eachProject.notes;
                                    });
                                    callBack.call(null, response);
                                } else {
                                    callBack.call(null, []);
                                } 
                            },
                            errorCall,
                            'Could not fetch project list'
                            );
                }
            },
            errorCall
            );
};


// Backwards compatibility with old cloud
// To be removed when we finish moving to the new cloud
BeetleCloud.prototype.parseResponse = function (usr) {
    return [{ username: usr, password: 'nope' }];
};

var SnapCloud = new BeetleCloud(
    '/api' // To be changed to HTTPS
);
