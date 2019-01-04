/* globals expect, driver, */
describe('messages', function() {
    let SnapActions, MessageCreatorMorph, PushButtonMorph;
    before(() => {
        SnapActions = driver.globals().SnapActions;
        MessageCreatorMorph = driver.globals().MessageCreatorMorph;
        PushButtonMorph = driver.globals().PushButtonMorph;
    });

    describe('message type', function() {
        beforeEach(function() {
            return driver.reset()
                .then(() => driver.selectCategory('network'));
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

        it('should show delete msg type btn after create msg type', function() {
            var action = SnapActions.addMessageType('test', ['field1', 'field2']);

            return action.then(() => {
                var palette = driver.palette();
                var isDelMsgTypeBtn = item => item instanceof PushButtonMorph &&
                    item.labelString === 'Delete a message type';
                var btn = palette.contents.children.find(isDelMsgTypeBtn);

                expect(!!btn).toBe(true);
            });
        });

        it('should show queue message count', async function() {
            const MIN_DELAY = 50;
            driver.selectTab('scripts');
            const hatBlock = await driver.addBlock('receiveSocketMessage');
            const msgField = hatBlock.inputs()[0];
            // set the msg type to message
            await SnapActions.setField(msgField, 'message');
            const doWait = await driver.addBlock('doWait');
            await SnapActions.setField(doWait.inputs()[0], '0.5');
            // attach doWait to hatblock
            let Point = driver.globals().Point;
            let dropPosition = hatBlock.bottomAttachPoint()
                .add(new Point(doWait.width()/2, doWait.height()/2))
                .subtract(doWait.topAttachPoint().subtract(doWait.topLeft()))
                .subtract(new Point(0, 3));
            driver.dragAndDrop(doWait, dropPosition); // attach
            await driver.sleep(MIN_DELAY);
            driver.dragAndDrop(hatBlock, dropPosition.add(new Point(200, 200))); // move away
            await driver.sleep(MIN_DELAY);

            // create the message sender
            const doSocketBlock = await driver.addBlock('doSocketMessage');
            // setup the fields
            await SnapActions.setField(doSocketBlock.inputs()[0], 'message');
            await SnapActions.setField(doSocketBlock.inputs()[1], 'some message');
            await SnapActions.setField(doSocketBlock.inputs()[2], 'everyone in room');

            // send 10 messages
            for (let i=0; i<10; i++) {
                driver.click(doSocketBlock);
                await driver.sleep(MIN_DELAY);
            }

            hatBlock.updateReadout();
            console.assert(hatBlock._msgQueue().length > 0);
            console.assert(hatBlock.msgCount < 10);
        });
    });
});
