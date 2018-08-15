/* globals driver, expect */
describe('collaboration', function() {
    this.timeout(10000);

    const projectName = `collab-${Date.now()}`;
    before(function() {
        return driver.user1.reset()
            .then(() => driver.user1.addBlock('doIf'))
            .then(() => driver.user1.saveProjectAs(projectName));
    });

    describe('same user', function() {
        let blockId = null;
        before(function() {
            return driver.user2.openProject(projectName, false)
                .then(() => driver.user2.waitForDialogBox())
                .then(() => {
                    const dialog = driver.user2.dialog();
                    const joinBtn = dialog.buttons.children[0];
                    driver.user2.click(joinBtn);
                    return driver.user1.addBlock('show');
                })
                .then(block => {
                    expect(block).toBeTruthy();
                    blockId = block.id;
                });
        });

        it('should add block across clients', function() {
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

    describe('shared project', function() {
        const user2 = 'test2';
        let oldProjectId;
        let oldRoleId;
        before(() => {
            return driver.user2.login(user2)
                .then(() => driver.user1.inviteCollaborator(user2))
                .then(() => driver.user2.expect(
                    () => {
                        const dialog = driver.user2.dialog();
                        const key = dialog && dialog.key;
                        return key && key.includes('decideCollab');
                    },
                    `Prospective collaborator never received invite`
                ))
                .then(() => {  // accept the invite and open the project
                    oldProjectId = driver.user2.globals().SnapCloud.projectId;
                    oldRoleId = driver.user2.globals().SnapCloud.roleId;
                    const dialog = driver.user2.dialogs()
                        .find(dialog => dialog.key.includes('decideCollab'));
                    dialog.ok();
                    return driver.user2.expect(
                        () => driver.user2.isShowingDialogKey(key => key.includes('decideOpen')),
                        `Did not prompt user to open shared project`
                    );
                })
                .then(() => {
                    const openDialog = driver.user2.dialog();
                    openDialog.ok();
                });
        });

        after(() => driver.user2.login('test'));

        it.skip('should be able to invite collaborator to project', function() {
            return driver.user1.inviteCollaborator(user2)
                .then(() => driver.user2.expect(
                    () => {
                        const dialog = driver.user2.dialog();
                        const key = dialog && dialog.key;
                        return key && key.includes('decideCollab');
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
