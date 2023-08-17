/* global StringMorph, DialogBoxMorph, localize, Point, Morph,
 Color, nop, InputFieldMorph, ListMorph, IDE_Morph, TurtleIconMorph, SnapActions,
 TextMorph, MorphicPreferences, ScrollFrameMorph, ReporterBlockMorph,
 MessageOutputSlotMorph, MessageInputSlotMorph, SymbolMorph, PushButtonMorph, MenuMorph,
 SpeechBubbleMorph, ProjectDialogMorph, HandleMorph, ReplayControls, fontHeight,
 AlignmentMorph, copy, TableDialogMorph, Table, TableMorph, WebSocketManager,
 TableFrameMorph, WHITE, ZERO, Rectangle*/
/* * * * * * * * * RoomMorph * * * * * * * * */
RoomMorph.prototype = new Morph();
RoomMorph.prototype.constructor = RoomMorph;
RoomMorph.uber = Morph.prototype;

RoomMorph.SIZE = 300;
RoomMorph.DEFAULT_ROLE = 'myRole';
RoomMorph.DEFAULT_ROOM = 'untitled';
RoomMorph.isSocketUuid = function(name) {
    return name && name[0] === '_';
};

RoomMorph.isValidName = function(name) {
    return !/[@\.]+/.test(name);
};

RoomMorph.isEmptyName = function(name) {
    return name.trim().length === 0;
};

function RoomMorph(ide) {
    this.init(ide);
}

RoomMorph.prototype.init = function(ide) {
    // Get the users at the room
    this.version = -1;
    this.isReadOnly = false;
    this.ide = ide;
    this.displayedMsgMorphs = [];
    this.trace = {};

    this.ownerId = null;
    this.collaborators = [];
    RoomMorph.uber.init.call(this, true);

    // Set up the room name
    this.name = localize(RoomMorph.DEFAULT_ROOM);
    this.roomName = new StringMorph(
        this.name,
        18,
        null,
        true,
        false,
        false,
        null,
        null,
        WHITE
    );
    this.roomName.mouseClickLeft = () => this.editRoomName(this.name);
    this.ownerLabel = new StringMorph(
        localize('Owner: myself'),
        false,
        false,
        true,
        true,
        false,
        null,
        null,
        WHITE
    );

    this.collabList = new StringMorph(
        localize('No collaborators'),
        false,
        false,
        true,
        true,
        false,
        null,
        null,
        WHITE
    );
    this.nextRoom = null;  // next room info
    // The projectName is used for the roleId
    if (!this.ide.projectName) {
        this.ide.projectName = RoomMorph.DEFAULT_ROLE;
    }

    RoomMorph.uber.init.call(this);
    this.updateRoles(this.getDefaultRoles());
    this.add(this.roomName);
    this.add(this.ownerLabel);
    this.add(this.collabList);

    this.isDraggable = false;

    // Set the initial values
    // Shared messages array for when messages are sent to unoccupied roles
    this.queuedRoleMsgs = [];

    this.blockHighlights = [];
};

RoomMorph.prototype.setReadOnly = function(value) {
    if (value !== this.isReadOnly) {
        this.isReadOnly = value;
        this.render();
    }
};

RoomMorph.prototype.silentSetRoomName = function(name) {
    this.name = name;
    this.roomName.text = name;
    this.roomName.changed();
    this.roomName.fixLayout();
    this.roomName.rerender();

    this.ide.controlBar.updateLabel();
    return name;
};

RoomMorph.prototype.setRoomName = function(name) {
    const changed = this.name !== name;

    if (changed) {
        const cloud = this.ide.cloud;
        return cloud.setProjectName(name);
    }

    return Promise.resolve(name);
};

RoomMorph.prototype.getDefaultRoles = function() {
    const cloud = this.ide.cloud;
    var roleInfo = {},
        name = this.getCurrentRoleName(),
        occupant = {
            id: cloud.clientId,
            name: cloud.username || 'me'
        };

    roleInfo[name] = {
        name: name,
        occupants: [occupant]
    };

    return roleInfo;
};

RoomMorph.prototype.getCurrentRoleName = function() {
    var myself = this,
        roleNames = this.getRoleNames(),
        myId = myself.ide.cloud.clientId;

    // Look up the role name from the current room info
    return roleNames.find(function(name) {
        return myself.getCurrentOccupants(name).find(function(occupant) {
            return occupant.id === myId;
        });
    }) || this.ide.projectName;
};

RoomMorph.prototype.getRoleCount = function() {
    return this.getRoles().length;
};

RoomMorph.prototype.hasMultipleRoles = function() {
    return this.getRoleCount() > 1;
};

RoomMorph.prototype.getCurrentOccupants = function(name) {
    name = name || this.getCurrentRoleName();
    var role = this.getRole(name);

    if (role) {
        return role.users.slice();
    } else {
        return [];
    }
};

RoomMorph.prototype.getLeaderID = function() {
    // since the order is the same on each client, agree that
    // the first occupant is the leader. This user will accept/reject
    // edits to the project.
    const [leader] = this.getCurrentOccupants();
    return leader?.id;
};

RoomMorph.prototype.isLeader = function() {
    const leaderID = this.getLeaderID();
    return leaderID && leaderID === this.ide.cloud.clientId;
};

RoomMorph.prototype.myUserId = function() {
    return this.ide.cloud.username || localize('guest');
};

RoomMorph.prototype.isOwner = function(user) {
    if (RoomMorph.isSocketUuid(this.ownerId) && !user) {
        return this.ide.cloud.clientId === this.ownerId;
    }

    if (!user && this.ownerId === null) return true;

    user = user || this.ide.cloud.username;
    return this.ownerId && this.ownerId === user;
};

RoomMorph.prototype.isCollaborator = function(user) {
    user = user || this.ide.cloud.username;
    return this.collaborators.indexOf(user) > -1;
};

RoomMorph.prototype.isGuest = function(user) {
    return !(this.isOwner(user) || this.isCollaborator(user));
};

RoomMorph.prototype.isEditable = function() {
    return !this.isReadOnly && (this.isOwner() || this.isCollaborator());
};

RoomMorph.sameOccupants = function(list1, list2) {
    var uuids,
        usernames,
        otherUuids,
        otherUsernames,
        getUuid = function(role) {return role.uuid;},
        getUsername = function(role) {return role.name;};

    uuids = list1.map(getUuid);
    otherUuids = list2.map(getUuid);
    if (!RoomMorph.equalLists(uuids, otherUuids)) return false;

    usernames = list1.map(getUsername);
    otherUsernames = list2.map(getUsername);
    if (!RoomMorph.equalLists(usernames, otherUsernames)) return false;
    return true;
};

RoomMorph.equalLists = function(first, second) {
    if (first.length !== second.length) return false;
    for (var i = first.length; i--;) {
        if (first[i] !== second[i]) return false;
    }
    return true;
};

RoomMorph.prototype.onRoomStateUpdate = function(state) {
    this.update(
        state.owner,
        state.name,
        state.roles,
        state.collaborators
    );
    this.version += 1;
};

RoomMorph.prototype.update = function(ownerId, name, roles, collaborators) {
    var wasEditable = this.isEditable(),
        changed;

    changed = name && this.name !== name;
    if (changed) {
        this.silentSetRoomName(name);
    }

    // Check if it has changed in a meaningful way
    changed = changed ||
        wasEditable !== this.isEditable();

    if (roles) {
        changed = this.updateRoles(roles) || changed;
    }

    if (collaborators) {
        changed = changed || !RoomMorph.equalLists(collaborators, this.collaborators);
        this.setCollaborators(collaborators || this.collaborators);
    }

    // Update the roles, etc
    if (ownerId) {
        changed = changed || ownerId !== this.ownerId;
        this.setOwner(ownerId);
    }

    // Check if current role name changed...
    this.ide.silentSetProjectName(this.getCurrentRoleName());

    if (changed) {
        this.rerender();
        this.fixLayout();
    }

    // Update collaborative editing
    SnapActions.isLeader = this.isLeader();

    this.sendQueuedMessages();
};

RoomMorph.prototype.getRoleNames = function() {
    return this.getRoles().map(function(role) {
        return role.name;
    });
};

RoomMorph.prototype.getRoles = function() {
    return this.children.filter(function(child) {
        return child instanceof RoleMorph;
    });
};

RoomMorph.prototype.getOccupants = function() {
    return this.getRoles().flatMap(role => role.users);
};

RoomMorph.prototype.getRole = function(name) {
    //name = name || this.getCurrentRoleName();
    return this.getRoles().find(function(role) {
        return role.name === name;
    });
};

