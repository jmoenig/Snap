// ProjectDialogMorph ////////////////////////////////////////////////////

// ProjectDialogMorph instance creation:

export default class ProjectDialogMorph extends DialogBoxMorph {
    constructor(ide, label) {
        this.init(ide, label);
    }

    init(ide, task) {
        const myself = this;

        // additional properties:
        this.ide = ide;
        this.task = task || 'open'; // String describing what do do (open, save)
        this.source = ide.source || 'local'; // or 'cloud' or 'examples'
        this.projectList = []; // [{name: , thumb: , notes:}]

        this.handle = null;
        this.srcBar = null;
        this.nameField = null;
        this.filterField = null;
        this.magnifyingGlass = null;
        this.listField = null;
        this.preview = null;
        this.notesText = null;
        this.notesField = null;
        this.deleteButton = null;
        this.shareButton = null;
        this.unshareButton = null;

        // initialize inherited properties:
        super.init.call(
            this,
            this, // target
            null, // function
            null // environment
        );

        // override inherited properites:
        this.labelString = this.task === 'save' ? 'Save Project' : 'Open Project';
        this.createLabel();
        this.key = `project${task}`;

        // build contents
        this.buildContents();
        this.onNextStep = () => { // yield to show "updating" message
            myself.setSource(myself.source);
        };
    }

    buildContents() {
        let thumbnail;
        let notification;

        this.addBody(new Morph());
        this.body.color = this.color;

        this.srcBar = new AlignmentMorph('column', this.padding / 2);

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

        this.addSourceButton('cloud', localize('Cloud'), 'cloud');
        this.addSourceButton('local', localize('Browser'), 'storage');
        if (this.task === 'open') {
            this.buildFilterField();
            this.addSourceButton('examples', localize('Examples'), 'poster');
        }
        this.srcBar.fixLayout();
        this.body.add(this.srcBar);

        if (this.task === 'save') {
            this.nameField = new InputFieldMorph(this.ide.projectName);
            this.body.add(this.nameField);
        }

        this.listField = new ListMorph([]);
        this.fixListFieldItemColors();
        this.listField.fixLayout = nop;
        this.listField.edge = InputFieldMorph.prototype.edge;
        this.listField.fontSize = InputFieldMorph.prototype.fontSize;
        this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
        this.listField.contrast = InputFieldMorph.prototype.contrast;
        this.listField.drawNew = InputFieldMorph.prototype.drawNew;
        this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

        this.body.add(this.listField);

        this.preview = new Morph();
        this.preview.fixLayout = nop;
        this.preview.edge = InputFieldMorph.prototype.edge;
        this.preview.fontSize = InputFieldMorph.prototype.fontSize;
        this.preview.typeInPadding = InputFieldMorph.prototype.typeInPadding;
        this.preview.contrast = InputFieldMorph.prototype.contrast;
        this.preview.drawNew = function () {
            InputFieldMorph.prototype.drawNew.call(this);
            if (this.texture) {
                this.drawTexture(this.texture);
            }
        };
        this.preview.drawCachedTexture = function () {
            const context = this.image.getContext('2d');
            context.drawImage(this.cachedTexture, this.edge, this.edge);
            this.changed();
        };
        this.preview.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;
        this.preview.setExtent(
            this.ide.serializer.thumbnailSize.add(this.preview.edge * 2)
        );

        this.body.add(this.preview);
        this.preview.drawNew();
        if (this.task === 'save') {
            thumbnail = this.ide.stage.thumbnail(
                SnapSerializer.prototype.thumbnailSize
            );
            this.preview.texture = null;
            this.preview.cachedTexture = thumbnail;
            this.preview.drawCachedTexture();
        }

        this.notesField = new ScrollFrameMorph();
        this.notesField.fixLayout = nop;

        this.notesField.edge = InputFieldMorph.prototype.edge;
        this.notesField.fontSize = InputFieldMorph.prototype.fontSize;
        this.notesField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
        this.notesField.contrast = InputFieldMorph.prototype.contrast;
        this.notesField.drawNew = InputFieldMorph.prototype.drawNew;
        this.notesField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

        this.notesField.acceptsDrops = false;
        this.notesField.contents.acceptsDrops = false;

        if (this.task === 'open') {
            this.notesText = new TextMorph('');
        } else { // 'save'
            this.notesText = new TextMorph(this.ide.projectNotes);
            this.notesText.isEditable = true;
            this.notesText.enableSelecting();
        }

        this.notesField.isTextLineWrapping = true;
        this.notesField.padding = 3;
        this.notesField.setContents(this.notesText);
        this.notesField.setWidth(this.preview.width());

        this.body.add(this.notesField);

        if (this.task === 'open') {
            this.addButton('openProject', 'Open');
            this.action = 'openProject';
        } else { // 'save'
            this.addButton('saveProject', 'Save');
            this.action = 'saveProject';
        }
        this.shareButton = this.addButton('shareProject', 'Share');
        this.unshareButton = this.addButton('unshareProject', 'Unshare');
        this.shareButton.hide();
        this.unshareButton.hide();
        this.deleteButton = this.addButton('deleteProject', 'Delete');
        this.addButton('cancel', 'Cancel');

        if (notification) {
            this.setExtent(new Point(455, 335).add(notification.extent()));
        } else {
            this.setExtent(new Point(455, 335));
        }
        this.fixLayout();
    }

