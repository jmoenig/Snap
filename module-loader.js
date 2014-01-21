modules.module_loader = '2014-January-16'

function ModuleLoader(IDE) {
    this.serializer = new SnapSerializer();
    this.ide = IDE;
}

ModuleLoader.prototype.open = function(blob, options) {
    options = typeof options !== 'undefined' ? options : {base64: true};
    var zip = new JSZip(blob, options);
    
    // Iterate through blocks and load them all
    var f = zip.file("blocks.json");
    var f_text = f.asText();
    var blockJSON = JSON.parse(f_text);
    for(var block in blockJSON) {
        SpriteMorph.prototype._blocks[block] = blockJSON[block];
        SpriteMorph.prototype[block] = eval('(' + zip.file("blocks/" + block + ".js").asText() + ')');
        
        var b = blockJSON[block]
        
        if(typeof SpriteMorph.prototype._blockTemplates[b['category']] === 'undefined')
            SpriteMorph.prototype._blockTemplates[b['category']] = [];
        
        SpriteMorph.prototype._blockTemplates[b['category']].push(block);
    }
    
    this.ide.refreshPalette()
    this.ide.refreshIDE();
    
    // Check to see if there is a demo script in the zip
    //  If so, load it
    var demo = zip.file("stage.xml");
    if(demo != null) {
        this.ide.openProjectString(demo.asText());
    }
    
    return zip;
}
