/* 
 * This file details a function, getLambdaFunction(lambda:String), that will
 * sanitise and wrap the string into a function ready to be called by the 
 * SpriteMorph
 */
 
function throwWTF() {
    throw { 
        name: "Internal Exception", 
        message: "Should not occur." };
}

function throwInvalidEscape()
{
    throw { 
        name: "Invalid Escape Sequence", 
        message: "Putting a \\ in a string (\"...\") treats the next " + 
        "character specially, and the character was not acceptable."
        };
}

function throwUnterminatedString()
{
    throw { 
        name: "Unfinished string!", 
        message: "You opened a string with \" or \' but then did not " +
        "close it before the end of the expression."
        };
}

function throwBannedOperator(s)
{
    throw { 
        name: "Banned Operator used!", 
        message: "You can't use the "+s+" operator in an expression!"
        };
}

function throwInvalidNumberDPTwice(s)
{
    throw { 
        name: "Invalid Number!", 
        message: "You can't use a decimal point twice!"
        };
}

function throwInvalidNumberDPAfterE(s)
{
    throw { 
        name: "Invalid Number!", 
        message: "You can't use a decimal point after the exponent!"
        };
}

function throwMalformedNumber(c)
{
    throw {
        name: "Malformed Number!",
        message: "A numeral was expected but a " + c + " was given instead"
    }
}

function throwMultipleExponents()
{
    throw {
        name: "Multiple Exponents!",
        message: "You can't put more than one exponent in a number!"
    }
}

var SYMBOLS = {
    NUMBER : 0,
    NAME : 1,
    STRING : 2,
    OPERATOR : 3,
    WHITESPACE : 4,
}

/*
    Parsers define the following:
    
    Parser.prototype.accept(oneCharacterOrEmptyString) {
        A function "accept" which is given a single character string as input 
        (behaviour undefined if more than 1 character), and then returns true 
        or false if the character is accepted into the current symbol. If the 
        parser returns false, a new parser is searched for using the static 
        function "start".
        
        If the string is empty, it indicates that the end of the lambda has 
        been reached and that the function should throw if this is unacceptable
        (StringParser throws if the string is unclosed). Return value is 
        unused, in this case.
        
        When a parser's accept returns false, all characters passed to its 
        accept function are passed to the wrap function, and the resultant 
        string is appended to the growing sanitary JS string.
        
        It is expected that the parser will throw if it expects a character it
        is not given (I.E string throws if it receives a "G" after \u)
    }
    
    Parser.start(oneCharacterString) {
        A static function "start" which is given a single character string as 
        input (behaviour undefined if more than 1 character), and then returns
        true or false if the character is a valid starting character for this
        symbol parser. I.E, StringParser.start returns true when given a " 
        or ' character. It is imperative that no two start functions return 
        true for the same character.
    }
    
    Parsers are not designed to perform all of the error checking. Parsers are 
    designed to:
    
    1) Ensure the environment remains secure: We cannot allow people to run
    arbitary javascript of their creation on the client side, as it would open
    security holes such as cookie stealing etc. etc. Thus, we must ensure that
    all names are wrapped, and in order to do so, we need to parse various 
    symbols (strings for example) to tell when we're reading a name and when 
    we're not.
    
    In doing so, we inevitably have the ability to check for some errors, and 
    so there's no good reason why we shouldn't.
    
    Keep in mind that some parsers are treated specially. (OperatorParser for
    example is used to check if the operator following a name is a bracket)
*/

//String parser////////////////////////////////////////////////////////////////

var StringParser = function () {
    this.escaped = false;
    this.escapedIgnore = 0;
    this.escapedIgnoreAcceptable = "";
    this.stringCharacter = "";
    this.end = false;
}

StringParser.prototype.symbol = SYMBOLS.STRING;

StringParser.start = function(o)
{
    return "\"'".indexOf(o) > -1;
}

StringParser.prototype.accept = function (c) {

    //End of the string (We had to accept the closing ")
    if (this.end)
        return false;
    
    //Not end of string but end of expression?
    if (c === "")
    {
        throwUnterminatedString();
    }
    
    //First character
    if (this.stringCharacter === "")
    {
        if (c === "'")
            this.stringCharacter = "'";
        else if (c === "\"")
            this.stringCharacter = "\"";
        else
            throwWTF();
    }
    else if (this.escaped)
    {
        if (this.escapedIgnore === 0)
        {
            //Escape characters
            if ("\\'\"bfnrt".indexOf(c) > -1) 
            {
                //All of javascripts single character escape codes
                this.escaped = false;
            }
            else if ("12345670".indexOf(c) > -1)
            {
                //Defines an octal sequence. Ignore next TWO characters
                this.escapedIgnore = 2;
                this.escapedIgnoreAcceptable = "12345670";
            }
            else if (c === "x")
            {
                //Defines a hex code. Ignore next TWO characters.
                this.escapedIgnore = 2;
                this.escapedIgnoreAcceptable = "1234567890ABCDEF";
            }
            else if (c === "u")
            {
                //Defines a unicode symbol. Ignore next FOUR characters.
                this.escapedIgnore = 2;
                this.escapedIgnoreAcceptable = "1234567890ABCDEF";
            }
            else
            {
                throwInvalidEscape();
            }
        }
        else
        {
            this.escapedIgnore--;
            if (this.escapedIgnoreAcceptable.indexOf(c) === -1)
            {
                throwInvalidEscape();
            }
            if (this.escapedIgnore === 0)
                this.escaped = false;
        }
    }
    else
    {
        if (c === this.stringCharacter) //End of string
        {
            this.end = true;
        }
        else if (c === "\\") //Escape
        {
            this.escaped = true;
        }
    }
    
    //Return OK
    return true;
}

