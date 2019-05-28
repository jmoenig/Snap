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

    screen = new HelpScreenMorph();
    screen.color = DialogBoxMorph.prototype.color;
    scrollFrame = new ScrollFrameMorph(screen);
    scrollFrame.color = DialogBoxMorph.prototype.color;
    screen.scrollFrame = scrollFrame;
    this.addBody(scrollFrame)
    this.addButton('ok', 'OK');

    this.setExtent(new Point(600, 400));
    this.fixLayout();
};

HelpDialogMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2;

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.fixLayout();
    }

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.body.setExtent(new Point(
            this.width() - this.padding * 2,
            this.height() - this.padding * 3 - th - this.buttons.height()
        ));
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.setCenter(this.center());
        this.buttons.setBottom(this.bottom() - this.padding);
    }
};

// HelpScreenMorph //////////////////////////////////////////////////////

// HelpScreenMorph inherits from FrameMorph:

HelpScreenMorph.prototype = new FrameMorph();
HelpScreenMorph.prototype.constructor = HelpScreenMorph;
HelpScreenMorph.uber = FrameMorph.prototype;

// HelpScreenMorph instance creation:

function HelpScreenMorph(block, target) {
    this.init(block, target);
}

HelpScreenMorph.prototype.init = function (block, target) {
    this.mainBox = new BoxMorph();
    this.mainBox.color = new Color(133, 138, 140);
    this.mainBox.borderColor = new Color(183, 186, 188);
    this.add(this.mainBox);
};

HelpScreenMorph.prototype.adjustBounds = function () {
    HelpScreenMorph.uber.adjustBounds.call(this);
    this.mainBox.setExtent(this.extent());
}
