# json-with-typed-arrays

JSON stringify/parse with typed array support.  This helps you serialize and deserialize typed arrays.  Out of the box `JSON.stringify` will produce this:

```js
JSON.stringify(Uint8Array.from([1])) // '{"0":1}'
```

This does __not__ rehydrate into a `Uint8Array` when you `JSON.parse` the same text.

This library is a very thin wrapper that includes the bare minimum to round-trip typed arrays to and from JSON, so the above code will produce...

```js
const { stringify, parse } = require('json-with-typed-arrays')

parse(stringify(Uint8Array.from([1]))) // Uint8Array [1]
```

Otherwise it's a direct pass-through to the `JSON` module.  See [the tests](https://github.com/brianc/json-with-typed-arrays/blob/master/test.js) for more proof.

This supports all typed arrays except `BigInt` based arrays.

## But..

Why not [typeson](https://www.npmjs.com/package/typeson)?  If that works for you, great! I couldn't get it to work after fiddling with, the bundle size is larger, it has a plugin system, etc.  This is a very quick KISS approach.  If you're doing something fancy/custom you should use typeson.

## [License](https://github.com/brianc/json-with-typed-arrays/blob/master/LICENSE)
