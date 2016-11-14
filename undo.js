function UndoManager() {
    this.reset();
}

UndoManager.prototype.reset = function() {
    this.eventHistory = [];
    this.allEvents = [];  // includes undo/redo events
    this.undoCount = 0;
};

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
    this.allEvents.push(event);
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

UndoManager.Invert.replaceBlock = function(args) {
    return args.reverse();
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
    if (args.length === 3) {
        args.splice(1, 1);
        return {
            type: 'moveBlock',
            args: args
        };
    } else {
        return {
            type: 'addBlock',
            args: args.reverse()
        };
    }
};

UndoManager.Invert._actionForState = function(state) {
    // oldState is either:
    //  - [id, x, y]
    //  - [id, oldTarget]
    //  - [id]

    if (state.length === 3) {
        return {
            type: 'setBlockPosition',
            args: state
        };
    } else if (state.length === 1) {  // newly created
        if (state[0] instanceof Array) {
            return {
                type: 'removeBlocks',
                args: state
            };
        } else {
            return {
                type: 'removeBlock',
                args: [state[0], true]
            };
        }
    } else {  // previous was a moveBlock
        return {
            type: 'moveBlock',
            args: state
        };
    }
};

UndoManager.Invert.setBlockPosition = function(args) {
    // args are:
    //  - [id, x, y, oldState]

    return UndoManager.Invert._actionForState.call(null, args[3]);
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
    //  [id, target, oldState]
    //    or
    //  [id, target, oldState, displacedReporter]
    var revertToOldState = UndoManager.Invert._actionForState.call(null, args[2]),
        event = {
            type: 'batch',
            args: [revertToOldState]
        };
        

    // If a block was displaced, move it back to it's original target
    if (args.length === 4) {
        event.args.push({
            type: 'moveBlock',
            args: args[3]
        });
    }

    return event;
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
UndoManager.Invert.setColorField =
UndoManager.Invert.setField = function(args) {
    return [
        args[0],  // name
        args[2]  // oldValue
    ];
};

var SnapUndo = new UndoManager();
