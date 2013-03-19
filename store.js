/*

    store.js

    saving and loading Snap! projects

    written by Jens Mšnig
    jens@moenig.org

    Copyright (C) 2013 by Jens Mšnig

    This file is part of Snap!. 

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    prerequisites:
    --------------
    needs morphic.js, xml.js, and most of Snap!'s other modules


    hierarchy
    ---------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

        XML_Serializer
            SnapSerializer


    credits
    -------
    Nathan Dinsmore contributed to the design and implemented a first
    working version of a complete XMLSerializer. I have taken much of the
    overall design and many of the functions and methods in this file from
    Nathan's fine original prototype.
    
*/

/*global modules, XML_Element, XML_Serializer, VariableFrame, StageMorph,
SpriteMorph, WatcherMorph, Point, CustomBlockDefinition, Context,
ReporterBlockMorph, CommandBlockMorph, HatBlockMorph, RingMorph, contains,
detect, CustomCommandBlockMorph, CustomReporterBlockMorph, Color, List,
newCanvas, Costume, Sound, Audio, IDE_Morph, ScriptsMorph, BlockMorph,
ArgMorph, InputSlotMorph, TemplateSlotMorph, CommandSlotMorph,
FunctionSlotMorph, MultiArgMorph, ColorSlotMorph, nop, CommentMorph, isNil,
localize, sizeOf, ArgLabelMorph, SVG_Costume, MorphicPreferences,
SyntaxElementMorph*/

// Global stuff ////////////////////////////////////////////////////////

modules.store = '2013-March-19';


// XML_Serializer ///////////////////////////////////////////////////////
/*
    I am an abstract protype for my heirs.

    I manage object identities and keep track of circular data structures.
    Objects are "touched" and a property named "serializationID" is added
    to each, representing an index integer in the list, starting with 1.
*/

// XML_Serializer instance creation:

function XML_Serializer() {
    this.contents = [];
    this.media = [];
    this.isCollectingMedia = false;
}

// XML_Serializer preferences settings:

XML_Serializer.prototype.idProperty = 'serializationID';
XML_Serializer.prototype.mediaIdProperty = 'serializationMediaID';
XML_Serializer.prototype.mediaDetectionProperty = 'isMedia';
XML_Serializer.prototype.version = 1; // increment on structural change

// XML_Serializer accessing:

XML_Serializer.prototype.serialize = function (object) {
    // public: answer an XML string representing the given object
    var xml;
    this.flush(); // in case an error occurred in an earlier attempt
    this.flushMedia();
    xml = this.store(object);
    this.flush();
    return xml;
};

XML_Serializer.prototype.store = function (object, mediaID) {
    // private - mediaID is optional
    if (isNil(object) || !object.toXML) {
        // unsupported type, to be checked before calling store()
        // when debugging, be sure to throw an error at this point
        return '';
    }
    if (this.isCollectingMedia && object[this.mediaDetectionProperty]) {
        this.addMedia(object, mediaID);
        return this.format(
            '<ref mediaID="@"></ref>',
            object[this.mediaIdProperty]
        );
    }
    if (object[this.idProperty]) {
        return this.format('<ref id="@"></ref>', object[this.idProperty]);
    }
    this.add(object);
    return object.toXML(this, mediaID).replace(
        '~',
        this.format('id="@"', object[this.idProperty])
    );
};

XML_Serializer.prototype.mediaXML = function () {
    // answer a project's collected media module as XML
    var xml = '<media>',
        myself = this;
    this.media.forEach(function (object) {
        var str = object.toXML(myself).replace(
            '~',
            myself.format('mediaID="@"', object[myself.mediaIdProperty])
        );
        xml = xml + str;
    });
    return xml + '</media>';
};

XML_Serializer.prototype.add = function (object) {
    // private - mark the object with a serializationID property and add it
    if (object[this.idProperty]) { // already present
        return -1;
    }
    this.contents.push(object);
    object[this.idProperty] = this.contents.length;
    return this.contents.length;
};

XML_Serializer.prototype.addMedia = function (object, mediaID) {
    // private - mark the object with a serializationMediaID property
    // and add it to media
    // if a mediaID is given, take it, otherwise generate one
    if (object[this.mediaIdProperty]) { // already present
        return -1;
    }
    this.media.push(object);
    if (mediaID) {
        object[this.mediaIdProperty] = mediaID + '_' + object.name;
    } else {
        object[this.mediaIdProperty] = this.media.length;
    }
    return this.media.length;
};

XML_Serializer.prototype.at = function (integer) {
    // private
    return this.contents[integer - 1];
};

XML_Serializer.prototype.flush = function () {
    // private - free all objects and empty my contents
    var myself = this;
    this.contents.forEach(function (obj) {
        delete obj[myself.idProperty];
    });
    this.contents = [];
};

XML_Serializer.prototype.flushMedia = function () {
    // private - free all media objects and empty my media
    var myself = this;
    if (this.media instanceof Array) {
        this.media.forEach(function (obj) {
            delete obj[myself.mediaIdProperty];
        });
    }
    this.media = [];
};

// XML_Serializer formatting:

XML_Serializer.prototype.escape = XML_Element.prototype.escape;
XML_Serializer.prototype.unescape = XML_Element.prototype.unescape;


XML_Serializer.prototype.format = function (string) {
    // private
    var myself = this,
        i = -1,
        values = arguments,
        value;

    return string.replace(/[@$%]([\d]+)?/g, function (spec, index) {
        index = parseInt(index, 10);
        value = values[(isNaN(index) ? (i += 1) : index) + 1];
        return spec === '@' ?
                myself.escape(value)
                    : spec === '$' ?
                        myself.escape(value, true)
                            : value;
    });
};

// XML_Serializer loading:

