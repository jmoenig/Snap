# Snap! Lisp Syntax

> Jens Mönig,
> last updated April 10, 2024

In v10 we have begun to bootstrap parts of Snap!, i.e. to write significant portions of Snap! in itself using the Snap! IDE and, of course, blocks. In order to merge these block-scripts with the JavaScript source code that launches Snap! we first handled these as separate XML files. As the bootstrapping progressed we felt the need to increasingly mix and merge both codes, Snap! and JavaScript, at a finer granularity and in a text form that would be friendlier for us to read and edit. As we were thinking about a minimal syntax for blocks the idea of Lisp kept coming back. Since we think of Snap! as a cross-breed of Scheme and Smalltalk this idea became increasingly attractive. This document describes our Lisp-inspired syntax. A few words of context and caution: 

### It’s not (yet) meant for learners and end-users

We are using this syntax internally for developing extensions and portions of Snap!, e.g. the “blocks-all-the-way” mode of the primitives palette. In doing so we are not writing the Lisp code ourselves, moreover we are generating it from Snap! projects we write using blocks. This is not to say that you cannot use this syntax to write code “from Scratch”, it’s just not very well supported at this time. What’s missing in particular are meaningful - if any - parsing error messages, let alone any IDE integration that lets you write text code in a supported way.

### It’s not real Lisp

The purpose of this syntax is - only! - to represent blocks and their parts, i.e. syntax elements, nothing else. In particular there are no provisions to represent data of any kind, especially lists. Instead, we use this syntax to represent e.g. a reporter block that returns a list once it gets evaluated. While this syntax is heavily inspired by Lisp it lacks some aspects of individual Lisp dialects such as backticks, adds some others such as the variadic "input list" application syntax, and associates a slightly different meaning to again others, such as `nil`, which in Common Lisp stands for an empty list, but in Snap! came to mean an empty input slot, or `f` to represent a Boolean input slot holding a user-set value of `false`, which in some Lisp dialects would also be represented by `nil`. If you keep this in mind you should nevertheless be able to quickly grasp Snap’s textual Lisp-like syntax and enjoy using it for your own purposes and extensions.

### Syntax Highlighting

A nice affordance of Snap!'s Lisp notation is that syntax highlighting can be automatically applied to it in markdown documents using the `lisp` tag:


    ```lisp
    (code ...)
    ```

will render as

```lisp
(code ...)
```
in pages that support syntax highlighting for specific programming languages such as Github.

## Code to Blocks to Code

Beginning in v10 each script (agglomeration of one or more blocks) has an entry in its context menu (available via right-click or option-click) to display its "Lisp code" equivalent in a speech bubble next to the blocks. The result can be exported as file or copied to the clipboard - again via the speech bubble’s context menu.

The same can also be achieved using blocks: Snap! Blocks and Scripts can be split into syntax trees using the SPLIT primitive reporter in combination with the "blocks" option. The resulting syntax tree is a nested list which can be represented in text-only form using the attribute-of-list primitive with the "text" or "lines" selectors; "text" produces a single-line output, "lines" a somewhat pretty-printed multi-line text. Such text can in turn be SPLIT back into a syntax tree by again calling SPLIT with the "blocks" selector. A syntax tree can be assembled into a script of blocks by passing it into the JOIN primitive.

There is a library named "Code to Blocks to Code" that offers 2 little helper blocks that directly transform blocks to Lisp syntax `(encode)` and back again `(parse)`. These blocks can themselves be expressed in Lisp syntax, as follows:

**parse:**

```lisp
((define block "parse code _ to blocks" 
    (ring (join : (split (get code) [blocks])) code)) 
(setBlock [category] (get block) operators) 
(setBlock [slots] (get block) txt))
```

**encode:**

