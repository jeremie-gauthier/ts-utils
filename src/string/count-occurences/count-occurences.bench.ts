import { bench, describe } from 'vitest';

const TEXT = `Baby shark, doo doo doo doo doo doo.
Baby shark, doo doo doo doo doo doo.
`.repeat(1000); // This creates a ~20K characters string

const PATTERNS_TO_TEST = {
  short: 'doo',
  medium: 'Baby shark',
  long: 'doo doo doo doo doo doo',
  notFound: 'xyz123',
};

// Current implementation
const countWithSplit = (string: string, subString: string): number => {
  if (!string || !subString) {
    return 0;
  }
  return string.split(subString).length - 1;
};

// Alternative implementation using match
const countWithMatch = (string: string, subString: string): number => {
  if (!string || !subString) {
    return 0;
  }
  const matches = string.match(
    new RegExp(subString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
  );
  return matches ? matches.length : 0;
};

// Alternative implementation using indexOf loop
const countWithIndexOf = (string: string, subString: string): number => {
  if (!string || !subString) {
    return 0;
  }
  let count = 0;
  let position = 0;
  while (true) {
    position = string.indexOf(subString, position);
    if (position === -1) break;
    count++;
    position += subString.length;
  }
  return count;
};

describe('string: count occurences - short pattern', () => {
  const pattern = PATTERNS_TO_TEST.short;

  bench('split implementation', () => {
    countWithSplit(TEXT, pattern);
  });

  bench('match implementation', () => {
    countWithMatch(TEXT, pattern);
  });

  bench('indexOf implementation', () => {
    countWithIndexOf(TEXT, pattern);
  });
});

describe('string: count occurences - medium pattern', () => {
  const pattern = PATTERNS_TO_TEST.medium;

  bench('split implementation', () => {
    countWithSplit(TEXT, pattern);
  });

  bench('match implementation', () => {
    countWithMatch(TEXT, pattern);
  });

  bench('indexOf implementation', () => {
    countWithIndexOf(TEXT, pattern);
  });
});

describe('string: count occurences - long pattern', () => {
  const pattern = PATTERNS_TO_TEST.long;

  bench('split implementation', () => {
    countWithSplit(TEXT, pattern);
  });

  bench('match implementation', () => {
    countWithMatch(TEXT, pattern);
  });

  bench('indexOf implementation', () => {
    countWithIndexOf(TEXT, pattern);
  });
});

describe('string: count occurences - pattern not found', () => {
  const pattern = PATTERNS_TO_TEST.notFound;

  bench('split implementation', () => {
    countWithSplit(TEXT, pattern);
  });

  bench('match implementation', () => {
    countWithMatch(TEXT, pattern);
  });

  bench('indexOf implementation', () => {
    countWithIndexOf(TEXT, pattern);
  });
});
