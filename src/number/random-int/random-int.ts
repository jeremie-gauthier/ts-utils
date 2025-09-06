/**
 * Get a random integer within the given range.
 * @param lower The lower bound.
 * @param upper The upper bound.
 * @returns A random integer.
 * @example
 * randomInt(0, 10);
 * // => 7
 */
export const randomInt = (lower: number, upper: number): number => {
  const [min, max] =
    lower <= upper
      ? [Math.ceil(lower), Math.floor(upper)]
      : [Math.ceil(upper), Math.floor(lower)];

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
