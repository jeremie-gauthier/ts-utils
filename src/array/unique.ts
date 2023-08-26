/**
 * Creates a duplicate-free version of an array.
 * @param array The array to inspect.
 * @template Item Type of the `array` elements.
 * @returns The new duplicate free array.
 */
export const unique = <Item>(array: Item[]): Item[] => {
  return [...new Set(array)];
};
