/* eslint-disable unicorn/no-array-reduce */

const lowerToUppersPattern = /([a-z])([A-Z]+)/g;
const uppersToLowerPattern = /([A-Z]+)([A-Z][a-z])/g;
const numbersSuffixPattern = /(\D)(\d+)/g;
const numbersPrefixPattern = /(\d+)(\D)/g;
const nonWordCharsPattern = /\W+/g;
const nonWordCharsAtBoundariesPattern = /^[\W_]+|[\W_]+$/g;

/**
 * A pre-processing function to deal with non-word chars at start/end.
 */
const trimNonWordChars = (string: string) =>
  string.replaceAll(nonWordCharsAtBoundariesPattern, '');

const regexpReplacer = (_: unknown, ...rest: string[]) =>
  rest.slice(0, -2).join(' ');

/**
 * A pre-processing function to deal with changes of capitalization.
 */
const handleCapitalizationChanges = (string: string) =>
  string
    .replaceAll(lowerToUppersPattern, regexpReplacer)
    .replaceAll(uppersToLowerPattern, regexpReplacer);

/**
 * A pre-processing function to deal with numeric chars.
 */
const handleNumbers = (string: string) =>
  string
    .replaceAll(numbersSuffixPattern, regexpReplacer)
    .replaceAll(numbersPrefixPattern, regexpReplacer);

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
    .replaceAll(nonWordCharsPattern, '_')
    .toLowerCase();
  return snakeCased;
};
