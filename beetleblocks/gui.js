// Old setExtent function, as the newer one relies on tabBar, which we don't have
IDE_Morph.prototype.setExtent = function (point) {
    var padding = new Point(430, 110),
        minExt,
        ext;

    // determine the minimum dimensions making sense for the current mode
    if (this.isAppMode) {
        minExt = StageMorph.prototype.dimensions.add(
            this.controlBar.height() + 10
        );
    } else {
        minExt = this.isSmallStage ?
                padding.add(StageMorph.prototype.dimensions.divideBy(2))
                      : padding.add(StageMorph.prototype.dimensions);
    }
    ext = point.max(minExt);
    IDE_Morph.uber.setExtent.call(this, ext);
    this.fixLayout();
};

IDE_Morph.prototype.originalCreateLogo = IDE_Morph.prototype.createLogo;
IDE_Morph.prototype.createLogo = function () {
    this.originalCreateLogo();
    this.logo.texture = 'beetleblocks/logo.png';
    this.logo.drawNew();
};

IDE_Morph.prototype.originalNewProject = IDE_Morph.prototype.newProject;
IDE_Morph.prototype.newProject = function () {
    this.originalNewProject();
    this.createStatusDisplay();
};

IDE_Morph.prototype.originalRemoveSprite = IDE_Morph.prototype.removeSprite;
IDE_Morph.prototype.removeSprite = function (sprite) {
    var stage = sprite.parentThatIsA(StageMorph);
    stage.scene.remove(sprite.beetle);
    stage.reRender();
    this.originalRemoveSprite(sprite);
};

IDE_Morph.prototype.originalCreateStage = IDE_Morph.prototype.createStage;
IDE_Morph.prototype.createStage = function () {
    this.originalCreateStage();
    this.setStageSize(1);
};

// Force flat design
IDE_Morph.prototype.setDefaultDesign = IDE_Morph.prototype.setFlatDesign; 

IDE_Morph.prototype.originalInit = IDE_Morph.prototype.init;
IDE_Morph.prototype.init = function (isAutoFill) {
    this.originalInit();

    // Borders are actually just paddings, so we set the bg white to get them to be white
    this.backgroundColor = new Color(255,255,255);
    this.setColor(this.backgroundColor);
};

// Overriding these functions as we cannot proxy them. They don't return a menu, they create one and pop it up
IDE_Morph.prototype.projectMenu = function () {
    var menu,
        myself = this,
        world = this.world(),
        pos = this.controlBar.projectButton.bottomLeft(),
        graphicsName = this.currentSprite instanceof SpriteMorph ?
            'Costumes' : 'Backgrounds',
        shiftClicked = (world.currentKey === 16);

    menu = new MenuMorph(myself);
    menu.addItem('New', 'createNewProject');
    menu.addItem(
            'Import project or blocks',
            function () {
                var inp = document.createElement('input');
                if (myself.filePicker) {
                    document.body.removeChild(myself.filePicker);
                    myself.filePicker = null;
                }
                inp.type = 'file';
                inp.style.color = "transparent";
                inp.style.backgroundColor = "transparent";
                inp.style.border = "none";
                inp.style.outline = "none";
                inp.style.position = "absolute";
                inp.style.top = "0px";
                inp.style.left = "0px";
                inp.style.width = "0px";
                inp.style.height = "0px";
                inp.addEventListener(
                        "change",
                        function () {
                            document.body.removeChild(inp);
                            myself.filePicker = null;
                            world.hand.processDrop(inp.files);
                        },
                        false
                        );
                document.body.appendChild(inp);
                myself.filePicker = inp;
                inp.click();
            },
            'file menu import hint' // looks up the actual text in the translator
                );

    if (SnapCloud.username) {
        menu.addLine();
        menu.addItem('My Profile', function () { window.open('/users/' + SnapCloud.username, true) });
        menu.addItem('My Projects', function () { window.open('/myprojects', true) });
    }
    menu.addItem(
            'Migrate from the old cloud', 
            function () { window.open('/migration', true) },
            'Attempt to perform an automatic\nmigration of all your projects\nin the old cloud');

    menu.addLine();
    menu.addItem('Save                                       Ctrl+S', 'save');
    menu.addItem('Save As...', 'saveProjectsBrowser');

    menu.addLine();
    menu.addItem('Download project as...', 'saveProjectToDisk');
    menu.addItem(
            'Download My Blocks as...',
            function () { myself.exportGlobalBlocks(); },
            'show global custom block definitions as XML\nin a new browser window'
            );

    if (shiftClicked) {
        menu.addItem(
                'Export all scripts as pic...',
                function () { myself.exportScriptsPicture(); },
                'show a picture of all scripts\nand block definitions',
                new Color(100, 0, 0)
                );
    }
    menu.addItem(
            'Download 2D lines as...',
            function () { myself.downloadSVG() },
            'download the currently rendered 2D lines\ninto an SVG file'
            );

    var submenu = new MenuMorph(myself);
    submenu.addItem(
            'STL',
            function () { myself.downloadSTL() },
            'download the currently rendered 3D model\ninto an STL file ready to be printed'
            );
    submenu.addItem(
            'STL (binary)',
            function () { myself.downloadBinarySTL() },
            'download the currently rendered 3D model\ninto an STL file ready to be printed'
            );
    submenu.addItem(
            'OBJ',
            function () { myself.downloadOBJ() },
            'download the currently rendered 3D model\ninto an OBJ file'
            );

    menu.addHoverItem(
            'Download 3D model as...          ▶',
            submenu
            );

    menu.addItem(
        'Libraries...',
        function () {
            myself.getURL(
                myself.resourceURL('libraries', 'LIBRARIES'),
                function (txt) {
                    var libraries = myself.parseResourceFile(txt);
                    new LibraryImportDialogMorph(myself, libraries).popUp();
                }
            );
        },
        'Select categories of additional blocks to add to this project.'
    );

    menu.addLine();

    if (shiftClicked) {
        menu.addItem(
                'Cloud url...',
                'setCloudURL',
                null,
                new Color(100, 0, 0)
                );
        menu.addLine();
    }
    if (!SnapCloud.username) {
        menu.addItem(
                'Login',
                function () { window.open('/login'); }
                );
        menu.addItem(
                'Create an account',
                function () { window.open('/signup'); }
                );
        menu.addItem(
                'Reset Password...',
                'resetCloudPassword'
                );
    } else {
        menu.addItem(
                localize('Logout') + ' / ' + SnapCloud.username,
                'logout'
                );
    }
    menu.addItem(
            'Start tutorial',
            function () {
                myself.startTutorial(world);
            }
            );

    if (shiftClicked) {
        menu.addLine();
        menu.addItem(
                'open shared project from cloud...',
                function () {
                    myself.prompt('Author name…', function (usr) {
                        myself.prompt('Project name...', function (prj) {
                            var id = 'Username=' +
                                encodeURIComponent(usr.toLowerCase()) +
                                '&ProjectName=' +
                                encodeURIComponent(prj);
                            myself.showMessage(
                                    'Fetching project\nfrom the cloud...'
                                    );
                            SnapCloud.getPublicProject(
                                    id,
                                    function (projectData) {
                                        var msg;
                                        if (!Process.prototype.isCatchingErrors) {
                                            window.open(
                                                    'data:text/xml,' + projectData
                                                    );
                                        }
                                        myself.nextSteps([
                                                function () {
                                                    msg = myself.showMessage(
                                                            'Opening project...'
                                                            );
                                                },
                                                function () {nop(); }, // yield (Chrome)
                                                function () {
                                                    myself.rawOpenCloudDataString(
                                                            projectData
                                                            );
                                                },
                                                function () {
                                                    msg.destroy();
                                                }
                                        ]);
                                    },
                                    myself.cloudError()
                                        );

                        }, null, 'project');
                    }, null, 'project');
                },
                null,
                new Color(100, 0, 0)
                    );
    }
    menu.popup(world, pos); 
};

