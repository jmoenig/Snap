var join = require('path').join;

function video(name, deps) {
    var path = '/plugin/' + name + '/js/nodecopter-client.js';
    // serve nodecopter-client from node_modules:

    deps.app.get(path, function (req, res) {
        res.sendfile(join(
            'node_modules', 'dronestream', 'dist', 'nodecopter-client.js'
        ));
    });

    require("dronestream").listen(3001, {tcpVideoStream: deps.client.getVideoStream()});
}

module.exports = video;
