/* Signada - a network remote control procotol
 * ===========================================
 * By Bernat Romagosa, August 2021
 *
 * Enables Snap! to talk to wifi-enabled
 * MicroBlocks devices.
 *
 * This protocol was designed for the Citilab
 * ED1 microcontroller board, but it can be
 * used for any ESP32 board that has a display
 * and two buttons, like the M5Stack.
 *
 * First, load the Signada example project
 * from the MicroBlocks IDE and follow the
 * instructions on the long comment in that
 * project.
 *
 * Get MicroBlocks at https://microblocks.fun
 */

SnapExtensions.primitives.set(
    'sgd_connect(ip)',
    function (ip) {
        if (location.protocol.indexOf('https') > -1) {
            throw new Error(
                'Signada requires an HTTP only instance of Snap!, like:\n' +
                'http://extensions.snap.berkeley.edu'
            );
        }
        var socket = new WebSocket('ws://' + ip + ':81'),
            stage = this.parentThatIsA(StageMorph);
        stage.signada = {};
        stage.signada.ip = ip;
        stage.signada.socket = socket;
        stage.signada.responses = {};
        stage.signada.lastID = 0;
        stage.signada.eventListener = function(event) {
            response = JSON.parse(event.data);
            if (Array.isArray(response[1])) {
                response[1] = new List(response[1]);
            }
            stage.signada.responses[response[0]] = response[1];
        };

        socket.addEventListener('message', stage.signada.eventListener);
    }
);

SnapExtensions.primitives.set(
    'sgd_disconnect()',
    function () {
        var stage = this.parentThatIsA(StageMorph);
        if (SnapExtensions.primitives.get('sgd_connected()').call(this)) {
            stage.signada.socket.removeEventListener(
                'message',
                stage.signada.eventListener
            );
            stage.signada.socket.close();
        }
    }
);

SnapExtensions.primitives.set(
    'sgd_connected()',
    function () {
        var signada = this.parentThatIsA(StageMorph).signada;
        return (signada !== undefined) && (signada.socket.readyState === 1);
    }
);

SnapExtensions.primitives.set(
    'sgd_call(blockname, params)',
    function (blockname, params, proc) {
        var signada = this.parentThatIsA(StageMorph).signada;
        if (!SnapExtensions.primitives.get('sgd_connected()').call(this)) {
            throw new Error(
                'You are not connected to any device.\n' +
                'Please use the connect block to establish a connection and' +
                'try again.'
            );
        }
        if (!proc.requestID) {
            proc.startTime = new Date();
            var signada = this.parentThatIsA(StageMorph).signada;
            signada.socket.send(
                JSON.stringify([signada.lastID, blockname, params.contents])
            );
            proc.requestID = signada.lastID;
            // Last ID wraps at 1.000.000 to make sure it doesn't grow too much
            // and it doesn't wrap too early, colliding with other requests.
            signada.lastID = (signada.lastID + 1) % 1000000;
        } else {
            if (signada.responses[proc.requestID] !== undefined) {
                return signada.responses[proc.requestID];
            } else if ((new Date() - proc.startTime) > 1000) {
                // Timeout after 1 second
                return;
            } else {
            }
        }
        proc.pushContext('doYield');
        proc.pushContext();
    }
);
