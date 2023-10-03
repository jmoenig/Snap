/*globals driver, assert */
describe('extensions', function() {
    describe('event handlers', function() {

        let CallCounterMetaExt, CallPromiseMetaExt;
        before(async () => {
            await driver.reset();
            const {Extension, utils} = driver.globals();
            CallCounterMetaExt = function(method) {
                class CallCounterExt extends Extension {
                    constructor() {
                        super('CallCounter_' + method);                    
                        this.callCount = 0;
                    }
                };
                CallCounterExt.prototype[method] = function() {
                    console.log(this);
                    return this.callCount++;
                };
                return CallCounterExt;
            }

            CallPromiseMetaExt = function(method) {
                class CallCounterExt extends Extension {
                    constructor() {
                        super('CallPromise_' + method);                    
                        this._deferred = utils.defer();
                        this.promise = this._deferred.promise;
                    }
                };
                CallCounterExt.prototype[method] = function() {
                    return this._deferred.resolve();
                };
                return CallCounterExt;
            }
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
            it('should call on new project if loaded after load', async function() {
                // This checks the async issue where the extension loads slower than
                // initializing the project
                const {NetsBloxExtensions} = driver.globals();
                NetsBloxExtensions.register(CallCounterMetaExt('onOpenRole'));
                const extension = await driver.expect(
                    () => NetsBloxExtensions.registry[0],
                    'Extension not loaded.'
                );
                assert.equal(extension.callCount, 1);
            });

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

        describe('onRunScripts', function() {
            it('should call function on green flag', async function() {
                const {utils} = driver.globals();
                const deferred = utils.defer();
                TestExtension.prototype.onRunScripts = () => {
                    delete TestExtension.prototype.onRunScripts;
                    deferred.resolve();
                };
                driver.click(driver.ide().controlBar.startButton);
                await deferred.promise;
            });
        });

        describe('onStopAllScripts', function() {
            it('should call function on stop button', async function() {
                const {utils} = driver.globals();
                const deferred = utils.defer();
                TestExtension.prototype.onStopAllScripts = () => {
                    delete TestExtension.prototype.onStopAllScripts;
                    deferred.resolve();
                };
                driver.click(driver.ide().controlBar.stopButton);
                await deferred.promise;
            });
        });

        describe('onPauseAll', function() {
            it('should call function on pause button', async function() {
                const {utils} = driver.globals();
                let deferred = utils.defer();
                TestExtension.prototype.onPauseAll = () => {
                    delete TestExtension.prototype.onPauseAll;
                    deferred.resolve();
                };
                driver.click(driver.ide().controlBar.pauseButton);
                await deferred.promise;
            });

            it('should call function on pause block', async function() {
                driver.reset();
                driver.selectTab('scripts');

                const {utils, Point} = driver.globals();
                deferred = utils.defer();
                TestExtension.prototype.onPauseAll = () => {
                    delete TestExtension.prototype.onPauseAll;
                    deferred.resolve();
                };
                let block = await driver.addBlock("doPauseAll", new Point(300, 300));
                await driver.sleep(100);
                driver.click(block);

                await deferred.promise;
            });
        });

        describe('onResumeAll', function() {
            it('should call function on resume button', async function() {
                driver.reset();
                driver.selectTab('scripts');
            
                const {utils, Point} = driver.globals();
                const deferred = utils.defer();

                let block = await driver.addBlock("doPauseAll", new Point(300, 300));
                await driver.sleep(100);
                driver.click(block);
                await driver.sleep(100);

                TestExtension.prototype.onResumeAll = () => {
                    delete TestExtension.prototype.onResumeAll;
                    deferred.resolve();
                };
                driver.click(driver.ide().controlBar.pauseButton);
                await deferred.promise;
            });
        });

        describe('onNewSprite', function() {
            it('should call function on new sprite button', async function() {
                const {utils} = driver.globals();
                const deferred = utils.defer();
                TestExtension.prototype.onNewSprite = () => {
                    delete TestExtension.prototype.onNewSprite;
                    deferred.resolve();
                };
                driver.click(driver.ide().corralBar.children[0]);
                await deferred.promise;
            });
        });

        describe('onRenameSprite', function() {
            it('should call function on rename sprite', async function() {
                const {utils, SnapActions} = driver.globals();
                const deferred = utils.defer();
                TestExtension.prototype.onRenameSprite = (spriteId, name) => {
                    delete TestExtension.prototype.onRenameSprite;
                    deferred.resolve(name);
                };
                SnapActions.renameSprite(driver.ide().currentSprite, "newName");
                let name = await deferred.promise;
                assert(name == "newName");
            });
        });

        describe('onSetStageSize', function() {
            it('should call function on pause button', async function() {
                const {utils} = driver.globals();
                const deferred = utils.defer();
                TestExtension.prototype.onSetStageSize = (w, h) => {
                    delete TestExtension.prototype.onSetStageSize;
                    deferred.resolve([w, h]);
                };
                driver.click(driver.ide().controlBar.settingsButton);
                driver.click(driver.dialog().children[4]);
                driver.click(driver.dialog().allEntryFields()[0]);
                driver.keys("123");
                driver.click(driver.dialog().allEntryFields()[1]);
                driver.keys("456");
                driver.dialog().ok();
            
                let [w, h] = await deferred.promise;
                assert(w == 123 && h == 456);
            });
        });
    });

    describe('TestExtension', function() {
        let TestExtension;
        before(() => {
            driver.reset();
            const {NetsBloxExtensions,Extension,Color,SpriteMorph,StageMorph} = driver.globals();

            TestExtension = function() {
                this.onOpenRoleCount = 0;
            };
            TestExtension.prototype = new Extension('TestExt');
            TestExtension.prototype.getMenu = () => {
                return {
                    'TestMenuItem': function() {},
                };
            };
            TestExtension.prototype.getSettings = () => {
                return [new Extension.ExtensionSetting(
                    'Test Setting',
                    () => {},
                    () => false
                )];
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

            TestExtension.prototype.onOpenRole = () => {
                this.onOpenRoleCount++;
                console.log('On Open Role!', this.onOpenRoleCount);
            };
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

        it('should create menu item', function() {
            driver.click(driver.ide().controlBar.extensionsButton);
            driver.click(driver.dialog().children[1]);
            const subMenuItems = driver.dialog().children[2].children.map(c => c.labelString);
            assert(subMenuItems.includes('TestMenuItem'));
            driver.dialog().destroy();
        });

        it('should create settings', function() {
            driver.click(driver.ide().controlBar.extensionsButton);
            driver.click(driver.dialog().children[1]);
            const subMenuItems = driver.dialog().children[2].children.map(c => c.labelString);
            assert(subMenuItems.includes('Options'));
            driver.click(driver.dialog().children[2].children[2]);
        
            const optionMenuItems = driver.dialog().children[2].children[3].children.map(c => c.labelString);
            assert(optionMenuItems.find(item => item && item[1] == 'Test Setting'));

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
                    5
                );
            });

            it('should show new blocks on the stage', function() {
                driver.selectStage();
                driver.selectCategory('TEST!');
                assert.equal(
                    driver.palette().contents.children.length,
                    4
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
                assert(Object.keys(inputSlot.choices).includes('this is a second test'));
            });

            it('should hide sprite block on stage', function() {
                driver.selectStage();
                driver.selectCategory('TEST!');
                const block = driver.palette().contents.children.find(child => child.selector === 'spriteBlock');
                assert(!block);
            });
        });
    });
});