XML_Serializer.prototype.load = function (xmlString) {
    // public - answer a new object which is represented by the given
    // XML string.
    nop(xmlString);
    throw new Error(
        'loading should be implemented in heir of XML_Serializer'
    );
};

XML_Serializer.prototype.parse = function (xmlString) {
    // private - answer an XML_Element representing the given XML String
    var element = new XML_Element();
    element.parseString(xmlString);
    return element;
};

// SnapSerializer ////////////////////////////////////////////////////////////

var SnapSerializer;

// SnapSerializer inherits from XML_Serializer:

SnapSerializer.prototype = new XML_Serializer();
SnapSerializer.prototype.constructor = SnapSerializer;
SnapSerializer.uber = XML_Serializer.prototype;

// SnapSerializer constants:

SnapSerializer.prototype.app = 'Snap! 4.0, http://snap.berkeley.edu';

SnapSerializer.prototype.thumbnailSize = new Point(160, 120);

SnapSerializer.prototype.watcherLabels = {
    xPosition: 'x position',
    yPosition: 'y position',
    direction: 'direction',
    getScale: 'size',
    getLastAnswer: 'answer',
    getTimer: 'timer',
    getCostumeIdx: 'costume #'
};

// SnapSerializer instance creation:

function SnapSerializer() {
    this.init();
}

// SnapSerializer initialization:

SnapSerializer.prototype.init = function () {
    this.project = {};
    this.objects = {};
    this.mediaDict = {};
};

// SnapSerializer saving:

XML_Serializer.prototype.mediaXML = function (name) {
    // under construction....
    var xml = '<media name="' +
            (name || 'untitled') +
            '" app="' + this.app +
            '" version="' +
            this.version +
            '">',
        myself = this;
    this.media.forEach(function (object) {
        var str = object.toXML(myself).replace(
            '~',
            myself.format('mediaID="@"', object[myself.mediaIdProperty])
        );
        xml = xml + str;
    });
    return xml + '</media>';
};


// SnapSerializer loading:

SnapSerializer.prototype.load = function (xmlString) {
    // public - answer a new Project represented by the given XML String
    return this.loadProjectModel(this.parse(xmlString));
};

SnapSerializer.prototype.loadProjectModel = function (xmlNode) {
    // public - answer a new Project represented by the given XML top node
    var myself = this,
        project = this.project = {sprites: {}},
        model,
        nameID;

    model = {project: xmlNode };
    if (+xmlNode.attributes.version > this.version) {
        throw 'Project uses newer version of Serializer';
    }

    /* Project Info */

    this.objects = {};
    project.name = model.project.attributes.name;
    if (!project.name) {
        nameID = 1;
        while (
            localStorage.hasOwnProperty(
                '-snap-project-Untitled ' + nameID
            )
        ) {
            nameID += 1;
        }
        project.name = 'Untitled ' + nameID;
    }
    model.notes = model.project.childNamed('notes');
    if (model.notes) {
        project.notes = model.notes.contents;
    }
    model.globalVariables = model.project.childNamed('variables');
    project.globalVariables = new VariableFrame();

    /* Stage */

    model.stage = model.project.require('stage');
    StageMorph.prototype.frameRate = 0;
    project.stage = new StageMorph(project.globalVariables);
    if (model.stage.attributes.hasOwnProperty('id')) {
        this.objects[model.stage.attributes.id] = project.stage;
    }
    if (model.stage.attributes.name) {
        project.stage.name = model.stage.attributes.name;
    }
    if (model.stage.attributes.scheduled === 'true') {
        project.stage.fps = 30;
        StageMorph.prototype.frameRate = 30;
    }
    model.pentrails = model.stage.childNamed('pentrails');
    if (model.pentrails) {
        project.pentrails = new Image();
        project.pentrails.onload = function () {
            var context = project.stage.trailsCanvas.getContext('2d');
            context.drawImage(project.pentrails, 0, 0);
            project.stage.changed();
        };
        project.pentrails.src = model.pentrails.contents;
    }
    project.stage.setTempo(model.stage.attributes.tempo);
    project.stage.setExtent(StageMorph.prototype.dimensions);
    project.stage.isThreadSafe =
        model.stage.attributes.threadsafe === 'true';

    model.globalBlocks = model.project.childNamed('blocks');
    if (model.globalBlocks) {
        this.loadCustomBlocks(project.stage, model.globalBlocks, true);
        this.populateCustomBlocks(
            project.stage,
            model.globalBlocks,
            true
        );
    }
    this.loadObject(project.stage, model.stage);

    /* Sprites */

    model.sprites = model.stage.require('sprites');
    project.sprites[project.stage.name] = project.stage;

    model.sprites.childrenNamed('sprite').forEach(function (model) {
        myself.loadValue(model);
    });

    /* Global Variables */

    if (model.globalVariables) {
        this.loadVariables(
            project.globalVariables,
            model.globalVariables
        );
    }

    /* Watchers */

    model.sprites.childrenNamed('watcher').forEach(function (model) {
        var watcher, color, target, hidden, extX, extY;

        color = myself.loadColor(model.attributes.color);
        target = model.attributes.hasOwnProperty('scope') ?
                project.sprites[model.attributes.scope] : null;

        // determine whether the watcher is hidden, slightly
        // complicated to retain backward compatibility
        // with former tag format: hidden="hidden"
        // now it's: hidden="true"
        hidden = model.attributes.hasOwnProperty('hidden')
            && (model.attributes.hidden !== 'false');

        if (model.attributes.hasOwnProperty('var')) {
            watcher = new WatcherMorph(
                model.attributes['var'],
                color,
                isNil(target) ? project.globalVariables
                    : target.variables,
                model.attributes['var'],
                hidden
            );
        } else {
            watcher = new WatcherMorph(
                localize(myself.watcherLabels[model.attributes.s]),
                color,
                target,
                model.attributes.s,
                hidden
            );
        }
        watcher.setStyle(model.attributes.style || 'normal');
        if (watcher.style === 'slider') {
            watcher.setSliderMin(model.attributes.min || '1');
            watcher.setSliderMax(model.attributes.max || '100');
        }
        watcher.setPosition(
            project.stage.topLeft().add(new Point(
                +model.attributes.x || 0,
                +model.attributes.y || 0
            ))
        );
        project.stage.add(watcher);
        watcher.update();

        // set watcher's contentsMorph's extent if it is showing a list and
        // its monitor dimensions are given
        if (watcher.currentValue instanceof List) {
            extX = model.attributes.extX;
            if (extX) {
                watcher.cellMorph.contentsMorph.setWidth(+extX);
            }
            extY = model.attributes.extY;
            if (extY) {
                watcher.cellMorph.contentsMorph.setHeight(+extY);
            }
            // adjust my contentsMorph's handle position
            watcher.cellMorph.contentsMorph.handle.drawNew();
        }
    });
    this.objects = {};
    return project;
};

