/* globals CommentMorph, CLIENT_ID, SnapSerializer, SnapUndo, isNil,
 SnapCloud, SyntaxElementMorph, BlockEditorMorph, Point, ArgMorph,
 ScriptsMorph, StageMorph, CommandBlockMorph, ReporterBlockMorph,
 PrototypeHatBlockMorph, BlockMorph, RingMorph, TemplateSlotMorph,
 SERVER_URL, detect, WorldMorph, ColorSlotMorph, JukeboxMorph,
 CommandSlotMorph, copy, CSlotMorph, HandMorph, StringMorph, Color,
 InputSlotMorph, BlockLabelFragment, WardrobeMorph, IDE_Morph*/
var logger = {
    log: console.log.bind(console),
    debug: console.info.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console)
};

// If not the leader, send operations to the leader for approval
function ActionManager() {
    this.id = CLIENT_ID;
    this.rank = null;
    this.isLeader = false;
    this._pendingLocalActions = [];
    this._attemptedLocalActions = [];
    this.listeners = [];
    this.initialize();
}

ActionManager.prototype.configure = function(ide) {
    this.__ide = ide;
};

ActionManager.prototype.addActions = function() {
    var actions = Array.prototype.slice.call(arguments),
        myself = this;

    // Every event/action supported by the action manager has the same life-cycle:
    //  - eventName
    //    - public API
    //  - _eventName
    //    - Convert public API args to serializable, easy form
    //    - Add any args needed for undo
    //  - onEventName
    //    - Update the Snap environment
    actions.forEach(function(method) {
        myself[method] = function() {
            var args = Array.prototype.slice.apply(arguments),
                fn = '_' + method,
                ownerId = this.ide().stage.id,
                msg;

            if (this[fn]) {
                args = this[fn].apply(this, args) || args;
            }

            msg = {
                type: method,
                args: args
            };

            if (ActionManager.OwnerFor[method]) {
                ownerId = ActionManager.OwnerFor[method].apply(this, msg.args);
            } else {
                ownerId = ActionManager.OwnerFor.apply(this, msg.args);
            }
            msg.owner = ownerId;

            return this.applyEvent(msg);
        };
    });
};

ActionManager.prototype.addUserActions = function() {
    var actions = Array.prototype.slice.call(arguments),
        myself = this;

    actions.forEach(function(method) {
        myself[method] = function() {
            var args = Array.prototype.slice.apply(arguments),
                fn = '_' + method,
                msg;

            if (this[fn]) {
                args = this[fn].apply(this, args) || args;
            }

            msg = {
                isUserAction: true,
                type: method,
                args: args
            };

            // Create the event object, ID it, and share it!
            return this.applyEvent(msg);
        };
    });
};

ActionManager.prototype._selectTab = function(tabString) {
    return [tabString, this.ide().currentTab];
};

ActionManager.prototype._selectSprite = function(sprite) {
    return [sprite.id, this.ide().currentSprite.id];
};

ActionManager.prototype.isUserAction = function(event) {
    return event.isUserAction;
};

ActionManager.prototype.initializeEventMethods = function() {
    this.addActions(
        'setStageSize',

        // Sprites
        'addSprite',
        'removeSprite',
        'renameSprite',
        'toggleDraggable',
        'duplicateSprite',
        'importSprites',
        'setRotationStyle',
        'attachParts',
        'detachParts',

        // Sounds
        'addSound',
        'renameSound',
        'removeSound',

        // Costumes
        'addCostume',
        'renameCostume',
        'removeCostume',
        'updateCostume',

        // Variables
        'addVariable',
        'deleteVariable',

        // Custom blocks
        'addCustomBlock',
        'deleteCustomBlock',
        'deleteCustomBlocks',

        'setCustomBlockType',
        'updateBlockLabel',
        'deleteBlockLabel',

        // Block manipulation
        'addBlock',
        'replaceBlock',  // (keyboard editing)
        'removeBlock',
        'setBlockPosition',
        'setBlocksPositions',
        'moveBlock',
        'importBlocks',

        'setCommentText',

        'setSelector',
        'setBlockSpec',

        'addListInput',
        'removeListInput',

        'ringify',
        'unringify',

        'toggleBoolean',
        'setColorField',
        'setField',

        'openProject'
    );

    this.addUserActions(
        'selectTab',
        'selectSprite',
        'toggleWatcher',
        'toggleVariableWatcher',
        'pressStart',
        'stopAllScripts',
        'startScript',
        'setSpritePosition',
        'togglePause'
    );
};

ActionManager.prototype.initializeRecords = function() {
    this.currentBatch = null;
    this.lastSeen = -1;
    this.lastSent = null;
    this.idCount = 0;

    this.queuedActions = [];

    this.blockChildren = {};
    this.blockToParent = {};
    this.fieldValues = {};

    // Helpers
    this._owners = {};
    this._blocks = {};

    this._customBlocks = {};
    this._customBlockOwner = {};

    this._costumes = {};
    this._costumeToOwner = {};

    this._sounds = {};
    this._soundToOwner = {};

    // Additional records for undo/redo support
    this._targetOf = {};
    this._targetFor = {};
    this._blockToOwnerId = {};
};

ActionManager.URL = 'ws://' + window.location.host;
ActionManager.prototype.enableCollaboration = function() {
    if (this.supportsCollaboration === false) {
        // Display error message
        this.ide().showMessage('Collaboration not supported');
    }
    this._ws = new WebSocket(ActionManager.URL);
    this._enableCollaboration();
};

ActionManager.RECONNECT_INTERVAL = 1500;
ActionManager.prototype._enableCollaboration = function() {
    var self = this;

    if (this._ws.readyState > WebSocket.OPEN) {  // closed or closing
        this._ws = new WebSocket(ActionManager.URL);
    }

    this._ws.onopen = function() {
        logger.debug('websocket connected!');
        self.isLeader = false;
        self.supportsCollaboration = true;
    };

    this._ws.onclose = function() {
        self.isLeader = true;
        if (self.supportsCollaboration !== true) {
            self.supportsCollaboration = false;
        }
        if (self._ws) {  // network failure or something. Try to reconnect
            self.reconnectId = setTimeout(self._enableCollaboration.bind(self), ActionManager.RECONNECT_INTERVAL);
        }
    };

    this._ws.onmessage = function(raw) {
        var msg = JSON.parse(raw.data);
        self.onMessage(msg);
    };
};

ActionManager.prototype.disableCollaboration = function() {
    var ws = this._ws;

    if (this.isCollaborating()) {
        this._ws = null;
        ws.close();
        if (this.reconnectId) {
            clearTimeout(this.reconnectId);
        }
        if (location.hash.indexOf('collaborate') !== -1) {
            location.hash = '';
        }
    }
};

ActionManager.prototype.isCollaborating = function() {
    return this._ws !== null;
};

ActionManager.prototype.initialize = function() {
    this.serializer = new SnapSerializer();
    this.serializer.idProperty = 'actionSerializationID';
    this._ws = null;
    this.supportsCollaboration = null;
    this.isLeader = true;
    this.isApplyingAction = false;

    this.initializeRecords();
    this.initializeEventMethods();
};

ActionManager.prototype.completeAction = function(err, result) {
    var action = this.currentEvent;

    if (this.currentBatch) {
        var currentIndex = this.currentBatch.args.indexOf(action),
            nextEvent = this.currentBatch.args[currentIndex + 1];

        if (nextEvent) {  // Apply the next event
            return this._rawApplyEvent(nextEvent);
        }
        // Otherwise, the batch is over.
        action = this.currentBatch;
        this.currentBatch = null;
    }

    this.isApplyingAction = false;
    this.idCount = 0;
    if (!err) {
        SnapUndo.record(action);
    }

    // Resolve/reject actions
    if (this.isOwnAction(action)) {
        // Ensure that the handlers are removed
        var localAction = this.rejectPredecessorsInQueue(this._pendingLocalActions, action);

        if (localAction) {
            if (err) {
                localAction.reject(err);
            } else {
                localAction.resolve(result);
            }
        }
    }
    this.afterActionApplied(action);
    this.currentEvent = null;

    if (this.queuedActions.length && this.isNextAction(this.queuedActions[0])) {
        setTimeout(this._applyEvent.bind(this), 0, this.queuedActions.shift());
    }
};

ActionManager.prototype.isOwnAction = function(action) {
    return !action.user || action.user === this.id;
};

ActionManager.prototype.isNextAction = function(action) {
    return action.id === (this.lastSeen + 1);
};

ActionManager.prototype.isPreviousAction = function(action) {
    return action.id < (this.lastSeen + 1);
};

ActionManager.prototype.isAlwaysAllowed = function(action) {
    return action.type === 'openProject';
};

ActionManager.prototype.joinSession = function(sessionId, error) {
    if (!SnapActions.id) {
        this.onconnect = this._joinSession.bind(this, sessionId, error);
    } else {
        this._joinSession(sessionId, error);
    }
};

ActionManager.prototype._joinSession = function(sessionId, error) {
    var request = new XMLHttpRequest();
    request.open(
        'POST',
        window.location.origin + '/collaboration/join'
            + '?id=' + encodeURIComponent(SnapActions.id)
            + '&sessionId=' + encodeURIComponent(sessionId),
        true
    );
    request.withCredentials = true;
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.responseText.indexOf('ERROR') === 0) {
                return error(request.responseText, 'Collaborate');
            }
        }
    };
    request.send();
    this.onconnect = null;
};

function Action(event) {
    this.id = event.id;
    this.data = event;
    this.resolve = null;
    this.reject = null;

    var self = this;
    this.promise = new Promise(function(resolve, reject) {
        self.resolve = resolve;
        self.reject = reject;
    });
}

Action.prototype.equals = function(data) {
    var self = this,
        fieldsToCheck = ['id', 'user', 'time'];

    if (data instanceof Action) {
        data = data.data;
    }

    return fieldsToCheck.reduce(function(matches, field) {
        return matches && data[field] === self.data[field];
    }, true);
};

ActionManager.prototype.applyEvent = function(event) {
    event.user = this.id;
    event.username = SnapCloud.username;
    event.id = this.lastSeen + 1;
    event.time = event.time || Date.now();

    // Skip duplicate undo/redo events
    if (event.replayType && this.lastSent === event.id) {
        return;
    }

    // if in replay mode, check that the event is a replay event
    var action = new Action(event);
    if (this.isUserAction(event)) {
        this.submitAction(event);
    } else {
        // Record that the action has been submitted
        this._attemptedLocalActions.push(action);
        this.submitIfAllowed(event);
    }

    return action.promise;
};

ActionManager.prototype.submitIfAllowed = function(event) {
    var myself = this,
        ide = this.ide();

    if (this.isAlwaysAllowed(event)) {
        return this.submitAction(event);
    } else if (ide.isReplayMode && !event.isReplay) {
        ide.promptExitReplay(function() {
            myself.submitIfAllowed(event);
        });
    } else {
        this.submitAction(event);
    }
};

