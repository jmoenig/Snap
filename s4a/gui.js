// userMenu proxy

SpriteIconMorph.prototype.originalUserMenu = SpriteIconMorph.prototype.userMenu;
SpriteIconMorph.prototype.userMenu = function () {
    menu = this.originalUserMenu();
    menu.addLine();
    var myself = this;
    menu.addItem(
            'connect to Arduino',
            function () { 
                myself.object.arduino.attemptConnection();
            });
    menu.addItem(
            'disconnect Arduino',
            function () {
                myself.object.arduino.disconnect();
            });
    return menu;
};

// Snap! menus
// Adding Snap4Arduino extra options to snapMenu, projectMenu and settingsMenu
IDE_Morph.prototype.originalSnapMenu = IDE_Morph.prototype.snapMenu;
IDE_Morph.prototype.snapMenu = function () {
    this.originalSnapMenu();
    var menu = this.world().activeMenu;

    // adding s4a items
    menu.addLine();
    menu.addItem('About Snap4Arduino...', 'aboutSnap4Arduino');
    menu.addLine();
    menu.addItem('Snap4Arduino website', 
        function() {
            window.open('http://snap4arduino.rocks', 'Snap4ArduinoWebsite'); 
        }
    );
    menu.addItem('Snap4Arduino repository',
        function () {
            window.open('http://github.com/bromagosa/Snap4Arduino', 'SnapSource');
        }
    );

    menu.popup(this.world(), this.logo.bottomLeft());
};

IDE_Morph.prototype.originalSettingsMenu = IDE_Morph.prototype.settingsMenu;
IDE_Morph.prototype.settingsMenu = function () {
    this.originalSettingsMenu();

    // adding extra s4a items only for Desktop version
    if (document.title == '') {
        var menu = this.world().activeMenu,
            pos = this.controlBar.settingsButton.bottomLeft();

        menu.addLine();
        // http server option
        menu.addItem(
            (this.isServerOn ? '\u2611 ' : '\u2610 ') + localize('HTTP server'),
                'toggleServer',
                this.isServerOn ? 'uncheck to stop\nHTTP server' : 'check to start\nHTTP server, allowing\nremote control\nof Snap4Arduino'
        );

        // network serial port option
        menu.addItem(
            (Arduino.prototype.networkPortsEnabled ? '\u2611 ' : '\u2610 ') + localize('Network serial ports'),
            function () {
                Arduino.prototype.networkPortsEnabled = !Arduino.prototype.networkPortsEnabled;
                if (Arduino.prototype.networkPortsEnabled) {
                    this.saveSetting('network-ports-enabled', true);
                } else {
                    this.removeSetting('network-ports-enabled');
                }
            },
            Arduino.prototype.networkPortsEnabled ? 'uncheck to disable\nserial ports over\nnetwork' : 'check to enable\nserial ports over\nnetwork'
        );

        menu.popup(this.world(), pos);
    }
};

IDE_Morph.prototype.originalProjectMenu = IDE_Morph.prototype.projectMenu;
IDE_Morph.prototype.projectMenu = function () {
    this.originalProjectMenu();
    var menu = this.world().activeMenu,
        pos = this.controlBar.projectButton.bottomLeft();

    // adding s4a items
    menu.addLine();
    menu.addItem('Open from URL...', 'openFromUrl');
    menu.addItem('Save, share and get URL...', 'saveAndShare');
    menu.addLine();
    menu.addItem(
        'New Arduino translatable project', 
        'createNewArduinoProject',
        'Experimental feature!\nScripts written under this\n'
            + 'mode will be translatable\nas Arduino sketches'
    );

    menu.popup(this.world(), pos);
};

IDE_Morph.prototype.originalApplySavedSettings = IDE_Morph.prototype.applySavedSettings;
IDE_Morph.prototype.applySavedSettings = function () {
    this.originalApplySavedSettings();

    if (this.getSetting('network-ports-enabled')) {
        Arduino.prototype.networkPortsEnabled = true;
    } else {
        Arduino.prototype.networkPortsEnabled = false;
    }

    Arduino.prototype.hostname = this.getSetting('network-serial-hostname') || 'tcp://arduino.local:23';
};

