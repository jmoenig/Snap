/* 
SnapExtensions.primitives.set(
    'myFunction()',
    function () {
        return 0;

    }
); 
*/

SnapExtensions.primitives.set(
    'gDrive_urlFrom(id, key)',
    function (id, key) {
        let base = "https://www.googleapis.com/drive/v3/files/" + id + "?&key=" + key + "&alt=media";
        let url = "https://api.allorigins.win/raw?url=" + encodeURIComponent(base);
        return url;

    }
);

SnapExtensions.primitives.set(
    'gDrive_loadXML(xml)',
    function (xml) {
        // solution by dardoro
        let ide = this.parentThatIsA(IDE_Morph);
        ide.rawOpenProjectString(xml);

    }
); 