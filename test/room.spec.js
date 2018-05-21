/*global driver*/
describe('room', function() {
    this.timeout(10000);
    describe('new', function() {
        const name = 'newRoleName';
        before(done => {
            driver.reset(() => {
                // Select the room tab
                driver.addBlock('forward').then(() => {
                    driver.selectTab('Room');
                    let btn = driver.ide().spriteEditor.addRoleBtn;

                    // Click on the plus icon
                    driver.click(btn);
                    driver.keys(name);
                    let dialog = driver.dialog();
                    dialog.ok();

                    // wait for it to show up
                    let room = driver.ide().room;
                    driver.waitUntil(() => {
                        return room.getRole(name);
                    }, found => {
                        if (found) return done();
                        done(`could not create role "${name}"`);
                    });
                });
            });
        });

        describe('moveToRole', function() {
            before(function() {
                driver.moveToRole(name);
            });

            it('should be able to move to new role', function(done) {
                // wait for the project name to change
                driver.waitUntil(() => {
                    return driver.ide().projectName === name;
                }, found => {
                    if (found) return done();
                    done(`could move to role "${name}"`);
                });
            });

            it('should be an empty role', function(done) {
                // Check for existing blocks
                driver.waitUntil(() => {
                    return !driver.ide().currentSprite.scripts.children.length;
                }, foundNoBlocks => {
                    if (foundNoBlocks) return done();
                    done(`did not load empty role "${name}"`);
                });
            });
        });
    });

    describe('rename', function() {
        const newName = 'newRoleName';
        before(done => {
            driver.reset(() => {
                driver.selectTab('Room');

                const roleName = driver.ide().projectName;
                const role = driver.ide().room.getRole(roleName);

                // rename the role
                driver.click(role.label);
                driver.keys(newName);
                driver.dialog().ok();
                done();
            });
        });

        it('should change role name in room tab', function(done) {
            driver.waitUntil(() => {
                return driver.ide().room.getRole(newName);
            }, passed => {
                if (passed) return done();
                done('role did not change names');
            });
        });
    });

    describe('duplicate', function() {
        before(done => {
            driver.reset(() => {
                driver.addBlock('forward').then(() => {
                    driver.selectTab('Room');

                    const roleName = driver.ide().projectName;
                    const role = driver.ide().room.getRole(roleName);

                    // duplicate the role
                    driver.click(role);
                    const dupBtn = driver.dialog().buttons.children
                        .find(btn => btn.action === 'createRoleClone');
                    driver.click(dupBtn);
                    done();
                });
            });
        });

        it('should create a new role', function(done) {
            driver.waitUntil(() => {
                const roleNames = driver.ide().room.getRoleNames();
                return roleNames.length === 2;
            }, passed => {
                if (passed) return done();
                done('new role did not appear');
            });
        });

        it('should contain the same blocks', function(done) {
            const roleName = driver.ide().projectName;
            const roleNames = driver.ide().room.getRoleNames();
            const newRoleName = roleNames.find(name => name !== roleName);
            const currentBlockCount = driver.ide().currentSprite.scripts.children.length;

            // Move to the role and check the blocks
            driver.moveToRole(newRoleName);
            driver.waitUntil(() => {
                return driver.ide().currentSprite.scripts.children.length === currentBlockCount;
            }, passed => {
                if (passed) return done();
                done('role does not contain expected blocks');
            });
        });
    });

    describe('remove', function() {
        const newRoleName = 'testRole';

        before(function(done) {
            driver.newRole(newRoleName);

            driver.waitUntil(() => {
                return driver.ide().room.getRole(newRoleName);
            }, passed => {
                if (!passed) return done('new role did not show up');

                const role = driver.ide().room.getRole(newRoleName);
                // duplicate the role
                driver.click(role);
                const delBtn = driver.dialog().buttons.children
                    .find(btn => btn.action === 'deleteRole');

                driver.click(delBtn);
                done();
            });
        });

        it('should remove the role', function(done) {
            driver.waitUntil(() => {
                const roleNames = driver.ide().room.getRoleNames();
                return roleNames.includes(newRoleName);
            }, passed => {
                if (passed) return done();
                done('could not remove new role');
            });
        });
    });

    describe('rename project', function() {
        const newName = 'newProjectName';

        it('should be able to rename the project', function(done) {
            const room = driver.ide().room;

            driver.selectTab('room');

            driver.click(room.roomName);
            driver.keys(newName);
            driver.dialog().ok();

            driver.waitUntil(() => {
                return room.name.startsWith(newName);  // may have (2) or (3) appended
            }, passed => {
                if (passed) return done();
                done('did not rename project: ' + room.name);
            });
        });
    });
});
