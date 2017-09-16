// TableCellMorph /////////////////////////////////////////////////////////

// basic fast data view, currently constrained to a single line of text

import Morph from "../morphic/morph/Morph";

// TableCellMorph global setting:

TableCellMorph.prototype.listSymbol = ArgMorph.prototype.listIcon();

// TableCellMorph instance creation:

export default class TableCellMorph extends Morph {
    constructor(data, extent, isLabel) {
        this.init(data, extent, isLabel);
    }

    init(data, extent, isLabel) {
        // additional properties:
        this.data = data;
        this.isLabel = isLabel || false;

        // initialize inherited properties:
        super.init.call(this, true);

        // override inherited properites:
        this.noticesTransparentClick = true;
        if (extent) {this.silentSetExtent(extent); }
        this.drawNew();
    }

    setData(data, extent) {
        this.data = data;
        if (extent && (!extent.eq(this.extent()))) {
            this.silentSetExtent(extent);
            this.drawNew();
        } else {
            this.drawData();
        }
        // note: don't call changed(), let the TableMorph handle it instead
    }

    getData() {
        return this.data instanceof Array ? this.data[0] : this.data;
    }

    drawNew() {
        this.image = newCanvas(this.extent());
        this.drawData();
    }

    drawData(lbl, bg) {
        const dta = lbl || this.dataRepresentation(this.data);
        const context = this.image.getContext('2d');
        const fontSize = SyntaxElementMorph.prototype.fontSize;

        const empty = TableMorph.prototype.highContrast ? 'rgb(220, 220, 220)'
                : 'transparent';

        const orphaned = 'rgb(217, 77, 17)';

        const fontStyle = this.isLabel ?
                (this.data instanceof Array ? 'italic'  : '')
                        : this.shouldBeList() ? 'bold' : '';

        const font = `${fontStyle} ${fontSize}px Helvetica, Arial, sans-serif`;

        const background = bg || (this.isLabel ? empty
                : (this.shouldBeList() ? orphaned
                        : (this.isOvershooting() ? 'white'
                                : (isNil(this.data) ? empty : 'white'))));

        const foreground = !this.isLabel && this.shouldBeList()? 'white' : 'black';
        const width = this.width();
        const height = this.height();
        let txtWidth;
        let txtHeight;
        let x;
        let y;

        context.clearRect(0, 0, width, height);
        context.fillStyle = background;
        if (this.shouldBeList()) {
            BoxMorph.prototype.outlinePath.call(
                this, context, SyntaxElementMorph.prototype.corner + 1, 0
            );
            context.fill();
        } else if (this.isOvershooting()) {
            this.raggedBoxPath(context);
            context.fill();
        } else {
            context.fillRect(0, 0, width, height);
        }

        if (!dta) {return; }
        if (dta instanceof HTMLCanvasElement) {
            x = Math.max((width - dta.width) / 2, 0);
            y = Math.max((height - dta.height) / 2, 0);
            context.shadowOffsetX = 4;
            context.shadowOffsetY = 4;
            context.shadowBlur = 4;
            context.shadowColor = 'lightgray';
            context.drawImage(dta, x, y);
        } else { // text
            context.font = font;
            context.textAlign = 'left';
            context.textBaseline = 'bottom';
            txtWidth = context.measureText(dta).width;
            txtHeight = fontHeight(fontSize);
            context.fillStyle = foreground;
            x = Math.max((width - txtWidth) / 2, 0);
            y = Math.max((height - txtHeight) / 2, 0);
            context.fillText(dta, x, txtHeight + y);
        }
    }

    dataRepresentation(dta) {
        if (dta instanceof Morph) {
            if (isSnapObject(dta)) {
                return dta.thumbnail(new Point(40, 40));
            } else {
                return dta.fullImageClassic();
            }
        } else if (isString(dta)) {
            return dta.length > 100 ? `${dta.slice(0, 100)}...` : dta;
        } else if (typeof dta === 'number') {
            return dta.toString();
        } else if (typeof dta === 'boolean') {
            return SpriteMorph.prototype.booleanMorph.call(
                null,
                dta
            ).fullImage();
        } else if (dta instanceof Array) {
            return this.dataRepresentation(dta[0]);
        } else if (dta instanceof Variable) {
            return this.dataRepresentation(dta.value);
        } else if (dta instanceof HTMLCanvasElement) {
            return dta;
        } else if (dta instanceof Context) {
            return dta.image();
        } else if (dta instanceof Costume) {
            return dta.thumbnail(new Point(40, 40));
        } else if (dta instanceof Sound) {
            return new SymbolMorph('notes', 30).image;
        } else if (dta instanceof List) {
            return this.listSymbol;
            // return new ListWatcherMorph(dta).fullImageClassic();
        } else {
            return dta ? dta.toString() : (dta === 0 ? '0' : null);
        }
    }

    raggedBoxPath(context) {
        const width = this.width();
        const height = this.height();
        const x = width * 0.75;
        const step = height / 6;
        let y = 0;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(width, 0);
        for (y = 0; y < height; y += (step * 2)) {
            context.lineTo(x, y + step);
            context.lineTo(width, y + (step * 2));
        }
        context.lineTo(width, height);
        context.lineTo(0, height);
        context.closePath();
    }

    shouldBeList() {
        return this.data instanceof Array;
    }

    isOvershooting() {
        return this.data instanceof Variable;
    }

    // TableCellMorph events:

    mouseDoubleClick(pos) {
        if (this.data instanceof Table || this.data instanceof List) {
            new TableDialogMorph(this.data).popUp(this.world());
        } else if (this.data instanceof Array && this.data[0] instanceof List) {
            new TableDialogMorph(this.data[0]).popUp(this.world());
        } else {
            this.escalateEvent('mouseDoubleClick', pos);
        }
    }

    mouseEnter() {
        let tm;
        let x;
        let c;
        if (this.isLabel) {
            tm = this.parentThatIsA(TableMorph);
            x = tm.world().hand.left() - tm.left();
            c = tm.columnAt(x);
            if (c > 0) {
                this.drawData(c, 'rgb(220, 220, 250)');
                this.changed();
            }
        }
    }

    mouseLeave() {
        if (this.isLabel) {
            this.drawData();
            this.changed();
        }
    }
}