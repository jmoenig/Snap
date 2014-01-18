modules.cellularGui = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

function getSnapLogoImage()
{
    return 'cellular/cellular_logo_sm.png';
}

function getSnapAppsName()
{
    return 'Cellular';
}

function getSnapAppsAboutText()
{
    return 'Cellular 1.0\n Based upon Snap! 4.0\nBuild Your Own Blocks\n\n--- beta ---\n\n'
        + 'Cellular modifications copyright \u24B8 2013 Aidan Lane and Matthew Ready\n'
        + 'aidan.lane@monash.edu, matt.ready@monash.edu\n\n'
        + 'For more information visit http://flipt.org/';
}

function getSnapAppsLogoExtent()
{
    return new Point(210, 28);
}

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

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

    if (this.stageBottomBar) {
        this.stageBottomBar.destroy();
    }

    this.stageBottomBar = new Morph();
    this.stageBottomBar.color = this.frameColor;
    this.stageBottomBar.setHeight(this.logo.height()); // height is fixed
    this.add(this.stageBottomBar);

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
    scribbleButton.drawNew();
    scribbleButton.fixLayout();
    scribbleButton.setCenter(this.stageBottomBar.center());
    scribbleButton.setLeft(this.stageBottomBar.left() + padding);
    this.stageBottomBar.add(scribbleButton);
	
	var sizeLabel;
	sizeLabel = new TextMorph("radius (cells):");
    sizeLabel.corner = 12;
    sizeLabel.padding = 0;
    sizeLabel.color = new Color(255, 255, 255);
    sizeLabel.contrast = this.buttonContrast;
    sizeLabel.setCenter(this.stageBottomBar.center());
    sizeLabel.setLeft(scribbleButton.right() + padding);
    sizeLabel.drawNew();
    this.stageBottomBar.add(sizeLabel);
	
	var sizeField;
	sizeField = new InputFieldMorph(this.stage.strokeSize.toString());
    sizeField.corner = 12;
    sizeField.padding = 0;
    sizeField.contrast = this.buttonContrast;
    sizeField.hint = "brush size (in cells)";
	sizeField.contents().minWidth = 0;
    sizeField.setCenter(this.stageBottomBar.center());
    sizeField.setWidth(32); // fixed dimensions
    sizeField.setLeft(sizeLabel.right() + padding);
    sizeField.drawNew();
    sizeField.accept = function () {
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
    };
    this.stageBottomBar.add(sizeField);
	
	var hardnessField;
	/*hardnessField = new InputFieldMorph(this.stage.strokeHardness.toString());
    hardnessField.corner = 12;
    hardnessField.padding = 0;
    hardnessField.contrast = this.buttonContrast;
    hardnessField.hint = "brush hardness (0-1)";
	hardnessField.contents().minWidth = 0;
    hardnessField.setCenter(this.stageBottomBar.center());
    hardnessField.setWidth(32); // fixed dimensions
    hardnessField.setLeft(sizeField.right() + padding);
    hardnessField.drawNew();
    hardnessField.accept = function () {
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
    };
    this.stageBottomBar.add(hardnessField);*/
	
	var valueLabel;
	valueLabel = new TextMorph("value:");
    valueLabel.corner = 12;
    valueLabel.padding = 0;
    valueLabel.color = new Color(255, 255, 255);
    valueLabel.contrast = this.buttonContrast;
    valueLabel.setCenter(this.stageBottomBar.center());
    valueLabel.setLeft(sizeField.right() + padding);
    valueLabel.drawNew();
    this.stageBottomBar.add(valueLabel);
	
	var valueField;
	valueField = new InputFieldMorph(this.stage.strokeValue.toString());
    valueField.corner = 12;
    valueField.padding = 0;
    valueField.contrast = this.buttonContrast;
    valueField.hint = "brush value";
	valueField.contents().minWidth = 0;
    valueField.setCenter(this.stageBottomBar.center());
    valueField.setWidth(32); // fixed dimensions
    valueField.setLeft(valueLabel.right() + padding);
    valueField.drawNew();
    valueField.accept = function () {
		var value = Number(valueField.getValue());
		if (isNaN(value))
		{
			valueField.setContents(10);
			return;
		}
        myself.stage.strokeValue = value;
    };
    this.stageBottomBar.add(valueField);
	
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
    gridSizer.corner = 12;
    gridSizer.padding = 0;
    gridSizer.contrast = this.buttonContrast;
    gridSizer.hint = "grid size";
    gridSizer.setCenter(this.stageBottomBar.center());
    gridSizer.setLeft(valueField.right() + padding);
	gridSizer.contents().minWidth = 0;
	gridSizer.bounds.setTo(gridSizer.bounds.left(), gridSizer.bounds.top(), (gridSizer.left() + 54), gridSizer.bounds.bottom());
    gridSizer.drawNew();
    gridSizer.fixLayout();
    this.stageBottomBar.add(gridSizer);
	
	var attributeSelector = new InputFieldMorph("", false, function() { 
		var retn = {};
		for (var i=0; i<Cell.attributes.length; i++)
		{
			retn[Cell.attributes[i]] = Cell.attributes[i];
		}
		return retn;
	}, true );
    attributeSelector.corner = 12;
    attributeSelector.padding = 0;
    attributeSelector.contrast = this.buttonContrast;
    attributeSelector.hint = "grid size";
    attributeSelector.setCenter(this.stageBottomBar.center());
    attributeSelector.setLeft(gridSizer.right() + padding);
    attributeSelector.drawNew();
    attributeSelector.fixLayout();
	this.attributeSelector = attributeSelector;
    this.stageBottomBar.add(attributeSelector);
	
	this.stageBottomBar.reactToChoice = function(choice)
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
	
    this.stageBottomBar.reactToEdit = function () {
		sizeField.accept();
		valueField.accept();
	}
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

/*SpriteIconMorph.prototype.uberStep = SpriteIconMorph.prototype.step;
SpriteIconMorph.prototype.step = function () {
	return this.uberStep();
};*/

//This just creates the text box in the icon area
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
    duplicator.accept = function () {
		var value = Number(duplicator.getValue());
		var rnd = Process.prototype.reportRandom;
		
		if (isNaN(value))
		{
			value = 1;
			duplicator.setContents(1);
		}
		
		//Go through every object and remove everyone that is based off this sprite
		var ide = myself.parentThatIsA(IDE_Morph);
		for (var i = 0; i<ide.stage.children.length; i++)
		{
			var child = ide.stage.children[i];
			if (child.parentSprite == myself.object)
			{
				//Remove it if it is a clone of this sprite
				ide.stage.removeChild(child);
				ide.stage.threads.stopAllForReceiver(child);
				child.parentSprite.cloneDestroyed();
				i--;
			}
		}
		
		//Now we make the clones
		for (var i = 0; i<value; i++)
		{
			var clone = myself.object.createCellularClone();
			ide.stage.add(clone);
			clone.setCenter(ide.stage.center());
			clone.turn(rnd.call(this, 1, 360));
			clone.setXPosition(rnd.call(this, -220, 220));
			clone.setYPosition(rnd.call(this, -160, 160));
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

//This overrides the additition of a sprite to the stage. 
/*IDE_Morph.prototype.snapAppsHookAddSprite = function (sprite) { 
	this.stage.add(sprite);
};*/