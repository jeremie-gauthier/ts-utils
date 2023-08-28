import { entries } from './entries';

/**
 * Iteratee Type.
 * @param accumulator The custom accumulator value.
 * @param key A `source` entry key.
 * @param value A `source` entry value.
 * @param source The object being iterated.
 * @template Key Type for the entry's `key` passed in params.
 * @template Value Type for the entry's `value` passed in params.
 * @template Accumulator A user-defined type where to accumulate the transformations.
 * @returns
 */
export type Iteratee<Key extends keyof any, Value, Accumulator> = (
  accumulator: Accumulator,
  key: Key,
  value: Value,
  source: Readonly<Record<Key, Value>>,
) => void;

/**
 * Transforms `source` to a new `accumulator` object which is the result of running each of its own enumerable string keyed properties through `iteratee`, with each invocation potentially mutating the `accumulator` object.
 * @param source The object to iterate over.
 * @param iteratee The function invoked per iteration.
 * @param accumulator The custom accumulator value.
 * @template Key Type for the entry's `key` passed in params.
 * @template Value Type for the entry's `value` passed in params.
 * @template Accumulator A user-defined type where to accumulate the transformations.
 * @returns The accumulated value.
 */
export const transform = <Key extends keyof any, Value, Accumulator>(
  source: Readonly<Record<Key, Value>>,
  iteratee: Iteratee<Key, Value, Accumulator>,
  accumulator: Accumulator,
): Accumulator => {
  for (const [key, value] of entries(source)) {
    iteratee(accumulator, key, value, source);
  }
  return accumulator;
};
