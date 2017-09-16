// CustomBlockDefinition ///////////////////////////////////////////////

// CustomBlockDefinition instance creation:

export default class CustomBlockDefinition {
    constructor(spec, receiver) {
        this.body = null; // a Context (i.e. a reified top block)
        this.scripts = [];
        this.category = null;
        this.isGlobal = false;
        this.type = 'command';
        this.spec = spec || '';
        // format: {'inputName' : [type, default, options, readonly]}
        this.declarations = {};
        this.variableNames = [];
        this.comment = null;
        this.codeMapping = null; // experimental, generate text code
        this.codeHeader = null; // experimental, generate text code

        // don't serialize (not needed for functionality):
        this.receiver = receiver || null; // for serialization only (pointer)
        this.editorDimensions = null; // a rectangle, last bounds of the editor
        this.cachedIsRecursive = null; // for automatic yielding
    }

    // CustomBlockDefinition instantiating blocks

    blockInstance() {
        let block;
        if (this.type === 'command') {
            block = new CustomCommandBlockMorph(this);
        } else {
            block = new CustomReporterBlockMorph(
                this,
                this.type === 'predicate'
            );
        }
        block.isDraggable = true;
        return block;
    }

    templateInstance() {
        let block;
        block = this.blockInstance();
        block.refreshDefaults(this);
        block.isDraggable = false;
        block.isTemplate = true;
        return block;
    }

    prototypeInstance() {
        let block;
        let slot;
        const myself = this;

        // make a new block instance and mark it as prototype
        if (this.type === 'command') {
            block = new CustomCommandBlockMorph(this, true);
        } else {
            block = new CustomReporterBlockMorph(
                this,
                this.type === 'predicate',
                true
            );
        }

        // assign slot declarations to prototype inputs
        block.parts().forEach(part => {
            if (part instanceof BlockInputFragmentMorph) {
                slot = myself.declarations[part.fragment.labelString];
                if (slot) {
                    part.fragment.type = slot[0];
                    part.fragment.defaultValue = slot[1];
                    part.fragment.options = slot[2];
                    part.fragment.isReadOnly = slot[3] || false;
                }
            }
        });

        return block;
    }

    // CustomBlockDefinition duplicating

    copyAndBindTo(sprite, headerOnly) {
        const c = copy(this);

        delete c[XML_Serializer.prototype.idProperty];
        c.receiver = sprite; // only for (kludgy) serialization
        c.declarations = copy(this.declarations); // might have to go deeper
        if (headerOnly) { // for serializing inherited method signatures
            c.body = null;
            return c;
        }
        if (c.body) {
            c.body = Process.prototype.reify.call(
                null,
                this.body.expression,
                new List(this.inputNames())
            );
            c.body.outerContext = null;
        }
        return c;
    }

    // CustomBlockDefinition accessing

    blockSpec() {
        const myself = this;
        const ans = [];
        const parts = this.parseSpec(this.spec);
        let spec;
        parts.forEach(part => {
            if (part[0] === '%' && part.length > 1) {
                spec = myself.typeOf(part.slice(1));
            } else if (part === '$nl') {
                spec = '%br';
            } else {
                spec = part;
            }
            ans.push(spec);
            ans.push(' ');
        });
        return ''.concat(...ans).trim();
    }

    helpSpec() {
        const ans = [];
        const parts = this.parseSpec(this.spec);
        parts.forEach(part => {
            if (part[0] !== '%') {
                ans.push(part);
            }
        });
        return ''.concat(...ans).replace(/\?/g, '');
    }

    typeOf(inputName) {
        if (this.declarations[inputName]) {
            return this.declarations[inputName][0];
        }
        return '%s';
    }

    defaultValueOf(inputName) {
        if (this.declarations[inputName]) {
            return this.declarations[inputName][1];
        }
        return '';
    }

    defaultValueOfInputIdx(idx) {
        const inputName = this.inputNames()[idx];
        return this.defaultValueOf(inputName);
    }

    dropDownMenuOfInputIdx(idx) {
        const inputName = this.inputNames()[idx];
        return this.dropDownMenuOf(inputName);
    }

