# The Snap! API

Jens Mönig, Bernat Romagosa, December 17, 2025

This document describes how Snap! can be accessed from an outside program to start scripts, send and retrieve information. The model use case is embedding interactive Snap! projects in other websites such as MOOCs or other adaptive learning platforms.

This experimental Snap! API is a set of methods for an IDE_Morph containing a Snap! project. These methods are maintained to work with future versions of Snap! They can be used to trigger scripts, get feedback from running scripts, and access the project's global variables.

Currently the API consists of the following methods:

#### Navigate Scenes

* `IDE_Morph.prototype.getScenes()`
* `IDE_Morph.prototype.getCurrentScene()`
* `IDE_Morph.prototype.switchTo()`

#### Control Processes

* `IDE_Morph.prototype.isRunning()`
* `IDE_Morph.prototype.stop()`

#### Broadcast Messages (and optionally wait)

* `IDE_Morph.prototype.broadcast()`

#### Listen to Messages

* `IDE_Morph.prototype.addMessageListenerForAll()`
* `IDE_Morph.prototype.addMessageListener()`
* `IDE_Morph.prototype.getMessages()`

#### Access Global Variables

* `IDE_Morph.prototype.getVarNames()`
* `IDE_Morph.prototype.getVar()`
* `IDE_Morph.prototype.setVar()`

#### Create and Modify Lists

* `IDE_Morph.prototype.newList()`

#### Access the Serialized Project

* `IDE_Morph.prototype.getProjectXML()`
* `IDE_Morph.prototype.loadProjectXML()`
* `IDE_Morph.prototype.unsavedChanges()`
* `IDE_Morph.prototype.resetUnsavedChanges()`

#### Synchronize Scripts

* `IDE_Morph.prototype.getSpriteScriptsXML()`
* `IDE_Morph.prototype.loadSpriteScriptsXML()`

#### Highlight Blocks

* `IDE_Morph.prototype.flashSpriteScripts()`
* `IDE_Morph.prototype.flashSpriteScriptAt()`
* `IDE_Morph.prototype.unflashSpriteScripts()`
* `IDE_Morph.prototype.flashSpriteScriptOutlineAt()`
* `IDE_Morph.prototype.unflashSpriteScriptsOutline()`

#### Display Speech Balloons next to Blocks

* `IDE_Morph.prototype.showScriptBalloonAt()`
* `IDE_Morph.prototype.closePopUps()`

#### Set the Language

* `IDE_Morph.prototype.setTranslation()`

## Referencing the IDE

There are two ways in which Snap! can be used as an extension editor for other web applications: Either by directly embedding the Snap! IDE as a Canvas element in another web page, or by embedding Snap! in an iframe.

### Embedding Snap! as a Canvas

Embedding Snap! directly into another web page involves loading all the source scripts, setting up a
Canvas for the IDE, configuring the desired looks and behavior of the Snap! editor and starting an
animation loop to bring it to life.


A page that embeds its own Snap! editor might be structured like this:


```
<!DOCTYPE html>
<html>
    <head>
        <title>Embedded Snap!</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="https://snap.berkeley.edu/snap/src/morphic.js"></script>
        <script ... ></script>
		...
        <script>
            var world;
            window.onload = function () {
                var ide = new IDE_Morph({ /* configurations dictionary ...*/ }),
                    loop = () => {
                        requestAnimationFrame(loop);
                        world.doOneCycle();
                    };
                world = new WorldMorph(document.getElementById('world'), false); // don't fill
                ide.openIn(world);
                requestAnimationFrame(loop);
            };
        </script>
    </head>
    <body>
        <canvas id="world" tabindex="1" width="500" height="300"></canvas>
    </body>
</html>
```

Note that in this setup you are explicitly creating an instance of the IDE and can simply assign it to a variable for further communication. Also note that when instantiating a new WorldMorph you can specify a flag indicating whether it is to take over all the available browser real-eastate or not.

You can configure the looks and behavior of the IDE by passing it a configuration dictionary object. Currently the following preferences are supported:

