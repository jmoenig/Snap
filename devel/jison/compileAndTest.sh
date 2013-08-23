#!/bin/sh
#Thanks to http://stackoverflow.com/questions/592620/check-if-a-program-exists-from-a-bash-script
command -v jison >/dev/null 2>&1 || { echo "JISON is not installed. See http://zaach.github.io/jison/" >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo "node.js is not installed or could not run \"node\" command" >&2; exit 1; }
jison lambda.jison -o lambdaNodeJS.js 
node lambdaTestCases.js
echo "--> Testing complete. Creating lambda.js: use this to replace /scribble/lambda.js if modifying"
jison lambda.jison -o lambda.js -t js
