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

/*global modules, IDE_Morph, DialogBoxMorph, SnapSerializer, hex_sha512,
  localize, Color*/

modules.github = '2016-October-16';

// Global stuff

var Github;
var SnapGithub = new Github();

// Github //////////////////////////////////////////////////////////////

function Github() {
    this.baseUrl = "https://api.github.com";
    this.lastUser = null;
    this.lastRepo = null;
    this.lastPath = null;
}

// Public Functions ////////////////////////////////////////////////////
//
// These are the methods which are officially "exported" (which are
// meant to be called outside of this file):
//   promptRepoGetProjectList
//   maybePromptGetProjectList
//   promptPasswordSaveProject
//   promptPasswordDeleteFile
//   promptRepoPasswordSaveProject
//
// Github objects will save the username, repo, and path, but for
// security, we don't store the password.  We prompt the user for
// the password each time it is necessary (i.e. when a file is updated).
//


// Public functions for getting the project list

// promptRepoGetProjectList
// 
// This prompts for the github username, repo name, and path (defaults
// to "/") even if lastRepo, lastUser, and lastPath are set.
Github.prototype.promptRepoGetProjectList = function (
    ide,
    callBack,
    errorCall
) {
    var myself = this,
        world = ide.world();
    new DialogBoxMorph(
        null,
	function (user) {
	    myself.getProjectList(
		callBack, errorCall, user.username, user.repo, user.path);
	}
    ).withKey('githubGet').promptCredentials(
        'Github Username and Repository',   // title
	'github get',                       // purpose
	null,                               // tosURL
	null,                               // tosLabel
	null,                               // prvURL    
	null,                               // prvLabel    
	null,                               // checkBoxLabel
	world,                              // world
	null,                               // pic
	null                                // msg            
    );
};


// maybePromptGetProjectList
// 
// This tries to use lastUser, lastRepo, and lastPath.  If any of
// those aren't set, it will prompt for all of them.
Github.prototype.maybePromptGetProjectList = function (
    ide,
    callBack,
    errorCall
) {
    if (this.lastUser && this.lastRepo && this.lastPath !== null) {
	this.getProjectList(
	    callBack,
	    errorCall,
	    this.lastUser,
	    this.lastRepo,
	    this.lastPath
	);
    } else {
	this.promptRepoGetProjectList(ide, callBack, errorCall);
    }
};


// Public functions for saving a project

// promptPasswordSaveProject
// 
// This requires that lastUser, lastRepo, and
// lastPath are set.  It prompts for the password, and uses that to
// save the file.
//
// sha should be set if and only if we are updating a file
Github.prototype.promptPasswordSaveProject = function (
    ide,
    callBack,
    errorCall,
    sha
) {
    var myself = this,
        world = ide.world();

    this.confirmVariables(ide);

    // Prompt for password
    new DialogBoxMorph(
        null,
	function (user) {
	    myself.saveProject(ide,
			       callBack,
			       errorCall,
			       myself.lastUser,
			       user.password,
			       myself.lastRepo,
			       myself.lastPath,
			       user.commitMsg,
			       sha);
	}
    ).withKey('githubSaveAs').promptCredentials(
        'Github Password',     // title
	'github save as',      // purpose
	null,		       // tosURL
	null,		       // tosLabel
	null,		       // prvURL
	null,		       // prvLabel
	null,		       // checkBoxLabel
	world,		       // world
	null,		       // pic
	null		       // msg
    );
};


// promptRepoPasswordSaveProject
// 
// In theory this is called when you try to do a save with source = github,
// but lastUser, lastRepo, and lastPath aren't set.  However, I don't think
// that scenario is actually possible, so I don't think this function
// is ever called.
Github.prototype.promptRepoPasswordSaveProject = function (
    ide,
    callBack,
    errorCall,
    sha
) {
    var myself = this,
        world = ide.world();
    // Prompt for username, repo, and password
    new DialogBoxMorph(
        null,
	function (user) {
	    myself.saveProject(ide,
			       callBack,
			       errorCall,
			       user.username,
			       user.password,
			       user.repo,
			       user.path,
			       user.commitMsg,
			       sha);
	}
    ).withKey('githubSave').promptCredentials(
        'Github Username/Password/Repo',    // title
	'github save',			    // purpose
	null,				    // tosURL
	null,				    // tosLabel
	null,				    // prvURL
	null,				    // prvLabel
	null,				    // checkBoxLabel
	world,				    // world
	null,				    // pic
	null				    // msg
    );
};