|keyword	|type	|setting					|
|-			|-		|-							|
|noAutoFill |bool   |do not let the IDE fill the whole World canvas|
|path: 		|str 	|path to additional resources (translations)|
|load: 		|str	|microworld file name (xml)|
|onload:	|callback	|called when the microworld is loaded|
|design:	|str	|currently `"flat"` or `"classic"` (skeuomorphic)|
|theme:	|str	|currently `"bright"` or `"dark"`|
|border:	|num	|pixels surrounding the IDE, default is none (zero)|
|lang:		|str	|translation to be used, e.g. `"de"` for German|
|mode:		|str	|currently `"presentation"` or `"edit"`|
|hideControls:	|bool	|hide/show the tool bar|
|hideCategories:	|bool	|hide/show the palette block category buttons|
|hideProjectName:	|bool	|hide/show the project title in the tool bar|
|hideProjects:	|bool	|hide/show the projects menu button in the tool bar|
|hideSettings:	|bool	|hide/show the settings menu button in the tool bar|
|noProjectItems:	|bool	|hide/show project specific menu items in the file/project menu|
|noDefaultCat:	|bool	|hide/show the default built-in category buttons|
|noSpriteEdits:	|bool	|hide/show the corral & sprite controls/menus|
|noSprites:	|bool	|hide/show the stage, corral, sprite editor|
|noPalette:	|bool	|hide/show the palette including the categories|
|noImports:	|bool	|disable/allow importing files via drag&drop, hides the project menu button|
|noCloud:	|bool	|disable/enable functionalities to access the Snap! cloud|
|noOwnBlocks:	|bool	|hide/show "make a block" and "make a category" buttons|
|noRingify:	|bool	|disable/enable "ringify" / "unringify" in context menus|
|noUserSettings:	|bool	|disable/enable persistent user preferences|
|noDevWarning:	|bool	|ignore development version incompatibility warning|
|noExitWarning:	|bool	|do not show a browser warning when closing the IDE with unsaved changes|
|preserveTitle:	|bool	|do not set the tab title dynamically to reflect the current Snap! version|
|zoom:    |num    |global zoom factor, e.g. `1.25`|
|blocksZoom:	|num	|zoom factor for blocks, e.g. `1.5`|
|blocksFade:	|num	|fading percentage for blocks, e.g. `85`|
|zebra:	|num	|contrast percentage for nesting same-color blocks|

Note that such configurations will not affect the user's own preference settings, e.g. configuring the blocks zoom or language will not overwrite the user's own settings which are kept in localstorage.



### Embedding Snap! in an iframe

Getting hold of an ide can usually be achieved by
evaluating:

    var ide = world.children[0];

The model case in mind is embedding Snap! in an iframe following a pattern such as this example:

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
undefined


### IDE_Morph.prototype.getSpriteScriptsXML()
the getSpriteScriptsXML() method returns a string in XML format representing the serialized scripts of the sprite identified by name or the currently edited sprite stripped of all dependenies, i.e. without custom block definitions or data (variables)

#### syntax
    ide.getSpriteScriptsXML([spriteName]);

#### parameters
* spriteName
    * name of sprite or stage whose scripts to fetch, or none, in which case the currently edited object will be taken

#### return value
an XML String


### IDE_Morph.prototype.loadSpriteScriptsXML()
the loadSpriteScriptsXML() method replaces the scripts of the specified sprite or stage with a set of serialized ones encoded in a string in XML format, no questions asked. Note: No dependency handling is expected, i.e. the xml-String is meant to be stripped of all dependenies, i.e. without custom block definitions or data (variables)

#### syntax
    loadSpriteScriptsXML(scriptsXML);

#### parameters
* scriptsXML
    * XML string representing a set of serialized scripts stripped of their dependencies

#### return value
an XML String


### IDE_Morph.prototype.flashSpriteScripts()
the flashSpriteScripts() method highlights the blocks of the scripts of the sprite indicated by name - or the current sprite or stage if none - that correspond to the portion of the text between the start- and end lines when using the current codification mapping

#### syntax
    flashSpriteScripts(fromLOC, toLOC[, spriteName[, colorCSV]]);

#### parameters
* fromLOC
    * integer representing the first line of mapped code to be signaled, starting at 1
* toLOC
    * integer representing the last line of mapped code to be signaled
