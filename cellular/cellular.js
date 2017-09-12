modules.cellular = '2013-August-16';

/*
** The Cell type. Holds cell attributes and objects that are present in this cell.
*/
function Cell(x,y,stageMorph)
{
	this.x = x;
	this.y = y;
	this.stageMorph = stageMorph;
	this.attributeValues = {};
	this.spriteMorphs = [];
	this.parentECT = null;
}

/*
** Gets the value of some attribute.
*/
Cell.prototype.getAttribute = function(attribute)
{
	var value = this.attributeValues[attribute];
	if (!value)
		return 0;
	return Number(value);
}

/*
** Sets the value of an attribute in this cell.
**
** The dirty parameter is true unless otherwise specified, 
** and if true, this cell is queued for re-drawing.
*/
Cell.prototype.setAttribute = function(attribute, value, dirty)
{
    value = Number(value);
    if (!isFinite(value)) {
        value = 0;
    }
	this.attributeValues[attribute] = value;
	if (dirty || dirty === undefined)
		this.stageMorph.dirtyCellAt(this.x, this.y);
}

/*
** Removes a SpriteMorph that is present in the cell.
*/
Cell.prototype.removeSpriteMorph = function(morph)
{
	var index = this.spriteMorphs.indexOf(morph);
	if (index > -1) {
		this.spriteMorphs.splice(index, 1);
	} else {
        debugger;
        console.error("Error removing sprite from cell.");
        throw new Error("Error moving...");
	}
	if (this.spriteMorphs.length == 0)
		this.parentECT.cellMadeEmpty();
}

/*
** Adds a SpriteMorph that is present in the cell.
*/
Cell.prototype.addSpriteMorph = function(morph)
{
	if (this.spriteMorphs.length == 0)
	{
		this.parentECT.cellFilled();
	}
	this.spriteMorphs.push(morph);
}

/*
** A list of attribute names.
**
** Attribute visibility is attached to the StageMorph. See changesToObjects.js, 
** StageMorph.prototype.visibleAttributes definition.
*/
Cell.attributes = [];

/*
** A list of attribute colours. Uses the Snap! colour object.
*/
Cell.attributeColours = {};

/*
** A list of 2 element arrays corresponding to the start and end of the draw range for this attribute.
*/
Cell.attributeDrawRange = {};

/*
** Sets the attributes to just one red attribute named "CellAttr1"
*/
Cell.resetToDefault = function() {
    Cell.attributes = ["CellAttr1"];
    Cell.attributeColours = {
        "CellAttr1": new Color(255, 0, 0)
    };
    Cell.attributeDrawRange = {
        "CellAttr1": [0, 10]
    }
}
Cell.resetToDefault();

// For visible attributes, see StageMorph.visibleAttributes.
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

/*
** The EmptyCellTree is uesd to find the nth empty cell in log(N) time.
*/
function EmptyCellTree(childA, childB)
{
    var myself = this;
    
    function attachChild(child)
    {
	    if (child instanceof EmptyCellTree)
	    {
            child.parent = myself;
            myself.nEmpty += child.nEmpty;
            myself.nChildren += child.nChildren;
        }
        else if (child instanceof Cell)
        {
            myself.leafNode = true;
            child.parentECT = myself;
            myself.nEmpty += child.spriteMorphs.length == 0 ? 1 : 0;
            myself.nChildren += 1;
        }
    }

    this.parent = null;
    this.nEmpty = 0;
    this.leafNode = false;
    this.nChildren = 0;
    
	this.childA = childA;
	attachChild(childA);
        
	this.childB = childB;
	attachChild(childB);
	
    if (this.nEmpty < 0 || this.nEmpty > this.nChildren) {
        console.error("Error constructing tree.");
    }
}

EmptyCellTree.prototype.cellMadeEmpty = function()
{
    this.nEmpty++;
    if (this.nEmpty < 0 || this.nEmpty > this.nChildren) {
        console.error("Error marking cell empty");
    }
    if (this.parent != null)
        this.parent.cellMadeEmpty();
}

EmptyCellTree.prototype.cellFilled = function()
{
    this.nEmpty--;
    if (this.nEmpty < 0 || this.nEmpty > this.nChildren) {
        console.error("Error marking cell filled");
    }
    if (this.parent != null)
        this.parent.cellFilled();
}