SnapSerializer.prototype.loadBlocks = function (xmlString, targetStage) {
    // public - answer a new Array of custom block definitions
    // represented by the given XML String
    var stage = new StageMorph(),
        model;

    this.project = {
        stage: stage,
        sprites: {},
        targetStage: targetStage // for secondary custom block def look-up
    };
    model = this.parse(xmlString);
    if (+model.attributes.version > this.version) {
        throw 'Module uses newer version of Serializer';
    }
    this.loadCustomBlocks(stage, model, true);
    this.populateCustomBlocks(
        stage,
        model,
        true
    );
    this.objects = {};
    stage.globalBlocks.forEach(function (def) {
        def.receiver = null;
    });
    this.objects = {};
    this.project = {};
    this.mediaDict = {};
    return stage.globalBlocks;
};

SnapSerializer.prototype.loadSprites = function (xmlString, ide) {
    // public - import a set of sprites represented by xmlString
    // into the current project of the ide
    var model, project, myself = this;

    project = this.project = {
        globalVariables: ide.globalVariables,
        stage: ide.stage,
        sprites: {}
    };
    project.sprites[project.stage.name] = project.stage;

    model = this.parse(xmlString);
    if (+model.attributes.version > this.version) {
        throw 'Module uses newer version of Serializer';
    }
    model.childrenNamed('sprite').forEach(function (model) {
        var sprite  = new SpriteMorph(project.globalVariables);

        if (model.attributes.id) {
            myself.objects[model.attributes.id] = sprite;
        }
        if (model.attributes.name) {
            sprite.name = model.attributes.name;
            project.sprites[model.attributes.name] = sprite;
        }
        if (model.attributes.color) {
            sprite.color = myself.loadColor(model.attributes.color);
        }
        if (model.attributes.pen) {
            sprite.penPoint = model.attributes.pen;
        }
        project.stage.add(sprite);
        ide.sprites.add(sprite);
        sprite.scale = parseFloat(model.attributes.scale || '1');
        sprite.rotationStyle = parseFloat(
            model.attributes.rotation || '1'
        );
        sprite.isDraggable = model.attributes.draggable !== 'false';
        sprite.isVisible = model.attributes.hidden !== 'true';
        sprite.heading = parseFloat(model.attributes.heading) || 0;
        sprite.drawNew();
        sprite.gotoXY(+model.attributes.x || 0, +model.attributes.y || 0);
        myself.loadObject(sprite, model);
    });
    this.objects = {};
    this.project = {};
    this.mediaDict = {};

//    ide.stage.drawNew();
    ide.createCorral();
    ide.fixLayout();
};

SnapSerializer.prototype.loadMedia = function (xmlString) {
    // public - load the media represented by xmlString into memory
    // to be referenced by a media-less project later
    return this.loadMediaModel(this.parse(xmlString));
};

SnapSerializer.prototype.loadMediaModel = function (xmlNode) {
    // public - load the media represented by xmlNode into memory
    // to be referenced by a media-less project later
    var myself = this,
        model = xmlNode;
    this.mediaDict = {};
    if (+model.attributes.version > this.version) {
        throw 'Module uses newer version of Serializer';
    }
    model.children.forEach(function (model) {
        myself.loadValue(model);
    });
    return this.mediaDict;
};

SnapSerializer.prototype.loadObject = function (object, model) {
    // private
    var blocks = model.require('blocks');
    this.loadCostumes(object, model);
    this.loadSounds(object, model);
    this.loadCustomBlocks(object, blocks);
    this.populateCustomBlocks(object, blocks);
    this.loadVariables(object.variables, model.require('variables'));
    this.loadScripts(object.scripts, model.require('scripts'));
};

SnapSerializer.prototype.loadCostumes = function (object, model) {
    // private
    var costumes = model.childNamed('costumes'),
        costume;
    if (costumes) {
        object.costumes = this.loadValue(costumes.require('list'));
    }
    if (model.attributes.hasOwnProperty('costume')) {
        costume = object.costumes.asArray()[model.attributes.costume - 1];
        if (costume) {
            if (costume.loaded) {
                object.wearCostume(costume);
            } else {
                costume.loaded = function () {
                    object.wearCostume(costume);
                };
            }
        }
    }
};

SnapSerializer.prototype.loadSounds = function (object, model) {
    // private
    var sounds = model.childNamed('sounds');
    if (sounds) {
        object.sounds = this.loadValue(sounds.require('list'));
    }
};

SnapSerializer.prototype.loadVariables = function (varFrame, element) {
    // private
    var myself = this;

    element.children.forEach(function (child) {
        var value;
        if (child.tag !== 'variable') {
            return;
        }
        value = child.children[0];
        varFrame.vars[child.attributes.name] = value ?
                myself.loadValue(value) : 0;
    });
};

