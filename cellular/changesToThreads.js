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