```lisp
((define block "encode blocks _ to text _ pretty" 
    (ring (call
        (ring (data nil (split (get script) [blocks]))) 
        (ifThen (get lines) lines text)
    ) script lines)) 
(setBlock [category] (get block) operators) 
(setBlock [slots] (get block) (list ring bool)) 
(setBlock [defaults] (get block) (list nil (bool t))))
```

These 2 examples already give a preview of what this documentation is about. The following sections explain the details of this Lisp-inspired textual syntax.


# Tokens

A token is a contiguous sequence of non white space characters. It includes numbers, punctuation and special characters, for example:

```lisp
foo
#here
bla*
57
Hi!
50%
```

Tokens are delimited by white space. The following examples are 2 tokens each:

```lisp
foo bar
Hello, World!
40 %
Whoa !
$ 29,99
```

White space can be used inside a token by enclosing it with double quotation marks. The following examples are single tokens:

```lisp
"foo bar garply"
"Hello, World!"
"40 % vol"
"Whoa !"
"due: $ 29,99"
```

Double quotation marks can by used inside a token by escaping them with the backslash character, for example:

```lisp
"Say \"Hello, World!\""
```

The backslash character can be used inside a token by prefixing it with another backslash, for example:

```lisp
"open the directory \\home\\docs"
```

## Comments

Characters following an un-escaped and unquoted semicolon are ignored by the parser:

```lisp
(   ; this is the beginning of a script
    (goto "[random position]") ; the top block
    (face [center]) 
    ;(down) this line will be ignored
    (move 10) 
    (up)
)
```

## Blocks

A block is a sequence of tokens enclosed in parentheses. The first token is the block’s name. A block must have at least one token:

```lisp
(size)
(show)
(stamp)
(clear)
(tempo)
```

Block names are case-insensitive. The following variations are all equivalent:

```lisp
(changeX 10)
(CHANGEX 10)
(ChangeX 10)
(changex 10)
(cHAngEx 10)
```

Most of the time you will not have to worry about identifying a block by its name, because the Lisp code will be generated from actual blocks, which will automatically insert the correct block names. You can also look up block names by dragging them into the scripting area and displaying their Lisp code via their context menus. If you do need to identify a block by its name Snap! distinguishes between primitives and custom blocks.

### Primitive Block Names

Primitive blocks (including "bootstrapped" palette blocks in v10) can be identified either by their "selector" or "code" properties. Both can be looked up in the blocks dictionary defined in the `objects.js` source.

for example:

```lisp
(forward 10)    ; selector
(move 10)       ; code
```

both produce the same block.

### Custom Block Names

Custom blocks are identified by their "label" property. Block labels replace input slots with underscores. Note that block labels often contain white space and therefore must be enclosed by double quotation marks, for example:

```lisp
("jump _ steps high" 50)
```

or:

```lisp
("parse code _ to blocks" "(move 10)")
```

Note that the second snippet is an example of syntactical metaprogramming, it is code which parses code, therefore the second token needs to be quoted, to it doesn't become converted to a block right away, but only when the *block* represented by `"parse code _ to blocks"` gets evaluated.

## Inputs

The tokens following the block’s name are its inputs:

```lisp
(say hello)
(move 10)
(letter 3 world)
(glide 1 50 30)
(- 7 4)
(mod 5 2)
```

A text consisting of multiple words can be placed into a single input slot by putting it into double quotation marks:

```lisp
(split "hello world" e)
```

Parentheses can be used inside tokens by either escaping them with backslashes or by enclosing the token with double quotation marks:

```lisp
(say \(whisper\))
(say "(whisper)")
```


### Polyadic slots

If an input slot can be expanded to hold multiple values, these sub-slots are represented as if they were input slots of the block themselves, i.e. there is no additional nesting level for them:

```lisp
(+ 3 5 7 9)
(min 4 2 6)
(list foo bar garply)
(join ene mene miste)
```

### Empty slots

An empty input slot can be written as two adjacent double quotation marks or using the special token `nil` (without quotation marks):