// Get the role given a client state from NetsBlox cloud
RoomMorph.prototype.getRoleFromState = function(state) {
    if (!state.browser) return;
    const {projectId, roleId} = state.browser;
    const isCurrentProject = this.projectId === this.ide.cloud.projectId;
    if (isCurrentProject) {
        return this.getRoles().find(role => role.id === roleId);
    }
};

RoomMorph.prototype.updateRoles = function(roleInfo) {
    var myself = this,
        roles = this.getRoles(),
        changed = false,
        occupants,
        ids;

    roles.forEach(function(role) {
        if (!roleInfo[role.id]) {
            role.destroy();
            changed = true;
        } else {
            // Update the occupants
            occupants = roleInfo[role.id].occupants;
            if (!RoomMorph.sameOccupants(role.users, occupants)) {
                role.setOccupants(occupants);
            }

            // Update the name
            role.setName(roleInfo[role.id].name);

            delete roleInfo[role.id];
        }
    });

    ids = Object.keys(roleInfo);
    ids.forEach(function(id) {
        var role = new RoleMorph(
            id,
            roleInfo[id].name,
            roleInfo[id].occupants
        );
        myself.add(role);
        changed = true;
    });

    return changed;
};

RoomMorph.prototype.getInnerHeight = function() {
    // Get the height of the morph w/o the owner, collaborator labels
    return (this.ownerLabel.top() - 10) - this.top();
};

RoomMorph.prototype.getRadius = function() {
    var innerHeight = this.getInnerHeight();
    return Math.min(this.width(), innerHeight)/2;
};

RoomMorph.prototype.getRoleSize = function() {
    // Compute the max size based on the angle
    // Given the angle, compute the distance between the points
    var roleCount = this.getRoles().length,
        angle = (2*Math.PI)/roleCount,
        radius = this.getRadius(),
        maxRoleSize = 150,
        minRoleGapSize = 10,
        startPoint,
        endPoint,
        roleSliceSize,  // given the number of roles
        quadrantSize,
        roleSize;

    startPoint = new Point(radius/2, 0);
    endPoint = (new Point(Math.cos(angle), Math.sin(angle))).multiplyBy(radius/2);
    roleSliceSize = startPoint.distanceTo(endPoint) - minRoleGapSize;
    quadrantSize = startPoint.distanceTo(new Point(0, radius/2)),

    roleSize = quadrantSize;
    if (angle < Math.PI/2) {
        roleSize = roleSliceSize;
    }
    return Math.min(roleSize, maxRoleSize);
};

RoomMorph.prototype.fixLayout = function() {
    // Position the roles
    var myself = this,
        roles = this.getRoles(),
        angleSize = 2*Math.PI/roles.length,
        angle = -Math.PI / 2 + this.index*angleSize,
        len = RoleMorph.COLORS.length,
        radius,
        position,
        circleSize,
        center,
        color,
        x,y,
        role;

    this.collabList.setCenter(this.center());
    this.collabList.setBottom(this.bottom() - 25);
    this.ownerLabel.setCenter(this.center());
    this.ownerLabel.setBottom(this.collabList.top() - 10);

    // Adjust the center...
    center = new Point(
        this.center().x,
        this.top() + this.getInnerHeight()/2
    );
    this.roomName.setCenter(center);

    radius = this.getRadius();
    circleSize = this.getRoleSize();
    for (var i = 0; i < roles.length; i++) {
        // position the label
        role = roles[i];
        angle = -Math.PI / 2 + i*angleSize,
        x = 0.65 * radius * Math.cos(angle);
        y = 0.65 * radius * Math.sin(angle);
        position = center.add(new Point(x, y));
        color = RoleMorph.COLORS[i%len];

        role.setExtent(new Point(circleSize, circleSize));
        role.setCenter(position);
        role.setColor(color);
    }

    // Update the positions of the message morphs
    this.displayedMsgMorphs.forEach(function(morph) {
        myself.updateDisplayedMsg(morph);
    });
};

RoomMorph.prototype.render = function(ctx) {
    //this.image = newCanvas(this.extent());

    // Update the title. Hide it if in replay mode
    if (this.isReadOnly) {
        this.roomName.hide();
    } else {
        this.roomName.show();
    }

    //this.getRoles().forEach(morph => morph.render(ctx));

    //this.displayedMsgMorphs.forEach(morph => morph.render(ctx));
};

RoomMorph.prototype.setOwner = function(owner) {
    this.ownerId = owner;
    const displayName = RoomMorph.isSocketUuid(this.ownerId) ?
        localize('myself') : this.ownerId;

    this.ownerLabel.text = localize('Owner: ') + displayName;
    this.ownerLabel.rerender();
};

RoomMorph.prototype.setCollaborators = function(collaborators) {
    this.collaborators = collaborators;
    if (this.collaborators.length) {
        this.collabList.text = localize('Collaborators') + ':\n' +
            this.collaborators.join(',\n');
    } else {
        this.collabList.text = 'No collaborators';
    }
    this.collabList.rerender();

};

RoomMorph.prototype.mouseClickLeft = function() {
    if (!this.isEditable() && !this.isReadOnly) {
        // If logged in, prompt about leaving the room
        if (this.ide.cloud.username) {
            this.ide.confirm(
                localize('would you like to leave "' + this.name + '"?'),
                localize('Leave Room'),
                this.ide.newProject.bind(this.ide)
            );
        } else {
            this.ide.showMessage(localize('Please login before editing the room'));
        }
    }
};

RoomMorph.prototype.editRoomName = function (preset = '') {
    var myself = this;
    if (!this.isEditable()) {
        return;
    }

    (new DialogBoxMorph(null, function (name) {
        if (RoomMorph.isEmptyName(name)) return;  // empty name = cancel

        if (!RoomMorph.isValidName(name)) {
            // Error! name has a . or @
            myself.editRoomName(name);
            new DialogBoxMorph().inform(
                'Invalid Project Name',
                'Could not set the project name because\n' +
                'the provided name is invalid',
                myself.world()
            );
        } else {
            myself.setRoomName(name);
        }
    })).withKey('editRoomName').prompt(
        'New Room Name',
        preset,
        this.world(),
        null,
        null
    );
};

RoomMorph.prototype.validateRoleName = function (name, onValid, onInvalid) {
    if (RoomMorph.isEmptyName(name)) return;  // empty role name = cancel

    if (this.getRole(name)) {
        onInvalid();

        // Error! Role exists
        new DialogBoxMorph().inform(
            'Existing Role Name',
            'Could not rename role because\n' +
            'the provided name already exists.',
            this.world()
        );
    } else if (!RoomMorph.isValidName(name)) {
        onInvalid();

        // Error! name has a . or @
        new DialogBoxMorph().inform(
            'Invalid Role Name',
            'Could not change the role name because\n' +
            'the provided name is invalid',
            this.world()
        );
    } else {
        onValid();
    }
};

RoomMorph.prototype.createNewRole = function (defaultName = '') {
    // Ask for a new role name
    (new DialogBoxMorph(null, roleName => {
        this.validateRoleName(roleName,
            () => this.ide.cloud.addRole(roleName),
            () => this.createNewRole(roleName),
        );
    })).withKey('createNewRole').prompt(
        'New Role Name',
        defaultName,
        this.world(),
        null,
        null
    );
};

RoomMorph.prototype.editRole = function(role) {
    // Show a dialog of options
    //   + rename role
    //   + delete role
    //   + invite user (if unoccupied)
    //   + transfer ownership (if occupied)
    //   + evict user (if occupied)
    //   + change role (if owned by self)
    var dialog = new EditRoleMorph(this, role),
        world = this.world();

    dialog.fixLayout();
    dialog.rerender();

    dialog.popUp(world);
    dialog.setCenter(world.center());
};

RoomMorph.prototype.editRoleName = function(roleId, roleName = '') {
    // Ask for a new role name
    var myself = this;

    (new DialogBoxMorph(null, function (roleName) {
        myself.validateRoleName(roleName, 
            function() {
                myself.setRoleName(roleId, roleName);
            }, 
            function () { 
                myself.editRoleName(roleId, roleName);
            });
    })).withKey('editRoleName').prompt(
        'Change Role Name',
        roleName,
        this.world(),
        null,
        null
    );
};

