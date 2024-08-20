class SnapFunction extends Function {
    constructor(context){
        super()
        return this.init(context)
    }
}
SnapFunction.prototype.init = function(context){
    this.getContext = () => context
    this.context = context
    return new Proxy(this, {
        apply: function (target, thisArg, args) {
            var stage = world.children[0].children[3]
            var proc = new Process()
            proc.receiver = thisArg || stage;
            proc.initializeFor(context, new List(args));
            proc.context.funct = target;
            stage.threads.processes.push(proc);
            proc.runStep();
            if(target.Error){
                throw target.Error
            }
            var retval = target.returnValue
            target.returnValue = void 0
            target.Error = void 0
            return retval
        }
    })
}
SnapFunction.prototype.Return = function (value){
    this.returnValue = value
}
SnapFunction.prototype.Throw = function (error) {
    this.Error = error
}

Error.prototype.toString = function(){
    return localize(this.name) + '\n' + this.message
}