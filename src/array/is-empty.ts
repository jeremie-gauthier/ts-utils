/**
 * Test whether an array is empty
 * @param array the array to test
 * @returns true if the array contains no element, return false otherwise
 */
export const isEmpty = <T>(array: T[]): boolean => array.length === 0;
