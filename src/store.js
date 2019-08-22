/*

    store.js

    saving and loading Snap! projects

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2019 by Jens Mönig

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

/*global modules, XML_Element, VariableFrame, StageMorph, SpriteMorph,
WatcherMorph, Point, CustomBlockDefinition, Context, ReporterBlockMorph,
CommandBlockMorph, detect, CustomCommandBlockMorph, CustomReporterBlockMorph,
Color, List, newCanvas, Costume, Sound, Audio, IDE_Morph, ScriptsMorph,
BlockMorph, ArgMorph, InputSlotMorph, TemplateSlotMorph, CommandSlotMorph,
FunctionSlotMorph, MultiArgMorph, ColorSlotMorph, nop, CommentMorph, isNil,
localize, sizeOf, ArgLabelMorph, SVG_Costume, MorphicPreferences, Process,
SyntaxElementMorph, Variable, isSnapObject, console, BooleanSlotMorph,
normalizeCanvas, contains*/

// Global stuff ////////////////////////////////////////////////////////

modules.store = '2019-August-08';


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
    this.isExportingBlocksLibrary = false;
}

// XML_Serializer preferences settings:

XML_Serializer.prototype.idProperty = 'serializationID';
XML_Serializer.prototype.mediaIdProperty = 'serializationMediaID';
XML_Serializer.prototype.mediaDetectionProperty = 'isMedia';
XML_Serializer.prototype.version = 1; // increment on structural change

// XML_Serializer accessing:

