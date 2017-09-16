// TurtleIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in the SpriteEditor's "Costumes" tab, keeping
    a thumbnail of the sprite's or stage's default "Turtle" costume.
*/

// TurtleIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph // TODO

// TurtleIconMorph settings

TurtleIconMorph.prototype.thumbSize = new Point(80, 60);
TurtleIconMorph.prototype.labelShadowOffset = null;
TurtleIconMorph.prototype.labelShadowColor = null;
TurtleIconMorph.prototype.labelColor = new Color(255, 255, 255);
TurtleIconMorph.prototype.fontSize = 9;

// TurtleIconMorph instance creation:

export default class TurtleIconMorph extends ToggleButtonMorph {
    constructor(aSpriteOrStage, aTemplate) {
        this.init(aSpriteOrStage, aTemplate);
    }

    init(aSpriteOrStage, aTemplate) {
        let colors;
        let action;
        let query;
        const myself = this;

        if (!aTemplate) {
            colors = [
                IDE_Morph.prototype.groupColor,
                IDE_Morph.prototype.frameColor,
                IDE_Morph.prototype.frameColor
            ];

        }

        action = () => {
            // make my costume the current one
            const ide = myself.parentThatIsA(IDE_Morph);

            const wardrobe = myself.parentThatIsA(WardrobeMorph);

            if (ide) {
                ide.currentSprite.wearCostume(null);
            }
            if (wardrobe) {
                wardrobe.updateSelection();
            }
        };

        query = () => {
            // answer true if my costume is the current one
            const ide = myself.parentThatIsA(IDE_Morph);

            if (ide) {
                return ide.currentSprite.costume === null;
            }
            return false;
        };

        // additional properties:
        this.object = aSpriteOrStage; // mandatory, actually
        this.version = this.object.version;
        this.thumbnail = null;

        // initialize inherited properties:
        super.init.call(
            this,
            colors, // color overrides, <array>: [normal, highlight, pressed]
            null, // target - not needed here
            action, // a toggle function
            'default', // label string
            query, // predicate/selector
            null, // environment
            null, // hint
            aTemplate // optional, for cached background images
        );

        // override defaults and build additional components
        this.isDraggable = false;
        this.createThumbnail();
        this.padding = 2;
        this.corner = 8;
        this.fixLayout();
    }

    createThumbnail() {
        const isFlat = MorphicPreferences.isFlat;

        if (this.thumbnail) {
            this.thumbnail.destroy();
        }
        if (this.object instanceof SpriteMorph) {
            this.thumbnail = new SymbolMorph(
                'turtle',
                this.thumbSize.y,
                this.labelColor,
                isFlat ? null : new Point(-1, -1),
                new Color(0, 0, 0)
            );
        } else {
            this.thumbnail = new SymbolMorph(
                'stage',
                this.thumbSize.y,
                this.labelColor,
                isFlat ? null : new Point(-1, -1),
                new Color(0, 0, 0)
            );
        }
        this.add(this.thumbnail);
    }

    createLabel() {
        let txt;

        if (this.label) {
            this.label.destroy();
        }
        txt = new StringMorph(
            localize(
                this.object instanceof SpriteMorph ? 'Turtle' : 'Empty'
            ),
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

    // TurtleIconMorph user menu

    userMenu() {
        const myself = this;
        const menu = new MenuMorph(this, 'pen');
        const on = '\u25CF';
        const off = '\u25CB';
        if (this.object instanceof StageMorph) {
            return null;
        }
        menu.addItem(
            `${this.object.penPoint === 'tip' ? on : off} ${localize('tip')}`,
            () => {
                myself.object.penPoint = 'tip';
                myself.object.changed();
                myself.object.drawNew();
                myself.object.changed();
            }
        );
        menu.addItem(
            `${this.object.penPoint === 'middle' ? on : off} ${localize(
    'middle'
)}`,
            () => {
                myself.object.penPoint = 'middle';
                myself.object.changed();
                myself.object.drawNew();
                myself.object.changed();
            }
        );
        return menu;
    }
}

// TurtleIconMorph layout

TurtleIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

// TurtleIconMorph drawing

TurtleIconMorph.prototype.createBackgrounds
    = SpriteIconMorph.prototype.createBackgrounds;