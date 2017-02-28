var _ = require('lodash');
var process = require('process');
var Benchmark = require('benchmark');
Benchmark = Benchmark.runInContext({ _: _, process: global });
global.Benchmark = Benchmark;

function addSlashes(str, isChar)
{
    var s = str.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t')
        .replace(/\r/g, '\\r')
        .replace(/\v/g, '\\v')
        .replace(/\0/g, '\\0');
    if (isChar)
    {
        return s.replace(/\'/g, '\\\'');
    }
    else
    {
        return s.replace(/\"/g, '\\"');
    }
}

// TO STRING

function toStringOptimised(v)
{
    var type = typeof v;
    if (type === 'function')
    {
        var name = v.func ? v.func.name : v.name;
        return '<function' + (name === '' ? '' : ':') + name + '>';
    }

    if (type === 'boolean')
    {
        return v ? 'True' : 'False';
    }

    if (type === 'number')
    {
        return v + '';
    }

    if (v instanceof String)
    {
        return '\'' + addSlashes(v, true) + '\'';
    }

    if (type === 'string')
    {
        return '"' + addSlashes(v, false) + '"';
    }

    if (v === null)
    {
        return 'null';
    }

    if (type === 'object' && 'ctor' in v)
    {
        var ctorStarter = v.ctor.substring(0, 5);

        if (ctorStarter === '_Tupl')
        {
            var output = [];
            for (var k in v)
            {
                if (k === 'ctor') continue;
                output.push(toString(v[k]));
            }
            return '(' + output.join(',') + ')';
        }

        if (ctorStarter === '_Task')
        {
            return '<task>'
        }

        if (v.ctor === '_Array')
        {
            var list = _elm_lang$core$Array$toList(v);
            return 'Array.fromList ' + toString(list);
        }

        if (v.ctor === '<decoder>')
        {
            return '<decoder>';
        }

        if (v.ctor === '_Process')
        {
            return '<process:' + v.id + '>';
        }

        if (v.ctor === '::')
        {
            var output = '[' + toString(v._0);
            v = v._1;
            while (v.ctor === '::')
            {
                output += ',' + toString(v._0);
                v = v._1;
            }
            return output + ']';
        }

        if (v.ctor === '[]')
        {
            return '[]';
        }

        if (v.ctor === 'Set_elm_builtin')
        {
            return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
        }

        if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
        {
            return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
        }

        var output = '';
        for (var i in v)
        {
            if (i === 'ctor') continue;
            var str = toString(v[i]);
            var c0 = str[0];
            var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
            output += ' ' + (parenless ? str : '(' + str + ')');
        }
        return v.ctor + output;
    }

    if (type === 'object')
    {
        if (v instanceof Date)
        {
            return '<' + v.toString() + '>';
        }

        if (v.elm_web_socket)
        {
            return '<websocket>';
        }

        var output = [];
        for (var k in v)
        {
            output.push(k + ' = ' + toString(v[k]));
        }
        if (output.length === 0)
        {
            return '{}';
        }
        return '{ ' + output.join(', ') + ' }';
    }

    return '<internal structure>';
}

function toString(v)
{
    var type = typeof v;
    if (type === 'function')
    {
        var name = v.func ? v.func.name : v.name;
        return '<function' + (name === '' ? '' : ':') + name + '>';
    }

    if (type === 'boolean')
    {
        return v ? 'True' : 'False';
    }

    if (type === 'number')
    {
        return v + '';
    }

    if (v instanceof String)
    {
        return '\'' + addSlashes(v, true) + '\'';
    }

    if (type === 'string')
    {
        return '"' + addSlashes(v, false) + '"';
    }

    if (v === null)
    {
        return 'null';
    }

    if (type === 'object' && 'ctor' in v)
    {
        var ctorStarter = v.ctor.substring(0, 5);

        if (ctorStarter === '_Tupl')
        {
            var output = [];
            for (var k in v)
            {
                if (k === 'ctor') continue;
                output.push(toString(v[k]));
            }
            return '(' + output.join(',') + ')';
        }

        if (ctorStarter === '_Task')
        {
            return '<task>'
        }

        if (v.ctor === '_Array')
        {
            var list = _elm_lang$core$Array$toList(v);
            return 'Array.fromList ' + toString(list);
        }

        if (v.ctor === '<decoder>')
        {
            return '<decoder>';
        }

        if (v.ctor === '_Process')
        {
            return '<process:' + v.id + '>';
        }

        if (v.ctor === '::')
        {
            var output = '[' + toString(v._0);
            v = v._1;
            while (v.ctor === '::')
            {
                output += ',' + toString(v._0);
                v = v._1;
            }
            return output + ']';
        }

        if (v.ctor === '[]')
        {
            return '[]';
        }

        if (v.ctor === 'Set_elm_builtin')
        {
            return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
        }

        if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
        {
            return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
        }

        var output = '';
        for (var i in v)
        {
            if (i === 'ctor') continue;
            var str = toString(v[i]);
            var c0 = str[0];
            var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
            output += ' ' + (parenless ? str : '(' + str + ')');
        }
        return v.ctor + output;
    }

    if (type === 'object')
    {
        if (v instanceof Date)
        {
            return '<' + v.toString() + '>';
        }

        if (v.elm_web_socket)
        {
            return '<websocket>';
        }

        var output = [];
        for (var k in v)
        {
            output.push(k + ' = ' + toString(v[k]));
        }
        if (output.length === 0)
        {
            return '{}';
        }
        return '{ ' + output.join(', ') + ' }';
    }

    return '<internal structure>';
}

// TO STRING

var toStringStrategy = {
    'function': function (v)
    {
        var name = v.func ? v.func.name : v.name;
        return '<function' + (name === '' ? '' : ':') + name + '>';
    },
    'boolean': function (v)
    {
        return v ? 'True' : 'False';
    },
    'number': function (v)
    {
        return v + '';
    },
    'string': function (v)
    {
        return '"' + addSlashes(v, false) + '"';
    },
    'object': function (v)
    {
        if ('ctor' in v)
        {
            var output;
            var ctor = v.ctor;
            var ctorStarter = ctor.substring(0, 5);

            if (ctorStarter === '_Tupl')
            {
                output = [];
                for (var k in v)
                {
                    if (k === 'ctor') continue;
                    output.push(toStringWithStrategy(v[k]));
                }
                return '(' + output.join(',') + ')';
            }

            if (ctorStarter === '_Task')
            {
                return '<task>'
            }

            if (ctor === '_Array')
            {
                var list = _elm_lang$core$Array$toList(v);
                return 'Array.fromList ' + toStringWithStrategy(list);
            }

            if (ctor === '<decoder>')
            {
                return '<decoder>';
            }

            if (ctor === '_Process')
            {
                return '<process:' + v.id + '>';
            }

            if (ctor === '::')
            {
                output = '[' + toStringWithStrategy(v._0);
                v = v._1;
                while (ctor === '::')
                {
                    output += ',' + toStringWithStrategy(v._0);
                    v = v._1;
                }
                return output + ']';
            }

            if (ctor === '[]')
            {
                return '[]';
            }

            if (ctor === 'Set_elm_builtin')
            {
                return 'Set.fromList ' + toStringWithStrategy(_elm_lang$core$Set$toList(v));
            }

            if (ctor === 'RBNode_elm_builtin' || ctor === 'RBEmpty_elm_builtin')
            {
                return 'Dict.fromList ' + toStringWithStrategy(_elm_lang$core$Dict$toList(v));
            }

            output = '';
            for (var i in v)
            {
                if (i === 'ctor') continue;
                var str = toStringWithStrategy(v[i]);
                var c0 = str[0];
                var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
                output += ' ' + (parenless ? str : '(' + str + ')');
            }
            return ctor + output;
        }

        if (v instanceof Date)
        {
            return '<' + v.toStringWithStrategy() + '>';
        }

        if (v instanceof String)
        {
            return '\'' + addSlashes(v, true) + '\'';
        }

        if (v.elm_web_socket)
        {
            return '<websocket>';
        }

        output = [];
        for (var k in v)
        {
            output.push(k + ' = ' + toStringWithStrategy(v[k]));
        }
        if (output.length === 0)
        {
            return '{}';
        }
        return '{ ' + output.join(', ') + ' }';
    }
}

function toStringWithStrategy(v)
{
    var type = typeof v;

    if (toStringStrategy[type]) toStringStrategy[type](v);

    return '<internal structure>';
}

new Benchmark.Suite()
    .add('toString', function () {
        toString(null);
        toString(true);
        toString('Hello');
        toString(1);
        toString(function () {});
    })
    .add('toStringWithStrategy', function () {
        toStringWithStrategy(null);
        toStringWithStrategy(true);
        toStringWithStrategy('Hello');
        toStringWithStrategy(1);
        toStringWithStrategy(function () {});
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