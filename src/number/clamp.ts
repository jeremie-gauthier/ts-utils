/**
 * Clamps number within the inclusive lower and upper bounds
 * @param number the number to clamp
 * @param lower the lower bound
 * @param upper the upper bound
 * @returns the clamped number
 */
export const clamp = (number: number, lower: number, upper: number): number =>
  Math.min(upper, Math.max(lower, number));
