// CostumeIconMorph ////////////////////////////////////////////////////

/*
    I am a selectable element in the SpriteEditor's "Costumes" tab, keeping
    a self-updating thumbnail of the costume I'm respresenting, and a
    self-updating label of the costume's name (in case it is changed
    elsewhere)
*/

// CostumeIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph // TODO

// CostumeIconMorph settings

CostumeIconMorph.prototype.thumbSize = new Point(80, 60);
CostumeIconMorph.prototype.labelShadowOffset = null;
CostumeIconMorph.prototype.labelShadowColor = null;
CostumeIconMorph.prototype.labelColor = new Color(255, 255, 255);
CostumeIconMorph.prototype.fontSize = 9;

// CostumeIconMorph instance creation:

export default class CostumeIconMorph extends ToggleButtonMorph {
    constructor(aCostume, aTemplate) {
        this.init(aCostume, aTemplate);
    }

    init(aCostume, aTemplate) {
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
                ide.currentSprite.wearCostume(myself.object);
            }
            if (wardrobe) {
                wardrobe.updateSelection();
            }
        };

        query = () => {
            // answer true if my costume is the current one
            const ide = myself.parentThatIsA(IDE_Morph);

            if (ide) {
                return ide.currentSprite.costume === myself.object;
            }
            return false;
        };

        // additional properties:
        this.object = aCostume || new Costume(); // mandatory, actually
        this.version = this.object.version;
        this.thumbnail = null;

        // initialize inherited properties:
        super.init.call(
            this,
            colors, // color overrides, <array>: [normal, highlight, pressed]
            null, // target - not needed here
            action, // a toggle function
            this.object.name, // label string
            query, // predicate/selector
            null, // environment
            null, // hint
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

    // CostumeIconMorph menu

    userMenu() {
        const menu = new MenuMorph(this);
        if (!(this.object instanceof Costume)) {return null; }
        menu.addItem("edit", "editCostume");
        if (this.world().currentKey === 16) { // shift clicked
            menu.addItem(
                'edit rotation point only...',
                'editRotationPointOnly',
                null,
                new Color(100, 0, 0)
            );
        }
        menu.addItem("rename", "renameCostume");
        menu.addLine();
        menu.addItem("duplicate", "duplicateCostume");
        menu.addItem("delete", "removeCostume");
        menu.addLine();
        menu.addItem("export", "exportCostume");
        return menu;
    }

    editCostume() {
        this.disinherit();
        if (this.object instanceof SVG_Costume) {
            this.object.editRotationPointOnly(this.world());
        } else {
            this.object.edit(
                this.world(),
                this.parentThatIsA(IDE_Morph),
                false // not a new costume, retain existing rotation center
            );
        }
    }

    editRotationPointOnly() {
        const ide = this.parentThatIsA(IDE_Morph);
        this.object.editRotationPointOnly(this.world());
        ide.hasChangedMedia = true;
    }

    renameCostume() {
        this.disinherit();
        const costume = this.object;
        const wardrobe = this.parentThatIsA(WardrobeMorph);
        const ide = this.parentThatIsA(IDE_Morph);
        new DialogBoxMorph(
            null,
            answer => {
                if (answer && (answer !== costume.name)) {
                    costume.name = wardrobe.sprite.newCostumeName(
                        answer,
                        costume
                    );
                    costume.version = Date.now();
                    ide.hasChangedMedia = true;
                }
            }
        ).prompt(
            this.currentSprite instanceof SpriteMorph ?
                'rename costume' : 'rename background',
            costume.name,
            this.world()
        );
    }

    duplicateCostume() {
        const wardrobe = this.parentThatIsA(WardrobeMorph);
        const ide = this.parentThatIsA(IDE_Morph);
        const newcos = this.object.copy();
        newcos.name = wardrobe.sprite.newCostumeName(newcos.name);
        wardrobe.sprite.addCostume(newcos);
        wardrobe.updateList();
        if (ide) {
            ide.currentSprite.wearCostume(newcos);
        }
    }

    removeCostume() {
        const wardrobe = this.parentThatIsA(WardrobeMorph);
        const idx = this.parent.children.indexOf(this);
        const off = CamSnapshotDialogMorph.prototype.enableCamera ? 3 : 2;
        const ide = this.parentThatIsA(IDE_Morph);
        wardrobe.removeCostumeAt(idx - off); // ignore paintbrush and camera buttons
        if (ide.currentSprite.costume === this.object) {
            ide.currentSprite.wearCostume(null);
        }
    }

    exportCostume() {
        const ide = this.parentThatIsA(IDE_Morph);
        if (this.object instanceof SVG_Costume) {
            // don't show SVG costumes in a new tab (shows text)
            ide.saveFileAs(this.object.contents.src, 'text/svg', this.object.name);
        } else { // rasterized Costume
            ide.saveCanvasAs(this.object.contents, this.object.name, false);
        }
    }

    // CostumeIconMorph inheritance

    disinherit() {
        const wardrobe = this.parentThatIsA(WardrobeMorph);
        const idx = this.parent.children.indexOf(this);
        if (wardrobe.sprite.inheritsAttribute('costumes')) {
            wardrobe.sprite.shadowAttribute('costumes');
            this.object = wardrobe.sprite.costumes.at(idx - 2);
        }
    }

    // CostumeIconMorph drag & drop

    prepareToBeGrabbed() {
        this.disinherit();
        this.mouseClickLeft(); // select me
        this.removeCostume();
    }
}

CostumeIconMorph.prototype.createThumbnail
    = SpriteIconMorph.prototype.createThumbnail;

CostumeIconMorph.prototype.createLabel
    = SpriteIconMorph.prototype.createLabel;

// CostumeIconMorph stepping

CostumeIconMorph.prototype.step
    = SpriteIconMorph.prototype.step;

// CostumeIconMorph layout

CostumeIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

// CostumeIconMorph drawing

CostumeIconMorph.prototype.createBackgrounds
    = SpriteIconMorph.prototype.createBackgrounds;