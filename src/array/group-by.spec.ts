import { groupBy } from './group-by';

const stringIteratee = (string: string) => string.length;
const numberIteratee = Math.floor;

describe('array: groupBy', () => {
  it('should transform keys by running iteratee on elements (strings)', () => {
    const array = ['hello', ',', 'world', '!', 'foo'];

    const result = groupBy(array, stringIteratee);
    const expected = {
      1: [',', '!'],
      3: ['foo'],
      5: ['hello', 'world'],
    };

    expect(result).toEqual(expected);
  });

  it('should transform keys by running iteratee on elements (numbers)', () => {
    const array = [6.1, 4.2, 6.3];

    const result = groupBy(array, numberIteratee);
    const expected = { 4: [4.2], 6: [6.1, 6.3] };

    expect(result).toEqual(expected);
  });
});
