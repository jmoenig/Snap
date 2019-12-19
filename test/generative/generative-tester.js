// Generating interactions using Snap Driver. Actions should be of a fixed size
// Since the available actions is highly dependent on the state at that time, I
// will just be validating during generation
(function(global) {

    const range = (start, end) => {
        if (end === undefined) {
            end = start;
            start = 0;
        }
        return [...Array(end-start)].map((_, i) => start+i);
    };

    // set the seed?
    function GenerativeTester(driver, actions, seed=Date.now()) {
        this.driver = driver;
        this.setSeed(seed);
        this.interactions = this.getAllActions();
    }

    GenerativeTester.prototype.setSeed = function(seed) {
        this.seed = seed;
        this.random = new Math.seedrandom(seed);
    };

    GenerativeTester.prototype.act = async function() {
        const interaction = this.sample(this.interactions);
        return interaction.apply(this.driver);
    };

    GenerativeTester.prototype.sample = function(list) {
        return list[Math.floor(this.random() * list.length)];
    };

    GenerativeTester.prototype.getAllActions = function() {
        const sample = this.sample.bind(this);
        const random = this.random.bind(this);
        const generator = ArgumentGenerator(sample, random);
        const {SnapActions} = this.driver.globals();

        const allInteractions = [];
        const action = (method, args, precond) => {
            const interaction = new SnapActionsInteraction(this.driver, method, args);
            if (precond) {
                interaction.setPrecondition(precond);
            }
            allInteractions.push(interaction);
        };
        const driver = (method, args) => {
            allInteractions.push(new Interaction(this.driver, method, args));
        };

        const dim = () => generator.int(50, 700);
        action('setStageSize', [dim, dim]);

        action('addSprite', [generator.newSprite]);
        action('removeSprite', [generator.sprite], Preconditions.hasSprites);
        action('renameSprite', [generator.sprite, generator.spriteName], Preconditions.hasSprites);
        action('toggleDraggable', [generator.sprite, generator.bool], Preconditions.hasSprites);
        action('duplicateSprite', [generator.sprite], Preconditions.hasSprites);
        //'importSprites',
        action(
            'setRotationStyle',
            [generator.sprite, () => sample(range(0, 3))],
            Preconditions.hasSprites
        );
        //'attachParts',
        //'detachParts',

        // Sounds
        //'addSound',
        //'renameSound',
        //'removeSound',

        // Costumes
        //'addCostume',
        //'renameCostume',
        //'removeCostume',
        //'updateCostume',

        // Variables
        action('addVariable', driver => {
            const {SnapActions} = driver.globals();
            const name = generator.varName(driver);
            const ownerIds = Object.keys(SnapActions._owners);
            const ownerIdOrTrue = sample(ownerIds.concat(true));
            return [name, ownerIdOrTrue];
        });
        action(
            'deleteVariable',
            driver => {
                const sprite = driver.ide().currentSprite;
                const variables = sprite.globalVariables().names()
                    .map(name => [name, true])
                    .concat(sprite.variables.names().map(name => [name, sprite.id]));

                return [sample(variables)];
            },
            Preconditions.hasVariables
        );

        // Custom blocks
        //'addCustomBlock',
        //'deleteCustomBlock',
        //'deleteCustomBlocks',

        //'setCustomBlockType',
        //'updateBlockLabel',
        //'deleteBlockLabel',

        // Block manipulation
        //'replaceBlock',
        action(
            'removeBlock',
            [generator.blockMorph, generator.bool],
            Preconditions.hasBlocks
        );
        action('setBlockPosition', driver => {
            const {SnapActions,Point} = driver.globals();
            const block = generator.blockMorph(driver);
            const {scripts} = SnapActions.getBlockOwner(block);
            const x = generator.int(0, scripts.width());
            const y = generator.int(0, scripts.height());
            return [block, new Point(x, y)];
        }, Preconditions.hasBlocks);
        action('setBlocksPositions', driver => {
            const {SnapActions,CommentMorph,Point} = driver.globals();
            const allBlocks = generator._blockMorphs(driver)
                .filter(morph => !(morph instanceof CommentMorph && morph.block));

            const blocks = allBlocks.filter(() => generator.bool());
            if (blocks.length === 0) {
                blocks.push(sample(allBlocks));
            }
            const positions = blocks.map(block => {
                const {scripts} = SnapActions.getBlockOwner(block);
                const x = generator.int(0, scripts.width());
                const y = generator.int(0, scripts.height());
                return new Point(x, y);
            });
            const blockIds = blocks.map(block => block.id);
            return [blockIds, positions];

        }, Preconditions.hasBlocks);
        action('moveBlock', driver => {
            const blocksAndTargets = generator._blockMorphs(driver)
                .map(block => {
                    return [block, generator._snapTargets(driver, block)];
                })
                .filter(pair => pair[1].length > 0);

            if (blocksAndTargets.length === 0) {
                return;
            }

            const [block, validTargets] = sample(blocksAndTargets);
            return [block, sample(validTargets)];
        });
        //'importBlocks',

        action('setCommentText', [generator.morphOfType('CommentMorph'), generator.text]);
        action('setSelector', driver => {
            const {blockAlternatives} = driver.globals().SpriteMorph.prototype;
            const blocksAndSpecs = generator._blockMorphs(driver)
                .map(block => {
                    const specs = blockAlternatives[block.selector];
                    if (specs) {
                        return [block, specs];
                    }
                })
                .filter(pair => !!pair);

            if (blocksAndSpecs.length === 0) {
                return;
            }

            const [block, specs] = sample(blocksAndSpecs);
            return [block, sample(specs)];
        });
        action('setBlockSpec', [generator.upVar, generator.text]);
        action(
            'addListInput',
            [generator.blockOfType('MultiArgMorph'), () => sample([1, 3])]
        );
        action(
            'removeListInput',
            driver => {
                const blocks = generator._blocksOfType(driver, 'MultiArgMorph')
                    .filter(block => {
                        const [leftArrow] = block.arrows().children;
                        return leftArrow.isVisible;
                    });

                if (blocks.length === 0) {
                    return;
                }

                const block = sample(blocks);
                const totalListInputs = block.inputs().length - block.minInputs;
                const repetition = Math.min(sample([1, 3]), totalListInputs);
                return [block, repetition];
            }
        );
        action(
            'ringify',
            driver => {
                const {SnapActions, HatBlockMorph, ReporterBlockMorph} = driver.globals();
                const blocks = Object.values(SnapActions._blocks)
                    .filter(block => block instanceof ReporterBlockMorph ||
                        !(block.topBlock() instanceof HatBlockMorph));

                return [sample(blocks)];
            }
        );
        action('unringify', driver => {
            const {RingMorph} = driver.globals();
            const allBlocks = Object.values(SnapActions._blocks);
            const ringifiedBlocks = allBlocks
                .filter(block => !!block.parent.parentThatIsA(RingMorph));

            return [sample(ringifiedBlocks)];
        });
        action(
            'toggleBoolean',
            [generator.blockOfType('BooleanSlotMorph'), () => sample([true, false, null])]
        );
        action(
            'setColorField',
            [generator.blockOfType('ColorSlotMorph'), generator.color]
        );
        action('setField', driver => {
            const slot = generator.inputSlot(driver);

            if (!slot) return;

            const value = slot.isNumeric ? generator.int(-1000, 1000) :
                generator.text(driver).slice(25);
            return [slot, value];
        });
        action('addMessageType', () => {
            const fields = range(0, generator.int(0, 5))
                .map(generator.text);
            return [generator.newMessageType, fields];
        });
        action('deleteMessageType', [generator.messageType]);

        // SnapDriver Actions
        driver('keys', [generator.text]);
        driver('click', [driver => sample([generator.point, generator.morph])(driver)]);
        driver('rightClick', [generator.morph]);
        driver('dragAndDrop', [generator.morph, generator.point]);
        driver('addBlock', [generator.blockSpec, generator.point]);

        return allInteractions;
    };

    class Interaction {
        constructor(caller, method, argGenerators, allowUndefined=false) {
            this.caller = caller;
            this.method = method;
            this.argGenerators = argGenerators;
            this.allowUndefined = allowUndefined;
        }

        getArguments(driver) {
            return this.argGenerators instanceof Array ? 
                this.argGenerators.map(fn => fn(driver)) :
                this.argGenerators(driver);
        }

        apply(driver) {
            if (this.precondition(driver)) {
                const args = this.getArguments(driver);
                const hasValidArgs = this.allowUndefined ||
                    (args && args.every(arg => arg !== undefined));

                if (hasValidArgs) {
                    this.caller[this.method].apply(this.caller, args);
                    return {
                        caller: this.caller,
                        method: this.method,
                        args: args,
                    };
                }
            }
        }

        precondition() {
            return true;
        }

        setPrecondition(fn) {
            this.precondition = fn;
        }
    }

    class SnapActionsInteraction extends Interaction {
        constructor(driver, method, argGens, allowUndefined=false) {
            const {SnapActions} = driver.globals();
            super(SnapActions, method, argGens, allowUndefined);
        }
    }

    function ArgumentGenerator(sample, random) {
        const randInt = (min=0, max=100) => Math.floor(random() * (max - min)) + min;
        const generator = {};
        generator.int = randInt;
        generator.bool = () => sample([true, false]);
        generator.char = () => String.fromCharCode(randInt(0, 255));
        generator.text = () => range(0, randInt(2, 120)).map(generator.char).join('');
        generator.point = driver => {
            const {Point} = driver.globals();
            const x = randInt(0, driver.world().width());
            const y = randInt(0, driver.world().height());
            return new Point(x, y);
        };
        generator.morph = driver => sample(driver.world().allChildren().filter(m => m.isVisible));
        generator.blockSpec = driver => sample(Object.keys(driver.globals().SpriteMorph.prototype.blocks));
        generator.sprite = driver => {
            const ide = driver.ide();
            const sprites = ide.sprites.asArray();
            return sample(sprites);
        };
        generator.spriteName = driver => {
            const ide = driver.ide();
            const name = range(0, 20).map(generator.char).join('');
            return ide.newSpriteName(name);
        };
        generator.newSprite = driver => {
            const {SpriteMorph, Process} = driver.globals();
            const ide = driver.ide();
            var sprite = new SpriteMorph(ide.globalVariables),
                rnd = Process.prototype.reportRandom;

            sprite.name = ide.newSpriteName(sprite.name);
            sprite.setCenter(ide.stage.center());
            sprite.parent = ide.stage;

            // randomize sprite properties
            sprite.setHue(rnd.call(ide, 0, 100));
            sprite.setBrightness(rnd.call(ide, 50, 100));
            sprite.turn(rnd.call(ide, 1, 360));
            sprite.setXPosition(rnd.call(ide, -220, 220));
            sprite.setYPosition(rnd.call(ide, -160, 160));
            return sprite;
        };
        const uniqName = (name, existing) => {
            const ix = name.indexOf('(');
            const stem = (ix < 0) ? name : name.substring(0, ix);
            let count = 1;
            let newName = stem;

            while (existing.includes(newName)) {
                count += 1;
                newName = stem + '(' + count + ')';
            }

            return newName;
        };
        const newUniqName = existing => {
            const name = range(0, 20).map(generator.char).join('');
            return uniqName(name, existing);
        };

        generator.varName = driver => {
            const globals = driver.ide().currentSprite.globalVariables();
            const existing = globals.names();

            return newUniqName(existing);
        };
        generator.messageType = driver => {
            return sample(driver.ide().stage.messageTypes.names());
        };
        generator.newMessageType = driver => {
            const existing = driver.ide().stage.messageTypes.names();
            return newUniqName(existing);
        };
        generator.morphOfType = name => {
            return driver => {
                const clazz = driver.globals()[name];
                const morphsOfType = driver.world().allChildren()
                    .filter(m => m instanceof clazz);
                return sample(morphsOfType);
            };
        };
        generator._blocksOfType = (driver, name) => {
            const clazz = driver.globals()[name];
            const blocks = generator._blockMorphs(driver)
                .map(block => block.allChildren())
                .reduce((l1, l2) => l1.concat(l2), [])
                .filter(node => node instanceof clazz);

            return blocks;
        };

        generator.blockOfType = name => {
            return driver => {
                const blocks = generator._blocksOfType(driver, name);
                return sample(blocks);
            };
        };
        generator.blockMorph = driver => {
            const blocks = generator._blockMorphs(driver);
            return sample(blocks);
        };
        generator._blockMorphs = driver => {
            const {SnapActions} = driver.globals();
            return Object.values(SnapActions._blocks);
        };
        generator._snapTargets = (driver, block) => {
            const {CommentMorph,CommandBlockMorph} = driver.globals();
            const {ReporterBlockMorph,ScriptsMorph} = driver.globals();
            const {HatBlockMorph,BlockMorph} = driver.globals();

            const scripts = block.parentThatIsA(ScriptsMorph);
            let targets = [];

            if (block instanceof CommentMorph) {
                const invalidBlocks = block.allChildren();
                const blocks = scripts.children
                    .filter(stack => stack instanceof BlockMorph &&
                        !invalidBlocks.includes(stack));
                targets = blocks.filter(block => !block.comment);
            } else if (block instanceof CommandBlockMorph) {
                const validTargetTypes = [];
                if (!(block instanceof HatBlockMorph)) {
                    validTargetTypes.push('bottom');
                }
                if (!block.bottomBlock().isStop()) {
                    validTargetTypes.push('top');
                }
                if (!block.wrapAttachPoint()) {
                    validTargetTypes.push('wrap');
                }

                targets = block.allAttachTargets(scripts)
                    .filter(target => validTargetTypes.includes(target.loc));
            } else if (block instanceof ReporterBlockMorph) {
                const invalidBlocks = block.allChildren();
                const stacks = scripts.children
                    .filter(stack => stack instanceof BlockMorph);

                targets = stacks.reduce((targets, stack) => {
                    const validInputs = stack.allInputs()
                        .filter(input => !invalidBlocks.includes(input));
                    return targets.concat(validInputs);
                }, []);
            } else {
                throw new Error('Invalid block type for snapTarget: ' + block.constructor.name);
            }

            return targets;
        };
        generator.snapTarget = block => {
            return driver => {
                const targets = generator._snapTargets(driver, block);
                return sample(targets);
            };
        };
        generator.inputSlot = driver => {
            const {InputSlotMorph} = driver.globals();
            const blocks = generator._blockMorphs(driver);
            const inputSlots = blocks.map(block => block.allChildren())
                .reduce((l1, l2) => l1.concat(l2), [])
                .filter(child => child instanceof InputSlotMorph);

            return sample(inputSlots);
        };
        generator.MultiArgMorph = driver => {
            const {MultiArgMorph} = driver.globals();
            const morphs = generator._blockMorphs(driver)
                .map(block => block.allChildren())
                .reduce((l1, l2) => l1.concat(l2), [])
                .filter(node => node instanceof MultiArgMorph);

            return sample(morphs);
        };
        generator.upVar = driver => {
            const {ReporterBlockMorph,TemplateSlotMorph} = driver.globals();
            const upVars = generator._blockMorphs(driver)
                .map(block => block.allChildren()
                    .filter(child => child instanceof ReporterBlockMorph &&
                            child.parent instanceof TemplateSlotMorph))
                .reduce((l1, l2) => l1.concat(l2), []);
            return sample(upVars);
        };
        generator.color = driver => {
            const {Color} = driver.globals();
            const [r,g,b] = range(3).map(() => generator.int(0, 255));
            return new Color(r, g, b);
        };
        return generator;
    }

    const Preconditions = {};

    Preconditions.hasBlocks = driver => {
        const {SnapActions} = driver.globals();
        const blocks = Object.values(SnapActions._blocks);
        return blocks.length > 1;
    };

    Preconditions.hasVariables = driver => {
        return !!driver.ide().currentSprite.variables.allNames().length;
    };

    Preconditions.hasSprites = driver => {
        return driver.ide().sprites.asArray().length > 0;
    };

    global.GenerativeTester = GenerativeTester;
})(this);
