# node-dronestream

Get a realtime live video stream from your
[Parrot AR Drone 2.0](http://ardrone2.parrot.com/) straight to your browser.

## Requirements

You'll need a decent and current browser and some cpu horsepower.
This code uses web-sockets and the incredibly awesome
[Broadway.js](https://github.com/mbebenita/Broadway) to render the video frames
in your browser using a WebGL canvas.

## How to use

Please see the http.createServer and Express 3.0 examples in the 'examples' dir.
You attach the stream to your server like this:
```javascript
// in node:
//
// note that the 'server' object points to a server instance and NOT an express app.
require("dronestream").listen(server); 
// if your drone is on a different IP
require("dronestream").listen(server, { ip: "192.168.2.155" });
```

We serve the client in the same manner as Socket.IO. Add a reference to 
**/dronestream/nodecopter-client.js** in your template. Then attach the stream to a DOM node:
```html
<!-- on the client -->
<script src="/dronestream/nodecopter-client.js"></script>
<script>
  // video canvas will auto-size to the DOM-node, or default to 640*360 if no size is set.
  new NodecopterStream(document.getElementById("droneStream"));
</script>
```

## How it works

The drone sends a proprietary video feed on 192.168.1.1 port 5555. This is
mostly a h264 baseline video, but adds custom framing. These frames are parsed
and mostly disposed of. The remaining h264 payload is split into NAL units and
sent to the browser via web sockets.

In the browser broadway takes care of the rendering of the WebGL canvas.

## Status

Node-dronestream has gained some stability in the last release. It attempts 
to recover lost connections to the drone, and it handles multiple clients, 
disconnections, etc. See "How to use" for API.

## Thanks

- Triple high fives to Felix 'felixge' Geisendörfer for getting the whole
  NodeCopter movement started and being extremely helpful in the process of
  getting this together.

- André 'zoddy' Kussmann for supplying the drone and allowing me to keep
  hacking on it, even when he had to cancel the NodeCopter event for himself.

- Michael Bebenita, Alon Zakai, Andreas Gal and Mathieu 'p01' Henri for the
  magic of Broadway.js

- Johann Phillip Strathausen for being a great team mate at NodeCopter 2012
  Berlin.

- Brian Leroux for being not content with the original solution and for
  cleaning up the predecessor, nodecopter-stream.

- @karlwestin for picking up where I was to lazy to actually make this usable.

## Demo

Watch @felixge demoing node-dronestream live at german user group cgnjs:
http://www.youtube.com/watch?v=nwGNNMJt4mE&t=19m52
