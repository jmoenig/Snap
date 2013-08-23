modules.cellularObjects = '2013-August-2';

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
SpriteMorph.prototype.snapappsHookBlockTemplates = function(blocks, block, cat)
{
    return this.scribbleHookBlockTemplates(blocks, block, cat);
}

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

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
	if (cellArrayWidth <= 1 || cellArrayHeight <= 1)
	{
		//Fail on a 1xN or Nx1 grid since we don't need to care about that case.
		//(Cellular always >4x3 no matter what so it doesnt matter)
		return;
	}
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
	
	// Clamp:
	u = Math.min(1, Math.max(0, u));
	v = Math.min(1, Math.max(0, v));
	
	// Get position of top left point
	var topLeftXFloat = u * cellArrayWidth;
	var topLeftYFloat = v * cellArrayHeight
	var topLeftX = Math.floor(topLeftXFloat), topLeftY = Math.floor(topLeftYFloat);
	
	//Ensure inside boundaries for u == 1 / v == 1 cases
	if (topLeftX == cellArrayWidth)
		topLeftX = cellArrayWidth - 1;
	if (topLeftY == cellArrayHeight)
		topLeftY = cellArrayHeight - 1;
		
	//Get interpolation thingys, we know these are [0,1]
	var uInterpol = topLeftXFloat - topLeftX;
	var vInterpol = topLeftYFloat - topLeftY;
	
	//Actually interpolate
	for (var attribute in Cell.attributes)
	{
		var topLeftValue = cellArray[topLeftX][topLeftY].getAttribute(attribute);
		var topRightValue = cellArray[topLeftX+1][topLeftY].getAttribute(attribute);
		var bottomLeftValue = cellArray[topLeftX][topLeftY+1].getAttribute(attribute);
		var bottomRightValue = cellArray[topLeftX+1][topLeftY+1].getAttribute(attribute);
		
		var topValue = valueInterpolate(topLeftValue, topRightValue, uInterpol);
		var bottomValue = valueInterpolate(bottomLeftValue, bottomRightValue, uInterpol);
		
		var result = valueInterpolate(topValue, bottomValue, vInterpol);
		
		resultCell.setAttribute(attribute, result);
	}
}

StageMorph.prototype.updateCells = function ()
{
	var newCellsX = this._cellsX, newCellsY = this._cellsY;
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
	
	if (this._cells != undefined && this._cells != null && this._cells.length > 0)
	{
		var oldCells = this._cells;
		var oldCellsX = oldCells.length, oldCellsY = oldCells[0].length;
		for (var y=0; y<newCellsY; y++)
		{
			for (var x=0; x<newCellsX; x++)
			{
				cellInterpolate(newCells[y][x], oldCells, oldCellsX, oldCellsY, x / newCellsX, y / newCellsY);
			}	
		}
	}
	
	this._cells = newCells;
}

StageMorph.prototype.superInit = StageMorph.prototype.init;
StageMorph.prototype.init = function (globals) {
	this.superInit(globals);
	this._cellsX = 40;
	this._cellsY = 30;
	this.drawGrid = true;
	this._cells = [];
	this.updateCells();
}

StageMorph.prototype.changeCellCount = function(newX, newY)
{
	this._cellsX = newX;
	this._cellsY = newY;
	this.updateCells();
}

StageMorph.prototype.dirtyCellAt = function(x, y)
{
	var cellWidth = this.bounds.width() / this._cellsX;
	var cellHeight = this.bounds.height() / this._cellsY;
    this.world().broken.push(
        new Rectangle(
			this.bounds.left() + cellWidth * x,
			this.bounds.top() + cellHeight * y,
			this.bounds.left() + cellWidth * (x+1),
			this.bounds.top() + cellHeight * (y+1)).spread());
}

StageMorph.prototype.getCellAt = function(pointOrX, y)
{
	if (pointOrX instanceof Point)
	{
		return this.getCellAt(pointOrX.x, pointOrX.y);
	}
	else
	{
		var cellX = Math.floor((pointOrX - this.bounds.left()) / this.bounds.width() * this._cellsX);
		var cellY = Math.floor((y - this.bounds.top()) / this.bounds.height() * this._cellsY);
		if (cellX < this._cellsX && cellX >= 0 && cellY < this._cellsY && cellY >= 0)
			return this._cells[cellY][cellX];
		return null;
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
			
			ctx.lineWidth = 1;
			ctx.strokeStyle = "rgb(0,0,0)";
			ctx.beginPath();
			var cellWidth = this.bounds.width() / this._cellsX;
			var cellHeight = this.bounds.height() / this._cellsY;
			var startCellX = Math.floor((area.left()-this.bounds.left())/cellWidth);
			var endCellX = Math.ceil((area.right()-this.bounds.left())/cellWidth);
			var startX = startCellX*cellWidth + this.bounds.left();
			for (var x=startX; x<area.right(); x+=cellWidth)
			{
				ctx.moveTo(x+0.5, area.top());
				ctx.lineTo(x+0.5, area.bottom());
			}
			var startCellY = Math.floor((area.top()-this.bounds.top())/cellHeight);
			var endCellY = Math.ceil((area.bottom()-this.bounds.top())/cellHeight);
			var startY = startCellY*cellHeight + this.bounds.top();
			for (var y=startY; y<area.bottom(); y+=cellHeight)
			{
				ctx.moveTo(area.left(), y+0.5);
				ctx.lineTo(area.right(), y+0.5);
			}
			ctx.stroke();
			
			if (this._cells != undefined && this._cells != null)
			{
				for (var y=startCellY; y<endCellY; y++)
				{
					var cellRow = this._cells[y];
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
							ctx.rect(x*cellWidth + this.bounds.left(), y*cellHeight + this.bounds.top(), cellWidth, cellHeight);
							ctx.fillStyle = 'rgba(255,0,0,' + value + ')';
							ctx.fill();
						}
					}
				}
			}
		}
	}
	return retnVal;
};

//This is the cell attribute draw tool

StageMorph.prototype.drawTool = false;
StageMorph.prototype.mouseClickLeft = function()
{
}

StageMorph.prototype.mouseDownLeft = function()
{
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
		var cell = this.getCellAt(point);
		if (cell != null)
		{
			cell.setAttribute(Cell.attributes[0], cell.getAttribute(Cell.attributes[0]) + 1);
		}
    }
}
