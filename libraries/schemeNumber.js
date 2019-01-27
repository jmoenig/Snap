// Scheme numerical tower in JavaScript.
// Copyright (c) 2011,2012 by John Tobey <jtobey@john-edwin-tobey.org>

/*
    File: schemeNumber.js

    Exports:

        <SchemeNumber>

    Depends:

        <biginteger.js> for <BigInteger>
 */

/*
    Class: SchemeNumber
    A number object as <defined by the Scheme language at
    http://www.r6rs.org/>.

    Scheme supports *exact* arithmetic and mixing exact with standard
    (*inexact*) numbers.  Several basic operations, including
    addition, subtraction, multiplication, and division, when given
    only exact arguments, must return an exact, numerically correct
    result.

    These operations are allowed to fail due to running out of memory,
    but they are not allowed to return approximations the way
    ECMAScript operators may, unless given one or more inexact
    arguments.

    For example, adding exact *1/100* to exact *0* one hundred times
    produces exactly *1*, not 1.0000000000000007 as in JavaScript.
    Raising exact *2* to the power of exact *1024* returns a 308-digit
    integer with complete precision, not *Infinity* as in ECMAScript.

    This implementation provides all functions listed in the <R6RS
    Scheme specification at http://www.r6rs.org/>, Section 11.7, along
    with <eqv?> from Section 11.5.  (<eqv?> uses JavaScript's *===* to
    compare non-numbers.)

    Exact numbers support the standard ECMA Number formatting methods
    (toFixed, toExponential, and toPrecision) without a fixed upper
    limit to precision.

    The schemeNumber.js file exports an object <SchemeNumber>.  It
    contains a property <fn>, which in turn contains the functions
    implementing the numeric types.

    The <SchemeNumber> object is in fact a function that converts its
    argument to a Scheme number: similar to a constructor, but it may
    not always return an object, let alone a unique object.

    Parameters:

        obj - Object to be converted to a Scheme number.

    *obj* may have any of the following
    types:

        Scheme number - returned unchanged.
        String        - converted as if by *string->number*.
        Native ECMAScript number - treated as an inexact real.

    Returns:

        A Scheme number.

    Exceptions:

        If *obj* can not be parsed, <SchemeNumber> will <raise> an
        exception with condition type *&assertion*.

    See Also:

        <fn>, <raise>, <R6RS Chapter 3: Numbers at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-6.html#node_chap_3>
*/
var SchemeNumber = (function() {

//
// Multiple dispatch support.
//

var DispatchJs = (function() {
"use strict";
/*
Multiple dispatch for JavaScript functions of fixed arity.  Example:

    // B and C inherit from A.  D inherits from C.
    var A = disp.defClass("A", {ctor: function(x) { this.x = x }});
    var B = disp.defClass("B", {base: "A"});
    var C = disp.defClass("C", {base: "A"});
    // Classes may be defined after their superclass methods.
    //var D = disp.defClass("D", {base: "C"});

    // Or you can declare existing classes:
    //var disp = DispatchJs;
    //function A(){} A.prototype = {};
    //disp.defClass("A", {ctor: A});
    //function B(){} B.prototype = new A();
    //disp.defClass("B", {ctor: B, base "A"});
    //function C(){} C.prototype = new A();
    //disp.defClass("C", {ctor: C, base "A"});
    //function D(){} D.prototype = new C();
    //disp.defClass("D", {ctor: D, base "C"});

    // This creates a function of 2 arguments:
    var frob = disp.defGeneric("frob", 2);

    // Define methods.  Methods receive frob's first argument as "this" and
    // the rest as method arguments.
    frob.def("A", "A", function(a1) { return "A A" });
    frob.def("A", "B", function(a1) { return "A B" });
    frob.def("B", "A", function(a1) { return "B A" });
    frob.def("B", "B", function(a1) { return "B B" });
    frob.def("A", "C", function(a1) { return "A C" });
    var D = disp.defClass("D", function(x) { this.x = x }, "C");
    frob.def("D", "D", function(a1) { return "D D" });

    // Create some arguments:
    var a = new A();
    var b = new B();
    var c = new C();
    var d = new D();

    // Call the function:
    frob(a,a);  // "A A"
    frob(a,b);  // "A B"
    frob(a,c);  // "A C"
    frob(a,d);  // "A C"
    frob(b,a);  // "B A"
    frob(b,b);  // "B B"
    frob(b,c);  // "B A" or "A C"
    frob(b,d);  // "B A" or "A C"
    frob(c,a);  // "A A"
    frob(c,b);  // "A B"
    frob(c,c);  // "A C"
    frob(c,d);  // "A C"
    frob(d,a);  // "A A"
    frob(d,b);  // "A B"
    frob(d,c);  // "A C"
    frob(d,d);  // "D D"

Ambiguous calls such as frob(b,c) and frob(b,d) above use whichever of
the best candidates was defined first: the method for types B,A or the
one for A,C.
*/

function short_fn(f) {
    return String(f).replace(/(?:.|\n)*(function .*?\(.*?\))(?:.|\n)*/, "$1");
}

var Formals = [];

function makeContext(opts) {

    var g = opts.globals;
    var _Function = (g ? g.Function : Function);
    var uncurry = _Function.prototype.bind.bind(_Function.prototype.call);
    var _Object   = (g ? g.Object   : Object);
    var _String   = (g ? g.String   : String);
    var _Array    = (g ? g.Array    : Array);
    var _Error    = (g ? g.Error    : Error);
    var _apply   = uncurry(_Function.prototype.apply);
    var _slice   = uncurry(_Array.prototype.slice);
    var _join    = uncurry(_Array.prototype.join);
    var _push    = uncurry(_Array.prototype.push);
    var _unshift = uncurry(_Array.prototype.unshift);
    var _forEach = uncurry(_Array.prototype.forEach);
    var _concat  = uncurry(_Array.prototype.concat);
    var _replace = uncurry(_String.prototype.replace);
    var _split   = uncurry(_String.prototype.split);
    var _create  = _Object.create;
    var _hasOwnProperty = uncurry(_Object.prototype.hasOwnProperty);
    var String_indexOf = uncurry(_String.prototype.indexOf);
    var Array_indexOf  = uncurry(_Array.prototype.indexOf);

    var prefix = opts.methodNamePrefix || "_jsmd";
    var ePrefix = _replace(prefix, /([\"\\])/g, "\\$1");
    var sep = opts.methodNameSeparator || " ";
    var classes = _create(null);

    function classToName(cl) {
        if (cl != null) {
            var name = cl[prefix];
            if (typeof name === "string")
                if (classes[name] && classes[name].ctor === cl)
                    return name;
            else
                for (name in classes)
                    if (classes[name] && classes[name].ctor === cl)
                        return name;
        }
    }
    function assertClassToName(cl) {
        if ("string" === typeof cl)
            return cl;
        var ret = classToName(cl);
        if (ret)
            return ret;
        throw _Error("Class not defined: " + cl);
    }

    function pureVirtual() {
        var msg = "Abstract method not overridden for ";
        try {
            msg += this;
        }
        catch (e) {
            try {
                msg += _Object.prototype.toString.call(this);
            }
            catch (e) {
                msg += "object";
            }
        }
        throw new _Error(msg);
    }

    var ret = {
        getConstructor: function(name) {
            return classes[name] && classes[name].ctor;
        },
        defClass: function(name, opts) {
            var ctor, base;
            var bctor, proto, key, sub, sepBase, cname, c;
            var ometh, meth, func, array, doit, i, indices;

            opts.debug && console.log("defClass: ", name);
            if (opts) {
                ctor = opts.ctor;
                if (opts.base)
                    base = assertClassToName(opts.base);
            }
            if (typeof base === "undefined" && ctor && ctor.prototype != null) {
                base = classToName(ctor.prototype.constructor);
            }
            //opts.debug && console.log("base:", base);
            if (typeof base !== "undefined") {
                bctor = classes[base].ctor;
            }
            ctor = ctor || function(){}
            if (typeof name !== "string") {
                throw _Error("Usage: defClass(NAME, [OPTS])");
            }
            if (classes[name]) {
                if (classes[name].ctor !== ctor || classes[name].base !== base)
                {
                    throw _Error("Can't redefine class " + name);
                }
                return ctor;
            }
            if (String_indexOf(name, sep) != -1) {
                throw _Error((sep == " " ? "Space" : "Separator") +
                             " in class name: " + name);
            }
            if (typeof (ctor[prefix]) !== "undefined") {
                if (ctor[prefix] !== name)
                    throw _Error("Cannot define constructor as " + name +
                                 ", it was previously defined as " +
                                 ctor[prefix]);
            }
            else {
                ctor[prefix] = name;
            }
            //opts.debug && console.log("checking prototype constructor");
            if (ctor.prototype) {
                if (_hasOwnProperty(ctor.prototype, "constructor")) {
                    if (ctor.prototype.constructor !== ctor)
                        throw _Error("ctor.prototype.constructor is not ctor");
                }
                else {
                    ctor.prototype.constructor = ctor;
                }
            }
            //opts.debug && console.log("ok")
            if (!ctor.prototype ||
                (bctor && !(ctor.prototype instanceof bctor)))
            {
                proto = (bctor ? new bctor() : _create(null));
                //opts.debug && console.log("proto.constructor[prefix]", proto.constructor[prefix]);
                if (ctor.prototype) {
                    // XXX Used for BigInteger; too hacky?
                    for (key in ctor.prototype) {
                        proto[key] = ctor.prototype[key];
                    }
                }
                proto.constructor = ctor;
                ctor.prototype = proto;
            }
            classes[name] = {
                ctor:    ctor,
                base:    base,
                sub:     [],
                ename:   _replace(sep + name, /([\"\\])/g, "\\$1")
            };
            //opts.debug && console.log("defClass:", name, "base:", base);
            if (typeof base !== "undefined") {
                sub = classes[base].sub;
                if (Array_indexOf(sub, name) === -1)
                    _push(sub, name);
                sepBase = sep + base;
                for (cname in classes) {
                    proto = classes[cname].ctor.prototype;
                    for (ometh in proto) {
                        if (!_hasOwnProperty(proto, ometh))
                            continue;
                        if (!String_indexOf(ometh, sepBase))
                            continue;
                        array = _split(ometh, sep);
                        if (array[0] !== prefix)
                            continue;
                        func = proto[ometh];
                        indices = [];
                        for (i = Array_indexOf(array, base, 2); i !== -1;
                             i = Array_indexOf(array, base, i + 1)) {
                            _push(indices, i);
                        }
                        doit = function(i) {
                            if (i === indices.length) {
                                meth = _join(array, sep);
                                if (meth !== ometh) {
                                    opts.debug && console.log(cname + '["'+meth+'"] propagated -> ' + short_fn(func));
                                    proto[meth] = func;
                                }
                                return;
                            }
                            array[indices[i]] = base;
                            doit(i + 1);
                            array[indices[i]] = name;
                            doit(i + 1);
                        }
                        doit(0);
                    }
                }
            }
            return ctor;
        },

        defGeneric: function (fnName, ndisp, nargs) {
            if (String_indexOf(fnName, sep) != -1)
                throw _Error((sep == " " ? "Space" : "Separator") +
                             " in function name: " + fnName);
            nargs = nargs || ndisp;
            if (fnName == ""
                || ndisp < 1 || ndisp != (ndisp | 0)
                || nargs < 1 || nargs != (nargs | 0))
                throw Error("Usage: defGeneric(NAME, NDISP [, NARGS])");

            var eName = _replace(sep + fnName, /([\"\\])/g, "\\$1");
            var eTopMethod = ePrefix + eName;

            for (var i = Formals.length; i < nargs; i++)
                Formals[i] = "a" + i;
            var array = _slice(Formals, 0, nargs);
            // e.g., function(a0,a1,a2,a3){return a3["_jsmd frob"](a0,a1,a2)}
            _push(array,
                  "return " + Formals[ndisp-1] + '["' + eTopMethod + '"](' +
                  _join(_concat(_slice(array, 0, ndisp-1),
                                _slice(array, ndisp, nargs)), ",") + ')')
            var ret = _apply(_Function, null, array);

            var func_cache = _create(null);
            function get_func(i, etypes) {
                var suffix = _join(_slice(etypes, i), "");
                if (!func_cache[suffix]) {
                    var method = ePrefix + eName + suffix;
                    var array = _concat(_slice(Formals, 0,i),
                                        _slice(Formals, i+1, nargs));

                    _push(array, "return " + Formals[i-1] +
                          '["' + method + '"](' +
                          _join(_concat(_slice(Formals, 0, i-1), "this",
                                        _slice(Formals, i+1, nargs)), ",") +
                          ')');

                    func_cache[suffix] = _apply(_Function, null, array);
                }
                return func_cache[suffix];
            }

            // For error message.
            function usageArgs() {
                switch (ndisp) {
                case 1: return "TYPE";
                case 2: return "TYPE1, TYPE2";
                case 3: return "TYPE1, TYPE2, TYPE3";
                default: return "TYPE1, ..., TYPE" + ndisp;
                }
            }

            // def(TYPE1, ..., TYPEn, FUNCTION)
            // Defines FUNCTION as this method's specialization for the
            // given types.  Each TYPEi must have been passed as the
            // NAME argument in a successful call to defClass.
            function def() {
                var fn = arguments[ndisp] || pureVirtual;
                if (typeof fn !== "function") {
                    throw _Error("Not a function.  Usage: " + fnName +
                                 ".def(" + usageArgs() + ", FUNCTION)");
                }
                var types = _slice(arguments, 0, ndisp);
                //opts.debug && console.log("def", fnName, types, short_fn(fn));

                for (i = 0; i < ndisp; i++) {
                    // Throw error if not registered.
                    // XXX Could add def() arguments to a list to be
                    // defined during defClass.
                    types[i] = assertClassToName(types[i]);
                }
                //opts.debug && console.log("def");
                do_def(types, fn, _create(null));
            }

            function do_def(types, fn, inherited) {
                var cs = new _Array(ndisp);
                var eTypes = new _Array(ndisp);
                var i, suffix, oldm, newm;

                for (i = 0; i < ndisp; i++) {
                    cs[i] = classes[types[i]];
                    //opts.debug && console.log("cs[" + i + "]=classes[", types[i], "]");
                    eTypes[i] = cs[i].ename;
                }
                opts.debug && console.log("do_def", fnName, eTypes);

                oldm = new Array(ndisp);
                for (i = ndisp-1, suffix = ""; ; i--) {
                    oldm[i] = cs[i].ctor.prototype[
                        prefix + sep + fnName + suffix];
                    //opts.debug && console.log("oldm[" + i + "]" + oldm[i]);
                    if (i === 0)
                        break;
                    suffix = eTypes[i] + suffix;
                }

                newm = new _Array(ndisp);
                newm[0] = fn;
                for (i=1; i<ndisp; i++)
                    newm[i] = get_func(i, eTypes);

                function doit(i, method) {
                    var key;
                    var proto = cs[i].ctor.prototype;

                    if (proto[method] && proto[method] !== oldm[i]) {
                        opts.debug && console.log("Skipping " + i + " " + types[i] + '["' + method + '"] ' + short_fn(proto[method]) + "!=" + short_fn(oldm[i]));
                        return;  // already more specialized in an argument.
                    }
                    //console.log("doit("+i+","+method+")  "+cs[i].ename);
                    if (proto === Object.prototype) // sanity check.
                        throw Error("BUG: code would modify Object.prototype.");

                    if (proto[method] !== newm[i]) {
                        key = types[i] + sep + method;
                        if ((key in inherited) && newm[i] === inherited[key]) {
                            opts.debug && console.log(eTypes[i] + '["'+method+'"] ' + short_fn(proto[method]) + " -> DELETED");
                            delete(proto[method]);
                        }
                        else {
                            opts.debug && console.log(eTypes[i] + '["'+method+'"] ' + short_fn(proto[method]) + " -> " + short_fn(newm[i]));
                            if (!_hasOwnProperty(proto, method)) {
                                inherited[key] = proto[method];
                            }
                            proto[method] = newm[i];
                        }
                    }
                    if (i === 0)
                        return;
                    function doit2(k) {
                        doit(i - 1, method + sep + k);
                        _forEach(classes[k].sub, doit2);
                    }
                    doit2(types[i]);
                }

                doit(ndisp-1, prefix + sep + fnName);
            }
            ret.def = def;
            return ret;
        }
        // lookup: TO DO
    };
    if (opts.debug)
        ret.classes = classes;
    return ret;
}
var ret = makeContext(Object.create(null));
ret.makeContext = makeContext;
return ret;
})();

//if (typeof exports !== "undefined") {
//    exports.DispatchJs = DispatchJs;
//    exports.makeContext = DispatchJs.makeContext;
//    exports.defClass = DispatchJs.defClass;
//    exports.defGeneric = DispatchJs.defGeneric;
//}


/*
    Constructor: PluginContainer(plugins)
    A PluginContainer is just a set of properties, referred to as
    "plugins", with an interface to change them and subscribe to
    notification of such changes.

    If *plugins* is passed, it is stored as if via <extend> as the
    initial set of plugins.
*/
function PluginContainer(init) {
    "use strict";

    // XXX use of globals via Array and Function methods, Object,
    // Error, and undefined: should virtualize.

    if (!(this instanceof PluginContainer))
        throw Error("Usage: new PluginContainer()");

    var t = this, listeners = [], plugins = Object.create(null);

    function mergeChanges(from, to, changed) {
        var ret = false;
        for (var i in from) {
            if (to[i] !== undefined && to[i] !== from[i])
                throw Error("Conflicting changes to " + i);
            if (changed)
                changed[i] = from[i];
            to[i] = from[i];
            ret = true;
        }
        return ret;
    }

    /*
    Property: onChange
    Event used to publish changes to plugins.

    > plugins.onChange.subscribe(listener);

    After <extend> changes one or more plugin values, it calls
    *listener* with two arguments: the <PluginContainer> and an object
    whose properties are the changed plugins.

    No call results from passing <extend> an empty object or one whose
    values all equal the current corresponding plugins.

    > plugins.onChange.unsubscribe(listener);

    Reverses the effect of an earlier *subscribe* call.
    */
    var onChange = {

        fire: function(changes) {
            function notify(listener) {
                listener.call(listener, t, changes);
            }
            listeners.forEach(notify);
        },

        subscribe: function(listener) {
            listeners.push(listener);
        },
        unsubscribe: function(listener) {
            function isNotIt(l) { return l !== listener; }
            listeners = listeners.filter(isNotIt);
        }
    };
    t.onChange = onChange;

    /*
    Method: extend(newPlugins)
    Adds or replaces plugins in the container.

    *newPlugins* must be an object.  All of its properties
    (technically, its own, enumerable properties) are stored as new or
    replacement plugins.  If this results in any actual changes, all
    of the container's <onChange> listeners are notified.

    Method: extend(name1, plugin1, name2, plugin2, ...)
    Like extend({ *name1* : *plugin1*, *name2* : *plugin2*, ... })
    */
    t.extend = function() {
        var changes = Object.create(null);
        var newPlugins = arguments[0], i;

        if (typeof newPlugins !== "object") {
            if (arguments.length & 1)
                throw Error("extend: Wrong argument types");
            newPlugins = Object.create(null);
            for (i = 0; i < arguments.length; i += 2) {
                if (arguments[i] in newPlugins)
                    throw Error("extend: " + arguments[i] +
                                " given more than once");
                newPlugins[arguments[i]] = arguments[i+1];
            }
        }
        if (mergeChanges(newPlugins, plugins, changes))
            onChange.fire(changes);
    };

    /*
    Method: get(pluginName)
    Returns the plugin named *pluginName*, or *undefined* if none
    exists by that name.
    */
    t.get = function(pluginName) {
        return plugins[pluginName];
    };

    t.list = function() {
        return Object.keys(plugins);
    };

    if (init) {
        t.extend(init);
    }
}

//
// Uncomment "assert(...)" to use this:
//

function assert(x) { if (!x) throw new Error("assertion failed"); }

function getEs5Globals() {
    // Package the ECMAScript 5 Global Object properties so that
    // careful users can provide a safer-seeming copy of them.  XXX If
    // you want to use this, consider auditing PluginContainer and
    // JsDispatch, too.
    return {
        NaN                : NaN,
        Infinity           : Infinity,
        undefined          : undefined,
        eval               : eval,
        parseInt           : parseInt,
        parseFloat         : parseFloat,
        isNaN              : isNaN,
        isFinite           : isFinite,
        decodeURI          : decodeURI,
        decodeURIComponent : decodeURIComponent,
        encodeURI          : encodeURI,
        encodeURIComponent : encodeURIComponent,
        Object             : Object,
        Function           : Function,
        Array              : Array,
        String             : String,
        Boolean            : Boolean,
        Number             : Number,
        Date               : Date,
        RegExp             : RegExp,
        Error              : Error,
        EvalError          : EvalError,
        RangeError         : RangeError,
        ReferenceError     : ReferenceError,
        SyntaxError        : SyntaxError,
        TypeError          : TypeError,
        URIError           : URIError,
        Math               : Math,
        JSON               : JSON
    };
}

function implementUncurry(plugins) {
    var g = plugins.get("es5globals");
    var api = g.Object.create(null);

    /*
        uncurry(func) returns a function equivalent to

        > function(arg...) { return func.call(arg...); }

        but not relying on func or its prototype having a "call"
        property.  The point is to make library code behave the same
        after arbitrary code runs, possibly improving security and
        performance.

        http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
    */
    api.uncurry = g.Function.prototype.bind.bind(g.Function.prototype.call);
    return api;
}

/*
    Function: defineGenericFunctions(plugins)
    Creates the generic functions of number subtypes called by
    higher-level library code.

    The bulk of the internal/plugin API consists of these functions.
    Their interfaces are optimized for ease of implementation and for
    use in implementing the library.  By contrast, the Scheme library
    strives more for interface stability and convenience of use.

    For example, the public subtraction function, <fn["-"]>, accepts
    one or more arguments, converts them from native types if
    necessary, and subtracts all but the first from the first, unless
    there is only one, in which case it negates it.  The library
    converts all that into calls to <subtract>, with exactly two
    arguments, both guaranteed to be Scheme numbers, or <negate> as
    the case may be.

    Input:

    *plugins* shall be a <PluginContainer> containing *Dispatch*, a
    <JsDispatch> object.  <defineGenericFunctions> calls the
    *defGeneric* method of *Dispatch* to create each generic function.

    Functions:

    toSchemeNumber - see <implementSchemeNumber>

    numberToString - generic function(schemeNumber, radix, precision)
    Equivalent to <fn["number->string"]> but with *radix* and
    *precision* as native numbers.

    isExact - generic function(schemeNumber)
    "exact?"

    isInexact - generic function(schemeNumber)
    "inexact?"

    isComplex - generic function(schemeNumber)
    "complex?"

    isReal - generic function(schemeNumber)
    "real?"

    isRational - generic function(schemeNumber)
    "rational?"

    isInteger - generic function(schemeNumber)
    "integer?"

    isZero - generic function(schemeNumber)
    "zero?"

    toExact - generic function(schemeNumber)
    "exact"

    toInexact - generic function(schemeNumber)
    "inexact"

    negate - generic function(schemeNumber)
    Returns the argument's additive inverse, -*schemeNumber*.

    reciprocal - generic function(schemeNumber)
    Return the argument's multiplicative inverse, 1 / *schemeNumber*.

    eq - generic function(schemeNumber, schemeNumber)
    "="

    ne - generic function(schemeNumber, schemeNumber)
    Returns true if, and only if, the arguments are *not* equal in the
    sense of Scheme's "=".

    add - generic function(schemeNumber, schemeNumber)
    Returns the sum of the two arguments.

    subtract - generic function(schemeNumber1, schemeNumber2)
    Returns the difference *schemeNumber1* - *schemeNumber2*.

    multiply - generic function(schemeNumber, schemeNumber)
    Returns the product of the two arguments.

    divide - generic function(schemeNumber1, schemeNumber2)
    Returns the quotient *schemeNumber1* / *schemeNumber2*.

    square - generic function(schemeNumber)
    Returns the argument's square.

    realPart - generic function(complex)
    "real-part"

    imagPart - generic function(complex)
    "imag-part"

    expt - generic function(schemeNumber, integer)
    As in Scheme.

    expt - generic function(complex, complex)
    As in Scheme.

    exp - generic function(complex)
    As in Scheme.

    magnitude - generic function(complex)
    As in Scheme.

    angle - generic function(complex)
    As in Scheme.

    sqrt - generic function(complex)
    As in Scheme.

    log - generic function(complex)
    Single-argument *log* as in Scheme.

    asin - generic function(complex)
    As in Scheme.

    acos - generic function(complex)
    As in Scheme.

    atan - generic function(complex)
    Single-argument *atan* as in Scheme.

    sin - generic function(complex)
    As in Scheme.

    cos - generic function(complex)
    As in Scheme.

    tan - generic function(complex)
    As in Scheme.

    SN_isFinite - generic function(real)
    "finite?"

    SN_isInfinite - generic function(real)
    "infinite?"

    SN_isNaN - generic function(real)
    "nan?"

    isUnit - generic function(real)
    Returns true if its argument equals 1 or -1.

    abs - generic function(real)
    As in Scheme.

    isPositive - generic function(real)
    "positive?"

    isNegative - generic function(real)
    "negative?"

    sign - generic function(real)
    Returns native -1 if *real* is negative, 0 if zero, or 1 if positive.

    floor - generic function(real)
    As in Scheme.

    ceiling - generic function(real)
    As in Scheme.

    truncate - generic function(real)
    As in Scheme.

    round - generic function(real)
    As in Scheme.

    compare - generic function(real1, real2)
    Returns the <sign> of the difference <real1 - real2>.

    gt - generic function(real, real)
    ">"

    lt - generic function(real, real)
    "<"

    ge - generic function(real, real)
    ">="

    le - generic function(real, real)
    "<="

    divAndMod - generic function(real, real)
    "div-and-mod"

    div - generic function(real, real)
    As in Scheme.

    mod - generic function(real, real)
    As in Scheme.

    atan2 - generic function(real, real)
    Equivalent to *atan* with two arguments in Scheme.

    numerator - generic function(rational)
    As in Scheme.

    denominator - generic function(rational)
    As in Scheme.

    isEven - generic function(exactInteger)
    "even?"

    isOdd - generic function(exactInteger)
    "odd?"

    exp10 - generic function(significand, exponent)
    Both arguments are exact integers.  Returns an exact integer equal
    to the *significand* times ten to the *exponent*.

    gcdNonnegative - generic function(exactInteger, exactInteger)
    Both arguments are non-negative, exact integers.  <gcdNonnegative>
    returns their greatest common divisor (GCD).

    divideReduced - generic function(numerator, denominator)
    Both arguments are exact, relatively prime integers, and
    *denominator* is greater than zero.  <divideReduced> returns an
    exact rational equal to *numerator* divided by *denominator*.
*/

function defineGenericFunctions(plugins) {
    "use strict";
    var g = plugins.get("es5globals");
    var disp = plugins.get("Dispatch");
    var api = g.Object.create(null);

    function def(name, ndisp, nargs) {
        api[name] = disp.defGeneric(name, ndisp, nargs);
    }

    def("toSchemeNumber", 1);
    def("numberToString", 1, 3);  // 2nd and 3rd args native
    def("isExact", 1);
    def("isInexact", 1);

    def("isComplex", 1);
    def("isReal", 1);
    def("isRational", 1);
    def("isInteger", 1);
    def("isZero", 1);

    def("toExact", 1);
    def("toInexact", 1);
    def("negate", 1);
    def("reciprocal", 1);

    def("eq", 2);
    def("ne", 2);

    def("add", 2);
    def("subtract", 2);
    def("multiply", 2);
    def("divide", 2);

    def("square", 1);

    def("realPart", 1);
    def("imagPart", 1);
    def("magnitude", 1);
    def("angle", 1);
    def("conjugate", 1);

    def("expt", 2);

    def("exp", 1);
    def("sqrt", 1);

    def("log", 1);
    def("asin", 1);
    def("acos", 1);
    def("atan", 1);

    def("sin", 1);
    def("cos", 1);
    def("tan", 1);

    def("SN_isFinite", 1);
    def("SN_isInfinite", 1);
    def("SN_isNaN", 1);

    def("isUnit", 1);
    def("abs", 1);
    def("isPositive", 1);
    def("isNegative", 1);
    def("sign", 1);
    def("floor", 1);
    def("ceiling", 1);
    def("truncate", 1);
    def("round", 1);

    def("compare", 2);
    def("gt", 2);
    def("lt", 2);
    def("ge", 2);
    def("le", 2);
    def("divAndMod", 2);
    def("div", 2);
    def("mod", 2);
    def("atan2", 2);

    def("numerator", 1);
    def("denominator", 1);
    def("numeratorAndDenominator", 1);

    def("isEven", 1);
    def("isOdd", 1);
    def("exactIntegerSqrt", 1);
    def("exp10", 1, 2);      // 2nd arg exact integer
    def("gcdNonnegative", 2);
    def("divideReduced", 2);

    def("bitwiseNot", 1);
    def("bitwiseAnd", 2);
    def("bitwiseIor", 2);
    def("bitwiseXor", 2);
    def("bitCount", 1);
    def("bitLength", 1);
    def("firstBitSet", 1);
    def("isBitSet", 1, 2);  // 2nd arg convertible to index
    def("copyBit", 1, 3);   // 2nd arg convertible to index; 3rd arg boolean
    def("bitField", 1, 3);
    def("copyBitField", 2, 4);
    def("bitShift", 1, 2);
    def("rotateBitField", 1, 4);
    def("reverseBitField", 1, 3);

    return api;
}

function defineSchemeNumberType(plugins) {
    "use strict";
    var g = plugins.get("es5globals");
    var _NaN = g.NaN;
    var api = g.Object.create(null);
    var numberToString = plugins.get("numberToString");
    var disp = plugins.get("Dispatch");

    function SchemeNumberType(){}

    // Inherit from Number so that "x instanceof Number" holds.
    // But then override the standard methods, which are compatible
    // only with native Number objects.

    SchemeNumberType.prototype = new Number();

    // Good defaults.
    function genericToString(radix) {
        if (numberToString)
            return numberToString(this, radix);
        return "[object SchemeNumber]";
    }
    function genericToLocaleString() {
        return genericToString();
    }
    function retNaN() {
        return _NaN;
    }

    // Bad default.
    function genericFormatter() {
        if (numberToString)
            return numberToString(this);
        return "SchemeNumber";
    }

    SchemeNumberType.prototype.toFixed        = genericFormatter;
    SchemeNumberType.prototype.toExponential  = genericFormatter;
    SchemeNumberType.prototype.toPrecision    = genericFormatter;
    SchemeNumberType.prototype.toString       = genericToString;
    SchemeNumberType.prototype.toLocaleString = genericToLocaleString;
    SchemeNumberType.prototype.valueOf        = retNaN;

    disp.defClass("SchemeNumber", { ctor: SchemeNumberType });

    api.SchemeNumberType         = SchemeNumberType;
    return api;
}

/*
    Function: defineDebugFunction(plugins)
    Creates a generic function, *debug*, for inspecting number objects.

    Input:

    *plugins* shall be a <PluginContainer> containing the following
    element.

    Dispatch - a <JsDispatch> object.
    <defineDebugFunction> calls the *Dispatch* object's *defGeneric*
    method to create the *debug* function, and calls the resulting
    function's *def* method with class name "SchemeNumber" to define a
    generic implementation of *debug*.

    Output:

    debug - generic function(schemeNumber) -> string
    Applications must not rely on the returned string's format.
    Number implementations should specialize this function to provide
    internal details of use during development.  Developers may obtain
    this function via *SchemeNumber.plugins.get("debug")*.  Example:

    > SchemeNumber.plugins.get("debug")(SchemeNumber(10))  // "EINative(10)"

    See Also: <JsDispatch>
*/
function defineDebugFunction(plugins) {
    "use strict";
    var g                = plugins.get("es5globals");
    var uncurry          = plugins.get("uncurry");
    var disp             = plugins.get("Dispatch");
    var SchemeNumberType = plugins.get("SchemeNumberType");
    var Object_toString  = uncurry(g.Object.prototype.toString);
    var api = g.Object.create(null);

    // Generic default for classes that don't specialize debug.
    function SchemeNumber_debug() {
        var t;
        try { t = this.toString(); }
        catch (e) {
            try { t = Object_toString(this); }
            catch (e) { t = "?"; }
        }
        return "SchemeNumber(" + t + ")";
    }

    api.debug = disp.defGeneric("debug", 1);
    api.debug.def(SchemeNumberType, SchemeNumber_debug);

    return api;
}


/*
    Function: implementCoreLibrary(plugins)
    Creates the plugins required by Scheme functions and a few others.

    Input:

    *plugins* shall be a <PluginContainer> containing the items listed
    below.  All may be added after the call to <implementCoreLibrary>
    but before any use of its results.  When changes to plugins
    produce changes in non-function results (such as *ZERO* and
    *ONE*), the library broadcasts the changes via the
    <PluginContainer.onChange> event.

    SchemeNumber - function(any)
    The <SchemeNumber> object as returned by
    <implementSchemeNumber(plugins)>.

    nativeToExactInteger - function(integer)
    *integer* is a native ECMAScript number of integer value.
    <nativeToExactInteger> returns an exact Scheme number whose value
    equals *integer*.

    nativeToInexact - function(number)
    *number* is a native ECMAScript number, possibly infinite or
    *NaN*.  <nativeToInexact> returns an inexact Scheme number
    approximating its argument.

    parseExactInteger - function(sign, string, radix)
    *sign* is the native number 1 or -1.  *radix* is the native number
    2, 8, 10, or 16.  <parseExactInteger> must be a function returning
    a Scheme number equal to *sign* times the result of parsing
    *string* as a positive, unprefixed, exact integer in the given
    radix.

    parseInexact - function(sign, string)
    *sign* is the native number 1 or -1.  <parseExact> must be a
    function returning a Scheme number equal to *sign* times the
    result of parsing *string* as a positive, unprefixed, decimal,
    inexact, real number.

    exactRectangular - function(x, y)
    *x* and *y* are exact reals, *y* non-zero.  <exactRectangular>
    returns an exact complex equal to *x* + (i * *y*).

    inexactRectangular - function(x, y)
    *x* and *y* are inexact reals.  <inexactRectangular> returns an
    inexact complex equal to *x* + (i * *y*).

    exactPolar - function(r, theta)
    *r* and *theta* are exact reals.  <exactPolar> returns an exact
    complex equal to *r* * exp(i * *theta*).

    inexactPolar - function(r, theta)
    *r* and *theta* are inexact reals.  <inexactPolar> returns an
    inexact complex equal to *r* * exp(i * *theta*).

    Output:

    <implementCoreLibrary> returns an object with the following
    properties.

    ZERO - the exact integer *0*.

    ONE - the exact integer *1*.

    TWO - the exact integer *2*.

    MINUS_ONE - the exact integer *-1*.

    INEXACT_ZERO - the inexact integer *0.0*.

    INEXACT_ONE - the inexact integer *1.0*.

    PI - the inexact real number pi.

    INFINITY - the inexact real number *+inf.0*.

    MINUS_INFINITY - the inexact real number *-inf.0*.

    NAN - the inexact real number *+nan.0*.

    I - the exact complex unit *i*.

    MINUS_I - the exact complex unit *-i*.

    raise - function(conditionType, message, irritant...)
    This *raise* simply calls the user-overridable
    <SchemeNumber.raise> but enforces the contract not to return.

    defaultRaise - function(conditionType, message, irritant...)
    Throws an Error describing the arguments.

    raiseDivisionByExactZero - function()
    Raises an exception as specified by Scheme to report division by
    exact zero.

    isNumber - function(x)
    Returns true if *x* is a Scheme number.

    assertReal - function(x)
    Returns *x* if *x* is a real Scheme number, otherwise raises an
    exception as specified by Scheme for invalid argument type.

    toReal - function(x)
    Converts *x* to a Scheme number and behaves as if by returning
    *assertReal(x)*.

    assertInteger - function(x)
    Returns *x* if *x* is a Scheme integer, otherwise raises an
    exception as specified by Scheme for invalid argument type.

    toInteger - function(x)
    Converts *x* to a Scheme number and behaves as if by returning
    *assertInteger(x)*.

    assertExact - function(x)
    Returns *x* if *x* is an exact Scheme number, otherwise raises an
    exception as specified by Scheme for invalid argument type.

    stringToNumber - function(string, radix, exact)
    <stringToNumber> returns the Scheme number whose external
    representation is *string* with added prefixes corresponding to
    either or both of *radix* and *exact*, if defined.

    *s* should be the external representation of a Scheme number, such
    as "2/3" or "#e1.1@-2d19".  If *s* does not represent a Scheme
    number, <stringToNumber> returns *false*.

    If *radix* is given, it must be either 2, 8, 10, or 16, and *s*
    must not contain a radix prefix.  The function behaves as if *s*
    did contain the prefix corresponding to *radix*.

    If *exact* is given, it must have type "boolean", and *s* must not
    contain an exactness prefix.  The function behaves as if *s*
    contained the corresponding prefix ("#e" if *exact* is true, "#i"
    if false).

    truncateToPrecision -

    XXX documentation incomplete.
*/
function implementCoreLibrary(plugins) {
    "use strict";

    // Abstract types, generic functions, and the SchemeNumber object.
    // XXX Could remove unused items.
    var SchemeNumber, toSchemeNumber, SchemeNumberType, Complex, Real,
        InexactReal, ExactReal, ExactRational, ExactInteger,
        numberToString, isExact, isInexact, isComplex, isReal,
        isRational, isInteger, isZero, toExact, toInexact, negate,
        reciprocal, eq, ne, add, subtract, multiply, divide, square,
        realPart, imagPart, expt, expt, exp, magnitude, angle, sqrt,
        log, asin, acos, atan, sin, cos, tan, SN_isFinite,
        SN_isInfinite, SN_isNaN, isUnit, abs, isPositive, isNegative,
        sign, floor, ceiling, truncate, round, compare, gt, lt, ge,
        le, divAndMod, div, mod, atan2, numerator, denominator,
        numeratorAndDenominator,
        isEven, isOdd, exp10, gcdNonnegative, divideReduced;

    SchemeNumber             = plugins.get("SchemeNumber");

    SchemeNumberType         = plugins.get("SchemeNumberType");
    Complex                  = plugins.get("Complex");
    Real                     = plugins.get("Real");
    InexactReal              = plugins.get("InexactReal");
    ExactReal                = plugins.get("ExactReal");
    ExactRational            = plugins.get("ExactRational");
    ExactInteger             = plugins.get("ExactInteger");

    toSchemeNumber           = plugins.get("toSchemeNumber");
    numberToString           = plugins.get("numberToString");
    isExact                  = plugins.get("isExact");
    isInexact                = plugins.get("isInexact");
    isComplex                = plugins.get("isComplex");
    isReal                   = plugins.get("isReal");
    isRational               = plugins.get("isRational");
    isInteger                = plugins.get("isInteger");
    isZero                   = plugins.get("isZero");
    toExact                  = plugins.get("toExact");
    toInexact                = plugins.get("toInexact");
    negate                   = plugins.get("negate");
    reciprocal               = plugins.get("reciprocal");
    eq                       = plugins.get("eq");
    ne                       = plugins.get("ne");
    add                      = plugins.get("add");
    subtract                 = plugins.get("subtract");
    multiply                 = plugins.get("multiply");
    divide                   = plugins.get("divide");
    square                   = plugins.get("square");
    realPart                 = plugins.get("realPart");
    imagPart                 = plugins.get("imagPart");
    expt                     = plugins.get("expt");
    expt                     = plugins.get("expt");
    exp                      = plugins.get("exp");
    magnitude                = plugins.get("magnitude");
    angle                    = plugins.get("angle");
    sqrt                     = plugins.get("sqrt");
    log                      = plugins.get("log");
    asin                     = plugins.get("asin");
    acos                     = plugins.get("acos");
    atan                     = plugins.get("atan");
    sin                      = plugins.get("sin");
    cos                      = plugins.get("cos");
    tan                      = plugins.get("tan");
    SN_isFinite              = plugins.get("SN_isFinite");
    SN_isInfinite            = plugins.get("SN_isInfinite");
    SN_isNaN                 = plugins.get("SN_isNaN");
    isUnit                   = plugins.get("isUnit");
    abs                      = plugins.get("abs");
    isPositive               = plugins.get("isPositive");
    isNegative               = plugins.get("isNegative");
    sign                     = plugins.get("sign");
    floor                    = plugins.get("floor");
    ceiling                  = plugins.get("ceiling");
    truncate                 = plugins.get("truncate");
    round                    = plugins.get("round");
    compare                  = plugins.get("compare");
    gt                       = plugins.get("gt");
    lt                       = plugins.get("lt");
    ge                       = plugins.get("ge");
    le                       = plugins.get("le");
    divAndMod                = plugins.get("divAndMod");
    div                      = plugins.get("div");
    mod                      = plugins.get("mod");
    atan2                    = plugins.get("atan2");
    numerator                = plugins.get("numerator");
    denominator              = plugins.get("denominator");
    numeratorAndDenominator  = plugins.get("numeratorAndDenominator");
    isEven                   = plugins.get("isEven");
    isOdd                    = plugins.get("isOdd");
    exp10                    = plugins.get("exp10");
    gcdNonnegative           = plugins.get("gcdNonnegative");
    divideReduced            = plugins.get("divideReduced");

    // Functions to be provided by number implementations.
    var nativeToInexact, parseInexact;
    var parseExactInteger, nativeToExactInteger;
    var divideReducedNotByOne;
    var exactRectangular, inexactRectangular, exactPolar, inexactPolar;

    // Constants to be defined here once we have the necessaries.
    var ZERO, ONE, TWO, MINUS_ONE, I, MINUS_I;
    var INEXACT_ZERO, INEXACT_ONE, PI, INFINITY, MINUS_INFINITY, NAN;

    // Imports from ECMAScript.
    var g                = plugins.get("es5globals");
    var uncurry          = plugins.get("uncurry");
    var Array_slice      = uncurry(g.Array.prototype.slice);
    var Array_join       = uncurry(g.Array.prototype.join);
    var Number_toString  = uncurry(g.Number.prototype.toString);
    var String_indexOf   = uncurry(g.String.prototype.indexOf);
    var String_substring = uncurry(g.String.prototype.substring);
    var String_replace   = uncurry(g.String.prototype.replace);
    var RegExp_test      = uncurry(g.RegExp.prototype.test);

    var Math_LN10    = g.Math.LN10;
    var Math_LN2     = g.Math.LN2;
    var Math_PI      = g.Math.PI;
    var Math_abs     = g.Math.abs;
    var Math_floor   = g.Math.floor;
    var Math_pow     = g.Math.pow;
    var _LN2         = g.Math.LN2;
    var _LN10        = g.Math.LN10;
    var _PI          = g.Math.PI;
    var _undefined   = g.undefined;
    var _Infinity    = g.Infinity;
    var _NaN         = g.NaN;
    var _parseInt    = g.parseInt;
    var _isNaN       = g.isNaN;
    var _isFinite    = g.isFinite;

    var api = g.Object.create(null);

    function onPluginsChanged(plugins, changed) {
        nativeToExactInteger     = plugins.get("nativeToExactInteger");
        parseExactInteger        = plugins.get("parseExactInteger");
        nativeToInexact          = plugins.get("nativeToInexact");
        parseInexact             = plugins.get("parseInexact");
        divideReducedNotByOne    = plugins.get("divideReducedNotByOne");
        exactRectangular         = plugins.get("exactRectangular");
        inexactRectangular       = plugins.get("inexactRectangular");
        exactPolar               = plugins.get("exactPolar");
        inexactPolar             = plugins.get("inexactPolar");

        function getComplexConstant(x, y) {
            try {
                return exactRectangular(nativeToExactInteger(x),
                                        nativeToExactInteger(y));
            }
            catch (e) {
                return _undefined;
            }
        }

        var exts = g.Object.create(null);
        if (changed.nativeToExactInteger || changed.exactRectangular) {
            I       = exts.I       = getComplexConstant(0, 1);
            MINUS_I = exts.MINUS_I = getComplexConstant(0, -1);
        }
        if (changed.nativeToExactInteger) {
            ZERO      = exts.ZERO      = nativeToExactInteger(0);
            ONE       = exts.ONE       = nativeToExactInteger(1);
            TWO       = exts.TWO       = nativeToExactInteger(2);
            MINUS_ONE = exts.MINUS_ONE = nativeToExactInteger(-1);
        }
        if (changed.nativeToInexact) {
            INEXACT_ZERO   = exts.INEXACT_ZERO   = nativeToInexact(0);
            INEXACT_ONE    = exts.INEXACT_ONE    = nativeToInexact(1);
            PI             = exts.PI             = nativeToInexact(Math_PI);
            INFINITY       = exts.INFINITY       = nativeToInexact(_Infinity);
            MINUS_INFINITY = exts.MINUS_INFINITY = nativeToInexact(-_Infinity);
            NAN            = exts.NAN            = nativeToInexact(_NaN);
        }
        // XXX should not recurse into extend().  Should return exts
        // here and make extend() loop.
        plugins.extend(exts);
    }
    plugins.onChange.subscribe(onPluginsChanged);
    onPluginsChanged(plugins, {});

    function retFalse()   { return false; }
    function retTrue()    { return true;  }
    function retThis()    { return this; }
    function retZero()    { return ZERO; }
    function retOne()     { return ONE; }
    function retFirst(a)  { return a; }

    function makeRectangular(x, y) {
        if (isInexact(x))
            return inexactRectangular(x, toInexact(y));
        if (isInexact(y))
            return inexactRectangular(toInexact(x), y);
        return exactRectangular(x, y);
    }

    function makePolar(x, y) {
        if (isInexact(x))
            return inexactPolar(x, toInexact(y));
        if (isInexact(y))
            return inexactPolar(toInexact(x), y);
        return exactPolar(x, y);
    }

    function defaultRaise(conditionType, message, irritant) {
        var i, arg, msg = "SchemeNumber: " + conditionType + ": " + message;
        if (arguments.length > 2) {
            msg += ": ";
            i = 2;
            while (true) {
                arg = arguments[i];
                try { msg += numberToString(arg); }
                catch (e) {
                    try { msg += arg; }
                    catch (e) { msg += "?"; }
                }
                i++;
                if (i === arguments.length)
                    break;
                msg += ", ";
            }
        }
        throw new g.Error(msg);
    }

    /*
        raise - function(conditionType, message, irritants...)
        Forwards its arguments to <SchemeNumber.raise> and handles
        errors in that function, namely returning when it shouldn't.
    */
    function raise() {
        var args = Array_slice(arguments);

        // Call the exception hook.
        SchemeNumber.raise.apply(SchemeNumber, args);

        // Oops, it returned.  Fall back to our known good raiser.
        defaultRaise.apply(this, args);
    }

    function raiseDivisionByExactZero() {
        raise("&assertion", "division by exact zero");
    }

    //
    // For (rnrs base (6)) i.e. SchemeNumber.fn.  Could perhaps move
    // to a library and get via onPluginsChanged.
    //

    // Compute a real that had a |p attached.
    // See the second half of R6RS Section 4.2.8 and also
    // http://www.mail-archive.com/r6rs-discuss@lists.r6rs.org/msg01676.html.

    // This could be greatly optimized for native numbers using
    // numberToBinary, but I have no use case, so I went with a slow,
    // (hopefully) correct version.
    function truncateToPrecision(x, precision, exact) {

        if (x === false || !isReal(x))
            lose();

        if (!isZero(x)) {
            var xabs = abs(x);

            var shift = precision - Math_floor(log(xabs) / Math_LN2) - 1;
            var scale = expt(TWO, nativeToExactInteger(Math_abs(shift)));
            if (shift < 0)
                scale = reciprocal(scale);
            var shifted = multiply(xabs, scale);

            // Correct for log() imprecision.
            var denom = expt(TWO, nativeToExactInteger(precision));
            while (ge(shifted, denom)) {
                shifted = divide(shifted, TWO);
                scale = divide(scale, TWO);
            }
            for (var twiceShifted = add(shifted, shifted);
                 lt(twiceShifted, denom);
                 twiceShifted = add(shifted, shifted)) {
                shifted = twiceShifted;
                scale = add(scale, scale);
            }

            // 0.5 <= shifted/denom < 1.
            var rounded = divide(round(shifted), scale);
            if (isNegative(x))
                rounded = negate(rounded);
            x = rounded;
        }

        // Then make it inexact unless there is #e.
        if (!exact)
            x = toInexact(x);

        return x;
    }

    function assertReal(x) {
        if (!isReal(x))
            raise("&assertion", "not a real number", x);
        return x;
    }

    function toReal(x) {
        x = SchemeNumber(x);
        isReal(x) || assertReal(x);
        return x;
    }

    function assertRational(q) {
        if (!isRational(q))
            raise("&assertion", "not a rational number", q);
        return q;
    }

    function toRational(q) {
        q = SchemeNumber(q);
        isRational(q) || assertRational(q);
        return q;
    }

    function assertInteger(n) {
        n = SchemeNumber(n);
        if (!isInteger(n))
            raise("&assertion", "not an integer", n);
        return n;
    }

    function toInteger(n) {
        n = SchemeNumber(n);
        isInteger(n) || assertInteger(n);
        return n;
    }

    function assertExact(z) {
        if (isInexact(z))
            raise("&assertion", "inexact number", z);
        return z;
    }

    function isNumber(x) {
        return x instanceof SchemeNumberType;
    }

    //
    // For (rnrs base (6)) i.e. SchemeNumber.fn.
    // Specifically, fn["string->number"] and SchemeNumber("...")
    //

    // How to split a rectangular literal into real and imaginary components:
    var decimalComplex = /^(.*[^a-zA-Z]|)([-+].*)i$/;
    var radixComplex = /^(.*)([-+].*)i$/;

    var nanInfPattern = /^[-+](nan|inf)\.0$/;
    var exponentMarkerPattern = /[eEsSfFdDlL]/;
    var decimal10Pattern =
        /^([0-9]+\.?|[0-9]*\.[0-9]+)([eEsSfFdDlL][-+]?[0-9]+)?$/;

    var uintegerPattern = {
        2: /^[01]+$/, 8: /^[0-7]+$/, 10: /^[0-9]+$/, 16: /^[0-9a-fA-F]+$/
    };

    var PARSE_ERROR = new g.Object();

    function stringToNumber(s, radix, exact) {
        function lose() {
            throw PARSE_ERROR;
        }
        function check(z) {
            return z === false ? lose() : z;
        }
        function setExact(value) {
            if (exact !== _undefined) lose();
            exact = value;
        }
        function setRadix(value) {
            if (radix) lose();
            radix = value;
        }
        function parseUinteger(s, sign) {
            if (!RegExp_test(uintegerPattern[radix], s))
                lose();

            if (exact === false) {
                if (radix === 10)
                    return parseInexact(sign, s);
                return toInexact(parseExactInteger(sign, s, radix));
            }
            return parseExactInteger(sign, s, radix);
        }
        function parseReal(s) {
            if (RegExp_test(nanInfPattern, s)) {
                if (exact)
                    lose();
                switch (s) {
                case "+inf.0": return INFINITY;
                case "-inf.0": return MINUS_INFINITY;
                default: return NAN;
                }
            }

            var sign = 1;
            switch (s[0]) {
            case '-': sign = -1;  // fall through
            case '+': s = String_substring(s, 1);
            }

            var slash = String_indexOf(s, '/');
            if (slash != -1)
                return divide(
                    parseUinteger(String_substring(s, 0, slash), sign),
                    parseUinteger(String_substring(s, slash + 1), 1));

            if (radix !== 10)
                return parseUinteger(s, sign);

            var pipe = String_indexOf(s, '|');
            if (pipe !== -1) {

                // WHOA!!!  Explicit mantissa width!  Somebody really
                // cares about correctness.  However, I haven't got all
                // day, so execution speed loses.

                var afterPipe = String_substring(s, pipe + 1);
                if (!RegExp_test(uintegerPattern[10], afterPipe))
                    lose();

                s = String_substring(s, 0, pipe);
                var precision = _parseInt(afterPipe, 10);

                if (precision === 0)
                    s = "0.0";
                else if (precision < 53)
                    return check(
                        truncateToPrecision(stringToNumber(s, radix, true),
                                            precision, exact));
            }

            // We have only one floating point width.
            s = String_replace(s, exponentMarkerPattern, 'e');

            var dot = String_indexOf(s, '.');
            var e = String_indexOf(s, 'e');
            if (dot === -1 && e === -1)
                return parseUinteger(s, sign);

            if (!RegExp_test(decimal10Pattern, s))
                lose();

            if (!exact)
                return parseInexact(sign, s);

            var integer = String_substring(s, 0, dot === -1 ? e : dot);
            var exponent = ZERO;
            var fraction;

            if (e === -1)
                fraction = String_substring(s, dot + 1);
            else {
                if (dot === -1)
                    fraction = "";
                else
                    fraction = String_substring(s, dot + 1, e);
                exponent = parseReal(String_substring(s, e + 1));
            }

            return exp10(parseExactInteger(sign, integer + fraction),
                         subtract(exponent,
                                  nativeToExactInteger(fraction.length)));
        }
        function parseComplex(s) {
            var a = String_indexOf(s, '@');
            if (a !== -1) {
                var ret = makePolar(parseReal(String_substring(s, 0, a)),
                                    parseReal(String_substring(s, a + 1)));
                if (exact && isInexact(ret))
                    // XXX I don't think this is right.  If Scheme
                    // allows this, then by analogy, nothing requires
                    // (numerator #e0.1) to equal 1.
                    //ret = toExact(ret);
                    ret = ret;  // ignore #e.
                return ret;
            }

            if (s[s.length - 1] !== "i")
                return parseReal(s);

            if (s === "i") {
                if (exact === false)
                    return inexactRectangular(INEXACT_ZERO, INEXACT_ONE);
                return I;
            }
            if (s === "-i") {
                if (exact === false)
                    return inexactRectangular(INEXACT_ZERO,
                                              negate(INEXACT_ONE));
                return MINUS_I;
            }

            var match = (radix === 10 ? decimalComplex : radixComplex).exec(s);
            var x, y;
            if (match) {
                x = match[1];
                y = match[2];
                x = (x ? parseReal(x)
                       : (exact === false ? INEXACT_ZERO : ZERO));
                y = (y === "+" ? ONE
                               : (y === "-" ? MINUS_ONE : parseReal(y)));
            }
            else {
                // Could be, for example, "3i".
                x = (exact === false ? INEXACT_ZERO : ZERO);
                y = parseReal(String_substring(s, 0, s.length - 1));
            }

            return makeRectangular(x, y);
        }

        // Common cases first.
        if (!radix || radix === 10) {
            if (RegExp_test(/^-?[0-9]{1,15}$/, s)) {
                if (exact === false)
                    return nativeToInexact(_parseInt(s, 10));
                return nativeToExactInteger(_parseInt(s, 10));
            }
        }

        var i = 0;

        try {
            while (s[i] === "#") {
                switch (s[i+1]) {
                case 'i': case 'I': setExact(false); break;
                case 'e': case 'E': setExact(true ); break;
                case 'b': case 'B': setRadix( 2); break;
                case 'o': case 'O': setRadix( 8); break;
                case 'd': case 'D': setRadix(10); break;
                case 'x': case 'X': setRadix(16); break;
                default: return false;
                }
                i += 2;
            }
            radix = radix || 10;
            return parseComplex(String_substring(s, i));
        }
        catch (e) {
            if (e === PARSE_ERROR)
                return false;
            if (s == _undefined)
                raise("&assertion", "missing argument");
            throw e;
        }
    }

    //
    // End library function definitions.
    //

    api.I                        = I;
    api.ZERO                     = ZERO;
    api.ONE                      = ONE;
    api.TWO                      = TWO;
    api.MINUS_ONE                = MINUS_ONE;
    api.INEXACT_ZERO             = INEXACT_ZERO;
    api.INEXACT_ONE              = INEXACT_ONE;
    api.PI                       = PI;
    api.INFINITY                 = INFINITY;
    api.MINUS_INFINITY           = MINUS_INFINITY;
    api.NAN                      = NAN;

    api.raise                    = raise;
    api.defaultRaise             = defaultRaise;
    api.raiseDivisionByExactZero = raiseDivisionByExactZero;
    api.stringToNumber           = stringToNumber;
    api.isNumber                 = isNumber;
    api.assertReal               = assertReal;
    api.toReal                   = toReal;
    api.assertRational           = assertRational;
    api.toRational               = toRational;
    api.assertInteger            = assertInteger;
    api.toInteger                = toInteger;
    api.assertExact              = assertExact;

    api.makeRectangular          = makeRectangular;
    api.makePolar                = makePolar;

    api.truncateToPrecision      = truncateToPrecision;

    api.retFalse                 = retFalse;
    api.retTrue                  = retTrue;
    api.retThis                  = retThis;
    api.retZero                  = retZero;
    api.retOne                   = retOne;
    api.retFirst                 = retFirst;

    return api;
}


/*
    Function: implementRnrsBase(plugins)
    Creates and returns the <SchemeNumber.fn> function collection.

    Input:

    *plugins* shall be a <PluginContainer> containing the public
    <SchemeNumber> object under the name *SchemeNumber*, as well as
    the output of <defineGenericFunctions> and <implementCoreLibrary>.
    The required plugins may be added between the call to
    <implementRnrsBase> and the first use of its results.

    About: Function list

    All <Scheme functions> are specified by <R6RS at
    http://www.r6rs.org/>.  In the list below, argument names indicate
    applicable types as follows:

    obj - any value
    z - any Scheme number
    x - a real number
    y - a real number
    q - a rational number (excludes infinities and NaN)
    n - an integer
    k - an exact, non-negative integer
    radix - an exact integer, either 2, 8, 10, or 16
    precision - an exact, positive integer

    Functions: Scheme functions
    Elements of <fn>.

    Refer to the argument type key under <Function list>.

    fn["number?"](obj)   - Returns true if *obj* is a Scheme number.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_440>.

    fn["complex?"](obj)  - Returns true if *obj* is a Scheme complex number.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_442>.

    fn["real?"](obj)     - Returns true if *obj* is a Scheme real number.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_444>.

    fn["rational?"](obj) - Returns true if *obj* is a Scheme rational number.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_446>.

    fn["integer?"](obj)  - Returns true if *obj* is a Scheme integer.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_448>.

    fn["real-valued?"](obj) - Returns true if *obj* is a Scheme complex number
                              and *fn["imag-part"](obj)* is zero.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_450>.

    fn["rational-valued?"](obj) - Returns true if *obj* is real-valued and
                                  *fn["real-part"](obj)* is rational.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_452>.

    fn["integer-valued?"](obj)  - Returns true if *obj* is real-valued and
                                  *fn["real-part"](obj)* is an integer.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_454>.

    fn["exact?"](z)   - Returns true if *z* is exact.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_456>.

    fn["inexact?"](z) - Returns true if *z* is inexact.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_458>.

    fn.inexact(z) - Returns an inexact number equal to *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_460>.

    fn.exact(z)   - Returns an exact number equal to *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_462>.

    fn["eqv?"](obj1, obj2) - Returns true if *obj1 === obj2* or both arguments
                             are Scheme numbers and behave identically.
                             Specified by <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_428>.

    fn["="](z, z, z...) - Returns true if all arguments are mathematically
                          equal, though perhaps differing in exactness.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_464>.

    fn["<"](x, x, x...) - Returns true if arguments increase monotonically.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_466>.

    fn[">"](x, x, x...) - Returns true if arguments decrease monotonically.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_468>.

    fn["<="](x, x, x...) - Returns true if arguments are monotonically
                           nondecreasing.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_470>.

    fn[">="](x, x, x...) - Returns true if arguments are monotonically
                           nonincreasing.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_472>.

    fn["zero?"](z)      - Returns true if *z* equals zero.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_474>.

    fn["positive?"](x)  - Returns true if *x* is positive.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_476>.

    fn["negative?"](x)  - Returns true if *x* is negative.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_478>.

    fn["odd?"](n)       - Returns true if *n* is odd.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_480>.

    fn["even?"](n)      - Returns true if *n* is even.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_482>.

    fn["finite?"](x)    - Returns true if *x* is finite.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_484>.

    fn["infinite?"](x)  - Returns true if *x* is plus or minus infinity.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_486>.

    fn["nan?"](x)       - Returns true if *x* is a NaN.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_488>.

    fn.max(x, x...)     - Returns the greatest argument.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_490>.

    fn.min(x, x...)     - Returns the least argument.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_492>.

    fn["+"](z...)       - Returns the sum of the arguments.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_494>.

    fn["*"](z...)       - Returns the product of the arguments.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_496>.

    fn["-"](z)          - Returns the negation of *z* (-*z*).
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_498>.

    fn["-"](z1, z2...)  - Returns *z1* minus the sum of the number(s) *z2*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_500>.

    fn["/"](z)          - Returns the reciprocal of *z* (1 / *z*).
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_502>.

    fn["/"](z1, z2...)  - Returns *z1* divided by the product of the number(s)
    *z2*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_504>.

    fn.abs(x)           - Returns the absolute value of *x*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_506>.

    fn["div-and-mod"](x, y) - Returns *fn.div(x, y)* and *fn.mod(x, y)*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_508>.

    fn.div(x, y)        - Returns the greatest integer less than or equal to
                          *x* / *y*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_510>.

    fn.mod(x, y)        - Returns *x* - (*y* * fn.div(*x*, *y*)).
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_512>.

    fn["div0-and-mod0"](x, y) - Returns *fn.div0(x, y)* and *fn.mod0(x, y)*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_514>.

    fn.div0(x, y)       - Returns the integer nearest *x* / *y*, ties go lower.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_516>.

    fn.mod0(x, y)       - Returns *x* - (*y* * fn.div0(*x*, *y*)).
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_518>.

    fn.gcd(n...) - Returns the arguments' greatest common non-negative divisor.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_520>.

    fn.lcm(n...) - Returns the arguments' least common positive multiple.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_522>.

    fn.numerator(q)     - Returns *q* * *fn.denominator(q)*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_524>.

    fn.denominator(q)   - Returns the smallest positive integer which when
                          multiplied by *q* yields an integer.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_526>.

    fn.floor(x)         - Returns the greatest integer not greater than *x*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_528>.

    fn.ceiling(x)       - Returns the least integer not less than *x*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_530>.

    fn.truncate(x)      - Returns the closest integer between 0 and *x*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_532>.

    fn.round(x)         - Returns the closest integer to *x*, ties go even.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_534>.

    fn.rationalize(x, y) - Returns the simplest fraction within *y* of *x*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_536>.

    fn.exp(z)           - Returns e to the *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_540>.

    fn.log(z)           - Returns the natural logarithm of *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_542>.

    fn.log(z1, z2)      - Returns the base-*z2* logarithm of *z1*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_544>.

    fn.sin(z)           - Returns the sine of *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_546>.

    fn.cos(z)           - Returns the cosine of *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_548>.

    fn.tan(z)           - Returns the tangent of *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_550>.

    fn.asin(z)          - Returns a number whose sine is *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_552>.

    fn.acos(z)          - Returns a number whose cosine is *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_554>.

    fn.atan(z)          - Returns a number whose tangent is *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_556>.

    fn.atan(y, x)       - Returns the angle that passes through *(x,y)*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_558>.

    fn.sqrt(z)          - Returns the square root of *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_560>.

    fn["exact-integer-sqrt"](k) - Returns maximal exact s and non-negative r
                                  such that s*s + r = *k*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_562>.

    fn.expt(z1, z2) - Returns *z1* to the power *z2*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_564>.

    fn["make-rectangular"](x, y) - Returns the complex number *x + iy*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_566>.

    fn["make-polar"](r, theta) - Returns the complex number with magnitude *r*
                                 and angle *theta*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_568>.

    fn["real-part"](z) - Returns x such that *z* = x + iy.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_570>.

    fn["imag-part"](z) - Returns y such that *z* = x + iy.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_572>.

    fn.magnitude(z)    - Returns the magnitude of *z*.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_574>.

    fn.angle(z)        - Returns *fn.atan(y,x)* where *z* = x + iy.
    Specified by: <R6RS at http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_576>.

    Function: fn["number->string"](z)
    Converts *z* to a string, base 10.

    For exact *z*, *number->string* retains full precision.  Exact
    fractions are expressed as numerator + "/" + denominator.
    Examples:

    > fn["number->string"](fn["string->number"]("#e1.2"))  // "6/5"
    > fn["number->string"](fn["/"]("12", "-8"))            // "-3/2"

    Infinities are "+inf.0" and "-inf.0".  NaN is "+nan.0".

    The result always yields a number equal to *z* (in the sense of
    <fn["eqv?"](obj1, obj2)>) when passed to
    <fn["string->number"](string)>.

    Specified by: <R6RS at
    http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_578>

    See Also: <fn["string->number"](string)>.

    Function: fn["number->string"](z, radix)
    Converts *z* to a string, base *radix*.
    *radix* must be exact 2, 8, 10, or 16.

    The output never contains an explicit radix prefix.

    The result always yields a value equal to *z* (in the sense of
    <fn["eqv?"](obj1, obj2)>) when converted back to a number by
    <fn["string->number"](string, radix)>.

    Specified by: <R6RS at
    http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_580>

    See Also: <fn["string->number"](string, radix)>.

    Function: fn["number->string"](z, radix, precision)
    Converts and suffixes *z* with a count of significant bits.

    Appends "|p" to each inexact real component of *z* where p is the
    smallest mantissa width not less than *precision* needed to
    represent the component exactly.

    Specified by: <R6RS at
    http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_582>

    Function: fn["string->number"](string)
    Parses *string* as a Scheme number.  Returns *false* if unable.

    Examples:

    > "1"       - exact 1.
    > "1."      - inexact 1, same as "1.0".
    > "1/2"     - exact one-half, same as "2/4" etc.
    > "0.5"     - inexact 0.5.
    > "12e3"    - inexact 12000.
    > "i"       - the imaginary unit.
    > "-2+1/2i" - exact complex number.
    > "2.@1"    - complex in polar coordinates, r=2.0, theta=1.0.
    > "+inf.0"  - positive infinity.
    > "-inf.0"  - negative infinity.
    > "+nan.0"  - IEEE NaN (not-a-number).
    > "#e0.5"   - exact one-half, forced exact by prefix #e.
    > "#i1/2"   - 0.5, inexact by prefix #i.
    > "#x22"    - exact 34; prefix #x hexadecimal.
    > "#o177"   - exact 127; prefix #o octal.
    > "#b101"   - exact 5; prefix #b binary.
    > "#i#b101" - inexact 5.0.
    > "#b#i101" - same.
    > "1.2345678|24" - rounded as if to single-precision (about 1.23456776).

    Specified by: <R6RS at
    http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_584>

    See Also: <fn["number->string"](z)>, <R6RS section 4.2.8: Lexical
    syntax: Numbers at
    http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-7.html#node_sec_4.2.8>

    Function: fn["string->number"](string, radix)
    Parses *string* as a Scheme number using *radix* as default radix.

    *radix* must be exact 2, 8, 10, or 16.  If *string* contains a
    radix prefix, the prefix takes precedence over *radix*.

    Specified by: <R6RS at
    http://www.r6rs.org/final/html/r6rs/r6rs-Z-H-14.html#node_idx_586>

    See Also: <fn["number->string"](z, radix)>.
*/
function implementRnrsBase(plugins) {
    //"use strict";  // Strict mode hinders error reporting.
    var g = plugins.get("es5globals");
    var uncurry = plugins.get("uncurry");
    var SchemeNumber, stringToNumber, ZERO, ONE, MINUS_ONE, INEXACT_ZERO, NAN, raise, isNumber, assertReal, toReal, toRational, toInteger, assertExact, makeRectangular, makePolar;
    var numberToString, isExact, isInexact, isComplex, isReal, isRational, isInteger, isZero, toExact, toInexact, negate, reciprocal, eq, ne, add, subtract, multiply, divide, realPart, imagPart, expt, exp, magnitude, angle, sqrt, log, asin, acos, atan, sin, cos, tan, SN_isFinite, SN_isInfinite, SN_isNaN, abs, isPositive, isNegative, floor, ceiling, truncate, round, compare, gt, lt, ge, le, divAndMod, div, mod, atan2, numerator, denominator, isEven, isOdd, exactIntegerSqrt, gcdNonnegative;
    var Array_push = uncurry(g.Array.prototype.push);

    SchemeNumber             = plugins.get("SchemeNumber");
    numberToString           = plugins.get("numberToString");
    isExact                  = plugins.get("isExact");
    isInexact                = plugins.get("isInexact");
    isComplex                = plugins.get("isComplex");
    isReal                   = plugins.get("isReal");
    isRational               = plugins.get("isRational");
    isInteger                = plugins.get("isInteger");
    isZero                   = plugins.get("isZero");
    toExact                  = plugins.get("toExact");
    toInexact                = plugins.get("toInexact");
    negate                   = plugins.get("negate");
    reciprocal               = plugins.get("reciprocal");
    eq                       = plugins.get("eq");
    ne                       = plugins.get("ne");
    add                      = plugins.get("add");
    subtract                 = plugins.get("subtract");
    multiply                 = plugins.get("multiply");
    divide                   = plugins.get("divide");
    realPart                 = plugins.get("realPart");
    imagPart                 = plugins.get("imagPart");
    expt                     = plugins.get("expt");
    exp                      = plugins.get("exp");
    magnitude                = plugins.get("magnitude");
    angle                    = plugins.get("angle");
    sqrt                     = plugins.get("sqrt");
    log                      = plugins.get("log");
    asin                     = plugins.get("asin");
    acos                     = plugins.get("acos");
    atan                     = plugins.get("atan");
    sin                      = plugins.get("sin");
    cos                      = plugins.get("cos");
    tan                      = plugins.get("tan");
    SN_isFinite              = plugins.get("SN_isFinite");
    SN_isInfinite            = plugins.get("SN_isInfinite");
    SN_isNaN                 = plugins.get("SN_isNaN");
    abs                      = plugins.get("abs");
    isPositive               = plugins.get("isPositive");
    isNegative               = plugins.get("isNegative");
    floor                    = plugins.get("floor");
    ceiling                  = plugins.get("ceiling");
    truncate                 = plugins.get("truncate");
    round                    = plugins.get("round");
    compare                  = plugins.get("compare");
    gt                       = plugins.get("gt");
    lt                       = plugins.get("lt");
    ge                       = plugins.get("ge");
    le                       = plugins.get("le");
    divAndMod                = plugins.get("divAndMod");
    div                      = plugins.get("div");
    mod                      = plugins.get("mod");
    atan2                    = plugins.get("atan2");
    numerator                = plugins.get("numerator");
    denominator              = plugins.get("denominator");
    isEven                   = plugins.get("isEven");
    isOdd                    = plugins.get("isOdd");
    exactIntegerSqrt         = plugins.get("exactIntegerSqrt");
    gcdNonnegative           = plugins.get("gcdNonnegative");
    stringToNumber           = plugins.get("stringToNumber");

    function onPluginsChanged(plugins) {
        ZERO                     = plugins.get("ZERO");
        ONE                      = plugins.get("ONE");
        MINUS_ONE                = plugins.get("MINUS_ONE");
        INEXACT_ZERO             = plugins.get("INEXACT_ZERO");
        NAN                      = plugins.get("NAN");
        raise                    = plugins.get("raise");
        isNumber                 = plugins.get("isNumber");
        assertReal               = plugins.get("assertReal");
        toReal                   = plugins.get("toReal");
        toRational               = plugins.get("toRational");
        toInteger                = plugins.get("toInteger");
        assertExact              = plugins.get("assertExact");
        makeRectangular          = plugins.get("makeRectangular");
        makePolar                = plugins.get("makePolar");
    }
    plugins.onChange.subscribe(onPluginsChanged);
    onPluginsChanged(plugins);

    var fn = {

        "eqv?"      : fn_isEqv,
        "number?"   : fn_isNumber,
        "complex?"  : fn_isComplex,
        "real?"     : fn_isReal,
        "rational?" : fn_isRational,
        "integer?"  : fn_isInteger,
        "real-valued?"     : fn_isRealValued,
        "rational-valued?" : fn_isRationalValued,
        "integer-valued?"  : fn_isIntegerValued,

        "exact?"   : makeUnary(SchemeNumber, isExact),
        "inexact?" : makeUnary(SchemeNumber, isInexact),

        inexact : makeUnary(SchemeNumber, toInexact),
        exact   : makeUnary(SchemeNumber, toExact),

        "="  : fn_equals,
        "<"  : makeComparator(lt),
        ">"  : makeComparator(gt),
        "<=" : makeComparator(le),
        ">=" : makeComparator(ge),

        "zero?"     : makeUnary(SchemeNumber, isZero),
        "positive?" : makeUnary(toReal, isPositive),
        "negative?" : makeUnary(toReal, isNegative),
        "odd?"      : makeUnary(toInteger, isOdd),
        "even?"     : makeUnary(toInteger, isEven),
        "finite?"   : makeUnary(toReal, SN_isFinite),
        "infinite?" : makeUnary(toReal, SN_isInfinite),
        "nan?"      : makeUnary(toReal, SN_isNaN),

        max : makeMaxMin(gt),
        min : makeMaxMin(lt),

        "+" : function() {
            var ret = ZERO;
            var len = arguments.length;
            var i = 0;
            while (i < len)
                ret = add(ret, SchemeNumber(arguments[i++]));
            return ret;
        },

        "*" : function() {
            var ret = ONE;
            var len = arguments.length;
            var i = 0;
            while (i < len)
                ret = multiply(ret, SchemeNumber(arguments[i++]));
            return ret;
        },

        "-" : function(a) {
            var len = arguments.length;

            switch (len) {
            case 0: args1plus(arguments);
            case 1: return negate(SchemeNumber(a));
            }
            var ret = SchemeNumber(a);
            var i = 1;
            while (i < len)
                ret = subtract(ret, SchemeNumber(arguments[i++]));
            return ret;
        },

        "/" : function(a) {
            var len = arguments.length;

            switch (len) {
            case 0: args1plus(arguments);
            case 1: return reciprocal(SchemeNumber(a));
            case 2: return divide(SchemeNumber(a), SchemeNumber(arguments[1]));
            }
            var product = ONE;
            var i = 1;
            while (i < len)
                product = multiply(product, SchemeNumber(arguments[i++]));
            return divide(SchemeNumber(a), product);
        },

        abs             : makeUnary(toReal, abs),
        "div-and-mod"   : makeDivMod(false, 2),
        div             : makeDivMod(false, 0),
        mod             : makeDivMod(false, 1),
        "div0-and-mod0" : makeDivMod(true, 2),
        div0            : makeDivMod(true, 0),
        mod0            : makeDivMod(true, 1),

        gcd : function() {
            var ret = ZERO;
            var len = arguments.length;
            var exact = true;
            for (var i = 0; i < len; i++) {
                var arg = toInteger(arguments[i]);
                exact = exact && isExact(arg);
                ret = gcdNonnegative(ret, toExact(abs(arg)));
            }
            ret = abs(ret);
            return (exact ? ret : toInexact(ret));
        },

        lcm : function() {
            var ret = ONE;
            var len = arguments.length;
            var exact = true;
            for (var i = 0; i < len; i++) {
                var arg = toInteger(arguments[i]);
                exact = exact && isExact(arg);
                arg = toExact(abs(arg));
                ret = divide(multiply(ret, arg), gcdNonnegative(ret, abs(arg)));
            }
            return (exact ? ret : toInexact(ret));
        },

        numerator   : makeUnary(toRational, numerator),
        denominator : makeUnary(toRational, denominator),
        floor       : makeUnary(toReal, floor),
        ceiling     : makeUnary(toReal, ceiling),
        truncate    : makeUnary(toReal, truncate),
        round       : makeUnary(toReal, round),
        rationalize : rationalize,
        exp         : makeUnary(SchemeNumber, exp),

        log : function(z, base) {
            var ret = log(SchemeNumber(z));
            switch (arguments.length) {
            case 2: ret = divide(ret, log(SchemeNumber(base)));  // fall through
            case 1: return ret;
            default: wrongArgCount("1-2", arguments);
            }
        },

        sin  : makeUnary(SchemeNumber, sin),
        cos  : makeUnary(SchemeNumber, cos),
        tan  : makeUnary(SchemeNumber, tan),
        asin : makeUnary(SchemeNumber, asin),
        acos : makeUnary(SchemeNumber, acos),

        atan : function(y, x) {
            switch (arguments.length) {
            case 1: return atan(SchemeNumber(y));
            case 2: return atan2(toReal(y), toReal(x));
            default: wrongArgCount("1-2", arguments);
            }
        },

        sqrt : makeUnary(SchemeNumber, sqrt),
        "exact-integer-sqrt" : makeUnary(toInteger, exactIntegerSqrt),

        expt : function(a, b) {
            arguments.length === 2 || args2(arguments);
            return expt(SchemeNumber(a), SchemeNumber(b));
        },

        "make-rectangular" : function(x, y) {
            arguments.length === 2 || args2(arguments);
            return makeRectangular(toReal(x), toReal(y));
        },

        "make-polar" : function(r, theta) {
            arguments.length === 2 || args2(arguments);
            return makePolar(toReal(r), toReal(theta));
        },

        "real-part" : makeUnary(SchemeNumber, realPart),
        "imag-part" : makeUnary(SchemeNumber, imagPart),
        magnitude   : makeUnary(SchemeNumber, magnitude),
        angle       : makeUnary(SchemeNumber, angle),

        "number->string" : function(z, radix, precision) {
            var r = radix;
            switch (arguments.length) {
            case 3:
                precision = toInteger(precision);
                assertExact(precision);
                // fall through
            case 2:
                r = assertExact(toInteger(r)).valueOf();
                if (r !== 10 && r !== 16 && r !== 8 && r !== 2)
                    raise("&assertion", "invalid radix", radix);
                // fall through
            case 1: break;
            default: wrongArgCount("1-3", arguments);
            }
            return numberToString(SchemeNumber(z), r, precision);
        },

        "string->number" : function(s, radix) {
            switch (arguments.length) {
            case 1:
            case 2: return stringToNumber(String(s), radix);
            default: wrongArgCount("1-2", arguments);
            }
        }
    };

    // Scheme function helpers.

    function wrongArgCount(expected, a) {
        var msg = "Function"

        // XXX a.callee throws TypeError in strict code.
        var called;
        try {
            called = a.callee;
        }
        catch (e) {}
        if (called) {
            for (name in fn) {
                if (fn[name] === called) {
                    msg += " '" + name + "'";
                    break;
                }
            }
        }
        raise("&assertion", msg + " expected " + expected +
              " argument" + (expected == "1" ? "" : "s") + ", got " + a.length);
    }

    function args1(a) { a.length === 1 || wrongArgCount(1, a); }
    function args2(a) { a.length === 2 || wrongArgCount(2, a); }

    function args1plus(a) { a.length > 0 || wrongArgCount("1 or more", a); }
    function args2plus(a) { a.length > 1 || wrongArgCount("2 or more", a); }

    function fn_isEqv(a, b) {
        arguments.length === 2 || args2(arguments);
        if (a === b)
            return true;
        if (!isNumber(a) || !isNumber(b))
            return false;
        return (eq(a, b) && isExact(a) === isExact(b));
    }

    function fn_isNumber(x) {
        arguments.length === 1 || args1(arguments);
        return isNumber(x);
    }

    function fn_isComplex(x) {
        arguments.length === 1 || args1(arguments);
        return isNumber(x) && isComplex(x);
    }

    function fn_isReal(x) {
        arguments.length === 1 || args1(arguments);
        return isNumber(x) && isReal(x);
    }

    function fn_isRational(x) {
        arguments.length === 1 || args1(arguments);
        return isNumber(x) && isRational(x);
    }

    function fn_isInteger(x) {
        arguments.length === 1 || args1(arguments);
        return isNumber(x) && isInteger(x);
    }

    function fn_isRealValued(x) {
        arguments.length === 1 || args1(arguments);
        return isNumber(x) && isComplex(x) && isZero(imagPart(x));
    }

    function fn_isRationalValued(x) {
        arguments.length === 1 || args1(arguments);
        return fn_isRealValued(x) && isRational(realPart(x));
    }

    function fn_isIntegerValued(x) {
        arguments.length === 1 || args1(arguments);
        return fn_isRealValued(x) && isInteger(realPart(x));
    }

    function fn_equals(a, b) {
        var len = arguments.length;
        len > 1 || args2plus(arguments);
        a = SchemeNumber(a);
        for (var i = 1; i < len; i++) {
            if (!eq(a, SchemeNumber(arguments[i])))
                return false;
        }
        return true;
    }

    function makeUnary(conv, func) {
        function unary(a) {
            arguments.length === 1 || args1(arguments);
            return func(conv(a));
        }
        return unary;
    }

    function makeComparator(cmp) {
        function comparator(a, b) {
            var len = arguments.length;
            len > 1 || args2plus(arguments);
            b = toReal(b);
            if (!cmp(toReal(a), b))
                return false;
            for (var i = 2; i < len; i++) {
                var c = toReal(arguments[i]);
                if (!cmp(b, c))
                    return false;
                b = c;
            }
            return true;
        }
        return comparator;
    }

    function makeMaxMin(cmp) {
        function maxMin(a) {
            var len = arguments.length;
            len > 0 || args1plus(arguments);

            var ret = toReal(a);
            var exact = isExact(ret);

            for (var i = 1; i < len; i++) {
                var x = toReal(arguments[i]);
                if (SN_isNaN(x))
                    return x;
                if (exact) {
                    exact = isExact(x);
                    if (!exact)
                        ret = toInexact(ret);  // XXX Cheaper comparisons?
                }
                if (cmp(x, ret) !== false) {
                    ret = x;
                }
            }
            return exact ? ret : toInexact(ret);
        }
        return maxMin;
    }

    function makeDivMod(is0, which) {
        function divMod(x, y) {
            arguments.length === 2 || args2(arguments);
            x = toReal(x);
            y = toReal(y);

            if (!SN_isFinite(x))
                raise("&assertion", "div/mod first argument is not finite", x);
            if (isZero(y))
                raise("&assertion", "div/mod second argument is zero", y);

            if (!is0) {
                switch (which) {
                case 0: return div(x, y);
                case 1: return mod(x, y);
                case 2: default: return divAndMod(x, y);
                }
            }

            var dm = divAndMod(x, y);
            var m = dm[1];
            var yabs = abs(y);

            if (ge(add(m, m), yabs)) {
                switch (which) {
                case 0: return add(dm[0], isNegative(y) ? MINUS_ONE : ONE);
                case 1: return subtract(m, yabs);
                case 2: default: return [
                    add(dm[0], isNegative(y) ? MINUS_ONE : ONE),
                    subtract(m, yabs)];
                }
            }
            switch (which) {
            case 0: return dm[0];
            case 1: return m;
            case 2: default: return dm;
            }
        }
        return divMod;
    }

    /* Rationalize is not a method, because I consider it broken by design.
       It should operate on an open, not closed interval. */

    function rationalize(x, delta) {
        args2(arguments);
        x = SchemeNumber(x);
        delta = SchemeNumber(delta);

        // Handle weird cases first.
        if (!SN_isFinite(x) || !SN_isFinite(delta)) {
            assertReal(x);
            assertReal(delta);
            if (SN_isInfinite(delta))
                return (SN_isFinite(x) ? INEXACT_ZERO : NAN);
            if (SN_isNaN(delta))
                return delta;
            return x;
        }

        if (isZero(delta))
            return x;

        delta = abs(delta);  // It's what PLT and Mosh seem to do.

        var inexact = isInexact(x) || isInexact(delta);
        if (inexact) {
            // Ensure that our algorithm terminates.
            // XXX What if x or delta is irrational?
            x = toExact(x);
            delta = toExact(delta);
        }

        var x0 = subtract(x, delta);
        var x1 = add(x, delta);
        var a = floor(x0);
        var b = floor(x1);

        if (ne(a, b)) {
            var negative = isNegative(a);
            if (isNegative(b) != negative)
                return (inexact ? INEXACT_ZERO : ZERO);
            a = (negative ? b : ceiling(x0));
            return inexact ? toInexact(a) : a;
        }
        var cf = [];  // Continued fraction, b implied.

        while (true) {
            x0 = subtract(x0, a);
            if (isZero(x0))
                break;
            x1 = subtract(x1, a);
            if (isZero(x1))
                break;

            x0 = reciprocal(x0);
            x1 = reciprocal(x1);
            a = floor(x0);

            switch (compare(a, floor(x1))) {
            case -1: Array_push(cf, ceiling(x0)); break;
            case  1: Array_push(cf, ceiling(x1)); break;
            case 0: default:
                Array_push(cf, a);
                continue;
            }
            break;
        }
        var ret = ZERO;
        var i = cf.length;
        while (i--)
            ret = reciprocal(add(ret, cf[i]));

        ret = add(ret, b);
        return (inexact ? toInexact(ret) : ret);
    }

    // XXX Should avoid using an object literal in the definition of
    // *fn* so we don't have to worry about inheriting junk from
    // Object.prototype.

    var api = g.Object.create(null);
    for (var i in fn) {
        if (g.Object.prototype.hasOwnProperty.call(fn, i))
            api[i] = fn[i];
    }

    return api;
}

/*
    Function: implementSchemeNumber(plugins)
    Creates and returns as *SchemeNumber* a partially constructed
    <SchemeNumber> object.

    Input:

    *plugins* shall be a <PluginContainer> containing the following
    elements.  All except *defaultRaise* may be defined after the call
    to <implementSchemeNumber> but before the first call to its
    result.

    defaultRaise - the initial value of <SchemeNumber.raise>.

    SchemeNumberType - base constructor of the numerical tower.
    <SchemeNumber> uses *instanceof SchemeNumberType* to determine
    whether to return its argument unchanged.

    nativeToInexact - function(number) -> SchemeNumber
    *number* is a native number.  <nativeToInexact> must return an inexact
    Scheme Number approximating its argument.  <nativeToInexact> must
    handle infinite values and *NaN*.

    stringToNumber - function(string) -> SchemeNumber | false
    *string* is a string.  <stringToNumber> must behave like Scheme's
    *string->number* function given a single argument.  See
    <fn["string->number"](string)>.

    raise - function(conditionType, message, irritants...)
    This *raise* simply calls the user-overridable
    <SchemeNumber.raise> but enforces the contract not to return.

    toSchemeNumber - function(obj) -> SchemeNumber
    Called when the argument to <SchemeNumber> is not of known
    convertible type.  The version defined in <defineGenericFunctions>
    has no imlementations; it exists for applications that want
    <SchemeNumber> to convert objects other than strings and numbers.

    Returns:

        A new function object like the public <SchemeNumber>.
*/
function implementSchemeNumber(plugins) {
    "use strict";
    var SchemeNumberType, nativeToInexact, stringToNumber, toSchemeNumber, raise;

    function SchemeNumber(obj) {
        var ret;

        if (obj instanceof SchemeNumberType)
            return obj;

        if (typeof obj === "string") {
            ret = stringToNumber(obj);
            if (ret === false)
                raise("&assertion", "not a number", obj);
            return ret;
        }

        if (typeof obj === "number")
            return nativeToInexact(obj);

        try {
            return toSchemeNumber(obj);
        } catch (e) {
            raise("&assertion", "not a number", obj,e);
        }
    }

    /*
    Property: VERSION
    Library version as an array of integers.

    For example, *[1,2,4]* corresponds to Version 1.2.4.
    */
    SchemeNumber.VERSION = [1,3,2];

    /*
    Property: fn
    Container of <Scheme functions>.

    The <SchemeNumber> object contains a property, <SchemeNumber.fn>,
    which in turn contains the functions implementing the Scheme
    numeric types.

    These functions are stored in <fn> under their Scheme names, so
    ["quotation"] is needed where the names contain characters that
    are incompatible with dot.notation.  (In JavaScript, *X.Y* and
    *X["Y"]* are equivalent expressions where Y is a valid identifier.
    Not all Scheme function names are valid JavaScript identifiers, so
    one needs the second syntax to extract them from <fn>.)

    You may find it convenient to copy <SchemeNumber>, <fn>, and the
    output function <number->string> into short-named variables, by
    convention *sn*, *fn*, and *ns*.  The rest of this section assumes
    you have done this:

    > var sn = SchemeNumber;
    > var fn = sn.fn;
    > var ns = fn["number->string"];

    Functions that require a Scheme number argument automatically
    filter the argument through <SchemeNumber>.

    For example, *"2"* (string) would be exact (parsed as Scheme) but
    *2* (equal to *2.0*) would be inexact, as demonstrated:

    > a1 = fn["exact?"]("2");       // a1 === true
    > a1 = fn["exact?"](sn("2"));   // same
    > 
    > a2 = fn["exact?"](2);         // a2 === false
    > a2 = fn["exact?"]("2.0");     // same
    > a2 = fn["exact?"](sn("2.0")); // same

    Note that the following functions accept arguments of any type and
    therefore do not apply <SchemeNumber> to their arguments:

    - <eqv?>
    - <number?>
    - <complex?>
    - <real?>
    - <rational?>
    - <integer?>
    - <real-valued?>
    - <rational-valued?>
    - <integer-valued?>

    Here, for example, is 2 to the 1,024th power, as a decimal
    string:

    > a3 = ns(fn.expt("2", "1024"));

    Fractional
    arithmetic:

    > a4 = fn["+"]("1/3", "4/5");  // 17/15

    Numerator and denominator of a floating-point value,
    hexadecimal:

    > a5 = ns(fn.numerator(1/3), "16");    // "#i15555555555555"
    > a6 = ns(fn.denominator(1/3), "16");  // "#i40000000000000"

    The *#i* prefix denotes an inexact number, as detailed in <R6RS at
    http://www.r6rs.org/>.  Since 1/3 is a native JavaScript number,
    the library regards it as inexact, and operations such as
    numerator yield inexact integer results.  If we used *"1/3"*
    (quoted) instead of *1/3*, the numerator and denominator would be
    the mathematically correct 1 and 3.

    Functions specified to return two values (such as <div-and-mod>
    and <exact-integer-sqrt>) return a two-element array as per
    JavaScript conventions.

    Caveats:

      o Arcane features such as explicit mantissa widths or complex
        transcendental functions, while believed complete, are
        unoptimized.

      o The library exhibits other visible behaviors besides those
        described herein.  However, they are not part of its public
        API and may change or disappear from one release to the next.

      o In particular, Scheme numbers' *toString* property sometimes
        produces output that is incorrect in the Scheme sense.  (This
        stems from the decision to represent inexact reals as
        unadorned native numbers.)

    To serialize numbers as Scheme would, use
    <SchemeNumber.fn["number->string"]>.

    > "" + SchemeNumber(2);                  // "2"
    > SchemeNumber.fn["number->string"](2);  // "2."

    To test a Scheme number for numerical equality with another Scheme
    number or a native value, use <fn["="]>.  Likewise for <fn[">"]>
    etc.

    See Also:

        <Scheme functions>
    */
    SchemeNumber.fn = undefined;  // implementRnrsBase(plugins);

    /*
    Property: raise
    Function that translates a Scheme exception to ECMAScript.

    When a library function encounters a situation where the Scheme
    specification requires it to raise an exception with a certain
    condition type, the function calls <SchemeNumber.raise>.

    Programs may assign a custom function to <SchemeNumber.raise> to
    intercept such exceptions.

    Parameters:

        conditionType - The specified condition, for example, "&assertion".
        message       - A string describing the error.
        irritants...  - Zero or more erroneous data arguments.

    Returns:

        The default <SchemeNumber.raise> function simply throws an
        *Error*.

    See Also:

        <fn>, <SchemeNumber>
    */
    SchemeNumber.raise = undefined;  // plugins.get("defaultRaise");

    /*
    Property: maxIntegerDigits
    Maximum size of integers created by the <fn.expt(z1, z2)>
    function.

    To avoid using up all system memory, exact results of a call to
    <fn.expt(z1, z2)> are capped at a configurable number of digits,
    by default one million.  <SchemeNumber.maxIntegerDigits> holds
    this limit.

    The size limit does *not* currently protect against other means of
    creating large exact integers.  For example, when passed
    "#e1e9999999", the <SchemeNumber> function tries to allocate 10
    million digits, regardless of <maxIntegerDigits>.

    In a future release, cases such as the preceeding example may be
    checked.  If there is any possibility of legitimately creating
    such large integers, either as number objects or components
    thereof, code should increase <maxIntegerDigits>.

    Default Value:

        - 1000000 (1e6 or 1 million)
    */
    SchemeNumber.maxIntegerDigits = 1e6;  // 1 million digits.

    /*
    Property: plugins
    An instance of <PluginContainer> shared among back-end number
    implementations in a SchemeNumber system.

    See Also: <defineDebugFunction>
    */
    SchemeNumber.plugins = plugins;

    function onPluginsChanged(plugins) {
        SchemeNumberType = plugins.get("SchemeNumberType");
        nativeToInexact  = plugins.get("nativeToInexact");
        stringToNumber   = plugins.get("stringToNumber");
        toSchemeNumber   = plugins.get("toSchemeNumber");
        raise            = plugins.get("raise");
    }
    plugins.onChange.subscribe(onPluginsChanged);
    onPluginsChanged(plugins);

    /*
        SchemeNumber             = plugins.get("SchemeNumber");
    */
    return SchemeNumber;
}

function makeMinimalBase() {

    var SchemeNumber, debug;

    var disp = DispatchJs.makeContext({
        //debug: true,
        methodNamePrefix: "SN_",
        methodNameSeparator: " "
    });

    var plugins = new PluginContainer({
        Dispatch: disp,
        es5globals: getEs5Globals()
    });

    plugins.extend(implementUncurry(plugins));
    plugins.extend(defineGenericFunctions(plugins));
    plugins.extend(defineSchemeNumberType(plugins));
    plugins.extend(defineDebugFunction(plugins));

    // XXX These next steps could be conflated.
    SchemeNumber = implementSchemeNumber(plugins);
    plugins.extend("SchemeNumber", SchemeNumber);
    plugins.extend(implementCoreLibrary(plugins));
    SchemeNumber.raise = plugins.get("defaultRaise");
    SchemeNumber.fn = implementRnrsBase(plugins);

    return SchemeNumber;
}

/*
    Function: defineAbstractTypes(plugins)
    Creates a prototype-based type hierarchy corresponding to some of
    the number classes defined by Scheme.

    The constructors created here ignore their arguments and lack any
    property other than *prototype* and a few inherited methods noted
    below.  They may be used as "abstract base classes" to create
    prototypes of other, more concrete numeric subtypes.

    The hierarchy inherits from the global Number class so that *n
    instanceof Number* holds for any Scheme number *n*.  The intent is
    that Scheme numbers should interoperate with native numbers to the
    extent possible and support the ECMAScript formatting methods
    *toFixed*, *toExponential*, and *toPrecision*.

    Input:

    *plugins* shall be a <PluginContainer> with the following
    contents.

    SchemeNumberType - base of the numerical tower
    Inherits from the built-in *Number* prototype.  Comprises all
    Scheme numbers.

    Output:

    <defineAbstractTypes> returns an object with the following
    properties, each a constructor of zero arguments having no side
    effects.

    Complex - complex number type
    Inherits from *SchemeNumberType*.

    Real - real number type
    Inherits from *Complex*.

    InexactReal - inexact real number type
    Inherits from *Real*.

    ExactReal - exact real number type
    Inherits from *Real*.

    ExactRational - exact rational number type
    Inherits from *ExactReal*.

    ExactInteger - exact integer type
    Inherits from *ExactRational*.

    See Also: <JsDispatch>

    Method: toString()
    Converts this Scheme number to a string as if by *this.toString(10)*.

    Specified by: <ECMA-262, 5th edition at http://www.ecma-international.org/publications/standards/Ecma-262.htm>

    Method: toString(radix)
    Converts this Scheme number to a string.

    The *toString* method converts inexact numbers as in JavaScript
    and exact numbers as if by <fn["number->string"](z, radix)>.

    Method: toFixed(fractionDigits)
    Returns this Scheme number as a string with *fractionDigits*
    digits after the decimal point.

    Examples:

    > SchemeNumber("#e1.2").toFixed(2)  // "1.20"
    > SchemeNumber("2/3").toFixed(20)   // "0.66666666666666666667"

    Compare the native version:

    > (2/3).toFixed(20)                 // "0.66666666666666662966"

    Specified by: <ECMA-262, 5th edition at http://www.ecma-international.org/publications/standards/Ecma-262.htm>

    Method: toLocaleString()
    Converts this Scheme number to a string as if by *this.toString()*.

    Specified by: <ECMA-262, 5th edition at http://www.ecma-international.org/publications/standards/Ecma-262.htm>

    Method: toExponential(fractionDigits)
    Converts this Scheme number to scientific "e" notation with
    *fractionDigits* digits after the decimal point.

    Examples:

    > SchemeNumber("1/11").toExponential(3)  // "9.091e-2"
    > SchemeNumber("1/2").toExponential(2)   // "5.00e-1"

    Specified by: <ECMA-262, 5th edition at http://www.ecma-international.org/publications/standards/Ecma-262.htm>

    Method: toPrecision(precision)
    Converts this Scheme number to decimal (possibly "e" notation)
    with *precision* significant digits.

    Examples:

    > SchemeNumber("12300").toPrecision(2)  // "1.2e+4"
    > SchemeNumber("12300").toPrecision(4)  // "1.230e+4"
    > SchemeNumber("12300").toPrecision(5)  // "12300"
    > SchemeNumber("12300").toPrecision(6)  // "12300.0"

    Specified by: <ECMA-262, 5th edition at http://www.ecma-international.org/publications/standards/Ecma-262.htm>

    Method: valueOf()
    Converts this Scheme number to a native number with possible loss
    of precision.

    ECMAScript does not natively support imaginary numbers, so
    non-reals typically produce *NaN*.

    Specified by: <ECMA-262, 5th edition at http://www.ecma-international.org/publications/standards/Ecma-262.htm>
 */
function defineAbstractTypes(plugins) {
    "use strict";
    var g = plugins.get("es5globals");
    var api = g.Object.create(null);
    var SchemeNumberType = plugins.get("SchemeNumberType");

    function Complex(){}             Complex.prototype = new SchemeNumberType();
    function Real(){}                   Real.prototype = new Complex();
    function InexactReal(){}     InexactReal.prototype = new Real();
    function ExactReal(){}         ExactReal.prototype = new Real();
    function ExactRational(){} ExactRational.prototype = new ExactReal();
    function ExactInteger(){}   ExactInteger.prototype = new ExactRational();

    api.Complex                  = Complex;
    api.Real                     = Real;
    api.InexactReal              = InexactReal;
    api.ExactReal                = ExactReal;
    api.ExactRational            = ExactRational;
    api.ExactInteger             = ExactInteger;
    return api;
}

/*
    Function: installAbstractTypes(plugins)
    Defines dispatcher classes for the results of
    <defineAbstractTypes(plugins)>.

    *plugins* shall be a <PluginContainer> with the following
    contents.

    Dispatch - a <JsDispatch> object.
    <installAbstractTypes> calls the *Dispatch* object's *defClass*
    function to register the new types.  The class names used in
    *Dispatch* are the same as those used in *plugins*, e.g.,
    "Complex", except that *SchemeNumberType* is registered as simply
    "SchemeNumber".
*/
function installAbstractTypes(plugins) {
    "use strict";
    var disp = plugins.get("Dispatch");

    function def(name) {
        disp.defClass(name, { ctor: plugins.get(name) });
    }
    def("Complex");
    def("Real");
    def("InexactReal");
    def("ExactReal");
    def("ExactRational");
    def("ExactInteger");
}

function installStubFunctions(plugins) {
    "use strict";
    var g = plugins.get("es5globals");
    var uncurry = plugins.get("uncurry");
    var Function_apply = uncurry(g.Function.prototype.apply);
    var Array_concat   = uncurry(g.Array.prototype.concat);

    var SchemeNumberType         = plugins.get("SchemeNumberType");
    var Complex                  = plugins.get("Complex");
    var Real                     = plugins.get("Real");
    var InexactReal              = plugins.get("InexactReal");
    var ExactReal                = plugins.get("ExactReal");
    var ExactRational            = plugins.get("ExactRational");
    var ExactInteger             = plugins.get("ExactInteger");

    function def(name, types) {
        var func = plugins.get(name);
        if (!func) {
            console.log(name, "not found");
            return;
        }
        Function_apply(func.def, func, types /*Array_concat(types, g.undefined)*/);
    }

    // These are the functions that number implementations must implement.
    // Example:
    // var disp = SchemeNumber.plugins.get("Dispatch");
    // disp.defClass("MyComplex", {ctor: MyComplexConstructor,
    //                             base: Complex});
    // var add = SchemeNumber.plugins.get("add");
    // add.def("MyComplex", Complex, add_MyComplex_to_AnyComplex);
    // add.def(Complex, "MyComplex", add_AnyComplex_to_MyComplex);

    def("numberToString", [SchemeNumberType]);
    def("isExact",        [SchemeNumberType]);
    def("isInexact",      [SchemeNumberType]);

    def("isComplex",      [SchemeNumberType]);
    def("isReal",         [SchemeNumberType]);
    def("isRational",     [SchemeNumberType]);
    def("isInteger",      [SchemeNumberType]);
    def("isZero",         [SchemeNumberType]);

    def("toExact",        [SchemeNumberType]);
    def("toInexact",      [SchemeNumberType]);
    def("negate",         [SchemeNumberType]);
    def("reciprocal",     [SchemeNumberType]);

    def("eq",             [SchemeNumberType, SchemeNumberType]);
    def("ne",             [SchemeNumberType, SchemeNumberType]);

    def("add",            [SchemeNumberType, SchemeNumberType]);
    def("subtract",       [SchemeNumberType, SchemeNumberType]);
    def("multiply",       [SchemeNumberType, SchemeNumberType]);
    def("divide",         [SchemeNumberType, SchemeNumberType]);

    def("square",         [SchemeNumberType]);

    def("realPart",       [Complex]);
    def("imagPart",       [Complex]);
    def("magnitude",      [Complex]);
    def("angle",          [Complex]);
    def("conjugate",      [Complex]);

    def("expt",           [SchemeNumberType, ExactInteger]);
    def("expt",           [Complex, Complex]);

    def("exp",            [Complex]);
    def("sqrt",           [Complex]);

    def("log",            [Complex]);
    def("asin",           [Complex]);
    def("acos",           [Complex]);
    def("atan",           [Complex]);

    def("sin",            [Complex]);
    def("cos",            [Complex]);
    def("tan",            [Complex]);

    def("SN_isFinite",    [Real]);
    def("SN_isInfinite",  [Real]);
    def("SN_isNaN",       [Real]);

    def("isUnit",         [Real]);
    def("abs",            [Real]);
    def("isPositive",     [Real]);
    def("isNegative",     [Real]);
    def("sign",           [Real]);
    def("floor",          [Real]);
    def("ceiling",        [Real]);
    def("truncate",       [Real]);
    def("round",          [Real]);

    def("compare",        [Real, Real]);
    def("gt",             [Real, Real]);
    def("lt",             [Real, Real]);
    def("ge",             [Real, Real]);
    def("le",             [Real, Real]);
    def("divAndMod",      [Real, Real]);
    def("div",            [Real, Real]);
    def("mod",            [Real, Real]);
    def("atan2",          [Real, Real]);

    def("numerator",      [ExactRational]);
    def("denominator",    [ExactRational]);
    def("numeratorAndDenominator", [ExactRational]);

    def("isEven",         [ExactInteger]);
    def("isOdd",          [ExactInteger]);
    def("exactIntegerSqrt", [ExactInteger]);
    def("exp10",          [ExactInteger]);
    def("gcdNonnegative", [ExactInteger, ExactInteger]);
    def("divideReduced",  [ExactInteger, ExactInteger]);

    def("bitwiseNot", [ExactInteger]);
    def("bitwiseAnd", [ExactInteger, ExactInteger]);
    def("bitwiseIor", [ExactInteger, ExactInteger]);
    def("bitwiseXor", [ExactInteger, ExactInteger]);
    def("bitCount", [ExactInteger]);
    def("bitLength", [ExactInteger]);
    def("firstBitSet", [ExactInteger]);
    def("isBitSet", [ExactInteger]);
    def("copyBit", [ExactInteger]);
    def("bitField", [ExactInteger]);
    def("copyBitField", [ExactInteger, ExactInteger]);
    def("bitShift", [ExactInteger]);
    def("rotateBitField", [ExactInteger]);
    def("reverseBitField", [ExactInteger]);
}


/*
    Function: implementPluginLibrary(plugins)
    Creates some plugins of use to number implementations.

    Input:

    *plugins* shall be a <PluginContainer> containing the items listed
    below, in addition to the output of <defineAbstractTypes> and
    <defineGenericFunctions>.  All may be added after the call to
    <implementPluginLibrary> but before any use of its results.  When
    changes to plugins produce changes in non-function results (such
    as *ZERO* and *ONE*), the library broadcasts the changes via the
    <PluginLibrary.onChange> event.

    SchemeNumber - function(any)
    The <SchemeNumber> object as returned by
    <implementSchemeNumber(plugins)>.

    nativeToExactInteger - function(integer)
    *integer* is a native ECMAScript number of integer value.
    <nativeToExactInteger> returns an exact Scheme number whose value
    equals *integer*.

    nativeToInexact - function(number)
    *number* is a native ECMAScript number, possibly infinite or
    *NaN*.  <nativeToInexact> returns an inexact Scheme number
    approximating its argument.

    parseExactInteger - function(sign, string, radix)
    *sign* is the native number 1 or -1.  *radix* is the native number
    2, 8, 10, or 16.  <parseExactInteger> must be a function returning
    a Scheme number equal to *sign* times the result of parsing
    *string* as a positive, unprefixed, exact integer in the given
    radix.

    parseInexact - function(sign, string)
    *sign* is the native number 1 or -1.  <parseExact> must be a
    function returning a Scheme number equal to *sign* times the
    result of parsing *string* as a positive, unprefixed, decimal,
    inexact, real number.

    exactRectangular - function(x, y)
    *x* and *y* are exact reals, *y* non-zero.  <exactRectangular>
    returns an exact complex equal to *x* + (i * *y*).

    inexactRectangular - function(x, y)
    *x* and *y* are inexact reals.  <inexactRectangular> returns an
    inexact complex equal to *x* + (i * *y*).

    exactPolar - function(r, theta)
    *r* and *theta* are exact reals.  <exactPolar> returns an exact
    complex equal to *r* * exp(i * *theta*).

    inexactPolar - function(r, theta)
    *r* and *theta* are inexact reals.  <inexactPolar> returns an
    inexact complex equal to *r* * exp(i * *theta*).

    Output:

    <implementPluginLibrary> returns an object with the following
    properties.

    ZERO - the exact integer *0*.

    ONE - the exact integer *1*.

    TWO - the exact integer *2*.

    MINUS_ONE - the exact integer *-1*.

    INEXACT_ZERO - the inexact integer *0.0*.

    INEXACT_ONE - the inexact integer *1.0*.

    PI - the inexact real number pi.

    INFINITY - the inexact real number *+inf.0*.

    MINUS_INFINITY - the inexact real number *-inf.0*.

    NAN - the inexact real number *+nan.0*.

    I - the exact complex unit *i*.

    MINUS_I - the exact complex unit *-i*.

    raise - function(conditionType, message, irritant...)
    This *raise* simply calls the user-overridable
    <SchemeNumber.raise> but enforces the contract not to return.

    defaultRaise - function(conditionType, message, irritant...)
    Throws an Error describing the arguments.

    raiseDivisionByExactZero - function()
    Raises an exception as specified by Scheme to report division by
    exact zero.

    isNumber - function(x)
    Returns true if *x* is a Scheme number.

    assertReal - function(x)
    Returns *x* if *x* is a real Scheme number, otherwise raises an
    exception as specified by Scheme for invalid argument type.

    toReal - function(x)
    Converts *x* to a Scheme number and behaves as if by returning
    *assertReal(x)*.

    assertInteger - function(x)
    Returns *x* if *x* is a Scheme integer, otherwise raises an
    exception as specified by Scheme for invalid argument type.

    toInteger - function(x)
    Converts *x* to a Scheme number and behaves as if by returning
    *assertInteger(x)*.

    assertExact - function(x)
    Returns *x* if *x* is an exact Scheme number, otherwise raises an
    exception as specified by Scheme for invalid argument type.

    Complex_expt - function(power)
    Returns the value specified for <fn.expt(z1, z2)> (passing *this*
    and *power*) for the case where *z1* is zero or the result is
    permitted to be inexact The result may be non-real, even if both
    arguments are real and *this* is positive.

    Complex_expt_fn - function(z1, z2)
    Behaves as if by returning *Complex_expt.call(z1, z2)*.

    Complex_asin - function(z)
    Returns the value specified for <fn.asin(z)> for complex *z*.  The
    result may be non-real due to inexactness, even if the argument is
    real and in the range -1 to 1.

    Complex_asin_fn - function(z1, z2)
    Behaves as if by returning *Complex_asin(z1, z2)*.

    Complex_acos - function(z)
    Returns the value specified for <fn.acos(z)> for complex *z*.  The
    result may be non-real due to inexactness, even if the argument is
    real and in the range -1 to 1.

    Complex_acos_fn - function(z1, z2)
    Behaves as if by returning *Complex_acos.call(z1, z2)*.

    Complex_atan - function(z)
    Returns the value specified for <fn.atan(z)> for complex *z*.  The
    result may be non-real due to inexactness, even if the argument is
    real.

    Complex_atan_fn - function(z1, z2)
    Behaves as if by returning *Complex_atan.call(z1, z2)*.

    Complex_log - function(z)
    Returns the value specified for <fn.log(z)> for complex *z*.  The
    result may be non-real due to inexactness, even if the argument is
    real and positive.

    nativeDenominator - function(x)
    *x* is a native number.  Returns the denominator of *x* regarded
    as a binary fraction.

    nativeDenominatorLog2 - function(x)
    *x* is a native number.  Returns the floor of the base-2
    log of *nativeDenominator(x)*; i.e., the denominator's floating
    point exponent.

    numberToBinary - function(x)
    Returns a string of "0" and "1" characters, possibly including a
    "."  and possibly a leading "-", that in base 2 equals x.

    This works by calling *Number.prototype.toString* with a radix of
    2.  Specification ECMA-262 Edition 5 (December 2009) does not
    strongly assert that this works.  As an alternative, should this
    prove non-portable, *nativeDenominator* could instead do this for
    finite *x*:

    > for (var d = 1; x !== Math.floor(x); d *= 2) {
    >     x *= 2;
    > }
    > return d;

    zeroes - function(count)
    Returns a string of *count* zeroes, e.g. "0000".

    XXX documentation incomplete.

    truncateToPrecision

    stringToNumber - function(string, radix, exact)
    <stringToNumber> returns the Scheme number whose external
    representation is *string* with added prefixes corresponding to
    either or both of *radix* and *exact*, if defined.

    *s* should be the external representation of a Scheme number, such
    as "2/3" or "#e1.1@-2d19".  If *s* does not represent a Scheme
    number, <stringToNumber> returns *false*.

    If *radix* is given, it must be either 2, 8, 10, or 16, and *s*
    must not contain a radix prefix.  The function behaves as if *s*
    did contain the prefix corresponding to *radix*.

    If *exact* is given, it must have type "boolean", and *s* must not
    contain an exactness prefix.  The function behaves as if *s*
    contained the corresponding prefix ("#e" if *exact* is true, "#i"
    if false).
*/
function implementPluginLibrary(plugins) {
    "use strict";

    // Abstract types, generic functions, and the SchemeNumber object.
    // XXX Could remove unused items.
    var SchemeNumber, toSchemeNumber, SchemeNumberType, Complex, Real,
        InexactReal, ExactReal, ExactRational, ExactInteger,
        numberToString, isExact, isInexact, isComplex, isReal,
        isRational, isInteger, isZero, toExact, toInexact, negate,
        reciprocal, eq, ne, add, subtract, multiply, divide, square,
        realPart, imagPart, expt, expt, exp, magnitude, angle, sqrt,
        log, asin, acos, atan, sin, cos, tan, SN_isFinite,
        SN_isInfinite, SN_isNaN, isUnit, abs, isPositive, isNegative,
        sign, floor, ceiling, truncate, round, compare, gt, lt, ge,
        le, divAndMod, div, mod, atan2, numerator, denominator,
        numeratorAndDenominator,
        isEven, isOdd, exp10, gcdNonnegative, divideReduced;

    SchemeNumber             = plugins.get("SchemeNumber");

    SchemeNumberType         = plugins.get("SchemeNumberType");
    Complex                  = plugins.get("Complex");
    Real                     = plugins.get("Real");
    InexactReal              = plugins.get("InexactReal");
    ExactReal                = plugins.get("ExactReal");
    ExactRational            = plugins.get("ExactRational");
    ExactInteger             = plugins.get("ExactInteger");

    toSchemeNumber           = plugins.get("toSchemeNumber");
    numberToString           = plugins.get("numberToString");
    isExact                  = plugins.get("isExact");
    isInexact                = plugins.get("isInexact");
    isComplex                = plugins.get("isComplex");
    isReal                   = plugins.get("isReal");
    isRational               = plugins.get("isRational");
    isInteger                = plugins.get("isInteger");
    isZero                   = plugins.get("isZero");
    toExact                  = plugins.get("toExact");
    toInexact                = plugins.get("toInexact");
    negate                   = plugins.get("negate");
    reciprocal               = plugins.get("reciprocal");
    eq                       = plugins.get("eq");
    ne                       = plugins.get("ne");
    add                      = plugins.get("add");
    subtract                 = plugins.get("subtract");
    multiply                 = plugins.get("multiply");
    divide                   = plugins.get("divide");
    square                   = plugins.get("square");
    realPart                 = plugins.get("realPart");
    imagPart                 = plugins.get("imagPart");
    expt                     = plugins.get("expt");
    expt                     = plugins.get("expt");
    exp                      = plugins.get("exp");
    magnitude                = plugins.get("magnitude");
    angle                    = plugins.get("angle");
    sqrt                     = plugins.get("sqrt");
    log                      = plugins.get("log");
    asin                     = plugins.get("asin");
    acos                     = plugins.get("acos");
    atan                     = plugins.get("atan");
    sin                      = plugins.get("sin");
    cos                      = plugins.get("cos");
    tan                      = plugins.get("tan");
    SN_isFinite              = plugins.get("SN_isFinite");
    SN_isInfinite            = plugins.get("SN_isInfinite");
    SN_isNaN                 = plugins.get("SN_isNaN");
    isUnit                   = plugins.get("isUnit");
    abs                      = plugins.get("abs");
    isPositive               = plugins.get("isPositive");
    isNegative               = plugins.get("isNegative");
    sign                     = plugins.get("sign");
    floor                    = plugins.get("floor");
    ceiling                  = plugins.get("ceiling");
    truncate                 = plugins.get("truncate");
    round                    = plugins.get("round");
    compare                  = plugins.get("compare");
    gt                       = plugins.get("gt");
    lt                       = plugins.get("lt");
    ge                       = plugins.get("ge");
    le                       = plugins.get("le");
    divAndMod                = plugins.get("divAndMod");
    div                      = plugins.get("div");
    mod                      = plugins.get("mod");
    atan2                    = plugins.get("atan2");
    numerator                = plugins.get("numerator");
    denominator              = plugins.get("denominator");
    numeratorAndDenominator  = plugins.get("numeratorAndDenominator");
    isEven                   = plugins.get("isEven");
    isOdd                    = plugins.get("isOdd");
    exp10                    = plugins.get("exp10");
    gcdNonnegative           = plugins.get("gcdNonnegative");
    divideReduced            = plugins.get("divideReduced");

    // Functions to be provided by number implementations.
    var nativeToExactInteger, divideReducedNotByOne;
    var exactRectangular, inexactRectangular;

    // Imports from ECMAScript.
    var g                = plugins.get("es5globals");
    var uncurry          = plugins.get("uncurry");
    var Array_join       = uncurry(g.Array.prototype.join);
    var Number_toString  = uncurry(g.Number.prototype.toString);
    var String_indexOf   = uncurry(g.String.prototype.indexOf);
    var String_substring = uncurry(g.String.prototype.substring);
    var String_replace   = uncurry(g.String.prototype.replace);

    var Math_LN10    = g.Math.LN10;
    var Math_LN2     = g.Math.LN2;
    var Math_abs     = g.Math.abs;
    var Math_floor   = g.Math.floor;
    var Math_pow     = g.Math.pow;
    var _undefined   = g.undefined;
    var _NaN         = g.NaN;
    var _parseInt    = g.parseInt;
    var _isFinite    = g.isFinite;

    // Imports from implementations via core library.
    var ZERO, ONE, TWO, MINUS_ONE, I, MINUS_I, INEXACT_ZERO, INEXACT_ONE, PI;

    // Imports from core library.
    var makePolar                = plugins.get("makePolar");
    var makeRectangular          = plugins.get("makeRectangular");
    var raise                    = plugins.get("raise");
    var raiseDivisionByExactZero = plugins.get("raiseDivisionByExactZero");

    var api = g.Object.create(null);

    function onPluginsChanged(plugins, changed) {
        nativeToExactInteger     = plugins.get("nativeToExactInteger");
        divideReducedNotByOne    = plugins.get("divideReducedNotByOne");
        exactRectangular         = plugins.get("exactRectangular");
        inexactRectangular       = plugins.get("inexactRectangular");

        ZERO                     = plugins.get("ZERO");
        ONE                      = plugins.get("ONE");
        TWO                      = plugins.get("TWO");
        MINUS_ONE                = plugins.get("MINUS_ONE");
        INEXACT_ZERO             = plugins.get("INEXACT_ZERO");
        INEXACT_ONE              = plugins.get("INEXACT_ONE");
        PI                       = plugins.get("PI");
        I                        = plugins.get("I");
        MINUS_I                  = plugins.get("MINUS_I");
    }
    plugins.onChange.subscribe(onPluginsChanged);
    onPluginsChanged(plugins, {});

    //
    // For lazy implementors.  Used in Complex and elsewhere.  These
    // belong in a separate library.  Could support replacement with
    // dummy versions that return NaN.
    //

    function Complex_sqrt() {
        return makePolar(sqrt(magnitude(this)), divide(angle(this), TWO));
    }
    function Complex_exp() {
        return makePolar(exp(realPart(this)), imagPart(this));
    }
    function Complex_sin() {
        var iz = multiply(I, this);
        return multiply(divide(subtract(exp(iz), exp(negate(iz))), TWO),
                        MINUS_I);
    }
    function Complex_cos() {
        var iz = multiply(I, this);
        return divide(add(exp(iz), exp(negate(iz))), TWO);
    }

    function Complex_expt_fn(b, p) {
        if (isZero(b)) {
            if (isZero(p))
                return isExact(b) && isExact(p) ? ONE : INEXACT_ONE;
            if (isPositive(realPart(p)))
                return isExact(p) ? b : INEXACT_ZERO;
            raise("&implementation-restriction",
                  "invalid power for zero expt", p);
        }
        return exp(multiply(log(b), p));
    }
    function Complex_asin_fn(z) {
        return multiply(MINUS_I,
                        log(add(multiply(I, z),
                                sqrt(subtract(ONE, square(z))))));
    }

    function Complex_acos_fn(z) {
        return subtract(divide(PI, TWO), Complex_asin_fn(z));
    }

    function Complex_atan_fn(z) {
        var iz = multiply(I, z);
        return multiply(divide(subtract(log(add(ONE, iz)),
                                        log(subtract(ONE, iz))), TWO),
                        MINUS_I);
    }

    function Complex_log_fn(z) {
        return makeRectangular(log(magnitude(z)), angle(z));
    }

    function Complex_expt(p) { return Complex_expt_fn(this, p); }
    function Complex_asin()  { return Complex_asin_fn(this); }
    function Complex_acos()  { return Complex_acos_fn(this); }
    function Complex_atan()  { return Complex_atan_fn(this); }
    function Complex_log()   { return Complex_log_fn( this); }

    function Complex_valueOf() {
        if (isZero(imagPart(this)))
            return realPart(this).valueOf();
        return _NaN;
    }

    //
    // For Rectangular.
    //

    function xyToString(xString, yString) {
        if (yString[0] === '-' || yString[0] === '+')
            return xString + yString + "i";
        return xString + "+" + yString + "i";
    }

    function Complex_numberToString(radix, precision) {
        return xyToString(numberToString(realPart(this), radix, precision),
                          numberToString(imagPart(this), radix, precision));
    }

    function Complex_toString(radix) {
        radix = radix || 10;
        return xyToString(realPart(this).toString(radix),
                          imagPart(this).toString(radix));
    }

    function Complex_toFixed(dig) {
        return xyToString(realPart(this).toFixed(dig),
                          imagPart(this).toFixed(dig));
    }
    function Complex_toExponential(dig) {
        return xyToString(realPart(this).toExponential(dig),
                          imagPart(this).toExponential(dig));
    }
    function Complex_toPrecision(prec) {
        return xyToString(realPart(this).toPrecision(prec),
                          imagPart(this).toPrecision(prec));
    }

    function Complex_toInexact() {
        if (isInexact(this))
            return this;
        return inexactRectangular(toInexact(realPart(this)),
                                  toInexact(imagPart(this)));
    }

    function Complex_toExact() {
        if (isExact(this))
            return this;
        return exactRectangular(toExact(realPart(this)),
                                toExact(imagPart(this)));
    }

    function Complex_isZero() {
        return isZero(realPart(this)) && isZero(imagPart(this));
    }

    function Complex_magnitude() {
        var x = realPart(this), y = imagPart(this);
        if (isZero(x))
            return abs(y);
        if (isZero(y))
            return abs(x);
        return sqrt(add(square(x), square(y)));
    }

    function Complex_angle() {
        return atan2(imagPart(this), realPart(this));
    }

    function Complex_eq(z) {
        return (eq(realPart(this), realPart(z)) &&
                eq(imagPart(this), imagPart(z)));
    }
    function Complex_eq_Real(x) {
        return isZero(imagPart(this)) && eq(x, realPart(this));
    }
    function Real_eq_Complex(z) {
        return isZero(imagPart(z)) && eq(realPart(z), this);
    }

    function Complex_ne(z) {
        return (ne(realPart(this), realPart(z)) ||
                ne(imagPart(this), imagPart(z)));
    }
    function Complex_ne_Real(x) {
        return !isZero(imagPart(this)) || ne(x, realPart(this));
    }
    function Real_ne_Complex(z) {
        return !isZero(imagPart(z)) || ne(realPart(z), this);
    }

    function Real_add_Complex(z) {
        return makeRectangular(add(this, realPart(z)), imagPart(z));
    }
    function Complex_add_Real(x) {
        return makeRectangular(add(realPart(this), x), imagPart(this));
    }
    function Complex_add(z) {
        return makeRectangular(add(realPart(this), realPart(z)),
                               add(imagPart(this), imagPart(z)));
    }

    function Real_subtract_Complex(z) {
        return makeRectangular(subtract(this, realPart(z)),
                               negate(imagPart(z)));
    }
    function Complex_subtract_Real(x) {
        return makeRectangular(subtract(realPart(this), x), imagPart(this));
    }
    function Complex_subtract(z) {
        return makeRectangular(subtract(realPart(this), realPart(z)),
                               subtract(imagPart(this), imagPart(z)));
    }

    function Complex_negate() {
        return makeRectangular(negate(realPart(this)), negate(imagPart(this)));
    }

    function complexMultiply(ax, ay, bx, by) {
        return makeRectangular(subtract(multiply(ax, bx), multiply(ay, by)),
                               add(     multiply(ax, by), multiply(ay, bx)));
    }

    function Real_multiply_Complex(z) {
        return makeRectangular(multiply(realPart(z), this),
                               multiply(imagPart(z), this));
    }
    function Complex_multiply_Real(x) {
        return makeRectangular(multiply(realPart(this), x),
                               multiply(imagPart(this), x));
    }
    function Complex_multiply(z) {
        return complexMultiply(realPart(this), imagPart(this), realPart(z),
                               imagPart(z));
    }

    function Complex_divide_Real(x) {
        return makeRectangular(divide(realPart(this), x),
                               divide(imagPart(this), x));
    }

    function Complex_square() {
        var x = realPart(this), y = imagPart(this);
        var xy = multiply(x, y);
        return makeRectangular(subtract(square(x), square(y)), add(xy, xy));
    }

    function Complex_reciprocal() {
        var x = realPart(this), y = imagPart(this);
        var m2 = add(square(x), square(y));
        return makeRectangular(divide(x, m2), negate(divide(y, m2)));
    }

    function complexDivide(x, y, z) {  // returns (x + iy) / z
        var zx = realPart(z), zy = imagPart(z);
        var m2 = add(square(zx), square(zy));
        return complexMultiply(x, y, divide(zx, m2), negate(divide(zy, m2)));
    }

    function Real_divide_Complex(z) {
        return complexDivide(this, isExact(this) ? ZERO : INEXACT_ZERO, z);
    }
    function Complex_divide(z) {
        return complexDivide(realPart(this), imagPart(this), z);
    }

    //
    // For flonums.  Could be used by an exact binary rational type.
    // Useful for anyone who needs to inspect native nums, like
    // frexp() in C.  Keep in core for now.
    //

    function numberToBinary(x) {
        return Number_toString(x, 2);
    }

    function nativeDenominatorLog2(x) {
        //assert(typeof x === "number");
        //assert(SN_isFinite(x));
        var s = numberToBinary(Math_abs(x));
        var i = String_indexOf(s, ".");
        if (i === -1)
            return 0;
        return s.length - i - 1;
    }

    function nativeDenominator(x) {
        // Get the "denominator" of a floating point value.
        // The result will be a power of 2.
        //assert(SN_isFinite(x));
        return Math_pow(2, nativeDenominatorLog2(x));
    }

    //
    // For lazy implementors.  Put in separate library.
    //

    function square_via_multiply() {
        return multiply(this, this);
    }
    function isInexact_via_isExact() {
        return !isExact(this);
    }
    function ne_via_eq(n) {
        return !eq(this, n);
    }
    function subtract_via_negate_add(n) {
        return add(this, negate(n));
    }
    function divide_via_reciprocal_multiply(n) {
        return multiply(this, reciprocal(n));
    }

    function complex_or_exact_expt(n) {
        if (isExact(this))
            return expt_N_EI_fn(this, n);
        return Complex_expt_fn(this, n);
    }
    function tan_via_divide_sin_cos() {
        return divide(sin(this), cos(this));
    }

    function isUnit_via_eq() {
        return eq(ONE, this) || eq(MINUS_ONE, this);
    }
    function Real_magnitude_via_abs() {
        return abs(this);
    }
    function InexactReal_angle_via_isNegative() {
        return isNegative(this) ? PI : INEXACT_ZERO;
    }
    function ExactReal_angle_via_isNegative() {
        return isNegative(this) ? PI : ZERO;
    }

    function isPositive_via_sign() { return sign(this) > 0; }
    function isNegative_via_sign() { return sign(this) < 0; }
    function isZero_via_sign()     { return sign(this) === 0; }
    function sign_via_compare()    { return compare(this, ZERO); }

    function eq_via_compare(x) { return compare(this, x) === 0; };
    function ne_via_compare(x) { return compare(this, x) !== 0; };
    function gt_via_compare(x) { return compare(this, x) > 0; };
    function lt_via_compare(x) { return compare(this, x) < 0; };
    function ge_via_compare(x) { return compare(this, x) >= 0; };
    function le_via_compare(x) { return compare(this, x) <= 0; };

    function div_R_R(x, y) {
        return (isNegative(y) ? ceiling(divide(x, y)) : floor(divide(x, y)));
    }
    function divAndMod_via_divide_floor(y) {
        var div = div_R_R(this, y);
        return [div, subtract(this, multiply(div, y))];
    }
    function div_via_divide_floor(y) {
        return div_R_R(this, y);
    }
    function mod_via_divide_floor(y) {
        return subtract(this, multiply(div_R_R(this, y), y));
    }

    function abs_via_isNegative_negate() {
        return isNegative(this) ? negate(this) : this;
    }

    function ceiling_via_floor() {
        return isInteger(this) ? this : add(ONE, floor(this));
    }
    function truncate_via_ceiling_floor() {
        return isNegative(this) ? ceiling(this) : floor(this);
    }
    function round_via_floor_compare_isEven() {
        var ret = floor(this);
        var diff = subtract(this, ret);
        var twice = add(diff, diff);
        switch (compare(twice, ONE)) {
        case -1: return ret;
        case  1: return add(ONE, ret);
        case 0: default: return (isEven(ret) ? ret : add(ONE, ret));
        }
    }

    function divideReduced_via_isUnit(d) {
        //assert(isPositive(this));
        if (isUnit(d))
            return this;
        return divideReducedNotByOne(this, d);
    }

    function Integer_divide_via_gcd_div(d) {
        //assert(!isZero(d))
        //require('repl').start();
        var n = this;
        var g = gcdNonnegative(abs(d), abs(n));
        n = div(n, g);
        d = div(d, g);
        if (isNegative(d)) {
            n = negate(n);
            d = negate(d);
        }
        return (isUnit(d) ? n : divideReducedNotByOne(n, d));
    }

    function Integer_reciprocal_via_divideReduced() {
        switch (sign(this)) {
        case -1: return divideReduced(MINUS_ONE, negate(this));
        case 1:  return divideReduced(ONE, this);
        case 0: default: return raiseDivisionByExactZero();
        }
    }

    //
    // Pretty generic exact rational output impl.
    //
    // Assumes numerator(this) !== this.
    function ExactRational_numberToString(radix) {
        var nd = numeratorAndDenominator(this);
        var n = nd[0], d = nd[1];
        if (isUnit(d))
            return numberToString(n, radix);
        return (numberToString(n, radix) +
                "/" + numberToString(d, radix));
    }

    function Integer_numeratorAndDenominator() {
        return [this, ONE];
    }

    //
    // For lazy implementors.
    //

    function genericExp10(p) {
        return multiply(this, expt_N_EI_fn(nativeToExactInteger(10), p));
    }

    function expt_N_EI_fn(z, p) {
        // Return z raised to the power of integer p.
        var bits = abs(p);
        var squarer = z;
        var ret = ONE;
        var dm;
        while (isPositive(bits)) {
            dm = divAndMod(bits, TWO);
            bits = dm[0];
            if (!isZero(dm[1]))
                ret = multiply(ret, squarer);
            squarer = square(squarer);
        }
        return (isNegative(p) ? reciprocal(ret) : ret);
    }
    function expt_N_EI(p) {
        return expt_N_EI_fn(this, p);
    }

    function gcdNonnegative_via_isZero_mod(b) {
        var a = this;
        //assert(!isNegative(a));
        //assert(!isNegative(b));
        var c;
        while (!isZero(a)) {
            c = a;
            a = mod(b, a);
            b = c;
        }
        return b;
    }

    function bitwiseNot_via_subtract() {
        return subtract(MINUS_ONE, this);
    }

    //
    // For ECMAScript Number formatting methods.
    //

    function zeroes(count) {
        var ret = String_substring("000000000000000", 0, count & 15);
        if (count > 15) {
            ret += Array_join(new g.Array((count >> 4) + 1),
                              "0000000000000000");
        }
        return ret;
    }

    // Specified by ECMA-262, 5th edition, 15.7.4.5.
    function Real_toFixed(fractionDigits) {
        var f = (fractionDigits === _undefined ? 0 :
                 _parseInt(fractionDigits, 10));
        if (f > SchemeNumber.maxIntegerDigits)
            throw new RangeError("fractionDigits exceeds " +
                                 "SchemeNumber.maxIntegerDigits: " +
                                 fractionDigits);

        var x = this;
        var s = "";
        if (isNegative(x)) {
            x = negate(x);
            s = "-";
        }

        var p = exp10(ONE, nativeToExactInteger(-f));
        var dm = divAndMod(x, p);
        var n = dm[0];
        if (ge(add(dm[1], dm[1]), p))
            n = add(ONE, n);
        if (isZero(n))
            return s + "0" +
                (fractionDigits > 0 ? "." + zeroes(fractionDigits) : "");
        n = numberToString(n);
        if (f === 0)
            return s + n;

        var z = f - n.length;
        if (f > 0) {
            if (z >= 0)
                n = zeroes(z + 1) + n;
            var point = n.length - f;
            return s + String_substring(n, 0, point) + "." +
                String_substring(n, point);
        }
        return s + n + zeroes(-f);
    }

    function Real_toExponential(fractionDigits) {
        var f = (fractionDigits === _undefined ? 20 :
                 _parseInt(fractionDigits, 10));
        if (f < 0)
            throw new RangeError("SchemeNumber toExponential: negative " +
                                 "argument: " + f);
        if (f > SchemeNumber.maxIntegerDigits)
            throw new RangeError("fractionDigits exceeds " +
                                 "SchemeNumber.maxIntegerDigits: " +
                                 fractionDigits);

        var x = this;
        var s = "";
        if (isNegative(x)) {
            x = negate(x);
            s = "-";
        }
        else if (isZero(x))
            return "0" + (fractionDigits > 0 ? "." + zeroes(f) : "") + "e+0";

        var e = Math_floor(log(x) / Math_LN10);
        var p = exp10(ONE, nativeToExactInteger(e - f));
        var dm = divAndMod(x, p);
        var n = dm[0];
        if (ge(add(dm[1], dm[1]), p))
            n = add(ONE, n);
        n = numberToString(n);

        // Adjust for inaccuracy in log().
        if (n.length != f + 1) {
            //console.log("Guessed wrong length: " + n.length + " != " + (f + 1));
            e += n.length - (f + 1);
            p = exp10(ONE, nativeToExactInteger(e - f));
            dm = divAndMod(x, p);
            n = dm[0];
            if (ge(add(dm[1], dm[1]), p))
                n = add(ONE, n);
            n = numberToString(n);
            if (n.length != f + 1)
                // Can not format as exponential.
                return numberToString(this);
        }

        if (fractionDigits === _undefined)
            n = String_replace(n, /(\d)0+$/, "$1");
        if (n.length > 1)
            n = n[0] + "." + String_substring(n, 1);
        return s + n + "e" + (e < 0 ? "" : "+") + e;
    }

    function Real_toPrecision(precision) {
        var p, x;
        if (precision === _undefined) {
            x = toInexact(this);
            if (SN_isFinite(x))
                return Number_toString(+x);
            p = 21;
        }
        else {
            p = _parseInt(precision, 10);
            if (p < 1)
                throw new RangeError("SchemeNumber toPrecision: expected a " +
                                     "positive precision, got: " + precision);
            if (p > SchemeNumber.maxIntegerDigits)
                throw new RangeError("precision exceeds " +
                                     "SchemeNumber.maxIntegerDigits: " +
                                     precision);
        }

        x = this;
        var s = "";
        if (isNegative(x)) {
            x = negate(x);
            s = "-";
        }
        else if (isZero(x))
            return "0" + (p > 1 ? "." + zeroes(p - 1) : "");

        var ret = x.toExponential(p - 1);
        var eIndex = String_indexOf(ret, 'e');
        var exponent = _parseInt(String_substring(ret, eIndex + 1), 10);
        if (exponent >= -6 && exponent < p) {
            if (exponent === 0)
                ret = String_substring(ret, 0, eIndex);
            else {
                ret = String_substring(ret, 0, 1)
                    + (String_indexOf(ret, '.') === -1 ? "" :
                       String_substring(ret, 2, eIndex));
                if (exponent < 0)
                    ret = "0." + zeroes(-1 - exponent) + ret;
                else if (exponent < p - 1)
                    ret = (String_substring(ret, 0, exponent + 1) + "." +
                           String_substring(ret, exponent + 1));
            }
        }
        else if (precision === _undefined) {
            ret = String_replace(String_substring(ret, 0, eIndex), /\.?0+/, "")
                + String_substring(ret, eIndex);
        }

        return s + ret;
    }

    //
    // End library function definitions.
    //

    api.Complex_sqrt             = Complex_sqrt;
    api.Complex_exp              = Complex_exp;
    api.Complex_sin              = Complex_sin;
    api.Complex_cos              = Complex_cos;
    api.Complex_expt_fn          = Complex_expt_fn;
    api.Complex_expt             = Complex_expt;
    api.Complex_asin_fn          = Complex_asin_fn;
    api.Complex_asin             = Complex_asin;
    api.Complex_acos_fn          = Complex_acos_fn;
    api.Complex_acos             = Complex_acos;
    api.Complex_atan_fn          = Complex_atan_fn;
    api.Complex_atan             = Complex_atan;
    api.Complex_log_fn           = Complex_log_fn;
    api.Complex_log              = Complex_log;

    api.Complex_numberToString   = Complex_numberToString;
    api.Complex_toString         = Complex_toString;
    api.Complex_toFixed          = Complex_toFixed;
    api.Complex_toExponential    = Complex_toExponential;
    api.Complex_toPrecision      = Complex_toPrecision;
    api.Complex_toInexact        = Complex_toInexact;
    api.Complex_toExact          = Complex_toExact;
    api.Complex_isZero           = Complex_isZero;
    api.Complex_magnitude        = Complex_magnitude;
    api.Complex_angle            = Complex_angle;
    api.Complex_eq               = Complex_eq;
    api.Complex_eq_Real          = Complex_eq_Real;
    api.Real_eq_Complex          = Real_eq_Complex;
    api.Complex_ne               = Complex_ne;
    api.Complex_ne_Real          = Complex_ne_Real;
    api.Real_ne_Complex          = Real_ne_Complex;
    api.Real_add_Complex         = Real_add_Complex;
    api.Complex_add_Real         = Complex_add_Real;
    api.Complex_add              = Complex_add;
    api.Real_subtract_Complex    = Real_subtract_Complex;
    api.Complex_subtract_Real    = Complex_subtract_Real;
    api.Complex_subtract         = Complex_subtract;
    api.Complex_negate           = Complex_negate;
    api.Real_multiply_Complex    = Real_multiply_Complex;
    api.Complex_multiply_Real    = Complex_multiply_Real;
    api.Complex_multiply         = Complex_multiply;
    api.Complex_divide_Real      = Complex_divide_Real;
    api.Complex_square           = Complex_square;
    api.Complex_reciprocal       = Complex_reciprocal;
    api.Real_divide_Complex      = Real_divide_Complex;
    api.Complex_divide           = Complex_divide;

    api.numberToBinary           = numberToBinary;
    api.nativeDenominatorLog2    = nativeDenominatorLog2;
    api.nativeDenominator        = nativeDenominator;

    api.square_via_multiply      = square_via_multiply;
    api.isInexact_via_isExact    = isInexact_via_isExact;
    api.ne_via_eq                = ne_via_eq;
    api.subtract_via_negate_add  = subtract_via_negate_add;
    api.divide_via_reciprocal_multiply= divide_via_reciprocal_multiply;
    api.complex_or_exact_expt    = complex_or_exact_expt;
    api.tan_via_divide_sin_cos   = tan_via_divide_sin_cos;
    api.isUnit_via_eq            = isUnit_via_eq;
    api.Real_magnitude_via_abs   = Real_magnitude_via_abs;
    api.InexactReal_angle_via_isNegative= InexactReal_angle_via_isNegative;
    api.ExactReal_angle_via_isNegative= ExactReal_angle_via_isNegative;
    api.isPositive_via_sign      = isPositive_via_sign;
    api.isNegative_via_sign      = isNegative_via_sign;
    api.isZero_via_sign          = isZero_via_sign;
    api.sign_via_compare         = sign_via_compare;
    api.eq_via_compare           = eq_via_compare;
    api.ne_via_compare           = ne_via_compare;
    api.gt_via_compare           = gt_via_compare;
    api.lt_via_compare           = lt_via_compare;
    api.ge_via_compare           = ge_via_compare;
    api.le_via_compare           = le_via_compare;
    api.divAndMod_via_divide_floor= divAndMod_via_divide_floor;
    api.div_via_divide_floor     = div_via_divide_floor;
    api.mod_via_divide_floor     = mod_via_divide_floor;
    api.abs_via_isNegative_negate= abs_via_isNegative_negate;
    api.ceiling_via_floor        = ceiling_via_floor;
    api.truncate_via_ceiling_floor= truncate_via_ceiling_floor;
    api.round_via_floor_compare_isEven= round_via_floor_compare_isEven;

    api.divideReduced_via_isUnit = divideReduced_via_isUnit;
    api.Integer_divide_via_gcd_div= Integer_divide_via_gcd_div;
    api.Integer_reciprocal_via_divideReduced
        = Integer_reciprocal_via_divideReduced;
    api.ExactRational_numberToString= ExactRational_numberToString;
    api.Integer_numeratorAndDenominator= Integer_numeratorAndDenominator;

    api.genericExp10             = genericExp10;
    api.expt_N_EI_fn             = expt_N_EI_fn;
    api.expt_N_EI                = expt_N_EI;
    api.gcdNonnegative_via_isZero_mod= gcdNonnegative_via_isZero_mod;
    api.bitwiseNot_via_subtract  = bitwiseNot_via_subtract;

    api.Real_toFixed             = Real_toFixed;
    api.Real_toExponential       = Real_toExponential;
    api.Real_toPrecision         = Real_toPrecision;
    api.Complex_valueOf          = Complex_valueOf;

    return api;
}


/*
    Function: installGenericFunctions(plugins)
    <installGenericFunctions> specifies definitions of many generic
    functions in terms of other generic facilities, reducing the
    minimum requirements of number implementations.

    Input:

    *plugins* shall be a <PluginContainer> containing the output of
    <defineGenericFunctions> and <implementPluginLibrary>

    Output:

    Output is in the form of generic function definitions using the
    classes defined by <defineAbstractTypes>.
*/
function installGenericFunctions(plugins) {
    "use strict";

    var SchemeNumberType         = plugins.get("SchemeNumberType");
    var Complex                  = plugins.get("Complex");
    var Real                     = plugins.get("Real");
    var InexactReal              = plugins.get("InexactReal");
    var ExactReal                = plugins.get("ExactReal");
    var ExactRational            = plugins.get("ExactRational");
    var ExactInteger             = plugins.get("ExactInteger");

    var raise = plugins.get("raise");
    function def(generic, types, impl) {
        var gen = plugins.get(generic);
        if (!gen)
            return;
        var fn = undefined;
        if (impl) {
            fn = plugins.get(impl);
            if (!fn) {
                console.log(impl + " not defined");
                return;
            }
        }
        gen.def.apply(gen.def, types.concat(fn));
    }

    def("expt",      [SchemeNumberType, ExactInteger], "expt_N_EI");
    def("square",    [SchemeNumberType], "square_via_multiply");
    def("isInexact", [SchemeNumberType], "isInexact_via_isExact");
    def("ne",        [SchemeNumberType, SchemeNumberType], "ne_via_eq");
    def("subtract",  [SchemeNumberType, SchemeNumberType],
        "subtract_via_negate_add");
    def("divide",    [SchemeNumberType, SchemeNumberType],
        "divide_via_reciprocal_multiply");

    def("isComplex", [Complex], "retTrue");
    def("numberToString", [Complex], "Complex_numberToString");
    def("sqrt",      [Complex], "Complex_sqrt");
    def("exp",       [Complex], "Complex_exp");
    def("log",       [Complex], "Complex_log");
    def("sin",       [Complex], "Complex_sin");
    def("cos",       [Complex], "Complex_cos");
    def("tan",       [Complex], "tan_via_divide_sin_cos");
    def("asin",      [Complex], "Complex_asin");
    def("acos",      [Complex], "Complex_acos");
    def("atan",      [Complex], "Complex_atan");

    def("toInexact", [Complex], "Complex_toInexact");
    def("toExact",   [Complex], "Complex_toExact");
    def("isZero",    [Complex], "Complex_isZero");
    def("magnitude", [Complex], "Complex_magnitude");
    def("angle",     [Complex], "Complex_angle");
    def("eq",        [Complex, Complex], "Complex_eq");
    def("eq",        [Complex, Real], "Complex_eq_Real");
    def("eq",        [Real, Complex], "Real_eq_Complex");
    def("ne",        [Complex, Complex], "Complex_ne");
    def("ne",        [Complex, Real], "Complex_ne_Real");
    def("ne",        [Real, Complex], "Real_ne_Complex");
    def("add",       [Real, Complex], "Real_add_Complex");
    def("add",       [Complex, Real], "Complex_add_Real");
    def("add",       [Complex, Complex], "Complex_add");
    def("subtract",  [Real, Complex], "Real_subtract_Complex");
    def("subtract",  [Complex, Real], "Complex_subtract_Real");
    def("subtract",  [Complex, Complex], "Complex_subtract");
    def("negate",    [Complex], "Complex_negate");
    def("multiply",  [Real, Complex], "Real_multiply_Complex");
    def("multiply",  [Complex, Real], "Complex_multiply_Real");
    def("multiply",  [Complex, Complex], "Complex_multiply");
    def("divide",    [Complex, Real], "Complex_divide_Real");
    def("square",    [Complex], "Complex_square");
    def("reciprocal",[Complex], "Complex_reciprocal");
    def("divide",    [Real, Complex], "Real_divide_Complex");
    def("divide",    [Complex, Complex], "Complex_divide");

    def("isReal",     [Real], "retTrue");
    def("realPart",   [Real], "retThis");
    def("imagPart",   [Real], "retZero");
    def("conjugate",  [Real], "retThis");
    def("isUnit",     [Real], "isUnit_via_eq");
    def("magnitude",  [Real], "Real_magnitude_via_abs");
    def("isPositive", [Real], "isPositive_via_sign");
    def("isNegative", [Real], "isNegative_via_sign");
    def("isZero",     [Real], "isZero_via_sign");
    def("sign",       [Real], "sign_via_compare");
    def("eq", [Real, Real], "eq_via_compare");
    def("ne", [Real, Real], "ne_via_compare");
    def("gt", [Real, Real], "gt_via_compare");
    def("lt", [Real, Real], "lt_via_compare");
    def("ge", [Real, Real], "ge_via_compare");
    def("le", [Real, Real], "le_via_compare");
    def("divAndMod",  [Real, Real], "divAndMod_via_divide_floor");
    def("div",        [Real, Real], "div_via_divide_floor");
    def("mod",        [Real, Real], "mod_via_divide_floor");
    def("abs",        [Real], "abs_via_isNegative_negate");
    def("ceiling",    [Real], "ceiling_via_floor");
    def("truncate",   [Real], "truncate_via_ceiling_floor");
    def("round",      [Real], "round_via_floor_compare_isEven");

    def("isExact",   [InexactReal], "retFalse");
    def("isInexact", [InexactReal], "retTrue");
    def("toInexact", [InexactReal], "retThis");
    def("angle",     [InexactReal], "InexactReal_angle_via_isNegative");

    def("isExact",       [ExactReal], "retTrue");
    def("isInexact",     [ExactReal], "retFalse");
    def("toExact",       [ExactReal], "retThis");
    def("SN_isNaN",      [ExactReal], "retFalse");
    def("SN_isFinite",   [ExactReal], "retTrue");
    def("SN_isInfinite", [ExactReal], "retFalse");
    def("angle",         [ExactReal], "ExactReal_angle_via_isNegative");

    def("isRational",     [ExactRational], "retTrue");
    def("divideReduced",  [ExactInteger, ExactInteger],
        "divideReduced_via_isUnit");
    def("divide",   [ExactInteger, ExactInteger], "Integer_divide_via_gcd_div");
    def("reciprocal", [ExactInteger], "Integer_reciprocal_via_divideReduced");

    def("isInteger",      [ExactInteger], "retTrue");
    def("numerator",      [ExactInteger], "retThis");
    def("denominator",    [ExactInteger], "retOne");
    def("floor",          [ExactInteger], "retThis");
    def("ceiling",        [ExactInteger], "retThis");
    def("round",          [ExactInteger], "retThis");
    def("truncate",       [ExactInteger], "retThis");
    def("exp10",          [ExactInteger], "genericExp10");
    def("gcdNonnegative", [ExactInteger, ExactInteger],
        "gcdNonnegative_via_isZero_mod");

    def("bitwiseNot",     [ExactInteger], "bitwiseNot_via_subtract");

    // The following expt definition is invalid for (ExactReal, ExactInteger)...
    def("expt", [Complex, Complex], "Complex_expt");

    // ... so override it.
    def("expt", [ExactReal, ExactInteger], "expt_N_EI");

    // Avoid lots of work for inexact bases.
    def("expt", [Complex, ExactInteger], "complex_or_exact_expt");

    def("numberToString", [ExactRational], "ExactRational_numberToString");
    def("numberToString", [ExactInteger], undefined);
    def("numeratorAndDenominator", [ExactInteger],
        "Integer_numeratorAndDenominator");
}


/*
    Function: installEcmaMethods(plugins)

    <installEcmaMethods> defines the methods *toFixed*,
    *toExponential*, and *toPrecision* (specified by ECMAScript for
    *Number*) on exact reals.

    It defines the *valueOf* method on class *Complex* in terms of the
    same method on *Real*, but then overrides the method on *Real*
    with a generic one returning *NaN* to avoid recursion.  Complex
    *valueOf* returns *NaN* in every case except where the imaginary
    part equals 0.  Thus, for example, *5.0+0.0i* converts to native
    *5*.

    *ExactReal*, *Complex*, and *Real*, from <defineAbstractTypes>,
    are required when <installEcmaMethods> is called.  So are
    *Real_toFixed*, *Real_toExponential*, *Real_toPrecision*,
    *Complex_valueOf*, and *retNaN* from <implementPluginLibrary>.
*/
function installEcmaMethods(plugins) {
    "use strict";
    var N             = plugins.get("SchemeNumberType");
    var ExactReal     = plugins.get("ExactReal");
    var Complex       = plugins.get("Complex");
    var Real          = plugins.get("Real");
    var ExactRational = plugins.get("ExactRational");

    // XXX should not install if not defined.

    Complex.prototype.valueOf       = plugins.get("Complex_valueOf");
    Complex.prototype.toString      = plugins.get("Complex_toString");
    Complex.prototype.toFixed       = plugins.get("Complex_toFixed");
    Complex.prototype.toExponential = plugins.get("Complex_toExponential");
    Complex.prototype.toPrecision   = plugins.get("Complex_toPrecision");

    // If Real inherits these from Complex, they will loop infinitely.
    Real.prototype.valueOf        = N.prototype.valueOf;
    Real.prototype.toFixed        = N.prototype.toFixed;
    Real.prototype.toExponential  = N.prototype.toExponential;
    Real.prototype.toPrecision    = N.prototype.toPrecision;
    Real.prototype.toString       = N.prototype.toString;

    ExactReal.prototype.toFixed       = plugins.get("Real_toFixed");
    ExactReal.prototype.toExponential = plugins.get("Real_toExponential");
    ExactReal.prototype.toPrecision   = plugins.get("Real_toPrecision");
}

function makeBase() {
    var SchemeNumber = makeMinimalBase();
    var plugins = SchemeNumber.plugins;

    SchemeNumber.makeMinimalBase = makeMinimalBase;
    SchemeNumber.makeBase = makeBase;

    plugins.extend(implementPluginLibrary(plugins));
    plugins.extend(defineAbstractTypes(plugins));
    installAbstractTypes(plugins);
    installStubFunctions(plugins);

    installGenericFunctions(plugins);
    installEcmaMethods(plugins);

    return SchemeNumber;
}

/*
    Function: installDefaultExactInteger(plugins, convert)
    Allows multiple exact integer implementations to interoperate
    via conversion to a default one.

    *convert* must be a function that accepts an ExactInteger and
    returns an equivalent value of standard type.  The following
    generic functions must be specialized for the standard type:
    compare add subtract multiply expt divAndMod div mod.
*/
function installDefaultExactInteger(plugins, convert) {
    var ExactInteger = plugins.get("ExactInteger");

    function def(name) {
        var func = plugins.get(name);
        function EI_func(n) {
            return func(convert(this), convert(n));
        }
        func.def(ExactInteger, ExactInteger, EI_func);
    }

    // XXX Should avoid defining on ExactInteger ops that the
    // implementation class does not specialize.
    def("compare");
    def("add");
    def("subtract");
    def("multiply");
    def("expt");
    def("divAndMod");
    def("div");
    def("mod");
    def("gcdNonnegative");

    plugins.extend("canonicalExactInteger", convert);
}

function installDefaultRational(plugins, convert, divideReduced) {
    var ExactInteger = plugins.get("ExactInteger");
    var ExactRational = plugins.get("ExactRational");

    function def(name) {
        var func = plugins.get(name);
        function EQ_func(n) {
            return func(convert(this), convert(n));
        }
        func.def(ExactRational, ExactRational, EQ_func);
    }

    // XXX Should avoid defining on ExactRational ops that the
    // implementation class does not specialize.
    def("compare");
    def("add");
    def("subtract");
    def("multiply");
    def("divide");

    function EI_divideReduced(n) {
        return divideReduced(this, n);
    }

    plugins.get("divideReduced").def(ExactInteger, ExactInteger,
                                     EI_divideReduced);

    plugins.extend("canonicalRational", convert);
}

/*
    Function: implementNativeInexactReal(plugins)
    Returns a collection of functions implementing inexact reals as
    native numbers.

    The functions return native numbers wrapped in a
    <NativeInexactReal> object.  The object trivially implements the
    standard *toString* and formatting methods by forwarding them to
    the corresponding functions from *Number.prototype*.  The purpose
    of wrapping numbers this way is to provide a method space other
    than *Number.prototype* in which to insert properties supporting
    Scheme functions.

    Output:

    parseInexact - function(sign, string) -> SchemeNumber
    As required by <implementPluginLibrary>.

    nativeToInexact - function(number) -> SchemeNumber
    As required by <implementSchemeNumber>.

    NativeInexactReal - constructor of values returned by functions
    defined in <implementNativeInexactReal>.  Inherits from
    <InexactReal>.

    NativeInexactReal_debug - function() -> string
    Specialization of the <debug> function for the <NativeInexactReal>
    type.

    Native_log - function(number) -> SchemeNumber
    Returns the log of *number* as a <NativeInexactReal>.

    Native_sqrt - function(number) -> SchemeNumber
    Returns the sqrt of *number* as a <NativeInexactReal>.

    Native_atan2 - function(y, x) -> SchemeNumber
    *y* and *x* are native numbers.  Returns *atan2(y, x)* as a
    <NativeInexactReal>.

    Native_atan - function(number) -> SchemeNumber
    Returns the atan of *number* as a <NativeInexactReal>.

    Native_cos - function(number) -> SchemeNumber
    Returns the cos of *number* as a <NativeInexactReal>.

    Native_sin - function(number) -> SchemeNumber
    Returns the sin of *number* as a <NativeInexactReal>.

    Native_tan - function(number) -> SchemeNumber
    Returns the tan of *number* as a <NativeInexactReal>.

    Native_exp - function(number) -> SchemeNumber
    Returns the exp of *number* as a <NativeInexactReal>.

    Native_abs - function(number) -> SchemeNumber
    Returns the abs of *number* as a <NativeInexactReal>.

    Native_floor - function(number) -> SchemeNumber
    Returns the floor of *number* as a <NativeInexactReal>.

    Native_ceil - function(number) -> SchemeNumber
    Returns the ceil of *number* as a <NativeInexactReal>.

    Native_pow - function(base, power) -> SchemeNumber
    *base* and *power* are native numbers.  Returns the *number* to
    the *power* as a <NativeInexactReal>.

    Flonum_debug - function() -> string
*/
function implementNativeInexactReal(plugins) {
    "use strict";
    var g = plugins.get("es5globals");
    var uncurry = plugins.get("uncurry");
    var InexactReal = plugins.get("InexactReal");
    var api = g.Object.create(null);

    var Number_toFixed        = uncurry(g.Number.prototype.toFixed);
    var Number_toExponential  = uncurry(g.Number.prototype.toExponential);
    var Number_toPrecision    = uncurry(g.Number.prototype.toPrecision);
    var Number_toString       = uncurry(g.Number.prototype.toString);
    var Number_toLocaleString = uncurry(g.Number.prototype.toLocaleString);
    var _parseFloat = g.parseFloat;

    function NativeInexactReal(x) {
        this._ = x;
    }
    NativeInexactReal.prototype = new InexactReal();

    function NativeInexactReal_debug() {
        return "NativeInexact(" + this._ + ")";
    }

    function valueOf() {
        return this._;
    }
    function toFixed(digits) {
        return Number_toFixed(this._, digits);
    }
    function toExponential(digits) {
        return Number_toExponential(this._, digits);
    }
    function toPrecision(precision) {
        return Number_toPrecision(this._, precision);
    }
    function toString(radix) {
        return Number_toString(this._, radix);
    }
    function toLocaleString() {
        return Number_toLocaleString(this._);
    }

    NativeInexactReal.prototype.valueOf        = valueOf;
    NativeInexactReal.prototype.toFixed        = toFixed;
    NativeInexactReal.prototype.toExponential  = toExponential;
    NativeInexactReal.prototype.toPrecision    = toPrecision;
    NativeInexactReal.prototype.toString       = toString;
    NativeInexactReal.prototype.toLocaleString = toLocaleString;

    var Flonum = NativeInexactReal;

    var INEXACT_ZERO = new NativeInexactReal(0);
    function nativeToInexact(x) {
        //assert(typeof x === "number");
        return (x === 0 ? INEXACT_ZERO : new NativeInexactReal(x));
    }

    function parseInexact(sign, string) {
        return nativeToInexact(sign * _parseFloat(string));
    }

    function defNative(name) {
        var math = g.Math[name];
        function nativeMath1(a) {
            return nativeToInexact(math(a));
        }
        function nativeMath2(a, b) {
            return nativeToInexact(math(a, b));
        }
        api["Native_" + name] = (math.length === 1 ? nativeMath1 : nativeMath2);
    }

    defNative("log");
    defNative("sqrt");
    defNative("atan2");
    defNative("atan");
    defNative("cos");
    defNative("sin");
    defNative("tan");
    defNative("exp");
    defNative("abs");
    defNative("floor");
    defNative("ceil");
    defNative("pow");

    api.parseInexact             = parseInexact;
    api.nativeToInexact          = nativeToInexact;
    api.NativeInexactReal        = NativeInexactReal;
    api.NativeInexactReal_debug  = NativeInexactReal_debug;
    return api;
}

/*
// Flonums as bare primitives, for people who don't mind adding
// properties to Number.prototype.
function implementPrimitiveInexactReal(plugins) {
    "use strict";
    var g = plugins.get("es5globals");
    var uncurry = plugins.get("uncurry");
    var api = g.Object.create(null);

    function parseInexact(sign, string) {
        return sign * _parseFloat(string);
    }

    function Number_debug() {
        return "PrimitiveInexact(" + this + ")";
    }

    function defNative(name) {
        api["Native_" + name] = g.Math[name];
    }

    defNative("log");
    defNative("sqrt");
    defNative("atan2");
    defNative("atan");
    defNative("cos");
    defNative("sin");
    defNative("tan");
    defNative("exp");
    defNative("abs");
    defNative("floor");
    defNative("ceil");
    defNative("pow");

    api.parseInexact             = parseInexact;
    api.nativeToInexact          = Number;
    api.NativeInexactReal        = Number;
    api.NativeInexactReal_debug  = Number_debug;
    return api;
}
*/

/*
    Function: implementNativeFlonumLibrary(plugins)
    Creates functions operating on Scheme inexact reals.

    The functions convert their arguments to native numbers using "+"
    (which invokes *valueOf()* when the arguments are not primitive
    numbers).

    Real_toInexact_via_primitive - function() -> InexactReal

    Flonum_add XXX incomplete.
*/
function implementNativeFlonumLibrary(plugins) {
    "use strict";
    var g = plugins.get("es5globals");
    var uncurry = plugins.get("uncurry");
    var api = g.Object.create(null);

    var String_indexOf   = uncurry(g.String.prototype.indexOf);
    var String_substring = uncurry(g.String.prototype.substring);
    var String_replace   = uncurry(g.String.prototype.replace);
    var Number_toString  = uncurry(g.Number.prototype.toString);

    // Squirrel away the native math library.  XXX could trim unused items.
    var Math_E       = g.Math.E;
    var Math_LN10    = g.Math.LN10;
    var Math_LN2     = g.Math.LN2;
    var Math_LOG2E   = g.Math.LOG2E;
    var Math_LOG10E  = g.Math.LOG10E;
    var Math_PI      = g.Math.PI;
    var Math_SQRT1_2 = g.Math.SQRT1_2;
    var Math_SQRT2   = g.Math.SQRT2;
    var Math_abs     = g.Math.abs;
    var Math_acos    = g.Math.acos;
    var Math_asin    = g.Math.asin;
    var Math_atan    = g.Math.atan;
    var Math_atan2   = g.Math.atan2;
    var Math_ceil    = g.Math.ceil;
    var Math_cos     = g.Math.cos;
    var Math_exp     = g.Math.exp;
    var Math_floor   = g.Math.floor;
    var Math_log     = g.Math.log;
    var Math_max     = g.Math.max;
    var Math_min     = g.Math.min;
    var Math_pow     = g.Math.pow;
    var Math_random  = g.Math.random;
    var Math_round   = g.Math.round;
    var Math_sin     = g.Math.sin;
    var Math_sqrt    = g.Math.sqrt;
    var Math_tan     = g.Math.tan;

    var _isFinite    = g.isFinite;
    var _isNaN       = g.isNaN;
    var _parseFloat  = g.parseFloat;
    var _undefined   = g.undefined;
    var _Number      = g.Number;

    var nativeToInexact, Native_log, Native_sqrt, Native_atan2,
        Native_atan, Native_cos, Native_sin, Native_tan, Native_exp,
        Native_abs, Native_floor, Native_ceil, Native_pow;
    var raise, inexactRectangular, INEXACT_ZERO, nativeToExactInteger, TWO, divideReducedNotByOne, numberToString, isExact, isInexact, toExact, toInexact, isRational, isInteger, isZero, negate, square, eq, ne, add, subtract, multiply, divide, expt, exp, sqrt, log, asin, acos, atan, sin, cos, tan, abs, isPositive, isNegative, sign, floor, ceiling, truncate, round, compare, gt, lt, ge, le, divAndMod, div, mod, atan2, numerator, denominator, isEven, isOdd, Complex_expt_fn, Complex_acos_fn, Complex_asin_fn, Complex_log_fn, numberToBinary, nativeDenominatorLog2, nativeDenominator;

    function onPluginsChanged(plugins) {
        // XXX Could require these prior to call.
        nativeToInexact          = plugins.get("nativeToInexact");
        Native_log               = plugins.get("Native_log");
        Native_sqrt              = plugins.get("Native_sqrt");
        Native_atan2             = plugins.get("Native_atan2");
        Native_atan              = plugins.get("Native_atan");
        Native_cos               = plugins.get("Native_cos");
        Native_sin               = plugins.get("Native_sin");
        Native_tan               = plugins.get("Native_tan");
        Native_exp               = plugins.get("Native_exp");
        Native_abs               = plugins.get("Native_abs");
        Native_floor             = plugins.get("Native_floor");
        Native_ceil              = plugins.get("Native_ceil");
        Native_pow               = plugins.get("Native_pow");

        raise                    = plugins.get("raise");
        inexactRectangular       = plugins.get("inexactRectangular");
        INEXACT_ZERO             = plugins.get("INEXACT_ZERO");
        nativeToExactInteger     = plugins.get("nativeToExactInteger");
        divideReducedNotByOne    = plugins.get("divideReducedNotByOne");
        TWO                      = plugins.get("TWO");

        numberToString           = plugins.get("numberToString");
        isExact                  = plugins.get("isExact");
        isInexact                = plugins.get("isInexact");
        toExact                  = plugins.get("toExact");
        toInexact                = plugins.get("toInexact");
        isRational               = plugins.get("isRational");
        isInteger                = plugins.get("isInteger");
        isZero                   = plugins.get("isZero");
        negate                   = plugins.get("negate");
        square                   = plugins.get("square");
        eq                       = plugins.get("eq");
        ne                       = plugins.get("ne");
        add                      = plugins.get("add");
        subtract                 = plugins.get("subtract");
        multiply                 = plugins.get("multiply");
        divide                   = plugins.get("divide");
        expt                     = plugins.get("expt");
        exp                      = plugins.get("exp");
        sqrt                     = plugins.get("sqrt");
        log                      = plugins.get("log");
        asin                     = plugins.get("asin");
        acos                     = plugins.get("acos");
        atan                     = plugins.get("atan");
        sin                      = plugins.get("sin");
        cos                      = plugins.get("cos");
        tan                      = plugins.get("tan");
        abs                      = plugins.get("abs");
        isPositive               = plugins.get("isPositive");
        isNegative               = plugins.get("isNegative");
        sign                     = plugins.get("sign");
        floor                    = plugins.get("floor");
        ceiling                  = plugins.get("ceiling");
        truncate                 = plugins.get("truncate");
        round                    = plugins.get("round");
        compare                  = plugins.get("compare");
        gt                       = plugins.get("gt");
        lt                       = plugins.get("lt");
        ge                       = plugins.get("ge");
        le                       = plugins.get("le");
        divAndMod                = plugins.get("divAndMod");
        div                      = plugins.get("div");
        mod                      = plugins.get("mod");
        atan2                    = plugins.get("atan2");
        numerator                = plugins.get("numerator");
        denominator              = plugins.get("denominator");
        isEven                   = plugins.get("isEven");
        isOdd                    = plugins.get("isOdd");

        Complex_expt_fn          = plugins.get("Complex_expt_fn");
        Complex_acos_fn          = plugins.get("Complex_acos_fn");
        Complex_asin_fn          = plugins.get("Complex_asin_fn");
        Complex_log_fn           = plugins.get("Complex_log_fn");
        numberToBinary           = plugins.get("numberToBinary");
        nativeDenominatorLog2    = plugins.get("nativeDenominatorLog2");
        nativeDenominator        = plugins.get("nativeDenominator");
    }
    plugins.onChange.subscribe(onPluginsChanged);
    onPluginsChanged(plugins);

    function Real_toInexact_via_Flonum() {
        return nativeToInexact(Number(this));
    }

    function Flonum_numberToString(radix, precision) {
        var t = (+this);
        if (radix && radix != 10 && _isFinite(t))
            return "#i" + numberToString(toExact(this), radix);

        if (!_isFinite(t)) {
            if (_isNaN(t))
                return("+nan.0");
            return (t > 0 ? "+inf.0" : "-inf.0");
        }

        var s = Number_toString(t);

        if (String_indexOf(s, '.') === -1) {
            // Force the result to contain a decimal point as per R6RS.
            var e = String_indexOf(s, 'e');
            if (e === -1)
                s += ".";
            else
                s = (String_substring(s, 0, e) + "." +
                     String_substring(s, e));
        }

        if (precision != _undefined) {
            if (precision < 53) {
                var bits = String_replace(
                    String_replace(
                        String_replace(
                            numberToBinary(+this),
                                /[-+.]/g, ""),
                            /^0+/, ""),
                        /0+$/, "").length;
                if (precision < bits)
                    precision = bits;
            }
            s += "|" + precision;
        }

        return s;
    }

    function Flonum_denominator() {
        var t = (+this);
        if (!_isFinite(t))
            raise("&assertion", "not a rational number", t);
        return Native_pow(2, nativeDenominatorLog2(t));
    }

    function Flonum_numerator() {
        var t = (+this);
        if (!_isFinite(t))
            raise("&assertion", "not a rational number", t);
        return nativeToInexact(this * nativeDenominator(t));
    }

    function Flonum_isInteger() {
        var t = (+this);
        return _isFinite(t) && t === Math_floor(t);
    }

    function Flonum_SN_isFinite() {
        return _isFinite(+this);
    }

    function Flonum_SN_isInfinite() {
        var t = (+this);
        return !_isFinite(t) && !_isNaN(t);
    }

    function Flonum_SN_isNaN() {
        return _isNaN(+this);
    }

    function Flonum_isZero()     { return (+this) === 0; }
    function Flonum_isPositive() { return (+this) > 0; }
    function Flonum_isNegative() { return (+this) < 0; }

    function Flonum_sign() {
        var t = (+this);
        return (t === 0 ? 0 : (t > 0 ? 1 : -1));
    }

    function Flonum_isEven() {
        //assert(Flonum_isInteger(this))
        return ((+this) & 1) === 0;
    }

    function Flonum_isOdd() {
        //assert(Flonum_isInteger(this))
        return ((+this) & 1) === 1;
    }

    function Flonum_eq(x) { return (+this) === (+x); }
    function Flonum_ne(x) { return (+this) !== (+x); }
    function Flonum_gt(x) { return (+this) > (+x); }
    function Flonum_lt(x) { return (+this) < (+x); }
    function Flonum_ge(x) { return (+this) >= (+x); }
    function Flonum_le(x) { return (+this) <= (+x); }

    function Flonum_compare(x) {
        var t = (+this);
        x = (+x);
        if (t === x) return 0;
        if (t < x) return -1;
        if (t > x) return 1;
        return NaN;
    }

    function Flonum_toExact() {
        var x = (+this);

        if (!_isFinite(x))
            raise("&implementation-violation",
                  "inexact argument has no reasonably close exact equivalent",
                  this);

        var d = nativeDenominator(x);
        var n;

        if (d === 1)
            return nativeToExactInteger(x);

        if (_isFinite(d)) {
            n = x * d;
            d = nativeToExactInteger(d);
        }
        else {
            // Denormal x.
            var dl2 = nativeDenominatorLog2(x);
            n = x * 9007199254740992;
            n *= natPow(2, dl2 - 53);
            d = expt(TWO, nativeToExactInteger(dl2));
        }
        //assert(_isFinite(n));
        return divideReducedNotByOne(nativeToExactInteger(n), d);
    }

    function Flonum_add(x)      { return nativeToInexact((+this) + (+x)); }
    function Flonum_subtract(x) { return nativeToInexact((+this) - (+x)); }
    function Flonum_multiply(x) { return nativeToInexact((+this) * (+x)); }
    function Flonum_divide(x)   { return nativeToInexact((+this) / (+x)); }

    function Flonum_negate() {
        return nativeToInexact(-(+this));
    }

    function Flonum_abs() {
        return nativeToInexact(Math_abs(+this));
    }

    function Flonum_reciprocal() {
        return nativeToInexact(1 / (+this));
    }

    function div_native(x, y) {
        //assert(_isFinite(x));
        //assert(y != 0);
        if (y > 0)
            return Math_floor(x / y);
        if (y < 0)
            return Math_ceil(x / y);
        return NaN;
    }
    function Flonum_divAndMod(y) {
        var x = (+this);
        y = (+y);
        var div = div_native(x, y);
        return [nativeToInexact(div), nativeToInexact(x - (y * div))];
    }
    function Flonum_div(y) {
        var x = (+this);
        y = (+y);
        return nativeToInexact(div_native(x, y));
    }
    function Flonum_mod(y) {
        var x = (+this);
        y = (+y);
        return nativeToInexact(x - y * div_native(x, y));
    }

    function Flonum_square() {
        var t = (+this);
        return nativeToInexact(t * t);
    }

    function Flonum_expt(x) {
        // Return this number to the power of x.
        var t = (+this);
        if (t < 0)
            return Complex_expt_fn(this, x);
        return Native_pow(t, x);
    }

    function Flonum_round() {
        var t = (+this);
        var ret = Math_floor(t);
        var diff = t - ret;
        if (diff < 0.5) return nativeToInexact(ret);
        if (diff > 0.5) return nativeToInexact(ret + 1);
        return nativeToInexact(2 * Math_round(t / 2));
    }

    function Flonum_truncate() {
        var t = (+this);
        return (t < 0 ? Native_ceil(t) : Native_floor(t));
    }

    function funcToMeth(fn) {
        return function() {
            return fn(+this);
        };
    }

    var Flonum_ceiling = funcToMeth(Native_ceil);
    var Flonum_floor   = funcToMeth(Native_floor);

    // These functions are always allowed to return inexact.  We, however,
    // override a few of these in ZERO and ONE.
    // sqrt exp log sin cos tan asin acos atan atan2

    var Flonum_atan = funcToMeth(Native_atan);
    var Flonum_cos  = funcToMeth(Native_cos);
    var Flonum_exp  = funcToMeth(Native_exp);
    var Flonum_sin  = funcToMeth(Native_sin);
    var Flonum_tan  = funcToMeth(Native_tan);

    function cplxFuncToMeth(mathFunc, complexFunc) {
        return function() {
            var t = (+this);
            var ret = mathFunc(t);
            if (_isNaN(ret))
                return complexFunc(this);
            return nativeToInexact(ret);
        };
    }
    var Flonum_acos = cplxFuncToMeth(Math_acos, Complex_acos_fn);
    var Flonum_asin = cplxFuncToMeth(Math_asin, Complex_asin_fn);

    function Flonum_log() {
        var x = (+this);
        if (x < 0)
            return Complex_log_fn(this);
        return Native_log(x);
    }

    function Flonum_sqrt() {
        var x = (+this);
        if (x >= 0)
            return Native_sqrt(x);
        if (_isNaN(x))
            return nativeToInexact(x);
        return inexactRectangular(INEXACT_ZERO, Native_sqrt(-x));
    }

    function Flonum_atan2(x) {
        return Native_atan2((+this), x);
    }

    api.Real_toInexact_via_Flonum= Real_toInexact_via_Flonum;
    api.Flonum_numberToString    = Flonum_numberToString;
    api.Flonum_isRational        = Flonum_SN_isFinite;
    api.Flonum_denominator       = Flonum_denominator;
    api.Flonum_numerator         = Flonum_numerator;
    api.Flonum_isInteger         = Flonum_isInteger;
    api.Flonum_SN_isFinite       = Flonum_SN_isFinite;
    api.Flonum_SN_isInfinite     = Flonum_SN_isInfinite;
    api.Flonum_SN_isNaN          = Flonum_SN_isNaN;
    api.Flonum_isZero            = Flonum_isZero;
    api.Flonum_isPositive        = Flonum_isPositive;
    api.Flonum_isNegative        = Flonum_isNegative;
    api.Flonum_sign              = Flonum_sign;
    api.Flonum_isEven            = Flonum_isEven;
    api.Flonum_isOdd             = Flonum_isOdd;
    api.Flonum_eq                = Flonum_eq;
    api.Flonum_ne                = Flonum_ne;
    api.Flonum_gt                = Flonum_gt;
    api.Flonum_lt                = Flonum_lt;
    api.Flonum_ge                = Flonum_ge;
    api.Flonum_le                = Flonum_le;
    api.Flonum_compare           = Flonum_compare;
    api.Flonum_toExact           = Flonum_toExact;
    api.Flonum_add               = Flonum_add;
    api.Flonum_subtract          = Flonum_subtract;
    api.Flonum_multiply          = Flonum_multiply;
    api.Flonum_divide            = Flonum_divide;
    api.Flonum_negate            = Flonum_negate;
    api.Flonum_abs               = Flonum_abs;
    api.Flonum_reciprocal        = Flonum_reciprocal;
    api.Flonum_divAndMod         = Flonum_divAndMod;
    api.Flonum_div               = Flonum_div;
    api.Flonum_mod               = Flonum_mod;
    api.Flonum_square            = Flonum_square;
    api.Flonum_expt              = Flonum_expt;
    api.Flonum_round             = Flonum_round;
    api.Flonum_truncate          = Flonum_truncate;
    api.Flonum_ceiling           = Flonum_ceiling;
    api.Flonum_floor             = Flonum_floor;
    api.Flonum_atan              = Flonum_atan;
    api.Flonum_cos               = Flonum_cos;
    api.Flonum_exp               = Flonum_exp;
    api.Flonum_sin               = Flonum_sin;
    api.Flonum_tan               = Flonum_tan;
    api.Flonum_acos              = Flonum_acos;
    api.Flonum_asin              = Flonum_asin;
    api.Flonum_log               = Flonum_log;
    api.Flonum_sqrt              = Flonum_sqrt;
    api.Flonum_atan2             = Flonum_atan2;
    return api;
}

/*
    Function: installFlonum(plugins)

    // XXX documentation out of date.

    If *args* contains property *isDefaultInexactReal* with a true
    value, <install> creates <pluginApi> operations as follows.

    - The comparison operators (<eq>, <ne>, <gt>, <lt>, <ge>, <le>,
      and <compare>) may convert their arguments to native numbers and
      use native comparison when both are real and at least one is
      inexact.

    - The operators <add>, <subtract>, <multiply>, <divide>,
      <divAndMod>, <div>, <mod>, and <expt> may return an object
      created by this implementation when both arguments are real and
      at least one is inexact.

    - The operators <toInexact>, <atan>, <atan2>, <cos>, <exp>, <sin>,
      <tan>, <acos>, <asin>, <log>, and <sqrt> may return an object
      created by this implementation when passed any real arguments.
*/
function installFlonum(plugins) {
    "use strict";
    var Flonum                   = plugins.get("Flonum");
    var Real                     = plugins.get("Real");
    var InexactReal              = plugins.get("InexactReal");
    var ExactReal                = plugins.get("ExactReal");
    var i;
    var isDefaultFlonum = true;  // XXX should make it an option.

    // Augment Number.prototype if passed Number as Flonum.
    if (!(Flonum.prototype instanceof InexactReal)) {
        for (i in InexactReal.prototype)
            if (!(i in Flonum.prototype))
                Flonum.prototype[i] = InexactReal.prototype[i];
    }

    if (isDefaultFlonum) {
        plugins.get("toInexact").def(ExactReal, plugins.get(
            "Real_toInexact_via_Flonum"));
    }

    function def1_Flonum(name) {
        var impl = plugins.get("Flonum_" + name);
        if (!impl)
            console.log("Flonum_" + name + " not defined");
        plugins.get(name).def(Flonum, impl);
    }
    function def1_InexactReal(name) {
        var impl = plugins.get("Flonum_" + name);
        if (!impl)
            console.log("Flonum_" + name + " not defined");
        plugins.get(name).def(InexactReal, impl);
    }
    function def1_Real(name) {
        var impl = plugins.get("Flonum_" + name);
        if (!impl)
            console.log("Flonum_" + name + " not defined");
        plugins.get(name).def(Real, impl);
    }

    function def2_base(name) {
        var generic = plugins.get(name);
        var impl = plugins.get("Flonum_" + name);
        if (!impl)
            console.log("Flonum_" + name + " not defined");
        generic.def(Flonum, Flonum, impl);
    }
    function def2_Flonum(name) {
        var generic = plugins.get(name);
        var impl = plugins.get("Flonum_" + name);
        def2_base(name);
        generic.def(ExactReal, Flonum, impl);
        generic.def(Flonum, ExactReal, impl);
    }
    function def2_InexactReal(name) {
        var generic = plugins.get(name);
        var impl = plugins.get("Flonum_" + name);
        def2_base(name);
        generic.def(Real, InexactReal, impl);
        generic.def(InexactReal, Real, impl);
    }
    function def2_Real(name) {
        var generic = plugins.get(name);
        var impl = plugins.get("Flonum_" + name);
        def2_base(name);
        generic.def(Real, Real, impl);
    }

    var def1inexact = (isDefaultFlonum ? def1_InexactReal : def1_Flonum);
    var def1real    = (isDefaultFlonum ? def1_Real        : def1_Flonum);
    var def2inexact = (isDefaultFlonum ? def2_InexactReal : def2_Flonum);
    var def2real    = (isDefaultFlonum ? def2_Real        : def2_Flonum);

    // "real" functions may convert their arguments to inexact.
    // "inexact" functions operate only on inexact arguments.

    def1inexact("numberToString");
    def1inexact("isRational");
    def1inexact("denominator");
    def1inexact("numerator");
    def1inexact("isInteger");
    def1inexact("SN_isFinite");
    def1inexact("SN_isInfinite");
    def1inexact("SN_isNaN");
    def1inexact("isZero");
    def1inexact("isPositive");
    def1inexact("isNegative");
    def1inexact("sign");
    def1inexact("isEven");
    def1inexact("isOdd");
    def1inexact("toExact");
    def1inexact("negate");
    def1inexact("abs");
    def1inexact("reciprocal");
    def1inexact("square");
    def1inexact("round");
    def1inexact("truncate");
    def1inexact("ceiling");
    def1inexact("floor");

    def1real("atan");
    def1real("cos");
    def1real("exp");
    def1real("sin");
    def1real("tan");
    def1real("acos");
    def1real("asin");
    def1real("log");
    def1real("sqrt");

    def2inexact("eq");
    def2inexact("ne");
    def2inexact("gt");
    def2inexact("lt");
    def2inexact("ge");
    def2inexact("le");
    def2inexact("compare");
    def2inexact("add");
    def2inexact("subtract");
    def2inexact("multiply");
    def2inexact("divide");
    def2inexact("divAndMod");
    def2inexact("div");
    def2inexact("mod");

    def2real("expt");  // XXX should be def2inexact?
    def2real("atan2");
}

/*
    Function: implementBigInteger(plugins, BigInteger)
    Exact integer implementation that uses Matthew Crumley's BigInteger.
*/
function implementBigInteger(plugins, BigInteger) {
    "use strict";
    var g                        = plugins.get("es5globals");
    var uncurry                  = plugins.get("uncurry");
    var SchemeNumber             = plugins.get("SchemeNumber");
    var BigIntegerName           = BigInteger.name || "BigInteger";
    var Number_toString = uncurry(g.Number.prototype.toString);
    var String_replace  = uncurry(g.String.prototype.replace);
    var Array_concat    = uncurry(g.Array.prototype.concat);
    var Array_map       = uncurry(g.Array.prototype.map);

    var Math_LN10    = g.Math.LN10;
    var Math_LN2     = g.Math.LN2;
    var Math_abs     = g.Math.abs;
    var Math_exp     = g.Math.exp;
    var Math_floor   = g.Math.floor;
    var Math_pow     = g.Math.pow;
    var Math_sqrt    = g.Math.sqrt;

    var api = g.Object.create(null);

    var toBigInteger = plugins.get("Dispatch").defGeneric(
        "to" + BigIntegerName, 1);

    var raise, numberToString, isNegative, negate, abs, mod, reciprocal, divide, sign, exp10, nativeToInexact, inexactRectangular, ZERO, ONE, MINUS_ONE, _2_32, PI, INEXACT_ZERO;

    raise                    = plugins.get("raise");

    numberToString           = plugins.get("numberToString");
    isNegative               = plugins.get("isNegative");
    negate                   = plugins.get("negate");
    abs                      = plugins.get("abs");
    mod                      = plugins.get("mod");
    reciprocal               = plugins.get("reciprocal");
    divide                   = plugins.get("divide");
    sign                     = plugins.get("sign");
    exp10                    = plugins.get("exp10");

    _2_32 = nativeToExactInteger(4294967296);

    function onPluginsChanged(plugins, changed) {
        nativeToInexact          = plugins.get("nativeToInexact");
        inexactRectangular       = plugins.get("inexactRectangular");
        ZERO                     = plugins.get("ZERO");
        ONE                      = plugins.get("ONE");
        MINUS_ONE                = plugins.get("MINUS_ONE");
        PI                       = plugins.get("PI");
        INEXACT_ZERO             = plugins.get("INEXACT_ZERO");
    }
    plugins.onChange.subscribe(onPluginsChanged);
    onPluginsChanged(plugins);

    function BigInteger_debug() {
        return BigIntegerName + "(" + this.toString() + ")";
    }

    function parseExactInteger(sign, string, radix) {
        // Trim leading zeroes to avoid BigInteger treating "0c" and
        // "0b" as radix prefixes.
        var n = BigInteger.parse(String_replace(string, /^0+/, ""), radix);
        if (sign < 0)
            n = n.negate();
        return n;
    }

    function nativeToExactInteger(n) {
        // Use base 16 to avoid exponential notation.
        return BigInteger.parse(Number_toString(n, 16), 16);
    }

    function ExactInteger_toBigInteger() {
        return BigInteger.parse(numberToString(this));
    }

    function integerTooBig(digits) {
        raise("&implementation-restriction",
              "exact integer would exceed limit of " +
              (+SchemeNumber.maxIntegerDigits) +
              " digits; adjust SchemeNumber.maxIntegerDigits",
              digits);
    }

    // (expt *this* *p*)
    function BigInteger_expt(p) {
        if (this.isZero())
            return (p.isZero() ? ONE : this);
        if (this.isUnit()) {
            if (this.isPositive())
                return this;
            return (p.isEven() ? ONE : this);
        }

        // If p != p.valueOf() due to inexactness, our result would
        // exhaust memory, since |this| is at least 2.
        // XXX does not respect maxIntegerDigits.
        p = p.valueOf();
        var a = this.pow(Math_abs(p));
        return (p >= 0 ? a : reciprocal(a));
    }

    function BigInteger_numberToString(radix) {
        return this.toString(radix);
    }

    function divAndMod_BigInteger(n, d) {
        var dm = n.divRem(d);
        if (dm[1].isNegative()) {
            if (d.isNegative())
                return [dm[0].next(), dm[1].subtract(d)];
            return [dm[0].prev(), dm[1].add(d)];
        }
        return dm;
    }

    function BigInteger_divAndMod(d) {
        return divAndMod_BigInteger(this, d);
    }
    function BigInteger_div(d) {
        return divAndMod_BigInteger(this, d)[0];
    }
    function BigInteger_mod(d) {
        return divAndMod_BigInteger(this, d)[1];
    }

    function BigInteger_log() {
        var x = nativeToInexact(this.abs().log());
        return this.isPositive() ? x : inexactRectangular(x, PI);
    }

    function BigInteger_exp10(e) {
        switch (sign(e)) {
        case 0:  return this;
        case -1: return divide(this, exp10(ONE, negate(e)));
        case 1:
            e = +e;
            if (e > SchemeNumber.maxIntegerDigits && !this.isZero())
                integerTooBig(e);
            return this.exp10(e);
        }
    }

    function BigInteger_sqrt() {
        var s = this.sign();
        if (s === 0)
            return this;
        var mag = nativeToInexact(Math_exp(this.abs().log() / 2));
        if (s < 0)
            return inexactRectangular(INEXACT_ZERO, mag);
        return mag;
    }

    function BigInteger_exactIntegerSqrt() {

        // I know of no use cases for this.  Be stupid.  Be correct.

        function doit(n, a) {
            while (true) {
                var dm = n.divRem(a);
                var b = dm[0];
                var diff = a.subtract(b);
                // n == b*b + b*diff + dm[1], dm[1] < b+1

                if (diff.isZero())
                    return [ b, dm[1] ]; // n == b*b + dm[1]

                if (diff.isUnit()) {
                    if (diff.isPositive())
                        // n == b*b + b + dm[1], dm[1] < b+1
                        return [ b, b.add(dm[1]) ];

                    // n == b*b - b + dm[1] == (b-1)^2 + b - 1 + dm[1]
                    return [ a, a.add(dm[1]) ];
                }

                a = b.add(diff.quotient(2));
            }
        }

        switch (this.sign()) {
        case -1:
            raise("&assertion", "negative number", this);
        case 0:
            return [ ZERO, ZERO ];
        case 1: default:
            break;
        }
        var l = this.log() / 2 / Math_LN10;

        if (l < 7) {
            // Use native arithmetic.
            var x = this.valueOf();
            var f = Math_floor(Math_sqrt(x));
            return [BigInteger(f), BigInteger(x - f * f)];
        }

        var a = BigInteger(Number_toString(Math_pow(10, l - Math_floor(l)))
                           + "e" + Math_floor(l));
        return doit(this, a);
    }

    function BigInteger_gcdNonnegative(n) {
        //assert(!isNegative(this));
        //assert(!isNegative(n));

        var a = this;
        if (a.isZero())
            return n;

        var b = n;
        var c;

        while (true) {
            c = a;
            a = b.remainder(a);
            if (a.isZero())
                return c;
            b = c;
        }
    }

    //
    // BigInteger support for (rnrs arithmetic bitwise), mostly untested XXX.
    //

    function makeBitOp(op) {
        function BigInteger_bitwiseOp(b) {
            var a = this;
            //assert(!isNegative(a));
            //assert(!isNegative(b));
            var ret = BigInteger.ZERO;
            var d = BigInteger.ONE;
            var t, dm;
            while (true) {
                dm = a.divRem(_2_32);
                t = +dm[1];
                a = dm[0];
                dm = b.divRem(_2_32);
                t = op(t, +dm[1]);
                b = dm[0];
                if (t < 0)
                    t += 0x100000000;
                ret = ret.add(d.multiply(nativeToExactInteger(t)));
                if (a.isZero())
                    break;
                d = d.multiply(_2_32);
            }
            if (op(0, 1))
                ret = ret.add(b.multiply(d));
            return ret;
        }
        return BigInteger_bitwiseOp;
    }
    var BigInteger_bitwiseAnd = makeBitOp(function(x, y) { return x & y; });
    var BigInteger_bitwiseIor = makeBitOp(function(x, y) { return x | y; });
    var BigInteger_bitwiseXor = makeBitOp(function(x, y) { return x ^ y; });

    var bitCountArray, ffsArray;

    function addOne(x) { return x + 1; }

    function getBitCountArray() {
        if (!bitCountArray) {
            bitCountArray = [0];
            while (bitCountArray.length < (1 << 8))
                bitCountArray = Array_concat(bitCountArray,
                                             Array_map(bitCountArray, addOne));
        }
        return bitCountArray;
    }

    function getFfsArray() {
        if (!ffsArray) {
            ffsArray = [0];
            while (ffsArray.length < (1 << 8)) {
                ffsArray = ffsArray.concat(ffsArray);
                ffsArray[0]++;
            }
        }
        return ffsArray;
    }

    function BigInteger_bitCount() {
        //assert(!isNegative(this));
        var a = this;
        var ret = 0, dm, t, bc;
        while (!a.isZero()) {
            dm = a.divRem(_2_32);
            a = dm[0];
            t = +dm[1];
            bc = getBitCountArray();
            ret += bc[(t >>  0) & 0xff];
            ret += bc[(t >>  8) & 0xff];
            ret += bc[(t >> 16) & 0xff];
            ret += bc[(t >> 24) & 0xff];
        }
        return nativeToExactInteger(ret);
    }

    function BigInteger_bitLength() {
        var a = this;
        switch (a.sign()) {
        case 0: return ZERO;
        case -1: a = BigInteger.M_ONE.subtract(a);
        }
        var guess = a.log() / Math_LN2;
        var test = Math_floor(guess);
        // Could perhaps optimize through assumptions about accuracy.
        // Could cache powers of 2.
        var p2test = BigInteger.pow(2, Math_floor(guess));
        if (p2test.compare(a) > 0) {
            // too high!
            while (true) {
                a = a.add(a);
                if (p2test.compare(a) <= 0)
                    return nativeToExactInteger(test);
                test--;
            }
        }
        while (true) {
            p2test = p2test.add(p2test);
            test++;
            if (p2test.compare(a) > 0)
                return nativeToExactInteger(test);
        }
    }

    function BigInteger_firstBitSet() {
        var a = this, dm, m, ret;
        if (a.isZero())
            return MINUS_ONE;
        for (ret = 0; ; ret += 32) {
            dm = a.divRem(_2_32);
            m = dm[1];
            if (!m.isZero())
                break;
            a = dm[0];
        }
        m = +m;
        while ((m & 0xff) === 0) {
            ret += 8;
            m >>= 8;
        }
        return nativeToExactInteger(ret + getFfsArray()[m & 0xff]);
    }

    function BigInteger_isBitSet(i) {
        //assert(!isNegative(this));
        var p2i = BigInteger.pow(2, +i);
        return this.remainder(p2i.add(p2i)).compare(p2i) >= 0;
    }

    function BigInteger_copyBit(i, setIt) {
        var p2i = BigInteger.pow(2, +i);
        var isSet = this.remainder(p2i.add(p2i)).compare(p2i) >= 0;
        switch (setIt - isSet) {
        case 0: return this;
        case 1: return this.add(p2i);
        case -1: return this.subtract(p2i);
        }
    }

    function BigInteger_bitField(lo, hi) {
        //assert(!isNegative(this));
        //assert(le(lo, hi));
        lo = +lo;
        var p2width = BigInteger.pow(2, hi - lo);
        var p2lo = BigInteger.pow(2, lo);
        return this.quotient(p2lo).remainder(p2width);
    }

    function BigInteger_copyBitField(from, lo, hi) {
        //assert(!isNegative(this));
        //assert(!isNegative(from));
        //assert(le(lo, hi));
        lo = +lo;
        var p2width = BigInteger.pow(2, hi - lo);
        var p2lo = BigInteger.pow(2, lo);
        var old = this.quotient(p2lo).remainder(p2width);
        return this.add(p2lo.multiply(from.subtract(old).quotient(p2width)));
    }

    function BigInteger_bitShift(count) {
        var p2 = BigInteger.pow(2, +abs(count));
        return (isNegative(count) ? this.quotient(p2) : this.multiply(p2));
    }

    function BigInteger_rotateBitField(lo, hi, count) {
        //assert(!isNegative(this));
        //assert(le(lo, hi));
        lo = +lo;
        var width = hi - lo;
        if (width < 2)
            return this;
        count = +mod(count, nativeToExactInteger(width));
        if (count === 0)
            return this;
        var p2width = BigInteger.pow(2, width);
        var p2lo = BigInteger.pow(2, lo);
        var p2count = BigInteger.pow(2, count);
        var old = this.quotient(p2lo).remainder(p2width);
        var tmp = old.multiply(p2count);
        tmp = tmp.add(tmp.quotient(p2width)).remainder(p2width);
        return this.add(p2lo.multiply(tmp.subtract(old)));
    }

    function BigInteger_reverseBitField(lo, hi) {
        //assert(!isNegative(this));
        //assert(le(lo, hi));
        var i;
        lo = +lo;
        var p2width = BigInteger.pow(2, hi - lo);
        var p2lo = BigInteger.pow(2, +lo);
        var bits = this.quotient(p2lo).remainder(p2width);
        var string = bits.toString(2);
        var last = string.length - 1;
        if (last < 1)
            return this;
        var revString = "";
        for (i = 0; i < string.length; i++)
            revString += string[last - i];
        var reversed = BigInteger.parse(revString, 2);
        return this.add(reversed.subtract(bits).multiply(p2lo));
    }

    function install() {
        "use strict";
        var disp                     = plugins.get("Dispatch");
        var ExactInteger             = plugins.get("ExactInteger");
        var debug                    = plugins.get("debug");
        var retThis                  = plugins.get("retThis");

        disp.defClass("BigInteger", {ctor: BigInteger, base: "ExactInteger"});

        // Have BigInteger rebuild its cache since its prototype changed.
        BigInteger.init();

        debug.def(BigInteger, BigInteger_debug);

        toBigInteger.def(BigInteger, retThis);
        toBigInteger.def(ExactInteger, ExactInteger_toBigInteger);

        function def1(generic, func) {
            plugins.get(generic).def(BigInteger, func);
        }
        function def2(generic, func) {
            plugins.get(generic).def(BigInteger, BigInteger, func);
        }
        function defBigUnary(name) {
            plugins.get(name).def(BigInteger, BigInteger.prototype[name]);
        }
        function defBigBinary(name) {
            plugins.get(name).def(BigInteger, BigInteger,
                                  BigInteger.prototype[name]);
        }

        def2("expt",           BigInteger_expt);
        def1("numberToString", BigInteger_numberToString);

        defBigUnary("isZero");
        defBigUnary("isEven");
        defBigUnary("isOdd");
        defBigUnary("sign");
        defBigUnary("isUnit");
        defBigUnary("isPositive");
        defBigUnary("isNegative");
        defBigUnary("negate");
        defBigUnary("abs");
        defBigUnary("square");

        defBigBinary("compare");
        defBigBinary("add");
        defBigBinary("subtract");
        defBigBinary("multiply");

        def1("log",        BigInteger_log);
        def1("exp10",      BigInteger_exp10);
        def1("sqrt",       BigInteger_sqrt);
        def1("exactIntegerSqrt", BigInteger_exactIntegerSqrt);
        def2("divAndMod",  BigInteger_divAndMod);
        def2("div",        BigInteger_div);
        def2("mod",        BigInteger_mod);
        def2("gcdNonnegative", BigInteger_gcdNonnegative);

        def2("bitwiseAnd", BigInteger_bitwiseAnd);
        def2("bitwiseIor", BigInteger_bitwiseIor);
        def2("bitwiseXor", BigInteger_bitwiseXor);
        def1("bitCount",   BigInteger_bitCount);
        def1("bitLength",  BigInteger_bitLength);
        def1("firstBitSet", BigInteger_firstBitSet);
        def1("isBitSet",   BigInteger_isBitSet);
        def1("copyBit",    BigInteger_copyBit);
        def1("bitField",   BigInteger_bitField);
        def2("copyBitField", BigInteger_copyBitField);
        def1("bitShift",   BigInteger_bitShift);
        def1("rotateBitField", BigInteger_rotateBitField);
        def1("reverseBitField", BigInteger_reverseBitField);
    }

    api.parseExactInteger        = parseExactInteger;
    api.nativeToExactInteger     = nativeToExactInteger;
    api.importExactInteger       = toBigInteger;
    api.install                  = install;
    return api;
}

/*
    Function: defaultRationalFactory(plugins)
*/
function defaultRationalFactory(plugins) {
    "use strict";
    var ExactRational            = plugins.get("ExactRational");
    var g                        = plugins.get("es5globals");
    var uncurry                  = plugins.get("uncurry");
    var api = g.Object.create(null);

    var Math_exp     = g.Math.exp;
    var _isNaN       = g.isNaN;
    var _isFinite    = g.isFinite;

    var debug, retFalse, isUnit, numeratorAndDenominator, ZERO, ONE, TWO, makeRectangular, eq, compare, add, subtract, multiply, divide, negate, log, exp, isNegative, abs, sqrt, SN_isFinite, sign, div, expt, square, isZero, isPositive, isNegative, raiseDivisionByExactZero;

    debug                    = plugins.get("debug");
    retFalse                 = plugins.get("retFalse");
    isUnit                   = plugins.get("isUnit");
    numeratorAndDenominator  = plugins.get("numeratorAndDenominator");
    ZERO                     = plugins.get("ZERO");
    ONE                      = plugins.get("ONE");
    TWO                      = plugins.get("TWO");
    makeRectangular          = plugins.get("makeRectangular");
    eq                       = plugins.get("eq");
    compare                  = plugins.get("compare");
    add                      = plugins.get("add");
    subtract                 = plugins.get("subtract");
    multiply                 = plugins.get("multiply");
    divide                   = plugins.get("divide");
    negate                   = plugins.get("negate");
    log                      = plugins.get("log");
    exp                      = plugins.get("exp");
    isNegative               = plugins.get("isNegative");
    abs                      = plugins.get("abs");
    sqrt                     = plugins.get("sqrt");
    SN_isFinite              = plugins.get("SN_isFinite");
    sign                     = plugins.get("sign");
    div                      = plugins.get("div");
    expt                     = plugins.get("expt");
    square                   = plugins.get("square");
    isZero                   = plugins.get("isZero");
    isPositive               = plugins.get("isPositive");
    isNegative               = plugins.get("isNegative");
    raiseDivisionByExactZero = plugins.get("raiseDivisionByExactZero");

    // Fraction: Exact rational as numerator (exact integer) and
    // denominator (exact integer greater than one) with no factors in
    // common.

    function Fraction(n, d) {
        //assert(isInteger(n));assert(isExact(n));
        //assert(isInteger(d));assert(isExact(d));
        //assert(gt(d, ONE));
        //assert(eq(ONE,gcdNonnegative(abs(n),d)));
        //assert(this instanceof Fraction);
        this._n = n;
        this._d = d;
    }
    Fraction.prototype = new ExactRational();

    function Fraction_debug() {
        return "Fraction(" + debug(this._n) + " / " + debug(this._d) + ")";
    }

    // Convert exact rational to approximate native number.
    function Fraction_valueOf() {
        var n = this._n;
        var d = this._d;
        var ret = n / d;
        if (_isFinite(ret))  // (-)Infinity / Infinity would give NaN.
            return ret;

        // Numerator or denominator fall outside the native range, but
        // their quotient may lie within it.  Use logarithms.
        switch (sign(n)) {
        case 1:  return Math_exp(log(n) - log(d));
        case -1: return -Math_exp(log(negate(n)) - log(d));
        case 0: default:  return 0;
        }
    }

    Fraction.prototype.valueOf = Fraction_valueOf;

    function Fraction_numerator()   { return this._n; }
    function Fraction_denominator() { return this._d; }

    function divideReducedNotByOne(n, d) {
        return new Fraction(n, d);
    }
    function _divideReduced(n, d) {
        return (isUnit(d) ? n : new Fraction(n, d));
    }

    var importRational = plugins.get("Dispatch").defGeneric("toFraction", 1);

    function Rational_toFraction() {
        var nd = numeratorAndDenominator(this);
        return _divideReduced(nd[0], nd[1]);
    }

    function Fraction_numeratorAndDenominator() {
        return [this._n, this._d];
    }

    function Fraction_eq(q) {
        return eq(this._d, q._d) &&
            eq(this._n, q._n);
    }

    function Fraction_compare(q) {
        var signDiff = sign(this._n) - sign(q._n);
        if (signDiff !== 0)
            return (signDiff > 0 ? 1 : -1);
        if (q._d === this._d)  // cheap optimization, XXX could be eq(qd,td)
            return compare(this._n, q._n);
        return compare(multiply(this._n, q._d), multiply(this._d, q._n));
    }
    function Fraction_compare_Integer(n) {
        return compare(this._n, multiply(this._d, n));
    }
    function Integer_compare_Fraction(q) {
        return compare(multiply(this, q._d), q._n);
    }

    function Fraction_sign() {
        return sign(this._n);
    }
    function Fraction_isPositive() {
        return isPositive(this._n);
    }
    function Fraction_isNegative() {
        return isNegative(this._n);
    }
    function Fraction_negate() {
        return divideReducedNotByOne(negate(this._n), this._d);
    }
    function Fraction_square() {
        return divideReducedNotByOne(square(this._n), square(this._d));
    }
    function Fraction_reciprocal() {
        var n = this._n;
        switch (sign(n)) {
        case -1: return _divideReduced(negate(this._d), negate(n));
        case 1: return _divideReduced(this._d, n);
        case 0: default: raiseDivisionByExactZero();
        }
    }

    function Fraction_add(q) {
        return divide(add(multiply(this._n, q._d), multiply(q._n, this._d)),
                      multiply(this._d, q._d));
    }
    function Fraction_add_Integer(n) {
        return divideReducedNotByOne(
            add(this._n, multiply(n, this._d)), this._d);
    }
    function Integer_add_Fraction(q) {
        return divideReducedNotByOne(
            add(multiply(this, q._d), q._n), q._d);
    }

    function Fraction_subtract(q) {
        return divide(subtract(multiply(this._n, q._d),
                               multiply(q._n, this._d)),
                      multiply(this._d, q._d));
    }
    function Fraction_subtract_Integer(n) {
        return divideReducedNotByOne(
            subtract(this._n, multiply(n, this._d)), this._d);
    }
    function Integer_subtract_Fraction(q) {
        return divideReducedNotByOne(
            subtract(multiply(this, q._d), q._n), q._d);
    }

    function Fraction_multiply(q) {
        return divide(multiply(this._n, q._n), multiply(this._d, q._d));
    }
    function times_int(n, d, i) {
        var nd = numeratorAndDenominator(divide(i, d));
        return _divideReduced(multiply(n, nd[0]), nd[1]);
    }
    function Fraction_multiply_Integer(i) {
        return times_int(this._n, this._d, i);
    }
    function Integer_multiply_Fraction(q) {
        return times_int(q._n, q._d, this);
    }

    function Fraction_divide(q) {
        return divide(multiply(this._n, q._d), multiply(this._d, q._n));
    }
    function Fraction_divide_Integer(i) {
        var nd = numeratorAndDenominator(divide(this._n, i));
        return new Fraction(nd[0], multiply(nd[1], this._d));
    }
    function Integer_divide_Fraction(q) {
        return divide(multiply(this, q._d), q._n);
    }

    function Fraction_expt_EI(p) {
        var n, d;
        switch (sign(p)) {
        case 0: return ONE;
        case 1:
            n = this._n;
            d = this._d;
            break;
        case -1: default:
            n = this._d;
            d = this._n;
            p = abs(p);
            if (isNegative(d)) {
                n = negate(n);
                d = negate(d);
            }
            if (isUnit(d))
                return expt(n, p);
        }
        // Num and den are in lowest terms.
        return divideReducedNotByOne(expt(n, p), expt(d, p));
    }

    function Fraction_sqrt() {
        // This rational or its components may be too big for
        // toInexact(), but its square root may not be.
        var absN = abs(this._n);
        var rootN = sqrt(absN), rootD = sqrt(this._d);
        var ret;
        if (SN_isFinite(rootN)) {
            if (SN_isFinite(rootD))
                ret = divide(rootN, rootD);
            else
                ret = exp(subtract(log(rootN), divide(log(this._d), TWO)));
        }
        else {
            ret = exp(subtract(divide(log(absN), TWO),
                               SN_isFinite(rootD) ? log(rootD)
                                                  : divide(log(this._d), TWO)));
        }
        return (isNegative(this._n) ? makeRectangular(ZERO, ret) : ret);
    }
    function Fraction_log() {
        return subtract(log(this._n), log(this._d));
    }
    function Fraction_floor() {
        return div(this._n, this._d);
    }

    function install() {
        var disp = plugins.get("Dispatch");
        var EI   = plugins.get("ExactInteger");

        disp.defClass("Fraction", {ctor: Fraction});

        importRational.def(Fraction, plugins.get("retThis"));
        importRational.def(ExactRational, Rational_toFraction);

        function def(name, type1, type2, func) {
            plugins.get(name).def(type1, type2, func);
        }
        function def1(name, func) {
            plugins.get(name).def(Fraction, func);
        }
        function def2(name, func) {
            plugins.get(name).def(Fraction, Fraction, func);
        }

        def1("debug",                   Fraction_debug);
        def1("numerator",               Fraction_numerator);
        def1("denominator",             Fraction_denominator);
        def1("numeratorAndDenominator", Fraction_numeratorAndDenominator);
        def1("isInteger",               retFalse);
        def2("eq",                      Fraction_eq);
        def("eq",         Fraction, EI, retFalse);
        def("eq",         EI, Fraction, retFalse);
        def2("compare",                 Fraction_compare);
        def("compare",    Fraction, EI, Fraction_compare_Integer);
        def("compare",    EI, Fraction, Integer_compare_Fraction);
        def1("sign",                    Fraction_sign);
        def1("isPositive",              Fraction_isPositive);
        def1("isNegative",              Fraction_isNegative);
        def1("isZero",                  retFalse);
        def1("isUnit",                  retFalse);
        def1("floor",                   Fraction_floor);
        def1("negate",                  Fraction_negate);
        def1("square",                  Fraction_square);
        def1("reciprocal",              Fraction_reciprocal);
        def2("add",                     Fraction_add);
        def("add",        Fraction, EI, Fraction_add_Integer);
        def("add",        EI, Fraction, Integer_add_Fraction);
        def2("subtract",                Fraction_subtract);
        def("subtract",   Fraction, EI, Fraction_subtract_Integer);
        def("subtract",   EI, Fraction, Integer_subtract_Fraction);
        def2("multiply",                Fraction_multiply);
        def("multiply",   Fraction, EI, Fraction_multiply_Integer);
        def("multiply",   EI, Fraction, Integer_multiply_Fraction);
        def2("divide",                  Fraction_divide);
        def("divide",     Fraction, EI, Fraction_divide_Integer);
        def("divide",     EI, Fraction, Integer_divide_Fraction);
        def("expt",       Fraction, EI, Fraction_expt_EI);
        def1("sqrt",                    Fraction_sqrt);
        def1("log",                     Fraction_log);
    }

    api.divideReducedNotByOne    = divideReducedNotByOne;
    api.divideReduced            = _divideReduced;
    api.importRational           = importRational;
    api.install                  = install;
    return api;
}

/*
    Function: implementRectangular(plugins)
*/
function implementRectangular(plugins) {
    "use strict";
    var Real          = plugins.get("Real");
    var Complex       = plugins.get("Complex");
    var g             = plugins.get("es5globals");
    var uncurry       = plugins.get("uncurry");
    var api = g.Object.create(null);

    var debug, isZero, isUnit, isPositive, isExact, isInexact;
    var toInexact, negate, multiply, cos, sin;
    var ZERO, ONE, MINUS_ONE, INEXACT_ZERO;

    debug                    = plugins.get("debug");
    isZero                   = plugins.get("isZero");
    isUnit                   = plugins.get("isUnit");
    isPositive               = plugins.get("isPositive");
    isExact                  = plugins.get("isExact");
    isInexact                = plugins.get("isInexact");
    toInexact                = plugins.get("toInexact");
    negate                   = plugins.get("negate");
    multiply                 = plugins.get("multiply");
    cos                      = plugins.get("cos");
    sin                      = plugins.get("sin");

    function onPluginsChanged(plugins) {
        ZERO                     = plugins.get("ZERO");
        ONE                      = plugins.get("ONE");
        MINUS_ONE                = plugins.get("MINUS_ONE");
        INEXACT_ZERO             = plugins.get("INEXACT_ZERO");
    }
    plugins.onChange.subscribe(onPluginsChanged);
    onPluginsChanged(plugins);

    function Rectangular(x, y) {
        //assert(this instanceof Rectangular);
        //assert(isReal(x));
        //assert(isReal(y));
        //assert(isExact(x) === isExact(y));
        //assert(!isExact(x) || !isZero(x));
        this._x = x;
        this._y = y;
    }
    Rectangular.prototype = new Complex();

    function Rectangular_realPart() { return this._x; }
    function Rectangular_imagPart() { return this._y; }

    function Rectangular_conjugate() {
        if (isExact(this._x))
            return exactRectangular(this._x, negate(this._y));
        return inexactRectangular(this._x, negate(this._y));
    }

    function Rectangular_debug() {
        return "Rectangular(" + debug(this._x) + ", " + debug(this._y) + ")";
    }

    var I        = new Rectangular(ZERO, ONE);
    var MINUS_I  = new Rectangular(ZERO, MINUS_ONE);

    /*
        Function: exactRectangular(x, y)
        This function behaves like the standard <make-rectangular> but
        assumes both arguments are exact reals.
     */
    function exactRectangular(x, y) {
        //assert(isExact(x));
        //assert(isExact(y));
        if (isZero(y))
            return x;
        if (isZero(x) && isUnit(y)) {
            return isPositive(y) ? I : MINUS_I;
        }
        return new Rectangular(x, y);
    }

    /*
        Function: inexactRectangular(x, y)
        This function behaves like the standard <make-rectangular> but
        assumes both arguments are inexact reals.
     */
    function inexactRectangular(x, y) {
        //assert(!isExact(x));
        //assert(!isExact(y));
        return new Rectangular(x, y);
    }

    /*
        Function: inexactPolar(r, theta)
        This function behaves like the standard <make-polar> but assumes
        both its arguments are inexact and real.
    */
    function inexactPolar(r, theta) {
        return inexactRectangular(
            multiply(cos(theta), r), multiply(sin(theta), r));
    }

    /*
        Function: exactPolar(r, theta)
        This function behaves like the standard <make-polar> but assumes
        both its arguments are exact and real.
    */
    function exactPolar(r, theta) {
        // XXX Everybody seems to return inexact here, but I don't
        // think it's allowed in cases like "#e1@1".
        return inexactPolar(toInexact(r), toInexact(theta));
    }

    function Rectangular_isExact()   { return isExact(this._x); }
    function Rectangular_isInexact() { return isInexact(this._x); }

    api.Rectangular               = Rectangular;
    api.Rectangular_debug         = Rectangular_debug;
    api.Rectangular_realPart      = Rectangular_realPart;
    api.Rectangular_imagPart      = Rectangular_imagPart;
    api.Rectangular_conjugate     = Rectangular_conjugate;
    api.exactRectangular          = exactRectangular;
    api.inexactRectangular        = inexactRectangular;
    api.exactPolar                = exactPolar;
    api.inexactPolar              = inexactPolar;
    api.Rectangular_isExact       = Rectangular_isExact;
    api.Rectangular_isInexact     = Rectangular_isInexact;
    return api;
}

function installRectangular(plugins) {
    var Rectangular = plugins.get("Rectangular");

    function def(generic, impl) {
        var func = plugins.get(impl);
        if (!func) {
            console.log(impl + " is not defined");
        }
        plugins.get(generic).def(Rectangular, func);
    }

    def("isReal",     "retFalse");
    def("isRational", "retFalse");
    def("isInteger",  "retFalse");

    function defRect(name) {
        def(name, "Rectangular_" + name);
    }

    defRect("realPart");
    defRect("imagPart");
    defRect("isExact");
    defRect("isInexact");
    defRect("conjugate");
}

function defaultIntegerFactory(plugins) {
    // Grab the BigInteger library.
    // XXX should avoid use of globals.
    var BigInteger;
    if (typeof require !== "undefined")
        BigInteger = require("./biginteger").BigInteger;
    else
        BigInteger = this.BigInteger;

    if (!BigInteger) {
        if (typeof load !== "undefined")
            load("biginteger.js");
        else if (this.readFile)
            eval(this.readFile("biginteger.js"));
        else
            throw new Error("BigInteger is not defined.");
    }
    return implementBigInteger(plugins, BigInteger);
}

function configure(conf) {

    // Build the SchemeNumber object piece by piece.

    // XXX should probably provide a unique DispatchJs prefix.
    var SchemeNumber = makeBase();
    var plugins      = SchemeNumber.plugins;
    var disp         = plugins.get("Dispatch");
    var debug        = plugins.get("debug") || {def: function(){}};

    var integerFactory  = conf.integerFactory  || defaultIntegerFactory;
    var rationalFactory = conf.rationalFactory || defaultRationalFactory;
    //integerFactory = require('./lib/leemonBigInt').leemonBigIntFactory;

    var Integers = integerFactory(plugins);
    Integers.install();
    plugins.extend(
        "nativeToExactInteger", Integers.nativeToExactInteger,
        "parseExactInteger",    Integers.parseExactInteger
    );
    installDefaultExactInteger(plugins, Integers.importExactInteger);

    var Rationals = rationalFactory(plugins);
    Rationals.install();
    plugins.extend(
        "divideReducedNotByOne", Rationals.divideReducedNotByOne
    );
    installDefaultRational(plugins, Rationals.importRational,
                           Rationals.divideReduced);

    // XXX This could use some refactoring.

    var Rectangulars = implementRectangular(plugins);
    var Rectangular = Rectangulars.Rectangular;
    plugins.extend(Rectangulars);
    disp.defClass("Rectangular", {ctor: Rectangular});
    debug.def(Rectangular, Rectangulars.Rectangular_debug);
    installRectangular(plugins);

    var Flonums = implementNativeInexactReal(plugins);
    var Flonum = Flonums.NativeInexactReal;
    plugins.extend("Flonum", Flonum);
    plugins.extend(Flonums);
    plugins.extend(implementNativeFlonumLibrary(plugins));
    disp.defClass("NativeInexactReal", {ctor: Flonum});
    debug.def(Flonum, Flonums.NativeInexactReal_debug);
    installFlonum(plugins);

    // XXX TO DO

    return SchemeNumber;
}

var SchemeNumber = configure({});
SchemeNumber.configure = configure;
return SchemeNumber;
})();

if (typeof exports !== "undefined") {
    exports.SchemeNumber = SchemeNumber;
}

// load for testing:
// var sn=require("./schemeNumber").SchemeNumber;fn=sn.fn;ns=fn["number->string"];debug=sn.plugins.get("debug");1
// load("biginteger.js");load("schemeNumber.js");sn=SchemeNumber;fn=sn.fn;ns=fn["number->string"];debug=sn.plugins.get("debug");1
