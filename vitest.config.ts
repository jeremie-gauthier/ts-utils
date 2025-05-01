import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        '**/index.ts',
        '**/*.spec.ts',
        '**/*.type.ts',
        '**/benchmarks/**',
        '**/debug/**',
        '**/*.interface.ts',
      ],
      include: ['src/**'],
      reporter: ['text', 'json', 'html'],
    },
  },
});
