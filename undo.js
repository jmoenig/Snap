function UndoManager() {
    this.eventHistory = [];
    this.undoCount = 0;
}

// Constants
UndoManager.UNDO = 1;
UndoManager.REDO = 2;
// Need to:
//  - record events in the history
//  - be able to undo/redo
//    - map the event to it's undo/redo
UndoManager.prototype.record = function(event) {
    if (!event.replayType) {
        if (this.undoCount !== 0) {
            var currentIndex = this.eventHistory.length - this.undoCount - 1;
            var forgotten = this.eventHistory.splice(currentIndex + 1, this.undoCount);
            this.undoCount = 0;  // forget any available redos
        }
        this.eventHistory.push(event);
    } else if (event.replayType === UndoManager.UNDO) {
        this.undoCount++;
    } else if (event.replayType === UndoManager.REDO) {
        this.undoCount--;
        console.assert(this.undoCount >= 0, 'undo count is negative!');
    }
};

UndoManager.prototype.canUndo = function() {
    return this.eventHistory.length > this.undoCount;
};

UndoManager.prototype.canRedo = function() {
    return this.undoCount > 0;
};

UndoManager.prototype.undo = function() {
    var index = this.eventHistory.length - this.undoCount - 1,
        origEvent = this.eventHistory[index],
        event;

    if (index < 0) {
        return false;
    }

    console.log('undoing', origEvent);
    event = this.getInverseEvent(origEvent);
    event.replayType = UndoManager.UNDO;

    SnapActions.applyEvent(event);
    return true;
};

UndoManager.prototype.redo = function() {
    var index = this.eventHistory.length - this.undoCount,
        origEvent = this.eventHistory[index],
        event;

    if (index >= this.eventHistory.length) {
        return false;
    }

    event = {
        type: origEvent.type,
        args: origEvent.args.slice()
    };
    event.replayType = UndoManager.REDO;

    SnapActions.applyEvent(event);
    return true;
};

UndoManager.prototype.getInverseEvent = function(event) {
    var type = event.type,
        result;
    
    if (!UndoManager.Invert[type]) {
        throw Error('Cannot undo "' + type + '" event!');
    }

    event = JSON.parse(JSON.stringify(event));  // deep copy
    result = UndoManager.Invert[type].call(this, event.args);

    if (result instanceof Array) {  // shorthand inverter result
        result = {
            type: type,
            args: result
        };
    } else if (typeof result === 'string') {
        result = {
            type: result,
            args: event.args
        }
    }

    return result;
};

UndoManager.Invert = {};
UndoManager.Invert.setStageSize = function(args) {
    // args are [width, height, oldHeight, oldWidth]
    return {
        type: 'setStageSize',
        args: args.reverse()
    };
};

UndoManager.Invert.addSprite = function(args) {
    // args are [opts]
    return {
        type: 'removeSprite',
        args: [args[2]]
    };
};

UndoManager.Invert.removeSprite = function(args) {
    if (args.length === 2) {
        args.shift();
        return {
            type: 'addSprite',
            args: args
        };
    } else {  // duplicated sprite
        return {
            type: 'duplicateSprite',
            args: args
        };
    }
};

UndoManager.Invert.duplicateSprite = function(args) {
    return {
        type: 'removeSprite',
        args: [args[2]]
    };
};

UndoManager.Invert.toggleDraggable = function(args) {
    return [
        args[0],
        !args[1]
    ];
};

UndoManager.Invert.importSprites = function(args) {
    args.shift();
    return {
        type: 'removeSprites',
        args: args
    };
};

UndoManager.Invert.addVariable = function() {
    return 'deleteVariable';
};

UndoManager.Invert.deleteVariable = function() {
    return 'addVariable';
};

    //// Custom blocks
UndoManager.Invert.addCustomBlock = function(args) {
    var def = SnapActions.serializer.loadCustomBlock(SnapActions.serializer.parse(args[1]));
    return {
        type: 'deleteCustomBlock',
        args: [def.id, args[0]]
    };
};

UndoManager.Invert.deleteCustomBlock = function(args) {
    var serialized = args[2],
        ownerId = args[1];
    return {
        type: 'addCustomBlock',
        args: [ownerId, serialized, args[3]]
    };
};

UndoManager.Invert.deleteCustomBlocks = function(args) {
    return {
        type: 'importBlocks',
        args: [args[1]]
    };
};

UndoManager.Invert.importBlocks = function(args) {
    return {
        type: 'deleteCustomBlocks',
        args: [args[2]]
    };
};

UndoManager.Invert.setCustomBlockType = function(args) {
    UndoManager.swap(args, 1, 3);  // category, oldCategory
    UndoManager.swap(args, 2, 4);  // type, oldType
    return args;
};

