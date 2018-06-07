/* global RoomMorph, IDE_Morph, StageMorph, List, SnapCloud, VariableFrame,
   WebSocketManager, SpriteMorph, Point, RoomEditorMorph, localize, Process,
   Morph, AlignmentMorph, ToggleButtonMorph, StringMorph, Color, TabMorph,
   InputFieldMorph, MorphicPreferences, ToggleMorph, MenuMorph, TextMorph
   NetsBloxSerializer, nop, SnapActions, DialogBoxMorph, hex_sha512, SnapUndo,
   ScrollFrameMorph, SnapUndo, LibraryImportDialogMorph, CollaboratorDialogMorph,
   SnapSerializer, isRetinaSupported, isRetinaEnabled, useBlurredShadows,
   BlockMorph, SyntaxElementMorph, ScriptsMorph, InputSlotDialogMorph, ArgMorph,
   BlockLabelPlaceHolderMorph, TableMorph, newCanvas*/
// Netsblox IDE (subclass of IDE_Morph)

NetsBloxMorph.prototype = new IDE_Morph();
NetsBloxMorph.prototype.constructor = NetsBloxMorph;
NetsBloxMorph.uber = IDE_Morph.prototype;

function NetsBloxMorph(isAutoFill) {
    this.init(isAutoFill);
}

NetsBloxMorph.prototype.init = function (isAutoFill) {
    // Create the websocket manager
    this.sockets = new WebSocketManager(this);
    this.room = null;

    // initialize inherited properties:
    NetsBloxMorph.uber.init.call(this, isAutoFill);
    this.serializer = new NetsBloxSerializer();
};

NetsBloxMorph.prototype.buildPanes = function () {
    this.createRoom();
    NetsBloxMorph.uber.buildPanes.call(this);
};

NetsBloxMorph.prototype.openIn = function (world) {
    var myself = this,
        onConnect = this.sockets.onConnect,
        hasUrlAnchors = location.href.indexOf('?') > -1 || location.hash,
        opened = false;

    this.projectName = 'myRole';

    if (hasUrlAnchors) {
        var m = new MenuMorph(null, 'Loading...');
        m.popUpCenteredInWorld(world);

        var startTime = Date.now();
        this.sockets.onConnect = function() {
            m.destroy();
            opened = true;
            myself.sockets.onConnect = onConnect;
            NetsBloxMorph.uber.openIn.call(myself, world);
            myself.sockets.onConnect();
            return;
        };

        setTimeout(function() {
            if (!opened) {  // Make sure it opens regardless
                m.destroy();
                NetsBloxMorph.uber.openIn.call(myself, world);
            }
        }, 500);

    } else {
        NetsBloxMorph.uber.openIn.call(myself, world);
    }
};

NetsBloxMorph.prototype.newRole = function (name) {
    // Initialize a new role locally
    this.clearProject();
    this.sprites.asArray().concat(this.stage).forEach(function(sprite) {
        return SnapActions.loadOwner(sprite);
    });
    this.silentSetProjectName(name);
};

NetsBloxMorph.prototype.clearProject = function () {
    this.source = SnapCloud.username ? 'cloud' : 'local';
    if (this.stage) {
        this.stage.destroy();
    }
    if (location.hash.substr(0, 6) !== '#lang:') {
        location.hash = '';
    }
    this.globalVariables = new VariableFrame();
    this.currentSprite = new SpriteMorph(this.globalVariables);
    this.sprites = new List([this.currentSprite]);
    StageMorph.prototype.dimensions = new Point(480, 360);
    StageMorph.prototype.hiddenPrimitives = {};
    StageMorph.prototype.codeMappings = {};
    StageMorph.prototype.codeHeaders = {};
    StageMorph.prototype.enableCodeMapping = false;
    StageMorph.prototype.enableInheritance = false;
    StageMorph.prototype.enableSublistIDs = false;
    SpriteMorph.prototype.useFlatLineEnds = false;
    Process.prototype.enableLiveCoding = false;
    this.silentSetProjectName('');
    this.projectNotes = '';
    this.createStage();
    this.add(this.stage);
    this.createCorral();
    this.selectSprite(this.stage.children[0]);
    this.fixLayout();
    //SnapActions.disableCollaboration();
    //SnapUndo.reset();
};

NetsBloxMorph.prototype.cloudMenu = function () {
    var menu = NetsBloxMorph.uber.cloudMenu.call(this);

    // Edit the menu
    menu.children.forEach(function(child) {
        if (child.action === 'promptCollaboration') {
            menu.removeChild(child);
        }
    });

    if (SnapCloud.username && this.room.isOwner()) {
        menu.addLine();
        menu.addItem(
            'Collaborators...',
            'manageCollaborators'
        );
    }

    return menu;
};

NetsBloxMorph.prototype.settingsMenu = function () {
    var menu = NetsBloxMorph.uber.settingsMenu.call(this);

    menu.items = menu.items.filter(function(item) {
        var action = item[1].toString();
        return action !== 'toggleCollaborativeEditing';
    });

    return menu;
};

