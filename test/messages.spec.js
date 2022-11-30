/* globals expect, driver, */
describe('messages', function() {
    let SnapActions, MessageCreatorMorph, PushButtonMorph;
    before(() => {
        SnapActions = driver.globals().SnapActions;
        MessageCreatorMorph = driver.globals().MessageCreatorMorph;
        PushButtonMorph = driver.globals().PushButtonMorph;
    });

    function sendMessage(opts={}) {
        const ide = driver.ide();
        const srcId = [ide.projectName, ide.room.name, ide.room.ownerId].join('@');
        const targetAddresses = [srcId];
        const msg = {
            type: 'message',
            dstId: targetAddresses,
            srcId: srcId,
            msgType: opts.name || 'message',
            content: opts.contents || {msg: 'blah'},
        };
        ide.sockets.sendMessage(msg);
    }

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
            const {sockets} = driver.globals().world.children[0];

            // set the msg type to message
            const msgField = hatBlock.inputs()[0];
            await SnapActions.setField(msgField, 'message');

            // create and set the dowait block
            const doWait = await driver.addBlock('doWait');
            await SnapActions.setField(doWait.inputs()[0], '10');

            // attach doWait to hatblock
            let Point = driver.globals().Point;
            let dropPosition = hatBlock.bottomAttachPoint()
                .add(new Point(doWait.width()/2, doWait.height()/2))
                .subtract(doWait.topAttachPoint().subtract(doWait.topLeft()))
                .subtract(new Point(0, 3));
            driver.dragAndDrop(doWait, dropPosition); // attach
            await driver.sleep(MIN_DELAY);

            // send 10 messages
            for (let i=0; i<10; i++) {
                sendMessage();
            }

            const queue = await driver.expect(
                () => sockets.getMessageQueue(hatBlock),
                `message queue didn't show up`,
                {maxWait: 4000}
            );

            hatBlock.updateReadout();
            expect(queue.contents.length).toBeLessThan(11);
            expect(hatBlock.msgCount).toBeLessThan(11);
            expect(hatBlock.msgCount).toBeMoreThan(8);
        });
    });
});
