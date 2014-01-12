modules.cellular = '2013-August-16';

function Cell(x,y,stageMorph)
{
	this.x = x;
	this.y = y;
	this.stageMorph = stageMorph;
	this.attributeValues = {};
	this.spriteMorphs = [];
	this.parentECT = null;
}

Cell.prototype.getAttribute = function(attribute)
{
	value = this.attributeValues[attribute];
	if (!value)
		return 0;
	return Number(value);
}

Cell.prototype.setAttribute = function(attribute, value, dirty)
{
	this.attributeValues[attribute] = Number(value);
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

Cell.attributes = [];
Cell.attributeColours = {};
Cell.attributeDrawRange = {};

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

function EmptyCellTree(childA, childB)
{
    var myself = this;
    
    function attachChild(child)
    {
	    if (child instanceof EmptyCellTree)
	    {
            child.parent = myself;
            myself.nEmpty += child.nEmpty;
        }
        else if (child instanceof Cell)
        {
            myself.leafNode = true;
            child.parentECT = myself;
            myself.nEmpty += child.spriteMorphs.length == 0 ? 1 : 0;
        }
    }

    this.parent = null;
    this.nEmpty = 0;
    this.leafNode = false;
    
	this.childA = childA;
	attachChild(childA);
        
	this.childB = childB;
	attachChild(childB);
}

EmptyCellTree.prototype.cellMadeEmpty = function()
{
    this.nEmpty++;
    if (this.parent != null)
        this.parent.cellMadeEmpty();
}

EmptyCellTree.prototype.cellFilled = function()
{
    this.nEmpty--;
    if (this.parent != null)
        this.parent.cellFilled();
}
