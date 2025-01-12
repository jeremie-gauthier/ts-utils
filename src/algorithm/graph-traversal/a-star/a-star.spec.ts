import { describe, expect, it, test } from 'vitest';
import { AStar } from './a-star';
import grid20x20 from './fixtures/20x20.json';
import grid50x50Alt from './fixtures/50x50-alt.json';
import grid50x50 from './fixtures/50x50.json';
import gridStraightLine from './fixtures/straight-line.json';

type GridSample = {
  grid: Array<Array<string | number>>;
  solution: Array<{ row: number; column: number }>;
  positions: {
    start: { row: number; column: number };
    goal: { row: number; column: number };
  };
};

describe('algorithm: graph-traversal (A*)', () => {
  it('should do nothing on invalid data', () => {
    expect(() =>
      AStar(
        [],
        { row: 0, column: 0 },
        (_, coord) => coord.row === 21 && coord.column === 42,
        (_, coord) => Math.abs(coord.row - 21) + Math.abs(coord.column - 42),
      ),
    ).toThrow();
  });

  describe('should return the shortest path', () => {
    test('straight line', () => {
      const sampleGridStraightLine = gridStraightLine as GridSample;
      const grid = sampleGridStraightLine.grid;
      const goalCoord = sampleGridStraightLine.positions.goal;

      const result = AStar(
        grid,
        sampleGridStraightLine.positions.start,
        (_, coord) =>
          coord.row === goalCoord.row && coord.column === goalCoord.column,
        (_, coord) =>
          Math.abs(coord.row - goalCoord.row) +
          Math.abs(coord.column - goalCoord.column),
      );

      expect(result).toStrictEqual(sampleGridStraightLine.solution);
    });

    test('20x20 grid with non-visitable nodes', () => {
      const sampleGrid20x20 = grid20x20 as GridSample;
      const grid = sampleGrid20x20.grid;
      const goalCoord = sampleGrid20x20.positions.goal;

      const result = AStar(
        grid,
        sampleGrid20x20.positions.start,
        (_, coord) =>
          coord.row === goalCoord.row && coord.column === goalCoord.column,
        (_, coord) =>
          Math.abs(coord.row - goalCoord.row) +
          Math.abs(coord.column - goalCoord.column),
        {
          canVisitNode: (node) => node !== 'X',
        },
      );

      expect(result).toStrictEqual(sampleGrid20x20.solution);
    });

    test('50x50 grid with non-visitable nodes', () => {
      const sampleGrid50x50 = grid50x50 as GridSample;
      const grid = sampleGrid50x50.grid;
      const goalCoord = sampleGrid50x50.positions.goal;

      const result = AStar(
        grid,
        sampleGrid50x50.positions.start,
        (_, coord) =>
          coord.row === goalCoord.row && coord.column === goalCoord.column,
        (_, coord) =>
          Math.abs(coord.row - goalCoord.row) +
          Math.abs(coord.column - goalCoord.column),
        {
          canVisitNode: (node) => node !== 'X',
        },
      );

      expect(result).toStrictEqual(sampleGrid50x50.solution);
    });

    test('50x50-alt grid with non-visitable nodes', () => {
      const sampleGrid50x50Alt = grid50x50Alt as GridSample;
      const grid = sampleGrid50x50Alt.grid;
      const goalCoord = sampleGrid50x50Alt.positions.goal;

      const result = AStar(
        grid,
        sampleGrid50x50Alt.positions.start,
        (_, coord) =>
          coord.row === goalCoord.row && coord.column === goalCoord.column,
        (_, coord) =>
          Math.abs(coord.row - goalCoord.row) +
          Math.abs(coord.column - goalCoord.column),
        {
          canVisitNode: (node) => node !== 'X',
        },
      );

      expect(result).toStrictEqual(sampleGrid50x50Alt.solution);
    });
  });
});
