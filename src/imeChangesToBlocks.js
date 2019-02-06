InputSlotMorph.prototype.mouseDownLeft = function (pos) {
    var world;
    var already;
    if (this.isReadOnly || this.arrow().bounds.containsPoint(pos)) {
        this.escalateEvent('mouseDownLeft', pos);
    } else {
        world = this.world();
        var editTarget = this.selectForEdit().contents();
        already = world && world.cursor && world.cursor.target === editTarget;

        if (!already) {
            if (world) {
                world.stopEditing();
            }
            this.selectForEdit().contents().edit();
        }
    }
};
