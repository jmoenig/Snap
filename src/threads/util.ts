export function snapEquals(a, b) {
    if (a instanceof List || (b instanceof List)) {
        if (a instanceof List && (b instanceof List)) {
            return a.equalTo(b);
        }
        return false;
    }

    var x = +a,
        y = +b,
        i,
        specials = [true, false, ''];

    // "zum Schneckengang verdorben, was Adlerflug geworden wäre"
    // collecting edge-cases that somebody complained about
    // on Github. Folks, take it easy and keep it fun, okay?
    // Shit like this is patently ugly and slows Snap down. Tnx!
    for (i = 9; i <= 13; i += 1) {
        specials.push(String.fromCharCode(i));
    }
    specials.push(String.fromCharCode(160));

    // check for special values before coercing to numbers
    if (isNaN(x) || isNaN(y) ||
            [a, b].some(function (any) {return contains(specials, any) ||
                  (isString(any) && (any.indexOf(' ') > -1)); })) {
        x = a;
        y = b;
    }

    // handle text comparison case-insensitive.
    if (isString(x) && isString(y)) {
        return x.toLowerCase() === y.toLowerCase();
    }

    return x === y;
}

export function invoke(
    action, // a BlockMorph or a Context, a reified ("ringified") block
    contextArgs, // optional List of arguments for the context, or null
    receiver, // sprite or environment, optional for contexts
    timeout, // msecs
    timeoutErrorMsg, // string
    suppressErrors // bool
) {
    // execute the given block or context synchronously without yielding.
    // Apply context (not a block) to a list of optional arguments.
    // Receiver (sprite, stage or  environment), timeout etc. are optional.
    // If a timeout (in milliseconds) is specified, abort execution
    // after the timeout has been reached and throw an error.
    // SuppressErrors (bool) if non-timeout errors occurring in the
    // block are handled elsewhere.
    // This is highly experimental.
    // Caution: Kids, do not try this at home!
    // Use ThreadManager::startProcess with a callback instead

    var proc = new Process(),
        deadline = (timeout ? Date.now() + timeout : null);

    if (action instanceof Context) {
        if (receiver) { // optional
            action = proc.reportContextFor(receiver);
        }
        proc.initializeFor(action, contextArgs || new List());
    } else if (action instanceof BlockMorph) {
        proc.topBlock = action;
        if (receiver) {
            proc.homeContext = new Context();
            proc.homeContext.receiver = receiver;
            if (receiver.variables) {
                proc.homeContext.variables.parentFrame = receiver.variables;
            }
        } else {
            throw new Error('expecting a receiver but getting ' + receiver);
        }
        proc.context = new Context(
            null,
            action.blockSequence(),
            proc.homeContext
        );
    } else if (action.evaluate) {
        return action.evaluate();
    } else {
        throw new Error('expecting a block or ring but getting ' + action);
    }
    if (suppressErrors) {
        proc.isCatchingErrors = false;
    }
    while (proc.isRunning()) {
        if (deadline && (Date.now() > deadline)) {
            throw (new Error(
                localize(
                    timeoutErrorMsg ||
                        "a synchronous Snap! script has timed out")
                )
            );
        }
        proc.runStep(deadline);
    }
    return proc.homeContext.inputs[0];
}