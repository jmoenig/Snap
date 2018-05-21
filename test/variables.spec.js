/* globals driver, SnapActions, SnapUndo */
describe('variables', function() {
    before(function(done) {
        driver.reset(done);
    });

    it('should be able to undo add global variable (after serializing)', function(done) {
        SnapActions.addVariable('testVar', true)
            .then(() => {
                // Get the serialized event and try to apply it
                var serializer = driver.ide().serializer;
                var str = '<replay>' + serializer.replayHistory() + '</replay>';
                var xml = serializer.parse(str);

                // serialize/deserialize the event
                SnapUndo.reset();
                serializer.loadReplayHistory(xml);

                // undo the last event
                var event = SnapUndo.getInverseEvent(SnapUndo.allEvents.pop());
                SnapActions.applyEvent(event)
                    .then(() => done());
            });
    });
});
