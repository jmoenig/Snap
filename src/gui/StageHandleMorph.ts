// StageHandleMorph ////////////////////////////////////////////////////////

// I am a horizontal resizing handle for a StageMorph

// StageHandleMorph instance creation:

export default class StageHandleMorph extends Morph {
    constructor(target) {
        this.init(target);
    }

    init(target) {
        this.target = target || null;
        super.init.call(this);
        this.color = MorphicPreferences.isFlat ?
                IDE_Morph.prototype.groupColor : new Color(190, 190, 190);
        this.isDraggable = false;
        this.noticesTransparentClick = true;
        this.setExtent(new Point(12, 50));
    }

    // StageHandleMorph drawing:

    drawNew() {
        this.normalImage = newCanvas(this.extent());
        this.highlightImage = newCanvas(this.extent());
        this.drawOnCanvas(
            this.normalImage,
            this.color
        );
        this.drawOnCanvas(
            this.highlightImage,
            MorphicPreferences.isFlat ?
                    new Color(245, 245, 255) : new Color(100, 100, 255),
            this.color
        );
        this.image = this.normalImage;
        this.fixLayout();
    }

    drawOnCanvas(aCanvas, color, shadowColor) {
        const context = aCanvas.getContext('2d');
        let l = aCanvas.height / 8;
        const w = aCanvas.width / 6;
        const r = w / 2;
        let x;
        let y;
        let i;

        context.lineWidth = w;
        context.lineCap = 'round';
        y = aCanvas.height / 2;

        context.strokeStyle = color.toString();
        x = aCanvas.width / 12;
        for (i = 0; i < 3; i += 1) {
            if (i > 0) {
                context.beginPath();
                context.moveTo(x, y - (l - r));
                context.lineTo(x, y + (l - r));
                context.stroke();
            }
            x += (w * 2);
            l *= 2;
        }
        if (shadowColor) {
            context.strokeStyle = shadowColor.toString();
            x = aCanvas.width / 12 + w;
            l = aCanvas.height / 8;
            for (i = 0; i < 3; i += 1) {
                if (i > 0) {
                    context.beginPath();
                    context.moveTo(x, y - (l - r));
                    context.lineTo(x, y + (l - r));
                    context.stroke();
                }
                x += (w * 2);
                l *= 2;
            }
        }
    }

    // StageHandleMorph layout:

    fixLayout() {
        if (!this.target) {return; }
        const ide = this.target.parentThatIsA(IDE_Morph);
        this.setTop(this.target.top() + 10);
        this.setRight(this.target.left());
        if (ide) {ide.add(this); } // come to front
    }

    mouseDownLeft(pos) {
        const world = this.world();
        const offset = this.right() - pos.x;
        const myself = this;
        const ide = this.target.parentThatIsA(IDE_Morph);

        if (!this.target) {
            return null;
        }
        ide.isSmallStage = true;
        ide.controlBar.stageSizeButton.refresh();
        this.step = function () {
            let newPos;
            let newWidth;
            if (world.hand.mouseButton) {
                newPos = world.hand.bounds.origin.x + offset;
                newWidth = myself.target.right() - newPos;
                ide.stageRatio = newWidth / myself.target.dimensions.x;
                ide.setExtent(world.extent());

            } else {
                this.step = null;
                ide.isSmallStage = (ide.stageRatio !== 1);
                ide.controlBar.stageSizeButton.refresh();
            }
        };
    }

    // StageHandleMorph events:

    mouseEnter() {
        this.image = this.highlightImage;
        this.changed();
    }

    mouseLeave() {
        this.image = this.normalImage;
        this.changed();
    }

    mouseDoubleClick() {
        this.target.parentThatIsA(IDE_Morph).toggleStageSize(true, 1);
    }
}

// StageHandleMorph stepping:

StageHandleMorph.prototype.step = null;