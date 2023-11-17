/*globals driver, expect, assert */
describe('threads', function() {
  describe("resolveAddresses", function () {
    before(async () => {
      await driver.reset();
      await driver.newRole('r1');
      await driver.newRole('r2');
      await driver.newRole('r3');
    });

    it('should resolve everyone in room', function() {
      const {Process} = driver.globals();
      const addresses = Process.prototype.resolveAddresses(driver.ide(), ['everyone in room']);
      assert.equal(addresses.length, 4);
      const expected = ['r1', 'r2', 'r3', 'myRole'];
      expected.forEach(r => assert(addresses.find(r2 => r2.startsWith(r)), `Missing ${r}`));
    });

    it('should resolve others in room', function() {
      const {Process} = driver.globals();
      const addresses = Process.prototype.resolveAddresses(driver.ide(), ['others in room']);
      assert.equal(addresses.length, 3);
      const expected = ['r1', 'r2', 'r3'];
      expected.forEach(r => assert(addresses.find(r2 => r2.startsWith(r)), `Missing ${r}`));
    });

    it('should resolve relative/local addresses', function() {
      const {Process} = driver.globals();
      const addresses = Process.prototype.resolveAddresses(driver.ide(), ['r1', 'r2', 'r3']);
      assert.equal(addresses.length, 3);
      const expected = ['r1', 'r2', 'r3'].map(r => `${r}@${driver.ide().room.name}@${driver.ide().room.ownerId}`);
      expected.forEach(r => assert(addresses.find(r2 => r2.startsWith(r)), `Missing ${r}`));
    });

    it('should preserve fully qualified addresses (role)', function() {
      const {Process} = driver.globals();
      const address = 'r1@test@brian';
      const addresses = Process.prototype.resolveAddresses(driver.ide(), [address]);
      assert.equal(addresses.length, 1);
      assert.equal(addresses[0], address);
    });

    it('should preserve fully qualified addresses (project)', function() {
      const {Process} = driver.globals();
      const address = 'project@brian';
      const addresses = Process.prototype.resolveAddresses(driver.ide(), [address]);
      assert.equal(addresses.length, 1);
      assert.equal(addresses[0], address);
    });
  });
});
