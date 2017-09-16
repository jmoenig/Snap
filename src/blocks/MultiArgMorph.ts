// MultiArgMorph ///////////////////////////////////////////////////////

/*
    I am an arity controlled list of input slots

    my block specs are

        %mult%x - where x is any single input slot
        %inputs - for an additional text label 'with inputs'

    evaluation is handles by the interpreter
*/

import ArgMorph from "./ArgMorph";

// MultiArgMorph instance creation:

export default class MultiArgMorph extends ArgMorph {
    constructor(
        slotSpec,
        labelTxt,
        min,
        eSpec,
        arrowColor,
        labelColor,
        shadowColor,
        shadowOffset,
        isTransparent) {
        this.init(
            slotSpec,
            labelTxt,
            min,
            eSpec,
            arrowColor,
            labelColor,
            shadowColor,
            shadowOffset,
            isTransparent
        );
    }

    init(
        slotSpec,
        labelTxt,
        min,
        eSpec,
        arrowColor,
        labelColor,
        shadowColor,
        shadowOffset,
        isTransparent) {
        let label;
        const arrows = new FrameMorph();
        let leftArrow;
        let rightArrow;
        let i;

        this.slotSpec = slotSpec || '%s';
        this.labelText = localize(labelTxt || '');
        this.minInputs = min || 0;
        this.elementSpec = eSpec || null;
        this.labelColor = labelColor || null;
        this.shadowColor = shadowColor || null;
        this.shadowOffset = shadowOffset || null;

        this.canBeEmpty = true;
        super.init.call(this, null, true); // silently

        // MultiArgMorphs are transparent by default b/c of zebra coloring
        this.alpha = isTransparent === false ? 1 : 0;
        arrows.alpha = isTransparent === false ? 1 : 0;
        arrows.noticesTransparentClick = true;
        this.noticesTransparentclick = true;

        // label text:
        label = this.labelPart(this.labelText);
        this.add(label);
        label.hide();

        // left arrow:
        leftArrow = new ArrowMorph(
            'left',
            this.fontSize,
            Math.max(Math.floor(this.fontSize / 6), 1),
            arrowColor
        );

        // right arrow:
        rightArrow = new ArrowMorph(
            'right',
            this.fontSize,
            Math.max(Math.floor(this.fontSize / 6), 1),
            arrowColor
        );

        // control panel:
        arrows.add(leftArrow);
        arrows.add(rightArrow);
        arrows.drawNew();
        arrows.acceptsDrops = false;

        this.add(arrows);

        // create the minimum number of inputs
        for (i = 0; i < this.minInputs; i += 1) {
            this.addInput();
        }
    }

    label() {
        return this.children[0];
    }

    arrows() {
        return this.children[this.children.length - 1];
    }

    getSpec() {
        return `%mult${this.slotSpec}`;
    }

    // MultiArgMorph defaults:

    setContents(anArray) {
        const inputs = this.inputs();
        let i;
        for (i = 0; i < anArray.length; i += 1) {
            if (anArray[i] !== null && (inputs[i])) {
                inputs[i].setContents(anArray[i]);
            }
        }
    }

    // MultiArgMorph hiding and showing:

    /*
        override the inherited behavior to recursively hide/show all
        children, so that my instances get restored correctly when
        switching back out of app mode.
    */

    hide() {
        this.isVisible = false;
        this.changed();
    }

    show() {
        this.isVisible = true;
        this.changed();
    }

    // MultiArgMorph coloring:

    setLabelColor(textColor, shadowColor, shadowOffset) {
        this.textColor = textColor;
        this.shadowColor = shadowColor;
        this.shadowOffset = shadowOffset;
        super.setLabelColor.call(
            this,
            textColor,
            shadowColor,
            shadowOffset
        );
    }

    // MultiArgMorph layout:

    fixLayout() {
        if (this.slotSpec === '%t') {
            this.isStatic = true; // in this case I cannot be exchanged
        }
        if (this.parent) {
            const label = this.label();
            let shadowColor;
            let shadowOffset;
            this.color = this.parent.color;
            shadowColor = this.shadowColor ||
                this.parent.color.darker(this.labelContrast);
            shadowOffset = this.shadowOffset || label.shadowOffset;
            this.arrows().color = this.color;

            if (this.labelText !== '') {
                if (!label.shadowColor.eq(shadowColor)) {
                    label.shadowColor = shadowColor;
                    label.shadowOffset = shadowOffset;
                    label.drawNew();
                }
            }
        }
        this.fixArrowsLayout();
        super.fixLayout.call(this);
        if (this.parent) {
            this.parent.fixLayout();
        }
    }

    fixArrowsLayout() {
        const label = this.label();
        const arrows = this.arrows();
        const leftArrow = arrows.children[0];
        const rightArrow = arrows.children[1];
        const dim = new Point(rightArrow.width() / 2, rightArrow.height());
        if (this.inputs().length < (this.minInputs + 1)) {
            label.hide();
            leftArrow.hide();
            rightArrow.setPosition(
                arrows.position().subtract(new Point(dim.x, 0))
            );
            arrows.setExtent(dim);
        } else {
            if (this.labelText !== '') {
                label.show();
            }
            leftArrow.show();
            rightArrow.setPosition(leftArrow.topCenter());
            arrows.bounds.corner = rightArrow.bottomRight().copy();
        }
        arrows.drawNew();
    }

    refresh() {
        this.inputs().forEach(input => {
            input.drawNew();
        });
    }

    drawNew() {
        super.drawNew.call(this);
        this.refresh();
    }

