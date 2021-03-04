/*globals driver, assert */
describe('widgets', function() {
    describe('DialogBoxMorph', function() {
        it('should consider title width on fixLayout', function() {
            const {DialogBoxMorph, world} = driver.globals();
            new DialogBoxMorph().inform(
                'Some longer title text',
                'abc',
                world
            );
            const dialog = driver.dialog();
            assert(
                dialog.label.width() <= dialog.width(),
                'Title text is wider than dialog'
            );
        });
    });
});