SnapSerializer.prototype.loadCustomBlocks = function (
    object,
    element,
    isGlobal
) {
    // private
    element.children.forEach(function (child) {
        var definition, names, inputs, i;
        if (child.tag !== 'block-definition') {
            return;
        }
        definition = new CustomBlockDefinition(
            child.attributes.s || '',
            object
        );
        definition.category = child.attributes.category || 'other';
        definition.type = child.attributes.type || 'command';
        definition.isGlobal = (isGlobal === true);
        if (definition.isGlobal) {
            object.globalBlocks.push(definition);
        } else {
            object.customBlocks.push(definition);
        }

        names = definition.parseSpec(definition.spec).filter(
            function (str) {
                return str.charAt(0) === '%';
            }
        ).map(function (str) {
            return str.substr(1);
        });

        definition.names = names;
        inputs = child.childNamed('inputs');
        if (inputs) {
            i = -1;
            inputs.children.forEach(function (child) {
                if (child.tag !== 'input') {
                    return;
                }
                definition.declarations[names[i += 1]]
                    = [child.attributes.type, child.contents];
            });
        }
    });
};

SnapSerializer.prototype.populateCustomBlocks = function (
    object,
    element,
    isGlobal
) {
    // private
    var myself = this;
    element.children.forEach(function (child, index) {
        var definition, script, scripts;
        if (child.tag !== 'block-definition') {
            return;
        }
        definition = isGlobal ? object.globalBlocks[index]
                : object.customBlocks[index];
        script = child.childNamed('script');
        if (script) {
            definition.body = new Context(
                null,
                script ? myself.loadScript(script) : null,
                null,
                object
            );
            definition.body.inputs = definition.names.slice(0);
        }
        scripts = child.childNamed('scripts');
        if (scripts) {
            definition.scripts = myself.loadScriptsArray(scripts);
        }

        delete definition.names;
    });
};

SnapSerializer.prototype.loadScripts = function (scripts, model) {
    // private
    var myself = this,
        scale = SyntaxElementMorph.prototype.scale;
    scripts.texture = 'scriptsPaneTexture.gif';
    model.children.forEach(function (child) {
        var element;
        if (child.tag === 'script') {
            element = myself.loadScript(child);
            if (!element) {
                return;
            }
            element.setPosition(new Point(
                (+child.attributes.x || 0) * scale,
                (+child.attributes.y || 0) * scale
            ).add(scripts.topLeft()));
            scripts.add(element);
            element.fixBlockColor(null, true); // force zebra coloring
            element.allComments().forEach(function (comment) {
                comment.align(element);
            });
        } else if (child.tag === 'comment') {
            element = myself.loadComment(child);
            if (!element) {
                return;
            }
            element.setPosition(new Point(
                (+child.attributes.x || 0) * scale,
                (+child.attributes.y || 0) * scale
            ).add(scripts.topLeft()));
            scripts.add(element);
        }
    });
};

SnapSerializer.prototype.loadScriptsArray = function (model) {
    // private - answer an array containting the model's scripts
    var myself = this,
        scale = SyntaxElementMorph.prototype.scale,
        scripts = [];
    model.children.forEach(function (child) {
        var element;
        if (child.tag === 'script') {
            element = myself.loadScript(child);
            if (!element) {
                return;
            }
            element.setPosition(new Point(
                (+child.attributes.x || 0) * scale,
                (+child.attributes.y || 0) * scale
            ));
            scripts.push(element);
            element.fixBlockColor(null, true); // force zebra coloring
        } else if (child.tag === 'comment') {
            element = myself.loadComment(child);
            if (!element) {
                return;
            }
            element.setPosition(new Point(
                (+child.attributes.x || 0) * scale,
                (+child.attributes.y || 0) * scale
            ));
            scripts.push(element);
        }
    });
    return scripts;
};

SnapSerializer.prototype.loadScript = function (model) {
    // private
    var topBlock, block, nextBlock,
        myself = this;
    model.children.forEach(function (child) {
        nextBlock = myself.loadBlock(child);
        if (!nextBlock) {
            return;
        }
        if (block) {
            block.nextBlock(nextBlock);
        } else {
            topBlock = nextBlock;
        }
        block = nextBlock;
    });
    return topBlock;
};

SnapSerializer.prototype.loadComment = function (model) {
    // private
    var comment = new CommentMorph(model.contents),
        scale = SyntaxElementMorph.prototype.scale;
    comment.isCollapsed = (model.attributes.collapsed === 'true');
    comment.setTextWidth(+model.attributes.w * scale);
    return comment;
};

SnapSerializer.prototype.loadBlock = function (model, isReporter) {
    // private
    var block, info, inputs, isGlobal, rm, receiver;
    if (model.tag === 'block') {
        if (model.attributes.hasOwnProperty('var')) {
            return SpriteMorph.prototype.variableBlock(
                model.attributes['var']
            );
        }
        block = SpriteMorph.prototype.blockForSelector(model.attributes.s);
    } else if (model.tag === 'custom-block') {
        isGlobal = model.attributes.scope ? false : true;
        receiver = isGlobal ? this.project.stage
            : this.project.sprites[model.attributes.scope];
        rm = model.childNamed('receiver');
        if (rm && rm.children[0]) {
            receiver = this.loadValue(
                model.childNamed('receiver').children[0]
            );
        }
        if (!receiver) {
            return this.obsoleteBlock(isReporter);
        }
        if (isGlobal) {
            info = detect(receiver.globalBlocks, function (block) {
                return block.blockSpec() === model.attributes.s;
            });
            if (!info && this.project.targetStage) { // importing block files
                info = detect(
                    this.project.targetStage.globalBlocks,
                    function (block) {
                        return block.blockSpec() === model.attributes.s;
                    }
                );
            }
        } else {
            info = detect(receiver.customBlocks, function (block) {
                return block.blockSpec() === model.attributes.s;
            });
        }
        if (!info) {
            return this.obsoleteBlock(isReporter);
        }
        block = info.type === 'command' ? new CustomCommandBlockMorph(
            info,
            false
        ) : new CustomReporterBlockMorph(
            info,
            info.type === 'predicate',
            false
        );
    }
    if (block === null) {
        block = this.obsoleteBlock(isReporter);
    }
    block.isDraggable = true;
    inputs = block.inputs();
    model.children.forEach(function (child, i) {
        if (child.tag === 'comment') {
            block.comment = this.loadComment(child);
            block.comment.block = block;
        } else if (child.tag === 'receiver') {
            nop(); // ignore
        } else {
            this.loadInput(child, inputs[i], block);
        }
    }, this);
    return block;
};

