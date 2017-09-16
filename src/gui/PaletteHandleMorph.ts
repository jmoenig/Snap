// PaletteHandleMorph ////////////////////////////////////////////////////////

// I am a horizontal resizing handle for a blocks palette
// I pseudo-inherit many things from StageHandleMorph

// PaletteHandleMorph instance creation:

export default class PaletteHandleMorph extends Morph {
    constructor(target) {
        this.init(target);
    }

    init(target) {
        this.target = target || null;
        HandleMorph.uber.init.call(this);
        this.color = MorphicPreferences.isFlat ?
                new Color(255, 255, 255) : new Color(190, 190, 190);
        this.isDraggable = false;
        this.noticesTransparentClick = true;
        this.setExtent(new Point(12, 50));
    }

    // PaletteHandleMorph layout:

    fixLayout() {
        if (!this.target) {return; }
        const ide = this.target.parentThatIsA(IDE_Morph);
        this.setTop(this.target.top() + 10);
        this.setRight(this.target.right());
        if (ide) {ide.add(this); } // come to front
    }

    mouseDownLeft(pos) {
        const world = this.world();
        const offset = this.right() - pos.x;
        const ide = this.target.parentThatIsA(IDE_Morph);

        if (!this.target) {
            return null;
        }
        this.step = function () {
            let newPos;
            if (world.hand.mouseButton) {
                newPos = world.hand.bounds.origin.x + offset;
                ide.paletteWidth = Math.min(
                    Math.max(200, newPos),
                    ide.stageHandle.left() - ide.spriteBar.tabBar.width()
                );
                ide.setExtent(world.extent());

            } else {
                this.step = null;
            }
        };
    }

    mouseDoubleClick() {
        this.target.parentThatIsA(IDE_Morph).setPaletteWidth(200);
    }
}

// PaletteHandleMorph drawing:

PaletteHandleMorph.prototype.drawNew =
    StageHandleMorph.prototype.drawNew;

PaletteHandleMorph.prototype.drawOnCanvas =
    StageHandleMorph.prototype.drawOnCanvas;

// PaletteHandleMorph stepping:

PaletteHandleMorph.prototype.step = null;

// PaletteHandleMorph events:

PaletteHandleMorph.prototype.mouseEnter
    = StageHandleMorph.prototype.mouseEnter;

PaletteHandleMorph.prototype.mouseLeave
    = StageHandleMorph.prototype.mouseLeave;