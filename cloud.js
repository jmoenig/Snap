/*
cloud.js

    a GitHub backend API for SNAP!

    written by Gubolin, based on cloud.js by Jens Mönig

    Copyright (C) 2014 by Jens Mönig, Gubolin

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

modules.cloud = '2014-July-29';

// Global stuff

var Cloud;

var SnapCloud = new Cloud();

// Cloud /////////////////////////////////////////////////////////////

function Cloud(url) {
    this.gh = null;
    this.username = null;
    this.password = null; // TODO saved as plain text
    this.session = null;
    this.api = {};
}

Cloud.prototype.clear = function () {
    this.gh = null;
    this.username = null;
    this.password = null;
    this.session = null;
    this.api = {};
};

// Cloud: Snap! API

Cloud.prototype.getProject = function (
    dict,
    callBack,
    errorCall
) {
    var myself = this;
    var projectName = dict.projectname;
    var userName = dict.username;

    if (myself.gh !== null) {
        var repo = myself.gh.getRepo(userName, projectName);
        var branch = repo.getBranch(); // master (default)
        var media, pdata;
        var br;

        branch.read('snap.xml', false).then(
            function (sourceContent) {
                branch.read('media.xml', false).then( // true for binary
                    function (mediaContent) {
                        callBack.call(
                            null,
                            sourceContent.content,
                            mediaContent.content
                        );
                    },
                    function (error) {
                        errorCall.call(this, error, 'Github');
                    }
                );
            },
            function (error) {
                errorCall.call(this, error, 'Github');
            }
        );
    } else {
        errorCall.call(null, 'Please login', 'Github');
    }
};

Cloud.prototype.login = function (
    username,
    password,
    callBack,
    errorCall
) {
    var myself = this;

    myself.gh = new Octokit({
        username: username,
        password: password
    });

    myself.gh.getUser().getInfo().then(
        function(info) {
            myself.username = username;
            myself.password = password;

            callBack.call(myself);
        },
        function (error) {
            errorCall.call(this, error, 'Github');
        }
    );
};

Cloud.prototype.saveProject = function (ide, callBack, errorCall) {
    var myself = this,
        pdata,
        media;
    var repoName = ide.projectName.replace(/[^\w-]/g, ''); // FIXME validation of project name

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

    myself.getProjectList(
            function (projects) {
                var exists = false;

                projects.forEach(function (project) {
                    if (project.ProjectName.indexOf(repoName) > -1) {
                        exists = true;
                        return;
                    }
                });

                if (exists === false){
                    myself.gh.getUser().createRepo(repoName, { // these should be discussed
                        'description': 'Snap! Project',
                        'has_wiki': 'false',
                        'has_downloads': 'false',
                        'auto_init': true,
                        'license_template': 'mit' // discuss
                    }).then(
                        function () {},
                        function (error) {
                            errorCall.call(this, error, 'Github');
                        }
                    );
                }

                if (myself.gh !== null) {
                    var repo = myself.gh.getRepo(myself.username, ide.projectName);
                    var branch = repo.getBranch(); // master (default)
                    var message = ''; // FIXME optional: specify message

                    var contents = {
                        'snap.xml': pdata,
                        'media.xml': media // may be binary
                    };

                    branch.writeMany(contents, message).then(
                        function () {
                            callBack.call()
                        },
                        function (error) {
                            errorCall.call(this, error, 'Github');
                        }
                    );
                }
            },
            function (error) {
                errorCall.call(null, error, 'Github');
            }
    );
};

Cloud.prototype.getProjectList = function (callBack, errorCall) {
    var myself = this;

    if (myself.gh !== null) {
        myself.gh.getUser().getRepos().then(
                function (repos) {
                    var snapProjects = [];

                    repos.forEach(function (repo) {
                        if (repo.description === 'Snap! Project') { // FIXME nicer detection
                            var project;

                            project = {
                                'ProjectName': repo.name
                            };

                            snapProjects.push(project);
                        }
                    });

                    callBack.call(myself, snapProjects);
                },
                function (error) {
                    errorCall.call(this, error, 'Github');
                }
        );
    } else {
        errorCall.call(myself, 'Please login', 'Github');
    }
};

Cloud.prototype.logout = function (callBack) {
    this.clear();
};

// Cloud: backend communication

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
                pair = encodeURIComponent(key) + '=' + encodeURIComponent(dict[key]);
            if (str.length > 0) {
                str += '&';
            }
            str += pair;
        }
    }
    return str;
};
