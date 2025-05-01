import { bench } from 'vitest';
import { BinaryHeap } from '../binary-heap';

// Test helper to generate large datasets
const generateDataset = (size: number) =>
  Array.from({ length: size }, (_, i) => ({ id: i, data: Math.random() }));

bench('BinaryHeap - insert 10K elements', () => {
  const heap = new BinaryHeap<{ id: number; data: number }>(
    (a, b) => a.data - b.data,
  );
  const dataset = generateDataset(10_000);

  for (const item of dataset) {
    heap.insert(item);
  }
});

bench('BinaryHeap - extract 10K elements', () => {
  const heap = new BinaryHeap<{ id: number; data: number }>(
    (a, b) => a.data - b.data,
  );
  const dataset = generateDataset(10_000);

  // Insert first
  for (const item of dataset) {
    heap.insert(item);
  }

  // Then extract all
  while (heap.extract()) {
    // continue extracting
  }
});

bench('BinaryHeap - search in 10K elements', () => {
  const heap = new BinaryHeap<{ id: number; data: number }>(
    (a, b) => a.data - b.data,
  );
  const dataset = generateDataset(10_000);

  // Insert first
  for (const item of dataset) {
    heap.insert(item);
  }

  // Perform searches
  for (let i = 0; i < 100; i++) {
    heap.search(Math.floor(Math.random() * 10000));
  }
});

bench('BinaryHeap - mixed operations on 10K elements', () => {
  const heap = new BinaryHeap<{ id: number; data: number }>(
    (a, b) => a.data - b.data,
  );
  const dataset = generateDataset(5_000);

  // Insert initial data
  for (const item of dataset) {
    heap.insert(item);
  }

  // Mixed operations
  for (let i = 0; i < 1000; i++) {
    const op = Math.random();
    if (op < 0.4) {
      heap.insert({ id: (Math.random() * 10000) | 0, data: Math.random() });
    } else if (op < 0.7) {
      heap.extract();
    } else {
      heap.search(Math.floor(Math.random() * 10000));
    }
  }
});
