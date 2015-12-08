modules.cellularGui = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

function getSnapLogoImage()
{
    return 'cellular_logo_sm.png';
}

function getSnapAppsName()
{
    return 'Cellular';
}

function getSnapAppsAboutText()
{
    return 'Cellular 0.99\n Based upon Snap! 4.0\nBuild Your Own Blocks\n\n--- beta ---\n\n'
        + 'Cellular modifications copyright \u24B8 2013 Aidan Lane and Matthew Ready\n'
        + 'aidan.lane@monash.edu, matt.ready@monash.edu\n\n'
        + 'For more information visit http://flipt.org/';
}

function getSnapAppsLogoExtent()
{
    return new Point(190, 28);
}

IDE_Morph.prototype.exportIndex = "cellular.html";

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

IDE_Morph.prototype.snapAppsGetIsDraggableOverride = function () {
    return this.currentSprite.areClonesDraggable;
};

IDE_Morph.prototype.snapAppsIsDraggableOverride = function () {
    var currentSprite = this.currentSprite;

    currentSprite.areClonesDraggable = !currentSprite.areClonesDraggable;
    this.stage.children.forEach(function (x) {
        if (x instanceof SpriteMorph && x.parentSprite == currentSprite)
        {
            x.isDraggable = currentSprite.areClonesDraggable;
        }
    });
};