IDE_Morph.prototype.fileImport = function () {
    var myself = this,
        inp = document.createElement('input');
    if (this.filePicker) {
        document.body.removeChild(myself.filePicker);
        this.filePicker = null;
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
    this.filePicker = inp;
    inp.click();
};

IDE_Morph.prototype.aboutSnap4Arduino = function () {
    var dlg, aboutTxt, creditsTxt, translations,
    module, aboutBtn, creditsBtn,
    world = this.world();

    dlg = new DialogBoxMorph();

    this.getURL('version', function (version) {
        
        aboutTxt = 'Snap4Arduino ' + version +'\n'
        + 'Copyright \u24B8 2017 Bernat Romagosa\n'
        + 'bernat@snap4arduino.rocks\n'
        + 'http://snap4arduino.rocks\n\n'

        + 'Copyright \u24B8 2016 Bernat Romagosa and Arduino.org\n'

        + 'Arduino.org supported the development and maintenance\n'
        + 'of Snap4Arduino from June 2016 until August 2017.\n\n'

        + 'Copyright \u24B8 2015 Citilab\n'
        + 'edutec@citilab.eu\n\n'

        + 'Snap4Arduino is a modification of Snap! originally developed\n'
        + 'by the Edutec research group at the Citilab, Cornellà de\n'
        + 'Llobregat (Barcelona).'

        dlg.inform('About Snap4Arduino', aboutTxt, world);
    });
    
    creditsTxt = localize('Contributors')
        + '\n\nErnesto Laval: MacOSX version, architectural decisions,\n'
        + 'several features and bugfixes, Spanish translation\n'
        + 'José García, Joan Güell and Víctor Casado: vision,\n'
        + 'architectural decisions, several bug reports, testing and\n'
        + 'unvaluable help in many other regards\n'
        + 'Joan Guillén: Too many contributions to fit in here, thanks!\n'
        + 'Josep Ferràndiz: Extensive testing, vision\n'
        + 'Frank Hunleth: GNU/Linux 64b version\n'
        + 'Ove Risberg: Network to serial port functionality\n'
        + 'Mareen Przybylla: Early testing, several bug reports,\n'
        + 'German translation, architectural decisions\n'
        + 'Steven Tang and Jeffrey (Ying-Chieh) Chao:\n\t\tSimplified Chinese translation\n'
        + 'Jeffrey (Ying-Chieh) Chao: Traditional Chinese translation\n'
        + 'Alberto Firpo: Italian translation\n'
        + 'Yaroslav Kirov: Ukrainian and Russian translations\n'
        + 'Sjoerd Dirk Meijer: Dutch translation\n'
        + 'Lior Assouline: Hebrew translation\n'
        + 'Manuel Menezes de Sequeira: Portuguese (Portugal) translation\n'
        + 'Hasso Tepper: Estonian translation'
        + 'Triyan W. Nugroho: Bahasa Indonesian translation';

    creditsBtn = dlg.addButton(
        function () {
            dlg.body.text = creditsTxt;
            dlg.body.drawNew();
            aboutBtn.show();
            creditsBtn.hide();
            dlg.fixLayout();
            dlg.drawNew();
            dlg.setCenter(world.center());
        },
        'Contributions...'
    );
    aboutBtn = dlg.addButton(
        function () {
            dlg.body.text = aboutTxt;
            dlg.body.drawNew();
            aboutBtn.hide();
            creditsBtn.show();
            dlg.fixLayout();
            dlg.drawNew();
            dlg.setCenter(world.center());
        },
        'About Snap4Arduino...'
    );
    aboutBtn.hide();
    dlg.fixLayout();
    dlg.drawNew();
};

IDE_Morph.prototype.originalGetCostumesList = IDE_Morph.prototype.getCostumesList;
IDE_Morph.prototype.getCostumesList = function (dirname) {
    var fs = require('fs'),
        dir,
        costumes = [];

    dir = fs.readdirSync(dirname);
    dir.forEach(
        function (each) {
            costumes.push(each);
        }
    );
    costumes.sort(function (x, y) {
        return x < y ? -1 : 1;
    });
    return costumes;
};


// Snap4Arduino logo
IDE_Morph.prototype.createLogo = function () {
    var myself = this;

    if (this.logo) {
        this.logo.destroy();
    }

    this.logo = new Morph();
    this.logo.texture = 's4a_logo_sm.png'; // Overriden
    this.logo.drawNew = function () {
        this.image = newCanvas(this.extent());
        var context = this.image.getContext('2d'),
            gradient = context.createLinearGradient(
                0,
                0,
                this.width(),
                0
        );
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        context.fillStyle = MorphicPreferences.isFlat ?
            myself.frameColor.toString() : gradient;
        context.fillRect(0, 0, this.width(), this.height());
        if (this.texture) {
            this.drawTexture(this.texture);
        }
    };

    this.logo.drawCachedTexture = function () {
        var context = this.image.getContext('2d');
        context.drawImage(
            this.cachedTexture,
            5,
            Math.round((this.height() - this.cachedTexture.height) / 2)
        );
        this.changed();
    };

    this.logo.mouseClickLeft = function () {
        myself.snapMenu();
    };

    this.logo.color = new Color();
    this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
    this.add(this.logo);
};

function homePath() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + ((process.platform == 'win32') ? '\\' : '/')
};