ActionManager.prototype._getMethodFor = function(action) {
    var method = 'on' + action.substring(0,1).toUpperCase() + action.substring(1);

    return method;
};

ActionManager.prototype.acceptEvent = function(msg) {
    msg.id = msg.id || this.lastSeen + 1;

    // If we are undo/redo-ing, make sure it hasn't already been sent
    this.send(msg);

    setTimeout(this.onReceiveAction.bind(this), 0, msg);
};

ActionManager.prototype._isBatchEvent = function(msg) {
    return msg.type === 'batch';
};

ActionManager.prototype.onReceiveAction = function(msg) {
    if (this.isPreviousAction(msg) && !this.isAlwaysAllowed(msg)) return;
    if (this.isUserAction(msg)) {
        if (!SnapUndo.contains(msg)) {
            SnapUndo.record(msg);
        }
        return;
    }

    // Record the action as pending and remove any earlier *submitted* actions
    if (this.isOwnAction(msg)) {
        var action = this.rejectPredecessorsInQueue(this._attemptedLocalActions, msg);

        if (action) {
            this._pendingLocalActions.push(action);
        } else {
            console.error('missing local action for', msg);
        }
    }

    if ((this.isNextAction(msg) || this.isAlwaysAllowed(msg)) && !this.isApplyingAction) {
        this._applyEvent(msg);
    } else {
        this.addActionToQueue(msg);
    }
};

ActionManager.prototype.rejectPredecessorsInQueue = function(queue, event) {
    var action = queue.find(function(action) { return action.equals(event);});

    // ensure that we found the given action
    if (action) {
        var error = new Error('Action Rejected (concurrent action accepted).');
        var next = queue.shift();
        while (next !== action) {
            next.reject(error);
            next = queue.shift();
        }
        return action;
    } else {
        console.error('could not find local action in queue', event);
    }
};

ActionManager.prototype.addActionToQueue = function(msg) {
    // insert into the queue
    var i = 0;
    var len = this.queuedActions.length;
    while (i < len && this.queuedActions[i].id < msg.id) {
        i++;
    }
    // Make sure it isn't a duplicate
    var isDuplicate = this.queuedActions[i] && msg.id === this.queuedActions[i].id;
    if (!isDuplicate) {
        this.queuedActions.splice(i, 0, msg);
    }
};

ActionManager.prototype._applyEvent = function(msg) {
    logger.debug('received "' + msg.type + '" event ' + msg.id + ':', msg);
    this.currentEvent = msg;
    this.isApplyingAction = true;
    this.lastSeen = this.currentEvent.id;

    if (this._isBatchEvent(msg)) {
        this.currentBatch = msg;
        this._rawApplyEvent(msg.args[0]);
    } else {
        this.currentBatch = null;
        this._rawApplyEvent(msg);
    }
};

ActionManager.prototype._rawApplyEvent = function(event) {
    var method = this._getMethodFor(event.type);

    this.currentEvent = event;
    try {
        this[method].apply(this, event.args);
    } catch (e) {
        this.completeAction(e);
    }
};

ActionManager.prototype.submitAction = function(event) {

    if (this.isLeader || !this.isCollaborating() || this.isAlwaysAllowed(event)) {
        this.acceptEvent(event);
    } else {
        this.send(event);
    }
};

ActionManager.prototype.send = function(json) {
    var canSend = this._ws && this._ws.readyState === WebSocket.OPEN;
    json.id = json.id || this.lastSeen + 1;

    if (!this.isUserAction(json)) {
        this.lastSent = json.id;
    }
    if (this.isCollaborating() && json.type !== 'openProject' && canSend) {
        this._ws.send(JSON.stringify(json));
    }
};

ActionManager.prototype.newId = function() {
    // This is the same across devices since it uses the currently last seen value
    var id = 'item_' + this.lastSeen;

    if (this.idCount !== 0) {
        id += '_' + this.idCount;
    }
    this.idCount++;

    return id;
};

ActionManager.prototype.getId = function (block, index) {
    var id = '',
        isParentCodeElement;

    while (!block.id) {
        isParentCodeElement = block.parent instanceof SyntaxElementMorph;
        if (!isParentCodeElement) {
            return null;
        }
        id = block.parent.inputs().indexOf(block) + '/' + id;
        block = block.parent;
        if (!block) {
            throw Error('Cannot get id from element');
        }
    }
    id = block.id + '/' +  id;

    if (index !== undefined) {
        id += index + '/';
    }
    return id;
};

ActionManager.prototype.serialize = function(object) {
    var serialized = this.serializer.serialize(object);
    this.serializer.flush();
    return serialized;
};

ActionManager.prototype.serializeBlock = function(block, force, justMe) {
    if (block.id && !force) {
        return block.id;
    }

    if (block instanceof CommentMorph) {
        return block.toXML(this.serializer);
    }

    this.serializer.isSavingCustomBlockOwners = false;
    var serialized = justMe ?
        '<script>' + block.toBlockXML(this.serializer) + '</script>':
        block.toScriptXML(this.serializer);

    this.serializer.flush();
    this.serializer.isSavingCustomBlockOwners = true;
    return serialized;
};

ActionManager.prototype.deserializeBlock = function(ser, owner) {
    this.serializer.project = this.ide();

    if (ser[0] !== '<') {
        return this.getBlockFromId(ser);
    } else if (ser.indexOf('<script>') === 0) {
        return this.serializer.loadScript(this.serializer.parse(ser), owner);
    } else {  // Comment
        return this.serializer.loadComment(this.serializer.parse(ser));
    }
};

ActionManager.prototype.registerOwner = function(owner, id) {
    owner.id = id || this.newId();
    this._owners[owner.id] = owner;
};

ActionManager.prototype.getOwnerFromId = function(id) {
    return this._owners[id];
};

ActionManager.prototype.getBlockOwnerId = function(block) {
    var blockId = block.id;

    while (!blockId && block) {
        blockId = block.id;
        block = block.parent;
    }

    return this._blockToOwnerId[blockId];
};

/* * * * * * * * * * * * Preprocess args (before action is accepted) * * * * * * * * * * * */
// These are decorators which take the args from the public API and return the args for
// the event to be sent to the other collaborators (and received by the onEventName methods)
ActionManager.prototype._getStatementIds = function(block) {
    var ids = [];

    while (block) {
        ids.push(block.id);
        block = block.nextBlock ? block.nextBlock() : null;
    }
    return ids;
};

ActionManager.prototype._addBlock = function(block, scriptTarget, position) {
    const scripts = scriptTarget instanceof BlockEditorMorph ?
        scriptTarget.body.children[0] : scriptTarget.scripts;
    const ownerId = scriptTarget instanceof BlockEditorMorph ?
        scriptTarget.definition.id : scriptTarget.id;
    const stdPosition = this.convertToStandardPosition(scripts, position);

    this._idBlocks(block);
    const ids = this._getStatementIds(block);

    const serialized = this.serializeBlock(block, true);
    return [
        serialized,
        ownerId,
        stdPosition.x,
        stdPosition.y,
        ids
    ];
};

ActionManager.prototype._replaceBlock = function(block, newBlock) {
    // only for blocks on the ScriptsMorph!
    newBlock.id = this.newId();
    return [
        this.serializeBlock(block, true),
        this.serializeBlock(newBlock, true)
    ];
};

ActionManager.prototype._removeBlock = function(block, userDestroy) {
    var serialized = this.serializeBlock(block, true, userDestroy),
        scripts = block.parentThatIsA(ScriptsMorph),
        position = scripts ? this.getStandardPosition(block) : this.getLastGrabPosition(),
        target = this._targetOf[block.id],
        ownerId = this._blockToOwnerId[block.id],
        args = [
            block.id,
            userDestroy
        ];

    if (target && !(ActionManager.isWeakTarget(target) && position)) {
        args.push(this._targetOf[block.id], serialized);
    } else if (position) {
        args.push(
            position.y,
            position.x,
            ownerId,
            serialized
        );
    }

    // Get the records to restore on undo
    var restoreMoves = [],
        ids;

    if (this._targetFor[block.id]) {
        ids = Object.keys(this._targetFor[block.id]);
        for (var i = ids.length; i--;) {
            restoreMoves.push([ids[i], this._targetFor[block.id][ids[i]]]);
        }
    }
    args.push(restoreMoves);

    return args;
};

ActionManager.isWeakTarget = function(target) {
    // I consider a target a 'weak target' if it should be ignored for restoring
    // the block's state (fall back on position)
    return target.loc === 'top' || target.loc === 'wrap';
};

ActionManager.prototype._getBlockState = function(id, grabbed = true) {
    var target = this._targetOf[id],
        isNewBlock = !this._blocks[id],
        currentBlockPos = this.getStandardPosition(this.getBlockFromId(id)),
        position = grabbed ? this.getLastGrabPosition() || currentBlockPos : currentBlockPos,
        state;

    // Use the last connection unless the last connection was to the
    // top of a command block and it has a position set
    if (isNewBlock) {
        state = [];
    } else if (target && !ActionManager.isWeakTarget(target)) {
        state = [target];
    } else {
        state = [position.x, position.y];
    }

    state.unshift(id);
    return state;
};

ActionManager.prototype._setBlockPosition = function(block, position) {
    var id = block.id,
        standardPosition = this.getStandardPosition(block, position),
        oldState = this._getBlockState(id);

    return [id, standardPosition.x, standardPosition.y, oldState];
};

ActionManager.prototype._setBlocksPositions = function(ids, positions) {
    var myself = this,
        newPositions = [],
        currentPositions = [],
        scripts,
        block,
        i;

    // Remove any comments (undefined position)
    for (i = ids.length; i--;) {
        if (!positions[i]) {
            ids.splice(i, 1);
            positions.splice(i, 1);
        }
    }

    for (i = 0; i < ids.length; i++) {
        block = myself.getBlockFromId(ids[i]);
        scripts = block.parentThatIsA(ScriptsMorph);
        currentPositions.push(
            this.getStandardPosition(block)
        );
        newPositions.push(
            this.convertToStandardPosition(scripts, positions[i])
        );
    }

    return [ids, newPositions, currentPositions];
};

// Custom Blocks
ActionManager.prototype._addCustomBlock = function(definition, owner) {
    var serialized,
        args;

    definition.id = this.newId();
    serialized = this.serialize(definition);
    if (definition.isGlobal) {  // global defs are stored in the stage
        owner = this.ide().stage;
    }
    args = [
        owner.id,
        serialized,
        definition.isGlobal
    ];

    return args;
};

ActionManager.prototype._deleteCustomBlock = function(definition) {
    var owner = this._customBlockOwner[definition.id],
        serialized = this.serialize(definition);

    return [definition.id, owner.id, serialized, definition.isGlobal];
};

ActionManager.prototype._deleteCustomBlocks = function(blocks) {
    var serialized = [],
        ids = [];

    for (var i = blocks.length; i--;) {
        serialized.push(this.serialize(blocks[i]));
        ids.push(blocks[i].id);
    }

    serialized = '<blocks>' + serialized.join('') + '</blocks>';
    return [ids, serialized];
};