RoomMorph.prototype.moveToRole = async function(role) {
    var myself = this;

    myself.ide.showMessage('moving to ' + role.name);
    const {projectId} = this.ide.cloud;
    const metadata = await this.ide.cloud.getProjectMetadata(projectId);
    const roleData = await this.ide.cloud.getRole(projectId, role.id);
    await this.ide.rawLoadCloudRole(metadata, roleData);

    this.ide.showMessage('moved to ' + role.name + '!');
    this.ide.silentSetProjectName(role.name);
    this.ide.source = 'cloud';

    // Load the project or make the project empty
    if (metadata.public === true) {
        location.hash = '#present:Username=' +
            encodeURIComponent(metadata.owner) +
            '&ProjectName=' +
            encodeURIComponent(metadata.name);
    }

    if (roleData.code) {
        // TODO: add media
        this.ide.droppedText(roleData.code + roleData.media);
    } else {  // newly created role
        await SnapActions.openProject();
    }
};

RoomMorph.prototype.deleteRole = async function(role) {
    try {
        await this.ide.cloud.deleteRole(role.id);
    } catch (err) {
        this.ide.cloudError().call(null, err.message);
    }
};

RoomMorph.prototype.createRoleClone = async function(roleId) {
    var myself = this;
    var roleName = this.getRoles().find(function(role) {
        return role.id === roleId;
    }).name;

    await this.ide.cloud.cloneRole(roleId);
};

RoomMorph.prototype.role = function() {
    return this.ide.projectName;
};

RoomMorph.prototype.setRoleName = function(roleId, name) {
    var myself = this;

    if (!name) return;

    if (myself.getRoleNames().indexOf(name) !== -1) {
        myself.ide.showMessage(localize('Role name already exists.'));
        return;
    }

    myself.validateRoleName(name, () => this.ide.cloud.renameRole(roleId, name));
};

RoomMorph.prototype.evictUser = async function (user) {
    await this.ide.cloud.evictOccupant(user.id);
    this.ide.showMessage('Evicted ' + user.name + '!');
};

RoomMorph.prototype.inviteUser = async function (role) {
    var myself = this,
        friends = [];

    if (this.isOwner() || this.isCollaborator()) {
        try {
            friends = await this.ide.cloud.getFriendList();
        } catch (err) {
            myself.ide.cloudError().call(null, err.message);
        }
    }

    friends.unshift('myself');
    const world = this.world();
    const dialog = new InviteOccupantDialogMorph(this.ide, role.id);
    dialog.popUp(world);
    dialog.setCenter(world.center());
    dialog.filterField.edit();
};

// Accessed from right-clicking the TextMorph
RoomMorph.prototype.promptShare = function(name) {
    var roles = this.getRoleNames(),
        choices = {},
        world = this.world(),
        myself = this;

    roles.splice(roles.indexOf(this.ide.projectName), 1);  // exclude myself
    for (var i = 0; i < roles.length; i++) {
        choices[roles[i]] = roles[i];
    }

    // any roles available?
    if (Object.keys(roles).length) {
        // show user available roles
        var dialog = new DialogBoxMorph();
        dialog.prompt('Send to...', '', world, false, choices);
        dialog.accept = function() {
            const choice = dialog.getInput();
            if (roles.indexOf(choice) !== -1) {
                const role = myself.getRole(choice);
                const shareMessage = {
                    type: 'share-msg-type',
                    data: {
                        name: name,
                        fields: myself.ide.stage.messageTypes.getMsgType(name).fields
                    }
                };

                const sent = myself.sendMessageToRole(shareMessage, role.id);
                if (sent) {
                    myself.ide.showMessage('Successfully sent!', 2);
                } else {
                    myself.ide.showMessage('The role will receive this message type on next occupation.', 2);
                }
            } else {
                myself.ide.showMessage('There is no role by the name of \'' + choice + '\'!', 2);
            }
            this.destroy();
        };
    } else {  // notify user no available recipients
        myself.ide.showMessage('There are no other roles in the room!', 2);
    }
};

RoomMorph.prototype.inviteOccupant = function (friend, roleId) {
    // Use inviteOccupant service
    if (friend === 'myself') {
        friend = this.ide.cloud.username;
    }
    this.ide.cloud.sendOccupantInvite(friend, roleId);
};

RoomMorph.prototype.promptInvite = function (projectId, roleId, projectName, inviter) {
    // Create a confirm dialog about joining the group
    const dialog = new DialogBoxMorph(
        null,
        async () => {
            const metadata = await this.ide.cloud.getProjectMetadata(projectId);
            const roleData = await this.ide.cloud.getRole(projectId, roleId);
            await this.ide.rawLoadCloudRole(metadata, roleData);
        }
    ).withKey('invite/' + projectId + '/' + roleId);

    const msg = inviter === this.ide.cloud.username ?
        'Would you like to move to "' + projectName + '"?' :
        inviter + ' has invited you to join\nhim/her at "' + projectName + '"';

    dialog.askYesNo(
        'Room Invitation',
        localize(msg),
        this.ide.world()
    );

    setTimeout(
        () => dialog.destroy(),
        15000
    );
};

RoomMorph.prototype.respondToInvitation = function (id, role, accepted) {
    // TODO: join the role (use the token?)
    const cloud = this.ide.cloud;
    cloud.respondToInvitation(
        id,
        accepted,
        async project => {
            // Load the project or make the project empty
            if (!accepted) return;

            this.ide.source = 'cloud';
            if (project.Public === 'true') {
                location.hash = '#present:Username=' +
                    encodeURIComponent(cloud.username) +
                    '&ProjectName=' +
                    encodeURIComponent(project.ProjectName);
            }
            const msg = this.ide.showMessage(localize('Opening ') + role +
                localize(' at ') + project.RoomName);
            if (project.SourceCode) {
                await this.ide.droppedText(project.SourceCode);
            } else {  // Empty the project
                this.ide.newRole(role);
                await SnapActions.openProject();
            }
            msg.destroy();
            this.ide.silentSetProjectName(role);
        },
        err => this.ide.showMessage(err, 2)
    );
};

RoomMorph.prototype.sendMessageToRole = function(msg, roleId) {
    msg.roleId = roleId;
    msg.from = this.ide.projectName;
    this.queuedRoleMsgs.push(msg);
    const sentMsgs = this.sendQueuedMessages();
    return sentMsgs.includes(msg);
};

RoomMorph.prototype.sendQueuedMessages = function() {
    const [queuedRoleMsgs, sentMsgs] = utils.partition(
        this.queuedRoleMsgs,
        msg => {
            const role = this.getRoles().find(role => role.id === msg.roleId);
            if (!role) return false;  // role no longer exists

            if (role.users.length > 0) {
                const clientId = role.users[0].id;
                this.ide.sockets.sendIDEMessage(msg, clientId);
                return false;
            }

            return true;
        }
    );

    this.queuedRoleMsgs = queuedRoleMsgs;
    return sentMsgs;
};

RoomMorph.prototype.showMessage = function(msg, msgIndex) {
    const {source} = msg;

    // Get the target role(s)
    msg.recipients.forEach(state => {
        const srcRole = this.getRoleFromState(source);
        const dstRole = this.getRoleFromState(state);
        if (srcRole && dstRole) {
            this.showSentMsg(msg, srcRole, dstRole, msgIndex);
        }
    });
};

RoomMorph.prototype.showSentMsg = function(msg, srcRole, dstRole, msgLabel) {
    const relEndpoint = dstRole.center().subtract(srcRole.center());
    const msgMorph = new SentMessageMorph(msg, srcRole.name, dstRole.name, relEndpoint, msgLabel);

    this.addBack(msgMorph);
    this.displayedMsgMorphs.push(msgMorph);
    this.updateDisplayedMsg(msgMorph);

    // If the message is sent to the current role, highlight the blocks
    // that handled the message

    this.clearBlockHighlights();
    if (dstId === this.getCurrentRoleName()) {
        var stage = this.ide.stage,
            blocks = stage.children.concat(stage)
                .map(function (morph) {
                    var blocks = [];
                    if (morph instanceof SpriteMorph || morph instanceof StageMorph) {
                        blocks = morph.allHatBlocksForSocket(msg.msgType);
                    }
                    return blocks;
                })
                .flat();

        this.blockHighlights = blocks.map(function(block) {
            return block.addHighlight();
        });
    }

    // Only update the inspector if there are
    if (this.messageInspector) {
        if (!msgLabel) {
            this.messageInspector.setMessage(msgMorph.message);
        } else {  // close the message inspector
            this.messageInspector.destroy();
            this.messageInspector = null;
        }
    }
};

