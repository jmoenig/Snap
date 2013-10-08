modules.cellularBlocks = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

SyntaxElementMorph.prototype.labelPartScribble = SyntaxElementMorph.prototype.labelPartSnapapps
SyntaxElementMorph.prototype.labelPartSnapapps = function (spec) 
{
    return this.labelPartScribble(spec);
}

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
            stage.threads.toggleProcess(top);
        }
    }
};