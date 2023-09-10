import { describe, expect, it } from 'vitest';
import { reverse } from './reverse';

describe('string: reverse', () => {
  it('should returns the reverse of a string of positive length', () => {
    const string = 'paris';
    const expected = 'sirap';
    expect(reverse(string)).toEqual(expected);
  });

  it('should returns an empty string if given in input', () => {
    const string = '';
    const expected = '';
    expect(reverse(string)).toEqual(expected);
  });

  it('should not mutate the original string', () => {
    const string = 'paris';
    reverse(string);
    expect(string).toEqual('paris');
  });
});
