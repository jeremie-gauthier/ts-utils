import { isInRange } from './is-in-range';

describe('number: isInRange', () => {
  it('should return true if min <= number <= max', () => {
    const lowerBound = 0;
    const upperBound = 3;

    expect(isInRange(0, lowerBound, upperBound)).toBe(true);
    expect(isInRange(1, lowerBound, upperBound)).toBe(true);
    expect(isInRange(2, lowerBound, upperBound)).toBe(true);
    expect(isInRange(3, lowerBound, upperBound)).toBe(true);
  });

  it('should return false if number not in range [min, max]', () => {
    const lowerBound = 0;
    const upperBound = 3;

    expect(isInRange(-1, lowerBound, upperBound)).toBe(false);
    expect(isInRange(4, lowerBound, upperBound)).toBe(false);
  });
});
