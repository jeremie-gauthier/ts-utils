import { describe, expect, test } from 'vitest';
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
  const getIdentifier = (coord: { row: number; column: number }) =>
    `${coord.row}:${coord.column}`;

  describe('should return the shortest path', () => {
    test('straight line', () => {
      const sampleGridStraightLine = gridStraightLine as GridSample;
      const goalCoord = sampleGridStraightLine.positions.goal;

      const result = AStar({
        startCoord: sampleGridStraightLine.positions.start,
        hasReachGoal: (coord) =>
          coord.row === goalCoord.row && coord.column === goalCoord.column,
        heuristic: (coord) =>
          Math.abs(coord.row - goalCoord.row) +
          Math.abs(coord.column - goalCoord.column),
        getIdentifier,
        getNeighbours: (coord: { row: number; column: number }) =>
          [
            { row: coord.row - 1, column: coord.column },
            { row: coord.row, column: coord.column + 1 },
            { row: coord.row + 1, column: coord.column },
            { row: coord.row, column: coord.column - 1 },
          ].filter(
            ({ row, column }) =>
              sampleGridStraightLine.grid[row]?.[column] !== undefined,
          ),
      });

      expect(result).toStrictEqual(sampleGridStraightLine.solution);
    });

    test('20x20 grid with non-visitable nodes', () => {
      const sampleGrid20x20 = grid20x20 as GridSample;
      const goalCoord = sampleGrid20x20.positions.goal;

      const result = AStar({
        startCoord: sampleGrid20x20.positions.start,
        hasReachGoal: (coord) =>
          coord.row === goalCoord.row && coord.column === goalCoord.column,
        heuristic: (coord) =>
          Math.abs(coord.row - goalCoord.row) +
          Math.abs(coord.column - goalCoord.column),
        getIdentifier,
        getNeighbours: (coord: { row: number; column: number }) =>
          [
            { row: coord.row - 1, column: coord.column },
            { row: coord.row, column: coord.column + 1 },
            { row: coord.row + 1, column: coord.column },
            { row: coord.row, column: coord.column - 1 },
          ].filter(
            ({ row, column }) =>
              sampleGrid20x20.grid[row]?.[column] !== undefined &&
              sampleGrid20x20.grid[row][column] !== 'X',
          ),
      });

      expect(result).toStrictEqual(sampleGrid20x20.solution);
    });

    test('50x50 grid with non-visitable nodes', () => {
      const sampleGrid50x50 = grid50x50 as GridSample;
      const goalCoord = sampleGrid50x50.positions.goal;

      const result = AStar({
        startCoord: sampleGrid50x50.positions.start,
        hasReachGoal: (coord) =>
          coord.row === goalCoord.row && coord.column === goalCoord.column,
        heuristic: (coord) =>
          Math.abs(coord.row - goalCoord.row) +
          Math.abs(coord.column - goalCoord.column),
        getIdentifier,
        getNeighbours: (coord: { row: number; column: number }) =>
          [
            { row: coord.row - 1, column: coord.column },
            { row: coord.row, column: coord.column + 1 },
            { row: coord.row + 1, column: coord.column },
            { row: coord.row, column: coord.column - 1 },
          ].filter(
            ({ row, column }) =>
              sampleGrid50x50.grid[row]?.[column] !== undefined &&
              sampleGrid50x50.grid[row][column] !== 'X',
          ),
      });

      expect(result).toStrictEqual(sampleGrid50x50.solution);
    });

    test('50x50-alt grid with non-visitable nodes', () => {
      const sampleGrid50x50Alt = grid50x50Alt as GridSample;
      const goalCoord = sampleGrid50x50Alt.positions.goal;

      const result = AStar({
        startCoord: sampleGrid50x50Alt.positions.start,
        hasReachGoal: (coord) =>
          coord.row === goalCoord.row && coord.column === goalCoord.column,
        heuristic: (coord) =>
          Math.abs(coord.row - goalCoord.row) +
          Math.abs(coord.column - goalCoord.column),
        getIdentifier,
        getNeighbours: (coord: { row: number; column: number }) =>
          [
            { row: coord.row - 1, column: coord.column },
            { row: coord.row, column: coord.column + 1 },
            { row: coord.row + 1, column: coord.column },
            { row: coord.row, column: coord.column - 1 },
          ].filter(
            ({ row, column }) =>
              sampleGrid50x50Alt.grid[row]?.[column] !== undefined &&
              sampleGrid50x50Alt.grid[row][column] !== 'X',
          ),
      });

      expect(result).toStrictEqual(sampleGrid50x50Alt.solution);
    });
  });
});
