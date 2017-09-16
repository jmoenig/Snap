// ThreadManager ///////////////////////////////////////////////////////

export default class ThreadManager {
    constructor() {
        this.processes = [];
        this.wantsToPause = false; // single stepping support
    }

    toggleProcess(block, receiver) {
        const active = this.findProcess(block, receiver);
        if (active) {
            active.stop();
        } else {
            return this.startProcess(block, receiver, null, null, null, true);
        }
    }

    startProcess(
        block,
        receiver,
        isThreadSafe,
        // bool
        exportResult,
        callback,
        isClicked,
        rightAway) {
        const top = block.topBlock();
        const active = this.findProcess(top, receiver);
        let glow;
        let newProc;
        if (active) {
            if (isThreadSafe) {
                return active;
            }
            active.stop();
            this.removeTerminatedProcesses();
        }
        newProc = new Process(top, receiver, callback, isClicked);
        newProc.exportResult = exportResult;
        newProc.isClicked = isClicked || false;

        // show a highlight around the running stack
        // if there are more than one active processes
        // for a block, display the thread count
        // next to it
        glow = top.getHighlight();
        if (glow) {
            glow.threadCount = this.processesForBlock(top).length + 1;
            glow.updateReadout();
        } else {
            top.addHighlight();
        }

        this.processes.push(newProc);
        if (rightAway) {
            newProc.runStep();
        }
        return newProc;
    }

    stopAll(excpt) {
        // excpt is optional
        this.processes.forEach(proc => {
            if (proc !== excpt) {
                proc.stop();
            }
        });
    }

    stopAllForReceiver(rcvr, excpt) {
        // excpt is optional
        this.processes.forEach(proc => {
            if (proc.homeContext.receiver === rcvr && proc !== excpt) {
                proc.stop();
                if (rcvr.isTemporary) {
                    proc.isDead = true;
                }
            }
        });
    }

    stopAllForBlock(aTopBlock) {
        this.processesForBlock(aTopBlock, true).forEach(proc => {
            proc.stop();
        });
    }

    stopProcess(block, receiver) {
        const active = this.findProcess(block, receiver);
        if (active) {
            active.stop();
        }
    }

    pauseAll(stage) {
        this.processes.forEach(proc => {
            proc.pause();
        });
        if (stage) {
            stage.pauseAllActiveSounds();
        }
    }

    isPaused() {
        return detect(this.processes, proc => proc.isPaused)
            !== null;
    }

    resumeAll(stage) {
        this.processes.forEach(proc => {
            proc.resume();
        });
        if (stage) {
            stage.resumeAllActiveSounds();
        }
    }

    step() {
        // run each process until it gives up control, skipping processes
        // for sprites that are currently picked up, then filter out any
        // processes that have been terminated

        let isInterrupted;
        if (Process.prototype.enableSingleStepping) {
            this.processes.forEach(proc => {
                if (proc.isInterrupted) {
                    proc.runStep();
                    isInterrupted = true;
                } else {
                    proc.lastYield = Date.now();
                }
            });
            this.wantsToPause = (Process.prototype.flashTime > 0.5);
            if (isInterrupted) {
                if (this.wantsToPause) {
                    this.pauseAll();
                }
                return;
            }
        }

        this.processes.forEach(proc => {
            if (!proc.homeContext.receiver.isPickedUp() && !proc.isDead) {
                proc.runStep();
            }
        });
        this.removeTerminatedProcesses();
    }

    removeTerminatedProcesses() {
        // and un-highlight their scripts
        const remaining = [];

        let count;
        const myself = this;
        this.processes.forEach(proc => {
            let result;
            let glow;
            if ((!proc.isRunning() && !proc.errorFlag) || proc.isDead) {
                if (proc.topBlock instanceof BlockMorph) {
                    proc.unflash();
                    // adjust the thread count indicator, if any
                    count = myself.processesForBlock(proc.topBlock).length;
                    if (count) {
                        glow = proc.topBlock.getHighlight() ||
                            proc.topBlock.addHighlight();
                        glow.threadCount = count;
                        glow.updateReadout();
                    } else {
                        proc.topBlock.removeHighlight();
                    }
                }
                if (proc.prompter) {
                    proc.prompter.destroy();
                    if (proc.homeContext.receiver.stopTalking) {
                        proc.homeContext.receiver.stopTalking();
                    }
                }
                if (proc.topBlock instanceof ReporterBlockMorph ||
                        proc.isShowingResult) {
                    result = proc.homeContext.inputs[0];
                    if (proc.onComplete instanceof Function) {
                        proc.onComplete(result);
                    } else {
                        if (result instanceof List) {
                            proc.topBlock.showBubble(
                                result.isTable() ?
                                        new TableFrameMorph(
                                            new TableMorph(result, 10)
                                        )
                                        : new ListWatcherMorph(result),
                                proc.exportResult,
                                proc.receiver
                            );
                        } else {
                            proc.topBlock.showBubble(
                                result,
                                proc.exportResult,
                                proc.receiver
                            );
                        }
                    }
                }
            } else {
                remaining.push(proc);
            }
        });
        this.processes = remaining;
    }

    findProcess(block, receiver) {
        const top = block.topBlock();
        return detect(
            this.processes,
            each => each.topBlock === top && (each.receiver === receiver)
        );
    }

    processesForBlock(block, only) {
        const top = only ? block : block.topBlock();
        return this.processes.filter(each => each.topBlock === top &&
            each.isRunning() &&
            !each.isDead);
    }

    doWhen(block, receiver, stopIt) {
        if (this.pauseCustomHatBlocks) {return; }
        if ((!block) || this.findProcess(block, receiver)) {
            return;
        }
        const pred = block.inputs()[0];
        let world;
        if (block.removeHighlight()) {
            world = block.world();
            if (world) {
                world.hand.destroyTemporaries();
            }
        }
        if (stopIt) {return; }
        try {
            if (invoke(
                pred,
                null,
                receiver,
                50,
                'the predicate takes\ntoo long for a\ncustom hat block',
                true // suppress errors => handle them right here instead
            ) === true) {
                this.startProcess(
                    block,
                    receiver,
                    null,
                    null,
                    null,
                    null,
                    true // atomic
                );
            }
        } catch (error) {
            block.addErrorHighlight();
            block.showBubble(
                `${error.name}\n${error.message}`
            );
        }
    }

    toggleSingleStepping() {
        Process.prototype.enableSingleStepping =
            !Process.prototype.enableSingleStepping;
        if (!Process.prototype.enableSingleStepping) {
            this.processes.forEach(proc => {
                if (!proc.isPaused) {
                    proc.unflash();
                }
            });
        }
    }
}

ThreadManager.prototype.pauseCustomHatBlocks = false;