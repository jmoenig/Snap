/* global ThreadManager, ensureFullUrl, Process, Context, IDE_Morph, Costume, StageMorph,
   Qs, List, SnapActions*/

ThreadManager.prototype.startProcess = function (
    block,
    isThreadSafe,
    exportResult,
    callback,
    isClicked,
    rightAway,
    context
) {
    var active = this.findProcess(block),
        top = block.topBlock(),
        newProc;
    if (active) {
        if (isThreadSafe) {
            return active;
        }
        active.stop();
        this.removeTerminatedProcesses();
    }
    newProc = new NetsProcess(block.topBlock(), callback, rightAway, context);
    newProc.exportResult = exportResult;
    newProc.isClicked = isClicked || false;
    if (!newProc.homeContext.receiver.isClone) {
        top.addHighlight();
    }
    this.processes.push(newProc);
    if (rightAway) {
        newProc.runStep();
    }
    return newProc;
};

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
        contents;

    var requestId = this.context.variables.getVar('__requestId__');
    var srcId = this.context.variables.getVar('__srcId__');

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

NetsProcess.prototype.createRPCUrl = function (rpc, params) {
    var ide = this.homeContext.receiver.parentThatIsA(IDE_Morph),
        uuid = ide.sockets.uuid;

    return ensureFullUrl('/rpc/'+rpc+'?uuid='+uuid+'&'+params);
};

NetsProcess.prototype.callRPC = function (rpc, params, noCache) {
    var url = this.createRPCUrl(rpc, params),
        response,
        image;

    if (noCache) {
        url += '&t=' + Date.now();
    }

    if (!this.rpcRequest) {
        this.rpcRequest = new XMLHttpRequest();
        this.rpcRequest.open('GET', url, true);
        this.rpcRequest.send(null);
    } else if (this.rpcRequest.readyState === 4) {
        if (this.rpcRequest.getResponseHeader('content-type').indexOf('image') === 0) {
            image = this.getCostumeFromRPC(rpc, params);
            if (image) {
                this.rpcRequest = null;
            }
            return image;
        } else {
            response = this.rpcRequest.responseText;
            this.rpcRequest = null;
            return response;
        }
    }
    this.pushContext('doYield');
    this.pushContext();
};

NetsProcess.prototype.getCostumeFromRPC = function (rpc, action, params) {
    var image,
        stage = this.homeContext.receiver.parentThatIsA(StageMorph),
        paramItems;

    if (arguments.length === 2) {
        params = action;
    } else {
        rpc = ['', rpc, action].join('/');
        paramItems = params.length ? params.split('&') : [];

        // Add the width and height of the stage as default params
        if (params.indexOf('width') === -1) {
            paramItems.push('width=' + stage.width());
        }

        if (params.indexOf('height') === -1) {
            paramItems.push('height=' + stage.height());
        }

        params = paramItems.join('&');
    }

    // Create the costume (analogous to reportURL)
    if (!this.requestedImage) {
        // Create new request
        this.requestedImage = new Image();
        this.requestedImage.crossOrigin = 'Anonymous';
        this.requestedImage.src = this.createRPCUrl(rpc, params);
    } else if (this.requestedImage.complete && this.requestedImage.naturalWidth) {
        // Clear request
        image = this.requestedImage;
        this.requestedImage = null;
        return new Costume(image, rpc);
    }
    this.pushContext('doYield');
    this.pushContext();
};

NetsProcess.prototype.getJSFromRPC = function (rpc, params) {
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

NetsProcess.prototype.getJSFromRPCStruct = function (rpc, methodSignature) {
    var action = methodSignature[0],
        argNames = methodSignature[1],
        values = Array.prototype.slice.call(arguments, 2, argNames.length + 2),
        query= {},
        params;
    //build a json obj
    argNames.forEach(function(name, index) {
        if (values[index] instanceof List) {
            query[name] = listToArray(values[index]);
        }else{
            query[name] = values[index];
        }
    });
    // call stringify
    params = Qs.stringify(query, {encodeValuesOnly: true});
    return this.getJSFromRPCDropdown(rpc, action, params);
};

NetsProcess.prototype.getJSFromRPCDropdown = function (rpc, action, params) {
    return this.getJSFromRPC(['', rpc, action].join('/'), params);
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
