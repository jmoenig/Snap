import WorldMorph from "./morphic/morph/WorldMorph";
import IDE_Morph from "./gui/IDE_Morph";

let world;
window.onload = function () {
	world = new WorldMorph(document.getElementById('world'));
	world.worldCanvas.focus();
	new IDE_Morph().openIn(world);
	loop();
};
function loop() {
	requestAnimationFrame(loop);
	world.doOneCycle();
}