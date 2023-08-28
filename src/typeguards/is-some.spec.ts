import { isSome } from './is-some';

describe('any: isSome', () => {
  it('should returns false if value is null or undefined', () => {
    // eslint-disable-next-line unicorn/no-null
    expect(isSome(null)).toBe(false);
    // eslint-disable-next-line unicorn/no-useless-undefined
    expect(isSome(undefined)).toBe(false);
  });

  it('should returns true if value is NOT null and NOT undefined', () => {
    expect(isSome('')).toBe(true);
    expect(isSome('a')).toBe(true);
    expect(isSome(0)).toBe(true);
    expect(isSome(1)).toBe(true);
    expect(isSome([])).toBe(true);
    expect(isSome([1])).toBe(true);
    expect(isSome({})).toBe(true);
    expect(isSome({ test: 'ok' })).toBe(true);
  });
});
