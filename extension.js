var ide = world.children.find(child => {
        return child instanceof IDE_Morph;
});

var prefix = 'mrw_';

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

SnapExtensions.primitives.set(
    prefix+'play_video(url)',
    (url) => {
        var player = new VideoPlayerMorph(url);
        world.add(player);
    }
)

SnapExtensions.primitives.set(
    prefix+'video_costume(sprite,url,loop)',
    (sprite, url, loop) => {

        sprite.videoCanvas = new VideoCanvasWrapper(url);

        sprite.doSwitchToCostume = function(id, noShadow){
            sprite.videoCanvas.destroy();
            delete sprite.videoCanvas;
            sprite.doSwitchToCostume = (id, noShadow) => SpriteMorph.prototype.doSwitchToCostume.call(sprite, id, noShadow);
            sprite.doSwitchToCostume(id, noShadow);
        }




        if(loop) {
            sprite.videoCanvas.setLoop(true);
        }

        sprite.videoCanvas.addDrawFrameAction(()=>{
            SpriteMorph.prototype.doSwitchToCostume.call(sprite, new Costume(sprite.videoCanvas.canvas));
        })

        sprite.videoCanvas.play();
    }
)

// SnapExtensions.primitives.set(
//     prefix+'video_costume_play(sprite)',
//     (sprite) => {
//         if(sprite.videoCanvas){
//             sprite.videoCanvas.play();
//         }
//     }
// )

/**
 * Displays the specified video inside of a dialog box with player controls.
 * @param url of the video to load
 * @constructor
 */
function VideoPlayerMorph(url){
    this.init(url);
}

VideoPlayerMorph.prototype = new DialogBoxMorph();
VideoPlayerMorph.prototype.constructor = VideoPlayerMorph;
VideoPlayerMorph.uber = DialogBoxMorph.prototype;


VideoPlayerMorph.prototype.init = function(url){
    var myself = this;
    VideoPlayerMorph.uber.init.call(this);

    this.labelString = 'Video player';
    this.createLabel();

    // player buttons
    this.addButton('close','close');
    this.addButton('play','play');
    this.addButton('pause','pause');
    this.addButton('stop','stop');


    // set up video player
    this.playerArea = new Morph();

    this.playerArea.setWidth(40)
    this.playerArea.setHeight(50);

    this.addBody(this.playerArea);

    this.videoCanvas = new VideoCanvasWrapper(url);

    this.videoCanvas.addLoadedMetadataAction(()=> {
        myself.playerArea.setWidth(myself.videoCanvas.video.videoWidth);
        myself.playerArea.setHeight(myself.videoCanvas.video.videoHeight);
        myself.fixLayout();
    })

    this.videoCanvas.addDrawFrameAction(() => {
        myself.playerArea.isCachingImage = true;
        myself.playerArea.cachedImage = myself.videoCanvas.canvas;
        myself.playerArea.bounds.setWidth(myself.videoCanvas.video.videoWidth);
        myself.playerArea.bounds.setHeight(myself.videoCanvas.video.videoHeight);
        myself.fixLayout();
    })

    this.fixLayout();
    this.loadVideo(url);

}

VideoPlayerMorph.prototype.loadVideo = function(src){
    this.videoCanvas.loadVideo(src);
}

VideoPlayerMorph.prototype.play = function(){
    this.videoCanvas.play();
}

VideoPlayerMorph.prototype.pause = function(){
    this.videoCanvas.pause();
}

VideoPlayerMorph.prototype.stop = function(){
    this.videoCanvas.stop();
}

VideoPlayerMorph.prototype.close = function(){
    this.stop();
    this.destroy();
}

/**
 * Creates a canvas that continuously draws the current frame of the specified video as it plays.
 * @param url of the video to load
 * @constructor
 */

function VideoCanvasWrapper(url){
    this.init(url);
}

VideoCanvasWrapper.prototype.init = function(url){
    this.video = document.createElement('video');
    this.canvas = newCanvas(null, true);

    this.onDrawFrameActions = [];
    this.onLoadedMetadataActions = [];

    var myself = this;

    this.video.addEventListener('loadedmetadata', function(){
        myself.canvas.width = myself.video.videoWidth;
        myself.canvas.height = myself.video.videoHeight;
        myself.onLoadedMetadataActions.forEach(action => {
            action(myself);
        })
    });

    this.video.addEventListener('play', function(){
        var ctx = myself.canvas.getContext('2d');
        var v = this;
        (function drawFrame(){
            if(!myself.video.paused && !myself.video.ended){

                // retina support does not play nicely here,
                // so call the original drawImage
                if(isRetinaEnabled()){
                    HTMLCanvasElement.prototype._bak.drawImage.call(ctx, v,0,0, myself.canvas.width, myself.canvas.height)
                }
                else{
                    ctx.drawImage(v,0,0, myself.canvas.width, myself.canvas.height);
                }

                myself.onDrawFrameActions.forEach(action => {
                    action();
                })

                requestAnimationFrame(drawFrame);

            }
        })();
    });
    this.loadVideo(url);
}

VideoCanvasWrapper.prototype.setLoop = function(loop){
    if(loop){
        this.video.loop = true;
    }
    else{
        delete this.video.loop;
    }
}

VideoCanvasWrapper.prototype.addDrawFrameAction = function(action) {
    this.onDrawFrameActions.push(action);
}

VideoCanvasWrapper.prototype.addLoadedMetadataAction = function(action) {
    this.onLoadedMetadataActions.push(action);
}

VideoCanvasWrapper.prototype.loadVideo = function(src){
    this.video.src = src;
}

VideoCanvasWrapper.prototype.play = function(){
    this.video.play();
}

VideoCanvasWrapper.prototype.pause = function(){
    this.video.pause();
}

VideoCanvasWrapper.prototype.stop = function(){
    this.pause();
    this.video.currentTime = 0;
}

VideoCanvasWrapper.prototype.destroy = function(){
    this.stop();
    this.video.remove();
}