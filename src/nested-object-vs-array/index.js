var _ = require('lodash');
var random = require('../utils');
var process = require('process');
var Benchmark = require('benchmark');
Benchmark = Benchmark.runInContext({ _: _, process: global });
global.Benchmark = Benchmark;

function arr(d) {

  let res = [];

  if (d === 0) {
    return [ 1 ]
  }

  res[ d ] = arr(d - 1);

  return res
}

function obj(d) {

  let res = {};

  if (d === 0) {
    return { 100: 1 }
  }

  res[ d ] = obj(d - 1);

  return res
}

var foo1 = arr(5);
var bar1 = obj(5);

function read5(a) {
  a[ 5 ][ 4 ][ 3 ][ 2 ][ 1 ][ 100 ] + 1;
}

new Benchmark.Suite()
  .add('arr', function () {
    read5(foo1)
  })
  .add('obj', function () {
    read5(bar1)
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(this)
  })
  // run async
  .run({ 'async': false });