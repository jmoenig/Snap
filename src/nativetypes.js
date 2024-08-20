class SnapFunction extends Function {
    constructor(context){
        properties = new Map([])
        super()
        this.getContext=()=>context
        return new Proxy(this,{
            apply:function(target,thisArg,args){
                var stage = world.children[0].children[3]
                var proc = new Process()
                proc.receiver = thisArg||stage;
                proc.initializeFor(context, new List(args));
                proc.context.funct=target;
                // proc.pushContext('doYield');
                stage.threads.processes.push(proc);
                proc.runStep();
                return target.returnValue
            }
        })
    }
    Return(value){
        this.returnValue=value
    }
    getContext() {
        throw new Error("WHAT, MAKE A NEW ONE, THEN WE WILL TALK")
    }
}