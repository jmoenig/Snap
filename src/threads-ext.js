/* global Process, IDE_Morph, Costume, StageMorph, List, SnapActions,
 isObject, newCanvas, Point, localize */

// Additional Process Capabilities
Process.prototype.doSocketMessage = function (msgInfo) {
    var ide = this.homeContext.receiver.parentThatIsA(IDE_Morph),
        targetRole = arguments[arguments.length-1],
        srcId = [ide.projectName, ide.room.name, ide.room.ownerId].join('@'),
        name = msgInfo[0],
        fieldNames = msgInfo[1],
        fieldValues = Array.prototype.slice.call(arguments, 1, fieldNames.length + 1),
        contents;

    // check if collaborating. If so, show a message but don't send
    const isCollaborating = SnapActions.isCollaborating() && !SnapActions.isLeader;
    if (isCollaborating && !ide.allowMsgsWhileCollaborating) {
        const isUsingDefaultMsgSendingOption = ide.allowMsgsWhileCollaborating === null;
        if (isUsingDefaultMsgSendingOption) {
            const title = localize('Message sending blocked while collaborating');
            const message = localize('By default, message sending is disabled when collaborating because it can make\ndebugging distributed applications difficult.\n\n') +
                localize('When multiple users collaborate, each collaborating user may send his/her own response\nto a received message. ') +
                localize('This is problematic when using the "send msg and wait"\nblock as well as for applications like turn-based games.\n\n') +
                localize('Would you like to enable message sending while collaborating?');
            ide.confirm(message, title)
                .then(confirmed => ide.allowMsgsWhileCollaborating = confirmed);
        }
        this.topBlock.showBubble('Cannot send message when collaborating');
        return;
    }

    // If there is no name, return
    if (!name) {
        return;
    }

    // Create the message
    contents = {};
    // Set the fields
    for (var i = fieldNames.length; i--;) {
        contents[fieldNames[i]] = fieldValues[i] || '';
    }

    var dstId = targetRole instanceof List ? targetRole.asArray() : [targetRole];
    function resolveAddress(addr) {
        if (addr.includes('@')) {
            return [addr];
        }

        let targets;
        if (addr instanceof Array) {
            targets = ide.room.getRoleNames();
            if (addr[0] === 'others in room') {
                targets = targets.filter(name => name !== ide.projectName);
            }
        } else {
            targets = [ide.projectName];
        }

        const ownerId = ide.room.ownerId;
        const project = ide.room.name;
        return targets.map(addr => `${addr}@${project}@${ownerId}`);
    }

    var sendMessage = function() {
        ide.sockets.sendMessage({
            type: 'message',
            dstId: dstId.flatMap(resolveAddress),
            srcId: srcId,
            msgType: name,
            content: contents
        });

    };

    var TURBO_OUTPUT_RATE = 90; // per sec
    var outputRate = TURBO_OUTPUT_RATE;
    var delay = 1000 / outputRate;

    if (!this.reportIsFastTracking()) {
        return sendMessage();
    }

    // else rate limit in turbo mode
    var id = 'asyncFn-sendMsg';
    if (!this[id]) {
        this[id] = {};
        this[id].endTime = new Date().getTime() + delay;
        sendMessage();
        this[id].onerror = function(event) {
            this[id].error = event;
        };
    } else if (new Date().getTime() > this[id].endTime) {
        // delay is passed
        this[id] = null;
        return;
    }
    this.pushContext('doYield');
    this.pushContext();

};

