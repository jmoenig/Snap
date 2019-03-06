var sec = "\u00A7"
coat = function(string) {
  return "\"" + string + "\"";
}
var thisMod = {
  blocks: [],
  categories: [],
  tabs: [],
  prototypes: []
}

Block = function(name, only, type, category, spec, pcat, defaults = null) {
  this.name = name;
  this.only = only;
  this.type = type;
  this.category = category;
  this.spec = spec;
  this.func = new Function();
  this.pcat = pcat;
  this.defaults = defaults;
}
Category = function(name, color) {
  this.name = name;
  this.color = color;
}
Tab = function(name, label) {
  this.name = name;
  this.label = label;
  this.content = new Function();
}
Block.prototype.pack = function() {
  var blockSuitcase = localStorage.getItem("blocks");
  blockSuitcase = blockSuitcase.split(sec);
  if (blockSuitcase[blockSuitcase.length - 1] == "") {
    blockSuitcase.pop();
  }
  blockSuitcase.push(this.name);
  blockSuitcase.join(sec);
  localStorage.setItem("blocks", blockSuitcase);
  localStorage.setItem("lambdaBlock-" + this.name, [coat(this.only), coat(this.type), coat(this.category), coat(this.spec), coat(this.pcat), this.defaults].join(sec));
  localStorage.setItem("lambdaBlock-" + this.name + "-prototype", this.func.toString());

}
Category.prototype.pack = function() {
  var categorySuitcase = localStorage.getItem("categories");
  categorySuitcase = categorySuitcase.split(sec);
  if (categorySuitcase[categorySuitcase.length - 1] == "") {
    categorySuitcase.pop();
  }
  categorySuitcase.push(this.name);
  categorySuitcase.join(sec);
  localStorage.setItem("categories", categorySuitcase);
  localStorage.setItem("lambdaCategory-" + this.name, coat(this.color));
}
Tab.prototype.pack = function() {
  var tabSuitcase = localStorage.getItem("tabs");
  tabSuitcase = tabSuitcase.split(sec);
  if (tabSuitcase[tabSuitcase.length - 1] == "") {
    tabSuitcase.pop();
  }
  tabSuitcase.push(this.name);
  tabSuitcase.join(sec);
  localStorage.setItem("tabs", tabSuitcase);
  localStorage.setItem("lambdaTab-" + this.name, coat(this.label));
  localStorage.setItem("lambdaTab-" + this.name + "-content", this.content.toString());

}
initializeMod = function() {
  var loadImg = document.getElementById("loading");
  var logArea = document.getElementById("log");
  localStorage.setItem("log", "LOG:\n")
  var divLog = function(what) {
    logArea.innerHTML += `<p>${what}</p>`;
    localStorage.setItem("log", localStorage.getItem("log") + what + '\n');
  }
  loadImg.setAttribute("style", "display: inline;");
  localStorage.setItem("blocks", "");
  localStorage.setItem("tabs", "");
  localStorage.setItem("categories", "");
  localStorage.setItem("symbols", "");
  localStorage.setItem("modules", "");
  localStorage.setItem("prototypes", "");
  localStorage.setItem("mods", "");
  divLog("Cleaning up local storage");
  for (i = 0; i < allMods.length; i++) {
    divLog("Executing mod " + allMods[i].split("\n")[0].substring(2).split("\`")[0])
    eval(allMods[i]);
  }
  divLog("Done executing mods");
  for (i = 0; i < thisMod.blocks.length; i++) {
    divLog("Packing block " + thisMod.blocks[i].name);
    thisMod.blocks[i].pack();
  }
  divLog("Done packing blocks");
  for (i = 0; i < thisMod.categories.length; i++) {
    divLog("Packing category " + thisMod.categories[i].name);
    thisMod.categories[i].pack();
  }
  divLog("Done packing categories");
  for (i = 0; i < thisMod.tabs.length; i++) {
    divLog("Packing tab " + thisMod.tabs[i].name);
    thisMod.tabs[i].pack();
  }
  divLog("Done packing tabs");
  divLog("Done packing mod, now redirecting to snap.html");
  window.location = "snap.html";
}
