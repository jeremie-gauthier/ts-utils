/**
 * Capitalize a string.
 * @param string The string to capitalize.
 * @returns A new, capitalized, string.
 * @example
 * capitalize("typescript");
 * // => "Typescript"
 */
export const capitalize = <Input extends string>(
  string: Input,
): Capitalize<Input> =>
  (string.charAt(0).toUpperCase() + string.slice(1)) as Capitalize<Input>;
