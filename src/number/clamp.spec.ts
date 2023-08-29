import { clamp } from './clamp';

describe('number: clamp', () => {
  describe('when number < lower', () => {
    it('should returns the lower bound', () => {
      const testedNumber = 4;
      const lowerBound = 5;
      const upperBound = 10;
      expect(clamp(testedNumber, lowerBound, upperBound)).toBe(lowerBound);
    });

    it('should still works if args are mixed up', () => {
      const testedNumber = 4;
      const lowerBound = 5;
      const upperBound = 10;
      expect(clamp(testedNumber, upperBound, lowerBound)).toBe(lowerBound);
    });
  });

  describe('when number > lower', () => {
    it('should return upper bound if number > lower', () => {
      const testedNumber = 12;
      const lowerBound = 5;
      const upperBound = 10;
      expect(clamp(testedNumber, lowerBound, upperBound)).toBe(upperBound);
    });

    it('should still works if args are mixed up', () => {
      const testedNumber = 12;
      const lowerBound = 5;
      const upperBound = 10;
      expect(clamp(testedNumber, upperBound, lowerBound)).toBe(upperBound);
    });
  });

  describe('when lower <= number <= upper', () => {
    it('should return the given number if lower <= number <= upper', () => {
      const lowerBound = 5;
      const upperBound = 10;
      expect(clamp(5, lowerBound, upperBound)).toBe(lowerBound);
      expect(clamp(6, lowerBound, upperBound)).toBe(6);
      expect(clamp(10, lowerBound, upperBound)).toBe(upperBound);
    });

    it('should still works if args are mixed up', () => {
      const lowerBound = 5;
      const upperBound = 10;
      expect(clamp(5, upperBound, lowerBound)).toBe(lowerBound);
      expect(clamp(6, upperBound, lowerBound)).toBe(6);
      expect(clamp(10, upperBound, lowerBound)).toBe(upperBound);
    });
  });
});
