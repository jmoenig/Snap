/* globals driver, expect */
describe('actions', function() {
    let Point, SnapActions, SnapCloud;
    let position;

    before(() => {
        Point = driver.globals().Point;
        SnapCloud = driver.globals().SnapCloud;
        SnapActions = driver.globals().SnapActions;
        position = new Point(600, 600);
    });
    beforeEach(() => driver.reset());

    it('should have default color w/ setColorField', function() {
        return driver.addBlock('setColor', position)
            .then(block => SnapActions.setColorField(block.inputs()[0]));
    });

    it('should not animate move block when not focused', function() {
        const {SnapUndo} = driver.globals();
        // Create two blocks. Connect one to another then change to the stage and undo/redo
        let block1 = null;
        let id = null;
        return driver.addBlock('forward', position)
            .then(block => {
                block1 = block;
                return driver.addBlock('forward', new Point(800, 800));
            })
            .then(block2 => {
                id = Object.keys(SnapUndo.eventHistory)[0];

                // connect block to block2
                const target = {
                    element: block2,
                    point: new Point(800, 800),
                    loc: 'bottom'
                };
                driver.selectStage();
                return SnapActions.moveBlock(block1, target);
            })
            .then(() => SnapUndo.undo(id))
            .then(() => SnapUndo.redo(id));
    });

    it('should only animate if focused', function() {
        const stage = driver.ide().stage;

        SnapActions.currentEvent = {replayType: 1};
        driver.selectSprite('Sprite');
        expect(!!SnapActions.canAnimate(stage)).toBe(false);
        driver.selectStage();
        expect(!!SnapActions.canAnimate(stage)).toBe(true);
    });

    describe('collaboration', function() {
        var username;

        before(function() {
            username = SnapCloud.username;
        });

        after(function() {
            SnapCloud.username = username;
        });

        it('should detect collaboration if multiple users in role', function() {
            let room = driver.ide().room;
            let role = room.getRole(room.getCurrentRoleName());
            let occupants = role.users;
            occupants.push({username: 'test', uuid: 'ad'});

            role.setOccupants(occupants);
            expect(SnapActions.isCollaborating()).toBe(true);
        });

        it('should detect not collaborating if only user in role', function() {
            expect(SnapActions.isCollaborating()).toBe(false);
        });

        it('should detect leader by default', function() {
            expect(driver.ide().room.isLeader()).toBe(true);
        });

        it('should detect leader based off of uuid', function() {
            SnapCloud.username = 'test';
            return Promise.resolve()
                .then(() => {
                    let room = driver.ide().room;
                    let role = room.getRole(room.getCurrentRoleName());
                    let occupants = role.users;
                    occupants.unshift({username: SnapCloud.username, uuid: 'ad'});

                    role.setOccupants(occupants);

                    expect(driver.ide().room.isLeader()).toBe(false);
                });
        });
    });

    describe('bug reporting', function() {
        it('should report bugs if completeAction is called with error', function(done) {
            var ide = driver.ide();
            ide.submitBugReport = () => {
                delete ide.submitBugReport;
                done();
            };
            SnapActions.completeAction('testError');
        });
    });

    describe('openProject', function() {
        beforeEach(() => driver.reset());

        afterEach(function() {
            driver.ide().exitReplayMode();
        });

        it('should allow opening projects from replay mode', function() {
            // Enter replay mode
            return SnapActions.setStageSize(500, 500)
                .then(function() {
                    driver.ide().replayEvents();

                    // try to open a new project...
                    SnapActions.openProject();

                    return driver.expect(
                        () => !driver.dialog(),
                        'openProject action blocked during replay!'
                    );
                });
        });

        it('should allow opening projects if room not editable', function(done) {
            var room = driver.ide().room;
            var isEditable = room.isEditable;

            driver.addBlock('forward')
                .then(() => {
                    room.isEditable = () => false;
                    SnapActions.openProject();

                    setTimeout(function() {
                        room.isEditable = isEditable;
                        // make sure there is no block
                        let sprite = driver.ide().currentSprite;
                        let blocks = sprite.scripts.children;
                        if (blocks.length) return done('Could not openProject');
                        done();
                    }, 150);
                });
        });

        it('should get unique id with newId', function() {
            let id = SnapActions.newId();
            let owner = SnapActions.getOwnerFromId(id);
            expect(owner).toBe(undefined);
        });
    });

    describe('action queue', function() {
        let oldSendJSON = null;
        let oldApplyEvent = null;
        let sockets = null;

        before(function() {
            sockets = driver.ide().sockets;
            oldSendJSON = sockets.sendJSON;
            oldApplyEvent = sockets._applyEvent;
        });

        afterEach(function() {
            sockets.sendJSON = oldSendJSON;
            sockets._applyEvent = oldApplyEvent;
            SnapActions.queuedActions = [];
        });

        it('should not request-actions if already requested', function() {
            sockets.sendJSON = () => {
                // first request
                sockets.sendJSON = () => {
                    throw Error('Requested actions twice!');
                };
                SnapActions.requestMissingActions();
            };

            SnapActions.requestMissingActions();
        });

        it('should queue actions in order', function() {
            SnapActions.addActionToQueue({id: 1});
            SnapActions.addActionToQueue({id: 0});
            SnapActions.addActionToQueue({id: 3});
            SnapActions.addActionToQueue({id: 2});
            SnapActions.queuedActions.forEach((action, index) => {
                expect(action.id).toBe(index);
            });
        });

        it('should ignore old actions', function() {
            sockets._applyEvent = () => {
                throw Error('applying old action!');
            };
            SnapActions.onReceiveAction({id: -1});
        });
    });

    describe('then/catch', function() {
        beforeEach(() => driver.reset());

        it('should clear catch handler on accepted action', function(done) {
            SnapActions.setStageSize(500, 500)
                .catch(() => done('Called catch handler'));

            setTimeout(() => SnapActions.setStageSize(400, 400), 0);
            setTimeout(done, 100);
        });
    });

    describe('traverse', function() {
        beforeEach(() => driver.reset());

        it('should include input lists', function(done) {
            // Create a call block and add the 'input list' option
            function setupListInputBlocks(callback) {
                driver.addBlock('evaluate').then(block => {
                    // Add list input
                    let multiArgs = block.children[2];
                    SnapActions.addListInput(multiArgs, 1).then(() => {
                        driver.addBlock('reportNewList', new Point(500, 500)).then(listBlock => {
                            SnapActions.moveBlock(listBlock, multiArgs).then(function() {
                                callback(block);
                            });
                        });
                    });
                });
            }

            // Call traverse on it and ensure that it traverses over the input list
            function checkBlocks(block) {
                let listBlock = null;
                SnapActions.traverse(block, block => {
                    if (block.selector === 'reportNewList') listBlock = block;
                });
                if (!listBlock) return done('Did not traverse the list block');
                done();
            }

            setupListInputBlocks(checkBlocks);
        });

        it('should include ringified statements', function(done) {
            const {RingCommandSlotMorph} = driver.globals();
            // Create a call block and add the 'input list' option
            function setupListInputBlocks(callback) {
                driver.addBlock('reifyScript').then(ring => {
                    driver.addBlock('doFaceTowards').then(block => {
                        const slot = ring.inputs()
                            .find(child => child instanceof RingCommandSlotMorph);
                        let target = slot.attachTargets().pop();

                        SnapActions.moveBlock(block, target).then(() => {
                            callback(ring);
                        });
                    });
                });
            }

            // Call traverse on it and ensure that it traverses over the input list
            function checkBlocks(block) {
                let cmdBlock = null;
                SnapActions.traverse(block, block => {
                    if (block.selector === 'doFaceTowards') cmdBlock = block;
                });
                if (!cmdBlock) return done('Did not traverse the cmd block');
                done();
            }

            setupListInputBlocks(checkBlocks);
        });
    });
});
