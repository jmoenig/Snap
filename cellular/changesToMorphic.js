modules.cellularMorphic = '2014-August-4';

/*********************************************************************/
/***************************** OVERRIDES *****************************/
/*********************************************************************/

var penMorphUberInit = PenMorph.prototype.init;
PenMorph.prototype.init = function () {
    penMorphUberInit.call(this);
    
    this.penPoint = 'cellular-center';
};
