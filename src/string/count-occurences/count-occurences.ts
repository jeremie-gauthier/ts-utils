/**
 * Counts the number of times a substring appears in a string.
 * The search is case-sensitive and returns exact matches only.
 *
 * @param string - The string to search in
 * @param subString - The substring to search for
 * @returns The number of occurrences of the substring in the string
 *
 * @example
 * ```typescript
 * const lyrics = 'Baby shark, doo doo doo. Baby shark!';
 * countOccurences(lyrics, 'doo') // => 3
 * countOccurences(lyrics, 'shark') // => 2
 * countOccurences(lyrics, 'shark,') // => 1
 * countOccurences(lyrics, 'shark!') // => 1
 * ```
 */
export const countOccurences = (string: string, subString: string): number => {
  if (!string || !subString) {
    return 0;
  }

  let count = 0;
  let position = 0;
  while (true) {
    position = string.indexOf(subString, position);
    if (position === -1) break;

    count += 1;
    position += 1;
  }

  return count;
};
