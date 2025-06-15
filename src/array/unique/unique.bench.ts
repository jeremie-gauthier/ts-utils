import { bench, describe } from 'vitest';

const generateArray = (size: number) => {
  const array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (size / 2))); // This ensures some duplicates
  }
  return array;
};

const smallArray = generateArray(100);
const mediumArray = generateArray(10000);
const largeArray = generateArray(100000);

// Different implementations to test
const uniqueSet = <T>(array: T[]): T[] => [...new Set(array)];

const uniqueFilter = <T>(array: T[]): T[] =>
  array.filter((item, index) => array.indexOf(item) === index);

const uniqueReduce = <T>(array: T[]): T[] =>
  array.reduce((unique: T[], item) => {
    if (!unique.includes(item)) {
      unique.push(item);
    }
    return unique;
  }, []);

const uniqueObject = <T>(array: T[]): T[] => {
  const seen: Record<string, boolean> = {};
  return array.filter((item) => {
    const key = JSON.stringify(item);
    if (Object.prototype.hasOwnProperty.call(seen, key)) {
      return false;
    }
    seen[key] = true;
    return true;
  });
};

describe('Array unique implementations', () => {
  describe('small array (100 items)', () => {
    bench('Set implementation', () => {
      uniqueSet(smallArray);
    });

    bench('Filter implementation', () => {
      uniqueFilter(smallArray);
    });

    bench('Reduce implementation', () => {
      uniqueReduce(smallArray);
    });

    bench('Object implementation', () => {
      uniqueObject(smallArray);
    });
  });

  describe('medium array (10,000 items)', () => {
    bench('Set implementation', () => {
      uniqueSet(mediumArray);
    });

    bench('Filter implementation', () => {
      uniqueFilter(mediumArray);
    });

    bench('Reduce implementation', () => {
      uniqueReduce(mediumArray);
    });

    bench('Object implementation', () => {
      uniqueObject(mediumArray);
    });
  });

  describe('large array (100,000 items)', () => {
    bench('Set implementation', () => {
      uniqueSet(largeArray);
    });

    bench('Filter implementation', () => {
      uniqueFilter(largeArray);
    });

    bench('Reduce implementation', () => {
      uniqueReduce(largeArray);
    });

    bench('Object implementation', () => {
      uniqueObject(largeArray);
    });
  });
});
