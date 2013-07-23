/*
 * SCRIBBLE LAMDA PARSER GRAMMAR.
 * Evaluates scribble lambda notation to a javascript expression in string format.
 * It is required that the user define 5 variables
 * var SCRIBBLE_LAMBDA_FUNCTIONS_NAME:
 *     The name of a defined name-associative array of functions.
 * var SCRIBBLE_LAMBDA_GETVAR_NAME:
 *     The name of a function that will return the value of a given variable, "<argument1>". 
 * var SCRIBBLE_LAMBDA_GETLIST_NAME:
 *     The name of a function that will return the value of "<argument1>[<argument2>]". 
 * var SCRIBBLE_LAMBDA_PREFIX_ARGS:
 *     Something to be prefixed after the "(" when calling an above function. For user arguments.
 * var SCRIBBLE_LAMBDA_PREFIX_ARGS_COUNT:
 *     The number of arguments that SCRIBBLE_LAMBDA_PREFIX_ARGS adds to the function call. This is to allow compile time argument count checking.
 */

/*
 * First we define some safety helpers
 */
%{
    //From http://stackoverflow.com/questions/770523/escaping-strings-in-javascript
    function lambda_addslashes(str) {
        return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
    }
    function lambda_htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
%}

/* lexical grammar */
%lex
%s string
%s string_escaped
%s string_unicode_escape
%%

<INITIAL>"\""            			   	{ this.begin("string"); return "STRING_START"; }
<string>"\\"              			  	{ this.begin("string_escaped"); }
<string_escaped>"\\"      			   	{ this.popState(); return "STRING_ANYTHING"; }
<string_escaped>"\""    			    { this.popState(); return "STRING_ANYTHING"; }
<string_escaped>"x"        				{ this.popState(); this.begin("string_unicode_escape"); return "STRING_UNICODE_ESCAPE_START"; }
<string_unicode_escape>[0-9a-fA-F]{4}	{ this.popState(); return "STRING_UNICODE_ESCAPE_END"; }
<string>"\""                			{ this.popState(); return "STRING_END"; }
<string>.                   			return "STRING_ANYTHING"
\s+                         			/* skip whitespace */
[0-9]+("."[0-9]+)?\b        			return 'NUMBER'
"*"                         			return '*'
"/"                         			return '/'
"-"                         			return '-'
"+"                         			return '+'
">"                         			return '>'
"<"                         			return '<'
"^"                         			return '^'
"("                         			return '('
")"                         			return ')'
"["                         			return '['
"]"                         			return ']'
","                         			return ','
"<="                        			return '<='
">="                        			return '>='
/* Let them be reversed too */
"=<"                        			return '<='
"=>"                        			return '>='
/* Equals has new meaning */
"=="                        			return '=='
"="                         			return '=='
"!="                        			return '!='
"=!"                        			return '!='
[oO][rR]                     			return 'OR'
"|"                          			return 'OR'
"||"                          			return 'OR'
[aA][nN][dD]                  			return 'AND'
"&"                          			return 'AND'
"&&"                          			return 'AND'
[nN][oO][tT]                  			return 'NOT'
"!"                           			return 'NOT'
[xX][oO][rR]                  			return 'XOR'
"?"                           			return '?'
":"                           			return ':'
"PI"                        			return 'PI'
"E"                         			return 'E'
<<EOF>>                     			return 'END_OF_EXPRESSION'
[Tt][Rr][Uu][Ee]               			return 'TRUE'
[Ff][Aa][Ll][Ss][Ee]          			return 'FALSE'
[a-zA-Z_]+[a-zA-Z_0-9]*\b   			return 'IDENTIFIER'
.                           			return 'INVALID'

/lex

/* operator associations and precedence */
%left 'XOR'
%left 'OR'
%left 'AND'
%left '>' '<'
%left '<=' '>='
%left '==' '!='
%left 'NOT'
%left '+' '-'
%left '*' '/'
%left '^'
%left UNARY
%nonassoc '?' ':'
%start lambda

%% /* language grammar */

lambda
    : expression END_OF_EXPRESSION
      {
          return $1;
      }
    ;
    
