```
/*

    tables.js

    basic spreadsheet elements for Snap!

    written by Jens Mönig
    jens@moenig.org

    Copyright (C) 2016 by Jens Mönig

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
    needs morphic.js, list.js, widgets.js, byob.js, threads


    I. hierarchy
    -------------
    the following tree lists all constructors hierarchically,
    indentation indicating inheritance. Refer to this list to get a
    contextual overview:

    DialogBoxMorph**
        TableDialogMorph
    Morph*
        FrameMorph*
            TableMorph
        TableCellMorph
        TableFrameMorph
    Table

    * from morphic.js
    ** from widgets.js


    II. toc
    -------
    the following list shows the order in which all constructors are
    defined. Use this list to locate code in this document:

    Table
    TableCellMorph
    TableMorph
    TableFrameMorph
    TableDialogMorph

*/
```