/*global driver*/
describe('replay', function() {
    beforeEach(function() {
        return driver.reset()
            // Add a couple blocks, change the stage size, etc
            .then(() => driver.addBlock('forward'))
            .then(() => SnapActions.setStageSize(500, 500))
            .then(() => driver.addBlock('bubble'))
            .then(() => driver.ide().replayEvents());  // enter replay mode
    });

    describe('basic undo/redo', function() {
        it('should be able to undo all events', function(done) {
            const replayer = driver.ide().replayControls;
            replayer.jumpToBeginning();
            setTimeout(done, 750);
        });

        it('should be able to redo all events', function(done) {
            const replayer = driver.ide().replayControls;
            replayer.jumpToBeginning();
            // Jump to end
            setTimeout(() => {
                replayer.jumpToEnd();
                setTimeout(() => {
                    // Make sure a block exists!
                    const blocks = driver.ide().currentSprite.scripts.children;
                    if (blocks.length === 0) return done('blocks were not replayed!');
                    return done();
                }, 750);
            }, 500);
        });
    });

    describe('user actions', function() {
        it('should still undo after current user actions during replay', function() {
            const replayer = driver.ide().replayControls;
            replayer.jumpToEnd();

            driver.click(driver.ide().controlBar.startButton);

            return driver.sleep(25)
                .then(() => replayer.jumpToBeginning())
                .then(() => driver.expect(
                    () => driver.ide().currentSprite.scripts.children.length === 0,
                    'blocks were not undone!'
                ));
        });
    });
});