ActionManager.prototype._importBlocks = function(str, lbl) {
    // Get unique ids for each of the blocks
    var model = this.assignUniqueIds(str),
        ids;

    // need to get the ids for each of the sprites (so we can delete them on undo!)
    ids = model.children.map(function(child) {
        return child.attributes.collabId;
    });
    str = model.toString();
    return [str, lbl, ids];
};

ActionManager.prototype._setCustomBlockType = function(definition, category, type) {
    return [definition.id, category, type, definition.category, definition.type];
};

ActionManager.prototype._deleteBlockLabel = function(definition, label) {
    var index = label.parent.children.indexOf(label);

    return [definition.id, index, label.fragment.type, label.fragment.labelString];
};

ActionManager.prototype._updateBlockLabel = function(definition, label, fragment) {
    var index = label.parent.children.indexOf(label);

    console.assert(index > -1, 'Cannot find the fragment!');
    return [
        definition.id,
        index,
        fragment.type,
        fragment.labelString,
        fragment.defaultValue,
        fragment.options,
        fragment.isReadOnly,
        label.fragment.type,
        label.fragment.labelString,
        label.fragment.defaultValue,
        label.fragment.options,
        label.fragment.isReadOnly
    ];
};

ActionManager.prototype._startScript = function(topBlock, isActive) {
    var isStart = !isActive;
    return [
        topBlock.id,
        isStart
    ];
};

ActionManager.prototype._setSpritePosition = function(sprite) {
    return [
        sprite.id,
        sprite.xPosition(),
        sprite.yPosition()
    ];
};

ActionManager.prototype._setStageSize = function(width, height) {
    // Add the old stage size for undo support
    return [
        width,
        height,
        StageMorph.prototype.dimensions.y,
        StageMorph.prototype.dimensions.x
    ];
};

ActionManager.prototype._serializeMoveTarget = function(block, target) {
    if (block instanceof CommandBlockMorph) {
        if (!target.element.id) {
            if (target.element instanceof PrototypeHatBlockMorph) {
                target.element = target.element.definition.id;
            } else {
                target.element = this.getId(target.element);
            }
        } else {
            target.element = target.element.id;
        }
    } else if (block instanceof ReporterBlockMorph) {
        // target is a block to replace...
        target = this.getId(target);
    } else {  // CommentMorph
        target = target.id;
    }
    return target;
};

ActionManager.prototype._getSpliceEvent = function(target) {
    // Create the move event for reconnecting the target element to the current
    // occupant
    var topBlock,
        bottomBlock;

    if (target.loc === 'top') {
        topBlock = target.element.parent instanceof BlockMorph ?
            target.element.parent : null;
        bottomBlock = target.element;
    } else if (target.loc === 'bottom') {
        topBlock = target.element;

        if (target.type === 'slot') {
            bottomBlock = target.element.nestedBlock();
        } else {
            bottomBlock = target.element.nextBlock();
        }
    }

    if (topBlock && bottomBlock) {  // splice!
        return {
            type: 'moveBlock',
            args: [
                bottomBlock.id,
                target
            ]
        };
    }
    return null;
};

ActionManager.prototype._moveBlock = function(block, target, position) {
    var isNewBlock = !block.id,
        serialized,
        ids,
        spliceEvent,
        id,
        oldState,
        displacedTarget,
        targetState,
        args;

    // If the target is a ReporterBlockMorph, then we are replacing that block.
    // Undo should place that block back into it's current place
    if (target instanceof ReporterBlockMorph) {  // displacing a block
        displacedTarget = [
            this.serializeBlock(target, target instanceof RingMorph),
            this._getCurrentTarget(target)
        ];

    } else if (target.loc === 'top' || target.loc === 'wrap') {
        targetState = this._getBlockState(target.element.id, false);
    }

    // Check if "splicing" (ie, target connection is occupied on cmd block)
    spliceEvent = this._getSpliceEvent(target);

    // Get the basic required args for moving a block
    target = this._serializeMoveTarget(block, target);
    if (isNewBlock) {
        this._idBlocks(block);
    }
    serialized = this.serializeBlock(block, isNewBlock);
    args = [serialized, target];

    // Record the old state (for undo support)
    args.push(spliceEvent);

    if (isNewBlock) {
        ids = this._getStatementIds(block);
        oldState = [ids];
        block.destroy();
    } else if (position) {
        var scripts = block.parentThatIsA(ScriptsMorph);
        position = this.convertToStandardPosition(scripts, position);
        oldState = [ block.id, position.x, position.y ];
    } else {
        id = target.loc === 'top' ? block.topBlock().id : block.id;
        oldState = this._getBlockState(id);
    }

    args.push(oldState);

    if (displacedTarget) {
        args.push(displacedTarget);
    } else if (targetState) {
        args.push(targetState);
    }
    return args;
};

ActionManager.prototype._setField = function(field, value) {
    var fieldId = this.getId(field),
        oldValue = field.contents().text;

    return [
        fieldId,
        value,
        oldValue
    ];
};

ActionManager.prototype._setColorField = function(field, color) {
    var fieldId = this.getId(field),
        oldValue = this.fieldValues[fieldId];

    return [fieldId, color, oldValue];
};

ActionManager.prototype._toggleBoolean = function(field, value) {
    var prevValue = false,
        fieldId = this.getId(field);

    if (field.isStatic) {
        prevValue = !value;
    } else {
        // order is true -> false -> null -> true ...
        // get the previous
        if (value === true) {
            prevValue = null;
        } else if (value === false) {
            prevValue = true;
        }
    }

    return [fieldId, value, prevValue];
};

ActionManager.prototype._setCommentText = function(comment, value) {
    var oldValue = comment.lastValue;

    return [comment.id, value, oldValue];
};

ActionManager.prototype._unringify = function(block) {
    var parent = this.getParentWithId(block),
        ring = parent.parentThatIsA(RingMorph);

    // Get the last block before the ring
    while (parent !== ring) {
        block = parent;
        parent = this.getParentWithId(block);
    }

    return [block.id, ring.id];
};

ActionManager.prototype.getParentWithId = function(block) {
    while (block.parent && !block.parent.id) {
        block = block.parent;
    }
    return block.parent;
};

ActionManager.prototype._ringify = function(block) {
    // If contained in a ringmorph, get the outermost ring
    var ringId = this.newId(),
        parent = this.getParentWithId(block);

    while (parent instanceof RingMorph) {
        block = parent;
        parent = this.getParentWithId(block);
    }

    return [block.id, ringId];
};

ActionManager.prototype._setSelector = function(block, selector) {
    var blockId = this.getId(block),
        oldSelector = block.selector;

    return [blockId, selector, oldSelector];
};

ActionManager.prototype._setBlockSpec = function(block, spec) {
    var blockId = this.getId(block),
        oldSpec = block.blockSpec;

    return [blockId, spec, oldSpec];
};

ActionManager.prototype._toggleDraggable = function(owner, draggable) {
    return [owner.id, draggable];
};

ActionManager.prototype._setRotationStyle = function(owner, rotationStyle) {
    return [owner.id, rotationStyle, owner.rotationStyle];
};

ActionManager.prototype._addListInput =
ActionManager.prototype._removeListInput = function(block, count) {
    return [this.getId(block), count];
};

ActionManager.prototype._addSound = function(sound, owner, focus) {
    var args;

    sound.id = this.newId();

    // calculate the approximate file size
    var sizeInMb = sound.audio.src.length * 2 / 1e+6;
    var SIZE_THRESHOLD = 10; // consider client performance and mongo document size limit

    if (sizeInMb > SIZE_THRESHOLD) {
        logger.error('audio file is too big', sound);

        this.ide().simpleNotification('Audio file is too big.');

        // replace it with an error sound
        sound.audio.src = SERVER_URL + '/Sounds/Meow.wav';
        sound.name = 'BigFileError';
    }

    args = [
        sound.toXML(this.serializer).replace('~', ''),
        owner.id
    ];
    if (focus) {
        args.push(this.id);
    }

    return args;
};

ActionManager.prototype._removeSound = function(sound) {
    return [
        sound.id,
        sound.toXML(this.serializer).replace('~', ''),
        this._soundToOwner[sound.id].id
    ];
};

ActionManager.prototype._renameSound = function(sound, name) {
    return [sound.id, name, sound.name];
};

ActionManager.prototype._addCostume = function(costume, owner, focus) {
    var args;

    costume.id = this.newId();
    args = [
        costume.toXML(this.serializer).replace('~', ''),
        owner.id
    ];

    if (focus) {
        args.push(this.id);
    }
    return args;
};

ActionManager.prototype._removeCostume = function(costume) {
    return [
        costume.id,
        costume.toXML(this.serializer).replace('~', ''),
        this._costumeToOwner[costume.id].id
    ];
};

ActionManager.prototype._renameCostume = function(costume, name) {
    return [costume.id, name, costume.name];
};

ActionManager.prototype._updateCostume = function(original, newCostume) {
    return [
        newCostume.id,
        newCostume.toXML(this.serializer).replace('~', ''),
        original.toXML(this.serializer).replace('~', '')
    ];
};

ActionManager.prototype._addSprite = function(sprite) {
    var serialized,
        stage = this.ide().stage;

    sprite.parent = stage;
    sprite.id = this.newId();

    serialized = '<sprites>' + this.serialize(sprite) + '</sprites>';

    return [serialized, this.id, sprite.id];
};

ActionManager.prototype._attachParts = function(sprite, parts) {
    var partIds = parts.map(function(part) {return part.id;});

    return [
        sprite.id,
        partIds
    ];
};

ActionManager.prototype._detachParts = function(parts) {
    var partIds = parts.map(function(part) {return part.id;}),
        currentAnchorIds = parts.map(function(part) {
            return part.anchor ? part.anchor.id : null;
        });

    return [
        partIds,
        currentAnchorIds
    ];
};

ActionManager.prototype._openProject = function(str) {
    this.initializeRecords();
    return [str];
};

ActionManager.prototype.assignUniqueIds = function (str) {
    var model = this.serializer.parse(str),
        children = model.allChildren();

    // Just add an id to everything... not the most efficient but effective for now
    for (var i = children.length; i--;) {
        if (children[i].attributes) {
            children[i].attributes.collabId = this.newId();
        }
    }

    return model;
};

ActionManager.prototype._removeSprite = function(sprite) {
    var serialized = '<sprites>' + this.serialize(sprite) + '</sprites>';

    return [sprite.id, serialized];
};

ActionManager.prototype._renameSprite = function(sprite, name) {
    return [sprite.id, name, sprite.name];
};

ActionManager.prototype._duplicateSprite = function(sprite) {
    var id = this.newId(),
        idString = 'collabId="' + id + '"',
        newSprite = sprite.copy(),
        ide = this.ide(),
        str,
        serialized;

    newSprite.id = id;
    newSprite.setName(ide.newSpriteName(sprite.name));
    newSprite.parent = ide.stage;

    serialized = this.serialize(newSprite);

    str = this.assignUniqueIds(serialized).toString();
    str = '<sprites>' + str.replace(/collabId="item_[0-9_]*"/, idString) + '</sprites>';

    return [str, null, id];
};

