## The Snap! API

Jens Mönig, Dec. 18, 2019

This document describes how Snap! can be accessed from an outside program to start scripts, send and retrieve information. The model use case is embedding interactive Snap! projects in other websites such as MOOCs or other adaptive learning platforms.

This experimental Snap! API is a set of methods for an IDE_Morph containing a Snap! project. These methods are maintained to work with future versions of Snap! They can be used to trigger scripts, get feedback from running scripts, and access the project's global variables.

Currently the API consists of the following methods:

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

Getting hold of an ide can usually be achieved by
evaluating:

     var ide = world.children[0];


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
an Array of strings, or an empty Array


### IDE_Morph.prototype.getVarNames()
The getVarNames() method returns a new Array that contains all the global variable names in the project.

#### syntax
    ide.getVarNames();

### return value
an Array of strings, or an empty Array


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
