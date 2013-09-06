modules.cellularObjects = '2013-August-23';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

/*
 * Hooks into SpriteMorph.blockTemplates
 * 
 * Adds the blocks to the UI
 */
 
SpriteMorph.prototype.scribbleHookBlockTemplates = SpriteMorph.prototype.snapappsHookBlockTemplates;
SpriteMorph.prototype.snapappsHookBlockTemplates = function(blocks, block, cat, helpMenu)
{
	var myself = this;
	if (cat == "cells")
	{
		button = new PushButtonMorph(
			null,
			function () {
				new CellAttributeDialogMorph(
					null,
					function (pair) {
						if (pair) {
							for (var i=0; i<Cell.attributes.length; i++)
							{
								var name = Cell.attributes[i];
								if (name == pair[0])
									return;
							};
							Cell.attributes.push(pair[0]);
							myself.blocksCache[cat] = null;
							myself.paletteCache[cat] = null;
							myself.parentThatIsA(IDE_Morph).refreshPalette();
						}
					},
					myself
				).prompt(
					'Cell attribute name',
					null,
					myself.world()
				);
			},
			'Make a cell attribute'
		);
		button.userMenu = helpMenu;
		button.selector = 'addCellAttribute';
		button.showHelp = BlockMorph.prototype.showHelp;
		blocks.push(button);

		if (Cell.attributes.length > 0) {
			button = new PushButtonMorph(
				null,
				function () {
					var menu = new MenuMorph(
						myself.deleteCellAttribute,
						null,
						myself
					);
					for (var i=0; i<Cell.attributes.length; i++)
					{
						var name = Cell.attributes[i];
						menu.addItem(name, name);
					};
					menu.popUpAtHand(myself.world());
				},
				'Delete a cell attribute'
			);
			button.userMenu = helpMenu;
			button.selector = 'deleteCellAttribute';
			button.showHelp = BlockMorph.prototype.showHelp;
			blocks.push(button);
		}

		blocks.push('-');

		if (Cell.attributes.length > 0) {
			for (var i=0; i<Cell.attributes.length; i++)
			{
				var txt = new TextMorph('' + Cell.attributes[i]);
				txt.fontSize = 12;
				txt.setColor(this.paletteTextColor);
				blocks.push(txt);
			}
			blocks.push('-');
		}
		
		blocks.push(block('testCell'));
	}
    return this.scribbleHookBlockTemplates(blocks, block, cat);
}

SpriteMorph.prototype.deleteCellAttribute = function(name)
{
	for (var i=0; i<Cell.attributes.length; i++)
	{
		if (Cell.attributes[i] == name)
		{
			Cell.attributes.splice(i, 1);
			this.blocksCache["cells"] = null;
			this.paletteCache["cells"] = null;
			this.parentThatIsA(IDE_Morph).refreshPalette();
			return;
		}
	}
}

SpriteMorph.prototype.addCellularBlocks = function () {
	//We add the cells palette
    
    SpriteMorph.prototype.blocks.testCell = {
        type: 'command',
        category: 'cells',
        spec: 'a test cell block',
    };
}

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

SpriteMorph.prototype.blockColor.cells = new Color(100, 180, 180);
SpriteMorph.prototype.categories.push("cells");

/*
** Super simple linear interpol
*/
function valueInterpolate(from, to, mix)
{
	mix = Math.max(0, Math.min(1, mix));
	return from * (1 - mix) + to * mix;
}
/*
** This is used to get the attributes of the cell at (u, v) where u and v are [0,1] and not 
** neccessarily exactly on a cell. The result of the operation puts all the interpolated 
** cellAttributes into the resultCell
*/
function cellInterpolate(resultCell, cellArray, cellArrayWidth, cellArrayHeight, u, v)
{
	// Basically, we get the 4 pixels that surround the u,v position we're given.
	//
	// (floor(u), floor(v))
	// |
	// |       (ceil(u), floor(v))
	// |       |
	// V       V
	// X       X
	// 
	//     . <--(u,v)
	//
    // X       X
	// ^       ^
	// |       |
	// |       (ceil(u), ceil(v))
	// |       
	// (floor(u), ceil(v))
	//
	// Then we get the interpolated (over x axis) cell attribute of the bottom 2 and the top 2 at that u position
	// From there, we interpolate again over y axis between those two values.
	
	// Get position of top left point
	var leftXFloat = u * cellArrayWidth - 0.5;
	var topYFloat = v * cellArrayHeight - 0.5;
	
	var leftX = Math.floor(leftXFloat), topY = Math.floor(topYFloat);
	var rightX = leftX+1, bottomY = topY+1;
	
	//Ensure inside boundaries.
	leftX = Math.max(0, Math.min(cellArrayWidth - 1, leftX));
	topY = Math.max(0, Math.min(cellArrayHeight - 1, topY));
	rightX = Math.max(0, Math.min(cellArrayWidth - 1, rightX));
	bottomY = Math.max(0, Math.min(cellArrayHeight - 1, bottomY));
		
	//Get interpolation thingys, we know these are [0,1]
	var uInterpol = leftXFloat - leftX;
	var vInterpol = topYFloat - topY;
	
	//Actually interpolate
	for (var i = 0; i < Cell.attributes.length; i++)
	{
		var attribute = Cell.attributes[i];
		var topLeftValue = cellArray[topY][leftX].getAttribute(attribute);
		var topRightValue = cellArray[topY][rightX].getAttribute(attribute);
		var bottomLeftValue = cellArray[bottomY][leftX].getAttribute(attribute);
		var bottomRightValue = cellArray[bottomY][rightX].getAttribute(attribute);
		
		var topValue = valueInterpolate(topLeftValue, topRightValue, uInterpol);
		var bottomValue = valueInterpolate(bottomLeftValue, bottomRightValue, uInterpol);
		
		var result = valueInterpolate(topValue, bottomValue, vInterpol);
		
		resultCell.setAttribute(attribute, result, false);
	}
}

