/*globals driver*/
describe('sprites', function() {
    before(() => driver.reset());

    // rename the sprite with colliding name should put the correct name in the box
    it('should display the correct name in the sprite name dialog', function(){
        // Create another sprite
        let ide = driver.ide();
        let firstSprite = ide.stage.children[0];
        return ide.addNewSprite()
            .then(sprite => {
                // Select it
                ide.selectSprite(sprite);

                // Rename it to "Sprite"
                ide.spriteBar.nameField.setContents(firstSprite.name);
                ide.spriteBar.nameField.accept();
                if (name === firstSprite.name) {
                    throw new Error('Invalid sprite name');
                }

                let displayName = ide.spriteBar.nameField.getValue();
                if (displayName !== sprite.name) {
                    throw new Error('Sprite name field incorrect: ' + displayName);
                }
            });
    });
});
