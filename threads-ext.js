/* global ThreadManager, ensureFullUrl, Process, Context, IDE_Morph, Costume, StageMorph,
   List, SnapActions, isObject, newCanvas, Point, SnapCloud */

// NetsProcess Overrides
NetsProcess.prototype = new Process();
NetsProcess.prototype.constructor = NetsProcess;

function NetsProcess(topBlock, onComplete, rightAway, context) {
    this.topBlock = topBlock || null;

    this.readyToYield = false;
    this.readyToTerminate = false;
    this.isDead = false;
    this.isClicked = false;
    this.isShowingResult = false;
    this.errorFlag = false;
    this.context = null;
    this.homeContext = context || new Context();
    this.lastYield = Date.now();
    this.isFirstStep = true;
    this.isAtomic = false;
    this.prompter = null;
    this.httpRequest = null;
    this.rpcRequest = null;
    this.isPaused = false;
    this.pauseOffset = null;
    this.frameCount = 0;
    this.exportResult = false;
    this.onComplete = onComplete || null;
    this.procedureCount = 0;

    if (topBlock) {
        this.homeContext.receiver = topBlock.receiver();
        this.homeContext.variables.parentFrame =
            this.homeContext.receiver.variables;
        this.context = new Context(
            null,
            topBlock.blockSequence(),
            this.homeContext
        );
        if (!rightAway) {
            this.pushContext('doYield'); // highlight top block
        }
    }
}

NetsProcess.prototype.doSocketMessage = function (msgInfo) {
    var ide = this.homeContext.receiver.parentThatIsA(IDE_Morph),
        targetRole = arguments[arguments.length-1],
        srcId = [ide.projectName, ide.room.name, ide.room.ownerId].join('@'),
        name = msgInfo[0],
        fieldNames = msgInfo[1],
        fieldValues = Array.prototype.slice.call(arguments, 1, fieldNames.length + 1),
        contents;

    // check if collaborating. If so, show a message but don't send
    if (SnapActions.isCollaborating() && !SnapActions.isLeader) {
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

    ide.sockets.sendMessage({
        type: 'message',
        dstId: targetRole,
        srcId: srcId,
        msgType: name,
        content: contents
    });
};

//request block
NetsProcess.prototype.doSocketRequest = function (msgInfo) {
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
    }else if (this.reply ){
        // request has already been made and we received the reply
        requestId = this.requestId;
        var reply = this.reply;

        if (this.requestId === requestId ) {
            this.requestId = null;
            this.reply = null;
        }
        return reply.content.body;
    }
    this.pushContext('doYield');
    this.pushContext();
};

