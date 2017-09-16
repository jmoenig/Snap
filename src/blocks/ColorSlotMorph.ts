// ColorSlotMorph //////////////////////////////////////////////////////

/*
    I am an editable input slot for a color. Users can edit my color by
    clicking on me, in which case a display a color gradient palette
    and let the user select another color. Note that the user isn't
    restricted to selecting a color from the palette, any color from
    anywhere within the World can be chosen.

    my block spec is %clr

    evaluate() returns my color
*/

import ArgMorph from "./ArgMorph";

// ColorSlotMorph  instance creation:

export default class ColorSlotMorph extends ArgMorph {
    constructor(clr) {
        this.init(clr);
    }

    init(clr) {
        super.init.call(this, null, true); // silently
        this.setColor(clr || new Color(145, 26, 68));
    }

    getSpec() {
        return '%clr';
    }

    // ColorSlotMorph  color sensing:

    getUserColor() {
        const myself = this;
        const world = this.world();
        const hand = world.hand;
        const posInDocument = getDocumentPositionOf(world.worldCanvas);
        const mouseMoveBak = hand.processMouseMove;
        const mouseDownBak = hand.processMouseDown;
        const mouseUpBak = hand.processMouseUp;

        const pal = new ColorPaletteMorph(null, new Point(
            this.fontSize * 16,
            this.fontSize * 10
        ));

        world.add(pal);
        pal.setPosition(this.bottomLeft().add(new Point(0, this.edge)));

        hand.processMouseMove = event => {
            const clr = world.getGlobalPixelColor(hand.position());
            hand.setPosition(new Point(
                event.pageX - posInDocument.x,
                event.pageY - posInDocument.y
            ));
            if (!clr.a) {
                // ignore transparent,
                // needed for retina-display support
                return;
            }
            myself.setColor(clr);
        };

        hand.processMouseDown = nop;

        hand.processMouseUp = () => {
            pal.destroy();
            hand.processMouseMove = mouseMoveBak;
            hand.processMouseDown = mouseDownBak;
            hand.processMouseUp = mouseUpBak;
        };
    }

    // ColorSlotMorph events:

    mouseClickLeft() {
        this.selectForEdit().getUserColor();
    }

    // ColorSlotMorph evaluating:

    evaluate() {
        return this.color;
    }

    // ColorSlotMorph drawing:

    drawNew() {
        let context;
        let borderColor;
        let side;

        side = this.fontSize + this.edge * 2 + this.typeInPadding * 2;
        this.silentSetExtent(new Point(side, side));

        // initialize my surface property
        this.image = newCanvas(this.extent());
        context = this.image.getContext('2d');
        if (this.parent) {
            borderColor = this.parent.color;
        } else {
            borderColor = new Color(120, 120, 120);
        }
        context.fillStyle = this.color.toString();

        // cache my border colors
        this.cachedClr = borderColor.toString();
        this.cachedClrBright = borderColor.lighter(this.contrast)
            .toString();
        this.cachedClrDark = borderColor.darker(this.contrast).toString();

        context.fillRect(
            this.edge,
            this.edge,
            this.width() - this.edge * 2,
            this.height() - this.edge * 2
        );
        if (!MorphicPreferences.isFlat) {
            this.drawRectBorder(context);
        }
    }
}

ColorSlotMorph.prototype.drawRectBorder =
    InputSlotMorph.prototype.drawRectBorder;