NetsBloxMorph.prototype.newProject = function (projectName) {
    this.clearProject();
    this.sprites.asArray().concat(this.stage).forEach(function(sprite) {
        return SnapActions.loadOwner(sprite);
    });

    // Get new room name
    this.sockets.sendMessage({
        type: 'create-room',
        role: projectName || RoomMorph.DEFAULT_ROLE
    });

    this.silentSetProjectName(projectName || RoomMorph.DEFAULT_ROLE);
    this.createRoom();
    this.selectSprite(this.stage.children[0]);
    if (!projectName) {
        this.updateUrlQueryString();
    }
};

NetsBloxMorph.prototype.createRoom = function() {
    this.room = new RoomMorph(this);
};

// Creating the 'projects' view for the room
NetsBloxMorph.prototype.createSpriteEditor = function() {
    if (this.currentTab === 'room') {
        if (this.spriteEditor) {
            this.spriteEditor.destroy();
        }

        this.spriteEditor = new RoomEditorMorph(this.room, this.sliderColor);
        this.spriteEditor.color = this.groupColor;
        this.add(this.spriteEditor);
    } else {
        NetsBloxMorph.uber.createSpriteEditor.call(this);
    }
};

NetsBloxMorph.prototype.promptExitTraceReplay = function (onExit) {
    var myself = this;
    this.confirm(
        'The given action cannot be applied while replaying network trace. \n' +
        'Would you like to stop replaying the network trace?',
        'Stop replaying network trace?',
        function() {
            if (this.currentTab === 'room') {
                this.spriteEditor.exitReplayMode();
            } else {
                myself.room.stopTraceReplay();
            }
            onExit();
        }
    );
};

NetsBloxMorph.prototype.promptExitTraceCapture = function (onExit) {
    var myself = this;
    this.confirm(
        'The given action cannot be applied while capturing network trace. \n' +
        'Would you like to stop capturing the network trace?',
        'Stop capturing network trace?',
        function() {
            myself.room.endTrace();
            onExit();
        }
    );
};

NetsBloxMorph.prototype.setProjectName = function (string) {
    this.room.setRoleName(string);
};

NetsBloxMorph.prototype.silentSetProjectName = function (string) {
    return NetsBloxMorph.uber.setProjectName.call(this, string);
};

NetsBloxMorph.prototype.createControlBar = function () {
    var myself = this,
        padding = 5;

    NetsBloxMorph.uber.createControlBar.call(this);

    this.controlBar.updateLabel = function () {
        var headerName = myself.room.name,
            suffix = '';

        if (myself.room.getRoleNames().length > 1) {
            headerName = (myself.projectName || localize('untitled'));
            suffix = ' @ ' + myself.room.name;
        }

        suffix += myself.world().isDevMode ?
            ' - ' + localize('development mode') : '';

        if (this.label) {
            this.label.destroy();
        }
        if (myself.isAppMode) {
            return;
        }

        this.label = new StringMorph(
            headerName + suffix,
            14,
            'sans-serif',
            true,
            false,
            false,
            MorphicPreferences.isFlat ? null : new Point(2, 1),
            myself.frameColor.darker(myself.buttonContrast)
        );
        this.label.color = myself.buttonLabelColor;
        this.label.drawNew();
        this.add(this.label);
        this.label.setCenter(this.center());
        this.label.setLeft(this.settingsButton.right() + padding);
    };
};

NetsBloxMorph.prototype.loadNextRoom = function () {
    if (this.room.nextRoom) {
        var next = this.room.nextRoom;
        this.room.silentSetRoomName(next.roomName);
        this.room.ownerId = next.ownerId;
        this.silentSetProjectName(next.roleId);

        // Send the message to the server
        this.sockets.updateRoomInfo();

        this.room.nextRoom = null;
    }
};

NetsBloxMorph.prototype.rawOpenCloudDataString = function (model, parsed) {
    var project;
    StageMorph.prototype.hiddenPrimitives = {};
    StageMorph.prototype.codeMappings = {};
    StageMorph.prototype.codeHeaders = {};
    StageMorph.prototype.enableCodeMapping = false;
    StageMorph.prototype.enableInheritance = false;
    StageMorph.prototype.enableSublistIDs = false;
    Process.prototype.enableLiveCoding = false;
    SnapActions.disableCollaboration();
    SnapUndo.reset();
    if (Process.prototype.isCatchingErrors) {
        try {
            // NetsBlox addition: start
            model = parsed ? model : this.serializer.parse(model);
            // NetsBlox addition: end
            this.serializer.loadMediaModel(model.childNamed('media'));
            project = this.serializer.openProject(
                this.serializer.loadProjectModel(
                    model.childNamed('project'),
                    this
                ),
                this
            );
            // NetsBlox addition: start
            // Join the room
            this.loadNextRoom();
            // NetsBlox addition: end
        } catch (err) {
            this.showMessage('Load failed: ' + err);
        }
    } else {
        // NetsBlox addition: start
        model = parsed ? model : this.serializer.parse(model);
        // NetsBlox addition: end
        this.serializer.loadMediaModel(model.childNamed('media'));
        project = this.serializer.openProject(
            this.serializer.loadProjectModel(
                model.childNamed('project'),
                this
            ),
            this
        );
        // NetsBlox addition: start
        // Join the room
        this.loadNextRoom();
        // NetsBlox addition: end
    }
    this.stopFastTracking();
    return project;
};

