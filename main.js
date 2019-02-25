var world;

window.onload = function () {
  world = new WorldMorph(document.getElementById('world'));
  world.worldCanvas.focus();
  new NetsBloxMorph().openIn(world);
  loop();
};

function loop() {
  requestAnimationFrame(loop);
  world.doOneCycle();
}