RoomMorph.prototype.updateDisplayedMsg = function(msg) {
    // Update the msg morph position and size
    var srcRole = this.getRole(msg.srcRoleName),
        dstRole = this.getRole(msg.dstRoleName),
        srcPoint = srcRole.center(),
        dstPoint = dstRole.center(),
        relEndpoint = dstPoint.subtract(srcPoint),
        roleRadius = this.getRoleSize()/2,
        size;

    // move the relEndpoint so that it doesn't overlap the roles
    var dist = dstPoint.distanceTo(srcPoint),
        targetDist = dist - 2*roleRadius;

    relEndpoint = relEndpoint.scaleBy(targetDist/dist);

    size = relEndpoint.abs().add(2*msg.padding);
    msg.setExtent(size);
    msg.setCenter(dstPoint.add(srcPoint).divideBy(2));
    msg.endpoint = relEndpoint;
    msg.setMessageColor(srcRole.color.darker());
    msg.rerender();
};

RoomMorph.prototype.clearBlockHighlights = function() {
    this.blockHighlights.forEach(function(highlight) {
        var block = highlight.parent;
        if (block && block.getHighlight() === highlight) {
            block.removeHighlight();
        }
    });
    this.blockHighlights = [];
};

RoomMorph.prototype.hideSentMsgs = function() {
    this.displayedMsgMorphs.forEach(function(msgMorph) {
        msgMorph.destroy();
    });
    this.displayedMsgMorphs = [];
};

RoomMorph.prototype.isCapturingTrace = function() {
    return this.trace.id && !this.trace.messages;
};

RoomMorph.prototype.isReplayingTrace = function() {
    return !!this.trace.replayer;
};

RoomMorph.prototype.startTraceReplay = function(replayer) {
    this.setReadOnly(true);

    replayer.setMessages(this.trace.messages);
    this.trace.replayer = replayer;
};

RoomMorph.prototype.stopTraceReplay = function() {
    this.hideSentMsgs();
    this.clearBlockHighlights();
    this.setReadOnly(false);
    this.trace.replayer = null;
    if (this.messageInspector) {
        this.messageInspector.destroy();
        this.messageInspector = null;
    }
};

RoomMorph.prototype.resetTrace = function() {
    this.trace = {};
};

RoomMorph.prototype.startTrace = async function() {
    const {projectId} = this.ide.cloud;
    const id = await this.ide.cloud.startNetworkTrace(projectId);
    this.trace = {id};
};

RoomMorph.prototype.endTrace = async function() {
    const {projectId} = this.ide.cloud;
    this.trace.messages = await this.ide.cloud.getNetworkTrace(projectId, this.trace.id);
    await this.ide.cloud.stopNetworkTrace(projectId, this.trace.id);

    if (this.trace.messages.length === 0) {
        this.ide.showMessage('No messages captured', 2);
        this.resetTrace();
    }
};

RoomMorph.prototype.inspectMessage = function(msg) {
    this.messageInspector = new MessageInspectorMorph(msg);
    this.messageInspector.popUp(this.world());
};

//////////// SentMessageMorph ////////////
// Should:
//  - draw an arrow from the source to the destination
//  - not be draggable
SentMessageMorph.prototype = new Morph();
SentMessageMorph.prototype.constructor = SentMessageMorph;
SentMessageMorph.uber = Morph.prototype;

function SentMessageMorph(msg, srcId, dstId, endpoint, label) {
    this.init(msg, srcId, dstId, endpoint, label);
}

SentMessageMorph.prototype.init = function(msg, srcId, dstId, endpoint, label) {
    this.srcRoleName = srcId;
    this.dstRoleName = dstId;
    this.padding = 10;

    this.endpoint = endpoint;
    this.message = new MessageMorph(msg.msgType, msg.content);
    SentMessageMorph.uber.init.call(this);

    this.label = null;
    if (label) {
        this.label = new StringMorph(
            label.toString(),
            18,
            null,
            null,
            true
        );
        this.label.color = WHITE;
        this.label.rerender();
        this.add(this.label);
    }
    this.color = WHITE;
    this.add(this.message);
};