ActionManager.prototype._importSprites = function(str) {
    var model = this.assignUniqueIds(str),
        ids;

    // need to get the ids for each of the sprites (so we can delete them on undo!)
    ids = model.children.map(function(child) {
        return child.attributes.collabId;
    });
    str = model.toString();
    return [str, ids];
};

ActionManager.prototype._onSetBlockPosition = function(id, x, y, callback) {
    var myself = this,
        position = new Point(x, y),
        connectedIds,
        target,
        block = this.getBlockFromId(id),
        scripts,
        afterMove = function() {
            myself.disconnectBlock(block, scripts);

            if (block.justDropped) {block.justDropped(); }
            block.changed();
            block.removeShadow();

            myself.updateCommentsPositions(block);

            // Save the block definition
            myself.__updateBlockDefinitions(block);
            myself.__updateActiveEditor(block.id);
            callback();
        },
        editor;

    this.ensureNotDragging(block);
    // If there is a block connected to the 'top' of this block, clear the given
    // target
    if (this._targetFor[id]) {
        connectedIds = Object.keys(this._targetFor[id]);
        for (var i = connectedIds.length; i--;) {
            target = this._targetFor[id][connectedIds[i]];
            if (target.loc === 'top') {
                this.__clearTarget(this.__targetId(target));
            }
        }
    }
    this.__clearTarget(id);

    console.assert(block, 'Block "' + id + '" does not exist! Cannot set position');

    // Check if editing a custom block
    position = new Point(x, y);
    editor = block.parentThatIsA(BlockEditorMorph);
    if (editor) {  // not a custom block
        scripts = editor.body.contents;
    }

    scripts = block.parentThatIsA(ScriptsMorph);
    position = this.getAdjustedPosition(position, scripts);

    if (this.canAnimate(this.getBlockOwnerId(block))) {
        block.glideTo(
            position,
            null,
            null,
            function() {
                try {
                    afterMove();
                } catch(e) {
                    callback(e);
                }
            }
        );
    } else {
        block.setPosition(position);
        afterMove();
    }
};

ActionManager.prototype.onSetBlocksPositions = function(ids, positions) {
    var myself = this,
        movedCount = 0,
        callback = function() {
            movedCount++;
            if (movedCount === ids.length) {
                myself.completeAction();
            }
        };

    for (var i = ids.length; i--;) {
        this._onSetBlockPosition(ids[i], positions[i].x, positions[i].y, callback);
    }
};

ActionManager.prototype.getLastGrabPosition = function() {
    var hand = this.ide().root().hand;

    return hand.grabOrigin && hand.grabOrigin.position;
};

ActionManager.prototype.getStandardPosition = function(block, position) {
    var scripts = block.parentThatIsA(ScriptsMorph);
    position = position || block.position();
    return this.convertToStandardPosition(scripts, position);
};

ActionManager.prototype.convertToStandardPosition = function(scripts, position) {
    var scale = SyntaxElementMorph.prototype.scale;
    position = position.subtract(scripts.topLeft()).divideBy(scale);
    return position;
};

ActionManager.prototype.getAdjustedPosition = function(position, scripts) {
    var scale = SyntaxElementMorph.prototype.scale;
    position = position.multiplyBy(scale).add(scripts.topLeft());
    return position;
};

ActionManager.prototype._idBlocks = function(block, returnIds) {
    var myself = this,
        ids = [];

    this.traverse(block, function(iterBlock) {
        iterBlock.isDraggable = true;
        iterBlock.isTemplate = false;
        iterBlock.id = myself.newId();
        ids.push(iterBlock.id);
    });
    return returnIds ? ids : block;
};

ActionManager.prototype.registerBlocks = function(firstBlock, ownerId, initial) {
    var myself = this,
        block = firstBlock;

    this.traverse(block, function(block) {
        myself._registerBlockState(block, initial);
        myself._blockToOwnerId[block.id] = ownerId;
    });
    return firstBlock;
};

ActionManager.prototype.onReplaceBlock = function(block, newBlock) {
    var myself = this,
        ownerId,
        position;

    block = this.deserializeBlock(block);
    ownerId = this._blockToOwnerId[block.id];
    position = this.getStandardPosition(block);

    this._onRemoveBlock(block.id, true, function(err) {
        if (err) {
            return myself.completeAction(err);
        }
        myself._onAddBlock(
            newBlock,
            ownerId,
            position.x,
            position.y,
            function(err, result) {
                myself.completeAction(err, result);
            }
        );
    });
};

ActionManager.prototype._onAddBlock = function(block, ownerId, x, y, callback) {
    var myself = this,
        ide = this.ide(),
        owner = this.getOwnerFromId(ownerId),
        position = new Point(x, y),
        firstBlock,
        afterAdd = function() {
            if (firstBlock.fixChildrensBlockColor) {
                firstBlock.fixChildrensBlockColor(true);
            }

            if (firstBlock.allComments) {
                firstBlock.allComments().forEach(function(comment) {
                    comment.align(firstBlock);
                });
            }
            myself.registerBlocks(firstBlock, owner.id);
            myself.__updateScriptsMorph(firstBlock);
            myself.__updateActiveEditor(firstBlock.id);
            callback(null, firstBlock);
        };


    firstBlock = this.deserializeBlock(block, owner);

    if (firstBlock.snapSound) {
        firstBlock.snapSound.play();
    }

    if (!this._customBlocks[ownerId]) {  // not a custom block
        position = this.getAdjustedPosition(position, owner.scripts);

        if (this.canAnimate(owner.id)) {
            var palette = ide.palette;

            firstBlock.setPosition(palette.position()
                .add(new Point(palette.left() - firstBlock.width(), palette.height()/4)));

            palette.add(firstBlock);
            firstBlock.glideTo(
                position,
                null,
                null,
                function() {
                    try {
                        owner.scripts.add(firstBlock);
                        afterAdd();
                    } catch(e) {
                        callback(e);
                    }
                }
            );
        } else {
            firstBlock.setPosition(position);
            owner.scripts.add(firstBlock);
            firstBlock.changed();
            afterAdd();
        }
    } else {
        var editor = this._getCustomBlockEditor(ownerId),
            scripts = editor.body.contents;

        position = this.getAdjustedPosition(position, scripts);
        firstBlock.setPosition(position);
        scripts.add(firstBlock);
        editor.updateDefinition();
        owner = this._customBlocks[ownerId];
        afterAdd();
    }
    // register generic hat blocks
    if (firstBlock.selector === 'receiveCondition') {
        var stage = ide.stage;
        if (stage) {
            stage.enableCustomHatBlocks = true;
            stage.threads.pauseCustomHatBlocks = false;
            ide.controlBar.stopButton.refresh();
        }
    }
};

ActionManager.prototype.onAddBlock = function(block, ownerId, x, y) {
    var myself = this;

    this._onAddBlock(block, ownerId, x, y, function(err, block) {
        myself.completeAction(err, block);
    });
};

ActionManager.prototype.world = function() {
    var ownerId = Object.keys(this._owners)[0],
        owner = this._owners[ownerId];

    return owner ? owner.parentThatIsA(WorldMorph) : null;
};

ActionManager.prototype.isEditorOpen = function(customBlockId) {
    var children = this.world() ? this.world().children : [];

    return !!detect(children, function(child) {
        return child instanceof BlockEditorMorph &&
            child.definition.id === customBlockId;
    });
};

ActionManager.prototype._getCustomBlockEditor = function(id, block) {
    // Check for the block editor in the world children for this definition
    var children = this.world() ? this.world().children : [],
        owner = this._customBlockOwner[id],
        blockDef = this._customBlocks[id],
        editor = detect(children, function(child) {
            return child instanceof BlockEditorMorph && child.definition.id === id;
        });

    if (!editor && blockDef) {  // Create new editor dialog
        if (block) {
            editor = block.parentThatIsA(BlockEditorMorph);
        }
        if (!editor) {
            editor = new BlockEditorMorph(blockDef, owner);
            editor.popUp(true);  // need to guarantee the correct pos
            editor.setInitialDimensions(true);
            editor.destroy();
        }
    }

    return editor;
};

ActionManager.prototype.getBlockFromId = function(id) {
    var ids = id.split('/'),
        blockId = ids.shift(),
        block = this._blocks[blockId],
        customBlockId,
        editor;

    // If the id is a custom block id, it is referencing the PrototypeHatBlockMorph
    if (this._customBlocks[blockId]) {
        block = this._getCustomBlockEditor(blockId)
            .body.contents  // get ScriptsMorph of BlockEditorMorph
            .children.find(function(child) {
                return child instanceof PrototypeHatBlockMorph;
            });
    }

    // If the block is part of a custom block def, refresh it
    editor = block.parentThatIsA(BlockEditorMorph);
    if (editor) {
        var currentEditor,
            found = false,
            current,
            next;

        customBlockId = editor.definition.id;
        currentEditor = this._getCustomBlockEditor(customBlockId);
        if (editor !== currentEditor) {  // update the block record
            editor = currentEditor;
            current = editor.body.contents.children.slice();
            // Search through the blocks for the given id...
            while (!found && current.length) {
                next = [];
                for (var i = current.length; i--;) {
                    // Check for the given id
                    if (!current[i]) continue;

                    if (current[i].id === blockId) {
                        this._blocks[blockId] = current[i];
                        block = this._blocks[blockId];
                        found = true;
                        break;
                    }

                    // Get the next nodes
                    if (current[i].inputs) {
                        next = next.concat(current[i].inputs());
                    }

                    if (current[i].nextBlock) {
                        next.push(current[i].nextBlock());
                    }
                }
                current = next;
            }
        }
    }

    for (i = 0; i < ids.length; i++) {
        if (ids[i]) {
            block = block.inputs()[ids[i]];
        }
    }
    return block;
};

