# Snap! Lisp Syntax

> Jens Mönig,
> last updated September 12, 2024

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

### Code to Blocks to Code

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


## Tokens

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


### Script Parameters

When parsed by Snap!, a script is reported as a nested reporter block or as a stack of command blocks enclosed by a ring, which turns it into an anonymous function. If that script function is to have one or more formal parameters those variable names can be added as additional tokens of the first block in the script.

Here is an example for an anonymous function that squares a given number:

```lisp
(^ (get n) 2 n)
```

Since the POW reporter only takes 2 inputs, the third one - the token `n` becomes a formal parameter of the script ring, which in turn becomes a monadic function.

Another example of a monadic procedure that draws an arbitrarily sized triangle:

```lisp
(
    (down steps) 
    (repeat 3 (
        (move (get steps)) 
        (right 90)
    )) 
    (up)
)
```

Again, because the first block in this script `(down)` doesn't have any input slots, its `steps` token becomes a formal parameter of the procedure script.


#### Declaring Script Parameters for Polyadic Block Inputs

In cases in which the first block in a script ends with a polyadic input slot - one that can hold any number of inputs - script inputs cannot be simply added to the list of its tokens. Instead the polyadic slot's actual inputs need to be explicitly listed apart from the script parameters. This can be accomplished with the colon (`:`) notation followed by a pseudo-block named `items` whose tokens represent the multi-slot's inputs.

Here's an example of using the variadic addition reporter for a function that doubles a given number:

```lisp
(+ : (items (get n) (get n)) n)
```

Note that when Snap! encodes a function to LISP syntax it automatically recognizes this situation and explicitly enumerates polyadic input tokens followed by script parameters. Unless you're writing LISP code by hand you don't have to remember the syntax for this special case.


## Apendix: Primitive Block Names

