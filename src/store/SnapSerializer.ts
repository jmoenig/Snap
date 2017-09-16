// SnapSerializer ////////////////////////////////////////////////////////////

import XML_Serializer from "./XML_Serializer";

// SnapSerializer constants:

SnapSerializer.prototype.app = 'Snap! 4.1, http://snap.berkeley.edu';

SnapSerializer.prototype.thumbnailSize = new Point(160, 120);

SnapSerializer.prototype.watcherLabels = {
    xPosition: 'x position',
    yPosition: 'y position',
    direction: 'direction',
    getScale: 'size',
    getTempo: 'tempo',
    getLastAnswer: 'answer',
    getLastMessage: 'message',
    getTimer: 'timer',
    getCostumeIdx: 'costume #',
    reportMouseX: 'mouse x',
    reportMouseY: 'mouse y',
    reportThreadCount: 'processes'
};

// SnapSerializer instance creation:

export default class SnapSerializer extends XML_Serializer {
    constructor() {
        this.init();
    }

    // SnapSerializer initialization:

    init() {
        this.project = {};
        this.objects = {};
        this.mediaDict = {};
    }

    // SnapSerializer loading:

    load(xmlString, ide) {
        // public - answer a new Project represented by the given XML String
        return this.loadProjectModel(this.parse(xmlString), ide);
    }

    loadProjectModel(xmlNode, ide) {
        // public - answer a new Project represented by the given XML top node
        // show a warning if the origin apps differ

        const appInfo = xmlNode.attributes.app;

        const app = appInfo ? appInfo.split(' ')[0] : null;

        if (ide && app && app !== this.app.split(' ')[0]) {
            ide.inform(
                `${app} Project`,
                `This project has been created by a different app:\n\n${app}\n\nand may be incompatible or fail to load here.`
            );
        }
        return this.rawLoadProjectModel(xmlNode);
    }

