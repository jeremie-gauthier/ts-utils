/**
 * Clamps number within the inclusive lower and upper bounds.
 * @param number The number to clamp.
 * @param lower The lower bound.
 * @param upper The upper bound.
 * @returns The clamped number.
 * @example
 * clamp(42, 30, 40);
 * // => 40
 */
export const clamp = (number: number, lower: number, upper: number): number => {
  const [min, max] = lower <= upper ? [lower, upper] : [upper, lower];
  return Math.min(max, Math.max(min, number));
};
