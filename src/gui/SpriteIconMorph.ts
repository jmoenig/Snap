// SpriteIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in the Sprite corral, keeping a self-updating
    thumbnail of the sprite I'm respresenting, and a self-updating label
    of the sprite's name (in case it is changed elsewhere)
*/

import IDE_Morph from "./IDE_Morph";

// SpriteIconMorph inherits from ToggleButtonMorph (Widgets)

// SpriteIconMorph settings

SpriteIconMorph.prototype.thumbSize = new Point(40, 40);
SpriteIconMorph.prototype.labelShadowOffset = null;
SpriteIconMorph.prototype.labelShadowColor = null;
SpriteIconMorph.prototype.labelColor = new Color(255, 255, 255);
SpriteIconMorph.prototype.fontSize = 9;

// SpriteIconMorph instance creation:

export default class SpriteIconMorph extends ToggleButtonMorph {
    constructor(aSprite, aTemplate) {
        this.init(aSprite, aTemplate);
    }

    init(aSprite, aTemplate) {
        let colors;
        let action;
        let query;
        let hover;
        const myself = this;

        if (!aTemplate) {
            colors = [
                IDE_Morph.prototype.groupColor,
                IDE_Morph.prototype.frameColor,
                IDE_Morph.prototype.frameColor
            ];

        }

        action = () => {
            // make my sprite the current one
            const ide = myself.parentThatIsA(IDE_Morph);

            if (ide) {
                ide.selectSprite(myself.object);
            }
        };

        query = () => {
            // answer true if my sprite is the current one
            const ide = myself.parentThatIsA(IDE_Morph);

            if (ide) {
                return ide.currentSprite === myself.object;
            }
            return false;
        };

        hover = () => {
            if (!aSprite.exemplar) {return null; }
            return (`${localize('parent')}:\n${aSprite.exemplar.name}`);
        };

        // additional properties:
        this.object = aSprite || new SpriteMorph(); // mandatory, actually
        this.version = this.object.version;
        this.thumbnail = null;
        this.rotationButton = null; // synchronous rotation of nested sprites

        // initialize inherited properties:
        super.init.call(
            this,
            colors, // color overrides, <array>: [normal, highlight, pressed]
            null, // target - not needed here
            action, // a toggle function
            this.object.name, // label string
            query, // predicate/selector
            null, // environment
            hover, // hint
            aTemplate // optional, for cached background images
        );

        // override defaults and build additional components
        this.isDraggable = true;
        this.createThumbnail();
        this.padding = 2;
        this.corner = 8;
        this.fixLayout();
        this.fps = 1;
    }

    createThumbnail() {
        if (this.thumbnail) {
            this.thumbnail.destroy();
        }

        this.thumbnail = new Morph();
        this.thumbnail.setExtent(this.thumbSize);
        if (this.object instanceof SpriteMorph) { // support nested sprites
            this.thumbnail.image = this.object.fullThumbnail(this.thumbSize);
            this.createRotationButton();
        } else {
            this.thumbnail.image = this.object.thumbnail(this.thumbSize);
        }
        this.add(this.thumbnail);
    }

    createLabel() {
        let txt;

        if (this.label) {
            this.label.destroy();
        }
        txt = new StringMorph(
            this.object.name,
            this.fontSize,
            this.fontStyle,
            true,
            false,
            false,
            this.labelShadowOffset,
            this.labelShadowColor,
            this.labelColor
        );

        this.label = new FrameMorph();
        this.label.acceptsDrops = false;
        this.label.alpha = 0;
        this.label.setExtent(txt.extent());
        txt.setPosition(this.label.position());
        this.label.add(txt);
        this.add(this.label);
    }

    createRotationButton() {
        let button;
        const myself = this;

        if (this.rotationButton) {
            this.rotationButton.destroy();
            this.roationButton = null;
        }
        if (!this.object.anchor) {
            return;
        }

        button = new ToggleButtonMorph(
            null, // colors,
            null, // target
            () => {
                myself.object.rotatesWithAnchor =
                    !myself.object.rotatesWithAnchor;
            },
            [
                '\u2192',
                '\u21BB'
            ],
            () => // query
            myself.object.rotatesWithAnchor
        );

        button.corner = 8;
        button.labelMinExtent = new Point(11, 11);
        button.padding = 0;
        button.pressColor = button.color;
        button.drawNew();
        // button.hint = 'rotate synchronously\nwith anchor';
        button.fixLayout();
        button.refresh();
        button.changed();
        this.rotationButton = button;
        this.add(this.rotationButton);
    }

    // SpriteIconMorph stepping

    step() {
        if (this.version !== this.object.version) {
            this.createThumbnail();
            this.createLabel();
            this.fixLayout();
            this.version = this.object.version;
            this.refresh();
        }
    }

    // SpriteIconMorph layout

    fixLayout() {
        if (!this.thumbnail || !this.label) {return null; }

        this.setWidth(
            this.thumbnail.width()
                + this.outline * 2
                + this.edge * 2
                + this.padding * 2
        );

        this.setHeight(
            this.thumbnail.height()
                + this.outline * 2
                + this.edge * 2
                + this.padding * 3
                + this.label.height()
        );

        this.thumbnail.setCenter(this.center());
        this.thumbnail.setTop(
            this.top() + this.outline + this.edge + this.padding
        );

        if (this.rotationButton) {
            this.rotationButton.setTop(this.top());
            this.rotationButton.setRight(this.right());
        }

        this.label.setWidth(
            Math.min(
                this.label.children[0].width(), // the actual text
                this.thumbnail.width()
            )
        );
        this.label.setCenter(this.center());
        this.label.setTop(
            this.thumbnail.bottom() + this.padding
        );
    }