//Operator parser//////////////////////////////////////////////////////////////

var OperatorParser = function () {
    this.end = false;
    this.operator = "";
}

OperatorParser.prototype.symbol = SYMBOLS.OPERATOR;
OperatorParser.ALL_OPERATORS = "()[]+=-!%^&*~|,/<>?:;";

OperatorParser.start = function(o)
{
    return OperatorParser.ALL_OPERATORS.indexOf(o) > -1;
}

OperatorParser.prototype.accept = function (c) {
    if (OperatorParser.ALL_OPERATORS.indexOf(c) > -1 && c != "")
    {
        this.operator += c;
        return true;
    }
    else
    {
        var bannedOperators = [ 
            "=", "/=", "*=", "++", "--", "-=", "+=", "%=", 
            "|=", "^=", "<<=", ">>=", ">>=", "&=", ";",
        ];
        /* Somebody could be really clever and make an operator )= to use the = operator. So remove non-compoundable operators like brackets. */
        var replaceInThis = this.operator;
        replaceInThis = replaceInThis.replace(")","(");
        replaceInThis = replaceInThis.replace("[","(");
        replaceInThis = replaceInThis.replace("]","(");
        var raws = replaceInThis.split("(");
        for (var j=0; j<raws.length; j++)
        {
            for (var i=0; i<bannedOperators.length; i++)
            {
                if (bannedOperators[i] === raws[j])
                    throwBannedOperator(raws[j]);
            }
        }
        return false;
    }
}

//Whitespace parser//////////////////////////////////////////////////////////////

var WhitespaceParser = function () {
    this.end = false;
}

WhitespaceParser.prototype.symbol = SYMBOLS.WHITESPACE;
WhitespaceParser.ALL_WHITESPACE_CHARACTERS = "\t ";

WhitespaceParser.start = function(o)
{
    return WhitespaceParser.ALL_WHITESPACE_CHARACTERS.indexOf(o) > -1;
}

