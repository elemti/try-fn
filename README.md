# tryFn

A utility library for handling synchronous and asynchronous operations with simplified error handling.

## Installation

Add the library to your project:

```bash
npm install @elemti/try-fn
```

## Usage

### Basic Example

#### Synchronous Function

```ts
import { tryFn } from "@elemti/try-fn";

const [err, res] = tryFn(() => canThrow());
if (err !== null) return console.error(err);
console.log(res); // `res` is guaranteed to be not undefined here
```

#### Asynchronous Function

```ts
import { tryFn } from "@elemti/try-fn";

const [err, res] = await tryFn(async () => await canThrow());
if (err !== null) return console.error(err);
console.log(res); // `res` is guaranteed to be not undefined here
```

### Using `tryPromise`

If you have a promise directly, use `tryPromise` for cleaner syntax:

```ts
import { tryPromise } from "@elemti/try-fn";

const [err, res] = await tryPromise(somePromise);
if (err !== null) return console.error(err);
console.log(res);
```

## Error Handling

If the error is `null` or `undefined`, a default `Error` object with the message `"NULLISH_ERROR"` will be returned.

## License

MIT
