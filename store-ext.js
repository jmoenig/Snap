/* global SnapSerializer, MessageType, MessageFrame, HintInputSlotMorph,
   InputSlotMorph
   */
NetsBloxSerializer.prototype = new SnapSerializer();
NetsBloxSerializer.prototype.constructor = NetsBloxSerializer;
NetsBloxSerializer.uber = SnapSerializer.prototype;

SnapSerializer.prototype.isSavingHistory = true;

NetsBloxSerializer.prototype.version = '1.7.1';
NetsBloxSerializer.prototype.app = 'NetsBlox ' +
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

NetsBloxSerializer.prototype.openProject = function (project, ide) {
    // Only load the projectName if the current name is the default
    var projectName = ide.projectName;

    project = NetsBloxSerializer.uber.openProject.call(this, project, ide);

    if (projectName === 'myRole') {
        ide.setProjectName(project.name);
    } else {
        ide.projectName = projectName;
    }

    return project;
};

NetsBloxSerializer.prototype.loadCustomBlock = function (element, isGlobal) {
    if (element.attributes.category === 'services') {
        element.attributes.category = 'network';
    }
    return NetsBloxSerializer.uber.loadCustomBlock.call(this, element, isGlobal);
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