NetsBloxMorph.prototype.createSpriteBar = function () {
    NetsBloxMorph.uber.createSpriteBar.call(this);

    var myself = this,
        tabBar = this.spriteBar.tabBar,
        tabCorner = 15,
        tabColors = this.tabColors,
        tab;

    // tabBar.fixLayout (called in the IDE_Morph) results in changing the
    // order of the children. Unfortunately, this results in the order being
    // messed up if we don't restore the original order before our call to
    // fixLayout (after adding our additional tab)
    var tabOrder = ['Scripts', 'Costumes', 'Backgrounds', 'Sounds'];
    tabBar.children.sort(function(tab1, tab2) {
        var i1 = tabOrder.indexOf(tab1.labelString),
            i2 = tabOrder.indexOf(tab2.labelString);

        i1 = i1 === -1 ? Infinity : i1;
        i2 = i2 === -1 ? Infinity : i2;
        return i1 < i2 ? -1 : 1;
    });

    tab = new TabMorph(
        tabColors,
        null, // target
        function () {
            SnapActions.selectTab('room');
            tabBar.tabTo('room');
        },
        localize('Room'), // label
        function () {  // query
            return myself.currentTab === 'room';
        }
    );
    tab.padding = 3;
    tab.corner = tabCorner;
    tab.edge = 1;
    tab.labelShadowOffset = new Point(-1, -1);
    tab.labelShadowColor = tabColors[1];
    tab.labelColor = this.buttonLabelColor;
    tab.drawNew();
    tab.fixLayout();
    tabBar.add(tab);

    tabBar.fixLayout();
    tabBar.children.forEach(function (each) {
        each.refresh();
    });
};

NetsBloxMorph.prototype.projectMenu = function () {
    var myself = this,
        menu = NetsBloxMorph.uber.projectMenu.call(this),
        shiftClicked = (this.world().currentKey === 16),
        item;

    if (shiftClicked) {
        menu.items.splice(10, 0, [
            localize('Export role...'),
            function () {
                if (myself.projectName) {
                    myself.exportRole(myself.projectName, shiftClicked);
                } else {
                    myself.prompt('Export Project As...', function (name) {
                        // false - override the shiftClick setting to use XML
                        // true - open XML in a new tab
                        myself.exportRole(name, false, true);
                    }, null, 'exportRole');
                }
            },
            'save "' + myself.projectName + '" as XML\nto your downloads folder',
            new Color(100, 0, 0)
        ]);
    }

    if (this.stage.deletableMessageNames().length && !this.stage.globalBlocks.length) {
        menu.items.splice(10, 0, [
            'Export blocks/msgs...',
            'exportGlobalBlocks',
            'show global custom block definitions/message types as XML' +
                '\nin a new browser window'
        ]);
    }

    menu.items = menu.items.filter(function(item) {
        var action = item[1];
        if (myself.room.isGuest() && action === 'save') {
            return false;
        }
        return true;
    });

    var isSavingToCloud = this.source.indexOf('cloud') > -1;
    if (SnapCloud.username && !this.room.isOwner()) {
        item = ['Save a Copy', 'saveACopy'];
        var itemIndex = menu.items.map(function(item) {
            return item[1];
        }).indexOf('save');

        menu.items.splice(itemIndex+1, 0, item);
    } else if (isSavingToCloud && this.room.hasMultipleRoles()) {
        // Change the label to 'Save Role' if multiple roles
        var saveItem = menu.items.find(function(item) {
            return item[1] === 'save';
        });
        saveItem[0] = localize('Save Role');
    }

    item = [
        'Services...',
        function () {
            var names = this.getMediaList('rpc'),
                headerText = localize('Import') + ' ' + localize('Service'),
                mediaMenu = new MenuMorph(
                    myself,
                    headerText
                );

            names.forEach(function (item) {
                mediaMenu.addItem(
                    item.name,
                    function () {
                        var url = myself.resourceURL('rpc', item.fileName);
                        myself.droppedText(myself.getURL(url), name);
                    },
                    item.help
                );
            });
            mediaMenu.popup(myself.world(), myself.controlBar.projectButton.bottomLeft());
        },
        'Select services to include in this project.'
    ];
    menu.items.splice(menu.items.length-2, 0, item);

    return menu;
};

