
# simple-debug [![Build Status](https://travis-ci.org/timshadel/simple-debug.png?branch=master)](https://travis-ci.org/timshadel/simple-debug)

Simple tool to limit log output. It's configuration is compatible with visionmedia/debug.

## Examples

### Basic

```js
var debug = require('simple-debug')('mything');

setInterval(function(){
  debug('doing something useful');
}, 1000);
```

The __`DEBUG`__ environment variable used to enable logging. Give it space- or comma-separated names.

```console
$ DEBUG=mything node myapp
doing something useful
doing something useful
doing something useful
```

### Multiple

```js
var debug = require('simple-debug');
debug.working = debug('working');
debug.waiting = debug('waiting');

setInterval(function(){
  debug.working('doing something useful');
  // ...
  debug.waiting('pausing for 1s');
}, 1000);
```

Turn on only the `waiting` log.

```console
$ DEBUG=waiting node myapp
pausing for 1s
pausing for 1s
```

Turn on both.

```console
$ DEBUG=waiting,working node myapp
doing something useful
pausing for 1s
doing something useful
pausing for 1s
```

### Output Stream

Send output through `console.err` instead of `console.log`.

```js
var debug = require('simple-debug')('mything');
debug.log = console.error.bind(console);

setInterval(function(){
  debug('doing something useful');
}, 1000);
```

## License 

MIT. The core functions were extracted from [debug][debug]. See LICENSE for details.

[debug]: https://github.com/visionmedia/debug
