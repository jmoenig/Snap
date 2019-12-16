/*globals driver, expect, */
describe('ide', function() {
    let SnapCloud, SnapActions, SnapUndo;

    this.timeout(5000);
    before(() => {
        SnapCloud = driver.globals().SnapCloud;
        SnapActions = driver.globals().SnapActions;
        SnapUndo = driver.globals().SnapUndo;
        return driver.reset();
    });

    describe('export', function() {
        it('should export locally if only one role', function(done) {
            var ide = driver.ide();
            ide.exportSingleRoleXml = function() {
                delete ide.exportSingleRoleXml;
                done();
            };
            ide.exportProject();
        });

        it('should export correct xml locally', function(done) {
            var ide = driver.ide();
            var local = null;
            ide.exportRoom = function(str) {
                // ignore the version number (client version may not match server version)
                str = str.replace(/NetsBlox \d+\.\d+\.\d+,/, 'NetsBlox')
                    .replace(/ \(\d+\)" app="NetsBlox/, '" app="NetsBlox');
                if (!local) {
                    return local = str;
                }

                delete ide.exportRoom;
                if (local !== str) {
                    var index = getFirstDiffChar(local, str);
                    var start = Math.max(index-10, 0);
                    var end = Math.min(index+10, local.length);
                    var msg = `xml mismatch: "${local.slice(start, end)}" and "${str.slice(start, end)}"`;
                    return done(msg);
                }
                done();
            };
            ide.exportMultiRoleXml();
            ide.exportSingleRoleXml();
        });

        it('"export to Snap!" should include sprites in export', function() {
            const xml = driver.ide().getSnapXml();
            expect(xml.includes('<sprites></sprites>')).toBe(false, 'Exported xml has no sprites!');
        });
    });

    describe('lang', function() {

        beforeEach(() => driver.reset());

        afterEach(function() {
            driver.ide().saveSetting('language', 'en');
        });

        it('should not change replay length on lang change', function(done) {
            SnapActions.addVariable('testVar', true)
                .then(() => {
                    var len = SnapUndo.allEvents.length;
                    var err;

                    driver.ide().setLanguage('en');
                    setTimeout(function() {  // give the project time to load
                        try {
                            expect(SnapUndo.allEvents.length).toBe(len);
                        } catch(e) {
                            err = e;
                        } finally {
                            done(err);
                        }
                    }, 200);
                });
        });

        it('should not change replay length on ide refresh', function(done) {
            SnapActions.addVariable('testVar', true)
                .then(() => {
                    var len = SnapUndo.allEvents.length;
                    var err;

                    driver.ide().refreshIDE();
                    setTimeout(function() {  // give the project time to load
                        try {
                            expect(SnapUndo.allEvents.length).toBe(len);
                        } catch(e) {
                            err = e;
                        } finally {
                            done(err);
                        }
                    }, 200);
                });
        });

        it('should not change replay length on toggle dynamic input labels', function(done) {
            SnapActions.addVariable('testVar', true)
                .then(() => {
                    var len = SnapUndo.allEvents.length;
                    var err;

                    driver.ide().toggleDynamicInputLabels();
                    setTimeout(function() {  // give the project time to load
                        try {
                            expect(SnapUndo.allEvents.length).toBe(len);
                        } catch(e) {
                            err = e;
                        } finally {
                            done(err);
                        }
                    }, 200);
                });
        });

        it('should have unique sprite ids after changing the lang', function(done) {
            var ide = driver.ide();

            // Change the language and create a sprite
            ide.setLanguage('en');
            setTimeout(() => {
                ide.addNewSprite()
                    .then(() => {
                        var spriteIds = ide.sprites.asArray().map(sprite => sprite.id);
                        try {
                            expect(spriteIds.length).toBe(2);
                            expect(spriteIds[0]).toNotBe(spriteIds[1]);
                            done();
                        } catch (e) {
                            ide.setLanguage('en');
                            done(e);
                        }
                    })
                    .catch(() => done('addNewSprite action caught!'));
            }, 150);
        });
    });

    describe('name', function() {
        const BAD_CHARS = ['.', '@'];
        beforeEach(() => driver.reset());

        BAD_CHARS.forEach(badChar => {
            describe('naming project with ' + badChar + ' symbol', function() {
                it('should not allow from room tab', function(done) {
                    driver.selectTab('room');
                    var roomEditor = driver.ide().spriteEditor.room;
                    var name = 'my' + badChar + 'project';
                    driver.click(roomEditor.roomName);

                    var dialog = driver.dialog();
                    dialog.body.setContents(name);
                    dialog.ok();

                    dialog = driver.dialog();
                    expect(dialog).toNotBe(null);

                    setTimeout(() => {
                        try {
                            expect(driver.ide().room.name).toNotBe(name);
                            done();
                        } catch (e) {
                            done(e);
                        }
                    }, 50);
                });

                it('should not allow using "save as"', function(done) {
                    driver.ide().saveProjectsBrowser();
                    var dialog = driver.dialog();
                    var name = 'my' + badChar + 'project';
                    dialog.nameField.setContents(name);
                    dialog.accept();

                    dialog = driver.dialog();
                    expect(dialog).toNotBe(null);

                    setTimeout(() => {
                        try {
                            expect(driver.ide().room.name).toNotBe(name);
                            done();
                        } catch (e) {
                            done(e);
                        }
                    }, 50);
                });
            });

            it('should not allow renaming role with ' + badChar, function(done) {
                driver.selectTab('room');
                let role = driver.ide().room.getRole('myRole');
                let name = 'role' + badChar + 'name';

                driver.click(role.label);
                var dialog = driver.dialog();
                dialog.body.setContents(name);
                dialog.ok();

                dialog = driver.dialog();
                expect(dialog).toNotBe(null);
                // verify that the role name didn't change
                setTimeout(() => {
                    try {
                        expect(driver.ide().spriteEditor.room.getRole(name)).toBe(undefined);
                        done();
                    } catch (e) {
                        done(e);
                    }
                }, 50);
            });
        });

        describe('creating role', function() {
            BAD_CHARS.forEach(badChar => {
                it('should not allow naming role with ' + badChar, function(done) {
                    driver.selectTab('room');

                    var addRoleBtn = driver.ide().spriteEditor.addRoleBtn;
                    var name = 'role' + badChar + 'name';
                    driver.click(addRoleBtn);

                    var dialog = driver.dialog();
                    dialog.body.setContents(name);
                    dialog.ok();

                    dialog = driver.dialog();
                    expect(dialog).toNotBe(null);
                    // verify that the role name didn't change
                    setTimeout(() => {
                        try {
                            expect(driver.ide().spriteEditor.room.getRole(name)).toBe(undefined);
                            done();
                        } catch (e) {
                            done(e);
                        }
                    }, 50);
                });
            });
        });
    });

    describe('saveACopy', function() {
        let username;
        before(() => driver.reset());

        after(function() {
            SnapCloud.username = username;
        });

        it('should have option to saveACopy if collaborator', function() {
            var ide = driver.ide();

            // make the user a collaborator
            username = SnapCloud.username;
            SnapCloud.username = 'test';

            ide.room.collaborators.push(SnapCloud.username);
            ide.room.ownerId = 'otherUser';

            // Click the project menu
            driver.click(ide.controlBar.projectButton);
            var dialog = driver.dialog();
            var saveACopyBtn = dialog.items.find(item => item[1] === 'saveACopy');
            expect(saveACopyBtn).toNotBe(undefined);
        });
    });

    describe('replay', function() {
        before(() => driver.reset());

        describe('bug reports', function() {
            it('should play the openProject event', function(done) {
                var ide = driver.ide();
                var checkAtEnd = function() {
                    var err = null;
                    if (ide.replayControls.actionIndex === -1) err = `did not apply openProject!`;
                    done(err);
                };
                driver.addBlock('forward')
                    .then(() => {
                        const events = SnapUndo.allEvents;
                        return driver.reset()
                            .then(() => {
                                ide.replayEvents(events);
                                ide.replayControls.jumpToEnd();
                                setTimeout(checkAtEnd, 400);
                            });
                    });
            });
        });
    });

    describe('server connection', () => {
        const EXPECTED_SURL = window.location.origin;
        let SERVER_URL, SERVER_ADDRESS, ensureFullUrl;
        before(() => {
            SERVER_URL = driver.globals().SERVER_URL;
            SERVER_ADDRESS = driver.globals().SERVER_ADDRESS;
            ensureFullUrl = driver.globals().ensureFullUrl;
        });

        beforeEach(() => driver.reset());

        describe('SERVER_URL', () => {

            it('should be set', () => {
                expect(SERVER_URL).toNotBe(undefined);
            });

            it('should be set to localhost', () => {
                expect(SERVER_URL.substring(0,10)).toBe(EXPECTED_SURL.substring(0,10));
            });

            it('should set server address', () => {
                expect(SERVER_ADDRESS).toBe(EXPECTED_SURL.match(/:\/\/(.*)$/)[1]);
            });

        });

        describe('ensureFullUrl', () => {
            it('should convert relative path', () => {
                const url = 'api/hello';
                expect(ensureFullUrl(url)).toBe(`${EXPECTED_SURL}/api/hello`);
            });

            it('should convert absolute path', () => {
                const url = '/api/hello';
                expect(ensureFullUrl(url)).toBe(`${EXPECTED_SURL}/api/hello`);
            });
        });

        describe('getURL', () => {
            it('should support relative addresses', () => {
                let response = driver.ide().getURL('lang-ca.js');
                expect(response.startsWith('/*')).toBe(true);
            });
        });

    });

    describe('tools', function() {
        beforeEach(() => driver.reset());

        it('should be able to run the label block', function() {
            this.timeout(10000);
            // Import the tools
            var ide = driver.ide();

            // Click the project menu
            driver.click(ide.controlBar.projectButton);
            var dialog = driver.dialog();
            var importBtn = dialog.children.find(child => child.labelString === 'Import tools');

            driver.click(importBtn);
            expect(importBtn).toNotBe(undefined);

            return driver.waitUntil(() => driver.dialog())
                .then(() => {  // run the label block
                    driver.selectCategory('Custom');
                    var labelBlock = driver.palette().children[0].children
                        .find(item => item.blockSpec === 'label %txt of size %n');

                    if (!labelBlock) throw new Error(`Could not find label block!`);

                    driver.click(labelBlock);

                    // Wait for some sort of result
                    var sprite = driver.ide().sprites.at(1);
                    var startX = sprite.xPosition();
                    return driver.waitUntil(
                        () => driver.dialog() || sprite.xPosition() !== startX
                    ).then(() => {
                        if (driver.dialog()) throw new Error('label block failed to execute');
                    });
                });
        });
    });

    function getFirstDiffChar (str1, str2) {
        for (var i = 0; i < str1.length; i++) {
            if (str1[i] !== str2[i]) {
                return i;
            }
        }
        return -1;
    }

    describe('getActiveEntity', function() {
        it('should return a string starting with the id', function() {
            let entityId = driver.ide().getActiveEntity();
            let ownerId = entityId.split('/').shift();
            let owner = SnapActions.getOwnerFromId(ownerId);
            expect(owner).toNotBe(undefined);
        });

        it('should return a string starting with the custom block id', function(done) {
            // Create a custom block definition
            const {CustomBlockDefinition, CustomCommandBlockMorph} = driver.globals();
            var sprite = driver.ide().currentSprite,
                spec = 'sprite block %s',
                definition = new CustomBlockDefinition(spec, sprite);

            // Get the sprite
            definition.category = 'motion';
            SnapActions.addCustomBlock(definition, sprite).then(function() {
                driver.selectCategory('custom');
                let block = driver.palette().contents.children
                    .find(item => item instanceof CustomCommandBlockMorph);

                // Edit the custom block
                driver.rightClick(block);
                let editBtn = driver.dialog().children.find(item => item.action === 'edit');
                driver.click(editBtn);

                let editor = driver.dialog();
                driver.click(editor);

                let entityId = driver.ide().getActiveEntity();
                let ownerId = entityId.split('/').shift();
                let customBlock = SnapActions.getBlockFromId(ownerId);
                expect(customBlock).toNotBe(undefined);
                done();
            });
        });
    });

    describe('newProject', function() {
        before(() => driver.reset().then(() => driver.addBlock('doIf')));
        after(() => delete SnapCloud.request);

        it('should be able to get new project on failed network request', function() {
            const SnapCloud = driver.globals().SnapCloud;
            SnapCloud.request = Promise.reject.bind(Promise, {responseText: 'Test error'});

            driver.click(driver.ide().controlBar.projectButton);
            const newBtn = driver.dialog().children
                .find(item => item.action === 'createNewProject');

            driver.click(newBtn);
            driver.dialog().ok();  // (replace the current w/ new project)
            return driver.expect(
                () => !driver.ide().currentSprite.scripts.children.length,
                `Did not replace scripts w/ new scripts`
            );
        });
    });

    describe('embedded api', function() {
        after(() => delete driver.ide().droppedText);

        it('should be able to set variables', async function() {
            const frame = document.getElementsByTagName('iframe')[0];
            const key = 'testVariable';
            const value = 'test variable value';
            frame.contentWindow.postMessage({
                type: 'set-variable',
                key: key,
                value: value,
            });
            await driver.expect(
                () => driver.globals().externalVariables[key] === value,
                'Did not set external variable',
            );
        });

        it('should be able to delete variables', async function() {
            const frame = document.getElementsByTagName('iframe')[0];
            const key = 'testVariable';
            const value = 'test variable value';
            driver.globals().externalVariables[key] = value;
            frame.contentWindow.postMessage({
                type: 'delete-variable',
                key: key,
            });
            await driver.expect(
                () => driver.globals().externalVariables[key] === undefined,
                'Did not delete external variable',
            );
        });

        it('should be able to import text', function(done) {
            const frame = document.getElementsByTagName('iframe')[0];
            const name = 'hello.xml';
            const content = 'content';

            driver.ide().droppedText = function(text, filename) {
                if (text === content && filename === name) {
                    done();
                }
            };

            frame.contentWindow.postMessage({
                type: 'import',
                name: name,
                content: content,
            });
        });
    });
});

