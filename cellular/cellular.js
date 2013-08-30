modules.cellular = '2013-August-16';

function Cell(x,y,stageMorph)
{
	this.x = x;
	this.y = y;
	this.stageMorph = stageMorph;
	this.attributeValues = {};
}

Cell.prototype.getAttribute = function(attribute)
{
	value = this.attributeValues[attribute];
	if (value == undefined)
		return 0;
	return value;
}

Cell.prototype.setAttribute = function(attribute, value, dirty)
{
	this.attributeValues[attribute] = value;
	if (dirty == undefined || dirty == true)
		this.stageMorph.dirtyCellAt(this.x, this.y);
}

Cell.attributes = ['testAttribute'];