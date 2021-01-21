/* globals driver, expect, assert */
describe('collaboration', function() {
    this.timeout(7500);

    describe('NO existing edits', function() {
        before(async () => {
            await driver.user1.reset();
            const {SnapCloud} = driver.user2.globals();
            driver.user1.invite(SnapCloud.username);
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
                    const clientId = driver.user1.globals().SnapCloud.clientId;
                    const clientId2 = driver.user2.globals().SnapCloud.clientId;
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

        describe('shared project', function() {
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

                oldProjectId = driver.user2.globals().SnapCloud.projectId;
                oldRoleId = driver.user2.globals().SnapCloud.roleId;
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

            it('should open shared project', function() {
                return driver.user2.expect(
                    () => driver.user2.ide().room.name === projectName,
                    `Project did not change to ${projectName}`
                );
            });

            it('should change project ID', function() {
                let projectId = null;
                return driver.user2.expect(
                    () => {
                        projectId = driver.user2.globals().SnapCloud.projectId;
                        return projectId !== oldProjectId;
                    },
                    `Project ID not updated (${projectId} vs ${oldProjectId})`
                );
            });

            it('should have matching project IDs', function() {
                let projectId, sharedProjectId;
                return driver.user2.expect(
                    () => {
                        projectId = driver.user2.globals().SnapCloud.projectId;
                        sharedProjectId = driver.user1.globals().SnapCloud.projectId;
                        return projectId === sharedProjectId;
                    },
                    `Project IDs do not match (${projectId} vs ${sharedProjectId})`
                );
            });

            it('should update role ID', function() {
                return driver.user2.expect(
                    () => {
                        let roleId = driver.user2.globals().SnapCloud.roleId;
                        return roleId !== oldRoleId;
                    },
                    'Role ID not updated'
                );
            });

            it('should have matching role IDs', function() {
                return driver.user2.expect(
                    () => {
                        let roleId = driver.user2.globals().SnapCloud.roleId;
                        let sharedRoleId = driver.user1.globals().SnapCloud.roleId;
                        return roleId === sharedRoleId;
                    },
                    'Role ID not updated'
                );
            });
        });
    });
});
