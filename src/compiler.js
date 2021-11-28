// JSCompiler /////////////////////////////////////////////////////////////////

/*
	Compile simple, side-effect free Reporters
    with either only explicit formal parameters or a specified number of
    implicit formal parameters mapped to empty input slots
	*** highly experimental and heavily under construction ***
*/

function JSCompiler(aProcess) {
	this.process = aProcess;
	this.source = null; // a context
 	this.gensyms = null; // temp dictionary for parameter substitutions
  	this.implicitParams = null;
   	this.paramCount = null;
}

JSCompiler.prototype.toString = function () {
    return 'a JSCompiler';
};

JSCompiler.prototype.compileFunction = function (aContext, implicitParamCount) {
    var block = aContext.expression,
  		parameters = aContext.inputs,
        parms = [],
        hasEmptySlots = false,
        i;

	this.source = aContext;
    this.implicitParams = implicitParamCount || 1;

	// scan for empty input slots
 	hasEmptySlots = !isNil(detect(
  		block.allChildren(),
    	morph => morph.isEmptySlot && morph.isEmptySlot()
    ));

    // translate formal parameters into gensyms
    this.gensyms = {};
    this.paramCount = 0;
    if (parameters.length) {
        // test for conflicts
        if (hasEmptySlots) {
        	throw new Error(
                'compiling does not yet support\n' +
                'mixing explicit formal parameters\n' +
                'with empty input slots'
            );
        }
        // map explicit formal parameters
        parameters.forEach((pName, idx) => {
        	var pn = 'p' + idx;
            parms.push(pn);
        	this.gensyms[pName] = pn;
        });
    } else if (hasEmptySlots) {
    	if (this.implicitParams > 1) {
        	for (i = 0; i < this.implicitParams; i += 1) {
         		parms.push('p' + i);
         	}
     	} else {
        	// allow for a single implicit formal parameter
        	parms = ['p0'];
        }
    }

    // compile using gensyms

    if (block instanceof CommandBlockMorph) {
        return Function.apply(
            null,
            parms.concat([this.compileSequence(block)])
        );
    }
    return Function.apply(
        null,
        parms.concat(['return ' + this.compileExpression(block)])
    );
};

JSCompiler.prototype.compileExpression = function (block) {
    var selector = block.selector,
        inputs = block.inputs(),
        target,
        rcvr,
        args;

    // first check for special forms and infix operators
    switch (selector) {
    case 'reportOr':
        return this.compileInfix('||', inputs);
    case 'reportAnd':
        return this.compileInfix('&&', inputs);
    case 'reportIfElse':
        return '(' +
            this.compileInput(inputs[0]) +
            ' ? ' +
            this.compileInput(inputs[1]) +
            ' : ' +
            this.compileInput(inputs[2]) +
            ')';
    case 'evaluateCustomBlock':
        throw new Error(
            'compiling does not yet support\n' +
            'custom blocks'
        );

    // special evaluation primitives
    case 'doRun':
    case 'evaluate':
        return 'invoke(' +
            this.compileInput(inputs[0]) +
            ',' +
            this.compileInput(inputs[1]) +
            ')';

    // special command forms
    case 'doSetVar': // redirect var to process
        return 'local_process.setVarNamed(' +
            this.compileInput(inputs[0]) +
            ',' +
            this.compileInput(inputs[1]) +
            ')';
    case 'doChangeVar': // redirect var to process
        return 'local_process.incrementVarNamed(' +
            this.compileInput(inputs[0]) +
            ',' +
            this.compileInput(inputs[1]) +
            ')';
    case 'doReport':
        return 'return ' + this.compileInput(inputs[0]);
    case 'doIf':
        return 'if (' +
            this.compileInput(inputs[0]) +
            ') {\n' +
            this.compileSequence(inputs[1].evaluate()) +
            '}';
    case 'doIfElse':
        return 'if (' +
            this.compileInput(inputs[0]) +
            ') {\n' +
            this.compileSequence(inputs[1].evaluate()) +
            '} else {\n' +
            this.compileSequence(inputs[2].evaluate()) +
            '}';
    case 'doForever':
        var body = inputs[0].inputs()[0];
        var while_body = "";
        if (body) {
            while_body = "\n" + this.compileSequence(body);
        }
        return "while (!local_process.isInterrupted) {\n" + while_body + "\n;yield 'forever';\n}";
    case 'doFor':
        throw "For loops unsupported";
    default:
        target = null;
        if (this.process[selector]) {
            target = this.process;
        } else {
            if (this.source) {
                target = this.source.receiver;
            } else if (this.process) {
                target = this.process.receiver;
            }
        }
        rcvr = target.constructor.name + '.prototype';
        rcvr_var_name = target.constructor.name + '_prototype'
        args = this.compileInputs(inputs);
        if (isSnapObject(target)) {
            return rcvr + '.' + selector + '.apply('+ rcvr_var_name + ', [' + args +'])';
        } else {
            return 'arguments[arguments.length - 1].' +
                selector +
                '.apply(arguments[arguments.length - 1], [' + args +'])';
        }
    }
};

