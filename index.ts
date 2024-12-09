export type Result<T> = readonly [NonNullable<unknown>] | readonly [null, T];

/**
 * usage:
 *
 * ```ts
 * const [err, res] = tryFn(() => canThrow());
 * if (err !== null) return console.error(err);
 * console.log(res); // `res` is guaranteed to be not undefined here
 * ```
 *
 * or
 *
 * ```ts
 * const [err, res] = await tryFn(async () => await canThrow());
 * if (err !== null) return console.error(err);
 * console.log(res); // `res` is guaranteed to be not undefined here
 * ```
 */
export async function tryFn<const T>(fn: () => Promise<T>): Promise<Result<T>>;
export function tryFn<const T>(fn: () => T): Result<T>;
export function tryFn(fn: any) {
  try {
    const res = fn();
    if (res instanceof Promise) {
      return res.then(
        (res) => [null, res] as const,
        (err) => [err] as const
      );
    }
    return [null, res] as const;
  } catch (err) {
    if (err === null || err === undefined)
      return [new Error("NULLISH_ERROR")] as const;
    return [err] as const;
  }
}

export async function tryPromise<T>(
  promise: Promise<T>
): Promise<readonly [NonNullable<unknown>] | readonly [null, T]> {
  try {
    const res = await promise;
    return [null, res] as const;
  } catch (err) {
    if (err === null || err === undefined)
      return [new Error("NULLISH_ERROR")] as const;
    return [err] as const;
  }
}
