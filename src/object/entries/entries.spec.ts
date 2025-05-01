import { describe, expect, it } from 'vitest';
import { entries } from './entries';

describe('object: entries', () => {
  it('should return an empty array when an empty object is given', () => {
    expect(entries({})).toStrictEqual([]);
  });

  it('should return an array of key-values tuples', () => {
    const object = {
      apple: 30,
      pineapple: 10,
      banana: 20,
    };
    const expected: [string, number][] = [
      ['apple', 30],
      ['pineapple', 10],
      ['banana', 20],
    ];

    expect(entries(object)).toStrictEqual(expected);
  });
});
