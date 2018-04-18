/* global nop, DialogBoxMorph, ScriptsMorph, BlockMorph, InputSlotMorph, StringMorph, Color
   ReporterBlockMorph, CommandBlockMorph, MultiArgMorph, SnapActions, isNil,
   ReporterSlotMorph, RingMorph, SyntaxElementMorph*/
// Extensions to the Snap blocks


// support for help dialogbox on service blocks
BlockMorph.prototype._showHelp = BlockMorph.prototype.showHelp;
BlockMorph.prototype.showHelp = function() {
    var isServiceBlock = this.selector === 'getJSFromRPCStruct';
    if (!isServiceBlock) return this._showHelp();
    // else we have a getJSFromRPCStruct block
    var myself = this,
        help,
        block,
        inputs = this.inputs(),
        serviceName = inputs[0].evaluate(),
        methodName = inputs[1].evaluate()[0],
        metadata = JSON.parse(RPCInputSlotMorph.prototype.getURL.call(this, '/rpc/' + serviceName));

    // build the help message
    if (serviceName !== '') {
        // service description will go here
        // if a method is selected append rpc specific description
        if (methodName !== '') {
            metadata = metadata.rpcs[methodName];
            help = metadata.description;
            // add argument descriptions, if available
            var args = metadata.args;
            for (var i = 0; i < args.length; i++) {
                var arg = args[i];
                if (arg.description) {
                    var optionalStr = arg.optional ? '[optional]' : '';
                    help += '\n' + arg.name + ': ' + arg.description + ' ' + optionalStr;
                }
            }
        } else {  // get service description
            help = metadata.description;
        }
        if (!help) help = 'Description not available';
    } else {
        help = 'Get information from different providers, save information and more. \nTo get more help select one of the services:'
            + metadata.slice(0,3).join(', ') + ' ...';
    }
    
    block = this.fullCopy();
    block.addShadow();
    new DialogBoxMorph().inform(
        'Help',
        help,
        myself.world(),
        block.fullImage()
    );
};

MultiHintArgMorph.prototype = new MultiArgMorph();
MultiHintArgMorph.prototype.constructor = MultiHintArgMorph;
MultiHintArgMorph.uber = MultiArgMorph.prototype;

// MultiHintArgMorph preferences settings:

MultiHintArgMorph.prototype.executeOnSliderEdit = false;
function MultiHintArgMorph(
    hintText,
    labelTxt,
    min,
    eSpec,
    arrowColor,
    labelColor,
    shadowColor,
    shadowOffset,
    isTransparent
) {
    this.init(
        hintText,
        labelTxt,
        min,
        eSpec,
        arrowColor,
        labelColor,
        shadowColor,
        shadowOffset,
        isTransparent
    );
}

MultiHintArgMorph.prototype.init = function(
    hintText,
    labelTxt,
    min,
    eSpec,
    arrowColor,
    labelColor,
    shadowColor,
    shadowOffset,
    isTransparent
) {
    this.hintText = hintText || '';
    MultiHintArgMorph.uber.init.call(
        this,
        '%s',  // all multi hint args are strings
        labelTxt,
        min,
        eSpec,
        arrowColor,
        labelColor,
        shadowColor,
        shadowOffset,
        isTransparent
    );
};

MultiHintArgMorph.prototype.addInput = function () {
    var newPart = this.labelPart('%hint' + this.hintText),
        idx = this.children.length - 1;
    newPart.parent = this;
    this.children.splice(idx, 0, newPart);
    newPart.drawNew();
    this.fixLayout();
};

StructInputSlotMorph.prototype = new InputSlotMorph();
StructInputSlotMorph.prototype.constructor = StructInputSlotMorph;
StructInputSlotMorph.uber = InputSlotMorph.prototype;

// StructInputSlotMorph preferences settings:

StructInputSlotMorph.prototype.executeOnSliderEdit = false;

