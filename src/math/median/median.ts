/**
 * Compute the median of the given numbers.
 * @param numbers The numbers used to compute the median.
 * @returns The median of the `numbers`.
 */
export function median(...numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error('Input array is empty');
  }

  const sortedNumbers = numbers.toSorted((a, b) => a - b);

  const half = Math.floor(sortedNumbers.length / 2);

  if (sortedNumbers.length % 2) {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    return sortedNumbers[half]!;
  }
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  return (sortedNumbers[half - 1]! + sortedNumbers[half]!) / 2;
}
