modules.cellularBYOB = '2013-August-23';

var CellAttributeDialogMorph;

CellAttributeDialogMorph.prototype = new VariableDialogMorph();
CellAttributeDialogMorph.prototype.constructor = CellAttributeDialogMorph;
CellAttributeDialogMorph.uber = VariableDialogMorph.prototype;

function CellAttributeDialogMorph(target, action, environment) {
    this.init(target, action, environment);
}

CellAttributeDialogMorph.prototype.createTypeButtons = function () { };