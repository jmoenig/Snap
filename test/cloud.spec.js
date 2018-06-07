/*globals expect, SnapCloud, driver */
describe('cloud', function() {
    it('should set clientId immediately', function() {
        expect(SnapCloud.clientId).toBeTruthy();
    });

    it('should use clientId for socket uuid', function() {
        const ws = driver.ide().sockets;
        expect(ws.uuid).toBe(SnapCloud.clientId);
    });
});
