/* globals driver, expect */
describe('basic tests', function() {
    it('should have different project names', function() {
        const name1 = driver.user1.ide().room.name;
        const name2 = driver.user2.ide().room.name;
        expect(name1).toNotBe(name2);
    });

    it('should have different clientIds', function() {
        const id1 = driver.user1.globals().SnapCloud.clientId;
        const id2 = driver.user2.globals().SnapCloud.clientId;
        expect(id1).toNotBe(id2);
    });

    it('should have different projectIds', function() {
        const id1 = driver.user1.globals().SnapCloud.projectId;
        const id2 = driver.user2.globals().SnapCloud.projectId;
        expect(id1).toNotBe(id2);
    });
});
