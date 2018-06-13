/*globals expect, SnapCloud, driver */
describe('cloud', function() {
    it('should set clientId immediately', function() {
        expect(SnapCloud.clientId).toBeTruthy();
    });

    it('should use clientId for socket uuid', function() {
        const ws = driver.ide().sockets;
        expect(ws.uuid).toBe(SnapCloud.clientId);
    });

    describe('newProject', function () {
        before(() => SnapCloud.request = () => Promise.reject());
        after(() => delete SnapCloud.request);

        it('should set projectId on fail', function() {
            const oldProjectId = SnapCloud.projectId;
            return SnapCloud.newProject('myRole')
                .then(() => {throw new Error('request did not fail');})
                .catch(() => {
                    if (oldProjectId === SnapCloud.projectId) {
                        throw new Error('Did not update id');
                    }
                });
        });
    });
});
