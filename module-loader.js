//Lots of this code was written by David Hughes and Charles Hathaway for the 3Helix fellowship.
//No longer shall our people, the unappreciated software engineers, be subject to the persecution
//of the HASS overlords. Computer scientists of the world unite, you have nothing to lose but your paychecks.

function ModuleLoader(IDE) {
  this.serializer = new SnapSerializer();
  this.ide = IDE;
}

var dependency_graph = function(tree) {
  this.arguments = tree;
  this.tree = [];
  this.visited = [];

  /* Usage:
   *  var tree = [['A', ['B']], ['B', ['A']]]
   *  var t = new dependency_graph(tree);
   *  var graph = t.make_tree(); // Returns ['A', 'B']
   */

};

ModuleLoader.prototype.getParents = function(zip) {
  var package_json = zip.file("package.json");
  if (package_json != null) {
    var meta_text = package_json.asText();
    var json = JSON.parse(meta_text);
    return json['parents'];
  }
  return null;
}

ModuleLoader.prototype.loadModule = function(module, api, callback) {
  /**
   * Given the name of a module and a source API, does the following:
   *  - Resolves dependencies
   *  - Fetches modules and loads them in order
   *  - Calls callback on completition
   * Currently does not support module versioning
   */
  // First, fetch the module and all parents
  var loaded_modules = {};
  // Defined later, for reading
  var process_modules = null;
  var pending = 0;
  var myself = this;


  process_modules = function() {
    var depends_tree = [];
    for (var k in loaded_modules) {
      // Get a list of parents, if needed
      parents = myself.getParents(loaded_modules[k]);
      parents_list = [];
      if (parents != null) {
        for (p in parents) {
          parents_list.push([p]);
        }
      }
      depends_tree.push([k, parents_list]);
    }

    // Next get the order to load
    var tree = new dependency_graph(depends_tree);
    var graph = tree.make_tree();

    // And load each parent
    for (var i = 0; i < graph.length; i += 1) {
      myself.open(loaded_modules[graph[i]]);
    }
    // All done! Callback
    callback();
  };

  // Launch the first request
  JSZipUtils.getBinaryContent(myself.getApplicationURL(module, api), function(err, data) {
    // If the module has parents, we need to load those... otherwise all done
    var zip = new JSZip(data);
    loaded_modules[module] = zip;
    var parents = myself.getParents(zip);
    if (parents != null) {
      for (var k in parents) {
        if (!k in loaded_modules) {
          $.get({
            url: myself.getApplicationURL(k, api),
            success: append_module
          });
        }
      }
    }
    pending -= 1;
    if (pending <= 0) {
      process_modules();
    }
  });
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
  options = typeof options !== 'undefined' ? options : {
    base64: true
  };
  var zip = new JSZip(blob, options);
  var parents = null;

  var meta = zip.file("package.json");
  if (meta != null) {
    var meta_text = meta.asText();
    var parJSON = JSON.parse(meta_text);
    parents = parJSON.dependencies;
    if (parJSON.version) {
      if (!this.checkVersion(parJSON.version, version))
        if (parJSON.name) {
          console.log("Wrong version for module: " + parJSON.name)
        }
      else {
        console.log("Wrong module version and missing name :(")
      }
    }
  }
  return parents;
}

ModuleLoader.prototype.open = function(zip, options) {
  var meta = zip.file("package.json");
  if (meta != null) {
    var meta_text = meta.asText();
    var libJSON = JSON.parse(meta_text);
    if (libJSON.libraries) {
      for (var i = 0; i < libJSON.libraries.length; i++) {
        var library = document.createElement('script');
        library.async = false;
        library.src = config.lib_path + libJSON.libraries[i];
        library.type = 'text/javascript';
        document.body.appendChild(library);
      }
    }
  }

  var code = zip.file("code.js");
  if (code != null) {
    eval(code.asText());
  }

  // Iterate through blocks and load them all
  var f = zip.file("blocks.json");
  if (f != null) {
    var f_text = f.asText();
    var blockJSON = JSON.parse(f_text);
    for (var block in blockJSON) {
      SpriteMorph.prototype._blocks[block] = blockJSON[block];
      SpriteMorph.prototype[block] = eval(zip.file("blocks/" + block + ".js").asText());

      var b = blockJSON[block]

      if (typeof SpriteMorph.prototype._blockTemplates[b['category']] === 'undefined')
        SpriteMorph.prototype._blockTemplates[b['category']] = [];

      SpriteMorph.prototype._blockTemplates[b['category']].push(block);
    }

    this.ide.refreshPalette()
    this.ide.refreshIDE();
  }

  // Check to see if there is a demo script in the zip
  //  If so, load it
  var demo = zip.file("stage.xml");
  if (demo != null) {
    if ((location.hash.substr(0, 6) === '#lang:' || this.ide.userLanguage) && !this.ide.isLanguageSet) {
      var ide = this.ide
      ide.afterLanguageUniversalCallback = function() {
        ide.openProjectString(demo.asText());
        if (ide.afterModuleUniversalCallback) {
          ide.afterModuleUniversalCallback();
          ide.afterModuleUniversalCallback = null;
        }
        ide.isModuleLoaded = true;
      }
    } else {
      this.ide.openProjectString(demo.asText());
      this.ide.isModuleLoaded = true;
    }
  }

  return zip;
}

ModuleLoader.prototype.getApplicationURL = function(module, api_url) {
  //var module_name = this.slugify(module);
  // API doesn't support slugged module names yet
  var module_name = module;
  return api_url + module_name + "/" + module_name + ".zip";
}

ModuleLoader.prototype.slugify = function(text) {
  //Thanks to Mathew Byrne
  //https://gist.github.com/mathewbyrne/1280286
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

dependency_graph.prototype.make_tree = function() {
  while (this.arguments.length > 0) {
    var next = this.arguments[0];
    this.insert_node(next[0], this.get_parents(next[0]));
  }
  return this.tree.reverse();
};

dependency_graph.prototype.insert_node = function(node, parents) {
  // If I've been visited, but not inserted, this is a loop
  if (this.visited.indexOf(node) != -1 && this.tree.indexOf(node) == -1) {
    throw "Loop detected!";
  }

  this.visited.push(node);
  var lowest_point = 0;
  while (parents.length > 0) {
    var p = parents.shift();
    var i = this.tree.indexOf(p);
    if (i === -1) {
      // Insert into tree at lowest point
      this.insert_node(p, this.get_parents(p));
      i = this.tree.indexOf(p);
    }
    if (i < lowest_point) {
      lowest_point = i;
    }
  }

  this.tree.splice(lowest_point, 0, node);
  // Remove myself from the arguments
  this.remove_node(node);
};

dependency_graph.prototype.get_parents = function(node) {
  for (var i = 0; i < this.arguments.length; i += 1) {
    if (this.arguments[i][0] == node) {
      return this.arguments[i][1];
    }
  }
  return [];
};

dependency_graph.prototype.remove_node = function(node) {
  for (var i = 0; i < this.arguments.length; i += 1) {
    if (this.arguments[i][0] == node) {
      this.arguments.splice(i, 1);
    }
  }
};
