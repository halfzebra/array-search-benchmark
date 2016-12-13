# Array Search Benchmark

This benchmark is focused on determining the fastest way to find if object is in the array by the property or by the reference.



```bash
$ node -v
v6.5.0

$ node test

By property

Array#some es5 x 9,225 ops/sec ±1.36% (87 runs sampled)
Array#some es6 arrow deconstruction x 8,860 ops/sec ±1.49% (87 runs sampled)
Array#find es5 x 10,587 ops/sec ±1.40% (85 runs sampled)
Array#find es6 arrow deconstruction x 9,782 ops/sec ±1.90% (86 runs sampled)
Array#filter es5 x 6,890 ops/sec ±1.29% (85 runs sampled)
Array#filter es6 arrow deconstruction x 6,580 ops/sec ±2.55% (84 runs sampled)

Fastest is Array#find es5
Slowest is Array#filter es6 arrow deconstruction

By reference

Array#includes es7 x 10,630 ops/sec ±1.39% (85 runs sampled)
Array#indexOf es5 x 267,177 ops/sec ±1.30% (85 runs sampled)

Fastest is Array#indexOf es5
Slowest is Array#includes es7
```