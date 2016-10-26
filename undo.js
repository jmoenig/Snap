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
            this.eventHistory.splice(0, this.eventHistory.length - this.undoCount);
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

    event = this.getInverseEvent(origEvent);
    event.replayType = UndoManager.UNDO;

    SnapCollaborator.applyEvent(event);
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

    SnapCollaborator.applyEvent(event);
    return true;
};

UndoManager.prototype.getInverseEvent = function(event) {
    var type = event.type;
    
    event = JSON.parse(JSON.stringify(event));  // deep copy
    return UndoManager.Invert[type].call(this, event);
};

UndoManager.Invert = {};
UndoManager.Invert.setStageSize = function(event) {
    // args are [width, height, oldHeight, oldWidth]
    return {
        type: 'setStageSize',
        args: event.args.reverse()
    };
};

    //serialized = SnapCollaborator.serializeBlock(block);

//UndoManager.Invert.addSprite = function(event) {
    //// args are [width, height, oldHeight, oldWidth]
    //return {
        //type: 'removeSprite',
        //args: event.args.reverse()
    //};
//};

    //// Sprites
    //'removeSprite',
    //'renameSprite',
    //'toggleDraggable',
    //'duplicateSprite',
    //'importSprites',
    //'setRotationStyle',

    //// Sounds
    //'addSound',
    //'renameSound',
    //'removeSound',

    //// Costumes
    //'addCostume',
    //'renameCostume',
    //'removeCostume',
    //'updateCostume',

    //// Variables
    //'addVariable',
    //'deleteVariable',

    //// Custom blocks
    //'addCustomBlock',
    //'deleteCustomBlock',
    //'deleteCustomBlocks',

    //'setCustomBlockType',
    //'updateBlockLabel',
    //'deleteBlockLabel',

    //// Block manipulation
UndoManager.Invert.addBlock = function(event) {
    // args are [block, ownerId, x, y, false, blockId]
    return {
        type: 'removeBlock',
        args: event.args.reverse()
    };
};

UndoManager.Invert.removeBlock = function(event) {
    // args are
    //  [id, userDestroy, y, x, ownerId, block]
    // or 
    //  [id, userDestroy, target]
    return {
        type: 'addBlock',
        args: event.args.reverse()
    };
};

UndoManager.Invert.setBlockPosition = function(event) {
    // args are [id, x, y, oldX, oldY] or [id, x, y, oldTarget]

    if (event.args.length === 5) {
        // Swap the old position and new position
        UndoManager.swap(event.args, 1, 3);  // x, oldX
        UndoManager.swap(event.args, 2, 4);  // y, oldY
        return {
            type: 'setBlockPosition',
            args: event.args
        };
    } else {  // previous was a moveBlock
        UndoManager.swap(event.args, 1, 3);  // x, oldTarget
        UndoManager.swap(event.args, 2, 3);  // y, x
        return {
            type: 'moveBlock',
            args: event.args
        };
    }
};

UndoManager.Invert.setBlocksPositions = function(event) {
    // args are [ids, positions, oldPositions]
    return {
        type: 'setBlocksPositions',
        args: [event.args[0], event.args[2], event.args[1]]
    };
};

UndoManager.swap = function(array, x, y) {
    var tmp = array.splice(y, 1)[0];
    array.splice(x, 0, tmp);
    return array;
};

UndoManager.Invert.moveBlock = function(event) {
    // args are either:
    //  [id, target, oldTarget]
    //    or
    //  [id, target, oldX, oldY]
    //    or
    //  [serializedBlock, target]
    var isFromMove = event.args.length === 3,
        isNewlyCreated = event.args.length === 4 && event.args[2] === false,
        isFromPosition = !isNewlyCreated && event.args.length === 4;

    // Check if had a position or old target
    if (isFromMove) {
        UndoManager.swap(event.args, 1, 2);
        return {
            type: 'moveBlock',
            args: event.args
        };
    } else if (isFromPosition) {  // x, y
        // move target to the end of the list
        var target = event.args.splice(1, 1)[0];
        event.args.push(target);
        return {
            type: 'setBlockPosition',
            args: event.args
        };
    } else if (isNewlyCreated) {  // newly created (dragged from palette)
        // Get the ids of the blocks
        // return removeBlock w/ [id, false, target, serializedBlock]
        // FIXME: May need to remove multiple blocks... may need another event
        return {
            type: 'removeBlock',
            args: event.args.reverse()
        };
    } else {
        logger.warn('Malformed moveBlock event!:', event);
    }
};
    //'moveBlock',
    //'importBlocks',

    //'setCommentText',

    //'setSelector',
    //'setBlockSpec',

    //'addListInput',
    //'removeListInput',

    //'ringify',
    //'unringify',

    //'toggleBoolean',
    //'setField'
var SnapUndo = new UndoManager();
