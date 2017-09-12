modules.cellularStore = '2013-December-1';

/*
** This file handles saving and loading the cell attributes and the clones.
*/

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

/*
** Creates a clone or a parent sprite depending.
*/
SnapSerializer.prototype.uberLoadSprite = SnapSerializer.prototype.loadSprite;
SnapSerializer.prototype.loadSprite = function (model, project, ide) {
	if (model.attributes.parentSprite) {
		var v;
		//This is a cellular instance, do not create a full SpriteMorph.
		//Instead, copy the important things.
		v = {};
		
		v.parentSpriteName = model.attributes.parentSprite;
		
		if (model.attributes.color) {
			v.color = this.loadColor(model.attributes.color);
		}
		if (model.attributes.pen) {
			v.penPoint = model.attributes.pen;
		}
		v.scale = parseFloat(model.attributes.scale || '1');
		v.heading = parseFloat(model.attributes.heading) || 0;
		v.x = +model.attributes.x || 0;
		v.y = +model.attributes.y || 0;
		v.costume = +model.attributes.costume;
		v.variables = new VariableFrame();
		this.loadVariables(v.variables, model.require('variables'));
		return v;
	}
	else
	{
		return this.uberLoadSprite(model, project, ide);
	}
}

/*
** Connects parent sprite to the clone sprites.
*/
SnapSerializer.prototype.spritesLoaded = function(stage, spriteList)
{
	function costumeLoadedFunction() {
		var me = this;
        this.loadedListeners.forEach(function (i) {
			i.wearCostume(me);
		});
        this.loaded = true;
	}

	var sprites = {};
	
	for(var i=0; i<spriteList.length; i++)
	{
		sprites[spriteList[i].name] = spriteList[i];
	}
	
	for(var i=0; i<spriteList.length; i++)
	{
		var ii = spriteList[i];
		if (!ii.parentSpriteName)
		{
			continue;
		}
		
		var parentSprite = sprites[ii.parentSpriteName];
		if (!parentSprite)
			throw {name: 'CorruptData', message: 'Instance parent not found'};
			
		var v = parentSprite.createCellularClone();
		stage.add(v);
		ii.variables.parentFrame = v.variables.parentFrame;
 		v.variables = ii.variables;
		v.penPoint = ii.penPoint;
		v.color = ii.color;
        v.setScale(ii.scale * 100);
		v.heading = ii.heading;

        costume = v.costumes.asArray()[ii.costume - 1];
        if (costume) {
            if (costume.loaded === true) {
                object.wearCostume(costume);
            } else if (costume.loaded === costumeLoadedFunction) {
				costume.loadedListeners.push(v);
			} else {
				// So for whatever reason, it seems that the "loaded" property 
				// of a costume is either the callback that is called when the
				// costume is run, or "true" when the costume is loaded.
				costume.loadedListeners = [v];
                costume.loaded = costumeLoadedFunction;
            }
        }

		v.drawNew();
		v.gotoXY(ii.x, ii.y);
	}
}

SnapSerializer.prototype.openProject = function (project, ide) {
    var stage = ide.stage,
        sprites = [],
        sprite;
    if (!project || !project.stage) {
        return;
    }
    ide.projectName = project.name;
    ide.projectNotes = project.notes || '';
    if (ide.globalVariables) {
        ide.globalVariables = project.globalVariables;
    }
    if (stage) {
        stage.destroy();
    }
    ide.add(project.stage);
    ide.stage = project.stage;
    sprites = ide.stage.children.filter(function (child) {
        return (child instanceof SpriteMorph) && (!child.parentSprite);
    });
    sprites.sort(function (x, y) {
        return x.idx - y.idx;
    });

    ide.sprites = new List(sprites);
    sprite = sprites[0] || project.stage;

    if (sizeOf(this.mediaDict) > 0) {
        ide.hasChangedMedia = false;
        this.mediaDict = {};
    } else {
        ide.hasChangedMedia = true;
    }
    
    Cell.attributes = project.cellAttributes;
    Cell.attributeColours = project.cellAttributeColours;
    Cell.attributeDrawRange = project.cellAttributeDrawRange;
    
    project.stage.drawNew();
    ide.createCorral();
    ide.selectSprite(sprite);
    ide.fixLayout();

    // force watchers to update
    //project.stage.watchers().forEach(function (watcher) {
    //  watcher.onNextStep = function () {this.currentValue = null;};
    //})

    ide.world().keyboardReceiver = project.stage;
};

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

