import { isEmpty } from '../../array';
import { sum } from '../sum/sum';

/**
 * Compute the mean of the given numbers.
 * @param numbers The numbers used to compute the mean.
 * @returns The mean of the `numbers`.
 */
export const mean = (...numbers: number[]): number => {
  if (isEmpty(numbers)) {
    return 0;
  }
  return Math.round(sum(...numbers) / numbers.length);
};
