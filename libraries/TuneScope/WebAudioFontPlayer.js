'use strict';
var WebAudioFontChannel = /** @class */ (function () {
    function WebAudioFontChannel(audioContext) {
        this.audioContext = audioContext;
        this.input = audioContext.createGain();
        this.band32 = this.bandEqualizer(this.input, 32);
        this.band64 = this.bandEqualizer(this.band32, 64);
        this.band128 = this.bandEqualizer(this.band64, 128);
        this.band256 = this.bandEqualizer(this.band128, 256);
        this.band512 = this.bandEqualizer(this.band256, 512);
        this.band1k = this.bandEqualizer(this.band512, 1024);
        this.band2k = this.bandEqualizer(this.band1k, 2048);
        this.band4k = this.bandEqualizer(this.band2k, 4096);
        this.band8k = this.bandEqualizer(this.band4k, 8192);
        this.band16k = this.bandEqualizer(this.band8k, 16384);
        this.output = audioContext.createGain();
        this.band16k.connect(this.output);
    }
    WebAudioFontChannel.prototype.bandEqualizer = function (from, frequency) {
        var filter = this.audioContext.createBiquadFilter();
        filter.frequency.setTargetAtTime(frequency, 0, 0.0001);
        filter.type = "peaking";
        filter.gain.setTargetAtTime(0, 0, 0.0001);
        filter.Q.setTargetAtTime(1.0, 0, 0.0001);
        from.connect(filter);
        return filter;
    };
    ;
    return WebAudioFontChannel;
}());
var WebAudioFontLoader = /** @class */ (function () {
    function WebAudioFontLoader(player) {
        this.cached = [];
        this.instrumentKeyArray = [];
        this.instrumentNamesArray = [];
        this.choosenInfos = [];
        this.drumNamesArray = [];
        this.drumKeyArray = [];
        this.instrumentTitles = function () {
            if (this.instrumentNamesArray.length == 0) {
                var insNames = [];
                insNames[0] = "Acoustic Grand Piano: Piano";
                insNames[1] = "Bright Acoustic Piano: Piano";
                insNames[2] = "Electric Grand Piano: Piano";
                insNames[3] = "Honky-tonk Piano: Piano";
                insNames[4] = "Electric Piano 1: Piano";
                insNames[5] = "Electric Piano 2: Piano";
                insNames[6] = "Harpsichord: Piano";
                insNames[7] = "Clavinet: Piano";
                insNames[8] = "Celesta: Chromatic Percussion";
                insNames[9] = "Glockenspiel: Chromatic Percussion";
                insNames[10] = "Music Box: Chromatic Percussion";
                insNames[11] = "Vibraphone: Chromatic Percussion";
                insNames[12] = "Marimba: Chromatic Percussion";
                insNames[13] = "Xylophone: Chromatic Percussion";
                insNames[14] = "Tubular Bells: Chromatic Percussion";
                insNames[15] = "Dulcimer: Chromatic Percussion";
                insNames[16] = "Drawbar Organ: Organ";
                insNames[17] = "Percussive Organ: Organ";
                insNames[18] = "Rock Organ: Organ";
                insNames[19] = "Church Organ: Organ";
                insNames[20] = "Reed Organ: Organ";
                insNames[21] = "Accordion: Organ";
                insNames[22] = "Harmonica: Organ";
                insNames[23] = "Tango Accordion: Organ";
                insNames[24] = "Acoustic Guitar (nylon): Guitar";
                insNames[25] = "Acoustic Guitar (steel): Guitar";
                insNames[26] = "Electric Guitar (jazz): Guitar";
                insNames[27] = "Electric Guitar (clean): Guitar";
                insNames[28] = "Electric Guitar (muted): Guitar";
                insNames[29] = "Overdriven Guitar: Guitar";
                insNames[30] = "Distortion Guitar: Guitar";
                insNames[31] = "Guitar Harmonics: Guitar";
                insNames[32] = "Acoustic Bass: Bass";
                insNames[33] = "Electric Bass (finger): Bass";
                insNames[34] = "Electric Bass (pick): Bass";
                insNames[35] = "Fretless Bass: Bass";
                insNames[36] = "Slap Bass 1: Bass";
                insNames[37] = "Slap Bass 2: Bass";
                insNames[38] = "Synth Bass 1: Bass";
                insNames[39] = "Synth Bass 2: Bass";
                insNames[40] = "Violin: Strings";
                insNames[41] = "Viola: Strings";
                insNames[42] = "Cello: Strings";
                insNames[43] = "Contrabass: Strings";
                insNames[44] = "Tremolo Strings: Strings";
                insNames[45] = "Pizzicato Strings: Strings";
                insNames[46] = "Orchestral Harp: Strings";
                insNames[47] = "Timpani: Strings";
                insNames[48] = "String Ensemble 1: Ensemble";
                insNames[49] = "String Ensemble 2: Ensemble";
                insNames[50] = "Synth Strings 1: Ensemble";
                insNames[51] = "Synth Strings 2: Ensemble";
                insNames[52] = "Choir Aahs: Ensemble";
                insNames[53] = "Voice Oohs: Ensemble";
                insNames[54] = "Synth Choir: Ensemble";
                insNames[55] = "Orchestra Hit: Ensemble";
                insNames[56] = "Trumpet: Brass";
                insNames[57] = "Trombone: Brass";
                insNames[58] = "Tuba: Brass";
                insNames[59] = "Muted Trumpet: Brass";
                insNames[60] = "French Horn: Brass";
                insNames[61] = "Brass Section: Brass";
                insNames[62] = "Synth Brass 1: Brass";
                insNames[63] = "Synth Brass 2: Brass";
                insNames[64] = "Soprano Sax: Reed";
                insNames[65] = "Alto Sax: Reed";
                insNames[66] = "Tenor Sax: Reed";
                insNames[67] = "Baritone Sax: Reed";
                insNames[68] = "Oboe: Reed";
                insNames[69] = "English Horn: Reed";
                insNames[70] = "Bassoon: Reed";
                insNames[71] = "Clarinet: Reed";
                insNames[72] = "Piccolo: Pipe";
                insNames[73] = "Flute: Pipe";
                insNames[74] = "Recorder: Pipe";
                insNames[75] = "Pan Flute: Pipe";
                insNames[76] = "Blown bottle: Pipe";
                insNames[77] = "Shakuhachi: Pipe";
                insNames[78] = "Whistle: Pipe";
                insNames[79] = "Ocarina: Pipe";
                insNames[80] = "Lead 1 (square): Synth Lead";
                insNames[81] = "Lead 2 (sawtooth): Synth Lead";
                insNames[82] = "Lead 3 (calliope): Synth Lead";
                insNames[83] = "Lead 4 (chiff): Synth Lead";
                insNames[84] = "Lead 5 (charang): Synth Lead";
                insNames[85] = "Lead 6 (voice): Synth Lead";
                insNames[86] = "Lead 7 (fifths): Synth Lead";
                insNames[87] = "Lead 8 (bass + lead): Synth Lead";
                insNames[88] = "Pad 1 (new age): Synth Pad";
                insNames[89] = "Pad 2 (warm): Synth Pad";
                insNames[90] = "Pad 3 (polysynth): Synth Pad";
                insNames[91] = "Pad 4 (choir): Synth Pad";
                insNames[92] = "Pad 5 (bowed): Synth Pad";
                insNames[93] = "Pad 6 (metallic): Synth Pad";
                insNames[94] = "Pad 7 (halo): Synth Pad";
                insNames[95] = "Pad 8 (sweep): Synth Pad";
                insNames[96] = "FX 1 (rain): Synth Effects";
                insNames[97] = "FX 2 (soundtrack): Synth Effects";
                insNames[98] = "FX 3 (crystal): Synth Effects";
                insNames[99] = "FX 4 (atmosphere): Synth Effects";
                insNames[100] = "FX 5 (brightness): Synth Effects";
                insNames[101] = "FX 6 (goblins): Synth Effects";
                insNames[102] = "FX 7 (echoes): Synth Effects";
                insNames[103] = "FX 8 (sci-fi): Synth Effects";
                insNames[104] = "Sitar: Ethnic";
                insNames[105] = "Banjo: Ethnic";
                insNames[106] = "Shamisen: Ethnic";
                insNames[107] = "Koto: Ethnic";
                insNames[108] = "Kalimba: Ethnic";
                insNames[109] = "Bagpipe: Ethnic";
                insNames[110] = "Fiddle: Ethnic";
                insNames[111] = "Shanai: Ethnic";
                insNames[112] = "Tinkle Bell: Percussive";
                insNames[113] = "Agogo: Percussive";
                insNames[114] = "Steel Drums: Percussive";
                insNames[115] = "Woodblock: Percussive";
                insNames[116] = "Taiko Drum: Percussive";
                insNames[117] = "Melodic Tom: Percussive";
                insNames[118] = "Synth Drum: Percussive";
                insNames[119] = "Reverse Cymbal: Percussive";
                insNames[120] = "Guitar Fret Noise: Sound effects";
                insNames[121] = "Breath Noise: Sound effects";
                insNames[122] = "Seashore: Sound effects";
                insNames[123] = "Bird Tweet: Sound effects";
                insNames[124] = "Telephone Ring: Sound effects";
                insNames[125] = "Helicopter: Sound effects";
                insNames[126] = "Applause: Sound effects";
                insNames[127] = "Gunshot: Sound effects";
                this.instrumentNamesArray = insNames;
            }
            return this.instrumentNamesArray;
        };
        this.player = player;
    }
    WebAudioFontLoader.prototype.startLoad = function (audioContext, filePath, variableName) {
        if (window[variableName]) {
            return;
        }
        for (var i = 0; i < this.cached.length; i++) {
            if (this.cached[i].variableName == variableName) {
                return;
            }
        }
        this.cached.push({
            filePath: filePath,
            variableName: variableName
        });
        var r = document.createElement('script');
        r.setAttribute("type", "text/javascript");
        r.setAttribute("src", filePath);
        document.getElementsByTagName("head")[0].appendChild(r);
        this.decodeAfterLoading(audioContext, variableName);
    };
    ;
    WebAudioFontLoader.prototype.decodeAfterLoading = function (audioContext, variableName) {
        var me = this;
        this.waitOrFinish(variableName, function () {
            me.player.adjustPreset(audioContext, window[variableName]);
        });
    };
    ;
    WebAudioFontLoader.prototype.waitOrFinish = function (variableName, onFinish) {
        if (window[variableName]) {
            onFinish();
        }
        else {
            var me = this;
            setTimeout(function () {
                me.waitOrFinish(variableName, onFinish);
            }, 111);
        }
    };
    ;
    WebAudioFontLoader.prototype.loaded = function (variableName) {
        if (!(window[variableName])) {
            return false;
        }
        var preset = window[variableName];
        for (var i = 0; i < preset.zones.length; i++) {
            if (!(preset.zones[i].buffer)) {
                return false;
            }
        }
        return true;
    };
    ;
    WebAudioFontLoader.prototype.progress = function () {
        if (this.cached.length > 0) {
            for (var k = 0; k < this.cached.length; k++) {
                if (!this.loaded(this.cached[k].variableName)) {
                    return k / this.cached.length;
                }
            }
            return 1;
        }
        else {
            return 1;
        }
    };
    ;
    WebAudioFontLoader.prototype.waitLoad = function (onFinish) {
        var me = this;
        if (this.progress() >= 1) {
            onFinish();
        }
        else {
            setTimeout(function () {
                me.waitLoad(onFinish);
            }, 333);
        }
    };
    ;
    WebAudioFontLoader.prototype.instrumentKeys = function () {
        if (this.instrumentKeyArray.length == 0) {
            this.instrumentKeyArray = [
                '0000_JCLive_sf2_file', '0000_Aspirin_sf2_file', '0000_Chaos_sf2_file', '0000_FluidR3_GM_sf2_file', '0000_GeneralUserGS_sf2_file', '0000_SBLive_sf2', '0000_SoundBlasterOld_sf2',
                '0001_FluidR3_GM_sf2_file', '0001_GeneralUserGS_sf2_file', '0002_GeneralUserGS_sf2_file', '0003_GeneralUserGS_sf2_file', '0010_Aspirin_sf2_file', '0010_Chaos_sf2_file', '0010_FluidR3_GM_sf2_file',
                '0010_GeneralUserGS_sf2_file', '0010_JCLive_sf2_file', '0010_SBLive_sf2', '0010_SoundBlasterOld_sf2', '0011_Aspirin_sf2_file', '0011_FluidR3_GM_sf2_file', '0011_GeneralUserGS_sf2_file',
                '0012_GeneralUserGS_sf2_file', '0020_Aspirin_sf2_file', '0020_Chaos_sf2_file', '0020_FluidR3_GM_sf2_file', '0020_GeneralUserGS_sf2_file', '0020_JCLive_sf2_file', '0020_SBLive_sf2',
                '0020_SoundBlasterOld_sf2', '0021_Aspirin_sf2_file', '0021_GeneralUserGS_sf2_file', '0022_Aspirin_sf2_file', '0030_Aspirin_sf2_file', '0030_Chaos_sf2_file', '0030_FluidR3_GM_sf2_file',
                '0030_GeneralUserGS_sf2_file', '0030_JCLive_sf2_file', '0030_SBLive_sf2', '0030_SoundBlasterOld_sf2', '0031_Aspirin_sf2_file', '0031_FluidR3_GM_sf2_file', '0031_GeneralUserGS_sf2_file',
                '0031_SoundBlasterOld_sf2', '0040_Aspirin_sf2_file', '0040_Chaos_sf2_file', '0040_FluidR3_GM_sf2_file', '0040_GeneralUserGS_sf2_file', '0040_JCLive_sf2_file', '0040_SBLive_sf2',
                '0040_SoundBlasterOld_sf2', '0041_FluidR3_GM_sf2_file', '0041_GeneralUserGS_sf2_file', '0041_SoundBlasterOld_sf2', '0042_GeneralUserGS_sf2_file', '0043_GeneralUserGS_sf2_file',
                '0044_GeneralUserGS_sf2_file', '0045_GeneralUserGS_sf2_file', '0046_GeneralUserGS_sf2_file', '0050_Aspirin_sf2_file', '0050_Chaos_sf2_file', '0050_FluidR3_GM_sf2_file',
                '0050_GeneralUserGS_sf2_file', '0050_JCLive_sf2_file', '0050_SBLive_sf2', '0050_SoundBlasterOld_sf2', '0051_FluidR3_GM_sf2_file', '0051_GeneralUserGS_sf2_file', '0052_GeneralUserGS_sf2_file',
                '0053_GeneralUserGS_sf2_file', '0054_GeneralUserGS_sf2_file', '0060_Aspirin_sf2_file', '0060_Chaos_sf2_file', '0060_FluidR3_GM_sf2_file', '0060_GeneralUserGS_sf2_file', '0060_JCLive_sf2_file',
                '0060_SBLive_sf2', '0060_SoundBlasterOld_sf2', '0061_Aspirin_sf2_file', '0061_GeneralUserGS_sf2_file', '0061_SoundBlasterOld_sf2', '0062_GeneralUserGS_sf2_file', '0070_Aspirin_sf2_file',
                '0070_Chaos_sf2_file', '0070_FluidR3_GM_sf2_file', '0070_GeneralUserGS_sf2_file', '0070_JCLive_sf2_file', '0070_SBLive_sf2', '0070_SoundBlasterOld_sf2', '0071_GeneralUserGS_sf2_file',
                '0080_Aspirin_sf2_file', '0080_Chaos_sf2_file', '0080_FluidR3_GM_sf2_file', '0080_GeneralUserGS_sf2_file', '0080_JCLive_sf2_file', '0080_SBLive_sf2', '0080_SoundBlasterOld_sf2',
                '0081_FluidR3_GM_sf2_file', '0081_GeneralUserGS_sf2_file', '0081_SoundBlasterOld_sf2', '0090_Aspirin_sf2_file', '0090_Chaos_sf2_file', '0090_FluidR3_GM_sf2_file', '0090_GeneralUserGS_sf2_file',
                '0090_JCLive_sf2_file', '0090_SBLive_sf2', '0090_SoundBlasterOld_sf2', '0091_SoundBlasterOld_sf2', '0100_Aspirin_sf2_file', '0100_Chaos_sf2_file', '0100_FluidR3_GM_sf2_file',
                '0100_GeneralUserGS_sf2_file', '0100_JCLive_sf2_file', '0100_SBLive_sf2', '0100_SoundBlasterOld_sf2', '0101_GeneralUserGS_sf2_file', '0101_SoundBlasterOld_sf2', '0110_Aspirin_sf2_file',
                '0110_Chaos_sf2_file', '0110_FluidR3_GM_sf2_file', '0110_GeneralUserGS_sf2_file', '0110_JCLive_sf2_file', '0110_SBLive_sf2', '0110_SoundBlasterOld_sf2', '0111_FluidR3_GM_sf2_file',
                '0120_Aspirin_sf2_file', '0120_Chaos_sf2_file', '0120_FluidR3_GM_sf2_file', '0120_GeneralUserGS_sf2_file', '0120_JCLive_sf2_file', '0120_SBLive_sf2', '0120_SoundBlasterOld_sf2',
                '0121_FluidR3_GM_sf2_file', '0121_GeneralUserGS_sf2_file', '0130_Aspirin_sf2_file', '0130_Chaos_sf2_file', '0130_FluidR3_GM_sf2_file', '0130_GeneralUserGS_sf2_file', '0130_JCLive_sf2_file',
                '0130_SBLive_sf2', '0130_SoundBlasterOld_sf2', '0131_FluidR3_GM_sf2_file', '0140_Aspirin_sf2_file', '0140_Chaos_sf2_file', '0140_FluidR3_GM_sf2_file', '0140_GeneralUserGS_sf2_file',
                '0140_JCLive_sf2_file', '0140_SBLive_sf2', '0140_SoundBlasterOld_sf2', '0141_FluidR3_GM_sf2_file', '0141_GeneralUserGS_sf2_file', '0142_GeneralUserGS_sf2_file', '0143_GeneralUserGS_sf2_file',
                '0150_Aspirin_sf2_file', '0150_Chaos_sf2_file', '0150_FluidR3_GM_sf2_file', '0150_GeneralUserGS_sf2_file', '0150_JCLive_sf2_file', '0150_SBLive_sf2', '0150_SoundBlasterOld_sf2',
                '0151_FluidR3_GM_sf2_file', '0160_Aspirin_sf2_file', '0160_Chaos_sf2_file', '0160_FluidR3_GM_sf2_file', '0160_GeneralUserGS_sf2_file', '0160_JCLive_sf2_file', '0160_SBLive_sf2',
                '0160_SoundBlasterOld_sf2', '0161_Aspirin_sf2_file', '0161_FluidR3_GM_sf2_file', '0161_SoundBlasterOld_sf2', '0170_Aspirin_sf2_file', '0170_Chaos_sf2_file', '0170_FluidR3_GM_sf2_file',
                '0170_GeneralUserGS_sf2_file', '0170_JCLive_sf2_file', '0170_SBLive_sf2', '0170_SoundBlasterOld_sf2', '0171_FluidR3_GM_sf2_file', '0171_GeneralUserGS_sf2_file', '0172_FluidR3_GM_sf2_file',
                '0180_Aspirin_sf2_file', '0180_Chaos_sf2_file', '0180_FluidR3_GM_sf2_file', '0180_GeneralUserGS_sf2_file', '0180_JCLive_sf2_file', '0180_SBLive_sf2', '0180_SoundBlasterOld_sf2',
                '0181_Aspirin_sf2_file', '0181_GeneralUserGS_sf2_file', '0181_SoundBlasterOld_sf2', '0190_Aspirin_sf2_file', '0190_Chaos_sf2_file', '0190_FluidR3_GM_sf2_file', '0190_GeneralUserGS_sf2_file',
                '0190_JCLive_sf2_file', '0190_SBLive_sf2', '0190_SoundBlasterOld_sf2', '0191_Aspirin_sf2_file', '0191_GeneralUserGS_sf2_file', '0191_SoundBlasterOld_sf2', '0200_Aspirin_sf2_file',
                '0200_Chaos_sf2_file', '0200_FluidR3_GM_sf2_file', '0200_GeneralUserGS_sf2_file', '0200_JCLive_sf2_file', '0200_SBLive_sf2', '0200_SoundBlasterOld_sf2', '0201_Aspirin_sf2_file',
                '0201_FluidR3_GM_sf2_file', '0201_GeneralUserGS_sf2_file', '0201_SoundBlasterOld_sf2', '0210_Aspirin_sf2_file', '0210_Chaos_sf2_file', '0210_FluidR3_GM_sf2_file', '0210_GeneralUserGS_sf2_file',
                '0210_JCLive_sf2_file', '0210_SBLive_sf2', '0210_SoundBlasterOld_sf2', '0211_Aspirin_sf2_file', '0211_FluidR3_GM_sf2_file', '0211_GeneralUserGS_sf2_file', '0211_SoundBlasterOld_sf2',
                '0212_GeneralUserGS_sf2_file', '0220_Aspirin_sf2_file', '0220_Chaos_sf2_file', '0220_FluidR3_GM_sf2_file', '0220_GeneralUserGS_sf2_file', '0220_JCLive_sf2_file', '0220_SBLive_sf2',
                '0220_SoundBlasterOld_sf2', '0221_FluidR3_GM_sf2_file', '0230_Aspirin_sf2_file', '0230_Chaos_sf2_file', '0230_FluidR3_GM_sf2_file', '0230_GeneralUserGS_sf2_file', '0230_JCLive_sf2_file',
                '0230_SBLive_sf2', '0230_SoundBlasterOld_sf2', '0231_FluidR3_GM_sf2_file', '0231_GeneralUserGS_sf2_file', '0231_JCLive_sf2_file', '0231_SoundBlasterOld_sf2', '0232_FluidR3_GM_sf2_file',
                '0233_FluidR3_GM_sf2_file', '0240_Aspirin_sf2_file', '0240_Chaos_sf2_file', '0240_FluidR3_GM_sf2_file', '0240_GeneralUserGS_sf2_file', '0240_JCLive_sf2_file', '0240_LK_Godin_Nylon_SF2_file',
                '0240_SBLive_sf2', '0240_SoundBlasterOld_sf2', '0241_GeneralUserGS_sf2_file', '0241_JCLive_sf2_file', '0242_JCLive_sf2_file', '0243_JCLive_sf2_file', '0253_Acoustic_Guitar_sf2_file',
                '0250_Aspirin_sf2_file', '0250_Chaos_sf2_file', '0250_FluidR3_GM_sf2_file', '0250_GeneralUserGS_sf2_file', '0250_JCLive_sf2_file', '0250_LK_AcousticSteel_SF2_file', '0250_SBLive_sf2',
                '0250_SoundBlasterOld_sf2', '0251_Acoustic_Guitar_sf2_file', '0251_GeneralUserGS_sf2_file', '0252_Acoustic_Guitar_sf2_file', '0252_GeneralUserGS_sf2_file', '0253_Acoustic_Guitar_sf2_file',
                '0253_GeneralUserGS_sf2_file', '0254_Acoustic_Guitar_sf2_file', '0254_GeneralUserGS_sf2_file', '0255_GeneralUserGS_sf2_file', '0260_Aspirin_sf2_file', '0260_Chaos_sf2_file',
                '0260_FluidR3_GM_sf2_file', '0260_GeneralUserGS_sf2_file', '0260_JCLive_sf2_file', '0260_SBLive_sf2', '0260_SoundBlasterOld_sf2', '0260_Stratocaster_sf2_file', '0261_GeneralUserGS_sf2_file',
                '0261_SoundBlasterOld_sf2', '0261_Stratocaster_sf2_file', '0262_Stratocaster_sf2_file', '0270_Aspirin_sf2_file', '0270_Chaos_sf2_file', '0270_FluidR3_GM_sf2_file', '0270_GeneralUserGS_sf2_file',
                '0270_Gibson_Les_Paul_sf2_file', '0270_JCLive_sf2_file', '0270_SBAWE32_sf2_file', '0270_SBLive_sf2', '0270_SoundBlasterOld_sf2', '0270_Stratocaster_sf2_file', '0271_GeneralUserGS_sf2_file',
                '0271_Stratocaster_sf2_file', '0272_Stratocaster_sf2_file', '0280_Aspirin_sf2_file', '0280_Chaos_sf2_file', '0280_FluidR3_GM_sf2_file', '0280_GeneralUserGS_sf2_file', '0280_JCLive_sf2_file',
                '0280_LesPaul_sf2', '0280_LesPaul_sf2_file', '0280_SBAWE32_sf2_file', '0280_SBLive_sf2', '0280_SoundBlasterOld_sf2', '0281_Aspirin_sf2_file', '0281_FluidR3_GM_sf2_file',
                '0281_GeneralUserGS_sf2_file', '0282_FluidR3_GM_sf2_file', '0282_GeneralUserGS_sf2_file', '0283_GeneralUserGS_sf2_file', '0290_Aspirin_sf2_file', '0290_Chaos_sf2_file', '0290_FluidR3_GM_sf2_file',
                '0290_GeneralUserGS_sf2_file', '0290_JCLive_sf2_file', '0290_LesPaul_sf2', '0290_LesPaul_sf2_file', '0290_SBAWE32_sf2_file', '0290_SBLive_sf2', '0290_SoundBlasterOld_sf2', '0291_Aspirin_sf2_file',
                '0291_LesPaul_sf2', '0291_LesPaul_sf2_file', '0291_SBAWE32_sf2_file', '0291_SoundBlasterOld_sf2', '0292_Aspirin_sf2_file', '0292_LesPaul_sf2', '0292_LesPaul_sf2_file', '0300_Aspirin_sf2_file',
                '0300_Chaos_sf2_file', '0300_FluidR3_GM_sf2_file', '0300_GeneralUserGS_sf2_file', '0300_JCLive_sf2_file', '0300_LesPaul_sf2', '0300_LesPaul_sf2_file', '0300_SBAWE32_sf2_file', '0300_SBLive_sf2',
                '0300_SoundBlasterOld_sf2', '0301_Aspirin_sf2_file', '0301_FluidR3_GM_sf2_file', '0301_GeneralUserGS_sf2_file', '0301_JCLive_sf2_file', '0301_LesPaul_sf2', '0301_LesPaul_sf2_file',
                '0302_Aspirin_sf2_file', '0302_GeneralUserGS_sf2_file', '0302_JCLive_sf2_file', '0303_Aspirin_sf2_file', '0304_Aspirin_sf2_file', '0310_Aspirin_sf2_file', '0310_Chaos_sf2_file',
                '0310_FluidR3_GM_sf2_file', '0310_GeneralUserGS_sf2_file', '0310_JCLive_sf2_file', '0310_LesPaul_sf2', '0310_LesPaul_sf2_file', '0310_SBAWE32_sf2_file', '0310_SBLive_sf2',
                '0310_SoundBlasterOld_sf2', '0311_FluidR3_GM_sf2_file', '0311_GeneralUserGS_sf2_file', '0320_Aspirin_sf2_file', '0320_Chaos_sf2_file', '0320_FluidR3_GM_sf2_file', '0320_GeneralUserGS_sf2_file',
                '0320_JCLive_sf2_file', '0320_SBLive_sf2', '0320_SoundBlasterOld_sf2', '0321_GeneralUserGS_sf2_file', '0322_GeneralUserGS_sf2_file', '0330_Aspirin_sf2_file', '0330_Chaos_sf2_file',
                '0330_FluidR3_GM_sf2_file', '0330_GeneralUserGS_sf2_file', '0330_JCLive_sf2_file', '0330_SBLive_sf2', '0330_SoundBlasterOld_sf2', '0331_GeneralUserGS_sf2_file', '0332_GeneralUserGS_sf2_file',
                '0340_Aspirin_sf2_file', '0340_Chaos_sf2_file', '0340_FluidR3_GM_sf2_file', '0340_GeneralUserGS_sf2_file', '0340_JCLive_sf2_file', '0340_SBLive_sf2', '0340_SoundBlasterOld_sf2',
                '0341_Aspirin_sf2_file', '0341_GeneralUserGS_sf2_file', '0350_Aspirin_sf2_file', '0350_Chaos_sf2_file', '0350_FluidR3_GM_sf2_file', '0350_GeneralUserGS_sf2_file', '0350_JCLive_sf2_file',
                '0350_SBLive_sf2', '0350_SoundBlasterOld_sf2', '0351_GeneralUserGS_sf2_file', '0360_Aspirin_sf2_file', '0360_Chaos_sf2_file', '0360_FluidR3_GM_sf2_file', '0360_GeneralUserGS_sf2_file',
                '0360_JCLive_sf2_file', '0360_SBLive_sf2', '0360_SoundBlasterOld_sf2', '0361_GeneralUserGS_sf2_file', '0370_Aspirin_sf2_file', '0370_Chaos_sf2_file', '0370_FluidR3_GM_sf2_file',
                '0370_GeneralUserGS_sf2_file', '0370_JCLive_sf2_file', '0370_SBLive_sf2', '0370_SoundBlasterOld_sf2', '0371_GeneralUserGS_sf2_file', '0372_GeneralUserGS_sf2_file',
                '0385_GeneralUserGS_sf2_file',
                '0380_Aspirin_sf2_file',
                '0380_Chaos_sf2_file',
                '0380_FluidR3_GM_sf2_file',
                '0380_GeneralUserGS_sf2_file',
                '0380_JCLive_sf2_file',
                '0380_SBLive_sf2',
                '0380_SoundBlasterOld_sf2',
                '0381_FluidR3_GM_sf2_file',
                '0381_GeneralUserGS_sf2_file',
                '0382_FluidR3_GM_sf2_file',
                '0382_GeneralUserGS_sf2_file',
                '0383_GeneralUserGS_sf2_file',
                '0384_GeneralUserGS_sf2_file',
                '0386_GeneralUserGS_sf2_file',
                '0387_GeneralUserGS_sf2_file',
                '0390_Aspirin_sf2_file', '0390_Chaos_sf2_file', '0390_FluidR3_GM_sf2_file',
                '0390_GeneralUserGS_sf2_file', '0390_JCLive_sf2_file', '0390_SBLive_sf2', '0390_SoundBlasterOld_sf2', '0391_FluidR3_GM_sf2_file',
                '0391_GeneralUserGS_sf2_file', '0391_SoundBlasterOld_sf2', '0392_FluidR3_GM_sf2_file', '0392_GeneralUserGS_sf2_file',
                '0393_GeneralUserGS_sf2_file', '0400_Aspirin_sf2_file', '0400_Chaos_sf2_file', '0400_FluidR3_GM_sf2_file', '0400_GeneralUserGS_sf2_file',
                '0400_JCLive_sf2_file', '0400_SBLive_sf2', '0400_SoundBlasterOld_sf2', '0401_Aspirin_sf2_file', '0401_FluidR3_GM_sf2_file',
                '0401_GeneralUserGS_sf2_file', '0402_GeneralUserGS_sf2_file', '0410_Aspirin_sf2_file', '0410_Chaos_sf2_file', '0410_FluidR3_GM_sf2_file',
                '0410_GeneralUserGS_sf2_file', '0410_JCLive_sf2_file', '0410_SBLive_sf2', '0410_SoundBlasterOld_sf2', '0411_FluidR3_GM_sf2_file',
                '0420_Aspirin_sf2_file', '0420_Chaos_sf2_file', '0420_FluidR3_GM_sf2_file', '0420_GeneralUserGS_sf2_file', '0420_JCLive_sf2_file',
                '0420_SBLive_sf2', '0420_SoundBlasterOld_sf2', '0421_FluidR3_GM_sf2_file', '0421_GeneralUserGS_sf2_file', '0430_Aspirin_sf2_file',
                '0430_Chaos_sf2_file', '0430_FluidR3_GM_sf2_file', '0430_GeneralUserGS_sf2_file', '0430_JCLive_sf2_file', '0430_SBLive_sf2',
                '0430_SoundBlasterOld_sf2', '0431_FluidR3_GM_sf2_file', '0440_Aspirin_sf2_file', '0440_Chaos_sf2_file', '0440_FluidR3_GM_sf2_file',
                '0440_GeneralUserGS_sf2_file', '0440_JCLive_sf2_file', '0440_SBLive_sf2',
                '0440_SoundBlasterOld_sf2', '0441_GeneralUserGS_sf2_file', '0442_GeneralUserGS_sf2_file', '0450_Aspirin_sf2_file', '0450_Chaos_sf2_file',
                '0450_FluidR3_GM_sf2_file',
                '0450_GeneralUserGS_sf2_file', '0450_JCLive_sf2_file', '0450_SBLive_sf2', '0450_SoundBlasterOld_sf2', '0451_FluidR3_GM_sf2_file', '0460_Aspirin_sf2_file',
                '0460_Chaos_sf2_file', '0460_FluidR3_GM_sf2_file', '0460_GeneralUserGS_sf2_file', '0460_JCLive_sf2_file', '0460_SBLive_sf2', '0460_SoundBlasterOld_sf2',
                '0461_FluidR3_GM_sf2_file', '0470_Aspirin_sf2_file', '0470_Chaos_sf2_file', '0470_FluidR3_GM_sf2_file', '0470_GeneralUserGS_sf2_file', '0470_JCLive_sf2_file',
                '0470_SBLive_sf2', '0470_SoundBlasterOld_sf2', '0471_FluidR3_GM_sf2_file', '0471_GeneralUserGS_sf2_file', '0480_Aspirin_sf2_file', '0480_Chaos_sf2_file',
                '0480_FluidR3_GM_sf2_file', '0480_GeneralUserGS_sf2_file', '0480_JCLive_sf2_file', '0480_SBLive_sf2', '0480_SoundBlasterOld_sf2', '04810_GeneralUserGS_sf2_file',
                '04811_GeneralUserGS_sf2_file', '04812_GeneralUserGS_sf2_file', '04813_GeneralUserGS_sf2_file', '04814_GeneralUserGS_sf2_file', '04815_GeneralUserGS_sf2_file', '04816_GeneralUserGS_sf2_file',
                '04817_GeneralUserGS_sf2_file', '0481_Aspirin_sf2_file', '0481_FluidR3_GM_sf2_file', '0481_GeneralUserGS_sf2_file', '0482_Aspirin_sf2_file', '0482_GeneralUserGS_sf2_file',
                '0483_GeneralUserGS_sf2_file', '0484_GeneralUserGS_sf2_file', '0485_GeneralUserGS_sf2_file', '0486_GeneralUserGS_sf2_file', '0487_GeneralUserGS_sf2_file', '0488_GeneralUserGS_sf2_file',
                '0489_GeneralUserGS_sf2_file', '0490_Aspirin_sf2_file', '0490_Chaos_sf2_file', '0490_FluidR3_GM_sf2_file', '0490_GeneralUserGS_sf2_file', '0490_JCLive_sf2_file', '0490_SBLive_sf2',
                '0490_SoundBlasterOld_sf2', '0491_GeneralUserGS_sf2_file', '0492_GeneralUserGS_sf2_file', '0500_Aspirin_sf2_file', '0500_Chaos_sf2_file', '0500_FluidR3_GM_sf2_file', '0500_GeneralUserGS_sf2_file',
                '0500_JCLive_sf2_file', '0500_SBLive_sf2', '0500_SoundBlasterOld_sf2', '0501_FluidR3_GM_sf2_file', '0501_GeneralUserGS_sf2_file', '0502_FluidR3_GM_sf2_file', '0502_GeneralUserGS_sf2_file',
                '0503_FluidR3_GM_sf2_file', '0504_FluidR3_GM_sf2_file', '0505_FluidR3_GM_sf2_file', '0510_Aspirin_sf2_file', '0510_Chaos_sf2_file', '0510_FluidR3_GM_sf2_file', '0510_GeneralUserGS_sf2_file',
                '0510_JCLive_sf2_file', '0510_SBLive_sf2', '0510_SoundBlasterOld_sf2', '0511_GeneralUserGS_sf2_file', '0511_SoundBlasterOld_sf2', '0520_Aspirin_sf2_file', '0520_Chaos_sf2_file',
                '0520_FluidR3_GM_sf2_file', '0520_GeneralUserGS_sf2_file', '0520_JCLive_sf2_file', '0520_SBLive_sf2', '0520_Soul_Ahhs_sf2_file', '0520_SoundBlasterOld_sf2', '0521_FluidR3_GM_sf2_file',
                '0521_Soul_Ahhs_sf2_file', '0521_SoundBlasterOld_sf2', '0522_Soul_Ahhs_sf2_file', '0530_Aspirin_sf2_file', '0530_Chaos_sf2_file', '0530_FluidR3_GM_sf2_file', '0530_GeneralUserGS_sf2_file',
                '0530_JCLive_sf2_file', '0530_SBLive_sf2', '0530_Soul_Ahhs_sf2_file', '0530_SoundBlasterOld_sf2', '0531_FluidR3_GM_sf2_file', '0531_GeneralUserGS_sf2_file', '0531_JCLive_sf2_file',
                '0531_SoundBlasterOld_sf2', '0540_Aspirin_sf2_file', '0540_Chaos_sf2_file', '0540_FluidR3_GM_sf2_file', '0540_GeneralUserGS_sf2_file', '0540_JCLive_sf2_file', '0540_SBLive_sf2',
                '0540_SoundBlasterOld_sf2', '0541_FluidR3_GM_sf2_file', '0550_Aspirin_sf2_file', '0550_Chaos_sf2_file', '0550_FluidR3_GM_sf2_file', '0550_GeneralUserGS_sf2_file', '0550_JCLive_sf2_file',
                '0550_SBLive_sf2', '0550_SoundBlasterOld_sf2', '0551_Aspirin_sf2_file', '0551_FluidR3_GM_sf2_file', '0560_Aspirin_sf2_file', '0560_Chaos_sf2_file', '0560_FluidR3_GM_sf2_file',
                '0560_GeneralUserGS_sf2_file', '0560_JCLive_sf2_file', '0560_SBLive_sf2', '0560_SoundBlasterOld_sf2', '0570_Aspirin_sf2_file', '0570_Chaos_sf2_file', '0570_FluidR3_GM_sf2_file',
                '0570_GeneralUserGS_sf2_file', '0570_JCLive_sf2_file', '0570_SBLive_sf2', '0570_SoundBlasterOld_sf2', '0571_GeneralUserGS_sf2_file', '0580_Aspirin_sf2_file', '0580_Chaos_sf2_file',
                '0580_FluidR3_GM_sf2_file', '0580_GeneralUserGS_sf2_file', '0580_JCLive_sf2_file', '0580_SBLive_sf2', '0580_SoundBlasterOld_sf2', '0581_GeneralUserGS_sf2_file', '0590_Aspirin_sf2_file',
                '0590_Chaos_sf2_file', '0590_FluidR3_GM_sf2_file', '0590_GeneralUserGS_sf2_file', '0590_JCLive_sf2_file', '0590_SBLive_sf2', '0590_SoundBlasterOld_sf2', '0591_GeneralUserGS_sf2_file',
                '0600_Aspirin_sf2_file', '0600_Chaos_sf2_file', '0600_FluidR3_GM_sf2_file', '0600_GeneralUserGS_sf2_file', '0600_JCLive_sf2_file', '0600_SBLive_sf2', '0600_SoundBlasterOld_sf2',
                '0601_FluidR3_GM_sf2_file', '0601_GeneralUserGS_sf2_file', '0602_GeneralUserGS_sf2_file', '0603_GeneralUserGS_sf2_file', '0610_Aspirin_sf2_file', '0610_Chaos_sf2_file', '0610_FluidR3_GM_sf2_file',
                '0610_GeneralUserGS_sf2_file', '0610_JCLive_sf2_file', '0610_SBLive_sf2', '0610_SoundBlasterOld_sf2', '0611_GeneralUserGS_sf2_file', '0612_GeneralUserGS_sf2_file', '0613_GeneralUserGS_sf2_file',
                '0614_GeneralUserGS_sf2_file', '0615_GeneralUserGS_sf2_file', '0620_Aspirin_sf2_file', '0620_Chaos_sf2_file', '0620_FluidR3_GM_sf2_file', '0620_GeneralUserGS_sf2_file', '0620_JCLive_sf2_file',
                '0620_SBLive_sf2', '0620_SoundBlasterOld_sf2', '0621_Aspirin_sf2_file', '0621_FluidR3_GM_sf2_file', '0621_GeneralUserGS_sf2_file', '0622_FluidR3_GM_sf2_file', '0622_GeneralUserGS_sf2_file',
                '0630_Aspirin_sf2_file', '0630_Chaos_sf2_file', '0630_FluidR3_GM_sf2_file', '0630_GeneralUserGS_sf2_file', '0630_JCLive_sf2_file', '0630_SBLive_sf2', '0630_SoundBlasterOld_sf2',
                '0631_Aspirin_sf2_file', '0631_FluidR3_GM_sf2_file', '0631_GeneralUserGS_sf2_file', '0632_FluidR3_GM_sf2_file', '0633_FluidR3_GM_sf2_file', '0640_Aspirin_sf2_file', '0640_Chaos_sf2_file',
                '0640_FluidR3_GM_sf2_file', '0640_GeneralUserGS_sf2_file', '0640_JCLive_sf2_file', '0640_SBLive_sf2', '0640_SoundBlasterOld_sf2', '0641_FluidR3_GM_sf2_file', '0650_Aspirin_sf2_file',
                '0650_Chaos_sf2_file', '0650_FluidR3_GM_sf2_file', '0650_GeneralUserGS_sf2_file', '0650_JCLive_sf2_file', '0650_SBLive_sf2', '0650_SoundBlasterOld_sf2', '0651_Aspirin_sf2_file',
                '0651_FluidR3_GM_sf2_file', '0660_Aspirin_sf2_file', '0660_Chaos_sf2_file', '0660_FluidR3_GM_sf2_file', '0660_GeneralUserGS_sf2_file', '0660_JCLive_sf2_file', '0660_SBLive_sf2',
                '0660_SoundBlasterOld_sf2', '0661_FluidR3_GM_sf2_file', '0661_GeneralUserGS_sf2_file', '0670_Aspirin_sf2_file', '0670_Chaos_sf2_file', '0670_FluidR3_GM_sf2_file', '0670_GeneralUserGS_sf2_file',
                '0670_JCLive_sf2_file', '0670_SBLive_sf2', '0670_SoundBlasterOld_sf2', '0671_FluidR3_GM_sf2_file', '0680_Aspirin_sf2_file', '0680_Chaos_sf2_file', '0680_FluidR3_GM_sf2_file',
                '0680_GeneralUserGS_sf2_file', '0680_JCLive_sf2_file', '0680_SBLive_sf2', '0680_SoundBlasterOld_sf2', '0681_FluidR3_GM_sf2_file', '0690_Aspirin_sf2_file', '0690_Chaos_sf2_file',
                '0690_FluidR3_GM_sf2_file', '0690_GeneralUserGS_sf2_file', '0690_JCLive_sf2_file', '0690_SBLive_sf2', '0690_SoundBlasterOld_sf2', '0691_FluidR3_GM_sf2_file', '0700_Aspirin_sf2_file',
                '0700_Chaos_sf2_file', '0700_FluidR3_GM_sf2_file', '0700_GeneralUserGS_sf2_file', '0700_JCLive_sf2_file', '0700_SBLive_sf2', '0700_SoundBlasterOld_sf2', '0701_FluidR3_GM_sf2_file',
                '0701_GeneralUserGS_sf2_file', '0710_Aspirin_sf2_file', '0710_Chaos_sf2_file', '0710_FluidR3_GM_sf2_file', '0710_GeneralUserGS_sf2_file', '0710_JCLive_sf2_file', '0710_SBLive_sf2',
                '0710_SoundBlasterOld_sf2', '0711_FluidR3_GM_sf2_file', '0720_Aspirin_sf2_file', '0720_Chaos_sf2_file', '0720_FluidR3_GM_sf2_file', '0720_GeneralUserGS_sf2_file', '0720_JCLive_sf2_file',
                '0720_SBLive_sf2', '0720_SoundBlasterOld_sf2', '0721_FluidR3_GM_sf2_file', '0721_SoundBlasterOld_sf2', '0730_Aspirin_sf2_file', '0730_Chaos_sf2_file', '0730_FluidR3_GM_sf2_file',
                '0730_GeneralUserGS_sf2_file', '0730_JCLive_sf2_file', '0730_SBLive_sf2', '0730_SoundBlasterOld_sf2', '0731_Aspirin_sf2_file', '0731_FluidR3_GM_sf2_file', '0731_SoundBlasterOld_sf2',
                '0740_Aspirin_sf2_file', '0740_Chaos_sf2_file', '0740_FluidR3_GM_sf2_file', '0740_GeneralUserGS_sf2_file', '0740_JCLive_sf2_file', '0740_SBLive_sf2', '0740_SoundBlasterOld_sf2',
                '0741_GeneralUserGS_sf2_file', '0750_Aspirin_sf2_file', '0750_Chaos_sf2_file', '0750_FluidR3_GM_sf2_file', '0750_GeneralUserGS_sf2_file', '0750_JCLive_sf2_file', '0750_SBLive_sf2',
                '0750_SoundBlasterOld_sf2', '0751_Aspirin_sf2_file', '0751_FluidR3_GM_sf2_file', '0751_GeneralUserGS_sf2_file', '0751_SoundBlasterOld_sf2', '0760_Aspirin_sf2_file', '0760_Chaos_sf2_file',
                '0760_FluidR3_GM_sf2_file', '0760_GeneralUserGS_sf2_file', '0760_JCLive_sf2_file', '0760_SBLive_sf2', '0760_SoundBlasterOld_sf2', '0761_FluidR3_GM_sf2_file', '0761_GeneralUserGS_sf2_file',
                '0761_SoundBlasterOld_sf2', '0762_GeneralUserGS_sf2_file', '0770_Aspirin_sf2_file', '0770_Chaos_sf2_file', '0770_FluidR3_GM_sf2_file', '0770_GeneralUserGS_sf2_file', '0770_JCLive_sf2_file',
                '0770_SBLive_sf2', '0770_SoundBlasterOld_sf2', '0771_FluidR3_GM_sf2_file', '0771_GeneralUserGS_sf2_file', '0772_GeneralUserGS_sf2_file', '0780_Aspirin_sf2_file', '0780_Chaos_sf2_file',
                '0780_FluidR3_GM_sf2_file', '0780_GeneralUserGS_sf2_file', '0780_JCLive_sf2_file', '0780_SBLive_sf2', '0780_SoundBlasterOld_sf2', '0781_GeneralUserGS_sf2_file', '0790_Aspirin_sf2_file',
                '0790_Chaos_sf2_file', '0790_FluidR3_GM_sf2_file', '0790_GeneralUserGS_sf2_file', '0790_JCLive_sf2_file', '0790_SBLive_sf2', '0790_SoundBlasterOld_sf2', '0791_GeneralUserGS_sf2_file',
                '0800_Aspirin_sf2_file', '0800_Chaos_sf2_file', '0800_FluidR3_GM_sf2_file', '0800_GeneralUserGS_sf2_file', '0800_JCLive_sf2_file', '0800_SBLive_sf2', '0800_SoundBlasterOld_sf2',
                '0801_FluidR3_GM_sf2_file', '0801_GeneralUserGS_sf2_file', '0810_Aspirin_sf2_file', '0810_Chaos_sf2_file', '0810_FluidR3_GM_sf2_file', '0810_GeneralUserGS_sf2_file', '0810_JCLive_sf2_file',
                '0810_SBLive_sf2', '0810_SoundBlasterOld_sf2', '0811_Aspirin_sf2_file', '0811_GeneralUserGS_sf2_file', '0811_SoundBlasterOld_sf2', '0820_Aspirin_sf2_file', '0820_Chaos_sf2_file',
                '0820_FluidR3_GM_sf2_file', '0820_GeneralUserGS_sf2_file', '0820_JCLive_sf2_file', '0820_SBLive_sf2', '0820_SoundBlasterOld_sf2', '0821_FluidR3_GM_sf2_file', '0821_GeneralUserGS_sf2_file',
                '0821_SoundBlasterOld_sf2', '0822_GeneralUserGS_sf2_file', '0823_GeneralUserGS_sf2_file', '0830_Aspirin_sf2_file', '0830_Chaos_sf2_file', '0830_FluidR3_GM_sf2_file', '0830_GeneralUserGS_sf2_file',
                '0830_JCLive_sf2_file', '0830_SBLive_sf2', '0830_SoundBlasterOld_sf2', '0831_FluidR3_GM_sf2_file', '0831_GeneralUserGS_sf2_file', '0831_SoundBlasterOld_sf2', '0840_Aspirin_sf2_file',
                '0840_Chaos_sf2_file', '0840_FluidR3_GM_sf2_file', '0840_GeneralUserGS_sf2_file', '0840_JCLive_sf2_file', '0840_SBLive_sf2', '0840_SoundBlasterOld_sf2', '0841_Aspirin_sf2_file',
                '0841_Chaos_sf2_file', '0841_FluidR3_GM_sf2_file', '0841_GeneralUserGS_sf2_file', '0841_JCLive_sf2_file', '0841_SoundBlasterOld_sf2', '0842_FluidR3_GM_sf2_file', '0850_Aspirin_sf2_file',
                '0850_Chaos_sf2_file', '0850_FluidR3_GM_sf2_file', '0850_GeneralUserGS_sf2_file', '0850_JCLive_sf2_file', '0850_SBLive_sf2', '0850_SoundBlasterOld_sf2', '0851_FluidR3_GM_sf2_file',
                '0851_GeneralUserGS_sf2_file', '0851_JCLive_sf2_file', '0851_SoundBlasterOld_sf2', '0860_Aspirin_sf2_file', '0860_Chaos_sf2_file', '0860_FluidR3_GM_sf2_file', '0860_GeneralUserGS_sf2_file',
                '0860_JCLive_sf2_file', '0860_SBLive_sf2', '0860_SoundBlasterOld_sf2', '0861_Aspirin_sf2_file', '0861_FluidR3_GM_sf2_file', '0861_SoundBlasterOld_sf2', '0870_Aspirin_sf2_file',
                '0870_Chaos_sf2_file', '0870_FluidR3_GM_sf2_file', '0870_GeneralUserGS_sf2_file', '0870_JCLive_sf2_file', '0870_SBLive_sf2', '0870_SoundBlasterOld_sf2', '0871_GeneralUserGS_sf2_file',
                '0872_GeneralUserGS_sf2_file', '0873_GeneralUserGS_sf2_file', '0880_Aspirin_sf2_file', '0880_Chaos_sf2_file', '0880_FluidR3_GM_sf2_file', '0880_GeneralUserGS_sf2_file', '0880_JCLive_sf2_file',
                '0880_SBLive_sf2', '0880_SoundBlasterOld_sf2', '0881_Aspirin_sf2_file', '0881_FluidR3_GM_sf2_file', '0881_GeneralUserGS_sf2_file', '0881_SoundBlasterOld_sf2', '0882_Aspirin_sf2_file',
                '0882_FluidR3_GM_sf2_file', '0882_GeneralUserGS_sf2_file', '0883_GeneralUserGS_sf2_file', '0884_GeneralUserGS_sf2_file', '0885_GeneralUserGS_sf2_file', '0886_GeneralUserGS_sf2_file',
                '0887_GeneralUserGS_sf2_file', '0888_GeneralUserGS_sf2_file', '0889_GeneralUserGS_sf2_file', '0890_Aspirin_sf2_file', '0890_Chaos_sf2_file', '0890_FluidR3_GM_sf2_file',
                '0890_GeneralUserGS_sf2_file', '0890_JCLive_sf2_file', '0890_SBLive_sf2', '0890_SoundBlasterOld_sf2', '0891_Aspirin_sf2_file', '0891_FluidR3_GM_sf2_file', '0891_GeneralUserGS_sf2_file',
                '0900_Aspirin_sf2_file', '0900_Chaos_sf2_file', '0900_FluidR3_GM_sf2_file', '0900_GeneralUserGS_sf2_file', '0900_JCLive_sf2_file', '0900_SBLive_sf2', '0900_SoundBlasterOld_sf2',
                '0901_Aspirin_sf2_file', '0901_FluidR3_GM_sf2_file', '0901_GeneralUserGS_sf2_file', '0901_SoundBlasterOld_sf2', '0910_Aspirin_sf2_file', '0910_Chaos_sf2_file', '0910_FluidR3_GM_sf2_file',
                '0910_GeneralUserGS_sf2_file', '0910_JCLive_sf2_file', '0910_SBLive_sf2', '0910_SoundBlasterOld_sf2', '0911_Aspirin_sf2_file', '0911_GeneralUserGS_sf2_file', '0911_JCLive_sf2_file',
                '0911_SoundBlasterOld_sf2', '0920_Aspirin_sf2_file', '0920_Chaos_sf2_file', '0920_FluidR3_GM_sf2_file', '0920_GeneralUserGS_sf2_file', '0920_JCLive_sf2_file', '0920_SBLive_sf2',
                '0920_SoundBlasterOld_sf2', '0921_Aspirin_sf2_file', '0921_GeneralUserGS_sf2_file', '0921_SoundBlasterOld_sf2', '0930_Aspirin_sf2_file', '0930_Chaos_sf2_file', '0930_FluidR3_GM_sf2_file',
                '0930_GeneralUserGS_sf2_file', '0930_JCLive_sf2_file', '0930_SBLive_sf2', '0930_SoundBlasterOld_sf2', '0931_Aspirin_sf2_file', '0931_FluidR3_GM_sf2_file', '0931_GeneralUserGS_sf2_file',
                '0931_SoundBlasterOld_sf2', '0940_Aspirin_sf2_file', '0940_Chaos_sf2_file', '0940_FluidR3_GM_sf2_file', '0940_GeneralUserGS_sf2_file', '0940_JCLive_sf2_file', '0940_SBLive_sf2',
                '0940_SoundBlasterOld_sf2', '0941_Aspirin_sf2_file', '0941_FluidR3_GM_sf2_file', '0941_GeneralUserGS_sf2_file', '0941_JCLive_sf2_file', '0950_Aspirin_sf2_file', '0950_Chaos_sf2_file',
                '0950_FluidR3_GM_sf2_file', '0950_GeneralUserGS_sf2_file', '0950_JCLive_sf2_file', '0950_SBLive_sf2', '0950_SoundBlasterOld_sf2', '0951_FluidR3_GM_sf2_file', '0951_GeneralUserGS_sf2_file',
                '0960_Aspirin_sf2_file', '0960_Chaos_sf2_file', '0960_FluidR3_GM_sf2_file', '0960_GeneralUserGS_sf2_file', '0960_JCLive_sf2_file', '0960_SBLive_sf2', '0960_SoundBlasterOld_sf2',
                '0961_Aspirin_sf2_file', '0961_FluidR3_GM_sf2_file', '0961_GeneralUserGS_sf2_file', '0961_SoundBlasterOld_sf2', '0962_GeneralUserGS_sf2_file', '0970_Aspirin_sf2_file', '0970_Chaos_sf2_file',
                '0970_FluidR3_GM_sf2_file', '0970_GeneralUserGS_sf2_file', '0970_JCLive_sf2_file', '0970_SBLive_sf2', '0970_SoundBlasterOld_sf2', '0971_FluidR3_GM_sf2_file', '0971_GeneralUserGS_sf2_file',
                '0971_SoundBlasterOld_sf2', '0980_Aspirin_sf2_file', '0980_Chaos_sf2_file', '0980_FluidR3_GM_sf2_file', '0980_GeneralUserGS_sf2_file', '0980_JCLive_sf2_file', '0980_SBLive_sf2',
                '0980_SoundBlasterOld_sf2', '0981_Aspirin_sf2_file', '0981_FluidR3_GM_sf2_file', '0981_GeneralUserGS_sf2_file', '0981_SoundBlasterOld_sf2', '0982_GeneralUserGS_sf2_file',
                '0983_GeneralUserGS_sf2_file', '0984_GeneralUserGS_sf2_file', '0990_Aspirin_sf2_file', '0990_Chaos_sf2_file', '0990_FluidR3_GM_sf2_file', '0990_GeneralUserGS_sf2_file', '0990_JCLive_sf2_file',
                '0990_SBLive_sf2', '0990_SoundBlasterOld_sf2', '0991_Aspirin_sf2_file', '0991_FluidR3_GM_sf2_file', '0991_GeneralUserGS_sf2_file', '0991_JCLive_sf2_file', '0991_SoundBlasterOld_sf2',
                '0992_FluidR3_GM_sf2_file', '0992_JCLive_sf2_file', '0993_JCLive_sf2_file', '0994_JCLive_sf2_file', '1000_Aspirin_sf2_file', '1000_Chaos_sf2_file', '1000_FluidR3_GM_sf2_file',
                '1000_GeneralUserGS_sf2_file', '1000_JCLive_sf2_file', '1000_SBLive_sf2', '1000_SoundBlasterOld_sf2', '1001_Aspirin_sf2_file', '1001_FluidR3_GM_sf2_file', '1001_GeneralUserGS_sf2_file',
                '1001_JCLive_sf2_file', '1001_SoundBlasterOld_sf2', '1002_Aspirin_sf2_file', '1002_FluidR3_GM_sf2_file', '1002_GeneralUserGS_sf2_file', '1010_Aspirin_sf2_file', '1010_Chaos_sf2_file',
                '1010_FluidR3_GM_sf2_file', '1010_GeneralUserGS_sf2_file', '1010_JCLive_sf2_file', '1010_SBLive_sf2', '1010_SoundBlasterOld_sf2', '1011_Aspirin_sf2_file', '1011_FluidR3_GM_sf2_file',
                '1011_JCLive_sf2_file', '1012_Aspirin_sf2_file', '1020_Aspirin_sf2_file', '1020_Chaos_sf2_file', '1020_FluidR3_GM_sf2_file', '1020_GeneralUserGS_sf2_file', '1020_JCLive_sf2_file',
                '1020_SBLive_sf2', '1020_SoundBlasterOld_sf2', '1021_Aspirin_sf2_file', '1021_FluidR3_GM_sf2_file', '1021_GeneralUserGS_sf2_file', '1021_JCLive_sf2_file', '1021_SoundBlasterOld_sf2',
                '1022_GeneralUserGS_sf2_file', '1030_Aspirin_sf2_file', '1030_Chaos_sf2_file', '1030_FluidR3_GM_sf2_file', '1030_GeneralUserGS_sf2_file', '1030_JCLive_sf2_file', '1030_SBLive_sf2',
                '1030_SoundBlasterOld_sf2', '1031_Aspirin_sf2_file', '1031_FluidR3_GM_sf2_file', '1031_GeneralUserGS_sf2_file', '1031_SoundBlasterOld_sf2', '1032_FluidR3_GM_sf2_file', '1040_Aspirin_sf2_file',
                '1040_Chaos_sf2_file', '1040_FluidR3_GM_sf2_file', '1040_GeneralUserGS_sf2_file', '1040_JCLive_sf2_file', '1040_SBLive_sf2', '1040_SoundBlasterOld_sf2', '1041_FluidR3_GM_sf2_file',
                '1041_GeneralUserGS_sf2_file', '1050_Aspirin_sf2_file', '1050_Chaos_sf2_file', '1050_FluidR3_GM_sf2_file', '1050_GeneralUserGS_sf2_file', '1050_JCLive_sf2_file', '1050_SBLive_sf2',
                '1050_SoundBlasterOld_sf2', '1051_GeneralUserGS_sf2_file', '1060_Aspirin_sf2_file', '1060_Chaos_sf2_file', '1060_FluidR3_GM_sf2_file', '1060_GeneralUserGS_sf2_file', '1060_JCLive_sf2_file',
                '1060_SBLive_sf2', '1060_SoundBlasterOld_sf2', '1061_FluidR3_GM_sf2_file', '1061_GeneralUserGS_sf2_file', '1061_SoundBlasterOld_sf2', '1070_Aspirin_sf2_file', '1070_Chaos_sf2_file',
                '1070_FluidR3_GM_sf2_file', '1070_GeneralUserGS_sf2_file', '1070_JCLive_sf2_file', '1070_SBLive_sf2', '1070_SoundBlasterOld_sf2', '1071_FluidR3_GM_sf2_file', '1071_GeneralUserGS_sf2_file',
                '1072_GeneralUserGS_sf2_file', '1073_GeneralUserGS_sf2_file', '1080_Aspirin_sf2_file', '1080_Chaos_sf2_file', '1080_FluidR3_GM_sf2_file', '1080_GeneralUserGS_sf2_file', '1080_JCLive_sf2_file',
                '1080_SBLive_sf2', '1080_SoundBlasterOld_sf2', '1081_SoundBlasterOld_sf2', '1090_Aspirin_sf2_file', '1090_Chaos_sf2_file', '1090_FluidR3_GM_sf2_file', '1090_GeneralUserGS_sf2_file',
                '1090_JCLive_sf2_file', '1090_SBLive_sf2', '1090_SoundBlasterOld_sf2', '1091_SoundBlasterOld_sf2', '1100_Aspirin_sf2_file', '1100_Chaos_sf2_file', '1100_FluidR3_GM_sf2_file',
                '1100_GeneralUserGS_sf2_file', '1100_JCLive_sf2_file', '1100_SBLive_sf2', '1100_SoundBlasterOld_sf2', '1101_Aspirin_sf2_file', '1101_FluidR3_GM_sf2_file', '1101_GeneralUserGS_sf2_file',
                '1102_GeneralUserGS_sf2_file', '1110_Aspirin_sf2_file', '1110_Chaos_sf2_file', '1110_FluidR3_GM_sf2_file', '1110_GeneralUserGS_sf2_file', '1110_JCLive_sf2_file', '1110_SBLive_sf2',
                '1110_SoundBlasterOld_sf2', '1120_Aspirin_sf2_file', '1120_Chaos_sf2_file', '1120_FluidR3_GM_sf2_file', '1120_GeneralUserGS_sf2_file', '1120_JCLive_sf2_file', '1120_SBLive_sf2',
                '1120_SoundBlasterOld_sf2', '1121_SoundBlasterOld_sf2', '1130_Aspirin_sf2_file', '1130_Chaos_sf2_file', '1130_FluidR3_GM_sf2_file', '1130_GeneralUserGS_sf2_file', '1130_JCLive_sf2_file',
                '1130_SBLive_sf2', '1130_SoundBlasterOld_sf2', '1131_FluidR3_GM_sf2_file', '1131_SoundBlasterOld_sf2', '1140_Aspirin_sf2_file', '1140_Chaos_sf2_file', '1140_FluidR3_GM_sf2_file',
                '1140_GeneralUserGS_sf2_file', '1140_JCLive_sf2_file', '1140_SBLive_sf2', '1140_SoundBlasterOld_sf2', '1141_FluidR3_GM_sf2_file', '1150_Aspirin_sf2_file', '1150_Chaos_sf2_file',
                '1150_FluidR3_GM_sf2_file', '1150_GeneralUserGS_sf2_file', '1150_JCLive_sf2_file', '1150_SBLive_sf2', '1150_SoundBlasterOld_sf2', '1151_FluidR3_GM_sf2_file', '1151_GeneralUserGS_sf2_file',
                '1152_FluidR3_GM_sf2_file', '1152_GeneralUserGS_sf2_file', '1160_Aspirin_sf2_file', '1160_Chaos_sf2_file', '1160_FluidR3_GM_sf2_file', '1160_GeneralUserGS_sf2_file', '1160_JCLive_sf2_file',
                '1160_SBLive_sf2', '1160_SoundBlasterOld_sf2', '1161_FluidR3_GM_sf2_file', '1161_GeneralUserGS_sf2_file', '1161_SoundBlasterOld_sf2', '1162_FluidR3_GM_sf2_file', '1162_GeneralUserGS_sf2_file',
                '1163_FluidR3_GM_sf2_file', '1170_Aspirin_sf2_file', '1170_Chaos_sf2_file', '1170_FluidR3_GM_sf2_file', '1170_GeneralUserGS_sf2_file', '1170_JCLive_sf2_file', '1170_SBLive_sf2',
                '1170_SoundBlasterOld_sf2', '1171_FluidR3_GM_sf2_file', '1171_GeneralUserGS_sf2_file', '1172_FluidR3_GM_sf2_file', '1173_FluidR3_GM_sf2_file', '1180_Aspirin_sf2_file', '1180_Chaos_sf2_file',
                '1180_FluidR3_GM_sf2_file', '1180_GeneralUserGS_sf2_file', '1180_JCLive_sf2_file', '1180_SBLive_sf2', '1180_SoundBlasterOld_sf2', '1181_FluidR3_GM_sf2_file', '1181_GeneralUserGS_sf2_file',
                '1181_SoundBlasterOld_sf2', '1190_Aspirin_sf2_file', '1190_Chaos_sf2_file', '1190_FluidR3_GM_sf2_file', '1190_GeneralUserGS_sf2_file', '1190_JCLive_sf2_file', '1190_SBLive_sf2',
                '1190_SoundBlasterOld_sf2', '1191_GeneralUserGS_sf2_file', '1192_GeneralUserGS_sf2_file', '1193_GeneralUserGS_sf2_file', '1194_GeneralUserGS_sf2_file', '1200_Aspirin_sf2_file',
                '1200_Chaos_sf2_file', '1200_FluidR3_GM_sf2_file', '1200_GeneralUserGS_sf2_file', '1200_JCLive_sf2_file', '1200_SBLive_sf2', '1200_SoundBlasterOld_sf2', '1201_Aspirin_sf2_file',
                '1201_GeneralUserGS_sf2_file', '1202_GeneralUserGS_sf2_file', '1210_Aspirin_sf2_file', '1210_Chaos_sf2_file', '1210_FluidR3_GM_sf2_file', '1210_GeneralUserGS_sf2_file', '1210_JCLive_sf2_file',
                '1210_SBLive_sf2', '1210_SoundBlasterOld_sf2', '1211_Aspirin_sf2_file', '1211_GeneralUserGS_sf2_file', '1212_GeneralUserGS_sf2_file', '1220_Aspirin_sf2_file', '1220_Chaos_sf2_file',
                '1220_FluidR3_GM_sf2_file', '1220_GeneralUserGS_sf2_file', '1220_JCLive_sf2_file', '1220_SBLive_sf2', '1220_SoundBlasterOld_sf2', '1221_Aspirin_sf2_file', '1221_GeneralUserGS_sf2_file',
                '1221_JCLive_sf2_file', '1222_Aspirin_sf2_file', '1222_GeneralUserGS_sf2_file', '1223_Aspirin_sf2_file', '1223_GeneralUserGS_sf2_file', '1224_Aspirin_sf2_file', '1224_GeneralUserGS_sf2_file',
                '1225_GeneralUserGS_sf2_file', '1226_GeneralUserGS_sf2_file', '1230_Aspirin_sf2_file', '1230_Chaos_sf2_file', '1230_FluidR3_GM_sf2_file', '1230_GeneralUserGS_sf2_file', '1230_JCLive_sf2_file',
                '1230_SBLive_sf2', '1230_SoundBlasterOld_sf2', '1231_Aspirin_sf2_file', '1231_GeneralUserGS_sf2_file', '1232_Aspirin_sf2_file', '1232_GeneralUserGS_sf2_file', '1233_GeneralUserGS_sf2_file',
                '1234_GeneralUserGS_sf2_file', '1240_Aspirin_sf2_file', '1240_Chaos_sf2_file', '1240_FluidR3_GM_sf2_file', '1240_GeneralUserGS_sf2_file', '1240_JCLive_sf2_file', '1240_SBLive_sf2',
                '1240_SoundBlasterOld_sf2', '1241_Aspirin_sf2_file', '1241_GeneralUserGS_sf2_file', '1242_Aspirin_sf2_file', '1242_GeneralUserGS_sf2_file', '1243_Aspirin_sf2_file', '1243_GeneralUserGS_sf2_file',
                '1244_Aspirin_sf2_file', '1244_GeneralUserGS_sf2_file', '1250_Aspirin_sf2_file', '1250_Chaos_sf2_file', '1250_FluidR3_GM_sf2_file', '1250_GeneralUserGS_sf2_file', '1250_JCLive_sf2_file',
                '1250_SBLive_sf2', '1250_SoundBlasterOld_sf2', '1251_Aspirin_sf2_file', '1251_FluidR3_GM_sf2_file', '1251_GeneralUserGS_sf2_file', '1252_Aspirin_sf2_file', '1252_FluidR3_GM_sf2_file',
                '1252_GeneralUserGS_sf2_file', '1253_Aspirin_sf2_file', '1253_GeneralUserGS_sf2_file', '1254_Aspirin_sf2_file', '1254_GeneralUserGS_sf2_file', '1255_Aspirin_sf2_file',
                '1255_GeneralUserGS_sf2_file', '1256_Aspirin_sf2_file', '1256_GeneralUserGS_sf2_file', '1257_Aspirin_sf2_file', '1257_GeneralUserGS_sf2_file', '1258_Aspirin_sf2_file',
                '1258_GeneralUserGS_sf2_file', '1259_GeneralUserGS_sf2_file', '1260_Aspirin_sf2_file', '1260_Chaos_sf2_file', '1260_FluidR3_GM_sf2_file', '1260_GeneralUserGS_sf2_file', '1260_JCLive_sf2_file',
                '1260_SBLive_sf2', '1260_SoundBlasterOld_sf2', '1261_Aspirin_sf2_file', '1261_GeneralUserGS_sf2_file', '1262_Aspirin_sf2_file', '1262_GeneralUserGS_sf2_file', '1263_Aspirin_sf2_file',
                '1263_GeneralUserGS_sf2_file', '1264_Aspirin_sf2_file', '1264_GeneralUserGS_sf2_file', '1265_Aspirin_sf2_file', '1265_GeneralUserGS_sf2_file', '1270_Aspirin_sf2_file', '1270_Chaos_sf2_file',
                '1270_FluidR3_GM_sf2_file', '1270_GeneralUserGS_sf2_file', '1270_JCLive_sf2_file', '1270_SBLive_sf2', '1270_SoundBlasterOld_sf2', '1271_Aspirin_sf2_file', '1271_GeneralUserGS_sf2_file',
                '1272_Aspirin_sf2_file', '1272_GeneralUserGS_sf2_file', '1273_GeneralUserGS_sf2_file', '1274_GeneralUserGS_sf2_file'
            ];
        }
        return this.instrumentKeyArray;
    };
    ;
    WebAudioFontLoader.prototype.instrumentInfo = function (n) {
        var key = this.instrumentKeys()[n];
        var p = 1 * parseInt(key.substring(0, 3));
        return {
            variable: '_tone_' + key,
            url: 'https://surikov.github.io/webaudiofontdata/sound/' + key + '.js',
            title: this.instrumentTitles()[p],
            pitch: -1
        };
    };
    ;
    WebAudioFontLoader.prototype.findInstrument = function (program) {
        if (this.choosenInfos.length == 0) {
            this.choosenInfos = [
                [1, 2] //Accoustic Grand Piano
                ,
                [2, 14] //Bright Accoustic Piano
                ,
                [3, 25] //Electric Grand Piano
                ,
                [4, 37] //Honky-Tonk Piano
                ,
                [5, 48] //Electric Pino 1
                ,
                [6, 58] //Electric Piano 2
                ,
                [7, 70] //HarpsiChord Piano
                ,
                [8, 83] //Cravinet
                ,
                [9, 91] //Celesta
                ,
                [10, 99] //Glockenspiel
                ,
                [11, 107] //Music Box
                ,
                [12, 118] //Vibraphone
                ,
                [13, 127] // Marimba
                ,
                [14, 136] // Xylophone
                ,
                [15, 144] // Tubular Bells
                ,
                [16, 152] // Dulcimer
                ,
                [17, 164] // Drawbar Organ
                ,
                [18, 170] // Percussive Organ
                ,
                [19, 183] //Rock Organ
                ,
                [20, 194] // Church Organ
                ,
                [21, 205] //Reed Organ
                ,
                [22, 215] //Accordion
                ,
                [23, 228] //
                ,
                [24, 241] //
                ,
                [25, 254] //
                ,
                [26, 263] //
                ,
                [27, 277] //
                ,
                [28, 296] //
                ,
                [29, 308] //
                ,
                [30, 319] //
                ,
                [31, 350] //
                ,
                [32, 356] //
                ,
                [33, 369] //
                ,
                [34, 379] //
                ,
                [35, 385] //
                ,
                [36, 399] // Fretless Bass
                ,
                [37, 403] // Slap Bass 1
                ,
                [38, 412] // Slap Bass 2
                ,
                [39, 421] // Synth Bass 1
                ,
                [40, 438] // Synth Bass 2
                ,
                [41, 452] // Violin
                ,
                [42, 461] // Viola
                ,
                [43, 467] // Cello
                ,
                [44, 477] // Contrabass
                ,
                [45, 488] // Tremolo Strings
                ,
                [46, 493] // Pizzicato Strings
                ,
                [47, 501] // Orchestral Harp
                ,
                [48, 511] // Timpani
                ,
                [49, 518] // String Ensemble 1
                ,
                [50, 547] //String Ensemble 2
            ];
        }
        for (var i = 0; i < this.instrumentKeys().length; i++) {
            if (program == 1 * parseInt(this.instrumentKeys()[i].substring(0, 3))) {
                return i;
            }
        }
        console.log('program', program, 'not found');
        return 0;
    };
    ;
    WebAudioFontLoader.prototype.drumTitles = function () {
        if (this.drumNamesArray.length == 0) {
            var drumNames = [];
            drumNames[35] = "Bass Drum 2";
            drumNames[36] = "Bass Drum 1";
            drumNames[37] = "Side Stick/Rimshot";
            drumNames[38] = "Snare Drum 1";
            drumNames[39] = "Hand Clap";
            drumNames[40] = "Snare Drum 2";
            drumNames[41] = "Low Tom 2";
            drumNames[42] = "Closed Hi-hat";
            drumNames[43] = "Low Tom 1";
            drumNames[44] = "Pedal Hi-hat";
            drumNames[45] = "Mid Tom 2";
            drumNames[46] = "Open Hi-hat";
            drumNames[47] = "Mid Tom 1";
            drumNames[48] = "High Tom 2";
            drumNames[49] = "Crash Cymbal 1";
            drumNames[50] = "High Tom 1";
            drumNames[51] = "Ride Cymbal 1";
            drumNames[52] = "Chinese Cymbal";
            drumNames[53] = "Ride Bell";
            drumNames[54] = "Tambourine";
            drumNames[55] = "Splash Cymbal";
            drumNames[56] = "Cowbell";
            drumNames[57] = "Crash Cymbal 2";
            drumNames[58] = "Vibra Slap";
            drumNames[59] = "Ride Cymbal 2";
            drumNames[60] = "High Bongo";
            drumNames[61] = "Low Bongo";
            drumNames[62] = "Mute High Conga";
            drumNames[63] = "Open High Conga";
            drumNames[64] = "Low Conga";
            drumNames[65] = "High Timbale";
            drumNames[66] = "Low Timbale";
            drumNames[67] = "High Agogo";
            drumNames[68] = "Low Agogo";
            drumNames[69] = "Cabasa";
            drumNames[70] = "Maracas";
            drumNames[71] = "Short Whistle";
            drumNames[72] = "Long Whistle";
            drumNames[73] = "Short Guiro";
            drumNames[74] = "Long Guiro";
            drumNames[75] = "Claves";
            drumNames[76] = "High Wood Block";
            drumNames[77] = "Low Wood Block";
            drumNames[78] = "Mute Cuica";
            drumNames[79] = "Open Cuica";
            drumNames[80] = "Mute Triangle";
            drumNames[81] = "Open Triangle";
            this.drumNamesArray = drumNames;
        }
        return this.drumNamesArray;
    };
    ;
    WebAudioFontLoader.prototype.drumKeys = function () {
        if (this.drumKeyArray.length == 0) {
            this.drumKeyArray = [
                //'35_0_SBLive_sf2'
                '35_0_Chaos_sf2_file',
                '35_12_JCLive_sf2_file', '35_16_JCLive_sf2_file', '35_18_JCLive_sf2_file', '35_4_Chaos_sf2_file', '36_0_SBLive_sf2', '36_12_JCLive_sf2_file', '36_16_JCLive_sf2_file', '36_18_JCLive_sf2_file',
                '36_4_Chaos_sf2_file', '37_0_SBLive_sf2', '37_12_JCLive_sf2_file', '37_16_JCLive_sf2_file', '37_18_JCLive_sf2_file', '37_4_Chaos_sf2_file', '38_0_SBLive_sf2', '38_12_JCLive_sf2_file',
                '38_16_JCLive_sf2_file', '38_18_JCLive_sf2_file', '38_4_Chaos_sf2_file', '39_0_SBLive_sf2', '39_12_JCLive_sf2_file', '39_16_JCLive_sf2_file', '39_18_JCLive_sf2_file', '39_4_Chaos_sf2_file',
                '40_0_SBLive_sf2', '40_12_JCLive_sf2_file', '40_16_JCLive_sf2_file', '40_18_JCLive_sf2_file', '40_4_Chaos_sf2_file', '41_0_SBLive_sf2', '41_12_JCLive_sf2_file', '41_16_JCLive_sf2_file',
                '41_18_JCLive_sf2_file', '41_4_Chaos_sf2_file', '42_0_SBLive_sf2', '42_12_JCLive_sf2_file', '42_16_JCLive_sf2_file', '42_18_JCLive_sf2_file', '42_4_Chaos_sf2_file', '43_0_SBLive_sf2',
                '43_12_JCLive_sf2_file', '43_16_JCLive_sf2_file', '43_18_JCLive_sf2_file', '43_4_Chaos_sf2_file', '44_0_SBLive_sf2', '44_12_JCLive_sf2_file', '44_16_JCLive_sf2_file', '44_18_JCLive_sf2_file',
                '44_4_Chaos_sf2_file', '45_0_SBLive_sf2', '45_12_JCLive_sf2_file', '45_16_JCLive_sf2_file', '45_18_JCLive_sf2_file', '45_4_Chaos_sf2_file', '46_0_SBLive_sf2', '46_12_JCLive_sf2_file',
                '46_16_JCLive_sf2_file', '46_18_JCLive_sf2_file', '46_4_Chaos_sf2_file', '47_0_SBLive_sf2', '47_12_JCLive_sf2_file', '47_16_JCLive_sf2_file', '47_18_JCLive_sf2_file', '47_4_Chaos_sf2_file',
                '48_0_SBLive_sf2', '48_12_JCLive_sf2_file', '48_16_JCLive_sf2_file', '48_18_JCLive_sf2_file', '48_4_Chaos_sf2_file', '49_0_SBLive_sf2', '49_12_JCLive_sf2_file', '49_16_JCLive_sf2_file',
                '49_18_JCLive_sf2_file', '49_4_Chaos_sf2_file', '50_0_SBLive_sf2', '50_12_JCLive_sf2_file', '50_16_JCLive_sf2_file', '50_18_JCLive_sf2_file', '50_4_Chaos_sf2_file', '51_0_SBLive_sf2',
                '51_12_JCLive_sf2_file', '51_16_JCLive_sf2_file', '51_18_JCLive_sf2_file', '51_4_Chaos_sf2_file', '52_0_SBLive_sf2', '52_12_JCLive_sf2_file', '52_16_JCLive_sf2_file', '52_18_JCLive_sf2_file',
                '52_4_Chaos_sf2_file', '53_0_SBLive_sf2', '53_12_JCLive_sf2_file', '53_16_JCLive_sf2_file', '53_18_JCLive_sf2_file', '53_4_Chaos_sf2_file', '54_0_SBLive_sf2', '54_12_JCLive_sf2_file',
                '54_16_JCLive_sf2_file', '54_18_JCLive_sf2_file', '54_4_Chaos_sf2_file', '55_0_SBLive_sf2', '55_12_JCLive_sf2_file', '55_16_JCLive_sf2_file', '55_18_JCLive_sf2_file', '55_4_Chaos_sf2_file',
                '56_0_SBLive_sf2', '56_12_JCLive_sf2_file', '56_16_JCLive_sf2_file', '56_18_JCLive_sf2_file', '56_4_Chaos_sf2_file', '57_0_SBLive_sf2', '57_12_JCLive_sf2_file', '57_16_JCLive_sf2_file',
                '57_18_JCLive_sf2_file', '57_4_Chaos_sf2_file', '58_0_SBLive_sf2', '58_12_JCLive_sf2_file', '58_16_JCLive_sf2_file', '58_18_JCLive_sf2_file', '58_4_Chaos_sf2_file', '59_0_SBLive_sf2',
                '59_12_JCLive_sf2_file', '59_16_JCLive_sf2_file', '59_18_JCLive_sf2_file', '59_4_Chaos_sf2_file', '60_0_SBLive_sf2', '60_12_JCLive_sf2_file', '60_16_JCLive_sf2_file', '60_18_JCLive_sf2_file',
                '60_4_Chaos_sf2_file', '61_0_SBLive_sf2', '61_12_JCLive_sf2_file', '61_16_JCLive_sf2_file', '61_18_JCLive_sf2_file', '61_4_Chaos_sf2_file', '62_0_SBLive_sf2', '62_12_JCLive_sf2_file',
                '62_16_JCLive_sf2_file', '62_18_JCLive_sf2_file', '62_4_Chaos_sf2_file', '63_0_SBLive_sf2', '63_12_JCLive_sf2_file', '63_16_JCLive_sf2_file', '63_18_JCLive_sf2_file', '63_4_Chaos_sf2_file',
                '64_0_SBLive_sf2', '64_12_JCLive_sf2_file', '64_16_JCLive_sf2_file', '64_18_JCLive_sf2_file', '64_4_Chaos_sf2_file', '65_0_SBLive_sf2', '65_12_JCLive_sf2_file', '65_16_JCLive_sf2_file',
                '65_18_JCLive_sf2_file', '65_4_Chaos_sf2_file', '66_0_SBLive_sf2', '66_12_JCLive_sf2_file', '66_16_JCLive_sf2_file', '66_18_JCLive_sf2_file', '66_4_Chaos_sf2_file', '67_0_SBLive_sf2',
                '67_12_JCLive_sf2_file', '67_16_JCLive_sf2_file', '67_18_JCLive_sf2_file', '67_4_Chaos_sf2_file', '68_0_SBLive_sf2', '68_12_JCLive_sf2_file', '68_16_JCLive_sf2_file', '68_18_JCLive_sf2_file',
                '68_4_Chaos_sf2_file', '69_0_SBLive_sf2', '69_12_JCLive_sf2_file', '69_16_JCLive_sf2_file', '69_18_JCLive_sf2_file', '69_4_Chaos_sf2_file', '70_0_SBLive_sf2', '70_12_JCLive_sf2_file',
                '70_16_JCLive_sf2_file', '70_18_JCLive_sf2_file', '70_4_Chaos_sf2_file', '71_0_SBLive_sf2', '71_12_JCLive_sf2_file', '71_16_JCLive_sf2_file', '71_18_JCLive_sf2_file', '71_4_Chaos_sf2_file',
                '72_0_SBLive_sf2', '72_12_JCLive_sf2_file', '72_16_JCLive_sf2_file', '72_18_JCLive_sf2_file', '72_4_Chaos_sf2_file', '73_0_SBLive_sf2', '73_12_JCLive_sf2_file', '73_16_JCLive_sf2_file',
                '73_18_JCLive_sf2_file', '73_4_Chaos_sf2_file', '74_0_SBLive_sf2', '74_12_JCLive_sf2_file', '74_16_JCLive_sf2_file', '74_18_JCLive_sf2_file', '74_4_Chaos_sf2_file', '75_0_SBLive_sf2',
                '75_12_JCLive_sf2_file', '75_16_JCLive_sf2_file', '75_18_JCLive_sf2_file', '75_4_Chaos_sf2_file', '76_0_SBLive_sf2', '76_12_JCLive_sf2_file', '76_16_JCLive_sf2_file', '76_18_JCLive_sf2_file',
                '76_4_Chaos_sf2_file', '77_0_SBLive_sf2', '77_12_JCLive_sf2_file', '77_16_JCLive_sf2_file', '77_18_JCLive_sf2_file', '77_4_Chaos_sf2_file', '78_0_SBLive_sf2', '78_12_JCLive_sf2_file',
                '78_16_JCLive_sf2_file', '78_18_JCLive_sf2_file', '78_4_Chaos_sf2_file', '79_0_SBLive_sf2', '79_12_JCLive_sf2_file', '79_16_JCLive_sf2_file', '79_18_JCLive_sf2_file', '79_4_Chaos_sf2_file',
                '80_0_SBLive_sf2', '80_12_JCLive_sf2_file', '80_16_JCLive_sf2_file', '80_18_JCLive_sf2_file', '80_4_Chaos_sf2_file', '81_0_SBLive_sf2', '81_12_JCLive_sf2_file', '81_16_JCLive_sf2_file',
                '81_18_JCLive_sf2_file', '81_4_Chaos_sf2_file'
            ];
        }
        return this.drumKeyArray;
    };
    ;
    WebAudioFontLoader.prototype.drumInfo = function (n) {
        var key = this.drumKeys()[n];
        var p = 1 * parseInt(key.substring(0, 2));
        return {
            variable: '_drum_' + key,
            url: 'https://surikov.github.io/webaudiofontdata/sound/128' + key + '.js',
            pitch: p,
            title: this.drumTitles()[p]
        };
    };
    ;
    WebAudioFontLoader.prototype.findDrum = function (nn) {
        for (var i = 0; i < this.drumKeys().length; i++) {
            if (nn == 1 * parseInt(this.drumKeys()[i].substring(0, 2))) {
                return i;
            }
        }
        return 0;
    };
    return WebAudioFontLoader;
}());
console.log('WebAudioFont Engine v3.0.04 GPL3');
//docs 
//npm link typescript
//npx typedoc player.ts otypes.ts channel.ts loader.ts reverberator.ts ticker.ts
var WebAudioFontPlayer = /** @class */ (function () {
    function WebAudioFontPlayer() {
        this.envelopes = [];
        this.loader = new WebAudioFontLoader(this);
        //onCacheFinish = null;
        //onCacheProgress = null;
        this.afterTime = 0.05;
        this.nearZero = 0.000001;
        this.adjustPreset = function (audioContext, preset) {
            for (var i = 0; i < preset.zones.length; i++) {
                this.adjustZone(audioContext, preset.zones[i]);
            }
        };
        this.adjustZone = function (audioContext, zone) {
            if (zone.buffer) {
                //
            }
            else {
                zone.delay = 0;
                if (zone.sample) {
                    var decoded = atob(zone.sample);
                    zone.buffer = audioContext.createBuffer(1, decoded.length / 2, zone.sampleRate);
                    var float32Array = zone.buffer.getChannelData(0);
                    var b1, b2, n;
                    for (var i = 0; i < decoded.length / 2; i++) {
                        b1 = decoded.charCodeAt(i * 2);
                        b2 = decoded.charCodeAt(i * 2 + 1);
                        if (b1 < 0) {
                            b1 = 256 + b1;
                        }
                        if (b2 < 0) {
                            b2 = 256 + b2;
                        }
                        n = b2 * 256 + b1;
                        if (n >= 65536 / 2) {
                            n = n - 65536;
                        }
                        float32Array[i] = n / 65536.0;
                    }
                }
                else {
                    if (zone.file) {
                        var datalen = zone.file.length;
                        var arraybuffer = new ArrayBuffer(datalen);
                        var view = new Uint8Array(arraybuffer);
                        var decoded = atob(zone.file);
                        var b;
                        for (var i = 0; i < decoded.length; i++) {
                            b = decoded.charCodeAt(i);
                            view[i] = b;
                        }
                        audioContext.decodeAudioData(arraybuffer, function (audioBuffer) {
                            zone.buffer = audioBuffer;
                        });
                    }
                }
                zone.loopStart = this.numValue(zone.loopStart, 0);
                zone.loopEnd = this.numValue(zone.loopEnd, 0);
                zone.coarseTune = this.numValue(zone.coarseTune, 0);
                zone.fineTune = this.numValue(zone.fineTune, 0);
                zone.originalPitch = this.numValue(zone.originalPitch, 6000);
                zone.sampleRate = this.numValue(zone.sampleRate, 44100);
                zone.sustain = this.numValue(zone.originalPitch, 0);
            }
        };
    }
    WebAudioFontPlayer.prototype.createChannel = function (audioContext) {
        return new WebAudioFontChannel(audioContext);
    };
    ;
    WebAudioFontPlayer.prototype.createReverberator = function (audioContext) {
        return new WebAudioFontReverberator(audioContext);
    };
    ;
    WebAudioFontPlayer.prototype.limitVolume = function (volume) {
        if (volume) {
            volume = 1.0 * volume;
        }
        else {
            volume = 0.5;
        }
        return volume;
    };
    ;
    WebAudioFontPlayer.prototype.queueChord = function (audioContext, target, preset, when, pitches, duration, volume, slides) {
        volume = this.limitVolume(volume);
        var envelopes = [];
        for (var i = 0; i < pitches.length; i++) {
            var singleSlide = undefined;
            if (slides) {
                singleSlide = slides[i];
            }
            var envlp = this.queueWaveTable(audioContext, target, preset, when, pitches[i], duration, volume - Math.random() * 0.01, singleSlide);
            if (envlp)
                envelopes.push(envlp);
        }
        return envelopes;
    };
    ;
    WebAudioFontPlayer.prototype.queueStrumUp = function (audioContext, target, preset, when, pitches, duration, volume, slides) {
        pitches.sort(function (a, b) {
            return b - a;
        });
        return this.queueStrum(audioContext, target, preset, when, pitches, duration, volume, slides);
    };
    ;
    WebAudioFontPlayer.prototype.queueStrumDown = function (audioContext, target, preset, when, pitches, duration, volume, slides) {
        pitches.sort(function (a, b) {
            return a - b;
        });
        return this.queueStrum(audioContext, target, preset, when, pitches, duration, volume, slides);
    };
    ;
    WebAudioFontPlayer.prototype.queueStrum = function (audioContext, target, preset, when, pitches, duration, volume, slides) {
        volume = this.limitVolume(volume);
        if (when < audioContext.currentTime) {
            when = audioContext.currentTime;
        }
        var envelopes = [];
        for (var i = 0; i < pitches.length; i++) {
            var singleSlide = undefined;
            if (slides) {
                singleSlide = slides[i];
            }
            var envlp = this.queueWaveTable(audioContext, target, preset, when + i * 0.01, pitches[i], duration, volume - Math.random() * 0.01, singleSlide);
            if (envlp)
                envelopes.push(envlp);
            volume = 0.9 * volume;
        }
        return envelopes;
    };
    ;
    WebAudioFontPlayer.prototype.queueSnap = function (audioContext, target, preset, when, pitches, duration, volume, slides) {
        volume = this.limitVolume(volume);
        volume = 1.5 * (volume || 1.0);
        duration = 0.05;
        return this.queueChord(audioContext, target, preset, when, pitches, duration, volume, slides);
    };
    ;
    WebAudioFontPlayer.prototype.resumeContext = function (audioContext) {
        try {
            if (audioContext.state == 'suspended') {
                console.log('audioContext.resume', audioContext);
                audioContext.resume();
            }
        }
        catch (e) {
            //don't care
        }
    };
    WebAudioFontPlayer.prototype.queueWaveTable = function (audioContext, target, preset, when, pitch, duration, volume, slides) {
        this.resumeContext(audioContext);
        volume = this.limitVolume(volume);
        var zone = this.findZone(audioContext, preset, pitch);
        if (zone) {
            if (!(zone.buffer)) {
                console.log('empty buffer ', zone);
                return null;
            }
            var baseDetune = zone.originalPitch - 100.0 * zone.coarseTune - zone.fineTune;
            var playbackRate = 1.0 * Math.pow(2, (100.0 * pitch - baseDetune) / 1200.0);
            var startWhen = when;
            if (startWhen < audioContext.currentTime) {
                startWhen = audioContext.currentTime;
            }
            var waveDuration = duration + this.afterTime;
            var loop = true;
            if (zone.loopStart < 1 || zone.loopStart >= zone.loopEnd) {
                loop = false;
            }
            if (!loop) {
                if (waveDuration > zone.buffer.duration / playbackRate) {
                    waveDuration = zone.buffer.duration / playbackRate;
                }
            }
            var envelope = this.findEnvelope(audioContext, target);
            this.setupEnvelope(audioContext, envelope, zone, volume, startWhen, waveDuration, duration);
            envelope.audioBufferSourceNode = audioContext.createBufferSource();
            envelope.audioBufferSourceNode.playbackRate.setValueAtTime(playbackRate, 0);
            if (slides) {
                if (slides.length > 0) {
                    envelope.audioBufferSourceNode.playbackRate.setValueAtTime(playbackRate, when);
                    for (var i = 0; i < slides.length; i++) {
                        var nextPitch = pitch + slides[i].delta;
                        var newPlaybackRate = 1.0 * Math.pow(2, (100.0 * nextPitch - baseDetune) / 1200.0);
                        var newWhen = when + slides[i].when;
                        envelope.audioBufferSourceNode.playbackRate.linearRampToValueAtTime(newPlaybackRate, newWhen);
                    }
                }
            }
            envelope.audioBufferSourceNode.buffer = zone.buffer;
            if (loop) {
                envelope.audioBufferSourceNode.loop = true;
                envelope.audioBufferSourceNode.loopStart = zone.loopStart / zone.sampleRate + ((zone.delay) ? zone.delay : 0);
                envelope.audioBufferSourceNode.loopEnd = zone.loopEnd / zone.sampleRate + ((zone.delay) ? zone.delay : 0);
            }
            else {
                envelope.audioBufferSourceNode.loop = false;
            }
            envelope.audioBufferSourceNode.connect(envelope);
            envelope.audioBufferSourceNode.start(startWhen, zone.delay);
            envelope.audioBufferSourceNode.stop(startWhen + waveDuration);
            envelope.when = startWhen;
            envelope.duration = waveDuration;
            envelope.pitch = pitch;
            envelope.preset = preset;
            return envelope;
        }
        else {
            return null;
        }
    };
    ;
    WebAudioFontPlayer.prototype.noZeroVolume = function (n) {
        if (n > this.nearZero) {
            return n;
        }
        else {
            return this.nearZero;
        }
    };
    ;
    WebAudioFontPlayer.prototype.setupEnvelope = function (audioContext, envelope, zone, volume, when, sampleDuration, noteDuration) {
        envelope.gain.setValueAtTime(this.noZeroVolume(0), audioContext.currentTime);
        var lastTime = 0;
        var lastVolume = 0;
        var duration = noteDuration;
        var zoneahdsr = zone.ahdsr;
        if (sampleDuration < duration + this.afterTime) {
            duration = sampleDuration - this.afterTime;
        }
        if (zoneahdsr) {
            if (!(zoneahdsr.length > 0)) {
                zoneahdsr = [{
                        duration: 0,
                        volume: 1
                    }, {
                        duration: 0.5,
                        volume: 1
                    }, {
                        duration: 1.5,
                        volume: 0.5
                    }, {
                        duration: 3,
                        volume: 0
                    }
                ];
            }
        }
        else {
            zoneahdsr = [{
                    duration: 0,
                    volume: 1
                }, {
                    duration: duration,
                    volume: 1
                }
            ];
        }
        var ahdsr = zoneahdsr;
        envelope.gain.cancelScheduledValues(when);
        envelope.gain.setValueAtTime(this.noZeroVolume(ahdsr[0].volume * volume), when);
        for (var i = 0; i < ahdsr.length; i++) {
            if (ahdsr[i].duration > 0) {
                if (ahdsr[i].duration + lastTime > duration) {
                    var r = 1 - (ahdsr[i].duration + lastTime - duration) / ahdsr[i].duration;
                    var n = lastVolume - r * (lastVolume - ahdsr[i].volume);
                    envelope.gain.linearRampToValueAtTime(this.noZeroVolume(volume * n), when + duration);
                    break;
                }
                lastTime = lastTime + ahdsr[i].duration;
                lastVolume = ahdsr[i].volume;
                envelope.gain.linearRampToValueAtTime(this.noZeroVolume(volume * lastVolume), when + lastTime);
            }
        }
        envelope.gain.linearRampToValueAtTime(this.noZeroVolume(0), when + duration + this.afterTime);
    };
    ;
    WebAudioFontPlayer.prototype.numValue = function (aValue, defValue) {
        if (typeof aValue === "number") {
            return aValue;
        }
        else {
            return defValue;
        }
    };
    ;
    WebAudioFontPlayer.prototype.findEnvelope = function (audioContext, target) {
        var envelope = null;
        for (var i = 0; i < this.envelopes.length; i++) {
            var e = this.envelopes[i];
            if (e.target == target && audioContext.currentTime > e.when + e.duration + 0.001) {
                try {
                    if (e.audioBufferSourceNode) {
                        e.audioBufferSourceNode.disconnect();
                        e.audioBufferSourceNode.stop(0);
                        e.audioBufferSourceNode = null;
                    }
                }
                catch (x) {
                    //audioBufferSourceNode is dead already
                }
                envelope = e;
                break;
            }
        }
        if (!(envelope)) {
            envelope = audioContext.createGain();
            envelope.target = target;
            envelope.connect(target);
            envelope.cancel = function () {
                if (envelope && (envelope.when + envelope.duration > audioContext.currentTime)) {
                    envelope.gain.cancelScheduledValues(0);
                    envelope.gain.setTargetAtTime(0.00001, audioContext.currentTime, 0.1);
                    envelope.when = audioContext.currentTime + 0.00001;
                    envelope.duration = 0;
                }
            };
            this.envelopes.push(envelope);
        }
        return envelope;
    };
    ;
    WebAudioFontPlayer.prototype.findZone = function (audioContext, preset, pitch) {
        var zone = null;
        for (var i = preset.zones.length - 1; i >= 0; i--) {
            zone = preset.zones[i];
            if (zone.keyRangeLow <= pitch && zone.keyRangeHigh + 1 >= pitch) {
                break;
            }
        }
        try {
            if (zone)
                this.adjustZone(audioContext, zone);
        }
        catch (ex) {
            console.log('adjustZone', ex);
        }
        return zone;
    };
    ;
    WebAudioFontPlayer.prototype.cancelQueue = function (audioContext) {
        for (var i = 0; i < this.envelopes.length; i++) {
            var e = this.envelopes[i];
            e.gain.cancelScheduledValues(0);
            e.gain.setValueAtTime(this.nearZero, audioContext.currentTime);
            e.when = -1;
            try {
                if (e.audioBufferSourceNode)
                    e.audioBufferSourceNode.disconnect();
            }
            catch (ex) {
                console.log(ex);
            }
        }
    };
    ;
    return WebAudioFontPlayer;
}());
var WebAudioFontReverberator = /** @class */ (function () {
    function WebAudioFontReverberator(audioContext) {
        this.irr = "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"; //http://www.openairlib.net/
        var me = this;
        this.audioContext = audioContext;
        this.output = audioContext.createGain();
        this.input = this.audioContext.createBiquadFilter();
        this.compressor = audioContext.createDynamicsCompressor();
        this.compressorWet = audioContext.createGain();
        this.compressorDry = audioContext.createGain();
        this.convolver = null;
        this.convolverInput = audioContext.createGain();
        this.dry = audioContext.createGain();
        this.wet = audioContext.createGain();
        this.input.type = "lowpass";
        this.input.frequency.setTargetAtTime(18000, 0, 0.0001);
        this.compressorWet.gain.setTargetAtTime(1.0, 0, 0.0001);
        this.compressorDry.gain.setTargetAtTime(0.0, 0, 0.0001);
        var threshold = -35;
        var knee = 35;
        var ratio = 8;
        var attack = 0.02;
        var release = 0.1;
        this.compressor.threshold.setValueAtTime(threshold, 0.0001); //-100,0
        this.compressor.knee.setValueAtTime(knee, 0.0001); //0,40
        this.compressor.ratio.setValueAtTime(ratio, 0.0001); //2,20
        this.compressor.attack.setValueAtTime(attack, 0.0001); //0,1
        this.compressor.release.setValueAtTime(release, 0.0001); //0,1
        this.dry.gain.setTargetAtTime(0.6, 0, 0.0001);
        this.wet.gain.setTargetAtTime(0.4, 0, 0.0001);
        this.input.connect(this.compressorDry);
        this.compressorDry.connect(this.convolverInput);
        this.input.connect(this.compressorWet);
        this.compressorWet.connect(this.compressor);
        this.compressor.connect(this.convolverInput);
        this.convolverInput.connect(this.dry);
        this.dry.connect(this.output);
        this.convolverInput.connect(this.wet);
        var datalen = this.irr.length / 2;
        this.irrArrayBuffer = new ArrayBuffer(datalen);
        var view = new Uint8Array(this.irrArrayBuffer);
        var decoded = atob(this.irr);
        var b;
        for (var i = 0; i < decoded.length; i++) {
            b = decoded.charCodeAt(i);
            view[i] = b;
        }
        this.audioContext.decodeAudioData(this.irrArrayBuffer, function (audioBuffer) {
            var c = audioContext.createConvolver();
            c.buffer = audioBuffer;
            me.wet.connect(c);
            c.connect(me.output);
            me.convolver = c;
            console.log('convolver audioBuffer', audioBuffer);
        });
    }
    return WebAudioFontReverberator;
}());
var WebAudioFontTicker = /** @class */ (function () {
    function WebAudioFontTicker() {
        this.stateStop = 1;
        this.statePlay = 2;
        this.stateEnd = 3;
        this.state = this.stateStop;
        this.stepDuration = 0.1;
        this.lastPosition = 0;
    }
    WebAudioFontTicker.prototype.playLoop = function (player, audioContext, loopStart, loopPosition, loopEnd, queue) {
        this.startTicks(audioContext, function (when, from, to) {
            for (var i = 0; i < queue.length; i++) {
                var note = queue[i];
                if (note.when >= from && note.when < to) {
                    var start = when + note.when - from;
                    player.queueWaveTable(audioContext, note.destination, note.preset, start, note.pitch, note.duration, note.volume, note.slides);
                }
            }
        }, loopStart, loopPosition, loopEnd, function (at) {
            player.cancelQueue(audioContext);
        });
    };
    ;
    WebAudioFontTicker.prototype.startTicks = function (audioContext, onTick, loopStart, loopPosition, loopEnd, onEnd) {
        if (this.state == this.stateStop) {
            this.state = this.statePlay;
            this.tick(audioContext, audioContext.currentTime, onTick, loopStart, loopPosition, loopEnd, onEnd);
        }
    };
    ;
    WebAudioFontTicker.prototype.tick = function (audioContext, nextAudioTime, onTick, loopStart, loopPosition, loopEnd, onEnd) {
        this.lastPosition = loopPosition;
        if (this.state == this.stateEnd) {
            this.state = this.stateStop;
            onEnd(loopPosition);
        }
        else {
            if (this.state == this.statePlay) {
                if (nextAudioTime - this.stepDuration < audioContext.currentTime) {
                    if (loopPosition + this.stepDuration < loopEnd) {
                        var from = loopPosition;
                        var to = loopPosition + this.stepDuration;
                        onTick(nextAudioTime, from, to);
                        loopPosition = to;
                    }
                    else {
                        var from = loopPosition;
                        var to = loopEnd;
                        onTick(nextAudioTime, from, to);
                        from = loopStart;
                        to = loopStart + this.stepDuration - (loopEnd - loopPosition);
                        if (to < loopEnd) {
                            onTick(nextAudioTime + (loopEnd - loopPosition), from, to);
                            loopPosition = to;
                        }
                        else {
                            loopPosition = loopEnd;
                        }
                    }
                    nextAudioTime = nextAudioTime + this.stepDuration;
                    if (nextAudioTime < audioContext.currentTime) {
                        nextAudioTime = audioContext.currentTime;
                    }
                }
                var me = this;
                window.requestAnimationFrame(function (time) {
                    me.tick(audioContext, nextAudioTime, onTick, loopStart, loopPosition, loopEnd, onEnd);
                });
            }
        }
    };
    WebAudioFontTicker.prototype.cancel = function () {
        if (this.state == this.statePlay) {
            this.state = this.stateEnd;
        }
    };
    ;
    return WebAudioFontTicker;
}());
