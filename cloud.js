/*

    cloud.js

    a backend API for SNAP!

    written by Bernat Romagosa
    inspired by the original cloud API by Jens Mönig

    Copyright (C) 2018 by Bernat Romagosa
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

/*global modules, SnapSerializer, nop, hex_sha512, DialogBoxMorph, Color,
normalizeCanvas _, _nop, _expr */

modules.cloud = '2018-March-02';

// Global stuff

var Cloud;
var SnapCloud;

// Cloud /////////////////////////////////////////////////////////////

function Cloud(url) {
    this.init(url);
}

Cloud.prototype.init = function (url) {
    this.url = url;
    this.username = null;
};

SnapCloud = new Cloud('https://cloud.snap.berkeley.edu');

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

// Error handling

Cloud.genericErrorMessage = _nop(
    'There was an error while trying to access\n' +
    'a {{ cloudName }} service. Please try again later.'
);

Cloud.prototype.genericError = function () {
    throw new Error(_expr(Cloud.genericErrorMessage, 'Snap!Cloud'));
};

// Low level functionality

Cloud.prototype.request = function (
    method,
    path,
    onSuccess,
    onError,
    errorMsg,
    wantsRawResponse,
    body) {

    var request = new XMLHttpRequest(),
        myself = this;

    try {
        request.open(
            method,
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
                    var response =
                        (!wantsRawResponse ||
                        (request.responseText.indexOf('{"errors"') === 0)) ?
                            JSON.parse(request.responseText) :
                            request.responseText;

                    if (response.errors) {
                       onError.call(
                            null,
                            response.errors[0],
                            errorMsg
                        );
                    } else {
                        if (onSuccess) {
                            onSuccess.call(null, response.message || response);
                        }
                    }
                } else {
                    if (onError) {
                        onError.call(
                            null,
                            errorMsg || _expr(Cloud.genericErrorMessage, 'Snap!Cloud'),
                            myself.url
                        );
                    } else {
                        myself.genericError();
                    }
                }
            }
        };
        request.send(body);
    } catch (err) {
        onError.call(this, err.toString(), _('Cloud Error'));
    }
};

Cloud.prototype.withCredentialsRequest = function (
    method,
    path,
    onSuccess,
    onError,
    errorMsg,
    wantsRawResponse,
    body) {

    var myself = this;
    this.checkCredentials(
        function (username) {
            if (username) {
                myself.request(
                    method,
                    // %username is replaced by the actual username
                    path.replace('%username', encodeURIComponent(username)),
                    onSuccess,
                    onError,
                    errorMsg,
                    wantsRawResponse,
                    body);
            } else {
                onError.call(
                    this,
                    _('You are not logged in'),
                    'Snap!Cloud'
                );
            }
        }
    );
};

// Credentials management

Cloud.prototype.initSession = function (onSuccess) {
    var myself = this;
    this.request(
        'POST',
        '/init',
        function () { myself.checkCredentials(onSuccess); },
        nop,
        null,
        true
    );
};

Cloud.prototype.checkCredentials = function (onSuccess, onError, response) {
    var myself = this;
    this.getCurrentUser(
        function (user) {
            if (user.username) {
                myself.username = user.username;
                myself.verified = user.verified;
            }
            if (onSuccess) {
            	onSuccess.call(
                    null,
                    user.username,
                    user.isadmin,
                    response ? JSON.parse(response) : null
                );
            }
        },
        onError
    );
};

Cloud.prototype.getCurrentUser = function (onSuccess, onError) {
    this.request(
    	'GET',
        '/users/c',
        onSuccess,
        onError,
        _('Could not retrieve current user')
    );
};

Cloud.prototype.getUser = function (username, onSuccess, onError) {
    this.request(
    	'GET',
        '/users/' + encodeURIComponent(username),
        onSuccess,
        onError,
        _('Could not retrieve user')
    );
};

Cloud.prototype.logout = function (onSuccess, onError) {
    this.username = null;
    this.request(
        'POST',
        '/logout',
        onSuccess,
        onError,
        _('logout failed')
    );
};

