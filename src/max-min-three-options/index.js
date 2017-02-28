var _ = require('lodash');
var random = require('../utils');
var process = require('process');
var Benchmark = require('benchmark');
Benchmark = Benchmark.runInContext({ _: _, process: global });
global.Benchmark = Benchmark;

var a = random.randomInt();
var b = random.randomInt();
var c = random.randomInt();

new Benchmark.Suite()
    .add('Math.max', function () {
        Math.max(a, b, c);
    })
    .add('Math.max Nested', function () {
        Math.max(Math.max(a, b), c);
    })
    .add('Max if-else', function () {
        var m = a;

        if (m < b) {
            m = b
        } else if (m < c) {
            m = c
        }
    })
    .add('Math.min', function () {
        var m = Math.min(a, b, c);
    })
    .add('Math.min nested', function () {
        var m = Math.min(Math.min(a, b), c);
    })
    .add('Min if-else', function () {
        var m = a;

        if (m > b) {
            m = b
        } else if (m > c) {
            m = c
        }
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {

        console.log(`for numbers:
        ${a}
        ${b}
        ${c}
`)

        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('Slowest is ' + this.filter('slowest').map('name'));
    })
    // run async
    .run({ 'async': false });