var tmImage =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/autobind-decorator/lib/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/autobind-decorator/lib/esm/index.js ***!
  \**********************************************************/
/*! exports provided: boundMethod, boundClass, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundMethod", function() { return boundMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundClass", function() { return boundClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return autobind; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new TypeError("@boundMethod decorator can only be applied to methods not: ".concat(_typeof(fn)));
  } // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.


  var definingProperty = false;
  return {
    configurable: true,
    get: function get() {
      // eslint-disable-next-line no-prototype-builtins
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
        return fn;
      }

      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get: function get() {
          return boundFn;
        },
        set: function set(value) {
          fn = value;
          delete this[key];
        }
      });
      definingProperty = false;
      return boundFn;
    },
    set: function set(value) {
      fn = value;
    }
  };
}
/**
 * Use boundMethod to bind all methods on the target.prototype
 */

function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys; // Use Reflect if exists

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype); // Use symbols if support is provided

    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key); // Only methods need binding

    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}
function autobind() {
  if (arguments.length === 1) {
    return boundClass.apply(void 0, arguments);
  }

  return boundMethod.apply(void 0, arguments);
}

/***/ }),

/***/ "./node_modules/seedrandom/index.js":
/*!******************************************!*\
  !*** ./node_modules/seedrandom/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(/*! ./lib/alea */ "./node_modules/seedrandom/lib/alea.js");

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(/*! ./lib/xor128 */ "./node_modules/seedrandom/lib/xor128.js");

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(/*! ./lib/xorwow */ "./node_modules/seedrandom/lib/xorwow.js");

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(/*! ./lib/xorshift7 */ "./node_modules/seedrandom/lib/xorshift7.js");

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(/*! ./lib/xor4096 */ "./node_modules/seedrandom/lib/xor4096.js");

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(/*! ./lib/tychei */ "./node_modules/seedrandom/lib/tychei.js");

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(/*! ./seedrandom */ "./node_modules/seedrandom/seedrandom.js");

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),

/***/ "./node_modules/seedrandom/lib/alea.js":
/*!*********************************************!*\
  !*** ./node_modules/seedrandom/lib/alea.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = data.toString();
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/tychei.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/tychei.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor128.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xor128.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor4096.js":
/*!************************************************!*\
  !*** ./node_modules/seedrandom/lib/xor4096.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorshift7.js":
/*!**************************************************!*\
  !*** ./node_modules/seedrandom/lib/xorshift7.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorwow.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xorwow.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/seedrandom.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/seedrandom.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

// Detect the global object, even if operating in strict mode.
// http://stackoverflow.com/a/14387057/265298
var global = (0, eval)('this'),
    width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ( true && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(/*! crypto */ 0);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return seedrandom; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// End anonymous scope, and pass initial values.
})(
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/custom-mobilenet.ts":
/*!*********************************!*\
  !*** ./src/custom-mobilenet.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFromFiles = exports.load = exports.loadTruncatedMobileNet = exports.CustomMobileNet = exports.getTopKClasses = exports.IMAGE_SIZE = void 0;
var tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var tfjs_1 = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var tf_1 = __webpack_require__(/*! ./utils/tf */ "./src/utils/tf.ts");
var canvas_1 = __webpack_require__(/*! ./utils/canvas */ "./src/utils/canvas.ts");
var version_1 = __webpack_require__(/*! ./version */ "./src/version.ts");
var DEFAULT_MOBILENET_VERSION = 1;
var DEFAULT_TRAINING_LAYER_V1 = 'conv_pw_13_relu';
var DEFAULT_TRAINING_LAYER_V2 = "out_relu";
var DEFAULT_ALPHA_V1 = 0.25;
var DEFAULT_ALPHA_V2 = 0.35;
exports.IMAGE_SIZE = 224;
/**
 * Receives a Metadata object and fills in the optional fields such as timeStamp
 * @param data a Metadata object
 */
var fillMetadata = function (data) {
    // util.assert(typeof data.tfjsVersion === 'string', () => `metadata.tfjsVersion is invalid`);
    data.packageVersion = data.packageVersion || version_1.version;
    data.packageName = data.packageName || '@teachablemachine/image';
    data.timeStamp = data.timeStamp || new Date().toISOString();
    data.userMetadata = data.userMetadata || {};
    data.modelName = data.modelName || 'untitled';
    data.labels = data.labels || [];
    data.imageSize = data.imageSize || exports.IMAGE_SIZE;
    return data;
};
// tslint:disable-next-line:no-any
var isMetadata = function (c) {
    return !!c && Array.isArray(c.labels);
};
var isAlphaValid = function (version, alpha) {
    if (version === 1) {
        if (alpha !== 0.25 && alpha !== 0.5 && alpha !== 0.75 && alpha !== 1) {
            console.warn("Invalid alpha. Options are: 0.25, 0.50, 0.75 or 1.00.");
            console.log("Loading model with alpha: ", DEFAULT_ALPHA_V1.toFixed(2));
            return DEFAULT_ALPHA_V1;
        }
    }
    else {
        if (alpha !== 0.35 && alpha !== 0.5 && alpha !== 0.75 && alpha !== 1) {
            console.warn("Invalid alpha. Options are: 0.35, 0.50, 0.75 or 1.00.");
            console.log("Loading model with alpha: ", DEFAULT_ALPHA_V2.toFixed(2));
            return DEFAULT_ALPHA_V2;
        }
    }
    return alpha;
};
var parseModelOptions = function (options) {
    options = options || {};
    if (options.checkpointUrl && options.trainingLayer) {
        if (options.alpha || options.version) {
            console.warn("Checkpoint URL passed to modelOptions, alpha options are ignored");
        }
        return [options.checkpointUrl, options.trainingLayer];
    }
    else {
        options.version = options.version || DEFAULT_MOBILENET_VERSION;
        if (options.version === 1) {
            options.alpha = options.alpha || DEFAULT_ALPHA_V1;
            options.alpha = isAlphaValid(options.version, options.alpha);
            console.log("Loading mobilenet " + options.version + " and alpha " + options.alpha);
            // exception is alpha of 1 can only be 1.0
            var alphaString = options.alpha.toFixed(2);
            if (alphaString === "1.00") {
                alphaString = "1.0";
            }
            return [
                // tslint:disable-next-line:max-line-length        
                "https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_" + alphaString + "_" + exports.IMAGE_SIZE + "/model.json",
                DEFAULT_TRAINING_LAYER_V1
            ];
        }
        else if (options.version === 2) {
            options.alpha = options.alpha || DEFAULT_ALPHA_V2;
            options.alpha = isAlphaValid(options.version, options.alpha);
            console.log("Loading mobilenet " + options.version + " and alpha " + options.alpha);
            return [
                // tslint:disable-next-line:max-line-length        
                "https://storage.googleapis.com/teachable-machine-models/mobilenet_v2_weights_tf_dim_ordering_tf_kernels_" + options.alpha.toFixed(2) + "_" + exports.IMAGE_SIZE + "_no_top/model.json",
                DEFAULT_TRAINING_LAYER_V2
            ];
        }
        else {
            throw new Error("MobileNet V" + options.version + " doesn't exist");
        }
    }
};
/**
 * process either a URL string or a Metadata object
 * @param metadata a url to load metadata or a Metadata object
 */
var processMetadata = function (metadata) { return __awaiter(void 0, void 0, void 0, function () {
    var metadataJSON, metadataResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(typeof metadata === 'string')) return [3 /*break*/, 3];
                return [4 /*yield*/, fetch(metadata)];
            case 1:
                metadataResponse = _a.sent();
                return [4 /*yield*/, metadataResponse.json()];
            case 2:
                metadataJSON = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                if (isMetadata(metadata)) {
                    metadataJSON = metadata;
                }
                else {
                    throw new Error('Invalid Metadata provided');
                }
                _a.label = 4;
            case 4: return [2 /*return*/, fillMetadata(metadataJSON)];
        }
    });
}); };
/**
 * Computes the probabilities of the topK classes given logits by computing
 * softmax to get probabilities and then sorting the probabilities.
 * @param logits Tensor representing the logits from MobileNet.
 * @param topK The number of top predictions to show.
 */
function getTopKClasses(labels, logits, topK) {
    if (topK === void 0) { topK = 3; }
    return __awaiter(this, void 0, void 0, function () {
        var values;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logits.data()];
                case 1:
                    values = _a.sent();
                    return [2 /*return*/, tf.tidy(function () {
                            topK = Math.min(topK, values.length);
                            var valuesAndIndices = [];
                            for (var i = 0; i < values.length; i++) {
                                valuesAndIndices.push({ value: values[i], index: i });
                            }
                            valuesAndIndices.sort(function (a, b) {
                                return b.value - a.value;
                            });
                            var topkValues = new Float32Array(topK);
                            var topkIndices = new Int32Array(topK);
                            for (var i = 0; i < topK; i++) {
                                topkValues[i] = valuesAndIndices[i].value;
                                topkIndices[i] = valuesAndIndices[i].index;
                            }
                            var topClassesAndProbs = [];
                            for (var i = 0; i < topkIndices.length; i++) {
                                topClassesAndProbs.push({
                                    className: labels[topkIndices[i]],
                                    probability: topkValues[i]
                                });
                            }
                            return topClassesAndProbs;
                        })];
            }
        });
    });
}
exports.getTopKClasses = getTopKClasses;
var CustomMobileNet = /** @class */ (function () {
    function CustomMobileNet(model, metadata) {
        this.model = model;
        this._metadata = fillMetadata(metadata);
    }
    Object.defineProperty(CustomMobileNet, "EXPECTED_IMAGE_SIZE", {
        get: function () {
            return exports.IMAGE_SIZE;
        },
        enumerable: false,
        configurable: true
    });
    CustomMobileNet.prototype.getMetadata = function () {
        return this._metadata;
    };
    /**
     * get the total number of classes existing within model
     */
    CustomMobileNet.prototype.getTotalClasses = function () {
        var output = this.model.output;
        var totalClasses = output.shape[1];
        return totalClasses;
    };
    /**
     * get the model labels
     */
    CustomMobileNet.prototype.getClassLabels = function () {
        return this._metadata.labels;
    };
    /**
     * Given an image element, makes a prediction through mobilenet returning the
     * probabilities of the top K classes.
     * @param image the image to classify
     * @param maxPredictions the maximum number of classification predictions
     */
    CustomMobileNet.prototype.predictTopK = function (image, maxPredictions, flipped) {
        if (maxPredictions === void 0) { maxPredictions = 10; }
        if (flipped === void 0) { flipped = false; }
        return __awaiter(this, void 0, void 0, function () {
            var croppedImage, logits, classes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        croppedImage = canvas_1.cropTo(image, this._metadata.imageSize, flipped);
                        logits = tf.tidy(function () {
                            var captured = tf_1.capture(croppedImage, _this._metadata.grayscale);
                            return _this.model.predict(captured);
                        });
                        return [4 /*yield*/, getTopKClasses(this._metadata.labels, logits, maxPredictions)];
                    case 1:
                        classes = _a.sent();
                        tfjs_1.dispose(logits);
                        return [2 /*return*/, classes];
                }
            });
        });
    };
    /**
     * Given an image element, makes a prediction through mobilenet returning the
     * probabilities for ALL classes.
     * @param image the image to classify
     * @param flipped whether to flip the image on X
     */
    CustomMobileNet.prototype.predict = function (image, flipped) {
        if (flipped === void 0) { flipped = false; }
        return __awaiter(this, void 0, void 0, function () {
            var croppedImage, logits, values, classes, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        croppedImage = canvas_1.cropTo(image, this._metadata.imageSize, flipped);
                        logits = tf.tidy(function () {
                            var captured = tf_1.capture(croppedImage, _this._metadata.grayscale);
                            return _this.model.predict(captured);
                        });
                        return [4 /*yield*/, logits.data()];
                    case 1:
                        values = _a.sent();
                        classes = [];
                        for (i = 0; i < values.length; i++) {
                            classes.push({
                                className: this._metadata.labels[i],
                                probability: values[i]
                            });
                        }
                        tfjs_1.dispose(logits);
                        return [2 /*return*/, classes];
                }
            });
        });
    };
    CustomMobileNet.prototype.dispose = function () {
        this.truncatedModel.dispose();
    };
    return CustomMobileNet;
}());
exports.CustomMobileNet = CustomMobileNet;
/**
 * load the base mobilenet model
 * @param modelOptions options determining what model to load
 */
function loadTruncatedMobileNet(modelOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, checkpointUrl, trainingLayer, mobilenet, layer, truncatedModel, model, layer, truncatedModel, model;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = parseModelOptions(modelOptions), checkpointUrl = _a[0], trainingLayer = _a[1];
                    return [4 /*yield*/, tf.loadLayersModel(checkpointUrl)];
                case 1:
                    mobilenet = _b.sent();
                    if (modelOptions && modelOptions.version === 1) {
                        layer = mobilenet.getLayer(trainingLayer);
                        truncatedModel = tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
                        model = tf.sequential();
                        model.add(truncatedModel);
                        model.add(tf.layers.flatten());
                        return [2 /*return*/, model];
                    }
                    else {
                        layer = mobilenet.getLayer(trainingLayer);
                        truncatedModel = tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
                        model = tf.sequential();
                        model.add(truncatedModel);
                        model.add(tf.layers.globalAveragePooling2d({})); // go from shape [7, 7, 1280] to [1280]
                        return [2 /*return*/, model];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.loadTruncatedMobileNet = loadTruncatedMobileNet;
function load(model, metadata) {
    return __awaiter(this, void 0, void 0, function () {
        var customModel, metadataJSON, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, tf.loadLayersModel(model)];
                case 1:
                    customModel = _b.sent();
                    if (!metadata) return [3 /*break*/, 3];
                    return [4 /*yield*/, processMetadata(metadata)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = null;
                    _b.label = 4;
                case 4:
                    metadataJSON = _a;
                    return [2 /*return*/, new CustomMobileNet(customModel, metadataJSON)];
            }
        });
    });
}
exports.load = load;
function loadFromFiles(model, weights, metadata) {
    return __awaiter(this, void 0, void 0, function () {
        var customModel, metadataFile, metadataJSON, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, tf.loadLayersModel(tf.io.browserFiles([model, weights]))];
                case 1:
                    customModel = _b.sent();
                    return [4 /*yield*/, new Response(metadata).json()];
                case 2:
                    metadataFile = _b.sent();
                    if (!metadata) return [3 /*break*/, 4];
                    return [4 /*yield*/, processMetadata(metadataFile)];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = null;
                    _b.label = 5;
                case 5:
                    metadataJSON = _a;
                    return [2 /*return*/, new CustomMobileNet(customModel, metadataJSON)];
            }
        });
    });
}
exports.loadFromFiles = loadFromFiles;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var custom_mobilenet_1 = __webpack_require__(/*! ./custom-mobilenet */ "./src/custom-mobilenet.ts");
Object.defineProperty(exports, "IMAGE_SIZE", { enumerable: true, get: function () { return custom_mobilenet_1.IMAGE_SIZE; } });
Object.defineProperty(exports, "CustomMobileNet", { enumerable: true, get: function () { return custom_mobilenet_1.CustomMobileNet; } });
Object.defineProperty(exports, "load", { enumerable: true, get: function () { return custom_mobilenet_1.load; } });
Object.defineProperty(exports, "loadFromFiles", { enumerable: true, get: function () { return custom_mobilenet_1.loadFromFiles; } });
Object.defineProperty(exports, "loadTruncatedMobileNet", { enumerable: true, get: function () { return custom_mobilenet_1.loadTruncatedMobileNet; } });
var teachable_mobilenet_1 = __webpack_require__(/*! ./teachable-mobilenet */ "./src/teachable-mobilenet.ts");
Object.defineProperty(exports, "TeachableMobileNet", { enumerable: true, get: function () { return teachable_mobilenet_1.TeachableMobileNet; } });
Object.defineProperty(exports, "createTeachable", { enumerable: true, get: function () { return teachable_mobilenet_1.createTeachable; } });
var webcam_1 = __webpack_require__(/*! ./utils/webcam */ "./src/utils/webcam.ts");
Object.defineProperty(exports, "Webcam", { enumerable: true, get: function () { return webcam_1.Webcam; } });
var version_1 = __webpack_require__(/*! ./version */ "./src/version.ts");
Object.defineProperty(exports, "version", { enumerable: true, get: function () { return version_1.version; } });


/***/ }),

/***/ "./src/teachable-mobilenet.ts":
/*!************************************!*\
  !*** ./src/teachable-mobilenet.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeachable = exports.TeachableMobileNet = void 0;
var tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var tfjs_1 = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
var tf_1 = __webpack_require__(/*! ./utils/tf */ "./src/utils/tf.ts");
var custom_mobilenet_1 = __webpack_require__(/*! ./custom-mobilenet */ "./src/custom-mobilenet.ts");
var seedrandom = __webpack_require__(/*! seedrandom */ "./node_modules/seedrandom/index.js");
var VALIDATION_FRACTION = 0.15;
// tslint:disable-next-line:no-any
var isTensor = function (c) {
    return typeof c.dataId === 'object' && typeof c.shape === 'object';
};
/**
 * Converts an integer into its one-hot representation and returns
 * the data as a JS Array.
 */
function flatOneHot(label, numClasses) {
    var labelOneHot = new Array(numClasses).fill(0);
    labelOneHot[label] = 1;
    return labelOneHot;
}
/**
 * Shuffle an array of Float32Array or Samples using Fisher-Yates algorithm
 * Takes an optional seed value to make shuffling predictable
 */
