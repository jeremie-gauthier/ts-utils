import { entries } from './entries';

type Iteratee<Key extends string | number | symbol, Value, Accumulator> = (
  accumulator: Accumulator,
  key: Key,
  value: Value,
  object: Readonly<Record<Key, Value>>,
) => void;

/**
 * Transforms `object` to a new `accumulator` object which is the result of running each of its own enumerable string keyed properties through `iteratee`, with each invocation potentially mutating the `accumulator` object.
 * @param object The object to iterate over.
 * @param iteratee The function invoked per iteration.
 * @param accumulator The custom accumulator value.
 * @returns The accumulated value.
 */
export const transform = <
  Key extends string | number | symbol,
  Value,
  Accumulator,
>(
  object: Readonly<Record<Key, Value>>,
  iteratee: Iteratee<Key, Value, Accumulator>,
  accumulator: Accumulator,
): Accumulator => {
  for (const [key, value] of entries(object)) {
    iteratee(accumulator, key, value, object);
  }
  return accumulator;
};
