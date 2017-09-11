modules.cellularBlocks = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

/*
** Deals with some additional argument types that blocks can have in cellular.
*/
SyntaxElementMorph.prototype.labelPartScribble = SyntaxElementMorph.prototype.labelPartSnapapps
SyntaxElementMorph.prototype.labelPartSnapapps = function (spec) 
{
	if (spec == "%clat")
	{
		var input = new InputSlotMorph(
			null,
			false,
			'cellAttributesMenu',
			true
		);
		input.setContents(Cell.attributes.length > 0 ? Cell.attributes[0] : "");
		return input;
	}
	if (spec == "%ntci") //No typing circle input
	{
		return new InputSlotMorph(
			null,
			false,
			'cellAttributesMenu',
			true
		);
	}
	if (spec == "%celldir") //No typing circle input
	{
		var part = new InputSlotMorph(
                null,
                false,
                {
                    'top left': ['top left'],
					'above': ['above'],
					'top right': ['top right'],
                    'left': ['left'],
					'right': ['right'],
                    'bottom left': ['bottom left'],
					'below': ['below'],
					'bottom right': ['bottom right'],
                },
                true
            );
            part.setContents(['above']);
        return part;
	}
    return this.labelPartScribble(spec);
}

/*
** Returns a menu of all the cell attributes.
*/
InputSlotMorph.prototype.cellAttributesMenu = function () {
    var dict = {};
	for (var i=0; i<Cell.attributes.length; i++)
	{
		dict[Cell.attributes[i]] = Cell.attributes[i];
	}
    return dict;
};

/*
** This overrides the default execution of a block when clicked.
**
** If the block is a ReporterBlockMorph, it is only run once.
** Otherwise, the block is run for all clones.
*/
BlockMorph.prototype.mouseClickLeft = function () {
    var top = this.topBlock(),
        receiver = top.scriptTarget(),
        shiftClicked = this.world().currentKey === 16,
        stage;
    if (shiftClicked && !this.isTemplate) {
        return this.selectForEdit().focus(); // enable coopy-on-edit
    }
    if (top instanceof PrototypeHatBlockMorph) {
        return top.mouseClickLeft();
    }
    if (receiver) {
        stage = receiver.parentThatIsA(StageMorph);
        if (stage) {
            if (receiver === stage)
            {
                stage.threads.toggleProcess(top, stage);
            }
            else
            {
                if (this instanceof ReporterBlockMorph)
                {
                    stage.children.some(function (child)
                    {
                        if (child instanceof SpriteMorph && child.parentSprite == receiver)
                        {
                            stage.threads.toggleProcess(top, child);
                            return true;
                        }
                        return false;
                    });
                }
                else
                {
                    stage.children.forEach(function (child)
                    {
                        if (child instanceof SpriteMorph && child.parentSprite == receiver)
                        {
                             stage.threads.toggleProcess(top, child);
                        }
                    });
                }
            }
        }
    }
};

/*
** Deals with the new arrow shape for the ReporterBlockMorph
*/
ReporterBlockMorph.prototype.drawNew = function () {
    var context;
    this.cachedClr = this.color.toString();
    this.cachedClrBright = this.bright();
    this.cachedClrDark = this.dark();
    this.image = newCanvas(this.extent());
    context = this.image.getContext('2d');
    context.fillStyle = this.cachedClr;

    if (this.isPredicate) {
        this.drawDiamond(context);
    } else if (this.isArrow) {
        this.drawArrow(context);
	} else {
        this.drawRounded(context);
    }

    // erase CommandSlots
    this.eraseHoles(context);
};

/*
** Draws the arrow shape for this reporter block.
*/
ReporterBlockMorph.prototype.drawArrow = function (context) {
    var w = this.width(),
        h = this.height(),
        h2 = Math.floor(h / 2),
        r = this.rounding,
        r2 = Math.floor(this.rounding / 2),
        shift = this.edge / 2,
        gradient;

    // draw the 'flat' shape:
    context.fillStyle = this.cachedClr;
    context.beginPath();

    context.moveTo(r2, h2);
    context.lineTo(0, 0);
    context.lineTo(w - r2 , 0);
    context.lineTo(w, h2);
    context.lineTo(w - r2 , h);
    context.lineTo(0, h);

    context.closePath();
    context.fill();

    if (MorphicPreferences.isFlat) {return; }

    // add 3D-Effect:
    context.lineWidth = this.edge;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // half-tone edges
    // bottom left corner
    gradient = context.createLinearGradient(
        -r2,
        0,
        r2,
        0
    );
    gradient.addColorStop(1, this.cachedClr);
    gradient.addColorStop(0, this.cachedClrBright);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, 0);
    context.lineTo(r2, h2 - shift);
    context.closePath();
    context.stroke();

    // top right corner
    gradient = context.createLinearGradient(
        w - r2,
        0,
        w + r2,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - shift, h2);
    context.lineTo(w - r2, shift);
    context.closePath();
    context.stroke();

    // normal gradient edges
    // top edge: left corner
    gradient = context.createLinearGradient(
        0,
        0,
        r2,
        0
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, h);
    context.lineTo(r2, h2 + shift);
    context.closePath();
    context.stroke();

    // top edge: straight line
    gradient = context.createLinearGradient(
        0,
        0,
        0,
        this.edge
    );
    gradient.addColorStop(0, this.cachedClrBright);
    gradient.addColorStop(1, this.cachedClr);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(0, shift);
    context.lineTo(w - r2, shift);
    context.closePath();
    context.stroke();

    // bottom edge: right corner
    gradient = context.createLinearGradient(
        w - r2,
        0,
        w,
        0
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(w - r2, h - shift);
    context.lineTo(w - shift, h2);
    context.closePath();
    context.stroke();

    // bottom edge: straight line
    gradient = context.createLinearGradient(
        0,
        h - this.edge,
        0,
        h
    );
    gradient.addColorStop(0, this.cachedClr);
    gradient.addColorStop(1, this.cachedClrDark);
    context.strokeStyle = gradient;
    context.beginPath();
    context.moveTo(shift, h - shift);
    context.lineTo(w - r2 - shift, h - shift);
    context.closePath();
    context.stroke();
};
