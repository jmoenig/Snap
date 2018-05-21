describe('serialization', function() {
    const utils = require('../../assets/utils');
    const fs = require('fs');
    const path = require('path');
    const libPath = path.join(__dirname, 'assets');

    fs.readdirSync(libPath)
        .filter(file => path.extname(file) === '.xml')
        .map(file => [file, fs.readFileSync(path.join(libPath, file), 'utf8')])
        .forEach(pair => it(`should parse ${pair[0]}`, utils.canLoadXml.bind(null, pair[1])));
    
});