// promptPasswordDeleteFile
// 
// This requires that lastUser, lastRepo, and
// lastPath are set.  It prompts for the password, and uses that to
// save the file.
//
// sha should be set if and only if we are updating a file
Github.prototype.promptPasswordDeleteFile = function (
    filename,
    ide,
    callBack,
    errorCall,
    sha
) {
    var myself = this,
        world = ide.world();

    this.confirmVariables(ide);

    // Prompt for password
    new DialogBoxMorph(
        null,
	function (user) {
	    myself.deleteFile(filename,
			      callBack,
			      errorCall,
			      myself.lastUser,
			      user.password,
			      myself.lastRepo,
			      myself.lastPath,
			      user.commitMsg,
			      sha);
	}
    ).withKey('githubSaveAs').promptCredentials(
        'Github Password',     // title
	'github save as',      // purpose
	null,		       // tosURL
	null,		       // tosLabel
	null,		       // prvURL
	null,		       // prvLabel
	null,		       // checkBoxLabel
	world,		       // world
	null,		       // pic
	null		       // msg
    );
};


// Private Functions ///////////////////////////////////////////////////

// ------------------
// Private utility functions

// trimPath
//
// Normalize paths by remove leading and trailing slashes
Github.prototype.trimPath = function (path) {
    if (path.endsWith("/")) {
        path = path.substring(0, path.length - 2);
    }
    if (path.startsWith("/")) {
        path = path.substring(1, path.length - 1);
    }
    return path;
};


// updatePath
//
// This is called when the user wants to move to a different directory
// in the same repo.
//
// The input path should be the name of the directory (relative to
// the current lastPath)
//
// This function updates this.lastPath to reflect the full absolute
// path to the new directory.
// 
// The caller is then responsible for calling getProjectList on the
// new path.
// 
// For example:
// 
// input     initial               final
// path      this.lastPath     ->  this.lastPath
// ------    -------------         -------------
// "direc"   ""                    "direc"
// "subdir"  "direc"               "direc/subdir"
// ".."      "direc/subdir"        "direc"
// ".."      "direc"               ""
//
Github.prototype.updatePath = function (path) {
    var newpath;
    path = this.trimPath(path);
    if (this.lastPath) {
	if (path === "..") {
	    // go up one level: the new path is everything up to
	    // the last '/'.  It does not include that last '/'.
	    newpath =
		this.lastPath.substring(0, this.lastPath.lastIndexOf("/"));
	} else {
	    newpath = this.lastPath + "/" + path;
	}
    } else {
	newpath = path;
    }
    this.lastPath = newpath;
    return this.lastPath;
};


// confirmVariables
//
// Confirm that username, repo, and path are set
Github.prototype.confirmVariables = function (
    ide
) {
    var variables = [
	["lastUser", "username"],
	["lastRepo", "repo"],
	["lastPath", "path"]
    ];
    for (var ii = 0; ii < variables.length; ii++) {
	var varname = variables[ii][0];
	var str = variables[ii][1];
	if (this[varname] === null) {
            new DialogBoxMorph().inform(
		'Github - Cannot Save Project',
		'Internal error.  Github ' + str + ' is not set: '
		    + this[varname] + '\n',
		ide.world(),
		ide.cloudIcon(null, new Color(180, 0, 0))
            );
            throw new Error('Internal Error - Github ' + str + ' not set: ' +
			    this[varname]);
	}
    }
};

// ------------------
// Private functions for calling specific parts of the Github API,
// specifically for getting the project list and saving a file
//

