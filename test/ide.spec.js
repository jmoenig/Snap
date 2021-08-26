/*globals driver, expect, assert, EmbeddedNetsBloxAPI */
describe('ide', function() {
    let SnapCloud, SnapActions, SnapUndo;

    this.timeout(5000);
    before(() => {
        SnapCloud = driver.globals().SnapCloud;
        SnapActions = driver.globals().SnapActions;
        SnapUndo = driver.globals().SnapUndo;
        return driver.reset();
    });

    describe('login', function() {
        it('should show error on incorrect username/password', async function() {
            let loginFailed = false;
            try {
                await driver.login('test', 'ThisPasswordIsIncorrect', {maxWait: 1800});
            } catch (err) {
                const dialog = driver.dialog();
                assert(
                    dialog.body.text.toLowerCase().includes('incorrect password'),
                    'Incorrect password dialog not shown'
                );
                loginFailed = true;
            }
            assert(loginFailed, 'Login should fail with incorrect password');
        });
    });

    describe('about', function() {
        it('should show about message', function() {
            const len = driver.dialogs().length;
            const ide = driver.ide();
            ide.snapMenu();
            const about = driver.dialog().children[1];
            driver.click(about);
            assert.equal(driver.dialogs().length, len + 1);
        });
    });

    describe('notifications', function() {
        afterEach(() => driver.dialogs().forEach(d => d.destroy()));

        it('should show notification', function() {
            const ide = driver.ide();
            const len = driver.dialogs().length;
            ide.simpleNotification('hello!');
            assert.equal(driver.dialogs().length, len + 1);
            driver.click(driver.dialog());
        });

        it('should not close on click if sticky', function() {
            const ide = driver.ide();
            const len = driver.dialogs().length;
            ide.simpleNotification('hello!', true);
            driver.click(driver.dialog());
            assert.equal(driver.dialogs().length, len + 1);
        });
    });

    describe('menus', function() {
        it('should show services in dropdown', function() {
            const {localize} = driver.globals();
            const {projectButton} = driver.ide().controlBar;
            driver.click(projectButton);
            const dialog = driver.dialog();
            const servicesItem = dialog.items
                .find(item => item[0] === localize('Services...'));
            const [, serviceIndexFn] = servicesItem;
            serviceIndexFn.call(driver.ide());

            const services = driver.dialog().items;
            expect(services.length > 1).toBe(true, 'Not listing service libraries');
        });
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

        it('should not change replay length on lang change', async function() {
            await SnapActions.addVariable('testVar', true);
            const len = SnapUndo.allEvents.length;
            driver.ide().setLanguage('en');
            await driver.sleep(200);
            assert.equal(SnapUndo.allEvents.length, len);
        });

        it('should not change replay length on ide refresh', async function() {
            await SnapActions.addVariable('testVar', true);
            const len = SnapUndo.allEvents.length;
            driver.ide().refreshIDE();
            await driver.sleep(200);
            assert.equal(SnapUndo.allEvents.length, len);
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
                let response = driver.ide().getURL('locale/lang-ca.js');
                expect(response.startsWith('/*')).toBe(true);
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

    describe('URL anchors', function () {
        const frame = document.getElementsByTagName('iframe')[0];

        describe('set variable', function () {
            it('should set variable', async () => {
                const querystring = '?setVariable=' + encodeURIComponent('testVariable=testValue');
                await reloadIframe(frame, window.origin + querystring);
                await driver.actionsSettled();

                await driver.expect(
                    () => driver.ide().globalVariables.allNames().includes('testVariable'),
                    `Variable testVariable not found`
                );
            });

            it('should set variable and open example', async () => {
                const querystring = '?action=example&ProjectName=Movies&editMode&noRun&' +
                    'setVariable=' + encodeURIComponent('testVariable=testValue');
                await reloadIframe(frame, window.origin + querystring);
                await driver.expect(
                    () => driver.ide().currentSprite.scripts.children.length,
                    `Example project scripts did not appear`
                );

                await driver.expect(
                    () => driver.ide().globalVariables.allNames().includes('testVariable'),
                    `Variable testVariable not found`
                );
            });
        });
    });

    describe('embedded', function() {
        describe('load', function() {
            const frame = document.getElementsByTagName('iframe')[0];
            after(async () => {
                await reloadIframe(frame);
                await driver.login('test');
            });

            it('should load IDE w/o url anchors', async function() {
                await reloadIframe(frame);
                const {IDE_Morph} = driver.globals();
                const ide = frame.contentWindow.world.children.find(morph => {
                    return morph instanceof IDE_Morph;
                });
                if (!ide) {
                    throw new Error('IDE not loaded!');
                }
            });

            it('should load IDE w/ url anchors', done => {
                reloadIframe(frame, window.origin + '?action=example&ProjectName=Battleship');
                frame.onload = () => {
                    const {IDE_Morph} = driver.globals();
                    const ide = frame.contentWindow.world.children.find(morph => {
                        return morph instanceof IDE_Morph;
                    });
                    if (ide) {
                        done();
                    } else {
                        done(new Error('IDE not loaded!'));
                    }
                };
            });

            it('should import variable immediately (no url anchors)', async function() {
                await reloadIframe(frame);
                console.log('iframe reloaded');
                const {IDE_Morph} = driver.globals();
                const ide = frame.contentWindow.world.children
                    .find(morph => morph instanceof IDE_Morph);

                // TODO: we should wait for it to settle...
                console.log('about to post message');
                frame.contentWindow.postMessage({
                    type: 'import',
                    name: 'abc',
                    content: '123',
                    fileType: 'text'
                });

                await driver.expect(
                    () => ide.stage.globalVariables().allNames().includes('abc'),
                    'Imported variable not found.'
                );
            });

            it('should import CSV data', function(done) {
                reloadIframe(frame);
                frame.onload = async () => {
                    frame.contentWindow.postMessage({
                        type: 'import',
                        name: 'csvData',
                        content: 'a,b,c\n1,2,3',
                        fileType: 'csv'
                    });

                    const {IDE_Morph,List} = driver.globals();
                    const ide = frame.contentWindow.world.children.find(morph => {
                        return morph instanceof IDE_Morph;
                    });
                    await driver.expect(
                        () => ide.stage.globalVariables().allNames().includes('csvData'),
                        'Imported variable not found.'
                    );
                    const table = ide.stage.globalVariables().getVar('csvData');
                    assert(typeof table !== 'string', 'CSV imported as string');
                    const firstItem = table.asArray()[0];
                    assert(
                        table instanceof List && firstItem instanceof List,
                        'CSV not imported as list of lists'
                    );
                    done();
                };
            });

            it('should set var immediately load IDE w/ url anchors', done => {
                reloadIframe(frame, window.origin + '?action=example&ProjectName=Battleship');
                frame.onload = async () => {
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
                    done();
                };
            });

            function assert(cond, err) {
                if (!cond) {
                    throw new Error(err || 'Assert failed');
                }
            }

        });

        describe('api', function() {
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
                const [frame] = document.getElementsByTagName('iframe');
                const name = 'hello.xml';
                const content = 'content';

                driver.ide().droppedText = function(text, filename) {
                    if (text === content && filename === name) {
                        done();
                    }
                };

                const api = new EmbeddedNetsBloxAPI(frame);
                api.import(name, content);
            });

            it('should be able to export the project', async () => {
                const [frame] = document.getElementsByTagName('iframe');

                const api = new EmbeddedNetsBloxAPI(frame);
                const xml = await api.getProjectXML();
                expect(!!xml).toBe(true);
            });

            it('should be able to export the project (as guest)', async () => {
                await driver.logout();
                await driver.reset();
                const [frame] = document.getElementsByTagName('iframe');
                const api = new EmbeddedNetsBloxAPI(frame);
                const xml = await api.getProjectXML();
                assert(xml.startsWith('<'), `Expected XML but found: ${xml}`);
            });

            it('should be able to get the username', async () => {
                const [frame] = document.getElementsByTagName('iframe');

                const api = new EmbeddedNetsBloxAPI(frame);
                const username = await api.getUsername();
                expect(username).toBe('test');
            });

            it('should be able to subscribe to actions', async () => {
                const [frame] = document.getElementsByTagName('iframe');

                const api = new EmbeddedNetsBloxAPI(frame);
                const getFirstAction = new Promise(resolve =>
                    api.addActionListener(resolve)
                );
                await driver.addBlock('forward');
                const action = await getFirstAction;
                expect(action.type).toBe('addBlock');
            });

            it('should be able to unsubscribe from actions', async () => {
                const [frame] = document.getElementsByTagName('iframe');

                const api = new EmbeddedNetsBloxAPI(frame);
                const callback = () => assert(false, 'Received action after removing listener');
                api.addActionListener(callback);
                api.removeActionListener(callback);
                await driver.addBlock('forward');
                await driver.actionsSettled();
            });

            it('should be able to subscribe to arbitrary events', async () => {
                const [frame] = document.getElementsByTagName('iframe');
                const {utils} = driver.globals();
                const deferred = utils.defer();

                const api = new EmbeddedNetsBloxAPI(frame);
                await api.addEventListener('test', deferred.resolve);
                driver.ide().events.dispatchEvent(new CustomEvent('test', {detail: {someData: true}}));
                const event = await deferred.promise;
                assert.equal(event.type, 'test');
                assert(event.detail.someData);
            });
        });
    });

    async function reloadIframe(frame, url=window.origin) {
        driver.disableExitPrompt();
        driver.setWindow(frame.contentWindow);
        frame.setAttribute('src', url);
        return new Promise(resolve => {
            frame.onload = resolve;
        });
    }
});

