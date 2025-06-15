import { describe, expect, it } from 'vitest';
import { countOccurences } from './count-occurences';

describe('string: count-occurences', () => {
  it('should returns 0 when subString does not exists in string', () => {
    const string = 'paris';

    expect(countOccurences(string, 'abc')).toEqual(0);
    expect(countOccurences(string, 'Pa')).toEqual(0);
    expect(countOccurences(string, '')).toEqual(0);
    expect(countOccurences('', '')).toEqual(0);
    expect(countOccurences('', 'abc')).toEqual(0);
  });

  it('should returns the number of time the subString is repeated in string', () => {
    {
      const string = `Baby shark, doo doo doo doo doo doo.
Baby shark, doo doo doo doo doo doo.
Baby shark, doo doo doo doo doo doo.
Baby shark!
`;
      expect(countOccurences(string, 'doo')).toEqual(18);
      expect(countOccurences(string, 'a')).toEqual(8);
      expect(countOccurences(string, 'shark')).toEqual(4);
      expect(countOccurences(string, 'shark,')).toEqual(3);
      expect(countOccurences(string, 'shark!')).toEqual(1);
      expect(countOccurences('aaaaaaaaaaaaa', 'aa')).toEqual(12);
    }
  });
});
