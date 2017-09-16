// TODO import

// TableDialogMorph instance creation:

export default class TableDialogMorph extends DialogBoxMorph {
    constructor(data, globalColWidth, colWidths, rowHeight) {
        this.init(data, globalColWidth, colWidths, rowHeight);
    }

    init(data, globalColWidth, colWidths, rowHeight) {
        // additional properties:
        this.handle = null;
        this.data = data;
        this.tableView = null;

        // initialize inherited properties:
        super.init.call(this);

        // override inherited properites:
        this.labelString = 'Table view';
        this.createLabel();

        // build contents
        this.buildContents(data, globalColWidth, colWidths, rowHeight);
    }

    buildContents(data, globalColWidth, colWidths, rowHeight) {
        this.tableView = new TableMorph(
            data,
            null, // scrollBarSize
            null, // extent
            null, // startRow
            null, // startCol
            globalColWidth,
            colWidths,
            rowHeight,
            null, // colLabelHeight
            null // padding
        );
        this.addBody(new TableFrameMorph(this.tableView, true));
        this.addButton('ok', 'OK');
    }

    setInitialDimensions() {
        const world = this.world();
        const mex = world.extent().subtract(new Point(this.padding, this.padding));

        const // hm...
        th = fontHeight(this.titleFontSize) + this.titlePadding * 3;

        const bh = this.buttons.height();
        this.setExtent(
            this.tableView.globalExtent().add(
                new Point(this.padding * 2, this.padding * 2 + th + bh)
            ).min(mex).max(new Point(100, 100))
        );
        this.setCenter(this.world().center());
    }

    popUp(world) {
        if (world) {
            super.popUp.call(this, world);
            this.setInitialDimensions();
            this.handle = new HandleMorph(
                this,
                100,
                100,
                this.corner,
                this.corner
            );
        }
    }
}

TableDialogMorph.prototype.fixLayout =
    BlockEditorMorph.prototype.fixLayout;