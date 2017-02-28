var _ = require('lodash');
var process = require('process');
var Benchmark = require('benchmark');
Benchmark = Benchmark.runInContext({ _: _, process: global });
global.Benchmark = Benchmark;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var RGB = { R: getRandomInt(0,255), G: getRandomInt(0, 255), B: getRandomInt(0,255) }

function rgbToHsl(rgb) {
    var R = rgb.R / 255;
    var G = rgb.G / 255;
    var B = rgb.B / 255;
    var Cmax = Math.max(R, G, B);
    var Cmin = Math.min(R, G, B);
    var delta = Cmax - Cmin;
    var L = (Cmax + Cmin) / 2;
    var S = 0;
    var H = 0;

    if (delta !== 0) {
        S = delta / (1 - Math.abs((2 * L) - 1));

        switch (Cmax) {
            case R:
                H = ((G - B) / delta) % 6;
                break;
            case G:
                H = ((B - R) / delta) + 2;
                break;
            case B:
                H = ((R - G) / delta) + 4;
                break;
        }
        H *= 60;
    }

    // Convert negative angles from Hue
    while (H < 0) {
        H += 360;
    }

    return {
        H: H,
        S: S,
        L: L
    };
};

function rgbToHslIfElse(rgb) {
    var R = rgb.R / 255;
    var G = rgb.G / 255;
    var B = rgb.B / 255;
    var Cmax = Math.max(R, G, B);
    var Cmin = Math.min(R, G, B);
    var delta = Cmax - Cmin;
    var L = (Cmax + Cmin) / 2;
    var S = 0;
    var H = 0;

    if (delta !== 0) {
        S = delta / (1 - Math.abs((2 * L) - 1));

        if (Cmax === R) {
            H = ((G - B) / delta) % 6;
        } else if (Cmax === G) {
            H = ((B - R) / delta) + 2;
        } else if (Cmax === B) {
            H = ((R - G) / delta) + 4;
        }
        H *= 60;
    }

    // Convert negative angles from Hue
    while (H < 0) {
        H += 360;
    }

    return {
        H: H,
        S: S,
        L: L
    };
};

function rgbToHslOptimized(rgb) {
    var R = rgb.R / 255;
    var G = rgb.G / 255;
    var B = rgb.B / 255;
    var Cmax = Math.max(Math.max(R, G), B);
    var Cmin = Math.min(Math.min(R, G), B);
    var delta = Cmax - Cmin;
    var S = 0;
    var H = 0;
    var L = (Cmax + Cmin) / 2;
    var res = {
        H: 0,
        S: 0,
        L: L
    }
    var remainder = 0;

    if (delta !== 0) {
        S = delta / (1 - Math.abs((2 * L) - 1));

        switch (Cmax) {
            case R:
                H = ((G - B) / delta) % 6;
                break;
            case G:
                H = ((B - R) / delta) + 2;
                break;
            case B:
                H = ((R - G) / delta) + 4;
                break;
        }
        H *= 60;
    }

    if (H < 0) {
        remainder = H % 360;

        if (remainder !== 0) {
            H = remainder + 360;
        }
    }

    res.H = H;
    res.S = S;

    return res;
}

function rgbToHslOptimizedIfElse(rgb) {
    var R = rgb.R / 255;
    var G = rgb.G / 255;
    var B = rgb.B / 255;
    var Cmax = Math.max(Math.max(R, G), B);
    var Cmin = Math.min(Math.min(R, G), B);
    var delta = Cmax - Cmin;
    var S = 0;
    var H = 0;
    var L = (Cmax + Cmin) / 2;
    var res = {
        H: 0,
        S: 0,
        L: L
    }
    var remainder = 0;

    if (delta !== 0) {
        S = delta / (1 - Math.abs((2 * L) - 1));

        if (Cmax === R) {
            H = ((G - B) / delta) % 6;
        } else if (Cmax === G) {
            H = ((B - R) / delta) + 2;
        } else if (Cmax === B) {
            H = ((R - G) / delta) + 4;
        }
        H *= 60;
    }

    if (H < 0) {
        remainder = H % 360;

        if (remainder !== 0) {
            H = remainder + 360;
        }
    }

    res.H = H;
    res.S = S;

    return res;
}

function rgbToHslOptimizedIfElseConstant(rgb) {
    var R = rgb.R * 0.00392156862745;
    var G = rgb.G * 0.00392156862745;
    var B = rgb.B * 0.00392156862745;
    var Cmax = Math.max(Math.max(R, G), B);
    var Cmin = Math.min(Math.min(R, G), B);
    var delta = Cmax - Cmin;
    var S = 0;
    var H = 0;
    var L = (Cmax + Cmin) / 2;
    var res = {
        H: 0,
        S: 0,
        L: L
    }
    var remainder = 0;

    if (delta !== 0) {
        S = delta / (1 - Math.abs((2 * L) - 1));

        if (Cmax === R) {
            H = ((G - B) / delta) % 6;
        } else if (Cmax === G) {
            H = ((B - R) / delta) + 2;
        } else if (Cmax === B) {
            H = ((R - G) / delta) + 4;
        }
        H *= 60;
    }

    if (H < 0) {
        remainder = H % 360;

        if (remainder !== 0) {
            H = remainder + 360;
        }
    }

    res.H = H;
    res.S = S;

    return res;
}

