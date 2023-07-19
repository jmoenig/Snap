/* globals driver, expect, assert */
describe('collaboration', function() {
    this.timeout(7500);

    it('should close prompt if rejected', async () => {
        await driver.user1.reset();
        const {username} = driver.user2.cloud();
        driver.user1.invite(username);
        await driver.user2.expect(
            () => driver.user2.dialogs()
                .find(d => d.key && d.key.includes('invite')),
            `Invited user never received invite`,
            {maxWait: 1000}
        );

        const dialog = driver.user2.dialogs()
            .filter(dialog => dialog.key)
            .find(dialog => dialog.key.includes('invite'));
        const cancelBtn = dialog.buttons.children.find(btn => btn.action === 'cancel');
        driver.user2.click(cancelBtn);

        await driver.user2.expect(
            () => driver.user2.dialogs().length === 0,
            'Dialog did not close. Maybe an error occurred?',
            {maxWait: 1000}
        );
    });

    describe('NO existing edits', function() {
        before(async () => {
            await driver.user1.reset();
            const {username} = driver.user2.cloud();
            driver.user1.invite(username);
            await driver.user2.expect(
                () => driver.user2.dialogs()
                    .find(d => d.key && d.key.includes('invite')),
                `Invited user never received invite`
            );

            const dialog = driver.user2.dialogs()
                .filter(dialog => dialog.key)
                .find(dialog => dialog.key.includes('invite'));
            dialog.ok();
        });

        it('should open project on second user', async () => {
            await driver.user1.expect(
                () => driver.user1.ide().room.name === driver.user2.ide().room.name,
                'Project names do not match'
            );
        });

        it('should be able to add blocks as 2nd user', async () => {
            await driver.user2.addBlock('doIf');
            await driver.user1.expect(
                () => driver.user1.ide().currentSprite.scripts.children.length,
                'Block did not appear on original screen'
            );
        });
    });

    describe('existing edits', function() {
        const projectName = `collab-${Date.now()}`;
        before(async function() {
            await driver.user1.reset();
            await driver.user1.addBlock('doIf');
            await driver.user1.saveProjectAs(projectName);
        });

        describe('same user', function() {
            describe('no *unsaved* edits', function() {
                let blockId = null;
                before(async function() {
                    await driver.user2.sleep(250);  // FIXME: this is lazy...
                    await driver.user2.openProject(projectName, false);
                    const block = await driver.user1.addBlock('show');
                    expect(block).toBeTruthy();
                    blockId = block.id;
                });

                it('should add (show) block across clients', function() {
                    return driver.user2.expect(
                        () => {
                            const sprite = driver.user2.ide().currentSprite;
                            const blocks = sprite.scripts.children;
                            return blocks.map(block => block.id).includes(blockId);
                        },
                        `Block ${blockId} did not appear for user2`
                    );
                });

                it('should use other clientId in last action', function() {
                    const clientId = driver.user1.cloud().clientId;
                    const clientId2 = driver.user2.cloud().clientId;
                    const action = driver.user2.globals().SnapUndo.allEvents.slice().pop();
                    expect(action.user).toNotBe(clientId2);
                    expect(action.user).toBe(clientId);
                });
            });

            describe('unsaved edits', function() {
                it('should make edits while collaborator opens project', async () => {
                    await driver.user2.sleep(250);  // FIXME: this is lazy...
                    await driver.user1.addBlock('turn');
                    const addForward = driver.user1.addBlock('forward');
                    const openProject = driver.user2.openProject(projectName, false);
                    await addForward.then(() => driver.user1.addBlock('show'));
                    await openProject;
                    await driver.user1.expect(() =>
                        driver.user1.globals().SnapActions.lastSeen === driver.user2.globals().SnapActions.lastSeen
                    );
                    assert.equal(
                        Object.keys(driver.user1.globals().SnapActions).length,
                        Object.keys(driver.user2.globals().SnapActions).length,
                    );
                });
            });
        });

        // FIXME: This has been disabled since cookies and auth is stricter now and doesn't
        // support different users in different iframes (cookie is shared)
        describe.skip('shared project', function() {
            const user2 = 'test2';
            let oldProjectId;
            let oldRoleId;
            before(async () => {
                await driver.user2.login(user2);
                driver.user1.inviteCollaborator(user2);
                await driver.user2.expect(
                    () => {
                        const isCollabKey = key => key.includes('Collaboration Invitation');
                        return driver.user2.isShowingDialogKey(isCollabKey);
                    },
                    `Prospective collaborator never received invite`
                );

                oldProjectId = driver.user2.cloud().projectId;
                oldRoleId = driver.user2.cloud().roleId;
                const dialog = driver.user2.dialogs()
                    .filter(dialog => dialog.key)
                    .find(dialog => dialog.key.includes('invit'));
                dialog.ok();

                await driver.user2.expect(
                    () => driver.user2.isShowingDialogKey(key => key.includes('decideOpen')),
                    `Did not prompt user to open shared project`
                );
                const openDialog = driver.user2.dialog();
                openDialog.ok();
            });

            after(() => driver.user2.login('test'));

            it.skip('should be able to invite collaborator to project', function() {
                return driver.user1.inviteCollaborator(user2)
                    .then(() => driver.user2.expect(
                        () => {
                            const dialog = driver.user2.dialog();
                            const key = dialog && dialog.key;
                            return key && key.includes('invit');
                        },
                        `Prospective collaborator never received invite`
                    ));
            });

            it('should open shared project', async function() {
                await driver.user2.expect(
                    () => driver.user2.ide().room.name === projectName,
                    `Project did not change to ${projectName}`
                );
            });

            it('should change project ID', function() {
                let projectId = null;
                return driver.user2.expect(
                    () => {
                        projectId = driver.user2.cloud().projectId;
                        return projectId !== oldProjectId;
                    },
                    `Project ID not updated (${projectId} vs ${oldProjectId})`
                );
            });

            it('should have matching project IDs', function() {
                let projectId, sharedProjectId;
                return driver.user2.expect(
                    () => {
                        projectId = driver.user2.cloud().projectId;
                        sharedProjectId = driver.user1.cloud().projectId;
                        return projectId === sharedProjectId;
                    },
                    `Project IDs do not match (${projectId} vs ${sharedProjectId})`
                );
            });

            it('should update role ID', function() {
                return driver.user2.expect(
                    () => {
                        let roleId = driver.user2.cloud().roleId;
                        return roleId !== oldRoleId;
                    },
                    'Role ID not updated'
                );
            });

            it('should have matching role IDs', function() {
                return driver.user2.expect(
                    () => {
                        let roleId = driver.user2.cloud().roleId;
                        let sharedRoleId = driver.user1.cloud().roleId;
                        return roleId === sharedRoleId;
                    },
                    'Role ID not updated'
                );
            });
        });
    });

    describe('message sending', function() {
        let block;
        before(async () => {
            await driver.user1.reset();
            const {username} = driver.user2.cloud();
            driver.user1.invite(username);
            console.log('inviting', username, 'from', driver.user1.cloud().username);
            await driver.user2.expect(
                // () => driver.user2.dialogs()
                //     .find(d => d.key && d.key.includes('invite')),
                () => {
                    console.log('user2 dialogs:', driver.user2.dialogs());
                    return driver.user2.dialogs()
                        .find(d => d.key && d.key.includes('invite'));
                },
                `Invited user never received invite`
            );

            const dialog = driver.user2.dialogs()
                .filter(dialog => dialog.key)
                .find(dialog => dialog.key.includes('invite'));
            dialog.ok();

            // add message sending block
            block = await driver.user1.addBlock('doSocketMessage');
            driver.user1.click(block.inputs()[0]);
            const msgDialog = await driver.user1.expect(
                () => driver.user1.dialog(),
                'Message type dropdown did not appear'
            );
            driver.user1.click(msgDialog.children[2]);
            await driver.user1.actionsSettled();

            await driver.user1.expect(() => driver.user1.globals().SnapActions.isCollaborating());
        });

        afterEach(() => driver.user1.dialogs().forEach(d => d.destroy()));

        it('should not allow message sending', async function() {
            const {threads} = driver.user1.ide().stage;
            let called = false;
            const sendMessage = driver.user1.ide().sockets.sendMessage;
            driver.user1.ide().sockets.sendMessage = function(msg) {
                if (msg.type === 'message') {
                    called = true;
                } else {
                    return sendMessage.call(this, msg);
                }
            };
            driver.user1.click(block);

            await driver.user1.expect(
                () => threads.processes.length === 0,
                'Message sending process did not finish!'
            );
            delete driver.user1.ide().sockets.sendMessage;

            assert(!called, 'Message sent but should have been blocked!');
        });

        it('should prompt user about enabling msg sending', async function() {
            const {threads} = driver.user1.ide().stage;
            driver.user1.click(block);

            await driver.user1.expect(
                () => threads.processes.length === 0,
                'Message sending process did not finish!'
            );

            const dialog = driver.user1.dialogs()
                .find(dialog => dialog.labelString.includes('Message sending blocked'));
            assert(dialog, 'No message sending dialog shown');
        });

        it('should not prompt user about enabling msg sending if explicitly set', async function() {
            const {threads} = driver.user1.ide().stage;
            driver.user1.ide().allowMsgsWhileCollaborating = false;
            driver.user1.click(block);

            await driver.user1.expect(
                () => threads.processes.length === 0,
                'Message sending process did not finish!'
            );

            const dialog = driver.user1.dialogs()
                .find(dialog => (dialog.labelString || '').includes('Message sending blocked'));
            assert(!dialog, 'Message sending dialog shown');
        });

        it('should allow message sending if enabled', async function() {
            const {threads} = driver.user1.ide().stage;
            driver.user1.ide().allowMsgsWhileCollaborating = true;
            let called = false;
            driver.user1.ide().sockets.sendMessage = () => called = true;
            driver.user1.click(block);

            await driver.user1.expect(
                () => threads.processes.length === 0,
                'Message sending process did not finish!'
            );
            delete driver.user1.ide().sockets.sendMessage;

            assert(called, 'Message not sent despite sending being enabled!');
        });
    });
});
