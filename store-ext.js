/* global SnapSerializer, MessageType, MessageFrame, HintInputSlotMorph,
   InputSlotMorph, Context, StageMorph, SnapActions
   */
NetsBloxSerializer.prototype = new SnapSerializer();
NetsBloxSerializer.prototype.constructor = NetsBloxSerializer;
NetsBloxSerializer.uber = SnapSerializer.prototype;

SnapSerializer.prototype.isSavingHistory = true;

NetsBloxSerializer.prototype.appName = 'NetsBlox';
NetsBloxSerializer.prototype.version = '1.8.4';
NetsBloxSerializer.prototype.app = NetsBloxSerializer.prototype.appName + ' ' +
    NetsBloxSerializer.prototype.version + ', http://netsblox.org';

function NetsBloxSerializer() {
    this.init();
}

NetsBloxSerializer.prototype.loadMessageType = function (stage, model) {
    var name = model.childNamed('name').contents,
        fields = model.childNamed('fields')
            .children
            .map(function(child) {
                return child.contents;
            });

    stage.addMessageType({
        name: name,
        fields: fields
    });
};

NetsBloxSerializer.prototype.loadCustomBlock = function (element, isGlobal) {
    if (element.attributes.category === 'services') {
        element.attributes.category = 'network';
    }
    return NetsBloxSerializer.uber.loadCustomBlock.call(this, element, isGlobal);
};

SnapSerializer.prototype.getInitialStageSpriteIds = function (model) {
    var stageId = model.childNamed('stage').attributes.collabId,
        firstSpriteId = stageId.split('_').slice(0, 2).join('_');

    return [stageId, firstSpriteId];
};

MessageFrame.prototype.toXML = function (serializer) {
    var myself = this,
        msgTypes = this.names().map(function(name) {
            return myself.getMsgType(name);
        });

    return msgTypes.map(function(type) {
        return serializer.format(
            '<messageType>%</messageType>',
            serializer.store(type)
        );
    }).join('');
};

MessageType.prototype.toXML = function (serializer) {
    var fields = this.fields.map(function(field) {
        return serializer.format(
            '<field>%</field>',
            serializer.escape(field)
        );
    }).join('');

    return serializer.format(
        '<name>%</name>' +
        '<fields>%</fields>',
        serializer.escape(this.name),
        fields
    );
};

HintInputSlotMorph.prototype.toXML = function(serializer) {
    if (this.empty) {
        return serializer.format('<l>$</l>', '');
    }
    return InputSlotMorph.prototype.toXML.call(this, serializer);
};

Context.prototype._toXML = Context.prototype.toXML;
Context.prototype.toXML = function (serializer) {
    var data = this._toXML(serializer);

    if (serializer.isSavingPortable && this.expression && this.receiver) {
        var stage = this.receiver.parentThatIsA(StageMorph),
            usedVars = {},
            isScriptVar = {},
            isSpriteVar = {};

        SnapActions.traverse(this.expression, function(block) {
            if (block.selector === 'reportGetVar' && !isScriptVar[name]) {
                usedVars[block.blockSpec] = true;
            } else if (block.selector === 'doDeclareVariables') {
                // Detect the declared script variables
                block.inputs()[0].inputs().forEach(function(slot) {
                    var name = slot.labelString;
                    isScriptVar[name] = true;
                });
            }
        });

        // Get the sprite variables
        this.receiver.variables.names().forEach(function(name) {
            isSpriteVar[name] = true;
        });

        // Check for any global variables
        usedVars = Object.keys(usedVars);
        for (var i = usedVars.length; i--;) {
            // receiver is already serialized. If there is a global variable
            // (not shadowed by any sprite or script variables) then include
            // the global project state
            if (!isSpriteVar[usedVars[i]]) {
                return data + serializer.store(stage);
            }
        }
    }

    return data;
};

