// PrototypeHatBlockMorph /////////////////////////////////////////////

import HatBlockMorph from "../blocks/HatBlockMorph";

// PrototypeHatBlockMorph instance creation:

export default class PrototypeHatBlockMorph extends HatBlockMorph {
    constructor(definition) {
        this.init(definition);
    }

    init(definition) {
        const proto = definition.prototypeInstance();
        let vars;

        this.definition = definition;

        // additional attributes to store edited data
        this.blockCategory = definition ? definition.category : null;
        this.type = definition ? definition.type : null;

        // init inherited stuff
        HatBlockMorph.uber.init.call(this);
        this.color = SpriteMorph.prototype.blockColor.control;
        this.category = 'control';
        this.add(proto);
        if (definition.variableNames.length) {
            vars = this.labelPart('%blockVars');
            this.add(this.labelPart('%br'));
            this.add(vars);
            definition.variableNames.forEach(name => {
                vars.addInput(name);
            });
        }
        proto.refreshPrototypeSlotTypes(); // show slot type indicators
        this.fixLayout();
        proto.fixBlockColor(this, true);
    }

    mouseClickLeft() {
        // relay the mouse click to my prototype block to
        // pop-up a Block Dialog, unless the shift key
        // is pressed, in which case initiate keyboard
        // editing support

        if (this.world().currentKey === 16) { // shift-clicked
            return this.focus();
        }
        this.parts()[0].mouseClickLeft();
    }

    userMenu() {
        return this.parts()[0].userMenu();
    }

    // PrototypeHatBlockMorph zebra coloring

    fixBlockColor(nearestBlock, isForced) {
        const nearest = this.parts()[0] || nearestBlock;

        if (!this.zebraContrast && !isForced) {
            return;
        }
        if (!this.zebraContrast && isForced) {
            return this.forceNormalColoring();
        }

        if (nearest.category === this.category) {
            if (nearest.color.eq(this.color)) {
                this.alternateBlockColor();
            }
        } else if (this.category && !this.color.eq(
                SpriteMorph.prototype.blockColor[this.category]
            )) {
            this.alternateBlockColor();
        }
        if (isForced) {
            this.fixChildrensBlockColor(true);
        }
    }

    // PrototypeHatBlockMorph block instance variables

    variableNames(choice) {
        const parts = this.parts();
        if (parts.length < 3) {return []; }
        return parts[2].evaluate();
    }

    enableBlockVars(choice) {
        const prot = this.parts()[0];
        if (choice === false) {
            this.setSpec('%s', true);
        } else {
            this.setSpec('%s %br %blockVars', true);
        }
        this.replaceInput(this.parts()[0], prot);
        this.spec = null;
    }
}