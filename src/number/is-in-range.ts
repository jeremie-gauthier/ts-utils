/**
 * Checks if number is between min and max (inclusive range).
 * @param number The number to check.
 * @param min The start of the range.
 * @param max The end of the range.
 * @returns Returns true if number is in the range, else false.
 * @example
 * isInRange(42, 40, 50);
 * // => true
 */
export const isInRange = (number: number, min: number, max: number): boolean =>
  number >= min && number <= max;
