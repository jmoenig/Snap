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
            stage = this.parentThatIsA(StageMorph),
            cache;
        stage.signada = {};
        stage.signada.ip = ip;
        stage.signada.socket = socket;
        stage.signada.responses = {};
        stage.signada.responseCache = {};
        stage.signada.lastID = 0;
        stage.signada.eventListener = function (event) {
            response = JSON.parse(event.data);
            if (Array.isArray(response[1])) {
                response[1] = new List(response[1]);
            }
            stage.signada.responses[response[0]] = response[1];

            // Cache the response for when hat blocks
            cache = Object.values(stage.signada.responseCache).find(
                each => each.requestID === response[0]
            );
            if (cache) {
                cache.value = response[1];
                cache.updating = false;
            }
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
    'sgd_call(blockname, params, defaultresponse)',
    function (blockname, params, defaultresponse, proc) {
        var signada = this.parentThatIsA(StageMorph).signada,
            hatBlock = proc.topBlock.parentThatIsA(HatBlockMorph),
            needsCaching = !isNil(hatBlock) &&
                (hatBlock.selector === 'receiveCondition'),
            updatingCache = (signada.responseCache[blockname]?.updating),
            defaultresponse =
                (defaultresponse === undefined) ? 0 : defaultresponse;

        if (!SnapExtensions.primitives.get('sgd_connected()').call(this)) {
            throw new Error(
                'You are not connected to any device.\n' +
                'Please use the connect block to establish a connection and' +
                'try again.'
            );
        }

        if (!proc.requestID) {
            if (!needsCaching || !updatingCache) {
                proc.startTime = new Date();
                proc.requestID = signada.lastID;

                // Cache responses for reporters inside when hat blocks
                if (signada.responseCache[blockname]) {
                    // Let's mark the cached response as updating so we don't
                    // request it again until we get a response from the device
                    signada.responseCache[blockname].updating = true;
                    signada.responseCache[blockname].requestID = proc.requestID;
                    signada.responseCache[blockname].requestTime =
                        (new Date()).getTime();
                } else {
                    // Never sent a similar request before. Let's give it a
                    // default value.
                    signada.responseCache[blockname] = {
                        requestID: proc.requestID,
                        updating: true,
                        value: defaultresponse,
                        requestTime: (new Date()).getTime()
                    };
                }

                signada.socket.send(
                    JSON.stringify([signada.lastID, blockname, params.contents])
                );

                // Last ID wraps at 1.000.000 to make sure it doesn't grow too
                // much and doesn't wrap too early
                signada.lastID = (signada.lastID + 1) % 1000000;
            }
        } else {
            if (signada.responses[proc.requestID] !== undefined) {
                var response = signada.responses[proc.requestID];
                proc.requestID = null;
                return response;
            } else if ((new Date() - proc.startTime) > 1000) {
                // Timeout after 1 second. Return last cached value
                proc.requestID = null;
                signada.responseCache[blockname].updating = false;
                return signada.responseCache[blockname].value;
            }
        }

        if (needsCaching) {
            // This reporter needs caching. Let's return the last value for this
            // particular block name.
            if (updatingCache &&
                (((new Date()).getTime() -
                    signada.responseCache[blockname].requestTime) > 250)) {
                // We've been waiting for the cache to update for a long time.
                // Let's invalidate it so the value is requested again.
                signada.responseCache[blockname].updating = false;
            }
            return signada.responseCache[blockname].value;
        }

        proc.pushContext('doYield');
        proc.pushContext();
    }
);