    // MultiArgMorph arity control:

    addInput(contents) {
        let i;
        let name;
        const newPart = this.labelPart(this.slotSpec);
        const idx = this.children.length - 1;
        // newPart.alpha = this.alpha ? 1 : (1 - this.alpha) / 2;
        if (contents) {
            newPart.setContents(contents);
        } else if (this.elementSpec === '%scriptVars' ||
                this.elementSpec === '%blockVars') {
            name = '';
            i = idx;
            while (i > 0) {
                name = String.fromCharCode(97 + (i - 1) % 26) + name;
                i = Math.floor((i - 1) / 26);
            }
            newPart.setContents(name);
        } else if (contains(['%parms', '%ringparms'], this.elementSpec)) {
            newPart.setContents(`#${idx}`);
        }
        newPart.parent = this;
        this.children.splice(idx, 0, newPart);
        newPart.drawNew();
        this.fixLayout();
    }

    removeInput() {
        let oldPart;
        let scripts;
        if (this.children.length > 1) {
            oldPart = this.children[this.children.length - 2];
            this.removeChild(oldPart);
            if (oldPart instanceof BlockMorph) {
                scripts = this.parentThatIsA(ScriptsMorph);
                if (scripts) {
                    scripts.add(oldPart);
                }
            }
        }
        this.fixLayout();
    }

    // MultiArgMorph events:

    mouseClickLeft(pos) {
        // prevent expansion in the palette
        // (because it can be hard or impossible to collapse again)
        if (!this.parentThatIsA(ScriptsMorph)) {
            this.escalateEvent('mouseClickLeft', pos);
            return;
        }

        // if the <shift> key is pressed, repeat action 3 times
        const target = this.selectForEdit();

        const arrows = target.arrows();
        const leftArrow = arrows.children[0];
        const rightArrow = arrows.children[1];
        const repetition = target.world().currentKey === 16 ? 3 : 1;
        let i;

        target.startLayout();
        if (rightArrow.bounds.containsPoint(pos)) {
            for (i = 0; i < repetition; i += 1) {
                if (rightArrow.isVisible) {
                    target.addInput();
                }
            }
        } else if (leftArrow.bounds.containsPoint(pos)) {
            for (i = 0; i < repetition; i += 1) {
                if (leftArrow.isVisible) {
                    target.removeInput();
                }
            }
        } else {
            target.escalateEvent('mouseClickLeft', pos);
        }
        target.endLayout();
    }

    // MultiArgMorph menu:

    userMenu() {
        const menu = new MenuMorph(this);
        const block = this.parentThatIsA(BlockMorph);
        let key = '';
        const myself = this;
        if (!StageMorph.prototype.enableCodeMapping) {
            return this.parent.userMenu();
        }
        if (block) {
            if (block instanceof RingMorph) {
                key = 'parms_';
            } else if (block.selector === 'doDeclareVariables') {
                key = 'tempvars_';
            }
        }
        menu.addItem(
            'code list mapping...',
            () => {myself.mapCodeList(key); }
        );
        menu.addItem(
            'code item mapping...',
            () => {myself.mapCodeItem(key); }
        );
        menu.addItem(
            'code delimiter mapping...',
            () => {myself.mapCodeDelimiter(key); }
        );
        return menu;
    }

    // MultiArgMorph code mapping

    /*
        code mapping lets you use blocks to generate arbitrary text-based
        source code that can be exported and compiled / embedded elsewhere,
        it's not part of Snap's evaluator and not needed for Snap itself
    */

    mapCodeDelimiter(key) {
        this.mapToCode(`${key}delim`, 'list item delimiter');
    }

    mapCodeList(key) {
        this.mapToCode(`${key}list`, 'list contents <#1>');
    }

    mapCodeItem(key) {
        this.mapToCode(`${key}item`, 'list item <#1>');
    }

    mapToCode(key, label) {
        // private - open a dialog box letting the user map code via the GUI
        new DialogBoxMorph(
            this,
            code => {
                StageMorph.prototype.codeMappings[key] = code;
            },
            this
        ).promptCode(
            `Code mapping - ${label}`,
            StageMorph.prototype.codeMappings[key] || '',
            this.world()
        );
    }

    mappedCode(definitions) {
        const block = this.parentThatIsA(BlockMorph);
        let key = '';
        let code;
        let items = '';
        let itemCode;
        let delim;
        let count = 0;
        const parts = [];

        if (block) {
            if (block instanceof RingMorph) {
                key = 'parms_';
            } else if (block.selector === 'doDeclareVariables') {
                key = 'tempvars_';
            }
        }

        code = StageMorph.prototype.codeMappings[`${key}list`] || '<#1>';
        itemCode = StageMorph.prototype.codeMappings[`${key}item`] || '<#1>';
        delim = StageMorph.prototype.codeMappings[`${key}delim`] || ' ';

        this.inputs().forEach(input => {
            parts.push(itemCode.replace(/<#1>/g, input.mappedCode(definitions)));
        });
        parts.forEach(part => {
            if (count) {
                items += delim;
            }
            items += part;
            count += 1;
        });
        code = code.replace(/<#1>/g, items);
        return code;
    }

    // MultiArgMorph arity evaluating:

    evaluate() {
        // this is usually overridden by the interpreter. This method is only
        // called (and needed) for the variables menu.

        const result = [];
        this.inputs().forEach(slot => {
            result.push(slot.evaluate());
        });
        return result;
    }

    isEmptySlot() {
        return this.canBeEmpty ? this.inputs().length === 0 : false;
    }
}