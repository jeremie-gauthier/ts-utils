import { describe, expect, it } from 'vitest';
import { xor } from './xor';

describe('array: xor', () => {
  describe('when the arrays have common items', () => {
    it('should return an array of unique numbers', () => {
      const inputs = [
        [1, 2, 3, 4],
        [3, 4, 5],
        [4, 5, 6, 7],
      ];

      const result = xor(...inputs);
      const expected = [1, 2, 6, 7];

      expect(result).toStrictEqual(expected);
    });

    it('should work with when one of the input array is empty', () => {
      const inputs = [[], [1, 2, 3], [3, 4, 5]];

      const result = xor(...inputs);
      const expected = [1, 2, 4, 5];

      expect(result).toStrictEqual(expected);
    });

    it('should return an array with the unique strings', () => {
      const inputs = [
        ['apple', 'banana', 'cherry'],
        ['banana', 'cherry', 'date'],
        ['cherry', 'date', 'elderberry'],
      ];

      const result = xor(...inputs);
      const expected = ['apple', 'elderberry'];

      expect(result).toStrictEqual(expected);
    });

    it('should return an array with the unique booleans', () => {
      const inputs = [
        [true, false, true],
        [false, true, true],
        [true, true, false],
      ];

      const result = xor(...inputs);
      const expected: [] = [];

      expect(result).toStrictEqual(expected);
    });

    it('should work on array that contains elements of different types', () => {
      const inputs = [
        [1, 'b', true],
        ['a', true, false],
        [true, 1, 'a'],
      ];

      const result = xor(...inputs);
      const expected = ['b', false];

      expect(result).toStrictEqual(expected);
    });
  });

  it('should return all items when there is no duplication', () => {
    const inputs = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const result = xor(...inputs);
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    expect(result).toStrictEqual(expected);
  });

  it('should return the given array if it is passed alone', () => {
    const inputs = [[1, 2, 3]];

    const result = xor(...inputs);
    const expected = [1, 2, 3];

    expect(result).toStrictEqual(expected);
  });

  it('should not mutate the given arrays', () => {
    const inputs = [
      [1, 'a', true],
      ['a', true, false],
      [true, 1, 'a'],
    ];

    xor(...inputs);
    const expected = [
      [1, 'a', true],
      ['a', true, false],
      [true, 1, 'a'],
    ];

    expect(inputs).toStrictEqual(expected);
  });

  describe('when working with empty arrays', () => {
    it('should return an empty array when every input array is empty', () => {
      const inputs = [[], [], []];

      const result = xor(...inputs);
      const expected: [] = [];

      expect(result).toStrictEqual(expected);
    });
  });
});