NetsBloxMorph.prototype.requestAndroidApp = function(name) {
    var myself = this,
        projectXml,
        req,
        params,
        baseURL = ensureFullUrl('/');

    // FIXME: this baseURL stuff could cause problems
    if (name !== this.projectName) {
        this.setProjectName(name);
    }

    projectXml = encodeURIComponent(
        this.serializer.serialize(this.stage)
    );
    // POST request with projectName, xml, username
    req = new XMLHttpRequest();
    params = 'projectName=' + name + '&username=' +
        SnapCloud.username + '&xml=' + projectXml +
        '&baseURL=' + encodeURIComponent(baseURL);

    req.open('post', baseURL + 'api/mobile/compile', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onload = function() {
        myself.showMessage(req.responseText);
    };
    req.send(params);
};

NetsBloxMorph.prototype.exportRole = NetsBloxMorph.prototype.exportProject;

// Trigger the export
NetsBloxMorph.prototype.exportProject = function () {
    this.showMessage('Exporting...', 3);

    if (this.room.getRoleCount() === 1) {
        // If only one role, we should just create the room xml locally
        this.exportSingleRoleXml();
    } else {  // Trigger server export of all roles
        this.exportMultiRoleXml();
    }
};

NetsBloxMorph.prototype.exportMultiRoleXml = function () {
    this.sockets.sendMessage({
        type: 'export-room',
        action: 'export'
    });
};

NetsBloxMorph.prototype.getSerializedRole = function () {
    var data = this.sockets.getSerializedProject();
    return this.serializer.format(
        '<role name="@">%</role>',
        this.room.getCurrentRoleName(),
        data.SourceCode + data.Media
    );

};

NetsBloxMorph.prototype.exportSingleRoleXml = function () {
    // Get the role xml
    try {
        var str = this.serializer.format(
            '<room name="@" app="@">%</room>',
            this.room.name,
            this.serializer.app,
            this.getSerializedRole()
        );
        this.exportRoom(str);
    } catch (err) {
        if (Process.prototype.isCatchingErrors) {
            this.showMessage('Export failed: ' + err);
        } else {
            throw err;
        }
    }
};

NetsBloxMorph.prototype.exportRoom = function (str) {
    var name = this.room.name;

    try {
        this.saveXMLAs(str, name);
        this.showMessage('Exported!', 1);
    } catch (err) {
        if (Process.prototype.isCatchingErrors) {
            this.showMessage('Export failed: ' + err);
        } else {
            throw err;
        }
    }
};

// Open the room
NetsBloxMorph.prototype.openRoomString = function (str) {
    var room = this.serializer.parse(str),
        roles = {},
        role;

    // remove empty (malformed) roles
    room.children = room.children.filter(function(role) {
        return role.children.length;
    });
    if (!room.children[0]) {
        this.showMessage('Malformed room - No roles found.');
        return;
    }

    room.children.forEach(function(role) {
        roles[role.attributes.name] = {
            SourceCode: role.children[0].toString(),
            Media: role.children[1].toString()
        };
    });
    role = room.children[0].attributes.name;

    this.showMessage('Opening project...', 3);
    // Create a room with the new name
    this.newProject(role);

    // Send 'import-room' message
    this.sockets.sendMessage({
        type: 'import-room',
        name: room.attributes.name,
        role: role,
        roles: roles
    });

    // load the given project
    role = room.children[0];
    var projectXml = [
        '<snapdata>',
        role.childNamed('project').toString(),
        role.childNamed('media').toString(),
        '</snapdata>'
    ].join('');
    return SnapActions.openProject(projectXml);
};

NetsBloxMorph.prototype.openCloudDataString = function (model, parsed) {
    var str = parsed ? model.toString() : model;
    return IDE_Morph.prototype.openCloudDataString.call(this, str);
};

// Serialize a project and save to the browser.
NetsBloxMorph.prototype.rawSaveProject = function (name) {
    this.showMessage('Saving', 3);

    if (name) {
        this.room.name = name;
    }

    // Trigger server export of all roles
    this.sockets.sendMessage({
        type: 'export-room',
        action: 'save'
    });
};

NetsBloxMorph.prototype.saveRoomLocal = function (str) {
    var name = this.room.name;

    if (Process.prototype.isCatchingErrors) {
        try {
            localStorage['-snap-project-' + name] = str;

            this.setURL('#open:' + str);
            this.showMessage('Saved to the browser.', 1);
        } catch (err) {
            this.showMessage('Save failed: ' + err);
        }
    } else {
        localStorage['-snap-project-' + name] = str;
        this.setURL('#open:' + str);
        this.showMessage('Saved to the browser.', 1);
    }
};

NetsBloxMorph.prototype.openProject = function (name) {
    var str;
    if (name) {
        this.showMessage('opening project\n' + name);
        str = localStorage['-snap-project-' + name];
        this.openRoomString(str);
        this.setURL('#open:' + str);
    }
};

NetsBloxMorph.prototype.save = function () {
    if (this.isPreviousVersion()) {
        return this.showMessage('Please exit replay mode before saving');
    }

    if (this.source === 'examples') {
        this.source = 'local'; // cannot save to examples
    }
    // NetsBlox changes - start
    if (this.room.name) {
    // NetsBlox changes - end
        if (this.source === 'local') { // as well as 'examples'
            // NetsBlox changes - start
            this.saveProject(this.room.name);
            // NetsBlox changes - end
        } else { // 'cloud'
            // NetsBlox changes - start
            this.saveProjectToCloud(this.room.name);
            // NetsBlox changes - end
        }
    } else {
        this.saveProjectsBrowser();
    }
};

NetsBloxMorph.prototype.saveACopy = function () {
    var myself = this;
    if (this.isPreviousVersion()) {
        return this.showMessage('Please exit replay mode before saving');
    }

    // Save the project!
    SnapCloud.saveProjectCopy(function() {
        myself.showMessage('Made your own copy and saved it to the cloud!', 2);
    }, this.cloudError());
};

NetsBloxMorph.prototype.cloudSaveError = function () {
    var myself = this;
    return function(response, url) {
        if (myself.shield) {
            myself.shield.destroy();
            myself.shield = null;
        }
        if (response.length > 50) {
            response = response.substring(0, 50) + '...';
        }

        new DialogBoxMorph().inform(
            'NetsBlox Cloud',
            (url ? url + '\n' : '')
                + response,
            myself.world(),
            myself.cloudIcon(null, new Color(180, 0, 0))
        );

        var explanation = 'Unable to save. Please export project if the problem persists.';
        myself.showMessage(explanation);
    };
};

NetsBloxMorph.prototype.saveProjectToCloud = function (name) {
    var myself = this,
        overwriteExisting;

    if (SnapCloud.username !== this.room.ownerId) {
        return IDE_Morph.prototype.saveProjectToCloud.call(myself, name);
    }

    overwriteExisting = function(overwrite) {
        var contentName = myself.room.hasMultipleRoles() ?
            myself.room.getCurrentRoleName() : myself.room.name;
        if (name) {
            myself.showMessage('Saving ' + contentName + '\nto the cloud...');
            SnapCloud.saveProject(
                myself,
                function () {
                    if (overwrite) {
                        myself.showMessage('Saved ' + contentName + ' to cloud!', 2);
                    } else {
                        myself.showMessage('Saved as ' + myself.room.name, 2);
                    }
                },
                myself.cloudSaveError(),
                overwrite,
                name
            );
        }
    };

    // Check if it will overwrite the current one
    SnapCloud.hasConflictingStoredProject(
        function(hasConflicting) {
            if (!hasConflicting) {
                myself.updateUrlQueryString();
                return IDE_Morph.prototype.saveProjectToCloud.call(myself, name);
            } else {  // doesn't match the stored version!
                var dialog = new DialogBoxMorph(null, function() {
                    overwriteExisting(true);
                });

                dialog.cancel = function() {  // don't overwrite
                    overwriteExisting();
                    dialog.destroy();
                };
                dialog.askYesNo(
                    localize('Overwrite Existing Project'),
                    localize('A project with the given name already exists.\n' +
                        'Would you like to overwrite it?'),
                    myself.world()
                );
            }
        },
        this.cloudSaveError()
    );
};

// RPC import support (both custom blocks and message types)
NetsBloxMorph.prototype.droppedText = function (aString, name) {
    if (aString.indexOf('<rpc') === 0) {
        return this.openBlocksMsgTypeString(aString);
    } else if (aString.indexOf('<room') === 0) {
        location.hash = '';
        return this.openRoomString(aString);
    } else if (aString.indexOf('<project') === 0) {
        this.exitReplayMode();
        var myself = this,
            msg = this.showMessage('Opening role...'),
            app = aString.split('app="')[1].split(' ')[0];

        return SnapActions.openProject(aString)
            .then(function(project) {
                var name = project.name;
                if (app === myself.serializer.appName && myself.room.getRoleCount() > 1) {
                    myself.room.setRoleName(name);
                } else {
                    myself.room.setRoomName(name);
                }
                msg.destroy();
            });
    } else {
        return IDE_Morph.prototype.droppedText.call(this, aString, name);
    }
};

NetsBloxMorph.prototype.openBlocksMsgTypeString = function (aString) {
    var msg,
        myself = this;

    this.nextSteps([
        function () {
            msg = myself.showMessage('Opening...');
        },
        function () {nop(); }, // yield (bug in Chrome)
        function () {
            if (Process.prototype.isCatchingErrors) {
                try {
                    myself.rawOpenBlocksMsgTypeString(aString);
                } catch (err) {
                    myself.showMessage('Load failed: ' + err);
                }
            } else {
                myself.rawOpenBlocksMsgTypeString(aString);
            }
        },
        function () {
            msg.destroy();
        }
    ]);
};

NetsBloxMorph.prototype.rawOpenBlocksMsgTypeString = function (aString) {
    // load messageTypes
    var content = this.serializer.parse(aString),
        messageTypes = content.childNamed('messageTypes'),
        blocksStr = content.childNamed('blocks').toString(),
        types;

    if (messageTypes) {
        types = messageTypes.children;
        types.forEach(this.serializer.loadMessageType.bind(this, this.stage));
    }

    // load blocks
    this.rawOpenBlocksString(blocksStr, '', true);
};

NetsBloxMorph.prototype.initializeCloud = function () {
    var myself = this,
        world = this.world();

    new DialogBoxMorph(
        null,
        function (user) {
            var pwh = hex_sha512(user.password),
                str;
            SnapCloud.login(
                user.username,
                pwh,
                user.choice,
                function () {
                    if (user.choice) {
                        str = SnapCloud.encodeDict(
                            {
                                username: user.username,
                                password: pwh
                            }
                        );
                        localStorage['-snap-user'] = str;
                    }
                    myself.source = 'cloud';
                    myself.showMessage('now connected.', 2);
                },
                myself.cloudError()
            );
        }
    ).withKey('cloudlogin').promptCredentials(
        'Sign in',
        'login',
        null,
        null,
        null,
        null,
        'stay signed in on this computer\nuntil logging out',
        world,
        myself.cloudIcon(),
        myself.cloudMsg
    );
};

NetsBloxMorph.prototype.rawLoadCloudProject = function (project, isPublic) {
    var newRoom = project.RoomName,
        isNewRole = project.NewRole === 'true',
        roleId = project.ProjectName;  // src proj name

    this.source = 'cloud';
    project.Owner = project.Owner || SnapCloud.username;
    this.updateUrlQueryString(newRoom, isPublic === 'true');
    if (project.SourceCode) {
        this.room.nextRoom = {
            ownerId: project.Owner,
            roomName: newRoom,
            roleId: roleId
        };
        return SnapActions.openProject(project.SourceCode);
    } else {  // initialize an empty code base
        this.newRole(roleId);
        this.room.name = newRoom;  // silent set name
        // FIXME: this could cause problems later
        this.room.ownerId = project.Owner;
        this.sockets.updateRoomInfo();
        if (isNewRole) {
            this.showMessage(localize('A new role has been created for you at') + ' ' + newRoom);
        }
    }
};

NetsBloxMorph.prototype.updateUrlQueryString = function (room, isPublic, isExample) {
    var url = location.pathname;

    room = room || this.room.name;
    if (isExample) {
        url += '?action=example&ProjectName=' + encodeURIComponent(room);
    } else if (isPublic) {
        url += '?action=present&Username=' + encodeURIComponent(SnapCloud.username) +
            '&ProjectName=' + encodeURIComponent(room);
    }

    window.history.pushState(room, room, url);
};

// Bug reporting assistance
NetsBloxMorph.prototype.snapMenu = function () {
    var menu,
        myself = this,
        world = this.world();

    menu = new MenuMorph(this);
    menu.addItem('About...', 'aboutNetsBlox');
    menu.addLine();
    menu.addItem(
        'NetsBlox website',
        function () {
            window.open('https://netsblox.org', 'NetsBloxWebsite');
        }
    );
    menu.addItem(
        'Snap! manual',
        function () {
            var url = myself.resourceURL('help', 'SnapManual.pdf');
            window.open(url, 'SnapReferenceManual');
        }
    );
    menu.addItem(
        'Source code',
        function () {
            window.open(
                'https://github.com/netsblox/netsblox'
            );
        }
    );
    menu.addLine();
    menu.addItem(
        'Report a bug',
        'reportBug'
    );
    if (world.currentKey === 16) {
        menu.addItem(
            'Load reported bug',
            'loadBugReport',
            undefined,
            new Color(100, 0, 0)
        );
    }
    if (world.isDevMode) {
        menu.addLine();
        menu.addItem(
            'Switch back to user mode',
            'switchToUserMode',
            'disable deep-Morphic\ncontext menus'
                + '\nand show user-friendly ones',
            new Color(0, 100, 0)
        );
    } else if (world.currentKey === 16) { // shift-click
        menu.addLine();
        menu.addItem(
            'Switch to dev mode',
            'switchToDevMode',
            'enable Morphic\ncontext menus\nand inspectors,'
                + '\nnot user-friendly!',
            new Color(100, 0, 0)
        );
    }
    menu.popup(world, this.logo.bottomLeft());
};

NetsBloxMorph.prototype.aboutNetsBlox = function () {
    var dlg,
        version = NetsBloxSerializer.prototype.app.split(',')[0],
        aboutTxt,
        world = this.world();

    version = NetsBloxSerializer.prototype.app
        .split(',')[0] // NetsBlox <version>
        .replace(/NetsBlox /, '');

    aboutTxt = 'NetsBlox v' + version + '\n\n'

        + 'NetsBlox is developed by Vanderbilt University with support\n'
        + '          from the National Science Foundation (NSF)\n\n'

        + 'NetsBlox extends Snap!, from the University of California, Berkeley and \n'
        + 'is influenced and inspired by Scratch, from the Lifelong Kindergarten\n'
        + 'group at the MIT Media Lab\n\n'

        + 'for more information see https://netsblox.org,\nhttp://snap.berkeley.edu '
        + 'and http://scratch.mit.edu';

    dlg = new DialogBoxMorph();
    dlg.inform('About NetsBlox', aboutTxt, world);
    dlg.fixLayout();
    dlg.drawNew();
};

NetsBloxMorph.prototype.reportBug = function () {
    // Prompt for a description of the bug
    var dialog = new DialogBoxMorph().withKey('bugReport'),
        frame = new ScrollFrameMorph(),
        text = new TextMorph(''),
        ok = dialog.ok,
        myself = this,
        size = 250,
        world = this.world();

    frame.padding = 6;
    frame.setWidth(size);
    frame.acceptsDrops = false;
    frame.contents.acceptsDrops = false;

    text.setWidth(size - frame.padding * 2);
    text.setPosition(frame.topLeft().add(frame.padding));
    text.enableSelecting();
    text.isEditable = true;

    frame.setHeight(size);
    frame.fixLayout = nop;
    frame.edge = InputFieldMorph.prototype.edge;
    frame.fontSize = InputFieldMorph.prototype.fontSize;
    frame.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    frame.contrast = InputFieldMorph.prototype.contrast;
    frame.drawNew = InputFieldMorph.prototype.drawNew;
    frame.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    frame.addContents(text);
    text.drawNew();

    dialog.ok = function () {
        myself.submitBugReport(text.text);
        ok.call(this);
    };

    dialog.justDropped = function () {
        text.edit();
    };

    dialog.labelString = localize('What went wrong?');
    dialog.createLabel();
    dialog.addBody(frame);
    frame.drawNew();
    dialog.addButton('ok', 'OK');
    dialog.addButton('cancel', 'Cancel');
    dialog.fixLayout();
    dialog.drawNew();
    dialog.popUp(world);
    dialog.setCenter(world.center());
    text.edit();
};

NetsBloxMorph.prototype.submitBugReport = function (desc, error) {
    var myself = this,
        canvas = this.world().worldCanvas,
        silent = !!error,
        version,
        report = {};

    // Add the description
    version = NetsBloxSerializer.prototype.app
        .replace('NetsBlox ', '')
        .replace(/,.*$/, '');

    report.description = desc;
    report.timestamp = new Date();
    report.userAgent = navigator.userAgent;
    report.version = version;
    report.clientUuid = this.sockets.uuid;

    // Add screenshot
    report.screenshot = canvas.toDataURL('image/png');

    // Add project state
    report.project = this.serializer.serialize(this.stage);
    report.undoState = SnapUndo;

    // Add username (if logged in)
    report.user = SnapCloud.username;
    report.isAutoReport = !!error;

    if (report.isAutoReport) {
        var event = SnapActions.currentEvent;
        report.description = [
            '## Auto-report',
            'Error:',
            error.stack,
            '---',
            'Failing Event:',
            JSON.stringify(event, null, 2)
        ].join('\n');
        report.error = error;
        report.event = event;
    }

    // Report to the server
    var request = new XMLHttpRequest(),
        url = SnapCloud.url + '/BugReport';

    request.open('post', url);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.readyState === 4 && !silent) {
            if (request.status > 199 && request.status < 400) {  // success
                myself.showMessage(localize('Bug has been reported!'), 2);
            } else {  // failed...
                myself.cloudError()(url, localize('bug could not be reported:') +
                    request.responseText);
            }
        }
    };
    request.send(JSON.stringify(report));
};

