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
    return 'scribble/scribble_logo_sm.png';
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

function jsEscape(str)
{
    var ret = str.replace(new RegExp("\"", 'g'), "\\\"");
    var ret = ret.replace(new RegExp("</script>", 'g'), "</scr\"+\"ipt>");
    return ret;
}

function loadLocalFile(filename, success, error) {
    try {

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
                        JSZip.utils.transformTo("string", xhr.response);
                        success(xhr.response);
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

IDE_Morph.prototype.exportProjectZip = function()
{
    var myself = this;
    var hadError = false;
    
    //First thing to do is generate the HTML
    var rawHTML = document.getElementsByTagName('html')[0].innerHTML;
    var html;
    {
        //Save the project as XML, escape it as a JS string
        var escapedProject = jsEscape(this.serializer.serialize(this.stage));
        //Using the current document's HTML...
        html = rawHTML;
        //...replace the code that starts Snap with some that loads that project.
        html = html.replace("new IDE_Morph().openIn(world);",
        "var ide = new IDE_Morph(); ide.openIn(world); ide.rawOpenProjectString(\""
        + escapedProject + "\"); ide.toggleAppMode(true);");
    }
    
    //Next thing to do is to get all the files that we depend upon
    var filesToAddToZip = [];
    {
        //We depend on all loaded scripts
        var regex = /<script type="text\/javascript" src="(.*?)">/g;
        var pushThis;
        while (pushThis = regex.exec(rawHTML)) {
            filesToAddToZip.push(pushThis[1]);
        }
        
        //And a few extras
        filesToAddToZip.push("scriptsPaneTexture.gif");
        filesToAddToZip.push("agpl.txt");
        filesToAddToZip.push("click.wav");
    }
    
    //Zip everything together.
    var zip = new JSZip();
    zip.file("index.html", html);
    for (var i=0; i<filesToAddToZip.length; i++)
    {
        if (hadError)
            break;
        (function(){
            var index = i;
            var scriptFile = filesToAddToZip[i];
            loadLocalFile(scriptFile, function(data)
            {
                zip.file(scriptFile, data);
                filesToAddToZip[index] = "";
                for (var j=0; j<filesToAddToZip.length; j++)
                {
                    if (filesToAddToZip[j] != "")
                        return;
                }
                var content = zip.generate();
                window.open("data:application/zip;base64,"+content);
            }, 
            function(error){
                if (!hadError)
                {
                    hadError = true;
                    var dlg = new DialogBoxMorph();
                    dlg.inform('Error', 'There was an error zipping the file:\n' + error + '\nThis could because of the browser you are using.\nYou may need to do this manually by selecting "Export to HTML" in the file menu,\n and zipping that together with all of Snap\'s files.', myself.world());
                    dlg.addButton(
                        function () {
                            window.open("data:text/plain,"+html);
                            dlg.close();
                        },
                        'Get just HTML'
                    );
                    dlg.fixLayout();
                    dlg.drawNew();
                }
            });
        })();
    }
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
