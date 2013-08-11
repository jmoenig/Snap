modules.cellularGui = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

IDE_Morph.prototype.createSnapAppsButtons = function(colors)
{
    var myself = this;
    // startButton
    /*var button = new PushButtonMorph(
        this,
        'scribble',
        new SymbolMorph('brush', 14)
    );*/
    /*
    var button = new ToggleButtonMorph(
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
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = new Color(0, 200, 200);
    button.contrast = this.buttonContrast;
    button.drawNew();
    button.fixLayout();
    scribbleButton = button;
    this.controlBar.add(scribbleButton);
    this.controlBar.scribbleButton = scribbleButton;
    */
}

IDE_Morph.prototype.getRightHandButtons = function(stopButton)
{
    return [stopButton, 
    this.controlBar.pauseButton, 
    this.controlBar.startButton/*,
    this.controlBar.scribbleButton*/];
}

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
/*************************** BUTTON LOGIC ****************************/
/*********************************************************************/

IDE_Morph.prototype.scribble = function () {
    this.stage.drawTool = !this.stage.drawTool;
};
