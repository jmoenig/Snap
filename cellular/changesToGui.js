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
    return new Point(170, 28);
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
	
	var flowField;
	flowField = new InputFieldMorph(this.stage.strokeFlow.toString());
    flowField.corner = 12;
    flowField.padding = 0;
    flowField.contrast = this.buttonContrast;
    flowField.hint = "brush flow";
	flowField.contents().minWidth = 0;
    flowField.setCenter(this.stageBottomBar.center());
    flowField.setWidth(32); // fixed dimensions
    flowField.setLeft(valueLabel.right() + padding);
    flowField.drawNew();
    flowField.accept = function () {
		var value = Number(flowField.getValue());
		if (isNaN(value))
		{
			flowField.setContents(10);
			return;
		}
        myself.stage.strokeFlow = value;
    };
    this.stageBottomBar.add(flowField);
	
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
    gridSizer.setLeft(flowField.right() + padding);
	gridSizer.contents().minWidth = 0;
	gridSizer.bounds.setTo(gridSizer.bounds.left(), gridSizer.bounds.top(), (gridSizer.left() + 54), gridSizer.bounds.bottom());
    gridSizer.drawNew();
    gridSizer.fixLayout();
    this.stageBottomBar.add(gridSizer);
	
	var attributeSelector = new InputFieldMorph("", false, { }, true );
    attributeSelector.corner = 12;
    attributeSelector.padding = 0;
    attributeSelector.contrast = this.buttonContrast;
    attributeSelector.hint = "grid size";
    attributeSelector.setCenter(this.stageBottomBar.center());
    attributeSelector.setLeft(gridSizer.right() + padding);
    attributeSelector.drawNew();
    attributeSelector.fixLayout();
    this.stageBottomBar.add(attributeSelector);
	
	this.stageBottomBar.reactToChoice = function(choice)
	{
		var choiceInt = 40;
		switch (choice)
		{
			case "16x12": choiceInt = 16; break;
			case "20x15": choiceInt = 20; break;
			case "40x30": choiceInt = 40; break;
			case "80x60": choiceInt = 80; break;
		}
		myself.stage.cellsX = choiceInt;
		myself.stage.cellsY = choiceInt * 3 / 4;
		myself.stage.updateCells();
	}
	
    this.stageBottomBar.reactToEdit = function () {
		sizeField.accept();
		flowField.accept();
	}
};

/*********************************************************************/
/*************************** BUTTON LOGIC ****************************/
/*********************************************************************/

IDE_Morph.prototype.scribble = function () {
    this.stage.drawTool = !this.stage.drawTool;
};
