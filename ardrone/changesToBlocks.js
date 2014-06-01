modules.ardroneBlocks = '2014-June-1';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

/*
** Deals with some additional argument types that blocks can have in ardrone.
*/
SyntaxElementMorph.prototype.labelPartScribble = SyntaxElementMorph.prototype.labelPartSnapapps
SyntaxElementMorph.prototype.labelPartSnapapps = function (spec) 
{
	if (spec == "%flydir") //No typing circle input
	{
		var part = new InputSlotMorph(
                null,
                false,
                {
                    'forward': ['forward'],
					'back': ['back'],
                    'left': ['left'],
					'right': ['right'],
					'up': ['up'],
					'down': ['down'],
                },
                true
            );
            part.setContents(['forward']);
        return part;
	}
    return this.labelPartScribble(spec);
}