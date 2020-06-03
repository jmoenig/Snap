/*globals driver*/
(function(global) {
    const TestUtils = {};

    TestUtils.showingSaveMsg = function () {
        const menu = driver.dialog();
        const message = menu && menu.title && menu.title.toLowerCase();
        if (message) {
            return message.includes('saved');
        }
        return false;
    };

    TestUtils.getProjectList = function (projectDialog) {
        return projectDialog.listField.listContents.children
            .map(item => item.labelString);
    };

    TestUtils.waitUntilProjectsLoaded = async function () {
        const {ProjectDialogMorph} = driver.globals();
        if (driver.dialog().source.id.includes('cloud')) {
            await driver.expect(
                () => {
                    const isShowingUpdateMsg = driver.dialogs().length === 2;
                    const projectDialog = driver.dialogs()
                        .find(d => d instanceof ProjectDialogMorph);
                    const hasLoadedProjects = projectDialog &&
                            TestUtils.getProjectList(projectDialog)[0] !== '(empty)';
                    return isShowingUpdateMsg || hasLoadedProjects;
                },
                'Did not see "update project list" message'
            );
            await driver.expect(
                () => driver.dialogs().length === 1,
                '"update project list" message did not disappear'
            );
        }
    };

    TestUtils.openProjectsBrowser = async function () {
        const controlBar = driver.ide().controlBar;

        driver.click(controlBar.projectButton);
        let menu = driver.dialog();
        const openBtn = menu.children.find(child => child.action === 'openProjectsBrowser');

        driver.click(openBtn);

        // Open the saved project
        await TestUtils.waitUntilProjectsLoaded();
        return driver.dialog();
    };

    TestUtils.setProjectsBrowserSource = function(dialog, sourceID) {
        const newSource = dialog.sources.find(source => source.id === sourceID);
        dialog.setSource(newSource);
    };

    TestUtils.openProject = async function(projectName, dialog) {
        if (!dialog) {
            dialog = await TestUtils.openProjectsBrowser();
        }
        await driver.expect(
            () => TestUtils.getProjectList(dialog).includes(projectName),
            `Could not find ${projectName} in project list`
        );
        const projectList = dialog.listField.listContents.children;
        const listItem = projectList.find(item => item.labelString === projectName);
        driver.click(listItem);
        dialog.accept();

        await driver.expect(
            () => driver.ide().room.name === projectName,
            'Did not see the project name update'
        );
    };

    TestUtils.deleteProject = async function(projectName, dialog) {
        await performOpenProjectAction(projectName, dialog, 'deleteItem');
        const confirmDialog = driver.dialog();
        confirmDialog.ok();

        await driver.expect(
            () => !TestUtils.getProjectList(dialog).includes(projectName),
            `Project not removed from project list`
        );
    };

    TestUtils.publishProject = async function(projectName, dialog) {
        await performOpenProjectAction(projectName, dialog, 'shareItem');

        const hasConfirmDialog = () => driver.dialogs()
            .find(dialog => dialog.key && dialog.key.startsWith('decideShare'));

        await driver.expect(hasConfirmDialog, 'Confirm dialog did not show up');

        const confirmDialog = driver.dialogs()
            .find(dialog => dialog.key && dialog.key.startsWith('decideShare'));

        confirmDialog.ok();
        dialog = await TestUtils.openProjectsBrowser();
        await driver.expect(
            () => {
                const project = dialog.itemsList.find(item => item.name === projectName);
                const isPublic = project.Public !== 'false';
                return isPublic;
            },
            `Project not set to public`
        );
    };

    TestUtils.unpublishProject = async function(projectName, dialog) {
        await performOpenProjectAction(projectName, dialog, 'unshareItem');

        const getConfirmDialog = () => driver.dialogs()
            .find(dialog => dialog.key && dialog.key.startsWith('decideUnshare'));

        await driver.expect(getConfirmDialog, 'Confirm dialog did not show up');
        const confirmDialog = getConfirmDialog();
        confirmDialog.ok();

        dialog = await TestUtils.openProjectsBrowser();
        await driver.expect(
            () => {
                const project = dialog.itemsList.find(item => item.name === projectName);
                const isPublic = project.Public !== 'false';
                return !isPublic;
            },
            `Project not set to private`
        );
    };

    async function performOpenProjectAction(projectName, dialog, action) {
        if (!dialog) {
            dialog = await TestUtils.openProjectsBrowser();
        }

        await driver.expect(
            () => TestUtils.getProjectList(dialog).includes(projectName),
            `Could not find ${projectName} in project list`
        );
        await driver.sleep(50);  // FIXME: bug when deleting (async texture drawing)
        const projectList = dialog.listField.listContents.children;
        const listItem = projectList.find(item => item.labelString === projectName);
        driver.click(listItem);
        await driver.sleep(50);  // FIXME: bug when deleting (async texture drawing)
        const shareBtn = dialog.buttons.children.find(btn => btn.action === action);
        if (!shareBtn.isVisible) {
            const source = dialog.source.name.toLowerCase();
            const label = shareBtn.labelString.trim();
            throw new Error(`${label} button not shown. Is it supported for the ${source}?`);
        }
        driver.click(shareBtn);

    }

    TestUtils.saveProjectsBrowser = function () {
        // Get the save button
        const controlBar = driver.ide().controlBar;
        driver.click(controlBar.projectButton);
        let menu = driver.dialog();
        const saveBtn = menu.children.find(child => child.action === 'saveAs');
        driver.click(saveBtn);
        return driver.dialog();
    };

    TestUtils.saveProjectAs = async function (projectName, dialog) {
        if (!dialog) {
            dialog = await TestUtils.saveProjectsBrowser();
        }
        dialog.nameField.setContents(projectName);
        dialog.ok();

        // Wait for the save message
        return driver.expect(
            TestUtils.showingSaveMsg,
            `Did not see save message after "Save"`
        );
    };

    TestUtils.saveProject = function () {
        // Get the save button
        const controlBar = driver.ide().controlBar;
        driver.click(controlBar.projectButton);
        let menu = driver.dialog();
        const saveBtn = menu.children.find(child => child.action === 'save');

        driver.click(saveBtn);

        // Wait for the save message
        return driver.expect(
            TestUtils.showingSaveMsg,
            `Did not see save message after "Save"`
        );
    };

    TestUtils.newProject = function () {
        const controlBar = driver.ide().controlBar;
        driver.click(controlBar.projectButton);
        let menu = driver.dialog();
        const saveBtn = menu.children.find(child => child.action === 'createNewProject');

        driver.click(saveBtn);
        const confirmDialog = driver.dialog();
        confirmDialog.ok();
    };

    TestUtils.getBlockCount = function () {
        const {SnapActions} = driver.globals();
        const blockCount = Object.keys(SnapActions._blocks).length;
        return blockCount;
    };

    global.TestUtils = TestUtils;
})(this);
