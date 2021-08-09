/* globals utils, nop, DialogBoxMorph, ScriptsMorph, BlockMorph, InputSlotMorph, StringMorph, Color
   ReporterBlockMorph, CommandBlockMorph, MultiArgMorph, localize, SnapCloud, contains,
   world, Services, BLACK, SERVER_URL*/
// Extensions to the Snap blocks

function getInputTypeMeta() {
    return utils.getUrlSyncCached(`${SERVER_URL}/services/input-types`, x => JSON.parse(x));
}

function sortDict(dict) {
    var keys = Object.keys(dict).sort(),
        sortedDict = {};

    for (var i = 0; i < keys.length; i++) {
        if (dict[keys[i]] instanceof Object && !Array.isArray(dict[keys[i]])) {
            sortedDict[keys[i]] = sortDict(dict[keys[i]]);
        } else {
            sortedDict[keys[i]] = dict[keys[i]];
        }
    }

    return sortedDict;
}


// support for help dialogbox on service blocks
BlockMorph.prototype._showHelp = BlockMorph.prototype.showHelp;
BlockMorph.prototype.showHelp = async function() {
    if (!this.isServiceBlock()) return this._showHelp();
    var myself = this,
        help,
        block,
        nb,
        inputs = this.inputs(),
        serviceName = inputs[0].evaluate(),
        methodName = inputs[1].evaluate()[0],
        isServiceURL = !!inputs[0].constant,
        serviceNames,
        metadata;

    // build the help message
    if (serviceName !== '') {
        // service description will go here
        // if a method is selected append rpc specific description
        metadata = isServiceURL ?
            await Services.getServiceMetadataFromURL(serviceName) :
            await Services.getServiceMetadata(serviceName);
        if (methodName !== '') {
            metadata = metadata.rpcs[methodName];
            help = metadata.description;
            // add argument descriptions, if available
            for (const arg of metadata.args.filter(s => s.description)) {
                var optionalStr = arg.optional ? '[optional]' : '';
                help += `\n${arg.name}: ${arg.description} ${optionalStr}`;
            }
            // add a direct link to the official docs page
            const cat = metadata.categories && metadata.categories.length ? metadata.categories[0] : 'index';
            help += `\n\nDocumentation can be found at:\n${SERVER_URL}/docs/services/${serviceName}/${cat}.html#${serviceName}.${methodName}`;
        } else {  // get service description
            help = metadata.description;
            // add a direct link to the official docs page
            help += `\n\nDocumentation can be found at:\n${SERVER_URL}/docs/services/${serviceName}/index.html`;
        }
        if (!help) help = 'Description not available';
    } else {
        metadata = await Services.getServicesMetadata();
        serviceNames = metadata.slice(0,3).map(function(md) {return md.name;});
        help = 'Get information from different providers, save information and more. \nTo get more help select one of the services: '
            + serviceNames.join(', ') + ' ...';
    }

    // Get a copy of the block to display to the user
    block = this.fullCopy();
    if (block instanceof CommandBlockMorph) {
        nb = block.nextBlock();
        if (nb) {
            nb.destroy();
        }
    }
    block.inputs().slice(2).forEach(function(child) {  // clear rpc args
        if (child instanceof HintInputSlotMorph) {
            child.setContents('');
        } else {
            child.userDestroy();
        }
    })
    block.addShadow();

    new DialogBoxMorph().inform(
        'Help',
        help,
        myself.world(),
        block.fullImage()
    );
};

BlockMorph.prototype.isServiceBlock = function() {
    var serviceSpecs = ['getJSFromRPCStruct', 'doRunRPC'];
    return contains(serviceSpecs, this.selector);
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
    if (this.inputs().length === 0) this.addInput();
};

MultiHintArgMorph.prototype.addInput = function () {
    var newPart = this.labelPart('%hint' + this.hintText),
        idx = this.children.length - 1;
    newPart.parent = this;
    this.children.splice(idx, 0, newPart);
    newPart.rerender();
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
    isReadOnly,
    fieldMeta,
) {
    this.fields = [];
    this.fieldContent = [];
    this.getFieldNames = typeof fieldValues === 'string' ? this[fieldValues] : fieldValues || nop;
    this.getFieldMeta = fieldMeta || nop;

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
    values = values || [];
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
            myInpIndex = inputs.indexOf(this),
            index,
            content;

        // Remove the "i" fields after the current morph
        for (i = 0; i < this.fieldContent.length; i++) {
            input = inputs[myInpIndex +1 + i];
            removed.push(input);
            this.parent.removeChild(input);
            // remove the field
            this.parent.removeChild(this.fieldContent[i]);
        }
        this.fields = this.getFieldNames(name);
        this.fieldsMeta = this.getFieldMeta(name) || [];
        if (!this.fields) {
            this.fields = values.map(function(){ return '???'; });
        }

        if (scripts) {
            removed
                .filter(function(arg) {
                    return arg instanceof BlockMorph;
                })
                .forEach(scripts.add.bind(scripts));
        }

        // Create new struct fields
        this.fieldContent = [];
        for (i = 0; i < this.fields.length; i++) {
            index = myIndex + i + 1;
            const meta = i < this.fieldsMeta.length ? this.fieldsMeta[i] : undefined;
            content = this.getFieldValue(this.fields[i], values[i], meta);

            this.parent.children.splice(index, 0, content);
            content.parent = this.parent;
            content.rerender();

            this.fieldContent.push(content);
        }

        inputs = this.parent.inputs();
        for (i = this.fields.length; i < values.length && i < inputs.length; i++) {
            inputs[i].setContents(values[i]);
        }
        this.fixLayout();
        this.rerender();
        this.parent.cachedInputs = null;
        this.parent.fixLayout();
        this.parent.changed();
    }
};

