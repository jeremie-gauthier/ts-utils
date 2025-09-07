import { randomInt } from '../../number';

/**
 * Get a random item from the given array.
 * @param array The array to retrieve a random item from.
 * @template Item Type of the `array` elements.
 * @returns A random item from the array.
 * @example
 * randomItem(['a', 'b', 'c', 'd', 'e']);
 * // => 'c'
 * randomItem(['a', 'b', 'c', 'd', 'e']);
 * // => 'e'
 * randomItem([]);
 * // => undefined
 */
export const randomItem = <Item>(array: Item[]): Item | undefined => {
  const idx = randomInt(0, array.length);

  return array.at(idx);
};
