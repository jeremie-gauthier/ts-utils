/**
 * Reverse a string
 * @param string the string to reverse
 * @returns the reversed string
 */
export const reverse = (string: string): string =>
  [...string].reverse().join('');
