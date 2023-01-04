SpriteMorph.prototype._initBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initBlocks = function () {
    this._initBlocks();
    Object.assign(
        SpriteMorph.prototype.blocks, {
            reportCardPosition: {
                only: SpriteMorph,
                type: 'reporter',
                category: 'motion',
                spec: 'position'
            },
            reportCardAxisPosition: {
                only: SpriteMorph,
                type: 'reporter',
                category: 'motion',
                spec: '%axis position',
                defaults: [['x']]
            }
        }
    );
}
SpriteMorph.prototype.initBlocks();

SpriteMorph.prototype._blockTemplates = SpriteMorph.prototype.blockTemplates;
SpriteMorph.prototype.blockTemplates = function (
    category = 'motion',
    all = false
) {
    const blocks = this._blockTemplates(category, all);

    function block(selector, isGhosted) {
        if (StageMorph.prototype.hiddenPrimitives[selector] && !all) {
            return null;
        }
        const newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        if (isGhosted) {
            newBlock.ghost();
        }
        return newBlock;
    }

    if (category === 'motion') {
        blocks.push(block('reportCardPosition'));
        blocks.push(block('reportCardAxisPosition'));
    }

    return blocks;
}

SpriteMorph.prototype.reportCardPosition = function () {
    const translation = this.getCardProperty('translation');
    if (translation instanceof Array) {
        return new List(translation);
    }
    throw new Error('unsupported property');
};

SpriteMorph.prototype.reportCardAxisPosition = function (axis) {
    const translation = this.getCardProperty('translation');
    if (translation instanceof Array) {
        switch (Process.prototype.inputOption(axis)) {
            case 'x':
                return translation[0];
            case 'y':
                return translation[1];
            case 'z':
                return translation[2];
        }
    }
    throw new Error('unsupported property');
};

SpriteMorph.prototype.getCardProperty = function (prop) {
    const card = this.card;
    if (card) {
        return card[prop];
    }
    throw new Error('card does not exist');
};