/*
** This is what creates the cell brush tools GUI.
*/
IDE_Morph.prototype.createCorralSnap = IDE_Morph.prototype.createCorral;
IDE_Morph.prototype.createCorral = function()
{
    this.createCorralSnap();

    // assumes the stage has already been created
    var myself = this,
        padding = 5,
        newbutton,
        paintbutton,
        colors = [
            this.groupColor,
            this.frameColor.darker(50),
            this.frameColor.darker(50)
        ];

    // paint brush tool
    var scribbleButton = new ToggleButtonMorph(
        null, //colors,
        myself, // the IDE is the target
        'scribble',
        [
            new SymbolMorph('brush', 14),
            new SymbolMorph('brush', 14)
        ],
        function () {  // query
            if (typeof myself.stage !== "undefined"
                && myself.stage !== null
                && typeof myself.stage.drawTool !== "undefined"
                && myself.stage.drawTool !== null)
                return myself.stage.drawTool;
            return false;
        }
    );
    scribbleButton.corner = 12;
    scribbleButton.color = colors[0];
    scribbleButton.highlightColor = colors[1];
    scribbleButton.pressColor = colors[2];
    scribbleButton.labelMinExtent = new Point(36, 18);
    scribbleButton.padding = 0;
    scribbleButton.labelShadowOffset = new Point(-1, -1);
    scribbleButton.labelShadowColor = colors[1];
    scribbleButton.labelColor = new Color(0, 200, 200);
    scribbleButton.contrast = this.buttonContrast;
    scribbleButton.hint = "draw to cell attributes";

    function createBasicLabel(text) {
        var basicLabel = new TextMorph(text);
        basicLabel.corner = 12;
        basicLabel.padding = 0;
        basicLabel.color = myself.buttonLabelColor;
        basicLabel.contrast = myself.buttonContrast;
        return basicLabel;
    };

    function createBasicField(hint, width, accept, defaultValue) {
        var basicField = new InputFieldMorph(defaultValue);
        if (MorphicPreferences.isFlat) {
            basicField.color = myself.groupColor;
        }
        basicField.corner = 12;
        basicField.padding = 0;
        basicField.contrast = myself.buttonContrast;
        basicField.hint = hint;
        basicField.contents().minWidth = 0;
        basicField.setWidth(width); // fixed dimensions
        basicField.reactToEdit = accept;
        return basicField;
    };

    var sizeLabel = createBasicLabel("cell radius:");

    var sizeField = createBasicField("brush size (in cells)", 32, function () {
        var value = Number(sizeField.getValue());
        if (isNaN(value))
        {
            sizeField.setContents(1);
            return;
        }
        if (value > 99)
        {
            sizeField.setContents(99);
            return;
        }
        if (value < 0.5)
        {
            sizeField.setContents(0.5);
            return;
        }
        myself.stage.strokeSize = value;
    }, this.stage.strokeSize.toString());

    var hardnessLabel = createBasicLabel("hard:");

    var hardnessField = createBasicField("brush hardness (0-1)", 32, function () {
        var value = Number(hardnessField.getValue());
        if (isNaN(value))
        {
            hardnessField.setContents(1);
            return;
        }
        if (value > 1)
        {
            hardnessField.setContents(1);
            return;
        }
        if (value < 0)
        {
            hardnessField.setContents(0);
            return;
        }
        myself.stage.strokeHardness = value;
    }, this.stage.strokeHardness.toString());

    var valueLabel = createBasicLabel("value:");

    var valueField = createBasicField("brush value", 32, function () {
        var value = Number(valueField.getValue());
        if (isNaN(value))
        {
            valueField.setContents(10);
            return;
        }
        myself.stage.strokeValue = value;
    }, this.stage.strokeValue.toString());

    var attributeSelectorLabel = createBasicLabel("attribute:");

    var attributeSelector = new InputFieldMorph(Cell.attributes.length > 0 ? Cell.attributes[0] : "", false, function() {
        var retn = {};
        for (var i=0; i<Cell.attributes.length; i++)
        {
            retn[Cell.attributes[i]] = Cell.attributes[i];
        }
        return retn;
    }, true );
    if (MorphicPreferences.isFlat) {
        attributeSelector.color = this.groupColor;
    }
    attributeSelector.corner = 12;
    attributeSelector.padding = 0;
    attributeSelector.contrast = this.buttonContrast;
    attributeSelector.hint = "grid size";
    this.attributeSelector = attributeSelector;

    var gridSizerLabel = createBasicLabel("grid size:");

    var gridSizer = new InputFieldMorph(
            "40x30", false, // numeric?
            {
            "16x12": "16x12",
            "20x15": "20x15",
            "40x30": "40x30",
            "80x60": "80x60",
            }, // drop-down dict, optional
            true
        );
    if (MorphicPreferences.isFlat) {
        gridSizer.color = this.groupColor;
    }
    gridSizer.corner = 12;
    gridSizer.padding = 0;
    gridSizer.contrast = this.buttonContrast;
    gridSizer.hint = "grid size";
    gridSizer.contents().minWidth = 0;

    var clearButton = new PushButtonMorph(
        myself,
        'onClearButton',
        'clear',
        null,
        'clear current cell attribute',
        null);

    var queryValueLabel = createBasicLabel("(hover to query)");
    this.cellAttributeQueryText = queryValueLabel;

    var lineHeight = this.logo.height();
    var lines = [
        [
            scribbleButton,
            sizeLabel,
            sizeField,
            hardnessLabel,
            hardnessField,
            valueLabel,
            valueField,
            attributeSelectorLabel,
            attributeSelector
        ],
        [
            gridSizerLabel,
            gridSizer,
            clearButton,
            queryValueLabel, // Keep the query label last since it changes size.
        ]
    ];


    if (this.stageBottomBar) {
        this.stageBottomBar.destroy();
    }
    this.stageBottomBar = new Morph();

    var stageBottomBar = this.stageBottomBar;
    stageBottomBar.color = this.frameColor;
    stageBottomBar.setHeight(lineHeight * lines.length + padding);
    this.add(stageBottomBar);

    var currentY = stageBottomBar.top() + padding / 2;
    lines.forEach(function (line) {
        var currentX = stageBottomBar.left() + padding;
        line.forEach(function (morph) {
            morph.setCenter(new Point(0, currentY + lineHeight / 2));
            morph.setLeft(currentX);
            morph.drawNew();
            if (morph.fixLayout) {
                morph.fixLayout();
            }
            stageBottomBar.add(morph);

            currentX = morph.right() + padding;
        });
        currentY += lineHeight;
    });

    stageBottomBar.reactToChoice = function(choice)
    {
        var gridSizeChoice = gridSizer.getValue();
        var choiceInt = 40;
        switch (gridSizeChoice)
        {
            case "16x12": choiceInt = 16; break;
            case "20x15": choiceInt = 20; break;
            case "40x30": choiceInt = 40; break;
            case "80x60": choiceInt = 80; break;
        }
        if (myself.stage.cellsX != choiceInt || myself.stage.cellsY != choiceInt * 3 / 4)
        {
            myself.stage.cellsX = choiceInt;
            myself.stage.cellsY = choiceInt * 3 / 4;
            myself.stage.updateCells();
        }
    }

    stageBottomBar.reactToEdit = function () {
        sizeField.accept();
        valueField.accept();
        hardnessField.accept();
    }
};

