import { sumBy } from '../../math';

/**
 * Creates an array of unique values that are not duplicated in others arrays.
 * @param arrays The arrays to inspect.
 * @template Item Type of the `arrays` elements.
 * @returns The new array of filtered values.
 * @example
 * xor([1, 2], [2, 3]);
 * // => [1, 3]
 */
export const xor = <Item>(...arrays: Item[][]): Item[] => {
  const sets = arrays.map((array) => new Set(array));

  const xorSet = new Set<Item>();

  for (const set of sets) {
    for (const value of set) {
      const valueOccurence = sumBy((set) => (set.has(value) ? 1 : 0), ...sets);
      if (valueOccurence === 1) {
        xorSet.add(value);
      }
    }
  }

  return [...xorSet];
};
