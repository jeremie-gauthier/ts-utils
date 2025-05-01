import { describe, expect, it } from 'vitest';
import { transform } from './transform';

type Accumulator = Record<'even' | 'odd', string[]>;

const evenOddTransformer = (
  accumulator: Accumulator,
  key: string,
  value: number,
) => {
  if (value % 2 === 0) {
    accumulator.even.push(key);
  } else {
    accumulator.odd.push(key);
  }
};

const lowercaseTransformer = (
  accumulator: Record<string, number>,
  key: string,
  value: number,
) => {
  const lowercasedKey = key.toLowerCase();
  accumulator[lowercasedKey] = value;
};

describe('object: transform', () => {
  it('should return a transformed object', () => {
    const initialObject = {
      apple: 31,
      pineapple: 10,
      banana: 20,
    };
    const accumulator: Accumulator = { even: [], odd: [] };

    const result = transform(initialObject, evenOddTransformer, accumulator);
    const expected = { even: ['pineapple', 'banana'], odd: ['apple'] };

    expect(result).toStrictEqual(expected);
  });

  it('should lowercase keys of initial object', () => {
    const initialObject = { JAVASCRIPT: 1, TypeScript: 2, NodeJS: 3 };

    const result = transform(initialObject, lowercaseTransformer, {});
    const expected = { javascript: 1, typescript: 2, nodejs: 3 };

    expect(result).toStrictEqual(expected);
  });

  it('should not mutate the initial object', () => {
    const initialObject = { apple: 31, pineapple: 10, banana: 20 };
    const accumulator: Accumulator = { even: [], odd: [] };

    transform(initialObject, evenOddTransformer, accumulator);
    const expected = { apple: 31, pineapple: 10, banana: 20 };

    expect(initialObject).toStrictEqual(expected);
  });
});