/*
 * Override setLanguage function
 */

IDE_Morph.prototype.originalSetLanguage = IDE_Morph.prototype.setLanguage;
IDE_Morph.prototype.setLanguage = function(lang, callback) {
    var myself = this;

    myself.originalSetLanguage(lang, function() {
        myself.setLanguageS4A(lang, callback);
    });
};

IDE_Morph.prototype.setLanguageS4A = function (lang, callback) {
    // Load language script for s4a related functions
    var s4aTranslation = document.getElementById('s4a-language'),
        s4aSrc = 's4a/lang-' + lang + '.js',
        myself = this;
    if (s4aTranslation) {
        document.head.removeChild(s4aTranslation);
    }
    if (lang === 'en') {
        return this.reflectLanguage('en', callback);
    }
    s4aTranslation = document.createElement('script');
    s4aTranslation.id = 's4a-language';
    s4aTranslation.onload = function () {
        myself.reflectLanguage(lang, callback);
    };
    document.head.appendChild(s4aTranslation);
    s4aTranslation.src = s4aSrc; 
};

// Fix problme with connected board when creating a new project 
// while a board is connected (it is not freed for the new sprites)
IDE_Morph.prototype.originalNewProject = IDE_Morph.prototype.newProject
IDE_Morph.prototype.newProject = function () {
    // Disconnect each sprite before creating the new project
    var sprites = this.sprites.asArray()
    sprites.forEach(function(sprite) {
        if (sprite.arduino && sprite.arduino.board) {
            sprite.arduino.disconnect(true);
        }
    });
    this.originalNewProject();
};

IDE_Morph.prototype.pushProject = function () {
    var projectContents = this.serializer.serialize(this.stage),
    myself = this;

    new DialogBoxMorph(
            null,
            function (url) {
                myself.doPushProject(projectContents, url);
            }
    ).withKey('pushProject').prompt(
        'Push project',
        document.location.hostname + ':8080',
        this.world()
        );
};

IDE_Morph.prototype.doPushProject = function (contents, url) {
    var myself = this,
        http = new XMLHttpRequest();

    http.open('POST', 'http://' + url, true);

    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            myself.inform(
                    'Done',
                    http.responseText);
        } else if (http.readyState === 4 && status !== 200) {
            myself.inform(
                    'Error',
                    http.responseText);
        }
    };

    http.send(contents);
};

IDE_Morph.prototype.openFromUrl = function () {
    this.prompt('Enter project URL', function (url) {
        window.location.href = '#' + url.replace(/.*#/g,'') + '&editMode';
        window.onbeforeunload = nop;
        window.location.reload();
    });
};

IDE_Morph.prototype.saveAndShare = function () {
    var myself = this;

    if (!this.projectName) {
        myself.prompt(
                'Please enter a name for your project', 
                function (name) { 
                    myself.projectName = name;
                    myself.doSaveAndShare();
                });
    } else {
        this.doSaveAndShare();
    }
};

IDE_Morph.prototype.doSaveAndShare = function () {
    var myself = this,
        projectName = this.projectName;

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
            myself.showProjectUrl(projectName);
        },
        this.cloudError()
    )
};