IDE_Morph.prototype.saveProjectToDisk = function () {
    var data,
        blob;

    if (Process.prototype.isCatchingErrors) {
        try {
            data = this.serializer.serialize(this.stage);
        } catch (err) {
            this.showMessage('Saving failed: ' + err);
        }
    } else {
        data = this.serializer.serialize(this.stage);
    }

    blob = new Blob([data], {type: 'text/xml;charset=utf-8'});
    saveAs(blob, (this.projectName ? this.projectName : 'beetleblocks_project') + '.xml');
};

IDE_Morph.prototype.saveAndShare = function () {
    var myself = this,
        projectName = this.projectName;

    if (projectName) {
        this.showMessage('Saving project\nto the cloud...');
        this.setProjectName(projectName);

        SnapCloud.saveProject(
            this,
            function () {
                myself.showMessage('sharing\nproject...');
                SnapCloud.reconnect(
                    function () {
                        SnapCloud.callService(
                            'publishProject',
                            function () {
                                myself.showMessage('shared.', 2);
                            },
                            myself.cloudError(),
                            [
                                projectName,
                                myself.stage.thumbnail(SnapSerializer.prototype.thumbnailSize).toDataURL('image/png')
                            ]
                        );
                    },
                    myself.cloudError()
                );
                prompt('This project is now public at the following URL:', SnapCloud.urlForMyProject(projectName));
            },
            this.cloudError()
        )
    }
};

ProjectDialogMorph.prototype.originalBuildContents = ProjectDialogMorph.prototype.buildContents;
ProjectDialogMorph.prototype.buildContents = function () {
    var notification, myself = this;

    SnapCloud.checkCredentials(
            function (user) {
                if (user.username) {
                    myself.source = 'cloud';
                }
            });

    this.originalBuildContents();

    if (this.ide.cloudMsg) {
        notification = new TextMorph(
                this.ide.cloudMsg,
                10,
                null, // style
                false, // bold
                null, // italic
                null, // alignment
                null, // width
                null, // font name
                new Point(1, 1), // shadow offset
                new Color(255, 255, 255) // shadowColor
                );
        notification.refresh = nop;
        this.srcBar.add(notification);
    }
    if (notification) {
        this.setExtent(new Point(840, 630).add(notification.extent()));
    } else {
        this.setExtent(new Point(840, 630));
    }
    this.fixLayout();
};

ProjectDialogMorph.prototype.deleteProject = function () {
    var myself = this,
    proj,
    idx,
    name;

    if (this.source === 'cloud') {
        proj = this.listField.selected;
        if (proj) {
            this.ide.confirm(
                    localize(
                        'Are you sure you want to delete'
                        ) + '\n"' + proj.ProjectName + '"?',
                    'Delete Project',
                    function () {
                        SnapCloud.deleteProject(
                                proj.ProjectName,
                                function () {
                                    myself.ide.hasChangedMedia = true;
                                    idx = myself.projectList.indexOf(proj);
                                    myself.projectList.splice(idx, 1);
                                    myself.installCloudProjectList(myself.projectList);
                                },
                                function (err, lbl) {
                                    myself.ide.cloudError().call(null, err, lbl);
                                }
                                );
                    }
                    );
        }
    } else { // 'local, examples'
        if (this.listField.selected) {
            name = this.listField.selected.name;
            this.ide.confirm(
                    localize(
                        'Are you sure you want to delete'
                        ) + '\n"' + name + '"?',
                    'Delete Project',
                    function () {
                        delete localStorage['-snap-project-' + name];
                        myself.setSource(myself.source); // refresh list
                    }
                    );
        }
    }
};

ProjectDialogMorph.prototype.shareProject = function () {
    var myself = this,
    ide = this.ide,
    proj = this.listField.selected,
    entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
                localize(
                    'Are you sure you want to publish'
                    ) + '\n"' + proj.ProjectName + '"?',
                'Share Project',
                function () {
                    myself.ide.showMessage('sharing\nproject...');
                    SnapCloud.shareProject(
                            true, // make public
                            proj.ProjectName,
                            function () {
                                proj.Public = 'true';
                                myself.unshareButton.show();
                                myself.shareButton.hide();
                                entry.label.isBold = true;
                                entry.label.drawNew();
                                entry.label.changed();
                                myself.buttons.fixLayout();
                                myself.drawNew();
                                myself.ide.showMessage('shared.', 2);
                            },
                            myself.ide.cloudError()
                            );
                    // Set the Shared URL if the project is currently open
                    if (proj.ProjectName === ide.projectName) {
                        var usr = SnapCloud.username,
                            projectId = 'Username=' +
                                encodeURIComponent(usr.toLowerCase()) +
                                '&ProjectName=' +
                                encodeURIComponent(proj.ProjectName);
                        location.hash = 'present:' + projectId;
                    }
                }
        );
    }
};

ProjectDialogMorph.prototype.unshareProject = function () {
    var myself = this,
    ide = this.ide,
    proj = this.listField.selected,
    entry = this.listField.active;

    if (proj) {
        this.ide.confirm(
                localize(
                    'Are you sure you want to unpublish'
                    ) + '\n"' + proj.ProjectName + '"?',
                'Unshare Project',
                function () {
                    myself.ide.showMessage('unsharing\nproject...');
                    SnapCloud.shareProject(
                            false, // make not public
                            proj.ProjectName,
                            function () {
                                proj.Public = 'false';
                                myself.shareButton.show();
                                myself.unshareButton.hide();
                                entry.label.isBold = false;
                                entry.label.drawNew();
                                entry.label.changed();
                                myself.buttons.fixLayout();
                                myself.drawNew();
                                myself.ide.showMessage('unshared.', 2);
                            },
                            myself.ide.cloudError()
                            );
                    // Remove the shared URL if the project is open.
                    if (proj.ProjectName === ide.projectName) {
                        location.hash = '';
                    }
                }
        );
    }
};