SnapSerializer.prototype.obsoleteBlock = function (isReporter) {
    // private
    var block = isReporter ? new ReporterBlockMorph()
            : new CommandBlockMorph();
    block.selector = 'nop';
    block.color = new Color(200, 0, 20);
    block.setSpec('Obsolete!');
    block.isDraggable = true;
    return block;
};

SnapSerializer.prototype.loadInput = function (model, input, block) {
    // private
    var inp, val, myself = this;
    if (model.tag === 'script') {
        inp = this.loadScript(model);
        if (inp) {
            input.add(inp);
            input.fixLayout();
        }
    } else if (model.tag === 'autolambda' && model.children[0]) {
        inp = this.loadBlock(model.children[0], true);
        if (inp) {
            input.silentReplaceInput(input.children[0], inp);
            input.fixLayout();
        }
    } else if (model.tag === 'list') {
        while (input.inputs().length > 0) {
            input.removeInput();
        }
        model.children.forEach(function (item) {
            input.addInput();
            myself.loadInput(
                item,
                input.children[input.children.length - 2],
                input
            );
        });
        input.fixLayout();
    } else if (model.tag === 'block' || model.tag === 'custom-block') {
        block.silentReplaceInput(input, this.loadBlock(model, true));
    } else if (model.tag === 'color') {
        input.setColor(this.loadColor(model.contents));
    } else {
        val = this.loadValue(model);
        if (val) {
            input.setContents(this.loadValue(model));
        }
    }
};

SnapSerializer.prototype.loadValue = function (model) {
    // private
    var v, items, el, center, image, name, audio, option,
        myself = this;

    function record() {
        if (model.attributes.hasOwnProperty('id')) {
            myself.objects[model.attributes.id] = v;
        }
        if (model.attributes.hasOwnProperty('mediaID')) {
            myself.mediaDict[model.attributes.mediaID] = v;
        }
    }
    switch (model.tag) {
    case 'ref':
        if (model.attributes.hasOwnProperty('id')) {
            return this.objects[model.attributes.id];
        }
        if (model.attributes.hasOwnProperty('mediaID')) {
            return this.mediaDict[model.attributes.mediaID];
        }
        throw new Error('expecting a reference id');
    case 'l':
        option = model.childNamed('option');
        return option ? [option.contents] : model.contents;
    case 'bool':
        return model.contents === 'true';
    case 'list':
        if (model.attributes.hasOwnProperty('linked')) {
            items = model.childrenNamed('item');
            if (items.length === 0) {
                v = new List();
                record();
                return v;
            }
            items.forEach(function (item) {
                var value = item.children[0];
                if (v === undefined) {
                    v = new List();
                    record();
                } else {
                    v = v.rest = new List();
                }
                v.isLinked = true;
                if (!value) {
                    v.first = 0;
                } else {
                    v.first = myself.loadValue(value);
                }
            });
            return v;
        }
        v = new List();
        record();
        v.contents = model.childrenNamed('item').map(function (item) {
            var value = item.children[0];
            if (!value) {
                return 0;
            }
            return myself.loadValue(value);
        });
        return v;
    case 'sprite':
        v  = new SpriteMorph(myself.project.globalVariables);
        if (model.attributes.id) {
            myself.objects[model.attributes.id] = v;
        }
        if (model.attributes.name) {
            v.name = model.attributes.name;
            myself.project.sprites[model.attributes.name] = v;
        }
        if (model.attributes.idx) {
            v.idx = +model.attributes.idx;
        }
        if (model.attributes.color) {
            v.color = myself.loadColor(model.attributes.color);
        }
        if (model.attributes.pen) {
            v.penPoint = model.attributes.pen;
        }
        myself.project.stage.add(v);
        v.scale = parseFloat(model.attributes.scale || '1');
        v.rotationStyle = parseFloat(
            model.attributes.rotation || '1'
        );
        v.isDraggable = model.attributes.draggable !== 'false';
        v.isVisible = model.attributes.hidden !== 'true';
        v.heading = parseFloat(model.attributes.heading) || 0;
        v.drawNew();
        v.gotoXY(+model.attributes.x || 0, +model.attributes.y || 0);
        myself.loadObject(v, model);
        return v;
    case 'context':
        v = new Context(null);
        record();
        el = model.childNamed('script');
        if (el) {
            v.expression = this.loadScript(el);
        } else {
            el = model.childNamed('block') ||
                model.childNamed('custom-block');
            if (el) {
                v.expression = this.loadBlock(el);
            } else {
                el = model.childNamed('l');
                if (el) {
                    v.expression = new InputSlotMorph(el.contents);
                }
            }
        }
        el = model.childNamed('receiver');
        if (el) {
            el = el.childNamed('ref') || el.childNamed('sprite');
            if (el) {
                v.receiver = this.loadValue(el);
            }
        }
        el = model.childNamed('inputs');
        if (el) {
            el.children.forEach(function (item) {
                if (item.tag === 'input') {
                    v.inputs.push(item.contents);
                }
            });
        }
        el = model.childNamed('variables');
        if (el) {
            this.loadVariables(v.variables, el);
        }
        el = model.childNamed('context');
        if (el) {
            v.outerContext = this.loadValue(el);
        }
        return v;
    case 'costume':
        center = new Point();
        if (model.attributes.hasOwnProperty('center-x')) {
            center.x = parseFloat(model.attributes['center-x']);
        }
        if (model.attributes.hasOwnProperty('center-y')) {
            center.y = parseFloat(model.attributes['center-y']);
        }
        if (model.attributes.hasOwnProperty('name')) {
            name = model.attributes.name;
        }
        if (model.attributes.hasOwnProperty('image')) {
            image = new Image();
            if (model.attributes.image.indexOf('data:image/svg+xml') === 0
                    && !MorphicPreferences.rasterizeSVGs) {
                v = new SVG_Costume(null, name, center);
                image.onload = function () {
                    v.contents = image;
                    v.version = +new Date();
                    if (typeof v.loaded === 'function') {
                        v.loaded();
                    } else {
                        v.loaded = true;
                    }
                };
            } else {
                v = new Costume(null, name, center);
                image.onload = function () {
                    var canvas = newCanvas(
                            new Point(image.width, image.height)
                        ),
                        context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0);
                    v.contents = canvas;
                    v.version = +new Date();
                    if (typeof v.loaded === 'function') {
                        v.loaded();
                    } else {
                        v.loaded = true;
                    }
                };
            }
            image.src = model.attributes.image;
        }
        record();
        return v;
    case 'sound':
        audio = new Audio();
        audio.src = model.attributes.sound;
        v = new Sound(audio, model.attributes.name);
        if (model.attributes.hasOwnProperty('mediaID')) {
            myself.mediaDict[model.attributes.mediaID] = v;
        }
        return v;
    }
    return undefined;
};

