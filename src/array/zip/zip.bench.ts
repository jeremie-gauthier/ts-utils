import { bench, describe } from 'vitest';

const generateArrays = (size: number) => {
  const leftArray = Array.from({ length: size }, (_, i) => i);
  const rightArray = Array.from({ length: size }, (_, i) =>
    String.fromCharCode(97 + (i % 26)),
  );
  return { leftArray, rightArray };
};

// Current implementation using Array.from and map
const zipArrayFromWithMap = <LeftItem, RightItem>(
  left: LeftItem[],
  right: RightItem[],
): [LeftItem, RightItem][] => {
  const minLength = Math.min(left.length, right.length);

  return Array.from({ length: minLength }).map((_, index) => [
    left[index] as LeftItem,
    right[index] as RightItem,
  ]);
};

const zipArrayFrom = <LeftItem, RightItem>(
  left: LeftItem[],
  right: RightItem[],
): [LeftItem, RightItem][] => {
  const minLength = Math.min(left.length, right.length);

  return Array.from({ length: minLength }, (_, i) =>
    // Since i < minLength, we know these accesses are safe
    [left[i] as LeftItem, right[i] as RightItem],
  );
};

// Alternative using for loop
const zipForLoop = <LeftItem, RightItem>(
  left: LeftItem[],
  right: RightItem[],
): [LeftItem, RightItem][] => {
  const minLength = Math.min(left.length, right.length);
  const result: [LeftItem, RightItem][] = [];

  for (let i = 0; i < minLength; i++) {
    result.push([left[i], right[i]]);
  }

  return result;
};

// Alternative using while loop
const zipWhileLoop = <LeftItem, RightItem>(
  left: LeftItem[],
  right: RightItem[],
): [LeftItem, RightItem][] => {
  const minLength = Math.min(left.length, right.length);
  const result: [LeftItem, RightItem][] = [];
  let i = 0;

  while (i < minLength) {
    result.push([left[i], right[i]]);
    i++;
  }

  return result;
};

// Alternative using reduce
const zipReduce = <LeftItem, RightItem>(
  left: LeftItem[],
  right: RightItem[],
): [LeftItem, RightItem][] => {
  const minLength = Math.min(left.length, right.length);

  return left
    .slice(0, minLength)
    .reduce((acc: [LeftItem, RightItem][], leftItem, index) => {
      acc.push([leftItem, right[index]]);
      return acc;
    }, []);
};

const small = generateArrays(100);
const medium = generateArrays(10000);
const large = generateArrays(100000);

describe('Array zip implementations', () => {
  describe('small arrays (100 items)', () => {
    bench('Array.from with map implementation', () => {
      zipArrayFromWithMap(small.leftArray, small.rightArray);
    });

    bench('Array.from implementation', () => {
      zipArrayFrom(small.leftArray, small.rightArray);
    });

    bench('For loop implementation', () => {
      zipForLoop(small.leftArray, small.rightArray);
    });

    bench('While loop implementation', () => {
      zipWhileLoop(small.leftArray, small.rightArray);
    });

    bench('Reduce implementation', () => {
      zipReduce(small.leftArray, small.rightArray);
    });
  });

  describe('medium arrays (10,000 items)', () => {
    bench('Array.from with map implementation', () => {
      zipArrayFromWithMap(small.leftArray, small.rightArray);
    });

    bench('Array.from implementation (current)', () => {
      zipArrayFrom(medium.leftArray, medium.rightArray);
    });

    bench('For loop implementation', () => {
      zipForLoop(medium.leftArray, medium.rightArray);
    });

    bench('While loop implementation', () => {
      zipWhileLoop(medium.leftArray, medium.rightArray);
    });

    bench('Reduce implementation', () => {
      zipReduce(medium.leftArray, medium.rightArray);
    });
  });

  describe('large arrays (100,000 items)', () => {
    bench('Array.from with map implementation', () => {
      zipArrayFromWithMap(small.leftArray, small.rightArray);
    });

    bench('Array.from implementation (current)', () => {
      zipArrayFrom(large.leftArray, large.rightArray);
    });

    bench('For loop implementation', () => {
      zipForLoop(large.leftArray, large.rightArray);
    });

    bench('While loop implementation', () => {
      zipWhileLoop(large.leftArray, large.rightArray);
    });

    bench('Reduce implementation', () => {
      zipReduce(large.leftArray, large.rightArray);
    });
  });
});
