import { bench } from 'vitest';
import { AStar } from '../a-star';
import grid1000x1000 from '../fixtures/1000x1000.json' with { type: 'json' };

type GridSample = {
  grid: Array<Array<string | number>>;
  solution: Array<{ row: number; column: number }>;
  positions: {
    start: { row: number; column: number };
    goal: { row: number; column: number };
  };
};
const gridSample = grid1000x1000 as GridSample;
const grid = gridSample.grid;
const goalCoord = gridSample.positions.goal;

bench('a-star', () => {
  AStar({
    startCoord: gridSample.positions.start,
    hasReachGoal: (coord) =>
      coord.row === goalCoord.row && coord.column === goalCoord.column,
    heuristic: (coord) =>
      Math.abs(coord.row - goalCoord.row) +
      Math.abs(coord.column - goalCoord.column),
    getIdentifier: (coord) => `${coord.row}:${coord.column}`,
    getNeighbours: (coord: { row: number; column: number }) =>
      [
        { row: coord.row - 1, column: coord.column },
        { row: coord.row, column: coord.column + 1 },
        { row: coord.row + 1, column: coord.column },
        { row: coord.row, column: coord.column - 1 },
      ].filter(
        ({ row, column }) =>
          grid[row]?.[column] !== undefined && grid[row][column] !== 'X',
      ),
  });
});