SnapSerializer.prototype.loadColor = function (colorString) {
    // private
    var c = (colorString || '').split(',');
    return new Color(
        parseFloat(c[0]),
        parseFloat(c[1]),
        parseFloat(c[2]),
        parseFloat(c[3])
    );
};

SnapSerializer.prototype.openProject = function (project, ide) {
    var stage = ide.stage,
        sprites = [],
        sprite,
        scripts;
    if (!project || !project.stage) {
        return;
    }
    ide.projectName = project.name;
    ide.projectNotes = project.notes || '';
    if (ide.globalVariables) {
        ide.globalVariables = project.globalVariables;
    }
    if (stage) {
        stage.destroy();
    }
    ide.add(ide.stage = project.stage);
    sprites = ide.stage.children.filter(function (child) {
        return child instanceof SpriteMorph;
    });
    sprites.sort(function (x, y) {
        return x.idx - y.idx;
    });
    ide.sprites = new List(sprites);
    sprite = sprites[0] || project.stage;
    scripts = sprite.scripts;

    if (sizeOf(this.mediaDict) > 0) {
        ide.hasChangedMedia = false;
        this.mediaDict = {};
    } else {
        ide.hasChangedMedia = true;
    }
    project.stage.drawNew();
    ide.createCorral();
    ide.selectSprite(sprite);
    ide.fixLayout();
    ide.world().keyboardReceiver = project.stage;
};

// SnapSerializer XML-representation of objects:

// Generics

Array.prototype.toXML = function (serializer) {
    return this.reduce(function (xml, item) {
        return xml + serializer.store(item);
    }, '');
};

// Sprites

StageMorph.prototype.toXML = function (serializer) {
    var thumbnail = this.thumbnail(SnapSerializer.prototype.thumbnailSize),
        thumbdata,
        ide = this.parentThatIsA(IDE_Morph);

    // catch cross-origin tainting exception when using SVG costumes
    try {
        thumbdata = thumbnail.toDataURL('image/png');
    } catch (error) {
        thumbdata = null;
    }

    this.removeAllClones();
    return serializer.format(
        '<project name="@" app="@" version="@">' +
            '<notes>$</notes>' +
            '<thumbnail>$</thumbnail>' +
            '<stage name="@" costume="@" tempo="@" threadsafe="@" ' +
            'scheduled="@" ~>' +
            '<pentrails>$</pentrails>' +
            '<costumes>%</costumes>' +
            '<sounds>%</sounds>' +
            '<variables>%</variables>' +
            '<blocks>%</blocks>' +
            '<scripts>%</scripts><sprites>%</sprites>' +
            '</stage>' +
            '<blocks>%</blocks>' +
            '<variables>%</variables>' +
            '</project>',
        (ide && ide.projectName) ? ide.projectName : 'Untitled',
        serializer.app,
        serializer.version,
        (ide && ide.projectNotes) ? ide.projectNotes : '',
        thumbdata,
        this.name,
        this.getCostumeIdx(),
        this.getTempo(),
        this.isThreadSafe,
        StageMorph.prototype.frameRate !== 0,
        this.trailsCanvas.toDataURL('image/png'),
        serializer.store(this.costumes, this.name + '_cst'),
        serializer.store(this.sounds, this.name + '_snd'),
        serializer.store(this.variables),
        serializer.store(this.customBlocks),
        serializer.store(this.scripts),
        serializer.store(this.children),
        serializer.store(this.globalBlocks),
        (ide && ide.globalVariables) ?
                    serializer.store(ide.globalVariables) : ''
    );
};

