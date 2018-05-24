/*global driver*/
describe('room', function() {
    this.timeout(10000);
    describe('new', function() {
        const name = 'newRoleName';
        before(() => {
            return driver.reset()
                .then(() => driver.addBlock('forward'))
                .then(() => {
                    driver.selectTab('Room');
                    let btn = driver.ide().spriteEditor.addRoleBtn;

                    // Click on the plus icon
                    driver.click(btn);
                    driver.keys(name);
                    let dialog = driver.dialog();
                    dialog.ok();

                    // wait for it to show up
                    let room = driver.ide().room;
                    return driver.waitUntil(() => room.getRole(name));
                });
        });

        describe('moveToRole', function() {
            before(function() {
                driver.moveToRole(name);
            });

            it('should be able to move to new role', function() {
                // wait for the project name to change
                return driver.expect(() => {
                    return driver.ide().projectName === name;
                }, `could not move to ${name} role`);
            });

            it('should be an empty role', function() {
                // Check for existing blocks
                return driver.expect(() => {
                    return !driver.ide().currentSprite.scripts.children.length;
                }, `did not load empty role "${name}"`);
            });
        });
    });

    describe('rename', function() {
        const newName = 'newRoleName';
        before(() => {
            return driver.reset()
                .then(()=> {
                    driver.selectTab('Room');

                    const roleName = driver.ide().projectName;
                    const role = driver.ide().room.getRole(roleName);

                    // rename the role
                    driver.click(role.label);
                    driver.keys(newName);
                    driver.dialog().ok();
                });
        });

        it('should change role name in room tab', function() {
            return driver.expect(() => {
                return driver.ide().room.getRole(newName);
            }, 'role did not change names');
        });
    });

    describe('duplicate', function() {
        before(() => {
            return driver.reset()
                .then(() => driver.addBlock('forward'))
                .then(() => {
                    driver.selectTab('Room');

                    const roleName = driver.ide().projectName;
                    const role = driver.ide().room.getRole(roleName);

                    // duplicate the role
                    driver.click(role);
                    const dupBtn = driver.dialog().buttons.children
                        .find(btn => btn.action === 'createRoleClone');
                    driver.click(dupBtn);
                });
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

        before(function() {
            driver.newRole(newRoleName);

            return driver.waitUntil(() => driver.ide().room.getRole(newRoleName))
                .catch(() => {
                    throw new Error('new role did not show up');
                })
                .then(() => {
                    const role = driver.ide().room.getRole(newRoleName);
                    // duplicate the role
                    driver.click(role);
                    const delBtn = driver.dialog().buttons.children
                        .find(btn => btn.action === 'deleteRole');

                    driver.click(delBtn);
                });
        });

        it('should remove the role', function() {
            return driver.expect(() => {
                const roleNames = driver.ide().room.getRoleNames();
                return roleNames.includes(newRoleName);
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
});
