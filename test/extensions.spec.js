/*globals driver, assert */
describe('extensions', function() {
    let TestExtension;
    before(() => {
        const {NetsBloxExtensions,Extension,Color} = driver.globals();

        TestExtension = function() {};
        TestExtension.prototype = new Extension('TestExt');
        TestExtension.prototype.getMenu = () => {
            return {
                'hello!': function() {},
            };
        };
        TestExtension.prototype.getCategories = () => [
            new Extension.Category(
                'TEST!',
                new Color(10, 100, 10),
                [
                    'newBlock'
                ]
            )
        ];
        TestExtension.prototype.getBlocks = () => [
            new Extension.Block(
                'newBlock',
                'reporter',
                'TEST!',
                'test block',
                [],
                () => 'This is a test.'
            )
        ];

        NetsBloxExtensions.register(TestExtension);
    });

    it('should show extensions button', function() {
        assert(driver.ide().controlBar.extensionsButton.isVisible);
    });

    it('should create menu', function() {
        driver.click(driver.ide().controlBar.extensionsButton);
        const menuItems = driver.dialog().children.map(c => c.labelString);
        assert(menuItems.includes('TestExt'));
        driver.dialog().destroy();
    });

    it('should not load an extension twice', function() {
        const {NetsBloxExtensions} = driver.globals();
        const extCount = NetsBloxExtensions.registry.length;
        NetsBloxExtensions.register(TestExtension);
        assert.equal(NetsBloxExtensions.registry.length, extCount);
    });

    it.skip('should save required extensions in xml', function() {
    });

    it('should add new category', function() {
        const categories = driver.ide().categories.children.map(c => c.labelString);
        assert(categories.includes('TEST!'));
    });

    it('should add new blocks', function() {
        driver.selectCategory('TEST!');
        assert.equal(
            driver.palette().contents.children.length,
            2
        );
    });

    it('should show new blocks on the stage', function() {
        driver.selectStage();
        driver.selectCategory('TEST!');
        assert.equal(
            driver.palette().contents.children.length,
            2
        );
    });
});
