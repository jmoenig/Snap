SyntaxElementMorph.prototype.labelParts = Object.assign(
    SyntaxElementMorph.prototype.labelParts, {
        '%axis': {
            type: 'input',
            tags: 'read-only static',
            menu: {
                'x': ['x'],
                'y': ['y'],
                'z': ['z']
            }
        },
        '%dir3': {
            type: 'input',
            tags: 'read-only static',
            menu: 'directionMenu'
        },
    }
);

InputSlotMorph.prototype.directionMenu = function () {
    const block = this.parentThatIsA(BlockMorph);
    let dict;
    if (block.selector === 'move') {
        dict = {
            'forward': ['forward'],
            'backward': ['backward'],
            'left': ['left'],
            'right': ['right'],
            'up': ['up'],
            'down': ['down']
        };
    } else if (block.selector === 'turnTo') {
        dict = {
            'left': ['left'],
            'right': ['right'],
            'forward': ['forward'],
            'backward': ['backward']
        };
    } else if (block.selector === 'rollTo') {
        dict = {
            'left': ['left'],
            'right': ['right']
        };
    }
    return dict;
};

CommandBlockMorph.prototype.isStop = function () {
    if (this.selector === 'doStopThis') {
        const choice = this.inputs()[0].evaluate();
        return choice instanceof Array && choice[0].length < 12;
    }
    return ([
        'doForever',
        'doReport',
        'removeClone',
        'removeCardClone',
        'doSwitchToScene'
    ].indexOf(this.selector) > -1);
};