IDE_Morph.prototype.showProjectUrl = function (projectName) {
    var info = new DialogBoxMorph(),
        label = localize('This project is now public at the following URL:'), 
        txt = new InputFieldMorph(
            SnapCloud.urlForMyProject(projectName),
            false, // no numeric
            null, // no choices
            false // readOnly, to get a selected text
        );
    info.labelString = label;
    txt.setWidth(Math.max(txt.contents().text.text.length*6,label.length*8));
    info.createLabel();
    info.addBody(txt);
    info.addButton('ok', 'OK');
    info.drawNew();
    info.fixLayout();
    info.popUp(this.world());
};

// EXPERIMENTAL: Arduino translation mode
IDE_Morph.prototype.createNewArduinoProject = function () {
    var myself = this;
    this.confirm(
        'Replace the current project with a new one?',
        'New Arduino translatable Project',
        function () { myself.newArduinoProject(); });
};

IDE_Morph.prototype.newArduinoProject = function() {
    var myself = this;

    this.newProject();
    SpriteMorph.prototype.initBlocks();

    // toggle codification
    StageMorph.prototype.enableCodeMapping = true;
    this.currentSprite.blocksCache.variables = null;

    // UI changes
    // Ok, these decorator names are getting silly
    if (!this.isArduinoTranslationMode) {
        SpriteMorph.prototype.notSoOriginalBlockTemplates = SpriteMorph.prototype.blockTemplates;
        SpriteMorph.prototype.blockTemplates = function (category) {
            var blocks = this.notSoOriginalBlockTemplates(category);
            if (category === 'variables') {
                blocks = blocks.splice(1);
                blocks = blocks.splice(0, blocks.length - 1);
            }
            return blocks;
        }

        StageMorph.prototype.notSoOriginalBlockTemplates = StageMorph.prototype.blockTemplates;
        StageMorph.prototype.blockTemplates = function (category) {
            var blocks = this.notSoOriginalBlockTemplates(category);
            if (category === 'variables') {
                blocks = blocks.splice(1);
                blocks = blocks.splice(0, blocks.length - 1);
            }
            return blocks;
        }
    }

    // toggle unusable blocks
    var defs = SpriteMorph.prototype.blocks;
   
    SpriteMorph.prototype.categories.forEach(function (category) { 
        Object.keys(defs).forEach(function (selector) {
            if (!defs[selector].transpilable) {
                StageMorph.prototype.hiddenPrimitives[selector] = true;
            }
        });
        myself.flushBlocksCache(category) 
    });

    // hide empty categories
    if (!this.isArduinoTranslationMode) {
        this.categories.children.forEach(function (each) { each.originalPosition = each.position() });
        this.categories.children[9].setPosition(this.categories.children[4].position());
        this.categories.children[8].setPosition(this.categories.children[3].position());
        this.categories.children[7].setPosition(this.categories.children[2].position());
        this.categories.children[5].setPosition(this.categories.children[1].position());
        this.categories.children[1].setPosition(this.categories.children[0].position());

        this.categories.children[0].hide(); // Motion
        this.categories.children[2].hide(); // Looks
        this.categories.children[3].hide(); // Sensing
        this.categories.children[4].hide(); // Sound
        this.categories.children[6].hide(); // Pen

        this.categories.setHeight(this.categories.height() - 30);
    }

    this.isArduinoTranslationMode = true;

    this.currentSprite.paletteCache.variables = null;
    this.refreshPalette();
};

IDE_Morph.prototype.createNewProject = function () {
    var myself = this;
    this.confirm(
            'Replace the current project with a new one?',
            'New Project',
            function () {
                if (myself.isArduinoTranslationMode) {
                    StageMorph.prototype.blockTemplates = StageMorph.prototype.notSoOriginalBlockTemplates;
                    SpriteMorph.prototype.blockTemplates = SpriteMorph.prototype.notSoOriginalBlockTemplates;
                    myself.isArduinoTranslationMode = false;
                    // show all categories
                    
                    myself.categories.children.forEach(function (each) {
                        each.setPosition(each.originalPosition);
                        each.show();
                    });
                    
                    myself.categories.setHeight(myself.categories.height() + 30);
                }
                myself.newProject();
            }
            );
};

