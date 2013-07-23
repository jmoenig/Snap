#!/bin/sh
#Thanks to http://stackoverflow.com/questions/592620/check-if-a-program-exists-from-a-bash-script
command -v jison >/dev/null 2>&1 || { echo "JISON is not installed. See http://zaach.github.io/jison/" >&2; exit 1; }
jison lambda.jison && node lambdaTestCases.js
echo "--> Testing complete. Creating webLambda.js: use this to replace /scribble/lambda.js if modifying"
jison lambda.jison -o webLambda.js -t js
