/* globals driver, assert */
// This contains tests for issues that are hard to explain succinctly and
// reference github issues
describe('misc issues', function() {
    it('should be able to connect to proto hat block (1115)', async function() {
        const {Point} = driver.globals();
        await driver.reset();
        // import custom block
        const response = await fetch('/test/custom-block.xml');
        const xml = await response.text();
        driver.ide().droppedText(xml);
        await driver.actionsSettled();

        // edit block
        driver.selectCategory('custom');
        const [, block] = driver.palette().contents.children;
        driver.rightClick(block);
        const contextMenu = driver.dialog();
        const editButton = contextMenu.children
            .find(c => c.labelString && c.labelString.includes('edit'));
        driver.click(editButton);

        // disconnect loop
        const editor = driver.dialog();
        const scripts = editor.body.contents;
        const [hatBlock] = scripts.children;
        const loop = hatBlock.bottomBlock();
        const ifBlock = hatBlock.nextBlock();
        driver.dragAndDrop(loop, scripts.center());
        await driver.actionsSettled();

        // delete if
        driver.dragAndDrop(ifBlock, driver.palette().center());
        await driver.actionsSettled();

        // connect loop
        const bottomAttachPoint = hatBlock.bottomAttachPoint()
            .add(new Point(loop.width()/2, loop.height()/2))
            .subtract(loop.topAttachPoint().subtract(loop.topLeft()));
        driver.dragAndDrop(loop, bottomAttachPoint);
        await driver.actionsSettled();
        assert.equal(hatBlock.nextBlock(), loop);
    });
});
