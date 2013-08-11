modules.scribbleGui = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

IDE_Morph.prototype.createSnapAppsButtons = function(colors)
{
}

IDE_Morph.prototype.getRightHandButtons = function(stopButton)
{
    return [stopButton, 
    this.controlBar.pauseButton, 
    this.controlBar.startButton];
}

function getSnapLogoImage()
{
    return 'scribble/scribble_logo_sm.png';
}

function getSnapAppsName()
{
    return 'Scribble';
}

function getSnapAppsAboutText()
{
    return 'Scribble 1.0\n Based upon Snap! 4.0\nBuild Your Own Blocks\n\n--- beta ---\n\n'
        + 'Scribble modifications copyright \u24B8 2013 Aidan Lane and Matthew Ready\n'
        + 'aidan.lane@monash.edu, matt.ready@monash.edu\n\n'
        + 'For more information visit http://flipt.org/';
}

function getSnapAppsLogoExtent()
{
    return new Point(210, 28);
}
