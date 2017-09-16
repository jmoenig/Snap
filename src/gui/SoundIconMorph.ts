// SoundIconMorph ///////////////////////////////////////////////////////

/*
    I am an element in the SpriteEditor's "Sounds" tab.
*/

// SoundIconMorph inherits from ToggleButtonMorph (Widgets)
// ... and copies methods from SpriteIconMorph // TODO

// SoundIconMorph settings

SoundIconMorph.prototype.thumbSize = new Point(80, 60);
SoundIconMorph.prototype.labelShadowOffset = null;
SoundIconMorph.prototype.labelShadowColor = null;
SoundIconMorph.prototype.labelColor = new Color(255, 255, 255);
SoundIconMorph.prototype.fontSize = 9;

// SoundIconMorph instance creation:

export default class SoundIconMorph extends ToggleButtonMorph {
    constructor(aSound, aTemplate) {
        this.init(aSound, aTemplate);
    }

    init(aSound, aTemplate) {
        let colors;
        let action;
        let query;

        if (!aTemplate) {
            colors = [
                IDE_Morph.prototype.groupColor,
                IDE_Morph.prototype.frameColor,
                IDE_Morph.prototype.frameColor
            ];

        }

        action = () => {
            nop(); // When I am selected (which is never the case for sounds)
        };

        query = () => false;

        // additional properties:
        this.object = aSound; // mandatory, actually
        this.version = this.object.version;
        this.thumbnail = null;

        // initialize inherited properties:
        super.init.call(
            this,
            colors, // color overrides, <array>: [normal, highlight, pressed]
            null, // target - not needed here
            action, // a toggle function
            this.object.name, // label string
            query, // predicate/selector
            null, // environment
            null, // hint
            aTemplate // optional, for cached background images
        );

        // override defaults and build additional components
        this.isDraggable = true;
        this.createThumbnail();
        this.padding = 2;
        this.corner = 8;
        this.fixLayout();
        this.fps = 1;
    }

    createThumbnail() {
        let label;
        if (this.thumbnail) {
            this.thumbnail.destroy();
        }
        this.thumbnail = new Morph();
        this.thumbnail.setExtent(this.thumbSize);
        this.add(this.thumbnail);
        label = new StringMorph(
            this.createInfo(),
            '16',
            '',
            true,
            false,
            false,
            this.labelShadowOffset,
            this.labelShadowColor,
            new Color(200, 200, 200)
        );
        this.thumbnail.add(label);
        label.setCenter(new Point(40, 15));

        this.button = new PushButtonMorph(
            this,
            'toggleAudioPlaying',
            (this.object.previewAudio ? 'Stop' : 'Play')
        );
        this.button.drawNew();
        this.button.hint = 'Play sound';
        this.button.fixLayout();
        this.thumbnail.add(this.button);
        this.button.setCenter(new Point(40, 40));
    }

    createInfo() {
        const dur = Math.round(this.object.audio.duration || 0);
        const mod = dur % 60;
        return `${Math.floor(dur / 60).toString()}:${mod < 10 ? "0" : ""}${mod.toString()}`;
    }

    toggleAudioPlaying() {
        const myself = this;
        if (!this.object.previewAudio) {
            //Audio is not playing
            this.button.labelString = 'Stop';
            this.button.hint = 'Stop sound';
            this.object.previewAudio = this.object.play();
            this.object.previewAudio.addEventListener('ended', () => {
                myself.audioHasEnded();
            }, false);
        } else {
            //Audio is currently playing
            this.button.labelString = 'Play';
            this.button.hint = 'Play sound';
            this.object.previewAudio.pause();
            this.object.previewAudio.terminated = true;
            this.object.previewAudio = null;
        }
        this.button.createLabel();
    }

    audioHasEnded() {
        this.button.trigger();
        this.button.mouseLeave();
    }

    // SoundIconMorph menu

    userMenu() {
        const menu = new MenuMorph(this);
        if (!(this.object instanceof Sound)) { return null; }
        menu.addItem('rename', 'renameSound');
        menu.addItem('delete', 'removeSound');
        return menu;
    }

    renameSound() {
        const sound = this.object;
        const ide = this.parentThatIsA(IDE_Morph);
        const myself = this;
        this.disinherit();
        (new DialogBoxMorph(
            null,
            answer => {
                if (answer && (answer !== sound.name)) {
                    sound.name = answer;
                    sound.version = Date.now();
                    myself.createLabel(); // can be omitted once I'm stepping
                    myself.fixLayout(); // can be omitted once I'm stepping
                    ide.hasChangedMedia = true;
                }
            }
        )).prompt(
            'rename sound',
            sound.name,
            this.world()
        );
    }

    removeSound() {
        const jukebox = this.parentThatIsA(JukeboxMorph);
        const idx = this.parent.children.indexOf(this);
        jukebox.removeSound(idx);
    }

    // SoundIconMorph inheritance

    disinherit() {
        const jukebox = this.parentThatIsA(JukeboxMorph);
        const idx = this.parent.children.indexOf(this);
        if (jukebox.sprite.inheritsAttribute('sounds')) {
            jukebox.sprite.shadowAttribute('sounds');
            this.object = jukebox.sprite.sounds.at(idx);
        }
    }

    // SoundIconMorph drag & drop

    prepareToBeGrabbed() {
        this.disinherit();
        this.removeSound();
    }
}

SoundIconMorph.prototype.createLabel
    = SpriteIconMorph.prototype.createLabel;

// SoundIconMorph stepping

/*
SoundIconMorph.prototype.step
    = SpriteIconMorph.prototype.step;
*/

// SoundIconMorph layout

SoundIconMorph.prototype.fixLayout
    = SpriteIconMorph.prototype.fixLayout;

SoundIconMorph.prototype.createBackgrounds
    = SpriteIconMorph.prototype.createBackgrounds;

SoundIconMorph.prototype.createLabel
    = SpriteIconMorph.prototype.createLabel;