// Generating interactions using Snap Driver. Actions should be of a fixed size
// Since the available actions is highly dependent on the state at that time, I
// will just be validating during generation
(function(global) {

    const range = (start, end) => [...Array(end-start)].map((_, i) => start+i);

    // set the seed?
    function InteractionGenerator(driver, actions, seed=Date.now()) {
        this.driver = driver;
        this.setSeed(seed);
        this.actionDict = this.getActionDict();
        this.actions = actions || Object.keys(this.actionDict);
    }

    InteractionGenerator.prototype.getActionDict = function() {
        const sample = this.sample.bind(this);
        const random = this.random.bind(this);
        const randInt = (min, max) => Math.floor(random() * (max - min)) + min;

        const generator = {};
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
        generator.sprite = driver => driver.world();

        return {
            keys: [generator.text],
            click: [driver => sample([generator.point, generator.morph])(driver)],
            rightClick: [generator.morph],
            dragAndDrop: [generator.morph, generator.point],
            addBlock: [generator.blockSpec, generator.point],
        };
    };

    InteractionGenerator.prototype.setSeed = function(seed) {
        this.seed = seed;
        this.random = new Math.seedrandom(seed);
    };

    InteractionGenerator.prototype.act = async function() {
        const action = this.sample(this.actions);
        const args = this.actionDict[action].map(fn => fn(this.driver));
        await this.driver[action].apply(this.driver, args.slice());
        return {action, args};
    };

    InteractionGenerator.prototype.sample = function(list) {
        return list[Math.floor(this.random() * list.length)];
    };

    global.InteractionGenerator = InteractionGenerator;
})(this);
