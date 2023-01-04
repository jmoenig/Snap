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
            },
            reportCardRotation: {
                only: SpriteMorph,
                type: 'reporter',
                category: 'motion',
                spec: 'rotation'
            },
            reportCardAxisRotation: {
                only: SpriteMorph,
                type: 'reporter',
                category: 'motion',
                spec: '%axis rotation',
                defaults: [['x']]
            },
            reportCardScale: {
                only: SpriteMorph,
                type: 'reporter',
                category: 'looks',
                spec: 'scale'
            },
            reportCardAxisScale: {
                only: SpriteMorph,
                type: 'reporter',
                category: 'looks',
                spec: '%axis scale',
                defaults: [['x']]
            },
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
        blocks.push(block('reportCardRotation'));
        blocks.push(block('reportCardAxisRotation'));
    } else if (category === 'looks') {
        blocks.push(block('reportCardScale'));
        blocks.push(block('reportCardAxisScale'));
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

SpriteMorph.prototype.reportCardRotation = function () {
    const q = this.getCardProperty('rotation');
    if (q instanceof Array) {
        const x = q[0], y = q[1], z = q[2], w = q[3];
        return new List([
            Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * x * x - 2 * z * z),
            Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * y * y - 2 * z * z),
            Math.asin(2 * x * y + 2 * z * w)
        ]);
    }
    throw new Error('unsupported property');
};

SpriteMorph.prototype.reportCardAxisRotation = function (axis) {
    const q = this.getCardProperty('rotation');
    if (q instanceof Array) {
        const x = q[0], y = q[1], z = q[2], w = q[3];
        switch (Process.prototype.inputOption(axis)) {
            case 'x':
                return Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * x * x - 2 * z * z);
            case 'y':
                return Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * y * y - 2 * z * z);
            case 'z':
                return Math.asin(2 * x * y + 2 * z * w);
        }
    }
    throw new Error('unsupported property');
};

SpriteMorph.prototype.reportCardScale = function () {
    const scale = this.getCardProperty('scale');
    if (scale instanceof Array) {
        return new List(scale);
    }
    throw new Error('unsupported property');
};

SpriteMorph.prototype.reportCardAxisScale = function (axis) {
    const scale = this.getCardProperty('scale');
    if (scale instanceof Array) {
        switch (Process.prototype.inputOption(axis)) {
            case 'x':
                return scale[0];
            case 'y':
                return scale[1];
            case 'z':
                return scale[2];
        }
    }
    throw new Error('unsupported property');
};

SpriteMorph.prototype.getCardProperty = function (prop) {
    const card = this.card;
    if (card) {
        console.log(card.collectCardData());
        return card[prop];
    }
    throw new Error('card does not exist');
};