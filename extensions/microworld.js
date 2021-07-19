var ide = world.children.find(child => {
    return child instanceof IDE_Morph;
}),
    prefix = 'mw';

function unifiedPalette(){
    ide.setUnifiedPalette(true);
}

var hidePrimitives = ()=>{
    var defs = SpriteMorph.prototype.blocks;
    Object.keys(defs).forEach(sel => {
        StageMorph.prototype.hiddenPrimitives[sel] = true;
    });
    ide.flushBlocksCache('unified');
    ide.refreshPalette();
}

var showPrimitives = () => {
    StageMorph.prototype.hiddenPrimitives = {}
    ide.flushBlocksCache('unified');
    ide.refreshPalette();
}

SnapExtensions.primitives.set(
    prefix+'enter',
    () => {
        unifiedPalette();
        hidePrimitives();
    }
)

SnapExtensions.primitives.set(
    prefix+'exit',
    () => {
        showPrimitives();
    }
)