    popUp(wrrld) {
        const world = wrrld || this.ide.world();
        if (world) {
            super.popUp.call(this, world);
            this.handle = new HandleMorph(
                this,
                350,
                300,
                this.corner,
                this.corner
            );
        }
    }

    // ProjectDialogMorph source buttons

    addSourceButton(source, label, symbol) {
        const myself = this;

        const lbl1 = new StringMorph(
            label,
            10,
            null,
            true,
            null,
            null,
            new Point(1, 1),
            new Color(255, 255, 255)
        );

        const lbl2 = new StringMorph(
            label,
            10,
            null,
            true,
            null,
            null,
            new Point(-1, -1),
            this.titleBarColor.darker(50),
            new Color(255, 255, 255)
        );

        const l1 = new Morph();
        const l2 = new Morph();
        let button;

        lbl1.add(new SymbolMorph(
            symbol,
            24,
            this.titleBarColor.darker(20),
            new Point(1, 1),
            this.titleBarColor.darker(50)
        ));
        lbl1.children[0].setCenter(lbl1.center());
        lbl1.children[0].setBottom(lbl1.top() - this.padding / 2);

        l1.image = lbl1.fullImage();
        l1.bounds = lbl1.fullBounds();

        lbl2.add(new SymbolMorph(
            symbol,
            24,
            new Color(255, 255, 255),
            new Point(-1, -1),
            this.titleBarColor.darker(50)
        ));
        lbl2.children[0].setCenter(lbl2.center());
        lbl2.children[0].setBottom(lbl2.top() - this.padding / 2);

        l2.image = lbl2.fullImage();
        l2.bounds = lbl2.fullBounds();

        button = new ToggleButtonMorph(
            null, //colors,
            myself, // the ProjectDialog is the target
            () => { // action
                myself.setSource(source);
            },
            [l1, l2],
            () => // query
            myself.source === source
        );

        button.corner = this.buttonCorner;
        button.edge = this.buttonEdge;
        button.outline = this.buttonOutline;
        button.outlineColor = this.buttonOutlineColor;
        button.outlineGradient = this.buttonOutlineGradient;
        button.labelMinExtent = new Point(60, 0);
        button.padding = this.buttonPadding;
        button.contrast = this.buttonContrast;
        button.pressColor = this.titleBarColor.darker(20);

        button.drawNew();
        button.fixLayout();
        button.refresh();
        this.srcBar.add(button);
    }

    // ProjectDialogMorph list field control

    fixListFieldItemColors() {
        // remember to always fixLayout() afterwards for the changes
        // to take effect
        const myself = this;
        this.listField.contents.children[0].alpha = 0;
        this.listField.contents.children[0].children.forEach(item => {
            item.pressColor = myself.titleBarColor.darker(20);
            item.color = new Color(0, 0, 0, 0);
            item.noticesTransparentClick = true;
        });
    }

    // ProjectDialogMorph filter field

    buildFilterField() {
        const myself = this;

        this.filterField = new InputFieldMorph('');
        this.magnifyingGlass =
            new SymbolMorph(
                'magnifyingGlass',
                this.filterField.height(),
                this.titleBarColor.darker(50));

        this.body.add(this.magnifyingGlass);
        this.body.add(this.filterField);

        this.filterField.reactToKeystroke = function (evt) {
            const text = this.getValue();

            myself.listField.elements = 
                myself.projectList.filter(aProject => {
                    let name;
                    let notes;

                    if (aProject.ProjectName) { // cloud
                        name = aProject.ProjectName;
                        notes = aProject.Notes;
                    } else { // local or examples
                        name = aProject.name;
                        notes = aProject.notes || '';
                    }

                    return name.toLowerCase().includes(text.toLowerCase()) ||
                        notes.toLowerCase().includes(text.toLowerCase());
                });

            if (myself.listField.elements.length === 0) {
                myself.listField.elements.push('(no matches)');
            }

            myself.clearDetails();
            myself.listField.buildListContents();
            myself.fixListFieldItemColors();
            myself.listField.adjustScrollBars();
            myself.listField.scrollY(myself.listField.top());
            myself.fixLayout();
        };
    }

