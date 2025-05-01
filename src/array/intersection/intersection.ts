/* eslint-disable unicorn/no-array-reduce */
import { isEmpty } from '../is-empty/is-empty';

/**
 * Creates an array of unique values that are included in all given arrays.
 * @param arrays The arrays to inspect.
 * @template Item Type of the `arrays` elements.
 * @returns The new array of intersecting values.
 * @example
 * intersection([1, 2], [2, 3]);
 * // => [2]
 */
export const intersection = <Item>(...arrays: Item[][]): Item[] => {
  if (arrays.some((array) => isEmpty(array))) {
    return [];
  }

  const sets = arrays.slice(1).map((array) => new Set(array));
  const intersectionSet = sets.reduce(
    (intersectionSet, set) =>
      new Set(Array.from(intersectionSet).filter((value) => set.has(value))),
    new Set(arrays[0]),
  );

  return [...intersectionSet];
};
