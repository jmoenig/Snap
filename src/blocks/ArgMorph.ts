// ArgMorph //////////////////////////////////////////////////////////

/*
    I am a syntax element and the ancestor of all block inputs.
    I am present in block labels.
    Usually I am just a receptacle for inherited methods and attributes,
    however, if my 'type' attribute is set to one of the following
    values, I act as an iconic slot myself:

        'list'    - a list symbol
*/

import SyntaxElementMorph from "./SyntaxElementMorph";

// ArgMorph instance creation:

export default class ArgMorph extends SyntaxElementMorph {
    constructor(type) {
        this.init(type);
    }

    init(type, silently) {
        this.type = type || null;
        this.isHole = false;
        super.init.call(this, silently);
        this.color = new Color(0, 17, 173);
        this.setExtent(new Point(50, 50), silently);
    }

    // ArgMorph events:

    reactToSliderEdit() {
        /*
            directly execute the stack of blocks I'm part of if my
            "executeOnSliderEdit" setting is turned on, obeying the stage's
            thread safety setting. This feature allows for "Bret Victor" style
            interactive coding.
        */
        let block;

        let top;
        let receiver;
        let stage;
        if (!this.executeOnSliderEdit) {return; }
        block = this.parentThatIsA(BlockMorph);
        if (block) {
            top = block.topBlock();
            receiver = top.scriptTarget();
            if (top instanceof PrototypeHatBlockMorph) {
                return;
            }
            if (receiver) {
                stage = receiver.parentThatIsA(StageMorph);
                if (stage && (stage.isThreadSafe ||
                        Process.prototype.enableSingleStepping)) {
                    stage.threads.startProcess(top, receiver, stage.isThreadSafe);
                } else {
                    top.mouseClickLeft();
                }
            }
        }
    }

    // ArgMorph drag & drop: for demo puposes only

    justDropped() {
        if (!(this instanceof CommandSlotMorph)) {
            this.drawNew();
            this.changed();
        }
    }

    // ArgMorph spec extrapolation (for demo purposes)

    getSpec() {
        return '%s'; // default
    }

    // ArgMorph drawing

    drawNew() {
        if (this.type === 'list') {
            this.image = this.listIcon();
            this.silentSetExtent(new Point(
                this.image.width,
                this.image.height
            ));
        } else if (this.type === 'object') {
            this.image = this.objectIcon();
            this.silentSetExtent(new Point(
                this.image.width,
                this.image.height
            ));
        } else {
            super.drawNew.call(this);
        }
    }

    listIcon() {
        const frame = new Morph();
        const first = new CellMorph();
        const second = new CellMorph();
        let source;
        let icon;
        let context;
        let ratio;

        frame.color = new Color(255, 255, 255);
        second.setPosition(first.bottomLeft().add(new Point(
            0,
            this.fontSize / 3
        )));
        first.add(second);
        first.setPosition(frame.position().add(this.fontSize));
        frame.add(first);
        frame.bounds.corner = second.bounds.corner.add(this.fontSize);
        frame.drawNew();
        source = frame.fullImage();
        ratio = (this.fontSize + this.edge) / source.height;
        icon = newCanvas(new Point(
            Math.ceil(source.width * ratio) + 1,
            Math.ceil(source.height * ratio) + 1
        ));
        context = icon.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, icon.width, icon.height);
        context.scale(ratio, ratio);
        context.drawImage(source, 1 / ratio, 1 / ratio);
        return icon;
    }

    objectIcon() {
        return this.labelPart('%turtle').image;
    }

    // ArgMorph evaluation

    isEmptySlot() {
        return this.type !== null;
    }
}

// ArgMorph preferences settings:

ArgMorph.prototype.executeOnSliderEdit = false;