    // SpriteIconMorph menu

    userMenu() {
        const menu = new MenuMorph(this);
        const myself = this;
        if (this.object instanceof StageMorph) {
            menu.addItem(
                'pic...',
                function () {
                    const ide = myself.parentThatIsA(IDE_Morph);
                    ide.saveCanvasAs(
                        myself.object.fullImageClassic(),
                        this.object.name,
                        true
                    );
                },
                'open a new window\nwith a picture of the stage'
            );
            return menu;
        }
        if (!(this.object instanceof SpriteMorph)) {return null; }
        menu.addItem("show", 'showSpriteOnStage');
        menu.addLine();
        menu.addItem("duplicate", 'duplicateSprite');
        if (StageMorph.prototype.enableInheritance) {
            menu.addItem("clone", 'instantiateSprite');
        }
        menu.addItem("delete", 'removeSprite');
        menu.addLine();
        if (StageMorph.prototype.enableInheritance) {
            /* version that hides refactoring capability unless shift-clicked
            if (this.world().currentKey === 16) { // shift-clicked
                menu.addItem(
                    "parent...",
                    'chooseExemplar',
                    null,
                    new Color(100, 0, 0)
                );
            }
            */
            menu.addItem("parent...", 'chooseExemplar');
            if (this.object.exemplar) {
                menu.addItem(
                    "release",
                    'releaseSprite',
                    'make temporary and\nhide in the sprite corral'
                );
            }
        }
        if (this.object.anchor) {
            menu.addItem(
                `${localize('detach from')} ${this.object.anchor.name}`,
                () => {myself.object.detachFromAnchor(); }
            );
        }
        if (this.object.parts.length) {
            menu.addItem(
                'detach all parts',
                () => {myself.object.detachAllParts(); }
            );
        }
        menu.addItem("export...", 'exportSprite');
        return menu;
    }

    duplicateSprite() {
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.duplicateSprite(this.object);
        }
    }

    instantiateSprite() {
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.instantiateSprite(this.object);
        }
    }

    removeSprite() {
        const ide = this.parentThatIsA(IDE_Morph);
        if (ide) {
            ide.removeSprite(this.object);
        }
    }

    exportSprite() {
        this.object.exportSprite();
    }

    chooseExemplar() {
        this.object.chooseExemplar();
    }

    releaseSprite() {
        this.object.release();
    }

    showSpriteOnStage() {
        this.object.showOnStage();
    }

    // SpriteIconMorph drawing

    createBackgrounds() {
        //    only draw the edges if I am selected
        let context;

        const ext = this.extent();

        if (this.template) { // take the backgrounds images from the template
            this.image = this.template.image;
            this.normalImage = this.template.normalImage;
            this.highlightImage = this.template.highlightImage;
            this.pressImage = this.template.pressImage;
            return null;
        }

        this.normalImage = newCanvas(ext);
        context = this.normalImage.getContext('2d');
        this.drawBackground(context, this.color);

        this.highlightImage = newCanvas(ext);
        context = this.highlightImage.getContext('2d');
        this.drawBackground(context, this.highlightColor);

        this.pressImage = newCanvas(ext);
        context = this.pressImage.getContext('2d');
        this.drawOutline(context);
        this.drawBackground(context, this.pressColor);
        this.drawEdges(
            context,
            this.pressColor,
            this.pressColor.lighter(this.contrast),
            this.pressColor.darker(this.contrast)
        );

        this.image = this.normalImage;
    }

    // SpriteIconMorph drag & drop

    prepareToBeGrabbed() {
        const ide = this.parentThatIsA(IDE_Morph);
        let idx;
        this.mouseClickLeft(); // select me
        this.alpha = 0.85;
        if (ide) {
            idx = ide.sprites.asArray().indexOf(this.object);
            ide.sprites.remove(idx + 1);
            ide.createCorral();
            ide.fixLayout();
        }
    }

    justDropped() {
        this.alpha = 1;
    }

    wantsDropOf(morph) {
        // allow scripts & media to be copied from one sprite to another
        // by drag & drop
        return morph instanceof BlockMorph
            || (morph instanceof CostumeIconMorph)
            || (morph instanceof SoundIconMorph);
    }

    reactToDropOf(morph, hand) {
        if (morph instanceof BlockMorph) {
            this.copyStack(morph);
        } else if (morph instanceof CostumeIconMorph) {
            this.copyCostume(morph.object);
        } else if (morph instanceof SoundIconMorph) {
            this.copySound(morph.object);
        }
        this.world().add(morph);
        morph.slideBackTo(hand.grabOrigin);
    }

    copyStack(block) {
        const dup = block.fullCopy();
        const y = Math.max(this.object.scripts.children.map(stack => stack.fullBounds().bottom()).concat([this.object.scripts.top()]));

        dup.setPosition(new Point(this.object.scripts.left() + 20, y + 20));
        this.object.scripts.add(dup);
        dup.allComments().forEach(comment => {
            comment.align(dup);
        });
        this.object.scripts.adjustBounds();

        // delete all custom blocks pointing to local definitions
        // under construction...
        dup.allChildren().forEach(morph => {
            if (morph.definition && !morph.definition.isGlobal) {
                morph.deleteBlock();
            }
        });
    }

    copyCostume(costume) {
        const dup = costume.copy();
        dup.name = this.object.newCostumeName(dup.name);
        this.object.addCostume(dup);
        this.object.wearCostume(dup);
    }

    copySound(sound) {
        const dup = sound.copy();
        this.object.addSound(dup.audio, dup.name);
    }
}