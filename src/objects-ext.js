/* global SpriteMorph, StageMorph, Color, MorphicPreferences, Morph,
   Point, ScrollFrameMorph, MenuMorph, SyntaxElementMorph, IDE_Morph,
   localize, BlockEditorMorph, BlockDialogMorph, TextMorph, PushButtonMorph,
   MessageFrame, BlockMorph, ToggleMorph, MessageCreatorMorph,
   VariableDialogMorph, contains, List, CommandBlockMorph,
   MessageType, isNil, RingMorph, SnapActions, RoomEditorMorph, NetsBloxMorph,
   SnapUndo, newCanvas, ReplayControls, WatcherMorph */

// Add network, custom categories
SpriteMorph.prototype.categories.splice(8, 0, 'network');
SpriteMorph.prototype.categories.splice(9, 0, 'custom');

SpriteMorph.prototype.blockColor.network = new Color(217, 77, 17);
SpriteMorph.prototype.blockColor.custom = new Color(120, 120, 120);

// Additional block definitions
// RPC's
SpriteMorph.prototype._initBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initBlocks = function () {
    SpriteMorph.prototype._initBlocks();  // super
    SpriteMorph.prototype.blocks.getJSFromRPC = {  // primitive JSON response
        type: 'reporter',
        category: 'network',
        spec: 'call %s with %s',
        defaults: ['CloudVariables'],
        deprecated: true  // deprecated blocks are not shown when searching for blocks
    };

    SpriteMorph.prototype.blocks.getJSFromRPCDropdown = {  // primitive JSON response
        type: 'reporter',
        category: 'network',
        spec: 'call %serviceNames / %rpcActions with %s',
        defaults: ['CloudVariables'],
        deprecated: true
    };

    SpriteMorph.prototype.blocks.getJSFromRPCStruct = {
        type: 'reporter',
        category: 'network',
        spec: 'call %serviceNames / %rpcMethod',
        defaults: ['CloudVariables']
    };

    SpriteMorph.prototype.blocks.doRunRPC = {
        type: 'command',
        category: 'network',
        spec: 'run %serviceNames / %rpcMethod',
        defaults: ['CloudVariables']
    };

    SpriteMorph.prototype.blocks.getCostumeFromRPC = {
        type: 'reporter',
        category: 'network',
        spec: 'costume from %serviceNames / %rpcActions with %s',
        defaults: ['CloudVariables', ''],
        deprecated: true
    };

    SpriteMorph.prototype.blocks.reportRPCError = {
        type: 'reporter',
        category: 'network',
        spec: 'error'
    };

    // Network Messages
    // request reply
    SpriteMorph.prototype.blocks.doSocketRequest = {
        type: 'reporter',
        category: 'network',
        spec: 'send msg %msgInput to %roles and wait'
    };

    SpriteMorph.prototype.blocks.doSocketResponse = {
        type: 'command',
        category: 'network',
        spec: 'send response %s'
    };

    SpriteMorph.prototype.blocks.doSocketMessage = {
        type: 'command',
        category: 'network',
        spec: 'send msg %msgInput to %roles'
    };

    SpriteMorph.prototype.blocks.receiveSocketMessage = {
        type: 'hat',
        category: 'network',
        spec: 'when I receive %msgOutput'
    };

    // Role Reporters
    SpriteMorph.prototype.blocks.getProjectId = {
        type: 'reporter',
        category: 'network',
        spec: 'role name'
    };

    SpriteMorph.prototype.blocks.getProjectIds = {
        type: 'reporter',
        category: 'network',
        spec: 'all role names'
    };

    // Geo
    SpriteMorph.prototype.blocks.reportLatitude = {
        type: 'reporter',
        category: 'sensing',
        spec: 'my latitude'
    };

    SpriteMorph.prototype.blocks.reportLongitude = {
        type: 'reporter',
        category: 'sensing',
        spec: 'my longitude'
    };

    // Stage info
    SpriteMorph.prototype.blocks.reportStageWidth = {
        type: 'reporter',
        category: 'sensing',
        spec: 'stage width'
    };

    SpriteMorph.prototype.blocks.reportStageHeight = {
        type: 'reporter',
        category: 'sensing',
        spec: 'stage height'
    };

    SpriteMorph.prototype.blocks.reportImageOfObject = {
        type: 'reporter',
        category: 'sensing',
        spec: 'image of %self',
    };

    SpriteMorph.prototype.blocks.reportUsername = {
        type: 'reporter',
        category: 'sensing',
        spec: 'username'
    };

    if (NetsBloxExtensions) {
        NetsBloxExtensions.initBlocks();
    }
};
SpriteMorph.prototype.initBlocks();

