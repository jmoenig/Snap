BlockDialogMorph.prototype.originalInit = BlockDialogMorph.prototype.init;
BlockDialogMorph.prototype.init = function (target, action, environment) {
    var myself = this;
    this.originalInit(target, action, environment);
    this.category = 'my blocks';
    this.categories.children.forEach(function (each) { each.refresh() });
    if (this.types) {
        this.types.children.forEach(function (each) {
                each.setColor(SpriteMorph.prototype.blockColor['my blocks']);
            });
    }
    this.edit();
};

BlockExportDialogMorph.prototype.exportBlocks = function () {
    var str = this.serializer.serialize(this.blocks),
        data,
        blob;

    if (this.blocks.length > 0) {
        data = ('<blocks app="'
                + this.serializer.app
                + '" version="'
                + this.serializer.version
                + '">'
                + str
                + '</blocks>');
    } else {
        new DialogBoxMorph().inform(
                'Export blocks',
                'no blocks were selected',
                this.world()
                );
    }

    blob = new Blob([data], {type: 'text/xml;charset=utf-8'});
    saveAs(blob, (this.projectName ? this.projectName : 'beetleblocks_block_export') + '.xml');
};

// We only have one sprite, so let's disable scope/type choice radio buttons

BlockDialogMorph.prototype.createScopeButtons = function() {
    this.scopes = null;
};

VariableDialogMorph.prototype.createTypeButtons = function() {
    this.types = null;
};
