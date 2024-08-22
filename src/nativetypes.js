class SnapFunction extends Function {
    constructor(context){
        super("alert('OH NO')")
        return this.init(context)
    }
}
SnapFunction.prototype.init = function(context){
    this.getContext = () => context
    this.context = context
    var proxyobj = {proxy:{}}
    proxyobj.proxy = new Proxy(this, {
        apply: function (target, thisArg, args) {
            var stage = world.children[0].children[3]
            var proc = new Process()
            proc.receiver = thisArg || stage;
            proc.initializeFor(context, new List(args));
            proc.context.funct = target;
            stage.threads.processes.push(proc);
            proc.This=thisArg
            proc.runStep();
            if(target.Error){
                throw target.Error
            }
            var retval = target.returnValue
            target.returnValue = void 0
            target.Error = void 0
            return retval
        }, construct : function (target, args ,funct) {
            var obj = Object.create(target.prototype)
            obj.constructor = proxyobj.proxy
            var stage = world.children[0].children[3]
            var proc = new Process()
            proc.receiver = obj || stage;
            proc.initializeFor(context, new List(args));
            proc.context.funct = target;
            stage.threads.processes.push(proc);
            proc.This = obj
            proc.runStep();
            if (target.Error) {
                throw target.Error
            }
            var retval = target.returnValue
            target.returnValue = void 0
            target.Error = void 0
            if (retval instanceof proxyobj.proxy) return retval
            return obj
        }
    })
    return proxyobj.proxy
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