NetsBloxMorph.prototype.showBugReportScreenshot = function (report) {
    var myself = this,
        pic = new Image();

    pic.onload = function () {
        var maxSize = myself.extent().divideBy(1.50),
            ratio = Math.min(maxSize.x/pic.width, maxSize.y/pic.height),
            scaledSize = new Point(pic.width, pic.height).multiplyBy(ratio),
            screenshot = newCanvas(scaledSize),
            context = screenshot.getContext('2d');

        context.drawImage(
            pic,
            0,
            0,
            pic.width,
            pic.height,
            0,
            0,
            scaledSize.x,
            scaledSize.y
        );
        new DialogBoxMorph().inform(
            'Screenshot',
            null,
            myself.world(),
            screenshot
        );
    };
    pic.src = report.screenshot;
    return;
};

NetsBloxMorph.prototype.loadBugReport = function () {
    var myself = this,
        inp = document.createElement('input');

    if (myself.filePicker) {
        document.body.removeChild(myself.filePicker);
        myself.filePicker = null;
    }
    inp.type = 'file';
    inp.style.color = 'transparent';
    inp.style.backgroundColor = 'transparent';
    inp.style.border = 'none';
    inp.style.outline = 'none';
    inp.style.position = 'absolute';
    inp.style.top = '0px';
    inp.style.left = '0px';
    inp.style.width = '0px';
    inp.style.height = '0px';
    inp.addEventListener(
        'change',
        function () {
            var reader = new FileReader();
            document.body.removeChild(inp);
            myself.filePicker = null;

            reader.onloadend = function(result) {
                var report = JSON.parse(result.target.result),
                    allEvents = report.undoState.allEvents,
                    dialog = new DialogBoxMorph(null, nop),
                    date,
                    msg,
                    choices = {};

                choices['Show Screenshot'] = function() {
                    myself.showBugReportScreenshot(report);
                };

                choices['Replay All Events'] = function() {
                    // Replay from 'allEvents'
                    allEvents.push(report.event);
                    myself.replayEvents(allEvents);
                    dialog.destroy();
                };

                choices['Replay Some Events'] = function() {
                    var range = new Point(0, allEvents.length);

                    new DialogBoxMorph(
                        myself,
                        function(point) {
                            myself.replayEvents(allEvents.slice(point.x, point.y));
                        },
                        myself
                    ).promptVector(
                        'Which events?',
                        range,
                        range,
                        'Start (inclusive)',
                        'End (exclusive)',
                        this.world(),
                        null, // pic
                        null // msg
                    );
                    dialog.destroy();
                };

                choices['Load Project'] = function() {
                    myself.droppedText(report.project);
                    setTimeout(function() {
                        var keys = Object.keys(report.undoState);
                        for (var i = keys.length; i--;) {
                            SnapUndo[keys[i]] = report.undoState[keys[i]];
                        }
                        myself.confirm(
                            'Would you like to apply the failing event?',
                            'Apply Failing Event?',
                            function() {
                                SnapActions.applyEvent(report.event);
                            }
                        );
                        myself.showMessage('Loaded bug report!');
                    }, 100);
                    dialog.destroy();
                };

                date = new Date(report.timestamp);
                msg = [
                    'User: ' + report.user,
                    'Date: ' + date.toDateString() + ' ' + date.toLocaleTimeString(),
                    'Version: ' + report.version,
                    'Browser: ' + report.userAgent,
                    'Event Count: ' + allEvents.length,
                    'Description:\n\n' + report.description
                ].join('\n');

                choices['Cancel'] = 'cancel';

                dialog.ask(
                    localize('Bug Report'),
                    msg,
                    myself.world(),
                    choices
                );

                return;
            };
            reader.readAsText(inp.files[0]);
        },
        false
    );
    document.body.appendChild(inp);
    myself.filePicker = inp;
    inp.click();
};

