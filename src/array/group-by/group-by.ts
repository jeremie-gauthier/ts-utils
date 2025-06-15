import type { AnyObjectIndexer } from '../../types';

/**
 * Iteratee Type.
 * @param item An element of the `array`.
 * @template Item Type for the item passed in params.
 */
export type Iteratee<Item> = (item: Item) => AnyObjectIndexer;

/**
 * Creates an object composed of keys generated from the results of running each element of array through iteratee.
 * @param array The collection to iterate over.
 * @param iteratee The iteratee to transform keys.
 * @template Item Type of the `array` elements.
 * @returns The composed aggregate object.
 */
export const groupBy = <Item>(
  array: Item[],
  iteratee: Iteratee<Item>,
): Record<AnyObjectIndexer, Item[]> => {
  const map = new Map<AnyObjectIndexer, Item[]>();

  for (const item of array) {
    const key = iteratee(item);
    const group = map.get(key);
    if (group) {
      group.push(item);
    } else {
      map.set(key, [item]);
    }
  }

  return Object.fromEntries(map.entries()) as Record<AnyObjectIndexer, Item[]>;
};
