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
    /*gridSizer.color = colors[0];
    gridSizer.highlightColor = colors[1];
    gridSizer.pressColor = colors[2];*/
    gridSizer.padding = 0;
    gridSizer.contrast = this.buttonContrast;
    gridSizer.hint = "grid size";
    gridSizer.drawNew();
    gridSizer.fixLayout();
    gridSizer.setCenter(this.stageBottomBar.center());
    gridSizer.setLeft(scribbleButton.right() + padding);
    this.stageBottomBar.add(gridSizer);
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
	
	var attributeSelector = new InputFieldMorph("", false, { }, true );
    gridSizer.corner = 12;
    /*gridSizer.color = colors[0];
    gridSizer.highlightColor = colors[1];
    gridSizer.pressColor = colors[2];*/
    gridSizer.padding = 0;
    gridSizer.contrast = this.buttonContrast;
    gridSizer.hint = "grid size";
    gridSizer.drawNew();
    gridSizer.fixLayout();
    gridSizer.setCenter(this.stageBottomBar.center());
    gridSizer.setLeft(scribbleButton.right() + padding);
    this.stageBottomBar.add(gridSizer);
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
};

/*********************************************************************/
/*************************** BUTTON LOGIC ****************************/
/*********************************************************************/

IDE_Morph.prototype.scribble = function () {
    this.stage.drawTool = !this.stage.drawTool;
};
