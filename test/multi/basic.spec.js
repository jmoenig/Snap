/* globals driver, expect */
describe('basic tests', function() {
    it('should have different project names', function() {
        let name = null;
        driver.user1.expect(
            () => {
                name = driver.user1.ide().room.name;
                const name2 = driver.user2.ide().room.name;
                return name !== name2;
            },
            `Projects have the same name: ${name}`,
            {maxWait: 500}
        );
    });

    it('should have different clientIds', function() {
        const id1 = driver.user1.ide().cloud.clientId;
        const id2 = driver.user2.ide().cloud.clientId;
        expect(id1).toNotBe(id2);
    });

    it('should have different projectIds', function() {
        const id1 = driver.user1.ide().cloud.projectId;
        const id2 = driver.user2.ide().cloud.projectId;
        expect(id1).toNotBe(id2);
    });
});