StageMorph.prototype.updateCells = function ()
{
	var newCellsX = this.cellsX, newCellsY = this.cellsY;
	var newCells = [];
	for (var y=0; y<newCellsY; y++)
	{
		var newRow = []
		for (var x=0; x<newCellsX; x++)
		{
			newRow.push(new Cell(x,y, this));
		}
		newCells.push(newRow);
	}
	
	if (this.cells != undefined && this.cells != null && this.cells.length > 0)
	{
		var oldCells = this.cells;
		var oldCellsY = oldCells.length, oldCellsX = oldCells[0].length;
		for (var y=0; y<newCellsY; y++)
		{
			for (var x=0; x<newCellsX; x++)
			{
				cellInterpolate(newCells[y][x], oldCells, oldCellsX, oldCellsY, (x + 0.5) / newCellsX, (y + 0.5) / newCellsY);
			}	
		}
	}
	
	this.cells = newCells;
	this.dirtyEntireStage();
}

StageMorph.prototype.superInit = StageMorph.prototype.init;
StageMorph.prototype.init = function (globals) {
	this.superInit(globals);
	this.cellsX = 40;
	this.cellsY = 30;
	this.drawGrid = true;
	this.cells = [];
	this.updateCells();
}

StageMorph.prototype.changeCellCount = function(newX, newY)
{
	this.cellsX = newX;
	this.cellsY = newY;
	this.updateCells();
}

StageMorph.prototype.dirtyCellAt = function(x, y)
{
	var cellWidth = this.bounds.width() / this.cellsX;
	var cellHeight = this.bounds.height() / this.cellsY;
    this.world().broken.push(
        new Rectangle(
			this.bounds.left() + cellWidth * x,
			this.bounds.top() + cellHeight * y,
			this.bounds.left() + cellWidth * (x+1),
			this.bounds.top() + cellHeight * (y+1)).spread());
}

StageMorph.prototype.dirtyEntireStage = function()
{
	var world = this.world();
	if (world == null)
		return;
	if (world.broken == null)
		return;
    world.broken.push(this.bounds.spread());
}

StageMorph.prototype.getCellPositionAt = function(pointOrX, y)
{
	if (pointOrX instanceof Point)
	{
		return this.getCellPositionAt(pointOrX.x, pointOrX.y);
	}
	else
	{
		var cellX = (pointOrX - this.bounds.left()) / this.bounds.width() * this.cellsX;
		var cellY = (y - this.bounds.top()) / this.bounds.height() * this.cellsY;
		if (cellX < this.cellsX && cellX >= 0 && cellY < this.cellsY && cellY >= 0)
			return new Point(cellX, cellY);
		return null;
	}
}

StageMorph.prototype.getCellAt = function(pointOrX, y)
{
    var point = this.getCellPositionAt(pointOrX, y);
    
	if (point == null)
	{
		return null;
	}
	else
	{
		return this.cells[Math.floor(point.y)][Math.floor(point.x)];
	}
}

