/**
 * Round a number to precision.
 * @param number The number to be rounded.
 * @param precision The precision to round to.
 * @returns The rounded number.
 */
export const round = (number: number, precision = 0): number => {
  const precisionOffset = 10 ** precision;
  return Math.round(number * precisionOffset) / precisionOffset;
};
