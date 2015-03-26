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
