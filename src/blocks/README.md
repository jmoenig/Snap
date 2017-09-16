```
/*

    blocks.js

    a programming construction kit
    based on morphic.js
    inspired by Scratch

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2017 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    prerequisites:
    --------------
    needs morphic.js and symbols.js


    hierarchy
    ---------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

        Morph*
            ArrowMorph
            BlockHighlightMorph
            ScriptsMorph
            SyntaxElementMorph
                ArgMorph
                    ArgLabelMorph
                    BooleanSlotMorph
                    ColorSlotMorph
                    CommandSlotMorph
                        CSlotMorph
                        RingCommandSlotMorph
                    FunctionSlotMorph
                        ReporterSlotMorph
                            RingReporterSlotMorph
                    InputSlotMorph
                        TextSlotMorph
                    MultiArgMorph
                    TemplateSlotMorph
                BlockMorph
                    CommandBlockMorph
                        HatBlockMorph
                    ReporterBlockMorph
                        RingMorph
        BoxMorph*
            CommentMorph
            ScriptFocusMorph

    * from morphic.js


    toc
    ---
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

        SyntaxElementMorph
        BlockMorph
        CommandBlockMorph
        HatBlockMorph
        ReporterBlockMorph
        RingMorph
        ScriptsMorph
        ArgMorph
        CommandSlotMorph
        RingCommandSlotMorph
        CSlotMorph
        InputSlotMorph
        BooleanSlotMorph
        ArrowMorph
        TextSlotMorph
        ColorSlotMorph
        TemplateSlotMorph
        BlockHighlightMorph
        MultiArgMorph
        ArgLabelMorph
        FunctionSlotMorph
        ReporterSlotMorph
        RingReporterSlotMorph
        CommentMorph


    structure of syntax elements
    ----------------------------
    the structure of syntax elements is identical with their morphic
    tree. There are, however, accessor methods to get (only) the
    parts which are relevant for evaluation wherever appropriate.

    In Scratch/BYOB every sprite and the stage has its own "blocks bin",
    an instance of ScriptsMorph (we're going to name it differently in
    Snap, probably just "scripts").

    At the top most level blocks are assembled into stacks in ScriptsMorph
    instances. A ScriptsMorph contains nothing but blocks, therefore
    every child of a ScriptsMorph is expected to be a block.

    Each block contains:

        selector    - indicating the name of the function it triggers,

    Its arguments are first evaluated and then passed along    as the
    selector is called. Arguments can be either instances of ArgMorph
    or ReporterBlockMorph. The getter method for a block's arguments is

        inputs()    - gets an array of arg morphs and/or reporter blocks

    in addition to inputs, command blocks also know their

        nextBlock()    - gets the block attached to the receiver's bottom

    and the block they're attached to - if any: Their parent.

    please also refer to the high-level comment at the beginning of each
    constructor for further details.
*/
```