function fisherYates(array, seed) {
    var _a;
    var length = array.length;
    // need to clone array or we'd be editing original as we goo
    var shuffled = array.slice();
    for (var i = (length - 1); i > 0; i -= 1) {
        var randomIndex = void 0;
        if (seed) {
            randomIndex = Math.floor(seed() * (i + 1));
        }
        else {
            randomIndex = Math.floor(Math.random() * (i + 1));
        }
        _a = [shuffled[randomIndex], shuffled[i]], shuffled[i] = _a[0], shuffled[randomIndex] = _a[1];
    }
    return shuffled;
}
var TeachableMobileNet = /** @class */ (function (_super) {
    __extends(TeachableMobileNet, _super);
    function TeachableMobileNet(truncated, metadata) {
        var _this = _super.call(this, tf.sequential(), metadata) || this;
        // private __stopTrainingReject: (error: Error) => void;
        // Number of total samples
        _this.totalSamples = 0;
        // Array of all the examples collected
        _this.examples = [];
        // the provided model is the truncated mobilenet
        _this.truncatedModel = truncated;
        return _this;
    }
    Object.defineProperty(TeachableMobileNet.prototype, "asSequentialModel", {
        get: function () {
            return this.model;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TeachableMobileNet.prototype, "isTrained", {
        /**
         * has the teachable model been trained?
         */
        get: function () {
            return !!this.model && this.model.layers && this.model.layers.length > 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TeachableMobileNet.prototype, "isPrepared", {
        /**
         * has the dataset been prepared with all labels and samples processed?
         */
        get: function () {
            return !!this.trainDataset;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TeachableMobileNet.prototype, "numClasses", {
        /**
         * how many classes are in the dataset?
         */
        get: function () {
            return this._metadata.labels.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Add a sample of data under the provided className
     * @param className the classification this example belongs to
     * @param sample the image / tensor that belongs in this classification
     */
    // public async addExample(className: number, sample: HTMLCanvasElement | tf.Tensor) {
    TeachableMobileNet.prototype.addExample = function (className, sample) {
        return __awaiter(this, void 0, void 0, function () {
            var cap, example, activation;
            return __generator(this, function (_a) {
                cap = isTensor(sample) ? sample : tf_1.capture(sample, this._metadata.grayscale);
                example = this.truncatedModel.predict(cap);
                activation = example.dataSync();
                cap.dispose();
                example.dispose();
                // save samples of each class separately
                this.examples[className].push(activation);
                // increase our sample counter
                this.totalSamples++;
                return [2 /*return*/];
            });
        });
    };
    /**
     * Classify an input image / Tensor with your trained model. Return all results.
     * @param image the input image / Tensor to classify against your model
     * @param topK how many of the top results do you want? defautls to 3
     */
    TeachableMobileNet.prototype.predict = function (image, flipped) {
        if (flipped === void 0) { flipped = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.model) {
                    throw new Error('Model has not been trained yet, called train() first');
                }
                return [2 /*return*/, _super.prototype.predict.call(this, image, flipped)];
            });
        });
    };
    /**
     * Classify an input image / Tensor with your trained model. Return topK results
     * @param image the input image / Tensor to classify against your model
     * @param maxPredictions how many of the top results do you want? defautls to 3
     * @param flipped whether to flip an image
     */
    TeachableMobileNet.prototype.predictTopK = function (image, maxPredictions, flipped) {
        if (maxPredictions === void 0) { maxPredictions = 10; }
        if (flipped === void 0) { flipped = false; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.model) {
                    throw new Error('Model has not been trained yet, called train() first');
                }
                return [2 /*return*/, _super.prototype.predictTopK.call(this, image, maxPredictions, flipped)];
            });
        });
    };
    /**
     * process the current examples provided to calculate labels and format
     * into proper tf.data.Dataset
     */
    TeachableMobileNet.prototype.prepare = function () {
        for (var classes in this.examples) {
            if (classes.length === 0) {
                throw new Error('Add some examples before training');
            }
        }
        var datasets = this.convertToTfDataset();
        this.trainDataset = datasets.trainDataset;
        this.validationDataset = datasets.validationDataset;
    };
    /**
     * Process the examples by first shuffling randomly per class, then adding
     * one-hot labels, then splitting into training/validation datsets, and finally
     * sorting one last time
     */
    TeachableMobileNet.prototype.convertToTfDataset = function () {
        // first shuffle each class individually
        // TODO: we could basically replicate this by insterting randomly
        for (var i = 0; i < this.examples.length; i++) {
            this.examples[i] = fisherYates(this.examples[i], this.seed);
        }
        // then break into validation and test datasets
        var trainDataset = [];
        var validationDataset = [];
        var _loop_1 = function (i) {
            var y = flatOneHot(i, this_1.numClasses);
            var classLength = this_1.examples[i].length;
            var numValidation = Math.ceil(VALIDATION_FRACTION * classLength);
            var numTrain = classLength - numValidation;
            var classTrain = this_1.examples[i].slice(0, numTrain).map(function (dataArray) {
                return { data: dataArray, label: y };
            });
            var classValidation = this_1.examples[i].slice(numTrain).map(function (dataArray) {
                return { data: dataArray, label: y };
            });
            trainDataset = trainDataset.concat(classTrain);
            validationDataset = validationDataset.concat(classValidation);
        };
        var this_1 = this;
        // for each class, add samples to train and validation dataset
        for (var i = 0; i < this.examples.length; i++) {
            _loop_1(i);
        }
        // finally shuffle both train and validation datasets
        trainDataset = fisherYates(trainDataset, this.seed);
        validationDataset = fisherYates(validationDataset, this.seed);
        var trainX = tf.data.array(trainDataset.map(function (sample) { return sample.data; }));
        var validationX = tf.data.array(validationDataset.map(function (sample) { return sample.data; }));
        var trainY = tf.data.array(trainDataset.map(function (sample) { return sample.label; }));
        var validationY = tf.data.array(validationDataset.map(function (sample) { return sample.label; }));
        // return tf.data dataset objects
        return {
            trainDataset: tf.data.zip({ xs: trainX, ys: trainY }),
            validationDataset: tf.data.zip({ xs: validationX, ys: validationY })
        };
    };
    /**
     * Saving `model`'s topology and weights as two files
     * (`my-model-1.json` and `my-model-1.weights.bin`) as well as
     * a `metadata.json` file containing metadata such as text labels to be
     * downloaded from browser.
     * @param handlerOrURL An instance of `IOHandler` or a URL-like,
     * scheme-based string shortcut for `IOHandler`.
     * @param config Options for saving the model.
     * @returns A `Promise` of `SaveResult`, which summarizes the result of
     * the saving, such as byte sizes of the saved artifacts for the model's
     *   topology and weight values.
     */
    TeachableMobileNet.prototype.save = function (handlerOrURL, config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.model.save(handlerOrURL, config)];
            });
        });
    };
    /**
     * Train your data into a new model and join it with mobilenet
     * @param params the parameters for the model / training
     * @param callbacks provide callbacks to receive training events
     */
    TeachableMobileNet.prototype.train = function (params, callbacks) {
        if (callbacks === void 0) { callbacks = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var originalOnTrainEnd, numLabels, inputShape, inputSize, varianceScaling, optimizer, trainData, validationData, history, jointModel;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        originalOnTrainEnd = callbacks.onTrainEnd || (function () { });
                        callbacks.onTrainEnd = function (logs) {
                            if (_this.__stopTrainingResolve) {
                                _this.__stopTrainingResolve();
                                _this.__stopTrainingResolve = null;
                            }
                            originalOnTrainEnd(logs);
                        };
                        // Rest of trian function
                        if (!this.isPrepared) {
                            this.prepare();
                        }
                        numLabels = this.getLabels().length;
                        tfjs_1.util.assert(numLabels === this.numClasses, function () { return "Can not train, has " + numLabels + " labels and " + _this.numClasses + " classes"; });
                        inputShape = this.truncatedModel.outputs[0].shape.slice(1);
                        inputSize = tf.util.sizeFromShape(inputShape);
                        if (this.seed) {
                            varianceScaling = tf.initializers.varianceScaling({ seed: 3.14 });
                        }
                        else {
                            varianceScaling = tf.initializers.varianceScaling({});
                        }
                        this.trainingModel = tf.sequential({
                            layers: [
                                tf.layers.dense({
                                    inputShape: [inputSize],
                                    units: params.denseUnits,
                                    activation: 'relu',
                                    kernelInitializer: varianceScaling,
                                    useBias: true
                                }),
                                tf.layers.dense({
                                    kernelInitializer: varianceScaling,
                                    useBias: false,
                                    activation: 'softmax',
                                    units: this.numClasses
                                })
                            ]
                        });
                        optimizer = tf.train.adam(params.learningRate);
                        // const optimizer = tf.train.rmsprop(params.learningRate);
                        this.trainingModel.compile({
                            optimizer: optimizer,
                            // loss: 'binaryCrossentropy',
                            loss: 'categoricalCrossentropy',
                            metrics: ['accuracy']
                        });
                        if (!(params.batchSize > 0)) {
                            throw new Error("Batch size is 0 or NaN. Please choose a non-zero fraction");
                        }
                        trainData = this.trainDataset.batch(params.batchSize);
                        validationData = this.validationDataset.batch(params.batchSize);
                        return [4 /*yield*/, this.trainingModel.fitDataset(trainData, {
                                epochs: params.epochs,
                                validationData: validationData,
                                callbacks: callbacks
                            })];
                    case 1:
                        history = _a.sent();
                        jointModel = tf.sequential();
                        jointModel.add(this.truncatedModel);
                        jointModel.add(this.trainingModel);
                        this.model = jointModel;
                        optimizer.dispose(); // cleanup of memory
                        return [2 /*return*/, this.model];
                }
            });
        });
    };
    /*
     * Setup the exampls array to hold samples per class
     */
    TeachableMobileNet.prototype.prepareDataset = function () {
        for (var i = 0; i < this.numClasses; i++) {
            this.examples[i] = [];
        }
    };
    TeachableMobileNet.prototype.setLabel = function (index, label) {
        this._metadata.labels[index] = label;
    };
    TeachableMobileNet.prototype.setLabels = function (labels) {
        this._metadata.labels = labels;
        this.prepareDataset();
    };
    TeachableMobileNet.prototype.getLabel = function (index) {
        return this._metadata.labels[index];
    };
    TeachableMobileNet.prototype.getLabels = function () {
        return this._metadata.labels;
    };
    TeachableMobileNet.prototype.setName = function (name) {
        this._metadata.modelName = name;
    };
    TeachableMobileNet.prototype.getName = function () {
        return this._metadata.modelName;
    };
    TeachableMobileNet.prototype.stopTraining = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.trainingModel.stopTraining = true;
            _this.__stopTrainingResolve = resolve;
            // this.__stopTrainingReject = reject;
        });
        return promise;
    };
    TeachableMobileNet.prototype.dispose = function () {
        this.trainingModel.dispose();
        _super.prototype.dispose.call(this);
    };
    /*
     * Calculate each class accuracy using the validation dataset
     */
    TeachableMobileNet.prototype.calculateAccuracyPerClass = function () {
        return __awaiter(this, void 0, void 0, function () {
            var validationXs, validationYs, batchSize, iterations, batchesX, batchesY, itX, itY, allX, allY, i, batchedXTensor, batchedXPredictionTensor, argMaxX, batchedYTensor, argMaxY, reference, predictions, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validationXs = this.validationDataset.mapAsync(function (dataset) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dataset.xs];
                            });
                        }); });
                        validationYs = this.validationDataset.mapAsync(function (dataset) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, dataset.ys];
                            });
                        }); });
                        batchSize = Math.min(validationYs.size, 32);
                        iterations = Math.ceil(validationYs.size / batchSize);
                        batchesX = validationXs.batch(batchSize);
                        batchesY = validationYs.batch(batchSize);
                        return [4 /*yield*/, batchesX.iterator()];
                    case 1:
                        itX = _a.sent();
                        return [4 /*yield*/, batchesY.iterator()];
                    case 2:
                        itY = _a.sent();
                        allX = [];
                        allY = [];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < iterations)) return [3 /*break*/, 7];
                        return [4 /*yield*/, itX.next()];
                    case 4:
                        batchedXTensor = _a.sent();
                        batchedXPredictionTensor = this.trainingModel.predict(batchedXTensor.value);
                        argMaxX = batchedXPredictionTensor.argMax(1);
                        allX.push(argMaxX);
                        return [4 /*yield*/, itY.next()];
                    case 5:
                        batchedYTensor = _a.sent();
                        argMaxY = batchedYTensor.value.argMax(1);
                        allY.push(argMaxY);
                        // 3. dispose of all our tensors
                        batchedXTensor.value.dispose();
                        batchedXPredictionTensor.dispose();
                        batchedYTensor.value.dispose();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7:
                        reference = tf.concat(allY);
                        predictions = tf.concat(allX);
                        // only if we concatenated more than one tensor for preference and reference
                        if (iterations !== 1) {
                            for (i = 0; i < allX.length; i++) {
                                allX[i].dispose();
                                allY[i].dispose();
                            }
                        }
                        return [2 /*return*/, { reference: reference, predictions: predictions }];
                }
            });
        });
    };
    /*
     * optional seed for predictable shuffling of dataset
     */
    TeachableMobileNet.prototype.setSeed = function (seed) {
        this.seed = seedrandom(seed);
    };
    return TeachableMobileNet;
}(custom_mobilenet_1.CustomMobileNet));
exports.TeachableMobileNet = TeachableMobileNet;
function createTeachable(metadata, modelOptions) {
    return __awaiter(this, void 0, void 0, function () {
        var mobilenet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, custom_mobilenet_1.loadTruncatedMobileNet(modelOptions)];
                case 1:
                    mobilenet = _a.sent();
                    return [2 /*return*/, new TeachableMobileNet(mobilenet, metadata)];
            }
        });
    });
}
exports.createTeachable = createTeachable;


/***/ }),

/***/ "./src/utils/canvas.ts":
/*!*****************************!*\
  !*** ./src/utils/canvas.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropTo = exports.resizeMinTo = exports.resizeMaxTo = exports.resize = void 0;
var newCanvas = function () { return document.createElement('canvas'); };
function resize(image, scale, canvas) {
    if (canvas === void 0) { canvas = newCanvas(); }
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas;
}
exports.resize = resize;
function resizeMaxTo(image, maxSize, canvas) {
    if (canvas === void 0) { canvas = newCanvas(); }
    var max = Math.max(image.width, image.height);
    return resize(image, maxSize / max, canvas);
}
exports.resizeMaxTo = resizeMaxTo;
function resizeMinTo(image, minSize, canvas) {
    if (canvas === void 0) { canvas = newCanvas(); }
    var min = Math.min(image.width, image.height);
    return resize(image, minSize / min, canvas);
}
exports.resizeMinTo = resizeMinTo;
function cropTo(image, size, flipped, canvas) {
    if (flipped === void 0) { flipped = false; }
    if (canvas === void 0) { canvas = newCanvas(); }
    // image image, bitmap, or canvas
    var width = image.width;
    var height = image.height;
    // if video element
    if (image instanceof HTMLVideoElement) {
        width = image.videoWidth;
        height = image.videoHeight;
    }
    var min = Math.min(width, height);
    var scale = size / min;
    var scaledW = Math.ceil(width * scale);
    var scaledH = Math.ceil(height * scale);
    var dx = scaledW - size;
    var dy = scaledH - size;
    canvas.width = canvas.height = size;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, ~~(dx / 2) * -1, ~~(dy / 2) * -1, scaledW, scaledH);
    // canvas is already sized and cropped to center correctly
    if (flipped) {
        ctx.scale(-1, 1);
        ctx.drawImage(canvas, size * -1, 0);
    }
    return canvas;
}
exports.cropTo = cropTo;


/***/ }),

/***/ "./src/utils/tf.ts":
/*!*************************!*\
  !*** ./src/utils/tf.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropTensor = exports.capture = void 0;
var tf = __webpack_require__(/*! @tensorflow/tfjs */ "@tensorflow/tfjs");
/**
 * Receives an image and normalizes it between -1 and 1.
 * Returns a batched image (1 - element batch) of shape [1, w, h, c]
 * @param rasterElement the element with pixels to convert to a Tensor
 * @param grayscale optinal flag that changes the crop to [1, w, h, 1]
 */
function capture(rasterElement, grayscale) {
    return tf.tidy(function () {
        var pixels = tf.browser.fromPixels(rasterElement);
        // crop the image so we're using the center square
        var cropped = cropTensor(pixels, grayscale);
        // Expand the outer most dimension so we have a batch size of 1
        var batchedImage = cropped.expandDims(0);
        // Normalize the image between -1 and a1. The image comes in between 0-255
        // so we divide by 127 and subtract 1.
        return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });
}
exports.capture = capture;
function cropTensor(img, grayscaleModel, grayscaleInput) {
    var size = Math.min(img.shape[0], img.shape[1]);
    var centerHeight = img.shape[0] / 2;
    var beginHeight = centerHeight - (size / 2);
    var centerWidth = img.shape[1] / 2;
    var beginWidth = centerWidth - (size / 2);
    if (grayscaleModel && !grayscaleInput) {
        //cropped rgb data
        var grayscale_cropped = img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
        grayscale_cropped = grayscale_cropped.reshape([size * size, 1, 3]);
        var rgb_weights = [0.2989, 0.5870, 0.1140];
        grayscale_cropped = tf.mul(grayscale_cropped, rgb_weights);
        grayscale_cropped = grayscale_cropped.reshape([size, size, 3]);
        grayscale_cropped = tf.sum(grayscale_cropped, -1);
        grayscale_cropped = tf.expandDims(grayscale_cropped, -1);
        return grayscale_cropped;
    }
    return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}
exports.cropTensor = cropTensor;


/***/ }),

/***/ "./src/utils/webcam.ts":
/*!*****************************!*\
  !*** ./src/utils/webcam.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webcam = void 0;
var autobind_decorator_1 = __webpack_require__(/*! autobind-decorator */ "./node_modules/autobind-decorator/lib/esm/index.js");
var canvas_1 = __webpack_require__(/*! ./canvas */ "./src/utils/canvas.ts");
var defaultVideoOptions = {
    facingMode: 'user',
    frameRate: 24
};
var fillConstraints = function (options) {
    options.facingMode = options.facingMode || defaultVideoOptions.facingMode;
    options.frameRate = options.frameRate || defaultVideoOptions.frameRate;
    options.aspectRatio = options.aspectRatio || defaultVideoOptions.aspectRatio;
    return options;
};
var Webcam = /** @class */ (function () {
    function Webcam(width, height, flip) {
        if (width === void 0) { width = 400; }
        if (height === void 0) { height = 400; }
        if (flip === void 0) { flip = false; }
        this.width = width;
        this.height = height;
        this.flip = flip;
    }
    Webcam.prototype.getWebcam = function (options) {
        if (options === void 0) { options = {}; }
        if (!window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
            return Promise.reject('Your browser does not support WebRTC. Please try another one.');
        }
        options.width = 640;
        var videoOptions = fillConstraints(options);
        var video = document.createElement('video');
        return window.navigator.mediaDevices.getUserMedia({ video: videoOptions })
            .then(function (mediaStream) {
            video.srcObject = mediaStream;
            video.addEventListener('loadedmetadata', function (event) {
                var vw = video.videoWidth, vh = video.videoHeight;
                video.width = vw;
                video.height = vh;
            });
            return video;
        }, function () {
            return Promise.reject('Could not open your camera. You may have denied access.');
        });
    };
    // setup or setupWebcam
    Webcam.prototype.setup = function (options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.webcam) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getWebcam(options)];
                    case 1:
                        _a.webcam = _b.sent();
                        if (!this.canvas) {
                            this.canvas = document.createElement('canvas');
                            this.canvas.width = this.width;
                            this.canvas.height = this.height;
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Webcam.prototype.play = function () {
        var promise = this.webcam.play();
        return promise;
    };
    Webcam.prototype.pause = function () {
        this.webcam.pause();
    };
    Webcam.prototype.stop = function () {
        this.stopStreamedVideo(this.webcam);
    };
    Webcam.prototype.update = function () {
        this.renderCameraToCanvas();
    };
    Webcam.prototype.stopStreamedVideo = function (videoEl) {
        var stream = videoEl.srcObject;
        var tracks = stream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        videoEl.srcObject = null;
    };
    Webcam.prototype.renderCameraToCanvas = function () {
        if (this.canvas && this.webcam) {
            var ctx = this.canvas.getContext('2d');
            if (this.webcam.videoWidth !== 0) {
                var croppedCanvas = canvas_1.cropTo(this.webcam, this.width, this.flip);
                ctx.drawImage(croppedCanvas, 0, 0);
            }
        }
    };
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "getWebcam", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "setup", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "play", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "pause", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "stop", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "update", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "stopStreamedVideo", null);
    __decorate([
        autobind_decorator_1.default
    ], Webcam.prototype, "renderCameraToCanvas", null);
    return Webcam;
}());
exports.Webcam = Webcam;


/***/ }),

/***/ "./src/version.ts":
/*!************************!*\
  !*** ./src/version.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @license See the LICENSE file. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
// This code is auto-generated, do not modify this file!
var version = '0.8.4-alpha2';
exports.version = version;


/***/ }),

