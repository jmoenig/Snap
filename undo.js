function UndoManager() {
    this.reset();
}

UndoManager.prototype.reset = function() {
    this.allEvents = [];  // includes undo/redo events

    this.eventHistory = {};
    this.undoCount = {};
};

// Constants
UndoManager.UNDO = 1;
UndoManager.REDO = 2;

UndoManager.prototype.record = function(event) {
    var ownerId = event.owner,
        undoCount,
        eventHistory;

    this.allEvents.push(event);
    if (ownerId) {  // only record undo events w/ an ownerId
        if (!this.eventHistory[ownerId]) {
            this.undoCount[ownerId] = 0;
            this.eventHistory[ownerId] = [];
        }
        undoCount = this.undoCount[ownerId];
        eventHistory = this.eventHistory[ownerId];

        if (!event.replayType) {
            if (undoCount !== 0) {
                var currentIndex = eventHistory.length - undoCount - 1;
                var forgotten = this.eventHistory[ownerId].splice(currentIndex + 1, undoCount);
                this.undoCount[ownerId] = 0;  // forget any available redos
            }
            eventHistory.push(event);
        } else if (event.replayType === UndoManager.UNDO) {
            this.undoCount[ownerId]++;
        } else if (event.replayType === UndoManager.REDO) {
            this.undoCount[ownerId]--;
            console.assert(this.undoCount[ownerId] >= 0, 'undo count is negative!');
        }
    }
};

UndoManager.prototype.canUndo = function(owner) {
    var ownerId = owner.id || owner;
    return this.eventHistory[ownerId] &&
        this.eventHistory[ownerId].length > this.undoCount[ownerId];
};

UndoManager.prototype.canRedo = function(owner) {
    var ownerId = owner.id || owner;
    return this.eventHistory[ownerId] && this.undoCount[ownerId] > 0;
};

UndoManager.prototype.undo = function(owner) {
    var ownerId = owner.id || owner,
        eventHistory = this.eventHistory[ownerId] || [],
        index = eventHistory.length - this.undoCount[ownerId] - 1,
        origEvent = eventHistory[index],
        event;

    if (index < 0 || isNaN(index)) {
        return null;
    }

    console.log('undoing', origEvent);
    event = this.getInverseEvent(origEvent);
    event.replayType = UndoManager.UNDO;
    event.owner = origEvent.owner;

    return SnapActions.applyEvent(event);
};

UndoManager.prototype.redo = function(owner) {
    var ownerId = owner.id || owner,
        eventHistory = this.eventHistory[ownerId] || [],
        index = eventHistory.length - this.undoCount[ownerId],
        origEvent = eventHistory[index],
        event;

    if (index >= eventHistory.length) {
        return null;
    }

    event = {
        owner: origEvent.owner,
        type: origEvent.type,
        args: origEvent.args.slice()
    };
    event.replayType = UndoManager.REDO;

    return SnapActions.applyEvent(event);
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
    var ids = args.pop();

    return {
        type: 'batch',
        args: ids.map(function(id) {
            return {
                type: 'removeSprite',
                args: [id]
            };
        })
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
    var ids = args.pop();
    return {
        type: 'batch',
        args: ids.map(function(id) {
            return {
                type: 'removeBlock',
                args: [id, true]
            };
        })
    };
};

UndoManager.Invert.removeBlock = function(args) {
    // args are
    //  [id, userDestroy, y, x, ownerId, block]
    // or 
    //  [id, userDestroy, target, block]
    if (args.length === 4) {
        args.splice(1, 1);
        return {
            type: 'moveBlock',
            args: args.reverse()
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
                type: 'batch',
                args: state[0].map(function(id) {
                    return {
                        type: 'removeBlock',
                        args: [id, true]
                    };
                })
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
    //  [id, target, spliceEvent|null, oldState]
    //    or
    //  [id, target, null, oldState, displacedReporter]
    //    or
    //  [id, target, spliceEvent|null, oldState, oldTargetState]  // connecting to 'top' of cmd block
    var revertToOldState = UndoManager.Invert._actionForState.call(null, args[3]),
        target = args[1],
        spliceEvent = args[2],
        event = {
            type: 'batch',
            args: []
        };
        
    if (revertToOldState.type === 'batch') {
        event.args = revertToOldState.args;
    } else {
        event.args.push(revertToOldState);
    }

    if (spliceEvent) {
        event.args.unshift(spliceEvent);
    }
    if (target.loc === 'top') {  // top connection - need to revert target to old state!
        revertToOldState = UndoManager.Invert._actionForState.call(null, args[4]);
        event.args.unshift(revertToOldState);
    } else if (args.length > 4) {  // If a block was displaced, move it back to it's original target
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
