/**
 * Changes made in this file related to a bug that "shift-click" does not select
 * text as expected.
 *
 * This reason for the bug is that in the previous version of the following
 * function, stopEditing() is always called after a mousedown event, then a new
 * editing session started, and lost the selection status. The change I made is
 * only to start a new editor if the target is not being edit now.
 *
 * I think the stopEditing() call should be made in WorldMorph.edit, if needed,
 * since WorldMorph holds information to make the decision. WorldMorph.edit
 * should check that:
 * 1. If the target morph is being editing now, then do nothing.
 * 2. If it is editing other morph, stop it.
 * 3. Start a new editing session.
 *
 */
InputSlotMorph.prototype.mouseDownLeft = function (pos) {
    var world;
    if (this.isReadOnly || this.arrow().bounds.containsPoint(pos)) {
        this.escalateEvent('mouseDownLeft', pos);
    } else {
        world = this.world();
        var editTarget = this.selectForEdit().contents();
        var already = world && world.cursor.target === editTarget;

        if (!already) {
            if (world) {
                world.stopEditing();
            }
            this.selectForEdit().contents().edit();
        }
    }
};
