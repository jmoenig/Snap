var ide = world.children.find(child => {
        return child instanceof IDE_Morph;
    }),
    prefix = 'dlg_';


SnapExtensions.primitives.set(prefix + 'inform(title,message)', function(title, message) {
    ide.inform(title, message);
})

SnapExtensions.primitives.set(prefix + 'show_message(message,secs)', function(message, secs) {
    ide.showMessage(message, secs);
})