IDE_Morph.prototype.version = function () {
    return require('fs').readFileSync('version').toString();
};

// Can't be decorated, and we need to make sure the "other" category
// shows up
IDE_Morph.prototype.createCategories = function () {
    var myself = this;

    if (this.categories) {
        this.categories.destroy();
    }
    this.categories = new Morph();
    this.categories.color = this.groupColor;
    this.categories.silentSetWidth(this.logo.width()); // width is fixed

    function addCategoryButton(category) {
        var labelWidth = 75,
            colors = [
                myself.frameColor,
                myself.frameColor.darker(50),
                SpriteMorph.prototype.blockColor[category]
            ],
            button;

        button = new ToggleButtonMorph(
                colors,
                myself, // the IDE is the target
                function () {
                    myself.currentCategory = category;
                    myself.categories.children.forEach(function (each) {
                        each.refresh();
                    });
                    myself.refreshPalette(true);
                },
                category[0].toUpperCase().concat(category.slice(1)), // label
                function () {  // query
                    return myself.currentCategory === category;
                },
                null, // env
                null, // hint
                null, // template cache
                labelWidth, // minWidth
                true // has preview
                );

        button.corner = 8;
        button.padding = 0;
        button.labelShadowOffset = new Point(-1, -1);
        button.labelShadowColor = colors[1];
        button.labelColor = myself.buttonLabelColor;
        button.fixLayout();
        button.refresh();
        myself.categories.add(button);
        return button;
    }

    function fixCategoriesLayout() {
        var buttonWidth = myself.categories.children[0].width(),
            buttonHeight = myself.categories.children[0].height(),
            border = 3,
            rows =  Math.ceil((myself.categories.children.length) / 2),
            xPadding = (myself.categories.width()
                    - border
                    - buttonWidth * 2) / 3,
            yPadding = 2,
            l = myself.categories.left(),
            t = myself.categories.top(),
            i = 0,
            row,
            col;

        myself.categories.children.forEach(function (button) {
            i += 1;
            row = Math.ceil(i / 2);
            col = 2 - (i % 2);
            button.setPosition(new Point(
                l + (col * xPadding + ((col - 1) * buttonWidth)),
                t + (row * yPadding + ((row - 1) * buttonHeight) + border)
                )
            );
        });

        myself.categories.setHeight(
            (rows + 1) * yPadding
            + rows * buttonHeight
            + 2 * border
            );
    }

    SpriteMorph.prototype.categories.forEach(function (cat) {
        if (!contains(['lists'], cat)) {
            addCategoryButton(cat);
        }
    });
    fixCategoriesLayout();
    this.add(this.categories);
};

// Show URL of public projects in project list
ProjectDialogMorph.prototype.originalInstallCloudProjectList = ProjectDialogMorph.prototype.installCloudProjectList;
ProjectDialogMorph.prototype.installCloudProjectList = function (pl) {
    this.originalInstallCloudProjectList(pl);
    this.addUserMenuToListItems();
};

ProjectDialogMorph.prototype.originalBuildFilterField = ProjectDialogMorph.prototype.buildFilterField;
ProjectDialogMorph.prototype.buildFilterField = function () {
    var myself = this;

    this.originalBuildFilterField();

    this.filterField.originalReactToKeystroke = this.filterField.reactToKeystroke;
    this.filterField.reactToKeystroke = function (evt) {
        this.originalReactToKeystroke(evt);
        myself.addUserMenuToListItems();
    };
};

ProjectDialogMorph.prototype.addUserMenuToListItems = function () {
    var ide = this.ide;
    this.listField.listContents.children.forEach(function (menuItem) {
        if (menuItem.labelBold) { // shared project
            menuItem.userMenu = function () {
                var menu = new MenuMorph(this);
                menu.addItem(
                    'Show project URL',
                    function () {
                        ide.showProjectUrl(menuItem.labelString);
                    });
                return menu;
            };
        }
    });
};

