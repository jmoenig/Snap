/*global driver, expect, assert */
describe('room', function() {
    describe('isValidName', function() {
        it('should reject names including @', function() {
            const {RoomMorph} = driver.globals();
            assert(!RoomMorph.isValidName('hello@world'));
        });

        it('should reject names including .', function() {
            const {RoomMorph} = driver.globals();
            assert(!RoomMorph.isValidName('hello.world'));
        });

        it('should accept alphanumeric names', function() {
            const {RoomMorph} = driver.globals();
            assert(RoomMorph.isValidName('helloworld'));
        });
    });

    describe('isEmptyName', function() {
        it('should return false for names with characters', function() {
            const {RoomMorph} = driver.globals();
            assert(!RoomMorph.isEmptyName(' helloworld'));
        });

        it('should return true if only whitespace', function() {
            const {RoomMorph} = driver.globals();
            assert(RoomMorph.isEmptyName(' \t'));
        });

        it('should return true if empty', function() {
            const {RoomMorph} = driver.globals();
            assert(RoomMorph.isEmptyName(''));
        });
    });

    describe('debugger', function() {
        const messages = ['hi', 'how', 'are', 'you'];
        before(async () => {
            await driver.reset();
            await driver.newRole('OtherRole');
            await driver.selectTab('room');
            const roomEditor = driver.ide().spriteEditor;

            const toggleTraceBtn = () => roomEditor.toolBar.children
                .find(c => c.hint.includes('network trace'));

            const replayerBtn = () => roomEditor.toolBar.children
                .find(c => c.hint.includes('View last network trace'));

            driver.click(toggleTraceBtn());
            const {projectName, room} = driver.ide();
            const roleName = driver.ide().projectName;
            const srcId = [roleName, room.name, room.ownerId].join('@');
            const dstId = [`OtherRole@${room.name}@${room.ownerId}`];
            await messages.reduce(
                (lastSend, content) => lastSend.then(async () => {
                    await driver.sleep(50);
                    driver.ide().sockets.sendMessage({
                        type: 'message',
                        dstId,
                        srcId,
                        msgType: 'message',
                        content: {msg: content},
                    });
                }),
                Promise.resolve()
            );
            driver.click(toggleTraceBtn());
            driver.click(await driver.expect(replayerBtn));
        });

        it('should show/update message contents on click', async function() {
            const {stepForwardButton} = driver.ide().spriteEditor.replayControls;
            driver.click(stepForwardButton);
            const msgMorph = await driver.expect(
                () => driver.ide().room.displayedMsgMorphs[0],
                'No messages displayed'
            );
            driver.click(msgMorph.message);
            assert(
                driver.dialog().labelString.startsWith('Contents of'),
                'Message inspector dialog not shown'
            );
            const label = driver.dialog().label;
            const titlePosition = label.position();
            console.log(titlePosition);
            driver.click(stepForwardButton);
            await driver.expect(
                () => driver.dialog().label !== label,
                'Message inspector not updated'
            );
            assert(
                driver.dialog().label.position().eq(titlePosition),
                'Message inspector dialog not updated correctly'
            );
        });
    });

    describe('new', function() {
        const name = 'newRoleName';
        let initialRoleName = '';
        before(async () => {
            await driver.reset()
            await driver.addBlock('forward');
            initialRoleName = driver.ide().projectName;
            driver.newRole(name);

            // wait for it to show up
            let room = driver.ide().room;
            return driver.expect(
                () => room.getRole(name),
                `new role (${name}) did not appear`
            );
        });

        describe('moveToRole', function() {
            let cloud, projectId, oldRoleId;
            before(function() {
                cloud = driver.ide().cloud;
                projectId = cloud.projectId;
                oldRoleId = cloud.projectId;

                driver.moveToRole(name);
                driver.dialogs().forEach(d => d.destroy());
            });

            it('should update role/project name', function() {
                // wait for the project name to change
                return driver
                    .expect(() => {
                        return driver.ide().projectName === name;
                    }, `could not move to ${name} role`)
                    .then(() => expect(projectId).toBe(cloud.projectId));
            });

            it('should not update projectId', function() {
                expect(projectId).toBe(cloud.projectId);
            });

            it('should update roleId', function() {
                expect(oldRoleId).toNotBe(cloud.roleId);
            });

            it('should be able to move back and forth', async function() {
                // wait for the project name to change
                await driver.expect(() => {
                    return driver.ide().projectName === name;
                }, `could not move to ${name} role`);

                driver.moveToRole(initialRoleName);
                driver.dialogs().forEach(d => d.destroy());
                await driver.expect(() => {
                    return driver.ide().projectName === initialRoleName;
                }, `could not move to ${initialRoleName} role`);

                driver.moveToRole(name);
                driver.dialogs().forEach(d => d.destroy());
                await expect(() => {
                    return driver.ide().projectName === name;
                }, `could not move to ${name} role`);
            });

            it('should be an empty role', function() {
                // Check for existing blocks
                return driver.expect(() => {
                    return !driver.ide().currentSprite.scripts.children.length;
                }, `did not load empty role "${name}"`);
            });

            it('should update occupancy in room', function() {
                const {room} = driver.ide();
                driver.expect(() => 
                    room.getRoles().every(role => {
                        const count = role.name === initialRoleName ? 0 : 1;
                        return role.users.length === count;
                    }),
                );
            });

            it('should be able to add block', function() {
                const {SnapActions} = driver.globals();
                return driver
                    .expect(
                        () => driver.ide().projectName === name,
                        `did not open empty role "${name}"`
                    )
                    .then(() => driver.expect(
                        () => SnapActions._attemptedLocalActions.length === 0,
                        `Still has pending actions`
                    ))
                    .then(() => {
                        driver.selectCategory('looks');
                        driver.selectTab('scripts');
                        let showBlock = driver.palette().contents.children
                            .find(item => item.selector === 'show');

                        let dropPosition = driver.ide().currentSprite.scripts.center();

                        driver.dragAndDrop(showBlock, dropPosition);
                        const action = SnapActions._attemptedLocalActions[0];
                        return action.promise;
                    });
            });
        });
    });

    describe('rename', function() {
        const newName = 'newRoleName';
        before(() => {
            return driver.reset()
                .then(()=> {
                    driver.selectTab('room');

                    const room = driver.ide().room;
                    const roleName = room.getCurrentRoleName();
                    const role = room.getRole(roleName);

                    // rename the role
                    driver.click(role.label);
                    driver.keys(newName);
                    driver.dialog().ok();
                });
        });

        it('should change role name in room tab', function() {
            return driver.expect(
                () => driver.ide().room.getRole(newName),
                'role did not change names'
            );
        });
    });

    describe('duplicate', function() {
        before(async () => {
            await driver.reset();
            await driver.addBlock('forward');
            await driver.selectTab('Room');

            await driver.expect(() => { // determine if the role ID update is received from the server
                const roleName = driver.ide().projectName;
                const role = driver.ide().room.getRole(roleName);
                return role.id;
            }, 'didnt receive role update');

            // get a handle of the current/only role
            const roleName = driver.ide().projectName;
            const role = driver.ide().room.getRole(roleName);

            // duplicate the role
            driver.click(role);
            const dupBtn = driver.dialog().buttons.children
                .find(btn => btn.action === 'createRoleClone');
            driver.click(dupBtn);
        });

        it('should create a new role', function() {
            return driver.expect(() => {
                const roleNames = driver.ide().room.getRoleNames();
                return roleNames.length === 2;
            }, 'new role did not appear');
        });

        it('should contain the same blocks', function() {
            const roleName = driver.ide().projectName;
            const roleNames = driver.ide().room.getRoleNames();
            const newRoleName = roleNames.find(name => name !== roleName);
            const currentBlockCount = driver.ide().currentSprite.scripts.children.length;

            // Move to the role and check the blocks
            driver.moveToRole(newRoleName);
            return driver.expect(() => {
                return driver.ide().currentSprite.scripts.children.length === currentBlockCount;
            }, 'role does not contain expected blocks');
        });
    });

    describe('remove', function() {
        const newRoleName = 'testRole';

        before(async function() {
            // create a new role
            await driver.newRole(newRoleName);

            // delete the newly created role
            const role = driver.ide().room.getRole(newRoleName);
            driver.click(role);
            const delBtn = driver.dialog().buttons.children
                .find(btn => btn.action === 'deleteRole');
            driver.click(delBtn);
        });

        it('should remove the role', function() {
            return driver.expect(() => {
                const roleNames = driver.ide().room.getRoleNames();
                return !roleNames.includes(newRoleName); // check it does not include the role anymore
            }, 'could not remove new role');
        });
    });

    describe('rename project', function() {
        const newName = 'newProjectName';

        it('should be able to rename the project', function() {
            const room = driver.ide().room;

            driver.selectTab('room');

            driver.click(room.roomName);
            driver.keys(newName);
            driver.dialog().ok();

            return driver.expect(() => {
                return room.name.startsWith(newName);  // may have (2) or (3) appended
            }, 'did not rename project: ' + room.name);
        });
    });

    describe('share msg types', function() {
        const msgType = 'testShareMessage';
        const otherRole = 'recipient';
        before(async () => {
            const {SnapActions} = driver.globals();
            await driver.reset();
            await driver.newRole(otherRole);
            await SnapActions.addMessageType(msgType, ['f1', 'f2']);
        });

        it('should be able to (queue and) send msg type to self', async function() {
            const room = driver.ide().room;

            driver.selectTab('room');

            const [messageType] = driver.ide().spriteEditor.palette.contents.children;
            const role = room.getRole(otherRole);
            driver.dragAndDrop(messageType, role.center());
            await driver.moveToRole(otherRole);
            const shareMsgDialog = await driver.expect(
                () => driver.dialogs().find(dialog => dialog.key?.includes(msgType)),
                'Share message dialog not found.'
            );

            shareMsgDialog.ok();
            await driver.actionsSettled();
            assert(driver.ide().stage.messageTypes.names().includes(msgType));
        });
    });
});