IDE_Morph.prototype.onClearButton = function() {
    var attribute = this.attributeSelector.getValue();
    if (Cell.hasAttribute(attribute)) {
        this.stage.setCellAttributeEverywhere(attribute, 0);
    }
};

IDE_Morph.prototype.killAllClones = function(prototypeObject) {
    for (var i = 0; i<this.stage.children.length; i++)
    {
        var child = this.stage.children[i];
        if (child.parentSprite == prototypeObject)
        {
            //Remove it if it is a clone of this sprite
            // this.stage.threads.stopAllForReceiver(child);
//            this.stage.removeChild(child);
			child.destroy();
            i--;
        }
    }
}

//Add cellular centre.
TurtleIconMorph.prototype.userMenu = function () {
    var myself = this,
        menu = new MenuMorph(this, 'pen'),
        on = '\u25CF',
        off = '\u25CB';
    if (this.object instanceof StageMorph) {
        return null;
    }
    menu.addItem(
        (this.object.penPoint === 'cellular-center' ? on : off) + ' ' + localize('actual center'),
        function () {
            myself.object.penPoint = 'cellular-center';
            myself.object.changed();
            myself.object.drawNew();
            myself.object.changed();
        }
    );
    menu.addItem(
        (this.object.penPoint === 'tip' ? on : off) + ' ' + localize('tip'),
        function () {
            myself.object.penPoint = 'tip';
            myself.object.changed();
            myself.object.drawNew();
            myself.object.changed();
        }
    );
    menu.addItem(
        (this.object.penPoint === 'middle' ? on : off) + ' ' + localize(
            'stupid middle'
        ),
        function () {
            myself.object.penPoint = 'middle';
            myself.object.changed();
            myself.object.drawNew();
            myself.object.changed();
        }
    );
    return menu;
};

/*********************************************************************/
/************************** IMPLEMENTATION ***************************/
/*********************************************************************/

IDE_Morph.prototype.refreshCellAttributes = function()
{
    if (!Cell.hasAttribute(this.attributeSelector.getValue()))
    {
        this.attributeSelector.setChoice(null);
    }
}

/*********************************************************************/
/*************************** BUTTON LOGIC ****************************/
/*********************************************************************/

IDE_Morph.prototype.scribble = function () {
    this.stage.drawTool = !this.stage.drawTool;
};

SpriteIconMorph.prototype.uberInit = SpriteIconMorph.prototype.init;
SpriteIconMorph.prototype.init = function (aSprite, aTemplate) {
    this.uberInit(aSprite, aTemplate);
    this.createDuplicator();
    this.fixLayout();
}