// getProjectList
//
// Calls the Github API for getting the contents of a directory.
Github.prototype.getProjectList = function (
    callBack,
    errorCall,
    username,
    repo,
    path
) {
    var myself = this;

    // Construct the request
    // https://developer.github.com/v3/repos/contents/#get-contents
    path = this.trimPath(path);
    var url = this.baseUrl + "/repos/"
        + encodeURIComponent(username)
        + "/"
        + encodeURIComponent(repo)
        + "/contents/"
	+ encodeURIComponent(path);

    // Make the call
    this.callApi(
	function(response, url) {
            var projects = [];
            var parsed = JSON.parse(response);

	    // Read the contents of the directory and construct the
	    // ProjectList from it.
	    // Only return directories and files that end in .xml.
	    for (var idx = 0; idx < parsed.length; idx++) {
		var project_name;
		if (parsed[idx].type === "file") {
		    if (!parsed[idx].name.endsWith(".xml")) {
			continue;
		    }
		    // Strip off the ".xml" to get the project name.
		    project_name =
			parsed[idx].name.substring(
			    0, parsed[idx].name.length-4);
		} else if (parsed[idx].type === "dir") {
		    project_name = parsed[idx].name;
		} else {
		    continue;
		}
		projects.push(
		    {
			// The download_url is the full url to the file, like
			// https://raw.githubusercontent.com/alonso/my_repo/master/my_proj.xml
			// For directories, download_url is null
			file: parsed[idx].download_url,
			// The type is either "file" or "dir"
			type: parsed[idx].type,
			ProjectName: project_name,
			Public: 'false',
			sha: parsed[idx].sha,
			// FullResponse is included for debugging
			// information, but it should never be used.
			FullResponse: parsed[idx]
		    });
	    }

	    // If this is a subdirectory, add an item for the
	    // parent directory: ".."
	    if (path !== "") {
		projects.push(
		    {
			file: null,
			type: "dir",
			ProjectName: "..",
			Public: 'false',
			sha: null,
			FullResponse: null
		    });
	    }

	    // Save the username, repo, and path so that the user
	    // doesn't have to specify them again next time.
            myself.lastUser = username;
            myself.lastRepo = repo;
	    myself.lastPath = path;
	    callBack.call(null, projects, url, response);
	}, errorCall, url);
};


// saveProject
//
// Call the Github API for saving a file, either creating a new file or
// updating an existing file.
Github.prototype.saveProject = function (
    ide,
    callBack,
    errorCall,
    username,
    password,
    repo,
    path,
    commitMsg,
    sha
) {
    // Check the size of the project.  The Github API only supports
    // files up to 1MB.
    var pdata = ide.serializer.serialize(ide.stage);
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

    // Confirm that the serialized data can be parsed back again
    try {
        ide.serializer.parse(pdata);
    } catch (err) {
        ide.showMessage('Serialization of program data failed:\n' + err);
        throw new Error('Serialization of program data failed:\n' + err);
    }

    // Construct the API request for saving the file
    // https://developer.github.com/v3/repos/contents/#create-a-file
    var filename = ide.projectName;
    if (!filename.endsWith(".xml")) {
        filename += ".xml";
    }
    path = this.trimPath(path);
    if (path !== "") {
	path += "/";
    }
    var url = this.baseUrl + "/repos/"
        + encodeURIComponent(username)
        + "/"
        + encodeURIComponent(repo)
        + "/contents/"
        + encodeURIComponent(path)
        + encodeURIComponent(filename);
    var params = {
	    "message" : commitMsg || "commit from Snap!",
	    "content" : btoa(pdata)
	};
    // If overwriting an existing file, we need to provide the SHA of
    // the file bing overwritten.
    if (sha) {
	params.sha = sha;
    }

    // Make the call
    ide.showMessage('Uploading ' + Math.round(pdata.length / 1024) + ' KB...');
    this.callApi(
        function (response, url) {
	    callBack.call(null, response, url);
	    ide.hasChangedMedia = false;
	},
	errorCall,
	url,
	"PUT",
	JSON.stringify(params),
	username,
	password
    );
};


// deleteFile
//
// Calls the Github API for deleting a file
Github.prototype.deleteFile = function (
    filename,
    callBack,
    errorCall,
    username,
    password,
    repo,
    path,
    commitMsg,
    sha
) {
    // Construct the request
    // https://developer.github.com/v3/repos/contents/#delete-a-file 
    if (!filename.endsWith(".xml")) {
        filename += ".xml";
    }
    path = this.trimPath(path);
    if (path !== "") {
	path += "/";
    }
    var url = this.baseUrl + "/repos/"
        + encodeURIComponent(username)
        + "/"
        + encodeURIComponent(repo)
        + "/contents/"
	+ encodeURIComponent(path)
	+ encodeURIComponent(filename);

    var params = {
	"path" : path + filename,
	"message" : commitMsg || "commit from Snap!",
	"sha" : sha
    };

    // Make the call
    this.callApi(
	function(response, url) {
	    callBack.call(null, response);
	},
	errorCall,
	url,
	"DELETE",
	JSON.stringify(params),
	username,
	password);
};


// ------------------
// Private generic function for calling any method of the Github API
// 
// Only supports Basic Authentication with a username and password
//
// https://developer.github.com/v3/
//
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
        request.setRequestHeader(
	    'Accept', 'application/vnd.github.v3+json',
	    'Content-Type', 'application/json;charset=UTF-8');
	if (username && password) {
	    request.setRequestHeader(
		'Authorization', 'Basic ' + btoa(username + ':' + password));
	}
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.status < 200 || request.status >= 300) {
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
