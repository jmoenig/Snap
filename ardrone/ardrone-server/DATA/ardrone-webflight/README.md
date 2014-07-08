# ardrone-webflight

Pilot the AR.Drone 2.0 directly from your browser. Extend the application with plugins
to add features such as video recording, autonomous flight, face recognition, and more.
It makes it a very friendly environment to quickly build and experiment with your drone
(e.g. during a [nodecopter](http://nodecopter.com) event).

If you encounter an issue; please submit it to the issue tracker! You can also catch
up with me (eschnou) on twitter or on #freenode (channel #nodecopter).

**This branch is the development branch, there are no packaged release yet.**

## Built-in plugins

* **[video-png](plugins/video-png/)** stream the video to the browser through static image loading,
    works great in every browser. Requires ffmpeg installed on your system.

* **[video-stream](plugins/video-stream/)** use [node-dronestream](https://github.com/bkw/node-dronestream) to stream the raw h264 video
feed via webscokets and rendering in Javascript !!! Need a modern browser and CPU.

* **[hud](plugins/hud/)** to visualize a head-up display with artificial horizon, compass,
    altimeter, etc. Based on [nodecopter-cockpit](https://github.com/bkw/nodecopter-cockpit)

* **[pilot](plugins/pilot)** to control the drone remotely using the keyboard. Based on [drone-browser](https://github.com/functino/drone-browser).

* **[battery](plugins/battery)** display a battery widget in the top bar.

* **[blackbox](plugins/blackbox)** records all mission data (raw video, navdata, etc.) on the disk.

* **[replay](plugins/replay)** replays a mission by injecting the data at the client level. Makes it a very
friendly tool to code/test/debug when you can't fly. **You need to use video-png for video, not compatible with video-stream yet.**


## Other plugins

Feel free to add your plugins in this list by editing this page.

* **[copterface](https://github.com/eschnou/webflight-copterface)** detect faces and track them by rotating the drone. 
A port of the [copterface](https://github.com/paulhayes/copterface) project to the webflight environment.

* **[traffic](https://github.com/wiseman/webflight-traffic)** displays live Air traffic from ADS-B data as an augmented reality overlay.

* **[gamepad](https://github.com/wiseman/webflight-gamepad)** controls the drone with a gamepad.

* **[tracker](https://github.com/bkw/webflight-tracker)** track pixels on the videostream by clicking on them.

* **[trollface](https://github.com/andrew/webflight-trollface)** detect faces and overlay trollfaces on top of them.

* **[OculusFlight](https://github.com/MyifanW/ARdrone-OculusFlight)** Controls the drone with Oculus Rift.

## Install

WebFlight requires a recent nodejs (built and tested with node > 0.10) as well as
[npm](https://npmjs.org/) and [bower](http://bower.io/) for dependency management.

In order to use the video-png plugin, you also need ffmpeg installed on your system.

```
git clone https://github.com/eschnou/ardrone-webflight.git
cd ardrone-webflight
npm install
bower install
```

## Usage

1. Copy the config.js.sample to config.js and edit to select your plugins
2. Connect to the drone's wifi
3. Run `node app.js`
4. Point your browser to http://localhost:3000/


### Controlling the drone

If you have enabled the **pilot** plugin, you can fly the drone with the following keys. You can define your keyboard in the 
config file. In the plugin, `azerty` and `qwerty` keyboards are defined.  Feel free to define others.

Use `z, s, q, d` to move front, back and sideways. Use your `cursors` to go up/down or turn
clockwise/counter clockwise. Use `t` to takeoff and `l` for landing.

Use the `tab` key to toggle acceleration speed slow/fast.

Use the `f` key to perform a flip in the current direction of movement.

Use the `c` key to switch the video feed between front/bottom camera.

Use the `e` key to recover from an emergency after a crash.

### Record a mission

Just press the `r` to start recording. A popup alers you when the recording starts. Press `r` again to stop. Each mission
is bundled in its own folder.

## Adding your own plugin

There is no tutorial yet, in the meanwhile, just have a look at the built in plugins,
it is faily straightforward.

## Thanks

This work is based on the integration of [nodecopter-cockpit](https://github.com/bkw/nodecopter-cockpit)
and [drone-browser](https://github.com/functino/drone-browser), refactored in a plugin architecture.
Thanks to [@bkw](https://github.com/bkw/) and [@functino](https://github.com/functino) for sharing! Also
a big thank you to [@felixge](https://github.com/felixge) for his [node-ar-drone](https://github.com/felixge/node-ar-drone) library
which pushed me into buying a drone and become crazy about these little flying robots!

## License

The MIT License

Copyright (c) 2013 by the AUTHORS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
