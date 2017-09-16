// WardrobeMorph ///////////////////////////////////////////////////////

// I am a watcher on a sprite's costume list

// WardrobeMorph settings

// ... to follow ...

// WardrobeMorph instance creation:

export default class WardrobeMorph extends ScrollFrameMorph {
    constructor(aSprite, sliderColor) {
        this.init(aSprite, sliderColor);
    }

    init(aSprite, sliderColor) {
        // additional properties
        this.sprite = aSprite || new SpriteMorph();
        this.costumesVersion = null;
        this.spriteVersion = null;

        // initialize inherited properties
        super.init.call(this, null, null, sliderColor);

        // configure inherited properties
        this.fps = 2;
        this.updateList();
    }

    // Wardrobe updating

    updateList() {
        const myself = this;
        const x = this.left() + 5;
        let y = this.top() + 5;
        const padding = 4;
        const toolsPadding = 5;
        let oldFlag = Morph.prototype.trackChanges;
        const oldPos = this.contents.position();
        let icon;
        let template;
        let txt;
        let paintbutton;
        let cambutton;

        this.changed();
        oldFlag = Morph.prototype.trackChanges;
        Morph.prototype.trackChanges = false;

        this.contents.destroy();
        this.contents = new FrameMorph(this);
        this.contents.acceptsDrops = false;
        this.contents.reactToDropOf = icon => {
            myself.reactToDropOf(icon);
        };
        this.addBack(this.contents);

        icon = new TurtleIconMorph(this.sprite);
        icon.setPosition(new Point(x, y));
        myself.addContents(icon);
        y = icon.bottom() + padding;

        paintbutton = new PushButtonMorph(
            this,
            "paintNew",
            new SymbolMorph("brush", 15)
        );
        paintbutton.padding = 0;
        paintbutton.corner = 12;
        paintbutton.color = IDE_Morph.prototype.groupColor;
        paintbutton.highlightColor = IDE_Morph.prototype.frameColor.darker(50);
        paintbutton.pressColor = paintbutton.highlightColor;
        paintbutton.labelMinExtent = new Point(36, 18);
        paintbutton.labelShadowOffset = new Point(-1, -1);
        paintbutton.labelShadowColor = paintbutton.highlightColor;
        paintbutton.labelColor = TurtleIconMorph.prototype.labelColor;
        paintbutton.contrast = this.buttonContrast;
        paintbutton.drawNew();
        paintbutton.hint = "Paint a new costume";
        paintbutton.setPosition(new Point(x, y));
        paintbutton.fixLayout();
        paintbutton.setCenter(icon.center());
        paintbutton.setLeft(icon.right() + padding * 4);

        this.addContents(paintbutton);

        if (CamSnapshotDialogMorph.prototype.enableCamera) {
            cambutton = new PushButtonMorph(
                this,
                "newFromCam",
                new SymbolMorph("camera", 15)
            );
            cambutton.padding = 0;
            cambutton.corner = 12;
            cambutton.color = IDE_Morph.prototype.groupColor;
            cambutton.highlightColor = IDE_Morph.prototype.frameColor.darker(50);
            cambutton.pressColor = paintbutton.highlightColor;
            cambutton.labelMinExtent = new Point(36, 18);
            cambutton.labelShadowOffset = new Point(-1, -1);
            cambutton.labelShadowColor = paintbutton.highlightColor;
            cambutton.labelColor = TurtleIconMorph.prototype.labelColor;
            cambutton.contrast = this.buttonContrast;
            cambutton.drawNew();
            cambutton.hint = "Import a new costume from your webcam";
            cambutton.setPosition(new Point(x, y));
            cambutton.fixLayout();
            cambutton.setCenter(paintbutton.center());
            cambutton.setLeft(paintbutton.right() + toolsPadding);
            if (location.protocol === 'http:') {
                cambutton.hint = 'Due to browser security policies, you need to\n' +
                    'access Snap! through HTTPS to use the camera.\n\n' +
                    'Plase replace the "http://" part of the address\n' +
                    'in your browser by "https://" and try again.';
                cambutton.disable();
            }
            this.addContents(cambutton);
        }

        txt = new TextMorph(localize(
            "costumes tab help" // look up long string in translator
        ));
        txt.fontSize = 9;
        txt.setColor(SpriteMorph.prototype.paletteTextColor);

        txt.setPosition(new Point(x, y));
        this.addContents(txt);
        y = txt.bottom() + padding;

        this.sprite.costumes.asArray().forEach(costume => {
            template = icon = new CostumeIconMorph(costume, template);
            icon.setPosition(new Point(x, y));
            myself.addContents(icon);
            y = icon.bottom() + padding;
        });
        this.costumesVersion = this.sprite.costumes.lastChanged;

        this.contents.setPosition(oldPos);
        this.adjustScrollBars();
        Morph.prototype.trackChanges = oldFlag;
        this.changed();

        this.updateSelection();
    }

    updateSelection() {
        this.contents.children.forEach(morph => {
            if (morph.refresh) {morph.refresh(); }
        });
        this.spriteVersion = this.sprite.version;
    }

    // Wardrobe stepping

    step() {
        if (this.costumesVersion !== this.sprite.costumes.lastChanged) {
            this.updateList();
        }
        if (this.spriteVersion !== this.sprite.version) {
            this.updateSelection();
        }
    }

    // Wardrobe ops

    removeCostumeAt(idx) {
        this.sprite.shadowAttribute('costumes');
        this.sprite.costumes.remove(idx);
        this.updateList();
    }

    paintNew() {
        const cos = new Costume(
                newCanvas(null, true),
                this.sprite.newCostumeName(localize('Untitled'))
            );

        const ide = this.parentThatIsA(IDE_Morph);
        const myself = this;
        cos.edit(this.world(), ide, true, null, () => {
            myself.sprite.shadowAttribute('costumes');
            myself.sprite.addCostume(cos);
            myself.updateList();
            if (ide) {
                ide.currentSprite.wearCostume(cos);
            }
        });
    }

    newFromCam() {
        let camDialog;
        const ide = this.parentThatIsA(IDE_Morph);
        const myself = this;
        const sprite = this.sprite;

        camDialog = new CamSnapshotDialogMorph(
            ide,
            sprite,
            nop,
            costume => {
                sprite.addCostume(costume);
                sprite.wearCostume(costume);
                myself.updateList();
            });

        camDialog.popUp(this.world());
    }

    // Wardrobe drag & drop

    wantsDropOf(morph) {
        return morph instanceof CostumeIconMorph;
    }

    reactToDropOf(icon) {
        let idx = 0;
        const costume = icon.object;
        const top = icon.top();

        icon.destroy();
        this.contents.children.forEach(item => {
            if (item instanceof CostumeIconMorph && item.top() < top - 4) {
                idx += 1;
            }
        });
        this.sprite.shadowAttribute('costumes');
        this.sprite.costumes.add(costume, idx + 1);
        this.updateList();
        icon.mouseClickLeft(); // select
    }
}