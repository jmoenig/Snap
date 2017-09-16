// JukeboxMorph /////////////////////////////////////////////////////

/*
    I am JukeboxMorph, like WardrobeMorph, but for sounds
*/

// JukeboxMorph instance creation

export default class JukeboxMorph extends ScrollFrameMorph {
    constructor(aSprite, sliderColor) {
        this.init(aSprite, sliderColor);
    }

    init(aSprite, sliderColor) {
        // additional properties
        this.sprite = aSprite || new SpriteMorph();
        this.soundsVersion = null;
        this.spriteVersion = null;

        // initialize inherited properties
        super.init.call(this, null, null, sliderColor);

        // configure inherited properties
        this.acceptsDrops = false;
        this.fps = 2;
        this.updateList();
    }

    // Jukebox updating

    updateList() {
        const myself = this;
        const x = this.left() + 5;
        let y = this.top() + 5;
        const padding = 4;
        let oldFlag = Morph.prototype.trackChanges;
        let icon;
        let template;
        let txt;

        this.changed();
        oldFlag = Morph.prototype.trackChanges;
        Morph.prototype.trackChanges = false;

        this.contents.destroy();
        this.contents = new FrameMorph(this);
        this.contents.acceptsDrops = false;
        this.contents.reactToDropOf = icon => {
            myself.reactToDropOf(icon);
        };
        this.addBack(this.contents);

        txt = new TextMorph(localize(
            'import a sound from your computer\nby dragging it into here'
        ));
        txt.fontSize = 9;
        txt.setColor(SpriteMorph.prototype.paletteTextColor);
        txt.setPosition(new Point(x, y));
        this.addContents(txt);
        y = txt.bottom() + padding;

        this.sprite.sounds.asArray().forEach(sound => {
            template = icon = new SoundIconMorph(sound, template);
            icon.setPosition(new Point(x, y));
            myself.addContents(icon);
            y = icon.bottom() + padding;
        });
        this.soundsVersion = this.sprite.costumes.lastChanged;

        Morph.prototype.trackChanges = oldFlag;
        this.changed();

        this.updateSelection();
    }

    updateSelection() {
        this.contents.children.forEach(morph => {
            if (morph.refresh) {morph.refresh(); }
        });
        this.spriteVersion = this.sprite.version;
    }

    // Jukebox stepping

    step() {
        if (this.soundsVersion !== this.sprite.sounds.lastChanged) {
            this.updateList();
        }
        if (this.spriteVersion !== this.sprite.version) {
            this.updateSelection();
        }
    }

    // Jukebox ops

    removeSound(idx) {
        this.sprite.sounds.remove(idx);
        this.updateList();
    }

    // Jukebox drag & drop

    wantsDropOf(morph) {
        return morph instanceof SoundIconMorph;
    }

    reactToDropOf(icon) {
        let idx = 0;
        const costume = icon.object;
        const top = icon.top();

        icon.destroy();
        this.contents.children.forEach(item => {
            if (item.top() < top - 4) {
                idx += 1;
            }
        });

        this.sprite.shadowAttribute('sounds');
        this.sprite.sounds.add(costume, idx);
        this.updateList();
    }
}