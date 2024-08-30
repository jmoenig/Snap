var ide = world.children.find(child => {
    return child instanceof IDE_Morph;
});

var prefix = 'vid_';

SnapExtensions.primitives.set(
    prefix+'player(url)',
    (url) => {
        var player = new VideoPlayerMorph(url);
        world.add(player);
    }
)

SnapExtensions.primitives.set(
    prefix+'costume(sprite,url,loop,loading_text)',
    (sprite, url, loop, loading_text) => {

        if(sprite.videoCanvas){
            sprite.videoCanvas.destroy();
            delete sprite.videoCanvas;
        }

        sprite.videoCanvas = new VideoCanvasWrapper(url);

        sprite.wearCostume = function(id, noShadow){
            sprite.videoCanvas.destroy();
            delete sprite.videoCanvas;
            sprite.wearCostume = (id, noShadow) => SpriteMorph.prototype.wearCostume.call(sprite, id, noShadow);
            sprite.wearCostume(id, noShadow);
        }

        if(loop) {
            sprite.videoCanvas.setLoop(true);
        }

        sprite.videoCanvas.addDrawFrameAction(()=>{

            if(sprite.videoCanvas){
                var canvas = null;
                if(sprite.videoCanvas.video.readyState === 4 && sprite.videoCanvas.canvas.height > 0 && sprite.videoCanvas.canvas.width > 0){
                    canvas = sprite.videoCanvas.canvas;
                }
                else if(loading_text) {
                    canvas = newCanvas(null, true);
                    canvas.width = 300;
                    canvas.height = 100;
                    var ctx = canvas.getContext("2d");
                    ctx.font = "15px sans-serif";
                    ctx.textAlign = "center";
                    ctx.fillText(loading_text, canvas.width/2, 15);
                }

                if(canvas){
                    SpriteMorph.prototype.wearCostume.call(sprite, new Costume(canvas));
                }
            }
        })
        sprite.videoCanvas.play();
    }
)

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
            if(myself.video && !myself.video.paused && !myself.video.ended){
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
    fetch(src).then(function(response) {
        return response;
    }).catch(function() {
        throw new Error("Cannot load video. If this URL is valid, the domain may not have proper CORS policies set.")
    });

    // We can only take video that has Access-Control-Allow-Origin set to *
    this.video.crossOrigin = "Anonymous"
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
    delete this.video;
}