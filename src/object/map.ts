import type { RecordKey } from '../types/object.type';
import { entries } from './entries';
import { fromEntries } from './from-entries';

/**
 * Iteratee Type.
 * @param Key Type for the entry's `key` passed in params.
 * @param Value Type for the entry's `value` passed in params.
 * @param TransformedResult Return type of the iteratee. Must be an array of 2 elements [key, value].
 */
export type Iteratee<
  Key extends RecordKey,
  Value,
  TransformedResult extends [RecordKey, unknown],
> = ([key, value]: [Key, Value]) => TransformedResult;

/**
 * Creates an object with entries generated by running each own enumerable entry of object through iteratee. The iteratee is invoked with a tuple argument: [key, value].
 * @param object The object to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the new mapped object.
 */
export const map = <
  Key extends RecordKey,
  Value,
  TransformedKey extends RecordKey,
  TransformedValue,
>(
  object: Readonly<Record<Key, Value>>,
  iteratee: Iteratee<Key, Value, [TransformedKey, TransformedValue]>,
) => fromEntries(entries(object).map(([key, value]) => iteratee([key, value])));