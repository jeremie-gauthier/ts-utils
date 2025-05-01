import { describe, expect, it } from 'vitest';
import { isSome } from './is-some';

describe('typeguard: isSome', () => {
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

  it('should handle all falsy values correctly', () => {
    expect(isSome(false)).toBe(true);
    expect(isSome(0)).toBe(true);
    expect(isSome('')).toBe(true);
    expect(isSome(0n)).toBe(true);
  });

  it('should handle special number objects', () => {
    expect(isSome(Number.NaN)).toBe(true);
    expect(isSome(Number.POSITIVE_INFINITY)).toBe(true);
    expect(isSome(Number.NEGATIVE_INFINITY)).toBe(true);
    expect(isSome(Number.MAX_VALUE)).toBe(true);
    expect(isSome(Number.MIN_VALUE)).toBe(true);
  });

  it('should handle functions and special objects', () => {
    expect(isSome(() => {})).toBe(true);
    expect(isSome(() => {})).toBe(true);
    expect(isSome(Symbol('test'))).toBe(true);
    expect(isSome(new Date())).toBe(true);
    expect(isSome(/(?:)/)).toBe(true);
    expect(isSome(new Error())).toBe(true);
  });
});
