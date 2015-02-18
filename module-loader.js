function ModuleLoader(IDE) {
    this.serializer = new SnapSerializer();
    this.ide = IDE;
}

ModuleLoader.prototype.checkVersion = function(moduleVersion, expectedVersion) {
   var compareType = expectedVersion[0]
   expectedVersion = expectedVersion.substr(1)
  if (compareType == '=') return moduleVersion == expectedVersion;             
   moduleVersion = moduleVersion.split('.')
   expectedVersion = expectedVersion.split('.')
   if (compareType == '>') {
     if (moduleVersion[0] > expectedVersion[0]) return true;
     if (moduleVersion[0] < expectedVersion[0]) return false;
     if (moduleVersion[1] > expectedVersion[1]) return true;
     if (moduleVersion[1] > expectedVersion[1]) return false;
     return moduleVersion[2] >= expectedVersion[2];
   }
  if (compareType == '~') {
     return (moduleVersion[0] == expectedVersion[0] && 
             moduleVersion[1] == expectedVersion[1] &&
             moduleVersion[2] >= expectedVersion[2])
  }
  return true;
  
}

ModuleLoader.prototype.checkModule = function(blob, version, options) {
    options = typeof options !== 'undefined' ? options : {base64: true};
    var zip = new JSZip(blob, options);
    var parents = null;
    
    var meta = zip.file("package.json");
    if(meta != null) {
      var meta_text = meta.asText();
      var parJSON = JSON.parse(meta_text);
      parents = parJSON.dependencies;
      if (parJSON.version) {
        if(!this.checkVersion(parJSON.version, version))
          if(parJSON.name) {
             console.log("Wrong version for module: " + parJSON.name)
          }
          else {
            console.log("Wrong module version and missing name :(")
          }
      }
    }
    return parents;
}

ModuleLoader.prototype.open = function(blob, options) {
    options = typeof options !== 'undefined' ? options : {base64: true};
    var zip = new JSZip(blob, options);
    
    var meta = zip.file("meta.json");
    if(meta != null) {
      var meta_text = meta.asText();
      var libJSON = JSON.parse(meta_text);
      if(libJSON.libraries) {
         for(var i = 0; i < libJSON.libraries.length; i++) {
            var library = document.createElement('script');
            library.async = false;
            library.src = config.lib_path + libJSON.libraries[i];
            library.type = 'text/javascript';
            document.body.appendChild(library);             
         }
      }
    }
  
    var code = zip.file("code.js");
    if(code != null) {
      eval(code.asText());
    }
  
  // Iterate through blocks and load them all
    var f = zip.file("blocks.json");
    if(f != null) {
      var f_text = f.asText();
      var blockJSON = JSON.parse(f_text);
      for(var block in blockJSON) {
          SpriteMorph.prototype._blocks[block] = blockJSON[block];
          SpriteMorph.prototype[block] = eval(zip.file("blocks/" + block + ".js").asText());

          var b = blockJSON[block]

          if(typeof SpriteMorph.prototype._blockTemplates[b['category']] === 'undefined')
              SpriteMorph.prototype._blockTemplates[b['category']] = [];

          SpriteMorph.prototype._blockTemplates[b['category']].push(block);
      }

      this.ide.refreshPalette()
      this.ide.refreshIDE();
    }
    
    // Check to see if there is a demo script in the zip
    //  If so, load it
    var demo = zip.file("stage.xml");
    if(demo != null) {
        this.ide.openProjectString(demo.asText());
    }
    
    return zip;
}
