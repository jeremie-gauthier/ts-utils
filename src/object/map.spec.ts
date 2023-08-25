import { map } from './map';

describe('object: map', () => {
  it('should return a new object with lowercased keys', () => {
    const initialObject = { JAVASCRIPT: 1, TypeScript: 2, NodeJS: 3 };
    const expected = { javascript: 1, typescript: 2, nodejs: 3 };
    expect(
      map(initialObject, ([key, value]) => [key.toLowerCase(), value]),
    ).toStrictEqual(expected);
  });

  it('should not mutate the initial object', () => {
    const initialObject = { JAVASCRIPT: 1, TypeScript: 2, NodeJS: 3 };
    const expected = { JAVASCRIPT: 1, TypeScript: 2, NodeJS: 3 };
    map(initialObject, ([key, value]) => [key.toLowerCase(), value]);
    expect(initialObject).toStrictEqual(expected);
  });
});
