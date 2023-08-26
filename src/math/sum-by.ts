const INITIAL_VALUE = 0;

/**
 * Iteratee Type.
 * @param Item Type for the item passed in params.
 */
export type Iteratee<Item> = (item: Item) => number;

/**
 * Compute the sum of the given numbers by applying the given iteratee on every item.
 * @param iteratee The iteratee invoked per item.
 * @param numbers The numbers to sum.
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
