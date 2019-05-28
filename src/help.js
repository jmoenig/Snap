// HelpDialogMorph //////////////////////////////////////////////////////

// HelpDialogMorph inherits from DialogBoxMorph:

HelpDialogMorph.prototype = new DialogBoxMorph();
HelpDialogMorph.prototype.constructor = HelpDialogMorph;
HelpDialogMorph.uber = DialogBoxMorph.prototype;

// HelpDialogMorph instance creation:

function HelpDialogMorph(block, target) {
    this.init(block, target);
}

HelpDialogMorph.prototype.init = function (block, target) {
    // additional properties:
    this.mainBox = null;

    // initialize inherited properties:
    HelpDialogMorph.uber.init.call(
        this,
        target,
        nop,
        target
    );

    // override inherited properites:
    this.key = 'help';
    this.labelString = 'Help';
    this.createLabel();

    this.silentSetWidth(600);

    this.mainBox = new BoxMorph();
    this.mainBox.color = new Color(133, 138, 140);
    this.mainBox.borderColor = new Color(183, 186, 188);
    this.mainBox.setExtent(new Point(this.width() - 2 * this.padding, 400));

    this.addBody(this.mainBox)
    this.addButton('ok', 'OK');

    this.fixLayout();
    this.drawNew();
};
