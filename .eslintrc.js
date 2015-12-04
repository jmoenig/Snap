"use strict";

module.exports = {
    "ecmaFeatures": {},
    "env": {
        "browser": true,
    },
    "globals": {},
    "rules": {
        // treat var statements as if they were block scoped
        "block-scoped-var": 2,
        // specify the maximum cyclomatic complexity allowed in a program
        "complexity": [0, 11],
        // require return statements to either always or never specify values
        "consistent-return": 2,
        // specify curly brace conventions for all control statements
        "curly": [2, "multi-line"],
        // require default case in switch statements
        "default-case": 2,
        // encourages use of dot notation whenever possible
        "dot-notation": [2, { "allowKeywords": true}],
        // enforces consistent newlines before or after dots
        // TODO: this needs configuration
        // "dot-location": 1,
        // require the use of === and !==
        "eqeqeq": 2,
        // make sure for-in loops have an if statement
        "guard-for-in": 2,
        // disallow the use of alert, confirm, and prompt
        "no-alert": 1,
        // disallow use of arguments.caller or arguments.callee
        "no-caller": 2,
        // disallow division operators explicitly at beginning of regular expression
        "no-div-regex": 0,
        // disallow else after a return in an if
        "no-else-return": 2,
        // disallow use of labels for anything other then loops and switches
        "no-empty-label": 2,
        // disallow comparisons to null without a type-checking operator
        "no-eq-null": 2,
        // disallow use of eval()
        "no-eval": 2,
        // disallow adding to native types
        "no-extend-native": 2,
        // disallow unnecessary function binding
        "no-extra-bind": 2,
        // disallow fallthrough of case statements
        "no-fallthrough": 2,
        // disallow use of leading or trailing decimal points in number literals
        "no-floating-decimal": 2,
        // disallow the type conversions with shorter notations
        "no-implicit-coercion": 0,
        // disallow use of eval()-like methods
        "no-implied-eval": 2,
        // disallow this keywords outside of classes or class-like objects
        "no-invalid-this": 2,
        // disallow usage of __iterator__ property
        "no-iterator": 2,
        // disallow use of labeled statements
        "no-labels": 2,
        // disallow unnecessary nested blocks
        "no-lone-blocks": 2,
        // disallow creation of functions within loops
        "no-loop-func": 2,
        // disallow use of multiple spaces
        "no-multi-spaces": 2,
        // disallow use of multiline strings
        "no-multi-str": 2,
        // disallow reassignments of native objects
        "no-native-reassign": 2,
        // disallow use of new operator when not part of the assignment or comparison
        "no-new": 2,
        // disallow use of new operator for Function object
        "no-new-func": 2,
        // disallows creating new instances of String,Number, and Boolean
        "no-new-wrappers": 2,
        // disallow use of (old style) octal literals
        "no-octal": 2,
        // disallow use of octal escape sequences in string literals, such as
        // var foo = "Copyright \251";
        "no-octal-escape": 2,
        // allow reassignment of function parameters
        "no-param-reassign": 1,
        // disallow usage of __proto__ property
        "no-proto": 2,
        // disallow declaring the same variable more then once
        // NOTE: Currently disabled because this caches var f; function f()
        "no-redeclare": [0,  { "builtinGlobals": true }],
        // disallow use of assignment in return statement
        "no-return-assign": 2,
        // disallow use of `javascript:` urls.
        "no-script-url": 2,
        // disallow comparisons where both sides are exactly the same
        "no-self-compare": 2,
        // disallow use of comma operator
        "no-sequences": 2,
        // restrict what can be thrown as an exception
        "no-throw-literal": 2,
        // disallow usage of expressions in statement position
        "no-unused-expressions": 2,
        // disallow unnecessary .call() and .apply()
        "no-useless-call": 0,
        // disallow use of void operator
        "no-void": 0,
        // disallow use of the with statement
        "no-with": 2,
        // require use of the second argument for parseInt()
        "radix": 2,
        // requires to declare all vars on top of their containing scope
        // FIXME: Currently disabled b/c morphic.js conventions
        "vars-on-top": 0,
        // require immediate function invocation to be wrapped in parentheses
        "wrap-iife": [2, "any"],
        // disallow "Yoda" conditions: "thing" === var
        "yoda": 1,
        // "accessor-pairs": 1,
        // "array-bracket-spacing": 1,
        // "block-spacing": 1,
        "brace-style": [2, "1tbs", { "allowSingleLine": true }],
        // "callback-return": 0,
        // "camelcase": 1,
        "comma-dangle": 2,
        "comma-spacing": 1,
        "comma-style": 1,
        // "computed-property-spacing": 1,
        // Always use name myself for "this" in callbacks
        // "consistent-this": [1, "myself"],
        // files should end with a newline
        "eol-last": 2,
        "func-style": [2, "declaration"],
        // "id-match": 1,
        "indent": [2, 4],
        // "init-declarations": 1,
        // "key-spacing": 1,
        "linebreak-style": [2, "unix"],
        // "lines-around-comment": 1,
        // "max-depth": 1,
        // TODO: enable this
        // "max-len": [2, 80, 4, {"ignoreComments": true, "ignoreUrls": true}],
        // "max-nested-callbacks": 1,
        // "max-params": 1,
        // "max-statements": 1,
        // "new-cap": 1,
        // "new-parens": 1,
        // "newline-after-var": 1,
        // "no-array-constructor": 1,
        // "no-bitwise": 1,
        // "no-caller": 1,
        // "no-catch-shadow": 1,
        "no-cond-assign": 2,
        "no-console": 2,
        // "no-constant-condition": 2,
        // "no-continue": 1,
        "no-control-regex": 2,
        "no-debugger": 2,
        // "no-delete-var": 1,
        "no-dupe-args": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-else-return": 1,
        // "no-empty": 2,
        // "no-empty-character-class": 2,
        // "no-empty-label": 1,
        // "no-ex-assign": 2,
        // "no-extra-bind": 1,
        // "no-extra-boolean-cast": 2,
        // "no-extra-parens": 2,
        "no-extra-semi": 2,
        // "no-fallthrough": 1,
        "no-floating-decimal": 1,
        "no-func-assign": 2,
        // "no-implicit-coercion": 1,
        // "no-inner-declarations": 2,
        // "no-invalid-regexp": 2,
        "no-invalid-this": 1,
        "no-irregular-whitespace": 2,
        // "no-iterator": 1,
        // "no-label-var": 1,
        // "no-labels": 1,
        // "no-lone-blocks": 1,
        // "no-lonely-if": 1,
        // "no-loop-func": 1,
        "no-mixed-spaces-and-tabs": 2,
        // "no-multiple-empty-lines": 1,
        "no-negated-condition": 1,
        "no-negated-in-lhs": 2,
        // "no-nested-ternary": 1,
        // "no-new": 1,
        // "no-new-func": 1,
        // "no-new-object": 1,
        // "no-new-require": 0,
        // "no-new-wrappers": 1,
        // "no-obj-calls": 2,
        // "no-octal": 1,
        // "no-param-reassign": 1,
        // "no-plusplus": 1,
        // "no-proto": 1,
        "no-regex-spaces": 2,
        "no-restricted-syntax": 1,
        "no-return-assign": 1,
        // "no-shadow": 1,
        // "no-shadow-restricted-names": 1,
        // "no-spaced-func": 2,
        // "no-sparse-arrays": 2,
        // "no-ternary": 1,
        "no-trailing-spaces": 1,
        // "no-undef": 1,
        // "no-undef-init": 1,
        // "no-undefined": 1,
        // "no-underscore-dangle": 1,
        // "no-unexpected-multiline": 2,
        // "no-unneeded-ternary": 1,
        // "no-unreachable": 2,
        // "no-unused-expressions": 1,
        // "no-unused-vars": 1,
        // "no-use-before-define": 1,
        // "no-useless-call": 1,
        // "no-useless-concat": 1,
        // "no-void": 1,
        // "no-warning-comments": 1,
        // "no-with": 1,
        // "object-curly-spacing": 1,
        // "one-var": 1,
        // "operator-assignment": 1,
        // "quote-props": 1,
        // disables for now because of very high mix
        // "quotes": [1, 'single', "avoid-escape"],
        // "radix": 1,
        // "semi": 1,
        // "semi-spacing": 1,
        // "sort-vars": 1,
        // "space-after-keywords": 1,
        // "space-before-blocks": 1,
        // "space-before-function-paren": 1,
        // "space-before-keywords": 1,
        "space-in-parens": 1,
        "space-infix-ops": 1,
        "space-return-throw-case": 1,
        // "space-unary-ops": 1,
        // "spaced-comment": 1,
        // "use-isnan": 2,
        "valid-typeof": 2,
        // "wrap-regex": 1
    }
}
