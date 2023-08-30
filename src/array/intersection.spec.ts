import { intersection } from './intersection';

describe('array: intersection', () => {
  describe('when the arrays have common items', () => {
    it('should return an array with the common number', () => {
      const inputs = [
        [1, 2, 3],
        [2, 3, 4],
        [3, 4, 5],
      ];

      const result = intersection(...inputs);
      const expected = [3];

      expect(result).toStrictEqual(expected);
    });

    it('should return an array with the common numbers', () => {
      const inputs = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
      ];

      const result = intersection(...inputs);
      const expected = [3, 4];

      expect(result).toStrictEqual(expected);
    });

    it('should return an array of common numbers present in every array', () => {
      const inputs = [
        [1, 2, 3, 4],
        [3, 4, 5],
        [4, 5, 6, 7],
      ];

      const result = intersection(...inputs);
      const expected = [4];

      expect(result).toStrictEqual(expected);
    });

    it('should return an array with the common string', () => {
      const inputs = [
        ['apple', 'banana', 'cherry'],
        ['banana', 'cherry', 'date'],
        ['cherry', 'date', 'elderberry'],
      ];

      const result = intersection(...inputs);
      const expected = ['cherry'];

      expect(result).toStrictEqual(expected);
    });

    it('should return an array with the common booleans', () => {
      const inputs = [
        [true, false, true],
        [false, true, true],
        [true, true, false],
      ];

      const result = intersection(...inputs);
      const expected = [true, false];

      expect(result).toStrictEqual(expected);
    });

    it('should work on array that contains elements of different types', () => {
      const inputs = [
        [1, 'a', true],
        ['a', true, false],
        [true, 1, 'a'],
      ];

      const result = intersection(...inputs);
      const expected = ['a', true];

      expect(result).toStrictEqual(expected);
    });
  });

  it('should return an empty array when there is no common item', () => {
    const inputs = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const result = intersection(...inputs);
    const expected: [] = [];

    expect(result).toStrictEqual(expected);
  });

  it('should return the given array if it is passed alone', () => {
    const inputs = [[1, 2, 3]];

    const result = intersection(...inputs);
    const expected = [1, 2, 3];

    expect(result).toStrictEqual(expected);
  });

  it('should not mutate the given arrays', () => {
    const inputs = [
      [1, 'a', true],
      ['a', true, false],
      [true, 1, 'a'],
    ];

    intersection(...inputs);
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

      const result = intersection(...inputs);
      const expected: [] = [];

      expect(result).toStrictEqual(expected);
    });

    it('should return an empty array when one of the input array is empty', () => {
      const inputs = [[], [1, 2, 3], [3, 4, 5]];

      const result = intersection(...inputs);
      const expected: [] = [];

      expect(result).toStrictEqual(expected);
    });
  });
});
