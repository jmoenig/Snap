/*globals driver, assert*/
describe('room', function() {
    describe('evict', function() {
        const roleName = 'otherRole';
        let otherRole;

        before(async function() {
            this.timeout(4000);
            const {username} = driver.user2.ide().cloud;
            await driver.user1.reset();
            await driver.user1.newRole(roleName);
            await driver.user1.invite(username, roleName);
            const dialog = await driver.user2.expect(
                () => driver.user2.dialogs()
                    .filter(dialog => dialog.key)
                    .find(dialog => dialog.key.includes('invite')),
                'Invite not received!'
            );
            dialog.ok();
            const {room} = driver.user1.ide();
            otherRole = room.getRole(roleName);
            await driver.user1.expect(
                () => otherRole.users.length,
                'User did not join role'
            );
        });

        it('should be able to evict self', async function() {
            this.timeout(3000);
            const {room} = driver.user1.ide();
            const [user] = otherRole.users;
            room.evictUser(user);
            await driver.user1.sleep(2000);
            assert(
                otherRole.users.length === 0,
                'Evicted user still occupies role (or rejoined!)'
            );
        });
    });
});