SnapSerializer.prototype.loadObject = function (object, model) {
    // private
    var dispatches = model.childNamed('dispatches');

    // load the instrument
    if (model.attributes.instrument) {
        object.instrument = +model.attributes.instrument;
    }

    this.loadInheritanceInfo(object, model);
    this.loadNestingInfo(object, model);

    // load costumes unless they're inherited
    if (!(object.inheritanceInfo &&
            (object.inheritanceInfo.delegated instanceof Array) &&
            contains(object.inheritanceInfo.delegated, 'costumes'))) {
        this.loadCostumes(object, model);
    }

    // load sounds unless they're inherited
    if (!(object.inheritanceInfo &&
            (object.inheritanceInfo.delegated instanceof Array) &&
            contains(object.inheritanceInfo.delegated, 'sounds'))) {
        this.loadSounds(object, model);
    }
    
    var blocks = model.childNamed('blocks');
    if (blocks)
    {
        this.loadCustomBlocks(object, blocks);
        if (dispatches) {
            this.loadCustomBlocks(object, dispatches, false, true);
        }
        this.populateCustomBlocks(object, blocks);
    }
    
    var variables = model.childNamed('variables');
    if (variables)
    {
        this.loadVariables(object.variables, variables, object);
    }
    
    var scripts = model.childNamed('scripts')
    if (scripts)
    {
        if (!(object.inheritanceInfo &&
            (object.inheritanceInfo.delegated instanceof Array) &&
            contains(object.inheritanceInfo.delegated, 'scripts'))) {
                this.loadScripts(object, object.scripts, model.require('scripts'));
        }
    }

    // note: the dispatches cache isn't cleared until after
    // *all* objects are loaded
};

SpriteMorph.prototype.toXML = function (serializer) {
    var stage = this.parentThatIsA(StageMorph),
        ide = stage ? stage.parentThatIsA(IDE_Morph) : null,
        idx = ide ? ide.sprites.asArray().indexOf(this) + 1 : 0,
        noCostumes = this.parentSprite ? true : this.inheritsAttribute('costumes'),
        noSounds = this.parentSprite ? true : this.inheritsAttribute('sounds'),
        noScripts = this.parentSprite ? true : this.inheritsAttribute('scripts');

    return serializer.format(
        '<sprite% idx="@" x="@" y="@"' +
            ' heading="@"' +
            ' scale="@"' +
            ' rotation="@"' +
            '%' +
            ' draggable="@"' +
            '%' +
            ' costume="@" color="@,@,@" pen="@" ~>' +
            '%' + // inheritance info
            '%' + // nesting info
            (noCostumes ? '%' : '<costumes>%</costumes>') +
            (noSounds ? '%' : '<sounds>%</sounds>') +
            '<blocks>%</blocks>' +
            '<variables>%</variables>' +
            (this.exemplar ? '<dispatches>%</dispatches>' : '%') +
            (noScripts ? '%' : '<scripts>%</scripts>') +
            '</sprite>',
         (this.parentSprite != null 
			? ' parentSprite="'+this.parentSprite.name+'"'
			: ' name="'+this.name+'"'),
        idx,
        this.xPosition(),
        this.yPosition(),
        this.heading,
        this.getScale() / 100.0,
        this.rotationStyle,
        this.instrument ?
                ' instrument="' + parseInt(this.instrument) + '" ' : '',
        this.isDraggable,
        this.isVisible ? '' : ' hidden="true"',
        this.getCostumeIdx(),
        this.color.r,
        this.color.g,
        this.color.b,
        this.penPoint,

        // inheritance info
        this.exemplar
            ? '<inherit exemplar="' +
                    this.exemplar.name +
                    '">' +
                    (this.inheritedAttributes.length ?
                        serializer.store(new List(this.inheritedAttributes))
                        : '') +
                    '</inherit>'
            : '',

        // nesting info
        this.anchor
            ? '<nest anchor="' +
                    this.anchor.name +
                    '" synch="'
                    + this.rotatesWithAnchor
                    + (this.scale === this.nestingScale ? '' :
                            '"'
                            + ' scale="'
                            + this.nestingScale)

                    + '"/>'
            : '',

        noCostumes ? '' : serializer.store(this.costumes, this.name + '_cst'),
        noSounds ? '' : serializer.store(this.sounds, this.name + '_snd'),
        !this.customBlocks ? '' : serializer.store(this.customBlocks),
        serializer.store(this.variables),
        this.exemplar ? serializer.store(this.inheritedMethods()) : '',
        noScripts ? '' : serializer.store(this.scripts)
    );
};

