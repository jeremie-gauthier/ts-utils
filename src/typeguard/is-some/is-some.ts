/**
 * Generic TypeGuard against null or undefined values.
 * @param value The value to test.
 * @template Value The type of the `value` to test.
 * @example
 * const maybeValue: string | undefined = "TypeScript";
 * isSome(maybeValue)
 * // => true
 * // typeof maybeValue is string
 */
export const isSome = <Value>(
  value?: Value | null,
): value is NonNullable<Value> => value !== null && value !== undefined;
