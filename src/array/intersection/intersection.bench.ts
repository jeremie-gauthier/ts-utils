import { bench, describe } from 'vitest';

const generateArrays = (size: number, arrayCount: number) => {
  const arrays: number[][] = [];
  const commonElements = new Set<number>();

  // Generate some common elements (about 20% of size)
  for (let i = 0; i < size * 0.2; i++) {
    commonElements.add(Math.floor(Math.random() * size));
  }

  for (let i = 0; i < arrayCount; i++) {
    const array: number[] = [...commonElements];
    // Add unique elements
    while (array.length < size) {
      const num = Math.floor(Math.random() * (size * 10)) + size;
      array.push(num);
    }
    arrays.push(array);
  }

  return arrays;
};

// Current implementation
const intersectionSet = <Item>(...arrays: Item[][]): Item[] => {
  if (arrays.some((array) => array.length === 0)) {
    return [];
  }

  const sets = arrays.slice(1).map((array) => new Set(array));
  const intersectionSet = sets.reduce(
    (intersectionSet, set) =>
      new Set(Array.from(intersectionSet).filter((value) => set.has(value))),
    new Set(arrays[0]),
  );

  return [...intersectionSet];
};

// Alternative implementation using Set.has directly
const intersectionSetDirect = <Item>(...arrays: Item[][]): Item[] => {
  if (arrays.some((array) => array.length === 0)) {
    return [];
  }

  const firstSet = new Set(arrays[0]);
  for (let i = 1; i < arrays.length; i++) {
    const currentSet = new Set(arrays[i]);
    for (const item of firstSet) {
      if (!currentSet.has(item)) {
        firstSet.delete(item);
      }
    }
  }

  return [...firstSet];
};

// Alternative implementation using map for frequency counting
const intersectionMap = <Item>(...arrays: Item[][]): Item[] => {
  if (arrays.some((array) => array.length === 0)) {
    return [];
  }

  const frequency = new Map<Item, number>();

  for (const array of arrays) {
    const seen = new Set(array);
    for (const item of seen) {
      frequency.set(item, (frequency.get(item) || 0) + 1);
    }
  }

  return [...frequency.entries()]
    .filter(([, count]) => count === arrays.length)
    .map(([item]) => item);
};

const smallArrays = generateArrays(100, 3);
const mediumArrays = generateArrays(1000, 3);
const largeArrays = generateArrays(10000, 3);

describe('Array intersection implementations', () => {
  describe('small arrays (100 items)', () => {
    bench('Set implementation', () => {
      intersectionSet(...smallArrays);
    });

    bench('Set Direct implementation', () => {
      intersectionSetDirect(...smallArrays);
    });

    bench('Map implementation', () => {
      intersectionMap(...smallArrays);
    });
  });

  describe('medium arrays (1,000 items)', () => {
    bench('Set implementation', () => {
      intersectionSet(...mediumArrays);
    });

    bench('Set Direct implementation', () => {
      intersectionSetDirect(...mediumArrays);
    });

    bench('Map implementation', () => {
      intersectionMap(...mediumArrays);
    });
  });

  describe('large arrays (10,000 items)', () => {
    bench('Set implementation', () => {
      intersectionSet(...largeArrays);
    });

    bench('Set Direct implementation', () => {
      intersectionSetDirect(...largeArrays);
    });

    bench('Map implementation', () => {
      intersectionMap(...largeArrays);
    });
  });
});
