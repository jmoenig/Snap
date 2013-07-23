Object.defineProperty(global, '__stack', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get: function(){
    return __stack[1].getLineNumber();
  }
});

var lambda_functions = 
{
    'pow': function(x,y) { return Math.pow(x,y); },
    'test': function(x,y,z,w) { return; },
}

var List = function ()
{
    return this;
}
List.prototype.array = [1,2,3];
List.prototype.at = function (n) { return this.array[n-1]; };
List.prototype.length = function () { return this.array.length; };

var testList = new List();

function lambda_getVar(v)
{
    if (v == "testList")
        return testList;
    if (v == "one")
        return 1;
    if (v == "two")
        return 2;
    if (v == "three")
        return 3;
    if (v == "four")
        return 4;
    if (v == "five")
        return 4;
    if (v == "six")
        return 6;
        
    throw { name: "Not a variable", message: "Tried accessing \"" + v + "\" which is not a variable"};
}

function lambda_getList(v, i)
{
    var bob = getVar(v);
    if (bob == undefined || bob == null)
        throw { name: "Not a variable", message: "Tried accessing \"" + v + "\" which is not a variable"};
    if (!( bob instanceof List ))
        throw { name: "Not a list", message: "Tried accessing \"" + v + "\" which is not a list"};
    if (i <= 0 || i > bob.length())
        throw { name: "Out of bounds", message: "Tried accessing index " + i + " of \"" + v + "\" which has " + bob.length + " elements" };
    return bob.at(i);
}

GLOBAL.SCRIBBLE_LAMBDA_FUNCTIONS_NAME = "lambda_functions";
GLOBAL.SCRIBBLE_LAMBDA_GETVAR_NAME = "lambda_getVar";
GLOBAL.SCRIBBLE_LAMBDA_GETLIST_NAME = "lambda_getList";
GLOBAL.SCRIBBLE_LAMBDA_PREFIX_ARGS = "";
GLOBAL.SCRIBBLE_LAMBDA_PREFIX_ARGS_COUNT = 0;

var lambda = require("./lambda.js");
var parser = new lambda.Parser();

function testCase(line, parseMe, expect)
{
    var parserResult = parser.parse(parseMe);
    parserResult = eval("(" + parserResult + ")");
    if (parserResult == expect)
    {
        console.log("TEST@" + line + ": SUCCESS");
    }
    else
    {
        console.log("TEST@" + line + ": FAILURE");
        console.log("    PARSE : \"" + parseMe + "\"");
        console.log("    EXPECT: \"" + expect + "\"");
        console.log("    RESULT: \"" + parserResult + "\"");
    }
}

testCase(__line, "1", 1);
testCase(__line, "(one + two) * three", 9);
testCase(__line, "one + two * three", 7);
testCase(__line, "six + two ^ three", 14);
testCase(__line, "true and false", false);
testCase(__line, "True Or FALSE", true);
testCase(__line, "one == one", true);
testCase(__line, "(one + two * three) != 7", false);
testCase(__line, "(one + two * three) =! 7", false);
testCase(__line, "NOT (one + two * three) =! 7", true);
testCase(__line, '"this\\" is\\" a \\"\u0020test"', "this\" is\" a \" test");
