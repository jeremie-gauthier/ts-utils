const INITIAL_VALUE = 0;

/**
 * Compute the sum of the given numbers by applying the given iteratee on every item
 * @param iteratee the iteratee invoked per item
 * @param numbers the numbers to sum
 * @returns the sum of the numbers
 */
export const sumBy = <Item>(
  iteratee: (item: Item) => number,
  ...numbers: Item[]
): number =>
  numbers.reduce(
    (previousValue, currentValue) => previousValue + iteratee(currentValue),
    INITIAL_VALUE,
  );
