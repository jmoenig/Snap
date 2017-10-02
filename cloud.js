/*

    cloud.js

    a backend API for SNAP!

    written by Bernat Romagosa
    inspired in the old cloud API by Jens Mönig

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

// TODO: refactor all these

Cloud.prototype.get = function (path, onSuccess, onError, errorMsg, wantsRawResponse) {
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
                    var response = wantsRawResponse ?
                        request.responseText :
                        JSON.parse(request.responseText);
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

Cloud.prototype.doDelete = function (path, onSuccess, onError, errorMsg) {
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open(
            'DELETE',
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
        onError
    );
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
        'logout failed'
    );
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

// Projects

Cloud.prototype.saveProject = function (ide, onSuccess, onError) {
    var myself = this;

    this.checkCredentials(
        function (username) {
            if (username) {
                var xml = ide.serializer.serialize(ide.stage),
                    thumbnail = ide.stage.thumbnail(
                        SnapSerializer.prototype.thumbnailSize).toDataURL(),
                    body, mediaSize, size;

                ide.serializer.isCollectingMedia = true;
                body = {
                    notes: ide.projectNotes,
                    xml: xml,
                    media: ide.hasChangedMedia ?
                        ide.serializer.mediaXML(ide.projectName) : null,
                    thumbnail: thumbnail
                };
                ide.serializer.isCollectingMedia = false;
                ide.serializer.flushMedia();

                mediaSize = body.media ? body.media.length : 0;
                size = body.xml.length + mediaSize;
                if (mediaSize > 10485760) {
                    new DialogBoxMorph().inform(
                        'Snap!Cloud - Cannot Save Project',
                        'The media inside this project exceeds 10 MB.\n' +
                            'Please reduce the size of costumes or sounds.\n',
                        ide.world(),
                        ide.cloudIcon(null, new Color(180, 0, 0))
                    );
                    throw new Error('Project media exceeds 10 MB size limit');
                }

                // check if serialized data can be parsed back again
                try {
                    ide.serializer.parse(body.xml);
                } catch (err) {
                    ide.showMessage('Serialization of program data failed:\n' + err);
                    throw new Error('Serialization of program data failed:\n' + err);
                }
                if (body.media !== null) {
                    try {
                        ide.serializer.parse(body.media);
                    } catch (err) {
                        ide.showMessage('Serialization of media failed:\n' + err);
                        throw new Error('Serialization of media failed:\n' + err);
                    }
                }
                ide.serializer.isCollectingMedia = false;
                ide.serializer.flushMedia();

                ide.showMessage('Uploading ' + Math.round(size / 1024) + ' KB...');

                myself.post(
                    '/projects/' + username + '/' +
                    ide.projectName,
                    JSON.stringify(body), // POST body
                    onSuccess,
                    onError,
                    'Project could not be saved'
                );

            } else {
                onError.call(this, 'You are not logged in', 'Snap!Cloud');
            }
        }
    );
};

// TODO: refactor all these

Cloud.prototype.getProjectList = function (onSuccess, onError) {
    var myself = this;

    this.checkCredentials(
        function (username) {
            if (username) {
                myself.get(
                    '/projects/' + username,
                    onSuccess,
                    onError,
                    'Could not fetch projects'
                );
            } else {
                onError.call(this, 'You are not logged in', 'Snap!Cloud');
            }
        }
    );
};

Cloud.prototype.getThumbnail = function (projectName, onSuccess, onError) {
    var myself = this;

    this.checkCredentials(
        function (username) {
            if (username) {
                myself.get(
                    '/projects/' + username + '/' + projectName + '/thumbnail',
                    onSuccess,
                    onError,
                    'Could not fetch thumbnail',
                    true // raw response contents
                );
            } else {
                onError.call(this, 'You are not logged in', 'Snap!Cloud');
            }
        }
    );
};

Cloud.prototype.getRawProject = function (projectName, onSuccess, onError) {
    var myself = this;

    this.checkCredentials(
        function (username) {
            if (username) {
                myself.get(
                    '/projects/' + username + '/' + projectName,
                    onSuccess,
                    onError,
                    'Could not fetch project',
                    true // raw response contents
                );
            } else {
                onError.call(this, 'You are not logged in', 'Snap!Cloud');
            }

        }
    );
};

Cloud.prototype.deleteProject = function (projectName, onSuccess, onError) {
    var myself = this;

    this.checkCredentials(
        function (username) {
            if (username) {
                myself.doDelete(
                    '/projects/' + username + '/' + projectName,
                    onSuccess,
                    onError
                );
            } else {
                onError.call(this, 'You are not logged in', 'Snap!Cloud');
            }

        }
    );
};

var SnapCloud = new Cloud('http://localhost:8080');
