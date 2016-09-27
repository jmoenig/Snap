/*

    github.js

    a backend API for github

    written by Conan Yuan

    Copyright (C) 2016 by Conan Yuan

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

modules.github = '2016-October-16';

// Global stuff

var Github;
var SnapGithub = new Github();

// Github /////////////////////////////////////////////////////////////

function Github() {
    this.baseUrl = "https://api.github.com";
}

// Github API

Github.prototype.getProjectList = function (
    callBack,
    errorCall,
    username,
    repo
) {
    var myself = this;
    username = username || "wcyuan";
    repo = repo || "snap-projects";
    var url = myself.baseUrl + "/repos/"
        + encodeURIComponent(username)
        + "/"
        + encodeURIComponent(repo)
        + "/contents";
    myself.callApi(function(response, url) {
	    var projects = [];
	    parsed = JSON.parse(response);
	    for (var idx = 0; idx < parsed.length; idx++) {
		projects.push({
			file: parsed[idx].download_url,
			    ProjectName: parsed[idx].name,
			    Public: false
			    });
	    }
	    callBack.call(null, projects, url, response);
    }, errorCall, url);
};

Github.prototype.saveProject = function (ide, callBack, errorCall, username, password, repo, path) {
    var myself = this,
        pdata,
        media,
        size,
        mediaSize;

    username = username || "wcyuan";
    password = password || "";
    repo = repo || "snap-projects";
    path = path || "/";
    var filename = encodeURIComponent(ide.projectName);
    if (!ide.projectName.endsWith(".xml")) {
        filename += ".xml";
    }
    if (path.endsWith("/")) {
        path = path.substring(0, path.length - 2);
    }
    var url = myself.baseUrl + "/repos/"
        + encodeURIComponent(username)
        + "/"
        + encodeURIComponent(repo)
        + "/contents"
        + encodeURIComponent(path)
        + "/"
        + filename;

    pdata = ide.serializer.serialize(ide.stage);
    if (pdata.length > 1000000) {
        new DialogBoxMorph().inform(
            'Github - Cannot Save Project',
            'The size of this project exceeds 1 MB.\n' +
                'Please reduce the size of costumes or sounds.\n',
            ide.world(),
            ide.cloudIcon(null, new Color(180, 0, 0))
        );
        throw new Error('Project exceeds 1 MB size limit');
    }

    // check if serialized data can be parsed back again
    try {
        ide.serializer.parse(pdata);
    } catch (err) {
        ide.showMessage('Serialization of program data failed:\n' + err);
        throw new Error('Serialization of program data failed:\n' + err);
    }
    //ide.serializer.isCollectingMedia = false;
    //ide.serializer.flushMedia();

    params = JSON.stringify({
	    "message" : "commit from Snap!",
	    "content" : pdata,
	});
    //params = "&message=commit-from-snap&content=" + encodeURIComponent(pdata);


    ide.showMessage('Uploading ' + Math.round(size / 1024) + ' KB...');
    myself.callApi(
        function (response, url) {
	    callBack.call(null, response, url);
	    ide.hasChangedMedia = false;
	},
	errorCall,
	url,
	"POST",
	params,
	username,
	password
    );
};


// Github API

Github.prototype.callApi = function (
    callBack,
    errorCall,
    url,
    method,
    params,
    username,
    password
) {
    var request = new XMLHttpRequest(),
        myself = this;
    method = method || "GET";
    try {
	request.open(method, url, true);
        request.setRequestHeader('Accept', 'application/vnd.github.v3+json',
				 'Content-Type', 'application/json;charset=UTF-8');
	if (username && password) {
	    request.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
	}
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.status != 200) {
                        errorCall.call(
                            this,
                            request.responseText,
                            url
                        );
                    } else {
                        callBack.call(
                            null,
                            request.responseText,
                            url
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
	request.send(params);
    } catch (err) {
	errorCall.call(this, err.toString(), "Github");
    }
};


// Cloud.prototype.reconnect = function (
//     callBack,
//     errorCall
// ) {
//     if (!(this.username && this.password)) {
//         this.message('You are not logged in');
//         return;
//     }
//     this.login(
//         this.username,
//         this.password,
//         callBack,
//         errorCall
//     );
// };

// Github: user messages (to be overridden)

Github.prototype.message = function (string) {
    alert(string);
};
