import { bench, describe } from 'vitest';
import type { AnyObjectIndexer } from '../../types';
import type { Iteratee } from './group-by';

const generateArray = (size: number): { value: number; group: string }[] => {
  const array: { value: number; group: string }[] = [];
  const possibleGroups = ['A', 'B', 'C', 'D', 'E'];

  for (let i = 0; i < size; i++) {
    array.push({
      value: i,
      group: possibleGroups[Math.floor(Math.random() * possibleGroups.length)],
    });
  }
  return array;
};

// Current implementation using for...of
const groupByForOf = <Item>(
  array: Item[],
  iteratee: Iteratee<Item>,
): Record<AnyObjectIndexer, Item[]> => {
  const aggregate: Partial<Record<AnyObjectIndexer, Item[]>> = {};

  for (const item of array) {
    const iterateeKey = iteratee(item);

    const value = aggregate[iterateeKey];
    if (value) {
      value.push(item);
    } else {
      aggregate[iterateeKey] = [item];
    }
  }

  return aggregate as Record<AnyObjectIndexer, Item[]>;
};

// Alternative using reduce
const groupByReduce = <Item>(
  array: Item[],
  iteratee: Iteratee<Item>,
): Record<AnyObjectIndexer, Item[]> => {
  return array.reduce(
    (acc, item) => {
      const key = iteratee(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<AnyObjectIndexer, Item[]>,
  );
};

// Alternative using Map
const groupByMap = <Item>(
  array: Item[],
  iteratee: Iteratee<Item>,
): Record<AnyObjectIndexer, Item[]> => {
  const map = new Map<AnyObjectIndexer, Item[]>();

  for (const item of array) {
    const key = iteratee(item);
    const group = map.get(key);
    if (group) {
      group.push(item);
    } else {
      map.set(key, [item]);
    }
  }

  return Object.fromEntries(map.entries()) as Record<AnyObjectIndexer, Item[]>;
};

// Alternative using traditional for loop
const groupByForLoop = <Item>(
  array: Item[],
  iteratee: Iteratee<Item>,
): Record<AnyObjectIndexer, Item[]> => {
  const result: Record<AnyObjectIndexer, Item[]> = {} as Record<
    AnyObjectIndexer,
    Item[]
  >;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = iteratee(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
};

const smallArray = generateArray(100);
const mediumArray = generateArray(10000);
const largeArray = generateArray(100000);

const iteratee = (item: { value: number; group: string }) => item.group;

describe('groupBy implementations', () => {
  describe('small array (100 items)', () => {
    bench('ForOf implementation', () => {
      groupByForOf(smallArray, iteratee);
    });

    bench('Reduce implementation', () => {
      groupByReduce(smallArray, iteratee);
    });

    bench('Map implementation', () => {
      groupByMap(smallArray, iteratee);
    });

    bench('ForLoop implementation', () => {
      groupByForLoop(smallArray, iteratee);
    });
  });

  describe('medium array (10,000 items)', () => {
    bench('ForOf implementation', () => {
      groupByForOf(mediumArray, iteratee);
    });

    bench('Reduce implementation', () => {
      groupByReduce(mediumArray, iteratee);
    });

    bench('Map implementation', () => {
      groupByMap(mediumArray, iteratee);
    });

    bench('ForLoop implementation', () => {
      groupByForLoop(mediumArray, iteratee);
    });
  });

  describe('large array (100,000 items)', () => {
    bench('ForOf implementation', () => {
      groupByForOf(largeArray, iteratee);
    });

    bench('Reduce implementation', () => {
      groupByReduce(largeArray, iteratee);
    });

    bench('Map implementation', () => {
      groupByMap(largeArray, iteratee);
    });

    bench('ForLoop implementation', () => {
      groupByForLoop(largeArray, iteratee);
    });
  });
});
