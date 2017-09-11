modules.cellularBYOB = '2013-August-23';

/*
** The CellAttributeDialogMorph is exactly the same as the
** VariableDialogMorph, except it doesn't have the "global" and "local" settings.
*/
var CellAttributeDialogMorph;

CellAttributeDialogMorph.prototype = new VariableDialogMorph();
CellAttributeDialogMorph.prototype.constructor = CellAttributeDialogMorph;
CellAttributeDialogMorph.uber = VariableDialogMorph.prototype;

function CellAttributeDialogMorph(target, action, environment) {
    this.init(target, action, environment);
}

CellAttributeDialogMorph.prototype.createTypeButtons = function () { };

/*
** Renames the type buttons to make more sense in the context of cellular.
*/
VariableDialogMorph.prototype.createTypeButtons = function () {
    var myself = this;

    this.addTypeButton(
        function () {myself.setType('global'); },
        "global",
        function () {return myself.isGlobal; }
    );
    this.addTypeButton(
        function () {myself.setType('local'); },
        "for each instance of this sprite",
        function () {return !myself.isGlobal; }
    );
};
