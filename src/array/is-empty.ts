/**
 * Test whether an array is empty.
 * @param array The array to test.
 * @template Item Type of the `array` elements.
 * @returns True if the array contains no element, false otherwise.
 */
export const isEmpty = <Item>(array: Item[]): boolean => array.length === 0;
