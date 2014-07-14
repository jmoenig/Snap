modules.ardroneGui = '2014-June-1';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

function getSnapLogoImage()
{
    return 'ardrone_logo_sm.png';
}

function getSnapAppsName()
{
    return 'AR-Drone';
}

function getSnapAppsAboutText()
{
    return 'AR-Drone 1.0\n Based upon Snap! 4.0\nBuild Your Own Blocks\n\n--- beta ---\n\n'
        + 'AR-Drone modifications copyright \u24B8 2013 Aidan Lane and Matthew Ready\n'
        + 'aidan.lane@monash.edu, matt.ready@monash.edu\n\n'
        + 'For more information visit http://flipt.org/';
}

function getSnapAppsLogoExtent()
{
    return new Point(218, 28);
}