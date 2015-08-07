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

// Lazy-evaluation of block highlighting: Processes call addHighlight and removeHighlight upon 
// process start and end. In cellular, this effect is only amplified many times. Since a call to 
// addHighlight will always cause immediate redrawing and re-blurring, it is quite expensive. So we
// need to hold off on making these calls until absolutely neccessary.
//
// This code creates a new set of functions: 
//  - cachedRemoveHighlight
//  - cachedAddHighlight
//  - cachedAddErrorHighlight
//
// These are used in threads.js directly.

BlockMorph.prototype._snapapps_highlightStackSize = 0; // null means error highlighting, don't adjust it.
BlockMorph.prototype._snapapps_cachedHighlightAction = -1;

BlockMorph.prototype._snapapps_uncacheHighlight = function() {
    if (this._snapapps_cachedHighlightAction !== -1) {
        if (this._snapapps_cachedHighlightAction === 0) {
            this.removeHighlight();
        } else if (this._snapapps_cachedHighlightAction === 1) {
            var initialStackSize = this._snapapps_highlightStackSize;
            this.addHighlight();
            this._snapapps_highlightStackSize = initialStackSize;
        } else if (this._snapapps_cachedHighlightAction === 2) {
            this.addErrorHighlight();
        }
    }
}

BlockMorph.prototype.cachedPopHighlight = function () {
    console.log("cachedPopHighlight: " + this._snapapps_highlightStackSize);
    if (this._snapapps_highlightStackSize === null) {
        return;
    }
    this._snapapps_highlightStackSize--;
    if (this._snapapps_highlightStackSize > 0) {
        return;
    }
    this._snapapps_highlightStackSize = 0;
    
    if (this._snapapps_cachedHighlightAction === -1) {
        this.fullChanged();
    }
    this._snapapps_cachedHighlightAction = 0;
}

BlockMorph.prototype.cachedPushHighlight = function () {
    if (this._snapapps_highlightStackSize === null) {
        return;
    } else {
        this._snapapps_highlightStackSize++;
    }
    console.log("cachedPushHighlight: " + this._snapapps_highlightStackSize);
    if (this._snapapps_cachedHighlightAction === -1) {
        this.fullChanged();
    }
    this._snapapps_cachedHighlightAction = 1;
}

BlockMorph.prototype.cachedAddErrorHighlight = function () {
    this._snapapps_highlightStackSize = null;
    if (this._snapapps_cachedHighlightAction === -1) {
        this.fullChanged();
    }
    this._snapapps_cachedHighlightAction = 2;
}

BlockMorph.prototype.uberAddHighlight = BlockMorph.prototype.addHighlight;
BlockMorph.prototype.addHighlight = function (oldHighlight) {
    this._snapapps_cachedHighlightAction = -1;
    return this.uberAddHighlight(oldHighlight);
};

BlockMorph.prototype.uberAddErrorHighlight = BlockMorph.prototype.addErrorHighlight;
BlockMorph.prototype.addErrorHighlight = function () {
    this._snapapps_highlightStackSize = null;
    this._snapapps_cachedHighlightAction = -1;
    return this.uberAddErrorHighlight();
};

BlockMorph.prototype.uberRemoveHighlight = BlockMorph.prototype.removeHighlight;
BlockMorph.prototype.removeHighlight = function () {
    this._snapapps_highlightStackSize = 0;
    this._snapapps_cachedHighlightAction = -1;
    return this.uberRemoveHighlight();
};

BlockMorph.prototype.uberGetHighlight = BlockMorph.prototype.getHighlight;
BlockMorph.prototype.getHighlight = function () {
    this._snapapps_uncacheHighlight();
    return this.uberGetHighlight();
};

BlockMorph.prototype.uberDrawOn = BlockMorph.prototype.drawOn;
BlockMorph.prototype.drawOn = function (aCanvas, aRect) {
    this._snapapps_uncacheHighlight();
    return this.uberDrawOn(aCanvas, aRect);
};
