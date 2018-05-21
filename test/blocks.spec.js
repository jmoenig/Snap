/* globals SnapActions, expect, driver, Point, CustomBlockDefinition,
 CustomCommandBlockMorph, ScriptsMorph */
describe('blocks', function() {
    var position = new Point(400, 400);

    beforeEach(function(done) {
        driver.reset(() => {
            driver.selectCategory('control');
            done();
        });
    });

    it('should create block', function(done) {
        driver.addBlock('doIfElse', position)
            .then(block => {
                expect(!!block).to.be(true);
                done();
            })
            .catch(err => done(err));
    });

    it('should relabel if-else block to if', function(done) {
        var fail = () => done('action catched!');
        driver.addBlock('doIfElse', position)
            .then(block => SnapActions.setSelector(block, 'doIf')
                .then(() => done())
                .catch(fail)
            )
            .catch(fail);
    });

    describe('custom', function() {
        beforeEach(done => {
            driver.reset(() => {
                driver.selectCategory('custom');
                done();
            });
        });

        it('should create (sprite) custom block', function(done) {
            // Create a custom block definition
            var sprite = driver.ide().currentSprite,
                spec = 'sprite block %s',
                definition = new CustomBlockDefinition(spec, sprite);

            // Get the sprite
            definition.category = 'motion';
            SnapActions.addCustomBlock(definition, sprite)
                .then(() => {
                    driver.addBlock(definition.blockInstance(), position)
                        .then(() => done());
                });
        });

        it('should be able to attach comment to prototype hat block', function(done) {
            var sprite = driver.ide().currentSprite,
                spec = 'sprite block %s',
                definition = new CustomBlockDefinition(spec, sprite);

            // Get the sprite
            definition.category = 'motion';
            SnapActions.addCustomBlock(definition, sprite).then(() => {
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
                setTimeout(() => {
                    // Verify that the hatBlock.comment value is set
                    if (!hatBlock.comment) return done('hat block has no comment set!');
                    done();
                }, 10);
            });
        });

        // Test attaching a command block to the proto hat block
        it('should be able to attach cmd to prototype hat block', function(done) {
            var sprite = driver.ide().currentSprite,
                spec = 'sprite block %s',
                definition = new CustomBlockDefinition(spec, sprite);

            // Get the sprite
            definition.category = 'motion';
            SnapActions.addCustomBlock(definition, sprite).then(() => {
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
                setTimeout(() => {
                    if (!hatBlock.nextBlock()) return done('block not connected!');
                    done();
                }, 10);
            });
        });
    });

    describe.skip('moveBlock', function() {
        before(done => driver.reset(done));

        it('should not create infinite loop on undo', function() {
            // Create three blocks (1, 2, 3)
            // TODO
            // 3 -> 1
            // TODO
            // 2 in place of 3
            // TODO
            // 3 -> 2
            // TODO
            // 2 -> 1
            // TODO
            // disconnect 2
            // TODO
            // undo three times
            // TODO
            let specs = ['reportSum', 'reportDifference', 'reportQuotient'];
            let blocks = [];
            let promise = specs.reduce((promise, spec) => {
                return promise.then(
                    () => driver.addBlock(spec).then(block => blocks.push(block))
                );
            }, Promise.resolve());
            return promise.then(() => console.log('done'));

        });
    });

    describe('rpc', function() {
        before(done => {
            driver.reset(done);
        });

        it('should populate method with `setField`', function(done) {
            // create rpc block
            driver.addBlock('getJSFromRPCStruct').then(block => {
                var serviceField = block.inputs()[0];
                // set the service to weather
                SnapActions.setField(serviceField, 'Weather').then(() => {
                    var methodField = block.inputs()[1];
                    // set the method to `humidity`
                    SnapActions.setField(methodField, 'humidity').then(() => {
                        var err = null;
                        if (block.inputs().length < 3) err = `argument inputs not created!`;
                        done(err);
                    });
                });
            });
        });
    });
});