UndoManager.Invert.updateBlockLabel = function(args) {
    if (!args[5]) {  // newly created
        args[1] += 1;
        return {
            type: 'deleteBlockLabel',
            args: args
        };
    }

    // swap 2,4 & 3,5 (types, and labelString/values)
    UndoManager.swap(args, 2, 4);  // type, oldType
    UndoManager.swap(args, 3, 5);  // labelString, oldLabelString
    return args;
};

UndoManager.Invert.deleteBlockLabel = function(args) {
    args[1] = args[1] - 1;
    return {
        type: 'updateBlockLabel',
        args: args
    };
};

    //// Block manipulation
UndoManager.Invert.addBlock = function(args) {
    // args are [block, ownerId, x, y, ids]
    return {
        type: 'removeBlocks',
        args: args.reverse()
    };
};

UndoManager.Invert.removeBlock = function(args) {
    // args are
    //  [id, userDestroy, y, x, ownerId, block]
    // or 
    //  [id, userDestroy, target]
    return {
        type: 'addBlock',
        args: args.reverse()
    };
};

UndoManager.Invert.setBlockPosition = function(args) {
    // args are:
    //  - [id, x, y, oldX, oldY]
    //  - [id, x, y, oldTarget]
    //  - [id, x, y, null]

    if (args.length === 5) {
        // Swap the old position and new position
        UndoManager.swap(args, 1, 3);  // x, oldX
        UndoManager.swap(args, 2, 4);  // y, oldY
        return {
            type: 'setBlockPosition',
            args: args
        };
    } else if (args[3] === null) {  // newly created
        return {
            type: 'removeBlock',
            args: [args[0], true]
        };
    } else {  // previous was a moveBlock
        UndoManager.swap(args, 1, 3);  // x, oldTarget
        UndoManager.swap(args, 2, 3);  // y, x
        return {
            type: 'moveBlock',
            args: args
        };
    }
};

UndoManager.Invert.setBlocksPositions = function(args) {
    // args are [ids, positions, oldPositions]
    return {
        type: 'setBlocksPositions',
        args: [args[0], args[2], args[1]]
    };
};

UndoManager.swap = function(array, x, y) {
    var tmp = array.splice(y, 1)[0];
    array.splice(x, 0, tmp);
    return array;
};

UndoManager.Invert.moveBlock = function(args) {
    // args are either:
    //  [id, target, oldTarget]  --> from move
    //    or
    //  [id, target, oldX, oldY]  --> from position
    //    or
    //  [id, target, ids]  --> newly created
    var isNewlyCreated = args.length === 3 && args[2] instanceof Array,
        isFromMove = !isNewlyCreated && args.length === 3,
        isFromPosition = !isNewlyCreated && args.length === 4;

    // Check if had a position or old target
    if (isFromMove) {
        UndoManager.swap(args, 1, 2);
        return {
            type: 'moveBlock',
            args: args
        };
    } else if (isFromPosition) {  // x, y
        // remove target
        var target = args.splice(1, 1)[0];
        return {
            type: 'setBlockPosition',
            args: args
        };
    } else if (isNewlyCreated) {  // newly created (dragged from palette)
        return {
            type: 'removeBlocks',
            args: args.reverse()
        };
    } else {
        logger.warn('Malformed moveBlock args!:', {type: 'moveBlock', args: args});
    }
};

UndoManager.Invert.addListInput = function() {
    return 'removeListInput';
};

UndoManager.Invert.removeListInput = function() {
    return 'addListInput';
};

UndoManager.Invert.ringify = function() {
    return 'unringify'
};

UndoManager.Invert.unringify = function() {
    return 'ringify'
};

UndoManager.Invert.addCostume = function(args) {
    var serialized = args[0],
        cos = SnapActions.serializer.loadValue(SnapActions.serializer.parse(serialized));

    return {
        type: 'removeCostume',
        args: [
            cos.id
        ]
    };
};

UndoManager.Invert.removeCostume = function(args) {
    args.shift();
    return {
        type: 'addCostume',
        args: args
    };
};

UndoManager.Invert.addSound = function(args) {
    var serialized = args[0],
        sound = SnapActions.serializer.loadValue(SnapActions.serializer.parse(serialized));
    return {
        type: 'removeSound',
        args: [
            sound.id
        ]
    };
};

UndoManager.Invert.removeSound = function(args) {
    args.shift();
    return {
        type: 'addSound',
        args: args
    };
};

UndoManager.Invert.renameSprite =

UndoManager.Invert.updateCostume =
UndoManager.Invert.renameCostume =
UndoManager.Invert.renameSound =

UndoManager.Invert.setRotationStyle =
UndoManager.Invert.setSelector =
UndoManager.Invert.setBlockSpec =
UndoManager.Invert.setCommentText =
UndoManager.Invert.toggleBoolean =
UndoManager.Invert.setField = function(args) {
    return [
        args[0],  // name
        args[2]  // oldValue
    ];
};

var SnapUndo = new UndoManager();
