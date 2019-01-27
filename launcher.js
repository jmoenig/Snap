localStorage.removeItem("blocks")
localStorage.removeItem("tabs")
localStorage.removeItem("categories")
localStorage.removeItem("symbols")
localStorage.removeItem("modules")
localStorage.removeItem("prototypes")
localStorage.removeItem("mods")
var curMod;
var allMods = [];
function readSingleFile(e) {
  var file = e.target.files[e.target.files.length - 1];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    curMod = contents;
  };
  reader.readAsText(file);
}
document.getElementById("modLink").addEventListener('change', readSingleFile, false);
addMod = function() {
  var divLog = function(what) {
    var logArea = document.getElementById("log");
    logArea.innerHTML += `<p>${what}</p>`;
    localStorage.setItem("log", localStorage.getItem("log") + what + '\n');
  }
  var loadImg = document.getElementById("loading");
  loadImg.setAttribute("style", "display: inline;");

  var modList = document.getElementById("listOfMods");
  if (curMod == undefined) {
    alert("Error 1: The page must reload");
    document.location.reload();
  }
  if (curMod.substring(0, 2) != "//") {
    alert("Error: Invalid mod");
    loadImg.setAttribute("style", "display: none;");
    return;
  }
  var credentials = curMod.split("\n")[0].substring(2).split("\`");
  divLog("Opened mod " + credentials[0]);
  modList.innerHTML += `
  <div style="background-color: gray">
    <p style="font-family: Arial; font-size: 20px;">${credentials[0]}</p>
    <i>${credentials[1]}</i>
    <p>by ${credentials[2]}</p>
  </div>
  `;
  allMods.push(curMod);
  loadImg.setAttribute("style", "display: none;");
}
