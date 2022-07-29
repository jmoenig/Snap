/* global SnapSerializer, MessageType, MessageFrame, HintInputSlotMorph,
   InputSlotMorph
   */
NetsBloxSerializer.prototype = new SnapSerializer();
NetsBloxSerializer.prototype.constructor = NetsBloxSerializer;
NetsBloxSerializer.uber = SnapSerializer.prototype;

SnapSerializer.prototype.isSavingHistory = true;

NetsBloxSerializer.prototype.appName = 'NetsBlox';
NetsBloxSerializer.prototype.version = '1.32.0';
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
