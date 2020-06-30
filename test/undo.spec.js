/* globals driver, expect, assert */
describe('undo', function() {
    let SnapUndo, SnapActions, Point;
    before(() => {
        SnapUndo = driver.globals().SnapUndo;
        Point = driver.globals().Point;
        SnapActions = driver.globals().SnapActions;
    });

    beforeEach(() => driver.reset());

    describe('reset position', function() {
        let block, initialPosition;

        beforeEach(async () => {
            block = await driver.addBlock('forward');
            initialPosition = block.position().copy();
        });

        it('should restore pos after moveBlock (top)', async function() {
            const bottomBlock = await driver.addBlock('doSayFor', new Point(300, 300));
            const [target] = bottomBlock.attachTargets();
            await SnapActions.moveBlock(block, target);
            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();
            await SnapUndo.undo(undoId);
            await driver.expect(
                () => initialPosition.eq(block.position()),
                `Block not restored to ${initialPosition} (${block.position()})`
            );
        });

        it('should restore pos after moveBlock (block)', async function() {
            const bottomBlock = await driver.addBlock('doSayFor', new Point(300, 300));
            const [, , target] = bottomBlock.attachTargets();
            await SnapActions.moveBlock(block, target);
            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();
            await SnapUndo.undo(undoId);
            await driver.expect(
                () => initialPosition.eq(block.position()),
                `Block not restored to ${initialPosition} (${block.position()})`
            );
        });

        it('should restore pos after setBlockPosition', async function() {
            await driver.dragAndDrop(block, new Point(300, 300));
            await driver.actionsSettled();
            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();

            await SnapUndo.undo(undoId);
            await driver.waitUntil(() => SnapUndo.undoCount[undoId] === 1);
            const msg = `Block not restored to ${initialPosition} (${block.position()})`;
            expect(initialPosition.eq(block.position())).toBe(true, msg);
        });

        it('should restore pos after moveBlock, setBlockPosition', async function() {
            const bottomBlock = await driver.addBlock('doSayFor', new Point(300, 300));
            const [target] = bottomBlock.attachTargets();
            await SnapActions.moveBlock(block, target);
        });

        it('should restore pos after connecting to another block', async function() {
            const bottomBlock = await driver.addBlock('doSayFor', new Point(300, 300));
            const [topTarget] = bottomBlock.attachTargets();
            await SnapActions.moveBlock(block, topTarget);
            await SnapActions.setBlockPosition(block, new Point(400, 400));
            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();
            await SnapUndo.undo(undoId);
            await driver.expect(
                () => initialPosition.eq(block.position()),
                `Block not restored to ${initialPosition} (${block.position()})`
            );
        });
    });

    describe('replace inputs', function() {
        let command, firstInput;

        beforeEach(async () => {
            command = await driver.addBlock('forward');
            firstInput = await driver.addBlock('xPosition', new Point(600, 600));
            const [inputSlot] = command.inputs();
            await driver.dragAndDrop(firstInput, inputSlot.position());
            await driver.actionsSettled();
        });

        it('should revert (existing) input on undo (position)', async function() {
            const input = await driver.addBlock('yPosition', new Point(500, 500));
            const startPos = input.position();
            const [inputSlot] = command.inputs();
            await driver.dragAndDrop(input, inputSlot.position());
            await driver.actionsSettled();
            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();
            await SnapUndo.undo(undoId);
            await driver.waitUntil(() => SnapUndo.undoCount[undoId] === 1);
            let msg = `Input should be reverted to x position block`;
            expect(command.inputs()[0]).toBe(firstInput, msg);
            msg = `Expected block to be moved back to ${startPos} (not ${input.position()})`;
            expect(startPos.eq(input.position())).toBe(true, msg);
        });

        it('should revert (existing) input on undo (attached)', async function() {
            const input = await driver.addBlock('yPosition', new Point(500, 500));
            const oldCommand = await driver.addBlock('turn', new Point(600, 500));
            await driver.dragAndDrop(input, oldCommand.inputs()[0].position());
            await driver.actionsSettled();

            const [inputSlot] = command.inputs();
            await driver.dragAndDrop(input, inputSlot.position());
            await driver.actionsSettled();

            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();
            await SnapUndo.undo(undoId);
            await driver.actionsSettled();

            let msg = `Input should be reverted to x position block`;
            expect(command.inputs()[0]).toBe(firstInput, msg);

            msg = `Expected block to be moved back to turn block`;
            assert.equal(input.parent, oldCommand);
        });

        it('should revert (new) input on undo', async function() {
            driver.selectCategory('motion');
            const input = driver.palette().contents.children
                .find(block => block.selector === 'yPosition');

            const [inputSlot] = command.inputs();
            await driver.dragAndDrop(input, inputSlot.position());
            await driver.actionsSettled();
            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();
            await SnapUndo.undo(undoId);
            await driver.waitUntil(() => SnapUndo.undoCount[undoId] === 1);
            let msg = `Input should be reverted to x position block`;
            expect(command.inputs()[0]).toBe(firstInput, msg);

            msg = 'Block not removed on undo';
            expect(SnapActions._blocks[input.id]).toBe(undefined, msg);
        });
    });

    describe('replace cslot input', function() {
        const customBlockDef = `<blocks>
            <block-definition collabId="item_0" s="test cslot %&apos;cs&apos;" type="command" category="other">
                <header></header><code></code><inputs><input type="%cs"></input></inputs>
            </block-definition>
            </blocks>`;

        beforeEach(async () => {
            await driver.reset();
            await driver.ide().droppedText(customBlockDef);
            driver.selectCategory('custom');
            const [/*makeBlockBtn*/, block] = driver.palette().contents.children;
            const scriptsCenter = driver.ide().currentSprite.scripts.center();
            await driver.dragAndDrop(block, scriptsCenter);
            await driver.actionsSettled();
        });

        it('should revert (new) input to cslot on undo', async function() {
            const [block] = Object.values(SnapActions._blocks);
            driver.selectCategory('motion');
            const turn = await driver.addBlock('turn', new Point(300, 300));
            const cslotPos = block.center().add(new Point(block.width()/2, 0));

            await driver.dragAndDrop(turn, cslotPos);
            await driver.actionsSettled();

            driver.selectCategory('motion');
            const input = driver.palette().contents.children
                .find(block => block.selector === 'yPosition');
            await driver.dragAndDrop(
                input,
                cslotPos.add(new Point(-block.width(), 0))
            );
            await driver.actionsSettled();
            assert.equal(block.inputs()[0].selector, 'yPosition');
            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();
            await SnapUndo.undo(undoId);
            await driver.actionsSettled();
            const nestedBlock = block.inputs()[0].nestedBlock();
            assert(nestedBlock, 'Turn block not returned to cslot');
            assert.equal(nestedBlock.selector, 'turn');
        });
    });

    describe('call RPC blocks', function() {
        let block;
        beforeEach(async () => {
            this.timeout(15000);
            block = await driver.addBlock('getJSFromRPCStruct');
            await selectServiceAndRPC(block, 'CloudVariables', 'setVariable');
        });

        it('should clear RPC field on service field change', async function() {
            await selectService(block, 'PublicRoles');
            const [rpcName] = block.inputs()[1].evaluate();
            assert.notEqual(rpcName, 'setVariable');
        });

        it('should reset RPC field on undo service field change', async function() {
            await selectService(block, 'PublicRoles');
            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();
            await driver.actionsSettled();
            await SnapUndo.undo(undoId);

            const service = block.inputs()[0].evaluate();
            assert.equal(service, 'CloudVariables');
            const [rpcName] = block.inputs()[1].evaluate();
            assert.equal(rpcName, 'setVariable');
        });

        it('should restore inputs on undo RPC field change', async function() {
            await driver.expect(
                () => block.inputs().length > 2,
                'RPC method signature not loaded'
            );

            driver.click(block.inputs()[2]);
            driver.keys('2');
            await driver.actionsSettled();
            await selectRPC(block, 'lockVariable');
            const undoId = driver.ide().currentSprite.scripts.undoOwnerId();
            await driver.actionsSettled();
            await SnapUndo.undo(undoId);

            const service = block.inputs()[0].evaluate();
            assert.equal(service, 'CloudVariables');
            const [rpcName] = block.inputs()[1].evaluate();
            const argValue = block.inputs()[2].evaluate();
            assert.equal(rpcName, 'setVariable');
            assert.equal(argValue, 'name2');
        });

        async function selectServiceAndRPC(block, service, rpc) {
            await selectService(block, service);
            await driver.expect(
                async () => {
                    driver.click(block.inputs()[1]);
                    const dialog = await driver.expect(
                        () => driver.dialog(),
                        'RPC menu did not show up'
                    );

                    const rpcs = dialog.children
                        .map(child => child.label && child.label.text);
                    dialog.destroy();
                    return rpcs.includes(rpc);
                },
                `Did not find RPC ${rpc}`
            );
            await selectRPC(block, rpc);
        }

        async function selectService(block, service) {
            driver.click(block.inputs()[0]);
            const dialog = await driver.expect(
                () => driver.dialog(),
                'Did not find services menu'
            );
            const serviceItem = dialog.children
                .find(child => child.label && child.label.text === service);
            driver.click(serviceItem);
        }

        async function selectRPC(block, rpc) {
            driver.click(block.inputs()[1]);
            const dialog = await driver.expect(
                () => driver.dialog(),
                'Did not find RPCs menu'
            );
            const rpcItem = dialog.children
                .find(child => child.label && child.label.text === rpc);
            driver.click(rpcItem);
        }
    });
});
