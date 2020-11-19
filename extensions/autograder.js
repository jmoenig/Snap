/* globals NetsBloxExtensions, snapEquals, fontHeight, Point, DialogBoxMorph,
 ScrollFrameMorph, nop, HandleMorph, List, SpriteMorph, ToggleMorph, BlockMorph*/
// This is an example extension for autograding in NetsBlox
(function() {
    const CS1000 = 'https://raw.githubusercontent.com/CliffordAnderson/CS1000/master';
    const NetsBlox = 'https://raw.githubusercontent.com/NetsBlox/Snap--Build-Your-Own-Blocks/780-client-extensions';
    class Autograder {
        constructor(ide) {  // TODO: Use an API wrapper instead?
            this.name = 'Text Analysis';
            this.ide = ide;
            this.currentAssignment = null;
            this.resultsDialog = null;
            this.assignments = [
                new Assignment(
                    'Assignment 2: Between',
                    `${CS1000}/assignment-two/between.xml`,
                    new CustomBlockTestSuite(
                        this.ide,
                        `is %'number' between %'lower' and %'upper'`,
                        [
                            new ExactOutputTestCase([2, 1, 3], true),
                            new ExactOutputTestCase([1, 1, 3], true),
                            new ExactOutputTestCase([3, 1, 3], true),
                            new ExactOutputTestCase([-2, -3, -1], true),
                            new ExactOutputTestCase([-1, -3, -1], true),
                            new ExactOutputTestCase([-3, -3, -1], true),
                            new ExactOutputTestCase([0, -1, -3], false),
                            new ExactOutputTestCase([-4, -1, -3], false),
                            new ExactOutputTestCase([0, 1, 3], false),
                            new ExactOutputTestCase([4, 1, 3], false),
                        ]
                    )
                ),
                new Assignment(
                    'Assignment 3: Contains',
                    `${CS1000}/assignment-three/contains.xml`,
                    new CustomBlockTestSuite(
                        this.ide,
                        `is there a %'letter' in %'word'`,
                        [
                            new ExactOutputTestCase(['c', 'cat'], true),
                            new ExactOutputTestCase(['a', 'cat'], true),
                            new ExactOutputTestCase(['t', 'cat'], true),
                            new ExactOutputTestCase(['a', 'dog'], false),
                            new ExactOutputTestCase(['d', 'snack'], false),
                            new ExactOutputTestCase(['C', 'snack'], true),
                        ]
                    ),
                ),
                new Assignment(
                    'Assignment 4: Reverse List',
                    `${CS1000}/assignment-four/reverse-list.xml`,
                    new CustomBlockTestSuite(
                        this.ide,
                        `reverse %'original list'`,
                        [
                            new ExactOutputTestCase([[]], []),
                            new ExactOutputTestCase([[1, 2]], [2, 1]),
                            new ExactOutputTestCase([[2, 1, 3]], [3, 1, 2]),
                            new ExactOutputTestCase([[2, 1, []]], [[], 1, 2]),
                        ]
                    ),
                ),
                new Assignment(
                    'Assignment 5: To Lowercase',
                    `${CS1000}/assignment-five/to-lower-case.xml`,
                    new CustomBlockTestSuite(
                        this.ide,
                        `to lowercase %'original string'`,
                        [
                            new ExactOutputTestCase(['abc'], 'abc'),
                            new ExactOutputTestCase(['aBc'], 'aBc'),
                            new ExactOutputTestCase(['123'], '123'),
                            new ExactOutputTestCase(['HeLlO?'], 'hello?'),
                        ]
                    ),
                ),
                new Assignment(
                    'Assignment 6: LDA Preprocessing',
                    `${NetsBlox}/extensions/LDAPreprocessing.xml`,
                    new CustomBlockTestSuite(
                        this.ide,
                        `%'data' in jsLDA format`,
                        [
                            new NamedTestCase(
                                'should create tab-separated list',
                                [
                                    [
                                        ['URL', 'Time', 'Station', 'Show', 'IAShowID', 'IAPreview', 'Snippet'],
                                        ['someUrl', '', 'station', '', '', '', 'some text'],
                                    ],
                                ],
                                result => result.split('\t').length > 1,
                            ),
                            new NamedTestCase(
                                'should have 3 columns',
                                [
                                    [
                                        ['URL', 'Time', 'Station', 'Show', 'IAShowID', 'IAPreview', 'Snippet'],
                                        ['someUrl', '', 'station', '', '', '', 'some text'],
                                    ],
                                ],
                                result => {
                                    const firstLine = result.split('\n').shift();
                                    const columns = firstLine.split('\t');
                                    return columns.length === 3;  // TODO: throw error?
                                }
                            ),
                            new NamedTestCase(
                                'should only include data (skip header!)',
                                [
                                    [
                                        ['URL', 'Time', 'Station', 'Show', 'IAShowID', 'IAPreview', 'Snippet'],
                                        ['someUrl', '', 'station', '', '', '', 'some text'],
                                    ],
                                ],
                                result => {
                                    const firstLine = result.split('\n').shift();
                                    const [url] = firstLine.split('\t');
                                    return url !== 'URL';
                                }
                            ),
                            new NamedTestCase(
                                'should report URL in first column',
                                [
                                    [
                                        ['URL', 'Time', 'Station', 'Show', 'IAShowID', 'IAPreview', 'Snippet'],
                                        ['someUrl', '', 'station', '', '', '', 'some text'],
                                    ],
                                ],
                                result => {
                                    const firstLine = result.split('\n').shift();
                                    const [url] = firstLine.split('\t');
                                    return url === 'someUrl';
                                }
                            ),
                            new NamedTestCase(
                                'should report station in second column',
                                [
                                    [
                                        ['URL', 'Time', 'Station', 'Show', 'IAShowID', 'IAPreview', 'Snippet'],
                                        ['someUrl', '', 'station', '', '', '', 'some text'],
                                    ],
                                ],
                                result => {
                                    const firstLine = result.split('\n').shift();
                                    const [,station] = firstLine.split('\t');
                                    return station === 'station';
                                }
                            ),
                            new NamedTestCase(
                                'should report snippet in third column',
                                [
                                    [
                                        ['URL', 'Time', 'Station', 'Show', 'IAShowID', 'IAPreview', 'Snippet'],
                                        ['someUrl', '', 'station', '', '', '', 'some text'],
                                    ],
                                ],
                                result => {
                                    const firstLine = result.split('\n').shift();
                                    const [,,snippet] = firstLine.split('\t');
                                    return snippet === 'some text';
                                }
                            ),
                            new NamedTestCase(
                                'should remove quotes from text',
                                [
                                    [
                                        ['URL', 'Time', 'Station', 'Show', 'IAShowID', 'IAPreview', 'Snippet'],
                                        ['someUrl', '', 'station', '', '', '', '"some text"'],
                                    ],
                                ],
                                result => {
                                    const firstLine = result.split('\n').shift();
                                    const columns = firstLine.split('\t');
                                    const text = columns.pop();
                                    return !text.startsWith('"');
                                }
                            ),
                            new NamedTestCase(
                                'should convert text to lowercase',
                                [
                                    [
                                        ['URL', 'Time', 'Station', 'Show', 'IAShowID', 'IAPreview', 'Snippet'],
                                        ['someUrl', '', 'station', '', '', '', 'SOME TEXT'],
                                    ],
                                ],
                                result => {
                                    const firstLine = result.split('\n').shift();
                                    const columns = firstLine.split('\t');
                                    const text = columns.pop();
                                    return text.toLowerCase() === text;
                                }
                            ),
                        ]
                    ),
                ),
            ];
        }

        getMenu() {
            const dict = {};
            if (this.currentAssignment) {
                dict[`Grade assignment`] = () => this.grade(this.currentAssignment);
                if (this.currentAssignment.name.startsWith('Assignment 6')) {
                    dict[`Run jsLDA...`] = () => window.open(
                        'https://mimno.infosci.cornell.edu/jsLDA/jslda.html',
                        '_blank'
                    );
                }

                dict['~'] = '~';
                const submenu = {};
                this.assignments.forEach(assignment => {
                    submenu[assignment.name] = () => this.loadAssignment(assignment);
                });
                dict['Switch to...'] = submenu;
            } else {
                this.assignments.forEach(assignment => {
                    dict[`Start ${assignment.name}`] = () => this.loadAssignment(assignment);
                });
            }

            return dict;
        }

        async showResults(testResults) {
            if (!this.resultsDialog) {
                const world = this.ide.world();
                const dialog = new DialogBoxMorph().withKey('GradeAssignment');
                const frame = new ScrollFrameMorph();
                frame.acceptsDrops = false;
                frame.contents.acceptsDrops = false;
                frame.color = dialog.color;
                frame.fixLayout = nop;

                dialog.labelString = `${this.currentAssignment.name} Results`;
                dialog.createLabel();
                dialog.addBody(frame);
                dialog.addButton('ok', 'Rerun');
                dialog.addButton('cancel', 'Close');
                dialog.ok = () => this.grade(this.currentAssignment);
                dialog.cancel = () => {
                    this.resultsDialog = null;
                    DialogBoxMorph.prototype.cancel.call(dialog);
                };

                dialog.fixLayout = function () {
                    var th = fontHeight(this.titleFontSize) + this.titlePadding * 2,
                        x = 0,
                        y = 0,
                        fp;
                    this.buttons.fixLayout();
                    this.body.setPosition(this.position().add(new Point(
                        this.padding,
                        th + this.padding
                    )));
                    this.body.setExtent(new Point(
                        this.width() - this.padding * 2,
                        this.height() - this.padding * 3 - th - this.buttons.height()
                    ));
                    fp = this.body.position();
                    frame.contents.children.forEach(function (icon) {
                        icon.setPosition(fp.add(new Point(x, y)));
                        y += icon.height();
                    });
                    frame.contents.adjustBounds();
                    this.label.setCenter(this.center());
                    this.label.setTop(this.top() + (th - this.label.height()) / 2);
                    this.buttons.setCenter(this.center());
                    this.buttons.setBottom(this.bottom() - this.padding);

                    // refresh shadow
                    this.removeShadow();
                    this.addShadow();
                };

                dialog.popUp(world);
                dialog.setExtent(new Point(400, 300));
                dialog.setCenter(world.center());

                new HandleMorph(
                    dialog,
                    300,
                    280,
                    dialog.corner,
                    dialog.corner
                );
                this.resultsDialog = dialog;
            }

            const frame = this.resultsDialog.body;

            frame.contents.children = testResults.map(result => {
                // TODO: Create a test result line with either a green tick or a red x
                //const icon = new SymbolMorph('tick', 12);
                const {testCase} = result;
                let message = this.currentAssignment.testSuite.getName(testCase, result);
                // TODO: Add details on click?
                const icon = new ToggleMorph(
                    'checkbox',
                    null,
                    nop,
                    message,
                    () => result.status
                );
                const RED = SpriteMorph.prototype.blockColor.lists;
                const GREEN = SpriteMorph.prototype.blockColor.operators;
                icon.color = result.status ? GREEN : RED;
                icon.trigger = nop;
                icon.mouseClickLeft = nop;
                icon.mouseDownLeft = nop;
                icon.mouseEnter = nop;
                icon.mouseLeave = nop;
                icon.isDraggable = false;
                icon.userMenu = nop;
                return icon;
            });
            frame.contents.adjustBounds();
            this.resultsDialog.fixLayout();
        }

        async loadAssignment(assignment) {
            let message = `Would you like to start ${assignment.name}?`;

            if (this.currentAssignment) {
                const isReload = this.currentAssignment === assignment;
                message = isReload ?
                    `Would you like to reload ${assignment.name}?` :
                    `Would you like to stop working on ${this.currentAssignment.name}\n\nand switch to ${assignment.name}?`;
                
            }

            const title = `Start ${assignment.name}`;
            const confirmed = await this.ide.confirm(message, title);
            if (confirmed) {
                const xml = await assignment.fetch();
                this.ide.droppedText(xml);
                this.currentAssignment = assignment;
                if (this.resultsDialog) {
                    this.resultsDialog.destroy();
                    this.resultsDialog = null;
                }
            }
        }

        async grade(assignment) {
            const testResults = await assignment.grade();
            this.showResults(testResults);
        }
    }

    class Assignment {
        constructor(name, url, testSuite) {
            this.name = name;
            this.url = url;
            this.testSuite = testSuite;
        }

        async fetch() {
            const response = await fetch(this.url);
            return await response.text();
        }

        async grade() {
            if (!this.testSuite) {
                throw new Error(`Cannot grade ${this.name}`);
            }
            return this.testSuite.grade();
        }
    }

    class TestSuite {
        constructor(testCases) {
            this.testCases = testCases;
        }

        async grade() {
        }
    }

    class CustomBlockTestSuite extends TestSuite {
        constructor(ide, spec, testCases) {
            super(testCases);
            this.ide = ide;
            this.blockSpec = spec;
        }

        async grade() {
            const block = this.getCustomBlockDefinition(this.blockSpec);
            const evalBlock = this.evalBlock.bind(this, block);
            return await Promise.all(
                this.testCases.map(testCase => testCase.run(evalBlock))
            );
        }

        async evalBlock(definition) {
            const block = definition.blockInstance();
            const inputs = Array.prototype.slice.call(arguments, 1);
            const {threads} = this.ide.stage;
            zip(block.inputs(), inputs).forEach(pair => {
                const [input, value] = pair;
                if (value instanceof List) {
                    const valueAsBlock = value.blockify();
                    block.replaceInput(input, valueAsBlock);
                } else {
                    input.setContents(value);
                }
            });

            return new Promise((resolve, reject) => {
                const process = threads.startProcess(
                    block,
                    this.ide.stage,
                    true,
                    false,
                    resolve,
                );
                const handleError = process.handleError;
                process.handleError = function(error) {
                    reject(error);
                    return handleError.call(this, ...arguments);
                };
            });
        }

        getCustomBlockDefinition(spec) {
            return this.ide.stage.globalBlocks.find(
                block => block.spec === spec
            );
        }

        getName(testCase, result) {
            if (testCase.name) {
                return testCase.name;
            }
            // FIXME: shouldn't this be handled by the test case?
            const {inputs} = testCase;
            const spec = this.blockSpec;
            let index = 0;
            const testCaseName = BlockMorph.prototype.parseSpec(spec)
                .map(spec => {
                    const isInput = !BlockMorph.prototype.labelPart(spec);
                    if (isInput) {
                        return JSON.stringify(inputs[index++]);
                    }
                    return spec;
                })
                .join(' ');
            let displayText = `"${testCaseName}" ${testCase.description}`;
            if (!result.status && result.getFailureReason()) {
                displayText += ` (${result.getFailureReason()})`;
            }
            return displayText;
        }

    }

    class TestCase {
        constructor(inputs, testFn) {
            this.inputs = inputs;
            this.test = testFn;
            this.description = null;
        }

        async run(fn) {
            try {
                const result = await fn(...this.inputs.map(toSnap));
                if (await this.test(result)) {
                    return new TestResult(this, true);
                } else {
                    return new FailingTest(this, result, this.output);
                }
            } catch (err) {
                return new ErroredTest(this, err);
            }
        }
    }

    class ExactOutputTestCase extends TestCase {
        constructor(inputs, output) {
            super(inputs, actual => snapEquals(actual, toSnap(output)));
            this.description = `should report ${JSON.stringify(output)}`;
        }
    }

    class NamedTestCase extends TestCase {
        constructor(name, inputs, testFn) {
            super(inputs, testFn);
            this.name = name;
        }
    }

    class TestResult {
        constructor(testCase, status) {
            this.testCase = testCase;
            this.status = status;
        }

        getFailureReason() {
            return '';
        }
    }

    class FailingTest extends TestResult {
        constructor(testCase, actual, expected) {
            super(testCase, false);
            this.actual = actual;
            this.expected = expected;
        }

        getFailureReason() {
            if (this.actual !== null) {
                return `reported "${JSON.stringify(toJS(this.actual))}"`;
            } else {
                return 'did not report';
            }
        }
    }

    class ErroredTest extends TestResult {
        constructor(testCase, error) {
            super(testCase, false);
            this.error = error;
        }

        getFailureReason() {
            return 'error!';
        }
    }

    function zip() {
        const lists = new Array(...arguments);
        const len = Math.min(...lists.map(l => l.length));
        const result = [];

        for (let i = 0; i < len; i++) {
            result.push(lists.map(l => l[i]));
        }

        return result;
    }

    function toSnap(data) {
        if (Array.isArray(data)) {
            const contents = data.map(toSnap);
            return new List(contents);
        } else if (typeof data === 'object') {
            return toSnap(Object.entries(data));
        }
        return data;
    }

    function toJS(data) {
        if (data instanceof List) {
            return data.asArray().map(toJS);
        } else {
            return data;
        }
    }

    NetsBloxExtensions.register(Autograder);
})();
