IDE_Morph.prototype.droppedBinary = function (anArrayBuffer, name) {
    // dynamically load ypr->Snap!
    var ypr = document.getElementById('ypr'),
        myself = this,
        suffix = name.substring(name.length - 3);

    if (suffix.toLowerCase() === 'ypr') {
        function loadYPR(buffer, lbl) {
            var reader = new sb.Reader(),
                pname = lbl.split('.')[0]; // up to period
            reader.onload = function (info) {
                myself.droppedText(new sb.XMLWriter().write(pname, info));
            };
            reader.readYPR(new Uint8Array(buffer));
        }

        if (!ypr) {
            ypr = document.createElement('script');
            ypr.id = 'ypr';
            ypr.onload = function () {loadYPR(anArrayBuffer, name); };
            document.head.appendChild(ypr);
            ypr.src = 'ypr.js';
        } else {
            loadYPR(anArrayBuffer, name);
        }
    } else if (suffix.toLowerCase() === 'zip' ||
        suffix.toLowerCase() === 'smod') {
        var mdl = new ModuleLoader(this);
        mdl.open(anArrayBuffer, {base64: false});
    }
};