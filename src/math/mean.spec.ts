import { mean } from './mean';

describe('math: mean', () => {
  it('should returns 0 if no arguments is given', () => {
    expect(mean()).toBe(0);
  });

  it('should returns the correct mean of given numbers when 1+ arguments are given', () => {
    expect(mean(10, 20, 30)).toBe(20);
    expect(mean(1, 2, 3, 4, 5)).toBe(3);
  });
});
