import { bench, describe } from 'vitest';

const generateArray = (size: number): number[] => {
  return Array.from({ length: size }, (_, i) => i);
};

// Current implementation using Array.from and map
const chunkArrayFrom = <Item>(array: Item[], size: number): Item[][] => {
  if (size <= 0) {
    return [];
  }

  const countChunks = Math.ceil(array.length / size);

  return Array.from({ length: countChunks }).map((_, index) => {
    const sliceStartIndex = index * size;
    const sliceEndIndex = sliceStartIndex + size;

    return array.slice(sliceStartIndex, sliceEndIndex);
  });
};

// Alternative using for loop
const chunkForLoop = <Item>(array: Item[], size: number): Item[][] => {
  if (size <= 0) {
    return [];
  }

  const result: Item[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

// Alternative using while loop
const chunkWhileLoop = <Item>(array: Item[], size: number): Item[][] => {
  if (size <= 0) {
    return [];
  }

  const result: Item[][] = [];
  let index = 0;
  while (index < array.length) {
    result.push(array.slice(index, index + size));
    index += size;
  }
  return result;
};

// Alternative using reduce
const chunkReduce = <Item>(array: Item[], size: number): Item[][] => {
  if (size <= 0) {
    return [];
  }

  return array.reduce((chunks: Item[][], item: Item, index: number) => {
    const chunkIndex = Math.floor(index / size);

    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }

    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
};

const smallArray = generateArray(100);
const mediumArray = generateArray(10000);
const largeArray = generateArray(100000);

describe('Array chunk implementations', () => {
  describe('small array (100 items)', () => {
    bench('Array.from implementation', () => {
      chunkArrayFrom(smallArray, 10);
    });

    bench('For loop implementation', () => {
      chunkForLoop(smallArray, 10);
    });

    bench('While loop implementation', () => {
      chunkWhileLoop(smallArray, 10);
    });

    bench('Reduce implementation', () => {
      chunkReduce(smallArray, 10);
    });
  });

  describe('medium array (10,000 items)', () => {
    bench('Array.from implementation', () => {
      chunkArrayFrom(mediumArray, 100);
    });

    bench('For loop implementation', () => {
      chunkForLoop(mediumArray, 100);
    });

    bench('While loop implementation', () => {
      chunkWhileLoop(mediumArray, 100);
    });

    bench('Reduce implementation', () => {
      chunkReduce(mediumArray, 100);
    });
  });

  describe('large array (100,000 items)', () => {
    bench('Array.from implementation', () => {
      chunkArrayFrom(largeArray, 1000);
    });

    bench('For loop implementation', () => {
      chunkForLoop(largeArray, 1000);
    });

    bench('While loop implementation', () => {
      chunkWhileLoop(largeArray, 1000);
    });

    bench('Reduce implementation', () => {
      chunkReduce(largeArray, 1000);
    });
  });
});
