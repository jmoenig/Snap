var logger = {
    log: console.log.bind(console),
    debug: console.debug.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console)
};

// If not the leader, send operations to the leader for approval
function SimpleCollaborator() {
    this.lastSeen = 0;
    this.idCount = 0;

    this.id = null;
    this.rank = null;
    this.isLeader = false;
    this.initializeRecords();
    this.initialize();
};

SimpleCollaborator.prototype.initializeRecords = function() {
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
    this._blockToOwnerId = {};

    this._blockToTarget = {};
};

SimpleCollaborator.prototype.initialize = function() {
    var url = 'ws://' + window.location.host,
        ws = new WebSocket(url),
        self = this;

    ws.onopen = function() {
        logger.debug('websocket connected!');
    };

    ws.onclose = function() {
        self.isLeader = false;
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
    this.serializer = new SnapSerializer();
};

SimpleCollaborator.prototype.acceptEvent = function(msg) {
    msg.id = msg.id || this.lastSeen + 1;
    this.send(msg);
    this._applyEvent(msg);
};

SimpleCollaborator.prototype._applyEvent = function(msg) {
    var method = this._getMethodFor(msg.type);

    logger.debug('received event:', msg);
    this[method].apply(this, msg.args);
    this.lastSeen = msg.id;
    this.idCount = 0;
    SnapUndo.record(msg);
};

SimpleCollaborator.prototype.send = function(json) {
    json.id = json.id || this.lastSeen + 1;
    this._ws.send(JSON.stringify(json));
};

SimpleCollaborator.prototype.newId = function() {
    // This is the same across devices since it uses the currently last seen value
    var id = 'item_' + this.lastSeen;

    if (this.idCount !== 0) {
        id += '_' + this.idCount;
    }
    this.idCount++;

    return id;
};

SimpleCollaborator.prototype.getId = function (block) {
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
    return id;
};

SimpleCollaborator.prototype.serializeBlock = function(block, force) {
    if (block.id && !force) {
        return block.id;
    }

    if (block instanceof CommentMorph) {
        return block.toXML(this.serializer);
    }

    return block.toScriptXML(this.serializer);
};

SimpleCollaborator.prototype.deserializeBlock = function(ser) {
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

SimpleCollaborator.prototype.registerOwner = function(owner, id) {
    owner.id = id || this.newId();
    this._owners[owner.id] = owner;
};

/* * * * * * * * * * * * Preprocess args (before action is accepted) * * * * * * * * * * * */
// These are decorators which take the args from the public API and return the args for
// the event to be sent to the other collaborators (and received by the onEventName methods)
SimpleCollaborator.prototype.getStandardPosition = function(scripts, position) {
    var scale = SyntaxElementMorph.prototype.scale;
    position = position.subtract(scripts.topLeft()).divideBy(scale);
    return position;
};

SimpleCollaborator.prototype._idBlocks = function(block) {
    var iterBlock = block;
    while (iterBlock) {
        iterBlock.isDraggable = true;
        iterBlock.isTemplate = false;
        iterBlock.id = this.newId();

        iterBlock = iterBlock.nextBlock ? iterBlock.nextBlock() : null;
    }

    return block;
};

SimpleCollaborator.prototype._addBlock = function(block, scripts, position, ownerId) {
    var stdPosition = this.getStandardPosition(scripts, position),
        serialized;

    this._idBlocks(block);

    serialized = this.serializeBlock(block, true);
    return [
        serialized,
        ownerId || scripts.owner.id,
        stdPosition.x,
        stdPosition.y,
        false,
        block.id
    ];
};

SimpleCollaborator.prototype._removeBlock = function(id, userDestroy) {
    var block = this._blocks[id],
        serialized = this.serializeBlock(block, true),
        position = this._positionOf[block.id],
        ownerId = this._blockToOwnerId[id];
        
    return [
        id,
        userDestroy,
        position.y,
        position.x,
        ownerId,
        serialized
    ];
};

SimpleCollaborator.prototype._setBlockPosition = function(id, position) {
    var block = this.getBlockFromId(id),
        scripts = block.parentThatIsA(ScriptsMorph),
        standardPosition = this.getStandardPosition(scripts, position),
        oldPosition = this._positionOf[id];

    return [id, standardPosition.x, standardPosition.y, oldPosition.x, oldPosition.y];
};

SimpleCollaborator.prototype._setBlocksPositions = function(ids, positions) {
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
SimpleCollaborator.prototype._addCustomBlock = function(definition, owner, focus) {
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

    if (focus) {
        args.push(this.id);
    }
    return args;
};

SimpleCollaborator.prototype._deleteCustomBlock = function(definition) {
    var owner = this._customBlockOwner[definition.id],
        serialized = this.serializer.serialize(definition);

    return [definition.id, owner.id, serialized, definition.isGlobal];
};

SimpleCollaborator.prototype._deleteCustomBlocks = function(blocks) {
    var serialized = [],
        ids = [];

    for (var i = blocks.length; i--;) {
        serialized.push(this.serializer.serialize(blocks[i]));
        ids.push(blocks[i].id);
    }

    return [ids, serialized];
};

SimpleCollaborator.prototype._setStageSize = function(width, height) {
    // Add the old stage size for undo support
    return [
        width,
        height,
        StageMorph.prototype.dimensions.y,
        StageMorph.prototype.dimensions.x
    ];
};

SimpleCollaborator.prototype._serializeMoveTarget = function(block, target) {
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
        target = SnapCollaborator.getId(target);
    } else {  // CommentMorph
        target = target.id;
    }
    return target;
};

SimpleCollaborator.prototype._moveBlock = function(block, target) {
    var isNewBlock = !block.id,
        id = block.id || this.newId(),
        oldTarget = this._blockToTarget[id],
        position = this._positionOf[id],
        serialized,
        args;

    // Serialize the target
    target = this._serializeMoveTarget(block, target);
    if (isNewBlock) {
        this._idBlocks(block);
    }

    serialized = this.serializeBlock(block, isNewBlock);

    if (isNewBlock) {
        block.destroy();
    }

    // If there is no target, get the current position
    args = [serialized, target];
    if (isNewBlock) {
        // provide info for easy undo
        args.push(false, id);
    } else if (oldTarget) {
        args.push(oldTarget);
    } else if (position) {
        args.push(position.x, position.y);
    } else {
        logger.warn('Could not get position or old target for ' + id);
    }

    return args;
};

SimpleCollaborator.prototype._setField = function(field, value) {
    var fieldId = this.getId(field),
        oldValue = field.contents().text;

    return [
        fieldId,
        value,
        oldValue
    ];
};

SimpleCollaborator.prototype._toggleBoolean = function(field, value) {
    var prevValue = false,
        fieldId = this.getId(field);

    // order is true -> false -> null -> true ...
    // get the previous
    if (value === true) {
        prevValue = null;
    } else if (value === false) {
        prevValue = true;
    }

    return [fieldId, value, prevValue];
};

SimpleCollaborator.prototype._setCommentText = function(comment, value) {
    var oldValue = comment.lastValue;

    return [comment.id, value, oldValue];
};

SimpleCollaborator.prototype._unringify = function(block) {
    var ring = this.getOutermostRing(block),
        parent = this.getParentWithId(block);

    // Get the last block before the ring
    while (parent !== ring) {
        block = parent;
        parent = this.getParentWithId(block);
    }

    return [block.id, ring.id];
};

SimpleCollaborator.prototype.getParentWithId = function(block) {
    while (block.parent && !block.parent.id) {
        block = block.parent;
    }
    return block.parent;
};

SimpleCollaborator.prototype.getOutermostRing = function(block, immediate) {
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

SimpleCollaborator.prototype._ringify = function(block) {
    // If contained in a ringmorph, get the outermost ring
    var ringId = this.newId();

    block = this.getOutermostRing(block, true);

    return [block.id, ringId];
};

SimpleCollaborator.prototype._setSelector = function(block, selector) {
    var blockId = this.getId(block),
        oldSelector = block.selector;

    return [blockId, selector, oldSelector];
};

SimpleCollaborator.prototype._setBlockSpec = function(block, spec) {
    var blockId = this.getId(block),
        oldSpec = block.blockSpec;

    return [blockId, spec, oldSpec];
};

SimpleCollaborator.prototype._toggleDraggable = function(owner, draggable) {
    return [owner.id, draggable];
};

SimpleCollaborator.prototype._setRotationStyle = function(owner, rotationStyle) {
    return [owner.id, rotationStyle, owner.rotationStyle];
};

SimpleCollaborator.prototype._addListInput =
SimpleCollaborator.prototype._removeListInput = function(block, count) {
    return [this.getId(block), count];
};

SimpleCollaborator.prototype._addSound = function(sound, owner, focus) {
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

SimpleCollaborator.prototype._removeSound = function(sound) {
    return [
        sound.id,
        sound.toXML(this.serializer).replace('~', ''),
        this._soundToOwner[sound.id].id
    ];
};

SimpleCollaborator.prototype._renameSound = function(sound, name) {
    return [sound.id, name, sound.name];
};

SimpleCollaborator.prototype._addCostume = function(costume, owner, focus) {
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

SimpleCollaborator.prototype._removeCostume = function(costume) {
    return [
        costume.id,
        costume.toXML(this.serializer).replace('~', ''),
        this._costumeToOwner[costume.id].id
    ];
};

SimpleCollaborator.prototype._renameCostume = function(costume, name) {
    return [costume.id, name, costume.name];
};

SimpleCollaborator.prototype._updateCostume = function(original, newCostume) {
    return [
        newCostume.id,
        newCostume.toXML(this.serializer).replace('~', ''),
        original.toXML(this.serializer).replace('~', '')
    ];
};
/* * * * * * * * * * * * Updating internal rep * * * * * * * * * * * */
SimpleCollaborator.prototype._onSetField = function(pId, connId, value) {
    console.assert(!this.blockChildren[pId] || !this.blockChildren[pId][connId],'Connection occupied!');

    if (!this.fieldValues[pId]) {
        this.fieldValues[pId] = {};
    }

    this.fieldValues[pId][connId] = value;

    this.onSetField(pId, connId, value);
};

SimpleCollaborator.prototype._onSetBlockPosition = function(id, x, y) {
    logger.log('<<< setting position of ', id, 'to', x, ',', y);

    // Check if this is causing a disconnect
    var parent = this.blockToParent[id];
    if (parent) {
        delete this.blockChildren[parent.id][parent.conn];
        //this.onBlockDisconnected(id, parent.id, parent.conn);
    }

    this.onSetBlockPosition(id, x, y);
};

// / / / / / / / / / / / Variables / / / / / / / / / / / //
SimpleCollaborator.prototype._onAddVariable = function(name, ownerId) {
    this.onAddVariable(name, ownerId);
};

SimpleCollaborator.prototype._onDeleteVariable = function(name, ownerId) {
    this.onDeleteVariable(name, ownerId);
};

/* * * * * * * * * * * * On UI Events * * * * * * * * * * * */
SimpleCollaborator.prototype.EVENTS = [
    'setStageSize',

    // Sprites
    'addSprite',
    'removeSprite',
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
    'setField'
];
SimpleCollaborator.prototype.EVENTS.forEach(function(method) {
    SimpleCollaborator.prototype[method] = function() {
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

        this.applyEvent(msg);
    };
});

SimpleCollaborator.prototype.applyEvent = function(event) {
    if (this.isLeader) {
        this.acceptEvent(event);
    } else {
        this.send(event);
    }
};

SimpleCollaborator.prototype._getMethodFor = function(action) {
    var method = '_on' + action.substring(0,1).toUpperCase() + action.substring(1);

    if (!this[method]) {
        method = method.substring(1);
    }

    return method;
};

/* * * * * * * * * * * * Updating Snap! * * * * * * * * * * * */
SimpleCollaborator.prototype.getAdjustedPosition = function(position, scripts) {
    var scale = SyntaxElementMorph.prototype.scale;
    position = position.multiplyBy(scale).add(scripts.topLeft());
    return position;
};

SimpleCollaborator.prototype.registerBlocks = function(firstBlock) {
    var block = firstBlock;

    while (block) {
        block.isDraggable = true;
        block.isTemplate = false;
        this._blocks[block.id] = block;

        // FIXME: This doesn't check the inputs()!
        block = block.nextBlock ? block.nextBlock() : null;
    }

    return firstBlock;
};

SimpleCollaborator.prototype.onAddBlock = function(block, ownerId, x, y) {
    var block,
        owner = this._owners[ownerId],
        world = this.ide().parentThatIsA(WorldMorph),
        hand = world.hand,
        position = new Point(x, y),
        firstBlock;


    firstBlock = this.deserializeBlock(block);
    this._positionOf[firstBlock.id] = position;
    this._blockToOwnerId[firstBlock.id] = ownerId;

    this.registerBlocks(firstBlock);

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
        var def = this._customBlocks[ownerId],
            editor = this._getCustomBlockEditor(ownerId),
            scripts = editor.body.contents;

        position = this.getAdjustedPosition(position, scripts);
        firstBlock.setPosition(position);
        scripts.add(firstBlock);
        editor.updateDefinition();
    }

    // Register generic hat blocks?
    // TODO
};

SimpleCollaborator.prototype.world = function() {
    var ownerId = Object.keys(this._owners)[0],
        owner = this._owners[ownerId];

    return owner ? owner.parentThatIsA(WorldMorph) : null;
};

SimpleCollaborator.prototype._getCustomBlockEditor = function(blockId) {
    // Check for the block editor in the world children for this definition
    var children = this.world() ? this.world().children : [],
        owner = this._customBlockOwner[blockId],
        editor = detect(children, function(child) {
        return child instanceof BlockEditorMorph && child.definition.id === blockId;
    });

    if (!editor) {  // Create new editor dialog
        editor = new BlockEditorMorph(this._customBlocks[blockId], owner);
        editor.popUp();  // need to guarantee the correct pos
        editor.setInitialDimensions();
        editor.cancel();
    }

    return editor;
};

SimpleCollaborator.prototype.getBlockFromId = function(id) {
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

SimpleCollaborator.prototype.onMoveBlock = function(id, rawTarget) {
    // Convert the pId, connId back to the target...
    var block = this.deserializeBlock(id),
        isNewBlock = !this._blocks[block.id],
        target = copy(rawTarget),
        scripts;

    this._blockToTarget[id] = rawTarget;

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
        this.registerBlocks(block);
        scripts.add(block);
    } else {
        if (block.parent && block.parent.reactToGrabOf) {
            block.parent.reactToGrabOf(block);
        }
    }

    block.snap(target);
    this.updateCommentsPositions(block);
    this._updateBlockDefinitions(block);
};

SimpleCollaborator.prototype.onRemoveBlock = function(id, userDestroy) {
    var block = this.getBlockFromId(id),
        method = userDestroy ? 'userDestroy' : 'destroy',
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
        delete this._blockToTarget[id];

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

SimpleCollaborator.prototype._updateBlockDefinitions = function(block) {
    var editor = block.parentThatIsA(BlockEditorMorph);
    if (editor) {
        editor.updateDefinition();
    }
};

SimpleCollaborator.prototype.onSetBlocksPositions = function(ids, positions) {
    for (var i = ids.length; i--;) {
        this.onSetBlockPosition(ids[i], positions[i].x, positions[i].y);
    }
};

SimpleCollaborator.prototype.onSetBlockPosition = function(id, x, y) {
    // Disconnect from previous...
    var block = this.getBlockFromId(id),
        scripts = block.parentThatIsA(ScriptsMorph),
        oldParent = block.parent,
        position = new Point(x, y);

    console.assert(block, 'Block "' + id + '" does not exist! Cannot set position');

    this._positionOf[id] = position;
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

SimpleCollaborator.prototype.updateCommentsPositions = function(block) {
    if (block.topBlock) {  // Update comment positions
        var topBlock = block.topBlock();
        topBlock.allComments().forEach(function (comment) {
            comment.align(topBlock);
        });
    }
};

SimpleCollaborator.prototype.disconnectBlock = function(block, scripts) {
    var oldParent = block.parent;

    if (scripts) block.parent = scripts;

    scripts = scripts || block.parentThatIsA(ScriptsMorph);
    if (oldParent) {
        if (oldParent.revertToDefaultInput) oldParent.revertToDefaultInput(block);

        if (!(oldParent instanceof ScriptsMorph)) {
            if (oldParent.reactToGrabOf) {
                oldParent.reactToGrabOf(block);
            }
            if (oldParent.fixLayout) {
                oldParent.fixLayout();
            }
            oldParent.changed();

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

SimpleCollaborator.prototype.onBlockDisconnected = function(id, pId, conn) {
    var block = this.getBlockFromId(id),
        scripts = block.parentThatIsA(ScriptsMorph);

    scripts.add(block);
};

SimpleCollaborator.prototype.onAddListInput = function(id, count) {
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

SimpleCollaborator.prototype.onRemoveListInput = function(id, count) {
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

SimpleCollaborator.prototype.onSetBlockSpec = function(id, spec) {
    var block = this.getBlockFromId(id);
    block.userSetSpec(spec);
    this._updateBlockDefinitions(block);
};

SimpleCollaborator.prototype.onSetField = function(fieldId, value) {
    var block = this.getBlockFromId(fieldId);

    console.assert(block instanceof InputSlotMorph,
        'Unexpected block type: ' + block.constructor);
    block.setContents(value);
    this._updateBlockDefinitions(block);
};

SimpleCollaborator.prototype.onSetCommentText = function(id, text) {
    var block = this.getBlockFromId(id);

    block.contents.text = text;
    block.contents.drawNew();
    block.contents.changed();
    block.layoutChanged();
    block.lastValue = text;

    this._updateBlockDefinitions(block);
};

SimpleCollaborator.prototype.onSetSelector = function(id, sel) {
    var block = this.getBlockFromId(id);
    block.setSelector(sel);
    block.changed();
    this._updateBlockDefinitions(block);
};

SimpleCollaborator.prototype.onAddVariable = function(name, ownerId) {
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

SimpleCollaborator.prototype.onDeleteVariable = function(name, ownerId) {
    var isGlobal = ownerId === true,
        owner = isGlobal ? this._owners[Object.keys(this._owners)[0]] :
            this._owners[ownerId];

    owner.deleteVariable(name)
};

SimpleCollaborator.prototype.onRingify = function(blockId, ringId) {
    var block = this.getBlockFromId(blockId);

    if (block) {
        var ring = block.ringify();
        ring.id = ringId;
        this._blocks[ring.id] = ring;
    }
    this._updateBlockDefinitions(block);
};

SimpleCollaborator.prototype.onUnringify = function(id) {
    var block = this.getBlockFromId(id);
    if (block) {
        var ring = block.unringify();
        delete this._blocks[ring.id];
    }
    this._updateBlockDefinitions(block);
};

SimpleCollaborator.prototype.onToggleBoolean = function(id, fromValue) {
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
SimpleCollaborator.prototype.onAddCustomBlock = function(ownerId, serialized, isGlobal, creatorId) {
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

    // Create the CustomBlockDefinition
    //if (def.type === 'reporter' || def.type === 'predicate') {
        //var reporter = SpriteMorph.prototype.blockForSelector('doReport');
        //reporter.id = this.newId();
        //body = Process.prototype.reify.call(
            //null,
            //reporter,
            //new List(),
            //true // ignore empty slots for custom block reification
        //);
        //body.outerContext = null;
        //def.body = body;
        //addedReporter = true;
    //}

    // Update the palette
    owner.paletteCache = {};
    ide.refreshPalette();

    //if (addedReporter) {  // Add reporter to the _blocks dictionary
        //var scripts,
            //hat;

        //// Update the reporter to the one in the editor
        //editor = new BlockEditorMorph(def, owner);
        //scripts = editor.body.contents;
        //hat = scripts.children[0];
        //reporter = hat.nextBlock();

        //this._blocks[reporter.id] = reporter;
    //}

    if (creatorId === this.id) {
        if (!editor) {
            editor = new BlockEditorMorph(def, owner);
        }
        editor.popUp();
    }
};

SimpleCollaborator.prototype.onDeleteCustomBlocks = function(ids) {
    var collab = this,
        ownerId = this.ide().stage.id;

    return ids.map(function(id) {
        collab.onDeleteCustomBlock(id, ownerId);
    });
};

SimpleCollaborator.prototype.onDeleteCustomBlock = function(id, ownerId) {
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

SimpleCollaborator.prototype._getCustomCmdBlock = function(id) {
    var editor = this._getCustomBlockEditor(id),
        scripts = editor.body.contents,
        hat = detect(scripts.children,
            function(block) {return block instanceof PrototypeHatBlockMorph;}),
        customBlock = hat.inputs()[0];

    console.assert(hat.inputs().length === 1);

    return customBlock;
};

SimpleCollaborator.prototype._getFragment = function(id, index) {
    var customBlock = this._getCustomCmdBlock(id),
        frag = customBlock.children[index];

    return frag;
};

SimpleCollaborator.prototype.onUpdateBlockLabel = function(id, index, type, label) {
    var fragLabel = new BlockLabelFragment(label),
        fragment = this._getFragment(id, index),
        editor = fragment.parentThatIsA(BlockEditorMorph);

    fragLabel.type = type;
    fragment.updateBlockLabel(fragLabel);
    editor.updateDefinition();
};

SimpleCollaborator.prototype.onDeleteBlockLabel = function(id, index) {
    var fragment = this._getFragment(id, index),
        editor = fragment.parentThatIsA(BlockEditorMorph);

    fragment.fragment.isDeleted = true;
    fragment.updateBlockLabel(fragment.fragment);
    editor.updateDefinition();
};

SimpleCollaborator.prototype.onSetCustomBlockType = function(id, cat, type) {
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
SimpleCollaborator.prototype.ide = function() {
    var ownerId = Object.keys(this._owners)[0];

    return this._owners[ownerId].parentThatIsA(IDE_Morph);
};

SimpleCollaborator.prototype._loadCostume = function(savedCostume, callback) {
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

SimpleCollaborator.prototype.onAddSprite = function(opts, creatorId) {
    var ide = this.ide(),
        myself = this,
        sprite = new SpriteMorph(ide.globalVariables);

    // TODO: The sprite should be created in the _addSprite method (or before)
    // Then simply added here (using appearIn probably)

    sprite.name = opts.name;
    sprite.setCenter(ide.stage.center());
    ide.stage.add(sprite);
    ide.sprites.add(sprite);
    ide.corral.addSprite(sprite);

    // randomize sprite properties
    if (!opts.costume) {
        sprite.setHue(opts.hue);
        sprite.setBrightness(opts.brightness);
        sprite.turn(opts.dir);
    } else {
        this._loadCostume(opts.costume, function(costume) {
            costume.loaded = true;
            sprite.addCostume(costume);
            sprite.wearCostume(costume);
            ide.hasChangedMedia = true;
            myself._registerCostume(costume, sprite);
        });
    }

    if (opts.x !== undefined && opts.y !== undefined) {
        sprite.setXPosition(opts.x);
        sprite.setYPosition(opts.y);
    }

    if (creatorId === this.id) {
        ide.selectSprite(sprite);
    }

    this.registerOwner(sprite);
};

SimpleCollaborator.prototype.onRemoveSprite = function(spriteId) {
    var sprite = this._owners[spriteId];
    this.ide().removeSprite(sprite);
};

SimpleCollaborator.prototype.onDuplicateSprite = function(spriteId, x, y, creatorId) {
    var sprite = this._owners[spriteId],
        ide = this.ide(),
        dup = ide.duplicateSprite(sprite);

    dup.setPosition(new Point(x, y));
    dup.keepWithin(ide.stage);

    if (creatorId === this.id) {
        ide.selectSprite(dup);
    }
    this.registerOwner(dup);
};

SimpleCollaborator.prototype.onRenameSprite = function(spriteId, name) {
    var sprite = this._owners[spriteId],
        ide = this.ide();

    sprite.setName(name);
    // If current sprite is spriteId, update the spriteBar namefield
    if (ide.currentSprite === sprite) {
        ide.spriteBar.nameField.setContents(name);
    }
};

SimpleCollaborator.prototype.onToggleDraggable = function(spriteId, draggable) {
    var sprite = this._owners[spriteId],
        ide = this.ide();

    sprite.isDraggable = draggable;
    if (ide.currentSprite === sprite) {
        ide.spriteBar.padlock.refresh();
    }
};

SimpleCollaborator.prototype._registerCostume = function(costume, sprite) {
    this._costumes[costume.id] = costume;
    this._costumeToOwner[costume.id] = sprite;
};

SimpleCollaborator.prototype.onAddCostume = function(savedCostume, ownerId, creatorId) {
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

SimpleCollaborator.prototype.onUpdateCostume = function(id, savedCostume) {
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

SimpleCollaborator.prototype.onRemoveCostume = function(id) {
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

SimpleCollaborator.prototype.onRenameCostume = function(id, newName) {
    var costume = this._costumes[id],
        ide = this.ide();

    costume.name = newName;
    costume.version = Date.now();
    ide.hasChangedMedia = true;
    return costume;
};

SimpleCollaborator.prototype.onAddSound = function(serialized, ownerId, creatorId) {
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

SimpleCollaborator.prototype.onRenameSound = function(id, name) {
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

SimpleCollaborator.prototype.onRemoveSound = function(id) {
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

SimpleCollaborator.prototype.onSetStageSize = function(width, height) {
    this.ide().setStageExtent(new Point(width, height));
};

SimpleCollaborator.prototype.onSetRotationStyle = function(id, rotationStyle) {
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
SimpleCollaborator.prototype.onImportSprites = function(xmlString) {
    return this.ide().openSpritesString(xmlString);
};

SimpleCollaborator.prototype.onImportBlocks = function(aString, lbl) {
    return this.ide().openBlocksString(aString, lbl, true);
};

//////////////////// Loading Projects ////////////////////
SimpleCollaborator.prototype.loadProject = function(ide, lastSeen) {
    // Clear old info
    this.initializeRecords();

    // Load the owners
    ide.sprites.asArray().concat(ide.stage).forEach(sprite => this.loadOwner(sprite));

    //  - Traverse all blocks in custom block definitions

    // Update the id counter
    this.lastSeen = lastSeen || 0;
};

SimpleCollaborator.prototype._registerBlock = function(block) {
    if (!(block instanceof PrototypeHatBlockMorph || block.isPrototype)) {
        console.assert(block.id, `Cannot register block without id: ${block.id} (${block.blockSpec})`);
        this._blocks[block.id] = block;
    }
};

SimpleCollaborator.prototype.loadOwner = function(owner) {
    var collab = this;

    this.registerOwner(owner, owner.id);

    // Load the blocks from scripts
    owner.scripts.children.forEach(block => this.traverse(block, this._registerBlock.bind(this)));

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

SimpleCollaborator.prototype.loadCustomBlocks = function(blocks, owner) {
    var editor,
        scripts;

    owner = owner || this.ide().stage;
    blocks.forEach(def => {
        this._customBlocks[def.id] = def;
        this._customBlockOwner[def.id] = owner;
        editor = this._getCustomBlockEditor(def.id);
        scripts = editor.body.contents;
        scripts.children.forEach(block => this.traverse(block, this._registerBlock.bind(this)));
    });
};

SimpleCollaborator.prototype.traverse = function(block, fn) {
    var current = [block],
        next;

    while (current.length) {
        next = [];
        for (var i = current.length; i--;) {
            block = current[i];
            fn(block);

            if (block.inputs) {  // Add nested blocks
                next = next.concat(block.inputs().filter(input => input instanceof ReporterBlockMorph));
            }

            if (block.nextBlock && block.nextBlock()) {  // add following blocks
                next.push(block.nextBlock());
            }
        }
        current = next;
    }
};

/* * * * * * * * * * * * On Remote Events * * * * * * * * * * * */
SimpleCollaborator.prototype.onMessage = function(msg) {
    var method = this._getMethodFor(msg.type),
        accepted = true;

    if (this.isLeader) {
        // Verify that the lastSeen value is the same as the current
        accepted = this.lastSeen === (msg.id - 1);
        if (accepted) {
            this.acceptEvent(msg);
        }
    } else {
        if (this[method]) {
            this._applyEvent(msg);
        }
    }
};

SnapCollaborator = new SimpleCollaborator();
