# Misc NetsBlocks/Snap notes
## Adding websocket support
I will probably want to have a couple methods for handling websocket communication:
+ Registering/opening a socket
+ Sending a message
+ Closing a socket (when not running the script)

## Thoughts on interrupts/websocket msg receiving
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

## Automated Testing thoughts
+ I would like to do TDD with this but I need some way to test it... 
+ I might be able to build a little framework around the Javascript world object and interact with it programmatically
+ This would be really nice to have...

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

## To Do
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

+ Create the functionality for the blocks

+ Create server-side `match-making`

+ Create ping-pong game

+ Update `ypr.js` for new blocks (serialization)
