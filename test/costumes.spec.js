/*globals driver, assert */
describe('costumes', function() {
    beforeEach(() => driver.reset());

    it('should import costume and undo', async function() {
        this.timeout(5000);
        const {SnapUndo} = driver.globals();
        await importCostume();
        assert.equal(
            driver.ide().currentSprite.costumes.length(),
            1,
            'Imported costume not found'
        );

        const lastEvent = SnapUndo.allEvents.slice().pop();
        await SnapUndo.undo(lastEvent.owner);
        assert.equal(
            driver.ide().currentSprite.costumes.length(),
            0,
            'Costume import not undone'
        );
    });

    it('should create from camera', async function() {
        const [, , newCamSprite] = driver.ide().corralBar.children;
        driver.click(newCamSprite);

        const dialog = driver.dialog();
        const cameraReady = driver.expect(() => dialog.videoElement.stream);

        await cameraReady;
        await driver.sleep(100);
        const [saveBtn] = dialog.buttons.children;
        driver.click(saveBtn);
        await driver.actionsSettled();
        assert.equal(driver.ide().sprites.length(), 2);
        assert.equal(driver.ide().sprites.at(2).costumes.length(), 1);
    });

    it('should delete one when there are multiple', async function() {
        this.timeout(5000);
        const {CostumeIconMorph} = driver.globals();

        const costumesDialog = await openCostumesDialog();
        await importCostume(costumesDialog);
        await importCostume(costumesDialog);
        costumesDialog.destroy();
        const costumeIcon = driver.ide().spriteEditor.allChildren()
            .find(c => c instanceof CostumeIconMorph);
        driver.rightClick(costumeIcon);
        const deleteBtn = driver.dialog().children.find(c => c.labelString === 'delete');
        driver.click(deleteBtn);
        await driver.actionsSettled();
        assert.equal(driver.ide().currentSprite.costumes.length(), 1);
    });

    async function openCostumesDialog() {
        const {localize, DialogBoxMorph} = driver.globals();
        const {projectButton} = driver.ide().controlBar;
        driver.click(projectButton);
        const dialog = driver.dialog();
        const costumesBtn = dialog.children
            .find(item => item.labelString === localize('Costumes...'));
        driver.click(costumesBtn);
        return await driver.expect(
            () => {
                const dialog = driver.dialog();
                if (dialog instanceof DialogBoxMorph) {
                    return dialog;
                }
            },
            'Import costume dialog did not appear'
        );
    }

    async function importCostume(costumesDialog) {
        const isReusingDialog = !!costumesDialog;
        costumesDialog = costumesDialog || await openCostumesDialog();
        const {CostumeIconMorph} = driver.globals();
        const costumeIcon = costumesDialog.allChildren()
            .find(c => c instanceof CostumeIconMorph);
        driver.click(costumeIcon);
        const [importBtn] = costumesDialog.buttons.children;
        driver.click(importBtn);
        await driver.actionsSettled();
        if (!isReusingDialog) {
            costumesDialog.destroy();
        }
    }
});
