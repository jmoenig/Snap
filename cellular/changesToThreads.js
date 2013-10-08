ThreadManager.prototype.startProcess = function (block, isThreadSafe) {
    var active = this.findProcess(block),
        top = block.topBlock(),
        newProc;
    if (active) {
        if (isThreadSafe) {
            return active;
        }
        active.stop();
        this.removeTerminatedProcesses();
    }
    top.addHighlight();
    newProc = new Process(block.topBlock());
    this.processes.push(newProc);
    return newProc;
};