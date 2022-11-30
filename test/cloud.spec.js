/*globals expect, driver */
describe('cloud', function() {
    this.timeout(5000);

    let cloud;
    before(() => cloud = driver.ide().cloud);

    it('should set clientId immediately', function() {
        expect(cloud.clientId).toBeTruthy();
    });

    it('should use clientId for socket uuid', function() {
        const ws = driver.ide().sockets;
        expect(ws.uuid).toBe(cloud.clientId);
    });

    describe('newProject', function () {
        before(() => cloud.request = () => Promise.reject());
        after(() => delete cloud.request);

        it('should set projectId on fail', function() {
            const oldProjectId = cloud.projectId;
            return cloud.newProject('myRole')
                .then(() => {throw new Error('request did not fail');})
                .catch(() => {
                    if (oldProjectId === cloud.projectId) {
                        throw new Error('Did not update id');
                    }
                });
        });

        it('should set roleId on fail', function() {
            const oldId = cloud.roleId;
            return cloud.newProject('myRole')
                .then(() => {throw new Error('request did not fail');})
                .catch(() => {
                    if (oldId === cloud.roleId) {
                        throw new Error(`Did not update id (${cloud.roleId} vs ${oldId})`);
                    }
                });
        });
    });
});