// SpriteMorph project/sead id(s)

SpriteMorph.prototype.getProjectId = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    return ide.projectName;
};

SpriteMorph.prototype.getProjectIds = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        roles = ide.room.getRoleNames();
    return new List(roles);
};

StageMorph.prototype.getProjectId =
    SpriteMorph.prototype.getProjectId;

StageMorph.prototype.getProjectIds =
    SpriteMorph.prototype.getProjectIds;

// SpriteMorph non-variable watchers

SpriteMorph.prototype.reportUsername = function () {
    var ide = this.parentThatIsA(IDE_Morph);
    return ide.cloud.username || '';
};

StageMorph.prototype.reportUsername =
    SpriteMorph.prototype.reportUsername;

SpriteMorph.prototype._blockForSelector = SpriteMorph.prototype.blockForSelector;  // super
SpriteMorph.prototype.blockForSelector = function(selector, setDefaults) {
    var block = this._blockForSelector(selector, setDefaults);
    if (selector === 'receiveSocketMessage') {  // this hat block is executable (it "unpacks" the msg)
        block.blockSequence = CommandBlockMorph.prototype.blockSequence;
    }
    return block;
};

// Palette
SpriteMorph.prototype.deletableMessageNames = function() {
    var stage = this.parentThatIsA(StageMorph);
    return stage.deletableMessageNames();
};

StageMorph.prototype.deletableMessageNames = function() {
    return this.messageTypes.names().filter(function(name) {
        return name !== 'message';
    });
};

SpriteMorph.prototype.deleteMessageType = function(name) {
    var ide = this.parentThatIsA(IDE_Morph),
        stage = ide.stage,
        cat = 'network';

    stage.messageTypes.deleteMsgType(name);

    // Refresh message palette if possible in case the user is already on the 'Room' tab
    try {
        ide.room.parentThatIsA(RoomEditorMorph).updateRoom();
        if (ide && ide.currentTab === 'room') {
            ide.spriteBar.tabBar.tabTo('room');
        }
    } catch(e) {
        //do nothing
    }

    ide.flushBlocksCache(cat); // b/c of inheritance
    ide.refreshPalette();
};

StageMorph.prototype.deleteMessageType =
    SpriteMorph.prototype.deleteMessageType;

// StageMorph Overrides
StageMorph.prototype._init = StageMorph.prototype.init;
StageMorph.prototype.init = function (globals) {
    this.messageTypes = new MessageFrame();

    this.addMessageType({  // Add initial message type
        name: 'message',
        fields: ['msg']
    });
    this._init(globals);
};

StageMorph.prototype.addMessageType = function (messageType) {
    var msgType,
        name,
        fields;

    name = messageType.name;
    fields = messageType.fields;
    msgType = new MessageType(name, fields);
    this.messageTypes.addMsgType(msgType);

    // Refresh message palette if possible in case the user is already on the 'Room' tab
    try {
        var ide = this.parentThatIsA(NetsBloxMorph);
        ide.room.parentThatIsA(RoomEditorMorph).updateRoom();
        if (ide && ide.currentTab === 'room') {
            ide.spriteBar.tabBar.tabTo('room');
        }
    } catch(e) {
        // do nothing
    }
};

ReplayControls.prototype._applyEvent = ReplayControls.prototype.applyEvent;
ReplayControls.prototype.applyEvent = function(event, next) {
    if (event.type !== 'openProject') {
        return ReplayControls.prototype._applyEvent.apply(this, arguments);
    } else {
        return next();
    }
};

SpriteMorph.prototype.reportRPCError = function () {
    return this.parentThatIsA(StageMorph).rpcError;
};

StageMorph.prototype.rpcError = null;

StageMorph.prototype.reportRPCError = function () {
    return this.rpcError;
};

WatcherMorph.prototype._isGlobal =
    WatcherMorph.prototype.isGlobal;

WatcherMorph.prototype.isGlobal = function (selector) {
    return selector === 'reportRPCError' ||
        WatcherMorph.prototype._isGlobal.call(this, selector);
};
