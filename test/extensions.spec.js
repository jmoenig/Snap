/*globals driver, assert */
describe('extensions', function() {
    let TestExtension;
    before(() => {
        const {NetsBloxExtensions,Extension,Color,SpriteMorph,StageMorph} = driver.globals();

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
            )
        ];

        TestExtension.prototype.getPalette = () => [
            new Extension.PaletteCategory(
                'TEST!',
                [
                    new Extension.Palette.Block('newBlock'),
                    new Extension.Palette.Block('newBlock').withWatcherToggle(),
                    new Extension.Palette.Block('spriteBlock'),
                ],
                SpriteMorph
            ),
            new Extension.PaletteCategory(
                'TEST!',
                [
                    new Extension.Palette.Block('newBlock'),
                    new Extension.Palette.Block('newBlock').withWatcherToggle()
                ],
                StageMorph
            ),
        ];

        TestExtension.prototype.getBlocks = () => [
            new Extension.Block(
                'newBlock',
                'reporter',
                'TEST!',
                'test block',
                [],
                () => 'This is a test.'
            ).for(SpriteMorph, StageMorph),
            new Extension.Block(
                'spriteBlock',
                'reporter',
                'TEST!',
                'sprite-only block: %testPart2',
                [],
                () => 'This is another test.'
            ).for(SpriteMorph)
        ];

        const {InputSlotMorph} = driver.globals();
        TestExtension.prototype.getLabelParts = () => [
            new Extension.LabelPart(
                'testPart',
                () => {
                    const part = new InputSlotMorph(
                        null, // text
                        false, // non-numeric
                        {
                            'this is a test': ['this is a test'],
                            'yet another value': ['yet another value']
                        },
                        true
                    );
                    part.setContents(['this is a test']);
                    return part;
                }
            ),
            new Extension.LabelPart(
                'testPart2',
                () => {
                    const part = new InputSlotMorph(
                        null, // text
                        false, // non-numeric
                        {
                            'this is a second test': ['this is a second test'],
                            'yet another second value': ['yet another second value']
                        },
                        true
                    );
                    part.setContents(['this is a second test']);
                    return part;
                }
            ),
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

    describe('ExtensionRegistry', function() {
        it('should defer registration until after initialization', function() {
            const {ExtensionRegistry} = driver.globals();
            const registry = new ExtensionRegistry();
            let loaded = false;
            function SimpleExtension() {
                loaded = true;
            }

            registry.register(SimpleExtension);
            assert(!loaded);
            registry.initialize(driver.ide());
            assert(loaded);
        });
    });

    describe('palette', function() {
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
            assert(
                driver.palette().contents.children.length > 1
            );
        });

        it('should show watcher toggles in palette', function() {
            driver.selectCategory('TEST!');
            const {ToggleMorph} = driver.globals();
            const toggle = driver.palette().contents.children.find(child => child instanceof ToggleMorph);
            assert(toggle);
        });

        it('should create toggleable watchers in palette', function() {
            driver.selectCategory('TEST!');
            const {ToggleMorph} = driver.globals();
            const toggle = driver.palette().contents.children.find(child => child instanceof ToggleMorph);
            driver.click(toggle);
        });

        it('should show sprite block on sprite', function() {
            const {name} = driver.ide().sprites.at(1);
            driver.selectSprite(name);
            driver.selectCategory('TEST!');
            const block = driver.palette().contents.children.find(child => child.selector === 'spriteBlock');
            assert(block);
        });

        it('should add label part', function() {
            const {name} = driver.ide().sprites.at(1);
            driver.selectSprite(name);
            driver.selectCategory('TEST!');
            const block = driver.palette().contents.children.find(child => child.selector === 'spriteBlock');
            const [inputSlot] = block.inputs();
            assert.equal(inputSlot.evaluate(), 'this is a second test');
        });

        it('should hide sprite block on stage', function() {
            driver.selectStage();
            driver.selectCategory('TEST!');
            const block = driver.palette().contents.children.find(child => child.selector === 'spriteBlock');
            assert(!block);
        });
    });

    describe('onNewProject', function() {
        it('should call function on new project', function(done) {
            driver.reset();
            TestExtension.prototype.onNewProject = () => {
                delete TestExtension.prototype.onNewProject;
                done();
            };
        });
    });

    describe('onOpenRole', function() {
        it('should call function on switch roles', async function() {
            const {utils} = driver.globals();
            await driver.newRole('testRole');
            const deferred = utils.defer();
            TestExtension.prototype.onOpenRole = () => {
                delete TestExtension.prototype.onOpenRole;
                deferred.resolve();
            };
            await driver.moveToRole('testRole');
            await deferred.promise;
        });
    });
});
