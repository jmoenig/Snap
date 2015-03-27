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
+ Added 3 primitives to the Process object: doSocketConnect, doSocketDisconnect and doSocketMessage
  + From this, I should be able to compose the functionality for the "register", "unregister" block and the "broadcast remote" block
  + For now, I will focus on "register" and "broadcast remote"

# Snap structure notes
## Spec
+ How are the spec things made?
    + blocks.js :2059 "BlockMorph.prototype.setSpec"
    + In blocks.js :1083, it creates the appropriate InputSlotMorph
      + Maintain a 'choiceDict' name
        + msgHat is mapped to 'messagesReceivedMenu'
## To Do
+ Create the visual blocks:
    + Create the visual blocks: (1876)
      + register DONE!
      + remoteBroadcast DONE!
      + unregister DONE!
      + receiveSocketMessage DONE!
    + Create dropdown menu for clients
        + Define my own %spec thing

+ Update ypr for new blocks
