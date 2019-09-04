/* globals expect, driver */

describe('blocks', function() {
    this.timeout(5000);

    let Point, SnapActions, CustomBlockDefinition, CustomCommandBlockMorph;
    let position;
    before(() => {
        Point = driver.globals().Point;
        CustomCommandBlockMorph = driver.globals().CustomCommandBlockMorph;
        CustomBlockDefinition = driver.globals().CustomBlockDefinition;
        SnapActions = driver.globals().SnapActions;
        position = new Point(400, 400);
    });

    beforeEach(function() {
        return driver.reset()
            .then(() => driver.selectCategory('control'));
    });

    it('should create block', function() {
        return driver.addBlock('doIfElse', position)
            .then(block => expect(!!block).toBe(true));
    });

    it('should relabel if-else block to if', function() {
        return driver.addBlock('doIfElse', position)
            .then(block => SnapActions.setSelector(block, 'doIf'));
    });

    describe('custom', function() {
        beforeEach(() => {
            return driver.reset()
                .then(() => driver.selectCategory('custom'));
        });

        it('should create (sprite) custom block', function() {
            // Create a custom block definition
            var sprite = driver.ide().currentSprite,
                spec = 'sprite block %s',
                definition = new CustomBlockDefinition(spec, sprite);

            // Get the sprite
            definition.category = 'motion';
            return SnapActions.addCustomBlock(definition, sprite)
                .then(() => driver.addBlock(definition.blockInstance(), position));
        });

        it('should be able to attach comment to prototype hat block', function() {
            const {ScriptsMorph} = driver.globals();
            var sprite = driver.ide().currentSprite,
                spec = 'sprite block %s',
                definition = new CustomBlockDefinition(spec, sprite);

            // Get the sprite
            definition.category = 'motion';
            return SnapActions.addCustomBlock(definition, sprite)
                .then(() => {
                    driver.selectCategory('custom');
                    let block = driver.palette().contents.children
                        .find(item => item instanceof CustomCommandBlockMorph);

                    // Edit the custom block
                    driver.rightClick(block);
                    let editBtn = driver.dialog().children.find(item => item.action === 'edit');
                    driver.click(editBtn);

                    // add comment to the prototype hat morph
                    let editor = driver.dialog();
                    driver.rightClick(editor);

                    let addCmtBtn = driver.dialog().children
                        .find(item => item.action === 'addComment');

                    driver.click(addCmtBtn);

                    // drop it on the prototype hat block
                    let scripts = editor.body.children.find(child => child instanceof ScriptsMorph);
                    let hatBlock = scripts.children[0];
                    driver.click(hatBlock);
                    return driver.expect(
                        () => !!hatBlock.comment,
                        'hat block has no comment set!'
                    );
                });
        });

        // Test attaching a command block to the proto hat block
        it('should be able to attach cmd to prototype hat block', function() {
            var sprite = driver.ide().currentSprite,
                spec = 'sprite block %s',
                definition = new CustomBlockDefinition(spec, sprite);

            // Get the sprite
            definition.category = 'motion';
            return SnapActions.addCustomBlock(definition, sprite)
                .then(() => {
                    driver.selectCategory('custom');
                    let block = driver.palette().contents.children
                        .find(item => item instanceof CustomCommandBlockMorph);

                    // Edit the custom block
                    driver.rightClick(block);
                    let editBtn = driver.dialog().children.find(item => item.action === 'edit');
                    driver.click(editBtn);

                    // add block to the prototype hat morph
                    // moveBlock
                    driver.selectCategory('motion');
                    let forwardBlock = driver.palette().contents.children
                        .find(item => item.selector === 'forward');

                    let editor = driver.dialog();

                    // drop it on the prototype hat block
                    let scripts = editor.body.contents;
                    let hatBlock = scripts.children[0];
                    let dropPosition = hatBlock.bottomAttachPoint()
                        .add(new Point(forwardBlock.width()/2, forwardBlock.height()/2))
                        .subtract(forwardBlock.topAttachPoint().subtract(forwardBlock.topLeft()));

                    driver.dragAndDrop(forwardBlock, dropPosition);
                    return driver.expect(
                        () => hatBlock.nextBlock(),
                        'block not connected'
                    );
                });
        });
    });

    describe('moveBlock', function() {
        before(() => driver.reset());

        it('should not create infinite loop on undo', function() {
            // Create three blocks (1, 2, 3)
            const specs = ['reportSum', 'reportDifference', 'reportQuotient'];
            driver.ide().showMessage('starting to make blocks', 1);
            const createBlocks = specs
                .reduce((promise, spec) => {
                    const index = specs.indexOf(spec)+1;
                    let point = new Point(300, 300 + index*100);
                    return promise.then(() => driver.addBlock(spec, point))
                        .then(block => SnapActions.setField(block.inputs()[1], index));
                }, Promise.resolve());
            const spriteScriptId = driver.ide().currentSprite.id + '/scripts';
            const {SnapUndo} = driver.globals();

            return createBlocks
                .then(() => {
                    const [block1, block2, block3] = driver.ide().currentSprite.scripts.children;
                    driver.ide().showMessage('blocks created.', 1);
                    // 3 -> 1
                    return SnapActions.moveBlock(block3, block1.inputs()[0])
                        .then(() => SnapActions.moveBlock(block2, block3))
                        .then(() => SnapActions.setBlockPosition(block2, new Point(550, 300)));
                })
                .then(() => SnapUndo.undo(spriteScriptId))
                .catch(err => {
                    driver.ide().showMessage(err.message);
                    throw err;
                });
        });

        it('should update target of bottom block during splice', async function() {
            const {SnapUndo, copy} = driver.globals();
            const spriteScriptId = driver.ide().currentSprite.id + '/scripts';
            const point = new Point(300, 300);

            // Create a couple blocks
            const topBlock = await driver.addBlock('forward', point);
            const middleBlock = await driver.addBlock('doGlide', point);
            const bottomBlock = await driver.addBlock('turnLeft', point);

            let target = {
                element: topBlock,
                point: topBlock.bottomAttachPoint(),
                loc: 'bottom'
            };
            await SnapActions.moveBlock(bottomBlock, copy(target));
            await SnapActions.moveBlock(middleBlock, copy(target));
            await SnapActions.setBlockPosition(bottomBlock, new Point(500, 500));

            await SnapUndo.undo(spriteScriptId);

            const msg = 'Blocks should be in correct order after undo';
            expect(topBlock.nextBlock()).toBe(middleBlock, msg);
            expect(middleBlock.nextBlock()).toBe(bottomBlock, msg);
        });
    });

    describe('rpc', function() {
        before(() => driver.reset());

        it('should populate method with `setField`', function() {
            // create rpc block
            let block = null;
            return driver.addBlock('getJSFromRPCStruct')
                .then(_block => {
                    block = _block;
                    const serviceField = block.inputs()[0];
                    // set the service to weather
                    return SnapActions.setField(serviceField, 'Weather');
                })
                .then(() => {
                    var methodField = block.inputs()[1];
                    // set the method to `humidity`
                    return SnapActions.setField(methodField, 'humidity');
                })
                .then(() => {
                    return driver.expect(
                        () => block.inputs().length >= 3,
                        `argument inputs not created!`
                    );
                });
        });
    });
});
