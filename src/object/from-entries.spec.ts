import { fromEntries } from './from-entries';

describe('object: fromEntries', () => {
  it('should return an empty object when an empty array is given', () => {
    expect(fromEntries([])).toStrictEqual({});
  });

  it('should return an object made of the key-values entries', () => {
    const entries: [string, number][] = [
      ['apple', 30],
      ['pineapple', 10],
      ['banana', 20],
    ];
    const expected = {
      apple: 30,
      pineapple: 10,
      banana: 20,
    };

    expect(fromEntries(entries)).toStrictEqual(expected);
  });
});
