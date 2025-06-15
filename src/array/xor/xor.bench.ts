import { bench, describe } from 'vitest';
import { sumBy } from '../../math';

const generateArrays = (
  size: number,
  arrayCount: number,
  overlapPercentage = 0.3,
) => {
  const arrays: number[][] = [];
  const overlap = Math.floor(size * overlapPercentage);

  // Generate common elements
  const commonElements = Array.from({ length: overlap }, (_, i) => i);

  // Generate arrays with some overlap
  for (let i = 0; i < arrayCount; i++) {
    const array = [...commonElements];
    // Add unique elements
    for (let j = 0; j < size - overlap; j++) {
      array.push(size * (i + 1) + j);
    }
    arrays.push(array);
  }

  return arrays;
};

// Current implementation using Sets and sumBy
const xorWithSets = <Item>(...arrays: Item[][]): Item[] => {
  const sets = arrays.map((array) => new Set(array));

  const xorSet = new Set<Item>();

  for (const set of sets) {
    for (const value of set) {
      const valueOccurence = sumBy((set) => (set.has(value) ? 1 : 0), ...sets);
      if (valueOccurence === 1) {
        xorSet.add(value);
      }
    }
  }

  return [...xorSet];
};

// Alternative using Map to count occurrences
const xorWithMap = <Item>(...arrays: Item[][]): Item[] => {
  const frequency = new Map<Item, number>();

  // Count occurrences of each item
  for (const array of arrays) {
    const uniqueItems = new Set(array);
    for (const item of uniqueItems) {
      frequency.set(item, (frequency.get(item) || 0) + 1);
    }
  }

  // Filter items that appear exactly once
  return Array.from(frequency.entries())
    .filter(([_, count]) => count === 1)
    .map(([item]) => item);
};

// Alternative using filter and includes
const xorWithFilter = <Item>(...arrays: Item[][]): Item[] => {
  const result = new Set<Item>();

  for (let i = 0; i < arrays.length; i++) {
    const currentArray = arrays[i];
    for (const item of currentArray) {
      let isUnique = true;
      for (let j = 0; j < arrays.length; j++) {
        if (i !== j && arrays[j].includes(item)) {
          isUnique = false;
          break;
        }
      }
      if (isUnique) {
        result.add(item);
      }
    }
  }

  return [...result];
};

// Alternative using reduce and Set operations
const xorWithReduce = <Item>(...arrays: Item[][]): Item[] => {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return [...new Set(arrays[0])];

  const allItems = new Set<Item>();
  const duplicates = new Set<Item>();

  for (const array of arrays) {
    const currentSet = new Set(array);
    for (const item of currentSet) {
      if (allItems.has(item)) {
        duplicates.add(item);
      }
      allItems.add(item);
    }
  }

  return [...allItems].filter((item) => !duplicates.has(item));
};

const smallArrays = generateArrays(100, 3);
const mediumArrays = generateArrays(1000, 3);
const largeArrays = generateArrays(10000, 3);

describe('Array xor implementations', () => {
  describe('small arrays (100 items each)', () => {
    bench('Sets implementation', () => {
      xorWithSets(...smallArrays);
    });

    bench('Map implementation', () => {
      xorWithMap(...smallArrays);
    });

    bench('Filter implementation', () => {
      xorWithFilter(...smallArrays);
    });

    bench('Reduce implementation', () => {
      xorWithReduce(...smallArrays);
    });
  });

  describe('medium arrays (1,000 items each)', () => {
    bench('Sets implementation', () => {
      xorWithSets(...mediumArrays);
    });

    bench('Map implementation', () => {
      xorWithMap(...mediumArrays);
    });

    bench('Filter implementation', () => {
      xorWithFilter(...mediumArrays);
    });

    bench('Reduce implementation', () => {
      xorWithReduce(...mediumArrays);
    });
  });

  describe('large arrays (10,000 items each)', () => {
    bench('Sets implementation', () => {
      xorWithSets(...largeArrays);
    });

    bench('Map implementation', () => {
      xorWithMap(...largeArrays);
    });

    bench('Filter implementation', () => {
      xorWithFilter(...largeArrays);
    });

    bench('Reduce implementation', () => {
      xorWithReduce(...largeArrays);
    });
  });
});