function_call
    : IDENTIFIER '(' argument_list ')'
      {
          var functions = window[SCRIBBLE_LAMBDA_FUNCTIONS_NAME];
          var argCount = functions[$1].length - SCRIBBLE_LAMBDA_PREFIX_ARGS_COUNT;
          if ($1 in functions)
          {
              if (argCount != $3.num_args)
              {
                  throw { name: "Wrong number of arguments to function", message: "Function named \"" + lambda_htmlEntities($1) + "\" expects " + argCount + " argument(s), given " + $3.num_args + "."};
              }
              $$ = SCRIBBLE_LAMBDA_FUNCTIONS_NAME + '["' + lambda_addslashes($1) + '"]' + '(' + SCRIBBLE_LAMBDA_PREFIX_ARGS + $3.arg_string + ')';
          }
          else
              throw { name: "Invalid function", message: "No <b>function</b> named \"" + lambda_htmlEntities($1) + "\" exists." };
      }
    ;

argument_list
    : expression
    { $$ = { arg_string: "(" + $1 + ")", num_args: 1 } }
    | argument_list ',' expression
    {
        $1.arg_string += ",(" + $3 + ")";
        $1.num_args++;
        $$ = $1; 
    }
    ;
    
unfinished_string
    : STRING_START
      {
         $$ = "\"";
      }
    | unfinished_string STRING_ANYTHING
      {
          $$ = $1 + lambda_addslashes($2); //Escape the character if required
      }
    | unfinished_string STRING_UNICODE_ESCAPE_START STRING_UNICODE_ESCAPE_END
      {
          $$ = $1 + "\\x" + $3; //Unicode escape
      }
    ;
    
string
    : unfinished_string STRING_END
      {
          $$ = $1 + "\"";
      }
    ;
    
expression
    : '-' expression %prec UNARY
      { $$ = "(-(" + $2  + "))" }
    | expression '+' expression
      { $$ = "((" + $1 + ") + (" + $3 + "))" }
    | expression '-' expression
      { $$ = "((" + $1 + ") - (" + $3 + "))" }
    | expression '*' expression
      { $$ = "((" + $1 + ") * (" + $3 + "))" }
    | expression '^' expression
      { $$ = "Math.pow((" + $1 + "),(" + $3 +"))" }
      
    | expression '>' expression
      { $$ = "((" + $1 + ") > (" + $3 + "))" }
    | expression '<' expression
      { $$ = "((" + $1 + ") < (" + $3 + "))" }
    | expression '<=' expression
      { $$ = "((" + $1 + ") <= (" + $3 + "))" }
    | expression '>=' expression
      { $$ = "((" + $1 + ") >= (" + $3 + "))" }
    | expression '==' expression
      { $$ = "((" + $1 + ") == (" + $3 + "))" }
    | expression '!=' expression
      { $$ = "((" + $1 + ") != (" + $3 + "))" }
      
    | expression AND expression
      { $$ = "((" + $1 + ") && (" + $3 + "))" }
    | expression OR expression
      { $$ = "((" + $1 + ") || (" + $3 + "))" }
    | expression XOR expression
      { $$ = "((" + $1 + ") != (" + $3 + "))" }
    | expression '?' expression ':' expression
      { $$ = "((" + $1 + ") ? (" + $3 + ") : (" + $5 + "))" }
      
    | NOT expression %prec UNARY
      { $$ = "!(" + $2  + ")" }
      
    | IDENTIFIER '[' expression ']'
      { $$ = SCRIBBLE_LAMBDA_GETLIST_NAME + "(" + SCRIBBLE_LAMBDA_PREFIX_ARGS + "\"" + lambda_addslashes($1) + "\", (" + $3 +"))" }
    | IDENTIFIER 
      { $$ = SCRIBBLE_LAMBDA_GETVAR_NAME + "(" + SCRIBBLE_LAMBDA_PREFIX_ARGS + "\"" + lambda_addslashes($1) + "\")" }
      
    | '(' expression ')'
      { $$ = "(" + $2  + ")" }
      
    | NUMBER
      { $$ = $1 }
    | TRUE
      { $$ = "true" }
    | FALSE
      { $$ = "false" }
    | PI
      { $$ = "Math.PI" }
    | E
      { $$ = "Math.E" }
    | function_call
      { $$ = $1 }
    | string
      { $$ = $1; }
    ;