ActionManager.prototype.onMoveBlock = function(id, rawTarget) {
    var myself = this,
        block = this.deserializeBlock(id),
        isNewBlock = !this._blocks[block.id],
        targetNextBlock = null,
        target = copy(rawTarget),
        isTargetDragging = false,
        afterMove,
        scripts;

    this.ensureNotDragging(block);
    this.__recordTarget(block.id, rawTarget);

    // Resolve the target
    var targetBlock;  // block associated with the target
    if (block instanceof CommandBlockMorph) {
        target.element = this.getBlockFromId(target.element);
        targetBlock = target.element;

        // If we are placing blocks btwn existing connected blocks,
        // we will need to update the target of the existing bottom block, too
        targetNextBlock = target.loc === 'bottom' ?
            targetBlock.nextBlock && targetBlock.nextBlock() :
            targetBlock;

        if (block.parent) {
            if (target.loc === 'bottom' || target.loc === 'wrap') {
                this.disconnectBlock(block, scripts);
            } else if (target.loc === 'top' && !(block.parent instanceof ScriptsMorph)) {
                this.disconnectBlock(block, scripts);
            }
        }
        target.point = new Point(target.point.x, target.point.y);
    } else if (block instanceof ReporterBlockMorph || block instanceof CommentMorph) {
        // Disconnect the given block
        this.disconnectBlock(block, scripts);

        target = this.getBlockFromId(target);
        targetBlock = target;

        // If the target is a RingMorph, it will be overwritten rather than popped out
        if (target instanceof RingMorph) {
            this.__clearBlockRecords(target.id);
        }

    } else {
        logger.error('Unsupported "onMoveBlock":', block);
    }

    this.ensureNotDragging(targetBlock);
    var ownerId = this.getBlockOwnerId(targetBlock);
    scripts = targetBlock.parentThatIsA(ScriptsMorph);

    // Update targets for displaced reporter blocks
    var isReplacingReporter = block instanceof ReporterBlockMorph &&
        target instanceof ReporterBlockMorph;

    if (isReplacingReporter) {
        this.__recordTarget(block.id, this._getCurrentTarget(target));
    }

    isTargetDragging = !scripts;
    scripts = scripts || this.getOwnerFromId(ownerId).scripts;  // TODO: when does this happen?
    afterMove = function() {
        if (isNewBlock && !isTargetDragging) {
            scripts.add(block);
        } else {
            if (block.parent && block.parent.reactToGrabOf) {
                block.parent.reactToGrabOf(block);
            }
        }

        block.snap(target);
        if (!isTargetDragging) {
            scripts.rerender();
        }

        if (isNewBlock) {
            myself.registerBlocks(block, ownerId);
        }

        if (target instanceof ReporterBlockMorph) {
            myself.__clearTarget(target.id);
        }

        if (ActionManager.isWeakTarget(target)) {
            var topBlock = block.topBlock();
        }

        if (targetNextBlock) {
            myself.__recordTarget(targetNextBlock.id, myself._getCurrentTarget(targetNextBlock));
        }

        if (block.fixChildrensBlockColor) {
            block.fixChildrensBlockColor(true);
        }

        myself.updateCommentsPositions(block);
        myself.__updateBlockDefinitions(block);
        myself.__updateActiveEditor(block.id);
        myself.__updateScriptsMorph(block);
        myself.completeAction(null, block);
    };

    // Glide to the given position first
    if (isNewBlock) {
        this.ide().palette.add(block);
        block.setPosition(this.blockInitPosition());
    }
    if (this.canAnimate(ownerId)) {
        var position = this.computeMovePosition(block, target);

        block.glideTo(
            position,
            null,
            null,
            function() {
                try {
                    afterMove();
                } catch(e) {
                    myself.completeAction(e);
                }
            }
        );
    } else {
        afterMove();
    }
};

ActionManager.prototype.computeMovePosition = function(block, target) {
    var targetBlock,
        offsetY,
        cslot;

    // calculate the position of the block after the move
    if (block instanceof CommandBlockMorph) {
        targetBlock = target.element;

        if (target.loc === 'bottom') {
            if (target.type === 'slot') {
                if (targetBlock instanceof CSlotMorph) {
                    return new Point(
                        targetBlock.left() + targetBlock.inset,
                        targetBlock.top() + targetBlock.corner
                    );
                }
                return new Point(
                    targetBlock.left() + targetBlock.edge + targetBlock.rfBorder,
                    targetBlock.top() + targetBlock.edge + targetBlock.rfBorder
                );
            } else {
                return new Point(
                    target.element.left(),
                    target.element.bottom() - (target.element.corner)
                );
            }
        } else if (target.loc === 'top') {
            offsetY = block.bottomBlock().bottom() - block.bottom();
            return new Point(
                targetBlock.left(),
                targetBlock.top() + block.corner - offsetY - block.height()
            );
        } else if (target.loc === 'wrap') {
            cslot = detect( // this should be a method making use of caching
                block.inputs(), // these are already cached, so maybe it's okay
                function (each) {return each instanceof CSlotMorph; }
            );

            // adjust position of wrapping block
            return block.position().add(target.point.subtract(cslot.slotAttachPoint()));
        }
    } else if (block instanceof ReporterBlockMorph) {
        if (target instanceof CommandSlotMorph) {
            var nb = target.nestedBlock();
            if (nb) {
                return nb.position().add(nb.extent());
            }
        }
        return target.position();
    } else {  // Comment
        var top = target.topBlock(),
            affectedBlocks,
            newTop,
            bottom,
            rightMost;

        newTop = target.top() + target.corner;
        bottom = newTop + block.height();
        affectedBlocks = top.allChildren().filter(function (child) {
            return child instanceof BlockMorph &&
                child.bottom() > newTop &&
                child.top() < bottom;
        });
        rightMost = Math.max.apply(
            null,
            affectedBlocks.map(function (block) {return block.right(); })
        );

        return new Point(
            rightMost + 5,
            newTop
        );
    }
};

ActionManager.prototype.blockInitPosition = function() {
    var palette = this.ide().palette;
    return new Point(palette.width()/2, palette.height()/4);
};

ActionManager.prototype.ensureNotDragging = function(block) {
    var hand = block.parentThatIsA(HandMorph);
    if (hand) {  // drop the item back on the world
        var situation = hand.grabOrigin;

        block = hand.children[0];  // get the top block
        block.cachedFullImage = null;
        block.cachedFullBounds = null;
        block.changed();
        block.removeShadow();
        hand.children = [];
        hand.destroyTemporaries();
        hand.contextMenuEnabled = true;
        hand.morphToGrab = null;
        hand.grabPosition = null;

        block.justDropped(hand);

        // Put it back in the grab origin (immediately)
        block.setPosition(situation.origin.position().add(situation.position));
        situation.origin.add(block);
        if (block.justDropped) {block.justDropped(); }
        if (situation.origin.reactToDropOf) {
            situation.origin.reactToDropOf(block);
        }
    }
};

ActionManager.prototype._onRemoveBlock = function(id, userDestroy, callback) {
    var myself = this,
        block = this.getBlockFromId(id),
        method = userDestroy && block.userDestroy ? 'userDestroy' : 'destroy',
        scripts,
        parent,
        afterRemove = function() {
            // FIXME: make sure processes have stopped
            block[method]();

            myself.__updateBlockDefinitions(block);
            callback();
        };

    this.ensureNotDragging(block);
    scripts = block.parentThatIsA(ScriptsMorph);
    parent = block.parent;
    if (block) {
        // Check the parent and revert to default input
        if (block.prepareToBeGrabbed) {
            block.prepareToBeGrabbed(this.world().hand);
        }

        // clear the records for entire deleted subtree/following blocks
        var root = block;
        if (method === 'userDestroy') {  // only provide the reporter inputs
            root = block.inputs().map(function(child) {
                if (!child.id && child.children) {
                    return child.children;
                } else {
                    return [child];
                }
            }).reduce(function (l1, l2) { return l1.concat(l2); }, []);
            this.__clearBlockRecords(id);
        }

        this.traverse(root, function(block) {
            myself.__clearBlockRecords(block.id);
        });

        // Animate the removal if dragging to palette wouldn't delete unwanted
        // blocks. That is, we are either deleting all following blocks or there
        // are no following blocks
        var hasNextBlock = block.nextBlock && block.nextBlock(),
            canAnimate = this.canAnimate(this.getBlockOwnerId(block)) &&
                (method === 'destroy' || !hasNextBlock);

        if (canAnimate) {
            // Animate the block deletion
            var palette = this.ide().palette;

            delete block.id;
            palette.add(block);
            block.glideTo(
                this.blockInitPosition(),
                null,
                null,
                function() {
                    try {
                        afterRemove();
                    } catch(e) {
                        callback(e);
                    }
                }
            );
        } else {
            afterRemove();
        }
        // Update parent block's UI
        if (parent) {
            if (parent.reactToGrabOf) {
                parent.reactToGrabOf(block);
            }
            if (parent.fixLayout) parent.fixLayout();
            parent.changed();
        }
        if (scripts) {
            scripts.rerender();
        }
    }
};

ActionManager.prototype.onRemoveBlock = function(id, userDestroy) {
    var myself = this;

    this._onRemoveBlock(id, userDestroy, function() {
        myself.completeAction();
    });
};

ActionManager.prototype.canAnimate = function(ownerId) {
    var viewingOwner = this.getOwnerFromId(ownerId) === this.ide().currentSprite ||
        this.isEditorOpen(ownerId);

    return viewingOwner && (this.ide().isReplayMode ||
        this.currentEvent.replayType || this.currentEvent.user !== this.id);
};

ActionManager.prototype.__updateScriptsMorph = function(block) {
    var scripts = block.parentThatIsA(ScriptsMorph),
        isDragging = !scripts;

    if (!isDragging) {
        scripts.adjustBounds();
        scripts.rerender();
    }
};

ActionManager.prototype.__updateBlockDefinitions = function(block) {
    var editor = block.parentThatIsA(BlockEditorMorph);
    if (editor) {
        editor.updateDefinition();
        const scripts = editor.body.contents;
        scripts.children.forEach(block => {
            const recordBlock = block => this._blocks[block.id] = block;

            if (block instanceof PrototypeHatBlockMorph) {
                const scriptRoot = block.nextBlock();
                if (scriptRoot) {
                    this.traverse(scriptRoot, recordBlock);
                }
            } else {
                this.traverse(block, recordBlock);
            }
        });
    }
};

ActionManager.prototype.onSetBlockPosition = function(id, x, y) {
    var myself = this;

    this._onSetBlockPosition(id, x, y, function() {
        myself.completeAction();
    });
};

ActionManager.prototype.updateCommentsPositions = function(block) {
    if (block.topBlock) {  // Update comment positions
        var topBlock = block.topBlock();
        topBlock.allComments().forEach(function (comment) {
            comment.align(topBlock);
        });
    }
};

ActionManager.prototype.getFieldValue = function(block, index) {
    var fieldId = this.getId(block, index);

    if (this.fieldValues[fieldId] instanceof StringMorph) {
        return this.fieldValues[fieldId].text;
    }
    return this.fieldValues[fieldId];
};

ActionManager.prototype.disconnectBlock = function(block, scripts) {
    var oldParent = block.parent;

    scripts = scripts || block.parentThatIsA(ScriptsMorph);
    block.prepareToBeGrabbed(this.world().hand);

    if (oldParent && !(oldParent instanceof ScriptsMorph)) {

        scripts.add(block);

        if (oldParent.reactToGrabOf) {
            oldParent.reactToGrabOf(block);
        }
        if (oldParent.fixLayout) {
            oldParent.fixLayout();
        }
        oldParent.changed();

        if (scripts) {
            scripts.rerender();
        }
    }

    if (block.fixBlockColor) {  // not a comment
        block.fixBlockColor();
    }
};

ActionManager.prototype.onAddListInput = function(id, count) {
    var block = this.getBlockFromId(id);

    this.ensureNotDragging(block);
    count = count || 1;
    for (var i = 0; i < count; i++) {
        block.addInput();
    }

    this.__updateScriptsMorph(block);
    this.__updateBlockDefinitions(block);
    this.completeAction();
};

