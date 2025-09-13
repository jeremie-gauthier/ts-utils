import { describe, expect, it } from 'vitest';
import { mode } from './mode';

describe('math: mode', () => {
  it('returns the mode for a simple set of numbers', () => {
    expect(mode(1, 2, 2, 3)).toEqual([2]);
    expect(mode(5, 5, 5, 1, 2)).toEqual([5]);
    expect(mode(-1, -1, -2, -2, -1)).toEqual([-1]);
    expect(mode(0, 0, -1, -1, -1)).toEqual([-1]);
    expect(mode(0, 0, 1, 2)).toEqual([0]);
  });

  it('returns all the modes in ascending order if multiple numbers have the same frequency', () => {
    expect(mode(1, 2, 2, 1)).toEqual([1, 2]);
    expect(mode(3, 3, 2, 2, 1)).toEqual([2, 3]);
    expect(mode(-2, -2, -1, -1)).toEqual([-2, -1]);
  });

  it('returns undefined for a single-element input', () => {
    expect(mode(42)).toEqual([]);
  });

  it('returns undefined value if all are unique', () => {
    expect(mode(5, 4, 3, 2, 1)).toEqual([]);
    expect(mode(-1, -2, -3)).toEqual([]);
  });

  it('handles large input arrays', () => {
    const arr = Array(10000).fill(7).concat([1, 2, 3]);
    expect(mode(...arr)).toEqual([7]);
  });

  it('works with floating point numbers', () => {
    expect(mode(1.1, 2.2, 2.2, 3.3)).toEqual([2.2]);
    expect(mode(1.5, 1.5, 2.5)).toEqual([1.5]);
  });
});
