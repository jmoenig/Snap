modules.cellular = '2013-August-16';

function Cell(x,y,stageMorph)
{
	this.x = x;
	this.y = y;
	this.stageMorph = stageMorph;
	this.attributeValues = {};
	this.spriteMorphs = [];
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

Cell.prototype.removeSpriteMorph = function(morph)
{
	var index = this.spriteMorphs.indexOf(morph);
	if (index > -1) {
		this.spriteMorphs.splice(index, 1);
	}
}

Cell.prototype.addSpriteMorph = function(morph)
{
	this.spriteMorphs.push(morph);
}

Cell.attributes = ['testAttribute'];
Cell.attributeColours = {testAttribute: new Color(255,0,255)};
Cell.attributeDrawRange = {testAttribute: [0,10]};

Cell.hasAttribute = function (name)
{
	for (var i=0; i<Cell.attributes.length; i++)
	{
		if (Cell.attributes[i] == name)
		{
			return true;
		}
	}
	return false;
}

Cell.addAttribute = function (name)
{
	//Ensure it does not exist already
	for (var i=0; i<Cell.attributes.length; i++)
	{
		if (Cell.attributes[i] == name)
			return false;
	};
	//Create the attribute
	Cell.attributes.push(name);
	Cell.attributeColours[name] = new Color(100,100,100);
	Cell.attributeDrawRange[name] = [0,10];
	return true;
}