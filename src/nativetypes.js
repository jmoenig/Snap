class SnapFunction extends Function {
    constructor(context){
        super()
        return this.init(context)
    }
}
SnapFunction.prototype.init = function(context){
    this.getContext = () => context
    return new Proxy(this, {
        apply: function (target, thisArg, args) {
            var stage = world.children[0].children[3]
            var proc = new Process()
            proc.receiver = thisArg || stage;
            proc.initializeFor(context, new List(args));
            proc.context.funct = target;
            // proc.pushContext('doYield');
            stage.threads.processes.push(proc);
            proc.runStep();
            return target.returnValue
        }
    })
}
SnapFunction.prototype.Return = function (value){
    this.returnValue = value
}
