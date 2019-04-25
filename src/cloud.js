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
// cloud.js should be able to exist indepent of Snap!
// (The module date is included for simplicity, but is not needed elsewhere.)

/*global modules, hex_sha512*/

modules = modules || {};
modules.cloud = '2019-April-25';

// Global stuff

var Cloud;

// Cloud /////////////////////////////////////////////////////////////

function Cloud() {
    this.init();
}

Cloud.prototype.init = function () {
    this.urlBasePath = '/api/v1';
    this.url = this.determineCloudDomain() + this.urlBasePath;
    this.username = null;
};

// Projects larger than this are rejected.
Cloud.MAX_FILE_SIZE = 10 * 1024 * 1024;

Cloud.prototype.knownDomains = {
    'Snap!Cloud' : 'https://cloud.snap.berkeley.edu',
    'Snap!Cloud (cs10)' : 'https://snap-cloud.cs10.org',
    'Snap!Cloud (staging)': 'https://snap-staging.cs10.org',
    'localhost': 'http://localhost:8080',
    'localhost (secure)': 'https://localhost:4431'
};

Cloud.prototype.defaultDomain = Cloud.prototype.knownDomains['Snap!Cloud'];

Cloud.prototype.determineCloudDomain = function () {
    // We dynamically determine the domain of the cloud server.
    // This allows for easy mirrors and development servers.
    // The domain is determined by:
    // 1. <meta name='snap-cloud-domain' location="X"> in snap.html.
    // 2. The current page's domain
    var currentDomain = window.location.host, // host includes the port.
        metaTag = document.head.querySelector("[name='snap-cloud-domain']"),
        cloudDomain = this.defaultDomain,
        domainMap = this.knownDomains;

    if (metaTag) { return metaTag.getAttribute('location'); }

    Object.keys(domainMap).some(function (name) {
        var server = domainMap[name];
        if (Cloud.isMatchingDomain(currentDomain, server)) {
            cloudDomain = server;
            return true;
        }
        return false;
    });

    return cloudDomain;
};

Cloud.isMatchingDomain = function (client, server) {
    // A matching domain means that the client-server are not subject to
    // 3rd party cookie restrictions.
    // see https://tools.ietf.org/html/rfc6265#section-5.1.3
    // This matches a domain at end of a subdomain URL.
    var position = server.indexOf(client);
    switch (position) {
        case -1:
            return false;
        case 0:
            return client === server;
        default:
            return /[\.\/]/.test(server[position - 1]) &&
                server.length === position + client.length;
    }
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

// Error handling

Cloud.genericErrorMessage =
    'There was an error while trying to access\n' +
    'a Snap!Cloud service. Please try again later.';

Cloud.prototype.genericError = function () {
    throw new Error(Cloud.genericErrorMessage);
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
        myself = this,
        fullPath = this.url +
            (path.indexOf('%username') > -1 ?
                path.replace('%username', encodeURIComponent(this.username)) :
                path);

    try {
        request.open(
            method,
            fullPath,
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
                            errorMsg || Cloud.genericErrorMessage,
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
        onError.call(this, err.toString(), 'Cloud Error');
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
                    path,
                    onSuccess,
                    onError,
                    errorMsg,
                    wantsRawResponse,
                    body);
            } else {
                onError.call(this, 'You are not logged in', 'Snap!Cloud');
            }
        }
    );
};

// Credentials management

Cloud.prototype.initSession = function (onSuccess) {
    var myself = this;
    if (location.protocol === 'file:') {
        // disabled for now (jens)
        return;
    }
    this.request(
        'POST',
        '/init',
        function () { myself.checkCredentials(onSuccess); },
        function () {},
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
                    user.role,
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
        'Could not retrieve current user'
    );
};

Cloud.prototype.getUser = function (username, onSuccess, onError) {
    this.request(
    	'GET',
        '/users/' + encodeURIComponent(username),
        onSuccess,
        onError,
        'Could not retrieve user'
    );
};

Cloud.prototype.logout = function (onSuccess, onError) {
    this.username = null;
    this.request(
        'POST',
        '/logout',
        onSuccess,
        onError,
        'logout failed'
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
        'login failed',
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
        'signup failed');
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
        'Could not change password'
    );
};

Cloud.prototype.resetPassword = function (username, onSuccess, onError) {
    this.request(
        'POST',
        '/users/' + encodeURIComponent(username) + '/password_reset',
        onSuccess,
        onError,
        'Password reset request failed'
    );
};

Cloud.prototype.resendVerification = function (username, onSuccess, onError) {
    this.request(
        'POST',
        '/users/' + encodeURIComponent(username) + '/resendverification',
        onSuccess,
        onError,
        'Could not send verification email'
    );
};


// Projects

