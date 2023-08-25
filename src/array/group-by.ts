import type { RecordKey } from '../types/object.type';

/**
 * Creates an object composed of keys generated from the results of running each element of array through iteratee.
 * @param array The collection to iterate over.
 * @param iteratee The iteratee to transform keys.
 * @returns The composed aggregate object.
 */
export const groupBy = <T, P extends (_: T) => RecordKey>(
  array: T[],
  iteratee: P,
): Record<RecordKey, T[]> => {
  const aggregate: Partial<Record<RecordKey, T[]>> = {};

  for (const item of array) {
    const iterateeKey = iteratee(item);

    const value = aggregate[iterateeKey];
    if (value) {
      value.push(item);
    } else {
      aggregate[iterateeKey] = [item];
    }
  }

  return aggregate as Record<RecordKey, T[]>;
};
