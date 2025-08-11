import type { AnyObjectIndexer } from '../../types';

/**
 * Iteratee Type.
 * @param item An element of the `array`.
 * @template Item Type for the item passed in params.
 */
export type Iteratee<Item> = (item: Item) => AnyObjectIndexer;

/**
 * Creates a duplicate-free version of an array using an iteratee function to identify duplicates.
 * @param array The array to inspect.
 * @param iteratee The iteratee to transform keys.
 * @template Item Type of the `array` elements.
 * @returns The new duplicate free array.
 * @example
 * uniqueBy([{"id": 1, "type": "color"}, {"id": 2, "type": "color"}, {"id": 3, "type": "shape"}, {"id": 4, "type": "color"}, {"id": 5, "type": "shape"}], (item) => item.type);
 * // => [{"id": 1, "type": "color"}, {"id": 3, "type": "shape"}]
 */
export const uniqueBy = <Item>(
  array: Item[],
  iteratee: Iteratee<Item>,
): Item[] => {
  const seen = new Set<AnyObjectIndexer>();

  return array.filter((item) => {
    const key = iteratee(item);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
};
