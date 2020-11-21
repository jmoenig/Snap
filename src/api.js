/*

    api.js

    programmatically interact with a Snap! project

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2020 by Jens Mönig

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
    needs gui.js, lists.js and morphic.js


    documentation
    -------------
    the experimental Snap! API is a set of methods for an IDE_Morph containing
    a Snap! project. These methods are maintained to work with future versions
    of Snap! They can be used to trigger scripts, get feedback from running
    scripts, and access the project's global variables. Currently the API
    consists of the following methods:

        Broadcast Messages (and optionally wait)
        
            - IDE_Morph.prototype.broadcast()

        Listen to Messages

            - IDE_Morph.prototype.addMessageListenerForAll()
            - IDE_Morph.prototype.addMessageListener()
            - IDE_Morph.prototype.getMessages()

        Access Global Variables

            - IDE_Morph.prototype.getVarNames()
            - IDE_Morph.prototype.getVar()
            - IDE_Morph.prototype.setVar()

        Create and Modify Lists

            - IDE_Morph.prototype.newList()

        Access the Serialized Project

            - IDE_Morph.prototype.getProjectXML()
            - IDE_Morph.prototype.loadProjectXML(projectXML)

    Getting hold of an ide can usually be achieved by
    evaluating:

        var ide = world.children[0];


    IDE_Morph.prototype.broadcast()
    ===============================
    The broadcast() method triggers all scripts whose hat block listens to
    the specified message. An optional callback can be added to be run
    after all triggered scripts have terminated.

        syntax:
        -------
            ide.broadcast(message [, callback]);

        parameters:
        -----------
            message
                string, the message to be sent to all listeners
            callback | optional
                function to execute after all scripts terminate, no arguments

        return value:
        -------------
            undefined


    IDE_Morph.prototype.addMessageListenerForAll()
    ==============================================
    The addMessageListenerForAll() method sets up a function that will be
    called whenever a message is broadcast. The function takes one argument,
    the message being broadcast, and can be used to react to any message.
    Multiple message listeners can be set up, they all the executed in the
    order in which they were added.

        syntax:
        -------
            ide.addMessageListenerForAll(callback);

        parameters:
        -----------
            callback
                function to execute whenever a message is sent,
                takes one argument: The message string

        return value:
        -------------
            undefined


    IDE_Morph.prototype.addMessageListener()
    ========================================
    The addMessageListener() method sets up a function that will be called
    whenever the specified message is broadcast. Multiple message listeners
    can be set up per message, they all get executed in the order in which
    they were added.

        syntax:
        -------
            ide.addMessageListener(message, callback);

        parameters:
        -----------
            message
                string, the message to which the listener will react.
                If the message is an empty string the callback will
                be executed at any broadcast, passing the message as
                argument
            callback
                function to execute whenever the specified message is sent,
                takes no argument, except when the message to listen to is
                the empty string, then it takes the message as argument

        return value:
        -------------
            undefined


    IDE_Morph.prototype.getMessages()
    =================================
    The getMessage() method returns a new Array that contains all the message
    strings that occur in the project, both in hat blocks and in broadcast
    blocks.

        syntax:
        -------
            ide.getMessages();

        return value:
        -------------
            an Array of strings, or an empty Array


    IDE_Morph.prototype.getVarNames()
    =================================
    The getVarNames() method returns a new Array that contains all the global
    variable names in the project.

        syntax:
        -------
            ide.getVarNames();

        return value:
        -------------
            an Array of strings, or an empty Array


    IDE_Morph.prototype.getVar()
    =============================
    The getVar() method returns the value of the global variable indicated by
    the specified name.

        syntax:
        -------
            ide.getVar(name);

        return value:
        -------------
            whatever value the variable holds.


    IDE_Morph.prototype.setVar()
    ============================
    The setVar() methods assigns a value to the a global variable specified
    by name.

        syntax:
        =======
            ide.setVar(name, value);

        return value:
        =============
            undefined
        

*/

/*global modules, IDE_Morph, isString, Map, List, world*/

// Global stuff ////////////////////////////////////////////////////////

modules.api = '2020-November-21';

// IDE_Morph external communication API - experimental
/*
    programmatically trigger scripts from outside of Snap!
    add message listeners to Snap! broadcasts and access
    global variables
*/

window.onmessage = function (event) {
    // make the API accessible from outside an iframe
    var ide = world.children[0];
    window.top.postMessage(
        {
            selector: event.data.selector,
            response: ide[event.data.selector].apply(ide, event.data.params)
        },
        '*'
    );
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
    rcvrs.forEach(sprite => {
        sprite.allHatBlocksFor(message).forEach(block => {
            procs.push(this.stage.threads.startProcess(
                block,
                sprite,
                this.stage.isThreadSafe,
                false,
                callback instanceof Function ? wait : null
            ));
        });
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
    return this.serializer.serialize(this.stage);
};

IDE_Morph.prototype.loadProjectXML = function (projectXML) {
    // load the project encoded as xml-String, no questions asked
    // terminate animations and scheduled ops
    this.onNextStep = null;
    this.world().animations = [];
    this.openProjectString(projectXML);
};
