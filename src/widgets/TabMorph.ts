// TabMorph ///////////////////////////////////////////////////////

import ToggleButtonMorph from "./ToggleButtonMorph";

// TabMorph instance creation:

export default class TabMorph extends ToggleButtonMorph {
    constructor(
        // color overrides, <array>: [normal, highlight, pressed]
        colors,
        target,
        // a toggle function
        action,
        labelString,
        // predicate/selector
        query,
        environment,
        hint) {
        this.init(
            colors,
            target,
            action,
            labelString,
            query,
            environment,
            hint
        );
    }

    // TabMorph layout:

    fixLayout() {
        if (this.label !== null) {
            this.setExtent(new Point(
                this.label.width()
                    + this.padding * 2
                    + this.corner * 3
                    + this.edge * 2,
                (this.label instanceof StringMorph ?
                            this.label.rawHeight() : this.label.height())
                    + this.padding * 2
                    + this.edge
            ));
            this.label.setCenter(this.center());
        }
    }

    // TabMorph action:

    refresh() {
        if (this.state) { // bring to front
            if (this.parent) {
                this.parent.add(this);
            }
        }
        super.refresh.call(this);
    }

    // TabMorph drawing:

    drawBackground(context, color) {
        const w = this.width();
        const h = this.height();
        const c = this.corner;

        context.fillStyle = color.toString();
        context.beginPath();
        context.moveTo(0, h);
        context.bezierCurveTo(c, h, c, 0, c * 2, 0);
        context.lineTo(w - c * 2, 0);
        context.bezierCurveTo(w - c, 0, w - c, h, w, h);
        context.closePath();
        context.fill();
    }

    drawOutline() {
        nop();
    }

    drawEdges(context, color, topColor, bottomColor) {
        if (MorphicPreferences.isFlat && !this.is3D) {return; }

        const w = this.width();
        const h = this.height();
        const c = this.corner;
        const e = this.edge;
        const eh = e / 2;
        let gradient;

        nop(color); // argument not needed here

        gradient = context.createLinearGradient(0, 0, w, 0);
        gradient.addColorStop(0, topColor.toString());
        gradient.addColorStop(1, bottomColor.toString());

        context.strokeStyle = gradient;
        context.lineCap = 'round';
        context.lineWidth = e;

        context.beginPath();
        context.moveTo(0, h + eh);
        context.bezierCurveTo(c, h, c, 0, c * 2, eh);
        context.lineTo(w - c * 2, eh);
        context.bezierCurveTo(w - c, 0, w - c, h, w, h + eh);
        context.stroke();
    }
}