StageMorph.prototype.superDrawOn = StageMorph.prototype.drawOn;
StageMorph.prototype.drawOn = function (aCanvas, aRect) {
	var retnVal = this.superDrawOn(aCanvas, aRect);
    if (this.drawGrid)
	{
		var rectangle, area;
		if (!this.isVisible) {
			return null;
		}
		rectangle = aRect || this.bounds;
		area = rectangle.intersect(this.bounds).round();
		if (area.extent().gt(new Point(0, 0))) {
			var ctx = aCanvas.getContext('2d');
			
			ctx.save();
			
			ctx.beginPath();
			ctx.rect(area.left(), area.top(), area.width(), area.height());
			ctx.clip();
			
			var cellWidth = this.bounds.width() / this.cellsX;
			var cellHeight = this.bounds.height() / this.cellsY;
			var startCellX = Math.floor((area.left()-this.bounds.left())/cellWidth);
			var endCellX = Math.ceil((area.right()-this.bounds.left())/cellWidth);
			var startX = startCellX*cellWidth + this.bounds.left();
			var startCellY = Math.floor((area.top()-this.bounds.top())/cellHeight);
			var endCellY = Math.ceil((area.bottom()-this.bounds.top())/cellHeight);
			var startY = startCellY*cellHeight + this.bounds.top();
			
			//Draw cells
			if (this.cells != undefined && this.cells != null)
			{
				for (var y=startCellY; y<endCellY; y++)
				{
					var cellRow = this.cells[y];
					if (cellRow == null || cellRow == undefined)
						break;
					for (var x=startCellX; x<endCellX; x++)
					{
						var cell = cellRow[x];
						if (cell == null || cell == undefined)
							break;
						var value = cell.getAttribute(Cell.attributes[0]);
						if (value > 0)
						{
							ctx.beginPath();
							ctx.rect(x*cellWidth + this.bounds.left() + 1, y*cellHeight + this.bounds.top() + 1, cellWidth - 1, cellHeight - 1);
							ctx.fillStyle = 'rgba(255,0,0,' + value / 255 + ')';
							ctx.fill();
						}
					}
				}
			}
			
			//Draw grid
			ctx.lineWidth = 1;
			ctx.strokeStyle = "rgb(0,0,0)";
			ctx.beginPath();
			for (var x=startX; x<area.right(); x+=cellWidth)
			{
				ctx.moveTo(x+0.5, area.top());
				ctx.lineTo(x+0.5, area.bottom());
			}
			for (var y=startY; y<area.bottom(); y+=cellHeight)
			{
				ctx.moveTo(area.left(), y+0.5);
				ctx.lineTo(area.right(), y+0.5);
			}
			ctx.stroke();
			
			ctx.restore();
		}
	}
	return retnVal;
};

//This is the cell attribute draw tool

/*
** This creates a canvas that is used when the user draws with the mouse.
** It is of the same width and height as the cell array, and is created so that
** we can use its line drawing functionality
*/
StageMorph.prototype.ensureTempDrawCanvas = function ()
{
    if (this.tempDrawCanvas == undefined || this.tempDrawCanvas == null)
        this.tempDrawCanvas = document.createElement('canvas');
    this.tempDrawCanvas.width = this.cellsX;
    this.tempDrawCanvas.height = this.cellsY;
    this.tempDrawCanvas.getContext('2d').clearRect(0,0,this.cellsX,this.cellsY);
}

StageMorph.prototype.drawTool = false;
StageMorph.prototype.mouseClickLeft = function()
{
}

StageMorph.prototype.mouseDownLeft = function()
{
    if (this.drawTool)
    {
        this.ensureTempDrawCanvas();
        var worldhand = this.world().hand;
        this.previousPoint = new Point(worldhand.bounds.origin.x, worldhand.bounds.origin.y);
    }
}

/*
 * Override for the default implementation of StageMorph.mouseDownLeft
 * 
 * Called to draw if the pen is in use
 */
StageMorph.prototype.mouseMove = function(point)
{
    if (this.drawTool && this.world().hand.mouseButton === "left")
    {
        this.ensureTempDrawCanvas();
        var ctx = this.tempDrawCanvas.getContext('2d');
        
        var previous = this.getCellPositionAt(this.previousPoint);
        var next = this.getCellPositionAt(point);
        if (previous != null && next != null)
        {
            ctx.beginPath();
            ctx.moveTo(next.x, next.y);
            ctx.lineTo(next.x+5, next.y);
            ctx.lineTo(next.x+5, next.y+5);
            ctx.lineTo(next.x, next.y+5);
            ctx.closePath();
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();
            
            var imgData = ctx.getImageData(0,0,this.cellsX,this.cellsY);
            for (var y=0; y<this.cellsY; y++)
            {
                for (var x=0; x<this.cellsX; x++)
                {
                    var cell = this.cells[y][x];
                    var alpha = imgData[(y * this.cellsX + x) * 4 + 3];
                    if (alpha > 0)
                    {
                        alert("alpha actually > 0");
                    }
		            if (cell != null)
		            {
			            cell.setAttribute(Cell.attributes[0], cell.getAttribute(Cell.attributes[0]) + alpha);
		            }
                }
            }
        }
    }
    
    this.previousPoint = new Point(point.x, point.y);
}

/*********************************************************************/
/****************************** STATICS ******************************/
/*********************************************************************/
//Snap calls this after initBlocks is defined. We call addCellularBlocks to add the new blocks.
SpriteMorph.prototype.addCellularBlocks();
