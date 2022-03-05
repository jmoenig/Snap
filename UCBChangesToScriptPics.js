// BlockMorph menu:

BlockMorph.prototype.userMenu = function () {
    var menu = new MenuMorph(this),
        world = this.world(),
        myself = this,
        hasLine = false,
        shiftClicked = world.currentKey === 16,
        proc = this.activeProcess(),
        top = this.topBlock(),
        vNames = proc && proc.context && proc.context.outerContext ?
                proc.context.outerContext.variables.names() : [],
        alternatives,
        field,
        rcvr;

    function addOption(label, toggle, test, onHint, offHint) {
        menu.addItem(
            [
                test ? new SymbolMorph(
                    'checkedBox',
                    MorphicPreferences.menuFontSize * 0.75
                ) : new SymbolMorph(
                    'rectangle',
                    MorphicPreferences.menuFontSize * 0.75
                ),
                localize(label)
            ],
            toggle,
            test ? onHint : offHint
        );
    }

    function renameVar() {
        var blck = myself.fullCopy();
        blck.addShadow();
        new DialogBoxMorph(
            myself,
            myself.userSetSpec,
            myself
        ).prompt(
            "Variable name",
            myself.blockSpec,
            world,
            blck.doWithAlpha(1, () => blck.fullImage()), // pic
            InputSlotMorph.prototype.getVarNamesDict.call(myself)
        );
    }

    menu.addItem(
        "help...",
        'showHelp'
    );

    /* UCB Script Pic Edit:
     *  - Incorporated new method to userMenu to integrate scriptPic's and XML code.
     *  - Code credited to Snap! Forum user Dardoro.
     * 
     * 2/26 Changes:
     *  - Added new "scan" to scripts to export/encode custom block definitions with XML
     */
    if (this.isTemplate || !this.definition) {
		menu.addLine();
		menu.addItem("script pic and xml...", 
			() => {
				const inbDelim = "Snap\tBlocks\tEmbedded",      // in-band XML delimeter
                    defnDelim = "Custom\tBlock\tDefinitions";   // in-band definition delimiter

				function crc32(str, crc) {
					let table = [...Array(256).keys()].map(it => 
						[...Array(8)].reduce((cc) => 
						(cc & 1) ? (0xedb88320 ^ (cc >>> 1)) : (cc >>> 1), it)
						);
						crc = [...str].reduce((crc, ch) => { 
							return (crc >>> 8) ^ table[(crc ^ ch.charCodeAt(0)) & 0xff]
						}, (crc ||= 0) ^ (-1));
						return ( crc ^ (-1) ) >>> 0;
				};
				function arr2Str(arr) { 
					return arr.reduce((res, byte) => res + String.fromCharCode(byte), '');
				};
				function int2BStr(val) { 
					return arr2Str(Array.from(new Uint8Array(new Uint32Array( [val] ).buffer)).reverse());
				};
				function buildChunk(type , data) { 
					let res = type + data; 
					return int2BStr(data.length) + res + int2BStr(crc32(res));
				};
                function getDefinitions(str, ide) {
					let customBlocksString = '';
                    function find(xml) {
                        if (xml.includes("<custom-block")) {
                            let custom = xml.split("<custom-block s=")[1].split('"')[1];
                            ide.stage.globalBlocks.forEach((block, index) => { 
                                if (block.spec == custom) { 
                                    let blockDefn = ide.stage.globalBlocks[index].toXML(ide.serializer);
                                    customBlocksString += blockDefn;
                                } 
                            });
                            return find(xml.replace("<custom-block", ''));
                        } else {
                            return;
                        }
                    }
                    find(str);

					return customBlocksString 
						? 
                        '<blocks app="'
                        + ide.serializer.app
                        + '" version="'
                        + ide.serializer.version
                        + '">'
                        + customBlocksString
                        + '</blocks>'
                        + defnDelim
						:
						customBlocksString;
				}
					
				var ide = this.parentThatIsA(IDE_Morph),
					top = this.definition || this.topBlock();
				let xml = unescape(encodeURIComponent(ide.serializer.serialize(top))),
				    pic = top.scriptsPicture?.() || top.scriptPic?.(),
                    parts = pic.toDataURL("image/png").split(","),
                    bPart = atob(parts[1]).split("");
				if (this.isTemplate) { xml = "<blocks>" + xml + "</blocks>" };
                xml = getDefinitions(xml, ide) + xml;
				let newChunk = buildChunk("iTXt", "Snap!_XML\0\0\0\0\0"+inbDelim+xml+inbDelim),
				    name = top?.definition?.spec || top.selector;
				bPart.splice(-12, 0, ...newChunk);
				parts[1] = btoa(bPart.join(""));
				this.saveFileAs(parts.join(','), 'image/png', name);
			}
		);
	}

    if (this.isTemplate) {
        if (this.parent instanceof SyntaxElementMorph) { // in-line
            if (this.selector === 'reportGetVar') { // script var definition
                menu.addLine();
                menu.addItem(
                    'rename...',
                    () => this.refactorThisVar(true), // just the template
                    'rename only\nthis reporter'
                );
                menu.addItem(
                    'rename all...',
                    'refactorThisVar',
                    'rename all blocks that\naccess this variable'
                );
            }
        } else { // in palette
            if (this.selector === 'reportGetVar') {
                rcvr = this.scriptTarget();
                if (this.isInheritedVariable(false)) { // fully inherited
                    addOption(
                        'inherited',
                        () => rcvr.toggleInheritedVariable(this.blockSpec),
                        true,
                        'uncheck to\ndisinherit',
                        null
                    );
                } else { // not inherited
                    if (this.isInheritedVariable(true)) { // shadowed
                        addOption(
                            'inherited',
                            () => rcvr.toggleInheritedVariable(
                                this.blockSpec
                            ),
                            false,
                            null,
                            localize('check to inherit\nfrom')
                                + ' ' + rcvr.exemplar.name
                        );
                    }
                    addOption(
                        'transient',
                        'toggleTransientVariable',
                        this.isTransientVariable(),
                        'uncheck to save contents\nin the project',
                        'check to prevent contents\nfrom being saved'
                    );
                    menu.addLine();
                    menu.addItem(
                        'rename...',
                        () => this.refactorThisVar(true), // just the template
                        'rename only\nthis reporter'
                    );
                    menu.addItem(
                        'rename all...',
                        'refactorThisVar',
                        'rename all blocks that\naccess this variable'
                    );
                }
            }

            // allow toggling inheritable attributes
            if (StageMorph.prototype.enableInheritance) {
                rcvr = this.scriptTarget();
                field = {
                    xPosition: 'x position',
                    yPosition: 'y position',
                    direction: 'direction',
                    getScale: 'size',
                    getCostumeIdx: 'costume #',
                    getVolume: 'volume',
                    getPan: 'balance',
                    reportShown: 'shown?',
                    getPenDown: 'pen down?'
                }[this.selector];
                if (field && rcvr && rcvr.exemplar) {
                    menu.addLine();
                    addOption(
                        'inherited',
                        () => rcvr.toggleInheritanceForAttribute(field),
                        rcvr.inheritsAttribute(field),
                        'uncheck to\ndisinherit',
                        localize('check to inherit\nfrom')
                            + ' ' + rcvr.exemplar.name
                    );
                }
            }

            if (StageMorph.prototype.enableCodeMapping) {
                menu.addLine();
                menu.addItem(
                    'header mapping...',
                    'mapToHeader'
                );
                menu.addItem(
                    'code mapping...',
                    'mapToCode'
                );
            }
        }
        return menu;
    }
    menu.addLine();
    if (this.selector === 'reportGetVar') {
        menu.addItem(
            'rename...',
            renameVar,
            'rename only\nthis reporter'
        );
    } else if (SpriteMorph.prototype.blockAlternatives[this.selector]) {
        menu.addItem(
            'relabel...',
            () => this.relabel(
                SpriteMorph.prototype.blockAlternatives[this.selector]
            )
        );
    } else if (this.isCustomBlock && this.alternatives) {
        alternatives = this.alternatives();
        if (alternatives.length > 0) {
            menu.addItem(
                'relabel...',
                () => this.relabel(alternatives)
            );
        }
    }

    // direct relabelling:
    // - JIT-compile HOFs - experimental
    // - vector pen trails
    if (
        contains(
            ['reportMap', 'reportKeep', 'reportFindFirst', 'reportCombine'],
            this.selector
        )
    ) {
        alternatives = {
            reportMap : 'reportAtomicMap',
            reportKeep : 'reportAtomicKeep',
            reportFindFirst: 'reportAtomicFindFirst',
            reportCombine : 'reportAtomicCombine'
        };
        menu.addItem(
            'compile',
            () => this.setSelector(alternatives[this.selector]),
            'experimental!\nmake this reporter fast and uninterruptable\n' +
                'CAUTION: Errors in the ring\ncan break your Snap! session!'
        );
    } else if (
        contains(
            [
                'reportAtomicMap',
                'reportAtomicKeep',
                'reportAtomicFindFirst',
                'reportAtomicCombine'
            ],
            this.selector
        )
    ) {
        alternatives = {
            reportAtomicMap : 'reportMap',
            reportAtomicKeep : 'reportKeep',
            reportAtomicFindFirst: 'reportFindFirst',
            reportAtomicCombine : 'reportCombine'
        };
        menu.addItem(
            'uncompile',
            () => this.setSelector(alternatives[this.selector])
        );
    } else if (
        contains(
            ['reportPenTrailsAsCostume', 'reportPentrailsAsSVG'],
            this.selector
        )
    ) {
        alternatives = {
            reportPenTrailsAsCostume : 'reportPentrailsAsSVG',
            reportPentrailsAsSVG : 'reportPenTrailsAsCostume'
        };
        menu.addItem(
            localize(
                SpriteMorph.prototype.blocks[
                    alternatives[this.selector]
                ].spec
            ),
            () => {
                this.setSelector(alternatives[this.selector]);
                this.changed();
            }
        );
    }

    menu.addItem(
        "duplicate",
        () => {
            var dup = this.fullCopy(),
                ide = this.parentThatIsA(IDE_Morph),
                blockEditor = this.parentThatIsA(BlockEditorMorph);
            dup.pickUp(world);
            // register the drop-origin, so the block can
            // slide back to its former situation if dropped
            // somewhere where it gets rejected
            if (!ide && blockEditor) {
                ide = blockEditor.target.parentThatIsA(IDE_Morph);
            }
            if (ide) {
                world.hand.grabOrigin = {
                    origin: ide.palette,
                    position: ide.palette.center()
                };
            }
        },
        'make a copy\nand pick it up'
    );
    if (this instanceof CommandBlockMorph && this.nextBlock()) {
        menu.addItem(
            (proc ? this.fullCopy() : this).thumbnail(0.5, 60),
            () => {
                var cpy = this.fullCopy(),
                    nb = cpy.nextBlock(),
                    ide = this.parentThatIsA(IDE_Morph),
                    blockEditor = this.parentThatIsA(BlockEditorMorph);
                if (nb) {nb.destroy(); }
                cpy.pickUp(world);
                if (!ide && blockEditor) {
                    ide = blockEditor.target.parentThatIsA(IDE_Morph);
                }
                if (ide) {
                    world.hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                }
            },
            'only duplicate this block'
        );
        menu.addItem(
            'extract',
            'userExtractJustThis',
            'only grab this block'
        );
    }
    menu.addItem(
        "delete",
        'userDestroy'
    );
    if (isNil(this.comment)) {
        menu.addItem(
            "add comment",
            () => {
                var comment = new CommentMorph();
                this.comment = comment;
                comment.block = this;
                comment.layoutChanged();

                // Simulate drag/drop for better undo/redo behavior
                var scripts = this.parentThatIsA(ScriptsMorph),
                    ide = this.parentThatIsA(IDE_Morph),
                    blockEditor = this.parentThatIsA(BlockEditorMorph);
                if (!ide && blockEditor) {
                    ide = blockEditor.target.parentThatIsA(IDE_Morph);
                }
                if (ide) {
                    world.hand.grabOrigin = {
                        origin: ide.palette,
                        position: ide.palette.center()
                    };
                }
                scripts.clearDropInfo();
                scripts.lastDropTarget = { element: this };
                scripts.lastDroppedBlock = comment;
                scripts.recordDrop(world.hand.grabOrigin);
            }
        );
    }
    menu.addItem(
        "script pic...",
        () => {
            var ide = this.parentThatIsA(IDE_Morph) ||
                this.parentThatIsA(BlockEditorMorph).target.parentThatIsA(
                    IDE_Morph
            );
            ide.saveCanvasAs(
                top.scriptPic(),
                (ide.projectName || localize('untitled')) + ' ' +
                    localize('script pic')
            );
        },
        'save a picture\nof this script'
    );
    if (top instanceof ReporterBlockMorph ||
        (!(top instanceof PrototypeHatBlockMorph) &&
            top.allChildren().some((any) => any.selector === 'doReport'))
    ) {
        menu.addItem(
            "result pic...",
            () => top.exportResultPic(),
            'save a picture of both\nthis script and its result'
        );
    }
    if (shiftClicked) {
        menu.addItem(
            'download script',
            () => {
                var ide = this.parentThatIsA(IDE_Morph),
                    blockEditor = this.parentThatIsA(BlockEditorMorph);
                if (!ide && blockEditor) {
                    ide = blockEditor.target.parentThatIsA(IDE_Morph);
                }
                if (ide) {
                    ide.saveXMLAs(
                        ide.serializer.serialize(top),
                        top.selector + ' script',
                        false);
                }
            },
            'download this script\nas an XML file',
            new Color(100, 0, 0)
        );
    }
    if (proc) {
        if (vNames.length) {
            menu.addLine();
            vNames.forEach(vn =>
                menu.addItem(
                    vn + '...',
                    () => proc.doShowVar(vn)
                )
            );
        }
        proc.homeContext.variables.names().forEach(vn => {
            if (!contains(vNames, vn)) {
                menu.addItem(
                    vn + '...',
                    () => proc.doShowVar(vn)
                );
            }
        });
        return menu;
    }
    if (this.parent.parentThatIsA(RingMorph)) {
        menu.addLine();
        menu.addItem("unringify", 'unringify');
        if (this instanceof ReporterBlockMorph ||
                (!(top instanceof HatBlockMorph))) {
            menu.addItem("ringify", 'ringify');
        }
        return menu;
    }
    if (contains(
        ['doBroadcast', 'doBroadcastAndWait', 'receiveMessage',
            'receiveOnClone', 'receiveGo'],
        this.selector
    )) {
        hasLine = true;
        menu.addLine();
        menu.addItem(
            (this.selector.indexOf('receive') === 0 ?
                "senders..." : "receivers..."),
            'showMessageUsers'
        );
    }
    if (this.parent instanceof ReporterSlotMorph
            || (this.parent instanceof CommandSlotMorph)
            || (this instanceof HatBlockMorph)
            || (this instanceof CommandBlockMorph
                && (top instanceof HatBlockMorph))) {
        return menu;
    }
    if (!hasLine) {menu.addLine(); }
    menu.addItem("ringify", 'ringify');
    if (StageMorph.prototype.enableCodeMapping) {
        menu.addLine();
        menu.addItem(
            'header mapping...',
            'mapToHeader'
        );
        menu.addItem(
            'code mapping...',
            'mapToCode'
        );
    }
    return menu;
};