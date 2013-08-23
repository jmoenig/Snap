modules.cellularBlocks = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/
/**/

SyntaxElementMorph.prototype.labelPartScribble = SyntaxElementMorph.prototype.labelPartSnapapps
SyntaxElementMorph.prototype.labelPartSnapapps = function (spec) 
{
    return this.labelPartScribble(spec);
}