SentMessageMorph.prototype.render = function(context) {
    //this.image = newCanvas(this.extent());
    var isRight = this.endpoint.x > 0,
        isDownwards = this.endpoint.y > 0,
        startX = isRight ? 0 : -this.endpoint.x,
        startY = isDownwards ? 0 : -this.endpoint.y,
        start = new Point(startX, startY),
        end;

    // Get the startpoint (depends on the sign of the x,y values)
    start = start.add(this.padding);
    end = start.add(this.endpoint);

    // Draw a line from the current position to the endpoint
    context.strokeStyle = this.color.toString();
    context.fillStyle = this.color.toString();
    context.lineWidth = 2.5;

    context.beginPath();
    context.setLineDash([5, 5]);
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();

    context.beginPath();
    context.setLineDash([]);

    // Draw an arrow at the end
    var da = Math.PI/6,
        angle = Math.atan2(this.endpoint.y, this.endpoint.x) + Math.PI,
        size = 7.5,
        relLeftPoint = new Point(Math.cos(angle-da), Math.sin(angle-da)).multiplyBy(size),
        relRightPoint = new Point(Math.cos(angle+da), Math.sin(angle+da)).multiplyBy(size),
        leftPoint = end.add(relLeftPoint),
        rightPoint = end.add(relRightPoint);

    context.moveTo(end.x, end.y);
    context.lineTo(leftPoint.x, leftPoint.y);
    context.lineTo(rightPoint.x, rightPoint.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    context.fill();

    this.fixLayout();
};

SentMessageMorph.prototype.fixLayout = function() {
    // position the message icon
    this.message.setCenter(this.center());
    if (this.label) {
        var padding = 5;

        // align just to the right of the message morph
        this.label.setCenter(this.message.center());
        this.label.setRight(this.message.left() - 5);
    }
};

SentMessageMorph.prototype.setMessageColor = function(color) {
    this.message.icon.setColor(color);
};

MessageMorph.prototype = new Morph();
MessageMorph.prototype.constructor = MessageMorph;
MessageMorph.uber = Morph.prototype;

function MessageMorph(type, contents) {
    this.init(type, contents);
}

MessageMorph.prototype.init = function (type, contents) {
    this.msgType = type;
    this.contents = contents;

    MessageMorph.uber.init.call(this);
    this.setColor(IDE_Morph.prototype.groupColor);
    this.icon = new SymbolMorph('mail', 25);
    this.icon.setHeight(25);
    this.icon.rerender();

    this.label = new StringMorph(
        type,
        12,
        null,
        null,
        true
    );
    this.label.color = WHITE;
    this.label.rerender();

    this.add(this.label);
    this.add(this.icon);

    this.fixLayout();
};

MessageMorph.prototype.fixLayout = function () {
    this.icon.setCenter(this.center());
    this.icon.setTop(this.top());

    this.label.setCenter(this.center());
    this.label.setBottom(this.bottom());
};

MessageMorph.prototype.getTableContents = function () {
    var myself = this,
        fields = Object.keys(this.contents),
        table = new Table(2, fields.length);

    fields.forEach(function(field, index) {
        table.contents[index][0] = field;
        table.contents[index][1] = myself.deserializeData([myself.contents[field]])[0];
    });
    table.colNames.push('field');
    table.colNames.push('value');

    return table;
};

MessageMorph.prototype.deserializeData =
    WebSocketManager.prototype.deserializeData;

MessageMorph.prototype.mouseClickLeft = function () {
    var room = this.parentThatIsA(RoomMorph);

    room.inspectMessage(this);
};

MessageInspectorMorph.prototype = Object.create(TableDialogMorph.prototype);
MessageInspectorMorph.prototype.constructor = MessageInspectorMorph;
MessageInspectorMorph.uber = TableDialogMorph.prototype;

function MessageInspectorMorph(message) {
    this.init(message);
}

MessageInspectorMorph.prototype.init = function (message) {
    MessageInspectorMorph.uber.init.call(this, message.getTableContents());
    this.key = 'inspectNetworkMessage';

    this.labelString = localize('Contents of') + ' "' + message.msgType + '"';
    this.createLabel();
};

MessageInspectorMorph.prototype.setInitialDimensions = function () {
    var world = this.world(),
        mex = world.extent().subtract(new Point(this.padding, this.padding)),
        th = fontHeight(this.titleFontSize) + this.titlePadding * 3, // hm...
        minWidth = Math.max(100, this.label.width() + 2*margin),
        bh = this.buttons.height(),
        margin = 10;

    this.setExtent(
        this.tableView.globalExtent().add(
            new Point(this.padding * 2, this.padding * 2 + th + bh)
        ).min(mex).max(new Point(minWidth, 100))
    );
    this.setCenter(this.world().center());
};

MessageInspectorMorph.prototype.setMessage = function (message) {
    this.tableView = new TableMorph(message.getTableContents());

    this.labelString = localize('Contents of') + ' "' + message.msgType + '"';
    this.createLabel();

    this.addBody(new TableFrameMorph(this.tableView, true));
    this.fixLayout();
    this.rerender();
};

//////////// Network Replay Controls ////////////
NetworkReplayControls.prototype = Object.create(ReplayControls.prototype);
NetworkReplayControls.prototype.constructor = NetworkReplayControls;
NetworkReplayControls.uber = ReplayControls.prototype;

function NetworkReplayControls() {
    this.init();
}

NetworkReplayControls.prototype.init = function() {
    NetworkReplayControls.uber.init.call(this);
    this.displayedMsgCount = 1;
};

NetworkReplayControls.prototype.displayCaption = function(/*event*/) {
    // for now, we will not display any captions
};

NetworkReplayControls.prototype.setMessages = function(messages) {
    return this.setActions(messages);
};

NetworkReplayControls.prototype.applyEvent = function(event, next) {
    this.updateDisplayedMessages();
    next();
};

NetworkReplayControls.prototype.getSliderPosition = function(message) {
    return this.getSliderPositionFromTime(message.time.$date.$numberLong);
};

NetworkReplayControls.prototype.updateDisplayedMessages = function() {
    var ide = this.parentThatIsA(IDE_Morph),
        room = ide.room,
        event = this.actions[this.actionIndex];

    // Clear the last message(s)
    room.hideSentMsgs();

    if (!event) return;

    // Make sure that the slider position is at the current event
    var value = this.getSliderPosition(event);

    this.slider.button.setLeft(this.getSliderLeftFromValue(value));
    this.slider.updateValue();

    if (this.displayedMsgCount > 1) {
        var displayedMsgCount = Math.min(this.displayedMsgCount, this.actionIndex+1),
            startIndex = this.actionIndex - displayedMsgCount + 1;

        // Show each message
        for (var i = 0; i < displayedMsgCount; i++) {
            event = this.actions[startIndex+i];
            room.showMessage(event, i+1);
        }
    } else {
        room.showMessage(event);
    }
};

NetworkReplayControls.prototype.settingsMenu = function() {
    var myself = this,
        menu = NetworkReplayControls.uber.settingsMenu.call(this),
        submenu = new MenuMorph(myself),
        counts = [1, 2, 3, 4, 5];

    counts.forEach(function(count) {
        var suffix = count === 1 ? 'message' : 'messages';
        submenu.addItem(count + ' ' + localize(suffix), function() {
            myself.displayedMsgCount = count;
            myself.updateDisplayedMessages();
        }, null, null, myself.displayedMsgCount === count);
    });
    menu.addMenu('Displayed Message Count...', submenu);

    menu.rerender();
    return menu;
};

NetworkReplayControls.prototype.getColorForTick = function(msgData) {
    var ide = this.parentThatIsA(IDE_Morph),
        room = ide.room;
    const {source} = msgData;
    const roleId = source.browser?.roleId;
    const role = room.getRoles().find(role => role.id === roleId);

    if (role) {
        return role.color;
    }
};

NetworkReplayControls.prototype.getInverseEvent = function(event) {
    var inverseEvent = copy(event);
    inverseEvent.isInverse = true;
    return inverseEvent;
};

RoleMorph.prototype = new Morph();
RoleMorph.prototype.constructor = RoleMorph;
RoleMorph.uber = Morph.prototype;
RoleMorph.COLORS = [
    new Color(74, 108, 212),
    new Color(217, 77, 17).lighter(),
    new Color(207, 74, 217),
    new Color(0, 161, 120),
    new Color(143, 86, 227),
    new Color(230, 168, 34),
    new Color(4, 148, 220),
    new Color(98, 194, 19),
    new Color(243, 118, 29),
    new Color(150, 150, 150)
].map(function(color) {
    return color.darker();
});

// The role morph needs to know where to draw itself
function RoleMorph(id, name, users) {
    this.init(id, name, users);
}

RoleMorph.prototype.init = function(id, name, users) {
    RoleMorph.uber.init.call(this, true);
    this.id = id;
    this.name = name;
    this.users = [];

    this.label = new StringMorph(
        this.name,
        15,
        null,
        true,
        false,
        false,
        null,
        null,
        WHITE
    );
    this.label.mouseClickLeft = function() {
        var room = this.parentThatIsA(RoomMorph);
        if (room.isEditable()) {
            room.editRoleName(id, this.parent.name);
        }
    };

    this.label.mouseEnter = function() {
        var room = this.parentThatIsA(RoomMorph);
        if (room.isEditable()) {
            this.setFontSize(17);
        }
    };
    this.label.mouseLeave = function() {
        this.setFontSize(15);
    };

    this.caption = new StringMorph(
        '',
        14,
        null,
        false,
        true,
        false,
        null,
        null,
        WHITE
    );
    this.add(this.label);
    this.add(this.caption);
    this.acceptsDrops = true;
    this.setOccupants(users);
    this.rerender();
};

RoleMorph.prototype.setName = function(name) {
    this.name = name;
    this.label.text = name;
    this.label.rerender();
};

RoleMorph.prototype.wantsDropOf = function(aMorph) {
    return aMorph instanceof ReporterBlockMorph && aMorph.forMsg;
};

RoleMorph.prototype.setOccupants = function(users) {
    this.users = users;
    // Update the contents of the caption
    var userText = '<empty>';
    if (this.users.length) {
        userText = this.users.map(function(user){
            return user.name || localize('guest');
        }).join(', ');
    }

    this.caption.text = userText;
    this.caption.changed();
    this.caption.fixLayout();
    this.caption.rerender();
};

RoleMorph.prototype.setName = function(name) {
    this.name = name;
    this.label.text = name;
    this.label.changed();
    this.label.fixLayout();
    this.label.rerender();
};

RoleMorph.prototype.render = function(cxt) {
    var room = this.parentThatIsA(RoomMorph),
        center,
        height,
        radius;

    if (room && room.isReadOnly) {
        this.caption.hide();
    } else {
        this.caption.show();
    }

    this.fixLayout();
    height = Math.max(this.height() - this.caption.height(), 0);
    radius = Math.min(this.width(), height)/2;
    center = new Point(this.width()/2-radius, height/2-radius).add(radius),

    // Create the image
    cxt.beginPath();
    cxt.fillStyle = this.color.toString();
    cxt.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
    cxt.closePath();
    cxt.fill();
    cxt.strokeStyle = this.color.darker(50).toString();
    cxt.stroke();

    this.changed();
};

RoleMorph.prototype.fixLayout = function() {
    var center = this.center();
    this.label.setCenter(new Point(center.x, center.y - this.caption.height()/2));
    this.caption.setCenter(center);
    this.caption.setBottom(this.bottom());
};

RoleMorph.prototype.mouseClickLeft = function() {
    var room = this.parentThatIsA(RoomMorph);
    if (room.isEditable()) {
        room.editRole(this);
    } else {
        this.escalateEvent('mouseClickLeft');
    }
};

RoleMorph.prototype.reactToDropOf = function(drop) {
    // Message palette drag-and-drop
    if (drop instanceof ReporterBlockMorph && drop.forMsg) {
        shareMsgType(this, drop.blockSpec, this.parent.ide.stage.messageTypes.getMsgType(drop.blockSpec).fields);
    }

    // Block drag-and-drop (hat/command message blocks)
    if (drop.selector === 'receiveSocketMessage' || drop.selector === 'doSocketMessage') {
        // find message morph
        var msgMorph;
        for (var i = 0; i < drop.children.length; i++) {
            if (drop.children[i] instanceof MessageOutputSlotMorph || drop.children[i] instanceof MessageInputSlotMorph) {
                msgMorph = drop.children[i];
                break;
            }
        }

        if (msgMorph.children[0].text !== '') {  // make sure there is a message type to send...
            shareMsgType(this, msgMorph.children[0].text, msgMorph.msgFields);
        }
    }

    // Share the intended message type
    function shareMsgType(myself, name, fields) {
        if (myself.parent.ide.projectName === myself.name) {  // occupied & myself
            myself.parent.ide.showMessage('Can\'t send a message type to yourself!', 2);
            return;
        }

        const shareMessage = {
            type: 'share-msg-type',
            data: { name, fields },
        };

        const sent = myself.parent.sendMessageToRole(shareMessage, myself.id);
        if (sent) {
            myself.parent.ide.showMessage('Successfully sent!', 2);
        } else {
            myself.parent.ide.showMessage('The role will receive this message type on next occupation.', 2);
        }
    }
    drop.destroy();
};

EditRoleMorph.prototype = new DialogBoxMorph();
EditRoleMorph.prototype.constructor = EditRoleMorph;
EditRoleMorph.uber = DialogBoxMorph.prototype;
function EditRoleMorph(room, role) {
    this.init(room, role);
}

EditRoleMorph.prototype.init = function(room, role) {
    const {name} = role;
    const cloud = room.ide.cloud;
    EditRoleMorph.uber.init.call(this);
    this.room = room;
    this.role = role;
    this.users = role.users;

    var txt = new TextMorph(
        'What would you like to do?',
        null,
        null,
        true,
        false,
        'center',
        null,
        null,
        MorphicPreferences.isFlat ? null : new Point(1, 1),
        WHITE
    );

    this.labelString = localize('Edit') + ' ' + name;
    this.createLabel();
    this.addBody(txt);

    // Role Actions
    this.addButton('createRoleClone', 'Duplicate');

    if (role.users.length) {  // occupied
        // owner can evict collaborators, collaborators can evict guests

        if (name !== this.room.role()) {
            this.addButton('moveToRole', 'Move to');
        }
        this.addButton('inviteUser', 'Invite User');

        const hasEvictableUsers = this.role.users
            .filter(user => user.id !== cloud.clientId)
            .length;
        if (this.room.isOwner() && hasEvictableUsers) {
            this.addButton('evictUser', 'Evict User');
        }
    } else {  // vacant
        this.addButton('moveToRole', 'Move to');
        this.addButton('inviteUser', 'Invite User');
        this.addButton('deleteRole', 'Delete role');
    }
    this.addButton('cancel', 'Cancel');
    this.fixLayout();
};

EditRoleMorph.prototype.inviteUser = function() {
    this.room.inviteUser(this.role);
    this.destroy();
};

EditRoleMorph.prototype.fixLayout = function() {
    var center = this.center();

    EditRoleMorph.uber.fixLayout.call(this);

    if (this.label) {
        this.label.setLeft(center.x - this.label.width()/2);
    }

    if (this.body) {
        this.body.setLeft(center.x - this.body.width()/2);
    }
};

EditRoleMorph.prototype.editRoleName = function() {
    this.room.editRoleName(this.role.id);
    this.destroy();
};

EditRoleMorph.prototype.createRoleClone = function() {
    this.room.createRoleClone(this.role.id);
    this.destroy();
};

EditRoleMorph.prototype.deleteRole = function() {
    this.room.deleteRole(this.role);
    this.destroy();
};

EditRoleMorph.prototype.moveToRole = async function() {
    var myself = this,
        ide = this.room.ide,
        dialog,
        currentRole = this.room.getCurrentRoleName(),
        callback = function() {
            myself.room.moveToRole(myself.role);
        };

    myself.destroy();

    if (SnapActions.lastSeen > 0) {  // Prompt about saving the current role
        dialog = new DialogBoxMorph(null);

        // Prompt the user about saving the role...
        dialog.accept = async function() {
            try {
                const roleData = ide.sockets.getSerializedProject();
                await ide.cloud.saveRole(roleData);
                ide.showMessage('Saved ' + currentRole + ' to cloud!', 2);
            } catch (err) {
                ide.cloudError()(err.message);
            }
            dialog.destroy();
            callback();
        };

        dialog.cancel = function() {  // don't overwrite
            callback();
            dialog.destroy();
        };
        dialog.askYesNo(
            localize('Save Current Role'),
            localize('Would you like to save changes to') + ' ' + currentRole +
                ' ' + localize('before moving to') + ' ' + myself.role.name + '?',
            myself.world()
        );
    } else {
        callback();
    }
};

EditRoleMorph.prototype.evictUser = function() {
    const cloud = this.room.ide.cloud;
    const user = this.role.users.find(user => user.id !== cloud.clientId);
    this.room.evictUser(user);
    this.destroy();
};

// RoomEditorMorph ////////////////////////////////////////////////////////////

// I am an editor for the RoomMorph and network debugger

RoomEditorMorph.prototype = new ScrollFrameMorph();
RoomEditorMorph.prototype.constructor = RoomEditorMorph;
RoomEditorMorph.uber = ScrollFrameMorph.prototype;

function RoomEditorMorph(room, sliderColor) {
    this.init(room, sliderColor);
}

RoomEditorMorph.prototype.init = function(room, sliderColor) {
    RoomEditorMorph.uber.init.call(this, null, null, sliderColor);

    this.room = room;
    this.add(room);

    this.palette = this.createMsgPalette();
    this.add(this.palette);

    // Replay Controls
    if (this.room.isReplayingTrace()) {
        this.replayControls = this.room.trace.replayer;
    } else {
        this.replayControls = new NetworkReplayControls(this);
        this.replayControls.hide();
    }

    this.add(this.replayControls);
    this.replayControls.rerender();

    var button = new PushButtonMorph(
        this.room,
        'createNewRole',
        new SymbolMorph('cross', 12)
    );
    button.padding = 0;
    button.corner = 12;
    button.color = IDE_Morph.prototype.groupColor;
    button.highlightColor = IDE_Morph.prototype.frameColor.darker(50);
    button.pressColor = button.highlightColor;
    button.labelMinExtent = new Point(36, 18);
    button.labelShadowOffset = new Point(-1, -1);
    button.labelShadowColor = button.highlightColor;
    button.labelColor = TurtleIconMorph.prototype.labelColor;
    button.contrast = this.buttonContrast;
    button.rerender();

    button.hint = 'Add a role to the room';

    button.fixLayout();

    this.add(button);
    this.addRoleBtn = button;

    this.room.rerender();
    this.updateToolbar();

    this.acceptsDrops = false;
    this.contents.acceptsDrops = false;
};

RoomEditorMorph.prototype.step = function() {
    if (this.version !== this.room.version) {
        this.updateToolbar();
        this.version = this.room.version;
    }

    var stage = this.room.ide.stage;
    if (this.palette.version !== stage.messageTypes.version) {
        this.updateMsgPalette();
    }
};

RoomEditorMorph.prototype.show = function() {
    RoomEditorMorph.uber.show.call(this);
    if (!this.isReplayMode()) {
        this.replayControls.hide();
    }
};

RoomEditorMorph.prototype.updateToolbar = function() {
    var sf = this.parentThatIsA(ScrollFrameMorph);

    if (!sf) {return; }

    if (sf.toolBar) {
        sf.removeChild(sf.toolBar);
        this.changed();
    }
    sf.toolBar = this.addToolbar();
    sf.add(sf.toolBar);

    //sf.toolBar.isVisible = !this.replayControls.enabled;
    sf.toolBar.fixLayout();
    sf.toolBar.rerender();

    sf.adjustToolBar();
    this.updateRoomControls();
};

RoomEditorMorph.prototype.addToolbar = function() {
    var myself = this,
        toolBar = new AlignmentMorph(),
        shade = (new Color(140, 140, 140)),
        recordSymbol = new SymbolMorph('circleSolid', 14),
        stopRecordSymbol = new SymbolMorph('square', 14),
        enterSymbol = new SymbolMorph('pointRight', 14),
        exitSymbol = new SymbolMorph('square', 14);

    if (this.hasNetworkRecording()) {
        var replayButton = new PushButtonMorph(
            this,
            function() {
                // FIXME: change this when we have an exit button on the replay slider
                if (this.isReplayMode()) {
                    myself.exitReplayMode();
                } else {
                    myself.enterReplayMode();
                }
                myself.updateToolbar();
            },
            this.isReplayMode() ? exitSymbol : enterSymbol,
            null,

            this.isReplayMode() ? localize('Exit network trace replayer') :
                localize('View last network trace')
        );
        replayButton.alpha = 0.2;
        replayButton.labelShadowColor = shade;
        replayButton.rerender();
        replayButton.fixLayout();

        toolBar.replayButton = replayButton;
        toolBar.add(replayButton);
    }

    var recordButton = new PushButtonMorph(
        this,
        async () => {
            if (this.isReplayMode()) {
                this.exitReplayMode();
            }
            await this.toggleRecordMode();
            this.updateToolbar();
        },
        this.isRecording() ? stopRecordSymbol : recordSymbol,
        null,
        this.isRecording() ? localize('Stop capturing network trace') :
            localize('Start capturing network trace')
    );
    recordButton.labelColor = new Color(125, 0, 0);
    recordButton.alpha = 0.2;
    recordButton.labelShadowColor = shade;
    recordButton.rerender();
    recordButton.fixLayout();

    toolBar.recordButton = recordButton;
    toolBar.add(recordButton);

    return toolBar;
};

RoomEditorMorph.prototype.fixLayout = function() {
    var controlsHeight = 80,
        roomSize = this.extent();

    roomSize.y = roomSize.y - (controlsHeight + 35);
    this.room.setExtent(roomSize);
    this.room.setCenter(this.center().subtract(controlsHeight/2));
    this.room.fixLayout();

    this.updateMsgPalette();

    this.addRoleBtn.setCenter(this.room.center());
    this.addRoleBtn.setTop(this.room.roomName.bottom() + 5);

    this.replayControls.setWidth(this.width()-40);
    this.replayControls.setHeight(controlsHeight);
    this.replayControls.setCenter(new Point(this.center().x, 0));
    this.replayControls.setBottom(this.bottom());
    this.replayControls.fixLayout();
};

RoomEditorMorph.prototype.setExtent = function(point) {
    RoomEditorMorph.uber.setExtent.call(this, point);

    this.fixLayout();
};

RoomEditorMorph.prototype.isRecording = function() {
    return this.room.isCapturingTrace();
};

RoomEditorMorph.prototype.hasNetworkRecording = function() {
    const trace = this.room.trace || {};
    return trace.messages?.length;
};

RoomEditorMorph.prototype.toggleRecordMode = async function() {
    if (this.isRecording()) {
        await this.exitRecordMode();
    } else {
        this.enterRecordMode();
    }
};

RoomEditorMorph.prototype.enterRecordMode = function() {
    if (SnapActions.isCollaborating()) {
        this.room.ide.showMessage(localize('Cannot trace network actions while collaborating'));
        return;
    }

    this.room.startTrace();
};

RoomEditorMorph.prototype.exitRecordMode = async function() {
    await this.room.endTrace();
};

RoomEditorMorph.prototype.isReplayMode = function() {
    return this.replayControls.enabled;
};

RoomEditorMorph.prototype.exitReplayMode = function() {
    this.replayControls.disable();
    this.room.stopTraceReplay();
};

RoomEditorMorph.prototype.enterReplayMode = function() {
    if (SnapActions.isCollaborating()) {
        this.room.ide.showMessage(localize('Cannot replay network actions while collaborating'));
        return;
    }

    this.replayControls.enable();
    this.room.startTraceReplay(this.replayControls);
    this.updateRoomControls();
};

RoomEditorMorph.prototype.updateRoomControls = function() {
    // Draw the room
    this.room.rerender();

    // Draw the "new role" button
    if (this.room.isEditable() && !this.isReplayMode()) {
        this.addRoleBtn.show();
    } else {
        this.addRoleBtn.hide();
    }
};

RoomEditorMorph.prototype.createMsgPalette = function() {
    var palette = new ScrollFrameMorph();
    palette.setColor(new Color(0, 0, 0, 0));
    palette.acceptsDrops = false;
    palette.contents.acceptsDrops = false;
    return palette;
};

RoomEditorMorph.prototype.updateMsgPalette = function() {
    const margin = 10;
    var stage = this.room.ide.stage,
        palette = this.palette,
        msgs = stage.deletableMessageNames(),
        msg;


    palette.contents.children.forEach(function(child) {
        palette.contents.removeChild(child);
    });

    const position = new Point(
        palette.bounds.origin.x + margin,
        palette.bounds.origin.y + margin,
    );
    const msgExtent = new Rectangle();
    msgExtent.origin = palette.bounds.origin.copy();
    msgExtent.setExtent(ZERO);
    for (var i = 0; i < msgs.length; i++) {
        // Build block morph
        msg = new ReporterBlockMorph();
        msg.category = 'network';
        msg.blockSpec = msgs[i];
        msg.setSpec(msgs[i]);
        msg.forMsg = true;
        msg.isTemplate = true;
        msg.setColor(new Color(217,77,17));
        msg.setPosition(position);
        position.y += msg.height() + margin;
        msgExtent.mergeWith(msg.bounds);
        // Don't allow multiple instances of the block to exist at once
        msg.justDropped = function() {
            this.destroy();
        };
        // Display fields of the message type when clicked
        msg.mouseClickLeft = function() {
            var fields = stage.messageTypes.msgTypes[this.blockSpec].fields.length === 0 ?
                'This message type has no fields.' :
                stage.messageTypes.msgTypes[this.blockSpec].fields;

            const bubble = new SpeechBubbleMorph(fields, null, null, 2);
            const position = new Point(0, 0).add(this.bounds.corner);
            bubble.popUp(this.world(), position);
        };

        // Custom menu
        var menu = new MenuMorph(this, null);
        menu.addItem('Send to...', function() {this.room.promptShare(msg.blockSpec);});
        msg.children[0].customContextMenu = menu;
        msg.customContextMenu = menu;

        palette.contents.add(msg);
    }
    const leftMost = this.room.getRoles()
        .map(role => role.left())
        .reduce((leftMost, left) => Math.min(left, leftMost), Infinity);
    const maxWidth = leftMost - this.left();
    const maxHeight = this.room.height();

    palette.bounds.setWidth(Math.min(msgExtent.width() + margin, maxWidth));
    palette.bounds.setHeight(Math.min(msgExtent.height() + margin, maxHeight));
    let extent = palette.contents.children.reduce(
        (point, child) => point.max(child.bounds.extent()),
        palette.bounds.extent(),
    );
    palette.contents.bounds.setExtent(extent);

    palette.contents.adjustBounds();
    palette.fixLayout();
    palette.rerender();
    palette.version = stage.messageTypes.version;
};

// UserDialogMorph ////////////////////////////////////////////////////

// UserDialogMorph inherits from DialogBoxMorph:

UserDialogMorph.prototype = new DialogBoxMorph();
UserDialogMorph.prototype.constructor = UserDialogMorph;
UserDialogMorph.uber = DialogBoxMorph.prototype;

// UserDialogMorph instance creation:

function UserDialogMorph(target, title='Friends') {
    this.init(target, title);
}

UserDialogMorph.prototype.init = function(target, title) {
    UserDialogMorph.uber.init.call(
        this,
        target, // target
        nop, // function
        null // environment
    );
    this.key = title;
    this.labelString = localize(title);
    this.userList = [];
    this.buildContents();
    this.refresh();
};

UserDialogMorph.prototype.buildContents = function() {
    this.addBody(new Morph());
    this.body.color = this.color;

    this.buildFilterField();

    this.listField = new ListMorph(this.userList);
    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.body.add(this.listField);

    this.listField.action = item => {
        if (item === undefined) {return; }
        this.unfriendButton.show();
        this.buttons.fixLayout();
        this.fixLayout();
        this.edit();
    };

    // add buttons
    this.inviteFriendButton = this.addButton(
        () => this.target.sendFriendRequest(),
        'Add Friend'
    );
    this.inviteFriendButton.hint = localize('Send friend request to another user on NetsBlox. Only friends are shown in this window.');
    this.unfriendButton = this.addButton(
        async () => {
            this.target.cloud.unfriend(this.listField.selected),
            this.refresh();
        },
        'Unfriend'
    );
    this.unfriendButton.hide();
    this.createLabel();

    this.addButton('cancel', 'Close');

    this.setHeight(300);
    this.fixLayout();
};

UserDialogMorph.prototype.refresh = async function () {
    const userList = (await this.target.cloud.getFriendList())
        .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1)
        .map(name => ({name}));

    this.userList = userList;
    this.showUserList(userList);
};

