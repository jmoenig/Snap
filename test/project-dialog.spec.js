/*globals driver, TestUtils*/
describe('ProjectDialogMorph', function() {
    this.timeout(5000);

    beforeEach(() => driver.reset());

    describe('cloud', function() {
        let name;
        beforeEach(async () => {
            name = 'TestProjectDialogCloud' + Date.now();
        });

        it('should be able to save and open project', async function() {
            const dialog = await TestUtils.saveProjectsBrowser();
            TestUtils.setProjectsBrowserSource(dialog, 'cloud');
            await driver.addBlock('doIfElse');
            await TestUtils.saveProjectAs(name, dialog);
            const openDialog = await TestUtils.openProjectsBrowser();
            TestUtils.setProjectsBrowserSource(openDialog, 'cloud');
            await driver.expect(
                () => TestUtils.getProjectList(openDialog).includes(name),
                'Project not in project browser after save'
            );

            await TestUtils.openProject(name, openDialog);
            await driver.expect(
                () => TestUtils.getBlockCount() > 0,
                'Blocks not loaded'
            );
        });

        it('should be able to delete project', async function() {
            const dialog = await TestUtils.saveProjectsBrowser();
            TestUtils.setProjectsBrowserSource(dialog, 'cloud');
            await driver.addBlock('doIfElse');
            await TestUtils.saveProjectAs(name, dialog);
            const openDialog = await TestUtils.openProjectsBrowser();
            TestUtils.setProjectsBrowserSource(openDialog, 'cloud');
            await driver.expect(
                () => TestUtils.getProjectList(openDialog).includes(name),
                'Project not in project browser after save'
            );

            await TestUtils.deleteProject(name, openDialog);
        });

        it('should be able to publish/unpublish project', async function() {
            this.timeout(10000);
            const dialog = await TestUtils.saveProjectsBrowser();
            TestUtils.setProjectsBrowserSource(dialog, 'cloud');
            await driver.addBlock('doIfElse');
            await TestUtils.saveProjectAs(name, dialog);
            const openDialog = await TestUtils.openProjectsBrowser();
            TestUtils.setProjectsBrowserSource(openDialog, 'cloud');
            await driver.expect(
                () => TestUtils.getProjectList(openDialog).includes(name),
                'Project not in project browser after save'
            );

            await TestUtils.publishProject(name, openDialog);
            // TODO: Check the URL?

            await TestUtils.unpublishProject(name);
        });
    });

    describe('cloud-shared', function() {
        const name = 'SharedProject';
        
        it('should be able to open project', async function() {
            const openDialog = await TestUtils.openProjectsBrowser();
            TestUtils.setProjectsBrowserSource(openDialog, 'cloud-shared');
            await TestUtils.openProject(name, openDialog);
        });

        it('should be able to delete (evict self from) project', async function() {
            const openDialog = await TestUtils.openProjectsBrowser();
            TestUtils.setProjectsBrowserSource(openDialog, 'cloud-shared');
            await TestUtils.deleteProject(name, openDialog);
        });

        //it('should be able to publish project', function() {
        //});

        //it('should be able to unpublish project', function() {
        //});
    });

    describe('browser', function() {
        let name;

        beforeEach(async () => {
            name = 'TestProjectDialogBrowser' + Date.now();
        });

        afterEach(() => delete localStorage['-snap-project-' + name]);

        it('should be able to save project', async function() {
            const dialog = await TestUtils.saveProjectsBrowser();
            TestUtils.setProjectsBrowserSource(dialog, 'local');
            await driver.addBlock('doIfElse');
            await TestUtils.saveProjectAs(name, dialog);
            const openDialog = await TestUtils.openProjectsBrowser();
            await driver.expect(
                () => TestUtils.getProjectList(openDialog).includes(name),
                'Project not in project browser'
            );
        });

        it('should be able to open project', async function() {
            await makeSavedBrowserProject(name);
            const dialog = await TestUtils.openProjectsBrowser();
            TestUtils.setProjectsBrowserSource(dialog, 'local');
            await TestUtils.openProject(name, dialog);
            await driver.expect(
                () => TestUtils.getBlockCount() > 0,
                'Blocks not loaded'
            );
        });

        it('should be able to delete project', async function() {
            await makeSavedBrowserProject(name);
            const dialog = await TestUtils.openProjectsBrowser();
            TestUtils.setProjectsBrowserSource(dialog, 'local');
            await TestUtils.deleteProject(name, dialog);
        });

        async function makeSavedBrowserProject(name) {
            const {SnapCloud} = driver.globals();
            await driver.addBlock('doIfElse');

            const xml = driver.ide().serializer.format(
                '<room name="@" app="@">%</room>',
                name,
                driver.ide().serializer.app,
                driver.ide().getSerializedRole()
            );
            localStorage['-snap-project-' + name] = xml;
            const projectId = SnapCloud.projectId;
            TestUtils.newProject();
            await driver.expect(
                () => projectId !== SnapCloud.projectId,
                'New project not created'
            );
        }
    });

    describe('examples', function() {
        it('should be able to open project', async function() {
            const dialog = await TestUtils.openProjectsBrowser();
            TestUtils.setProjectsBrowserSource(dialog, 'examples');
            await TestUtils.openProject('Dice', dialog);
        });
    });
});