StageMorph.prototype.toXML = function (serializer) {
	var cellAttributesString = "<cellsX>" + this.cellsX + '</cellsX><cellsY>' + this.cellsY + '</cellsY>';
	
	for (var i=0; i<Cell.attributes.length; i++)
	{
		var ii = Cell.attributes[i];
		
		cellAttributesString += '<attribute>';
		var attributeObject = {
			name: String(ii),
			drawFrom: String(Cell.attributeDrawRange[ii][0]),
			drawTo: String(Cell.attributeDrawRange[ii][1]),
			r: Cell.attributeColours[ii].r,
			g: Cell.attributeColours[ii].g,
			b: Cell.attributeColours[ii].b
		}
		cellAttributesString += XML_Serializer.prototype.format(JSON.stringify(attributeObject));
		cellAttributesString += '</attribute>';
	}
	
	var arrayBuffer = new ArrayBuffer(this.cellsX * this.cellsY * Cell.attributes.length * (64 / 8));
	var cellArray = new Float64Array(arrayBuffer);
	var cai = 0;
	for (var i=0; i<this.cells.length; i++)
	{
		for (var j=0; j<this.cells[i].length; j++)
		{
			for (var k=0; k<Cell.attributes.length; k++)
			{
				cellArray[cai] = this.cells[i][j].getAttribute(Cell.attributes[k]);
				cai++;
			}
		}
	}
	var byteView = new Uint8Array(arrayBuffer, 0);
	var cellString64 = base64EncArr(byteView);
	
	var visibleAttributes = XML_Serializer.prototype.format(JSON.stringify(this.visibleAttributes));

    var thumbnail = normalizeCanvas(
            this.thumbnail(SnapSerializer.prototype.thumbnailSize),
            true
        ),
        thumbdata,
        ide = this.parentThatIsA(IDE_Morph);

    // catch cross-origin tainting exception when using SVG costumes
    try {
        thumbdata = thumbnail.toDataURL('image/png');
    } catch (error) {
        thumbdata = null;
    }

    function code(key) {
        var str = '';
        Object.keys(StageMorph.prototype[key]).forEach(
            function (selector) {
                str += (
                    '<' + selector + '>' +
                        XML_Element.prototype.escape(
                            StageMorph.prototype[key][selector]
                        ) +
                        '</' + selector + '>'
                );
            }
        );
        return str;
    }

    this.removeAllClones();
    return serializer.format(
        '<project name="@" app="@" version="@">' +
            '<notes>$</notes>' +
            '<thumbnail>$</thumbnail>' +
            '<stage name="@" width="@" height="@" ' +
            'costume="@" tempo="@" threadsafe="@" ' +
            '%' +
            'lines="@" ' +
            'ternary="@" ' +
            'codify="@" ' +
            'inheritance="@" ' +
            'sublistIDs="@" ' +
            'scheduled="@" ~>' +
            '<pentrails>$</pentrails>' +
            '<costumes>%</costumes>' +
            '<sounds>%</sounds>' +
            '<variables>%</variables>' +
            '<blocks>%</blocks>' +
            '<scripts>%</scripts><sprites>%</sprites>' +
            '</stage>' +
            '<hidden>$</hidden>' +
            '<headers>%</headers>' +
            '<code>%</code>' +
            '<blocks>%</blocks>' +
            '<variables>%</variables>' +
			'<cellAttributes>%</cellAttributes>' +
			'<cellData>%</cellData>' +
			'<visibleAttributes>%</visibleAttributes>' +
            '</project>',
        (ide && ide.projectName) ? ide.projectName : localize('Untitled'),
        serializer.app,
        serializer.version,
        (ide && ide.projectNotes) ? ide.projectNotes : '',
        thumbdata,
        this.name,
        StageMorph.prototype.dimensions.x,
        StageMorph.prototype.dimensions.y,
        this.getCostumeIdx(),
        this.getTempo(),
        this.isThreadSafe,
        this.instrument ?
                ' instrument="' + parseInt(this.instrument) + '" ' : '',
        SpriteMorph.prototype.useFlatLineEnds ? 'flat' : 'round',
        BooleanSlotMorph.prototype.isTernary,
        this.enableCodeMapping,
        this.enableInheritance,
        this.enableSublistIDs,
        StageMorph.prototype.frameRate !== 0,
        normalizeCanvas(this.trailsCanvas, true).toDataURL('image/png'),
        serializer.store(this.costumes, this.name + '_cst'),
        serializer.store(this.sounds, this.name + '_snd'),
        serializer.store(this.variables),
        serializer.store(this.customBlocks),
        serializer.store(this.scripts),
        serializer.store(this.children),
        Object.keys(StageMorph.prototype.hiddenPrimitives).reduce(
                function (a, b) {return a + ' ' + b; },
                ''
            ),
        code('codeHeaders'),
        code('codeMappings'),
        serializer.store(this.globalBlocks),
        (ide && ide.globalVariables) ?
                    serializer.store(ide.globalVariables) : '',
		cellAttributesString,
		cellString64,
		visibleAttributes
    );
};

