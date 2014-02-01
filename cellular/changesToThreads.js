modules.cellularThreads = '2013-October-13';

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

ThreadManager.prototype.uberStartProcess = ThreadManager.prototype.startProcess;	
ThreadManager.prototype.startProcess = function (block, receiver, isThreadSafe) {
	//Final chance to prevent the prototype SpriteMorphs from doing shit.
	if (receiver instanceof SpriteMorph && !receiver.shouldPerformEvents()) {
		return null;
	}
	return this.uberStartProcess(block, receiver, isThreadSafe);
};

Process.prototype.instanceCount = function(countThese)
{
    var thisObj = this.homeContext.receiver;
		
    if (thisObj) {
        if (this.inputOption(countThese) === 'myself') {
			while(thisObj.parentSprite)
				thisObj = thisObj.parentSprite;
			return thisObj.cloneCount;
        } else {
            var thatObj = this.getOtherObject(name, thisObj);
            if (thatObj) {
                return thatObj.cloneCount;
            }
        }
    }
}

Process.prototype.lastCreatedClone = null;

//When a clone is created, we need to note down the last created clone
Process.prototype.getLastClone = function () {
    return this.lastCreatedClone;
};

//When a clone is created, we need to note down the last created clone
Process.prototype.createClone = function (name) {
    var thisObj = this.homeContext.receiver,
        thatObj;
		
	this.lastCreatedClone = null;

    if (!name) {return; }
    if (thisObj) {
        if (this.inputOption(name) === 'myself') {
            this.lastCreatedClone = thisObj.createClone();
        } else {
            thatObj = this.getOtherObject(name, thisObj);
            if (thatObj) {
                this.lastCreatedClone = thatObj.createClone();
            }
        }
    }
};

Process.prototype.asObject = function (object, commandBlock) {
    var args = this.context.inputs,
        outer = this.context.outerContext, // for tail call elimination
        isLambda = this.context.isLambda,
        isImplicitLambda = this.context.isImplicitLambda,
        isCustomBlock = this.context.isCustomBlock,
        upvars = this.context.upvars;

    this.popContext();
    if (object instanceof SpriteMorph) {
        if (args[1]) {
            this.pushContext(args[1].blockSequence(), outer);
			this.context.receiver = object;
            this.context.isLambda = isLambda;
            this.context.isImplicitLambda = isImplicitLambda;
            this.context.isCustomBlock = isCustomBlock;
            this.context.upvars = new UpvarReference(upvars);
        }
    }
    this.pushContext();
};