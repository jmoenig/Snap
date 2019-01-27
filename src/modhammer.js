//This adds the mods into Snap
var sec = "\u00A7"
divLog = function(what) {
  localStorage.setItem("log", localStorage.getItem("log") + what + '\n');
}
var lambda = {
  blocks: localStorage.getItem("blocks"),
  tabs: localStorage.getItem("tabs"),
  categories: localStorage.getItem("categories"),
  symbols: localStorage.getItem("symbols"),
  modules: localStorage.getItem("modules"),
  prototypes: localStorage.getItem("prototypes"),
  mods: localStorage.getItem("mods")
}
var lm = {
  blocks: [],
  tabs: [],
  categories: [],
  symbols: [],
  modules: [],
  prototypes: []
}
Array.prototype.shove = function(thing, index) {
  var og = this.slice();
  var newa = [];
  for (var i = 0; i < index; i++) {
    newa.push(og.shift());
  }
  newa.push(thing);
  newa = newa.concat(og);
  return newa;
}
LambdaModBlock = function(name, only, type, category, spec, pcat, position, defaults) {
  this.name = name;
  this.only = only;
  this.type = type;
  this.category = category;
  this.spec = spec;
  this.pcat = pcat;
  this.position = position;
  this.defaults = defaults;
  this.func = new Function(); //Had to put something here
}
LambdaModCategory = function(name, color) {
  this.name = name;
  this.color = color;
}
decodeBlocks = function() {
  try {
  var blockLocations = lambda.blocks.split(',');
  for (var i = 0; i < blockLocations.length; i++) {
    divLog("Unpacking block " + blockLocations[i]);
    var j;
    if (localStorage.getItem("lambdaBlock-" + blockLocations[i]) != null) {
      j = localStorage.getItem("lambdaBlock-" + blockLocations[i]).split(sec);
    }

    var block = new LambdaModBlock(blockLocations[i], eval(j[0]), eval(j[1]), eval(j[2]), eval(j[3]), eval(j[4]), eval(j[5]), eval(j[6]));
    eval("block.func = " + localStorage.getItem("lambdaBlock-" + blockLocations[i] + "-prototype"));
    lm.blocks.push(block);
  }
  divLog("Done unpacking blocks");
} catch(e) {
  console.error(e);
  return;
}
}
decodeCategories = function() {
  try {
  var categoryLocations = lambda.categories.split(',');
  for (var i = 0; i < categoryLocations.length; i++) {
    divLog("Unpacking category " + categoryLocations[i]);
    var j;
    if (localStorage.getItem("lambdaCategory-" + categoryLocations[i]) != null) {
      j = localStorage.getItem("lambdaCategory-" + categoryLocations[i]).split(sec);
    }

    var category = new LambdaModCategory(categoryLocations[i], eval(j[0]));
    lm.categories.push(category);
  }
  divLog("Done unpacking categories");
} catch(e) {
  console.error(e);
  return;
}
}
decodeBlocks();
decodeCategories();
