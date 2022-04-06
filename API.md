# The Snap! API

Jens Mönig, Bernat Romagosa, April 05, 2022

This document describes how Snap! can be accessed from an outside program to start scripts, send and retrieve information. The model use case is embedding interactive Snap! projects in other websites such as MOOCs or other adaptive learning platforms.

This experimental Snap! API is a set of methods for an IDE_Morph containing a Snap! project. These methods are maintained to work with future versions of Snap! They can be used to trigger scripts, get feedback from running scripts, and access the project's global variables.

Currently the API consists of the following methods:

#### Navigate Scenes

* IDE_Morph.prototype.getScenes()
* IDE_Morph.prototype.getCurrentScene()
* IDE_Morph.prototype.switchTo()

#### Control Processes

* IDE_Morph.prototype.isRunning()
* IDE_Morph.prototype.stop()

#### Broadcast Messages (and optionally wait)

* IDE_Morph.prototype.broadcast()

#### Listen to Messages

* IDE_Morph.prototype.addMessageListenerForAll()
* IDE_Morph.prototype.addMessageListener()
* IDE_Morph.prototype.getMessages()

#### Access Global Variables

* IDE_Morph.prototype.getVarNames()
* IDE_Morph.prototype.getVar()
* IDE_Morph.prototype.setVar()

#### Create and Modify Lists

* IDE_Morph.prototype.newList()

#### Access the Serialized Project

* IDE_Morph.prototype.getProjectXML()
* IDE_Morph.prototype.loadProjectXML()
* IDE_Morph.prototype.unsavedChanges()

#### Set the Language

* IDE_Morph.prototype.setTranslation()

## Referencing the IDE

Getting hold of an ide can usually be achieved by
evaluating:

    var ide = world.children[0];

The model case in mind is embedding Snap! in an iframe:

```
<!DOCTYPE html>
<html>
    <head>
        <title>Snap! iFrame</title>
    </head>
    <body>
        <iframe id="inlineFrameExample"
            title="Inline Frame Example"
            width="1024"
            height="720"
            src="snap.html">
        </iframe>
    </body>
</html>
```

In such a set up the ide can be accessed through the ```contentWindow``` property, e.g.

    var ide = document.getElementsByTagName("iframe")[0].contentWindow.world.children[0];

### Cross-domain iframes

If the iframe and the container do not share domains, you won't be able to reach the world
and, thus, the API. For that particular case, you should use the `postMessage` mechanism,
as follows:

    document.querySelector('iframe').contentWindow.postMessage(
        { selector: <API selector>, params: <param array> },
        '*'
    );

For instance, to get the value of a variable named "foo", you would do:

    document.querySelector('iframe').contentWindow.postMessage(
        { selector: 'getVar', params: [ 'foo' ] },
        '*'
    );

The way to capture the return values of these messages from the page containing the iframe
is to define an `onmessage` listener:

    winndow.addEventListener('message',function(e) {
        console.log('the response to', e.data.selector, 'is', e.data.response);
    },false);

Note that `e.data.selector` carries the original selector back, so you can tie it to the
request, while `e.data.response` carries the return value of the API method call.

## Interacting with the IDE

### IDE_Morph.prototype.getScenes()
The getScenes() method returns an array with the names of all scenes in the projects. The minimum number of elements is 1, since there is always at least one scene per project. The scene names are unique strings within the array. Note that the empty string ('') is a valid scene identifier.

#### syntax
    ide.getScenes();

#### return value
an Array of Strings, minimum length 1


### IDE_Morph.prototype.getCurrentScene()
The getCurrentScene() method returns a string representing the name of the currently active scene in the project. If the scene is unnamed and empty string is returned.

#### syntax
    ide.getCurrentScene();

#### return value
a String, can be an empty String


### IDE_Morph.prototype.switchTo()
The switchTo() method displays the specified scene. It suspends all processes and clones of the previously active scene and passes control to the new scene.

#### syntax
    ide.switchTo(sceneName);

#### parameters
* sceneName
    - string, the name of the scene to be activated

#### return value
undefined


### IDE_Morph.prototype.isRunning()
The isRunning() method returns `true` if the active scene is currently running one or more threads, `false` if the scene is idle.

#### syntax
    ide.isRunning();

#### return value
a Boolean