SpriteMorph.prototype.toXML = function (serializer) {
    var stage = this.parentThatIsA(StageMorph),
        position = stage ?
                this.center().subtract(stage.center()) : this.center(),
        ide = stage ? stage.parentThatIsA(IDE_Morph) : null,
        idx = ide ? ide.sprites.asArray().indexOf(this) + 1 : 0;

    return serializer.format(
        '<sprite name="@" idx="@" x="@" y="@"' +
            ' heading="@"' +
            ' scale="@"' +
            ' rotation="@"' +
            ' draggable="@"' +
            '%' +
            ' costume="@" color="@,@,@" pen="@" ~>' +
            '<costumes>%</costumes>' +
            '<sounds>%</sounds>' +
            '<variables>%</variables>' +
            '<blocks>%</blocks>' +
            '<scripts>%</scripts>' +
            '</sprite>',
        this.name,
        idx,
        position.x,
        -position.y,
        this.heading,
        this.scale,
        this.rotationStyle,
        this.isDraggable,
        this.isVisible ? '' : ' hidden="true"',
        this.getCostumeIdx(),
        this.color.r,
        this.color.g,
        this.color.b,
        this.penPoint,
        serializer.store(this.costumes, this.name + '_cst'),
        serializer.store(this.sounds, this.name + '_snd'),
        serializer.store(this.variables),
        !this.customBlocks ?
                    '' : serializer.store(this.customBlocks),
        serializer.store(this.scripts)
    );
};

Costume.prototype[XML_Serializer.prototype.mediaDetectionProperty] = true;

Costume.prototype.toXML = function (serializer) {
    return serializer.format(
        '<costume name="@" center-x="@" center-y="@" image="@" ~/>',
        this.name,
        this.rotationCenter.x,
        this.rotationCenter.y,
        this instanceof SVG_Costume ?
                this.contents.src : this.contents.toDataURL('image/png')
    );
};

Sound.prototype[XML_Serializer.prototype.mediaDetectionProperty] = true;

Sound.prototype.toXML = function (serializer) {
    return serializer.format(
        '<sound name="@" sound="@" ~/>',
        this.name,
        this.toDataURL()
    );
};

VariableFrame.prototype.toXML = function (serializer) {
    var myself = this;
    return Object.keys(this.vars).reduce(function (vars, v) {
        var val = myself.vars[v],
            dta;
        if (val === undefined || val === null) {
            dta = serializer.format('<variable name="@"/>', v);
        } else {
            dta = serializer.format(
                '<variable name="@">%</variable>',
                v,
                typeof val === 'object' ? serializer.store(val)
                        : typeof val === 'boolean' ?
                                serializer.format('<bool>$</bool>', val)
                                : serializer.format('<l>$</l>', val)
            );
        }
        return vars + dta;
    }, '');
};



// Watchers

WatcherMorph.prototype.toXML = function (serializer) {
    var isVar = this.target instanceof VariableFrame,
        isList = this.currentValue instanceof List,
        color = this.readoutColor,
        position = this.parent ?
                this.topLeft().subtract(this.parent.topLeft())
                : this.topLeft();

    return serializer.format(
        '<watcher% % style="@"% x="@" y="@" color="@,@,@"%%/>',
        (isVar && this.target.owner) || (!isVar && this.target) ?
                    serializer.format(' scope="@"',
                        isVar ? this.target.owner.name : this.target.name)
                            : '',
        serializer.format(isVar ? 'var="@"' : 's="@"', this.getter),
        this.style,
        isVar && this.style === 'slider' ? serializer.format(
                ' min="@" max="@"',
                this.sliderMorph.start,
                this.sliderMorph.stop
            ) : '',
        position.x,
        position.y,
        color.r,
        color.g,
        color.b,
        !isList ? ''
                : serializer.format(
                ' extX="@" extY="@"',
                this.cellMorph.contentsMorph.width(),
                this.cellMorph.contentsMorph.height()
            ),
        this.isVisible ? '' : ' hidden="true"'
    );
};

// Scripts

ScriptsMorph.prototype.toXML = function (serializer) {
    return this.children.reduce(function (xml, child) {
        if (child instanceof BlockMorph) {
            return xml + child.toScriptXML(serializer, true);
        }
        if (child instanceof CommentMorph && !child.block) { // unattached
            return xml + child.toXML(serializer);
        }
        return xml;
    }, '');
};

BlockMorph.prototype.toXML = BlockMorph.prototype.toScriptXML = function (
    serializer,
    savePosition
) {
    var position,
        xml,
        scale = SyntaxElementMorph.prototype.scale,
        block = this;

    // determine my position
    if (this.parent) {
        position = this.topLeft().subtract(this.parent.topLeft());
    } else {
        position = this.topLeft();
    }

    // save my position to xml
    if (savePosition) {
        xml = serializer.format(
            '<script x="@" y="@">',
            position.x / scale,
            position.y / scale
        );
    } else {
        xml = '<script>';
    }

    // recursively add my next blocks to xml
    do {
        xml += block.toBlockXML(serializer);
        block = block.nextBlock();
    } while (block);
    xml += '</script>';
    return xml;
};

BlockMorph.prototype.toBlockXML = function (serializer) {
    return serializer.format(
        '<block s="@">%%</block>',
        this.selector,
        serializer.store(this.inputs()),
        this.comment ? this.comment.toXML(serializer) : ''
    );
};

ReporterBlockMorph.prototype.toXML = function (serializer) {
    return this.selector === 'reportGetVar' ? serializer.format(
        '<block var="@"/>',
        this.blockSpec
    ) : this.toBlockXML(serializer);
};

ReporterBlockMorph.prototype.toScriptXML = function (
    serializer,
    savePosition
) {
    var position,
        scale = SyntaxElementMorph.prototype.scale;

    // determine my save-position
    if (this.parent) {
        position = this.topLeft().subtract(this.parent.topLeft());
    } else {
        position = this.topLeft();
    }

    if (savePosition) {
        return serializer.format(
            '<script x="@" y="@">%</script>',
            position.x / scale,
            position.y / scale,
            this.toXML(serializer)
        );
    }
    return serializer.format('<script>%</script>', this.toXML(serializer));
};

