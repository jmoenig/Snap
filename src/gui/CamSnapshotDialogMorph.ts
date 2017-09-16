// CamSnapshotDialogMorph ////////////////////////////////////////////////////

/*
    I am a dialog morph that lets users take a snapshot using their webcam
    and use it as a costume for their sprites or a background for the Stage.

    NOTE: Currently disabled because of issues with retina displays.
*/

// CamSnapshotDialogMorph inherits from DialogBoxMorph:

CamSnapshotDialogMorph.prototype.enableCamera = false; // has issues with retina

// CamSnapshotDialogMorph instance creation

export default class CamSnapshotDialogMorph extends DialogBoxMorph {
    constructor(ide, sprite, onCancel, onAccept) {
        this.init(ide, sprite, onCancel, onAccept);
    }

    init(ide, sprite, onCancel, onAccept) {
        this.ide = ide;
        this.sprite = sprite;
        this.padding = 10;

        this.oncancel = onCancel;
        this.accept = onAccept;

        this.videoElement = null; // an HTML5 video element
        this.videoView = new Morph(); // a morph where we'll copy the video contents

        super.init.call(this);

        this.labelString = 'Camera';
        this.createLabel();

        this.buildContents();
    }

    buildContents() {
        const myself = this;

        this.videoElement = document.createElement('video');
        this.videoElement.hidden = true;
        document.body.appendChild(this.videoElement);

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    myself.videoElement.src = window.URL.createObjectURL(stream);
                    myself.videoElement.play();
                    myself.videoElement.stream = stream;
                });
        }

        this.videoView.setExtent(this.ide.stage.dimensions);
        this.videoView.image = newCanvas(this.videoView.extent());
        this.videoView.drawOn = function (aCanvas) {
            const context = aCanvas.getContext('2d');
            const w = this.width();
            const h = this.height();

            context.save();

            // Flip the image so it looks like a mirror
            context.translate(w, 0);
            context.scale(-1, 1);

            context.drawImage(
                myself.videoElement,
                this.left() * -1,
                this.top(),
                w,
                h
                );

            context.restore();
        };

        this.videoView.step = function () {
            this.changed();
        };

        this.addBody(new AlignmentMorph('column', this.padding / 2));
        this.body.add(this.videoView);
        this.body.fixLayout();

        this.addButton('ok', 'Save');
        this.addButton('cancel', 'Cancel');
     
        this.fixLayout();
        this.drawNew();
    }

    ok() {
        const stage = this.ide.stage;
        const canvas = newCanvas(stage.dimensions);
        const context = canvas.getContext('2d');

        context.translate(stage.dimensions.x, 0);
        context.scale(-1, 1);

        context.drawImage(
            this.videoElement,
            0,
            0,
            stage.dimensions.x,
            stage.dimensions.y
        );

        this.accept(new Costume(canvas), this.sprite.newCostumeName('camera'));
        this.close();
    }

    destroy() {
        this.oncancel.call(this);
        this.close();
    }

    close() {
        if (this.videoElement) {
            this.videoElement.stream.getTracks()[0].stop();
            this.videoElement.remove();
        }
        super.destroy.call(this);
    }
}

