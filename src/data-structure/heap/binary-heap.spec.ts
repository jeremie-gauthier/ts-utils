import { beforeEach, describe, expect, it } from 'vitest';
import { BinaryHeap } from './binary-heap';

describe('data-structure: binary-heap (min-heap)', () => {
  let minHeap: BinaryHeap<{ id: number; data: number }>;
  function numberComparator(
    a: { id: number; data: number },
    b: { id: number; data: number },
  ) {
    return a.data - b.data;
  }

  beforeEach(() => {
    minHeap = new BinaryHeap(numberComparator);
  });

  describe('insert', () => {
    it('should insert elements already sorted', () => {
      minHeap.insert({ id: 0, data: 0 });
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert({ id: 3, data: 3 });

      expect(minHeap.extract()).toStrictEqual({ id: 0, data: 0 });
      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 3, data: 3 });
      expect(minHeap.extract()).toBeUndefined();
    });

    it('should reorder unsorted elements during insertion', () => {
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert({ id: 3, data: 3 });
      minHeap.insert({ id: 0, data: 0 });
      minHeap.insert({ id: 6, data: 6 });
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 5, data: 5 });
      minHeap.insert({ id: 4, data: 4 });

      expect(minHeap.extract()).toStrictEqual({ id: 0, data: 0 });
      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 3, data: 3 });
      expect(minHeap.extract()).toStrictEqual({ id: 4, data: 4 });
      expect(minHeap.extract()).toStrictEqual({ id: 5, data: 5 });
      expect(minHeap.extract()).toStrictEqual({ id: 6, data: 6 });
      expect(minHeap.extract()).toBeUndefined();
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
      minHeap.insert({ id: 42, data: 42 });

      expect(minHeap.extract()).toStrictEqual({ id: 42, data: 42 });
      expect(minHeap.extract()).toBeUndefined();
    });

    it('should pop the first element in the heap and heapify down the heap when it is not alone', () => {
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert({ id: 3, data: 3 });

      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 3, data: 3 });
      expect(minHeap.extract()).toBeUndefined();
    });
  });

  describe('search', () => {
    it('should return the existing element', () => {
      minHeap.insert({ id: 0, data: 0 });
      minHeap.insert({ id: 12, data: 12 });
      minHeap.insert({ id: 21, data: 21 });
      minHeap.insert({ id: 42, data: 42 });

      const result = minHeap.search(21);

      expect(result).toStrictEqual({ id: 21, data: 21 });
    });

    it('should return undefined when searched element does not exists', () => {
      minHeap.insert({ id: 0, data: 0 });
      minHeap.insert({ id: 12, data: 12 });
      minHeap.insert({ id: 21, data: 21 });
      minHeap.insert({ id: 42, data: 42 });

      const result = minHeap.search(40);

      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should do nothing when the searched element does not exists', () => {
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert({ id: 4, data: 4 });
      minHeap.insert({ id: 8, data: 8 });

      minHeap.delete(42);

      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 4, data: 4 });
      expect(minHeap.extract()).toStrictEqual({ id: 8, data: 8 });
      expect(minHeap.extract()).toBeUndefined();
    });

    it('should delete the element and heapify up the heap', () => {
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 10, data: 10 });
      minHeap.insert({ id: 5, data: 5 });
      minHeap.insert({ id: 11, data: 11 });
      minHeap.insert({ id: 13, data: 13 });
      minHeap.insert({ id: 7, data: 7 });

      minHeap.delete(11);

      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 5, data: 5 });
      expect(minHeap.extract()).toStrictEqual({ id: 7, data: 7 });
      expect(minHeap.extract()).toStrictEqual({ id: 10, data: 10 });
      expect(minHeap.extract()).toStrictEqual({ id: 13, data: 13 });
      expect(minHeap.extract()).toBeUndefined();
    });

    it('should delete the element and heapify down the heap', () => {
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 10, data: 10 });
      minHeap.insert({ id: 5, data: 5 });
      minHeap.insert({ id: 11, data: 11 });
      minHeap.insert({ id: 13, data: 13 });
      minHeap.insert({ id: 17, data: 17 });

      minHeap.delete(11);

      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 5, data: 5 });
      expect(minHeap.extract()).toStrictEqual({ id: 10, data: 10 });
      expect(minHeap.extract()).toStrictEqual({ id: 13, data: 13 });
      expect(minHeap.extract()).toStrictEqual({ id: 17, data: 17 });
      expect(minHeap.extract()).toBeUndefined();
    });
  });

  describe('decreaseElement', () => {
    it('should do nothing if the searched element does not exists', () => {
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert({ id: 4, data: 4 });
      minHeap.insert({ id: 8, data: 8 });

      minHeap.decreaseElement({ id: 42, data: 6 });

      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 4, data: 4 });
      expect(minHeap.extract()).toStrictEqual({ id: 8, data: 8 });
      expect(minHeap.extract()).toBeUndefined();
    });

    it('should update an element and heapify up the heap (immutable)', () => {
      const refElement = { id: 4, data: 4 };
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert(refElement);
      minHeap.insert({ id: 8, data: 8 });

      minHeap.decreaseElement({ ...refElement, data: 0 });

      expect(minHeap.extract()).toStrictEqual({ id: 4, data: 0 });
      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 8, data: 8 });
      expect(minHeap.extract()).toBeUndefined();
    });

    it('should update an element and heapify up the heap (mutable)', () => {
      const refElement = { id: 4, data: 4 };
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert(refElement);
      minHeap.insert({ id: 8, data: 8 });

      refElement.data = 0;
      minHeap.decreaseElement(refElement);

      expect(minHeap.extract()).toStrictEqual({ id: 4, data: 0 });
      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 8, data: 8 });
      expect(minHeap.extract()).toBeUndefined();
    });
  });

  describe('increaseElement', () => {
    it('should do nothing if the searched element does not exists', () => {
      minHeap.insert({ id: 1, data: 1 });
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert({ id: 4, data: 4 });
      minHeap.insert({ id: 8, data: 8 });

      minHeap.increaseElement({ id: 42, data: 6 });

      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 1 });
      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 4, data: 4 });
      expect(minHeap.extract()).toStrictEqual({ id: 8, data: 8 });
      expect(minHeap.extract()).toBeUndefined();
    });

    it('should update an element and heapify down the heap (immutable)', () => {
      const refElement = { id: 1, data: 1 };
      minHeap.insert(refElement);
      minHeap.insert({ id: 4, data: 4 });
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert({ id: 8, data: 8 });

      minHeap.increaseElement({ ...refElement, data: 9 });

      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 4, data: 4 });
      expect(minHeap.extract()).toStrictEqual({ id: 8, data: 8 });
      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 9 });
      expect(minHeap.extract()).toBeUndefined();
    });

    it('should update an element and heapify down the heap (mutable)', () => {
      const refElement = { id: 1, data: 1 };
      minHeap.insert(refElement);
      minHeap.insert({ id: 4, data: 4 });
      minHeap.insert({ id: 2, data: 2 });
      minHeap.insert({ id: 8, data: 8 });

      refElement.data = 9;
      minHeap.increaseElement(refElement);

      expect(minHeap.extract()).toStrictEqual({ id: 2, data: 2 });
      expect(minHeap.extract()).toStrictEqual({ id: 4, data: 4 });
      expect(minHeap.extract()).toStrictEqual({ id: 8, data: 8 });
      expect(minHeap.extract()).toStrictEqual({ id: 1, data: 9 });
      expect(minHeap.extract()).toBeUndefined();
    });
  });
});