SnapSerializer.prototype.uberLoadProjectModel = SnapSerializer.prototype.loadProjectModel;
SnapSerializer.prototype.loadProjectModel = function (xmlNode) {
	var retn = this.uberLoadProjectModel(xmlNode);
	
    var cellAttributes = xmlNode.childNamed('cellAttributes');
	retn.cellAttributes = [];
	retn.cellAttributeColours = {};
	retn.cellAttributeDrawRange = {};
    if (cellAttributes != null) {
	    cellAttributes.childrenNamed('attribute').forEach(function (model) {
		    var attribute = JSON.parse(model.contents);
		    retn.cellAttributes.push(attribute.name);
		    retn.cellAttributeDrawRange[attribute.name] = [attribute.drawFrom, attribute.drawTo];
		    retn.cellAttributeColours[attribute.name] = new Color(attribute.r, attribute.g, attribute.b);
        });
    }
	
	retn.stage.cellsX = cellAttributes == null ? 40 : Number(cellAttributes.childNamed('cellsX').contents); 
	retn.stage.cellsY = cellAttributes == null ? 30 : Number(cellAttributes.childNamed('cellsY').contents);
	retn.stage.updateCells();
	
	var cellData = xmlNode.childNamed('cellData');
	if (cellData != null) {
	    var byteView = base64DecToArr(cellData.contents, 8);
	    var cellArray = new Float64Array(byteView.buffer,0);
	    var cai = 0;
	
	    for (var i=0; i<retn.stage.cellsY; i++)
	    {
		    for (var j=0; j<retn.stage.cellsX; j++)
		    {
			    var cell = retn.stage.cells[i][j]
			    if (cell)
			    {
				    for (var k=0; k<retn.cellAttributes.length; k++)
				    {
					    cell.setAttribute(retn.cellAttributes[k], cellArray[cai], false);
					    cai++;
				    }
			    }
		    }
	    }
	}
	
	var visibleAttributes = xmlNode.childNamed('visibleAttributes');
    if (visibleAttributes) {
	    retn.stage.visibleAttributes = JSON.parse(visibleAttributes.contents);
	}
	
	return retn;
};