| Palette | Label | Name | Type | Example |
|-|-|-|-|-|
| **motion** | move _ steps | **move** | *command* | ` (move 10) ` |
|  | turn $clockwise _ degrees | **right** |  | ` (right 15) ` |
|  | turn $counterclockwise _ degrees | **left** |  | ` (left 15) ` |
|  | point in direction _ | **head** |  | ` (head 90) ` |
|  | point towards _ | **face** |  | ` (face [mouse-pointer]) ` |
|  | go to x: _ y: _ | **go** |  | ` (go 0 0) ` |
|  | go to _ | **goto** |  | ` (goto "[random position]") ` |
|  | glide _ secs to x: _ y: _ | **glide** |  | ` (glide 1 0 0) ` |
|  | change x by _ | **+x** |  | ` (+x 10) ` |
|  | set x to _ | **x=** |  | ` (x= 0) ` |
|  | change y by _ | **+y** |  | ` (+y 10) ` |
|  | set y to _ | **y=** |  | ` (y= 0) ` |
|  | if on edge, bounce | **bounce** |  | ` (bounce) ` |
|  | position | **pos** | *reporter* | ` (pos) ` |
|  | x position | **x** |  | ` (x) ` |
|  | y position | **y** |  | ` (y) ` |
|  | direction | **dir** |  | ` (dir) ` |
| **looks** | switch to costume _ | **wear** | *command* | ` (wear nil) ` |
|  | next costume | **next** |  | ` (next) ` |
|  | costume # | **costume#** | *reporter* | ` (costume#) ` |
|  | say _ for _ secs | **sayFor** | *command* | ` (sayFor Hello! 2) ` |
|  | say _ | **say** |  | ` (say Hello!) ` |
|  | think _ for _ secs | **thinkFor** |  | ` (thinkFor Hmm... 2) ` |
|  | think _ | **think** |  | ` (think Hmm...) ` |
|  | _ of costume _ | **costume** | *reporter* | ` (costume [width] [current]) ` |
|  | stretch _ x: _ y: _ % | **stretch** |  | ` (stretch [current] 100 50) ` |
|  | skew _ to _ degrees _ % | **skew** |  | ` (skew [current] 0 50) ` |
|  | new costume _ width _ height _ | **newCostume** |  | ` (newCostume nil nil nil) ` |
|  | change _ effect by _ | **+effect** | *command* | ` (+effect [ghost] 25) ` |
|  | set _ effect to _ | **effect=** |  | ` (effect= [ghost] 0) ` |
|  | clear graphic effects | **clearEffects** |  | ` (clearEffects) ` |
|  | _ effect | **effect** | *reporter* | ` (effect [ghost]) ` |
|  | change size by _ | **+size** | *command* | ` (+size 10) ` |
|  | set size to _ % | **size=** |  | ` (size= 100) ` |
|  | size | **size** | *reporter* | ` (size) ` |
|  | show | **show** | *command* | ` (show) ` |
|  | hide | **hide** |  | ` (hide) ` |
|  | shown? | **shown** | *predicate* | ` (shown) ` |
|  | go to _ layer | **layer** | *command* | ` (layer [front]) ` |
|  | go back _ layers | **back** |  | ` (back 1) ` |
| **sound** | play sound _ | **play** |  | ` (play nil) ` |
|  | play sound _ until done | **playAll** |  | ` (playAll nil) ` |
|  | stop all sounds | **stopSounds** |  | ` (stopSounds) ` |
|  | play sound _ at _ Hz | **playAt** |  | ` (playAt nil 44100) ` |
|  | _ of sound _ | **sound** | *reporter* | ` (sound [duration] nil) ` |
|  | new sound _ rate _ Hz | **newSound** |  | ` (newSound nil 44100) ` |
|  | rest for _ beats | **rest** | *command* | ` (rest 0.2) ` |
|  | play note _ for _ beats | **note** |  | ` (note 60 0.5) ` |
|  | set instrument to _ | **instrument** |  | ` (instrument 1) ` |
|  | change tempo by _ | **+tempo** |  | ` (+tempo 20) ` |
|  | set tempo to _ bpm | **tempo=** |  | ` (tempo= 60) ` |
|  | tempo | **tempo** | *reporter* | ` (tempo) ` |
|  | change volume by _ | **+vol** | *command* | ` (+vol 10) ` |
|  | set volume to _ % | **vol=** |  | ` (vol= 100) ` |
|  | volume | **vol** | *reporter* | ` (vol) ` |
|  | change balance by _ | **+pan** | *command* | ` (+pan 10) ` |
|  | set balance to _ | **pan=** |  | ` (pan= 0) ` |
|  | balance | **pan** | *reporter* | ` (pan) ` |
|  | play frequency _ Hz | **freq** | *command* | ` (freq 440) ` |
|  | stop frequency | **stopFreq** |  | ` (stopFreq) ` |
| **pen** | clear | **clear** |  | ` (clear) ` |
|  | pen down | **down** |  | ` (down) ` |
|  | pen up | **up** |  | ` (up) ` |
|  | pen down? | **down?** | *predicate* | ` (down?) ` |
|  | set pen color to _ | **setColor** | *command* | ` (setColor "rgba(145,26,68,1)") ` |
|  | change pen _ by _ | **+pen** |  | ` (+pen [hue] 10) ` |
|  | set pen _ to _ | **pen=** |  | ` (pen= [hue] 50) ` |
|  | pen _ | **pen** | *reporter* | ` (pen [hue]) ` |
|  | change pen size by _ | **+penSize** | *command* | ` (+penSize 1) ` |
|  | set pen size to _ | **penSize=** |  | ` (penSize= 1) ` |
|  | stamp | **stamp** |  | ` (stamp) ` |
|  | fill | **fill** |  | ` (fill) ` |
|  | write _ size _ | **write** |  | ` (write Hello! 12) ` |
|  | pen trails | **trails** | *reporter* | ` (trails) ` |
|  | paste on _ | **paste** | *command* | ` (paste nil) ` |
|  | cut from _ | **cut** |  | ` (cut nil) ` |
| **control** | broadcast _ _ | **send** |  | ` (send nil) ` |
|  | broadcast _ _ and wait | **sendAll** |  | ` (sendAll nil) ` |
|  | warp _ | **warp** |  | ` (warp nil) ` |
|  | wait _ secs | **wait** |  | ` (wait 1) ` |
|  | wait until _ | **waitUntil** |  | ` (waitUntil nil) ` |
|  | forever _ | **forever** |  | ` (forever nil) ` |
|  | repeat _ _ | **repeat** |  | ` (repeat 10 nil) ` |
|  | repeat until _ _ | **until** |  | ` (until nil nil) ` |
|  | for _ = _ to _ _ | **for** |  | ` (for i 1 10 nil) ` |
|  | if _ _ _ | **if** |  | ` (if nil nil) ` |
|  | if _ _ else _ | **ifElse** |  | ` (ifElse nil nil nil) ` |
|  | if _ then _ else _ | **ifThen** | *reporter* | ` (ifThen nil nil nil) ` |
|  | report _ | **report** | *command* | ` (report nil) ` |
|  | stop _ | **stop** |  | ` (stop [all]) ` |
|  | run _ _ | **run** |  | ` (run nil) ` |
|  | launch _ _ | **fork** |  | ` (fork nil) ` |
|  | call _ _ | **call** | *reporter* | ` (call nil) ` |
|  | pipe _ $arrowRight _ | **pipe** |  | ` (pipe nil nil) ` |
|  | tell _ to _ _ | **tell** | *command* | ` (tell nil nil) ` |
|  | ask _ for _ _ | **ask** | *reporter* | ` (ask nil nil) ` |
|  | create a clone of _ | **clone** | *command* | ` (clone [myself]) ` |
|  | a new clone of _ | **newClone** | *reporter* | ` (newClone [myself]) ` |
|  | delete this clone | **removeClone** | *command* | ` (removeClone) ` |
|  | pause all $pause | **pause** |  | ` (pause) ` |
|  | switch to scene _ _ | **scene** |  | ` (scene [next]) ` |
|  | define _ _ _ | **define** |  | ` (define block nil nil) ` |
|  | delete block _ | **deleteBlock** |  | ` (deleteBlock nil) ` |
|  | set _ of block _ to _ | **setBlock** |  | ` (setBlock [label] nil nil) ` |
|  | _ of block _ | **block** | *reporter* | ` (block [definition] nil) ` |
|  | this _ | **this** |  | ` (this [script]) ` |
| **sensing** | touching _ ? | **touch** | *predicate* | ` (touch [mouse-pointer]) ` |
|  | touching _ ? | **touchColor** |  | ` (touchColor "rgba(145,26,68,1)") ` |
|  | color _ is touching _ ? | **colorTouch** |  | ` (colorTouch "rgba(145,26,68,1)" "rgba(145,26,68,1)") ` |
|  | ask _ and wait | **doAsk** | *command* | ` (doAsk "what's your name?") ` |
|  | answer | **answer** | *reporter* | ` (answer) ` |
|  | mouse position | **mouse** |  | ` (mouse) ` |
|  | mouse x | **mouseX** |  | ` (mouseX) ` |
|  | mouse y | **mouseY** |  | ` (mouseY) ` |
|  | mouse down? | **mouseDown** | *predicate* | ` (mouseDown) ` |
|  | key _ pressed? | **key** |  | ` (key [space]) ` |
|  | _ to _ | **relation** | *reporter* | ` (relation [distance] [mouse-pointer]) ` |
|  | _ at _ | **aspect** |  | ` (aspect [hue] [mouse-pointer]) ` |
|  | reset timer | **resetTimer** | *command* | ` (resetTimer) ` |
|  | timer | **timer** | *reporter* | ` (timer) ` |
|  | current _ | **current** |  | ` (current [date]) ` |
|  | _ of _ | **attribute** |  | ` (attribute "[costume #]" nil) ` |
|  | my _ | **my** |  | ` (my [neighbors]) ` |
|  | object _ | **object** |  | ` (object [myself]) ` |
|  | url _ | **url** |  | ` (url snap.berkeley.edu) ` |
|  | microphone _ | **audio** |  | ` (audio [volume]) ` |
|  | video _ on _ | **video** |  | ` (video [motion] [myself]) ` |
|  | set video transparency to _ | **transparency** | *command* | ` (transparency 50) ` |
|  | is _ on? | **global** | *predicate* | ` (global "[turbo mode]") ` |
|  | set _ to _ | **global=** | *command* | ` (global= "[video capture]" nil) ` |
| **operators** | _ _ | **cmd** | *ring* | ` (cmd nil) ` |
|  | _ _ | **ring** |  | ` (ring nil) ` |
|  | _ _ | **pred** |  | ` (pred nil) ` |
|  | _ | **+** | *reporter* | ` (+ nil nil) ` |
|  | _ − _ | **-** |  | ` (- nil nil) ` |
|  | _ | ***** |  | ` (* nil nil) ` |
|  | _ / _ | **/** |  | ` (/ nil nil) ` |
|  | _ ^ _ | **^** |  | ` (^ nil nil) ` |
|  | _ mod _ | **mod** |  | ` (mod nil nil) ` |
|  | _ | **min** |  | ` (min nil nil) ` |
|  | _ | **max** |  | ` (max nil nil) ` |
|  | round _ | **round** |  | ` (round nil) ` |
|  | _ of _ | **fn** |  | ` (fn [sqrt] 10) ` |
|  | atan2 _ ÷ _ | **atan2** |  | ` (atan2 nil nil) ` |
|  | pick random _ to _ | **rand** |  | ` (rand 1 10) ` |
|  | _ | **<** | *predicate* | ` (< nil nil) ` |
|  | _ | **=** |  | ` (= nil nil) ` |
|  | _ | **>** |  | ` (> nil nil) ` |
|  | _ | **and** |  | ` (and nil nil) ` |
|  | _ | **or** |  | ` (or nil nil) ` |
|  | not _ | **not** |  | ` (not nil) ` |
|  | _ | **bool** |  | ` (bool t) ` |
|  | join _ | **join** | *reporter* | ` (join "hello " world) ` |
|  | split _ by _ | **split** |  | ` (split "hello world" " ") ` |
|  | letter _ of _ | **letter** |  | ` (letter 1 world) ` |
|  | _ of text _ | **text** |  | ` (text [length] world) ` |
|  | unicode of _ | **unicode** |  | ` (unicode a) ` |
|  | unicode _ as letter | **toLetter** |  | ` (toLetter 65) ` |
|  | is _ a _ ? | **is** | *predicate* | ` (is 5 [number]) ` |
|  | is _ ? | **same** |  | ` (same nil nil) ` |
|  | JavaScript function ( _ ) { _ } | **js** | *reporter* | ` (js nil nil) ` |
| **variables** | set _ to _ | **set** | *command* | ` (set nil 0) ` |
|  | change _ by _ | **+=** |  | ` (+= nil 1) ` |
|  | show variable _ | **showVar** |  | ` (showVar nil) ` |
|  | hide variable _ | **hideVar** |  | ` (hideVar nil) ` |
|  | script variables _ | **var** |  | ` (var a) ` |
|  | inherit _ | **inherit** |  | ` (inherit nil) ` |
| **lists** | list _ | **list** | *reporter* | ` (list nil) ` |
|  | numbers from _ to _ | **range** |  | ` (range 1 10) ` |
|  | _ in front of _ | **cons** |  | ` (cons nil nil) ` |
|  | item _ of _ | **item** |  | ` (item 1 nil) ` |
|  | all but first of _ | **cdr** |  | ` (cdr nil) ` |
|  | _ of _ | **data** |  | ` (data [length] nil) ` |
|  | index of _ in _ | **#** |  | ` (# thing nil) ` |
|  | _ contains _ | **contains** | *predicate* | ` (contains nil thing) ` |
|  | is _ empty? | **empty** |  | ` (empty nil) ` |
|  | map _ over _ | **map** | *reporter* | ` (map nil nil) ` |
|  | keep items _ from _ | **keep** |  | ` (keep nil nil) ` |
|  | find first item _ in _ | **find** |  | ` (find nil nil) ` |
|  | combine _ using _ | **combine** |  | ` (combine nil nil) ` |
|  | for each _ in _ _ | **forEach** | *command* | ` (forEach item nil nil) ` |
|  | add _ to _ | **add** |  | ` (add thing nil) ` |
|  | delete _ of _ | **del** |  | ` (del 1 nil) ` |
|  | insert _ at _ of _ | **ins** |  | ` (ins thing 1 nil) ` |
|  | replace item _ of _ with _ | **put** |  | ` (put 1 nil thing) ` |
|  | append _ | **append** | *reporter* | ` (append nil nil) ` |
|  | reshape _ to _ | **reshape** |  | ` (reshape nil 4 3) ` |
|  | combinations _ | **combinations** |  | ` (combinations nil nil) ` |
| **special** | (hidden) | **input items** | *polyadic input* | ` : (items foo bar baz) ` |