UserDialogMorph.prototype.fixLayout = function () {
    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2,
        inputField = this.filterField,
        oldFlag = Morph.prototype.trackChanges;

    Morph.prototype.trackChanges = false;

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.fixLayout();
        this.bounds.setWidth(Math.max(
                this.width(),
                this.buttons.width()
                        + (2 * this.padding)
            )
        );
        this.buttons.setCenter(this.center());
    }

    if (this.body) {
        this.body.setPosition(this.position().add(new Point(
            this.padding,
            th + this.padding
        )));
        this.body.setExtent(new Point(
            this.width() - this.padding * 2,
            this.height() - this.padding * 3 - th - this.buttons.height()
        ));

        inputField.setWidth(
            this.body.width() -  this.padding * 6
        );
        inputField.setLeft(this.body.left() + this.padding * 3);
        inputField.rerender();

        this.listField.setLeft(this.body.left() + this.padding);
        this.listField.setWidth(
            this.body.width()
                - this.padding
        );
        this.listField.contents.children[0].adjustWidths();

        this.listField.setTop(inputField.bottom() + this.padding);
        this.listField.setHeight(
            this.body.height() - inputField.height() - this.padding
        );

        if (this.magnifyingGlass) {
            this.magnifyingGlass.setTop(inputField.top());
            this.magnifyingGlass.setLeft(this.listField.left());
        }
    }

    if (this.label) {
        this.label.setCenter(this.center());
        this.label.setTop(this.top() + (th - this.label.height()) / 2);
    }

    if (this.buttons && (this.buttons.children.length > 0)) {
        this.buttons.setBottom(this.bottom() - this.padding);
    }

    if (this.handle) {
        this.handle.fixLayout();
    }

    Morph.prototype.trackChanges = oldFlag;
    this.changed();

    this.removeShadow();
    this.addShadow();
};