Cloud.prototype.saveProject = function (projectName, body, onSuccess, onError) {
    // Expects a body object with the following paramters:
    // xml, media, thumbnail, remixID (optional), notes (optional)
    var myself = this;
    this.checkCredentials(
        function (username) {
            if (username) {
                myself.request(
                    'POST',
                    '/projects/' +
                        encodeURIComponent(username) +
                        '/' +
                        encodeURIComponent(projectName),
                    onSuccess,
                    onError,
                    'Project could not be saved',
                    false,
                    JSON.stringify(body) // POST body
                );
            } else {
                onError.call(this, 'You are not logged in', 'Snap!Cloud');
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
        'Could not fetch projects'
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
        'Could not fetch projects'
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
        'Could not fetch thumbnail',
        true
    );
};

Cloud.prototype.getProject = function (projectName, delta, onSuccess, onError) {
    this.withCredentialsRequest(
        'GET',
        '/projects/%username/' +
            encodeURIComponent(projectName) +
            (delta ? '?delta=' + delta : ''),
        onSuccess,
        onError,
        'Could not fetch project ' + projectName,
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
        '/projects/' +
            encodeURIComponent(username) +
            '/' +
            encodeURIComponent(projectName),
        onSuccess,
        onError,
        'Could not fetch project ' + projectName,
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
        '/projects/' +
            encodeURIComponent(username) +
            '/' +
            encodeURIComponent(projectName) +
            '/metadata',
        onSuccess,
        onError,
        'Could not fetch metadata for ' + projectName
    );
};

Cloud.prototype.getProjectVersionMetadata = function (
        projectName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'GET',
        '/projects/%username/' +
            encodeURIComponent(projectName) +
            '/versions',
        onSuccess,
        onError,
        'Could not fetch versions for project ' + projectName
    );
};

Cloud.prototype.getRemixes = function (
	username,
    projectName,
    page,
    pageSize,
    onSuccess,
    onError
) {
    var path = '/projects/' +
                encodeURIComponent(username) + '/' +
                encodeURIComponent(projectName) + '/remixes';

    if (page) {
        path += '?page=' + page + '&pagesize=' + (pageSize || 16);
    }

    this.request(
        'GET',
        path,
        onSuccess,
        onError,
        'Could not fetch remixes for project ' + projectName
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
        '/projects/' +
            (username ? encodeURIComponent(username) : '%username') +
            '/' +
            encodeURIComponent(projectName),
        onSuccess,
        onError,
        'Could not delete project'
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
            '/' +
            encodeURIComponent(projectName) +
            '/metadata?ispublic=true',
        onSuccess,
        onError,
        'Could not share project'
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
            '/' +
            encodeURIComponent(projectName) +
            '/metadata?ispublic=false&ispublished=false',
        onSuccess,
        onError,
        'Could not unshare project'
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
            '/' +
            encodeURIComponent(projectName) +
            '/metadata?ispublished=true',
        onSuccess,
        onError,
        'Could not publish project'
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
            '/' +
            encodeURIComponent(projectName) +
            '/metadata?ispublished=false',
        onSuccess,
        onError,
        'Could not unpublish project'
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
        '/projects/%username/' +
            encodeURIComponent(projectName) +
            '/metadata',
        onSuccess,
        onError,
        'Could not update project notes',
        false, // wants raw response
        JSON.stringify({ notes: notes })
    );
};

Cloud.prototype.updateProjectName = function (
	projectName,
    newName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/projects/%username/' +
            encodeURIComponent(projectName) +
            '/metadata',
        onSuccess,
        onError,
        'Could not update project name',
        false, // wants raw response
        JSON.stringify({ projectname: newName })
    );
};

// Collections

Cloud.prototype.newCollection = function (
        collectionName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/%username/collections/' + encodeURIComponent(collectionName),
        onSuccess,
        onError,
        'Could not create collection'
    );
};

Cloud.prototype.getCollectionMetadata = function (
        collectionUsername,
    collectionName,
    onSuccess,
    onError
) {
    this.request(
        'GET',
        '/users/' +
            (collectionUsername ?
                encodeURIComponent(collectionUsername) :
                '%username') +
            '/collections/' + encodeURIComponent(collectionName) +
            '/metadata',
        onSuccess,
        onError,
        'Could not fetch metadata for ' + collectionName
    );
};

Cloud.prototype.getCollectionProjects = function (
    collectionUsername,
    page,
    pageSize,
    collectionName,
    onSuccess,
    onError,
    withThumbnail
) {
    var path = '/users/' +
                (collectionUsername ?
                    encodeURIComponent(collectionUsername) :
                    '%username') +
                '/collections/' + encodeURIComponent(collectionName) +
                '/projects';

    if (page) {
        path += '?page=' + page + '&pagesize=' + (pageSize || 16);
    }

    if (withThumbnail) {
        path += (page ? '&' : '?') + 'withthumbnail=true';
    }

    this.request(
        'GET',
        path,
        onSuccess,
        onError,
        'Could not fetch projects'
    );
};

