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