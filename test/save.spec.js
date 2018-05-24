/*globals driver, expect*/
describe('save', function() {
    this.timeout(10000);
    beforeEach(() => {
        return driver.reset()
            .then(() => driver.addBlock('doIfElse'))
            .then(() => driver.selectCategory('control'));
    });

    function showingSaveMsg() {
        const menu = driver.dialog();
        return menu && menu.title && menu.title.includes('cloud');
    }

    function saveProject() {
        // Get the save button
        const controlBar = driver.ide().controlBar;
        driver.click(controlBar.projectButton);
        let menu = driver.dialog();
        const saveBtn = menu.children.find(child => child.action === 'save');

        driver.click(saveBtn);

        // Wait for the save message
        return driver.waitUntil(showingSaveMsg);
    }

    function openProjectsBrowser() {
        const controlBar = driver.ide().controlBar;

        driver.click(controlBar.projectButton);
        let menu = driver.dialog();
        const openBtn = menu.children.find(child => child.action === 'openProjectsBrowser');

        driver.click(openBtn);

        // Open the saved project
        const projectDialog = driver.dialog();
        function getProjectListCount() {
            return projectDialog.listField.listContents.children.length;
        }

        return driver.waitUntil(() => getProjectListCount() > 1)
            .then(() => projectDialog);
    }

    function openSavedProject(projectName) {
        // Open the project dialog
        return openProjectsBrowser()
            .then(projectDialog => {
                const projectList = projectDialog.listField.listContents.children;
                const listItem = projectList.find(item => item.labelString === projectName);

                driver.click(listItem);
                projectDialog.accept();

                // Check for the if-else block
                return driver.waitUntil(() => {
                    const blockCount = driver.ide().currentSprite.scripts.children.length;
                    return blockCount === 1;
                });
            });

    }

    it('should be able to save and reload the project', function() {
        // Get the project name
        const projectName = driver.ide().room.name;

        return saveProject()
            .then(() => driver.reset())
            .then(() => openSavedProject(projectName));
    });

    it('should make a copy on save as', function() {
        // Get the project name
        const projectName = driver.ide().room.name;
        let saveAsName;

        return saveProject()
            .then(() => driver.reset())
            .then(() => openSavedProject(projectName))
            .then(() => {
                // save as
                const controlBar = driver.ide().controlBar;
                driver.click(controlBar.projectButton);

                const menu = driver.dialog();
                const saveBtnIndex = menu.children
                    .findIndex(child => child.action === 'save');
                const saveAsBtn = menu.children[saveBtnIndex+1];
                driver.click(saveAsBtn);

                // Enter the new project name
                saveAsName = `new${projectName}-saveAs`;
                driver.keys(saveAsName);
                driver.dialog().accept();

                return driver.waitUntil(showingSaveMsg);
            })
            .then(() => openProjectsBrowser())
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

    it('should overwrite on rename and save', function() {
        const projectName = driver.ide().room.name;
        let newName;

        return saveProject()
            .then(() => {
                // rename from the room tab
                driver.selectTab('room');
                const room = driver.ide().room;
                driver.click(room.roomName);

                newName = `rename-${projectName}`;
                driver.keys(newName);
                driver.dialog().accept();
                return driver.waitUntil(() => driver.ide().room.name !== projectName);
            })
            .then(() => saveProject())
            .then(() => openProjectsBrowser())
            .then(projectDialog => {
                let projectList = projectDialog.listField.listContents
                    .children.map(child => child.labelString);
                return driver.waitUntil(() => {
                    projectList = projectDialog.listField.listContents
                        .children.map(child => child.labelString);
                    return projectList.includes(newName);
                }).then(() => expect(projectList.includes(projectName)).toBe(false));
            });
    });

    // - "save a copy"
    // TODO
});
