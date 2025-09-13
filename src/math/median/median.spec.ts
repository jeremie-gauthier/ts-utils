import { describe, expect, it } from 'vitest';
import { median } from './median';

describe('math: median', () => {
  it('returns the middle value for odd-length arrays', () => {
    expect(median(1, 3, 2)).toBe(2);
    expect(median(5, 1, 9)).toBe(5);
    expect(median(-1, -2, -3)).toBe(-2);
  });

  it('returns the average of two middle values for even-length arrays', () => {
    expect(median(1, 2, 3, 4)).toBe(2.5);
    expect(median(10, 2, 8, 4)).toBe(6);
    expect(median(-1, -2, -3, -4)).toBe(-2.5);
  });

  it('returns the value for a single-element array', () => {
    expect(median(42)).toBe(42);
  });

  it('throws an error for empty input', () => {
    expect(() => median()).toThrow('Input array is empty');
  });

  it('handles repeated values', () => {
    expect(median(1, 1, 1, 1)).toBe(1);
    expect(median(2, 2, 2)).toBe(2);
  });

  it('handles unsorted input', () => {
    expect(median(7, 2, 5, 3)).toBe(4);
    expect(median(10, 1, 1, 10)).toBe(5.5);
  });
});
