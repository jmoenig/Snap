/*globals SpriteMorph*/
(function(globals) {
    class ExtensionRegistry {
        constructor(ide) {
            this.ide = ide;
            this.registry = [];
        }

        register(Extension) {
            const extension = new Extension(this.ide);  // TODO: Replace the IDE with an official API?
            if (this.isLoaded(extension.name)) {
                return;
            }

            try {
                this.validate(extension);
            } catch (err) {
                this.ide.showMessage(`Unable to load extension "${extension.name}": ${err.message}`);
                return;
            }

            this.registry.push(extension);
            // TODO: Request permissions? Wrap the IDE?
            // TODO: Add an about section? What if there is no menu?
            this.ide.controlBar.extensionsButton.show();

            extension.getCategories()
                .forEach(category => this.registerCategory(category));

            this.ide.createCategories();
            this.ide.createCorralBar();
            this.ide.fixLayout();
            SpriteMorph.prototype.initBlocks();
        }

        validate(extension) {
            extension.getBlocks().forEach(block => {
                if (SpriteMorph.prototype[block.name]) {
                    throw new Error(`Cannot override existing "${block.name}" block`);
                }
            });
        }

        isLoaded(name) {
            return this.registry.find(ext => ext.name === name);
        }

        registerCategory(category) {
            const {name, color} = category;
            // TODO: refactor this so we can unregister extensions
            SpriteMorph.prototype.categories.splice(
                SpriteMorph.prototype.categories.length-3,
                0,
                name
            );
            SpriteMorph.prototype.blockColor[name] = color;
        }

        getBlockTemplates(categoryName) {
            const categories = this.registry.flatMap(ext => ext.getCategories());
            const category = categories.find(cat => cat.name === categoryName);
            if (category) {
                return category.blocks;
            }
            return [];
        }

        initBlocks() {
            // TODO: refactor this so we can unregister extensions
            const allBlocks = this.registry.flatMap(ext => ext.getBlocks());
            allBlocks.forEach(block => {
                SpriteMorph.prototype.blocks[block.name] = {
                    type: block.type,
                    category: block.category,
                    spec: block.spec
                };
                Process.prototype[block.name] = block.impl;
            });
        }
    }

    function Extension (name) {
        this.name = name;
    }

    Extension.prototype.getMenu = function() {
        return null;
    };

    Extension.prototype.getCategories = function() {
        return [];
    };

    Extension.prototype.getBlocks = function() {
        return [];
    };

    class CustomBlock {
        constructor(name, type, category, spec, defaults=[], impl) {
            this.name = name;
            this.type = type;
            this.category = category;
            this.spec = spec;
            this.defaults = defaults;
            this.impl = impl;
        }
    }

    class Category {
        constructor(name, color=new Color(120, 120, 120), blocks=[]) {
            this.name = name;
            this.color = color;
            this.blocks = blocks;
        }
    }

    class PaletteBlock {
        constructor(name) {
            this.name = name;
            this.type = 'block';
        }

        withWatcherToggle() {
            this.type = 'watcher';
            return this;
        }
    }

    Extension.Palette = {
        Block: PaletteBlock,
        Space: {name: '-', type: 'space'},
    };
    Extension.Block = CustomBlock;
    Extension.Category = Category;

    globals.Extension = Extension;
    globals.ExtensionRegistry = ExtensionRegistry;
})(this);
var NetsBloxExtensions;
