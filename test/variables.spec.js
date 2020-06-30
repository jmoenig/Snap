/* globals driver, */
describe('variables', function() {
    before(() => driver.reset());

    it('should be able to undo add global variable (after serializing)', async function() {
        const {SnapActions, SnapUndo} = driver.globals();
        await SnapActions.addVariable('testVar', true);
        // Get the serialized event and try to apply it
        var serializer = driver.ide().serializer;
        var str = '<replay>' + serializer.replayHistory() + '</replay>';
        var xml = serializer.parse(str);

        // serialize/deserialize the event
        SnapUndo.reset();
        const allEvents = serializer.loadReplayHistory(xml);

        // undo the last event
        const event = SnapUndo.getInverseEvent(allEvents.pop());
        await SnapActions.applyEvent(event);
    });

    describe('watchers', function() {
        it('should update checkbox on show/hide watcher', async function() {
            const {SnapActions, ToggleMorph} = driver.globals();
            await SnapActions.addVariable('testVar', true);

            const block = await driver.addBlock('doHideVar');
            const [varInput] = block.inputs();
            await driver.click(varInput);
            const dropdown = await driver.expect(
                () => driver.dialog(),
                'Variable dropdown did not appear'
            );
            const menuItem = dropdown.children.find(c => c.action === 'testVar');
            driver.click(menuItem);
            await driver.actionsSettled();
            await driver.selectCategory('Variables');
            driver.click(block);

            await driver.expect(
                () => {
                    const watchers = driver.ide().stage.watchers();
                    const isShowingVariable = watchers.find(w => w.labelText === 'testVar');
                    return !isShowingVariable;
                },
                'Did not hide variable'
            );

            await driver.expect(
                () => {
                    const checkbox = driver.palette().contents.children
                        .find(morph => morph instanceof ToggleMorph);
                    return checkbox.state === false;
                },
                'Checkbox did not uncheck on hide watcher'
            );
        });
    });
});
