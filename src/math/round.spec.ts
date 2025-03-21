import { describe, expect, it } from 'vitest';
import { round } from './round';

describe('math: round', () => {
  it('should returns rounded integer when precision is 0 or omitted', () => {
    expect(round(10.56)).toStrictEqual(11);
    expect(round(10.56, 0)).toStrictEqual(11);

    expect(round(10.49)).toStrictEqual(10);
    expect(round(10.49, 0)).toStrictEqual(10);
  });

  it('should returns rounded float when precision is greater than 0', () => {
    expect(round(10.564, 1)).toStrictEqual(10.6);
    expect(round(10.564, 2)).toStrictEqual(10.56);
    expect(round(10.564, 3)).toStrictEqual(10.564);
    expect(round(10.564, 4)).toStrictEqual(10.564);
    expect(round(10.564, 10)).toStrictEqual(10.564);
  });

  it('should returns rounded integer when precision is lesser than 0', () => {
    expect(round(1978, -1)).toStrictEqual(1980);
    expect(round(1978, -2)).toStrictEqual(2000);
    expect(round(1978, -3)).toStrictEqual(2000);
  });

  it('should returns 0 when the negative precision is bigger than the number of digit', () => {
    expect(round(1978, -4)).toStrictEqual(0);
    expect(round(1978, -10)).toStrictEqual(0);
  });
});
