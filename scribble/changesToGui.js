modules.scribbleGui = '2013-August-2';

/*********************************************************************/
/******************************* HOOKS *******************************/
/*********because sometimes you HAVE to mod the original file*********/
/*********************************************************************/

IDE_Morph.prototype.createSnapAppsButtons = function(colors)
{
}

IDE_Morph.prototype.getRightHandButtons = function(stopButton)
{
    return [stopButton, 
    this.controlBar.pauseButton, 
    this.controlBar.startButton];
}

function getSnapLogoImage()
{
    return 'scribble_logo_sm.png';
}

function getSnapAppsName()
{
    return 'Scribble';
}

function getSnapAppsAboutText()
{
    return 'Scribble 1.0\n Based upon Snap! 4.0\nBuild Your Own Blocks\n\n--- beta ---\n\n'
        + 'Scribble modifications copyright \u24B8 2013 Aidan Lane and Matthew Ready\n'
        + 'aidan.lane@monash.edu, matt.ready@monash.edu\n\n'
        + 'For more information visit http://flipt.org/';
}

//loadLocalFile From JSZip, with modifications.
function loadLocalFile(filename, success, error, asString) {
    try {

    if (asString === undefined) {
        asString = false;
    }

    var xhr = new XMLHttpRequest();

    xhr.open('GET', filename + "?_=" + ( new Date() ).getTime(), true);

    // recent browsers
    if ("responseType" in xhr) {
        xhr.responseType = "arraybuffer";
    }

    // older browser
    if(xhr.overrideMimeType) {
        xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }

    xhr.onreadystatechange = function(e) {
        // use `xhr` and not `this`... thanks IE
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || window.location.protocol === "file:") {
                try {
                    if (xhr.response) {
                        if (asString) {
                            success(JSZip.utils.transformTo("string", xhr.response));
                        } else { 
                            success(xhr.response);
                        }
                    } else {
                        success(xhr.responseText);
                    }
                } catch(e) {
                    error(e);
                }
            } else {
                error("Ajax error for " + filename + " : " + this.status);
            }
        }
    };

    xhr.send();

    } catch (e) {
        error(e);
    }
};

function jsEscape(str)
{
    var ret = str.replace(new RegExp("\"", 'g'), "\\\"");
    var ret = ret.replace(new RegExp("</script>", 'g'), "</scr\"+\"ipt>");
    return ret;
}

IDE_Morph.prototype.exportIndex = "scribble.html";

IDE_Morph.prototype.exportProjectZip = function()
{
    var myself = this;
    var hadError = false;
    
    function showError(error)
    {
        if (!hadError)
        {
            hadError = true;
            var dlg = new DialogBoxMorph();
            dlg.inform('Error', 
                       'There was an error zipping the file:\n' + error + '\nThis could because of ' + 
                       'the browser you are using.', myself.world());
            dlg.fixLayout();
            dlg.drawNew();
        }
    }
    
    function getIndexHtmlContentsWithEmbeddedProject(success, fail)
    {
        return loadLocalFile(myself.exportIndex, function (data) {
            //Save the project as XML, escape it as a JS string
            var escapedProject = jsEscape(myself.serializer.serialize(myself.stage));
            
            //...replace the code that starts Snap with some that loads that project.
            var replaceMe = "ide.openIn(world);\n";
            if (data.indexOf(replaceMe) === -1) {
                fail("replaceMe (\"" + needle + "\") not found in project HTML");
                return;
            }
            
            // Inject the project.
            data = data.replace(replaceMe,
                "ide.openIn(world);\n" + 
                "ide.rawOpenProjectString(\"" + escapedProject + "\");\n" + 
                "ide.toggleAppMode(true);\n" + 
		        "window.onbeforeunload = function() { };");
		        
		    // Callback
		    success(data);
        }, fail, true);
    }
    
    function getAllScripts(rawHTML) {
        // We depend on all loaded scripts
        var regex = /<script type="text\/javascript" src="(.*?)">/g;
        var filesToAddToZip = [];
        var pushThis;
        while (pushThis = regex.exec(rawHTML)) {
            filesToAddToZip.push(pushThis[1]);
        }
        return filesToAddToZip;
    };
    
    function saveZip(zip) {
        var blob = zip.generate({type:"blob"});
        var projectName = myself.projectName.replace(/[^A-Za-z0-9_]/g, "");
        if (projectName == "") {
            projectName = "untitled";
        }
        saveAs(blob, projectName + ".zip");
    }
    
    function onGetHtmlSuccess(index) {
        // Next thing to do is to get all the files that we depend upon
        var filesToAddToZip = getAllScripts(index);
        
        // And a few extras
        var extraFiles = [getSnapLogoImage(), "agpl.txt", "click.wav"];
        Array.prototype.push.apply(filesToAddToZip, extraFiles);
        
        // Zip everything together.
        var zip = new JSZip();
        zip.file("index.html", index);
        
        var filesLeft = filesToAddToZip.length;
        
        filesToAddToZip.every(function (fileName) {
            if (hadError)
                return false;
            
            function onDownloadSuccess(data) {
                zip.file(fileName, data);
                filesLeft--;
                if (filesLeft == 0) {
                    saveZip(zip);
                }
            }
            
            loadLocalFile(fileName, onDownloadSuccess, showError);
            
            return true;
        });
        
    }
    
    getIndexHtmlContentsWithEmbeddedProject(onGetHtmlSuccess, showError);
}
   
IDE_Morph.prototype.projectMenuSnapAppsModifier = function (menu)
{
    var myself = this;
    menu.addLine();
    menu.addItem(
        'Export to ZIP',
        function () {
            var msg;
            myself.nextSteps([
                function () {
                    msg = myself.showMessage('Zipping project...');
                },
                function () {
                    myself.exportProjectZip();
                },
                function () {
                    msg.destroy();
                }
            ]);
        }
    );
};

function getSnapAppsLogoExtent()
{
    return new Point(210, 28);
}

// The following function adds the "snapAppsIndex" property to all costumes.
WardrobeMorph.prototype.uberUpdateList = WardrobeMorph.prototype.updateList;
WardrobeMorph.prototype.updateList = function () {
    this.sprite.costumes.asArray().forEach(function (costume, index) {
        costume.snapAppsIndex = index;
    });
    return this.uberUpdateList();
}

// This function returns a name including the index for some costume.
CostumeIconMorph.prototype.makeNiceCostumeName = function (aCostume) {
    return "#" + (aCostume.snapAppsIndex + 1) + ": " + aCostume.name
}

// The following function uses makeNiceCostumeName to update the costume name before the 
// createLabel function runs. Afterwards, it swaps it back.
CostumeIconMorph.prototype.uberCreateLabel = CostumeIconMorph.prototype.createLabel;
CostumeIconMorph.prototype.createLabel = function() {
    var oldName = this.object.name;
    this.object.name = this.makeNiceCostumeName(this.object);
    var result = this.uberCreateLabel();
    this.object.name = oldName;
    return result;
}
