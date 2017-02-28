var _ = require('lodash');
var process = require('process');
var Benchmark = require('benchmark');
Benchmark = Benchmark.runInContext({ _: _, process: global });
global.Benchmark = Benchmark;

var options3 = {
    blueViolet: 'blueViolet',
    blueYonder: 'blueYonder',
    blueberry: 'blueberry'
}

options10 = Object.assign(
    {},
    options3,
    {
        bluebonnet: 'bluebonnet',
        blush: 'blush',
        bole: 'bole',
        bondi: 'blue',
        bone: 'bone',
        booger: 'buster'
    })

var selected;

// add tests
new Benchmark.Suite()
    .add('Switch 3#best', function () {
        switch ('red') {
            case 'red':
                selected = 'red';
                break;
            case 'green':
                selected = 'green';
                break;
            case 'blue':
                selected = 'blue';
                break;
        }
    })
    .add('Switch 3#worst', function () {
        switch ('blue') {
            case 'red':
                selected = 'red';
                break;
            case 'green':
                selected = 'green';
                break;
            case 'blue':
                selected = 'blue';
                break;
        }
    })
    .add('Hash 3', function () {
        selected = options3[ 'blue' ];
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('Slowest is ' + this.filter('slowest').map('name'));
    })
    // run async
    .run({ 'async': false });

new Benchmark.Suite()
    .add('Switch 10#best', function () {
        switch ('blueViolet') {
            case 'blueViolet':
                selected = 'blueViolet';
                break;
            case 'blueYonder':
                selected = 'blueYonder';
                break;
            case 'blueberry':
                selected = 'blueberry';
                break;
            case 'bluebonnet':
                selected = 'bluebonnet';
                break;
            case 'blush':
                selected = 'blush';
                break;
            case 'bole':
                selected = 'bole';
                break;
            case 'blue':
                selected = 'blue';
                break;
            case 'bone':
                selected = 'bone';
                break;
            case 'bustercase':
                selected = 'bustercase';
                break;
        }
    })
    .add('Switch 10#worst', function () {
        switch ('blueViolet') {
            case 'blueViolet':
                selected = 'blueViolet';
                break;
            case 'blueYonder':
                selected = 'blueYonder';
                break;
            case 'blueberry':
                selected = 'blueberry';
                break;
            case 'bluebonnet':
                selected = 'bluebonnet';
                break;
            case 'blush':
                selected = 'blush';
                break;
            case 'bole':
                selected = 'bole';
                break;
            case 'blue':
                selected = 'blue';
                break;
            case 'bone':
                selected = 'bone';
                break;
            case 'bustercase':
                selected = 'bustercase';
                break;
        }
    })
    .add('Hash 10', function () {
        selected = options10[ 'blue' ];
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('Slowest is ' + this.filter('slowest').map('name'));
    })
    // run async
    .run({ 'async': false });