ActionManager.prototype.onRemoveListInput = function(id, count) {
    var block = this.getBlockFromId(id);

    this.ensureNotDragging(block);
    count = count || 1;
    for (var i = 0; i < count; i++) {
        block.removeInput();
    }

    block.changed();
    this.__updateScriptsMorph(block);
    this.__updateBlockDefinitions(block);
    this.completeAction();
};

ActionManager.prototype.onSetBlockSpec = function(id, spec) {
    var block = this.getBlockFromId(id);
    this.ensureNotDragging(block);
    block.userSetSpec(spec);
    this.__updateBlockDefinitions(block);
    this.completeAction();
};

ActionManager.prototype.onSetField = function(fieldId, value) {
    var block = this.getBlockFromId(fieldId);

    console.assert(block instanceof InputSlotMorph,
        'Unexpected block type: ' + block.constructor);

    this.ensureNotDragging(block);
    this.fieldValues[fieldId] = value;
    block.setContents(value);

    this.__updateBlockDefinitions(block);
    this.completeAction();
};

ActionManager.prototype.onSetColorField = function(fieldId, desc) {
    var block = this.getBlockFromId(fieldId),
        color;

    this.ensureNotDragging(block);
    desc = desc || {};
    color = new Color(desc.r, desc.g, desc.b, desc.a);
    block.setColor(color);
    this.fieldValues[fieldId] = color;
    this.__updateBlockDefinitions(block);
    this.completeAction();
};

ActionManager.prototype.onSetCommentText = function(id, text) {
    var block = this.getBlockFromId(id);

    this.ensureNotDragging(block);
    block.contents.text = text;
    block.contents.rerender();
    block.layoutChanged();
    block.lastValue = text;

    this.__updateBlockDefinitions(block);
    this.completeAction();
};

ActionManager.prototype.onSetSelector = function(id, sel) {
    var block = this.getBlockFromId(id),
        myself = this;

    this.ensureNotDragging(block);
    block.setSelector(sel);
    block.changed();
    // update input block records
    this.traverse(block, function(block) {
        myself._blocks[block.id] = block;
    });
    this.__updateBlockDefinitions(block);
    this.completeAction();
};

ActionManager.prototype.onAddVariable = function(name, ownerId) {
    // Get the sprite or the stage
    var owner,
        isGlobal = ownerId.toString() === 'true';

    if (!isGlobal) {
        owner = this._owners[ownerId];
    } else {
        owner = this._owners[Object.keys(this._owners)[0]];
    }

    owner.addVariable(name, isGlobal);
    if (!owner.showingVariableWatcher(name, isGlobal)) {
        owner.toggleVariableWatcher(name, isGlobal, true);
    }

    var ide = owner.parentThatIsA(IDE_Morph);
    ide.flushBlocksCache('variables'); // b/c of inheritance
    ide.refreshPalette();
    this.completeAction();
};

ActionManager.prototype.onDeleteVariable = function(name, ownerId) {
    var isGlobal = ownerId.toString() === 'true',
        owner = isGlobal ? this._owners[Object.keys(this._owners)[0]] :
            this._owners[ownerId];

    owner.deleteVariable(name);
    this.completeAction();
};

ActionManager.prototype.onRingify = function(blockId, ringId) {
    var block = this.getBlockFromId(blockId),
        ownerId = this._blockToOwnerId[block.id],
        scripts,
        ring;

    if (block) {
        this.ensureNotDragging(block);

        ring = block.ringify();
        scripts = ring.parentThatIsA(ScriptsMorph);

        ring.id = ringId;
        this._blocks[ring.id] = ring;
        this._blockToOwnerId[ring.id] = ownerId;

        // Record the ring state
        // If it is a Reporter, potentially may need to update the target
        if (block instanceof ReporterBlockMorph && this._targetOf[block.id]) {
            this.__recordTarget(ring.id, this._targetOf[block.id]);

            // update the block for it's new id
            var newTarget = this.getId(block.parent, block.parent.inputs().indexOf(block));
            this.__recordTarget(block.id, newTarget);
        }
    }
    this.__updateBlockDefinitions(block);
    this.completeAction();
};

ActionManager.prototype.onUnringify = function(id) {
    var block = this.getBlockFromId(id);
    if (block) {
        this.ensureNotDragging(block);
        var ring = block.unringify();
        delete this._blocks[ring.id];
    }
    this.__updateBlockDefinitions(block);
    this.completeAction();
};

ActionManager.prototype.onToggleBoolean = function(id, fromValue) {
    var block = this.getBlockFromId(id),
        prev;

    if (typeof fromValue !== 'boolean') {
        fromValue = null;
    }

    while (prev !== fromValue) {
        prev = block.value;
        block.toggleValue();
    }

    if (!isNil(block.value)) {
        block.reactToSliderEdit();
    }

    this.__updateBlockDefinitions(block);
    this.completeAction();
};

////////////////////////// Custom Blocks //////////////////////////
ActionManager.prototype.onAddCustomBlock = function(ownerId, serialized, isGlobal) {
    var owner = this._owners[ownerId],
        ide = this.ide(),
        def;

    // Load the CustomBlockDefinition
    def = this.serializer.loadCustomBlock(this.serializer.parse(serialized));
    def.receiver = owner;
    def.isGlobal = isGlobal;
    if (isGlobal) {
        owner.globalBlocks.push(def);
        ide.currentSprite.paletteCache = {};
    } else {
        owner.customBlocks.push(def);
    }
    this.loadCustomBlocks([def], owner);

    // Update the palette
    owner.paletteCache = {};
    ide.refreshPalette();

    this.completeAction(null, def);
};

ActionManager.prototype.onDeleteCustomBlocks = function(ids) {
    var myself = this,
        ownerId = this.ide().stage.id;

    ids.forEach(function(id) {
        myself._onDeleteCustomBlock(id, ownerId);
    });
    this.completeAction();
};

ActionManager.prototype._onDeleteCustomBlock = function(id, ownerId) {
    var definition = this._customBlocks[id],
        rcvr = this._owners[ownerId],
        stage,
        ide,
        idx;

    rcvr.deleteAllBlockInstances(definition);
    if (definition.isGlobal) {
        stage = this.ide().stage;
        idx = stage.globalBlocks.indexOf(definition);
        if (idx !== -1) {
            stage.globalBlocks.splice(idx, 1);
        }
    } else {
        idx = rcvr.customBlocks.indexOf(definition);
        if (idx !== -1) {
            const customBlock = rcvr.customBlocks[idx];
            const blockSpec = customBlock.blockSpec();
            rcvr.allDependentInvocationsOf(blockSpec).forEach(
                block => block.refresh(customBlock)
            );
            rcvr.customBlocks.splice(idx, 1);
        }
    }

    ide = rcvr.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.flushPaletteCache();
        ide.refreshPalette();
    }
};

ActionManager.prototype.onDeleteCustomBlock = function(id, ownerId) {
    this._onDeleteCustomBlock(id, ownerId);
    this.completeAction();
};

ActionManager.prototype._getCustomCmdBlock = function(id) {
    var editor = this._getCustomBlockEditor(id),
        scripts = editor.body.contents,
        hat = detect(scripts.children,
            function(block) {return block instanceof PrototypeHatBlockMorph;}),
        customBlock = hat.inputs()[0];

    console.assert(hat.inputs().length === 1);

    return customBlock;
};

ActionManager.prototype._getFragment = function(id, index) {
    var customBlock = this._getCustomCmdBlock(id),
        frag = customBlock.children[index];

    return frag;
};

ActionManager.prototype.onUpdateBlockLabel = function(
    id,
    index,
    type,
    label,
    defaultValue,
    options,
    isReadOnly
) {
    var fragLabel = new BlockLabelFragment(label),
        fragment = this._getFragment(id, index),
        editor = fragment.parentThatIsA(BlockEditorMorph);

    fragLabel.type = type;
    fragLabel.options = options || '';
    fragLabel.defaultValue = defaultValue || '';
    fragLabel.isReadOnly = !!isReadOnly;

    fragment.updateBlockLabel(fragLabel);
    editor.updateDefinition();
    this.completeAction();
};

ActionManager.prototype.onDeleteBlockLabel = function(id, index) {
    var fragment = this._getFragment(id, index),
        editor = fragment.parentThatIsA(BlockEditorMorph);

    fragment.fragment.isDeleted = true;
    fragment.updateBlockLabel(fragment.fragment);
    editor.updateDefinition();
    this.completeAction();
};

ActionManager.prototype.onSetCustomBlockType = function(id, cat, type) {
    var customBlock = this._getCustomCmdBlock(id),
        hat = customBlock.parentThatIsA(PrototypeHatBlockMorph),
        editor = customBlock.parentThatIsA(BlockEditorMorph),
        definition = this._customBlocks[id];

    // Update the block definition and the hat block
    hat.blockCategory = definition.category = cat;
    hat.type = definition.type = type;
    editor.updateDefinition();
    customBlock.refreshPrototype();
    this.completeAction();
};

////////////////////////// Sprites //////////////////////////
ActionManager.prototype.ide = function() {
    return this.__ide;
};

ActionManager.prototype._loadCostume = function(savedCostume, callback) {
    var model = this.serializer.parse(savedCostume),
        costume = this.serializer.loadValue(model),
        onLoad,
        wearCostume = function() {
            costume.loaded = true;
            if (onLoad) {
                onLoad();
            }
            callback(costume);
        };

    if (costume.loaded === true) {
        wearCostume();
    } else {
        onLoad = costume.loaded;
        costume.loaded = wearCostume;
    }
};

ActionManager.prototype.onDuplicateSprite =
ActionManager.prototype.onAddSprite = function(serialized, creatorId) {
    var ide = this.ide(),
        allSprites,
        sprite;

    allSprites = this.serializer.loadSprites(serialized, ide);
    sprite = allSprites[allSprites.length-1];
    if (creatorId === this.id) {
        ide.selectSprite(sprite);
    }
    this.completeAction(null, sprite);
};

ActionManager.prototype.onAttachParts = function(spriteId, partIds) {
    var myself = this,
        sprite = this.getOwnerFromId(spriteId),
        part;

    partIds.forEach(function(id) {
        part = myself.getOwnerFromId(id);
        sprite.attachPart(part);
    });

    this.completeAction();
};

ActionManager.prototype.onDetachParts = function(partIds) {
    var myself = this,
        part;

    partIds.forEach(function(id) {
        part = myself.getOwnerFromId(id);
        part.detachFromAnchor();
    });

    this.completeAction();
};

ActionManager.prototype.onRemoveSprite = function(spriteId) {
    var sprite = this._owners[spriteId];
    this.ide().removeSprite(sprite);

    this.__clearOwnerRecords(spriteId);
    this.completeAction();
};

