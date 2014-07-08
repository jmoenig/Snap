var fs = require('fs');
var path = require('path');
var df = require('dateformat');
var PaVEParser = require('ar-drone/lib/video/PaVEParser')

var client
  , io
  , config
  , navStream
  , motionStream
  , videoStream
  , paveStream
  , recording = false
  ;

function blackbox(name, deps) {

    client = deps.client;
    io = deps.io;
    config = deps.config;

    // Listen to user actions to start/stop recording
    deps.io.sockets.on('connection', function (socket) {
        socket.on('/blackbox/start', function (cmd) {
            _start();
        });
        socket.on('/blackbox/stop', function (cmd) {
            _stop();
        });
    });

    // Listen to navdata and process them
    deps.client.on('navdata', function(data) {
        _writeNavData(data);
    });

    // Process the videostream
    var parser = new PaVEParser();
    parser.on('data', function(data) {
        _writeVideo(data);
    })
    client.getVideoStream().pipe(parser);

};

function _start() {
   if (recording) return;
   console.log("Start recording navigation data");
   if (config && config.blackbox && config.blackbox.path) {
       var root = config.blackbox.path;
   } else {
       var root = ".";
   }
   var folder = df(new Date(), "yyyy-mm-dd_hh-MM-ss");
   fs.mkdir(path.join(root, folder), function() {
      navStream = fs.createWriteStream(path.join(root, folder, 'navdata.txt'));
      videoStream = fs.createWriteStream(path.join(root, folder, 'video.h264'));
      paveStream = fs.createWriteStream(path.join(root, folder, 'paveHeaders.txt'));
      motionStream = fs.createWriteStream(path.join(root, folder, 'motion.txt')); 
      motionStream.write("seq,pitch,roll,yaw,xVelocity,yVelocity,zVelocity,altitude\n", function() {
          recording = true;
          io.sockets.emit('/message', "Blackbox started recording NavData.");
      });
    });
}

function _stop() {
    if (!recording) return;
    console.log("Stopped recording navigation data");
    recording = false;
    navStream.end();
    motionStream.end();
    paveStream.end();
    videoStream.end();
    io.sockets.emit('/message', "Blackbox stopped recording NavData.");
}

function _writeNavData(data) {
    if (!recording) return;

    navStream.write(JSON.stringify(data) + "\n");
    
    var seq   = data.sequenceNumber
      , pitch = data.demo.rotation.pitch
      , roll  = data.demo.rotation.roll
      , yaw   = data.demo.rotation.yaw
      , vx    = data.demo.velocity.x
      , vy    = data.demo.velocity.y
      , vz    = data.demo.velocity.z
      , z     = data.demo.altitude
      ;

    motionStream.write(seq + "," + pitch + "," + roll + "," + yaw + "," + vx + "," + vy + "," + vz + "," + z + "\n");
}

function _writeVideo(data) {
    if (!recording) return;

    videoStream.write(data.payload);
    
    var header = {
          signature               : data.signature,
          version                 : data.version,
          video_codec             : data.video_codec,
          header_size             : data.header_size,
          payload_size            : data.payload_size,
          encoded_stream_width    : data.encoded_stream_width,
          encoded_stream_height   : data.encoded_stream_height,
          display_width           : data.display_width,
          display_height          : data.display_height,
          frame_number            : data.frame_number,
          timestamp               : data.timestamp,
          total_chunks            : data.total_chunks,
          chunk_index             : data.chunk_index,
          frame_type              : data.frame_type,
          control                 : data.control,
          stream_byte_position_lw : data.stream_byte_position_lw,
          stream_byte_position_uw : data.stream_byte_position_uw,
          stream_id               : data.stream_id,
          total_slices            : data.total_slices,
          slice_index             : data.slice_index,
          header1_size            : data.header1_size,
          header2_size            : data.header2_size,
          advertised_size         : data.advertised_size,
    }

    paveStream.write(JSON.stringify(header) + "\n");
}

module.exports = blackbox;
