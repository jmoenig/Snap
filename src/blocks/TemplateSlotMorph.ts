// TemplateSlotMorph ///////////////////////////////////////////////////

/*
    I am a reporter block template sitting on a pedestal.
    My block spec is

    %t        - template

    evaluate returns the embedded reporter template's label string
*/

import ArgMorph from "./ArgMorph";

// TemplateSlotMorph instance creation:

export default class TemplateSlotMorph extends ArgMorph {
    constructor(name) {
        this.init(name);
    }

    init(name) {
        const template = new ReporterBlockMorph();
        this.labelString = name || '';
        template.isDraggable = false;
        template.isTemplate = true;
        if (modules.objects !== undefined) {
            template.color = SpriteMorph.prototype.blockColor.variables;
            template.category = 'variables';
        } else {
            template.color = new Color(243, 118, 29);
            template.category = null;
        }
        template.setSpec(this.labelString);
        template.selector = 'reportGetVar';
        super.init.call(this);
        this.add(template);
        this.fixLayout();
        this.isDraggable = false;
        this.isStatic = true; // I cannot be exchanged
    }

    // TemplateSlotMorph accessing:

    getSpec() {
        return '%t';
    }

    template() {
        return this.children[0];
    }

    contents() {
        return this.template().blockSpec;
    }

    setContents(aString) {
        const tmp = this.template();
        tmp.setSpec(aString);
        tmp.fixBlockColor(); // fix zebra coloring
        tmp.fixLabelColor();
    }

    // TemplateSlotMorph evaluating:

    evaluate() {
        return this.contents();
    }

    // TemplateSlotMorph layout:

    fixLayout() {
        const template = this.template();
        this.setExtent(template.extent().add(this.edge * 2 + 2));
        template.setPosition(this.position().add(this.edge + 1));
        if (this.parent) {
            if (this.parent.fixLayout) {
                this.parent.fixLayout();
            }
        }
    }

    // TemplateSlotMorph drop behavior:

    wantsDropOf(aMorph) {
        return aMorph.selector === 'reportGetVar';
    }

    reactToDropOf(droppedMorph) {
        if (droppedMorph.selector === 'reportGetVar') {
            droppedMorph.destroy();
        }
    }

    // TemplateSlotMorph drawing:

    drawNew() {
        let context;
        if (this.parent instanceof Morph) {
            this.color = this.parent.color.copy();
        }
        this.cachedClr = this.color.toString();
        this.cachedClrBright = this.bright();
        this.cachedClrDark = this.dark();
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        context.fillStyle = this.cachedClr;
        this.drawRounded(context);
    }

    // TemplateSlotMorph single-stepping

    flash() {
        this.template().flash();
    }

    unflash() {
        this.template().unflash();
    }
}

TemplateSlotMorph.prototype.drawRounded = ReporterBlockMorph
    .prototype.drawRounded;