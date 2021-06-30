/*globals SpriteMorph, Process, StageMorph*/
(function(globals) {
    class ExtensionRegistry {
        constructor() {
            this.ide = null;
            this.registry = [];
            this.pendingExtensions = [];
        }

        initialize(ide) {
            this.ide = ide;
            this.pendingExtensions.forEach(ext => this.load(ext));
            this.pendingExtensions = [];
        }

        load(Extension) {
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

        register(Extension) {
            if (this.isReady()) {
                this.load(Extension);
            } else {
                this.pendingExtensions.push(Extension);
            }
        }

        isReady() {
            return !!this.ide;
        }

        validate(extension) {
            const palettes = extension.getPalette();

            extension.getBlocks().forEach(block => {
                const alreadyExists = SpriteMorph.prototype[block.name] ||
                    StageMorph.prototype[block.name] || Process.prototype[block.name];

                if (alreadyExists) {
                    throw new Error(`Cannot override existing "${block.name}" block`);
                }

                const receivers = this.findWatcherReceivers(palettes, block.name);
                receivers.forEach(rcvr => {
                    if (!block.receivers.includes(rcvr)) {
                        const msg = `Cannot add a watcher toggle for "${block.spec}" on ${rcvr.name}.` +
                            ` Did you forget to add ".for(${rcvr.name})" when defining the block?`;
                        throw new Error(msg);
                    }
                });
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

        getPaletteContents(targetObject, categoryName) {
            const paletteContents = this.registry.flatMap(ext => ext.getPalette())
                .filter(paletteCat => paletteCat.isVisible(targetObject, categoryName))
                .flatMap(paletteCat => paletteCat.contents);

            return paletteContents;
        }

        findWatcherReceivers(palettes, spec) {
            const receivers = palettes
                .filter(p => p.contents.find(block => block.type === 'watcher' && block.name === spec))
                .map(palette => palette.targetObject)
                .reduce((rcvrs, next) => {
                    if (!rcvrs.includes(next)) {
                        rcvrs.push(next);
                    }
                    return rcvrs;
                }, []);
            return receivers;
        }

        initBlocks() {
            // TODO: refactor this so we can unregister extensions
            const allBlocks = this.registry.flatMap(ext => ext.getBlocks());
            const palettes = this.registry.flatMap(ext => ext.getPalette());

            allBlocks.forEach(block => {
                SpriteMorph.prototype.blocks[block.name] = {
                    type: block.type,
                    category: block.category,
                    spec: block.spec
                };
                const receivers = this.findWatcherReceivers(palettes, block.name);
                receivers.forEach(rcvr => {
                    if (!block.receivers.includes(rcvr)) {
                        const msg = `Cannot add a watcher toggle for ${block.spec} on ${rcvr.name}.` +
                            ` Did you forget to add ".for(${rcvr.name})" when defining the block?`;
                        throw new Error(msg);
                    }
                });

                if (receivers.length === 0) {
                    receivers.push(Process);
                }
                receivers.forEach(Rcvr => Rcvr.prototype[block.name] = block.impl);
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

    Extension.prototype.getPalette = function(/*target, category*/) {
        return [];
    };

    class PaletteCategory {
        constructor(category, contents, targetObject) {
            this.category = category;
            this.contents = contents;
            this.targetObject = targetObject;
        }

        isVisible(target, category) {
            return this.category === category && (!this.targetObject || target instanceof this.targetObject);
        }
    }

    class CustomBlock {
        constructor(name, type, category, spec, defaults=[], impl) {
            this.name = name;
            this.type = type;
            this.category = category;
            this.spec = spec;
            this.defaults = defaults;
            this.impl = impl;
            this.receivers = [];
        }

        for(...receivers) {
            this.receivers = receivers;
            return this;
        }
    }

    class Category {
        constructor(name, color=new Color(120, 120, 120)) {
            this.name = name;
            this.color = color;
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

    Extension.PaletteCategory = PaletteCategory;
    Extension.Palette = {};
    Extension.Palette.Block = PaletteBlock;
    Extension.Palette.Space = {name: '-', type: 'space'};
    Extension.Palette.BigSpace = {name: '=', type: 'space'};
    Extension.Block = CustomBlock;
    Extension.Category = Category;

    globals.Extension = Extension;
    globals.ExtensionRegistry = ExtensionRegistry;
    globals.NetsBloxExtensions = new ExtensionRegistry();

})(this);
