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
            menu: {
                'forward': ['forward'],
                'backward': ['backward'],
                'left': ['left'],
                'right': ['right'],
                'up': ['up'],
                'down': ['down']
            }
        },
    }
);