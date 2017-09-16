// TODO: Move to individual things

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
            'costume="@" tempo="@" threadsafe="@" ' +
            '%' +
            'lines="@" ' +
            'ternary="@" ' +
            'codify="@" ' +
            'inheritance="@" ' +
            'sublistIDs="@" ' +
            'scheduled="@" ~>' +
            '<pentrails>$</pentrails>' +
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
        this.getCostumeIdx(),
        this.getTempo(),
        this.isThreadSafe,
        this.instrument ?
                ' instrument="' + parseInt(this.instrument) + '" ' : '',
        SpriteMorph.prototype.useFlatLineEnds ? 'flat' : 'round',
        BooleanSlotMorph.prototype.isTernary,
        this.enableCodeMapping,
        this.enableInheritance,
        this.enableSublistIDs,
        StageMorph.prototype.frameRate !== 0,
        normalizeCanvas(this.trailsCanvas, true).toDataURL('image/png'),
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
        noCostumes = this.inheritsAttribute('costumes'),
        noSounds = this.inheritsAttribute('sounds'),
        noScripts = this.inheritsAttribute('scripts');

    return serializer.format(
        '<sprite name="@" idx="@" x="@" y="@"' +
            ' heading="@"' +
            ' scale="@"' +
            ' rotation="@"' +
            '%' +
            ' draggable="@"' +
            '%' +
            ' costume="@" color="@,@,@" pen="@" ~>' +
            '%' + // inheritance info
            '%' + // nesting info
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
        this.rotationStyle,
        this.instrument ?
                ' instrument="' + parseInt(this.instrument) + '" ' : '',
        this.isDraggable,
        this.isVisible ? '' : ' hidden="true"',
        this.getCostumeIdx(),
        this.color.r,
        this.color.g,
        this.color.b,
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
    var scope = this.isGlobal ? undefined : 'local';
    return serializer.format(
        '<custom-block s="@"%>%%%</custom-block>',
        this.blockSpec,
        this.isGlobal ?
                '' : serializer.format(' scope="@"', scope),
        serializer.store(this.inputs()),
        this.isGlobal && this.definition.variableNames.length ?
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
        Object.keys(this.declarations).reduce(function (xml, decl) {
                return xml + serializer.format(
                    '<input type="@"$>$%</input>',
                    myself.declarations[decl][0],
                    myself.declarations[decl][3] ?
                            ' readonly="true"' : '',
                    myself.declarations[decl][1],
                    myself.declarations[decl][2] ?
                            '<options>' + myself.declarations[decl][2] +
                                '</options>'
                                : ''
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
    var xml, value, item;
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