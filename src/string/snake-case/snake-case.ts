/* eslint-disable unicorn/no-array-reduce */

const lowerToUppersPattern = /([a-z])([A-Z]+)/g;
const uppersToLowerPattern = /([A-Z]+)([A-Z][a-z])/g;
const numbersSuffixPattern = /(\D)(\d+)/g;
const numbersPrefixPattern = /(\d+)(\D)/g;
const nonWordCharsPattern = /[^a-zA-Z0-9\u00C0-\u017F]+/g;
const nonWordCharsAtBoundariesPattern =
  /^[^a-zA-Z0-9\u00C0-\u017F_]+|[^a-zA-Z0-9\u00C0-\u017F_]+$/g;

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

/**
 * Normalize accented characters to their ASCII equivalent
 */
const normalizeAccents = (string: string) =>
  string.normalize('NFD').replace(/\p{Diacritic}/gu, '');

const PRE_PROCESSING_PIPELINE = [
  trimNonWordChars,
  normalizeAccents,
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
    .toLowerCase()
    .replace(/^_+|_+$/g, ''); // Supprime les underscores au début et à la fin
  return snakeCased;
};
