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
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return [...new Set(arrays[0])];

  const allItems = new Set<Item>();
  const duplicates = new Set<Item>();

  for (const array of arrays) {
    const currentSet = new Set(array);
    for (const item of currentSet) {
      if (allItems.has(item)) {
        duplicates.add(item);
      }
      allItems.add(item);
    }
  }

  return [...allItems].filter((item) => !duplicates.has(item));
};
