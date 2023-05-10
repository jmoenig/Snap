makeGlobalObject();

SnapExtensions.primitives.set(
    'big_switch(bool)',
    loadBlocks
);

SnapExtensions.primitives.set(
    'big_scheme(fn, num)',
    function (which, num) {
        function parseNumber (n) {
            var fn = SchemeNumber.fn;
            if (!fn['number?'](n)) {
                n = '' + n;
                try {
                    return parseENotation(n) || SchemeNumber(n);
                } catch (err) {
                    return NaN;
                }
            }
            return n;
        }

        function parseENotation (n) {
            var fn = SchemeNumber.fn;

            var numbers = n.match(/^(-?\d+\.?\d*|-?\.\d+)e(-?\d+)$/i);
            if (!numbers) return null;

            var coefficient = numbers[1];
            var exponent = numbers[2];
            return fn['*'](
                coefficient,
                fn.expt('10', exponent)
            );
        }
        var fn=SchemeNumber.fn,
              number=parseNumber(num);

        switch (which) {
          case 'number?':
          case 'complex?':
            return (fn['number?'](number));
          case 'real?':
            return (fn['real?'](number) || fn['real-valued?'](number));
          case 'rational?':
            return (fn['rational?'](number) || (fn['='](number, fn.rationalize(number, parseNumber('1.0e-5')))));
          case 'integer?':
            return (fn['integer?'](number) || fn['integer-valued?'](number));
          case 'exact?':
          case 'inexact?':
          case 'finite?':
          case 'infinite?':
          case 'nan?':
          case 'real-part':
          case 'imag-part':
            return (fn[which](number));
          case 'magnitude':
            return (fn.magnitude(number));
          case 'angle':
            return (fn.angle(number));
          case 'numerator':
            return (fn.numerator(number));
          case 'denominator':
            return (fn.denominator(number));
          case 'exact':
            return (fn.exact(number));
        case 'inexact':
            return (fn.inexact(number));
        }
    }
);

function makeGlobalObject () {
    window.bigNumbers = {
        originalEvaluate: InputSlotMorph.prototype.evaluate,
        originalChangeVar: VariableFrame.prototype.changeVar,
        originalPrims: {
            reportBasicSum: Process.prototype.reportBasicSum,
            reportBasicDifference: Process.prototype.reportBasicDifference,
            reportBasicProduct: Process.prototype.reportBasicProduct,
            reportBasicQuotient: Process.prototype.reportBasicQuotient,
            reportBasicPower: Process.prototype.reportBasicPower,
            reportBasicModulus: Process.prototype.reportBasicModulus,
            reportBasicAtan2: Process.prototype.reportBasicAtan2,
            reportBasicRound: Process.prototype.reportBasicRound,
            reportBasicMin: Process.prototype.reportBasicMin,
            reportBasicMax: Process.prototype.reportBasicMax,
            reportBasicRandom: Process.prototype.reportBasicRandom,
            reportBasicLessThan: Process.prototype.reportBasicLessThan,
            reportBasicGreaterThan: Process.prototype.reportBasicGreaterThan,
            reportEquals: Process.prototype.reportEquals,
            reportIsIdentical: Process.prototype.reportIsIdentical,
            reportBasicMonadic: Process.prototype.reportBasicMonadic
        }
    };
}