function rgbToHslOptimizedIfElseConstantClosure(c) {
    var a = .00392156862745 * c.h, e = .00392156862745 * c.f, f = .00392156862745 * c.c, g = Math.max(Math.max(a, e), f), d = Math.min(Math.min(a, e), f), h = g - d, b = c = 0, k = (g + d) / 2, d = {a:0, b:0, g:k};
    0 !== h && (c = h / (1 - Math.abs(2 * k - 1)), g === a ? b = (e - f) / h % 6 : g === e ? b = (f - a) / h + 2 : g === f && (b = (a - e) / h + 4), b *= 60);
    0 > b && (a = b % 360, 0 !== a && (b = a + 360));
    d.a = b;
    d.b = c;
    return d;
};

function rgbToHslOptimizedClosure(c) {
    var a = c.f / 255, e = c.b / 255, f = c.a / 255, k = Math.max(Math.max(a, e), f), d = Math.min(Math.min(a, e), f), g = k - d, b = c = 0, l = (k + d) / 2, d = {
        c: 0,
        g: 0,
        h: l
    };
    if (0 !== g) {
        c = g / (1 - Math.abs(2 * l - 1));
        switch (k) {
            case a:
                b = (e - f) / g % 6;
                break;
            case e:
                b = (f - a) / g + 2;
                break;
            case f:
                b = (a - e) / g + 4;
        }
        b *= 60;
    }
    0 > b && (a = b % 360, 0 !== a && (b = a + 360));
    d.c = b;
    d.g = c;
    return d;
}

function rgbToHslOptimizedClosureIfElse(c) {
    var a = c.f / 255, e = c.b / 255, f = c.a / 255, g = Math.max(Math.max(a, e), f), d = Math.min(Math.min(a, e), f), h = g - d, b = c = 0, l = (g + d) / 2, d = {c:0, g:0, h:l};
    0 !== h && (c = h / (1 - Math.abs(2 * l - 1)), g === a ? b = (e - f) / h % 6 : g === e ? b = (f - a) / h + 2 : g === f && (b = (a - e) / h + 4), b *= 60);
    0 > b && (a = b % 360, 0 !== a && (b = a + 360));
    d.c = b;
    d.g = c;
    return d;
}

new Benchmark.Suite()
    // .add('rgbToHsl', function () {
    //     rgbToHsl(RGB);
    // })
    //  .add('rgbToHslIfElse', function () {
    //      rgbToHslIfElse(RGB);
    // })
    // .add('rgbToHslOptimized', function () {
    //     rgbToHslOptimized(RGB);
    // })
    // .add('rgbToHslOptimizedClosure', function () {
    //     rgbToHslOptimizedClosure(RGB);
    // })
    // .add('rgbToHslOptimizedIfElse', function () {
    //     rgbToHslOptimizedIfElse(RGB);
    // })
    // .add('rgbToHslOptimizedClosureIfElse', function () {
    //     rgbToHslOptimizedClosureIfElse(RGB);
    // })
    //  .add('rgbToHslOptimizedIfElseConstant', function () {
    //      rgbToHslOptimizedIfElseConstant(RGB);
    // })
    //  .add('rgbToHslOptimizedIfElseConstantClosure', function () {
    //      rgbToHslOptimizedIfElseConstantClosure(RGB);
    //  })
    .add('1', function () {
        var a = 123;
        var b = 3213;
        var c = 31231;
        var m = Math.max(a, b, c);
    })
    .add('2', function () {
        var a = 123;
        var b = 3213;
        var c = 31231;
        var m = Math.max(Math.max(a, b), c);
    })
    .add('3', function () {
        var a = 123;
        var b = 3213;
        var c = 31231;
        var m = a;

        if (m < b) {
            m = b
        } else if (m < c) {
            m = c
        }
    })
    .add('4', function () {
        var a = 123;
        var b = 3213;
        var c = 31231;
        var m = Math.min(a, b, c);
    })
    .add('5', function () {
        var a = 123;
        var b = 3213;
        var c = 31231;
        var m = Math.min(Math.min(a, b), c);
    })
    .add('6', function () {
        var a = 123;
        var b = 3213;
        var c = 31231;
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
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('Slowest is ' + this.filter('slowest').map('name'));
    })
    // run async
    .run({ 'async': false });