* spriteName
    * name of sprite or stage whose scripts to fetch, or none, in which case the currently edited object will be taken
* colorCSV
    * string with comma-separated integer values representing a color in the form "r,g,b[,a]", or none, in which case the default highlight color will be used. Color components are numbers between 0 and 255, alpha a fraction between 0 and 1.

#### return value
undefined


### IDE_Morph.prototype.flashSpriteScriptAt()
the flashSpriteScriptAt() method highlights the innermost block of the scripts of the sprite indicated by name - or the current sprite or stage if none - that corresponds to the position of the given character index when using the current codification mapping

#### syntax
    flashSpriteScriptAt(charIdx[, spriteName[, colorCSV]]);

#### parameters
* charIdx
    * integer representing the character index of mapped code to be signaled, starting at 0
* spriteName
    * name of sprite or stage whose scripts to fetch, or none, in which case the currently edited object will be taken
* colorCSV
    * string with comma-separated integer values representing a color in the form "r,g,b[,a]", or none, in which case the default highlight color will be used. Color components are numbers between 0 and 255, alpha a fraction between 0 and 1.

#### return value
undefined


### IDE_Morph.prototype.unflashSpriteScripts()
the unflashSpriteScripts() method un-highlights the blocks of the scripts of the sprite indicated by name - or the current sprite or stage if none -

#### syntax
    unflashSpriteScripts([spriteName]);

#### parameters
* spriteName
    * name of sprite or stage whose scripts to fetch, or none, in which case the currently edited object will be taken

#### return value
undefined


### IDE_Morph.prototype.flashSpriteScriptOutlineAt()
the flashSpriteScriptOutlineAt() method highlights the outline of the innermost block of the scripts of the sprite indicated by name - or the current sprite or stage if none - that corresponds to the position of the given character index when using the current codification mapping

#### syntax
    flashSpriteScriptOutlineAt(charIdx[, spriteName[, colorCSV[, border]]]);

#### parameters
* charIdx
    * integer representing the character index of mapped code to be signaled, starting at 0
* spriteName
    * name of sprite or stage whose scripts to fetch, or none, in which case the currently edited object will be taken
* colorCSV
    * string with comma-separated integer values representing a color in the form "r,g,b[,a]", or none, in which case the default highlight color will be used. Color components are numbers between 0 and 255, alpha a fraction between 0 and 1.
* border
    * integer representing the pixel width of the outline highlight

#### return value
undefined


### IDE_Morph.prototype.unflashSpriteScriptsOutline()
the unflashSpriteScriptsOutline() method un-highlights the blocks outlines of the scripts of the sprite indicated by name - or the current sprite or stage if none -

#### syntax
    unflashSpriteScriptsOutline([spriteName]);

#### parameters
* spriteName
    * name of sprite or stage whose scripts to fetch, or none, in which case the currently edited object will be taken

#### return value
undefined


### IDE_Morph.prototype.showScriptBalloonAt()
the showScriptBalloonAt() method highlights the outline of the innermost block of the scripts of the sprite indicated by name - or the current sprite or stage if none - that corresponds to the position of the given character index when using the current codification mapping

#### syntax
    showScriptBalloonAt(contents, charIdx[, spriteName]);

#### parameters
* contents
    * data to be displayed inside the speech balloon, can be a string, number, costume, morph, canvas, list, table etc. - anything first-class in Snap!
* charIdx
    * integer representing the character index of mapped code to be signaled, starting at 0
* spriteName
    * name of sprite or stage whose scripts to fetch, or none, in which case the currently edited object will be taken

#### return value
undefined


### IDE_Morph.prototype.closePopUps()
the closePopUps() method removes all pop-up menus and speech balloon, if any

#### syntax
    closePopUps();

#### return value
undefined


### IDE_Morph.prototype.unsavedChanges()
the unsavedChanges() method returns a Boolean value indicating whether the currently edited project has been modifed since it was last saved.

#### syntax
    ide.unsavedChanges();

#### return value
a Boolean


### IDE_Morph.prototype.resetUnsavedChanges()
the resetUnsavedChanges() method resets the value returned by unsavedChanges() to false.

#### syntax
    ide.resetUnsavedChanges();

#### return value
undefined


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
