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
    var args = this.context.inputs;
    if (object instanceof SpriteMorph) {
        if (args[1]) {
			this.popContext();
			this.pushContext('doYield');
			this.context.receiver = object;
			this.pushContext(args[1].blockSequence(), this.context);
			this.pushContext();
		}
	}
};

Process.prototype.nearestObject = function (object, x, y, predicate) {
	//This function is run many times
	
	if (!this.context.nearestObjectState)
	{
		//This is the first call
		this.context.nearestObjectState = 1;
		
		//This will get the value of the predicate and put it in this.inputs[4]
		if (predicate instanceof Context) {
			predicate.outerContext =  predicate.parentContext = this.context;
			predicate.receiver = this.context ? this.context.receiver : this.homeContext.receiver;
			
			//Manipulate the predicate "upvars" here.
			
			this.context = predicate;
			this.pushContext();
		}
		
		//this.inputs[4] will be calculated once we return...
	}
	else
	{
		//This call is not the first call
		//We asked for the value of the predicate in the last call: this.inputs[4] is that! Remove it and use it here somehow
		
		//Continue calculations using this.context.nearestObjectState...
		
		//Return a result for the block
		return "Hello";
	}
};