//request block
Process.prototype.MESSAGE_REPLY_TIMEOUT = 1500;
Process.prototype.doSocketRequest = function (msgInfo) {
    var ide = this.homeContext.receiver.parentThatIsA(IDE_Morph),
        targetRole = arguments[arguments.length-1],
        myRole = ide.projectName,  // same as seat name
        roomName = ide.room.name,
        ownerId = ide.room.ownerId,
        name = msgInfo[0], //msg name | resource name
        fieldNames = msgInfo[1],
        fieldValues = Array.prototype.slice.call(arguments, 1, fieldNames.length + 1),
        contents,
        requestId;

    // check if collaborating. If so, show a message but don't send
    if (SnapActions.isCollaborating() && !SnapActions.isLeader) {
        this.topBlock.showBubble('Cannot send message when collaborating');
        return;
    }

    // If there is no name, return
    if (!name) {
        return;
    }

    // if there is no requestId then init the requestId
    if (!this.requestId){
        requestId= '__REQ' + Date.now();
        //save the request id to check for later
        this.requestId = requestId;

        // Create the message
        contents = {};
        // Set the fields
        for (var i = fieldNames.length; i--;) {
            contents[fieldNames[i]] = fieldValues[i] || '';
        }
        ide.sockets.sendMessage({
            type: 'message',
            dstId: targetRole,
            srcId: myRole+'@'+roomName+'@'+ownerId,
            msgType: name,
            requestId: requestId,
            content: contents
        });
        this.messageSentAt = Date.now();
    } else if (this.reply) {
        // request has already been made and we received the reply
        requestId = this.requestId;
        var reply = this.reply;

        if (this.requestId === requestId ) {
            this.requestId = null;
            this.reply = null;
            this.messageSentAt = null;
        }
        return reply.content.body;
    } else if (Date.now() - this.messageSentAt > this.MESSAGE_REPLY_TIMEOUT) {
        var stage = this.homeContext.receiver.parentThatIsA(StageMorph);
        stage.rpcError = 'Timeout Exceeded';
        return null;
    }
    this.pushContext('doYield');
    this.pushContext();
};

// reply block
Process.prototype.doSocketResponse = function (resource) {
    var ide = this.homeContext.receiver.parentThatIsA(IDE_Morph),
        requestId,
        srcId,
        contents;

    try {
        requestId = this.context.variables.getVar('__requestId__');
        srcId = this.context.variables.getVar('__srcId__');
    } catch (e) {
        // Clean the error message
        throw new Error(localize('Cannot find message to which to respond!'));
    }

    // Create the message
    contents = {body: resource};
    ide.sockets.sendMessage({
        type: 'message',
        dstId: srcId,
        msgType: '__reply__',
        requestId: requestId,
        content: contents
    });
};


/**
 * On socket message, unpack the message content into the variables in
 * the list.
 *
 * @return {undefined}
 */
Process.prototype.receiveSocketMessage = function (fields) {
    var varFrame = this.context.outerContext.variables,
        names = varFrame.names(),
        content;

    // If we haven't received a message, do nothing
    if (names.indexOf('__message__') === -1) {
        return;
    }
    // Check for the message type in the stage
    // FIXME: Provide an error message about how we must receive an actual msg
    content = this.context.variables.getVar('__message__');
    if (!fields.length) {
        fields = Object.keys(content);
    }

    // Add variables by the type, NOT a complex object!
    for (var i = fields.length; i--;) {
        varFrame.addVar(fields[i], content[fields[i]]);
    }
    varFrame.deleteVar('__message__');
};

Process.prototype.createRPCUrl = function (url) {
    var ide = this.homeContext.receiver.parentThatIsA(IDE_Morph);
    const {clientId} = ide.cloud;

    // TODO: add a client secret?
    return url + '?clientId=' + clientId;
};

