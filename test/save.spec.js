/*globals driver, expect */
describe('save', function() {
    let SnapCloud, ProjectDialogMorph;
    before(() => {
        SnapCloud = driver.globals().SnapCloud;
        ProjectDialogMorph = driver.globals().ProjectDialogMorph;
    });
    this.timeout(15000);

    [
        //['w/o ws connection', () => driver.disconnect(), () => driver.connect()],
        ['fully connected']
    ].forEach(tuple => {
        const [label, beforeFn, afterFn] = tuple;
        describe(label, function() {
            if (beforeFn) {
                before(beforeFn);
            }
            if (afterFn) {
                after(afterFn);
            }

            describe('basic tests', function() {
                beforeEach(() => {
                    return driver.reset()
                        .then(() => driver.addBlock('doIfElse'))
                        .then(() => driver.selectCategory('control'));
                });

                it('should be able to save and reload the project', function() {
                    // Get the project name
                    const projectName = `can-reload-${Date.now()}`;

                    return driver.setProjectName(projectName)
                        .then(() => saveProject())
                        .then(() => driver.reset())
                        .then(() => openSavedProject(projectName));
                });

                it('should overwrite on rename', function() {
                    const projectName = `rename-test-${Date.now()}`;
                    const newName = `RENAMED-${projectName}`;

                    return driver.setProjectName(projectName)
                        .then(() => saveProject())
                        .then(() => driver.setProjectName(newName))
                        .then(() => openProjectsBrowser())
                        .then(projectDialog => {
                            let projectList = projectDialog.listField.listContents
                                .children.map(child => child.labelString);
                            return driver
                                .expect(
                                    () => {
                                        projectList = projectDialog.listField.listContents
                                            .children.map(child => child.labelString);
                                        return projectList.includes(newName);
                                    },
                                    `Could not find ${newName} in project list`
                                )
                                .then(() => expect(projectList.includes(projectName)).toBe(false));
                        });
                });
            });

            describe('save as', function() {
                let projectName;
                let saveAsName;

                describe('from saved', function() {
                    before(function() {
                        projectName = `save-as-${Date.now()}`;

                        return driver.reset()
                            .then(() => driver.setProjectName(projectName))
                            .then(() => driver.addBlock('doIfElse'))
                            .then(() => saveProject())
                            .then(() => driver.reset())
                            .then(() => openSavedProject(projectName))
                            .then(() => {
                                saveAsName = `new${projectName}-saveAs`;
                                return driver.saveProjectAs(saveAsName);
                            });
                    });

                    it('should change name of current project', function() {
                        return driver.expect(
                            () => driver.ide().room.name === saveAsName,
                            `Project name not updated (expected ${saveAsName})`
                        );
                    });

                    it('should make a copy on save as', function() {
                        return openProjectsBrowser()
                            .then(projectDialog => {
                                // Check that both projects show up in the project list
                                return driver.waitUntil(() => {
                                    // Click the cloud icon
                                    const cloudSrc = projectDialog.srcBar.children[0];
                                    driver.click(cloudSrc);

                                    const projectList = projectDialog.listField.listContents
                                        .children.map(child => child.labelString);
                                    const hasOriginal = projectList.includes(projectName);
                                    const hasSaveAsVersion = projectList.includes(saveAsName);

                                    return hasOriginal && hasSaveAsVersion;
                                });
                            });
                    });
                });

                describe('from unsaved', function() {
                    const existingName = `existing-${Date.now()}`;

                    before(async function() {
                        await driver.reset();
                        await driver.addBlock('doIf');
                        await driver.saveProjectAs(existingName);
                    });

                    beforeEach(async function() {
                        await driver.reset();
                        await driver.addBlock('doIfElse');
                    });

                    it('should not make a copy', async function() {
                        const name = `save-as-unsaved-${Date.now()}`;
                        const saveAs = `${name}-SAVE-AS`;
                        await driver.setProjectName(name);
                        await driver.addBlock('forward');
                        await driver.saveProjectAs(saveAs);
                        const dialog = await openProjectsBrowser();
                        await driver.waitUntil(() => {
                            const cloudSrc = dialog.srcBar.children[0];
                            driver.click(cloudSrc);

                            const projectList = dialog.listField.listContents
                                .children.map(child => child.labelString);
                            const hasOriginal = projectList.includes(name);
                            const hasSaveAsVersion = projectList.includes(saveAs);

                            return !hasOriginal && hasSaveAsVersion;
                        });
                    });

                    it('should prompt for overwrite if conflicting exists', async function() {
                        await driver.saveProjectAs(existingName, false);
                        await driver.expect(
                            () => driver.isShowingDialogKey(key => key.includes('decideReplace')),
                            'No overwrite prompt for conflicting project names'
                        );
                    });

                    it('should save as given name on overwrite', async function() {
                        const originalName = `original-name-${Date.now()}`;
                        await driver.setProjectName(originalName);
                        await driver.saveProjectAs(existingName, false);
                        const menu = driver.dialogs().pop();
                        menu.ok();
                        await driver.expect(
                            showingSaveMsg,
                            `Did not show save message on overwrite`
                        );
                        const browser = await openProjectsBrowser();
                        const names = getProjectList(browser);
                        expect(names).toContain(existingName);
                        expect(names).toNotContain(originalName);
                    });

                    it('should not save if not overwriting', async function() {
                        const originalName = `original-name-${Date.now()}`;
                        await driver.setProjectName(originalName);
                        await driver.saveProjectAs(existingName, false);
                        const menu = driver.dialog();
                        menu.cancel();
                        const dialog = driver.dialog();
                        expect(dialog.task).toBe('save');
                    });
                });
            });

            describe('saveACopy', function() {
                let username;
                const projectName = `saveACopy-${Date.now()}`;

                beforeEach(() => driver.reset()
                    .then(() => username = SnapCloud.username)
                    .then(() => driver.setProjectName(projectName))
                );
                afterEach(() => SnapCloud.username = username);

                it('should create "Copy of <project>" on saveACopy', function() {
                    const ide = driver.ide();
                    // make the user a collaborator
                    SnapCloud.username = 'test';

                    ide.room.collaborators.push(SnapCloud.username);
                    ide.room.ownerId = 'otherUser';

                    // Click the project menu
                    driver.click(ide.controlBar.projectButton);
                    const dialog = driver.dialog();
                    const saveACopyBtn = dialog.children.find(item => item.action === 'saveACopy');
                    driver.click(saveACopyBtn);
                    return driver.expect(showingSaveMsg, `Did not see save message after "Save Copy"`)
                        .then(() => openProjectsBrowser())
                        .then(projectDialog => {
                            const copyName = `Copy of ${projectName}`;
                            return driver.expect(
                                () => getProjectList(projectDialog).includes(copyName),
                                `Could not find copied project (${copyName})`
                            );
                        });
                });
            });

            describe('setProjectName', function() {
                before(() => driver.reset());

                it('should not allow name collisions', function() {
                    const name = `collision-test-${Date.now()}`;
                    return driver.saveProjectAs(name)
                        .then(() => driver.reset())
                        .then(() => driver.setProjectNameNoConfirm(name))
                        .then(() => driver.expect(
                            () => driver.ide().room.name.startsWith(name),
                            `Name did not update to a variant of ${name}`
                        ))
                        .then(() => expect(driver.ide().room.name).toNotBe(name));
                });
            });
        });
    });

    function showingSaveMsg() {
        const menu = driver.dialog();
        const message = menu && menu.title && menu.title.toLowerCase();
        if (message) {
            return message.includes('saved') && message.includes('cloud');
        }
        return false;
    }

    function waitUntilProjectsLoaded() {
        if (driver.dialog().source.includes('cloud')) {
            return driver.expect(
                () => {
                    const isShowingUpdateMsg = driver.dialogs().length === 2;
                    const projectDialog = driver.dialogs()
                        .find(d => d instanceof ProjectDialogMorph);
                    const hasLoadedProjects = projectDialog &&
                            getProjectList(projectDialog)[0] !== '(empty)';
                    return isShowingUpdateMsg || hasLoadedProjects;
                },
                'Did not see "update project list" message'
            )
            .then(() => driver.expect(
                    () => driver.dialogs().length === 1,
                    '"update project list" message did not disappear'
                )
            );
        } else {
            return Promise.resolve();
        }
    }

    function saveProject() {
        // Get the save button
        const controlBar = driver.ide().controlBar;
        driver.click(controlBar.projectButton);
        let menu = driver.dialog();
        const saveBtn = menu.children.find(child => child.action === 'save');

        driver.click(saveBtn);

        // Wait for the save message
        return driver.expect(
            showingSaveMsg,
            `Did not see save message after "Save"`
        );
    }

    function getProjectList(projectDialog) {
        return projectDialog.listField.listContents.children
            .map(item => item.labelString);
    }

    function openProjectsBrowser() {
        const controlBar = driver.ide().controlBar;

        driver.click(controlBar.projectButton);
        let menu = driver.dialog();
        const openBtn = menu.children.find(child => child.action === 'openProjectsBrowser');

        driver.click(openBtn);

        // Open the saved project
        return waitUntilProjectsLoaded()
            .then(() => driver.dialog());
    }

    function openSavedProject(projectName) {
        // Open the project dialog
        let projectDialog;
        return openProjectsBrowser()
            .then(dialog => {
                projectDialog = dialog;
                return driver.expect(
                    () => getProjectList(projectDialog).includes(projectName),
                    `Could not find ${projectName} in project list`
                );
            })
            .then(() => {
                const projectList = projectDialog.listField.listContents.children;
                const listItem = projectList.find(item => item.labelString === projectName);
                driver.click(listItem);
                projectDialog.accept();

                // Check for the if-else block
                return driver.expect(
                    () => {
                        const blockCount = driver.ide().currentSprite.scripts.children.length;
                        return blockCount > 0;
                    },
                    `Did not see blocks after loading saved project`
                );
            });

    }

});