### IDE_Morph.prototype.stop()
The stop() method immediately terminates all currently running threads in the active scene and removes all temporary clones. It does not trigger a "When I am stopped" event.

#### syntax
    ide.stop();

#### return value
undefined


### IDE_Morph.prototype.broadcast()
The broadcast() method triggers all scripts whose hat block listens to the specified message. An optional callback can be added to be run after all triggered scripts have terminated.

#### syntax
    ide.broadcast(message [, callback]);

#### parameters
* message
    - string, the message to be sent to all listeners
* callback | optional
    - function to execute after all scripts terminate, no arguments

#### return value
undefined


### IDE_Morph.prototype.addMessageListenerForAll()
The addMessageListenerForAll() method sets up a function that will be called whenever a message is broadcast. The function takes one argument, the message being broadcast, and can be used to react to any message. Multiple message listeners can be set up, they all get executed in the order in which they were added.

#### syntax
    ide.addMessageListenerForAll(callback);

#### parameters
* callback
    * function to execute whenever a message is sent, takes one argument: The message string

#### return value
undefined


### IDE_Morph.prototype.addMessageListener()
The addMessageListener() method sets up a function that will be called whenever the specified message is broadcast. Multiple message listeners can be set up per message, they all the executed in the order in which they were added.

#### syntax
    ide.addMessageListener(message, callback);

#### parameters
* message
    * string, the message to which the listener will react. If the message is an empty string the callback will be executed at any broadcast, passing the message as argument
* callback
    * function to execute whenever the specified message is sent, takes no argument, except when the message to listen to is the empty string, then it takes the message as argument

#### return value
undefined


#### IDE_Morph.prototype.getMessages()
The getMessage() method returns a new Array that contains all the message strings that occur in the project, both in hat blocks and in broadcast blocks.

#### syntax
    ide.getMessages();

#### return value
an Array of Strings, or an empty Array


### IDE_Morph.prototype.getVarNames()
The getVarNames() method returns a new Array that contains all the global variable names in the project.

#### syntax
    ide.getVarNames();

### return value
an Array of Strings, or an empty Array


### IDE_Morph.prototype.getVar()
The getVar() method returns the value of the global variable indicated by the specified name.

#### syntax
    ide.getVar(name);

#### return value
whatever value the variable holds.


### IDE_Morph.prototype.setVar()
The setVar() methods assigns a value to the a global variable specified by name.

#### syntax
    ide.setVar(name, value);

#### return value
undefined


### IDE_Morph.prototype.newList()
The newList() methods returns a new Snap! list. Optionally a source array containing the list elements can be specified.

#### syntax
    ide.newList([array]);

#### return value
a new Snap! List


### IDE_Morph.prototype.getProjectXML()
the getProjectXML() method returns a string in XML format representing the serialized project currently loaded into the IDE.

#### syntax
    ide.getProjectXML();

#### return value
an XML String


### IDE_Morph.prototype.loadProjectXML()
the loadProjectXML() method replaces the current project of the IDE with another serialized one encoded in a string in XML format. Note that no user acknowledgement is required, all unsaved edits to the prior project are lost.

#### syntax
    ide.loadProjectXML(projectData);

#### parameters
* projectData
    * XML string representing a serialized project

#### return value
unefined


### IDE_Morph.prototype.unsavedChanges()
the unsavedChanges() method returns a Boolean value indicating whether the currently edited project has been modifed since it was last saved.

#### syntax
    ide.unsavedChanges();

#### return value
a Boolean


### IDE_Morph.prototype.setTranslation()
the setTranslation() method  switches to the specified language, formatted as ISO 639-1 code, and optionally runs a callback afterwards, e.g. to broadcast an event. Note that switching to another translation involves serializing and deserializing the current project and thus stops all running processes. If you wish to "continue" a project afterwards you can use the callback to trigger an event, such as the green flag ('\_\_shout__go\_\_'). Also note that the language setting does not overwrite the user's own setting which is stored in the browser this way, so that the next time the user opens Snap their own language preference again takes effect.

#### syntax
    ide.setTranslation(countryCode [, callback]);

#### parameters
* countryCode
    - string representing a country in ISO 639-1 format
* callback | optional
    - function to execute after the language has been set, no arguments

#### return value
undefined


## Manipulating Lists

Snap! lists can be accessed and manipulated through a set of methods described in the file `lists.js`