    rawLoadProjectModel(xmlNode) {
        // private
        const myself = this;

        const project = {sprites: {}};
        let model;
        let nameID;

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
                    `-snap-project-Untitled ${nameID}`
                )
            ) {
                nameID += 1;
            }
            project.name = `Untitled ${nameID}`;
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
        if (Object.prototype.hasOwnProperty.call(
                model.stage.attributes,
                'id'
            )) {
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
            project.pentrails.onload = () => {
                if (project.stage.trailsCanvas) { // work-around a bug in FF
                    normalizeCanvas(project.stage.trailsCanvas);
                    const context = project.stage.trailsCanvas.getContext('2d');
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
                Math.max(+model.stage.attributes.width, 480);
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
                sel => {
                    if (sel) {
                        StageMorph.prototype.hiddenPrimitives[sel] = true;
                    }
                }
            );
        }

        model.codeHeaders = model.project.childNamed('headers');
        if (model.codeHeaders) {
            model.codeHeaders.children.forEach(xml => {
                StageMorph.prototype.codeHeaders[xml.tag] = xml.contents;
            });
        }

        model.codeMappings = model.project.childNamed('code');
        if (model.codeMappings) {
            model.codeMappings.children.forEach(xml => {
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

        model.sprites.childrenNamed('sprite').forEach(model => {
            myself.loadValue(model);
        });

        // restore inheritance and nesting associations
        myself.project.stage.children.forEach(sprite => {
            let exemplar;
            let anchor;
            if (sprite.inheritanceInfo) { // only sprites can inherit
                exemplar = myself.project.sprites[
                    sprite.inheritanceInfo.exemplar
                ];
                if (exemplar) {
                    sprite.setExemplar(exemplar);
                }
                sprite.inheritedAttributes = sprite.inheritanceInfo.delegated || [];
            }
            if (sprite.nestingInfo) { // only sprites may have nesting info
                anchor = myself.project.sprites[sprite.nestingInfo.anchor];
                if (anchor) {
                    anchor.attachPart(sprite);
                }
                sprite.rotatesWithAnchor = (sprite.nestingInfo.synch === 'true');
            }
        });
        myself.project.stage.children.forEach(sprite => {
            let costume;
            if (sprite.nestingInfo) { // only sprites may have nesting info
                sprite.nestingScale = +(sprite.nestingInfo.scale || sprite.scale);
                delete sprite.nestingInfo;
            }
            ['scripts', 'costumes', 'sounds'].forEach(att => {
                if (sprite.inheritsAttribute(att)) {
                    sprite.refreshInheritedAttribute(att);
                }
            });
            if (sprite.inheritsAttribute('costumes')) {
                costume = sprite.costumes.asArray()[
                    sprite.inheritanceInfo.costumeNumber - 1
                ];
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

        model.sprites.childrenNamed('watcher').forEach(model => {
            let watcher;
            let color;
            let target;
            let hidden;
            let extX;
            let extY;

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
        myself.project.stage.children.forEach(sprite => {
            sprite.inheritedMethodsCache = [];
        });

        this.objects = {};
        return project;
    }

    loadBlocks(xmlString, targetStage) {
        // public - answer a new Array of custom block definitions
        // represented by the given XML String
        const stage = new StageMorph();

        let model;

        this.project = {
            stage,
            sprites: {},
            targetStage // for secondary custom block def look-up
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
        stage.globalBlocks.forEach(def => {
            def.receiver = null;
        });
        this.objects = {};
        this.project = {};
        this.mediaDict = {};
        return stage.globalBlocks;
    }

    loadSprites(xmlString, ide) {
        // public - import a set of sprites represented by xmlString
        // into the current project of the ide
        let model;

        let project;
        const myself = this;

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
        model.childrenNamed('sprite').forEach(model => {
            const sprite  = new SpriteMorph(project.globalVariables);

            if (model.attributes.id) {
                myself.objects[model.attributes.id] = sprite;
            }
            if (model.attributes.name) {
                sprite.name = ide.newSpriteName(model.attributes.name);
                project.sprites[sprite.name] = sprite;
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

        // restore inheritance and nesting associations
        project.stage.children.forEach(sprite => {
            let exemplar;
            let anchor;
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
        project.stage.children.forEach(sprite => {
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
    }

    loadMedia(xmlString) {
        // public - load the media represented by xmlString into memory
        // to be referenced by a media-less project later
        return this.loadMediaModel(this.parse(xmlString));
    }

    loadMediaModel(xmlNode) {
        // public - load the media represented by xmlNode into memory
        // to be referenced by a media-less project later
        const myself = this;

        const model = xmlNode;
        this.mediaDict = {};
        if (+model.attributes.version > this.version) {
            throw 'Module uses newer version of Serializer';
        }
        model.children.forEach(model => {
            myself.loadValue(model);
        });
        return this.mediaDict;
    }

    loadObject(object, model) {
        // private
        const blocks = model.require('blocks');

        const dispatches = model.childNamed('dispatches');

        // load the instrument
        if (model.attributes.instrument) {
            object.instrument = +model.attributes.instrument;
        }

        this.loadInheritanceInfo(object, model);
        this.loadNestingInfo(object, model);

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
    }

    loadInheritanceInfo(object, model) {
        // private
        const info = model.childNamed('inherit');

        let delegated;
        if (info) {
            object.inheritanceInfo = info.attributes;
            delegated = info.childNamed('list');
            if (delegated) {
                object.inheritanceInfo.delegated =
                    this.loadValue(delegated).asArray();
            }
            object.inheritanceInfo.costumeNumber = model.attributes.costume;
        }
    }

    loadNestingInfo(object, model) {
        // private
        const info = model.childNamed('nest');
        if (info) {
            object.nestingInfo = info.attributes;
        }
    }

    loadCostumes(object, model) {
        // private
        const costumes = model.childNamed('costumes');

        let costume;
        if (costumes) {
            object.costumes = this.loadValue(costumes.require('list'));
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
    }

    loadSounds(object, model) {
        // private
        const sounds = model.childNamed('sounds');
        if (sounds) {
            object.sounds = this.loadValue(sounds.require('list'));
            object.sounds.type = 'sound';
        }
    }

    loadVariables(varFrame, element, object) {
        // private
        const myself = this;

        element.children.forEach(child => {
            let v;
            let value;
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
    }

    loadCustomBlocks(object, element, isGlobal, isDispatch) {
        // private
        const myself = this;
        element.children.forEach(child => {
            let definition;
            let names;
            let inputs;
            let vars;
            let header;
            let code;
            let comment;
            let i;
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
                str => str.charAt(0) === '%' && str.length > 1
            ).map(str => str.substr(1));

            definition.names = names;
            inputs = child.childNamed('inputs');
            if (inputs) {
                i = -1;
                inputs.children.forEach(child => {
                    const options = child.childNamed('options');
                    if (child.tag !== 'input') {
                        return;
                    }
                    i += 1;
                    definition.declarations[names[i]] = [
                        child.attributes.type,
                        contains(['%b', '%boolUE'], child.attributes.type) ?
                            (child.contents ? child.contents === 'true' : null)
                                : child.contents,
                        options ? options.contents : undefined,
                        child.attributes.readonly === 'true'
                    ];
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

            comment = child.childNamed('comment');
            if (comment) {
                definition.comment = myself.loadComment(comment);
            }
        });
    }

    populateCustomBlocks(object, element, isGlobal) {
        // private
        const myself = this;
        element.children.forEach((child, index) => {
            let definition;
            let script;
            let scripts;
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
    }

    loadScripts(object, scripts, model) {
        // private
        const myself = this;

        const scale = SyntaxElementMorph.prototype.scale;
        scripts.cachedTexture = IDE_Morph.prototype.scriptsPaneTexture;
        model.children.forEach(child => {
            let element;
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
                element.allComments().forEach(comment => {
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
    }

    loadScriptsArray(model, object) {
        // private - answer an array containting the model's scripts
        const myself = this;

        const scale = SyntaxElementMorph.prototype.scale;
        const scripts = [];
        model.children.forEach(child => {
            let element;
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
    }

    loadScript(model, object) {
        // private
        let topBlock;

        let block;
        let nextBlock;
        const myself = this;
        model.children.forEach(child => {
            nextBlock = myself.loadBlock(child, false, object);
            if (!nextBlock) {
                return;
            }
            if (block) {
                if (block.nextBlock && (nextBlock instanceof CommandBlockMorph)) {
                    block.nextBlock(nextBlock);
                } else {
                    console.log(
                        `SNAP: expecting a command but getting a reporter:\n  ${block.blockSpec}\n  ${nextBlock.blockSpec}`
                    );
                    return topBlock;
                }
            } else {
                topBlock = nextBlock;
            }
            block = nextBlock;
        });
        return topBlock;
    }

    loadComment(model) {
        // private
        const comment = new CommentMorph(model.contents);

        const scale = SyntaxElementMorph.prototype.scale;
        comment.isCollapsed = (model.attributes.collapsed === 'true');
        comment.setTextWidth(+model.attributes.w * scale);
        return comment;
    }

    loadBlock(model, isReporter, object) {
        // private
        let block;

        let info;
        let inputs;
        let isGlobal;
        let receiver;
        let migration;
        let migrationOffset = 0;
        if (model.tag === 'block') {
            if (Object.prototype.hasOwnProperty.call(
                    model.attributes,
                    'var'
                )) {
                return SpriteMorph.prototype.variableBlock(
                    model.attributes['var']
                );
            }
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
            migration = SpriteMorph.prototype.blockMigrations[model.attributes.s];
            if (migration) {
                migrationOffset = migration.offset;
            }
        } else if (model.tag === 'custom-block') {
            isGlobal = model.attributes.scope ? false : true;
            receiver = isGlobal ? this.project.stage : object;
            if (isGlobal) {
                info = detect(receiver.globalBlocks, block => block.blockSpec() === model.attributes.s);
                if (!info && this.project.targetStage) { // importing block files
                    info = detect(
                        this.project.targetStage.globalBlocks,
                        block => block.blockSpec() === model.attributes.s
                    );
                }
            } else {
                // lookup in inherited methods
                info = detect(receiver.customBlocks, block => block.blockSpec() === model.attributes.s) || detect(receiver.inheritedMethodsCache, block => block.blockSpec() === model.attributes.s);
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
    }

    obsoleteBlock(isReporter) {
        // private
        const block = isReporter ? new ReporterBlockMorph()
                : new CommandBlockMorph();
        block.selector = 'errorObsolete';
        block.color = new Color(200, 0, 20);
        block.setSpec('Obsolete!');
        block.isDraggable = true;
        return block;
    }

    loadInput(model, input, block, object) {
        // private
        let inp;

        let val;
        const myself = this;
        if (isNil(input)) {
            return;
        }
        if (model.tag === 'script') {
            inp = this.loadScript(model, object);
            if (inp) {
                input.add(inp);
                input.fixLayout();
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
            model.children.forEach(item => {
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
    }

    loadValue(model, object) {
        // private
        let v;

        let i;
        let lst;
        let items;
        let el;
        let center;
        let image;
        let name;
        let audio;
        let option;
        let bool;
        let origin;
        const myself = this;

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
            return model.contents;
        case 'bool':
            return model.contents === 'true';
        case 'list':
            if (model.attributes.hasOwnProperty('linked')) {
                v = new List();
                v.isLinked = true;
                record();
                lst = v;
                items = model.childrenNamed('item');
                items.forEach((item, i) => {
                    const value = item.children[0];
                    if (!value) {
                        v.first = 0;
                    } else {
                        v.first = myself.loadValue(value, object);
                    }
                    const tail = model.childNamed('list') ||
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
            v = new List();
            record();
            v.contents = model.childrenNamed('item').map(item => {
                const value = item.children[0];
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
                    v.expression = this.loadBlock(el, origin);
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
                v.expression.allEmptySlots().forEach(slot => {
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
                el.children.forEach(item => {
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
                    image.onload = () => {
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
                    image.onload = () => {
                        const canvas = newCanvas(
                                new Point(image.width, image.height),
                                true // nonRetina
                            );

                        const context = canvas.getContext('2d');
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
        }
        return undefined;
    }

    loadColor(colorString) {
        // private
        const c = (colorString || '').split(',');
        return new Color(
            parseFloat(c[0]),
            parseFloat(c[1]),
            parseFloat(c[2]),
            parseFloat(c[3])
        );
    }

    openProject(project, ide) {
        const stage = ide.stage;
        let sprites = [];
        let sprite;
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
        sprites = ide.stage.children.filter(child => child instanceof SpriteMorph);
        sprites.sort((x, y) => x.idx - y.idx);

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
    }
}

// SnapSerializer saving:

XML_Serializer.prototype.mediaXML = function (name) {
    // under construction....
    let xml = `<media name="${name || 'untitled'}" app="${this.app}" version="${this.version}">`;

    const myself = this;
    this.media.forEach(object => {
        const str = object.toXML(myself).replace(
            '~',
            myself.format('mediaID="@"', object[myself.mediaIdProperty])
        );
        xml = xml + str;
    });
    return `${xml}</media>`;
};

