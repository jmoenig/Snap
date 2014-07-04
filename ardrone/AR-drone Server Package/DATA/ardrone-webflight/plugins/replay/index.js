var fs = require('fs');
var df = require('dateformat');
var util = require('util');
var path = require('path');
var timers = require('timers');
var lineReader = require('line-reader');
var reader = require ("buffered-reader");
var config, client,video, navReader, vidReader, rawVideo, lastFrame;

var BinaryReader = reader.BinaryReader;

var NAV_INTERVAL = 1000/15; // Navdata sent 15/s in demo mode
var VIDEO_INTERVAL = 1000/30; // 30 fps

function replay(name, deps) {
    config = deps.config;
    client = deps.client;
    video  = client.getVideoStream();

    // Open the navdata file for line-by-line read
    var self = this;
    var navPath = path.join(config.replay.path, 'navdata.txt');
    lineReader.open(navPath, function(reader) {
      navReader = reader;
    });

    // Open the video raw stream
    var videoPath = path.join(config.replay.path, 'video.h264');
    rawVideo = new BinaryReader(videoPath);

    // Open the video headers stream
    var headerPath = path.join(config.replay.path, 'paveHeaders.txt');
    lineReader.open(headerPath, function(reader) {
        vidReader = reader;
        vidReader.nextLine(function(data) {
            // Read the first line and send video immediately the first time
            var frame = JSON.parse(data);
            lastFrame = frame;
            emitVideo();
        });
    });

    // Schedule timer to simulate nav data emit
    timers.setInterval(emitNav, NAV_INTERVAL);
}

function emitNav() {
    if (navReader && navReader.hasNextLine()) {
        navReader.nextLine(function(data) {
            client.emit('navdata', JSON.parse(data));
        });
    }
}

function emitVideo() {
    if (vidReader && vidReader.hasNextLine()) {
        vidReader.nextLine(function(data) {
            var frame = JSON.parse(data);
            var next  = frame.timestamp - lastFrame.timestamp;
            lastFrame = frame;

            // Read a block (based on the size in the lastFrame)
            rawVideo.read(lastFrame.payload_size, function (error, bytes, bytesRead) {
                if (error) throw error;
                video.emit('data', bytes);
            });
            
            timers.setTimeout(emitVideo, next);
        });
    }
}

module.exports = replay;
