/* eslint-disable unicorn/no-array-reduce */

const lowerToUppersPattern = /([a-z])([A-Z]+)/g;
const uppersToLowerPattern = /([A-Z]+)([A-Z][a-z])/g;
const numbersPattern = /(.)(\d+)(.)/g;
const nonWordCharsPattern = /\W+/g;
const nonWordCharsAtBoundariesPattern = /^\W+|\W+$/g;

/**
 * A pre-processing function to deal with non-word chars at start/end.
 */
const trimNonWordChars = (string: string) =>
  string.replaceAll(nonWordCharsAtBoundariesPattern, '');

/**
 * A pre-processing function to deal with changes of capitalization.
 */
const handleCapitalizationChanges = (string: string) =>
  string
    .replaceAll(
      lowerToUppersPattern,
      (_, group1: string, group2: string) => `${group1} ${group2}`,
    )
    .replaceAll(
      uppersToLowerPattern,
      (_, group1: string, group2: string) => `${group1} ${group2}`,
    );

/**
 * A pre-processing function to deal with numeric chars.
 */
const handleNumbers = (string: string) =>
  string.replaceAll(
    numbersPattern,
    (_, group1: string, group2: string, group3: string) =>
      `${group1} ${group2} ${group3}`,
  );

const PRE_PROCESSING_PIPELINE = [
  trimNonWordChars,
  handleCapitalizationChanges,
  handleNumbers,
];

/**
 * Converts string to snake case.
 * @param string The string to convert.
 * @returns Returns the snake cased string.
 * @example
 * snakeCase("TypeScript");
 * // => "type_script"
 */
export const snakeCase = (string: string): string => {
  const preProcessedString = PRE_PROCESSING_PIPELINE.reduce(
    (rawString, preProcessor) => preProcessor(rawString),
    string,
  );

  const snakeCased = preProcessedString
    .split(nonWordCharsPattern)
    .join('_')
    .toLowerCase();
  return snakeCased;
};
