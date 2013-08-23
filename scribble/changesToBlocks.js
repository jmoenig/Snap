modules.scribbleBlocks = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

/* We define a global since we use this elsewhere for sanitisation */
validFonts = {
                Arial : ['Arial'],
                ArialBlack : ['Arial Black'],
                CourierNew : ['Courier New'],
                Georgia : ['Georgia'],
                Impact : ['Impact'],
                LucidaConsole : ['Lucida Console'],
                LucidaSansUnicode : ['Lucida Sans Unicode'],
                BookAntiqua : ['Book Antiqua'],
                Tahoma : ['Tahoma'],
                TimesNewRoman : ['Times New Roman'],
                TrebuchetMS : ['Trebuchet MS'],
                Verdana : ['Verdana'],
            };

SyntaxElementMorph.prototype.labelPartSnapapps = function (spec) 
{
    var part;
    switch (spec)
    {
    case '%font':
        part = new InputSlotMorph(
            null,
            false,
            validFonts,
            true
        );
        part.setContents(['Arial']);
        break;
    }
    return part;
}