StructInputSlotMorph.prototype.getFieldValue = function(fieldname, value, meta) {
    // Input slot is empty or has a string
    if (!value || typeof value === 'string') {
        const typeMeta = getInputTypeMeta();

        // follow the base type chain to see if we can make a strongly typed slot
        for (let type = (meta || {}).type; type; type = (typeMeta[type.name] || {}).baseType) {
            if (type.name === 'Number') {
                return new HintInputSlotMorph(value || '', fieldname, true, undefined, false);
            }
            if (type.name === 'Enum') {
                const choiceDict = {};
                for (const v of type.params) choiceDict[v] = v;
                return new HintInputSlotMorph(value || '', fieldname, false, choiceDict, true);
            }
        }

        // otherwise default to a generic slot that allows anything
        return new HintInputSlotMorph(value || '', fieldname, false, undefined, false);
    }

    return value;  // The input slot is occupied by another block
};

InputSlotMorph.prototype.serviceNames = async function () {
    var services = await Services.getServicesMetadata(),
        hasAuthoredServices,
        menuDict = {},
        category,
        subMenu,
        name;

    for (var i = services.length; i--;) {
        name = services[i].name;
        const url = services[i].url;
        if (services[i].categories.length) {
            for (var j = services[i].categories.length; j--;) {
                category = services[i].categories[j];
                subMenu = menuDict;
                for (var c = 0; c < category.length; c++) {
                    if (!subMenu[category[c]]) {
                        subMenu[category[c]] = {};
                    }
                    subMenu = subMenu[category[c]];
                }
                subMenu[name] = url ? [url + '/' + name] : name;
            }
        } else {
            menuDict[name] = url ? [url + '/' + name] : name;
        }
    }

    menuDict = sortDict(menuDict);

    hasAuthoredServices = SnapCloud.username && menuDict.Community &&
        menuDict.Community[SnapCloud.username];
    if (hasAuthoredServices) {
        subMenu = {};
        subMenu[SnapCloud.username] = menuDict.Community[SnapCloud.username];
        Object.keys(menuDict.Community).forEach(function(key) {
            if (key !== SnapCloud.username) {
                subMenu[key] = menuDict.Community[key];
            }
        });
        menuDict.Community = subMenu;
    }

    return menuDict;
};

RPCInputSlotMorph.prototype = new StructInputSlotMorph();
RPCInputSlotMorph.prototype.constructor = RPCInputSlotMorph;
RPCInputSlotMorph.uber = StructInputSlotMorph.prototype;

function RPCInputSlotMorph() {
    const getFields = rpcName => {
        if (!this.fieldsFor || !this.fieldsFor[rpcName]) {
            this.methodSignature();
            var isSupported = !!this.fieldsFor;
            if (!isSupported) {
                this.fieldsFor = {};
                var msg = 'Service "' + this.getServiceName() + '" is not available';
                if (world.children[0].showMessage) world.children[0].showMessage(msg);
            }
        }

        if (this.fieldsFor[rpcName]) {
            return this.fieldsFor[rpcName].args;
        }
    };
    const getFieldNames = rpcName => {
        const fields = getFields(rpcName);
        if (fields) return fields.map(arg => arg.name);
    };

    StructInputSlotMorph.call(this, null, false, 'methodSignature', getFieldNames, true, getFields);
}

RPCInputSlotMorph.prototype.getServiceInputSlot = function () {
    var fields = this.parent.inputs(),
        field,
        i;

    // assume that the service is right before this input
    i = fields.indexOf(this);
    field = fields[i-1];

    return field;
};

RPCInputSlotMorph.prototype.getServiceName = function () {
    const field = this.getServiceInputSlot();

    if (field) {
        if (field.constant) {
            const [url] = field.evaluate();
            return url.split('/').pop();
        }
        return field.evaluate();
    }
    return null;
};