// Collaboration
NetsBloxMorph.prototype.manageCollaborators = function () {
    var myself = this,
        ownerId = this.room.ownerId,
        name = this.room.name,
        socketId = this.sockets.uuid;

    SnapCloud.getCollaboratorList(
        function(friends) {
            friends.sort(function(a, b) {
                return a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1;
            });
            new CollaboratorDialogMorph(
                myself,
                function(user) {
                    if (user) {
                        SnapCloud.inviteToCollaborate(
                            socketId,
                            user.username,
                            ownerId,
                            name
                        );
                    }
                },
                friends,
                'Invite a Collaborator to the Project'
            ).popUp();
        },
        function (err, lbl) {
            myself.cloudError().call(null, err, lbl);
        }
    );
};

NetsBloxMorph.prototype.promptCollabInvite = function (params) {  // id, room, roomName, role
    // Create a confirm dialog about joining the group
    var myself = this,
        // unpack the params
        roomName = params.roomName,
        enabled = false,
        dialog,
        msg;

    if (!SnapActions.isCollaborating()) {
        SnapActions.enableCollaboration();
        enabled = true;
    }

    if (params.inviter === SnapCloud.username) {
        msg = 'Would you like to collaborate at "' + roomName + '"?';
    } else {
        msg = params.inviter + ' has invited you to collaborate with\nhim/her at "' + roomName +
            '"\nAccept?';
    }

    dialog = new DialogBoxMorph(null, function() {
        myself.collabResponse(params, true);
        dialog.destroy();
    });

    dialog.cancel = function() {
        myself.collabResponse(params, false);
        if (enabled) {
            SnapActions.disableCollaboration();
        }
        dialog.destroy();
    };

    dialog.askYesNo(
        'Collaboration Invitation',
        localize(msg),
        this.world()
    );
};

