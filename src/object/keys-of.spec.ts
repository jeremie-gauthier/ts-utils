import { keysOf } from './keys-of';

describe('object: keysOf', () => {
  it('should returns an empty array when an empty object is given', () => {
    expect(keysOf({})).toStrictEqual([]);
  });

  it('should returns an array of object keys', () => {
    const object = { google: 1, apple: 2, microsoft: 3 };

    const keys = keysOf(object);
    const expected = ['google', 'apple', 'microsoft'];

    expect(keys).toStrictEqual(expected);
  });
});