Cloud.prototype.login = function (
	username,
    password,
    persist,
    onSuccess,
    onError
) {
    var myself = this;
    this.request(
        'POST',
        '/users/' + encodeURIComponent(username) + '/login?' +
            this.encodeDict({
                persist: persist
            }),
        function (response) {
            myself.checkCredentials(onSuccess, onError, response);
        },
        onError,
        _('login failed'),
        'false', // wants raw response
        hex_sha512(password) // password travels inside the body
    );
};

Cloud.prototype.signup = function (
	username,
    password,
    passwordRepeat,
    email,
    onSuccess,
    onError
) {
    this.request(
        'POST',
        '/users/' + encodeURIComponent(username) + '?' + this.encodeDict({
            email: email,
            password: hex_sha512(password),
            password_repeat: hex_sha512(passwordRepeat)
        }),
        onSuccess,
        onError,
        _('signup failed')
    );
};

Cloud.prototype.changePassword = function (
	password,
    newPassword,
    passwordRepeat,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/%username/newpassword?' + this.encodeDict({
            oldpassword: hex_sha512(password),
            password_repeat: hex_sha512(passwordRepeat),
            newpassword: hex_sha512(newPassword)
        }),
        onSuccess,
        onError,
        _('Could not change password')
    );

};

Cloud.prototype.resetPassword = function (username, onSuccess, onError) {
    this.request(
        'POST',
        '/users/' + encodeURIComponent(username) + '/password_reset',
        onSuccess,
        onError,
        _('Password reset request failed')
    );
};

Cloud.prototype.resendVerification = function (username, onSuccess, onError) {
    this.request(
        'POST',
        '/users/' + encodeURIComponent(username) + '/resendverification',
        onSuccess,
        onError,
        _('Could not send verification email')
    );
};


// Projects

Cloud.prototype.saveProject = function (ide, onSuccess, onError) {
    var myself = this;
    this.checkCredentials(
        function (username) {
            if (username) {
                var xml = ide.serializer.serialize(ide.stage),
                    thumbnail = normalizeCanvas(
                    	ide.stage.thumbnail(
                        	SnapSerializer.prototype.thumbnailSize
                    )).toDataURL(),
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
                        'Snap!Cloud - ' + _('Cannot Save Project'),
                        _(
                            'The media inside this project exceeds {{ size }}.\n' +
                            'Please reduce the size of costumes or sounds.\n',
                            '10 MB'
                        ),
                        ide.world(),
                        ide.cloudIcon(null, new Color(180, 0, 0))
                    );
                    throw new Error(_(
                        'Project media exceeds {{ size }} size limit',
                        '10 MB'
                    ));
                }

                // check if serialized data can be parsed back again
                try {
                    ide.serializer.parse(body.xml);
                } catch (err) {
                    ide.showMessage(
                        _('Serialization of program data failed:') + '\n' + err
                    );
                    throw new Error(
                        _('Serialization of program data failed:') + '\n' + err
                    );
                }
                if (body.media !== null) {
                    try {
                        ide.serializer.parse(body.media);
                    } catch (err) {
                        ide.showMessage(
                            _('Serialization of media failed:') + '\n' + err
                        );
                        throw new Error(
                            _('Serialization of media failed:') + '\n' + err
                        );
                    }
                }
                ide.serializer.isCollectingMedia = false;
                ide.serializer.flushMedia();

                ide.showMessage(_(
                    'Uploading {{ size }}...',
                    Math.round(size / 1024) + ' KB'
                ));

                myself.request(
                    'POST',
                    '/projects/' + encodeURIComponent(username) + '/' + encodeURIComponent(ide.projectName),
                    onSuccess,
                    onError,
                    _('Project could not be saved'),
                    false,
                    JSON.stringify(body) // POST body
                );
            } else {
                onError.call(
                    this,
                    _('You are not logged in'),
                    'Snap!Cloud'
                );
            }
        }
    );
};

Cloud.prototype.getProjectList = function (onSuccess, onError, withThumbnail) {
    var path = '/projects/%username?updatingnotes=true';

    if (withThumbnail) {
        path += '&withthumbnail=true';
    }

    this.withCredentialsRequest(
        'GET',
        path,
        onSuccess,
        onError,
        _('Could not fetch projects')
    );
};