function StructInputSlotMorph(
    value,
    isNumeric,
    choiceDict,
    fieldValues,
    isReadOnly
) {
    this.fields = [];
    this.fieldContent = [];
    this.getFieldNames = typeof fieldValues === 'string' ? this[fieldValues] : fieldValues || nop;

    InputSlotMorph.call(this, value, isNumeric, choiceDict, isReadOnly);
    this.isStatic = true;
}

StructInputSlotMorph.prototype.evaluate = function() {
    var myself = this;
    return [
        StructInputSlotMorph.uber.evaluate.call(myself),
        myself.fields
    ];
};

StructInputSlotMorph.prototype.setContents = function(name, values) {
    // Set the value for the dropdown
    InputSlotMorph.prototype.setContents.call(this, name);

    if (this.parent) {  // update fields
        var children = this.parent.children,
            myIndex = children.indexOf(this),
            currentFields = this.fields,
            i = currentFields.length + myIndex + 1,
            input = children[--i],
            removed = [],
            scripts = this.parentThatIsA(ScriptsMorph),
            inputs = this.parent.inputs(),
            myInpIndex = inputs.indexOf(this);

        // Remove the "i" fields after the current morph
        for (i = 0; i < this.fieldContent.length; i++) {
            input = inputs[myInpIndex +1 + i];
            removed.push(input);
            this.parent.removeChild(input);
            // remove the field
            this.parent.removeChild(this.fieldContent[i]);
        }
        this.fields = this.getFieldNames(name);

        if (scripts) {
            removed
                .filter(function(arg) {
                    return arg instanceof BlockMorph;
                })
                .forEach(scripts.add.bind(scripts));
        }

        // Create new struct fields
        values = values || [];
        this.fieldContent = [];
        for (i = 0; i < this.fields.length; i++) {
            this.fieldContent.push(this.updateField(this.fields[i], values[i]));
        }

        inputs = this.parent.inputs();
        for (i = this.fields.length; i < values.length && i < inputs.length; i++) {
            inputs[i].setContents(values[i]);
        }
        this.fixLayout();
        this.drawNew();
        this.parent.cachedInputs = null;
        this.parent.fixLayout();
        this.parent.changed();
    }
};

StructInputSlotMorph.prototype.getFieldValue = function(fieldname, value) {
    // Input slot is empty or has a string
    if (!value || typeof value === 'string') {
        var result = new HintInputSlotMorph(value || '', fieldname);
        return result;
    }

    return value;  // The input slot is occupied by another block
};

StructInputSlotMorph.prototype.setDefaultFieldArg = function(index) {
    // Reset the field and return it
    var isStructField = index < this.fields.length,
        parentIndex,
        arg;

    if (isStructField) {

        parentIndex = this.parent.children.indexOf(this) + index + 1;

        arg = this.fieldContent[index] = this.getFieldValue(this.fields[index]);
        this.parent.children.splice(parentIndex, 1, arg);
        arg.parent = this.parent;
    }

    arg.drawNew();
    arg.fixLayout();
    arg.drawNew();

    this.parent.drawNew();
    this.parent.fixLayout();
    this.parent.drawNew();

    return arg;
};


StructInputSlotMorph.prototype.updateField = function(field, value) {
    // Create the input slot w/ greyed out text
    // Value is either:
    // + scripts
    // + blocks
    // + values
    // + colors
    // + undefined
    // + string

    // Add the fields at the correct place wrt the current morph
    var index = this.parent.children.indexOf(this) + this.fields.indexOf(field) + 1,
        result = this.getFieldValue(field, value);

    this.parent.children.splice(index, 0, result);
    result.parent = this.parent;

    return result;
};

RPCInputSlotMorph.prototype = new StructInputSlotMorph();
RPCInputSlotMorph.prototype.constructor = RPCInputSlotMorph;
RPCInputSlotMorph.uber = StructInputSlotMorph.prototype;

function RPCInputSlotMorph() {
    StructInputSlotMorph.call(
        this,
        null,
        false,
        'methodSignature',
        function(rpcMethod) {
            if (!this.fieldsFor || !this.fieldsFor[rpcMethod]) {
                this.methodSignature();
            }
            if (this.fieldsFor[rpcMethod]) {
                return this.fieldsFor[rpcMethod].args.map(function(arg) {
                    return arg.name;
                });
            } else { // the requested action is undefined
                return [];
            }
        },
        true
    );
}

