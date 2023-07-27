var ide = world.children.find(child => {
        return child instanceof IDE_Morph;
    }),
    prefix = 'spc_';

function resizeTo(canvas, pct) {
    const cw=canvas.width;
    const ch=canvas.height;
    const tempCanvas = newCanvas();
    const tctx = tempCanvas.getContext("2d");
    tempCanvas.width=cw;
    tempCanvas.height=ch;
    tctx.drawImage(canvas,0,0);
    canvas.width*=pct;
    canvas.height*=pct;
    const ctx=canvas.getContext('2d');
    ctx.drawImage(tempCanvas,0,0,cw,ch,0,0,cw*pct,ch*pct);
}

SnapExtensions.primitives.set(prefix + 'script_to_costume(script)', function(script, proc) {
    if(!script?.expression) {
        throw new Error("Please give me a ringified script.")
    }
    const canvas = script.expression.scriptPic();
    resizeTo(canvas, 4);


    return new Costume(canvas);


})