    // ProjectDialogMorph ops

    setSource(source) {
        const myself = this;
        let msg;

        this.source = source; //this.task === 'save' ? 'local' : source;
        this.srcBar.children.forEach(button => {
            button.refresh();
        });
        switch (this.source) {
        case 'cloud':
            msg = myself.ide.showMessage('Updating\nproject list...');
            this.projectList = [];
            SnapCloud.getProjectList(
                projectList => {
                    // Don't show cloud projects if user has since switch panes.
                    if (myself.source === 'cloud') {
                        myself.installCloudProjectList(projectList);
                    }
                    msg.destroy();
                },
                (err, lbl) => {
                    msg.destroy();
                    myself.ide.cloudError().call(null, err, lbl);
                }
            );
            return;
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
                    element => element.name || element : null,
            null,
            () => {myself.ok(); }
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
            this.listField.action = item => {
                let src;
                let xml;

                if (item === undefined) {return; }
                if (myself.nameField) {
                    myself.nameField.setContents(item.name || '');
                }
                if (myself.task === 'open') {

                    src = localStorage[`-snap-project-${item.name}`];

                    if (src) {
                        xml = myself.ide.serializer.parse(src);

                        myself.notesText.text = xml.childNamed('notes').contents
                            || '';
                        myself.notesText.drawNew();
                        myself.notesField.contents.adjustBounds();
                        myself.preview.texture =
                            xml.childNamed('thumbnail').contents || null;
                        myself.preview.cachedTexture = null;
                        myself.preview.drawNew();
                    }
                }
                myself.edit();
            };
        } else { // 'examples'; 'cloud' is initialized elsewhere
            this.listField.action = item => {
                let src;
                let xml;
                if (item === undefined) {return; }
                if (myself.nameField) {
                    myself.nameField.setContents(item.name || '');
                }
                src = myself.ide.getURL(
                    myself.ide.resourceURL('Examples', item.fileName)
                );

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
    }

    getLocalProjectList() {
        let stored;
        let name;
        let dta;
        const projects = [];
        for (stored in localStorage) {
            if (Object.prototype.hasOwnProperty.call(localStorage, stored)
                    && stored.substr(0, 14) === '-snap-project-') {
                name = stored.substr(14);
                dta = {
                    name,
                    thumb: null,
                    notes: null
                };
                projects.push(dta);
            }
        }
        projects.sort((x, y) => x.name.toLowerCase() < y.name.toLowerCase() ? -1 : 1);
        return projects;
    }

    getExamplesProjectList() {
        return this.ide.getMediaList('Examples');
    }

    installCloudProjectList(pl) {
        const myself = this;
        this.projectList = pl || [];
        this.projectList.sort((x, y) => x.ProjectName.toLowerCase() < y.ProjectName.toLowerCase() ?
                 -1 : 1);

        this.listField.destroy();
        this.listField = new ListMorph(
            this.projectList,
            this.projectList.length > 0 ?
                    element => element.ProjectName || element : null,
            [ // format: display shared project names bold
                [
                    'bold',
                    proj => proj.Public === 'true'
                ]
            ],
            () => {myself.ok(); }
        );
        this.fixListFieldItemColors();
        this.listField.fixLayout = nop;
        this.listField.edge = InputFieldMorph.prototype.edge;
        this.listField.fontSize = InputFieldMorph.prototype.fontSize;
        this.listField.typeInPadding = InputFieldMorph.prototype.typeInPadding;
        this.listField.contrast = InputFieldMorph.prototype.contrast;
        this.listField.drawNew = InputFieldMorph.prototype.drawNew;
        this.listField.drawRectBorder = InputFieldMorph.prototype.drawRectBorder;

        this.listField.action = item => {
            if (item === undefined) {return; }
            if (myself.nameField) {
                myself.nameField.setContents(item.ProjectName || '');
            }
            if (myself.task === 'open') {
                myself.notesText.text = item.Notes || '';
                myself.notesText.drawNew();
                myself.notesField.contents.adjustBounds();
                myself.preview.texture = item.Thumbnail || null;
                myself.preview.cachedTexture = null;
                myself.preview.drawNew();
                (new SpeechBubbleMorph(new TextMorph(
                    `${localize('last changed')}\n${item.Updated}`,
                    null,
                    null,
                    null,
                    null,
                    'center'
                ))).popUp(
                    myself.world(),
                    myself.preview.rightCenter().add(new Point(2, 0))
                );
            }
            if (item.Public === 'true') {
                myself.shareButton.hide();
                myself.unshareButton.show();
            } else {
                myself.unshareButton.hide();
                myself.shareButton.show();
            }
            myself.buttons.fixLayout();
            myself.fixLayout();
            myself.edit();
        };
        this.body.add(this.listField);
        this.shareButton.show();
        this.unshareButton.hide();
        this.deleteButton.show();
        this.buttons.fixLayout();
        this.fixLayout();
        if (this.task === 'open') {
            this.clearDetails();
        }
    }

    clearDetails() {
        this.notesText.text = '';
        this.notesText.drawNew();
        this.notesField.contents.adjustBounds();
        this.preview.texture = null;
        this.preview.cachedTexture = null;
        this.preview.drawNew();
    }

    openProject() {
        const proj = this.listField.selected;
        let src;
        if (!proj) {return; }
        this.ide.source = this.source;
        if (this.source === 'cloud') {
            this.openCloudProject(proj);
        } else if (this.source === 'examples') {
            // Note "file" is a property of the parseResourceFile function.
            src = this.ide.getURL(this.ide.resourceURL('Examples', proj.fileName));
            this.ide.openProjectString(src);
            this.destroy();
        } else { // 'local'
            this.ide.openProject(proj.name);
            this.destroy();
        }
    }

    openCloudProject(project) {
        const myself = this;
        myself.ide.nextSteps([
            () => {
                myself.ide.showMessage('Fetching project\nfrom the cloud...');
            },
            () => {
                myself.rawOpenCloudProject(project);
            }
        ]);
    }

    rawOpenCloudProject(proj) {
        const myself = this;
        SnapCloud.reconnect(
            () => {
                SnapCloud.callService(
                    'getRawProject',
                    response => {
                        SnapCloud.disconnect();
                        /*
                        if (myself.world().currentKey === 16) {
                            myself.ide.download(response);
                            return;
                        }
                        */
                        myself.ide.source = 'cloud';
                        myself.ide.droppedText(response);
                        if (proj.Public === 'true') {
                            location.hash = `#present:Username=${encodeURIComponent(SnapCloud.username)}&ProjectName=${encodeURIComponent(proj.ProjectName)}`;
                        }
                    },
                    myself.ide.cloudError(),
                    [proj.ProjectName]
                );
            },
            myself.ide.cloudError()
        );
        this.destroy();
    }

    saveProject() {
        const name = this.nameField.contents().text.text;
        const notes = this.notesText.text;
        const myself = this;

        this.ide.projectNotes = notes || this.ide.projectNotes;
        if (name) {
            if (this.source === 'cloud') {
                if (detect(
                        this.projectList,
                        item => item.ProjectName === name
                    )) {
                    this.ide.confirm(
                        `${localize(
    'Are you sure you want to replace'
)}\n"${name}"?`,
                        'Replace Project',
                        () => {
                            myself.ide.setProjectName(name);
                            myself.saveCloudProject();
                        }
                    );
                } else {
                    this.ide.setProjectName(name);
                    myself.saveCloudProject();
                }
            } else { // 'local'
                if (detect(
                        this.projectList,
                        item => item.name === name
                    )) {
                    this.ide.confirm(
                        `${localize(
    'Are you sure you want to replace'
)}\n"${name}"?`,
                        'Replace Project',
                        () => {
                            myself.ide.setProjectName(name);
                            myself.ide.source = 'local';
                            myself.ide.saveProject(name);
                            myself.destroy();
                        }
                    );
                } else {
                    this.ide.setProjectName(name);
                    myself.ide.source = 'local';
                    this.ide.saveProject(name);
                    this.destroy();
                }
            }
        }
    }

    saveCloudProject() {
        const myself = this;
        this.ide.showMessage('Saving project\nto the cloud...');
        SnapCloud.saveProject(
            this.ide,
            () => {
                myself.ide.source = 'cloud';
                myself.ide.showMessage('saved.', 2);
            },
            this.ide.cloudError()
        );
        this.destroy();
    }

    deleteProject() {
        const myself = this;
        let proj;
        let idx;
        let name;

        if (this.source === 'cloud') {
            proj = this.listField.selected;
            if (proj) {
                this.ide.confirm(
                    `${localize(
    'Are you sure you want to delete'
)}\n"${proj.ProjectName}"?`,
                    'Delete Project',
                    () => {
                        SnapCloud.reconnect(
                            () => {
                                SnapCloud.callService(
                                    'deleteProject',
                                    () => {
                                        SnapCloud.disconnect();
                                        myself.ide.hasChangedMedia = true;
                                        idx = myself.projectList.indexOf(proj);
                                        myself.projectList.splice(idx, 1);
                                        myself.installCloudProjectList(
                                            myself.projectList
                                        ); // refresh list
                                    },
                                    myself.ide.cloudError(),
                                    [proj.ProjectName]
                                );
                            },
                            myself.ide.cloudError()
                        );
                    }
                );
            }
        } else { // 'local, examples'
            if (this.listField.selected) {
                name = this.listField.selected.name;
                this.ide.confirm(
                    `${localize(
    'Are you sure you want to delete'
)}\n"${name}"?`,
                    'Delete Project',
                    () => {
                        delete localStorage[`-snap-project-${name}`];
                        myself.setSource(myself.source); // refresh list
                    }
                );
            }
        }
    }

    shareProject() {
        const myself = this;
        const ide = this.ide;
        const proj = this.listField.selected;
        const entry = this.listField.active;

        if (proj) {
            this.ide.confirm(
                `${localize(
    'Are you sure you want to publish'
)}\n"${proj.ProjectName}"?`,
                'Share Project',
                () => {
                    myself.ide.showMessage('sharing\nproject...');
                    SnapCloud.reconnect(
                        () => {
                            SnapCloud.callService(
                                'publishProject',
                                () => {
                                    SnapCloud.disconnect();
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
                                myself.ide.cloudError(),
                                [proj.ProjectName]
                            );
                            // Set the Shared URL if the project is currently open
                            if (proj.ProjectName === ide.projectName) {
                                const usr = SnapCloud.username;
                                const projectId = `Username=${encodeURIComponent(usr.toLowerCase())}&ProjectName=${encodeURIComponent(proj.ProjectName)}`;
                                location.hash = `present:${projectId}`;
                            }
                        },
                        myself.ide.cloudError()
                    );
                }
            );
        }
    }

    unshareProject() {
        const myself = this;
        const ide = this.ide;
        const proj = this.listField.selected;
        const entry = this.listField.active;


        if (proj) {
            this.ide.confirm(
                `${localize(
    'Are you sure you want to unpublish'
)}\n"${proj.ProjectName}"?`,
                'Unshare Project',
                () => {
                    myself.ide.showMessage('unsharing\nproject...');
                    SnapCloud.reconnect(
                        () => {
                            SnapCloud.callService(
                                'unpublishProject',
                                () => {
                                    SnapCloud.disconnect();
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
                                myself.ide.cloudError(),
                                [proj.ProjectName]
                            );
                            // Remove the shared URL if the project is open.
                            if (proj.ProjectName === ide.projectName) {
                                location.hash = '';
                            }
                        },
                        myself.ide.cloudError()
                    );
                }
            );
        }
    }

    edit() {
        if (this.nameField) {
            this.nameField.edit();
        } else if (this.filterField) {
            this.filterField.edit();
        }
    }

    // ProjectDialogMorph layout

    fixLayout() {
        const th = fontHeight(this.titleFontSize) + this.titlePadding * 2;
        const thin = this.padding / 2;
        const inputField = this.nameField || this.filterField;
        const oldFlag = Morph.prototype.trackChanges;

        Morph.prototype.trackChanges = false;

        if (this.buttons && (this.buttons.children.length > 0)) {
            this.buttons.fixLayout();
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
            this.srcBar.setPosition(this.body.position());

            inputField.setWidth(
                    this.body.width() - this.srcBar.width() - this.padding * 6
                );
            inputField.setLeft(this.srcBar.right() + this.padding * 3);
            inputField.setTop(this.srcBar.top());
            inputField.drawNew();

            this.listField.setLeft(this.srcBar.right() + this.padding);
            this.listField.setWidth(
                this.body.width()
                    - this.srcBar.width()
                    - this.preview.width()
                    - this.padding
                    - thin
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

            this.preview.setRight(this.body.right());
            this.preview.setTop(inputField.bottom() + this.padding);

            this.notesField.setTop(this.preview.bottom() + thin);
            this.notesField.setLeft(this.preview.left());
            this.notesField.setHeight(
                this.body.bottom() - this.preview.bottom() - thin
            );
        }

        if (this.label) {
            this.label.setCenter(this.center());
            this.label.setTop(this.top() + (th - this.label.height()) / 2);
        }

        if (this.buttons && (this.buttons.children.length > 0)) {
            this.buttons.setCenter(this.center());
            this.buttons.setBottom(this.bottom() - this.padding);
        }

        Morph.prototype.trackChanges = oldFlag;
        this.changed();
    }
}