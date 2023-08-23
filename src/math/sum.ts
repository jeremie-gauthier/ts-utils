const INITIAL_VALUE = 0;

/**
 * Compute the sum of the given numbers
 * @param numbers the numbers to sum
 * @returns the sum of the numbers
 */
export const sum = (...numbers: number[]): number =>
  numbers.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    INITIAL_VALUE,
  );
