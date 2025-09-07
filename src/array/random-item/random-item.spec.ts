import { type MockInstance, afterEach, describe, expect, it, vi } from 'vitest';
import * as numberModule from '../../number/random-int/random-int';
import { randomItem } from './random-item';

describe('array: randomItem', () => {
  let randomIntSpy: MockInstance<(lower: number, upper: number) => number>;

  afterEach(() => {
    if (randomIntSpy) randomIntSpy.mockRestore();
  });

  it('returns the first item when randomInt returns 0', () => {
    randomIntSpy = vi.spyOn(numberModule, 'randomInt') as MockInstance<
      (lower: number, upper: number) => number
    >;
    randomIntSpy.mockImplementation((_lower, _upper) => 0);
    expect(randomItem(['a', 'b', 'c'])).toBe('a');
  });

  it('returns the last item when randomInt returns array.length - 1', () => {
    randomIntSpy = vi.spyOn(numberModule, 'randomInt') as MockInstance<
      (lower: number, upper: number) => number
    >;
    randomIntSpy.mockImplementation((_lower, _upper) => 2);
    expect(randomItem(['a', 'b', 'c'])).toBe('c');
  });

  it('returns the middle item when randomInt returns 1', () => {
    randomIntSpy = vi.spyOn(numberModule, 'randomInt') as MockInstance<
      (lower: number, upper: number) => number
    >;
    randomIntSpy.mockImplementation((_lower, _upper) => 1);
    expect(randomItem(['a', 'b', 'c'])).toBe('b');
  });

  it('returns the only item for single-element array', () => {
    randomIntSpy = vi.spyOn(numberModule, 'randomInt') as MockInstance<
      (lower: number, upper: number) => number
    >;
    randomIntSpy.mockImplementation((_lower, _upper) => 0);
    expect(randomItem(['x'])).toBe('x');
  });

  it('returns undefined for empty array', () => {
    randomIntSpy = vi.spyOn(numberModule, 'randomInt') as MockInstance<
      (lower: number, upper: number) => number
    >;
    randomIntSpy.mockImplementation((_lower, _upper) => 0);
    expect(randomItem([])).toBeUndefined();
  });

  it('returns undefined if randomInt returns out-of-bounds index', () => {
    randomIntSpy = vi.spyOn(numberModule, 'randomInt') as MockInstance<
      (lower: number, upper: number) => number
    >;
    randomIntSpy.mockImplementation((_lower, _upper) => 99);
    expect(randomItem(['a', 'b', 'c'])).toBeUndefined();
  });
});
