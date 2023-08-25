type GroupByIterateeReturnType = string | number | symbol;

/**
 * Creates an object composed of keys generated from the results of running each element of array through iteratee.
 * @param array The collection to iterate over.
 * @param iteratee The iteratee to transform keys.
 * @returns The composed aggregate object.
 */
export const groupBy = <T, P extends (_: T) => GroupByIterateeReturnType>(
  array: T[],
  iteratee: P,
): Record<GroupByIterateeReturnType, T[]> => {
  const aggregate: Partial<Record<GroupByIterateeReturnType, T[]>> = {};

  for (const item of array) {
    const iterateeKey = iteratee(item);

    const value = aggregate[iterateeKey];
    if (value) {
      value.push(item);
    } else {
      aggregate[iterateeKey] = [item];
    }
  }

  return aggregate as Record<GroupByIterateeReturnType, T[]>;
};
