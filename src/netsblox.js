/* global RoomMorph, IDE_Morph, StageMorph, List, VariableFrame,
   WebSocketManager, SpriteMorph, Point, RoomEditorMorph, localize, Process,
   StringMorph, Color, TabMorph, InputFieldMorph, MorphicPreferences, MenuMorph,
   TextMorph, NetsBloxSerializer, nop, SnapActions, DialogBoxMorph, hex_sha512,
   SnapUndo, ScrollFrameMorph, SnapUndo, CollaboratorDialogMorph,
   SnapSerializer, newCanvas, detect, WatcherMorph, utils */
// Netsblox IDE (subclass of IDE_Morph)

NetsBloxMorph.prototype = Object.create(IDE_Morph.prototype);
NetsBloxMorph.prototype.constructor = NetsBloxMorph;
NetsBloxMorph.uber = IDE_Morph.prototype;

function NetsBloxMorph(isAutoFill, config) {
    this.init(isAutoFill, config);
}

NetsBloxMorph.prototype.init = function (isAutoFill, config) {
    NetsBloxMorph.uber.init.call(this, isAutoFill, config);

    this.sockets = new WebSocketManager(this, config);
    this.services = new ServicesRegistry(config, this.cloud);
    this.services.onInvalidHosts = this.onInvalidHosts.bind(this);
    this.room = null;
    if (this.cloud.username) {
        this.services.fetchHosts(this.cloud.username);
    }

    // initialize inherited properties:
    this.serializer = new NetsBloxSerializer();

    var myself = this;
    // attach the event listeners
    window.addEventListener('ideLoaded', function() {
        if (!(myself.isSupportedBrowser())) myself.showBrowserNotification();
    });
};

NetsBloxMorph.prototype.onInvalidHosts = function (servicesHosts) {
    const invalidList = servicesHosts.map(hostInfo => {
        const name = hostInfo.categories[0];
        if (name) {
            return name + ' (' + hostInfo.url + ')';
        }
        return hostInfo.url;
    }).join('\n');

    const msg = 'The following have been registered to provide ' +
        'additional\nNetsBlox services but are unavailable:\n\n' +
        invalidList;

    this.inform(
        'Invalid Services Hosts',
        msg,
        this.world()
    );
};

NetsBloxMorph.prototype.buildPanes = function () {
    this.createRoom();
    NetsBloxMorph.uber.buildPanes.call(this);
};

