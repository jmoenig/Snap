/*

    api.js

    programmatically interact with a Snap! project

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2022 by Jens Mönig

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


    prerequisites:
    --------------
    needs gui.js, lists.js, objects.js, threads.js and morphic.js


    documentation
    -------------
    along with this file you should have received a copy of the Snap! API
    documentation. If not, see
    https://github.com/jmoenig/Snap/blob/master/API.md
    or https://snap.berkeley.edu/snap/API.md

*/

/*global modules, IDE_Morph, isString, Map, List, world, isNil, Project,
detect, isSnapObject, VariableFrame*/

/*jshint esversion: 6*/

// Global stuff ////////////////////////////////////////////////////////

modules.api = '2022-April-05';

// IDE_Morph external communication API - experimental
/*
    programmatically trigger scripts from outside of Snap!
    add message listeners to Snap! broadcasts and access
    global variables
*/

window.onmessage = function (event) {
    // make the API accessible from outside an iframe
    var ide = world.children[0];
    if (!isNil(event.data.selector)) {
        window.top.postMessage(
            {
                selector: event.data.selector,
                response: ide[event.data.selector].apply(ide, event.data.params)
            },
            '*'
        );
    }
};

IDE_Morph.prototype.getScenes = function () {
    // return an array of all scenenames
    return this.scenes.itemsArray().map(each => each.name);
};

IDE_Morph.prototype.getCurrentScene = function () {
    // return the name of the currently active scene
    return this.scene.name;
};

IDE_Morph.prototype.switchTo = function (sceneName) {
    var scene = detect(this.scenes.itemsArray(), scn => scn.name === sceneName);
    if (scene === null) {
         throw new Error('cannot find scene ' + sceneName);
    }
    this.switchToScene(scene);
};

IDE_Morph.prototype.isRunning = function () {
    // return true if the active scene is currently running a script
    return this.stage.threads.processes.length > 0;
};

IDE_Morph.prototype.stop = function () {
    // stop all currently running processes in the active scene
    // no matter what, without firing a stop event
    var stage = this.stage;
    stage.keysPressed = {};
    stage.threads.stopAll();
    stage.stopAllActiveSounds();
    stage.children.forEach(morph => {
        if (morph.stopTalking) {
            morph.stopTalking();
        }
    });
    stage.removeAllClones();
    stage.stopProjection();
    this.controlBar.pauseButton.refresh();
};

IDE_Morph.prototype.broadcast = function(message, callback) {
    // same as using the broadcast block - launch all scripts
    // in the current project reacting to the specified message,
    // if a callback is supplied wait for all processes to terminate
    // then call the callback, same as using the "broadcast and wait" block

    var rcvrs = this.sprites.contents.concat(this.stage),
        myself = this,
        procs = [];

    function wait() {
        if (procs.some(any => any.isRunning())) {
            return;
        }
        if (callback instanceof Function) {
            myself.onNextStep = function () {
                callback();
                callback = null;
            };
        }
    }

    if (!isString(message)) {
        throw new Error('message must be a String');
    }
    this.stage.lastMessage = message;
    rcvrs.forEach(morph => {
        if (isSnapObject(morph)) {
            morph.allHatBlocksFor(message).forEach(block => {
                var varName, varFrame;
                if (block.selector === 'receiveMessage') {
                    varName = block.inputs()[1].evaluate()[0];
                    if (varName) {
                        varFrame = new VariableFrame();
                        varFrame.addVar(varName, message);
                    }
                    procs.push(this.stage.threads.startProcess(
                        block,
                        morph,
                        this.stage.isThreadSafe,
                        // commented out for now to enable tail recursion:
                        // || // make "any msg" threadsafe
                        // block.inputs()[0].evaluate() instanceof Array,
                        null, // exportResult (bool)
                        callback instanceof Function ? wait : null,
                        null, // isClicked
                        null, // rightAway
                        null, // atomic
                        varFrame
                    ));
                } else {
                    procs.push(this.stage.threads.startProcess(
                        block,
                        morph,
                        this.stage.isThreadSafe
                    ));
                }
            });
        }
    });
    (this.stage.messageCallbacks[''] || []).forEach(
        callback => callback(message)
    );
    (this.stage.messageCallbacks[message] || []).forEach(
        callback => callback()
    );
};

IDE_Morph.prototype.addMessageListenerForAll = function (callback) {
    // associate a monadic callback with all broadcasts.
    // whenever a message is broadcast the callback is called
    // with the current message as argument
    this.addMessageListener('', callback);
};

IDE_Morph.prototype.addMessageListener = function (message, callback) {
    // associate a callback function with a broadcast message,
    // whenever the message is broadcast, the callback is executed,
    // you can add multiple callbacks to a message, they will be
    // executed in the order you added them.
    // Note: ssociating a callback with an empty string attaches the
    // callback to "any" message, taking the actual message as argument
    var funcs;
    if (!isString(message)) {
        throw new Error('message must be a String');
    }
    funcs = this.stage.messageCallbacks[message];
    if (funcs instanceof Array) {
        funcs.push(callback);
    } else {
        this.stage.messageCallbacks[message] = [callback];
    }
};

IDE_Morph.prototype.getMessages = function () {
    // return an array of all broadcast messages in the current project
    var allNames = [],
        dict = new Map();
    this.sprites.contents.concat(this.stage).forEach(sprite => {
        allNames = allNames.concat(sprite.allMessageNames());
    });
    allNames.forEach(name => dict.set(name));
    return Array.from(dict.keys());
};

IDE_Morph.prototype.getVarNames = function () {
    // return an array of all global variable names
    return this.stage.globalVariables().names();
};

IDE_Morph.prototype.getVar = function (name) {
    // return the value of the global variable indicated by name
    // raise an error if no global variable of that name exists
    return this.stage.globalVariables().getVar(name);
};

IDE_Morph.prototype.setVar = function (name, value) {
    // set the value of the global variable indicated by name to the given value
    // raise an error if no global variable of that name exists
    this.stage.globalVariables().setVar(name, value);
};

IDE_Morph.prototype.newList = function (array) {
    // return a new Snap list the shape of the given array, if any
    // nested array will not be automatically converted to nested lists
    return new List(array);
};

IDE_Morph.prototype.getProjectXML = function () {
    return this.serializer.serialize(new Project(this.scenes, this.scene));
};

IDE_Morph.prototype.loadProjectXML = function (projectXML) {
    // load the project encoded as xml-String, no questions asked
    // terminate animations and scheduled ops
    this.onNextStep = null;
    this.world().animations = [];
    this.openProjectString(projectXML);
};

IDE_Morph.prototype.unsavedChanges = function () {
    return this.hasUnsavedEdits();
};

IDE_Morph.prototype.setTranslation = function (countryCode, callback) {
    // switch to the specified language (format ISO 639-1 code) and
    // optionally run a callback afterwards, e.g. to broadcast an event
    // note the language setting does not overwrite the user's own setting
    // that's stored in the browser this way, so that the next time the user
    // opens Snap their own language setting again takes effect.
    this.loadNewProject = false;
    this.setLanguage(countryCode, callback, true); // don't save
};
