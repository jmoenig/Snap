/* globals expect, driver, SnapActions, MessageCreatorMorph, PushButtonMorph */
describe('messages', function() {

    describe('message type', function() {
        beforeEach(function(done) {
            driver.reset(() => {
                driver.selectCategory('network');
                done();
            });
        });

        it('should be able to open the msg type dialog', function() {
            var world = driver.world();
            var palette = driver.palette();
            var isMakeMsgTypeBtn = item => item instanceof PushButtonMorph &&
                item.labelString === 'Make a message type';
            var btn = palette.contents.children.find(isMakeMsgTypeBtn);

            btn.mouseClickLeft();
            var dialog = world.children[world.children.length-1];
            expect(dialog instanceof MessageCreatorMorph).toBe(true);
        });

        it('should show delete msg type btn after create msg type', function(done) {
            var action = SnapActions.addMessageType('test', ['field1', 'field2']);

            action.then(() => {
                var palette = driver.palette();
                var isDelMsgTypeBtn = item => item instanceof PushButtonMorph &&
                    item.labelString === 'Delete a message type';
                var btn = palette.contents.children.find(isDelMsgTypeBtn);

                expect(!!btn).toBe(true);
                done();
            })
            .catch(err => done(err));
        });
    });
});