ActionManager.prototype.onRenameSprite = function(spriteId, name) {
    var sprite = this._owners[spriteId],
        ide = this.ide();

    sprite.setName(name);
    // If current sprite is spriteId, update the spriteBar namefield
    if (ide.currentSprite === sprite) {
        ide.spriteBar.nameField.setContents(name);
    }
    this.completeAction(null, name);
};

ActionManager.prototype.onToggleDraggable = function(spriteId, draggable) {
    var sprite = this._owners[spriteId],
        ide = this.ide();

    sprite.isDraggable = draggable;
    if (ide.currentSprite === sprite) {
        ide.spriteBar.padlock.refresh();
    }
    this.completeAction();
};

ActionManager.prototype._registerCostume = function(costume, sprite) {
    this._costumes[costume.id] = costume;
    this._costumeToOwner[costume.id] = sprite;
};

ActionManager.prototype.onAddCostume = function(savedCostume, ownerId, creatorId) {
    var ide = this.ide(),
        sprite = this._owners[ownerId];

    // Get the wardrobe morph...
    this._loadCostume(savedCostume, cos => {
        sprite.addCostume(cos);
        if (ide.spriteEditor instanceof WardrobeMorph) {
            ide.spriteEditor.updateList();
        }
        if (ide && ide.currentSprite === sprite) {
            ide.currentSprite.wearCostume(cos);
        }

        this._registerCostume(cos, sprite);

        if (creatorId === this.id) {
            ide.spriteBar.tabBar.tabTo('costumes');
        }
        this.__updateActiveEditor();
        this.completeAction(null, cos);
    });
};

ActionManager.prototype.onUpdateCostume = function(id, savedCostume) {
    var ide = this.ide(),
        sprite = this._costumeToOwner[id],
        myself = this,
        world = ide.parentThatIsA(WorldMorph);

    this._loadCostume(savedCostume, function(cos) {
        var oldCostume = myself._costumes[id];
        oldCostume.rotationCenter = cos.rotationCenter;
        oldCostume.contents = cos.contents;
        oldCostume.version = Date.now();
        world.changed();

        if (ide.currentSprite === sprite) {
            ide.currentSprite.wearCostume(oldCostume);
        }
        ide.hasChangedMedia = true;
    });
    this.__updateActiveEditor(id);
    this.completeAction();
};

ActionManager.prototype.onRemoveCostume = function(id) {
    var costume = this._costumes[id],
        sprite = this._costumeToOwner[id],
        editor = this.ide().spriteEditor,
        idx = sprite.costumes.asArray().indexOf(costume);


    // Check for the wardrobe
    if (editor instanceof WardrobeMorph) {
        editor.removeCostumeAt(idx + 1);
    } else {
        sprite.costumes.remove(idx + 1);
    }

    if (sprite.costume === costume) {
        sprite.wearCostume(null);
    }

    this.__updateActiveEditor(id);
    this.__clearCostumeRecords(id);
    this.completeAction();
};

ActionManager.prototype.onRenameCostume = function(id, newName) {
    var costume = this._costumes[id],
        ide = this.ide();

    costume.name = newName;
    costume.version = Date.now();
    ide.hasChangedMedia = true;
    this.__updateActiveEditor(id);
    this.completeAction(null, costume);
};

ActionManager.prototype.onAddSound = function(serialized, ownerId, creatorId) {
    var owner = this._owners[ownerId],
        sound = this.serializer.loadValue(this.serializer.parse(serialized)),
        ide = this.ide();

    owner.addSound(sound);
    ide.hasChangedMedia = true;

    // register the sound
    this._sounds[sound.id] = sound;
    this._soundToOwner[sound.id] = owner;

    // update the ui
    if (creatorId === this.id) {
        ide.spriteBar.tabBar.tabTo('sounds');
    }

    if (ide.currentSprite === owner && ide.spriteEditor instanceof JukeboxMorph) {
        // TODO: Should refresh after the audio is loaded...
        // This is an issue in Snap!, too
        ide.spriteEditor.updateList();
    }
    this.__updateActiveEditor(sound.id);
    this.completeAction();
};

ActionManager.prototype.onRenameSound = function(id, name) {
    var sound = this._sounds[id],
        ide = this.ide();

    sound.name = name;
    sound.version = Date.now();

    if (ide.spriteEditor instanceof JukeboxMorph) {
        // TODO: Should refresh after the audio is loaded...
        // This is an issue in Snap!, too
        ide.spriteEditor.updateList();
    }

    ide.hasChangedMedia = true;
    this.__updateActiveEditor(id);
    this.completeAction();
};

ActionManager.prototype.onRemoveSound = function(id) {
    var owner = this._soundToOwner[id],
        ide = this.ide(),
        idx = owner.sounds.asArray().indexOf(this._sounds[id]) + 1;

    owner.sounds.remove(idx);

    if (ide.spriteEditor instanceof JukeboxMorph) {
        ide.spriteEditor.updateList();
    }

    this.__updateActiveEditor(id);
    this.__clearSoundRecords(id);
    this.completeAction();
};

ActionManager.prototype.onSetStageSize = function(width, height) {
    this.ide().setStageExtent(new Point(width, height));
    this.completeAction();
};

ActionManager.prototype.onSetRotationStyle = function(id, rotationStyle) {
    var sprite = this._owners[id];

    sprite.rotationStyle = rotationStyle;
    sprite.changed();
    sprite.fixLayout();
    sprite.rerender();

    this.ide().rotationStyleButtons.forEach(function (each) {
        each.refresh();
    });
    this.completeAction();
};
//////////////////// Import ////////////////////
ActionManager.prototype.onImportSprites = function(xmlString) {
    this.ide().rawOpenSpritesString(xmlString);
    this.completeAction();
};

ActionManager.prototype.onImportBlocks = function(aString, lbl) {
    var blocks = this.ide().rawOpenBlocksString(aString, lbl, true);
    this.completeAction(null, blocks);
};

ActionManager.prototype.onOpenProject = async function (str) {
    
    var myself = this,
        project = null,
        event = this.currentEvent,
        ide = this.ide();

    SnapUndo.reset();
    this.initializeRecords();

    if (str) {
        if (str.indexOf('<project') === 0) {
            project = ide.rawOpenProjectString(str);
        } else if (str.indexOf('<snapdata') === 0) {
            project = ide.rawOpenCloudDataString(str);
        }

    } else {
        ide.newRole();
    }

    // Load the owners
    ide.sprites.asArray().concat(ide.stage).forEach(function(sprite) {
        return myself.loadOwner(sprite);
    });

    this.lastSeen = event.id;  // don't reset lastSeen
    this.completeAction(null, project);

    if (!ide.isReplayMode) {
        // Load the replay and action manager state from project
        var len = SnapUndo.allEvents.length;

        // Remove the openProject event from the replay history.
        // In the future, this information would be good to collect
        // but it will not be recorded for now since it will exponentially
        // inflate the project size...
        if (event === SnapUndo.allEvents[len-1]) {
            SnapUndo.allEvents.pop();
        }

        if (project && project.collabStartIndex !== undefined) {
            this.lastSeen = project.collabStartIndex;
        }

        var roomName = ide.room.name,
            roleName = ide.projectName;

        await SnapCloud.setClientState(roomName, roleName, this.lastSeen);
        this.requestMissingActions();

        ide.extensions.onOpenRole();
    }
};

ActionManager.prototype._getCurrentTarget = function(block) {
    var parent = block.parent,
        target,
        id;

    if (parent instanceof BlockMorph || parent instanceof CommandSlotMorph) {
        if (block instanceof CommandBlockMorph) {
            // basic case (following another statement)
            if (parent.nextBlock && parent.nextBlock() === block) {
                return this._serializeMoveTarget(
                    block,
                    {
                        point: parent.bottomAttachPoint(),
                        element: parent,
                        loc: 'bottom',
                        type: 'block'
                    });
            } else if (parent instanceof CommandSlotMorph) {  // nested in a slot
                return this._serializeMoveTarget(
                    block,
                    {
                        point: parent.slotAttachPoint(),
                        element: parent,
                        loc: 'bottom',
                        type: 'slot'
                    });
            }

        } else if (block instanceof ReporterBlockMorph) {
            // Get the generic id
            id = block.id;
            block.id = null;
            target = this.getId(block);
            block.id = id;
            return target;
        }
    } else if (block instanceof CommentMorph && block.block) {
        return block.block.id;
    }

    return null;
};

ActionManager.prototype._registerBlockState = function(block, initial) {
    var myself = this,
        scripts,
        standardPosition,
        fieldId,
        contents,
        value,
        target;

    if (!(block instanceof PrototypeHatBlockMorph || block.isPrototype)) {
        this.__assignUniqueBlockId(block, initial);
        this._blocks[block.id] = block;

        // Record the block's initial state...
        target = this._getCurrentTarget(block);
        scripts = block.parentThatIsA(ScriptsMorph);

        if (target) {
            this.__recordTarget(block.id, target);
        }

        // Record the field values if it has any
        if (block.inputs) {
            block.inputs().forEach(function(input) {
                contents = input.contents && input.contents();
                if (contents) {
                    value = contents.value || contents;
                    if (!(input instanceof BlockMorph) && value !== undefined) {
                        fieldId = myself.getId(input);
                        myself.fieldValues[fieldId] = value;
                    }

                    if (input instanceof ColorSlotMorph) {
                        fieldId = myself.getId(input);
                        myself.fieldValues[fieldId] = input.color;
                    }
                }
            });
        }
    }
};

ActionManager.prototype.__assignUniqueBlockId = function(block, silent) {
    var oldId;

    block.id = block.id || this.newId();

    // verify that the id is unique
    if (this._blocks[block.id] && this._blocks[block.id] !== block) {
        oldId = block.id;
        while (this._blocks[block.id] && this._blocks[block.id] !== block) {
            block.id = this.newId();
        }
        if (!silent) {
            console.warn('Block id ' + oldId + ' already used. Reissuing id ' + block.id);
        }
    }
};

ActionManager.prototype.loadOwner = function(owner) {
    var myself = this;

    this.registerOwner(owner, owner.id);

    // Load the blocks from scripts
    owner.scripts.children.forEach(function(topBlock) {  // id the blocks
        myself.traverse(topBlock, function(block) {
            myself.__assignUniqueBlockId(block, true);
            myself._blocks[block.id] = block;
        });
    });

    owner.scripts.children.forEach(function(block) {
        myself.registerBlocks(block, owner.id);
    });

    // Load the blocks from custom block definitions
    var customBlocks = owner.customBlocks;

    if (owner.globalBlocks) {
        customBlocks = customBlocks.concat(owner.globalBlocks);
    }

    this.loadCustomBlocks(customBlocks, owner);

    // Load the costumes
    owner.costumes.asArray().forEach(function(costume) {
        costume.id = costume.id || myself.newId();
        myself._costumes[costume.id] = costume;
        myself._costumeToOwner[costume.id] = owner;
    });

    // Load the sounds
    owner.sounds.asArray().forEach(function(sound) {
        sound.id = sound.id || myself.newId();
        myself._sounds[sound.id] = sound;
        myself._soundToOwner[sound.id] = owner;
    });
};

