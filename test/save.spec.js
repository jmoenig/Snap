/*globals driver, expect, TestUtils */
describe('save', function() {
    let cloud;
    before(() => {
        cloud = driver.ide().cloud;
    });

    [
        //['w/o ws connection', () => driver.disconnect(), () => driver.connect()],
        ['fully connected']
    ].forEach(tuple => {
        const [label, beforeFn, afterFn] = tuple;
        describe(label, function() {
            this.timeout(10000);
            if (beforeFn) {
                before(beforeFn);
            }
            if (afterFn) {
                after(afterFn);
            }

            describe('basic tests', function() {
                beforeEach(async () => {
                    await driver.reset();
                    await driver.addBlock('doIfElse');
                    await driver.selectCategory('control');
                });

                it('should be able to save and reload the project', async function() {
                    const projectName = `can-reload-${Date.now()}`;

                    await driver.setProjectName(projectName);
                    await TestUtils.saveProject();
                    await driver.reset();
                    await TestUtils.openProject(projectName);
                });

                it('should overwrite on rename', async function() {
                    const projectName = `rename-test-${Date.now()}`;
                    const newName = `RENAMED-${projectName}`;

                    await driver.setProjectName(projectName);
                    await TestUtils.saveProject();
                    await driver.setProjectName(newName);
                    const projectDialog = await TestUtils.openProjectsBrowser();
                    let projectList = projectDialog.listField.listContents
                        .children.map(child => child.labelString);
                    await driver.expect(
                        () => {
                            projectList = projectDialog.listField.listContents
                                .children.map(child => child.labelString);
                            return projectList.includes(newName);
                        },
                        `Could not find ${newName} in project list`
                    );
                    expect(projectList.includes(projectName)).toBe(false);
                });
            });

            describe('save as', function() {
                let projectName;
                let saveAsName;

                describe('from saved', function() {
                    before(async () => {
                        projectName = `save-as-from-saved-${Date.now()}`;

                        await driver.reset()
                        await driver.setProjectName(projectName);
                        await driver.addBlock('doIfElse');
                        await TestUtils.saveProject();
                        console.log('save...', projectName);
                        await driver.reset();
                        await TestUtils.openProject(projectName);
                        saveAsName = `new${projectName}-saveAs`;
                        console.log('saving as', saveAsName);
                        await driver.saveProjectAs(saveAsName);
                    });

                    it('should change name of current project', function() {
                        return driver.expect(
                            () => driver.ide().room.name === saveAsName,
                            `Project name not updated (expected ${saveAsName})`
                        );
                    });

                    it('should make a copy on save as', async function() {
                        const projectDialog = await TestUtils.openProjectsBrowser();
                        // Check that both projects show up in the project list
                        await driver.expect(() => {
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
                        const dialog = await TestUtils.openProjectsBrowser();
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
                        this.timeout(5000);
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
                            TestUtils.showingSaveMsg,
                            `Did not show save message on overwrite`
                        );
                        const browser = await TestUtils.openProjectsBrowser();
                        const names = TestUtils.getProjectList(browser);
                        expect(names).toContain(existingName);
                        expect(names).toNotContain(originalName);
                    });

                    it('should not save if not overwriting', async function() {
                        const originalName = `original-name-${Date.now()}`;
                        await driver.setProjectName(originalName);
                        await driver.saveProjectAs(existingName, false);
                        const menu = driver.dialog();
                        menu.cancel();
                        const [dialog] = driver.dialogs();
                        expect(dialog.task).toBe('save');
                    });
                });
            });

            describe('saveACopy', function() {
                let username;
                const projectName = `saveACopy-${Date.now()}`;

                beforeEach(() => driver.reset()
                    .then(() => username = cloud.username)
                    .then(() => driver.setProjectName(projectName))
                );
                afterEach(() => cloud.username = username);

                it('should create "<project> (2)" on saveACopy', async function() {
                    const ide = driver.ide();
                    // make the user a collaborator
                    cloud.username = 'test';

                    ide.room.collaborators.push(cloud.username);
                    ide.room.ownerId = 'otherUser';

                    // Click the project menu
                    driver.click(ide.controlBar.projectButton);
                    const dialog = driver.dialog();
                    const saveACopyBtn = dialog.children.find(item => item.action === 'saveACopy');
                    driver.click(saveACopyBtn);
                    const openDialog = await driver.expect(() => 
                        driver.dialogs().find(dialog => dialog.labelString === 'Open Project')
                    );
                    openDialog.destroy();

                    await driver.expect(TestUtils.showingSaveMsg, `Did not see save message after "Save Copy"`);
                    const projectDialog = await TestUtils.openProjectsBrowser();
                    const copyName = `${projectName} (2)`;
                    return driver.expect(
                        () => TestUtils.getProjectList(projectDialog).includes(copyName),
                        `Could not find copied project (${copyName})`
                    );
                });
            });

            describe('setProjectName', function() {
                before(() => driver.reset());

                it('should not allow name collisions', async function() {
                    const name = `collision-test-${Date.now()}`;
                    await driver.saveProjectAs(name);
                    await driver.reset();
                    await driver.setProjectNameNoConfirm(name);
                    await driver.expect(
                        () => driver.ide().room.name.startsWith(name),
                        `Name did not update to a variant of ${name}`
                    );
                    await expect(driver.ide().room.name).toNotBe(name);
                });
            });
        });
    });
});
