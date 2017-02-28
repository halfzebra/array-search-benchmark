const Benchmark = require('benchmark');

const suiteByProp = new Benchmark.Suite('By property');
const suiteByRef = new Benchmark.Suite('By reference');

let data = [];
const length = 10000;

for (let i = 0; i < length; i++) {
    data.push({ id: i });
}

let search = data[ 7941 ];

console.log('By property');
console.log('');

// add tests
suiteByProp
    .add('Array#some es5', function () {
        data.some(function (value) {
            return value.id === 7941
        });
    })
    .add('Array#some es6 arrow deconstruction', function () {
        data.some(({ id }) => id === 7941);
    })
    .add('Array#find es5', function () {
        data.find(function (value) {
            return value.id === 7941
        });
    })
    .add('Array#find es6 arrow deconstruction', function () {
        data.find(({ id }) => id === 7941);
    })
    .add('Array#filter es5', function () {
        data.filter(function (value) {
            return value.id === 7941
        }).length > 0;
    })
    .add('Array#filter es6 arrow deconstruction', function () {
        data.filter(({ id }) => id === 7941).length > 0;
    })
    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('');
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('Slowest is ' + this.filter('slowest').map('name'));
    })
    // run async
    .run({ 'async': false });

console.log('');
console.log('By reference');
console.log('');

suiteByRef
    .add('Array#includes es7', function () {
        data.includes(search);
    })
    .add('Array#indexOf es5', function () {
        data.indexOf(search) !== -1;
    })    // add listeners
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('');
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('Slowest is ' + this.filter('slowest').map('name'));
    })
    // run async
    .run({ 'async': false });