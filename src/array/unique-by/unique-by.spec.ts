import { describe, expect, it } from 'vitest';
import { uniqueBy } from './unique-by';

describe('array: unique-by', () => {
  it('should return duplicate free version of the given array', () => {
    const initialArray = [
      { id: 1, type: 'color' },
      { id: 2, type: 'color' },
      { id: 3, type: 'shape' },
      { id: 4, type: 'color' },
      { id: 5, type: 'shape' },
    ];

    const result = uniqueBy(initialArray, (item) => item.type);
    const expected = [
      { id: 1, type: 'color' },
      { id: 3, type: 'shape' },
    ];

    expect(result).toStrictEqual(expected);
  });

  it('should not mutate the original array', () => {
    const initialArray = [
      { id: 1, type: 'color' },
      { id: 2, type: 'color' },
      { id: 3, type: 'shape' },
      { id: 4, type: 'color' },
      { id: 5, type: 'shape' },
    ];

    uniqueBy(initialArray, (item) => item.type);
    const expected = [
      { id: 1, type: 'color' },
      { id: 2, type: 'color' },
      { id: 3, type: 'shape' },
      { id: 4, type: 'color' },
      { id: 5, type: 'shape' },
    ];

    expect(initialArray).toStrictEqual(expected);
  });
});
