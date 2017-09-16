// VariableDialogMorph ////////////////////////////////////////////////////

// ... and some behavior from BlockDialogMorph

// VariableDialogMorph instance creation:

export default class VariableDialogMorph extends DialogBoxMorph {
    constructor(target, action, environment) {
        this.init(target, action, environment);
    }

    init(target, action, environment) {
        // additional properties:
        this.types = null;
        this.isGlobal = true;

        // initialize inherited properties:
        BlockDialogMorph.uber.init.call(
            this,
            target,
            action,
            environment
        );

        // override inherited properites:
        this.types = new AlignmentMorph('row', this.padding);
        this.add(this.types);
        this.createTypeButtons();
    }

    createTypeButtons() {
        const myself = this;

        this.addTypeButton(
            () => {myself.setType('global'); },
            "for all sprites",
            () => myself.isGlobal
        );
        this.addTypeButton(
            () => {myself.setType('local'); },
            "for this sprite only",
            () => !myself.isGlobal
        );
    }

    setType(varType) {
        this.isGlobal = (varType === 'global');
        this.types.children.forEach(c => {
            c.refresh();
        });
        this.edit();
    }

    getInput() {
        // answer a tuple: [varName, isGlobal]
        const name = this.normalizeSpaces(this.body.getValue());
        return name ? [name, this.isGlobal] : null;
    }

    fixLayout() {
        const th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

        if (this.body) {
            this.body.setPosition(this.position().add(new Point(
                this.padding,
                th + this.padding
            )));
            this.silentSetWidth(this.body.width() + this.padding * 2);
            this.silentSetHeight(
                this.body.height()
                    + this.padding * 2
                    + th
            );
        }

        if (this.label) {
            this.label.setCenter(this.center());
            this.label.setTop(this.top() + (th - this.label.height()) / 2);
        }

        if (this.types) {
            this.types.fixLayout();
            this.silentSetHeight(
                this.height()
                        + this.types.height()
                        + this.padding
            );
            this.silentSetWidth(Math.max(
                this.width(),
                this.types.width() + this.padding * 2
            ));
            this.types.setCenter(this.center());
            if (this.body) {
                this.types.setTop(this.body.bottom() + this.padding);
            } else if (this.categories) {
                this.types.setTop(this.categories.bottom() + this.padding);
            }
        }

        if (this.buttons && (this.buttons.children.length > 0)) {
            this.buttons.fixLayout();
            this.silentSetHeight(
                this.height()
                        + this.buttons.height()
                        + this.padding
            );
            this.buttons.setCenter(this.center());
            this.buttons.setBottom(this.bottom() - this.padding);
        }
    }
}

VariableDialogMorph.prototype.addTypeButton
    = BlockDialogMorph.prototype.addTypeButton;