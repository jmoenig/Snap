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
    var screen, scrollFrame;

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

    screen = new SnapSerializer()
        .loadHelpScreen('<help-screen version="1"><box><p>Test</p></box></help-screen>');
    screen.color = DialogBoxMorph.prototype.color;
    scrollFrame = new ScrollFrameMorph(screen);
    scrollFrame.color = DialogBoxMorph.prototype.color;
    screen.scrollFrame = scrollFrame;
    this.addBody(scrollFrame)
    this.addButton('ok', 'OK');

    this.setExtent(new Point(600, 400));
    this.fixLayout();
};

HelpDialogMorph.prototype.fixLayout = BlockEditorMorph.prototype.fixLayout;

// HelpScreenMorph //////////////////////////////////////////////////////

// HelpScreenMorph inherits from FrameMorph:

HelpScreenMorph.prototype = new FrameMorph();
HelpScreenMorph.prototype.constructor = HelpScreenMorph;
HelpScreenMorph.uber = FrameMorph.prototype;

// HelpScreenMorph instance creation:

function HelpScreenMorph() {
    this.init();
}

HelpScreenMorph.prototype.init = function () {
    HelpScreenMorph.uber.init.call(this);
};

HelpScreenMorph.prototype.adjustBounds = function () {
    var myself = this;

    HelpScreenMorph.uber.adjustBounds.call(this);
    this.children.forEach(function (child)  {
        // temporary
        child.setExtent(myself.extent());
    });
};

HelpScreenMorph.prototype.createBox = function () {
    var box = new BoxMorph();
    box.color = new Color(133, 138, 140);
    box.borderColor = new Color(183, 186, 188);
    return box;
};

HelpScreenMorph.prototype.createParagraph = function (text) {
    return new TextMorph(text, 18, 'serif', false, false, null, null, 'Baskerville');
};
