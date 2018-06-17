/*globals expect, driver */
describe('cloud', function() {
    let SnapCloud;
    before(() => SnapCloud = driver.globals().SnapCloud);

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

    describe('isProjectActive', function () {
        let clientId;

        before(() => {
            clientId = SnapCloud.clientId;
            return driver.reset();
        });
        after(() => SnapCloud.clientId = clientId);

        it('should return not active if I am only occupant', function(done) {
            SnapCloud.isProjectActive(
                SnapCloud.projectId,
                isActive => {
                    if (isActive) {
                        done('Reported room as active');
                    } else {
                        done();
                    }
                },
                done
            );
        });

        it('should return active if there are other occupants', function(done) {
            SnapCloud.clientId = '_someNewId';
            SnapCloud.isProjectActive(
                SnapCloud.projectId,
                isActive => {
                    if (isActive) {
                        done();
                    } else {
                        done('Reported room as inactive');
                    }
                },
                done
            );
        });
    });
});