ActionManager.prototype.loadCustomBlocks = function(blocks, owner) {
    var myself = this,
        editor,
        scripts,
        block,
        def;

    owner = owner || this.ide().stage;
    for (var i = blocks.length; i--;) {
        def = blocks[i];
        def.id = def.id || myself.newId();
        myself._customBlocks[def.id] = def;
        myself._customBlockOwner[def.id] = owner;
        editor = myself._getCustomBlockEditor(def.id);
        scripts = editor.body.contents;
        for (var j = scripts.children.length; j--;) {
            block = scripts.children[j];
            myself.registerBlocks(block, def.id, true);
        }
        editor.updateDefinition(true);
    }
};

ActionManager.prototype.traverse = function(block, fn) {
    var current = block instanceof Array ? block : [block],
        next,
        inputs,
        i;

    while (current.length) {
        next = [];
        for (i = current.length; i--;) {
            block = current[i];
            fn(block);

            inputs = this.getBlockInputs(block);
            next = next.concat(inputs);

            if (block.nextBlock && block.nextBlock()) {  // add following blocks
                next.push(block.nextBlock());
            }
            if (block.comment) {
                next.push(block.comment);
            }
        }
        current = next;
    }
};

ActionManager.prototype.getBlockInputs = function(block) {
    var allInputs = [],
        inputs,
        input;

    if (block.inputs) {  // Add nested blocks
        inputs = block.inputs();
        for (var j = inputs.length; j--;) {
            input = inputs[j];
            if (input instanceof ReporterBlockMorph) {
                allInputs.push(input);
            } else if (input instanceof ArgMorph && !(input instanceof TemplateSlotMorph)) {
                // Get all the children of any ArgMorphs. Skip TemplateSlotMorphs
                // since they cannot actually be moved and aren't really a block
                // in their own right
                allInputs = allInputs.concat(this.getBlockInputs(input));
            }

            if (input.nestedBlock && input.nestedBlock()) {
                allInputs.push(input.nestedBlock());
            }
        }
    }
    return allInputs;
};

ActionManager.prototype.__updateActiveEditor = function(itemId) {
    var ownerId,
        editor,
        ide = this.ide(),
        owner;

    if (this.currentEvent.replayType) {  // don't change focus if undo/redo
        return;
    }

    if (this.isCollaborating() && this.currentEvent.user !== this.id) {
        // other user edits should not change the active editor
        return;
    }

    // Get ownerId
    ownerId = this._blockToOwnerId[itemId];
    if (ownerId) {
        editor = this._getCustomBlockEditor(ownerId);

        if (editor) {
            return ide.setActiveEditor(editor);
        }
    } else {  // costume or sound
        ownerId = this._costumeToOwner[itemId] ? this._costumeToOwner[itemId].id :
            this._soundToOwner[itemId] ? this._soundToOwner[itemId].id : null;
    }

    owner = this._owners[ownerId];
    if (!owner || owner === ide.currentSprite) {
        ide.setActiveEditor();
    }
};

ActionManager.prototype.__clearOwnerRecords = function(ownerId) {
    var blockIds = Object.keys(this._blockToOwnerId),
        costumeIds = Object.keys(this._costumeToOwner),
        soundIds = Object.keys(this._soundToOwner),
        i;

    for (i = blockIds.length; i--;) {
        if (this._blockToOwnerId[blockIds[i]] === ownerId) {
            this.__clearBlockRecords(blockIds[i]);
        }
    }

    for (i = costumeIds.length; i--;) {
        if (this._costumeToOwner[costumeIds[i]].id === ownerId) {
            this.__clearCostumeRecords(costumeIds[i]);
        }
    }

    for (i = soundIds.length; i--;) {
        if (this._soundToOwner[soundIds[i]].id === ownerId) {
            this.__clearSoundRecords(soundIds[i]);
        }
    }

    delete this._owners[ownerId];
};

ActionManager.prototype.__clearSoundRecords = function(id) {
    delete this._soundToOwner[id];
    delete this._sounds[id];
};

ActionManager.prototype.__clearCostumeRecords = function(id) {
    delete this._costumeToOwner[id];
    delete this._costumes[id];
};

ActionManager.prototype.__clearBlockRecords = function(id) {
    delete this._blocks[id];
    delete this._blockToOwnerId[id];

    if (this._targetFor[id]) {
        // Clear the target ids of all blocks connected to this block
        var connectedIds = Object.keys(this._targetFor[id]);
        for (var i = connectedIds.length; i--;) {
            delete this._targetOf[connectedIds[i]];
        }
    }
    delete this._targetFor[id];
    this.__clearTarget(id);
};

ActionManager.prototype.__recordTarget = function(id, target) {
    var targetId = this.__targetId(target);

    this.__clearTarget(id);

    this._targetOf[id] = target;

    // Record the targetTo records
    if (!this._targetFor[targetId]) {
        this._targetFor[targetId] = {};
    }
    this._targetFor[targetId][id] = target;
};

ActionManager.prototype.__targetId = function(target) {
    if ((typeof target) === 'object') {
        return target.element;
    } else {
        return target;
    }
};

ActionManager.prototype.__clearTarget = function(id) {
    var oldTarget = this._targetOf[id],
        oldTargetId;

    // Clear targetFor record
    if (oldTarget) {  // Remove old targetFor
        oldTargetId = this.__targetId(this._targetOf[id]);
        if (this._targetFor[oldTargetId]) {
            delete this._targetFor[oldTargetId][id];
        }
    }

    // Clear regular record
    delete this._targetOf[id];
};

ActionManager.prototype.afterActionApplied = function(action) {
    // Update the undo buttons of the focused window
    var ide = this.ide(),
        active = ide.activeEditor;

    // Update the focus (set to the owner if the owner is the currentSprite or
    // a custom block)

    active.onSetActive();
    ide.events.dispatchEvent(new CustomEvent('action', {detail: action}));
};

ActionManager.prototype.onMessage = function(msg) {
    var socket = this.ide().sockets;

    if (msg.type === 'rank') {
        this.rank = msg.value;
        logger.info('assigned rank of', this.rank);
    } else if (msg.type === 'leader-appoint') {
        this.isLeader = msg.value;
        if (msg.value) {
            logger.info('Appointed leader!');
        }
    } else if (msg.type === 'uuid') {
        this.id = msg.value;
        logger.info('assigned id of', this.id);
        if (this.onconnect) {
            this.onconnect();
        }
    } else if (msg.type === 'session-project-request') {
        // Return the serialized project
        var str = this.serialize(this.ide().stage);
        msg.args = [str];
        msg.id = this.lastSeen;
        this.send(msg);
    } else if (msg.type === 'session-id') {
        this.sessionId = msg.value;
        location.hash = 'collaborate=' + this.sessionId;
    } else if (this.isLeader && !socket.inActionRequest) {
        // Verify that the lastSeen value is the same as the current
        if (this.isNextAction(msg)) {
            this.acceptEvent(msg);
        }
    } else {
        this.onReceiveAction(msg);
    }
};

ActionManager.prototype.onActionReject = function(action, reason) {
    var queue = this._attemptedLocalActions,
        item = queue.find(function(item) { return item.equals(action); }),
        index = queue.indexOf(item);

    if (index > -1) {
        queue.splice(index, 1);
        item.reject(new Error(reason));
    }
};

/* * * * * * * * * * * * OwnerFor * * * * * * * * * * * */
ActionManager.OwnerFor = function() {
    // default owner is the current sprite
    return this.ide().currentSprite.id;
};

ActionManager.OwnerFor.toggleBoolean =
ActionManager.OwnerFor.setColorField =
ActionManager.OwnerFor.setField =

ActionManager.OwnerFor.addListInput =
ActionManager.OwnerFor.unringify =

ActionManager.OwnerFor.ringify =
ActionManager.OwnerFor.unringify =

ActionManager.OwnerFor.setCommentText =
ActionManager.OwnerFor.setSelector =
ActionManager.OwnerFor.setBlockSpec =

ActionManager.OwnerFor.removeBlock =
ActionManager.OwnerFor.setBlockPosition = function(blockOrInputId) {
    var blockId = blockOrInputId.split('/').shift();
    return this._blockToOwnerId[blockId] + '/scripts';
};

ActionManager.OwnerFor.replaceBlock = function(block) {
    block = this.deserializeBlock(block);
    return this._blockToOwnerId[block.id]+ '/scripts';
};

ActionManager.OwnerFor.addBlock = function(block, ownerId) {
    return ownerId + '/scripts';
};

ActionManager.OwnerFor.setBlocksPositions = function(ids) {
    if (ids.length) {
        return this._blockToOwnerId[ids[0]] + '/scripts';
    }
};

ActionManager.OwnerFor.moveBlock = function(block, target) {
    var blockId;

    // Base this off the target since the block could be new...
    blockId = (typeof target) === 'string' ? target : target.element;

    // Get the parent block (if referencing a field)
    blockId = blockId.split('/')[0];

    if (this._customBlocks[blockId]) {
        return blockId + '/scripts';
    } else {
        return this._blockToOwnerId[blockId] + '/scripts';
    }
};

// Actions where owner is second arg:
ActionManager.OwnerFor.addCostume = function(cos, ownerId) {
    return ownerId + '/costumes';
};

ActionManager.OwnerFor.removeCostume = function() {
    return arguments[2] + '/costumes';
};

ActionManager.OwnerFor.updateCostume =
ActionManager.OwnerFor.renameCostume = function(costumeId) {
    return this._costumeToOwner[costumeId].id + '/costumes';
};

// sounds
ActionManager.OwnerFor.addSound = function(sound, ownerId) {
    return ownerId + '/sounds';
};

ActionManager.OwnerFor.removeSound = function() {
    return arguments[2] + '/sounds';
};

ActionManager.OwnerFor.renameSound = function(soundId) {
    return this._soundToOwner[soundId].id + '/sounds';
};

ActionManager.OwnerFor.updateBlockLabel =
ActionManager.OwnerFor.deleteBlockLabel =
ActionManager.OwnerFor.setCustomBlockType = function(id) {
    return this._customBlockOwner[id].id;
};

// Can't undo
ActionManager.OwnerFor.addCustomBlock =

ActionManager.OwnerFor.renameSprite =
ActionManager.OwnerFor.toggleDraggable =
ActionManager.OwnerFor.setRotationStyle =

ActionManager.OwnerFor.addVariable =
ActionManager.OwnerFor.deleteVariable =

ActionManager.OwnerFor.setStageSize =
ActionManager.OwnerFor.importBlocks =
ActionManager.OwnerFor.importSprites =
ActionManager.OwnerFor.openProject =
ActionManager.OwnerFor.duplicateSprite =
ActionManager.OwnerFor.addSprite = function() {
    return null;
};

// Corral/Palette events
ActionManager.OwnerFor.removeSprite = function() {
    return 'corral';
};

ActionManager.OwnerFor.deleteCustomBlock = function() {
    return 'palette';
};

var SnapActions = new ActionManager();