NetsBloxMorph.prototype.clearProject = function () {
    this.source = this.cloud.username ? 'cloud' : 'local';
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

NetsBloxMorph.prototype.cloudMenu = async function () {
    var menu = NetsBloxMorph.uber.cloudMenu.call(this);

    const isLoggedIn = this.cloud.username;
    let user = {};
    if (isLoggedIn) {
        const [userData, invites, collaborateInvites] = await Promise.all([
            this.cloud.getUserData(),
            this.cloud.getFriendRequestList(),
            this.cloud.getCollaboratorRequestList(),
        ]);
        user.data = userData;
        user.invites = invites;
        user.collaborateInvites = collaborateInvites;
    }

    if (isLoggedIn) {
        const linkedAccounts = user.data.linkedAccounts;
        if (linkedAccounts.length === 0) {
            menu.addItem(
                'Link to Snap! account...',
                'linkAccount'
            );
        } else {
            menu.addItem(
                localize('Unlink Snap! account...'),
                () => this.unlinkAccount(user.data.linkedAccounts[0]),
            );
        }
    }

    if (isLoggedIn) {
        menu.addLine();
        if (this.room.isOwner()) {
            menu.addItem(
                'Collaborators...',
                'manageCollaborators'
            );
        }

        const friendMenu = new MenuMorph(this);
        friendMenu.addItem('View Friends...', 'manageFriends');
        friendMenu.addItem('Send Friend Request...', 'sendFriendRequest');
        menu.addMenu(
            'Friends...',
            friendMenu
        );
        if (user.invites.length) {
            const friendRequestMenu = new MenuMorph(this);
            user.invites.forEach(invite => {
                friendRequestMenu.addItem(`${invite.sender}...`, () => this.respondToFriendRequest(invite));
            });
            menu.addMenu(
                'Friend Requests...',
                friendRequestMenu
            );
        }

        if (user.collaborateInvites.length) {
            const inviteMenu = new MenuMorph(this);
            user.collaborateInvites.forEach(invite => {
                inviteMenu.addItem(`${invite.sender}...`, () => this.respondToCollaborateRequest(invite));
            });
            menu.addMenu(
                'Collaboration Requests...',
                inviteMenu
            );
        }
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

NetsBloxMorph.prototype.newProject = async function (projectName) {
    const metadata = await this.cloud.newProject(projectName);
    this.createRoom();
    this.room.silentSetRoomName(metadata.name);
    const updateUrl = !projectName;
    if (updateUrl) {
        this.updateUrlQueryString(metadata);
    }
    await SnapActions.openProject();
    const [roleData] = Object.values(metadata.roles);
    this.silentSetProjectName(roleData.name);

    this.extensions.onNewProject();
};

NetsBloxMorph.prototype.newRole = function (name) {
    // Initialize a new role locally
    this.clearProject();
    if (name) {
        this.silentSetProjectName(name);
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

        // update the document title
        document.title = headerName + suffix + ' - ' + myself.serializer.appName;

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
        this.label.rerender();
        this.add(this.label);
        this.label.setCenter(this.center());
        this.label.setLeft(this.settingsButton.right() + padding);
    };
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
    tab.rerender();
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
        menu.items.splice(10, 0, [
            localize('Export to Snap! project...'),
            function () {
                var str = myself.getSnapXml();
                var name = this.room.getRoleCount() === 1 ?
                    this.room.name : this.projectName;

                myself.saveXMLAs(str, name);
                myself.showMessage('Exported!', 1);
            },
            'export "' + myself.projectName + '" as Snap!-compatible XML',
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

    var isSavingToCloud = this.source.indexOf('cloud') > -1;
    if (this.cloud.username && !this.room.isOwner()) {
        item = ['Save a Copy', 'saveACopy'];
        var itemIndex = menu.items.map(function(item) {
            return item[1];
        }).indexOf('save');

        menu.items.splice(itemIndex+2, 0, item);
    } else if (isSavingToCloud && this.room.hasMultipleRoles()) {
        // Change the label to 'Save Role' if multiple roles
        var saveItem = menu.items.find(function(item) {
            return item[1] === 'save';
        });
        saveItem[0] = localize('Save Role');
    }

    if (myself.room.isGuest()) {
        var saveItemIndex = menu.items.map(function(item) {
            return item[1];
        }).indexOf('save');
        menu.items.splice(saveItemIndex, 2);
    }

    item = [
        'Services...',
        function () {
            var url = myself.serviceURL('servicelibs', 'SERVICELIBS'),
                names = this.getMediaListFromURL(url),
                headerText = localize('Import') + ' ' + localize('Service'),
                mediaMenu = new MenuMorph(
                    myself,
                    headerText
                );

            names.forEach(function (item) {
                mediaMenu.addItem(
                    item.name,
                    function () {
                        var url = myself.serviceURL('servicelibs', item.fileName);
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

NetsBloxMorph.prototype.serviceURL = function() {
    var path = Array.prototype.slice.call(arguments, 0);
    const {url} = this.services.defaultHost;
    return url + '/' + path.join('/');
};

NetsBloxMorph.prototype.exportRole = NetsBloxMorph.prototype.exportProject;

// Trigger the export
NetsBloxMorph.prototype.exportProject = function (name) {
    this.showMessage('Exporting...', 3);

    if (this.room.getRoleCount() === 1) {
        // If only one role, we should just create the room xml locally
        this.exportSingleRoleXml(name);
    } else {  // Trigger server export of all roles
        this.exportMultiRoleXml(name);
    }
};

NetsBloxMorph.prototype.exportMultiRoleXml = async function (name) {
    const xml = await this.getProjectXML();
    this.exportRoom(xml, name);
};

NetsBloxMorph.prototype.getSnapXml = function() {
    var isSavingHistory = SnapSerializer.prototype.isSavingHistory;

    if (this.room.getRoleCount() > 1) {
        this.inform(
            'Multiple Roles Detected',
            'As a Snap! project is equivalent to a role in NetsBlox,\n' +
            'we can only export a single role to a Snap! project at\n' +
            'a time.\n\nTo migrate the remaining roles, please export\n' +
            'them all individually.',
            this.world()
        );
    }

    // remove the watcher for the RPC error...
    var rpcErrWatcher = detect(
        this.stage.children,
        function(child) {
            return child instanceof WatcherMorph &&
                child.getter === 'reportRPCError';
        }
    );
    if (rpcErrWatcher) {
        var index = this.stage.children.indexOf(rpcErrWatcher);
        this.stage.children.splice(index, 1);
    }

    SnapSerializer.prototype.isSavingHistory = false;
    //this.exportRole(name, shiftClicked);  // FIXME
    var str = this.serializer.serialize(this.stage);
    SnapSerializer.prototype.isSavingHistory = isSavingHistory;

    // restore the RPC error watcher
    if (rpcErrWatcher) {
        this.stage.children.splice(index, 0, rpcErrWatcher);
    }
    return str;
};

NetsBloxMorph.prototype.getSerializedRole = function (role = this.sockets.getSerializedProject()) {
    return this.serializer.format(
        '<role name="@">%</role>',
        role.name,
        role.code + role.media
    );

};

NetsBloxMorph.prototype.exportSingleRoleXml = function (name) {
    const xml = this.exportProjectXml(this.room.name, [this.getSerializedRole()]);
    this.exportRoom(xml, name);
};

NetsBloxMorph.prototype.getProjectXML = async function () {
    const projectData = await this.cloud.getProjectData();
    return this.getXMLFromProjectData(projectData);
};

NetsBloxMorph.prototype.getXMLFromProjectData = function (projectData) {
    const roles = Object.values(projectData.roles)
        .map(role => this.getSerializedRole(role));

    return this.exportProjectXml(projectData.name, roles);
};

NetsBloxMorph.prototype.exportProjectXml = function (name, roles) {
    try {
        var str = this.serializer.format(
            '<room name="@" app="@">%</room>',
            name,
            this.serializer.app,
            roles,
        );
        return str;
    } catch (err) {
        if (Process.prototype.isCatchingErrors) {
            this.showMessage('Export failed: ' + err);
        } else {
            throw err;
        }
    }
};

NetsBloxMorph.prototype.exportRoom = function (str, name) {
    name = name || this.room.name;

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
NetsBloxMorph.prototype.openRoomString = async function (str) {
    const room = this.serializer.parse(str);

    if (room.children.length === 0) {
        this.showMessage('Malformed project - No roles found.');
        return;
    }

    const roles = room.children.map(function(role) {
        var srcCode = role.children[0] || '';
        var media = role.children[1] || '';

        return {
            name: role.attributes.name,
            code: srcCode.toString(),
            media: media.toString()
        };
    });

    const msg = this.showMessage(localize('Opening project...'));
    const {name} = room.attributes;
    const metadata = await this.cloud.importProject({name, roles});

    const cloudSource = new CloudProjectsSource(this);
    await cloudSource.open(metadata);
};

NetsBloxMorph.prototype.openCloudDataString = function (model, parsed) {
    var myself = this,
        str = parsed ? model.toString() : model;

    return IDE_Morph.prototype.openCloudDataString.call(this, str)
        .then(function() {
            myself.sockets.updateRoomInfo();
        });
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

NetsBloxMorph.prototype.saveACopy = async function () {
    if (this.isPreviousVersion()) {
        return this.showMessage('Please exit replay mode before saving');
    }

    // Save the project!
    const metadata = await this.cloud.saveProjectCopy();
    this.showMessage('Made your own copy and saved it to the cloud!', 2);

    const confirmed = await this.confirm(
        localize('Would you like to open the project now?'),
        localize('Open Project'),
    );
    if (confirmed) {
        const source = new CloudProjectsSource(this);
        await source.open(metadata);
    }
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

// RPC import support (both custom blocks and message types)
NetsBloxMorph.prototype.droppedText = function (aString, name) {
    if (aString.startsWith('<rpc')) {
        return this.openBlocksMsgTypeString(aString);
    } else if (aString.startsWith('<room')) {
        location.hash = '';
        return this.openRoomString(aString);
    } else if (aString.startsWith('<role')) {
        return this.openRoleString(aString);
    } else if (aString.startsWith('<project')) {
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

                myself.sockets.updateRoomInfo();
            });
    } else {
        return IDE_Morph.prototype.droppedText.apply(this, arguments);
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

NetsBloxMorph.prototype.rawLoadCloudRole = async function (project, roleData) {
    const rolePair = Object.entries(project.roles)
        .find(([_id, metadata]) => metadata.name === roleData.name)

    if (!rolePair) throw new Error(`Could not find role ${roleData.name} in project.`);
    const [roleId] = rolePair;

    this.source = 'cloud';
    project.owner = project.owner || this.cloud.username;
    this.updateUrlQueryString(project);

    const msg = this.showMessage('Opening project...');
    this.cloud.setLocalState(project.id, roleId);

    await SnapActions.openProject(`<snapdata>${roleData.code}${roleData.media}</snapdata>`);
    const isLoadInterrupted = this.cloud.projectId !== project.id || this.cloud.roleId !== roleId;
    if (isLoadInterrupted) return;

    this.room.silentSetRoomName(project.name);
    this.room.ownerId = project.owner;
    this.silentSetProjectName(roleData.name);
    await this.cloud.setClientState(project.id, roleId);
    msg.destroy();
};

/**
 * Update the URL to reflect opened public projects, etc.
 */
NetsBloxMorph.prototype.updateUrlQueryString = function (
    project,
    isExample,
) {
    const extensions = this.parseUrlAnchors(location.search, location.hash).get('extensions');
    const dict = {};
    if (extensions) {
        dict.extensions = extensions;
    }

    const isPublic = project.state !== "Private" && project.saveState === 'Saved';

    if (isExample) {
        dict.action = 'example';
        dict.ProjectName = project.name;
    } else if (isPublic) {
        dict.action = 'present';
        dict.Username = project.owner;
        dict.ProjectName = project.name;
    }

    this.setQueryString(dict, project.name);
};

NetsBloxMorph.prototype.setQueryString = function (dict, stateName) {
    const qs = Object.entries(dict)
      .map(pair => pair.map(encodeURIComponent).join('='))
      .join('&');
    const url = location.pathname + "?" + qs + location.hash;
    window.history.pushState(stateName, stateName, url);
};

// Bug reporting assistance
NetsBloxMorph.prototype.aboutNetsBlox = function () {
    var dlg,
        aboutTxt,
        world = this.world();

    const version = NetsBloxSerializer.prototype.app
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
    frame.render = InputFieldMorph.prototype.render;
    frame.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    frame.addContents(text);
    text.rerender();

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
    dialog.addButton('ok', 'OK');
    dialog.addButton('cancel', 'Cancel');
    dialog.fixLayout();
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
    try {
        report.screenshot = canvas.toDataURL('image/png');
    } catch (err) {
        console.warn(`Unable to capture screenshot for bug report`, err);
    }

    // Add project state
    report.project = this.serializer.serialize(this.stage);
    report.undoState = SnapUndo;

    // Add username (if logged in)
    report.user = this.cloud.username;
    report.isAutoReport = !!error;

    let url = window.location.origin + '/bugs/';
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
        url += "?auto=true";
    }

    // Report to the server
    var request = new XMLHttpRequest();

    request.open('post', url);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.readyState === 4 && !silent) {
            if (request.status > 199 && request.status < 400) {  // success
                myself.showMessage(localize('Bug has been reported!'), 2);
            } else {  // failed...
                myself.cloudError()(localize('Bug could not be reported:') +
                    '\n\n' + request.responseText);
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
NetsBloxMorph.prototype.simpleNotification = function (msg, sticky) {
    var msgText = localize(msg);
    var notification = new MenuMorph(null, msgText);
    var world = this.world();

    notification.fixLayout();
    notification.mouseClickLeft = sticky ? nop : notification.destroy;

    var point = this.spriteBar.center()
        .subtract(new Point(notification.width()/2, notification.height()/2));

    notification.popup(world, point);
};

// searches the existing sprites and custom blocks for the desired block.
// can search by block spec or selector
NetsBloxMorph.prototype.findBlocks = function(query) {
    query = query || {};
    var ide = this;
    var allSprites = ide.stage.children
        .filter(function(m) {
            return m instanceof SpriteMorph;
        });
    allSprites.push(ide.stage); // also look into stage scripts

    // mark it on the blocks
    var trackPath = function(b, upperLevel) {
        b.upperLevel = upperLevel;
        return b;
    };

    var allTopBlocks = allSprites
        .map(function(sp) {
            return sp.scripts;
        })
        .map(function(script, idx) {
            return script.children.map(function(b) {
                return trackPath(b, allSprites[idx]);
            });
        })
        .reduce(function(a, b) {
            return a.concat(b);
        });

    // find interesting blocks
    var impBlocks = [];
    while (allTopBlocks.length !== 0) {
        var topBlock = allTopBlocks.shift();
        SnapActions.traverse(topBlock, function(block) {
            if (block.definition) { // if custom block
                if (block !== topBlock) trackPath(block, topBlock);
                var blk = block.definition.scriptsModel();
                blk = blk.children[0];
                if (blk.children.length > 1) { // has contents
                    var topChild = blk.children[1];
                    trackPath(topChild, block);
                    allTopBlocks.push(topChild); // add the top child // OPT only once per custom block
                }
            }
            var include = false;
            if (query.selectors && query.selectors.includes(block.selector)) {
                include = true;
            } else if (query.specs) {
                // OPT break early
                query.specs.forEach(function(spec) {
                    try {
                        if (block.blockSpec && block.blockSpec.toLowerCase().indexOf(spec) !== -1) {
                            include = true;
                        }
                    } catch (e) {
                        console.error('error when searching for blocks', e);
                    }
                });
            }
            if (include) {
                if (block !== topBlock) trackPath(block, topBlock);
                impBlocks.push(block);
            }
        });
    }

    return impBlocks;
};

// given a block found by the findBlocks fn returns a user friendly list of parents
NetsBloxMorph.prototype.blockAddress = function(b) {
    var location = [];
    var getCleanBlockSpec = function(morph) {
        return '[' + morph.blockSpec.replace(/%/g,'') + ']';
    };

    var getStepName = function(morph) {
        var stepName = '';

        if (morph.name !== undefined && morph instanceof SpriteMorph) { // sprites
            stepName = morph.name === '' ? 'S: Sprite' : 'S: ' + morph.name;
        } else if (morph.name !== undefined) { // stage
            stepName = morph.name;
        } else if (morph.selector === 'evaluateCustomBlock') { // custom blocks
            stepName = 'CB: ' + getCleanBlockSpec(morph);
        } else  { // others
            stepName = getCleanBlockSpec(morph);
        }

        return stepName;
    };

    while (b.upperLevel) {
        var upperLevel = b.upperLevel;
        location.unshift(getStepName(upperLevel));
        b = upperLevel;
    }
    return location;
};


NetsBloxMorph.prototype.showUpdateNotification = function () {
    this.simpleNotification('Newer Version of NetsBlox Available: Please Save and Refresh', true);
};

NetsBloxMorph.prototype.showBrowserNotification = function () {
    this.simpleNotification('It seems you\'re using an unsupported browser. \n Use an up-to-date Chrome browser for the best experience.');
};

NetsBloxMorph.prototype.linkAccount = function () {
    new DialogBoxMorph(
        null,
        async user => {
            try {
                await this.cloud.linkAccount(
                    user.username.toLowerCase(),
                    user.password,
                    'Snap!'
                );
                this.showMessage(localize('Linked account!'), 2);
            } catch (err) {
                this.showMessage(
                    localize('Unable to link account:') + ' ' + err.message,
                    2
                );
            }
        }
    ).withKey('cloudlogin').promptCredentials(
        'Sign in with Snap!',
        'login',
        null,
        null,
        null,
        null,
        'stay signed in on this computer\nuntil logging out',
        this.world(),
        this.cloudIcon(),
        this.cloudMsg
    );
};

NetsBloxMorph.prototype.unlinkAccount = async function (account) {
    const {username} = account;
    const confirmed = await this.confirm(
        localize('Are you sure you would like to unlink ') + username + '?',
        localize('Unlink Account?')
    );

    if (confirmed) {
        try {
            await this.cloud.unlinkAccount(account);
            this.showMessage(localize('Unlinked ') + username, 2);
        } catch (req) {
            this.showMessage(localize('Unable to unlink account: ') + req.responseText, 2);
        }
    }
};