Cloud.prototype.setCollectionThumbnail = function (
    collectionUsername,
    collectionName,
    thumbnailId,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/thumbnail?id=' + encodeURIComponent(thumbnailId),
        onSuccess,
        onError,
        'Could not set project thumbnail'
    );
};

Cloud.prototype.updateCollectionDescription = function (
	collectionUsername,
    collectionName,
    description,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/metadata',
        onSuccess,
        onError,
        'Could not update collection description',
        false, // wants raw response
        JSON.stringify({ description: description })
    );
};

Cloud.prototype.updateCollectionName = function (
	collectionUsername,
    collectionName,
    newName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/metadata',
        onSuccess,
        onError,
        'Could not update collection name',
        false, // wants raw response
        JSON.stringify({ name: newName })
    );
};

Cloud.prototype.shareCollection = function (
	collectionUsername,
    collectionName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/metadata?shared=true',
        onSuccess,
        onError,
        'Could not share collection'
    );
};

Cloud.prototype.unshareCollection = function (
	collectionUsername,
    collectionName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/metadata?shared=false&published=false',
        onSuccess,
        onError,
        'Could not unshare collection'
    );
};

Cloud.prototype.publishCollection = function (
	collectionUsername,
    collectionName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/metadata?published=true',
        onSuccess,
        onError,
        'Could not publish collection'
    );
};

Cloud.prototype.unpublishCollection = function (
	collectionUsername,
    collectionName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/metadata?published=false',
        onSuccess,
        onError,
        'Could not unpublish collection'
    );
};

Cloud.prototype.addProjectToCollection = function (
        collectionUsername,
    collectionName,
    projectUsername,
    projectName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/projects',
        onSuccess,
        onError,
        'Could not add project to collection',
        false, // wants raw response
        JSON.stringify({
            username: projectUsername,
            projectname: projectName
        })
    );
};

Cloud.prototype.removeProjectFromCollection = function (
        collectionUsername,
    collectionName,
    projectId,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'DELETE',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/projects/' + encodeURIComponent(projectId),
        onSuccess,
        onError,
        'Could not remove project from collection'
    );
};

Cloud.prototype.getUserCollections = function (
        collectionUsername,
    page,
    pageSize,
    searchTerm,
    onSuccess,
    onError
) {
    this[(collectionUsername !== this.username) ?
            'request' :
            'withCredentialsRequest'](
        'GET',
        '/users/' +
            (collectionUsername ?
                encodeURIComponent(collectionUsername) :
                '%username') +
            '/collections?' +
            this.encodeDict({
                page: page || '',
                pageSize: page ? pageSize | 16 : '',
                matchtext: searchTerm ? encodeURIComponent(searchTerm) : ''
            }),
        onSuccess,
        onError,
        'Could not fetch collections'
    );
};

Cloud.prototype.getCollectionsContainingProject = function (
        username,
    projectName,
    page,
    pageSize,
    onSuccess,
    onError
) {
    var path = '/projects/' +
                encodeURIComponent(username) + '/' +
                encodeURIComponent(projectName) + '/collections';

    if (page) {
        path += '?page=' + page + '&pagesize=' + (pageSize || 16);
    }

    this.request(
        'GET',
        path,
        onSuccess,
        onError,
        'Could not fetch collections for project ' + projectName
    );
};

Cloud.prototype.getCollections = function (
        page,
    pageSize,
    searchTerm,
    onSuccess,
    onError
) {
    var dict = {
        page: page,
        pageSize: page ? pageSize | 16 : '',
    };

    if (searchTerm) { dict.matchtext = encodeURIComponent(searchTerm); }

    this.request(
        'GET',
        '/collections?' + this.encodeDict(dict),
        onSuccess,
        onError,
        'Could not fetch collections'
    );
};

Cloud.prototype.deleteCollection = function (
        collectionUsername,
    collectionName,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'DELETE',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName),
        onSuccess,
        onError,
        'Could not remove collection'
    );
};

Cloud.prototype.addEditorToCollection = function (
        collectionUsername,
    collectionName,
    editorUsername,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'POST',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/editors',
        onSuccess,
        onError,
        'Could not add editor to collection',
        false, // wants raw response
        JSON.stringify({
            editor_username: editorUsername,
        })
    );
};

Cloud.prototype.removeEditorFromCollection = function (
        collectionUsername,
    collectionName,
    editorUsername,
    onSuccess,
    onError
) {
    this.withCredentialsRequest(
        'DELETE',
        '/users/' + encodeURIComponent(collectionUsername) +
            '/collections/' + encodeURIComponent(collectionName) +
            '/editors/' + encodeURIComponent(editorUsername),
        onSuccess,
        onError,
        'Could not remove editor from collection'
    );
};
