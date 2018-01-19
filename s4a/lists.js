List.prototype.toJSON = function () {
    return this.itemsArray();
};

List.prototype.toCSV = function () {
    // Expects the list to be properly mappable into a
    // two-dimensional table.
    return this.asArray().map(function (eachRow) {
        return eachRow.asArray().map(function (eachCell) {
            return JSON.stringify(eachCell);
        }).join(',');
    }).join('\n');
};
