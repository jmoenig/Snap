/* globals DialogBoxMorph, TextMorph, MorphicPreferences, Color, Point */
DialogBoxMorph.prototype.ask = function (
    title,
    textString,
    world,
    choices
) {
    var myself = this,
        txt;

    txt = new TextMorph(
        textString,
        this.fontSize,
        this.fontStyle,
        true,
        false,
        'center',
        null,
        null,
        MorphicPreferences.isFlat ? null : new Point(1, 1),
        new Color(255, 255, 255)
    );

    if (!this.key) {
        this.key = 'decide' + title + textString;
    }

    this.labelString = title;
    this.createLabel();
    this.addBody(txt);
    Object.keys(choices).forEach(function(label) {
        var action = choices[label];
        myself.addButton(action, label);
    });
    this.fixLayout();
    this.drawNew();
    this.fixLayout();
    this.popUp(world);
};
