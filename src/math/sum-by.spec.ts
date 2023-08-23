import { sumBy } from './sum-by';

const numberIteratee = (item: number) => item;
const objectIteratee = (item: { nb: number }) => item.nb;
const multiplierIteratee = (item: number) => item * 2;

describe('math: sum-by', () => {
  it('should returns 0 if no arguments is given', () => {
    expect(sumBy(numberIteratee)).toEqual(0);
  });

  it('should returns the correct sum of numbers when 1+ arguments are given', () => {
    expect(sumBy(numberIteratee, 42)).toEqual(42);
    expect(sumBy(numberIteratee, 1, 2, 3, 4, 5)).toEqual(15);
    expect(sumBy(objectIteratee, { nb: 49 }, { nb: 51 })).toEqual(100);
    expect(sumBy(multiplierIteratee, 1, 2, 3, 4, 5)).toEqual(30);
  });
});
