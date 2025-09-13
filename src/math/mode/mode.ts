/**
 * Compute the `mode` of the given numbers.
 *
 * The most frequent number—that is, the number that occurs the highest number of times.
 *
 * @param numbers The numbers used to compute the mode.
 * @returns The mode of the `numbers`.
 * @example
 * mode([1, 2, 2, 3]);
 * // => [2]
 * mode([1, 2, 5, 5, 2, 3, 3, 4]);
 * // => [2, 3, 5]
 * mode([1, 2, 3, 4, 5]);
 * // => []
 * mode([]);
 * // => []
 */
export const mode = (...numbers: number[]): number[] => {
  if (numbers.length < 2) {
    return [];
  }

  let maxFreq = 0;
  const freq = new Map<number, number>();
  for (const n of numbers) {
    const newFreq = (freq.get(n) ?? 0) + 1;
    freq.set(n, newFreq);

    if (newFreq > maxFreq) {
      maxFreq = newFreq;
    }
  }

  if (maxFreq === 1) {
    return [];
  }

  return freq
    .entries()
    .filter(([_, freq]) => freq === maxFreq)
    .map(([num]) => num)
    .toArray()
    .toSorted((a, b) => a - b);
};
