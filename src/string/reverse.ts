/**
 * Reverse a string.
 * @param string The string to reverse.
 * @returns The reversed string.
 */
export const reverse = (string: string): string =>
  [...string].reverse().join('');
