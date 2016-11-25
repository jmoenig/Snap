var logger = {
    log: console.log.bind(console),
    debug: console.debug.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console)
};

// If not the leader, send operations to the leader for approval
function ActionManager() {
    this.lastSeen = 0;
    this.lastSent = null;
    this.idCount = 0;

    this.id = null;
    this.rank = null;
    this.isLeader = false;
    this._onAccept = {};
    this._onReject = {};
    this.initialize();
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
                result,
                msg;

            if (this[fn]) {
                args = this[fn].apply(this, args) || args;
            }

            msg = {
                type: method,
                args: args
            };

            return this.applyEvent(msg);
        };
    });
};

ActionManager.prototype.initializeEventMethods = function() {
    this.addActions(
        'setStageSize',

        // Sprites
        'addSprite',
        'removeSprite',
        'removeSprites',  // (used for undo)
        'renameSprite',
        'toggleDraggable',
        'duplicateSprite',
        'importSprites',
        'setRotationStyle',

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
        'removeBlocks',
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
        'setField'
    );
};

ActionManager.prototype.initializeRecords = function() {
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
    this._positionOf = {};
    this._targetOf = {};
    this._blockToOwnerId = {};
};

ActionManager.prototype.collaborate = function() {
    var url = 'ws://' + window.location.host,
        ws = new WebSocket(url),
        self = this;

    ws.onopen = function() {
        logger.debug('websocket connected!');
        self.isLeader = false;
    };

    ws.onclose = function() {
        self.isLeader = true;
    };

    ws.onmessage = function(raw) {
        var msg = JSON.parse(raw.data);

        if (msg.type === 'rank') {
            self.rank = msg.value;
            self.id = 'client_' + self.rank;
            logger.info('assigned rank of', self.rank);
        } else if (msg.type === 'leader-appoint') {
            self.isLeader = true;
            logger.info('Appointed leader!');
        } else {  // block action
            self.onMessage(msg);
        }
    };
    this._ws = ws;
};

ActionManager.prototype.initialize = function() {
    this.serializer = new SnapSerializer();
    this._ws = null;
    this.isLeader = true;

    this.initializeRecords();
    this.initializeEventMethods();
    this.collaborate();
};

function Action(manager, event) {
    this._manager = manager;
    this.id = event.id;
};

Action.prototype.accept = function(fn) {
    this._manager._onAccept[this.id] = fn;
    return this;
};

Action.prototype.reject = function(fn) {
    this._manager._onReject[this.id] = fn;
    return this;
};

ActionManager.prototype.applyEvent = function(event) {
    event.user = this.id;
    event.id = event.id || this.lastSeen + 1;

    // Skip duplicate undo/redo events
    if (event.replayType && this.lastSent === event.id) {
        return;
    }

    if (this.isLeader) {
        this.acceptEvent(event);
    } else {
        this.send(event);
    }
    return new Action(this, event);
};

ActionManager.prototype._getMethodFor = function(action) {
    var method = '_on' + action.substring(0,1).toUpperCase() + action.substring(1);

    if (!this[method]) {
        method = method.substring(1);
    }

    return method;
};

ActionManager.prototype.acceptEvent = function(msg) {
    msg.id = msg.id || this.lastSeen + 1;

    // If we are undo/redo-ing, make sure it hasn't already been sent
    this.send(msg);
    setTimeout(this._applyEvent.bind(this), 0, msg);
};

ActionManager.prototype._isBatchEvent = function(msg) {
    return msg.type === 'batch';
};

ActionManager.prototype._applyEvent = function(msg) {
    var myself = this,
        result;

    logger.debug('received event:', msg);

    // If it is a batch, it may need to call multiple...
    if (this._isBatchEvent(msg)) {
        result = msg.args.map(function(event) {
            myself._rawApplyEvent(event);
        });
    } else {
        result = this._rawApplyEvent(msg);
    }

    this.lastSeen = msg.id;
    this.idCount = 0;
    SnapUndo.record(msg);

    // Call 'success' or 'reject', if relevant
    if (msg.user === this.id) {
        if (this._onAccept[msg.id]) {
            this._onAccept[msg.id](result);
            delete this._onAccept[msg.id];
        }
        delete this._onReject[msg.id];

        // We can call reject for any ids less than the given id...
        for (var i = msg.id; i--;) {
            if (this._onReject[msg.id]) {
                this._onReject[msg.id](result);
                delete this._onReject[msg.id];
            }
        }
    }
};

ActionManager.prototype._rawApplyEvent = function(msg) {
    var method = this._getMethodFor(msg.type);

    return this[method].apply(this, msg.args);
};

