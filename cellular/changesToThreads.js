modules.cellularThreads = '2013-October-13';

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

VariableFrame.prototype.uberDeleteVar = VariableFrame.prototype.deleteVar;
VariableFrame.prototype.deleteVar = function (name) {
    try {
        var frame = this.find(name);
    } catch (e) {
        return;
    }
    this.uberDeleteVar(name);
};

/*
** Ensures the parent SpriteMorph doesn't perform any actions.
*/
ThreadManager.prototype.uberStartProcess = ThreadManager.prototype.startProcess;	
ThreadManager.prototype.startProcess = function (
    block,
    isThreadSafe,
    exportResult,
    callback,
    receiver
) {
	//Final chance to prevent the prototype SpriteMorphs from doing shit.
	if (receiver instanceof SpriteMorph && !receiver.shouldPerformEvents()) {
		return null;
	}
	return this.uberStartProcess(block, isThreadSafe, exportResult, callback, receiver);
};

/*
** Returns the number of instances of a particular object
*/
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

/*
** This stores the last created clone for this thread.
*/
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

Process.prototype.nearestObject = function (otherObjectName, x, y, predicate) {
	function eraseInputs(block)
	{
		block.inputs = [];
		if (block.outerInputs)
			eraseInputs(block.outerInputs);
	}

	//This function is run many times
	if (!(predicate instanceof Context)) {
		throw { name: "NoPredicateError", message: "Please supply a predicate (the last thing) to the nearestObject block!" };
	}
	
	if (!this.context.nearestObjectState)
	{
		//Make this process atomic until the final object is checked
        this.isAtomic = true;
		//This is the first call
		//Get a list of all objects of the type "otherObjectName".
		if (!otherObjectName) 
		{ 
			return null; 
		}
		if (otherObjectName == "myself")
			otherObjectName = this.parentSprite ? this.parentSprite.name : this.name;
			
		var objects = [];
		this.context.receiver.parentThatIsA(StageMorph).children.forEach(function (x) {
			if (x instanceof SpriteMorph && x.parentSprite && x.parentSprite.name == otherObjectName)
			{
				objects.push(x);
			}
		});
		
		this.context.nearestObjectState = { 
			objects: objects,
			lastObject: null, 
			minSqDist: -1, 
			minObject: null 
		};
	}
	
	var state = this.context.nearestObjectState,
		objects = state.objects,
		lastResult = this.context.inputs[4];
	
	//Remove last input (This is where the result of the predicate goes)
	if (this.context.inputs.length > 4)
		this.context.inputs.pop();
	
	if (lastResult)
	{
		//Calculate square distance to object
		var dx = state.lastObject.xPosition() - x;
		var dy = state.lastObject.yPosition() - y;
		var sqDist = dx * dx + dy * dy;
		
		//Set minimum if neccessary
		if (state.minSqDist < 0 || sqDist < state.minSqDist)
		{
			state.minSqDist = sqDist;
			state.minObject = state.lastObject;
		}
	}
	
	//Pop from the list
	state.lastObject = objects.pop();
	
	if (state.lastObject)
	{
		//This will get the value of the predicate and put it in this.inputs[4]
		eraseInputs(predicate);
		predicate.outerContext =  predicate.parentContext = this.context;
		predicate.receiver = state.lastObject;
		this.context = predicate;
		this.pushContext();
		
		//this.inputs[4] will be calculated once we return...
		return;
	}
	else
	{
		//Remove atomicity
        this.isAtomic = false;
		//No more objects! Clean up and return minimum.
		delete this.context.nearestObjectState;
		return state.minObject;
	}
};

Process.prototype.uberDoFaceTowards = Process.prototype.doFaceTowards;
Process.prototype.doFaceTowards = function (name) {
	if (name instanceof SpriteMorph)
	{
		var thisObj = this.homeContext.receiver;
		thisObj.faceToXY(
			name.xPosition(),
			name.yPosition()
		);
	}
	else
	{
		return this.uberDoFaceTowards(name);
	}
};

