import { clamp } from './clamp';

describe('number: clamp', () => {
  it('should return lower bound if number < lower', () => {
    const testedNumber = 4;
    const lowerBound = 5;
    const upperBound = 10;
    expect(clamp(testedNumber, lowerBound, upperBound)).toBe(lowerBound);
  });

  it('should return upper bound if number > lower', () => {
    const testedNumber = 12;
    const lowerBound = 5;
    const upperBound = 10;
    expect(clamp(testedNumber, lowerBound, upperBound)).toBe(upperBound);
  });

  it('should return the given number if lower <= number <= upper', () => {
    const lowerBound = 5;
    const upperBound = 10;
    expect(clamp(5, lowerBound, upperBound)).toBe(lowerBound);
    expect(clamp(6, lowerBound, upperBound)).toBe(6);
    expect(clamp(10, lowerBound, upperBound)).toBe(upperBound);
  });
});