IDE_Morph.prototype.openIn = function (world) {
    var hash, myself = this, urlLanguage = null;

    SnapCloud.checkCredentials(
            function (user) {
                if (user.username) {
                    myself.source = 'cloud';
                }
            });

    this.buildPanes();
    world.add(this);
    world.userMenu = this.userMenu;

    // override SnapCloud's user message with Morphic
    SnapCloud.message = function (string) {
        var m = new MenuMorph(null, string),
            intervalHandle;
        m.popUpCenteredInWorld(world);
        intervalHandle = setInterval(function () {
            m.destroy();
            clearInterval(intervalHandle);
        }, 2000);
    };

    // prevent non-DialogBoxMorphs from being dropped
    // onto the World in user-mode
    world.reactToDropOf = function (morph) {
        if (!(morph instanceof DialogBoxMorph)) {
            if (world.hand.grabOrigin) {
                morph.slideBackTo(world.hand.grabOrigin);
            } else {
                world.hand.grab(morph);
            }
        }
    };

    this.reactToWorldResize(world.bounds);

    function getURL(url) {
        try {
            var request = new XMLHttpRequest();
            request.open('GET', url, false);
            request.send();
            if (request.status === 200) {
                return request.responseText;
            }
            throw new Error('unable to retrieve ' + url);
        } catch (err) {
            myself.showMessage('unable to retrieve project');
            return '';
        }
    }

    // This function returns the value of a parameter given its key
    function getParameterByName(name) {
        var param = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'),
            regex = new RegExp('[\\?&]' + param + '=([^&#]*)'),
        results = regex.exec(location.href);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // dynamic notifications from non-source text files
    // has some issues, commented out for now
    /*
    this.cloudMsg = getURL('http://snap.berkeley.edu/cloudmsg.txt');
    motd = getURL('http://snap.berkeley.edu/motd.txt');
    if (motd) {
        this.inform('Snap!', motd);
    }
    */
    function interpretUrlAnchors() {
        var dict;
        if (location.hash.substr(0, 6) === '#open:') {
            hash = location.hash.substr(6);
            if (hash.charAt(0) === '%'
                    || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                hash = decodeURIComponent(hash);
            }
            if (contains(
                    ['project', 'blocks', 'sprites', 'snapdata'].map(
                        function (each) {
                            return hash.substr(0, 8).indexOf(each);
                        }
                    ),
                    1
                )) {
                this.droppedText(hash);
            } else {
                this.droppedText(getURL(hash));
            }
        } else if (location.hash.substr(0, 5) === '#run:') {
            hash = location.hash.substr(5);
            if (hash.charAt(0) === '%'
                    || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                hash = decodeURIComponent(hash);
            }
            if (hash.substr(0, 8) === '<project>') {
                this.rawOpenProjectString(hash);
            } else {
                this.rawOpenProjectString(getURL(hash));
            }
            this.toggleAppMode(true);
            this.runScripts();
        } else if (location.hash.substr(0, 9) === '#present:') {
            this.shield = new Morph();
            this.shield.color = this.color;
            this.shield.setExtent(this.parent.extent());
            this.parent.add(this.shield);
            myself.showMessage('Fetching project\nfrom the cloud...');

            dict = SnapCloud.parseDict(location.hash.substr(9));

            SnapCloud.getPublicProject(
                SnapCloud.encodeDict(dict),
                function (projectData) {
                    var msg;
                    myself.nextSteps([
                        function () {
                            msg = myself.showMessage('Opening project...');
                        },
                        function () {nop(); }, // yield (bug in Chrome)
                        function () {
                            if (projectData.indexOf('<snapdata') === 0) {
                                myself.rawOpenCloudDataString(projectData);
                            } else if (
                                projectData.indexOf('<project') === 0
                            ) {
                                myself.rawOpenProjectString(projectData);
                            }
                            myself.hasChangedMedia = true;
                        },
                        function () {
                            myself.shield.destroy();
                            myself.shield = null;
                            msg.destroy();

                            if (dict.editMode) {
                                myself.toggleAppMode(false);
                            } else {
                                myself.toggleAppMode(true);
                            }

                            if (!dict.noRun) {
                                myself.runScripts();
                            }

                            if (dict.hideControls) {
                                myself.controlBar.hide();
                                window.onbeforeunload = function () {nop(); };
                            }
                        }
                    ]);
                },
                this.cloudError()
            );
        } else if (location.hash.substr(0, 7) === '#cloud:') {
            this.shield = new Morph();
            this.shield.alpha = 0;
            this.shield.setExtent(this.parent.extent());
            this.parent.add(this.shield);
            myself.showMessage('Fetching project\nfrom the cloud...');

            dict = SnapCloud.parseDict(location.hash.substr(7));

            SnapCloud.getPublicProject(
                SnapCloud.encodeDict(dict),
                function (projectData) {
                    var msg;
                    myself.nextSteps([
                        function () {
                            msg = myself.showMessage('Opening project...');
                        },
                        function () {nop(); }, // yield (bug in Chrome)
                        function () {
                            if (projectData.indexOf('<snapdata') === 0) {
                                myself.rawOpenCloudDataString(projectData);
                            } else if (
                                projectData.indexOf('<project') === 0
                            ) {
                                myself.rawOpenProjectString(projectData);
                            }
                            myself.hasChangedMedia = true;
                        },
                        function () {
                            myself.shield.destroy();
                            myself.shield = null;
                            msg.destroy();
                            myself.toggleAppMode(false);
                        }
                    ]);
                },
                this.cloudError()
            );
        } else if (location.hash.substr(0, 6) === '#lang:') {
            urlLanguage = location.hash.substr(6);
            this.setLanguage(urlLanguage);
            this.loadNewProject = true;
        } else if (location.hash.substr(0, 7) === '#signup') {
            this.createCloudAccount();
        }
    }

    if (this.userLanguage) {
        this.setLanguage(this.userLanguage, interpretUrlAnchors);
    } else {
        interpretUrlAnchors.call(this);
    }
};

// STL export
IDE_Morph.prototype.downloadBinarySTL = function () {
    var exporter = new THREE.STLBinaryExporter(),
        scene = copy(this.stage.scene),
        stlString,
        blob;

    scene.children = scene.children.filter(function (each) { return each.name != 'beetle' });
    stlString = exporter.parse(scene);
    blob = new Blob([stlString], {type: 'text/plain;charset=utf-8'});

    saveAs(blob, (this.projectName ? this.projectName : 'beetleblocks_export') + '.stl'); 
};

IDE_Morph.prototype.downloadSTL = function () {
    var exporter = new THREE.STLExporter(),
        scene = copy(this.stage.scene),
        stlString,
        blob;

    scene.children = scene.children.filter(function (each) { return each.name != 'beetle' });
    stlString = exporter.parse(scene);
    blob = new Blob([stlString], {type: 'text/plain'});
    saveAs(blob, (this.projectName ? this.projectName : 'beetleblocks_export') + '.stl'); 
};


// OBJ export
IDE_Morph.prototype.downloadOBJ = function () {
    var exporter = new THREE.OBJExporter(),
        scene = copy(this.stage.scene),
        objString, 
        blob;

    scene.children = scene.children.filter(function (each) { return each.name != 'beetle' });
    objString = exporter.parse(scene);
    blob = new Blob([objString], {type: 'text/plain;charset=utf-8'});

    saveAs(blob, (this.projectName ? this.projectName : 'beetleblocks_export') + '.obj'); 
};

// SVG export
IDE_Morph.prototype.downloadSVG = function () {
    var lines = [];
    this.stage.myObjects.children.forEach(
            function (element, index, ar){
                if (element instanceof THREE.Line) {
                    lines.push(element);
                } 
            }
            );

    var svgStr = '';

    var minX=0, maxX=0, minZ=0, maxZ=0;
    var scaleMultiplier = 72; // one step is 72px, or 1 in at 72dpi

    lines.forEach(function (line) {

        var red = Math.round(line.material.color.r * 255); 
        var green = Math.round(line.material.color.g * 255); 
        var blue = Math.round(line.material.color.b * 255); 

        if (line.type == 'polyline') {

            svgStr += '    <polyline stroke="rgb(' + red + ',' + green + ',' + blue + ')" '
                + 'fill="none" stroke-width="1" '
                + 'stroke-linecap="round" stroke-linejoin="round" '
                + 'points="';

            line.geometry.vertices.forEach(function (vertex) {
                svgStr += (vertex.x * scaleMultiplier)
                    + ','
                    + (vertex.z * scaleMultiplier)
                    + ' ';

                if (vertex.x < minX) { minX = vertex.x };
                if (vertex.x > maxX) { maxX = vertex.x };
                if (vertex.z < minZ) { minZ = vertex.z };
                if (vertex.z > maxZ) { maxZ = vertex.z };
            });

            svgStr += '"/>\n';

        } else if (line.type == 'spline') {

            svgStr += '    <path stroke="rgb(' + red + ',' + green + ',' + blue + ')" '
                + 'fill="none" stroke-width="1" '
                + 'stroke-linecap="round" stroke-linejoin="round" '
                + 'd="M' + (line.anchorPoints[0].x * scaleMultiplier)
                + ',' + (line.anchorPoints[0].z * scaleMultiplier) + ' ';

            function catmullRomToBezier(points) {

                // taken from https://advancedweb.hu/2014/10/28/plotting_charts_with_svg/

                var result = [];
                for (var i = 0; i < points.length - 1; i++) {
                    var p = [];

                    p.push({
                        x: points[Math.max(i - 1, 0)].x,
                        z: points[Math.max(i - 1, 0)].z
                    });
                    p.push({
                        x: points[i].x,
                        z: points[i].z
                    });
                    p.push({
                        x: points[i + 1].x,
                        z: points[i + 1].z
                    });
                    p.push({
                        x: points[Math.min(i + 2, points.length - 1)].x,
                        z: points[Math.min(i + 2, points.length - 1)].z
                    });

                    var bp = [];
                    bp.push({
                        x: ((-p[0].x + 6 * p[1].x + p[2].x) / 6),
                        z: ((-p[0].z + 6 * p[1].z + p[2].z) / 6)
                    });
                    bp.push({
                        x: ((p[1].x + 6 * p[2].x - p[3].x) / 6),
                        z: ((p[1].z + 6 * p[2].z - p[3].z) / 6)
                    });
                    bp.push({
                        x: p[2].x,
                        z: p[2].z
                    });
                    result.push(bp);
                }

                return result;
            }

            catmullRomToBezier(line.anchorPoints).forEach(function (catmull) {
                svgStr += 'C' + catmull[0].x * scaleMultiplier
                    + ',' + catmull[0].z * scaleMultiplier
                    + ' ' + catmull[1].x * scaleMultiplier
                    + "," + catmull[1].z * scaleMultiplier
                    + " " + catmull[2].x * scaleMultiplier
                    + "," + catmull[2].z * scaleMultiplier
                    + " ";

                if (catmull[0].x < minX) { minX = catmull[0].x };
                if (catmull[0].x > maxX) { maxX = catmull[0].x };
                if (catmull[0].z < minZ) { minZ = catmull[0].z };
                if (catmull[0].z > maxZ) { maxZ = catmull[0].z };
                if (catmull[1].x < minX) { minX = catmull[1].x };
                if (catmull[1].x > maxX) { maxX = catmull[1].x };
                if (catmull[1].z < minZ) { minZ = catmull[1].z };
                if (catmull[1].z > maxZ) { maxZ = catmull[1].z };
                if (catmull[2].x < minX) { minX = catmull[2].x };
                if (catmull[2].x > maxX) { maxX = catmull[2].x };
                if (catmull[2].z < minZ) { minZ = catmull[2].z };
                if (catmull[2].z > maxZ) { maxZ = catmull[2].z };
            });
 
            svgStr += '"/>\n';
        }
    })

    svgStr += '  </g>\n</svg>';

    svgHeader = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" '
        + 'viewBox="' + minZ * scaleMultiplier + ' ' + minX * scaleMultiplier + ' '
        + (maxZ - minZ) * scaleMultiplier + ' ' + (maxX - minX) * scaleMultiplier
        + '" transform = "rotate(-90 0 0)" width="' + (maxZ - minZ) * scaleMultiplier
        + 'px" height="' + (maxX - minX) * scaleMultiplier + 'px">\n  <g transform = "rotate(-90 0 0)">\n';

    svgStr = svgHeader.concat(svgStr);

    blob = new Blob([svgStr], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, (this.projectName ? this.projectName : 'beetleblocks_export') + '.svg'); 
};


// IDE_Morph.prototype.createControlBar proxy
IDE_Morph.prototype.originalCreateControlBar = IDE_Morph.prototype.createControlBar;
IDE_Morph.prototype.createControlBar = function () {
    this.originalCreateControlBar();
    colors = [
        this.controlBar.stageSizeButton.color, 
        this.controlBar.stageSizeButton.labelShadowColor, 
        this.controlBar.stageSizeButton.pressColor
    ];

    var myself = this;

    this.controlBar.cloudButton.destroy();

    this.controlBar.stageSizeButton.labelString = new SymbolMorph('normalStage', 14);
    this.controlBar.stageSizeButton.action = 'setSmallStageSize';
    this.controlBar.stageSizeButton.query = function () {};

    button = new ToggleButtonMorph(
            null, //colors,
            myself, // the IDE is the target
            'setLargeStageSize',
            new SymbolMorph('largeStage', 14)
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.query = function () {};
    button.contrast = this.buttonContrast;
    button.drawNew();
    button.fixLayout();
    button.refresh();
    largeStageSizeButton = button;
    this.controlBar.add(largeStageSizeButton);
    this.controlBar.largeStageSizeButton = button; // for refreshing

    button = new ToggleButtonMorph(
            null, //colors,
            myself, // the IDE is the target
            'setNormalStageSize',
            new SymbolMorph('normalStage', 14)
            );
    button.corner = 12;
    button.color = colors[0];
    button.highlightColor = colors[1];
    button.pressColor = colors[2];
    button.labelMinExtent = new Point(36, 18);
    button.padding = 0;
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = colors[1];
    button.labelColor = this.buttonLabelColor;
    button.query = function () {};
    button.contrast = this.buttonContrast;
    button.drawNew();
    button.fixLayout();
    button.refresh();
    normalStageSizeButton = button;
    this.controlBar.add(normalStageSizeButton);
    this.controlBar.normalStageSizeButton = button; // for refreshing

    this.controlBar.originalFixLayout = this.controlBar.fixLayout;
    this.controlBar.fixLayout = function () {
        this.originalFixLayout();

        this.projectButton.setLeft(this.projectButton.left() + 6);
        this.settingsButton.setLeft(this.projectButton.right() + 5);

        this.largeStageSizeButton.setTop(this.stageSizeButton.top());
        this.largeStageSizeButton.setLeft(this.stageSizeButton.left() - 6);

        this.normalStageSizeButton.setTop(this.stageSizeButton.top());
        this.normalStageSizeButton.setLeft(this.largeStageSizeButton.right() + 5);

        this.stageSizeButton.setLeft(this.normalStageSizeButton.right() + 5);
        this.appModeButton.setLeft(this.stageSizeButton.right() + 5);

        this.appModeButton.action = 'toggleFullscreen';

        this.updateLabel();
    };
};

IDE_Morph.prototype.setLargeStageSize = function () {
    this.setStageSize(1.5);
};
IDE_Morph.prototype.setNormalStageSize = function () {
    this.setStageSize(1);
};

IDE_Morph.prototype.setSmallStageSize = function () {
    this.setStageSize(0.5);
};

IDE_Morph.prototype.setStageSize = function (ratio) {
    this.setStageExtent(new Point(480 * ratio, 360 * ratio))
};

IDE_Morph.prototype.setStageExtent = function (ext) {
    var myself = this,
        world = this.world();

    if (world) { 
        this.controlBar.stageSizeButton.refresh();
    
        StageMorph.prototype.dimensions = ext;
        this.stage.setExtent(ext);
        this.fixLayout();
        this.setExtent(world.extent());
    }

    this.stage.renderer.setSize(ext.x, ext.y);
    this.stage.reRender();
};

// Examples now pulls from local
ProjectDialogMorph.prototype.getExamplesProjectList = function () {
    var dir,
        projects = [];

    dir = JSON.parse(this.ide.getURL('https://api.github.com/repos/ericrosenbaum/BeetleBlocks/contents/run/beetleblocks/examples'));
    dir.forEach(function (each){
        var dta = {
            name: each.name.replace('.xml',''),
            thumb: null,
            notes: null,
            path: each.path.substring(4) // remove '/run' from path
        };
        projects.push(dta)
    })
    projects.sort(function (x, y) {
        return x.name < y.name ? -1 : 1;
    });
    return projects;
};

ProjectDialogMorph.prototype.setSource = function (source) {
    var myself = this,
        msg;

    this.source = source; //this.task === 'save' ? 'local' : source;
    this.srcBar.children.forEach(function (button) {
        button.refresh();
    });
    switch (this.source) {
        case 'cloud':
            msg = myself.ide.showMessage('Updating\nproject list...');
            this.projectList = [];

            //msg.destroy();
            SnapCloud.getProjectList(
                    function (projectList) {
                        myself.installCloudProjectList(projectList);
                        msg.destroy();
                    },
                    function (err, lbl) {
                        msg.destroy();
                        myself.ide.cloudError().call(null, err, lbl);
                    }
                    );
            return;
            break;
        case 'examples':
            this.projectList = this.getExamplesProjectList();
            break;
        case 'local':
            this.projectList = this.getLocalProjectList();
            break;
    }

    this.listField.destroy();
    this.listField = new ListMorph(
            this.projectList,
            this.projectList.length > 0 ?
            function (element) {
                return element.name;
            } : null,
            null,
            function () {myself.ok(); }
            );

    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.drawNew = InputFieldMorph.prototype.drawNew;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    if (this.source === 'local') {
        this.listField.action = function (item) {
            var src, xml;

            if (item === undefined) {return; }
            if (myself.nameField) {
                myself.nameField.setContents(item.name || '');
            }
            if (myself.task === 'open') {

                src = localStorage['-snap-project-' + item.name];
                xml = myself.ide.serializer.parse(src);

                myself.notesText.text = xml.childNamed('notes').contents
                    || '';
                myself.notesText.drawNew();
                myself.notesField.contents.adjustBounds();
                myself.preview.texture = xml.childNamed('thumbnail').contents
                    || null;
                myself.preview.cachedTexture = null;
                myself.preview.drawNew();
            }
            myself.edit();
        };
    } else { // 'examples', 'cloud' is initialized elsewhere
        this.listField.action = function (item) {
            var src, xml;
            if (item === undefined) {return; }
            if (myself.nameField) {
                myself.nameField.setContents(item.name || '');
            }
            src = myself.ide.getURL(item.path);

            xml = myself.ide.serializer.parse(src);
            myself.notesText.text = xml.childNamed('notes').contents
                || '';
            myself.notesText.drawNew();
            myself.notesField.contents.adjustBounds();
            myself.preview.texture = xml.childNamed('thumbnail').contents
                || null;
            myself.preview.cachedTexture = null;
            myself.preview.drawNew();
            myself.edit();
        };
    }
    this.body.add(this.listField);
    this.shareButton.hide();
    this.unshareButton.hide();
    if (this.source === 'local') {
        this.deleteButton.show();
    } else { // examples
        this.deleteButton.hide();
    }
    this.buttons.fixLayout();
    this.fixLayout();
    if (this.task === 'open') {
        this.clearDetails();
    }
};

ProjectDialogMorph.prototype.openProject = function () {

    var myself = this;

    this.ide.confirm(
            'All unsaved changes will be lost.\nContinue loading this project?',
            'Load Project',
            function () { doOpenProject() }
            );

    function doOpenProject() {
        var proj = myself.listField.selected,
            src;
        if (!proj) {return; }
        myself.ide.source = myself.source;
        if (myself.source === 'cloud') {
            myself.openCloudProject(proj);
        } else if (myself.source === 'examples') {
            src = myself.ide.getURL('beetleblocks/examples/' + proj.name + '.xml');
            myself.ide.openProjectString(src);
            myself.destroy();
        } else { // 'local'
            myself.ide.openProject(proj.name);
            myself.destroy();
        }
    }
};

IDE_Morph.prototype.originalRawOpenProjectString = IDE_Morph.prototype.rawOpenProjectString;
IDE_Morph.prototype.rawOpenProjectString = function (str) {
    this.originalRawOpenProjectString(str);
    this.createStatusDisplay();
    this.setStageSize(1);
};

IDE_Morph.prototype.originalRawOpenCloudDataString = IDE_Morph.prototype.rawOpenCloudDataString;
IDE_Morph.prototype.rawOpenCloudDataString = function (str) {
    this.originalRawOpenCloudDataString(str);
    this.createStatusDisplay();
    this.setStageSize(1);
};

ProjectDialogMorph.prototype.rawOpenCloudProject = function (proj) {
    var myself = this;
    SnapCloud.reconnect(
        function () {
            SnapCloud.callService(
                'getProject',
                function (response) {
                    SnapCloud.disconnect();
                    myself.ide.source = 'cloud';
                    myself.ide.droppedText(response[0].SourceCode);
                    if (proj.Public === 'true') {
                        location.hash = '#present:Username=' +
                            encodeURIComponent(SnapCloud.username) +
                            '&ProjectName=' +
                            encodeURIComponent(proj.ProjectName);
                        SnapCloud.postRequest(
                                'project', 
                                {
                                    projectName: proj.ProjectName,
                                    username: SnapCloud.username,
                                    thumbnail: proj.Thumbnail
                                });
                    }
                },
                myself.ide.cloudError(),
                [proj.ProjectName]
            );
        },
        myself.ide.cloudError()
    );
    this.destroy();
};

// Single Sprite mode, no corral and no tabs in the scripting area

IDE_Morph.prototype.createCorralBar = nop;
IDE_Morph.prototype.createCorral = nop;

IDE_Morph.prototype.fixLayout = function (situation) {
    // situation is a string, i.e.
    // 'selectSprite' or 'refreshPalette' or 'tabEditor'
    var padding = this.padding;

    Morph.prototype.trackChanges = false;

    if (situation !== 'refreshPalette') {
        // controlBar
        this.controlBar.setPosition(this.logo.topRight());
        this.controlBar.setWidth(this.right() - this.controlBar.left());
        this.controlBar.fixLayout();

        // categories
        this.categories.padding = this.padding;
        this.categories.setLeft(this.logo.left());
        this.categories.setTop(this.logo.bottom());
    }

    // palette
    this.palette.setLeft(this.logo.left());
    this.palette.setTop(this.categories.bottom() + 1);
    this.palette.setHeight(this.bottom() - this.palette.top());

    if (situation !== 'refreshPalette') {
        // stage
        if (this.isAppMode) {
            this.stage.setScale(Math.floor(Math.min(
                            (this.width() - padding * 2) / this.stage.dimensions.x,
                            (this.height() - this.controlBar.height() * 2 - padding * 2)
                            / this.stage.dimensions.y
                            ) * 10) / 10);
            this.stage.setCenter(this.center());
        } else {
            this.stage.setScale(this.isSmallStage ? this.stageRatio : 1);
            this.stage.setTop(this.logo.bottom() + padding - 1); // We need to subtract 1 as now the border is white
            this.stage.setRight(this.right());
        }

        // spriteEditor
        if (this.spriteEditor.isVisible) {
            this.spriteEditor.setPosition(this.categories.topRight().add(new Point(padding, padding - 1)));
            this.spriteEditor.setExtent(new Point(
                        Math.max(0, this.stage.left() - padding - this.spriteEditor.left()),
                        this.bottom() - this.categories.top()
                        ));
        }

        this.statusDisplay.fixLayout();
    }

    Morph.prototype.trackChanges = true;
    this.changed();
};

IDE_Morph.prototype.buildPanes = function () {
    this.createLogo();
    this.createControlBar();
    this.createCategories();
    this.createPalette();
    this.createStage();
    this.createSpriteEditor();
    // It's easier to make a bogus spriteBar object than to remove all references to it
    this.spriteBar = { 
        tabBar: { 
            tabTo: nop
        }
    };
    this.createStatusDisplay();
};

// Scale buttons, embedded into the script editor
/*
IDE_Morph.prototype.originalCreateSpriteEditor = IDE_Morph.prototype.createSpriteEditor;
IDE_Morph.prototype.createSpriteEditor = function () {
    this.originalCreateSpriteEditor();

    var plusButton = new PushButtonMorph(this, 'scaleBlocksUp', ' + '),
        equalButton = new PushButtonMorph(this, 'resetBlocksScale', ' = '),
        minusButton = new PushButtonMorph(this, 'scaleBlocksDown', ' - ');

    this.spriteEditor.add(plusButton);
    this.spriteEditor.add(equalButton);
    this.spriteEditor.add(minusButton);

    this.spriteEditor.fixLayout = function () {
        var padding = 5;

        minusButton.setLeft(this.left() + this.width() - minusButton.width() - padding);
        minusButton.setTop(this.top() + padding);
        equalButton.setLeft(minusButton.left() - equalButton.width() - padding);
        equalButton.setTop(minusButton.top());
        plusButton.setLeft(equalButton.left() - plusButton.width() - padding);
        plusButton.setTop(minusButton.top());

        minusButton.fixLayout();
        equalButton.fixLayout();
        plusButton.fixLayout();
    }

    this.spriteEditor.fixLayout();
};
*/

IDE_Morph.prototype.scaleBlocksUp = function () {
    this.setBlocksScale(Math.min(SyntaxElementMorph.prototype.scale + 0.25, 12));
};

IDE_Morph.prototype.scaleBlocksDown = function () {
    this.setBlocksScale(Math.max(SyntaxElementMorph.prototype.scale - 0.25, 1));
};

IDE_Morph.prototype.resetBlocksScale = function () {
    this.setBlocksScale(1);
};

IDE_Morph.prototype.originalCreatePalette = IDE_Morph.prototype.createPalette;
IDE_Morph.prototype.createPalette = function (forSearching) {
    this.originalCreatePalette(forSearching);
    this.palette.color = new Color(230, 230, 230);
    return this.palette;
};

IDE_Morph.prototype.createStatusDisplay = function () {
    var frame,
        padding = 1,
        myself = this,
        elements = [],
        beetle = this.currentSprite.beetle,
        stage = this.stage;

    if (this.statusDisplay) {
        this.statusDisplay.destroy();
    }

    this.statusDisplay = new Morph();
    this.statusDisplay.color = this.groupColor;
    this.add(this.statusDisplay);

    frame = new ScrollFrameMorph(null, null, this.sliderColor);
    frame.acceptsDrops = false;
    frame.contents.acceptsDrops = false;

    frame.alpha = 0;

    this.statusDisplay.frame = frame;
    this.statusDisplay.add(frame);

    this.statusDisplay.fixLayout = function () {
        this.setLeft(myself.stage.left());
        this.setTop(myself.stage.bottom() + padding);
        this.setWidth(myself.stage.width());
        this.setHeight(myself.height() - myself.stage.height() - myself.controlBar.height() - padding);
        this.frame.setExtent(this.extent());
        this.arrangeContents();
        this.refresh();
    };

    this.statusDisplay.arrangeContents = function () {
        var x = this.left() + padding,
            y = this.top() + padding,
            max = this.right() - padding,
            start = x,
            middle = (max - start) / 2 + start;

        this.frame.contents.children.forEach(function (element) {
            if (element.flush) { x -= padding };
            element.setPosition(new Point(x, y));
            x += element.width();

            if (element instanceof ToggleMorph) { x+= element.label.width() + 2 };

            if (element.newLines) {
                y += 14 * element.newLines;
                x = start;
            };

            if (element.newColumn) {
                if (element.columns) {
                    x = ((max - start) / element.columns) * element.newColumn + start;
                } else {
                    x = middle;
                }
            };
        });

        this.frame.contents.adjustBounds();
    };

    this.statusDisplay.addElement = function (element) {

        if (typeof element == 'string') {
            if (element == '-') {
                element = new Morph();
                element.setHeight(1);
                element.setWidth(this.width());
                element.setColor(new Color(255,255,255));
                element.newLines = 0.5;
                element.flush = true;
            } else {
                element = new StringMorph(localize(element), 12, null, true);
            }
            if (element.hidden) {
                element.setColor(new Color(0,0,0,0));
            }
        };

        this.frame.contents.add(element);
        this.fixLayout();
    };

    this.statusDisplay.refresh = function () {
        this.frame.contents.children.forEach(function (element) {
            if (element.hasOwnProperty('update')) {
                element.update();
                element.changed();
                element.drawNew();
                element.changed();
            };
        });
    };

    this.statusDisplay.acceptsDrops = function () {
        return false;
    };

    this.statusDisplay.watchers = function (leftPos) {
        /* answer an array of all currently visible watchers.
           If leftPos is specified, filter the list for all
           shown or hidden watchers whose left side equals
           the given border (for automatic positioning) */

        return this.children.filter(function (morph) {
            if (morph instanceof WatcherMorph) {
                if (leftPos) {
                    return morph.left() === leftPos;
                }
                return morph.isVisible;
            }
            return false;
        });
    };

    this.statusDisplay.step = function () {
        // update watchers
        current = Date.now();
        elapsed = current - this.lastWatcherUpdate;
        leftover = (1000 / this.watcherUpdateFrequency) - elapsed;
        if (leftover < 1) {
            this.watchers().forEach(function (w) {
                w.update();
            });
            this.lastWatcherUpdate = Date.now();
        }
    }

    this.statusDisplay.lastWatcherUpdate = Date.now();
    this.statusDisplay.watcherUpdateFrequency = 250;

    // Buttons and toggles

    var space = new Morph();
    space.alpha = 0;
    space.newLines = 0.5;
    elements.push(space);

    var resetCameraButton = new PushButtonMorph(
            null,
            function () { stage.camera.reset() },
            'Reset Camera'
            );
    resetCameraButton.columns = 3;
    resetCameraButton.newColumn = 1;
    elements.push(resetCameraButton);

    var toggleWireframeButton = new ToggleMorph(
            'checkbox',
            null,
            function () {
                stage.renderer.toggleWireframe();
            },
            'Wireframe',
            function () {
                return stage.renderer.isWireframeMode
            });
    toggleWireframeButton.columns = 3;
    toggleWireframeButton.newColumn = 2;
    elements.push(toggleWireframeButton);

    var toggleBeetleButton = new ToggleMorph(
            'checkbox',
            null,
            function () {
                beetle.toggleVisibility();
            },
            'Beetle',
            function () {
                return beetle.shape.visible;
            }

            );
    toggleBeetleButton.newLines = 2;
    elements.push(toggleBeetleButton);

    var fitCameraButton = new PushButtonMorph(
            null,
            function () { stage.camera.fitScene() },
            'Zoom to fit'
            );
    fitCameraButton.columns = 3;
    fitCameraButton.newColumn = 1;
    elements.push(fitCameraButton);

    var toggleParallelProjectionButton = new ToggleMorph(
            'checkbox',
            null,
            function () {
                stage.renderer.toggleParallelProjection();
            },
            'Parallel projection',
            function () {
                return stage.renderer.isParallelProjection
            });
    toggleParallelProjectionButton.columns = 3;
    toggleParallelProjectionButton.newColumn = 2;
    elements.push(toggleParallelProjectionButton);

    var toggleAxesButton = new ToggleMorph(
            'checkbox',
            null,
            function () {
                stage.renderer.toggleAxes();
            },
            'Axes',
            function () {
                return stage.renderer.showingAxes;
            });
    toggleAxesButton.newLines = 2;
    elements.push(toggleAxesButton);

    var space = new Morph();
    space.alpha = 0;
    space.columns = 3;
    space.newColumn = 1;

    elements.push(space);

    var toggleTurboButton = new ToggleMorph(
            'checkbox',
            null,
            function () {
                myself.toggleFastTracking();
            },
            'Turbo mode',
            function () {
                return stage.isFastTracked
            });
    toggleTurboButton.columns = 3;
    toggleTurboButton.newColumn = 2;
    elements.push(toggleTurboButton);

    var toggleGridButton = new ToggleMorph(
            'checkbox',
            null,
            function () {
                stage.scene.grid.toggle();
            },
            'Grid',
            function () {
                return stage.scene.grid.visible
            });
    toggleGridButton.newLines = 1.5;
    elements.push(toggleGridButton);

    elements.push('-');

    // Status watchers

    elements.push('Position ');

    var space = new Morph();
    space.alpha = 0;
    space.columns = 9;
    space.newColumn = 1;
    elements.push(space);

    element = new StringMorph();
    element.update = function () { this.text = 'x: ' + beetle.position.z.toFixed(2).toString().replace('.00','') }; 
    element.newColumn = true;
    elements.push(element);

    var space = new Morph();
    space.alpha = 0;
    space.columns = 9;
    space.newColumn = 3;
    elements.push(space);
 
    elements.push('Rotation ');

    var space = new Morph();
    space.alpha = 0;
    space.columns = 9;
    space.newColumn = 4;
    elements.push(space);

    element = new StringMorph();
    element.update = function () { this.text = 'x:' + degrees(beetle.rotation.z * -1).toFixed(2).toString().replace('.00','') };
    elements.push(element);

    var space = new Morph();
    space.alpha = 0;
    space.columns = 9;
    space.newColumn = 6;
    elements.push(space);

    elements.push('Scale: ');
    element = new StringMorph();
    element.update = function () {
        this.text = beetle.multiplierScale.toString() 
            + ' (' + (beetle.multiplierScale * 100).toString() + '%)'
    }
    element.newLines = 1;
    elements.push(element);

    var space = new Morph();
    space.alpha = 0;
    space.columns = 9;
    space.newColumn = 1;
    elements.push(space);

    element = new StringMorph();
    element.update = function () { this.text = 'y: ' + beetle.position.x.toFixed(2).toString().replace('.00','') }; 
    element.newColumn = true;
    elements.push(element);

    var space = new Morph();
    space.alpha = 0;
    space.columns = 9;
    space.newColumn = 4;
    elements.push(space);

    element = new StringMorph();
    element.update = function () { this.text = 'y:' + degrees(beetle.rotation.x * -1).toFixed(2).toString().replace('.00','') };
    element.newLines = 1;
    elements.push(element);

    var space = new Morph();
    space.alpha = 0;
    space.columns = 9;
    space.newColumn = 1;
    elements.push(space);

    element = new StringMorph();
    element.update = function () { this.text = 'z: ' + beetle.position.y.toFixed(2).toString().replace('.00','') }; 
    element.newColumn = true;
    elements.push(element);

    var space = new Morph();
    space.alpha = 0;
    space.columns = 9;
    space.newColumn = 4;
    elements.push(space);

    element = new StringMorph();
    element.update = function () { this.text = 'z:' + degrees(beetle.rotation.y).toFixed(2).toString().replace('.00','') };
    element.newLines = 2;
    elements.push(element);

    elements.push('-');
    
    elements.push('HSL: ');
    element = new StringMorph();
    element.update = function () {
        this.text = beetle.color.state.h.toFixed(2).toString().replace('.00','') + ', ' 
            + beetle.color.state.s.toFixed(2).toString().replace('.00','') + ', ' 
            + beetle.color.state.l.toFixed(2).toString().replace('.00','') + ' '
    };
    elements.push(element);

    element = new Morph();
    element.update = function () {
        this.setColor(new Color(beetle.color.r * 255, beetle.color.g * 255, beetle.color.b * 255));
    }
    element.setWidth(30);
    element.setHeight(12);
    element.newColumn = true;
    elements.push(element);

    elements.push('Opacity: ');
    element = new StringMorph();
    element.update = function () {
        this.text = (beetle.shape.material.opacity * 100).toFixed(2).toString().replace('.00','') + '%'
    }
    elements.push(element);

    // Add all contents

    elements.forEach(function (each) { myself.statusDisplay.addElement(each) });
};

IDE_Morph.prototype.selectSprite = function (sprite) {
    this.currentSprite = sprite;
    this.createPalette();
    this.createSpriteEditor();
    this.fixLayout('selectSprite');
    this.currentSprite.scripts.fixMultiArgs();
};

IDE_Morph.prototype.toggleAppMode = nop;

IDE_Morph.prototype.toggleFullscreen = function (appMode) {
    var world = this.world(),
        myself = this,
        elements = [
            this.logo,
            this.controlBar.projectButton,
            this.controlBar.settingsButton,
            this.controlBar.stageSizeButton,
            this.controlBar.normalStageSizeButton,
            this.controlBar.largeStageSizeButton,
            this.spriteEditor,
            this.palette,
            this.statusDisplay,
            this.categories ];

    // The wonderful world of the web
    document.removeEventListener('fullscreenchange', doToggleAppMode);
    document.removeEventListener('mozfullscreenchange', doToggleAppMode);
    document.removeEventListener('webkitfullscreenchange', doToggleAppMode);
    document.removeEventListener('msfullscreenchange', doToggleAppMode);

    document.addEventListener('fullscreenchange', doToggleAppMode, false);
    document.addEventListener('mozfullscreenchange', doToggleAppMode, false);
    document.addEventListener('webkitfullscreenchange', doToggleAppMode, false);
    document.addEventListener('msfullscreenchange', doToggleAppMode, false);
    
    Morph.prototype.trackChanges = false;
    this.isAppMode = isNil(appMode) ? !this.isAppMode : appMode;

    if (this.isAppMode) {
        var elem = world.worldCanvas;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    if (this.forceNoFullscreen) { doToggleAppMode() };

    function doToggleAppMode() {
        var isFullscreen = myself.forceNoFullscreen 
            && (document.fullscreen 
            || document.mozFullScreen 
            || document.webkitIsFullScreen 
            || document.msFullscreenElement);

        if (isFullscreen || this.isAppMode) {
            var ext = new Point(window.outerWidth, window.outerHeight);

            myself.isAppMode = true;

            myself.setExtent(ext);
            myself.stage.renderer.setSize(ext.x, ext.y);
            myself.stage.camera.aspect = ext.x / ext.y;
            myself.stage.camera.updateProjectionMatrix();
            myself.stage.setExtent(ext);
            myself.stage.setLeft(0);
            myself.stage.setTop(0);

            myself.stage.add(myself.controlBar);
            myself.controlBar.alpha = 0;

            elements.forEach(function (e) {
                e.hide();
            });

            world.children.forEach(function (morph) {
                if (morph instanceof DialogBoxMorph) {
                    morph.hide();
                }
            });

        } else if (!isFullscreen || !this.isAppMode) {
            myself.isAppMode = false;

            myself.add(myself.controlBar);
            myself.controlBar.setColor(myself.frameColor);
            elements.forEach(function (e) {
                e.show();
            });
            myself.setStageSize(1);
            myself.stage.camera.aspect = 4/3;
            myself.stage.camera.updateProjectionMatrix();
            // show all hidden dialogs
            world.children.forEach(function (morph) {
                if (morph instanceof DialogBoxMorph) {
                    morph.show();
                }
            });
            // prevent scrollbars from showing when morph appears
            world.allChildren().filter(function (c) {
                return c instanceof ScrollFrameMorph;
            }).forEach(function (s) {
                s.adjustScrollBars();
            });
            myself.setExtent(world.extent());
        }
    }
};

// Addressing #54: Stage occasionally goes blank
IDE_Morph.prototype.originalRefreshPalette = IDE_Morph.prototype.refreshPalette;
IDE_Morph.prototype.refreshPalette = function (shouldIgnorePosition) {
    this.originalRefreshPalette(shouldIgnorePosition);
    this.stage.reRender();
};

// Language

IDE_Morph.prototype.originalSetLanguage = IDE_Morph.prototype.setLanguage;
IDE_Morph.prototype.setLanguage = function (lang, callback) {
    var myself = this;

    myself.originalSetLanguage(lang, function () {
        var translation = document.getElementById('bb-language'),
            src = 'beetleblocks/lang-' + lang + '.js',
            myInnerSelf = this;
        if (translation) {
            document.head.removeChild(translation);
        }
        if (lang === 'en') {
            return this.reflectLanguage('en', callback);
        }
        translation = document.createElement('script');
        translation.id = 'bb-language';
        translation.onload = function () {
            myInnerSelf.reflectLanguage(lang, callback);
        };
        document.head.appendChild(translation);
        translation.src = src; 
    });
};

// Stack copying
IDE_Morph.prototype.originalDroppedText = IDE_Morph.prototype.droppedText;
IDE_Morph.prototype.droppedText = function (aString, name) {
    this.originalDroppedText(aString, name);
    if (aString.indexOf('<script') === 0) {
        return this.openScriptString(aString, true);
    }
};

IDE_Morph.prototype.openScriptString = function (str) {
    var msg,
        myself = this;
    this.nextSteps([
        function () {
            msg = myself.showMessage('Opening script...');
        },
        function () {nop(); }, // yield (bug in Chrome)
        function () {
            myself.rawOpenScriptsString(str);
        },
        function () {
            msg.destroy();
        }
    ]);
};

IDE_Morph.prototype.rawOpenScriptsString = function (str) {
    var xml,
        script,
        scripts = this.currentSprite.scripts,
        world = this.world(),
        dropPosition = world.hand.position(),
        myself = this;

    if (Process.prototype.isCatchingErrors) {
        try {
            xml = this.serializer.parse(str);
            script = this.serializer.loadScript(xml);
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        xml = this.serializer.loadScript(str);
        script = this.serializer.loadScript(xml);
    }

    scripts.add(script);
    
    if (world.topMorphAt(dropPosition) !== scripts) {
        dropPosition = new Point(
            scripts.left() + scripts.cleanUpMargin,
            scripts.top() + scripts.cleanUpMargin);
    }

    script.setCenter(dropPosition);
    scripts.adjustBounds();
    
    this.showMessage(
        'Imported Script.',
        2
    );
};