// reply block
NetsProcess.prototype.doSocketResponse = function (resource) {
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
NetsProcess.prototype.receiveSocketMessage = function (fields) {
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

NetsProcess.prototype.createRPCUrl = function (rpc) {
    var ide = this.homeContext.receiver.parentThatIsA(IDE_Morph),
        uuid = ide.sockets.uuid,
        projectId = encodeURIComponent(SnapCloud.projectId),
        roleId = encodeURIComponent(SnapCloud.roleId);

    return ensureFullUrl('/rpc/'+rpc+'?uuid='+uuid+'&projectId='+projectId + '&roleId=' + roleId);
};

NetsProcess.prototype.callRPC = function (rpc, params, noCache) {
    var url = this.createRPCUrl(rpc),
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
        contentType = this.rpcRequest.getResponseHeader('content-type');
        if (contentType && contentType.indexOf('image') === 0) {
            image = this.getCostumeFromRPC(rpc, params);
            if (image) {
                this.rpcRequest = null;
            }
            return image;
        } else {  // assume text
            response = decodeURIComponent(escape(String.fromCharCode.apply(null, new Uint8Array(this.rpcRequest.response))));
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

NetsProcess.prototype.getCostumeFromRPC = function (rpc, action, params) {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        image;

    if (arguments.length === 2) {
        params = action;
    } else {
        rpc = ['', rpc, action].join('/');

        // Add the width and height of the stage as default params
        if (!params.width) {
            params.width = stage.width();
        }
        if (!params.height) {
            params.height = stage.height();
        }
    }

    // Create the costume (analogous to reportURL)
    if (!this.rpcRequest || this.rpcRequest.readyState !== 4) {
        return this.callRPC(rpc, params, true);
    } else if (!this.requestedImage) {
        var rawPNG = this.rpcRequest.response;
        var contentType = this.rpcRequest.getResponseHeader('content-type');
        var blb = new Blob([rawPNG], {type: contentType});
        var url = (window.URL || window.webkitURL).createObjectURL(blb);

        this.requestedImage = new Image();
        this.requestedImage.crossOrigin = 'Anonymous';
        this.requestedImage.src = url;
    } else if (this.requestedImage.complete && this.requestedImage.naturalWidth) {
        // Clear request
        image = this.requestedImage;
        this.requestedImage = null;

        var canvas = newCanvas(new Point(image.width, image.height), true);
        canvas.getContext('2d').drawImage(image, 0, 0);
        return new Costume(canvas, rpc);
    }
    this.pushContext('doYield');
    this.pushContext();
};

NetsProcess.prototype.getJSFromRPC = function (rpc, params) {
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

    var result = this.callRPC(rpc, params, true);
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

NetsProcess.prototype.parseRPCResult = function (result) {
    if (result instanceof Array) {
        return new List(result.map(this.parseRPCResult.bind(this)));
    } else if (typeof result === 'string' && result[0] === '<') {
        var sockets = this.homeContext.receiver.parentThatIsA(IDE_Morph).sockets;
        return sockets.deserializeData([result])[0];
    }
    return result;
};

function listToArray(list) {
    if (! (list instanceof List)){
        return list;
    }
    var combinedArray = [], v;
    if (list === null) return null;
    var array = list.asArray();
    for(var i = 0; i < array.length; i++) {
        v = array[i];
        combinedArray.push(typeof v === 'object' ?  listToArray(v) : v);
    }
    return combinedArray;
}

NetsProcess.prototype.doRunRPC =
NetsProcess.prototype.getJSFromRPCStruct = function (rpc, methodSignature) {
    var action = methodSignature[0],
        argNames = methodSignature[1],
        values = Array.prototype.slice.call(arguments, 2, argNames.length + 2),
        query= {};

    // build a json obj
    var isPortable = SnapActions.serializer.isSavingPortable;
    SnapActions.serializer.flush();
    SnapActions.serializer.isSavingHistory = false;
    SnapActions.serializer.isSavingPortable = true;
    argNames.forEach(function(name, index) {
        if (values[index] instanceof List) {
            query[name] = listToArray(values[index]);
        } else if (isObject(values[index])) {
            query[name] = SnapActions.serializer.store(values[index]);
        } else {
            query[name] = values[index];
        }
    });
    SnapActions.serializer.isSavingHistory = true;
    SnapActions.serializer.isSavingPortable = isPortable;
    SnapActions.serializer.flush();

    return this.getJSFromRPCDropdown(rpc, action, query);
};

NetsProcess.prototype.getJSFromRPCDropdown = function (rpc, action, params) {
    if (rpc && action) {
        return this.getJSFromRPC(['', rpc, action].join('/'), params);
    }
};

// Process Geo
NetsProcess.prototype.getLocation = function () {
    var myself = this,
        errorName;

    if (this.location === undefined) {
        this.locationError = null;
        navigator.geolocation.getCurrentPosition(function(location) {
            myself.location = location;
        }, function(err) {
            // Raise an error...
            myself.locationError = err;
            myself.location = null;
        });
    } else {
        var location = this.location;
        this.location = undefined;
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

NetsProcess.prototype.reportLatitude = function () {
    var location = this.getLocation();
    if (location) {
        return location.latitude;
    }
};

NetsProcess.prototype.reportLongitude = function () {
    var location = this.getLocation();
    if (location) {
        return location.longitude;
    }
};

// TODO: I can probably move these next two to the Sprite/StageMorphs
NetsProcess.prototype.reportStageWidth = function () {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    return stage.dimensions.x;
};

NetsProcess.prototype.reportStageHeight = function () {
    var stage = this.homeContext.receiver.parentThatIsA(StageMorph);
    return stage.dimensions.y;
};
