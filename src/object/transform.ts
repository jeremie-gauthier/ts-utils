import { entries } from './entries';

/**
 * Iteratee Type.
 * @param transformationResult The custom transformation value.
 * @param key A `source` entry key.
 * @param value A `source` entry value.
 * @param source The object being iterated.
 * @template Key Type for the entry's `key` passed in params.
 * @template Value Type for the entry's `value` passed in params.
 * @template TransformationResult A user-defined type where to accumulate the transformations.
 * @returns
 */
export type Iteratee<Key extends keyof any, Value, TransformationResult> = (
  transformationResult: TransformationResult,
  key: Key,
  value: Value,
  source: Readonly<Record<Key, Value>>,
) => void;

/**
 * Transforms `source` to a new `transformationResult` object which is the result of running each of its own enumerable string keyed properties through `iteratee`, with each invocation potentially mutating the `TransformationResult` object.
 * @param source The object to iterate over.
 * @param iteratee The function invoked per iteration.
 * @param transformationResult The custom transformation value.
 * @template Key Type for the entry's `key` passed in params.
 * @template Value Type for the entry's `value` passed in params.
 * @template TransformationResult A user-defined type where to accumulate the transformations.
 * @returns The accumulated value.
 */
export const transform = <Key extends keyof any, Value, TransformationResult>(
  source: Readonly<Record<Key, Value>>,
  iteratee: Iteratee<Key, Value, TransformationResult>,
  transformationResult: TransformationResult,
): TransformationResult => {
  for (const [key, value] of entries(source)) {
    iteratee(transformationResult, key, value, source);
  }
  return transformationResult;
};