NetsBloxMorph.prototype.collabResponse = function (invite, response) {
    var myself = this;

    SnapCloud.collabResponse(
        invite.id,
        response,
        function() {
            var dialog,
                msg;

            if (response) {
                dialog = new DialogBoxMorph(null, function() {
                    // Open the given project
                    SnapCloud.reconnect(
                        function () {
                            SnapCloud.callService(
                                'joinActiveProject',
                                function (response) {
                                    myself.rawLoadCloudProject(response[0]);
                                },
                                myself.cloudError(),
                                [invite.roomName, invite.inviter, SnapCloud.clientId]
                            );
                        },
                        myself.cloudError()
                    );
                    dialog.destroy();
                });
                msg = 'Would you like to open the shared project now?';
                dialog.askYesNo(
                    localize('Open Shared Project?'),
                    localize(msg),
                    myself.world()
                );
            }
        },
        function(err){
            myself.showMessage(err, 2);
        }
    );
};

NetsBloxMorph.prototype.logout = function () {
    var myself = this;
    delete localStorage['-snap-user'];
    SnapCloud.logout(
        function () {
            SnapCloud.clear();
            myself.showMessage('disconnected.', 2);
            myself.newProject();
        },
        function () {
            SnapCloud.clear();
            myself.showMessage('disconnected.', 2);
            myself.newProject();
        }
    );
};

