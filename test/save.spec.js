/*globals driver, expect, SnapCloud*/
describe('save', function() {
    this.timeout(10000);

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
                    const hasLoadedProjects = getProjectList(projectDialog)[0] !== '(empty)';
                    return isShowingUpdateMsg || hasLoadedProjects;
                },
                'Did not see "update project list" message'
            )
            .then(() => driver.expect(
                    () => driver.dialogs().length === 1,
                    '"update project list" message did not disappear'
                )
            )
            .catch(err => {
                console.log(driver.dialog());
                debugger;
            });
        } else {
            return Promise.resolve();
        }
    }

    function saveProjectAsNoConfirm(name) {  // don't wait for save confirmation
        // save as
        const controlBar = driver.ide().controlBar;
        driver.click(controlBar.projectButton);

        const menu = driver.dialog();
        const saveBtnIndex = menu.children
            .findIndex(child => child.action === 'save');
        const saveAsBtn = menu.children[saveBtnIndex+1];
        driver.click(saveAsBtn);

        // Wait for the project list to be updated
        return waitUntilProjectsLoaded()
            .then(() => {
                // Enter the new project name
                driver.keys(name);
                const dialog = driver.dialog();
                const saveBtn = dialog.buttons.children[0];
                driver.click(saveBtn);
            });
    }

    function saveProjectAs(name) {
        return saveProjectAsNoConfirm(name)
            .then(() => {
                return driver.expect(
                    showingSaveMsg,
                    `Did not see save message after "Save As"`
                );
            });
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
            const projectName = `rename-test-${Date.now()}`
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
                        return saveProjectAs(saveAsName);
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

            before(function() {
                return driver.reset()
                    .then(() => driver.addBlock('doIf'))
                    .then(() => saveProjectAs(existingName));
            });

            beforeEach(function() {
                return driver.reset()
                    .then(() => driver.addBlock('doIfElse'));
            });

            it('should not make a copy', function() {
                const name = `save-as-unsaved-${Date.now()}`;
                const saveAs = `${name}-SAVE-AS`;
                return driver.setProjectName(name)
                    .catch(err => {
                        console.log('could not set name to', name);
                        console.log(SnapCloud.projectId);
                        debugger;
                        throw err;
                    })
                    .then(() => driver.addBlock('forward'))
                    .then(() => saveProjectAs(saveAs))
                    .then(() => openProjectsBrowser())
                    .then(dialog => {
                        return driver.waitUntil(() => {
                            // Click the cloud icon
                            const cloudSrc = dialog.srcBar.children[0];
                            driver.click(cloudSrc);

                            const projectList = dialog.listField.listContents
                                .children.map(child => child.labelString);
                            const hasOriginal = projectList.includes(name);
                            const hasSaveAsVersion = projectList.includes(saveAs);

                            return !hasOriginal && hasSaveAsVersion;
                        });
                    });
            });

            it('should prompt for overwrite if conflicting exists', function() {
                return saveProjectAsNoConfirm(existingName)
                    .then(() => {
                        const menu = driver.dialog();
                        expect(menu.key.includes('decideReplace')).toBeTruthy();
                    });
            });

            it('should save as given name on overwrite', function() {
                const originalName = `original-name-${Date.now()}`;
                return driver.setProjectName(originalName)
                    .then(() => saveProjectAsNoConfirm(existingName))
                    .then(() => {
                        const menu = driver.dialog();
                        menu.ok();
                        return driver.expect(
                            showingSaveMsg,
                            `Did not show save message on overwrite`
                        );
                    })
                    .then(() => openProjectsBrowser())
                    .then(browser => {
                        const names = getProjectList(browser);
                        expect(names).toContain(existingName);
                        expect(names).toNotContain(originalName);
                    });
            });

            it('should not save if not overwriting', function() {
                const originalName = `original-name-${Date.now()}`;
                return driver.setProjectName(originalName)
                    .then(() => saveProjectAsNoConfirm(existingName))
                    .then(() => {
                        const menu = driver.dialog();
                        menu.cancel();
                        const dialog = driver.dialog();
                        expect(dialog.task).toBe('save');
                    });
            });
        });
    });

    describe('saveACopy', function() {
        let username;

        beforeEach(() => driver.reset()
            .then(() => username = SnapCloud.username)
        );
        afterEach(() => SnapCloud.username = username);

        it('should create "Copy of <project>" on saveACopy', function() {
            const projectName = driver.ide().room.name;
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
});