Process.prototype.callRPC = function (baseUrl, params, noCache) {
    var url = this.createRPCUrl(baseUrl),
        response,
        contentType,
        stage,
        image;

    if (noCache) {
        url += '&t=' + Date.now();
    }
    if (typeof params === 'string') {  // Converting from old querystring style args
        var pairs = params.split('&').map(function(pair) {
            return pair.split('=');
        });
        params = {};
        pairs.forEach(function(pair) {
            params[pair[0]] = pair[1];
        });
    }

    if (!this.rpcRequest) {
        this.rpcRequest = new XMLHttpRequest();
        this.rpcRequest.responseType = 'arraybuffer';
        this.rpcRequest.open('POST', url, true);
        this.rpcRequest.setRequestHeader('Content-Type', 'application/json');
        this.rpcRequest.send(JSON.stringify(params));
    } else if (this.rpcRequest.readyState === 4) {
        if (this.rpcRequest.status === 0) {
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            stage.rpcError = 'Request too large';
            return;
        }
        if (this.rpcRequest.status === 404) {
            const [rpc, service] = baseUrl.split('/')
                .filter(chunk => chunk)
                .reverse();
            return this.errorRPCNotAvailable(service, rpc);
        }
        contentType = this.rpcRequest.getResponseHeader('content-type');
        if (contentType && contentType.indexOf('image') === 0) {
            image = this.getCostumeFromRPC(baseUrl, params);
            if (image) {
                this.rpcRequest = null;
            }
            return image;
        } else {  // assume text
            var text = new TextDecoder('utf-8').decode(new Uint8Array(this.rpcRequest.response));
            response = decodeURIComponent(encodeURIComponent(text));
            stage = this.homeContext.receiver.parentThatIsA(StageMorph);
            if (this.rpcRequest.status < 200 || this.rpcRequest.status > 299) {
                stage.rpcError = response;
            } else {
                stage.rpcError = null;
            }
            this.rpcRequest = null;
            return response;
        }
    } else if (this.readyToTerminate) {  // abort the RPC invocation
        this.rpcRequest.abort();
        this.rpcRequest = null;
    }

    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.getCostumeFromRPC = function (url, params) {
    var image;

    // Create the costume (analogous to reportURL)
    if (!this.rpcRequest || this.rpcRequest.readyState !== 4) {
        return this.callRPC(url, params, true);
    } else if (!this.requestedImage) {
        var rawPNG = this.rpcRequest.response;
        var contentType = this.rpcRequest.getResponseHeader('content-type');
        var blb = new Blob([rawPNG], {type: contentType});
        var blobUrl = (window.URL || window.webkitURL).createObjectURL(blb);

        this.requestedImage = new Image();
        this.requestedImage.crossOrigin = 'Anonymous';
        this.requestedImage.src = blobUrl;
    } else if (this.requestedImage.complete && this.requestedImage.naturalWidth) {
        // Clear request
        image = this.requestedImage;
        this.requestedImage = null;

        var canvas = newCanvas(new Point(image.width, image.height), true);
        canvas.getContext('2d').drawImage(image, 0, 0);
        return new Costume(canvas);
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.getJSFromRPC = function (url, params) {
    if (typeof params === 'string') {
        var oldParams = params;
        params = {};
        oldParams.split('&').forEach(function(param) {
            var chunks = param.split('='),
                name = chunks[0],
                value = chunks[1];

            if (name) {
                params[name] = value;
            }
        });
    }

    var result = this.callRPC(url, params, true);
    if (result) {
        try {  // Try to convert it to JSON
            result = JSON.parse(result);
        } catch (e) {
            // nop
        }
    }

    result = this.parseRPCResult(result);
    return result;
};

Process.prototype.parseRPCResult = function (result) {
    if (result instanceof Array) {
        return new List(result.map(this.parseRPCResult.bind(this)));
    } else if (typeof result === 'string' && result[0] === '<') {
        var sockets = this.homeContext.receiver.parentThatIsA(IDE_Morph).sockets;
        return sockets.deserializeData([result])[0];
    }
    return result;
};

function listToArray(list) {
    if (!(list instanceof List)){
        return list;
    }
    var combinedArray = [],
        array = list.asArray(),
        element;

    for(var i = 0; i < array.length; i++) {
        element = array[i];
        if (element instanceof List) {
            element = listToArray(element);
        } else if (isObject(element)) {
            SnapActions.serializer.flush();
            element = SnapActions.serializer.getPortableXML(element);
        }
        combinedArray.push(element);
    }
    return combinedArray;
}

Process.prototype.errorRPCNotAvailable = function (service, rpc) {
    throw new Error('Cannot invoke "' + rpc + '" from "' + service + '". Service or RPC is not available.');
};

Process.prototype.doRunRPC =
Process.prototype.getJSFromRPCStruct = function (rpc, methodSignature) {
    var action = methodSignature[0],
        argNames = methodSignature[1],
        values = Array.prototype.slice.call(arguments, 2, argNames.length + 2),
        query= {};

    // build a json obj
    SnapActions.serializer.flush();
    argNames.forEach(function(name, index) {
        if (values[index] instanceof List) {
            query[name] = listToArray(values[index]);
        } else if (isObject(values[index])) {
            query[name] = SnapActions.serializer.getPortableXML(values[index]);
        } else {
            query[name] = values[index];
        }
    });
    SnapActions.serializer.flush();

    return this.getJSFromRPCDropdown(rpc, action, query);
};

Process.prototype.getJSFromRPCDropdown = function (service, rpc, params) {
    const ide = this.homeContext.receiver.parentThatIsA(IDE_Morph);

    if (service && rpc && ide) {
        const services = ide.services;
        const isServiceURL = service instanceof Array;
        const serviceURL = isServiceURL ? service[0] : services.defaultHost.url + '/' + service;
        if (!services.isRegisteredServiceURL(serviceURL)) {
            const serviceName = serviceURL.split('/').pop();
            const msg = 'Service "' + serviceName + '" is not available';
            throw new Error(msg);
        }

        const url = [
            serviceURL,
            encodeURIComponent(rpc),
        ].join('/');
        return this.getJSFromRPC(url, params);
    }
};

// Process Geo
Process.prototype.getLocation = function () {
    var myself = this,
        hasLocation = this.location !== undefined,
        hasRequestedLocation = this.locationError === null,
        errorName;

    if (!hasLocation && !hasRequestedLocation) {
        this.locationError = null;
        navigator.geolocation.getCurrentPosition(function(location) {
            myself.location = location;
        }, function(err) {
            myself.locationError = err;
            myself.location = null;
        });
    } else if (hasLocation) {
        var location = this.location;
        this.location = undefined;
        this.locationError = undefined;
        if (this.locationError || !location) {
            this.locationError = this.locationError || new Error('Could not determine location');
            // Error 'name' is not always provided for PositionErrors. Try to get
            // the name of the Error. Fall back on 'Error'
            errorName = this.locationError.name || (this.locationError.constructor &&
                this.locationError.constructor.name);
            this.locationError.name = errorName || 'Error';
            throw this.locationError;
        }
        return location.coords;
    }
    this.pushContext('doYield');
    this.pushContext();
};

Process.prototype.reportLatitude = function () {
    var location = this.getLocation();
    if (location) {
        return location.latitude;
    }
};

Process.prototype.reportLongitude = function () {
    var location = this.getLocation();
    if (location) {
        return location.longitude;
    }
};

// TODO: I can probably move these next two to the Sprite/StageMorphs
Process.prototype.reportStageWidth = function () {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    return stage.dimensions.x;
};

Process.prototype.reportStageHeight = function () {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    return stage.dimensions.y;
};

Process.prototype.reportImageOfObject = function (object) {
    object = this.reportObject(object);
    if (object !== undefined) {
        return new Costume(object.fullImage());
    }
};

Process.prototype.reportHTTPRequest = function (method, url, data, headers) {
    if (!this.httpRequest) {
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.open(method, url, true);

        this.assertType(headers, 'list');
        for (let i = 1; i <= headers.length(); i += 1) {
            const header = headers.at(i);
            this.assertType(header, 'list');
            this.httpRequest.setRequestHeader(
                header.at(1),
                header.at(2)
            );
        }
        if (utils.isNetsBloxDomain(url)) {
            this.httpRequest.setRequestHeader('X-Source', 'NetsBlox'); // flag this as coming from the NetsBlox client
        }

        this.httpRequest.send(data || null);
    } else if (this.httpRequest.readyState === 4) {
        const res = this.httpRequest.responseText;
        this.httpRequest = null;
        return res;
    }
    this.pushContext('doYield');
    this.pushContext();
};

// helps executing async functions in custom js blocks
// WARN it could be slower than non-promise based approach
// when calling this function, return only if the return value is not undefined.
Process.prototype.runAsyncFn = function (asyncFn, opts) {
    opts = opts || {};
    opts = {
        timeout: opts.timeout || 2000,
        args: opts.args || [],
    };
    var id = '_async' + 'Func' + asyncFn.name; // make sure id doesn't collide with process methods
    var tmp;
    var myself = this;
    if (!id || !(asyncFn instanceof Function)) throw new Error('id or asyncFn input missing');
    if (!this[id]) {
        this[id] = {};
        this[id].startTime = new Date().getTime();
        var timeoutPromise = new Promise(function(_, reject) {
            setTimeout(reject, opts.timeout, 'timeout');
        });
        var requestedPromise = asyncFn.apply(this, opts.args);
        var promise = Promise.race([requestedPromise, timeoutPromise])
            .then(function(r) {
                myself[id].complete = true;
                myself[id].response = r;
            })
            .catch(function(e) {
                myself[id].error = true;
                myself[id].response = e;
            });
        myself[id].onerror = function(event) {
            myself[id].error = event;
        };
        myself[id].promise = promise;
    } else if (myself[id].complete) {
        // Clear request
        tmp = myself[id];
        myself[id] = null;
        return tmp.response;
    } else if (myself[id].error) {
        tmp = myself[id];
        myself[id] = null;
        console.error(tmp.response);
        throw new Error(tmp.response);
    }
    this.pushContext('doYield');
    this.pushContext();
};
