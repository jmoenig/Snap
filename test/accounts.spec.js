/* globals hex_sha512, nop, SnapCloud, expect */
describe.skip('accounts', function() {
    beforeEach(function(done) {
        // I should make a test user that we can count on existing...
        SnapCloud.login(
            'brian',
            hex_sha512('some-test-password'),
            false,
            () => done(),
            nop
        );
    });

    it('should own project after logout', function(done) {
        SnapCloud.logout(function() {
            // Check the menu
            //var menu = driver.ide().projectMenu();
            expect(SnapCloud.username).to.be(null);
            done();
        }, nop);
    });
});
