const INITIAL_VALUE = 0;

/**
 * Iteratee Type.
 * @param item An element of the `numbers` collection.
 * @template Item Type of the `numbers` elements.
 */
export type Iteratee<Item> = (item: Item) => number;

/**
 * Compute the sum of the given numbers by applying the given iteratee on every item.
 * @param iteratee The iteratee invoked per item.
 * @param numbers The numbers to sum.
 * @template Item Type of the `numbers` elements.
 * @returns The sum of the numbers.
 */
export const sumBy = <Item>(
  iteratee: Iteratee<Item>,
  ...numbers: Item[]
): number =>
  numbers.reduce(
    (previousValue, currentValue) => previousValue + iteratee(currentValue),
    INITIAL_VALUE,
  );