NetsBloxMorph.prototype.createCloudAccount = function () {
    var myself = this,
        world = this.world();
    /*
    // force-logout, commented out for now:
    delete localStorage['-snap-user'];
    SnapCloud.clear();
*/
    new DialogBoxMorph(
        null,
        function (user) {
            SnapCloud.signup(
                user.username,
                user.email,
                function (txt, title) {
                    new DialogBoxMorph().inform(
                        title,
                        txt +
                            '.\n\nAn e-mail with your password\n' +
                            'has been sent to the address provided',
                        world,
                        myself.cloudIcon(null, new Color(0, 180, 0))
                    );
                },
                myself.cloudError()
            );
        }
    ).withKey('cloudsignup').promptCredentials(
        'Sign up',
        'signup',
        '/tos.html',
        'Terms of Service...',
        '/privacy.html',
        'Privacy...',
        'I have read and agree\nto the Terms of Service',
        world,
        myself.cloudIcon(),
        myself.cloudMsg
    );
};

NetsBloxMorph.prototype.showUpdateNotification = function () {
    var msgText = localize('Newer Version of NetsBlox Available: Please Save and Refresh');
    var notification = new MenuMorph(null, msgText);
    var world = this.world();

    notification.drawNew();

    var point = this.spriteBar.center()
        .subtract(new Point(notification.width()/2, notification.height()/2));
    notification.setPosition(point);
    notification.addShadow(new Point(2, 2), 80);

    world.add(notification);
    notification.drawNew();
};
