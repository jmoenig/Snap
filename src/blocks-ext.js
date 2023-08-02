/* globals utils, nop, DialogBoxMorph, ScriptsMorph, BlockMorph, InputSlotMorph, StringMorph, Color
   ReporterBlockMorph, CommandBlockMorph, MultiArgMorph, localize, contains,
   world, BLACK, SERVER_URL*/
// Extensions to the Snap blocks

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

BlockMorph.prototype.showCustomHelp = async function (help) {
    if (typeof(help) === 'function') help = await help(this);
    if (typeof(help) !== 'object') help = { msg: help };
    const { msg, keptInputs = [] } = help;

    const cpy = this.fullCopy();
    if (cpy instanceof CommandBlockMorph) {
        const next = cpy.nextBlock();
        if (next) next.destroy();
    }

    const inputs = cpy.inputs();
    for (let i = 0; i < inputs.length; ++i) {
        if (keptInputs.includes(i)) continue;
        const input = inputs[i];

        if (input.setContents) {
            input.setContents('');
        } else {
            input.userDestroy();
        }
    }

    new DialogBoxMorph().inform(
        'Help',
        msg,
        this.world(),
        cpy.fullImage()
    );
};

// support for help dialogbox on service blocks
BlockMorph.prototype._showHelp = BlockMorph.prototype.showHelp;
BlockMorph.prototype.showHelp = async function() {
    const blockInfo = SpriteMorph.prototype.blocks[this.selector];
    if (blockInfo && blockInfo.help) return this.showCustomHelp(blockInfo.help);
    if (!this.isServiceBlock()) return this._showHelp();
    var help,
        inputs = this.inputs(),
        serviceName = inputs[0].evaluate(),
        methodName = inputs[1].evaluate()[0],
        isServiceURL = !!inputs[0].constant,
        ide = this.parentThatIsA(IDE_Morph),  // FIXME: Is it possible that this is undefined?
        services = ide.services,
        serviceNames,
        metadata;

    // build the help message
    if (serviceName !== '') {
        // service description will go here
        // if a method is selected append rpc specific description
        metadata = isServiceURL ?
            await services.getServiceMetadataFromURL(serviceName) :
            await services.getServiceMetadata(serviceName);
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
        metadata = await services.getServicesMetadata();
        serviceNames = metadata.slice(0,3).map(function(md) {return md.name;});
        help = 'Get information from different providers, save information and more. \nTo get more help select one of the services: '
            + serviceNames.join(', ') + ' ...';
    }

    return this.showCustomHelp({ msg: help, keptInputs: [0, 1] });
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

MultiHintArgMorph.prototype.mouseClickLeft = function (pos) {
    
    // if the <shift> key is pressed, repeat action 3 times
    var target = this.selectForEdit(),
        arrows = target.arrows(),
        leftArrow = arrows.children[0],
        rightArrow = arrows.children[1],
        repetition = target.world().currentKey === 16 ? 3 : 1,
        i;

    if (rightArrow.bounds.containsPoint(pos)) {
        for (i = 0; i < repetition; i += 1) {
            if (rightArrow.isVisible) {
                target.addInput();
            }
        }
        // if (ide) {
        //     ide.recordUnsavedChanges();
        // }
    } else if (
        leftArrow.bounds.expandBy(this.fontSize / 3).containsPoint(pos)
    ) {
        for (i = 0; i < repetition; i += 1) {
            if (leftArrow.isVisible) {
                target.removeInput();
            }
        }
        // if (ide) {
        //     ide.recordUnsavedChanges();
        // }
    } else {
        target.escalateEvent('mouseClickLeft', pos);
    }
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

StructInputSlotMorph.prototype.getFieldValue = function(fieldname, value, meta={}) {
    // Input slot is empty or has a string
    if (!value || typeof value === 'string') {
        const hostUrl = this.parentThatIsA(IDE_Morph)?.services.defaultHost?.url;
        if (!hostUrl) return new HintInputSlotMorph(value || '', fieldname, false, undefined, false);

        // FIXME: support type definitions from other hosts, too
        const typeMeta = utils.getUrlSyncCached(`${hostUrl}/input-types`, x => JSON.parse(x));

        // follow the base type chain to see if we can make a strongly typed slot
        for (let type = meta.type; type; type = typeMeta[type.name].baseType) {
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
    const ide = this.parentThatIsA(IDE_Morph);  // FIXME: Is it possible that this is undefined?
    const services = await ide.services.getServicesMetadata();
    let menuDict = {};

    for (let i = services.length; i--;) {
        const {name, url, categories} = services[i];
        const putGlobal = () => { menuDict[name] = url ? [url + '/' + name] : name; };

        if (categories.length === 0) {
            putGlobal();
            continue;
        }

        for (let j = categories.length; j--;) {
            const category = categories[j];
            if (category.length === 0) {
                putGlobal();
                continue;
            }

            let subMenu = menuDict;
            for (const c of category) {
                if (!subMenu[c]) { subMenu[c] = {}; }
                subMenu = subMenu[c];
            }
            subMenu[name] = url ? [url + '/' + name] : name;
        }
    }

    menuDict = sortDict(menuDict);

    const cloud = ide.cloud;
    const hasAuthoredServices = cloud.username && menuDict.Community &&
        menuDict.Community[cloud.username];
    if (hasAuthoredServices) {
        const subMenu = {};
        subMenu[cloud.username] = menuDict.Community[cloud.username];
        Object.keys(menuDict.Community).forEach(function(key) {
            if (key !== cloud.username) {
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
        if (!rpcName) {
            return [];
        }

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
    const serviceName = field.constant ?
        field.evaluate()[0] : field.evaluate();

    // The IDE_Morph is undefined when cloning or dragging from the part browser.
    // Collaborative edits result in the same issue.
    let ide = this.parentThatIsA(IDE_Morph);
    if (!ide) {  // FIXME: this is a bit of an ugly hack...
        ide = world.children[0];
    }

    const services = ide.services;
    const url = field.constant ? field.evaluate()[0] :
        services.defaultHost.url + '/' + field.evaluate();

    return services.getServiceMetadataFromURLSync(url);
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
    return InputSlotMorph.prototype.changed.call(this);
};

HintInputSlotMorph.prototype.isEmptySlot = function() {
    return this.empty;
};

HintInputSlotMorph.prototype.updateFieldValue = function (newValue) {
    var block = this.parentThatIsA(BlockMorph);

    newValue = newValue !== undefined ? newValue : this.contents().text;
    if (block.id) {  // not in the palette
        this.setContents(this.lastValue);  // set to original value in case it fails
        return SnapActions.setField(this, newValue);
    } else {
        // Handle use in message creation dialog
        this.setContents(newValue);
    }
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