RPCInputSlotMorph.prototype.getServiceMetadata = function () {
    const field = this.getServiceInputSlot();
    const url = field.constant ? field.evaluate()[0] :
        Services.defaultHost.url + '/' + field.evaluate();

    return Services.getServiceMetadataFromURLSync(url);
};

// sets this.fieldsFor and returns the method signature dict
RPCInputSlotMorph.prototype.methodSignature = function () {
    var rpcNames,
        block,
        metadata,
        dict = {};

    function addRPCMenuItem(name, categories) {
        const subMenu = categories.reduce((subMenu, category) => {
            if (!subMenu[category]) {
                subMenu[category] = {};
            }
            return subMenu[category];
        }, dict);
        subMenu[name] = name;
    }

    const service = this.getServiceName();
    if (service) {
        // stores information on a specific service's rpcs
        try {
            metadata = this.getServiceMetadata();
            this.fieldsFor = metadata.rpcs;
            rpcNames = Object.keys(this.fieldsFor);
            this.isCurrentRPCSupported = true;
        } catch (e) {
            this.isCurrentRPCSupported = false;
            block = this.parentThatIsA(BlockMorph);
            block.showBubble(localize('Service "' + service + '" is not available'));
            rpcNames = [];
        }

        rpcNames.forEach(name => {
            const {deprecated, categories=[]} = this.fieldsFor[name];
            if (!deprecated) {
                if (categories.length) {
                    categories.forEach(categoryList => addRPCMenuItem(name, categoryList));
                } else {
                    addRPCMenuItem(name, []);
                }
            }
        });
    }
    return sortDict(dict);
};

RPCInputSlotMorph.prototype.evaluate = function() {
    var fields,
        rpc;

    if (!this.isCurrentRPCSupported) {
        rpc = InputSlotMorph.prototype.evaluate.call(this);
        fields = this.getFieldNames(rpc);
        if (this.isCurrentRPCSupported) {
            this.fields = fields;
        }
    }
    return RPCInputSlotMorph.uber.evaluate.call(this);
};

// HintInputSlotMorph //////////////////////////////////////////////
// I am an input slot with greyed out hint text when I am empty

HintInputSlotMorph.prototype = new InputSlotMorph();
HintInputSlotMorph.prototype.constructor = HintInputSlotMorph;
HintInputSlotMorph.uber = InputSlotMorph.prototype;

function HintInputSlotMorph(text, hint, isNumeric, choiceDict, isReadOnly) {
    var self = this;

    this.hintText = hint;
    this.empty = true;
    InputSlotMorph.call(this, text, isNumeric, choiceDict, isReadOnly);

    // If the StringMorph gets clicked on when empty, the hint text should be "ghostly"
    if (!choiceDict) { // don't wipe out enum inputs
        this.contents().mouseClickLeft = function() {
            if (self.isEmptySlot()) {
                this.text = '';
            }
            StringMorph.prototype.mouseClickLeft.apply(this, arguments);
        };
    }
}

HintInputSlotMorph.prototype.evaluate = function() {
    if (this.isEmptySlot()) {  // ignore grey text
        return '';
    }
    return InputSlotMorph.prototype.evaluate.call(this);
};

const WHITE_HINT = new Color(190, 190, 190);
const BLACK_HINT = new Color(100, 100, 100);
HintInputSlotMorph.prototype.setContents = function(value) {
    const contents = this.contents();
    let color;

    InputSlotMorph.prototype.setContents.apply(this, arguments);

    this.overrideWhite = null;
    this.overrideBlack = null;

    // If empty, set contents to the hint text
    this.empty = !value || value === '';
    if (this.isEmptySlot()) {
        contents.text = this.hintText;
        if (this.isReadOnly) {
            this.overrideWhite = WHITE_HINT;
            this.overrideBlack = BLACK_HINT;
        }
        color = this.isReadOnly ? WHITE_HINT : BLACK_HINT;
    } else {
        color = this.isReadOnly ? WHITE : BLACK;
    }

    contents.fixLayout();
    contents.color = color;
    contents.rerender();
};

// Check if the given morph has been changed
HintInputSlotMorph.prototype.changed = function() {
    var txtMorph = this.contents();
    if (txtMorph) {
        this.empty = txtMorph.text === this.hintText;
    }
    return InputSlotMorph.prototype.changed.call(this);
};

HintInputSlotMorph.prototype.isEmptySlot = function() {
    return this.empty;
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
            const meta = structInput.fieldsMeta && relIndex < structInput.fieldsMeta.length ? structInput.fieldsMeta[relIndex] : undefined;
            const defaultArg = structInput.getFieldValue(structInput.fields[relIndex], null, meta);
            this.replaceInput(arg, defaultArg);
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
