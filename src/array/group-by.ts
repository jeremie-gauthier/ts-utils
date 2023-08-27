/**
 * Iteratee Type.
 * @param item An element of the `array`.
 * @template Item Type for the item passed in params.
 */
export type Iteratee<Item> = (item: Item) => keyof any;

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
): Record<keyof any, Item[]> => {
  const aggregate: Partial<Record<keyof any, Item[]>> = {};

  for (const item of array) {
    const iterateeKey = iteratee(item);

    const value = aggregate[iterateeKey];
    if (value) {
      value.push(item);
    } else {
      aggregate[iterateeKey] = [item];
    }
  }

  return aggregate as Record<keyof any, Item[]>;
};