    isReadOnlyInputIdx(idx) {
        const inputName = this.inputNames()[idx];
        return this.isReadOnlyInput(inputName);
    }

    inputOptionsOfIdx(idx) {
        const inputName = this.inputNames()[idx];
        return this.inputOptionsOf(inputName);
    }

    dropDownMenuOf(inputName) {
        if (this.declarations[inputName] && this.declarations[inputName][2]) {
            return this.parseChoices(this.declarations[inputName][2]);
        }
        return null;
    }

    parseChoices(string) {
        let dict = {};
        const stack = [dict];
        string.split('\n').forEach(line => {
            const pair = line.split('=');
            if (pair[0] === '}') {
                stack.pop();
                dict = stack[stack.length - 1];
            } else if (pair[1] === '{') {
                dict = {};
                stack[stack.length - 1][pair[0]] = dict;
                stack.push(dict);
            } else {
                dict[pair[0]] = isNil(pair[1]) ? pair[0] : pair[1];
            }
        });
        return dict;
    }

    isReadOnlyInput(inputName) {
        return this.declarations[inputName] &&
            this.declarations[inputName][3] === true;
    }

    inputOptionsOf(inputName) {
        return [
            this.dropDownMenuOf(inputName),
            this.isReadOnlyInput(inputName)
        ];
    }

    inputNames() {
        const vNames = [];
        const parts = this.parseSpec(this.spec);
        parts.forEach(part => {
            if (part[0] === '%' && part.length > 1) {
                vNames.push(part.slice(1));
            }
        });
        return vNames;
    }

    parseSpec(spec) {
        // private
        const parts = [];

        let word = '';
        let i;
        let quoted = false;
        let c;
        for (i = 0; i < spec.length; i += 1) {
            c = spec[i];
            if (c === "'") {
                quoted = !quoted;
            } else if (c === ' ' && !quoted) {
                parts.push(word);
                word = '';
            } else {
                word = word.concat(c);
            }
        }
        parts.push(word);
        return parts;
    }

    isDirectlyRecursive() {
        let myspec;
        if (this.cachedIsRecursive !== null) {
            return this.cachedIsRecursive;
        }
        if (!this.body) {
            this.cachedIsRecursive = false;
        } else {
            myspec = this.blockSpec();
            this.cachedIsRecursive = this.body.expression.anyChild(
                morph => morph.isCustomBlock &&
                    morph.blockSpec === myspec
            );
        }
        return this.cachedIsRecursive;
    }

    // CustomBlockDefinition picturing

    scriptsPicture() {
        return this.scriptsModel().scriptsPicture();
    }

    sortedElements() {
        return this.scriptsModel().sortedElements();
    }

    scriptsModel() {
        // answer a restored scripting area for the sake
        // of creating script pictures
        let scripts;

        let proto;
        let block;
        let comment;
        let template;

        scripts = new ScriptsMorph();
        scripts.cleanUpMargin = 10;
        proto = new PrototypeHatBlockMorph(this);
        proto.setPosition(scripts.position().add(10));
        if (this.comment !== null) {
            comment = this.comment.fullCopy();
            proto.comment = comment;
            comment.block = proto;
        }
        if (this.body !== null) {
            proto.nextBlock(this.body.expression.fullCopy());
        }
        scripts.add(proto);
        proto.fixBlockColor(null, true);
        this.scripts.forEach(element => {
            block = element.fullCopy();
            block.setPosition(scripts.position().add(element.position()));
            scripts.add(block);
            if (block instanceof BlockMorph) {
                block.allComments().forEach(comment => {
                    comment.align(block);
                });
            }
        });
        proto.allComments().forEach(comment => {
            comment.align(proto);
        });
        template = proto.parts()[0];
        template.fixLayout();
        template.forceNormalColoring();
        template.fixBlockColor(proto, true);
        scripts.fixMultiArgs();
        return scripts;
    }

    // CustomBlockDefinition purging deleted blocks

    purgeCorpses() {
        // remove blocks that have been marked for deletion
        if (this.body && this.body.expression.isCorpse) {
            this.body = null;
        }
        this.scripts = this.scripts.filter(topBlock => !topBlock.isCorpse);
    }
}