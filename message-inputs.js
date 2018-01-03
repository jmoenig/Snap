/* global BlockMorph, StageMorph, StructInputSlotMorph */

// MessageInputSlotMorph //////////////////////////////////////////////
// I am a dropdown menu with an associated message type
// InputSlotMorph inherits from ArgMorph:

MessageInputSlotMorph.prototype = new StructInputSlotMorph();
MessageInputSlotMorph.prototype.constructor = MessageInputSlotMorph;
MessageInputSlotMorph.uber = StructInputSlotMorph.prototype;

// MessageInputSlotMorph instance creation:
function MessageInputSlotMorph() {
    StructInputSlotMorph.call(this, null, false, 'messageTypesMenu', 'getMsgFields', true);
}

MessageInputSlotMorph.prototype.setContents = function(name, values, msgType) {
    if (msgType) {
        this.cachedMsgType = msgType;
    } else {
        this.cachedMsgType = null;
    }
    MessageInputSlotMorph.uber.setContents.call(this, name, values);
};

MessageInputSlotMorph.prototype.getMsgFields = function(name) {
    var block = this.parentThatIsA(BlockMorph),
        messageType = null,
        stage,
        fields;

    if (block && block.receiver()) {
        stage = block.receiver().parentThatIsA(StageMorph);
        messageType = stage.messageTypes.getMsgType(name);
        fields = messageType && messageType.fields;
    } else {
        fields = this.cachedMsgType && this.cachedMsgType.fields;
    }

    return fields || [];
};
