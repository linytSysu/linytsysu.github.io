---
layout: post
title: Exploring ES2016 and ES2017 - ES2016
summary: 
tags: [es2016]
---

[ECMAScript 2016](http://exploringjs.com/es2016-es2017/pt_es2016.html)

## ECMAScript 2016

### Array.prototype.includes
```
['a', 'b', 'c'].includes('a')
true
['a', 'b', 'c'].includes('d')
false
```

The Array method `includes`
he Array method includes has the following signature:
``` js
Array.prototype.includes(value : any) : boolean
```

It returns `true` if value is an element of its receiver (this) and `false`, otherwise:
```
> ['a', 'b', 'c'].includes('a')
true
> ['a', 'b', 'c'].includes('d')
false
```

`includes` is similar to `indexOf` – the following two expressions are mostly equivalent:
```
arr.includes(x)
arr.indexOf(x) >= 0
```

The main difference is that `includes()` finds `NaN`, whereas `indexOf()` doesn’t:
```
> [NaN].includes(NaN)
true
> [NaN].indexOf(NaN)
-1
```

`includes` does not distinguish between `+0` and `-0` (which is how almost all of JavaScript works):
```
> [-0].includes(+0)
true
```

Typed Arrays will also have a method `includes()`:
```
let tarr = Uint8Array.of(12, 5, 3);
console.log(tarr.includes(5)); // true
```

### Exponentiation operator (**)
`**` is an infix operator for exponentiation:
```
x ** y
```

produces the same result as
```
Math.pow(x, y)
```

Examples:
```
let squared = 3 ** 2; // 9

let num = 3;
num **= 2;
console.log(num); // 9
```