JSCompiler.prototype.compileWithSpriteProcessContext = function (commandBlock) {
    var body = this.compileSequence(commandBlock);
    return "function* (SpriteMorph_prototype, local_process) {\n" + body + "}\n";
};

JSCompiler.prototype.compileSequence = function (commandBlock) {
    var body = '';
    commandBlock.blockSequence().forEach(block => {
        body += this.compileExpression(block);
        body += ';\n';
    });
    return body;
};

JSCompiler.prototype.compileInfix = function (operator, inputs) {
    return '(' + this.compileInput(inputs[0]) + ' ' + operator + ' ' +
        this.compileInput(inputs[1]) +')';
};

JSCompiler.prototype.compileInputs = function (array) {
    var args = '';
    array.forEach(inp => {
        if (args.length) {
            args += ', ';
        }
        args += this.compileInput(inp);
    });
    return args;
};

JSCompiler.prototype.compileInput = function (inp) {
     var value, type;

    if (inp.isEmptySlot && inp.isEmptySlot()) {
        // implicit formal parameter
        if (this.implicitParams > 1) {
         	if (this.paramCount < this.implicitParams) {
            	this.paramCount += 1;
             	return 'p' + (this.paramCount - 1);
        	}
            throw new Error(
                localize('expecting') + ' ' + this.implicitParams + ' '
                    + localize('input(s), but getting') + ' '
                    + this.paramCount
            );
        }
		return 'p0';
    } else if (inp instanceof MultiArgMorph) {
        return 'new List([' + this.compileInputs(inp.inputs()) + '])';
    } else if (inp instanceof ArgLabelMorph) {
    	return this.compileInput(inp.argMorph());
    } else if (inp instanceof ArgMorph) {
        // literal - evaluate inline
        value = inp.evaluate();
        type = this.process.reportTypeOf(value);
        switch (type) {
        case 'number':
            return parseFloat(value);
        case 'Boolean':
            return '' + value;
        case 'text':
            // enclose in double quotes
            return '"' + value + '"';
        case 'list':
            return 'new List([' + this.compileInputs(value) + '])';
        default:
            if (value instanceof Array) {
                 return '"' + value[0] + '"';
            }
            throw new Error(
                'compiling does not yet support\n' +
                'inputs of type\n' +
                 type
            );
        }
    } else if (inp instanceof BlockMorph) {
        if (inp.selector === 'reportGetVar') {
        	if (this.source && contains(this.source.inputs, inp.blockSpec)) {
            	// un-quoted gensym:
            	return this.gensyms[inp.blockSpec];
        	}
         	// redirect var query to process
            return 'arguments[arguments.length - 1].getVarNamed("' +
            	inp.blockSpec +
            	'")';
        }
        return this.compileExpression(inp);
    } else {
        throw new Error(
            'compiling does not yet support\n' +
            'input slots of type\n' +
            inp.constructor.name
        );
    }
};