/***/ 0:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "@tensorflow/tfjs":
/*!*********************!*\
  !*** external "tf" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = tf;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90bUltYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RtSW1hZ2UvLi9ub2RlX21vZHVsZXMvYXV0b2JpbmQtZGVjb3JhdG9yL2xpYi9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2luZGV4LmpzIiwid2VicGFjazovL3RtSW1hZ2UvLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIvYWxlYS5qcyIsIndlYnBhY2s6Ly90bUltYWdlLy4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3R5Y2hlaS5qcyIsIndlYnBhY2s6Ly90bUltYWdlLy4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3hvcjEyOC5qcyIsIndlYnBhY2s6Ly90bUltYWdlLy4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3hvcjQwOTYuanMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi94b3JzaGlmdDcuanMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi94b3J3b3cuanMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL3NlZWRyYW5kb20uanMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8od2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzIiwid2VicGFjazovL3RtSW1hZ2UvKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8uL3NyYy9jdXN0b20tbW9iaWxlbmV0LnRzIiwid2VicGFjazovL3RtSW1hZ2UvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8uL3NyYy90ZWFjaGFibGUtbW9iaWxlbmV0LnRzIiwid2VicGFjazovL3RtSW1hZ2UvLi9zcmMvdXRpbHMvY2FudmFzLnRzIiwid2VicGFjazovL3RtSW1hZ2UvLi9zcmMvdXRpbHMvdGYudHMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8uL3NyYy91dGlscy93ZWJjYW0udHMiLCJ3ZWJwYWNrOi8vdG1JbWFnZS8uL3NyYy92ZXJzaW9uLnRzIiwid2VicGFjazovL3RtSW1hZ2UvY3J5cHRvIChpZ25vcmVkKSIsIndlYnBhY2s6Ly90bUltYWdlL2V4dGVybmFsIFwidGZcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF1QiwyRUFBMkUsa0NBQWtDLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxrQ0FBa0MsOEhBQThILEdBQUcsRUFBRSxxQkFBcUI7O0FBRTdWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FB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aW5lLWltYWdlLm1pbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuLyoqXG4gKiBSZXR1cm4gYSBkZXNjcmlwdG9yIHJlbW92aW5nIHRoZSB2YWx1ZSBhbmQgcmV0dXJuaW5nIGEgZ2V0dGVyXG4gKiBUaGUgZ2V0dGVyIHdpbGwgcmV0dXJuIGEgLmJpbmQgdmVyc2lvbiBvZiB0aGUgZnVuY3Rpb25cbiAqIGFuZCBtZW1vaXplIHRoZSByZXN1bHQgYWdhaW5zdCBhIHN5bWJvbCBvbiB0aGUgaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJvdW5kTWV0aG9kKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIHZhciBmbiA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAYm91bmRNZXRob2QgZGVjb3JhdG9yIGNhbiBvbmx5IGJlIGFwcGxpZWQgdG8gbWV0aG9kcyBub3Q6IFwiLmNvbmNhdChfdHlwZW9mKGZuKSkpO1xuICB9IC8vIEluIElFMTEgY2FsbGluZyBPYmplY3QuZGVmaW5lUHJvcGVydHkgaGFzIGEgc2lkZS1lZmZlY3Qgb2YgZXZhbHVhdGluZyB0aGVcbiAgLy8gZ2V0dGVyIGZvciB0aGUgcHJvcGVydHkgd2hpY2ggaXMgYmVpbmcgcmVwbGFjZWQuIFRoaXMgY2F1c2VzIGluZmluaXRlXG4gIC8vIHJlY3Vyc2lvbiBhbmQgYW4gXCJPdXQgb2Ygc3RhY2sgc3BhY2VcIiBlcnJvci5cblxuXG4gIHZhciBkZWZpbmluZ1Byb3BlcnR5ID0gZmFsc2U7XG4gIHJldHVybiB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgaWYgKGRlZmluaW5nUHJvcGVydHkgfHwgdGhpcyA9PT0gdGFyZ2V0LnByb3RvdHlwZSB8fCB0aGlzLmhhc093blByb3BlcnR5KGtleSkgfHwgdHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBmbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGJvdW5kRm4gPSBmbi5iaW5kKHRoaXMpO1xuICAgICAgZGVmaW5pbmdQcm9wZXJ0eSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIGJvdW5kRm47XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICAgICAgZm4gPSB2YWx1ZTtcbiAgICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRlZmluaW5nUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgIHJldHVybiBib3VuZEZuO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIGZuID0gdmFsdWU7XG4gICAgfVxuICB9O1xufVxuLyoqXG4gKiBVc2UgYm91bmRNZXRob2QgdG8gYmluZCBhbGwgbWV0aG9kcyBvbiB0aGUgdGFyZ2V0LnByb3RvdHlwZVxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBib3VuZENsYXNzKHRhcmdldCkge1xuICAvLyAoVXNpbmcgcmVmbGVjdCB0byBnZXQgYWxsIGtleXMgaW5jbHVkaW5nIHN5bWJvbHMpXG4gIHZhciBrZXlzOyAvLyBVc2UgUmVmbGVjdCBpZiBleGlzdHNcblxuICBpZiAodHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBSZWZsZWN0Lm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBrZXlzID0gUmVmbGVjdC5vd25LZXlzKHRhcmdldC5wcm90b3R5cGUpO1xuICB9IGVsc2Uge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQucHJvdG90eXBlKTsgLy8gVXNlIHN5bWJvbHMgaWYgc3VwcG9ydCBpcyBwcm92aWRlZFxuXG4gICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBrZXlzID0ga2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQucHJvdG90eXBlKSk7XG4gICAgfVxuICB9XG5cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAvLyBJZ25vcmUgc3BlY2lhbCBjYXNlIHRhcmdldCBtZXRob2RcbiAgICBpZiAoa2V5ID09PSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldC5wcm90b3R5cGUsIGtleSk7IC8vIE9ubHkgbWV0aG9kcyBuZWVkIGJpbmRpbmdcblxuICAgIGlmICh0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldC5wcm90b3R5cGUsIGtleSwgYm91bmRNZXRob2QodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXV0b2JpbmQoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGJvdW5kQ2xhc3MuYXBwbHkodm9pZCAwLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGJvdW5kTWV0aG9kLmFwcGx5KHZvaWQgMCwgYXJndW1lbnRzKTtcbn0iLCIvLyBBIGxpYnJhcnkgb2Ygc2VlZGFibGUgUk5HcyBpbXBsZW1lbnRlZCBpbiBKYXZhc2NyaXB0LlxuLy9cbi8vIFVzYWdlOlxuLy9cbi8vIHZhciBzZWVkcmFuZG9tID0gcmVxdWlyZSgnc2VlZHJhbmRvbScpO1xuLy8gdmFyIHJhbmRvbSA9IHNlZWRyYW5kb20oMSk7IC8vIG9yIGFueSBzZWVkLlxuLy8gdmFyIHggPSByYW5kb20oKTsgICAgICAgLy8gMCA8PSB4IDwgMS4gIEV2ZXJ5IGJpdCBpcyByYW5kb20uXG4vLyB2YXIgeCA9IHJhbmRvbS5xdWljaygpOyAvLyAwIDw9IHggPCAxLiAgMzIgYml0cyBvZiByYW5kb21uZXNzLlxuXG4vLyBhbGVhLCBhIDUzLWJpdCBtdWx0aXBseS13aXRoLWNhcnJ5IGdlbmVyYXRvciBieSBKb2hhbm5lcyBCYWFnw7hlLlxuLy8gUGVyaW9kOiB+Ml4xMTZcbi8vIFJlcG9ydGVkIHRvIHBhc3MgYWxsIEJpZ0NydXNoIHRlc3RzLlxudmFyIGFsZWEgPSByZXF1aXJlKCcuL2xpYi9hbGVhJyk7XG5cbi8vIHhvcjEyOCwgYSBwdXJlIHhvci1zaGlmdCBnZW5lcmF0b3IgYnkgR2VvcmdlIE1hcnNhZ2xpYS5cbi8vIFBlcmlvZDogMl4xMjgtMS5cbi8vIFJlcG9ydGVkIHRvIGZhaWw6IE1hdHJpeFJhbmsgYW5kIExpbmVhckNvbXAuXG52YXIgeG9yMTI4ID0gcmVxdWlyZSgnLi9saWIveG9yMTI4Jyk7XG5cbi8vIHhvcndvdywgR2VvcmdlIE1hcnNhZ2xpYSdzIDE2MC1iaXQgeG9yLXNoaWZ0IGNvbWJpbmVkIHBsdXMgd2V5bC5cbi8vIFBlcmlvZDogMl4xOTItMl4zMlxuLy8gUmVwb3J0ZWQgdG8gZmFpbDogQ29sbGlzaW9uT3ZlciwgU2ltcFBva2VyLCBhbmQgTGluZWFyQ29tcC5cbnZhciB4b3J3b3cgPSByZXF1aXJlKCcuL2xpYi94b3J3b3cnKTtcblxuLy8geG9yc2hpZnQ3LCBieSBGcmFuw6dvaXMgUGFubmV0b24gYW5kIFBpZXJyZSBMJ2VjdXllciwgdGFrZXNcbi8vIGEgZGlmZmVyZW50IGFwcHJvYWNoOiBpdCBhZGRzIHJvYnVzdG5lc3MgYnkgYWxsb3dpbmcgbW9yZSBzaGlmdHNcbi8vIHRoYW4gTWFyc2FnbGlhJ3Mgb3JpZ2luYWwgdGhyZWUuICBJdCBpcyBhIDctc2hpZnQgZ2VuZXJhdG9yXG4vLyB3aXRoIDI1NiBiaXRzLCB0aGF0IHBhc3NlcyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RtYXRpYyBmYWlsdXJlcy5cbi8vIFBlcmlvZCAyXjI1Ni0xLlxuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB4b3JzaGlmdDcgPSByZXF1aXJlKCcuL2xpYi94b3JzaGlmdDcnKTtcblxuLy8geG9yNDA5NiwgYnkgUmljaGFyZCBCcmVudCwgaXMgYSA0MDk2LWJpdCB4b3Itc2hpZnQgd2l0aCBhXG4vLyB2ZXJ5IGxvbmcgcGVyaW9kIHRoYXQgYWxzbyBhZGRzIGEgV2V5bCBnZW5lcmF0b3IuIEl0IGFsc28gcGFzc2VzXG4vLyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RlbWF0aWMgZmFpbHVyZXMuICBJdHMgbG9uZyBwZXJpb2QgbWF5XG4vLyBiZSB1c2VmdWwgaWYgeW91IGhhdmUgbWFueSBnZW5lcmF0b3JzIGFuZCBuZWVkIHRvIGF2b2lkXG4vLyBjb2xsaXNpb25zLlxuLy8gUGVyaW9kOiAyXjQxMjgtMl4zMi5cbi8vIE5vIHN5c3RlbWF0aWMgQmlnQ3J1c2ggZmFpbHVyZXMgcmVwb3J0ZWQuXG52YXIgeG9yNDA5NiA9IHJlcXVpcmUoJy4vbGliL3hvcjQwOTYnKTtcblxuLy8gVHljaGUtaSwgYnkgU2FtdWVsIE5ldmVzIGFuZCBGaWxpcGUgQXJhdWpvLCBpcyBhIGJpdC1zaGlmdGluZyByYW5kb21cbi8vIG51bWJlciBnZW5lcmF0b3IgZGVyaXZlZCBmcm9tIENoYUNoYSwgYSBtb2Rlcm4gc3RyZWFtIGNpcGhlci5cbi8vIGh0dHBzOi8vZWRlbi5kZWkudWMucHQvfnNuZXZlcy9wdWJzLzIwMTEtc25mYTIucGRmXG4vLyBQZXJpb2Q6IH4yXjEyN1xuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB0eWNoZWkgPSByZXF1aXJlKCcuL2xpYi90eWNoZWknKTtcblxuLy8gVGhlIG9yaWdpbmFsIEFSQzQtYmFzZWQgcHJuZyBpbmNsdWRlZCBpbiB0aGlzIGxpYnJhcnkuXG4vLyBQZXJpb2Q6IH4yXjE2MDBcbnZhciBzciA9IHJlcXVpcmUoJy4vc2VlZHJhbmRvbScpO1xuXG5zci5hbGVhID0gYWxlYTtcbnNyLnhvcjEyOCA9IHhvcjEyODtcbnNyLnhvcndvdyA9IHhvcndvdztcbnNyLnhvcnNoaWZ0NyA9IHhvcnNoaWZ0NztcbnNyLnhvcjQwOTYgPSB4b3I0MDk2O1xuc3IudHljaGVpID0gdHljaGVpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNyO1xuIiwiLy8gQSBwb3J0IG9mIGFuIGFsZ29yaXRobSBieSBKb2hhbm5lcyBCYWFnw7hlIDxiYWFnb2VAYmFhZ29lLmNvbT4sIDIwMTBcbi8vIGh0dHA6Ly9iYWFnb2UuY29tL2VuL1JhbmRvbU11c2luZ3MvamF2YXNjcmlwdC9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ucXVpbmxhbi9iZXR0ZXItcmFuZG9tLW51bWJlcnMtZm9yLWphdmFzY3JpcHQtbWlycm9yXG4vLyBPcmlnaW5hbCB3b3JrIGlzIHVuZGVyIE1JVCBsaWNlbnNlIC1cblxuLy8gQ29weXJpZ2h0IChDKSAyMDEwIGJ5IEpvaGFubmVzIEJhYWfDuGUgPGJhYWdvZUBiYWFnb2Uub3JnPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vIFxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy8gXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIEFsZWEoc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzLCBtYXNoID0gTWFzaCgpO1xuXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdCA9IDIwOTE2MzkgKiBtZS5zMCArIG1lLmMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuICAgIG1lLnMwID0gbWUuczE7XG4gICAgbWUuczEgPSBtZS5zMjtcbiAgICByZXR1cm4gbWUuczIgPSB0IC0gKG1lLmMgPSB0IHwgMCk7XG4gIH07XG5cbiAgLy8gQXBwbHkgdGhlIHNlZWRpbmcgYWxnb3JpdGhtIGZyb20gQmFhZ29lLlxuICBtZS5jID0gMTtcbiAgbWUuczAgPSBtYXNoKCcgJyk7XG4gIG1lLnMxID0gbWFzaCgnICcpO1xuICBtZS5zMiA9IG1hc2goJyAnKTtcbiAgbWUuczAgLT0gbWFzaChzZWVkKTtcbiAgaWYgKG1lLnMwIDwgMCkgeyBtZS5zMCArPSAxOyB9XG4gIG1lLnMxIC09IG1hc2goc2VlZCk7XG4gIGlmIChtZS5zMSA8IDApIHsgbWUuczEgKz0gMTsgfVxuICBtZS5zMiAtPSBtYXNoKHNlZWQpO1xuICBpZiAobWUuczIgPCAwKSB7IG1lLnMyICs9IDE7IH1cbiAgbWFzaCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmMgPSBmLmM7XG4gIHQuczAgPSBmLnMwO1xuICB0LnMxID0gZi5zMTtcbiAgdC5zMiA9IGYuczI7XG4gIHJldHVybiB0O1xufVxuXG5mdW5jdGlvbiBpbXBsKHNlZWQsIG9wdHMpIHtcbiAgdmFyIHhnID0gbmV3IEFsZWEoc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSB4Zy5uZXh0O1xuICBwcm5nLmludDMyID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpICogMHgxMDAwMDAwMDApIHwgMDsgfVxuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwcm5nKCkgKyAocHJuZygpICogMHgyMDAwMDAgfCAwKSAqIDEuMTEwMjIzMDI0NjI1MTU2NWUtMTY7IC8vIDJeLTUzXG4gIH07XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAodHlwZW9mKHN0YXRlKSA9PSAnb2JqZWN0JykgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5mdW5jdGlvbiBNYXNoKCkge1xuICB2YXIgbiA9IDB4ZWZjODI0OWQ7XG5cbiAgdmFyIG1hc2ggPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgdmFyIGggPSAwLjAyNTE5NjAzMjgyNDE2OTM4ICogbjtcbiAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgaCAtPSBuO1xuICAgICAgaCAqPSBuO1xuICAgICAgbiA9IGggPj4+IDA7XG4gICAgICBoIC09IG47XG4gICAgICBuICs9IGggKiAweDEwMDAwMDAwMDsgLy8gMl4zMlxuICAgIH1cbiAgICByZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgfTtcblxuICByZXR1cm4gbWFzaDtcbn1cblxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLmFsZWEgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIHRoZSBcIlR5Y2hlLWlcIiBwcm5nIGFsZ29yaXRobSBieVxuLy8gU2FtdWVsIE5ldmVzIGFuZCBGaWxpcGUgQXJhdWpvLlxuLy8gU2VlIGh0dHBzOi8vZWRlbi5kZWkudWMucHQvfnNuZXZlcy9wdWJzLzIwMTEtc25mYTIucGRmXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIFhvckdlbihzZWVkKSB7XG4gIHZhciBtZSA9IHRoaXMsIHN0cnNlZWQgPSAnJztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGIgPSBtZS5iLCBjID0gbWUuYywgZCA9IG1lLmQsIGEgPSBtZS5hO1xuICAgIGIgPSAoYiA8PCAyNSkgXiAoYiA+Pj4gNykgXiBjO1xuICAgIGMgPSAoYyAtIGQpIHwgMDtcbiAgICBkID0gKGQgPDwgMjQpIF4gKGQgPj4+IDgpIF4gYTtcbiAgICBhID0gKGEgLSBiKSB8IDA7XG4gICAgbWUuYiA9IGIgPSAoYiA8PCAyMCkgXiAoYiA+Pj4gMTIpIF4gYztcbiAgICBtZS5jID0gYyA9IChjIC0gZCkgfCAwO1xuICAgIG1lLmQgPSAoZCA8PCAxNikgXiAoYyA+Pj4gMTYpIF4gYTtcbiAgICByZXR1cm4gbWUuYSA9IChhIC0gYikgfCAwO1xuICB9O1xuXG4gIC8qIFRoZSBmb2xsb3dpbmcgaXMgbm9uLWludmVydGVkIHR5Y2hlLCB3aGljaCBoYXMgYmV0dGVyIGludGVybmFsXG4gICAqIGJpdCBkaWZmdXNpb24sIGJ1dCB3aGljaCBpcyBhYm91dCAyNSUgc2xvd2VyIHRoYW4gdHljaGUtaSBpbiBKUy5cbiAgbWUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhID0gbWUuYSwgYiA9IG1lLmIsIGMgPSBtZS5jLCBkID0gbWUuZDtcbiAgICBhID0gKG1lLmEgKyBtZS5iIHwgMCkgPj4+IDA7XG4gICAgZCA9IG1lLmQgXiBhOyBkID0gZCA8PCAxNiBeIGQgPj4+IDE2O1xuICAgIGMgPSBtZS5jICsgZCB8IDA7XG4gICAgYiA9IG1lLmIgXiBjOyBiID0gYiA8PCAxMiBeIGQgPj4+IDIwO1xuICAgIG1lLmEgPSBhID0gYSArIGIgfCAwO1xuICAgIGQgPSBkIF4gYTsgbWUuZCA9IGQgPSBkIDw8IDggXiBkID4+PiAyNDtcbiAgICBtZS5jID0gYyA9IGMgKyBkIHwgMDtcbiAgICBiID0gYiBeIGM7XG4gICAgcmV0dXJuIG1lLmIgPSAoYiA8PCA3IF4gYiA+Pj4gMjUpO1xuICB9XG4gICovXG5cbiAgbWUuYSA9IDA7XG4gIG1lLmIgPSAwO1xuICBtZS5jID0gMjY1NDQzNTc2OSB8IDA7XG4gIG1lLmQgPSAxMzY3MTMwNTUxO1xuXG4gIGlmIChzZWVkID09PSBNYXRoLmZsb29yKHNlZWQpKSB7XG4gICAgLy8gSW50ZWdlciBzZWVkLlxuICAgIG1lLmEgPSAoc2VlZCAvIDB4MTAwMDAwMDAwKSB8IDA7XG4gICAgbWUuYiA9IHNlZWQgfCAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFN0cmluZyBzZWVkLlxuICAgIHN0cnNlZWQgKz0gc2VlZDtcbiAgfVxuXG4gIC8vIE1peCBpbiBzdHJpbmcgc2VlZCwgdGhlbiBkaXNjYXJkIGFuIGluaXRpYWwgYmF0Y2ggb2YgNjQgdmFsdWVzLlxuICBmb3IgKHZhciBrID0gMDsgayA8IHN0cnNlZWQubGVuZ3RoICsgMjA7IGsrKykge1xuICAgIG1lLmIgXj0gc3Ryc2VlZC5jaGFyQ29kZUF0KGspIHwgMDtcbiAgICBtZS5uZXh0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQuYSA9IGYuYTtcbiAgdC5iID0gZi5iO1xuICB0LmMgPSBmLmM7XG4gIHQuZCA9IGYuZDtcbiAgcmV0dXJuIHQ7XG59O1xuXG5mdW5jdGlvbiBpbXBsKHNlZWQsIG9wdHMpIHtcbiAgdmFyIHhnID0gbmV3IFhvckdlbihzZWVkKSxcbiAgICAgIHN0YXRlID0gb3B0cyAmJiBvcHRzLnN0YXRlLFxuICAgICAgcHJuZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMDsgfTtcbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgdG9wID0geGcubmV4dCgpID4+PiAxMSxcbiAgICAgICAgICBib3QgPSAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwLFxuICAgICAgICAgIHJlc3VsdCA9ICh0b3AgKyBib3QpIC8gKDEgPDwgMjEpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcHJuZy5pbnQzMiA9IHhnLm5leHQ7XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAodHlwZW9mKHN0YXRlKSA9PSAnb2JqZWN0JykgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLnR5Y2hlaSA9IGltcGw7XG59XG5cbn0pKFxuICB0aGlzLFxuICAodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLCAgICAvLyBwcmVzZW50IGluIG5vZGUuanNcbiAgKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lICAgLy8gcHJlc2VudCB3aXRoIGFuIEFNRCBsb2FkZXJcbik7XG5cblxuIiwiLy8gQSBKYXZhc2NyaXB0IGltcGxlbWVudGFpb24gb2YgdGhlIFwieG9yMTI4XCIgcHJuZyBhbGdvcml0aG0gYnlcbi8vIEdlb3JnZSBNYXJzYWdsaWEuICBTZWUgaHR0cDovL3d3dy5qc3RhdHNvZnQub3JnL3YwOC9pMTQvcGFwZXJcblxuKGZ1bmN0aW9uKGdsb2JhbCwgbW9kdWxlLCBkZWZpbmUpIHtcblxuZnVuY3Rpb24gWG9yR2VuKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcywgc3Ryc2VlZCA9ICcnO1xuXG4gIG1lLnggPSAwO1xuICBtZS55ID0gMDtcbiAgbWUueiA9IDA7XG4gIG1lLncgPSAwO1xuXG4gIC8vIFNldCB1cCBnZW5lcmF0b3IgZnVuY3Rpb24uXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdCA9IG1lLnggXiAobWUueCA8PCAxMSk7XG4gICAgbWUueCA9IG1lLnk7XG4gICAgbWUueSA9IG1lLno7XG4gICAgbWUueiA9IG1lLnc7XG4gICAgcmV0dXJuIG1lLncgXj0gKG1lLncgPj4+IDE5KSBeIHQgXiAodCA+Pj4gOCk7XG4gIH07XG5cbiAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAvLyBJbnRlZ2VyIHNlZWQuXG4gICAgbWUueCA9IHNlZWQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RyaW5nIHNlZWQuXG4gICAgc3Ryc2VlZCArPSBzZWVkO1xuICB9XG5cbiAgLy8gTWl4IGluIHN0cmluZyBzZWVkLCB0aGVuIGRpc2NhcmQgYW4gaW5pdGlhbCBiYXRjaCBvZiA2NCB2YWx1ZXMuXG4gIGZvciAodmFyIGsgPSAwOyBrIDwgc3Ryc2VlZC5sZW5ndGggKyA2NDsgaysrKSB7XG4gICAgbWUueCBePSBzdHJzZWVkLmNoYXJDb2RlQXQoaykgfCAwO1xuICAgIG1lLm5leHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC54ID0gZi54O1xuICB0LnkgPSBmLnk7XG4gIHQueiA9IGYuejtcbiAgdC53ID0gZi53O1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy54b3IxMjggPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIFJpY2hhcmQgQnJlbnQncyBYb3JnZW5zIHhvcjQwOTYgYWxnb3JpdGhtLlxuLy9cbi8vIFRoaXMgZmFzdCBub24tY3J5cHRvZ3JhcGhpYyByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBpcyBkZXNpZ25lZCBmb3Jcbi8vIHVzZSBpbiBNb250ZS1DYXJsbyBhbGdvcml0aG1zLiBJdCBjb21iaW5lcyBhIGxvbmctcGVyaW9kIHhvcnNoaWZ0XG4vLyBnZW5lcmF0b3Igd2l0aCBhIFdleWwgZ2VuZXJhdG9yLCBhbmQgaXQgcGFzc2VzIGFsbCBjb21tb24gYmF0dGVyaWVzXG4vLyBvZiBzdGFzdGljaWFsIHRlc3RzIGZvciByYW5kb21uZXNzIHdoaWxlIGNvbnN1bWluZyBvbmx5IGEgZmV3IG5hbm9zZWNvbmRzXG4vLyBmb3IgZWFjaCBwcm5nIGdlbmVyYXRlZC4gIEZvciBiYWNrZ3JvdW5kIG9uIHRoZSBnZW5lcmF0b3IsIHNlZSBCcmVudCdzXG4vLyBwYXBlcjogXCJTb21lIGxvbmctcGVyaW9kIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9ycyB1c2luZyBzaGlmdHMgYW5kIHhvcnMuXCJcbi8vIGh0dHA6Ly9hcnhpdi5vcmcvcGRmLzEwMDQuMzExNXYxLnBkZlxuLy9cbi8vIFVzYWdlOlxuLy9cbi8vIHZhciB4b3I0MDk2ID0gcmVxdWlyZSgneG9yNDA5NicpO1xuLy8gcmFuZG9tID0geG9yNDA5NigxKTsgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZWVkIHdpdGggaW50MzIgb3Igc3RyaW5nLlxuLy8gYXNzZXJ0LmVxdWFsKHJhbmRvbSgpLCAwLjE1MjA0MzY0NTA1Mzg1NDcpOyAvLyAoMCwgMSkgcmFuZ2UsIDUzIGJpdHMuXG4vLyBhc3NlcnQuZXF1YWwocmFuZG9tLmludDMyKCksIDE4MDY1MzQ4OTcpOyAgIC8vIHNpZ25lZCBpbnQzMiwgMzIgYml0cy5cbi8vXG4vLyBGb3Igbm9uemVybyBudW1lcmljIGtleXMsIHRoaXMgaW1wZWxlbWVudGF0aW9uIHByb3ZpZGVzIGEgc2VxdWVuY2Vcbi8vIGlkZW50aWNhbCB0byB0aGF0IGJ5IEJyZW50J3MgeG9yZ2VucyAzIGltcGxlbWVudGFpb24gaW4gQy4gIFRoaXNcbi8vIGltcGxlbWVudGF0aW9uIGFsc28gcHJvdmlkZXMgZm9yIGluaXRhbGl6aW5nIHRoZSBnZW5lcmF0b3Igd2l0aFxuLy8gc3RyaW5nIHNlZWRzLCBvciBmb3Igc2F2aW5nIGFuZCByZXN0b3JpbmcgdGhlIHN0YXRlIG9mIHRoZSBnZW5lcmF0b3IuXG4vL1xuLy8gT24gQ2hyb21lLCB0aGlzIHBybmcgYmVuY2htYXJrcyBhYm91dCAyLjEgdGltZXMgc2xvd2VyIHRoYW5cbi8vIEphdmFzY3JpcHQncyBidWlsdC1pbiBNYXRoLnJhbmRvbSgpLlxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIC8vIFNldCB1cCBnZW5lcmF0b3IgZnVuY3Rpb24uXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdyA9IG1lLncsXG4gICAgICAgIFggPSBtZS5YLCBpID0gbWUuaSwgdCwgdjtcbiAgICAvLyBVcGRhdGUgV2V5bCBnZW5lcmF0b3IuXG4gICAgbWUudyA9IHcgPSAodyArIDB4NjFjODg2NDcpIHwgMDtcbiAgICAvLyBVcGRhdGUgeG9yIGdlbmVyYXRvci5cbiAgICB2ID0gWFsoaSArIDM0KSAmIDEyN107XG4gICAgdCA9IFhbaSA9ICgoaSArIDEpICYgMTI3KV07XG4gICAgdiBePSB2IDw8IDEzO1xuICAgIHQgXj0gdCA8PCAxNztcbiAgICB2IF49IHYgPj4+IDE1O1xuICAgIHQgXj0gdCA+Pj4gMTI7XG4gICAgLy8gVXBkYXRlIFhvciBnZW5lcmF0b3IgYXJyYXkgc3RhdGUuXG4gICAgdiA9IFhbaV0gPSB2IF4gdDtcbiAgICBtZS5pID0gaTtcbiAgICAvLyBSZXN1bHQgaXMgdGhlIGNvbWJpbmF0aW9uLlxuICAgIHJldHVybiAodiArICh3IF4gKHcgPj4+IDE2KSkpIHwgMDtcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0KG1lLCBzZWVkKSB7XG4gICAgdmFyIHQsIHYsIGksIGosIHcsIFggPSBbXSwgbGltaXQgPSAxMjg7XG4gICAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAgIC8vIE51bWVyaWMgc2VlZHMgaW5pdGlhbGl6ZSB2LCB3aGljaCBpcyB1c2VkIHRvIGdlbmVyYXRlcyBYLlxuICAgICAgdiA9IHNlZWQ7XG4gICAgICBzZWVkID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RyaW5nIHNlZWRzIGFyZSBtaXhlZCBpbnRvIHYgYW5kIFggb25lIGNoYXJhY3RlciBhdCBhIHRpbWUuXG4gICAgICBzZWVkID0gc2VlZCArICdcXDAnO1xuICAgICAgdiA9IDA7XG4gICAgICBsaW1pdCA9IE1hdGgubWF4KGxpbWl0LCBzZWVkLmxlbmd0aCk7XG4gICAgfVxuICAgIC8vIEluaXRpYWxpemUgY2lyY3VsYXIgYXJyYXkgYW5kIHdleWwgdmFsdWUuXG4gICAgZm9yIChpID0gMCwgaiA9IC0zMjsgaiA8IGxpbWl0OyArK2opIHtcbiAgICAgIC8vIFB1dCB0aGUgdW5pY29kZSBjaGFyYWN0ZXJzIGludG8gdGhlIGFycmF5LCBhbmQgc2h1ZmZsZSB0aGVtLlxuICAgICAgaWYgKHNlZWQpIHYgXj0gc2VlZC5jaGFyQ29kZUF0KChqICsgMzIpICUgc2VlZC5sZW5ndGgpO1xuICAgICAgLy8gQWZ0ZXIgMzIgc2h1ZmZsZXMsIHRha2UgdiBhcyB0aGUgc3RhcnRpbmcgdyB2YWx1ZS5cbiAgICAgIGlmIChqID09PSAwKSB3ID0gdjtcbiAgICAgIHYgXj0gdiA8PCAxMDtcbiAgICAgIHYgXj0gdiA+Pj4gMTU7XG4gICAgICB2IF49IHYgPDwgNDtcbiAgICAgIHYgXj0gdiA+Pj4gMTM7XG4gICAgICBpZiAoaiA+PSAwKSB7XG4gICAgICAgIHcgPSAodyArIDB4NjFjODg2NDcpIHwgMDsgICAgIC8vIFdleWwuXG4gICAgICAgIHQgPSAoWFtqICYgMTI3XSBePSAodiArIHcpKTsgIC8vIENvbWJpbmUgeG9yIGFuZCB3ZXlsIHRvIGluaXQgYXJyYXkuXG4gICAgICAgIGkgPSAoMCA9PSB0KSA/IGkgKyAxIDogMDsgICAgIC8vIENvdW50IHplcm9lcy5cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gV2UgaGF2ZSBkZXRlY3RlZCBhbGwgemVyb2VzOyBtYWtlIHRoZSBrZXkgbm9uemVyby5cbiAgICBpZiAoaSA+PSAxMjgpIHtcbiAgICAgIFhbKHNlZWQgJiYgc2VlZC5sZW5ndGggfHwgMCkgJiAxMjddID0gLTE7XG4gICAgfVxuICAgIC8vIFJ1biB0aGUgZ2VuZXJhdG9yIDUxMiB0aW1lcyB0byBmdXJ0aGVyIG1peCB0aGUgc3RhdGUgYmVmb3JlIHVzaW5nIGl0LlxuICAgIC8vIEZhY3RvcmluZyB0aGlzIGFzIGEgZnVuY3Rpb24gc2xvd3MgdGhlIG1haW4gZ2VuZXJhdG9yLCBzbyBpdCBpcyBqdXN0XG4gICAgLy8gdW5yb2xsZWQgaGVyZS4gIFRoZSB3ZXlsIGdlbmVyYXRvciBpcyBub3QgYWR2YW5jZWQgd2hpbGUgd2FybWluZyB1cC5cbiAgICBpID0gMTI3O1xuICAgIGZvciAoaiA9IDQgKiAxMjg7IGogPiAwOyAtLWopIHtcbiAgICAgIHYgPSBYWyhpICsgMzQpICYgMTI3XTtcbiAgICAgIHQgPSBYW2kgPSAoKGkgKyAxKSAmIDEyNyldO1xuICAgICAgdiBePSB2IDw8IDEzO1xuICAgICAgdCBePSB0IDw8IDE3O1xuICAgICAgdiBePSB2ID4+PiAxNTtcbiAgICAgIHQgXj0gdCA+Pj4gMTI7XG4gICAgICBYW2ldID0gdiBeIHQ7XG4gICAgfVxuICAgIC8vIFN0b3Jpbmcgc3RhdGUgYXMgb2JqZWN0IG1lbWJlcnMgaXMgZmFzdGVyIHRoYW4gdXNpbmcgY2xvc3VyZSB2YXJpYWJsZXMuXG4gICAgbWUudyA9IHc7XG4gICAgbWUuWCA9IFg7XG4gICAgbWUuaSA9IGk7XG4gIH1cblxuICBpbml0KG1lLCBzZWVkKTtcbn1cblxuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQuaSA9IGYuaTtcbiAgdC53ID0gZi53O1xuICB0LlggPSBmLlguc2xpY2UoKTtcbiAgcmV0dXJuIHQ7XG59O1xuXG5mdW5jdGlvbiBpbXBsKHNlZWQsIG9wdHMpIHtcbiAgaWYgKHNlZWQgPT0gbnVsbCkgc2VlZCA9ICsobmV3IERhdGUpO1xuICB2YXIgeGcgPSBuZXcgWG9yR2VuKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwOyB9O1xuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvIHtcbiAgICAgIHZhciB0b3AgPSB4Zy5uZXh0KCkgPj4+IDExLFxuICAgICAgICAgIGJvdCA9ICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDAsXG4gICAgICAgICAgcmVzdWx0ID0gKHRvcCArIGJvdCkgLyAoMSA8PCAyMSk7XG4gICAgfSB3aGlsZSAocmVzdWx0ID09PSAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBwcm5nLmludDMyID0geGcubmV4dDtcbiAgcHJuZy5xdWljayA9IHBybmc7XG4gIGlmIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZS5YKSBjb3B5KHN0YXRlLCB4Zyk7XG4gICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weSh4Zywge30pOyB9XG4gIH1cbiAgcmV0dXJuIHBybmc7XG59XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBpbXBsO1xufSBlbHNlIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBpbXBsOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMueG9yNDA5NiA9IGltcGw7XG59XG5cbn0pKFxuICB0aGlzLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cgb2JqZWN0IG9yIGdsb2JhbFxuICAodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLCAgICAvLyBwcmVzZW50IGluIG5vZGUuanNcbiAgKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lICAgLy8gcHJlc2VudCB3aXRoIGFuIEFNRCBsb2FkZXJcbik7XG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiB0aGUgXCJ4b3JzaGlmdDdcIiBhbGdvcml0aG0gYnlcbi8vIEZyYW7Dp29pcyBQYW5uZXRvbiBhbmQgUGllcnJlIEwnZWN1eWVyOlxuLy8gXCJPbiB0aGUgWG9yZ3NoaWZ0IFJhbmRvbSBOdW1iZXIgR2VuZXJhdG9yc1wiXG4vLyBodHRwOi8vc2FsdWMuZW5nci51Y29ubi5lZHUvcmVmcy9jcnlwdG8vcm5nL3Bhbm5ldG9uMDVvbnRoZXhvcnNoaWZ0LnBkZlxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzO1xuXG4gIC8vIFNldCB1cCBnZW5lcmF0b3IgZnVuY3Rpb24uXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBVcGRhdGUgeG9yIGdlbmVyYXRvci5cbiAgICB2YXIgWCA9IG1lLngsIGkgPSBtZS5pLCB0LCB2LCB3O1xuICAgIHQgPSBYW2ldOyB0IF49ICh0ID4+PiA3KTsgdiA9IHQgXiAodCA8PCAyNCk7XG4gICAgdCA9IFhbKGkgKyAxKSAmIDddOyB2IF49IHQgXiAodCA+Pj4gMTApO1xuICAgIHQgPSBYWyhpICsgMykgJiA3XTsgdiBePSB0IF4gKHQgPj4+IDMpO1xuICAgIHQgPSBYWyhpICsgNCkgJiA3XTsgdiBePSB0IF4gKHQgPDwgNyk7XG4gICAgdCA9IFhbKGkgKyA3KSAmIDddOyB0ID0gdCBeICh0IDw8IDEzKTsgdiBePSB0IF4gKHQgPDwgOSk7XG4gICAgWFtpXSA9IHY7XG4gICAgbWUuaSA9IChpICsgMSkgJiA3O1xuICAgIHJldHVybiB2O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGluaXQobWUsIHNlZWQpIHtcbiAgICB2YXIgaiwgdywgWCA9IFtdO1xuXG4gICAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAgIC8vIFNlZWQgc3RhdGUgYXJyYXkgdXNpbmcgYSAzMi1iaXQgaW50ZWdlci5cbiAgICAgIHcgPSBYWzBdID0gc2VlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2VlZCBzdGF0ZSB1c2luZyBhIHN0cmluZy5cbiAgICAgIHNlZWQgPSAnJyArIHNlZWQ7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgc2VlZC5sZW5ndGg7ICsraikge1xuICAgICAgICBYW2ogJiA3XSA9IChYW2ogJiA3XSA8PCAxNSkgXlxuICAgICAgICAgICAgKHNlZWQuY2hhckNvZGVBdChqKSArIFhbKGogKyAxKSAmIDddIDw8IDEzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRW5mb3JjZSBhbiBhcnJheSBsZW5ndGggb2YgOCwgbm90IGFsbCB6ZXJvZXMuXG4gICAgd2hpbGUgKFgubGVuZ3RoIDwgOCkgWC5wdXNoKDApO1xuICAgIGZvciAoaiA9IDA7IGogPCA4ICYmIFhbal0gPT09IDA7ICsraik7XG4gICAgaWYgKGogPT0gOCkgdyA9IFhbN10gPSAtMTsgZWxzZSB3ID0gWFtqXTtcblxuICAgIG1lLnggPSBYO1xuICAgIG1lLmkgPSAwO1xuXG4gICAgLy8gRGlzY2FyZCBhbiBpbml0aWFsIDI1NiB2YWx1ZXMuXG4gICAgZm9yIChqID0gMjU2OyBqID4gMDsgLS1qKSB7XG4gICAgICBtZS5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdChtZSwgc2VlZCk7XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LnggPSBmLnguc2xpY2UoKTtcbiAgdC5pID0gZi5pO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIGlmIChzZWVkID09IG51bGwpIHNlZWQgPSArKG5ldyBEYXRlKTtcbiAgdmFyIHhnID0gbmV3IFhvckdlbihzZWVkKSxcbiAgICAgIHN0YXRlID0gb3B0cyAmJiBvcHRzLnN0YXRlLFxuICAgICAgcHJuZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMDsgfTtcbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgdG9wID0geGcubmV4dCgpID4+PiAxMSxcbiAgICAgICAgICBib3QgPSAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwLFxuICAgICAgICAgIHJlc3VsdCA9ICh0b3AgKyBib3QpIC8gKDEgPDwgMjEpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcHJuZy5pbnQzMiA9IHhnLm5leHQ7XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUueCkgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLnhvcnNoaWZ0NyA9IGltcGw7XG59XG5cbn0pKFxuICB0aGlzLFxuICAodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLCAgICAvLyBwcmVzZW50IGluIG5vZGUuanNcbiAgKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lICAgLy8gcHJlc2VudCB3aXRoIGFuIEFNRCBsb2FkZXJcbik7XG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIHRoZSBcInhvcndvd1wiIHBybmcgYWxnb3JpdGhtIGJ5XG4vLyBHZW9yZ2UgTWFyc2FnbGlhLiAgU2VlIGh0dHA6Ly93d3cuanN0YXRzb2Z0Lm9yZy92MDgvaTE0L3BhcGVyXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIFhvckdlbihzZWVkKSB7XG4gIHZhciBtZSA9IHRoaXMsIHN0cnNlZWQgPSAnJztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSAobWUueCBeIChtZS54ID4+PiAyKSk7XG4gICAgbWUueCA9IG1lLnk7IG1lLnkgPSBtZS56OyBtZS56ID0gbWUudzsgbWUudyA9IG1lLnY7XG4gICAgcmV0dXJuIChtZS5kID0gKG1lLmQgKyAzNjI0MzcgfCAwKSkgK1xuICAgICAgIChtZS52ID0gKG1lLnYgXiAobWUudiA8PCA0KSkgXiAodCBeICh0IDw8IDEpKSkgfCAwO1xuICB9O1xuXG4gIG1lLnggPSAwO1xuICBtZS55ID0gMDtcbiAgbWUueiA9IDA7XG4gIG1lLncgPSAwO1xuICBtZS52ID0gMDtcblxuICBpZiAoc2VlZCA9PT0gKHNlZWQgfCAwKSkge1xuICAgIC8vIEludGVnZXIgc2VlZC5cbiAgICBtZS54ID0gc2VlZDtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdHJpbmcgc2VlZC5cbiAgICBzdHJzZWVkICs9IHNlZWQ7XG4gIH1cblxuICAvLyBNaXggaW4gc3RyaW5nIHNlZWQsIHRoZW4gZGlzY2FyZCBhbiBpbml0aWFsIGJhdGNoIG9mIDY0IHZhbHVlcy5cbiAgZm9yICh2YXIgayA9IDA7IGsgPCBzdHJzZWVkLmxlbmd0aCArIDY0OyBrKyspIHtcbiAgICBtZS54IF49IHN0cnNlZWQuY2hhckNvZGVBdChrKSB8IDA7XG4gICAgaWYgKGsgPT0gc3Ryc2VlZC5sZW5ndGgpIHtcbiAgICAgIG1lLmQgPSBtZS54IDw8IDEwIF4gbWUueCA+Pj4gNDtcbiAgICB9XG4gICAgbWUubmV4dCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LnggPSBmLng7XG4gIHQueSA9IGYueTtcbiAgdC56ID0gZi56O1xuICB0LncgPSBmLnc7XG4gIHQudiA9IGYudjtcbiAgdC5kID0gZi5kO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy54b3J3b3cgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8qXG5Db3B5cmlnaHQgMjAxNCBEYXZpZCBCYXUuXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG5cIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbndpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbmRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xucGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG50aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5pbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbkVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULlxuSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcbkNMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsXG5UT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRVxuU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbiovXG5cbihmdW5jdGlvbiAocG9vbCwgbWF0aCkge1xuLy9cbi8vIFRoZSBmb2xsb3dpbmcgY29uc3RhbnRzIGFyZSByZWxhdGVkIHRvIElFRUUgNzU0IGxpbWl0cy5cbi8vXG5cbi8vIERldGVjdCB0aGUgZ2xvYmFsIG9iamVjdCwgZXZlbiBpZiBvcGVyYXRpbmcgaW4gc3RyaWN0IG1vZGUuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNDM4NzA1Ny8yNjUyOThcbnZhciBnbG9iYWwgPSAoMCwgZXZhbCkoJ3RoaXMnKSxcbiAgICB3aWR0aCA9IDI1NiwgICAgICAgIC8vIGVhY2ggUkM0IG91dHB1dCBpcyAwIDw9IHggPCAyNTZcbiAgICBjaHVua3MgPSA2LCAgICAgICAgIC8vIGF0IGxlYXN0IHNpeCBSQzQgb3V0cHV0cyBmb3IgZWFjaCBkb3VibGVcbiAgICBkaWdpdHMgPSA1MiwgICAgICAgIC8vIHRoZXJlIGFyZSA1MiBzaWduaWZpY2FudCBkaWdpdHMgaW4gYSBkb3VibGVcbiAgICBybmduYW1lID0gJ3JhbmRvbScsIC8vIHJuZ25hbWU6IG5hbWUgZm9yIE1hdGgucmFuZG9tIGFuZCBNYXRoLnNlZWRyYW5kb21cbiAgICBzdGFydGRlbm9tID0gbWF0aC5wb3cod2lkdGgsIGNodW5rcyksXG4gICAgc2lnbmlmaWNhbmNlID0gbWF0aC5wb3coMiwgZGlnaXRzKSxcbiAgICBvdmVyZmxvdyA9IHNpZ25pZmljYW5jZSAqIDIsXG4gICAgbWFzayA9IHdpZHRoIC0gMSxcbiAgICBub2RlY3J5cHRvOyAgICAgICAgIC8vIG5vZGUuanMgY3J5cHRvIG1vZHVsZSwgaW5pdGlhbGl6ZWQgYXQgdGhlIGJvdHRvbS5cblxuLy9cbi8vIHNlZWRyYW5kb20oKVxuLy8gVGhpcyBpcyB0aGUgc2VlZHJhbmRvbSBmdW5jdGlvbiBkZXNjcmliZWQgYWJvdmUuXG4vL1xuZnVuY3Rpb24gc2VlZHJhbmRvbShzZWVkLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIga2V5ID0gW107XG4gIG9wdGlvbnMgPSAob3B0aW9ucyA9PSB0cnVlKSA/IHsgZW50cm9weTogdHJ1ZSB9IDogKG9wdGlvbnMgfHwge30pO1xuXG4gIC8vIEZsYXR0ZW4gdGhlIHNlZWQgc3RyaW5nIG9yIGJ1aWxkIG9uZSBmcm9tIGxvY2FsIGVudHJvcHkgaWYgbmVlZGVkLlxuICB2YXIgc2hvcnRzZWVkID0gbWl4a2V5KGZsYXR0ZW4oXG4gICAgb3B0aW9ucy5lbnRyb3B5ID8gW3NlZWQsIHRvc3RyaW5nKHBvb2wpXSA6XG4gICAgKHNlZWQgPT0gbnVsbCkgPyBhdXRvc2VlZCgpIDogc2VlZCwgMyksIGtleSk7XG5cbiAgLy8gVXNlIHRoZSBzZWVkIHRvIGluaXRpYWxpemUgYW4gQVJDNCBnZW5lcmF0b3IuXG4gIHZhciBhcmM0ID0gbmV3IEFSQzQoa2V5KTtcblxuICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByYW5kb20gZG91YmxlIGluIFswLCAxKSB0aGF0IGNvbnRhaW5zXG4gIC8vIHJhbmRvbW5lc3MgaW4gZXZlcnkgYml0IG9mIHRoZSBtYW50aXNzYSBvZiB0aGUgSUVFRSA3NTQgdmFsdWUuXG4gIHZhciBwcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG4gPSBhcmM0LmcoY2h1bmtzKSwgICAgICAgICAgICAgLy8gU3RhcnQgd2l0aCBhIG51bWVyYXRvciBuIDwgMiBeIDQ4XG4gICAgICAgIGQgPSBzdGFydGRlbm9tLCAgICAgICAgICAgICAgICAgLy8gICBhbmQgZGVub21pbmF0b3IgZCA9IDIgXiA0OC5cbiAgICAgICAgeCA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGFuZCBubyAnZXh0cmEgbGFzdCBieXRlJy5cbiAgICB3aGlsZSAobiA8IHNpZ25pZmljYW5jZSkgeyAgICAgICAgICAvLyBGaWxsIHVwIGFsbCBzaWduaWZpY2FudCBkaWdpdHMgYnlcbiAgICAgIG4gPSAobiArIHgpICogd2lkdGg7ICAgICAgICAgICAgICAvLyAgIHNoaWZ0aW5nIG51bWVyYXRvciBhbmRcbiAgICAgIGQgKj0gd2lkdGg7ICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGRlbm9taW5hdG9yIGFuZCBnZW5lcmF0aW5nIGFcbiAgICAgIHggPSBhcmM0LmcoMSk7ICAgICAgICAgICAgICAgICAgICAvLyAgIG5ldyBsZWFzdC1zaWduaWZpY2FudC1ieXRlLlxuICAgIH1cbiAgICB3aGlsZSAobiA+PSBvdmVyZmxvdykgeyAgICAgICAgICAgICAvLyBUbyBhdm9pZCByb3VuZGluZyB1cCwgYmVmb3JlIGFkZGluZ1xuICAgICAgbiAvPSAyOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgbGFzdCBieXRlLCBzaGlmdCBldmVyeXRoaW5nXG4gICAgICBkIC89IDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICByaWdodCB1c2luZyBpbnRlZ2VyIG1hdGggdW50aWxcbiAgICAgIHggPj4+PSAxOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHdlIGhhdmUgZXhhY3RseSB0aGUgZGVzaXJlZCBiaXRzLlxuICAgIH1cbiAgICByZXR1cm4gKG4gKyB4KSAvIGQ7ICAgICAgICAgICAgICAgICAvLyBGb3JtIHRoZSBudW1iZXIgd2l0aGluIFswLCAxKS5cbiAgfTtcblxuICBwcm5nLmludDMyID0gZnVuY3Rpb24oKSB7IHJldHVybiBhcmM0LmcoNCkgfCAwOyB9XG4gIHBybmcucXVpY2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGFyYzQuZyg0KSAvIDB4MTAwMDAwMDAwOyB9XG4gIHBybmcuZG91YmxlID0gcHJuZztcblxuICAvLyBNaXggdGhlIHJhbmRvbW5lc3MgaW50byBhY2N1bXVsYXRlZCBlbnRyb3B5LlxuICBtaXhrZXkodG9zdHJpbmcoYXJjNC5TKSwgcG9vbCk7XG5cbiAgLy8gQ2FsbGluZyBjb252ZW50aW9uOiB3aGF0IHRvIHJldHVybiBhcyBhIGZ1bmN0aW9uIG9mIHBybmcsIHNlZWQsIGlzX21hdGguXG4gIHJldHVybiAob3B0aW9ucy5wYXNzIHx8IGNhbGxiYWNrIHx8XG4gICAgICBmdW5jdGlvbihwcm5nLCBzZWVkLCBpc19tYXRoX2NhbGwsIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIC8vIExvYWQgdGhlIGFyYzQgc3RhdGUgZnJvbSB0aGUgZ2l2ZW4gc3RhdGUgaWYgaXQgaGFzIGFuIFMgYXJyYXkuXG4gICAgICAgICAgaWYgKHN0YXRlLlMpIHsgY29weShzdGF0ZSwgYXJjNCk7IH1cbiAgICAgICAgICAvLyBPbmx5IHByb3ZpZGUgdGhlIC5zdGF0ZSBtZXRob2QgaWYgcmVxdWVzdGVkIHZpYSBvcHRpb25zLnN0YXRlLlxuICAgICAgICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoYXJjNCwge30pOyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjYWxsZWQgYXMgYSBtZXRob2Qgb2YgTWF0aCAoTWF0aC5zZWVkcmFuZG9tKCkpLCBtdXRhdGVcbiAgICAgICAgLy8gTWF0aC5yYW5kb20gYmVjYXVzZSB0aGF0IGlzIGhvdyBzZWVkcmFuZG9tLmpzIGhhcyB3b3JrZWQgc2luY2UgdjEuMC5cbiAgICAgICAgaWYgKGlzX21hdGhfY2FsbCkgeyBtYXRoW3JuZ25hbWVdID0gcHJuZzsgcmV0dXJuIHNlZWQ7IH1cblxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0IGlzIGEgbmV3ZXIgY2FsbGluZyBjb252ZW50aW9uLCBzbyByZXR1cm4gdGhlXG4gICAgICAgIC8vIHBybmcgZGlyZWN0bHkuXG4gICAgICAgIGVsc2UgcmV0dXJuIHBybmc7XG4gICAgICB9KShcbiAgcHJuZyxcbiAgc2hvcnRzZWVkLFxuICAnZ2xvYmFsJyBpbiBvcHRpb25zID8gb3B0aW9ucy5nbG9iYWwgOiAodGhpcyA9PSBtYXRoKSxcbiAgb3B0aW9ucy5zdGF0ZSk7XG59XG5tYXRoWydzZWVkJyArIHJuZ25hbWVdID0gc2VlZHJhbmRvbTtcblxuLy9cbi8vIEFSQzRcbi8vXG4vLyBBbiBBUkM0IGltcGxlbWVudGF0aW9uLiAgVGhlIGNvbnN0cnVjdG9yIHRha2VzIGEga2V5IGluIHRoZSBmb3JtIG9mXG4vLyBhbiBhcnJheSBvZiBhdCBtb3N0ICh3aWR0aCkgaW50ZWdlcnMgdGhhdCBzaG91bGQgYmUgMCA8PSB4IDwgKHdpZHRoKS5cbi8vXG4vLyBUaGUgZyhjb3VudCkgbWV0aG9kIHJldHVybnMgYSBwc2V1ZG9yYW5kb20gaW50ZWdlciB0aGF0IGNvbmNhdGVuYXRlc1xuLy8gdGhlIG5leHQgKGNvdW50KSBvdXRwdXRzIGZyb20gQVJDNC4gIEl0cyByZXR1cm4gdmFsdWUgaXMgYSBudW1iZXIgeFxuLy8gdGhhdCBpcyBpbiB0aGUgcmFuZ2UgMCA8PSB4IDwgKHdpZHRoIF4gY291bnQpLlxuLy9cbmZ1bmN0aW9uIEFSQzQoa2V5KSB7XG4gIHZhciB0LCBrZXlsZW4gPSBrZXkubGVuZ3RoLFxuICAgICAgbWUgPSB0aGlzLCBpID0gMCwgaiA9IG1lLmkgPSBtZS5qID0gMCwgcyA9IG1lLlMgPSBbXTtcblxuICAvLyBUaGUgZW1wdHkga2V5IFtdIGlzIHRyZWF0ZWQgYXMgWzBdLlxuICBpZiAoIWtleWxlbikgeyBrZXkgPSBba2V5bGVuKytdOyB9XG5cbiAgLy8gU2V0IHVwIFMgdXNpbmcgdGhlIHN0YW5kYXJkIGtleSBzY2hlZHVsaW5nIGFsZ29yaXRobS5cbiAgd2hpbGUgKGkgPCB3aWR0aCkge1xuICAgIHNbaV0gPSBpKys7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICBzW2ldID0gc1tqID0gbWFzayAmIChqICsga2V5W2kgJSBrZXlsZW5dICsgKHQgPSBzW2ldKSldO1xuICAgIHNbal0gPSB0O1xuICB9XG5cbiAgLy8gVGhlIFwiZ1wiIG1ldGhvZCByZXR1cm5zIHRoZSBuZXh0IChjb3VudCkgb3V0cHV0cyBhcyBvbmUgbnVtYmVyLlxuICAobWUuZyA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgLy8gVXNpbmcgaW5zdGFuY2UgbWVtYmVycyBpbnN0ZWFkIG9mIGNsb3N1cmUgc3RhdGUgbmVhcmx5IGRvdWJsZXMgc3BlZWQuXG4gICAgdmFyIHQsIHIgPSAwLFxuICAgICAgICBpID0gbWUuaSwgaiA9IG1lLmosIHMgPSBtZS5TO1xuICAgIHdoaWxlIChjb3VudC0tKSB7XG4gICAgICB0ID0gc1tpID0gbWFzayAmIChpICsgMSldO1xuICAgICAgciA9IHIgKiB3aWR0aCArIHNbbWFzayAmICgoc1tpXSA9IHNbaiA9IG1hc2sgJiAoaiArIHQpXSkgKyAoc1tqXSA9IHQpKV07XG4gICAgfVxuICAgIG1lLmkgPSBpOyBtZS5qID0gajtcbiAgICByZXR1cm4gcjtcbiAgICAvLyBGb3Igcm9idXN0IHVucHJlZGljdGFiaWxpdHksIHRoZSBmdW5jdGlvbiBjYWxsIGJlbG93IGF1dG9tYXRpY2FsbHlcbiAgICAvLyBkaXNjYXJkcyBhbiBpbml0aWFsIGJhdGNoIG9mIHZhbHVlcy4gIFRoaXMgaXMgY2FsbGVkIFJDNC1kcm9wWzI1Nl0uXG4gICAgLy8gU2VlIGh0dHA6Ly9nb29nbGUuY29tL3NlYXJjaD9xPXJzYStmbHVocmVyK3Jlc3BvbnNlJmJ0bklcbiAgfSkod2lkdGgpO1xufVxuXG4vL1xuLy8gY29weSgpXG4vLyBDb3BpZXMgaW50ZXJuYWwgc3RhdGUgb2YgQVJDNCB0byBvciBmcm9tIGEgcGxhaW4gb2JqZWN0LlxuLy9cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmkgPSBmLmk7XG4gIHQuaiA9IGYuajtcbiAgdC5TID0gZi5TLnNsaWNlKCk7XG4gIHJldHVybiB0O1xufTtcblxuLy9cbi8vIGZsYXR0ZW4oKVxuLy8gQ29udmVydHMgYW4gb2JqZWN0IHRyZWUgdG8gbmVzdGVkIGFycmF5cyBvZiBzdHJpbmdzLlxuLy9cbmZ1bmN0aW9uIGZsYXR0ZW4ob2JqLCBkZXB0aCkge1xuICB2YXIgcmVzdWx0ID0gW10sIHR5cCA9ICh0eXBlb2Ygb2JqKSwgcHJvcDtcbiAgaWYgKGRlcHRoICYmIHR5cCA9PSAnb2JqZWN0Jykge1xuICAgIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICAgIHRyeSB7IHJlc3VsdC5wdXNoKGZsYXR0ZW4ob2JqW3Byb3BdLCBkZXB0aCAtIDEpKTsgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gIH1cbiAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID8gcmVzdWx0IDogdHlwID09ICdzdHJpbmcnID8gb2JqIDogb2JqICsgJ1xcMCcpO1xufVxuXG4vL1xuLy8gbWl4a2V5KClcbi8vIE1peGVzIGEgc3RyaW5nIHNlZWQgaW50byBhIGtleSB0aGF0IGlzIGFuIGFycmF5IG9mIGludGVnZXJzLCBhbmRcbi8vIHJldHVybnMgYSBzaG9ydGVuZWQgc3RyaW5nIHNlZWQgdGhhdCBpcyBlcXVpdmFsZW50IHRvIHRoZSByZXN1bHQga2V5LlxuLy9cbmZ1bmN0aW9uIG1peGtleShzZWVkLCBrZXkpIHtcbiAgdmFyIHN0cmluZ3NlZWQgPSBzZWVkICsgJycsIHNtZWFyLCBqID0gMDtcbiAgd2hpbGUgKGogPCBzdHJpbmdzZWVkLmxlbmd0aCkge1xuICAgIGtleVttYXNrICYgal0gPVxuICAgICAgbWFzayAmICgoc21lYXIgXj0ga2V5W21hc2sgJiBqXSAqIDE5KSArIHN0cmluZ3NlZWQuY2hhckNvZGVBdChqKyspKTtcbiAgfVxuICByZXR1cm4gdG9zdHJpbmcoa2V5KTtcbn1cblxuLy9cbi8vIGF1dG9zZWVkKClcbi8vIFJldHVybnMgYW4gb2JqZWN0IGZvciBhdXRvc2VlZGluZywgdXNpbmcgd2luZG93LmNyeXB0byBhbmQgTm9kZSBjcnlwdG9cbi8vIG1vZHVsZSBpZiBhdmFpbGFibGUuXG4vL1xuZnVuY3Rpb24gYXV0b3NlZWQoKSB7XG4gIHRyeSB7XG4gICAgdmFyIG91dDtcbiAgICBpZiAobm9kZWNyeXB0byAmJiAob3V0ID0gbm9kZWNyeXB0by5yYW5kb21CeXRlcykpIHtcbiAgICAgIC8vIFRoZSB1c2Ugb2YgJ291dCcgdG8gcmVtZW1iZXIgcmFuZG9tQnl0ZXMgbWFrZXMgdGlnaHQgbWluaWZpZWQgY29kZS5cbiAgICAgIG91dCA9IG91dCh3aWR0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dCA9IG5ldyBVaW50OEFycmF5KHdpZHRoKTtcbiAgICAgIChnbG9iYWwuY3J5cHRvIHx8IGdsb2JhbC5tc0NyeXB0bykuZ2V0UmFuZG9tVmFsdWVzKG91dCk7XG4gICAgfVxuICAgIHJldHVybiB0b3N0cmluZyhvdXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIGJyb3dzZXIgPSBnbG9iYWwubmF2aWdhdG9yLFxuICAgICAgICBwbHVnaW5zID0gYnJvd3NlciAmJiBicm93c2VyLnBsdWdpbnM7XG4gICAgcmV0dXJuIFsrbmV3IERhdGUsIGdsb2JhbCwgcGx1Z2lucywgZ2xvYmFsLnNjcmVlbiwgdG9zdHJpbmcocG9vbCldO1xuICB9XG59XG5cbi8vXG4vLyB0b3N0cmluZygpXG4vLyBDb252ZXJ0cyBhbiBhcnJheSBvZiBjaGFyY29kZXMgdG8gYSBzdHJpbmdcbi8vXG5mdW5jdGlvbiB0b3N0cmluZyhhKSB7XG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KDAsIGEpO1xufVxuXG4vL1xuLy8gV2hlbiBzZWVkcmFuZG9tLmpzIGlzIGxvYWRlZCwgd2UgaW1tZWRpYXRlbHkgbWl4IGEgZmV3IGJpdHNcbi8vIGZyb20gdGhlIGJ1aWx0LWluIFJORyBpbnRvIHRoZSBlbnRyb3B5IHBvb2wuICBCZWNhdXNlIHdlIGRvXG4vLyBub3Qgd2FudCB0byBpbnRlcmZlcmUgd2l0aCBkZXRlcm1pbmlzdGljIFBSTkcgc3RhdGUgbGF0ZXIsXG4vLyBzZWVkcmFuZG9tIHdpbGwgbm90IGNhbGwgbWF0aC5yYW5kb20gb24gaXRzIG93biBhZ2FpbiBhZnRlclxuLy8gaW5pdGlhbGl6YXRpb24uXG4vL1xubWl4a2V5KG1hdGgucmFuZG9tKCksIHBvb2wpO1xuXG4vL1xuLy8gTm9kZWpzIGFuZCBBTUQgc3VwcG9ydDogZXhwb3J0IHRoZSBpbXBsZW1lbnRhdGlvbiBhcyBhIG1vZHVsZSB1c2luZ1xuLy8gZWl0aGVyIGNvbnZlbnRpb24uXG4vL1xuaWYgKCh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHNlZWRyYW5kb207XG4gIC8vIFdoZW4gaW4gbm9kZS5qcywgdHJ5IHVzaW5nIGNyeXB0byBwYWNrYWdlIGZvciBhdXRvc2VlZGluZy5cbiAgdHJ5IHtcbiAgICBub2RlY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG4gIH0gY2F0Y2ggKGV4KSB7fVxufSBlbHNlIGlmICgodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHNlZWRyYW5kb207IH0pO1xufVxuXG4vLyBFbmQgYW5vbnltb3VzIHNjb3BlLCBhbmQgcGFzcyBpbml0aWFsIHZhbHVlcy5cbn0pKFxuICBbXSwgICAgIC8vIHBvb2w6IGVudHJvcHkgcG9vbCBzdGFydHMgZW1wdHlcbiAgTWF0aCAgICAvLyBtYXRoOiBwYWNrYWdlIGNvbnRhaW5pbmcgcmFuZG9tLCBwb3csIGFuZCBzZWVkcmFuZG9tXG4pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dGhyb3cgbmV3IEVycm9yKFwiZGVmaW5lIGNhbm5vdCBiZSB1c2VkIGluZGlyZWN0XCIpO1xufTtcbiIsIi8qIGdsb2JhbHMgX193ZWJwYWNrX2FtZF9vcHRpb25zX18gKi9cbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCAqIGFzIHRmIGZyb20gJ0B0ZW5zb3JmbG93L3RmanMnO1xuaW1wb3J0IHsgdXRpbCwgU3ltYm9saWNUZW5zb3IgfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzJztcbmltcG9ydCB7IGRpc3Bvc2UgfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzJztcbmltcG9ydCB7IGNhcHR1cmUgfSBmcm9tICcuL3V0aWxzL3RmJztcbmltcG9ydCB7IGNyb3BUbyB9IGZyb20gJy4vdXRpbHMvY2FudmFzJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xuXG5jb25zdCBERUZBVUxUX01PQklMRU5FVF9WRVJTSU9OID0gMTtcbmNvbnN0IERFRkFVTFRfVFJBSU5JTkdfTEFZRVJfVjEgPSAnY29udl9wd18xM19yZWx1JztcbmNvbnN0IERFRkFVTFRfVFJBSU5JTkdfTEFZRVJfVjIgPSBcIm91dF9yZWx1XCI7IFxuY29uc3QgREVGQVVMVF9BTFBIQV9WMSA9IDAuMjU7XG5jb25zdCBERUZBVUxUX0FMUEhBX1YyID0gMC4zNTtcbmV4cG9ydCBjb25zdCBJTUFHRV9TSVpFID0gMjI0O1xuXG4vKipcbiAqIHRoZSBtZXRhZGF0YSB0byBkZXNjcmliZSB0aGUgbW9kZWwncyBjcmVhdGlvbixcbiAqIGluY2x1ZGVzIHRoZSBsYWJlbHMgYXNzb2NpYXRlZCB3aXRoIHRoZSBjbGFzc2VzXG4gKiBhbmQgdmVyc2lvbmluZyBpbmZvcm1hdGlvbiBmcm9tIHRyYWluaW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1ldGFkYXRhIHtcbiAgICB0ZmpzVmVyc2lvbjogc3RyaW5nO1xuICAgIHRtVmVyc2lvbj86IHN0cmluZztcbiAgICBwYWNrYWdlVmVyc2lvbjogc3RyaW5nO1xuICAgIHBhY2thZ2VOYW1lOiBzdHJpbmc7XG4gICAgbW9kZWxOYW1lPzogc3RyaW5nO1xuICAgIHRpbWVTdGFtcD86IHN0cmluZztcbiAgICBsYWJlbHM6IHN0cmluZ1tdO1xuICAgIHVzZXJNZXRhZGF0YT86IHt9O1xuICAgIGdyYXlzY2FsZT86IGJvb2xlYW47XG4gICAgaW1hZ2VTaXplPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGVsT3B0aW9ucyB7XG4gICAgdmVyc2lvbj86IG51bWJlcjtcbiAgICBjaGVja3BvaW50VXJsPzogc3RyaW5nO1xuICAgIGFscGhhPzogbnVtYmVyO1xuICAgIHRyYWluaW5nTGF5ZXI/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVjZWl2ZXMgYSBNZXRhZGF0YSBvYmplY3QgYW5kIGZpbGxzIGluIHRoZSBvcHRpb25hbCBmaWVsZHMgc3VjaCBhcyB0aW1lU3RhbXBcbiAqIEBwYXJhbSBkYXRhIGEgTWV0YWRhdGEgb2JqZWN0XG4gKi9cbmNvbnN0IGZpbGxNZXRhZGF0YSA9IChkYXRhOiBQYXJ0aWFsPE1ldGFkYXRhPikgPT4ge1xuICAgIC8vIHV0aWwuYXNzZXJ0KHR5cGVvZiBkYXRhLnRmanNWZXJzaW9uID09PSAnc3RyaW5nJywgKCkgPT4gYG1ldGFkYXRhLnRmanNWZXJzaW9uIGlzIGludmFsaWRgKTtcbiAgICBkYXRhLnBhY2thZ2VWZXJzaW9uID0gZGF0YS5wYWNrYWdlVmVyc2lvbiB8fCB2ZXJzaW9uO1xuICAgIGRhdGEucGFja2FnZU5hbWUgPSBkYXRhLnBhY2thZ2VOYW1lIHx8ICdAdGVhY2hhYmxlbWFjaGluZS9pbWFnZSc7XG4gICAgZGF0YS50aW1lU3RhbXAgPSBkYXRhLnRpbWVTdGFtcCB8fCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgZGF0YS51c2VyTWV0YWRhdGEgPSBkYXRhLnVzZXJNZXRhZGF0YSB8fCB7fTtcbiAgICBkYXRhLm1vZGVsTmFtZSA9IGRhdGEubW9kZWxOYW1lIHx8ICd1bnRpdGxlZCc7XG4gICAgZGF0YS5sYWJlbHMgPSBkYXRhLmxhYmVscyB8fCBbXTtcbiAgICBkYXRhLmltYWdlU2l6ZSA9IGRhdGEuaW1hZ2VTaXplIHx8IElNQUdFX1NJWkU7XG4gICAgcmV0dXJuIGRhdGEgYXMgTWV0YWRhdGE7XG59O1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG5jb25zdCBpc01ldGFkYXRhID0gKGM6IGFueSk6IGMgaXMgTWV0YWRhdGEgPT5cbiAgICAhIWMgJiYgQXJyYXkuaXNBcnJheShjLmxhYmVscyk7XG5cbmNvbnN0IGlzQWxwaGFWYWxpZCA9ICh2ZXJzaW9uOiBudW1iZXIsIGFscGhhOiBudW1iZXIpID0+IHtcbiAgICBpZiAodmVyc2lvbiA9PT0gMSkge1xuICAgICAgICBpZiAoYWxwaGEgIT09IDAuMjUgJiYgYWxwaGEgIT09IDAuNSAmJiBhbHBoYSAhPT0gMC43NSAmJiBhbHBoYSAhPT0gMSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiSW52YWxpZCBhbHBoYS4gT3B0aW9ucyBhcmU6IDAuMjUsIDAuNTAsIDAuNzUgb3IgMS4wMC5cIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgbW9kZWwgd2l0aCBhbHBoYTogXCIsIERFRkFVTFRfQUxQSEFfVjEudG9GaXhlZCgyKSk7IFxuICAgICAgICAgICAgcmV0dXJuIERFRkFVTFRfQUxQSEFfVjE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChhbHBoYSAhPT0gMC4zNSAmJiBhbHBoYSAhPT0gMC41ICYmIGFscGhhICE9PSAwLjc1ICYmIGFscGhhICE9PSAxKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJJbnZhbGlkIGFscGhhLiBPcHRpb25zIGFyZTogMC4zNSwgMC41MCwgMC43NSBvciAxLjAwLlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBtb2RlbCB3aXRoIGFscGhhOiBcIiwgREVGQVVMVF9BTFBIQV9WMi50b0ZpeGVkKDIpKTsgXG4gICAgICAgICAgICByZXR1cm4gREVGQVVMVF9BTFBIQV9WMjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhbHBoYTtcbn07XG5cbmNvbnN0IHBhcnNlTW9kZWxPcHRpb25zID0gKG9wdGlvbnM/OiBNb2RlbE9wdGlvbnMpID0+IHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gICAgaWYgKG9wdGlvbnMuY2hlY2twb2ludFVybCAmJiBvcHRpb25zLnRyYWluaW5nTGF5ZXIpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxwaGEgfHwgb3B0aW9ucy52ZXJzaW9uKXtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNoZWNrcG9pbnQgVVJMIHBhc3NlZCB0byBtb2RlbE9wdGlvbnMsIGFscGhhIG9wdGlvbnMgYXJlIGlnbm9yZWRcIik7XG4gICAgICAgIH0gICAgICAgIFxuICAgICAgICByZXR1cm4gW29wdGlvbnMuY2hlY2twb2ludFVybCwgb3B0aW9ucy50cmFpbmluZ0xheWVyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLnZlcnNpb24gPSBvcHRpb25zLnZlcnNpb24gfHwgREVGQVVMVF9NT0JJTEVORVRfVkVSU0lPTjtcbiAgICAgICAgXG4gICAgICAgIGlmKG9wdGlvbnMudmVyc2lvbiA9PT0gMSl7XG4gICAgICAgICAgICBvcHRpb25zLmFscGhhID0gb3B0aW9ucy5hbHBoYSB8fCBERUZBVUxUX0FMUEhBX1YxOyAgXG4gICAgICAgICAgICBvcHRpb25zLmFscGhhID0gaXNBbHBoYVZhbGlkKG9wdGlvbnMudmVyc2lvbiwgb3B0aW9ucy5hbHBoYSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBMb2FkaW5nIG1vYmlsZW5ldCAke29wdGlvbnMudmVyc2lvbn0gYW5kIGFscGhhICR7b3B0aW9ucy5hbHBoYX1gKTtcbiAgICAgICAgICAgIC8vIGV4Y2VwdGlvbiBpcyBhbHBoYSBvZiAxIGNhbiBvbmx5IGJlIDEuMFxuICAgICAgICAgICAgbGV0IGFscGhhU3RyaW5nID0gb3B0aW9ucy5hbHBoYS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgaWYgKGFscGhhU3RyaW5nID09PSBcIjEuMDBcIikgeyBhbHBoYVN0cmluZyA9IFwiMS4wXCI7IH1cblxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoICAgICAgICBcbiAgICAgICAgICAgICAgICBgaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3RmanMtbW9kZWxzL3RmanMvbW9iaWxlbmV0X3YxXyR7YWxwaGFTdHJpbmd9XyR7SU1BR0VfU0laRX0vbW9kZWwuanNvbmAsXG4gICAgICAgICAgICAgICAgREVGQVVMVF9UUkFJTklOR19MQVlFUl9WMVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25zLnZlcnNpb24gPT09IDIpe1xuICAgICAgICAgICAgb3B0aW9ucy5hbHBoYSA9IG9wdGlvbnMuYWxwaGEgfHwgREVGQVVMVF9BTFBIQV9WMjsgIFxuICAgICAgICAgICAgb3B0aW9ucy5hbHBoYSA9IGlzQWxwaGFWYWxpZChvcHRpb25zLnZlcnNpb24sIG9wdGlvbnMuYWxwaGEpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTG9hZGluZyBtb2JpbGVuZXQgJHtvcHRpb25zLnZlcnNpb259IGFuZCBhbHBoYSAke29wdGlvbnMuYWxwaGF9YCk7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGggICAgICAgIFxuICAgICAgICAgICAgICAgIGBodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdGVhY2hhYmxlLW1hY2hpbmUtbW9kZWxzL21vYmlsZW5ldF92Ml93ZWlnaHRzX3RmX2RpbV9vcmRlcmluZ190Zl9rZXJuZWxzXyR7b3B0aW9ucy5hbHBoYS50b0ZpeGVkKDIpfV8ke0lNQUdFX1NJWkV9X25vX3RvcC9tb2RlbC5qc29uYCxcbiAgICAgICAgICAgICAgICBERUZBVUxUX1RSQUlOSU5HX0xBWUVSX1YyXG4gICAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNb2JpbGVOZXQgViR7b3B0aW9ucy52ZXJzaW9ufSBkb2Vzbid0IGV4aXN0YCk7XG4gICAgICAgIH0gICBcbiAgICB9XG59O1xuXG4vKipcbiAqIHByb2Nlc3MgZWl0aGVyIGEgVVJMIHN0cmluZyBvciBhIE1ldGFkYXRhIG9iamVjdFxuICogQHBhcmFtIG1ldGFkYXRhIGEgdXJsIHRvIGxvYWQgbWV0YWRhdGEgb3IgYSBNZXRhZGF0YSBvYmplY3RcbiAqL1xuY29uc3QgcHJvY2Vzc01ldGFkYXRhID0gYXN5bmMgKG1ldGFkYXRhOiBzdHJpbmcgfCBNZXRhZGF0YSkgPT4ge1xuICAgIGxldCBtZXRhZGF0YUpTT046IE1ldGFkYXRhO1xuICAgIGlmICh0eXBlb2YgbWV0YWRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhUmVzcG9uc2UgPSBhd2FpdCBmZXRjaChtZXRhZGF0YSk7XG4gICAgICAgIG1ldGFkYXRhSlNPTiA9IGF3YWl0IG1ldGFkYXRhUmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSBpZiAoaXNNZXRhZGF0YShtZXRhZGF0YSkpIHtcbiAgICAgICAgbWV0YWRhdGFKU09OID0gbWV0YWRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIE1ldGFkYXRhIHByb3ZpZGVkJyk7XG4gICAgfVxuICAgIHJldHVybiBmaWxsTWV0YWRhdGEobWV0YWRhdGFKU09OKTtcbn07XG5cbmV4cG9ydCB0eXBlIENsYXNzaWZpZXJJbnB1dFNvdXJjZSA9IEhUTUxJbWFnZUVsZW1lbnQgfCBIVE1MQ2FudmFzRWxlbWVudCB8IEhUTUxWaWRlb0VsZW1lbnQgfCBJbWFnZUJpdG1hcDtcblxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBwcm9iYWJpbGl0aWVzIG9mIHRoZSB0b3BLIGNsYXNzZXMgZ2l2ZW4gbG9naXRzIGJ5IGNvbXB1dGluZ1xuICogc29mdG1heCB0byBnZXQgcHJvYmFiaWxpdGllcyBhbmQgdGhlbiBzb3J0aW5nIHRoZSBwcm9iYWJpbGl0aWVzLlxuICogQHBhcmFtIGxvZ2l0cyBUZW5zb3IgcmVwcmVzZW50aW5nIHRoZSBsb2dpdHMgZnJvbSBNb2JpbGVOZXQuXG4gKiBAcGFyYW0gdG9wSyBUaGUgbnVtYmVyIG9mIHRvcCBwcmVkaWN0aW9ucyB0byBzaG93LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VG9wS0NsYXNzZXMobGFiZWxzOiBzdHJpbmdbXSwgbG9naXRzOiB0Zi5UZW5zb3I8dGYuUmFuaz4sIHRvcEsgPSAzKSB7XG4gIGNvbnN0IHZhbHVlcyA9IGF3YWl0IGxvZ2l0cy5kYXRhKCk7XG4gIHJldHVybiB0Zi50aWR5KCgpID0+IHtcbiAgICAgIHRvcEsgPSBNYXRoLm1pbih0b3BLLCB2YWx1ZXMubGVuZ3RoKTtcblxuICAgICAgY29uc3QgdmFsdWVzQW5kSW5kaWNlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YWx1ZXNBbmRJbmRpY2VzLnB1c2goe3ZhbHVlOiB2YWx1ZXNbaV0sIGluZGV4OiBpfSk7XG4gICAgICB9XG4gICAgICB2YWx1ZXNBbmRJbmRpY2VzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICByZXR1cm4gYi52YWx1ZSAtIGEudmFsdWU7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHRvcGtWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KHRvcEspO1xuICAgICAgY29uc3QgdG9wa0luZGljZXMgPSBuZXcgSW50MzJBcnJheSh0b3BLKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9wSzsgaSsrKSB7XG4gICAgICAgICAgdG9wa1ZhbHVlc1tpXSA9IHZhbHVlc0FuZEluZGljZXNbaV0udmFsdWU7XG4gICAgICAgICAgdG9wa0luZGljZXNbaV0gPSB2YWx1ZXNBbmRJbmRpY2VzW2ldLmluZGV4O1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0b3BDbGFzc2VzQW5kUHJvYnMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG9wa0luZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0b3BDbGFzc2VzQW5kUHJvYnMucHVzaCh7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogbGFiZWxzW3RvcGtJbmRpY2VzW2ldXSwgLy9JTUFHRU5FVF9DTEFTU0VTW3RvcGtJbmRpY2VzW2ldXSxcbiAgICAgICAgICAgICAgcHJvYmFiaWxpdHk6IHRvcGtWYWx1ZXNbaV1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3BDbGFzc2VzQW5kUHJvYnM7XG4gIH0pO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBDdXN0b21Nb2JpbGVOZXQge1xuICAgIC8qKlxuICAgICAqIHRoZSB0cnVuY2F0ZWQgbW9iaWxlbmV0IG1vZGVsIHdlIHdpbGwgdHJhaW4gb24gdG9wIG9mXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRydW5jYXRlZE1vZGVsOiB0Zi5MYXllcnNNb2RlbDtcblxuICAgIHN0YXRpYyBnZXQgRVhQRUNURURfSU1BR0VfU0laRSgpIHtcbiAgICAgICAgcmV0dXJuIElNQUdFX1NJWkU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9tZXRhZGF0YTogTWV0YWRhdGE7XG4gICAgcHVibGljIGdldE1ldGFkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGE7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIG1vZGVsOiB0Zi5MYXllcnNNb2RlbCwgbWV0YWRhdGE6IFBhcnRpYWw8TWV0YWRhdGE+KSB7XG4gICAgICAgIHRoaXMuX21ldGFkYXRhID0gZmlsbE1ldGFkYXRhKG1ldGFkYXRhKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIHRvdGFsIG51bWJlciBvZiBjbGFzc2VzIGV4aXN0aW5nIHdpdGhpbiBtb2RlbFxuICAgICAqL1xuICAgIGdldFRvdGFsQ2xhc3NlcygpIHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5tb2RlbC5vdXRwdXQgYXMgU3ltYm9saWNUZW5zb3I7XG4gICAgICAgIGNvbnN0IHRvdGFsQ2xhc3NlcyA9IG91dHB1dC5zaGFwZVsxXTtcbiAgICAgICAgcmV0dXJuIHRvdGFsQ2xhc3NlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIG1vZGVsIGxhYmVsc1xuICAgICAqL1xuICAgIGdldENsYXNzTGFiZWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGEubGFiZWxzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGFuIGltYWdlIGVsZW1lbnQsIG1ha2VzIGEgcHJlZGljdGlvbiB0aHJvdWdoIG1vYmlsZW5ldCByZXR1cm5pbmcgdGhlXG4gICAgICogcHJvYmFiaWxpdGllcyBvZiB0aGUgdG9wIEsgY2xhc3Nlcy5cbiAgICAgKiBAcGFyYW0gaW1hZ2UgdGhlIGltYWdlIHRvIGNsYXNzaWZ5XG4gICAgICogQHBhcmFtIG1heFByZWRpY3Rpb25zIHRoZSBtYXhpbXVtIG51bWJlciBvZiBjbGFzc2lmaWNhdGlvbiBwcmVkaWN0aW9uc1xuICAgICAqL1xuICAgIGFzeW5jIHByZWRpY3RUb3BLKGltYWdlOiBDbGFzc2lmaWVySW5wdXRTb3VyY2UsIG1heFByZWRpY3Rpb25zID0gMTAsIGZsaXBwZWQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBjcm9wcGVkSW1hZ2UgPSBjcm9wVG8oaW1hZ2UsIHRoaXMuX21ldGFkYXRhLmltYWdlU2l6ZSwgZmxpcHBlZCk7XG5cbiAgICAgICAgY29uc3QgbG9naXRzID0gdGYudGlkeSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYXB0dXJlZCA9IGNhcHR1cmUoY3JvcHBlZEltYWdlLCB0aGlzLl9tZXRhZGF0YS5ncmF5c2NhbGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwucHJlZGljdChjYXB0dXJlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbnZlcnQgbG9naXRzIHRvIHByb2JhYmlsaXRpZXMgYW5kIGNsYXNzIG5hbWVzLlxuICAgICAgICBjb25zdCBjbGFzc2VzID0gYXdhaXQgZ2V0VG9wS0NsYXNzZXModGhpcy5fbWV0YWRhdGEubGFiZWxzLCBsb2dpdHMgYXMgdGYuVGVuc29yPHRmLlJhbms+LCBtYXhQcmVkaWN0aW9ucyk7XG4gICAgICAgIGRpc3Bvc2UobG9naXRzKTtcblxuICAgICAgICByZXR1cm4gY2xhc3NlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiBhbiBpbWFnZSBlbGVtZW50LCBtYWtlcyBhIHByZWRpY3Rpb24gdGhyb3VnaCBtb2JpbGVuZXQgcmV0dXJuaW5nIHRoZVxuICAgICAqIHByb2JhYmlsaXRpZXMgZm9yIEFMTCBjbGFzc2VzLlxuICAgICAqIEBwYXJhbSBpbWFnZSB0aGUgaW1hZ2UgdG8gY2xhc3NpZnlcbiAgICAgKiBAcGFyYW0gZmxpcHBlZCB3aGV0aGVyIHRvIGZsaXAgdGhlIGltYWdlIG9uIFhcbiAgICAgKi9cbiAgICBhc3luYyBwcmVkaWN0KGltYWdlOiBDbGFzc2lmaWVySW5wdXRTb3VyY2UsIGZsaXBwZWQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBjcm9wcGVkSW1hZ2UgPSBjcm9wVG8oaW1hZ2UsIHRoaXMuX21ldGFkYXRhLmltYWdlU2l6ZSwgZmxpcHBlZCk7XG5cbiAgICAgICAgY29uc3QgbG9naXRzID0gdGYudGlkeSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYXB0dXJlZCA9IGNhcHR1cmUoY3JvcHBlZEltYWdlLCB0aGlzLl9tZXRhZGF0YS5ncmF5c2NhbGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwucHJlZGljdChjYXB0dXJlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IGF3YWl0IChsb2dpdHMgYXMgdGYuVGVuc29yPHRmLlJhbms+KS5kYXRhKCk7XG5cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2xhc3Nlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuX21ldGFkYXRhLmxhYmVsc1tpXSxcbiAgICAgICAgICAgICAgICBwcm9iYWJpbGl0eTogdmFsdWVzW2ldXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc3Bvc2UobG9naXRzKTtcblxuICAgICAgICByZXR1cm4gY2xhc3NlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy50cnVuY2F0ZWRNb2RlbC5kaXNwb3NlKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIGxvYWQgdGhlIGJhc2UgbW9iaWxlbmV0IG1vZGVsXG4gKiBAcGFyYW0gbW9kZWxPcHRpb25zIG9wdGlvbnMgZGV0ZXJtaW5pbmcgd2hhdCBtb2RlbCB0byBsb2FkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkVHJ1bmNhdGVkTW9iaWxlTmV0KG1vZGVsT3B0aW9ucz86IE1vZGVsT3B0aW9ucykge1xuICAgIGNvbnN0IFtjaGVja3BvaW50VXJsLCB0cmFpbmluZ0xheWVyXSA9IHBhcnNlTW9kZWxPcHRpb25zKG1vZGVsT3B0aW9ucyk7XG4gICAgY29uc3QgbW9iaWxlbmV0ID0gYXdhaXQgdGYubG9hZExheWVyc01vZGVsKGNoZWNrcG9pbnRVcmwpO1xuXG4gICAgaWYgKG1vZGVsT3B0aW9ucyAmJiBtb2RlbE9wdGlvbnMudmVyc2lvbiA9PT0gMSl7XG4gICAgICAgIGNvbnN0IGxheWVyID0gbW9iaWxlbmV0LmdldExheWVyKHRyYWluaW5nTGF5ZXIpO1xuICAgICAgICBjb25zdCB0cnVuY2F0ZWRNb2RlbCA9IHRmLm1vZGVsKHsgaW5wdXRzOiBtb2JpbGVuZXQuaW5wdXRzLCBvdXRwdXRzOiBsYXllci5vdXRwdXQgfSk7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGYuc2VxdWVudGlhbCgpO1xuICAgICAgICBtb2RlbC5hZGQodHJ1bmNhdGVkTW9kZWwpO1xuICAgICAgICBtb2RlbC5hZGQodGYubGF5ZXJzLmZsYXR0ZW4oKSk7XG4gICAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGxheWVyID0gbW9iaWxlbmV0LmdldExheWVyKHRyYWluaW5nTGF5ZXIpO1xuICAgICAgICBjb25zdCB0cnVuY2F0ZWRNb2RlbCA9IHRmLm1vZGVsKHsgaW5wdXRzOiBtb2JpbGVuZXQuaW5wdXRzLCBvdXRwdXRzOiBsYXllci5vdXRwdXQgfSk7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGYuc2VxdWVudGlhbCgpO1xuICAgICAgICBtb2RlbC5hZGQodHJ1bmNhdGVkTW9kZWwpO1xuICAgICAgICBtb2RlbC5hZGQodGYubGF5ZXJzLmdsb2JhbEF2ZXJhZ2VQb29saW5nMmQoe30pKTsgLy8gZ28gZnJvbSBzaGFwZSBbNywgNywgMTI4MF0gdG8gWzEyODBdXG4gICAgICAgIHJldHVybiBtb2RlbDtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkKG1vZGVsOiBzdHJpbmcsIG1ldGFkYXRhPzogc3RyaW5nIHwgTWV0YWRhdGEgKSB7XG4gICAgY29uc3QgY3VzdG9tTW9kZWwgPSBhd2FpdCB0Zi5sb2FkTGF5ZXJzTW9kZWwobW9kZWwpO1xuICAgIGNvbnN0IG1ldGFkYXRhSlNPTiA9IG1ldGFkYXRhID8gYXdhaXQgcHJvY2Vzc01ldGFkYXRhKG1ldGFkYXRhKSA6IG51bGw7XG4gICAgcmV0dXJuIG5ldyBDdXN0b21Nb2JpbGVOZXQoY3VzdG9tTW9kZWwsIG1ldGFkYXRhSlNPTik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkRnJvbUZpbGVzKG1vZGVsOiBGaWxlLCB3ZWlnaHRzOiBGaWxlLCBtZXRhZGF0YTogRmlsZSkge1xuICAgIGNvbnN0IGN1c3RvbU1vZGVsID0gYXdhaXQgdGYubG9hZExheWVyc01vZGVsKHRmLmlvLmJyb3dzZXJGaWxlcyhbbW9kZWwsIHdlaWdodHNdKSk7XG4gICAgY29uc3QgbWV0YWRhdGFGaWxlID0gYXdhaXQgbmV3IFJlc3BvbnNlKG1ldGFkYXRhKS5qc29uKCk7XG4gICAgY29uc3QgbWV0YWRhdGFKU09OID0gbWV0YWRhdGEgPyBhd2FpdCBwcm9jZXNzTWV0YWRhdGEobWV0YWRhdGFGaWxlKSA6IG51bGw7XG4gICAgcmV0dXJuIG5ldyBDdXN0b21Nb2JpbGVOZXQoY3VzdG9tTW9kZWwsIG1ldGFkYXRhSlNPTik7XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmV4cG9ydCB7XG4gICAgTWV0YWRhdGEsXG4gICAgSU1BR0VfU0laRSxcbiAgICBDbGFzc2lmaWVySW5wdXRTb3VyY2UsXG4gICAgQ3VzdG9tTW9iaWxlTmV0LFxuICAgIGxvYWQsXG4gICAgbG9hZEZyb21GaWxlcyxcbiAgICBsb2FkVHJ1bmNhdGVkTW9iaWxlTmV0XG59IGZyb20gJy4vY3VzdG9tLW1vYmlsZW5ldCc7XG5cbmV4cG9ydCB7IFRlYWNoYWJsZU1vYmlsZU5ldCwgY3JlYXRlVGVhY2hhYmxlIH0gZnJvbSAnLi90ZWFjaGFibGUtbW9iaWxlbmV0JztcbmV4cG9ydCB7IFdlYmNhbSB9IGZyb20gJy4vdXRpbHMvd2ViY2FtJztcbmV4cG9ydCB7IHZlcnNpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTkgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQgKiBhcyB0ZiBmcm9tICdAdGVuc29yZmxvdy90ZmpzJztcbmltcG9ydCB7IHV0aWwsIFJhbmsgfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzJztcbmltcG9ydCB7IGNhcHR1cmUgfSBmcm9tICcuL3V0aWxzL3RmJztcbmltcG9ydCB7IFRlbnNvckNvbnRhaW5lciB9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZS9kaXN0L3RlbnNvcl90eXBlcyc7XG5pbXBvcnQgeyBDdXN0b21DYWxsYmFja0FyZ3MgfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzJztcbmltcG9ydCB7IEN1c3RvbU1vYmlsZU5ldCxcbiAgICBNZXRhZGF0YSxcbiAgICBsb2FkVHJ1bmNhdGVkTW9iaWxlTmV0LFxuICAgIENsYXNzaWZpZXJJbnB1dFNvdXJjZSxcbiAgICBNb2RlbE9wdGlvbnNcbn0gZnJvbSAnLi9jdXN0b20tbW9iaWxlbmV0JztcbmltcG9ydCAqIGFzIHNlZWRyYW5kb20gZnJvbSAnc2VlZHJhbmRvbSc7XG5pbXBvcnQgeyBJbml0aWFsaXplciB9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtbGF5ZXJzL2Rpc3QvaW5pdGlhbGl6ZXJzJztcblxuY29uc3QgVkFMSURBVElPTl9GUkFDVElPTiA9IDAuMTU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhaW5pbmdQYXJhbWV0ZXJzIHtcbiAgICBkZW5zZVVuaXRzOiBudW1iZXI7XG4gICAgZXBvY2hzOiBudW1iZXI7XG4gICAgbGVhcm5pbmdSYXRlOiBudW1iZXI7XG4gICAgYmF0Y2hTaXplOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBTYW1wbGUge1xuICAgIGRhdGE6IEZsb2F0MzJBcnJheTtcbiAgICBsYWJlbDogbnVtYmVyW107XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbmNvbnN0IGlzVGVuc29yID0gKGM6IGFueSk6IGMgaXMgdGYuVGVuc29yID0+XG4gICAgdHlwZW9mIGMuZGF0YUlkID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYy5zaGFwZSA9PT0gJ29iamVjdCc7XG5cbi8qKlxuICogQ29udmVydHMgYW4gaW50ZWdlciBpbnRvIGl0cyBvbmUtaG90IHJlcHJlc2VudGF0aW9uIGFuZCByZXR1cm5zXG4gKiB0aGUgZGF0YSBhcyBhIEpTIEFycmF5LlxuICovXG5mdW5jdGlvbiBmbGF0T25lSG90KGxhYmVsOiBudW1iZXIsIG51bUNsYXNzZXM6IG51bWJlcikge1xuICAgIGNvbnN0IGxhYmVsT25lSG90ID0gbmV3IEFycmF5KG51bUNsYXNzZXMpLmZpbGwoMCkgYXMgbnVtYmVyW107XG4gICAgbGFiZWxPbmVIb3RbbGFiZWxdID0gMTtcblxuICAgIHJldHVybiBsYWJlbE9uZUhvdDtcbn1cblxuLyoqXG4gKiBTaHVmZmxlIGFuIGFycmF5IG9mIEZsb2F0MzJBcnJheSBvciBTYW1wbGVzIHVzaW5nIEZpc2hlci1ZYXRlcyBhbGdvcml0aG1cbiAqIFRha2VzIGFuIG9wdGlvbmFsIHNlZWQgdmFsdWUgdG8gbWFrZSBzaHVmZmxpbmcgcHJlZGljdGFibGVcbiAqL1xuZnVuY3Rpb24gZmlzaGVyWWF0ZXMoYXJyYXk6IEZsb2F0MzJBcnJheVtdIHwgU2FtcGxlW10sIHNlZWQ/OiBzZWVkcmFuZG9tLnBybmcpIHtcbiAgICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgICAvLyBuZWVkIHRvIGNsb25lIGFycmF5IG9yIHdlJ2QgYmUgZWRpdGluZyBvcmlnaW5hbCBhcyB3ZSBnb29cbiAgICBjb25zdCBzaHVmZmxlZCA9IGFycmF5LnNsaWNlKCk7XG5cbiAgICBmb3IgKGxldCBpID0gKGxlbmd0aCAtIDEpOyBpID4gMDsgaSAtPSAxKSB7XG4gICAgICAgIGxldCByYW5kb21JbmRleCA7XG4gICAgICAgIGlmIChzZWVkKSB7XG4gICAgICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3Ioc2VlZCgpICogKGkgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgW3NodWZmbGVkW2ldLCBzaHVmZmxlZFtyYW5kb21JbmRleF1dID0gW3NodWZmbGVkW3JhbmRvbUluZGV4XSxzaHVmZmxlZFtpXV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNodWZmbGVkO1xufVxuXG5leHBvcnQgY2xhc3MgVGVhY2hhYmxlTW9iaWxlTmV0IGV4dGVuZHMgQ3VzdG9tTW9iaWxlTmV0IHtcbiAgICAvKipcbiAgICAgKiB0aGUgdHJhaW5pbmcgbW9kZWwgZm9yIHRyYW5zZmVyIGxlYXJuaW5nXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHRyYWluaW5nTW9kZWw6IHRmLkxheWVyc01vZGVsO1xuXG4gICAgLyoqXG4gICAgICogVHJhaW5pbmcgYW5kIHZhbGlkYXRpb24gZGF0YXNldHNcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyYWluRGF0YXNldDogdGYuZGF0YS5EYXRhc2V0PFRlbnNvckNvbnRhaW5lcj47XG4gICAgcHJpdmF0ZSB2YWxpZGF0aW9uRGF0YXNldDogdGYuZGF0YS5EYXRhc2V0PFRlbnNvckNvbnRhaW5lcj47XG5cbiAgICBwcml2YXRlIF9fc3RvcFRyYWluaW5nUmVzb2x2ZTogKCkgPT4gdm9pZDtcbiAgICAvLyBwcml2YXRlIF9fc3RvcFRyYWluaW5nUmVqZWN0OiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkO1xuXG4gICAgLy8gTnVtYmVyIG9mIHRvdGFsIHNhbXBsZXNcbiAgICBwcml2YXRlIHRvdGFsU2FtcGxlcyA9IDA7XG5cbiAgICAvLyBBcnJheSBvZiBhbGwgdGhlIGV4YW1wbGVzIGNvbGxlY3RlZFxuICAgIHB1YmxpYyBleGFtcGxlczogRmxvYXQzMkFycmF5W11bXSA9IFtdO1xuXG4gICAgLy8gT3B0aW9uYWwgc2VlZCB0byBtYWtlIHNodWZmbGluZyBvZiBkYXRhIHByZWRpY3RhYmxlXG4gICAgcHJpdmF0ZSBzZWVkOiBzZWVkcmFuZG9tLnBybmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih0cnVuY2F0ZWQ6IHRmLkxheWVyc01vZGVsLCBtZXRhZGF0YTogUGFydGlhbDxNZXRhZGF0YT4pIHtcbiAgICAgICAgc3VwZXIodGYuc2VxdWVudGlhbCgpLCBtZXRhZGF0YSk7XG4gICAgICAgIC8vIHRoZSBwcm92aWRlZCBtb2RlbCBpcyB0aGUgdHJ1bmNhdGVkIG1vYmlsZW5ldFxuICAgICAgICB0aGlzLnRydW5jYXRlZE1vZGVsID0gdHJ1bmNhdGVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYXNTZXF1ZW50aWFsTW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsIGFzIHRmLlNlcXVlbnRpYWw7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBoYXMgdGhlIHRlYWNoYWJsZSBtb2RlbCBiZWVuIHRyYWluZWQ/XG4gICAgICovXG4gICAgcHVibGljIGdldCBpc1RyYWluZWQoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5sYXllcnMgJiYgdGhpcy5tb2RlbC5sYXllcnMubGVuZ3RoID4gMjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBoYXMgdGhlIGRhdGFzZXQgYmVlbiBwcmVwYXJlZCB3aXRoIGFsbCBsYWJlbHMgYW5kIHNhbXBsZXMgcHJvY2Vzc2VkP1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaXNQcmVwYXJlZCgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy50cmFpbkRhdGFzZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaG93IG1hbnkgY2xhc3NlcyBhcmUgaW4gdGhlIGRhdGFzZXQ/XG4gICAgICovXG4gICAgcHVibGljIGdldCBudW1DbGFzc2VzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhZGF0YS5sYWJlbHMubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIHNhbXBsZSBvZiBkYXRhIHVuZGVyIHRoZSBwcm92aWRlZCBjbGFzc05hbWVcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lIHRoZSBjbGFzc2lmaWNhdGlvbiB0aGlzIGV4YW1wbGUgYmVsb25ncyB0b1xuICAgICAqIEBwYXJhbSBzYW1wbGUgdGhlIGltYWdlIC8gdGVuc29yIHRoYXQgYmVsb25ncyBpbiB0aGlzIGNsYXNzaWZpY2F0aW9uXG4gICAgICovXG4gICAgLy8gcHVibGljIGFzeW5jIGFkZEV4YW1wbGUoY2xhc3NOYW1lOiBudW1iZXIsIHNhbXBsZTogSFRNTENhbnZhc0VsZW1lbnQgfCB0Zi5UZW5zb3IpIHtcbiAgICBwdWJsaWMgYXN5bmMgYWRkRXhhbXBsZShjbGFzc05hbWU6IG51bWJlciwgc2FtcGxlOiBIVE1MSW1hZ2VFbGVtZW50IHwgSFRNTENhbnZhc0VsZW1lbnQgfCB0Zi5UZW5zb3IpIHtcbiAgICAgICAgY29uc3QgY2FwID0gaXNUZW5zb3Ioc2FtcGxlKSA/IHNhbXBsZSA6IGNhcHR1cmUoc2FtcGxlLCB0aGlzLl9tZXRhZGF0YS5ncmF5c2NhbGUpO1xuICAgICAgICBjb25zdCBleGFtcGxlID0gdGhpcy50cnVuY2F0ZWRNb2RlbC5wcmVkaWN0KGNhcCkgYXMgdGYuVGVuc29yO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2YXRpb24gPSBleGFtcGxlLmRhdGFTeW5jKCkgYXMgRmxvYXQzMkFycmF5O1xuICAgICAgICBjYXAuZGlzcG9zZSgpO1xuICAgICAgICBleGFtcGxlLmRpc3Bvc2UoKTtcblxuICAgICAgICAvLyBzYXZlIHNhbXBsZXMgb2YgZWFjaCBjbGFzcyBzZXBhcmF0ZWx5XG4gICAgICAgIHRoaXMuZXhhbXBsZXNbY2xhc3NOYW1lXS5wdXNoKGFjdGl2YXRpb24pO1xuXG4gICAgICAgIC8vIGluY3JlYXNlIG91ciBzYW1wbGUgY291bnRlclxuICAgICAgICB0aGlzLnRvdGFsU2FtcGxlcysrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsYXNzaWZ5IGFuIGlucHV0IGltYWdlIC8gVGVuc29yIHdpdGggeW91ciB0cmFpbmVkIG1vZGVsLiBSZXR1cm4gYWxsIHJlc3VsdHMuXG4gICAgICogQHBhcmFtIGltYWdlIHRoZSBpbnB1dCBpbWFnZSAvIFRlbnNvciB0byBjbGFzc2lmeSBhZ2FpbnN0IHlvdXIgbW9kZWxcbiAgICAgKiBAcGFyYW0gdG9wSyBob3cgbWFueSBvZiB0aGUgdG9wIHJlc3VsdHMgZG8geW91IHdhbnQ/IGRlZmF1dGxzIHRvIDNcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcHJlZGljdChpbWFnZTogQ2xhc3NpZmllcklucHV0U291cmNlLCBmbGlwcGVkID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsIGhhcyBub3QgYmVlbiB0cmFpbmVkIHlldCwgY2FsbGVkIHRyYWluKCkgZmlyc3QnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIucHJlZGljdChpbWFnZSwgZmxpcHBlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xhc3NpZnkgYW4gaW5wdXQgaW1hZ2UgLyBUZW5zb3Igd2l0aCB5b3VyIHRyYWluZWQgbW9kZWwuIFJldHVybiB0b3BLIHJlc3VsdHNcbiAgICAgKiBAcGFyYW0gaW1hZ2UgdGhlIGlucHV0IGltYWdlIC8gVGVuc29yIHRvIGNsYXNzaWZ5IGFnYWluc3QgeW91ciBtb2RlbFxuICAgICAqIEBwYXJhbSBtYXhQcmVkaWN0aW9ucyBob3cgbWFueSBvZiB0aGUgdG9wIHJlc3VsdHMgZG8geW91IHdhbnQ/IGRlZmF1dGxzIHRvIDNcbiAgICAgKiBAcGFyYW0gZmxpcHBlZCB3aGV0aGVyIHRvIGZsaXAgYW4gaW1hZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcHJlZGljdFRvcEsoaW1hZ2U6IENsYXNzaWZpZXJJbnB1dFNvdXJjZSwgbWF4UHJlZGljdGlvbnMgPSAxMCwgZmxpcHBlZCA9IGZhbHNlLCApIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsIGhhcyBub3QgYmVlbiB0cmFpbmVkIHlldCwgY2FsbGVkIHRyYWluKCkgZmlyc3QnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwZXIucHJlZGljdFRvcEsoaW1hZ2UsIG1heFByZWRpY3Rpb25zLCBmbGlwcGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwcm9jZXNzIHRoZSBjdXJyZW50IGV4YW1wbGVzIHByb3ZpZGVkIHRvIGNhbGN1bGF0ZSBsYWJlbHMgYW5kIGZvcm1hdFxuICAgICAqIGludG8gcHJvcGVyIHRmLmRhdGEuRGF0YXNldFxuICAgICAqL1xuICAgIHB1YmxpYyBwcmVwYXJlKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGNsYXNzZXMgaW4gdGhpcy5leGFtcGxlcyl7XG4gICAgICAgICAgICBpZiAoY2xhc3Nlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FkZCBzb21lIGV4YW1wbGVzIGJlZm9yZSB0cmFpbmluZycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGF0YXNldHMgPSB0aGlzLmNvbnZlcnRUb1RmRGF0YXNldCgpO1xuICAgICAgICB0aGlzLnRyYWluRGF0YXNldCA9IGRhdGFzZXRzLnRyYWluRGF0YXNldDtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGF0YXNldCA9IGRhdGFzZXRzLnZhbGlkYXRpb25EYXRhc2V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIGV4YW1wbGVzIGJ5IGZpcnN0IHNodWZmbGluZyByYW5kb21seSBwZXIgY2xhc3MsIHRoZW4gYWRkaW5nXG4gICAgICogb25lLWhvdCBsYWJlbHMsIHRoZW4gc3BsaXR0aW5nIGludG8gdHJhaW5pbmcvdmFsaWRhdGlvbiBkYXRzZXRzLCBhbmQgZmluYWxseVxuICAgICAqIHNvcnRpbmcgb25lIGxhc3QgdGltZVxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydFRvVGZEYXRhc2V0KCkge1xuICAgICAgICAvLyBmaXJzdCBzaHVmZmxlIGVhY2ggY2xhc3MgaW5kaXZpZHVhbGx5XG4gICAgICAgIC8vIFRPRE86IHdlIGNvdWxkIGJhc2ljYWxseSByZXBsaWNhdGUgdGhpcyBieSBpbnN0ZXJ0aW5nIHJhbmRvbWx5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5leGFtcGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5leGFtcGxlc1tpXSA9IGZpc2hlcllhdGVzKHRoaXMuZXhhbXBsZXNbaV0sIHRoaXMuc2VlZCkgYXMgRmxvYXQzMkFycmF5W107XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGVuIGJyZWFrIGludG8gdmFsaWRhdGlvbiBhbmQgdGVzdCBkYXRhc2V0c1xuXG4gICAgICAgIGxldCB0cmFpbkRhdGFzZXQ6IFNhbXBsZVtdID0gW107XG4gICAgICAgIGxldCB2YWxpZGF0aW9uRGF0YXNldDogU2FtcGxlW10gPSBbXTtcblxuICAgICAgICAvLyBmb3IgZWFjaCBjbGFzcywgYWRkIHNhbXBsZXMgdG8gdHJhaW4gYW5kIHZhbGlkYXRpb24gZGF0YXNldFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZXhhbXBsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBmbGF0T25lSG90KGksIHRoaXMubnVtQ2xhc3Nlcyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNsYXNzTGVuZ3RoID0gdGhpcy5leGFtcGxlc1tpXS5sZW5ndGg7XG4gICAgICAgICAgICBjb25zdCBudW1WYWxpZGF0aW9uID0gTWF0aC5jZWlsKFZBTElEQVRJT05fRlJBQ1RJT04gKiBjbGFzc0xlbmd0aCk7XG4gICAgICAgICAgICBjb25zdCBudW1UcmFpbiA9IGNsYXNzTGVuZ3RoIC0gbnVtVmFsaWRhdGlvbjtcblxuICAgICAgICAgICAgY29uc3QgY2xhc3NUcmFpbiA9IHRoaXMuZXhhbXBsZXNbaV0uc2xpY2UoMCwgbnVtVHJhaW4pLm1hcCgoZGF0YUFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogZGF0YUFycmF5LCBsYWJlbDogeSB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNsYXNzVmFsaWRhdGlvbiA9IHRoaXMuZXhhbXBsZXNbaV0uc2xpY2UobnVtVHJhaW4pLm1hcCgoZGF0YUFycmF5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogZGF0YUFycmF5LCBsYWJlbDogeSB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRyYWluRGF0YXNldCA9IHRyYWluRGF0YXNldC5jb25jYXQoY2xhc3NUcmFpbik7XG4gICAgICAgICAgICB2YWxpZGF0aW9uRGF0YXNldCA9IHZhbGlkYXRpb25EYXRhc2V0LmNvbmNhdChjbGFzc1ZhbGlkYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluYWxseSBzaHVmZmxlIGJvdGggdHJhaW4gYW5kIHZhbGlkYXRpb24gZGF0YXNldHNcbiAgICAgICAgdHJhaW5EYXRhc2V0ID0gZmlzaGVyWWF0ZXModHJhaW5EYXRhc2V0LCB0aGlzLnNlZWQpIGFzIFNhbXBsZVtdO1xuICAgICAgICB2YWxpZGF0aW9uRGF0YXNldCA9IGZpc2hlcllhdGVzKHZhbGlkYXRpb25EYXRhc2V0LCB0aGlzLnNlZWQpIGFzIFNhbXBsZVtdO1xuXG4gICAgICAgIGNvbnN0IHRyYWluWCA9IHRmLmRhdGEuYXJyYXkodHJhaW5EYXRhc2V0Lm1hcChzYW1wbGUgPT4gc2FtcGxlLmRhdGEpKTtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvblggPSB0Zi5kYXRhLmFycmF5KHZhbGlkYXRpb25EYXRhc2V0Lm1hcChzYW1wbGUgPT4gc2FtcGxlLmRhdGEpKTtcbiAgICAgICAgY29uc3QgdHJhaW5ZID0gdGYuZGF0YS5hcnJheSh0cmFpbkRhdGFzZXQubWFwKHNhbXBsZSA9PiBzYW1wbGUubGFiZWwpKTtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvblkgPSB0Zi5kYXRhLmFycmF5KHZhbGlkYXRpb25EYXRhc2V0Lm1hcChzYW1wbGUgPT4gc2FtcGxlLmxhYmVsKSk7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRmLmRhdGEgZGF0YXNldCBvYmplY3RzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFpbkRhdGFzZXQ6IHRmLmRhdGEuemlwKHsgeHM6IHRyYWluWCwgIHlzOiB0cmFpbll9KSxcbiAgICAgICAgICAgIHZhbGlkYXRpb25EYXRhc2V0OiB0Zi5kYXRhLnppcCh7IHhzOiB2YWxpZGF0aW9uWCwgIHlzOiB2YWxpZGF0aW9uWX0pXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2aW5nIGBtb2RlbGAncyB0b3BvbG9neSBhbmQgd2VpZ2h0cyBhcyB0d28gZmlsZXNcbiAgICAgKiAoYG15LW1vZGVsLTEuanNvbmAgYW5kIGBteS1tb2RlbC0xLndlaWdodHMuYmluYCkgYXMgd2VsbCBhc1xuICAgICAqIGEgYG1ldGFkYXRhLmpzb25gIGZpbGUgY29udGFpbmluZyBtZXRhZGF0YSBzdWNoIGFzIHRleHQgbGFiZWxzIHRvIGJlXG4gICAgICogZG93bmxvYWRlZCBmcm9tIGJyb3dzZXIuXG4gICAgICogQHBhcmFtIGhhbmRsZXJPclVSTCBBbiBpbnN0YW5jZSBvZiBgSU9IYW5kbGVyYCBvciBhIFVSTC1saWtlLFxuICAgICAqIHNjaGVtZS1iYXNlZCBzdHJpbmcgc2hvcnRjdXQgZm9yIGBJT0hhbmRsZXJgLlxuICAgICAqIEBwYXJhbSBjb25maWcgT3B0aW9ucyBmb3Igc2F2aW5nIHRoZSBtb2RlbC5cbiAgICAgKiBAcmV0dXJucyBBIGBQcm9taXNlYCBvZiBgU2F2ZVJlc3VsdGAsIHdoaWNoIHN1bW1hcml6ZXMgdGhlIHJlc3VsdCBvZlxuICAgICAqIHRoZSBzYXZpbmcsIHN1Y2ggYXMgYnl0ZSBzaXplcyBvZiB0aGUgc2F2ZWQgYXJ0aWZhY3RzIGZvciB0aGUgbW9kZWwnc1xuICAgICAqICAgdG9wb2xvZ3kgYW5kIHdlaWdodCB2YWx1ZXMuXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHNhdmUoaGFuZGxlck9yVVJMOiB0Zi5pby5JT0hhbmRsZXIgfCBzdHJpbmcsIGNvbmZpZz86IHRmLmlvLlNhdmVDb25maWcpOiBQcm9taXNlPHRmLmlvLlNhdmVSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwuc2F2ZShoYW5kbGVyT3JVUkwsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhaW4geW91ciBkYXRhIGludG8gYSBuZXcgbW9kZWwgYW5kIGpvaW4gaXQgd2l0aCBtb2JpbGVuZXRcbiAgICAgKiBAcGFyYW0gcGFyYW1zIHRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgbW9kZWwgLyB0cmFpbmluZ1xuICAgICAqIEBwYXJhbSBjYWxsYmFja3MgcHJvdmlkZSBjYWxsYmFja3MgdG8gcmVjZWl2ZSB0cmFpbmluZyBldmVudHNcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdHJhaW4ocGFyYW1zOiBUcmFpbmluZ1BhcmFtZXRlcnMsIGNhbGxiYWNrczogQ3VzdG9tQ2FsbGJhY2tBcmdzID0ge30pIHtcbiAgICAgICAgLy8gQWRkIGNhbGxiYWNrIGZvciBvblRyYWluRW5kIGluIGNhc2Ugb2YgZWFybHkgc3RvcFxuICAgICAgICBjb25zdCBvcmlnaW5hbE9uVHJhaW5FbmQgPSBjYWxsYmFja3Mub25UcmFpbkVuZCB8fCAoKCkgPT4ge30pO1xuICAgICAgICBjYWxsYmFja3Mub25UcmFpbkVuZCA9IChsb2dzOiB0Zi5Mb2dzKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fX3N0b3BUcmFpbmluZ1Jlc29sdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcFRyYWluaW5nUmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19zdG9wVHJhaW5pbmdSZXNvbHZlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9yaWdpbmFsT25UcmFpbkVuZChsb2dzKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8vIFJlc3Qgb2YgdHJpYW4gZnVuY3Rpb25cbiAgICAgICAgaWYgKCF0aGlzLmlzUHJlcGFyZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcGFyZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbnVtTGFiZWxzID0gdGhpcy5nZXRMYWJlbHMoKS5sZW5ndGg7XG4gICAgICAgIHV0aWwuYXNzZXJ0KFxuICAgICAgICAgICAgbnVtTGFiZWxzID09PSB0aGlzLm51bUNsYXNzZXMsXG4gICAgICAgICAgICAoKSA9PiBgQ2FuIG5vdCB0cmFpbiwgaGFzICR7bnVtTGFiZWxzfSBsYWJlbHMgYW5kICR7dGhpcy5udW1DbGFzc2VzfSBjbGFzc2VzYCk7XG5cbiAgICAgICAgY29uc3QgaW5wdXRTaGFwZSA9IHRoaXMudHJ1bmNhdGVkTW9kZWwub3V0cHV0c1swXS5zaGFwZS5zbGljZSgxKTsgLy8gWyA3IHggNyB4IDEyODBdXG4gICAgICAgIGNvbnN0IGlucHV0U2l6ZSA9IHRmLnV0aWwuc2l6ZUZyb21TaGFwZShpbnB1dFNoYXBlKTtcblxuICAgICAgICAvLyBpbiBjYXNlIHdlIG5lZWQgdG8gdXNlIGEgc2VlZCBmb3IgcHJlZGljdGFibGUgdHJhaW5pbmdcbiAgICAgICAgbGV0IHZhcmlhbmNlU2NhbGluZzogSW5pdGlhbGl6ZXI7XG4gICAgICAgIGlmICh0aGlzLnNlZWQpIHtcbiAgICAgICAgICAgIHZhcmlhbmNlU2NhbGluZyA9IHRmLmluaXRpYWxpemVycy52YXJpYW5jZVNjYWxpbmcoeyBzZWVkOiAzLjE0fSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXJpYW5jZVNjYWxpbmcgPSB0Zi5pbml0aWFsaXplcnMudmFyaWFuY2VTY2FsaW5nKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJhaW5pbmdNb2RlbCA9IHRmLnNlcXVlbnRpYWwoe1xuICAgICAgICAgICAgbGF5ZXJzOiBbXG4gICAgICAgICAgICAgICAgdGYubGF5ZXJzLmRlbnNlKHtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRTaGFwZTogW2lucHV0U2l6ZV0sXG4gICAgICAgICAgICAgICAgICAgIHVuaXRzOiBwYXJhbXMuZGVuc2VVbml0cyxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZhdGlvbjogJ3JlbHUnLFxuICAgICAgICAgICAgICAgICAgICBrZXJuZWxJbml0aWFsaXplcjogdmFyaWFuY2VTY2FsaW5nLCAvLyAndmFyaWFuY2VTY2FsaW5nJ1xuICAgICAgICAgICAgICAgICAgICB1c2VCaWFzOiB0cnVlXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdGYubGF5ZXJzLmRlbnNlKHtcbiAgICAgICAgICAgICAgICAgICAga2VybmVsSW5pdGlhbGl6ZXI6IHZhcmlhbmNlU2NhbGluZywgLy8gJ3ZhcmlhbmNlU2NhbGluZydcbiAgICAgICAgICAgICAgICAgICAgdXNlQmlhczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2YXRpb246ICdzb2Z0bWF4JyxcbiAgICAgICAgICAgICAgICAgICAgdW5pdHM6IHRoaXMubnVtQ2xhc3Nlc1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IG9wdGltaXplciA9IHRmLnRyYWluLmFkYW0ocGFyYW1zLmxlYXJuaW5nUmF0ZSk7XG4gICAgICAgIC8vIGNvbnN0IG9wdGltaXplciA9IHRmLnRyYWluLnJtc3Byb3AocGFyYW1zLmxlYXJuaW5nUmF0ZSk7XG5cbiAgICAgICAgdGhpcy50cmFpbmluZ01vZGVsLmNvbXBpbGUoe1xuICAgICAgICAgICAgb3B0aW1pemVyLFxuICAgICAgICAgICAgLy8gbG9zczogJ2JpbmFyeUNyb3NzZW50cm9weScsXG4gICAgICAgICAgICBsb3NzOiAnY2F0ZWdvcmljYWxDcm9zc2VudHJvcHknLFxuICAgICAgICAgICAgbWV0cmljczogWydhY2N1cmFjeSddXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghKHBhcmFtcy5iYXRjaFNpemUgPiAwKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYEJhdGNoIHNpemUgaXMgMCBvciBOYU4uIFBsZWFzZSBjaG9vc2UgYSBub24temVybyBmcmFjdGlvbmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0cmFpbkRhdGEgPSB0aGlzLnRyYWluRGF0YXNldC5iYXRjaChwYXJhbXMuYmF0Y2hTaXplKTtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbkRhdGEgPSB0aGlzLnZhbGlkYXRpb25EYXRhc2V0LmJhdGNoKHBhcmFtcy5iYXRjaFNpemUpO1xuXG4gICAgICAgIC8vIEZvciBkZWJ1Z2dpbmc6IGNoZWNrIGZvciBzaHVmZmxlIG9yIHJlc3VsdCBmcm9tIHRyYWluRGF0YXNldFxuICAgICAgICAvKlxuICAgICAgICBhd2FpdCB0cmFpbkRhdGFzZXQuZm9yRWFjaCgoZTogdGYuVGVuc29yW10pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICB9KVxuICAgICAgICAqL1xuXG4gICAgICAgIGNvbnN0IGhpc3RvcnkgPSBhd2FpdCB0aGlzLnRyYWluaW5nTW9kZWwuZml0RGF0YXNldCh0cmFpbkRhdGEsIHtcbiAgICAgICAgICAgIGVwb2NoczogcGFyYW1zLmVwb2NocyxcbiAgICAgICAgICAgIHZhbGlkYXRpb25EYXRhLFxuICAgICAgICAgICAgY2FsbGJhY2tzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGpvaW50TW9kZWwgPSB0Zi5zZXF1ZW50aWFsKCk7XG4gICAgICAgIGpvaW50TW9kZWwuYWRkKHRoaXMudHJ1bmNhdGVkTW9kZWwpO1xuICAgICAgICBqb2ludE1vZGVsLmFkZCh0aGlzLnRyYWluaW5nTW9kZWwpO1xuICAgICAgICB0aGlzLm1vZGVsID0gam9pbnRNb2RlbDtcblxuICAgICAgICBvcHRpbWl6ZXIuZGlzcG9zZSgpOyAvLyBjbGVhbnVwIG9mIG1lbW9yeVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogU2V0dXAgdGhlIGV4YW1wbHMgYXJyYXkgdG8gaG9sZCBzYW1wbGVzIHBlciBjbGFzc1xuICAgICAqL1xuICAgIHB1YmxpYyBwcmVwYXJlRGF0YXNldCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bUNsYXNzZXM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5leGFtcGxlc1tpXSA9IFtdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldExhYmVsKGluZGV4OiBudW1iZXIsIGxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWV0YWRhdGEubGFiZWxzW2luZGV4XSA9IGxhYmVsO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRMYWJlbHMobGFiZWxzOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLl9tZXRhZGF0YS5sYWJlbHMgPSBsYWJlbHM7XG4gICAgICAgIHRoaXMucHJlcGFyZURhdGFzZXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGFiZWwoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGEubGFiZWxzW2luZGV4XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGFiZWxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGEubGFiZWxzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXROYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tZXRhZGF0YS5tb2RlbE5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YWRhdGEubW9kZWxOYW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wVHJhaW5pbmcoKSB7ICBcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJhaW5pbmdNb2RlbC5zdG9wVHJhaW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fX3N0b3BUcmFpbmluZ1Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgLy8gdGhpcy5fX3N0b3BUcmFpbmluZ1JlamVjdCA9IHJlamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy50cmFpbmluZ01vZGVsLmRpc3Bvc2UoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cblxuICAgIC8qIFxuICAgICAqIENhbGN1bGF0ZSBlYWNoIGNsYXNzIGFjY3VyYWN5IHVzaW5nIHRoZSB2YWxpZGF0aW9uIGRhdGFzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgY2FsY3VsYXRlQWNjdXJhY3lQZXJDbGFzcygpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvblhzID0gdGhpcy52YWxpZGF0aW9uRGF0YXNldC5tYXBBc3luYyhhc3luYyAoZGF0YXNldDogVGVuc29yQ29udGFpbmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGRhdGFzZXQgYXMgeyB4czogVGVuc29yQ29udGFpbmVyLCB5czogVGVuc29yQ29udGFpbmVyfSkueHM7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uWXMgPSB0aGlzLnZhbGlkYXRpb25EYXRhc2V0Lm1hcEFzeW5jKGFzeW5jIChkYXRhc2V0OiBUZW5zb3JDb250YWluZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoZGF0YXNldCBhcyB7IHhzOiBUZW5zb3JDb250YWluZXIsIHlzOiBUZW5zb3JDb250YWluZXJ9KS55cztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gd2UgbmVlZCB0byBzcGxpdCBvdXIgdmFsaWRhdGlvbiBkYXRhIGludG8gYmF0Y2hlcyBpbiBjYXNlIGl0IGlzIHRvbyBsYXJnZSB0byBmaXQgaW4gbWVtb3J5XG4gICAgICAgIGNvbnN0IGJhdGNoU2l6ZSA9IE1hdGgubWluKHZhbGlkYXRpb25Zcy5zaXplLCAzMik7XG4gICAgICAgIGNvbnN0IGl0ZXJhdGlvbnMgPSBNYXRoLmNlaWwodmFsaWRhdGlvbllzLnNpemUgLyBiYXRjaFNpemUpO1xuXG4gICAgICAgIGNvbnN0IGJhdGNoZXNYID0gdmFsaWRhdGlvblhzLmJhdGNoKGJhdGNoU2l6ZSk7XG4gICAgICAgIGNvbnN0IGJhdGNoZXNZID0gdmFsaWRhdGlvbllzLmJhdGNoKGJhdGNoU2l6ZSk7XG4gICAgICAgIGNvbnN0IGl0WCA9IGF3YWl0IGJhdGNoZXNYLml0ZXJhdG9yKCk7XG4gICAgICAgIGNvbnN0IGl0WSA9IGF3YWl0IGJhdGNoZXNZLml0ZXJhdG9yKCk7XG4gICAgICAgIGNvbnN0IGFsbFggPSBbXTtcbiAgICAgICAgY29uc3QgYWxsWSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlcmF0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICAvLyAxLiBnZXQgdGhlIHByZWRpY3Rpb24gdmFsdWVzIGluIGJhdGNoZXNcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoZWRYVGVuc29yID0gYXdhaXQgaXRYLm5leHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGJhdGNoZWRYUHJlZGljdGlvblRlbnNvciA9IHRoaXMudHJhaW5pbmdNb2RlbC5wcmVkaWN0KGJhdGNoZWRYVGVuc29yLnZhbHVlKSBhcyB0Zi5UZW5zb3I7XG4gICAgICAgICAgICBjb25zdCBhcmdNYXhYID0gYmF0Y2hlZFhQcmVkaWN0aW9uVGVuc29yLmFyZ01heCgxKTsgLy8gUmV0dXJucyB0aGUgaW5kaWNlcyBvZiB0aGUgbWF4IHZhbHVlcyBhbG9uZyBhbiBheGlzXG4gICAgICAgICAgICBhbGxYLnB1c2goYXJnTWF4WCk7XG5cbiAgICAgICAgICAgIC8vIDIuIGdldCB0aGUgZ3JvdW5kIHRydXRoIGxhYmVsIHZhbHVlcyBpbiBiYXRjaGVzXG4gICAgICAgICAgICBjb25zdCBiYXRjaGVkWVRlbnNvciA9IGF3YWl0IGl0WS5uZXh0KCk7XG4gICAgICAgICAgICBjb25zdCBhcmdNYXhZID0gYmF0Y2hlZFlUZW5zb3IudmFsdWUuYXJnTWF4KDEpOyAvLyBSZXR1cm5zIHRoZSBpbmRpY2VzIG9mIHRoZSBtYXggdmFsdWVzIGFsb25nIGFuIGF4aXNcbiAgICAgICAgICAgIGFsbFkucHVzaChhcmdNYXhZKTtcblxuICAgICAgICAgICAgLy8gMy4gZGlzcG9zZSBvZiBhbGwgb3VyIHRlbnNvcnNcbiAgICAgICAgICAgIGJhdGNoZWRYVGVuc29yLnZhbHVlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGJhdGNoZWRYUHJlZGljdGlvblRlbnNvci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBiYXRjaGVkWVRlbnNvci52YWx1ZS5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25jYXRlbmF0ZSBhbGwgdGhlIHJlc3VsdHMgb2YgdGhlIGJhdGNoZXNcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlID0gdGYuY29uY2F0KGFsbFkpOyAvLyB0aGlzIGlzIHRoZSBncm91bmQgdHJ1dGhcbiAgICAgICAgY29uc3QgcHJlZGljdGlvbnMgPSB0Zi5jb25jYXQoYWxsWCk7IC8vIHRoaXMgaXMgdGhlIHByZWRpY3Rpb24gb3VyIG1vZGVsIGlzIGd1ZXNzaW5nXG5cbiAgICAgICAgLy8gb25seSBpZiB3ZSBjb25jYXRlbmF0ZWQgbW9yZSB0aGFuIG9uZSB0ZW5zb3IgZm9yIHByZWZlcmVuY2UgYW5kIHJlZmVyZW5jZVxuICAgICAgICBpZiAoaXRlcmF0aW9ucyAhPT0gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxYLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYWxsWFtpXS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgYWxsWVtpXS5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyByZWZlcmVuY2UsIHByZWRpY3Rpb25zIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBvcHRpb25hbCBzZWVkIGZvciBwcmVkaWN0YWJsZSBzaHVmZmxpbmcgb2YgZGF0YXNldFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRTZWVkKHNlZWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNlZWQgPSBzZWVkcmFuZG9tKHNlZWQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVRlYWNoYWJsZShtZXRhZGF0YTogUGFydGlhbDxNZXRhZGF0YT4sIG1vZGVsT3B0aW9ucz86IE1vZGVsT3B0aW9ucykge1xuICAgIGNvbnN0IG1vYmlsZW5ldCA9IGF3YWl0IGxvYWRUcnVuY2F0ZWRNb2JpbGVOZXQobW9kZWxPcHRpb25zKTtcbiAgICByZXR1cm4gbmV3IFRlYWNoYWJsZU1vYmlsZU5ldChtb2JpbGVuZXQsIG1ldGFkYXRhKTtcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxudHlwZSBEcmF3YWJsZSA9IEhUTUxJbWFnZUVsZW1lbnQgfCBIVE1MQ2FudmFzRWxlbWVudCB8IEhUTUxWaWRlb0VsZW1lbnQgfCBJbWFnZUJpdG1hcDtcblxuY29uc3QgbmV3Q2FudmFzID0gKCkgPT4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNpemUoaW1hZ2U6IERyYXdhYmxlLCBzY2FsZTogbnVtYmVyLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50PSBuZXdDYW52YXMoKSkge1xuICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoICogc2NhbGU7XG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodCAqIHNjYWxlO1xuICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xuXG4gICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICByZXR1cm4gY2FudmFzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzaXplTWF4VG8oaW1hZ2U6IERyYXdhYmxlLCBtYXhTaXplOiBudW1iZXIsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ9IG5ld0NhbnZhcygpKSB7XG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCk7XG4gICAgcmV0dXJuIHJlc2l6ZShpbWFnZSwgbWF4U2l6ZSAvIG1heCwgY2FudmFzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZU1pblRvKGltYWdlOiBEcmF3YWJsZSwgbWluU2l6ZTogbnVtYmVyLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50PSBuZXdDYW52YXMoKSkge1xuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpO1xuICAgIHJldHVybiByZXNpemUoaW1hZ2UsIG1pblNpemUgLyBtaW4sIGNhbnZhcyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyb3BUbyggaW1hZ2U6IERyYXdhYmxlLCBzaXplOiBudW1iZXIsXG4gICAgZmxpcHBlZCA9IGZhbHNlLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gbmV3Q2FudmFzKCkpIHtcblxuICAgIC8vIGltYWdlIGltYWdlLCBiaXRtYXAsIG9yIGNhbnZhc1xuICAgIGxldCB3aWR0aCA9IGltYWdlLndpZHRoO1xuICAgIGxldCBoZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG5cbiAgICAvLyBpZiB2aWRlbyBlbGVtZW50XG4gICAgaWYgKGltYWdlIGluc3RhbmNlb2YgSFRNTFZpZGVvRWxlbWVudCkge1xuICAgICAgICB3aWR0aCA9IChpbWFnZSBhcyBIVE1MVmlkZW9FbGVtZW50KS52aWRlb1dpZHRoO1xuICAgICAgICBoZWlnaHQgPSAoaW1hZ2UgYXMgSFRNTFZpZGVvRWxlbWVudCkudmlkZW9IZWlnaHQ7XG4gICAgfVxuXG4gICAgY29uc3QgbWluID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCk7XG4gICAgY29uc3Qgc2NhbGUgPSBzaXplIC8gbWluO1xuICAgIGNvbnN0IHNjYWxlZFcgPSBNYXRoLmNlaWwod2lkdGggKiBzY2FsZSk7XG4gICAgY29uc3Qgc2NhbGVkSCA9IE1hdGguY2VpbChoZWlnaHQgKiBzY2FsZSk7XG4gICAgY29uc3QgZHggPSBzY2FsZWRXIC0gc2l6ZTtcbiAgICBjb25zdCBkeSA9IHNjYWxlZEggLSBzaXplO1xuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5oZWlnaHQgPSBzaXplO1xuICAgIGNvbnN0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgfn4oZHggLyAyKSAqIC0xLCB+fihkeSAvIDIpICogLTEsIHNjYWxlZFcsIHNjYWxlZEgpO1xuXG4gICAgLy8gY2FudmFzIGlzIGFscmVhZHkgc2l6ZWQgYW5kIGNyb3BwZWQgdG8gY2VudGVyIGNvcnJlY3RseVxuICAgIGlmIChmbGlwcGVkKSB7XG4gICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoY2FudmFzLCBzaXplICogLTEsIDApO1xuICAgIH1cblxuICAgIHJldHVybiBjYW52YXM7XG59XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCAqIGFzIHRmIGZyb20gJ0B0ZW5zb3JmbG93L3RmanMnO1xuXG4vKipcbiAqIFJlY2VpdmVzIGFuIGltYWdlIGFuZCBub3JtYWxpemVzIGl0IGJldHdlZW4gLTEgYW5kIDEuXG4gKiBSZXR1cm5zIGEgYmF0Y2hlZCBpbWFnZSAoMSAtIGVsZW1lbnQgYmF0Y2gpIG9mIHNoYXBlIFsxLCB3LCBoLCBjXVxuICogQHBhcmFtIHJhc3RlckVsZW1lbnQgdGhlIGVsZW1lbnQgd2l0aCBwaXhlbHMgdG8gY29udmVydCB0byBhIFRlbnNvclxuICogQHBhcmFtIGdyYXlzY2FsZSBvcHRpbmFsIGZsYWcgdGhhdCBjaGFuZ2VzIHRoZSBjcm9wIHRvIFsxLCB3LCBoLCAxXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FwdHVyZShyYXN0ZXJFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50IHwgSFRNTFZpZGVvRWxlbWVudCB8IEhUTUxDYW52YXNFbGVtZW50LCBncmF5c2NhbGU/OiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRmLnRpZHkoKCkgPT4ge1xuICAgICAgICBjb25zdCBwaXhlbHMgPSB0Zi5icm93c2VyLmZyb21QaXhlbHMocmFzdGVyRWxlbWVudCk7XG5cbiAgICAgICAgLy8gY3JvcCB0aGUgaW1hZ2Ugc28gd2UncmUgdXNpbmcgdGhlIGNlbnRlciBzcXVhcmVcbiAgICAgICAgY29uc3QgY3JvcHBlZCA9IGNyb3BUZW5zb3IocGl4ZWxzLCBncmF5c2NhbGUpO1xuXG4gICAgICAgIC8vIEV4cGFuZCB0aGUgb3V0ZXIgbW9zdCBkaW1lbnNpb24gc28gd2UgaGF2ZSBhIGJhdGNoIHNpemUgb2YgMVxuICAgICAgICBjb25zdCBiYXRjaGVkSW1hZ2UgPSBjcm9wcGVkLmV4cGFuZERpbXMoMCk7XG5cbiAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBpbWFnZSBiZXR3ZWVuIC0xIGFuZCBhMS4gVGhlIGltYWdlIGNvbWVzIGluIGJldHdlZW4gMC0yNTVcbiAgICAgICAgLy8gc28gd2UgZGl2aWRlIGJ5IDEyNyBhbmQgc3VidHJhY3QgMS5cbiAgICAgICAgcmV0dXJuIGJhdGNoZWRJbWFnZS50b0Zsb2F0KCkuZGl2KHRmLnNjYWxhcigxMjcpKS5zdWIodGYuc2NhbGFyKDEpKTtcbiAgICB9KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JvcFRlbnNvciggaW1nOiB0Zi5UZW5zb3IzRCwgZ3JheXNjYWxlTW9kZWw/OiBib29sZWFuLCBncmF5c2NhbGVJbnB1dD86IGJvb2xlYW4gKSA6IHRmLlRlbnNvcjNEIHtcbiAgICBjb25zdCBzaXplID0gTWF0aC5taW4oaW1nLnNoYXBlWzBdLCBpbWcuc2hhcGVbMV0pO1xuICAgIGNvbnN0IGNlbnRlckhlaWdodCA9IGltZy5zaGFwZVswXSAvIDI7XG4gICAgY29uc3QgYmVnaW5IZWlnaHQgPSBjZW50ZXJIZWlnaHQgLSAoc2l6ZSAvIDIpO1xuICAgIGNvbnN0IGNlbnRlcldpZHRoID0gaW1nLnNoYXBlWzFdIC8gMjtcbiAgICBjb25zdCBiZWdpbldpZHRoID0gY2VudGVyV2lkdGggLSAoc2l6ZSAvIDIpO1xuICAgIFxuICAgIGlmIChncmF5c2NhbGVNb2RlbCAmJiAhZ3JheXNjYWxlSW5wdXQpIHtcbiAgICAgICAgLy9jcm9wcGVkIHJnYiBkYXRhXG4gICAgICAgIGxldCBncmF5c2NhbGVfY3JvcHBlZCA9IGltZy5zbGljZShbYmVnaW5IZWlnaHQsIGJlZ2luV2lkdGgsIDBdLCBbc2l6ZSwgc2l6ZSwgM10pO1xuICAgICAgICBcbiAgICAgICAgZ3JheXNjYWxlX2Nyb3BwZWQgPSBncmF5c2NhbGVfY3JvcHBlZC5yZXNoYXBlKFtzaXplICogc2l6ZSwgMSwgM10pXG4gICAgICAgIGNvbnN0IHJnYl93ZWlnaHRzID0gWzAuMjk4OSwgMC41ODcwLCAwLjExNDBdXG4gICAgICAgIGdyYXlzY2FsZV9jcm9wcGVkID0gdGYubXVsKGdyYXlzY2FsZV9jcm9wcGVkLCByZ2Jfd2VpZ2h0cylcbiAgICAgICAgZ3JheXNjYWxlX2Nyb3BwZWQgPSBncmF5c2NhbGVfY3JvcHBlZC5yZXNoYXBlKFtzaXplLCBzaXplLCAzXSk7XG4gICAgXG4gICAgICAgIGdyYXlzY2FsZV9jcm9wcGVkID0gdGYuc3VtKGdyYXlzY2FsZV9jcm9wcGVkLCAtMSlcbiAgICAgICAgZ3JheXNjYWxlX2Nyb3BwZWQgPSB0Zi5leHBhbmREaW1zKGdyYXlzY2FsZV9jcm9wcGVkLCAtMSlcblxuICAgICAgICByZXR1cm4gZ3JheXNjYWxlX2Nyb3BwZWQ7XG4gICAgfVxuICAgIHJldHVybiBpbWcuc2xpY2UoW2JlZ2luSGVpZ2h0LCBiZWdpbldpZHRoLCAwXSwgW3NpemUsIHNpemUsIDNdKTtcbn1cbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE5IEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IGF1dG9iaW5kIGZyb20gJ2F1dG9iaW5kLWRlY29yYXRvcic7XG5pbXBvcnQgeyBjcm9wVG8gfSBmcm9tICcuL2NhbnZhcyc7XG5cbmNvbnN0IGRlZmF1bHRWaWRlb09wdGlvbnM6IE1lZGlhVHJhY2tDb25zdHJhaW50cyA9IHtcbiAgICBmYWNpbmdNb2RlOiAndXNlcicsXG4gICAgZnJhbWVSYXRlOiAyNFxufTtcblxuY29uc3QgZmlsbENvbnN0cmFpbnRzID0gKG9wdGlvbnM6IFBhcnRpYWw8TWVkaWFUcmFja0NvbnN0cmFpbnRzPikgPT4ge1xuICAgIG9wdGlvbnMuZmFjaW5nTW9kZSA9IG9wdGlvbnMuZmFjaW5nTW9kZSB8fCBkZWZhdWx0VmlkZW9PcHRpb25zLmZhY2luZ01vZGU7XG4gICAgb3B0aW9ucy5mcmFtZVJhdGUgPSBvcHRpb25zLmZyYW1lUmF0ZSB8fCBkZWZhdWx0VmlkZW9PcHRpb25zLmZyYW1lUmF0ZTtcbiAgICBvcHRpb25zLmFzcGVjdFJhdGlvID0gb3B0aW9ucy5hc3BlY3RSYXRpbyB8fCBkZWZhdWx0VmlkZW9PcHRpb25zLmFzcGVjdFJhdGlvO1xuICAgIHJldHVybiBvcHRpb25zIGFzIE1lZGlhVHJhY2tDb25zdHJhaW50cztcbn07XG5cbmV4cG9ydCBjbGFzcyBXZWJjYW0gIHtcbiAgICBwdWJsaWMgZmxpcDogYm9vbGVhbjtcbiAgICBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbiAgICBwdWJsaWMgaGVpZ2h0OiBudW1iZXI7XG4gICAgcHVibGljIHdlYmNhbTogSFRNTFZpZGVvRWxlbWVudDtcbiAgICBwdWJsaWMgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHdpZHRoID0gNDAwLCBoZWlnaHQgPSA0MDAsIGZsaXAgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmZsaXAgPSBmbGlwO1xuICAgIH1cblxuICAgIEBhdXRvYmluZFxuICAgIHB1YmxpYyBnZXRXZWJjYW0ob3B0aW9uczogTWVkaWFUcmFja0NvbnN0cmFpbnRzID0ge30pIHtcbiAgICAgICAgaWYgKCF3aW5kb3cubmF2aWdhdG9yLm1lZGlhRGV2aWNlcyB8fCAhd2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYlJUQy4gUGxlYXNlIHRyeSBhbm90aGVyIG9uZS4nKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBvcHRpb25zLndpZHRoID0gNjQwO1xuICAgICAgICBjb25zdCB2aWRlb09wdGlvbnMgPSBmaWxsQ29uc3RyYWludHMob3B0aW9ucyk7XG5cbiAgICAgICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICByZXR1cm4gd2luZG93Lm5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsgdmlkZW86IHZpZGVvT3B0aW9ucyB9KVxuICAgICAgICAgICAgLnRoZW4oKG1lZGlhU3RyZWFtKSA9PiB7XG4gICAgICAgICAgICAgICAgdmlkZW8uc3JjT2JqZWN0ID0gbWVkaWFTdHJlYW07XG5cbiAgICAgICAgICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB2aWRlb1dpZHRoOiB2dywgdmlkZW9IZWlnaHQ6IHZoIH0gPSB2aWRlbztcbiAgICAgICAgICAgICAgICAgICAgdmlkZW8ud2lkdGggPSB2dztcbiAgICAgICAgICAgICAgICAgICAgdmlkZW8uaGVpZ2h0ID0gdmg7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmlkZW87XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdDb3VsZCBub3Qgb3BlbiB5b3VyIGNhbWVyYS4gWW91IG1heSBoYXZlIGRlbmllZCBhY2Nlc3MuJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzZXR1cCBvciBzZXR1cFdlYmNhbVxuICAgIEBhdXRvYmluZFxuICAgIHB1YmxpYyBhc3luYyBzZXR1cChvcHRpb25zOiBNZWRpYVRyYWNrQ29uc3RyYWludHMgPSB7fSkge1xuICAgICAgICBpZiAoIXRoaXMud2ViY2FtKSB7XG4gICAgICAgICAgICB0aGlzLndlYmNhbSA9IGF3YWl0IHRoaXMuZ2V0V2ViY2FtKG9wdGlvbnMpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FudmFzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAYXV0b2JpbmRcbiAgICBwdWJsaWMgcGxheSgpIHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMud2ViY2FtLnBsYXkoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgQGF1dG9iaW5kXG4gICAgcHVibGljIHBhdXNlKCkge1xuICAgICAgICB0aGlzLndlYmNhbS5wYXVzZSgpO1xuICAgIH1cblxuICAgIEBhdXRvYmluZFxuICAgIHB1YmxpYyBzdG9wKCkge1xuICAgICAgICB0aGlzLnN0b3BTdHJlYW1lZFZpZGVvKHRoaXMud2ViY2FtKTtcbiAgICB9XG5cbiAgICBAYXV0b2JpbmRcbiAgICBwdWJsaWMgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnJlbmRlckNhbWVyYVRvQ2FudmFzKCk7XG4gICAgfVxuXG4gICAgQGF1dG9iaW5kXG4gICAgcHVibGljIHN0b3BTdHJlYW1lZFZpZGVvKHZpZGVvRWw6IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gdmlkZW9FbC5zcmNPYmplY3QgYXMgTWVkaWFTdHJlYW07XG4gICAgICAgIGNvbnN0IHRyYWNrcyA9IHN0cmVhbS5nZXRUcmFja3MoKTtcblxuICAgICAgICB0cmFja3MuZm9yRWFjaCgodHJhY2spID0+IHtcbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlkZW9FbC5zcmNPYmplY3QgPSBudWxsO1xuICAgIH1cblxuICAgIEBhdXRvYmluZFxuICAgIHB1YmxpYyByZW5kZXJDYW1lcmFUb0NhbnZhcygpIHtcbiAgICAgICAgaWYgKHRoaXMuY2FudmFzICYmIHRoaXMud2ViY2FtKSB7XG4gICAgICAgICAgICBjb25zdCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgIGlmICh0aGlzLndlYmNhbS52aWRlb1dpZHRoICE9PSAwKSB7XG4gICAgICAgICAgICAgICBjb25zdCBjcm9wcGVkQ2FudmFzID0gY3JvcFRvKHRoaXMud2ViY2FtLCB0aGlzLndpZHRoLCB0aGlzLmZsaXApO1xuICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShjcm9wcGVkQ2FudmFzLCAwLCAwKTtcbiAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqIEBsaWNlbnNlIFNlZSB0aGUgTElDRU5TRSBmaWxlLiAqL1xuXG4vLyBUaGlzIGNvZGUgaXMgYXV0by1nZW5lcmF0ZWQsIGRvIG5vdCBtb2RpZnkgdGhpcyBmaWxlIVxuY29uc3QgdmVyc2lvbiA9ICcwLjguNC1hbHBoYTInO1xuZXhwb3J0IHsgdmVyc2lvbiB9O1xuXG4iLCIvKiAoaWdub3JlZCkgKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHRmOyJdLCJzb3VyY2VSb290IjoiIn0=