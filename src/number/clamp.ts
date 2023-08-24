/**
 * Clamps number within the inclusive lower and upper bounds.
 * @param number The number to clamp.
 * @param lower The lower bound.
 * @param upper The upper bound.
 * @returns The clamped number.
 */
export const clamp = (number: number, lower: number, upper: number): number =>
  Math.min(upper, Math.max(lower, number));
