modules.cellularStore = '2013-December-1';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

SnapSerializer.prototype.loadSprite = function (model, project) {
	var v;
	
	if (model.attributes.parentSprite) {
		//This is a cellular instance, do not create a full SpriteMorph.
		//Instead, copy the important things.
		v = {};
		
		v.parentSpriteName = model.attributes.parentSprite;
		v.variables = {};
		
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
		this.loadVariables(v.variables, model.require('variables'));
	}
	else
	{
		v = new SpriteMorph(project.globalVariables);
		
		if (model.attributes.id) {
			this.objects[model.attributes.id] = v;
		}
		if (model.attributes.name) {
			v.name = model.attributes.name;
			project.sprites[model.attributes.name] = v;
		}
		if (model.attributes.idx) {
			v.idx = +model.attributes.idx;
		}
		if (model.attributes.color) {
			v.color = this.loadColor(model.attributes.color);
		}
		if (model.attributes.pen) {
			v.penPoint = model.attributes.pen;
		}
		project.stage.add(v);
		v.scale = parseFloat(model.attributes.scale || '1');
		v.rotationStyle = parseFloat(
			model.attributes.rotation || '1'
		);
		v.isDraggable = model.attributes.draggable !== 'false';
		v.isVisible = model.attributes.hidden !== 'true';
		v.heading = parseFloat(model.attributes.heading) || 0;
		v.drawNew();
		v.gotoXY(+model.attributes.x || 0, +model.attributes.y || 0);
		this.loadObject(v, model);
	}
	return v;
}

SnapSerializer.prototype.spritesLoaded = function(stage, spriteList)
{
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
		v.penPoint = ii.penPoint;
		v.color = ii.color;
		v.scale = ii.scale;
		v.heading = ii.heading;
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
    project.stage.drawNew();
    ide.createCorral();
    ide.selectSprite(sprite);
    ide.fixLayout();
    ide.world().keyboardReceiver = project.stage;
};

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

SnapSerializer.prototype.loadObject = function (object, model) {
    // private
    this.loadNestingInfo(object, model);
    this.loadCostumes(object, model);
    this.loadSounds(object, model);
	
    var blocks = model.childNamed('blocks');
	if (blocks)
	{
		this.loadCustomBlocks(object, blocks);
		this.populateCustomBlocks(object, blocks);
	}
	
	var variables = model.childNamed('variables');
	if (variables)
	{
		this.loadVariables(object.variables, variables);
	}
	
	var scripts = model.childNamed('scripts')
	if (scripts)
	{
		this.loadScripts(object.scripts, scripts);
	}
};

SpriteMorph.prototype.toXML = function (serializer) {
	
    var stage = this.parentThatIsA(StageMorph),
        ide = stage ? stage.parentThatIsA(IDE_Morph) : null,
        idx = ide ? ide.sprites.asArray().indexOf(this) + 1 : 0;
		
	return serializer.format(
        '<sprite% idx="@" x="@" y="@"' +
            ' heading="@"' +
            ' scale="@"' +
            ' rotation="@"' +
            ' draggable="@"' +
            '%' +
            ' costume="@" color="@,@,@" pen="@" ~>' +
            '%' + // nesting info
            (this.parentSprite 
				? '<variables>%</variables>' //Parent sprite, only variables.
				: '<costumes>%</costumes>' + 
				'<sounds>%</sounds>' +
				'<variables>%</variables>' +
				'<blocks>%</blocks>' +
				'<scripts>%</scripts>') +
            '</sprite>',
         (this.parentSprite != null 
			? ' parentSprite="'+this.parentSprite.name+'"'
			: ' name="'+this.name+'"'),
        idx,
        this.xPosition(),
        this.yPosition(),
        this.heading,
        this.scale,
        this.rotationStyle,
        this.isDraggable,
        (this.isVisible ? '' : ' hidden="true"'),
        this.getCostumeIdx(),
        this.color.r,
        this.color.g,
        this.color.b,
        this.penPoint,

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

		//Don't serialize any of the script data if we have a parent sprite.
        this.parentSprite ? serializer.store(this.variables) : serializer.store(this.costumes, this.name + '_cst'),
        this.parentSprite ? undefined : serializer.store(this.sounds, this.name + '_snd'),
        this.parentSprite ? undefined : serializer.store(this.variables),
        this.parentSprite ? undefined : (!this.customBlocks ? '' : serializer.store(this.customBlocks)),
        this.parentSprite ? undefined : serializer.store(this.scripts)
    );
};