/*
** This creates the text box in which the number of clones is stored for each sprite.
** You can see it below every sprite icon on the bottom right of the screen.
*/
SpriteIconMorph.prototype.createDuplicator = function () {
    if (this.duplicator) {
        this.duplicator.destroy();
    }
    var myself = this;
    var duplicator;
    duplicator = new InputFieldMorph("0");
    duplicator.corner = 12;
    duplicator.padding = 0;
    duplicator.contrast = this.buttonContrast;
    duplicator.hint = "clones";
    duplicator.contents().minWidth = 0;
    duplicator.setCenter(this.center());
    duplicator.setWidth(32); // fixed dimensions
    duplicator.drawNew();
    duplicator.reactToEdit = function () {
        var value = Number(duplicator.getValue());
        var rnd = Process.prototype.reportRandom;

        if (isNaN(value))
        {
            value = 1;
            duplicator.setContents(1);
        }

        //Go through every object and remove everyone that is based off this sprite
        var ide = myself.parentThatIsA(IDE_Morph);
        ide.killAllClones(myself.object);

        //Now we make the clones
        for (var i = 0; i<value; i++)
        {
			ide.stage.createCellularClone(myself.object);
        }

        ide.stage.dirtyEntireStage();
    };
    this.add(duplicator);
    this.duplicator = duplicator;

    myself.object.spriteIconMorph = this;
};

SpriteIconMorph.prototype.updateDuplicator = function()
{
    this.duplicator.setContents(this.object.cloneCount);
}

// SpriteIconMorph layout (we need to change it so we can add room for the text box)
SpriteIconMorph.prototype.fixLayout = function () {
    if (!this.thumbnail || !this.label || !this.duplicator) {return null; }

    this.setWidth(
        this.thumbnail.width()
            + this.outline * 2
            + this.edge * 2
            + this.padding * 2
    );

    this.setHeight(
        this.thumbnail.height()
            + this.outline * 2
            + this.edge * 2
            + this.padding * 3
            + (this.object instanceof StageMorph ? 0 :
              this.padding * 2
            + this.duplicator.height())
            + this.label.height()
    );

    this.thumbnail.setCenter(this.center());
    this.thumbnail.setTop(
        this.top() + this.outline + this.edge + this.padding
    );

    if (this.rotationButton) {
        this.rotationButton.setTop(this.top());
        this.rotationButton.setRight(this.right());
    }

    var nextY;
    if (this.object instanceof StageMorph) {
        if (this.duplicator != undefined)
        {
            this.duplicator.destroy();
            this.duplicator = undefined;
        }
        nextY = this.thumbnail.bottom();
    } else {
        this.duplicator.setCenter(this.center());
        this.duplicator.setTop(
            this.thumbnail.bottom() + this.padding
        );
        nextY = this.duplicator.bottom();

        if (this.object)
        {
            var stage = this.object.parentThatIsA(StageMorph);
            if (stage && stage.children)
            {
                var numClones = 0;
                var stageChildren = stage.children;
                for (var i=0; i<stageChildren.length; i++)
                    if (stageChildren[i] instanceof SpriteMorph
                        && stageChildren[i].parentSprite == this.object)
                        numClones++;
         
                this.duplicator.setContents(numClones);
            }
        }
    }

    this.label.setWidth(
        Math.min(
            this.label.children[0].width(), // the actual text
            this.thumbnail.width()
        )
    );
    this.label.setCenter(this.center());
    this.label.setTop(
        nextY + this.padding
    );
};

IDE_Morph.prototype.uberNewProject = IDE_Morph.prototype.newProject;
IDE_Morph.prototype.newProject = function() {
    Cell.resetToDefault();
    return this.uberNewProject();
}

//This overrides the additition of a sprite to the stage.
/*IDE_Morph.prototype.snapAppsHookAddSprite = function (sprite) {
    this.stage.add(sprite);
};*/

IDE_Morph.prototype.uberRemoveSprite = IDE_Morph.prototype.removeSprite;
IDE_Morph.prototype.removeSprite = function (object) {
    this.killAllClones(object);
    return this.uberRemoveSprite(object);
}

// Remove this functionality because it does NOT work right now. I didn't realise this was possible
// and I thought the dimensions of the stage were hardcoded somewhere. FIX ME.
IDE_Morph.prototype.userSetStageSize = function () { };
IDE_Morph.prototype._snapapps_showStageSizeOptions = false;
