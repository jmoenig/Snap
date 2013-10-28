modules.cellularBlocks = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

SyntaxElementMorph.prototype.labelPartScribble = SyntaxElementMorph.prototype.labelPartSnapapps
SyntaxElementMorph.prototype.labelPartSnapapps = function (spec) 
{
/*	if (spec == "%clat")
	{
		return new InputSlotMorph(
			null,
			false,
			'cellAttributesMenu',
			true
		);
	}*/
    return this.labelPartScribble(spec);
}

InputSlotMorph.prototype.cellAttributesMenu = function () {
    var dict = {};
	for (var i=0; i<Cell.attributes.length; i++)
	{
		dict[Cell.attributes[i]] = Cell.attributes[i];
	}
    return dict;
};

// BlockMorph events
BlockMorph.prototype.mouseClickLeft = function () {
    var top = this.topBlock(),
        receiver = top.receiver(),
        stage;
    if (top instanceof PrototypeHatBlockMorph) {
        return top.mouseClickLeft();
    }
    if (receiver) {
        stage = receiver.parentThatIsA(StageMorph);
		if (stage) {
			stage.children.forEach(function (child)
			{
				if (child instanceof SpriteMorph && child.parentSprite == receiver)
				{
					stage.threads.toggleProcess(top, child);
				}
			});
		}
    }
};