XML_Serializer.prototype.serialize = function (object, forBlocksLibrary) {
    // public: answer an XML string representing the given object
    var xml;
    this.flush(); // in case an error occurred in an earlier attempt
    this.flushMedia();
    this.isExportingBlocksLibrary = forBlocksLibrary;
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
    this.isExportingBlocksLibrary = false;
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

        if (isNaN(index)) {
            i += 1;
            value = values[i + 1];
        } else {
            value = values[index + 1];
        }
        // original line of code - now frowned upon by JSLint:
        // value = values[(isNaN(index) ? (i += 1) : index) + 1];

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

SnapSerializer.prototype.app = 'Snap! 5.1, http://snap.berkeley.edu';

SnapSerializer.prototype.thumbnailSize = new Point(160, 120);

SnapSerializer.prototype.watcherLabels = {
    xPosition: 'x position',
    yPosition: 'y position',
    direction: 'direction',
    getScale: 'size',
    reportShown: 'shown?',
    getTempo: 'tempo',
    getVolume: 'volume',
    getPan: 'balance',
    getPenDown: 'pen down?',
    getLastAnswer: 'answer',
    getLastMessage: 'message',
    getTimer: 'timer',
    getCostumeIdx: 'costume #',
    reportMouseX: 'mouse x',
    reportMouseY: 'mouse y',
    reportThreadCount: 'processes'
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

SnapSerializer.prototype.load = function (xmlString, ide) {
    // public - answer a new Project represented by the given XML String
    return this.loadProjectModel(this.parse(xmlString), ide);
};

SnapSerializer.prototype.loadProjectModel = function (xmlNode, ide, remixID) {
    // public - answer a new Project represented by the given XML top node
    // show a warning if the origin apps differ

    var appInfo = xmlNode.attributes.app,
        app = appInfo ? appInfo.split(' ')[0] : null;

    if (ide && app && app !== this.app.split(' ')[0]) {
        ide.inform(
            app + ' Project',
            'This project has been created by a different app:\n\n' +
                app +
                '\n\nand may be incompatible or fail to load here.'
        );
    }
    return this.rawLoadProjectModel(xmlNode, remixID);
};

SnapSerializer.prototype.rawLoadProjectModel = function (xmlNode, remixID) {
    // private
    var myself = this,
        project = {sprites: {}},
        model,
        nameID;

    this.project = project;

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
            Object.prototype.hasOwnProperty.call(
                localStorage,
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
    project.stage.remixID = remixID;
    if (Object.prototype.hasOwnProperty.call(
            model.stage.attributes,
            'id'
        )) {
        this.objects[model.stage.attributes.id] = project.stage;
    }
    if (model.stage.attributes.name) {
        project.stage.name = model.stage.attributes.name;
    }
    if (model.stage.attributes.color) {
        project.stage.color = this.loadColor(model.stage.attributes.color);
        project.stage.cachedHSV = project.stage.color.hsv();
    }
    if (model.stage.attributes.scheduled === 'true') {
        project.stage.fps = 30;
        StageMorph.prototype.frameRate = 30;
    }
    if (model.stage.attributes.volume) {
        project.stage.volume = +model.stage.attributes.volume;
    }
    if (model.stage.attributes.pan) {
        project.stage.pan = +model.stage.attributes.pan;
    }

    model.pentrails = model.stage.childNamed('pentrails');
    if (model.pentrails) {
        project.pentrails = new Image();
        project.pentrails.onload = function () {
            if (project.stage.trailsCanvas) { // work-around a bug in FF
                normalizeCanvas(project.stage.trailsCanvas);
                var context = project.stage.trailsCanvas.getContext('2d');
                context.drawImage(project.pentrails, 0, 0);
                project.stage.changed();
            }
        };
        project.pentrails.src = model.pentrails.contents;
    }
    project.stage.setTempo(model.stage.attributes.tempo);
    StageMorph.prototype.dimensions = new Point(480, 360);
    if (model.stage.attributes.width) {
        StageMorph.prototype.dimensions.x =
            Math.max(+model.stage.attributes.width, 240);
    }
    if (model.stage.attributes.height) {
        StageMorph.prototype.dimensions.y =
            Math.max(+model.stage.attributes.height, 180);
    }
    project.stage.setExtent(StageMorph.prototype.dimensions);
    SpriteMorph.prototype.useFlatLineEnds =
        model.stage.attributes.lines === 'flat';
    BooleanSlotMorph.prototype.isTernary =
        model.stage.attributes.ternary !== 'false';
    project.stage.isThreadSafe =
        model.stage.attributes.threadsafe === 'true';
    StageMorph.prototype.enableCodeMapping =
        model.stage.attributes.codify === 'true';
    StageMorph.prototype.enableInheritance =
        model.stage.attributes.inheritance !== 'false';
    StageMorph.prototype.enableSublistIDs =
        model.stage.attributes.sublistIDs === 'true';

    model.hiddenPrimitives = model.project.childNamed('hidden');
    if (model.hiddenPrimitives) {
        model.hiddenPrimitives.contents.split(' ').forEach(
            function (sel) {
                if (sel) {
                    StageMorph.prototype.hiddenPrimitives[sel] = true;
                }
            }
        );
    }

    model.codeHeaders = model.project.childNamed('headers');
    if (model.codeHeaders) {
        model.codeHeaders.children.forEach(function (xml) {
            StageMorph.prototype.codeHeaders[xml.tag] = xml.contents;
        });
    }

    model.codeMappings = model.project.childNamed('code');
    if (model.codeMappings) {
        model.codeMappings.children.forEach(function (xml) {
            StageMorph.prototype.codeMappings[xml.tag] = xml.contents;
        });
    }

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

    // restore inheritance and nesting associations
    myself.project.stage.children.forEach(function (sprite) {
        var exemplar, anchor;
        if (sprite.inheritanceInfo) { // only sprites can inherit
            exemplar = myself.project.sprites[
                sprite.inheritanceInfo.exemplar
            ];
            if (exemplar) {
                sprite.setExemplar(exemplar);
            }
            sprite.inheritedAttributes = sprite.inheritanceInfo.delegated || [];
            sprite.updatePropagationCache();
        }
        if (sprite.nestingInfo) { // only sprites may have nesting info
            anchor = myself.project.sprites[sprite.nestingInfo.anchor];
            if (anchor) {
                anchor.attachPart(sprite);
            }
            sprite.rotatesWithAnchor = (sprite.nestingInfo.synch === 'true');
        }
    });
    myself.project.stage.children.forEach(function (sprite) {
        var costume;
        if (sprite.nestingInfo) { // only sprites may have nesting info
            sprite.nestingScale = +(sprite.nestingInfo.scale || sprite.scale);
            delete sprite.nestingInfo;
        }
        ['scripts', 'costumes', 'sounds'].forEach(function (att) {
            if (sprite.inheritsAttribute(att)) {
                sprite.refreshInheritedAttribute(att);
            }
        });
        if (sprite.inheritsAttribute('costumes')) {
            if (sprite.inheritsAttribute('costume #')) {
                costume = sprite.exemplar.costume;
            } else {
                costume = sprite.costumes.asArray()[
                    sprite.inheritanceInfo.costumeNumber - 1
                ];
            }
            if (costume) {
                if (costume.loaded) {
                    sprite.wearCostume(costume, true);
                } else {
                    costume.loaded = function () {
                        sprite.wearCostume(costume, true);
                        this.loaded = true;
                    };
                }
            }
        }
        delete sprite.inheritanceInfo;
    });

    /* Global Variables */

    if (model.globalVariables) {
        this.loadVariables(
            project.globalVariables,
            model.globalVariables
        );
    }

    this.objects = {};

    /* Watchers */

    model.sprites.childrenNamed('watcher').forEach(function (model) {
        var watcher, color, target, hidden, extX, extY;

        color = myself.loadColor(model.attributes.color);
        target = Object.prototype.hasOwnProperty.call(
            model.attributes,
            'scope'
        ) ? project.sprites[model.attributes.scope] : null;

        // determine whether the watcher is hidden, slightly
        // complicated to retain backward compatibility
        // with former tag format: hidden="hidden"
        // now it's: hidden="true"
        hidden = Object.prototype.hasOwnProperty.call(
            model.attributes,
            'hidden'
        ) && (model.attributes.hidden !== 'false');

        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'var'
            )) {
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
            watcher.setSliderMin(model.attributes.min || '1', true);
            watcher.setSliderMax(model.attributes.max || '100', true);
        }
        watcher.setPosition(
            project.stage.topLeft().add(new Point(
                +model.attributes.x || 0,
                +model.attributes.y || 0
            ))
        );
        project.stage.add(watcher);
        watcher.onNextStep = function () {this.currentValue = null; };

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

    // clear sprites' inherited methods caches, if any
    myself.project.stage.children.forEach(function (sprite) {
        sprite.inheritedMethodsCache = [];
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
            sprite.name = ide.newSpriteName(model.attributes.name);
            project.sprites[sprite.name] = sprite;
        }
        if (model.attributes.color) {
            sprite.color = myself.loadColor(model.attributes.color);
            sprite.cachedHSV = sprite.color.hsv();
        }
        if (model.attributes.pen) {
            sprite.penPoint = model.attributes.pen;
        }
        if (model.attributes.volume) {
            sprite.volume = +model.attributes.volume;
        }
        if (model.attributes.pan) {
            sprite.pan = +model.attributes.pan;
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

    // restore inheritance and nesting associations
    project.stage.children.forEach(function (sprite) {
        var exemplar, anchor;
        if (sprite.inheritanceInfo) { // only sprites can inherit
            exemplar = project.sprites[
                sprite.inheritanceInfo.exemplar
            ];
            if (exemplar) {
                sprite.setExemplar(exemplar);
            }
        }
        if (sprite.nestingInfo) { // only sprites may have nesting info
            anchor = project.sprites[sprite.nestingInfo.anchor];
            if (anchor) {
                anchor.attachPart(sprite);
            }
            sprite.rotatesWithAnchor = (sprite.nestingInfo.synch === 'true');
        }
    });
    project.stage.children.forEach(function (sprite) {
        delete sprite.inheritanceInfo;
        if (sprite.nestingInfo) { // only sprites may have nesting info
            sprite.nestingScale = +(sprite.nestingInfo.scale || sprite.scale);
            delete sprite.nestingInfo;
        }
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
    var blocks = model.require('blocks'),
        dispatches = model.childNamed('dispatches'),
        node,
        costume;

    // load the instrument
    if (model.attributes.instrument) {
        object.instrument = +model.attributes.instrument;
    }

    this.loadInheritanceInfo(object, model);
    this.loadNestingInfo(object, model);

    // load the costume that's not in the wardrobe, if any
    node = model.childNamed('wear');
    if (node) {
        node = node.childNamed('costume') || node.childNamed('ref');
        if (!node) {
            console.log(object.name + ': missing costume to wear');
        } else {
            costume = this.loadValue(node, object);
            if (costume.loaded) {
                object.wearCostume(costume, true);
            } else {
                costume.loaded = function () {
                    object.wearCostume(costume, true);
                    this.loaded = true;
                };
            }
        }
    }

    // load costumes unless they're inherited
    if (!(object.inheritanceInfo &&
            (object.inheritanceInfo.delegated instanceof Array) &&
            contains(object.inheritanceInfo.delegated, 'costumes'))) {
        this.loadCostumes(object, model);
    }

    // load sounds unless they're inherited
    if (!(object.inheritanceInfo &&
            (object.inheritanceInfo.delegated instanceof Array) &&
            contains(object.inheritanceInfo.delegated, 'sounds'))) {
        this.loadSounds(object, model);
    }

    this.loadCustomBlocks(object, blocks);
    if (dispatches) {
        this.loadCustomBlocks(object, dispatches, false, true);
    }
    this.populateCustomBlocks(object, blocks);
    this.loadVariables(object.variables, model.require('variables'), object);

    // load scripts unless they're inherited
    if (!(object.inheritanceInfo &&
            (object.inheritanceInfo.delegated instanceof Array) &&
            contains(object.inheritanceInfo.delegated, 'scripts'))) {
        this.loadScripts(object, object.scripts, model.require('scripts'));
    }

    // note: the dispatches cache isn't cleared until after
    // *all* objects are loaded
};

SnapSerializer.prototype.loadInheritanceInfo = function (object, model) {
    // private
    var info = model.childNamed('inherit'),
        delegated;
    if (info) {
        object.inheritanceInfo = info.attributes;
        delegated = info.childNamed('list');
        if (delegated) {
            object.inheritanceInfo.delegated =
                this.loadValue(delegated).asArray();
        }
        object.inheritanceInfo.costumeNumber = model.attributes.costume;
    }
};

SnapSerializer.prototype.loadNestingInfo = function (object, model) {
    // private
    var info = model.childNamed('nest');
    if (info) {
        object.nestingInfo = info.attributes;
    }
};

SnapSerializer.prototype.loadCostumes = function (object, model) {
    // private
    var costumes = model.childNamed('costumes'),
        costume;
    if (costumes) {
        object.costumes = this.loadValue(costumes.require(
            'list',
            function () {
                console.log(object.name + ': missing required costumes list, ' +
                    'improvising...');
                return new XML_Element('list');
            }
        ));
        object.costumes.type = 'costume';
    }
    if (Object.prototype.hasOwnProperty.call(
            model.attributes,
            'costume'
        )) {
        costume = object.costumes.asArray()[model.attributes.costume - 1];
        if (costume) {
            if (costume.loaded) {
                object.wearCostume(costume, true);
            } else {
                costume.loaded = function () {
                    object.wearCostume(costume, true);
                    this.loaded = true;
                };
            }
        }
    }
};

SnapSerializer.prototype.loadSounds = function (object, model) {
    // private
    var sounds = model.childNamed('sounds');
    if (sounds) {
        // object.sounds = this.loadValue(sounds.require('list'));
        object.sounds = this.loadValue(sounds.require(
            'list',
            function () {
                console.log(object.name + ': missing required sounds list, ' +
                    'improvising...');
                return new XML_Element('list');
            }
        ));

        object.sounds.type = 'sound';
    }
};

SnapSerializer.prototype.loadVariables = function (varFrame, element, object) {
    // private
    var myself = this;

    element.children.forEach(function (child) {
        var v, value;
        if (child.tag !== 'variable') {
            return;
        }
        value = child.children[0];
        v = new Variable();
        v.isTransient = (child.attributes.transient === 'true');
        v.value = (v.isTransient || !value ) ? 0
                : myself.loadValue(value, object);
        varFrame.vars[child.attributes.name] = v;
    });
};

SnapSerializer.prototype.loadCustomBlocks = function (
    object,
    element,
    isGlobal,
    isDispatch
) {
    // private
    var myself = this;
    element.children.forEach(function (child) {
        var definition, names, inputs, vars, header, code, trans, comment, i;
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
        if (isDispatch) {
            object.inheritedMethodsCache.push(definition);
        } else {
            if (definition.isGlobal) {
                object.globalBlocks.push(definition);
            } else {
                object.customBlocks.push(definition);
            }
        }

        names = definition.parseSpec(definition.spec).filter(
            function (str) {
                return str.charAt(0) === '%' && str.length > 1;
            }
        ).map(function (str) {
            return str.substr(1);
        });

        definition.names = names;
        inputs = child.childNamed('inputs');
        if (inputs) {
            i = -1;
            inputs.children.forEach(function (child) {
                var options = child.childNamed('options');
                if (child.tag !== 'input') {
                    return;
                }
                i += 1;
                definition.declarations.set(
                    names[i],
                    [
                        child.attributes.type,
                        contains(['%b', '%boolUE'], child.attributes.type) ?
                            (child.contents ? child.contents === 'true' : null)
                                : child.contents,
                        options ? options.contents : undefined,
                        child.attributes.readonly === 'true'
                    ]
                );
            });
        }

        vars = child.childNamed('variables');
        if (vars) {
            definition.variableNames = myself.loadValue(
                vars.require('list')
            ).asArray();
        }

        header = child.childNamed('header');
        if (header) {
            definition.codeHeader = header.contents;
        }

        code = child.childNamed('code');
        if (code) {
            definition.codeMapping = code.contents;
        }

        trans = child.childNamed('translations');
        if (trans) {
            definition.updateTranslations(trans.contents);
        }

        comment = child.childNamed('comment');
        if (comment) {
            definition.comment = myself.loadComment(comment);
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
                script ? myself.loadScript(script, object) : null,
                null,
                object
            );
            definition.body.inputs = definition.names.slice(0);
        }
        scripts = child.childNamed('scripts');
        if (scripts) {
            definition.scripts = myself.loadScriptsArray(scripts, object);
        }

        delete definition.names;
    });
};

SnapSerializer.prototype.loadScripts = function (object, scripts, model) {
    // private
    var myself = this,
        scale = SyntaxElementMorph.prototype.scale;
    scripts.cachedTexture = IDE_Morph.prototype.scriptsPaneTexture;
    model.children.forEach(function (child) {
        var element;
        if (child.tag === 'script') {
            element = myself.loadScript(child, object);
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

SnapSerializer.prototype.loadScriptsArray = function (model, object) {
    // private - answer an array containting the model's scripts
    var myself = this,
        scale = SyntaxElementMorph.prototype.scale,
        scripts = [];
    model.children.forEach(function (child) {
        var element;
        if (child.tag === 'script') {
            element = myself.loadScript(child, object);
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

SnapSerializer.prototype.loadScript = function (model, object) {
    // private
    var topBlock, block, nextBlock,
        myself = this;

    // Check whether we're importing a single script, not a script as part of a
    // whole project
    if (!this.project.stage) {
        this.project.stage = object.parentThatIsA(StageMorph);
        this.project.targetStage = this.project.stage;
    }

    model.children.forEach(function (child) {
        nextBlock = myself.loadBlock(child, false, object);
        if (!nextBlock) {
            return;
        }
        if (block) {
            if (block.nextBlock && (nextBlock instanceof CommandBlockMorph)) {
                block.nextBlock(nextBlock);
            } else {
                console.log(
                    'SNAP: expecting a command but getting a reporter:\n' +
                        '  ' + block.blockSpec + '\n' +
                        '  ' + nextBlock.blockSpec
                );
                return topBlock;
            }
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

SnapSerializer.prototype.loadBlock = function (model, isReporter, object) {
    // private
    var block, info, inputs, isGlobal, receiver, migration,
        migrationOffset = 0;

    if (model.tag === 'block') {
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'var'
            )) {
            block = SpriteMorph.prototype.variableBlock(
                model.attributes['var']
            );
        } else {
        /*
        // disable JavaScript functions, commented out for now
        if (model.attributes.s === 'reportJSFunction' &&
                !Process.prototype.enableJS) {
            if (window.confirm('enable JavaScript?')) {
                Process.prototype.enableJS = true;
            } else {
                throw new Error('JavaScript is not enabled');
            }
        }
        */
            block = SpriteMorph.prototype.blockForSelector(model.attributes.s);
            migration = SpriteMorph.prototype.blockMigrations[
                model.attributes.s
            ];
            if (migration) {
                migrationOffset = migration.offset;
            }
        }
    } else if (model.tag === 'custom-block') {
        isGlobal = model.attributes.scope ? false : true;
        receiver = isGlobal ? this.project.stage : object;
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
            // lookup in inherited methods
            info = detect(receiver.customBlocks, function (block) {
                return block.blockSpec() === model.attributes.s;
            }) || (
            	receiver.inheritedMethodsCache ?
                	detect(receiver.inheritedMethodsCache, function (block) {
                    	return block.blockSpec() === model.attributes.s;
                	})
          		: null
          	);
        }
        if (!info || !contains(
        		// catch other forks' blocks
        		SpriteMorph.prototype.categories, info.category
        )) {
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
        if (child.tag === 'variables') {
            this.loadVariables(block.variables, child, object);
        } else if (child.tag === 'comment') {
            block.comment = this.loadComment(child);
            block.comment.block = block;
        } else if (child.tag === 'receiver') {
            nop(); // ignore
        } else {
            this.loadInput(child, inputs[i + migrationOffset], block, object);
        }
    }, this);
    block.cachedInputs = null;
    return block;
};

SnapSerializer.prototype.obsoleteBlock = function (isReporter) {
    // private
    var block = isReporter ? new ReporterBlockMorph()
            : new CommandBlockMorph();
    block.selector = 'errorObsolete';
    block.color = new Color(200, 0, 20);
    block.setSpec('Obsolete!');
    block.isDraggable = true;
    return block;
};

SnapSerializer.prototype.loadInput = function (model, input, block, object) {
    // private
    var inp, val, myself = this;
    if (isNil(input)) {
        return;
    }
    if (model.tag === 'script') {
        inp = this.loadScript(model, object);
        if (inp) {
            if (block.selector === 'reifyReporter') {
                input.silentReplaceInput(input.children[0], inp);
                input.fixLayout();
            } else {
                input.add(inp);
                input.fixLayout();
            }
        }
    } else if (model.tag === 'autolambda' && model.children[0]) {
        inp = this.loadBlock(model.children[0], true, object);
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
                input,
                object
            );
        });
        input.fixLayout();
    } else if (model.tag === 'block' || model.tag === 'custom-block') {
        block.silentReplaceInput(input, this.loadBlock(model, true, object));
    } else if (model.tag === 'color') {
        input.setColor(this.loadColor(model.contents));
    } else {
        val = this.loadValue(model);
        if (!isNil(val) && !isNil(input) && input.setContents) {
            // checking whether "input" is nil should not
            // be necessary, but apparently is after retina support
            // was added.
            input.setContents(this.loadValue(model));
        }
    }
};

SnapSerializer.prototype.loadValue = function (model, object) {
    // private
    var v, i, lst, items, el, center, image, name, audio, option, bool, origin,
    	wish, def,
        myself = this;

    function record() {
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'id'
            )) {
            myself.objects[model.attributes.id] = v;
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'mediaID'
            )) {
            myself.mediaDict[model.attributes.mediaID] = v;
        }
    }

    switch (model.tag) {
    case 'ref':
        if (Object.prototype.hasOwnProperty.call(model.attributes, 'id')) {
            return this.objects[model.attributes.id];
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'mediaID'
            )) {
            return this.mediaDict[model.attributes.mediaID];
        }
        throw new Error('expecting a reference id');
    case 'l':
        option = model.childNamed('option');
        if (option) {
            return [option.contents];
        }
        bool = model.childNamed('bool');
        if (bool) {
            return this.loadValue(bool);
        }
        wish = model.childNamed('wish');
        if (wish) {
            return this.loadValue(wish);
        }
        return model.contents;
    case 'bool':
        return model.contents === 'true';
    case 'list':
        if (model.attributes.hasOwnProperty('linked')) {
            if (model.attributes.struct === 'atomic') {
                v = Process.prototype.parseCSV(model.contents);
                v.becomeLinked();
                record();
                return v;
            }
            v = new List();
            v.isLinked = true;
            record();
            lst = v;
            items = model.childrenNamed('item');
            items.forEach(function (item, i) {
                var value = item.children[0];
                if (!value) {
                    v.first = 0;
                } else {
                    v.first = myself.loadValue(value, object);
                }
                var tail = model.childNamed('list') ||
                    model.childNamed('ref');
                if (tail) {
                    v.rest = myself.loadValue(tail, object);
                } else {
                    if (i < (items.length - 1)) {
                        v.rest = new List();
                        v = v.rest;
                        v.isLinked = true;
                    }
                }
            });
            return lst;
        }
        if (model.attributes.struct === 'atomic') {
            v = Process.prototype.parseCSV(model.contents);
            record();
            return v;
        }
        v = new List();
        record();
        v.contents = model.childrenNamed('item').map(function (item) {
            var value = item.children[0];
            if (!value) {
                return 0;
            }
            return myself.loadValue(value, object);
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
            v.cachedHSV = v.color.hsv();
        }
        if (model.attributes.pen) {
            v.penPoint = model.attributes.pen;
        }
        if (model.attributes.volume) {
            v.volume = +model.attributes.volume;
        }
        if (model.attributes.pan) {
            v.pan = +model.attributes.pan;
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
        el = model.childNamed('origin');
        if (el) {
            el = el.childNamed('ref') || el.childNamed('sprite');
            if (el) {
                v.origin = this.loadValue(el);
            }
        }
        el = model.childNamed('receiver');
        if (el) {
            el = el.childNamed('ref') || el.childNamed('sprite');
            if (el) {
                v.receiver = this.loadValue(el);
            }
        }
        origin = v.origin || v.receiver || object; // for local blocks look up
        el = model.childNamed('script');
        if (el) {
            v.expression = this.loadScript(el, origin);
        } else {
            el = model.childNamed('block') ||
                model.childNamed('custom-block');
            if (el) {
                v.expression = this.loadBlock(el, null, origin);
            } else {
                el = model.childNamed('l');
                if (el) {
                    bool = el.childNamed('bool');
                    if (bool) {
                        v.expression = new BooleanSlotMorph(
                            this.loadValue(bool)
                        );
                    } else {
                        v.expression = new InputSlotMorph(el.contents);
                    }
                }
            }
        }
        if (v.expression instanceof BlockMorph) {
            // bind empty slots to implicit formal parameters
            i = 0;
            v.expression.allEmptySlots().forEach(function (slot) {
                i += 1;
                if (slot instanceof MultiArgMorph) {
                    slot.bindingID = ['arguments'];
                } else {
                    slot.bindingID = i;
                }
            });
            // and remember the number of detected empty slots
            v.emptySlots = i;
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
            this.loadVariables(v.variables, el, origin);
        }
        el = model.childNamed('context');
        if (el) {
            v.outerContext = this.loadValue(el, origin);
        }
        if (v.outerContext && v.receiver &&
                !v.outerContext.variables.parentFrame) {
            v.outerContext.variables.parentFrame = v.receiver.variables;
        }
        return v;
    case 'costume':
        center = new Point();
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'center-x'
            )) {
            center.x = parseFloat(model.attributes['center-x']);
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'center-y'
            )) {
            center.y = parseFloat(model.attributes['center-y']);
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'name'
            )) {
            name = model.attributes.name;
        }
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'image'
            )) {
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
                            new Point(image.width, image.height),
                            true // nonRetina
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
        if (Object.prototype.hasOwnProperty.call(
                model.attributes,
                'mediaID'
            )) {
            myself.mediaDict[model.attributes.mediaID] = v;
        }
        record();
        return v;
    case 'wish':
    	def = new CustomBlockDefinition(model.attributes.s);
     	def.type = model.attributes.type;
      	def.category = model.attributes.category;
       	def.storedSemanticSpec = model.attributes.s;
        def.updateTranslations(model.contents);
        return def.blockInstance(true); // include translations
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
        sprite;
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
    ide.add(project.stage);
    ide.stage = project.stage;
    sprites = ide.stage.children.filter(function (child) {
        return child instanceof SpriteMorph;
    });
    sprites.sort(function (x, y) {
        return x.idx - y.idx;
    });

    ide.sprites = new List(sprites);
    sprite = sprites[0] || project.stage;

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

    // force watchers to update
    //project.stage.watchers().forEach(function (watcher) {
    //  watcher.onNextStep = function () {this.currentValue = null;};
    //})

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
    var thumbnail = normalizeCanvas(
            this.thumbnail(SnapSerializer.prototype.thumbnailSize),
            true
        ),
        thumbdata,
        costumeIdx = this.getCostumeIdx(),
        ide = this.parentThatIsA(IDE_Morph);

    // catch cross-origin tainting exception when using SVG costumes
    try {
        thumbdata = thumbnail.toDataURL('image/png');
    } catch (error) {
        thumbdata = null;
    }

    function code(key) {
        var str = '';
        Object.keys(StageMorph.prototype[key]).forEach(
            function (selector) {
                str += (
                    '<' + selector + '>' +
                        XML_Element.prototype.escape(
                            StageMorph.prototype[key][selector]
                        ) +
                        '</' + selector + '>'
                );
            }
        );
        return str;
    }

    this.removeAllClones();
    return serializer.format(
        '<project name="@" app="@" version="@">' +
            '<notes>$</notes>' +
            '<thumbnail>$</thumbnail>' +
            '<stage name="@" width="@" height="@" ' +
            'costume="@" color="@,@,@,@" tempo="@" threadsafe="@" ' +
            '%' +
            'volume="@" ' +
            'pan="@" ' +
            'lines="@" ' +
            'ternary="@" ' +
            'codify="@" ' +
            'inheritance="@" ' +
            'sublistIDs="@" ' +
            'scheduled="@" ~>' +
            '<pentrails>$</pentrails>' +
            '%' + // current costume, if it's not in the wardrobe
            '<costumes>%</costumes>' +
            '<sounds>%</sounds>' +
            '<variables>%</variables>' +
            '<blocks>%</blocks>' +
            '<scripts>%</scripts><sprites>%</sprites>' +
            '</stage>' +
            '<hidden>$</hidden>' +
            '<headers>%</headers>' +
            '<code>%</code>' +
            '<blocks>%</blocks>' +
            '<variables>%</variables>' +
            '</project>',
        (ide && ide.projectName) ? ide.projectName : localize('Untitled'),
        serializer.app,
        serializer.version,
        (ide && ide.projectNotes) ? ide.projectNotes : '',
        thumbdata,
        this.name,
        StageMorph.prototype.dimensions.x,
        StageMorph.prototype.dimensions.y,
        costumeIdx,
        this.color.r,
        this.color.g,
        this.color.b,
        this.color.a,
        this.getTempo(),
        this.isThreadSafe,
        this.instrument ?
                ' instrument="' + parseInt(this.instrument) + '" ' : '',
        this.volume,
        this.pan,
        SpriteMorph.prototype.useFlatLineEnds ? 'flat' : 'round',
        BooleanSlotMorph.prototype.isTernary,
        this.enableCodeMapping,
        this.enableInheritance,
        this.enableSublistIDs,
        StageMorph.prototype.frameRate !== 0,
        normalizeCanvas(this.trailsCanvas, true).toDataURL('image/png'),

        // current costume, if it's not in the wardrobe
        !costumeIdx && this.costume ?
            '<wear>' + serializer.store(this.costume) + '</wear>'
                : '',

        serializer.store(this.costumes, this.name + '_cst'),
        serializer.store(this.sounds, this.name + '_snd'),
        serializer.store(this.variables),
        serializer.store(this.customBlocks),
        serializer.store(this.scripts),
        serializer.store(this.children),
        Object.keys(StageMorph.prototype.hiddenPrimitives).reduce(
                function (a, b) {return a + ' ' + b; },
                ''
            ),
        code('codeHeaders'),
        code('codeMappings'),
        serializer.store(this.globalBlocks),
        (ide && ide.globalVariables) ?
                    serializer.store(ide.globalVariables) : ''
    );
};

SpriteMorph.prototype.toXML = function (serializer) {
    var stage = this.parentThatIsA(StageMorph),
        ide = stage ? stage.parentThatIsA(IDE_Morph) : null,
        idx = ide ? ide.sprites.asArray().indexOf(this) + 1 : 0,
        costumeIdx = this.getCostumeIdx(),
        noCostumes = this.inheritsAttribute('costumes'),
        noSounds = this.inheritsAttribute('sounds'),
        noScripts = this.inheritsAttribute('scripts');

    return serializer.format(
        '<sprite name="@" idx="@" x="@" y="@"' +
            ' heading="@"' +
            ' scale="@"' +
            ' volume="@"' +
            ' pan="@"' +
            ' rotation="@"' +
            '%' +
            ' draggable="@"' +
            '%' +
            ' costume="@" color="@,@,@,@" pen="@" ~>' +
            '%' + // inheritance info
            '%' + // nesting info
            '%' + // current costume
            (noCostumes ? '%' : '<costumes>%</costumes>') +
            (noSounds ? '%' : '<sounds>%</sounds>') +
            '<blocks>%</blocks>' +
            '<variables>%</variables>' +
            (this.exemplar ? '<dispatches>%</dispatches>' : '%') +
            (noScripts ? '%' : '<scripts>%</scripts>') +
            '</sprite>',
        this.name,
        idx,
        this.xPosition(),
        this.yPosition(),
        this.heading,
        this.scale,
        this.volume,
        this.pan,
        this.rotationStyle,
        this.instrument ?
                ' instrument="' + parseInt(this.instrument) + '" ' : '',
        this.isDraggable,
        this.isVisible ? '' : ' hidden="true"',
        costumeIdx,
        this.color.r,
        this.color.g,
        this.color.b,
        this.color.a,
        this.penPoint,

        // inheritance info
        this.exemplar
            ? '<inherit exemplar="' +
                    this.exemplar.name +
                    '">' +
                    (this.inheritedAttributes.length ?
                        serializer.store(new List(this.inheritedAttributes))
                        : '') +
                    '</inherit>'
            : '',

        // nesting info
        this.anchor
            ? '<nest anchor="' +
                    this.anchor.name +
                    '" synch="'
                    + this.rotatesWithAnchor
                    + (this.scale === this.nestingScale ? '' :
                            '"'
                            + ' scale="'
                            + this.nestingScale)

                    + '"/>'
            : '',

        // current costume, if it's not in the wardrobe
        !costumeIdx && this.costume ?
            '<wear>' + serializer.store(this.costume) + '</wear>'
                : '',

        noCostumes ? '' : serializer.store(this.costumes, this.name + '_cst'),
        noSounds ? '' : serializer.store(this.sounds, this.name + '_snd'),
        !this.customBlocks ? '' : serializer.store(this.customBlocks),
        serializer.store(this.variables),
        this.exemplar ? serializer.store(this.inheritedMethods()) : '',
        noScripts ? '' : serializer.store(this.scripts)
    );
};

Costume.prototype[XML_Serializer.prototype.mediaDetectionProperty] = true;

Costume.prototype.toXML = function (serializer) {
    return serializer.format(
        '<costume name="@" center-x="@" center-y="@" image="@" ~/>',
        this.name,
        this.rotationCenter.x,
        this.rotationCenter.y,
        this instanceof SVG_Costume ? this.contents.src
                : normalizeCanvas(this.contents).toDataURL('image/png')
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
        var val = myself.vars[v].value,
            dta;
        if (myself.vars[v].isTransient) {
            dta = serializer.format(
                '<variable name="@" transient="true"/>',
                v)
            ;
        } else if (val === undefined || val === null) {
            dta = serializer.format('<variable name="@"/>', v);
        } else {
            dta = serializer.format(
                '<variable name="@">%</variable>',
                v,
                typeof val === 'object' ?
                        (isSnapObject(val) ? ''
                                : serializer.store(val))
                                : typeof val === 'boolean' ?
                                        serializer.format(
                                            '<bool>$</bool>', val
                                        )
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

    if (this.isTemporary()) {
        // do not save watchers on temporary variables
        return '';
    }
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
    if (this.selector === 'reportGetVar') {
        if (!this.comment) {
            return serializer.format(
                '<block var="@"/>',
                this.blockSpec);
        } else {
            return serializer.format(
                '<block var="@">%</block>',
                this.blockSpec,
                this.comment.toXML(serializer));
        }
    } else {
        return this.toBlockXML(serializer);
    }
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
    var scope = this.isGlobal ? undefined : 'local';
    return serializer.format(
        '<custom-block s="@"%>%%%</custom-block>',
        this.semanticSpec,
        this.isGlobal ?
                '' : serializer.format(' scope="@"', scope),
        serializer.store(this.inputs()),
        this.isGlobal &&
        	this.definition.variableNames.length &&
            !serializer.isExportingBlocksLibrary ?
                '<variables>' +
                    this.variables.toXML(serializer) +
                    '</variables>'
                        : '',
        this.comment ? this.comment.toXML(serializer) : ''
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
            '%' +
            (this.variableNames.length ? '<variables>%</variables>' : '@') +
            '<header>@</header>' +
            '<code>@</code>' +
            '<translations>@</translations>' +
            '<inputs>%</inputs>%%' +
            '</block-definition>',
        this.spec,
        this.type,
        this.category || 'other',
        this.comment ? this.comment.toXML(serializer) : '',
        (this.variableNames.length ?
                serializer.store(new List(this.variableNames)) : ''),
        this.codeHeader || '',
        this.codeMapping || '',
        this.translationsAsText(),
        Array.from(this.declarations.keys()).reduce(function (xml, decl) {
            // to be refactored now that we've moved to ES6 Map:
                return xml + serializer.format(
                    '<input type="@"$>$%</input>',
                    myself.declarations.get(decl)[0],
                    myself.declarations.get(decl)[3] ?
                            ' readonly="true"' : '',
                    myself.declarations.get(decl)[1],
                    myself.declarations.get(decl)[2] ?
                            serializer.format(
                                '<options>@</options>',
                                myself.declarations.get(decl)[2]
                            ) : ''
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

BooleanSlotMorph.prototype.toXML = function () {
    return (typeof this.value === 'boolean') ?
            '<l><bool>' + this.value + '</bool></l>'
                    : '<l/>';

};

InputSlotMorph.prototype.toXML = function (serializer) {
	if (this.selectedBlock) {
 		return serializer.format(
        	'<l><wish s="@" type="@" category="@">@</wish></l>',
            this.selectedBlock.semanticSpec,
         	this.selectedBlock instanceof CommandBlockMorph ? 'command'
          		: (this.selectedBlock.isPredicate ? 'predicate' : 'reporter'),
            this.selectedBlock.category,
            this.selectedBlock.storedTranslations
        );
 	}
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
    var block = this.nestedBlock();
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
    var xml, value, item;

    if (this.hasOnlyAtomicData() &&
            (!this.isLinked || !StageMorph.prototype.enableSublistIDs)) {
        // special case for a less cluttered format
        return serializer.format(
            '<list struct="atomic" ' +
                (this.isLinked ? 'linked="linked" ' : '') +
                '~>@</list>',
            this.asCSV()
        );
    }

    if (this.isLinked) {
        xml = '<list linked="linked" ~>';
        if (StageMorph.prototype.enableSublistIDs) {
            // recursively nest tails:
            value = this.first;
            if (!isNil(value)) {
                xml += serializer.format(
                    '<item>%</item>',
                    typeof value === 'object' ?
                            (isSnapObject(value) ? ''
                                    : serializer.store(value, mediaContext))
                            : typeof value === 'boolean' ?
                                    serializer.format('<bool>$</bool>', value)
                                    : serializer.format('<l>$</l>', value)
                );
            }
            if (!isNil(this.rest)) {
                xml += serializer.store(this.rest, mediaContext);
            }
            return xml + '</list>';
        }
        // else sequentially serialize tails:
        item = this;
        do {
            value = item.first;
            if (!isNil(value)) {
                xml += serializer.format(
                    '<item>%</item>',
                    typeof value === 'object' ?
                            (isSnapObject(value) ? ''
                                    : serializer.store(value, mediaContext))
                            : typeof value === 'boolean' ?
                                    serializer.format('<bool>$</bool>', value)
                                    : serializer.format('<l>$</l>', value)
                );
            }
            item = item.rest;
        } while (!isNil(item));
        return xml + '</list>';
    }
    // dynamic array:
    return serializer.format(
        '<list ~>%</list>',
        this.contents.reduce(function (xml, item) {
            return xml + serializer.format(
                '<item>%</item>',
                typeof item === 'object' ?
                        (isSnapObject(item) ? ''
                                : serializer.store(item, mediaContext))
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
        '<context ~><inputs>%</inputs><variables>%</variables>' +
            '%<receiver>%</receiver><origin>%</origin>%</context>',
        this.inputs.reduce(
                function (xml, input) {
                    return xml + serializer.format('<input>$</input>', input);
                },
                ''
            ),
        this.variables ? serializer.store(this.variables) : '',
        this.expression ? serializer.store(this.expression) : '',
        this.receiver ? serializer.store(this.receiver) : '',
        this.receiver ? serializer.store(this.origin) : '',
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
