import { beforeEach, describe, expect, it } from 'vitest';
import { BinaryHeap } from './binary-heap';

describe('data-structure: binary-heap (min-heap)', () => {
  let minHeap: BinaryHeap<number>;
  function numberComparator(a: number, b: number) {
    return a - b;
  }

  beforeEach(() => {
    minHeap = new BinaryHeap(numberComparator);
  });

  describe('insert', () => {
    it('should insert elements already sorted', () => {
      minHeap.insert(0);
      minHeap.insert(1);
      minHeap.insert(2);
      minHeap.insert(3);

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [0, 1, 2, 3];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 4;

      expect(minHeap).toStrictEqual(expected);
    });

    it('should reorder unsorted elements during insertion', () => {
      minHeap.insert(2);
      minHeap.insert(3);
      minHeap.insert(0);
      minHeap.insert(6);
      minHeap.insert(1);
      minHeap.insert(5);
      minHeap.insert(4);

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [0, 1, 2, 6, 3, 5, 4];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 7;

      expect(minHeap).toStrictEqual(expected);
    });
  });

  describe('getParentIdx', () => {
    it('should return the parent index based on the binary heap formula', () => {
      // biome-ignore lint/suspicious/noExplicitAny: testing private method
      expect((minHeap as any).getParentIdx(1)).toEqual(0);
      // biome-ignore lint/suspicious/noExplicitAny: testing private method
      expect((minHeap as any).getParentIdx(2)).toEqual(0);
      // biome-ignore lint/suspicious/noExplicitAny: testing private method
      expect((minHeap as any).getParentIdx(3)).toEqual(1);
      // biome-ignore lint/suspicious/noExplicitAny: testing private method
      expect((minHeap as any).getParentIdx(4)).toEqual(1);
      // biome-ignore lint/suspicious/noExplicitAny: testing private method
      expect((minHeap as any).getParentIdx(5)).toEqual(2);
    });
  });

  describe('extract', () => {
    it('should return nothing if the heap is empty', () => {
      const result = minHeap.extract();
      expect(result).toBeUndefined();
    });

    it('should pop the first element in the heap when it is alone', () => {
      minHeap.insert(42);
      const result = minHeap.extract();
      expect(result).toEqual(42);
      expect(result).toEqual(42);
    });

    it('should pop the first element in the heap and heapify down the heap when it is not alone', () => {
      minHeap.insert(1);
      minHeap.insert(2);
      minHeap.insert(3);
      const result = minHeap.extract();
      expect(result).toEqual(1);

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [2, 3, undefined];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 2;
      expect(minHeap).toStrictEqual(expected);
    });
  });

  describe('search', () => {
    it('should return the existing element', () => {
      minHeap.insert(0);
      minHeap.insert(12);
      minHeap.insert(21);
      minHeap.insert(42);

      const result = minHeap.search((element) => element === 21);

      expect(result).toEqual(21);
    });

    it('should return undefined when searched element does not exists', () => {
      minHeap.insert(0);
      minHeap.insert(12);
      minHeap.insert(21);
      minHeap.insert(42);

      const result = minHeap.search((element) => element === 40);

      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should do nothing when the searched element does not exists', () => {
      minHeap.insert(1);
      minHeap.insert(2);
      minHeap.insert(4);
      minHeap.insert(8);

      minHeap.delete((e) => e === 7);

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [1, 2, 4, 8];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 4;

      expect(minHeap).toStrictEqual(expected);
    });

    it('should delete the element and heapify up the heap', () => {
      minHeap.insert(1);
      minHeap.insert(10);
      minHeap.insert(5);
      minHeap.insert(11);
      minHeap.insert(13);
      minHeap.insert(7);

      minHeap.delete((e) => e === 11);

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [1, 7, 5, 10, 13, undefined];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 5;

      expect(minHeap).toStrictEqual(expected);
    });

    it('should delete the element and heapify down the heap', () => {
      minHeap.insert(1);
      minHeap.insert(10);
      minHeap.insert(5);
      minHeap.insert(11);
      minHeap.insert(13);
      minHeap.insert(17);

      minHeap.delete((e) => e === 11);

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [1, 10, 5, 17, 13, undefined];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 5;

      expect(minHeap).toStrictEqual(expected);
    });
  });

  describe('decreaseElement', () => {
    it('should do nothing if the searched element does not exists', () => {
      minHeap.insert(1);
      minHeap.insert(2);
      minHeap.insert(4);
      minHeap.insert(8);

      minHeap.decreaseElement(
        (e) => e === 7,
        (e) => 6,
      );

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [1, 2, 4, 8];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 4;

      expect(minHeap).toStrictEqual(expected);
    });

    it('should update an element and heapify up the heap', () => {
      minHeap.insert(1);
      minHeap.insert(2);
      minHeap.insert(4);
      minHeap.insert(8);

      minHeap.decreaseElement(
        (e) => e === 4,
        () => 0,
      );

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [0, 2, 1, 8];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 4;

      expect(minHeap).toStrictEqual(expected);
    });
  });

  describe('increaseElement', () => {
    it('should do nothing if the searched element does not exists', () => {
      minHeap.insert(1);
      minHeap.insert(2);
      minHeap.insert(4);
      minHeap.insert(8);

      minHeap.increaseElement(
        (e) => e === 7,
        (e) => 6,
      );

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [1, 2, 4, 8];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 4;

      expect(minHeap).toStrictEqual(expected);
    });

    it('should update an element and heapify down the heap', () => {
      minHeap.insert(1);
      minHeap.insert(4);
      minHeap.insert(2);
      minHeap.insert(8);

      minHeap.increaseElement(
        (e) => e === 1,
        () => 9,
      );

      const expected = new BinaryHeap(numberComparator);
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).data = [2, 4, 9, 8];
      // biome-ignore lint/suspicious/noExplicitAny: testing
      (expected as any).size = 4;

      expect(minHeap).toStrictEqual(expected);
    });
  });
});
