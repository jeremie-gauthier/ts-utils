/**
 * Capitalize a string.
 * @param string The string to capitalize.
 * @returns A new, capitalized, string.
 * @example
 * capitalize("typescript");
 * // => "Typescript"
 */
export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);