```lisp
(- "" 2)
(- nil 2)
```

### Boolean slots

Boolean input slots containing directly user set values can be written as `t` for *true* and `f` for *false*. Both are case-insensitive.

```lisp
(waitUntil f)
(ifThen t yes no)
```

If a single `t`, `T`, `f` or `F` is the contents of a text input slot, it can either be escaped or enclosed in double quotation marks:

```lisp
(ifThen t \t \f)
(ifThen t "t" "f")
```

Boolean slots can also be set to *empty* using `nil`:

```lisp
(ifThen nil y n)
```

### Input options

Slots containing special values which the user selects from a drop-down menu can be enclosed in square brackets. This marks them as selectors and make sure these values are localized to the user’s translation setting:

```lisp
(face [mouse-pointer])
(goto [center])
(effect [ghost])
(touches [edge])
(key [space])
(fn [sqrt] 10)
(is 5 [number])
```

if a selector needs to be quoted the quotation marks must enclose the whole selector including the square brackets:

```lisp
(goto "[random position]")
(touches "[pen trails]")
(my "[rotation style]")
(sound "[number of channels]" recording)
(relation "[ray length]" "Sprite(2)")
```


### Reporter inputs

An input to a block that is itself a block can be expressed by nested parentheses:

```lisp
(setX (mouseX))
(thinkFor (answer) 2)
(item 1 (pos))
```

Nesting can span multiple levels

```lisp
(map (ring (^ 2 nil)) (range 1 10))
(goto (+ (list -240 -160) (rand 1 (list 240 160))))
(ifThen (> (mouseX) 0) (* (mouseX) 2) 0)
(call (ring (ifThen (= nil 1) 1 (* nil (call (this [script]) (- nil 1))))) 5)
```

Since tokens are delimited by white space, blocks and their inputs can be written across multiple lines of text and indented arbitrarily, for example:

```lisp
(ifThen (> (mouseX) 0)
    (* (mouseX) 2)
    0
)
```

another example:

```lisp
(goto (+
    (list -240 -160)
    (rand 1 (list 240 160)))
)
```

and yet another:

```lisp
(call 
    (ring 
        (ifThen (empty (get data)) 
            (get data) 
            (cons 
                (call (get fn) (item 1 (get data))) 
                (call (this [script]) (get fn) (cdr (get data))))
        ) fn data) 
    (ring  (list nil (^ nil 2))) 
    (range 1 10))
```


### Variadic slots

Input slots that can be expanded to hold multiple values can often also be replaced with reporters which answer a list of values by dropping the reporter onto their arrow head icons. This "input list:" usage can be expressed by a single colon token followed by the reporter input:

```lisp
(+ : (range 1 10))
```

or:
```lisp
(max : (split "hello world" [letter]))
```

another example:

```lisp
(run 
    (cmd (gotoXY nil nil))
    : (+ (pos) (* 10 (list (fn [sin] (dir)) (fn [cos] (dir)))))
)
```


### Command inputs

Blocks with C-shaped inputs slots also accept other blocks as inputs. These can be expressed by nested parentheses as well,

```lisp
(repeat 10 (changeSize 10))
```

and also broken up across several lines with arbitrary indentations:

```lisp
(forever 
    (ifElse (touches [mouse-pointer]) 
        (sayFor Gotcha! 2) 
        (goto "[random position]")
    )
)
```


## Scripts

A stack of command blocks is a sequence of blocks enclosed by parentheses:

```lisp
((move 10) (turn 15))
```

Again, the tokens can be arranged across multiple lines for better readability:

```lisp
(
    (goto "[random position]") 
    (face [center]) 
    (down) 
    (move 10) 
    (up)
)
```

Stacks of commands inside C-shaped input slots follow the same markings:

```lisp
(
    (down) 
    (repeat 4 (
        (move 100) 
        (right 90)
    )) 
    (up)
)
```
