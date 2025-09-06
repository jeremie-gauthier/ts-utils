import { afterEach, describe, expect, it, vi } from 'vitest';
import { randomInt } from './random-int';

describe('number: randomInt', () => {
  let randomSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    if (randomSpy) {
      randomSpy.mockRestore();
    }
  });

  it('returns predictable value for normal range', () => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);
    expect(randomInt(1, 5)).toBe(3);
  });

  it('returns lower bound when Math.random is 0', () => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0);
    expect(randomInt(2, 6)).toBe(2);
  });

  it('returns upper bound when Math.random is just below 1', () => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.9999999);
    expect(randomInt(2, 6)).toBe(6);
  });

  it('works when lower > upper (swaps bounds)', () => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);
    expect(randomInt(10, 5)).toBe(8);
  });

  it('returns the only value when lower == upper', () => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);
    expect(randomInt(7, 7)).toBe(7);
  });

  it('handles negative ranges', () => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.25);
    expect(randomInt(-3, 1)).toBe(-2);
  });

  it('returns NaN if lower is NaN', () => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);
    expect(Number.isNaN(randomInt(Number.NaN, 5))).toBe(true);
  });

  it('returns NaN if upper is NaN', () => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);
    expect(Number.isNaN(randomInt(1, Number.NaN))).toBe(true);
  });

  it('returns NaN if both bounds are NaN', () => {
    randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);
    expect(Number.isNaN(randomInt(Number.NaN, Number.NaN))).toBe(true);
  });
});