CustomCommandBlockMorph.prototype.toBlockXML = function (serializer) {
    var scope = this.definition.isGlobal ? undefined
        : this.definition.receiver.name;
    return serializer.format(
        '<custom-block s="@"%>%%%</custom-block>',
        this.blockSpec,
        this.definition.isGlobal ?
                '' : serializer.format(' scope="@"', scope),
        serializer.store(this.inputs()),
        this.comment ? this.comment.toXML(serializer) : '',
        scope && !this.definition.receiver[serializer.idProperty] ?
                '<receiver>' +
                    serializer.store(this.definition.receiver) +
                    '</receiver>'
                        : ''
    );
};

CustomReporterBlockMorph.prototype.toBlockXML
    = CustomCommandBlockMorph.prototype.toBlockXML;

CustomBlockDefinition.prototype.toXML = function (serializer) {
    var myself = this;

    function encodeScripts(array) {
        return array.reduce(function (xml, element) {
            if (element instanceof BlockMorph) {
                return xml + element.toScriptXML(serializer, true);
            }
            if (element instanceof CommentMorph && !element.block) {
                return xml + element.toXML(serializer);
            }
            return xml;
        }, '');
    }

    return serializer.format(
        '<block-definition s="@" type="@" category="@">' +
            '<inputs>%</inputs>%%' +
            '</block-definition>',
        this.spec,
        this.type,
        this.category || 'other',
        Object.keys(this.declarations).reduce(function (xml, decl) {
                return xml + serializer.format(
                    '<input type="@">$</input>',
                    myself.declarations[decl][0],
                    myself.declarations[decl][1]
                );
            }, ''),
        this.body ? serializer.store(this.body.expression) : '',
        this.scripts.length > 0 ?
                    '<scripts>' + encodeScripts(this.scripts) + '</scripts>'
                        : ''
    );
};

// Scripts - Inputs

ArgMorph.prototype.toXML = function () {
    return '<l/>'; // empty by default
};

InputSlotMorph.prototype.toXML = function (serializer) {
    if (this.constant) {
        return serializer.format(
            '<l><option>$</option></l>',
            this.constant
        );
    }
    return serializer.format('<l>$</l>', this.contents().text);
};

TemplateSlotMorph.prototype.toXML = function (serializer) {
    return serializer.format('<l>$</l>', this.contents());
};

CommandSlotMorph.prototype.toXML = function (serializer) {
    var block = this.children[0];
    if (block instanceof BlockMorph) {
        if (block instanceof ReporterBlockMorph) {
            return serializer.format(
                '<autolambda>%</autolambda>',
                serializer.store(block)
            );
        }
        return serializer.store(block);
    }
    return '<script></script>';
};

FunctionSlotMorph.prototype.toXML = CommandSlotMorph.prototype.toXML;

MultiArgMorph.prototype.toXML = function (serializer) {
    return serializer.format(
        '<list>%</list>',
        serializer.store(this.inputs())
    );
};

ArgLabelMorph.prototype.toXML = function (serializer) {
    return serializer.format(
        '%',
        serializer.store(this.inputs()[0])
    );
};

ColorSlotMorph.prototype.toXML = function (serializer) {
    return serializer.format(
        '<color>$,$,$,$</color>',
        this.color.r,
        this.color.g,
        this.color.b,
        this.color.a
    );
};

// Values

List.prototype.toXML = function (serializer, mediaContext) {
    // mediaContext is an optional name-stub
    // when collecting media into a separate module
    var xml, item;
    if (this.isLinked) {
        xml = '<list linked="linked" ~>';
        item = this;
        do {
            xml += serializer.format(
                '<item>%</item>',
                serializer.store(item.first)
            );
            item = item.rest;
        } while (item !== undefined && (item !== null));
        return xml + '</list>';
    }
    return serializer.format(
        '<list ~>%</list>',
        this.contents.reduce(function (xml, item) {
            return xml + serializer.format(
                '<item>%</item>',
                typeof item === 'object' ?
                        serializer.store(item, mediaContext)
                        : typeof item === 'boolean' ?
                                serializer.format('<bool>$</bool>', item)
                                : serializer.format('<l>$</l>', item)
            );
        }, '')
    );
};


Context.prototype.toXML = function (serializer) {
    if (this.isContinuation) { // continuations are transient in Snap!
        return '';
    }
    return serializer.format(
        '<context% ~><inputs>%</inputs><variables>%</variables>' +
            '%<receiver>%</receiver>%</context>',
        this.isLambda ? ' lambda="lambda"' : '',
        this.inputs.reduce(
                function (xml, input) {
                    return xml + serializer.format('<input>$</input>', input);
                },
                ''
            ),
        this.variables ? serializer.store(this.variables) : '',
        this.expression ? serializer.store(this.expression) : '',
        this.receiver ? serializer.store(this.receiver) : '',
        this.outerContext ? serializer.store(this.outerContext) : ''
    );
};

// Comments

CommentMorph.prototype.toXML = function (serializer) {
    var position,
        scale = SyntaxElementMorph.prototype.scale;

    if (this.block) { // attached to a block
        return serializer.format(
            '<comment w="@" collapsed="@">%</comment>',
            this.textWidth() / scale,
            this.isCollapsed,
            serializer.escape(this.text())
        );
    }

    // free-floating, determine my save-position
    if (this.parent) {
        position = this.topLeft().subtract(this.parent.topLeft());
    } else {
        position = this.topLeft();
    }
    return serializer.format(
        '<comment x="@" y="@" w="@" collapsed="@">%</comment>',
        position.x / scale,
        position.y / scale,
        this.textWidth() / scale,
        this.isCollapsed,
        serializer.escape(this.text())
    );
};