Cloud.prototype.getPublishedProjectList = function (
	username,
    page,
    pageSize,
    searchTerm,
    onSuccess,
    onError,
    withThumbnail
) {
    var path = '/projects' +
    		(username ? '/' + encodeURIComponent(username) : '') +
	        '?ispublished=true';

    if (withThumbnail) {
        path += '&withthumbnail=true';
    }

    if (page) {
        path += '&page=' + page + '&pagesize=' + (pageSize || 16);
    }

    if (searchTerm) {
        path += '&matchtext=' + encodeURIComponent(searchTerm);
    }

    this.request(
        'GET',
        path,
        onSuccess,
        onError,
        _('Could not fetch projects')
    );
};

Cloud.prototype.getThumbnail = function (
	username,
    projectName,
    onSuccess,
    onError
) {
    this[username ? 'request' : 'withCredentialsRequest'](
        'GET',
        '/projects/' +
            (username ? encodeURIComponent(username) : '%username') +
            '/' +
            encodeURIComponent(projectName) +
            '/thumbnail',
        onSuccess,
        onError,
        _('Could not fetch thumbnail'),
        true
    );
};

Cloud.prototype.getProject = function (projectName, onSuccess, onError) {
    this.withCredentialsRequest(
        'GET',
        '/projects/%username/' + encodeURIComponent(projectName),
        onSuccess,
        onError,
        _('Could not fetch project {{ name }}', projectName),
        true
    );
};

Cloud.prototype.getPublicProject = function (
	projectName,
    username,
    onSuccess,
    onError
) {
    this.request(
        'GET',
        '/projects/' + encodeURIComponent(username) + '/' + encodeURIComponent(projectName),
        onSuccess,
        onError,
        _('Could not fetch project {{ name }}', projectName),
        true
    );
};

Cloud.prototype.getProjectMetadata = function (
	projectName,
    username,
    onSuccess,
    onError
) {
    this.request(
        'GET',
        '/projects/' + encodeURIComponent(username) + '/' + encodeURIComponent(projectName) + '/metadata',
        onSuccess,
        onError,
        _('Could not fetch metadata for {{ name }}', projectName)
    );
};

Cloud.prototype.deleteProject = function (
	projectName,
    username,
    onSuccess,
    onError
) {
    this[username ? 'request' : 'withCredentialsRequest'](
        'DELETE',
        '/projects/' + (username ? encodeURIComponent(username) : '%username') +
        '/' + encodeURIComponent(projectName),
        onSuccess,
        onError,
        _('Could not delete project')
    );
};

Cloud.prototype.shareProject = function (
	projectName,
    username,
    onSuccess,
    onError
) {
    this[username ? 'request' : 'withCredentialsRequest'](
        'POST',
        '/projects/' +
            (username ? encodeURIComponent(username) : '%username') +
            '/' + encodeURIComponent(projectName) +
            '/metadata?ispublic=true',
        onSuccess,
        onError,
        _('Could not share project')
    );
};

Cloud.prototype.unshareProject = function (
	projectName,
    username,
    onSuccess,
    onError
) {
    this[username ? 'request' : 'withCredentialsRequest'](
        'POST',
        '/projects/' +
            (username ? encodeURIComponent(username) : '%username') +
            '/' + encodeURIComponent(projectName) +
            '/metadata?ispublic=false&ispublished=false',
        onSuccess,
        onError,
        _('Could not unshare project')
    );
};

Cloud.prototype.publishProject = function (
	projectName,
    username,
    onSuccess,
    onError
) {
    this[username ? 'request' : 'withCredentialsRequest'](
        'POST',
        '/projects/' +
            (username ? encodeURIComponent(username) : '%username') +
            '/' + encodeURIComponent(projectName) +
            '/metadata?ispublished=true',
        onSuccess,
        onError,
        _('Could not publish project')
    );
};

Cloud.prototype.unpublishProject = function (
	projectName,
    username,
    onSuccess,
    onError
) {
    this[username ? 'request' : 'withCredentialsRequest'](
        'POST',
        '/projects/' +
            (username ? encodeURIComponent(username) : '%username') +
            '/' + encodeURIComponent(projectName) +
            '/metadata?ispublished=false',
        onSuccess,
        onError,
        _('Could not unpublish project')
    );
};

Cloud.prototype.updateNotes = function (
	projectName,
    notes,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/projects/%username/' + encodeURIComponent(projectName) + '/metadata',
        onSuccess,
        onError,
        _('Could not update project notes'),
        false, // wants raw response
        JSON.stringify({ notes: notes })
    );
};