UserDialogMorph.prototype.fixListFieldItemColors =
    ProjectDialogMorph.prototype.fixListFieldItemColors;

UserDialogMorph.prototype.buildFilterField =
    ProjectDialogMorph.prototype.buildFilterField;

UserDialogMorph.prototype.getInput = function() {
    return this.listField.selected;
};

UserDialogMorph.prototype.buildFilterField = function () {
    var myself = this;

    this.filterField = new InputFieldMorph('');
    this.magnifyingGlass =
        new SymbolMorph(
            'magnifyingGlass',
            this.filterField.height(),
            this.titleBarColor.darker(50));

    this.body.add(this.magnifyingGlass);
    this.body.add(this.filterField);

    this.filterField.reactToKeystroke = function () {
        var text = this.getValue();

        const matchingUsers = myself.userList
            .filter(user => user.name.toLowerCase().includes(text.toLowerCase()));

        if (matchingUsers.length === 0) {
            myself.showUserList([{name: '(no matches)'}]);
        } else {
            myself.showUserList(matchingUsers);
        }
    };
};

UserDialogMorph.prototype.showUserList = function (users) {
    this.listField.elements = users.map(user => user.name);

    this.listField.buildListContents();
    this.fixListFieldItemColors();
    this.listField.adjustScrollBars();
    this.listField.scrollY(this.listField.top());
    this.fixLayout();
};