function loadBlocks (useBigNums) {
    var fn = SchemeNumber.fn;
    var originalPrims = window.bigNumbers.originalPrims;
    if (useBigNums) {
        InputSlotMorph.prototype.evaluate = function () {
            var contents = this.contents();

            if (this.selectedBlock) {
                    return this.selectedBlock;
            }

            if (this.constant) {
                return this.constant;
            }
            if (this.isNumeric) {
                return parseNumber(contents.text || '0');
            }
            return contents.text;
        };
        VariableFrame.prototype.changeVar = function (name, delta, sender) {
            var frame = this.find(name),
                value,
                newValue;
            if (frame) {
                value = parseNumber(frame.vars[name].value);
                newValue = Number.isNaN(value) ? delta : fn['+'](value, parseNumber(delta));
                if (sender instanceof SpriteMorph &&
                        (frame.owner instanceof SpriteMorph) &&
                        (sender !== frame.owner)) {
                    sender.shadowVar(name, newValue);
                } else {
                    frame.vars[name].value = newValue;
                }

            }
        };
        Object.assign(Process.prototype, {
            reportBasicSum: function (a, b) {
                a = parseNumber(a);
                b = parseNumber(b);
                if (Number.isNaN(a) || Number.isNaN(b)) return NaN;
                return fn['+'](a, b);
            },
            reportBasicDifference: function (a, b) {
                a = parseNumber(a);
                b = parseNumber(b);
                if (Number.isNaN(a) || Number.isNaN(b)) return NaN;
                return fn['-'](a, b);
            },
            reportBasicProduct: function (a, b) {
                a = parseNumber(a);
                b = parseNumber(b);
                if (Number.isNaN(a) || Number.isNaN(b)) return NaN;
                return fn['*'](a, b);
            },
            reportBasicQuotient: function (a, b) {
                a = parseNumber(a);
                b = parseNumber(b);
                if (fn['='](b, '0') && !fn['='](a, '0')) {
                      return (fn['<'](a, '0') ? SchemeNumber('-inf.0') : SchemeNumber('+inf.0'))
                };
                if (Number.isNaN(a) || Number.isNaN(b) || fn['='](b, '0')) return NaN;
                return fn['/'](a, b);
            },
            reportBasicPower: function (a, b) {
                a = parseNumber(a);
                b = parseNumber(b);
                if (Number.isNaN(a) || Number.isNaN(b)) return NaN;
                return fn['expt'](a, b);
            },
            reportBasicModulus: function (a, b) {
                a = parseNumber(a);
                b = parseNumber(b);
                if (Number.isNaN(a) || Number.isNaN(b)) return NaN;
                var result = fn.mod(a, b);
                if (fn['<'](b, '0') && fn['>'](result, '0')) {
                    result = fn['+'](result, b);
                }
                return result;
            },
           reportBasicAtan2: function (a, b) {
                a = parseNumber(a);
                b = parseNumber(b);
                if (Number.isNaN(a) || Number.isNaN(b)) return NaN;
                return degrees(fn.atan2(a, b));
           },
           reportBasicRound: function (n) {
                n = parseNumber(n);
                if (Number.isNaN(n)) return NaN;
                x = fn.round(n);
                if (fn["integer?"](x)) return fn["exact"](x);
                return x;
           },
           reportBasicMin: function (a, b) {
                x = parseNumber(a);
                y = parseNumber(b);
                if (Number.isNaN(x) || Number.isNaN(y)) {
                  return a<b ? a : b;
                }
                return fn['<'](x, y) ? x : y;
            },
           reportBasicMax: function (a, b) {
                x = parseNumber(a);
                y = parseNumber(b);
                if (Number.isNaN(x) || Number.isNaN(y)) {
                  return a>b ? a : b;
                }
                return fn['>'](x, y) ? x : y;
            },
            reportBasicRandom: function (min, max) {
                var floor = parseNumber(min),
                    ceil = parseNumber(max);
                if (Number.isNaN(floor) || Number.isNaN(ceil)) return NaN;
                if (!fn['='](fn.mod(floor, '1'), '0') || !fn['='](fn.mod(ceil, '1'), '0')) {
                    // One of the numbers isn't whole. Include the decimal.
                    return fn['+'](
                        fn['*'](
                            Math.random(),
                            fn['-'](ceil, floor)
                        ),
                        floor
                    );
                }
                var size = Math.ceil(max.toString(10).length/14);
                const array = new Uint32Array(size);
                window.crypto.getRandomValues(array);
                var digits="";
                for (i=0;i<size;i++) {
                    digits = digits + array[i].toString();
               }
               return fn.floor(
                    fn['+'](
                        // fn['*'](
                         //   Math.random(),
                            fn.mod(parseNumber(digits),
                                 fn['+'](
                                     fn['-'](ceil, floor),
                                     '1'
                                 )
                             ),
                        floor
                    )
                );
            },
            reportBasicLessThan: function (a, b) {
                x = parseNumber(a);
                y = parseNumber(b);
                if (Number.isNaN(x) || Number.isNaN(y)) return a<b;
                return fn['<'](x, y);
            },
            reportBasicGreaterThan: function (a, b) {
                x = parseNumber(a);
                y = parseNumber(b);
                if (Number.isNaN(x) || Number.isNaN(y)) return a>b;
                return fn['>'](x, y);
            },
            reportEquals: function (a, b) {
                x = parseNumber(a);
                y = parseNumber(b);
                if (Number.isNaN(x) || Number.isNaN(y)) return snapEquals(a, b);
                return fn['='](x, y);
            },
            reportIsIdentical: function (a, b) {
                x = parseNumber(a);
                y = parseNumber(b);
                if (Number.isNaN(x) || Number.isNaN(y)) return originalPrims.reportIsIdentical.call(this, a, b);
                return fn['='](x, y);
            },
            reportBasicMonadic: function (fname, n) {
                n = parseNumber(n);
                if (Number.isNaN(n)) return NaN;

                switch (Process.prototype.inputOption(fname)) {
                case 'abs':
                    return fn.abs(n);
                case 'neg':
                    return fn['-'](n);
                case 'sign':
                     if (fn['='](n,SchemeNumber('0'))) return SchemeNumber('0');
                     return fn['/'](n, fn.abs(n));
                case 'ceiling':
                    return fn.ceiling(n);
                case 'floor':
                    return fn.floor(n);
                case 'sqrt':
                    return sqrt(n);
                case 'sin':
                    return fn.sin(radians(n));
                case 'cos':
                    return fn.cos(radians(n));
                case 'tan':
                    return fn.tan(radians(n));
                case 'asin':
                    return degrees(fn.asin(n));
                case 'acos':
                    return degrees(fn.acos(n));
                case 'atan':
                    return degrees(fn.atan(n));
                case 'ln':
                    return fn.log(n);
                case 'log':
                    return fn.log(n, '10');
                case 'lg':
                    return fn.log(n, '2');
                case 'e^':
                    return fn.exp(n);
                case '10^':
                    return fn.expt('10', n);
                case '2^':
                    return fn.expt('2', n);
                case 'id':
                    return n;
                default:
                    return SchemeNumber('0');
                }
            }
        });
    } else {
        InputSlotMorph.prototype.evaluate = window.bigNumbers.originalEvaluate;
        VariableFrame.prototype.changeVar = window.bigNumbers.originalChangeVar;
        Object.assign(Process.prototype, originalPrims);
    }
    // +++ done = true;
}

function parseNumber (n) {
    var fn = SchemeNumber.fn;
    if (!fn['number?'](n)) {
        n = '' + n;
        try {
            return parseENotation(n) || SchemeNumber(n);
        } catch (err) {
            return NaN;
        }
    }
    return n;
}

function parseENotation (n) {
    var fn = SchemeNumber.fn;

    var numbers = n.match(/^(-?\d+\.?\d*|-?\.\d+)e(-?\d+)$/i);
    if (!numbers) return null;

    var coefficient = numbers[1];
    var exponent = numbers[2];
    return fn['*'](
        coefficient,
        fn.expt('10', exponent)
    );
}

function sqrt (n) {
    var fn = SchemeNumber.fn;

    if (!fn['exact?'](n) || !fn['rational?'](n) || fn['<'](n,'0')) return fn.sqrt(n);

    var rootNumerator = fn['exact-integer-sqrt'](fn.numerator(n));
    if (!fn['='](rootNumerator[1], '0')) return fn.sqrt(n);

    var rootDenominator = fn['exact-integer-sqrt'](fn.denominator(n));
    if (!fn['='](rootDenominator[1], '0')) return fn.sqrt(n);

    return fn['/'](rootNumerator[0], rootDenominator[0]);
}