WhitespaceParser.prototype.accept = function (c) {
    if (WhitespaceParser.ALL_WHITESPACE_CHARACTERS.indexOf(c) > -1 && c != "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

//Name parser//////////////////////////////////////////////////////////////

var NameParser = function () {
    this.end = false;
}

NameParser.prototype.symbol = SYMBOLS.NAME;
NameParser.ALL_NAME_CHARACTERS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_@#$";
NameParser.ALL_NAME_CHARACTERS_NOT_FIRST = NameParser.ALL_NAME_CHARACTERS + "1234567890";

NameParser.start = function(o)
{
    return NameParser.ALL_NAME_CHARACTERS.indexOf(o) > -1;
}

NameParser.prototype.accept = function (c) {
    if (NameParser.ALL_NAME_CHARACTERS_NOT_FIRST.indexOf(c) > -1 && c != "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

//Number parser//////////////////////////////////////////////////////////////

var NumberParser = function () {
    this.end = false;
    this.dpUsed = false;
    this.nextMustBeNumber = false;
    this.nextMustBeNumberOrMinus = false;
    this.e = 0;
    /*
    0 = Never had an e in this number
    1 = Last character was an e
    2 = Had an e in this number, never allow again
    */
}

NumberParser.prototype.symbol = SYMBOLS.NUMBER;
NumberParser.ALL_NUMBERS = ".1234567890Ee-";

NumberParser.start = function(o)
{
    return ".1234567890".indexOf(o) > -1;
}

NumberParser.prototype.accept = function (c) {
    if (this.nextMustBeNumber && "1234567890".indexOf(c) == -1)
        throwMalformedNumber(c);
    if (this.nextMustBeNumberOrMinus && "1234567890-".indexOf(c) == -1)
        throwMalformedNumber(c);
    this.nextMustBeNumber = false;
    this.nextMustBeNumberOrMinus = false;
    if (NumberParser.ALL_NUMBERS.indexOf(c) > -1 && c != "")
    {
        if (this.e != 1 && c === "-")
            return false; //Only accept a - after an e/E. Prefix -s should be considered an operator
            
        if (c === ".")
        {
            if (this.dpUsed)
                throwInvalidNumberDPTwice();
            if (this.dpUsed || this.e != 0)
                throwInvalidNumberDPAfterE();
            this.nextMustBeNumber = true;
            this.dpUsed = true; //Do not use decimal points twice. They're only accepted once.
        }
        
        if (this.e == 1)
            this.e = 2; //Last character was e. We're moving on now.
            
        if (c === "E" || c === "e")
        {
            if (this.e == 2)
            {
                throwMultipleExponents();
                return false; //We've had an E before!
            } 
            else 
            {
                this.e = 1;
            }
            this.nextMustBeNumberOrMinus = true;
        }
        return true;
    }
    else
    {
        return false;
    }
}

var scribble_lambda_random = function (n)
{
    return Math.random();
}

var scribble_lambda_lengthOf = function (s)
{
    if (typeof s !== "String")
        throw { name: "Type Mismatch", message: "You can only use strings with lengthOf!" };
    return s.length;
}

function wrapName(n)
{
    return "(getVar.call(this, \""+n+"\"))";
}

var lambdaFunctions = {
    random: "scribble_lambda_random",
    lengthOf: "scribble_lambda_lengthOf",
};

function addSymbolsRecursive(leveledSymbols, start, symbols, stopAfter)
{
    for (var i=start; i<symbols.length; i++)
    {
        if (stopAfter(symbols[i]))
        {
            leveledSymbols.push(leveledSymbols, symbols[i]);
            return i;
        }
        if (symbols[i] instanceof OperatorParser)
        {
            var setStopAfter = null;
            
            if (symbols[i].operator == "(")
            {
                function stopAfterCloseBracket(symbol)
                {
                    return symbol instanceof OperatorParser && symbol.operator == ")";
                }
            }
            else if (symbols[i].operator == "[")
            {
                function stopAfterCloseArrayBracket(symbol)
                {
                    return symbol instanceof OperatorParser && symbol.operator == "]";
                }
            }
            
            if (setStopAfter != null)
            {
                leveledSymbols[leveledSymbols.length-1] = [];
                i = addSymbolsRecursive(leveledSymbols[leveledSymbols.length-1], i+1, symbols, setStopAfter);
            }
        }
        else
        {
            leveledSymbols.push(leveledSymbols, symbols[i]);
        }
    }
}
        
function getLambdaFunction(lambda)
{
    var parsers = [StringParser, OperatorParser, NumberParser, NameParser, WhitespaceParser];
    var symbols = [];
    //Replace all names with a function call to get the value of the variable with that name
    var current_symbol = null;

    //Split "lambda" into symbols. Put the parsers in the "symbols" array and the sanitised strings in "symbolStrings"
    //We also make sure to to one more character than there are to make sure that the current_symbol finished without error
    //i.e. we don't want to have an unclosed string.
    for (var i=0; i<lambda.length+1; i++)
    {
        var c = lambda.charAt(i);
        
        //If we have a symbol, we need to get it to accept the character.
        if (current_symbol != null)
        {
            if (current_symbol.accept(c) && c != "")
            {
                //This isn't the last character (c != "") and the parser accepted it as a valid character
                current_symbol.string += c;
            }
            else
            {
                //The parser did not accept this character.
                symbols.push(current_symbol);
                current_symbol = null;
                current_symbol.string = "";
            }
        }
        
        //If there is no current parser
        if (current_symbol == null)
        {
            //If this is not the end of the string.
            if (c !== "")
            {
                for (var i=0; i<parsers.length; i++)
                {
                    if (parsers[i].start(c))
                    {
                        current_symbol = new parsers[i]();
                        break;
                    }
                }
            }
            
            if (current_symbol != null || c == "") //Do we need to push the name now?
            {
                //Trim the current name.
                //If we've been reading a name, we only want the variable name.
                //If its just whitespace, we don't care.
                current_symbol.string = current_symbol.string.trim();
                if (current_name !== "")
                {
                    symbols.push(current_symbol);
                    current_symbol = null;
                }
                //Clear the previous symbol since it is only used to 
                //check for functions and the order is important (name THEN bracket)
                if (current_symbol === null || !current_symbol.accept(c))
                    throwWTF();
                current_symbol.string += c; //Add the character to the string
            }
        }
    }
    
    var leveledSymbols = [];
    addSymbolsRecursive(leveledSymbols, symbols);
    
    var sanitaryString = "";
    for (var i=0; i<symbols.length; i++)
    {
        var symbol = symbols[i];
         
        if (i != 0 //We had a symbol previously
            && symbols[i-1] instanceof NameParser //Which was a name
            )
        {
            var previous_name = symbolStrings[i-1];
            if (symbol instanceof OperatorParser)
            {
                if (symbol.operator.charAt(0) == "(") //And we are a bracket opening
                {
                    var replacement = lambdaFunctions[previous_name];
                    if (typeof replacement === "undefined")
                    {
                        throw { name: "Unknown function", message: previous_name };
                    }
                    //It's a function! Remove the name parser and make the replacement
                    symbolStrings[i] = replacement + symbolString;
                    
                    symbols.splice(i-1, 1);
                    symbolStrings.splice(i-1, 1);
                    
                    //Back up
                    i--;
                }
                else if (symbol.operator.charAt(0) == "[") //And we are a square bracket opening (array)
                {
                    
                }
            }
        }
    }
        
    sanitaryString += symbolString;
            
    //Cache the eval as a function
    var func;
    var evalMe = "func = function () { return "+sanitary_str+"; }";
    eval(evalMe);
    return func;
}

