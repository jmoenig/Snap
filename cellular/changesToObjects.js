modules.cellularObjects = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

/*
 * Hooks into SpriteMorph.blockTemplates
 * 
 * Adds the blocks to the UI
 */
 
SpriteMorph.prototype.scribbleHookBlockTemplates = SpriteMorph.prototype.snapappsHookBlockTemplates;
SpriteMorph.prototype.snapappsHookBlockTemplates = function(blocks, block, cat)
{
    return this.scribbleHookBlockTemplates(blocks, block, cat);
}
