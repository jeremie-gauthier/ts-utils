/**
 * Reverse a string.
 * @param string The string to reverse.
 * @returns The reversed string.
 * @example
 * reverse("TypeScript");
 * // => "tpircSepyT"
 */
export const reverse = (string: string): string =>
  string.split('').reverse().join('');
