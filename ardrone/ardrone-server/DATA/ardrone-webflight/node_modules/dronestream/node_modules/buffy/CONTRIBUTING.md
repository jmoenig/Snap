# Contributing

## Running the test suite

```js
$ git clone <git url>
$ cd <clone dir>
$ npm install
$ make test
```

## Running an individual test

```js
$ node test/unit/test-Reader.js
```

## TODOS

If you are looking for something to work on, here are a few things I'd like to
see in this module:

* Implement benchmark suite (with some nice R analysis)
* Implement Writer class. Will probably create many internal buffers and flatten
  them into one at the end. Should also support to be initialized with a length
  in which case small buffers are not created all the time.

And of course, feel free to send patches for any open tickets / bugs.