ActionManager.prototype.send = function(json) {
    json.id = json.id || this.lastSeen + 1;
    this.lastSent = json.id;
    if (this._ws && this._ws.readyState === WebSocket.OPEN) {
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
    var id = '';
    while (!block.id) {
        if (block.parent === null) {  // template block
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

ActionManager.prototype.serializeBlock = function(block, force) {
    if (block.id && !force) {
        return block.id;
    }

    if (block instanceof CommentMorph) {
        return block.toXML(this.serializer);
    }

    return block.toScriptXML(this.serializer);
};

ActionManager.prototype.deserializeBlock = function(ser) {
    var ownerId = Object.keys(this._owners).pop(),
        owner,
        stage;

    if (ownerId) {  // Update the stage for custom blocks
        owner = this._owners[ownerId],
        stage = owner.parentThatIsA(StageMorph);

        this.serializer.project = {
            stage: stage,
            sprites: {}
        };
    }

    if (ser[0] !== '<') {
        return this._blocks[ser];
    } else if (ser.indexOf('<script>') === 0) {
        return this.serializer.loadScript(this.serializer.parse(ser));
    } else {  // Comment
        return this.serializer.loadComment(this.serializer.parse(ser));
    }
};

ActionManager.prototype.registerOwner = function(owner, id) {
    owner.id = id || this.newId();
    this._owners[owner.id] = owner;
};

/* * * * * * * * * * * * Preprocess args (before action is accepted) * * * * * * * * * * * */
// These are decorators which take the args from the public API and return the args for
// the event to be sent to the other collaborators (and received by the onEventName methods)
ActionManager.prototype.getStandardPosition = function(scripts, position) {
    var scale = SyntaxElementMorph.prototype.scale;
    position = position.subtract(scripts.topLeft()).divideBy(scale);
    return position;
};

ActionManager.prototype._getStatementIds = function(block) {
    var ids = [];

    while (block) {
        ids.push(block.id);
        block = block.nextBlock ? block.nextBlock() : null;
    }
    return ids;
};

ActionManager.prototype._addBlock = function(block, scripts, position, ownerId) {
    var stdPosition = this.getStandardPosition(scripts, position),
        serialized,
        ids;

    this._idBlocks(block);
    ids = this._getStatementIds(block);

    serialized = this.serializeBlock(block, true);
    return [
        serialized,
        ownerId || scripts.owner.id,
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
    var serialized = this.serializeBlock(block, true),
        position = this._positionOf[block.id],
        ownerId = this._blockToOwnerId[block.id],
        args = [
            block.id,
            userDestroy
        ];
        
    if (position) {
        args.push(
            position.y,
            position.x,
            ownerId,
            serialized
        );
    } else {
        args.push(this._targetOf[block.id]);
    }

    return args;
};

ActionManager.prototype._getBlockState = function(id) {
    var state;

    if (this._targetOf[id]) {
        state = [this._targetOf[id]];
    } else if (this._positionOf[id]) {
        state = [this._positionOf[id].x, this._positionOf[id].y];
    } else {  // newly created
        state = [];
    }

    state.unshift(id);
    return state;
};

ActionManager.prototype._setBlockPosition = function(block, position) {
    var id = block.id,
        scripts = block.parentThatIsA(ScriptsMorph),
        standardPosition = this.getStandardPosition(scripts, position),
        oldState = this._getBlockState(id);

    return [id, standardPosition.x, standardPosition.y, oldState];
};

ActionManager.prototype._setBlocksPositions = function(ids, positions) {
    var block = this.getBlockFromId(ids[0]),
        scripts = block.parentThatIsA(ScriptsMorph),
        stdPositions,
        oldPositions;

    oldPositions = ids.map(function(id) {
        return this._positionOf[id];
    }, this);

    stdPositions = positions.map(function(pos) {
        return this.getStandardPosition(scripts, pos);
    }, this)

    return [ids, stdPositions, oldPositions];
};

// Custom Blocks
ActionManager.prototype._addCustomBlock = function(definition, owner) {
    var serialized,
        args;

    definition.id = this.newId();
    serialized = this.serializer.serialize(definition);
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
        serialized = this.serializer.serialize(definition);

    return [definition.id, owner.id, serialized, definition.isGlobal];
};

ActionManager.prototype._deleteCustomBlocks = function(blocks) {
    var serialized = [],
        ids = [];

    for (var i = blocks.length; i--;) {
        serialized.push(this.serializer.serialize(blocks[i]));
        ids.push(blocks[i].id);
    }

    serialized = '<blocks>' + serialized.join('') + '</blocks>';
    return [ids, serialized];
};

ActionManager.prototype._importBlocks = function(str, lbl) {
    // Get unique ids for each of the blocks
    var model = this.uniqueIdForImport(str),
        ids;

    // need to get the ids for each of the sprites (so we can delete them on undo!)
    ids = model.children.map(child => child.attributes.collabId);
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
        type = fragment.type,
        value = fragment.labelString;

    console.assert(index > -1, 'Cannot find the fragment!');
    return [definition.id, index, type, value, label.fragment.type, label.fragment.labelString];
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

ActionManager.prototype._moveBlock = function(block, target) {
    var isNewBlock = !block.id,
        position,
        serialized,
        ids,
        id,
        oldState,
        displacedTarget,
        args;

    // If the target is a ReporterBlockMorph, then we are replacing that block.
    // Undo should place that block back into it's current place
    if (target instanceof ReporterBlockMorph) {  // displacing a block
        displacedTarget = [target.id, this._getCurrentTarget(target)];
    }

    target = this._serializeMoveTarget(block, target);
    if (isNewBlock) {
        this._idBlocks(block);
    }
    id = block.id;
    serialized = this.serializeBlock(block, isNewBlock);

    oldState = this._getBlockState(id);
    args = [serialized, target];
    if (isNewBlock) {
        ids = this._getStatementIds(block);
        oldState = [ids];
        block.destroy();
    }

    args.push(oldState);

    if (displacedTarget) {
        args.push(displacedTarget);
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
    var ring = this.getOutermostRing(block),
        parent = this.getParentWithId(block);

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

ActionManager.prototype.getOutermostRing = function(block, immediate) {
    var parent;

    if (immediate) {
        parent = this.getParentWithId(block);
    } else {
        parent = block.parentThatIsA(RingMorph);
    }

    while (parent instanceof RingMorph) {
        block = parent;
        parent = this.getParentWithId(block);
    }

    return block;

};

ActionManager.prototype._ringify = function(block) {
    // If contained in a ringmorph, get the outermost ring
    var ringId = this.newId();

    block = this.getOutermostRing(block, true);

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

ActionManager.prototype._addSprite = function(sprite, costume, position) {
    var serialized,
        stage = this.ide().stage;

    sprite.parent = stage;
    position = position || sprite.rotationCenter();
    sprite.id = this.newId();

    //if (costume) {
        //sprite.addCostume(costume);
        //sprite.wearCostume(costume);
    //}
    serialized = '<sprites>' + this.serializer.serialize(sprite) + '</sprites>';

    return [serialized, this.id, sprite.id];
};

ActionManager.prototype.uniqueIdForImport = function (str) {
    var msg,
        myself = this,
        model = myself.serializer.parse(str),
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
    var costumes = sprite.costumes.asArray(),
        serialized = '<sprites>' + this.serializer.serialize(sprite) + '</sprites>';

    return [sprite.id, serialized];
};

ActionManager.prototype._renameSprite = function(sprite, name) {
    return [sprite.id, name, sprite.name];
};

ActionManager.prototype._duplicateSprite = function(sprite, position) {
    var id = this.newId(),
        newSprite = sprite.copy(),
        ide = this.ide(),
        str,
        start,
        end,
        serialized;

    newSprite.id = id;
    newSprite.setName(ide.newSpriteName(sprite.name));
    newSprite.parent = ide.stage;

    // Create new ids for all the sprite's children
    serialized = this.serializer.serialize(newSprite);

    start = '<sprites>' + this._getOpeningSpriteTag(serialized);
    end = '</sprites>';

    str = this.uniqueIdForImport(serialized).toString();
    str = str.replace(/<sprite.*?[^\\]>/, start) + end;  // preserve sprite's id

    return [str, null, id];
};

// Helper method
ActionManager.prototype._getOpeningSpriteTag = function(str) {
    var regex = /<sprite.*?[^\\]>/,
        match = str.match(regex);

    return match[0];
};

ActionManager.prototype._importSprites = function(str) {
    var model = this.uniqueIdForImport(str),
        ids;

    // need to get the ids for each of the sprites (so we can delete them on undo!)
    ids = model.children.map(child => child.attributes.collabId);
    str = model.toString();
    return [str, ids];
};

/* * * * * * * * * * * * Updating internal rep * * * * * * * * * * * */
ActionManager.prototype._onSetBlocksPositions = function(ids, positions) {
    for (var i = ids.length; i--;) {
        this._onSetBlockPosition(ids[i], positions[i].x, positions[i].y);
    }
};

ActionManager.prototype._onSetBlockPosition = function(id, x, y) {
    var position = new Point(x, y);

    this._positionOf[id] = position;
    delete this._targetOf[id];
    this.onSetBlockPosition(id, position);
};

ActionManager.prototype._onSetField = function(fieldId, value) {
    this.fieldValues[fieldId] = value;

    this.onSetField(fieldId, value);
};

/* * * * * * * * * * * * Updating Snap! * * * * * * * * * * * */
ActionManager.prototype.getAdjustedPosition = function(position, scripts) {
    var scale = SyntaxElementMorph.prototype.scale;
    position = position.multiplyBy(scale).add(scripts.topLeft());
    return position;
};

ActionManager.prototype._idBlocks = function(block, returnIds) {
    var ids = [];
    this.traverse(block, iterBlock => {
        iterBlock.isDraggable = true;
        iterBlock.isTemplate = false;
        iterBlock.id = this.newId();
        ids.push(iterBlock.id);
    });
    return returnIds ? ids : block;
};

ActionManager.prototype._getScriptsFor = function(blockId) {
    var editor = this._getCustomBlockEditor(blockId),
        ownerId,
        owner;

    if (!editor) {
        ownerId = this._blockToOwnerId[blockId];
        owner = this._owners[ownerId];
        return owner.scripts;
    }
    return editor.body.contents;
};

ActionManager.prototype.registerBlocks = function(firstBlock, owner) {
    var block = firstBlock,
        target,
        prevBlock;

    this.traverse(block, block => {
        this._registerBlockState(block);
        this._blockToOwnerId[block.id] = owner.id;
    });
    return firstBlock;
};

ActionManager.prototype.onReplaceBlock = function(block, newBlock) {
    var ownerId,
        position;

    block = this.deserializeBlock(block);
    ownerId = this._blockToOwnerId[block.id];

    position = this._positionOf[block.id];
    this.onRemoveBlock(block.id, true);
    return this.onAddBlock(newBlock, ownerId, position.x, position.y);
};

ActionManager.prototype.onAddBlock = function(block, ownerId, x, y) {
    var block,
        ide = this.ide(),
        owner = this._owners[ownerId],
        world = ide.parentThatIsA(WorldMorph),
        hand = world.hand,
        position = new Point(x, y),
        firstBlock;


    firstBlock = this.deserializeBlock(block);

    if (firstBlock.snapSound) {
        firstBlock.snapSound.play();
    }

    if (!this._customBlocks[ownerId]) {  // not a custom block
        position = this.getAdjustedPosition(position, owner.scripts);

        firstBlock.setPosition(position);
        owner.scripts.add(firstBlock);
        owner.scripts.changed();
        firstBlock.changed();
        owner.scripts.adjustBounds();
    } else {
        var def = this._customBlocks[ownerId],  // ownerId?!?!?
            editor = this._getCustomBlockEditor(ownerId),  // ownerId?!?!?
            scripts = editor.body.contents;

        position = this.getAdjustedPosition(position, scripts);
        firstBlock.setPosition(position);
        scripts.add(firstBlock);
        editor.updateDefinition();
    }
    if (firstBlock.fixChildrensBlockColor) {
        firstBlock.fixChildrensBlockColor(true);
    }

    // register generic hat blocks
    if (firstBlock.selector === 'receiveCondition') {
        stage = ide.stage;
        if (stage) {
            stage.enableCustomHatBlocks = true;
            stage.threads.pauseCustomHatBlocks = false;
            ide.controlBar.stopButton.refresh();
        }
    }

    this.registerBlocks(firstBlock, owner);
    return firstBlock;
};

ActionManager.prototype.world = function() {
    var ownerId = Object.keys(this._owners)[0],
        owner = this._owners[ownerId];

    return owner ? owner.parentThatIsA(WorldMorph) : null;
};

ActionManager.prototype._getCustomBlockEditor = function(blockId) {
    // Check for the block editor in the world children for this definition
    var children = this.world() ? this.world().children : [],
        owner = this._customBlockOwner[blockId],
        blockDef = this._customBlocks[blockId],
        editor = detect(children, function(child) {
            return child instanceof BlockEditorMorph && child.definition.id === blockId;
        });

    if (!editor && blockDef) {  // Create new editor dialog
        editor = new BlockEditorMorph(blockDef, owner);
        editor.popUp();  // need to guarantee the correct pos
        editor.setInitialDimensions();
        editor.cancel();
    }

    return editor;
};

ActionManager.prototype.getBlockFromId = function(id) {
    var ids = id.split('/'),
        blockId = ids.shift(),
        block = this._blocks[blockId],
        editor = block.parentThatIsA(BlockEditorMorph),
        customBlockId;

    // If the block is part of a custom block def, refresh it
    if (editor) {
        var customBlockId = editor.definition.id,
            found = false,
            current,
            next;

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

    for (var i = 0; i < ids.length; i++) {
        if (ids[i]) {
            block = block.inputs()[ids[i]];
        }
    }
    return block;
};

ActionManager.prototype.onMoveBlock = function(id, rawTarget) {
    // Convert the pId, connId back to the target...
    var block = this.deserializeBlock(id),
        isNewBlock = !this._blocks[block.id],
        target = copy(rawTarget),
        scripts;

    this._targetOf[id] = rawTarget;

    if (block instanceof CommandBlockMorph) {
        // Check if connecting to the beginning of a custom block definition
        if (this._customBlocks[target.element]) {
            target.element = this._getCustomBlockEditor(target.element)
                .body.contents  // get ScriptsMorph of BlockEditorMorph
                .children.find(function(child) {
                    return child instanceof PrototypeHatBlockMorph
                });
        } else {  // basic connection for sprite/stage/etc
            target.element = this.getBlockFromId(target.element);
        }
        scripts = target.element.parentThatIsA(ScriptsMorph);
    } else if (block instanceof ReporterBlockMorph || block instanceof CommentMorph) {
        target = this.getBlockFromId(target);
        scripts = target.parentThatIsA(ScriptsMorph);

        // Disconnect the given block
        this.disconnectBlock(block, scripts);
    } else {
        logger.error('Unsupported "onMoveBlock":', block);
    }

    if (isNewBlock) {
        scripts.add(block);
    } else {
        if (block.parent && block.parent.reactToGrabOf) {
            block.parent.reactToGrabOf(block);
        }
    }

    block.snap(target);
    scripts.drawNew();

    if (isNewBlock) {
        this._targetOf[block.id] = rawTarget;
        this.registerBlocks(block, scripts.owner);
    }

    if (target instanceof ReporterBlockMorph) {
        delete this._targetOf[target.id];
        this._positionOf[target.id] = this.getStandardPosition(scripts, target.position());
    }

    this.updateCommentsPositions(block);
    this._updateBlockDefinitions(block);
    return block;
};

ActionManager.prototype.onRemoveBlocks = function(ids) {
    ids.forEach(id => this.onRemoveBlock(id, true));
};

ActionManager.prototype.onRemoveBlock = function(id, userDestroy) {
    var block = this.getBlockFromId(id),
        method = userDestroy && block.userDestroy ? 'userDestroy' : 'destroy',
        scripts = block.parentThatIsA(ScriptsMorph),
        parent = block.parent;

    if (block) {
        // Check the parent and revert to default input
        if (block.prepareToBeGrabbed) {
            block.prepareToBeGrabbed(this.world().hand);
        }

        // Remove the block
        block[method]();
        delete this._blocks[id];
        delete this._positionOf[id];
        delete this._blockToOwnerId[id];
        delete this._targetOf[id];

        this._updateBlockDefinitions(block);

        // Update parent block's UI
        if (parent) {
            if (parent.reactToGrabOf) {
                parent.reactToGrabOf(block);
            }
            if (parent.fixLayout) parent.fixLayout();
            parent.changed();

            if (scripts) {
                scripts.drawNew();
                scripts.changed();
            }
        }
    }
};

ActionManager.prototype._updateBlockDefinitions = function(block) {
    var editor = block.parentThatIsA(BlockEditorMorph);
    if (editor) {
        editor.updateDefinition();
    }
};

ActionManager.prototype.onSetBlockPosition = function(id, position) {
    // Disconnect from previous...
    var block = this.getBlockFromId(id),
        scripts = block.parentThatIsA(ScriptsMorph),
        oldParent = block.parent,
        inputIndex = oldParent && oldParent.inputs ? oldParent.inputs().indexOf(block) : -1;

    console.assert(block, 'Block "' + id + '" does not exist! Cannot set position');

    if (block && block.prepareToBeGrabbed) {
        block.prepareToBeGrabbed({world: this.ide().world()});
    }

    // Check if editing a custom block
    var editor = block.parentThatIsA(BlockEditorMorph);
    if (editor) {  // not a custom block
        scripts = editor.body.contents;
    }

    position = this.getAdjustedPosition(position, scripts);
    block.setPosition(position);
    scripts.add(block);

    if (!(oldParent instanceof ScriptsMorph)) {
        oldParent.fixLayout();
        oldParent.drawNew();
        oldParent.changed();

        scripts.drawNew();
        scripts.changed();
    }

    if (block.fixBlockColor) {  // not a comment
        block.fixBlockColor();
    }
    block.changed();

    this.updateCommentsPositions(block);

    // Save the block definition
    this._updateBlockDefinitions(block);
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

    return this.fieldValues[fieldId];
};

ActionManager.prototype.disconnectBlock = function(block, scripts) {
    var oldParent = block.parent,
        inputIndex;

    if (scripts) block.parent = scripts;

    scripts = scripts || block.parentThatIsA(ScriptsMorph);
    if (oldParent) {
        inputIndex = oldParent.inputs ? oldParent.inputs().indexOf(block) : -1;

        if (oldParent.revertToDefaultInput) oldParent.revertToDefaultInput(block);

        if (!(oldParent instanceof ScriptsMorph)) {
            if (oldParent.reactToGrabOf) {
                oldParent.reactToGrabOf(block);
            }
            if (oldParent.fixLayout) {
                oldParent.fixLayout();
            }
            oldParent.changed();

            // TODO: if it had a field value, set the value now
            if (scripts) {
                scripts.drawNew();
                scripts.changed();
            }
        }
    }

    if (block.fixBlockColor) {  // not a comment
        block.fixBlockColor();
    }
};

ActionManager.prototype.onBlockDisconnected = function(id, pId, conn) {
    var block = this.getBlockFromId(id),
        scripts = block.parentThatIsA(ScriptsMorph);

    scripts.add(block);
};

ActionManager.prototype.onAddListInput = function(id, count) {
    var block = this.getBlockFromId(id),
        scripts = block.parentThatIsA(ScriptsMorph);

    count = count || 1;
    for (var i = 0; i < count; i++) {
        block.addInput();
    }

    scripts.drawNew();
    scripts.changed();
    this._updateBlockDefinitions(block);
};

ActionManager.prototype.onRemoveListInput = function(id, count) {
    var block = this.getBlockFromId(id),
        scripts = block.parentThatIsA(ScriptsMorph);

    count = count || 1;
    for (var i = 0; i < count; i++) {
        block.removeInput();
    }

    block.changed()
    scripts.changed();
    this._updateBlockDefinitions(block);
};

ActionManager.prototype.onSetBlockSpec = function(id, spec) {
    var block = this.getBlockFromId(id);
    block.userSetSpec(spec);
    this._updateBlockDefinitions(block);
};

ActionManager.prototype.onSetField = function(fieldId, value) {
    var block = this.getBlockFromId(fieldId);

    console.assert(block instanceof InputSlotMorph,
        'Unexpected block type: ' + block.constructor);
    block.setContents(value);
    this._updateBlockDefinitions(block);
};

ActionManager.prototype.onSetColorField = function(fieldId, desc) {
    var block = this.getBlockFromId(fieldId),
        color = new Color(desc.r, desc.g, desc.b, desc.a);

    block.setColor(color);
    this.fieldValues[fieldId] = color;
    this._updateBlockDefinitions(block);
};

ActionManager.prototype.onSetCommentText = function(id, text) {
    var block = this.getBlockFromId(id);

    block.contents.text = text;
    block.contents.drawNew();
    block.contents.changed();
    block.layoutChanged();
    block.lastValue = text;

    this._updateBlockDefinitions(block);
};

ActionManager.prototype.onSetSelector = function(id, sel) {
    var block = this.getBlockFromId(id);
    block.setSelector(sel);
    block.changed();
    this._updateBlockDefinitions(block);
};

ActionManager.prototype.onAddVariable = function(name, ownerId) {
    // Get the sprite or the stage
    var owner,
        isGlobal = ownerId === true;

    if (!isGlobal) {
        owner = this._owners[ownerId];
    } else {
        owner = this._owners[Object.keys(this._owners)[0]];
    }

    owner.addVariable(name, isGlobal)
    if (!owner.showingVariableWatcher(name, isGlobal)) {
        owner.toggleVariableWatcher(name, isGlobal);
    }

    var ide = owner.parentThatIsA(IDE_Morph);
    ide.flushBlocksCache('variables'); // b/c of inheritance
    ide.refreshPalette();
};

ActionManager.prototype.onDeleteVariable = function(name, ownerId) {
    var isGlobal = ownerId === true,
        owner = isGlobal ? this._owners[Object.keys(this._owners)[0]] :
            this._owners[ownerId];

    owner.deleteVariable(name)
};

ActionManager.prototype.onRingify = function(blockId, ringId) {
    var block = this.getBlockFromId(blockId);

    if (block) {
        var ring = block.ringify();
        ring.id = ringId;
        this._blocks[ring.id] = ring;
    }
    this._updateBlockDefinitions(block);
};

ActionManager.prototype.onUnringify = function(id) {
    var block = this.getBlockFromId(id);
    if (block) {
        var ring = block.unringify();
        delete this._blocks[ring.id];
    }
    this._updateBlockDefinitions(block);
};

ActionManager.prototype.onToggleBoolean = function(id, fromValue) {
    var block = this.getBlockFromId(id),
        iter = 0,
        prev;

    if (typeof fromValue !== 'boolean') {
        fromValue = null;
    }

    while (prev !== fromValue) {
        prev = block.value;
        block.toggleValue();
    }
    if (isNil(block.value)) {
        return;
    }
    block.reactToSliderEdit();
    this._updateBlockDefinitions(block);
};

////////////////////////// Custom Blocks //////////////////////////
ActionManager.prototype.onAddCustomBlock = function(ownerId, serialized, isGlobal, creatorId) {
    var owner = this._owners[ownerId],
        ide = this.ide(),
        addedReporter = false,
        editor,
        def,
        body;

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

    return def;
};

ActionManager.prototype.onDeleteCustomBlocks = function(ids) {
    var myself = this,
        ownerId = this.ide().stage.id;

    return ids.map(function(id) {
        myself.onDeleteCustomBlock(id, ownerId);
    });
};

ActionManager.prototype.onDeleteCustomBlock = function(id, ownerId) {
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
            rcvr.customBlocks.splice(idx, 1);
        }
    }
    ide = rcvr.parentThatIsA(IDE_Morph);
    if (ide) {
        ide.flushPaletteCache();
        ide.refreshPalette();
    }
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

ActionManager.prototype.onUpdateBlockLabel = function(id, index, type, label) {
    var fragLabel = new BlockLabelFragment(label),
        fragment = this._getFragment(id, index),
        editor = fragment.parentThatIsA(BlockEditorMorph);

    fragLabel.type = type;
    fragment.updateBlockLabel(fragLabel);
    editor.updateDefinition();
};

ActionManager.prototype.onDeleteBlockLabel = function(id, index) {
    var fragment = this._getFragment(id, index),
        editor = fragment.parentThatIsA(BlockEditorMorph);

    fragment.fragment.isDeleted = true;
    fragment.updateBlockLabel(fragment.fragment);
    editor.updateDefinition();
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
};

////////////////////////// Sprites //////////////////////////
ActionManager.prototype.ide = function() {
    var ownerId = Object.keys(this._owners)[0];

    return this._owners[ownerId].parentThatIsA(IDE_Morph);
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
        sprite;

    sprites = this.serializer.loadSprites(serialized, ide);
    if (creatorId === this.id) {
        ide.selectSprite(sprites[sprites.length-1]);
    }
};

ActionManager.prototype.onRemoveSprites = function(ids) {
    ids.forEach(id => this.onRemoveSprite(id));
};

ActionManager.prototype.onRemoveSprite = function(spriteId) {
    var sprite = this._owners[spriteId];
    this.ide().removeSprite(sprite);
};

ActionManager.prototype.onRenameSprite = function(spriteId, name) {
    var sprite = this._owners[spriteId],
        ide = this.ide();

    sprite.setName(name);
    // If current sprite is spriteId, update the spriteBar namefield
    if (ide.currentSprite === sprite) {
        ide.spriteBar.nameField.setContents(name);
    }
};

ActionManager.prototype.onToggleDraggable = function(spriteId, draggable) {
    var sprite = this._owners[spriteId],
        ide = this.ide();

    sprite.isDraggable = draggable;
    if (ide.currentSprite === sprite) {
        ide.spriteBar.padlock.refresh();
    }
};

ActionManager.prototype._registerCostume = function(costume, sprite) {
    this._costumes[costume.id] = costume;
    this._costumeToOwner[costume.id] = sprite;
};

ActionManager.prototype.onAddCostume = function(savedCostume, ownerId, creatorId) {
    var ide = this.ide(),
        wardrobeMorph,
        sprite = this._owners[ownerId],
        myself = this;

    // Get the wardrobe morph...
    this._loadCostume(savedCostume, function(cos) {
        sprite.addCostume(cos);
        if (ide.spriteEditor instanceof WardrobeMorph) {
            ide.spriteEditor.updateList();
        }
        if (ide && ide.currentSprite === sprite) {
            ide.currentSprite.wearCostume(cos);
        }

        myself._registerCostume(cos, sprite);

        if (creatorId === myself.id) {
            ide.spriteBar.tabBar.tabTo('costumes');
        }
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
};

ActionManager.prototype.onRemoveCostume = function(id) {
    var costume = this._costumes[id],
        sprite = this._costumeToOwner[id],
        idx = sprite.costumes.asArray().indexOf(costume),
        ide = this.ide(),
        wardrobe;

    sprite.costumes.remove(idx + 1);

    // Check for the wardrobe
    if (ide.spriteEditor instanceof WardrobeMorph) {
        ide.spriteEditor.updateList();
    }

    if (sprite.costume === costume) {
        sprite.wearCostume(null);
    }

    delete this._costumes[id];
};

ActionManager.prototype.onRenameCostume = function(id, newName) {
    var costume = this._costumes[id],
        ide = this.ide();

    costume.name = newName;
    costume.version = Date.now();
    ide.hasChangedMedia = true;
    return costume;
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
};

ActionManager.prototype.onRemoveSound = function(id) {
    var owner = this._soundToOwner[id],
        ide = this.ide(),
        idx = owner.sounds.asArray().indexOf(this._sounds[id]);
        
    owner.sounds.remove(idx);

    if (ide.spriteEditor instanceof JukeboxMorph) {
        ide.spriteEditor.updateList();
    }

    delete this._sounds[id];
    delete this._soundToOwner[id];
};

ActionManager.prototype.onSetStageSize = function(width, height) {
    this.ide().setStageExtent(new Point(width, height));
};

ActionManager.prototype.onSetRotationStyle = function(id, rotationStyle) {
    var sprite = this._owners[id];

    sprite.rotationStyle = rotationStyle;
    sprite.changed();
    sprite.drawNew();
    sprite.changed();

    this.ide().rotationStyleButtons.forEach(function (each) {
        each.refresh();
    });
};
//////////////////// Import ////////////////////
ActionManager.prototype.onImportSprites = function(xmlString) {
    return this.ide().openSpritesString(xmlString);
};

ActionManager.prototype.onImportBlocks = function(aString, lbl) {
    return this.ide().openBlocksString(aString, lbl, true);
};

//////////////////// Loading Projects ////////////////////
ActionManager.prototype.loadProject = function(ide, lastSeen) {
    // Clear old info
    this.initializeRecords();

    // Load the owners
    ide.sprites.asArray().concat(ide.stage).forEach(sprite => this.loadOwner(sprite));

    //  - Traverse all blocks in custom block definitions

    // Update the id counter
    this.lastSeen = lastSeen || 0;
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
    } else if (block instanceof CommentMorph) {
        return block.block.id;
    }

    return null;
};

ActionManager.prototype._registerBlockState = function(block) {
    var scripts,
        standardPosition,
        fieldId,
        contents,
        value,
        target;

    if (!(block instanceof PrototypeHatBlockMorph || block.isPrototype)) {
        block.id = block.id || this.newId();
        this._blocks[block.id] = block;

        // Record the block's initial state...
        target = this._getCurrentTarget(block);
        scripts = block.parentThatIsA(ScriptsMorph);

        if (target) {
            this._targetOf[block.id] = target;
        } else if (scripts) {
            standardPosition = this.getStandardPosition(scripts, block.position());
            this._positionOf[block.id] = standardPosition;
        }

        // Record the field values if it has any
        if (block.inputs) {
            block.inputs().forEach(input => {
                contents = input.contents && input.contents();
                if (contents) {
                    value = contents.value || contents;
                    if (!(input instanceof BlockMorph) && value !== undefined) {
                        fieldId = this.getId(input);
                        this.fieldValues[fieldId] = value;
                    }

                    if (input instanceof ColorSlotMorph) {
                        fieldId = this.getId(input);
                        this.fieldValues[fieldId] = input.color;
                    }
                }
            });
        }
    }
};

ActionManager.prototype.loadOwner = function(owner) {
    this.registerOwner(owner, owner.id);

    // Load the blocks from scripts
    owner.scripts.children.forEach(topBlock => {  // id the blocks
        this.traverse(topBlock, block => {
            block.id = block.id || this.newId();
            this._blocks[block.id] = block;
        });
    });
    owner.scripts.children.forEach(block => this.registerBlocks(block, owner));

    // Load the blocks from custom block definitions
    var customBlocks = owner.customBlocks,
        editor,
        scripts;

    if (owner.globalBlocks) {
        customBlocks = customBlocks.concat(owner.globalBlocks);
    }

    this.loadCustomBlocks(customBlocks, owner);

    // Load the costumes
    owner.costumes.asArray().forEach(costume => {
        this._costumes[costume.id] = costume;
        this._costumeToOwner[costume.id] = owner;
    });

    // Load the sounds
    owner.sounds.asArray().forEach(sound => {
        this._sounds[sound.id] = sound;
        this._soundToOwner[sound.id] = owner;
    });
};

ActionManager.prototype.loadCustomBlocks = function(blocks, owner) {
    var editor,
        scripts;

    owner = owner || this.ide().stage;
    blocks.forEach(def => {
        def.id = def.id || this.newId();
        this._customBlocks[def.id] = def;
        this._customBlockOwner[def.id] = owner;
        editor = this._getCustomBlockEditor(def.id);
        scripts = editor.body.contents;
        scripts.children.forEach(block => this.registerBlocks(block, owner));
        editor.updateDefinition();
    });
};

ActionManager.prototype.traverse = function(block, fn) {
    var current = [block],
        next,
        inputs,
        i,j;

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
        }
        current = next;
    }
};

ActionManager.prototype.getBlockInputs = function(block) {
    var allInputs = [],
        inputs;

    if (block.inputs) {  // Add nested blocks
        inputs = block.inputs();
        for (var j = inputs.length; j--;) {
            if (inputs[j] instanceof ReporterBlockMorph) {
                allInputs.push(inputs[j]);
            } else if (inputs[j] instanceof MultiArgMorph) {
                allInputs = allInputs.concat(this.getBlockInputs(inputs[j]));

            } else if (inputs[j].nestedBlock && inputs[j].nestedBlock()) {

                allInputs.push(inputs[j].nestedBlock());
            }
        }
    }
    return allInputs;
};

/* * * * * * * * * * * * On Remote Events * * * * * * * * * * * */
ActionManager.prototype.onMessage = function(msg) {
    var method = this._getMethodFor(msg.type),
        accepted = true;

    if (this.isLeader) {
        // Verify that the lastSeen value is the same as the current
        accepted = this.lastSeen === (msg.id - 1);
        if (accepted) {
            this.acceptEvent(msg);
        }
    } else {
        this._applyEvent(msg);
    }
};

SnapActions = new ActionManager();