UserDialogMorph.prototype.popUp = function(wrrld) {
    var world = wrrld || this.target.world();
    if (world) {
        UserDialogMorph.uber.popUp.call(this, world);
        this.handle = new HandleMorph(
            this,
            200,
            100,
            this.corner,
            this.corner
        );
    }
};

// CollaboratorDialogMorph ////////////////////////////////////////////////////

// CollaboratorDialogMorph inherits from DialogBoxMorph:

CollaboratorDialogMorph.prototype = Object.create(UserDialogMorph.prototype);
CollaboratorDialogMorph.prototype.constructor = CollaboratorDialogMorph;
CollaboratorDialogMorph.uber = UserDialogMorph.prototype;

// CollaboratorDialogMorph instance creation:

function CollaboratorDialogMorph(target, title='Invite a Friend to Collaborate') {
    this.init(target, title);
}

CollaboratorDialogMorph.prototype.buildContents = function() {
    var myself = this;

    this.addBody(new Morph());
    this.body.color = this.color;

    this.buildFilterField();

    this.listField = new ListMorph(
        this.userList,
        this.userList.length > 0 ?
            function (element) {
                return element.name || element;
            } : null,
        [ // format: display collaborators names bold
            [
                'bold',
                function (user) {return user.collaborating; }
            ],
        ]//,
        //function () {myself.ok(); }
    );

    this.listField.action = function (item) {
        if (item === undefined) {return; }
        if (item.collaborating) {
            myself.collaborateButton.hide();
            myself.uncollaborateButton.show();
        } else {
            myself.uncollaborateButton.hide();
            myself.collaborateButton.show();
        }
        myself.unfriendButton.show();
        myself.buttons.fixLayout();
        myself.fixLayout();
        myself.edit();
    };

    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.body.add(this.listField);

    // add buttons
    this.createLabel();

    this.uncollaborateButton = this.addButton(() => {
        this.target.cloud.removeCollaborator(this.listField.selected);
        this.destroy();
    }, 'Remove');
    this.collaborateButton = this.addButton(() => {
        const cloud = this.target.cloud;
        cloud.sendCollaborateRequest(cloud.projectId, this.listField.selected);
        this.destroy();
    }, 'Invite');
    this.uncollaborateButton.hide();
    this.collaborateButton.hide();

    this.inviteFriendButton = this.addButton(
        () => this.target.sendFriendRequest(),
        'Add Friend'
    );
    this.inviteFriendButton.hint = localize('Send friend request to another user on NetsBlox. Only friends are shown in this window.');
    this.unfriendButton = this.addButton(
        async () => {
            this.target.cloud.unfriend(this.listField.selected),
            this.refresh();
        },
        'Unfriend'
    );
    this.unfriendButton.hide();
    this.addButton('cancel', 'Close');

    this.setHeight(300);
    this.fixLayout();
};

CollaboratorDialogMorph.prototype.refresh = async function () {
    const [friends, collaborators] = await Promise.all([
        this.target.cloud.getFriendList(),
        this.target.cloud.getCollaboratorList(),
    ]);
    const collaboratorSet = new Set(collaborators);
    const possibleCollaborators = friends
        .map(name => ({
            name,
            collaborating: collaboratorSet.has(name)
        }))
        .sort(function(a, b) {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        });

    this.userList = possibleCollaborators;
    this.showUserList(this.userList);
};

// InviteOccupantDialogMorph ////////////////////////////////////////////////////

// InviteOccupantDialogMorph inherits from DialogBoxMorph:

InviteOccupantDialogMorph.prototype = Object.create(UserDialogMorph.prototype);
InviteOccupantDialogMorph.prototype.constructor = InviteOccupantDialogMorph;
InviteOccupantDialogMorph.uber = UserDialogMorph.prototype;

// InviteOccupantDialogMorph instance creation:

function InviteOccupantDialogMorph(target, roleId, title='Invite a Friend to the Project') {
    this.init(target, roleId, title);
}

InviteOccupantDialogMorph.prototype.init = function (target, roleId, title) {
    this.roleId = roleId;
    InviteOccupantDialogMorph.uber.init.call(this, target, title);
};

InviteOccupantDialogMorph.prototype.buildContents = function() {
    var myself = this;

    this.addBody(new Morph());
    this.body.color = this.color;

    this.buildFilterField();

    this.listField = new ListMorph(
        this.userList,
        this.userList.length > 0 ?
            function (element) {
                return element.name || element;
            } : null,
    );

    this.listField.action = function (item) {
        if (item === undefined) {return; }
        myself.inviteButton.show();
        myself.unfriendButton.show();
        myself.buttons.fixLayout();
        myself.fixLayout();
        myself.edit();
    };

    this.fixListFieldItemColors();
    this.listField.fixLayout = nop;
    this.listField.edge = InputFieldMorph.prototype.edge;
    this.listField.fontSize = InputFieldMorph.prototype.fontSize;
    this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
    this.listField.contrast = InputFieldMorph.prototype.contrast;
    this.listField.render = InputFieldMorph.prototype.render;
    this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

    this.body.add(this.listField);

    // add buttons
    this.createLabel();

    this.inviteButton = this.addButton(() => {
        this.target.room.inviteOccupant(this.listField.selected, this.roleId);
        this.destroy();
    }, 'Invite');
    this.inviteButton.hide();

    this.inviteFriendButton = this.addButton(
        () => this.target.sendFriendRequest(),
        'Add Friend'
    );
    this.inviteFriendButton.hint = localize('Send friend request to another user on NetsBlox. Only friends are shown in this window.');
    this.unfriendButton = this.addButton(
        async () => {
            this.target.cloud.unfriend(this.listField.selected),
            this.refresh();
        },
        'Unfriend'
    );
    this.unfriendButton.hide();
    this.addButton('cancel', 'Close');

    this.setHeight(300);
    this.fixLayout();
};


InviteOccupantDialogMorph.prototype.refresh = async function () {
    this.userList = (await this.target.cloud.getOnlineFriendList())
        .map(name => ({id: name, name}))
        .sort(function(a, b) {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        });

    this.userList.unshift({
        name: localize('myself'),
        // TODO: add support for an "id" field to avoid collisions with "myself"
        //id: this.target.cloud.username,
    });
    this.showUserList(this.userList);
};
