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
    this.block = block;
    this.target = target;

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

    this.setExtent(new Point(600, 400));
    this.addButton('ok', 'OK');
};

HelpDialogMorph.prototype.popUp = function () {
    var myself = this,
        world = this.target.parentThatIsA(WorldMorph),
        ide = this.target.parentThatIsA(IDE_Morph),
        spec;
    
    if (this.block.isCustomBlock) {
        if (this.block.isGlobal) {
            spec = this.block.definition.helpSpec();
        } else {
            spec = this.target.getMethod(this.blockSpec).helpSpec();
        }
    } else {
        spec = this.block.selector;
    }

    ide.getURL( // TODO: error handling
        ide.resourceURL('help', spec + '.xml'),
        function (xmlString) {
            var screen, scrollFrame;
            screen = new SnapSerializer().loadHelpScreen(xmlString, myself.target);
            screen.color = DialogBoxMorph.prototype.color;
            scrollFrame = new ScrollFrameMorph(screen);
            scrollFrame.color = DialogBoxMorph.prototype.color;
            screen.scrollFrame = scrollFrame;
            myself.addBody(scrollFrame);
            myself.fixLayout();
            HelpDialogMorph.uber.popUp.call(myself, world);
        }
    );
};

HelpDialogMorph.prototype.fixLayout = BlockEditorMorph.prototype.fixLayout;

// HelpScreenMorph //////////////////////////////////////////////////////

// HelpScreenMorph inherits from FrameMorph:

HelpScreenMorph.prototype = new FrameMorph();
HelpScreenMorph.prototype.constructor = HelpScreenMorph;
HelpScreenMorph.uber = FrameMorph.prototype;

// HelpScreenMorph layout settings:

HelpScreenMorph.prototype.padding = 10;

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

HelpScreenMorph.prototype.createColumn = function () {
    var col = new AlignmentMorph('column', this.padding);
    col.alignment = 'left';
    return col;
};

HelpScreenMorph.prototype.createRow = function () {
    return new AlignmentMorph('row', this.padding);
};

HelpScreenMorph.prototype.createParagraph = function (text) {
    return new TextMorph(text, 18, 'serif', false, false, null, null, 'Baskerville');
};
