/*globals driver, assert*/

describe('websockets', function() {
    describe('MessageHandlerQueue', function() {
        describe('isHandlerIdle', function() {
            let queue;

            before(async () => {
                await driver.reset();
                const block = await driver.addBlock('receiveSocketMessage');
                const [msgTypeInput] = block.inputs();
                driver.click(msgTypeInput);
                const msgTypeDialog = await driver.expect(() => driver.dialog());
                driver.click(msgTypeDialog.children.find(child => child.action === 'message'));
                await driver.actionsSettled();

                const {MessageHandlerQueue} = driver.globals().WebSocketManager;
                queue = new MessageHandlerQueue(driver.ide().stage, block, driver.ide().currentSprite);
            });

            it('should detect idle', function() {
                assert.equal(queue.isHandlerIdle(), true);
            });

            it('should detect busy', function() {
                const {VariableFrame} = driver.globals();
                const variables = new VariableFrame();
                const msg = 'Hello world';
                const messageType = 'message';
                variables.addVar('__message__', {msg});
                queue.addMessage({messageType, variables});
                queue.tryHandleNextMessage();

                assert.equal(queue.isHandlerIdle(), false);
            });

        });
    });
});