RPCInputSlotMorph.prototype.getRPCName = function () {
    var fields = this.parent.inputs(),
        field,
        i;

    // assume that the rpc is right before this input
    i = fields.indexOf(this);
    field = fields[i-1];

    if (field) {
        return field.evaluate();
    }
    return null;
};

RPCInputSlotMorph.prototype.methodSignature = function () {
    var actionNames,
        rpc,
        dict = {};

    rpc = this.getRPCName();
    if (rpc) {
        // stores information on a specific service's rpcs
        try {
            this.fieldsFor = JSON.parse(this.getURL('/rpc/' + rpc)).rpcs;
        } catch (e) {
            throw new Error('Service "' + rpc + '" is not available');
        }

        actionNames = Object.keys(this.fieldsFor);
        for (var i = actionNames.length; i--;) {
            var aName = actionNames[i];
            if (!this.fieldsFor[aName].deprecated) dict[aName] = aName;
        }
    }
    return dict;
};

// HintInputSlotMorph //////////////////////////////////////////////
// I am an input slot with greyed out hint text when I am empty

HintInputSlotMorph.prototype = new InputSlotMorph();
HintInputSlotMorph.prototype.constructor = HintInputSlotMorph;
HintInputSlotMorph.uber = InputSlotMorph.prototype;

function HintInputSlotMorph(text, hint, isNumeric) {
    var self = this;

    this.hintText = hint;
    this.empty = true;
    InputSlotMorph.call(this, text, isNumeric);

    // If the StringMorph gets clicked on when empty, the hint text
    // should be "ghostly"
    this.contents().mouseClickLeft = function() {
        if (self.empty) {
            this.text = '';
        }
        StringMorph.prototype.mouseClickLeft.apply(this, arguments);
    };
}

HintInputSlotMorph.prototype.evaluate = function() {
    if (this.empty) {  // ignore grey text
        return this.isNumeric ? 0 : '';
    }
    return InputSlotMorph.prototype.evaluate.call(this);
};

HintInputSlotMorph.prototype.setContents = function(value) {
    var color = new Color(0, 0, 0),
        contents = this.contents();

    // If empty, set to the hint text
    InputSlotMorph.prototype.setContents.apply(this, arguments);
    this.empty = value === '';
    if (this.empty) {  // Set the contents to the hint text
        // Set the text to the hint text
        contents.text = this.hintText;
        color = new Color(100, 100, 100);
    }
    contents.color = color;
    contents.drawNew();
};

// Check if the given morph has been changed
HintInputSlotMorph.prototype.changed = function() {
    var txtMorph = this.contents();
    if (txtMorph) {
        this.empty = txtMorph.text === this.hintText;
    }
    return InputSlotMorph.prototype.changed.call(this);
};

var addStructReplaceSupport = function(fn) {
    return function(arg) {
        var structInput,
            structInputIndex = -1,
            inputs = this.inputs(),
            inputIndex = inputs.indexOf(arg),
            relIndex;

        // Check if 'arg' follows a MessageInputSlotMorph (these are a special case)
        for (var i = inputs.length; i--;) {
            if (inputs[i] instanceof StructInputSlotMorph) {
                structInputIndex = i;
                structInput = inputs[i];
            }
        }

        if (structInput && structInputIndex < inputIndex &&
            structInput.fields.length >= inputIndex - structInputIndex) {

            relIndex = inputIndex - structInputIndex - 1;
            var defaultArg = structInput.setDefaultFieldArg(relIndex);
            this.silentReplaceInput(arg, defaultArg);
            this.cachedInputs = null;
        } else {
            fn.apply(this, arguments);
        }
    };
};

ReporterBlockMorph.prototype.revertToDefaultInput =
    addStructReplaceSupport(ReporterBlockMorph.prototype.revertToDefaultInput);

CommandBlockMorph.prototype.revertToDefaultInput =
    addStructReplaceSupport(CommandBlockMorph.prototype.revertToDefaultInput);
