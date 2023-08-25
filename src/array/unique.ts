/**
 * Creates a duplicate-free version of an array.
 * @param array The array to inspect.
 * @returns The new duplicate free array.
 */
export const unique = <Item>(array: Item[]): Item[] => {
  return [...new Set(array)];
};
