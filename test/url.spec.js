/* globals driver */
describe('url anchors', function () {
    this.timeout(10000);
    // opening examples
    describe('examples', function() {
        let oldRoleId = null;
        before(() => {
            const loc = {
                search: '?action=example&ProjectName=Dice&editMode=true',
                hash: ''
            };
            return driver.reset()
                .then(() => {
                    oldRoleId = driver.ide().cloud.roleId;
                    return driver.ide().interpretUrlAnchors(loc);
                });
        });

        it('should load example code', function () {
            return driver.expect(
                () => {
                    const blockCount = driver.ide().currentSprite.scripts.children.length;
                    return blockCount > 0;
                },
                'No blocks showed up for example'
            );
        });

        it('should set role ID', function () {
            const SnapCloud = driver.ide().cloud.roleId;
            return driver.expect(() => SnapCloud.roleId !== oldRoleId, `Role ID not updated`);
        });

        it('should load two roles (p1, p2)', function () {
            return driver.expect(
                () => {
                    return driver.ide().room.getRoleCount() === 2;
                },
                `Found ${driver.ide().room.getRoleCount()} role(s) (expected 2)`
            );
        });

        it('should load code for the other role', function () {
            const room = driver.ide().room;
            const roleNames = room.getRoleNames();
            const roleName = room.getCurrentRoleName();
            const name = roleNames.find(name => name !== roleName);

            driver.moveToRole(name);
            return driver.expect(
                () => room.getCurrentRoleName() === name,
                `Did not load role ${name}`
            )
                .then(() => driver.selectTab('scripts'))
                .then(() => {
                    return driver.expect(
                        () => {
                            const blockCount = driver.ide().currentSprite.scripts.children.length;
                            return blockCount > 0;
                        },
                        `No blocks showed up for ${name}`
                    );
                });
        });
    });
});
