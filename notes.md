# Misc NetsBlocks/Snap notes
## Snap cloud storage API
+ I am reverse engineering the Snap! server

+ API names
    + saveProject
    + cancelAccount
    + changePassword
    + deleteProject
    + getProject
    + getProjectList
    + logout
    + login
    + publishProject
    + unpublishProject

+ I need to update the "SnapCloud" name to "netsblox"

+ I need to add some tests for sign in, etc


## Thoughts on interrupts/websocket msg receiving
+ Add game "namespaces" to the server

+ I may need to queue it or create a new process and add it in
  + That is, the event listener for the web socket may need to queue or create a process for the event handling...
    + startProcess

## Misc Design Comments
+ Added 3 primitives to the Process object: `doSocketConnect`, `doSocketDisconnect` and `doSocketMessage`
  + From this, I should be able to compose the functionality for the "register", "unregister" block and the "broadcast remote" block
  + For now, I will focus on "register" and "broadcast remote"

+ Should the message types be shared between 'remote broadcast' and 'broadcast'?
  + Probably would be cleaner to not have them shared... Sharing them can create some funny, ambiguous situations
  + Should I have the menu populated with all messages? I think I will to start anyway
      + Currently, I am sharing them but I think this will be confusing since the user might use `receivedMessage` block thinking it can be used with `doSocketMessage`...
      + Change this? TODO

      + Enter and Exit should be only added to the Hat block for socket messages and should be ignored if they are active for the Hat block...
      + TODO

+ The `receiveMessage` block should also listen for network requests. That is, we should fire a message when we receive a socket message

# Additional Features
+ Blocks for Comments?

+ Creating Microservices and RPC's?

+ Creating a `Cordova` project
    + GUI
        + Create the small canvas on the mobile screen?
    + Interactions
        + Keyboard may still work...
        + I believe touch is already supported
    + Some methods may need to be overridden
        + XMLHttpRequest?

+ Central repository for projects?
    + Berkeley already hosts one

+ Currently open games/apps?
    + Should we be able to invite people to collaborate with us on projects?

    + If you load a project from your browser, it should behave normally; if you are
        working on a cloud hosted project, you should be able to share it with others.
    + I should add my own cloud hosted location
        + This should probably be easy to change... Should I add the requesting to the
          server?

+ As a side note, I think I could hack into other people's accounts given access to their logged in machine... Maybe I could do it in text blocks...

# Snap structure notes
## Spec
+ How are the spec things made?
  + `blocks.js` :2059 `BlockMorph.prototype.setSpec`
  + In `blocks.js` :1083, it creates the appropriate `InputSlotMorph`
    + Maintain a `choiceDict` name
      + msgHat is mapped to 'messagesReceivedMenu' :6640
      + 'messagesReceivedMenu' collects all the messages from the other blocks (including the stage...)
      + For now, I simply copy and pasted the 

+ `messagesReceivedMenu` vs `messagesMenu`
  + `dict` is initialized to different values (one includes "any message")
  + `messagesMenu` adds '~' as needed. 
  + Otherwise, they are the same -> lot of code duplication

## Evaluating blocks
+ `Process` has a method called `evaluateBlock` on line 487 of `threads.js`
  + Basically, it checks if the Process contains a method by the given name. If not, it will check `StageMorph`
    + Add macro blocks on line 3510 (or so) of `object.js`
    + How do we call the atomic process methods from the `SpriteMorph`?

## Fix me!
+ Should I implement the DDP protocol?
    + They have a library for it

+ I need server side grouping by project id
    + How can I get the project id on the client?
        + Is it in the `globalVariables` variable?
    + Should I move the Websocket manager?

## To Do
+ Create a testing framework/hooks for Snap 
    + Created one for the server-side logic

+ Create a testing framework/hooks for Snap 

+ Message type checking

## Adding websocket support
I will probably want to have a couple methods for handling websocket communication:
+ Registering/opening a socket
+ Sending a message
+ Closing a socket (when not running the script)

## Finished To do/Fix me!
+ Create network messages for Snap
    + How can the `receiveSocketMessage` hat receive the content sent?
        + Can I create a variable context and pass it with the block?
            + Could I create a process where the variable frame is passed in?
        + I could create temp variables that are deleted after assigning the desired things

        + I am really just creating the context before the process...

    + Do we know that the `process.homeContext.receiver` is what we think?
        + It is the SpriteMorph --> Not what we want

+ X being played in the wrong spot
    + DONE

+ Filtering with socket msg blocks is broken
    + Fixed 

+ Fix 'direction' not defined in this context
    + startProcess seems to be being called continuous
        + Fixed -> old block
    + Only breaks after I send a network request. There must be a problem with returning to the correct context following a websocket request...

    + Fixed... Old blocks?
    + Almost the same problem again with 'x'
        + Should I treat the context differently?
        + Should I provide the user with message types?
        +        OR
        + Should I simply allow the user to send whatever he/she wants?
            + This won't work with connection/disconnection stuff
    + I am going to step through the code some and track the contexts
        + x-cols and x-rows belong to the context above receiver ('opponent')
        + They seem to be removed from the receiver.variables.allNames()
        + FIXED: Changed allNames() to names()

+ 'received join from undefined' on creating a new project
    + Fixed...

+ Create laser shooting game
    + DONE

+ The second client is unresponsive...
    + this.scripts.children is empty... objects.js :3610
    + Turn based restriction - feature not a bug ;)

+ `doFaceTowards` not working as expected...
    + Implemented in Process object
    + The xPosition and yPosition don't seem to be correct
        + threads.js :2360
    + The image was too big and part of it was transparent. FIXED

+ Refactor GroupManagement to be modular
    + They need a common interface...
        + Event listeners
            + onConnect(id)
            + onMessage(id, message) // message is optional
            + onDisconnect(id)

        + Group API
            + getGroupMembers(id)
    + DONE

+ Crashes when broadcasting to group with closed socket
    + DONE

+ Sending a message before a `register` message breaks the server...
    + For now, I will probably put the `unregistered` users in a GLOBAL group
    + FIXED

+ Create the visual blocks:
  + Create the visual blocks: (1876)
    + register DONE!
    + `remoteBroadcast` DONE!
    + unregister DONE!
    + `receiveSocketMessage` DONE!
  + Create drop down menu for clients
    + Define my own %spec drop down for roles
      + Populate the drop down with custom `allMessageNames` equivalent
        + `allRoleNames`?  --> only the register blocks will have anything...
        + Add `allRoleNames` to `SpriteMorph` and `StageMorph` in `objects.js`
          + line 3514

    + Create custom messages that include `join` and `leave`
        + Done!
    + Getting all message types should ignore 'join' and 'leave' for the event listener...

+ Create the functionality for the blocks

+ Create server-side `match-making`
    + DONE

+ receiveSocketMessage support
    + where is allHatBlocksFor called again?
        + fireGreenFlagEvent
        + DONE

+ websocket is created for each process... It should either be in the threadmanager or the sprite morph
    + DONE

+ Add socket disconnect detection
+ I would like to store the network default messages in an enum somewhere... I am not sure where...
  + DONE

+ Close the web sockets when the project changes...
    + Close the web sockets when the project changes...
    DONE

