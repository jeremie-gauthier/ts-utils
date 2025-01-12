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

Deno.bench('a-star', () => {
  AStar(
    grid,
    gridSample.positions.start,
    (_, coord) =>
      coord.row === goalCoord.row && coord.column === goalCoord.column,
    (_, coord) =>
      Math.abs(coord.row - goalCoord.row) +
      Math.abs(coord.column - goalCoord.column),
    {
      canVisitNode: (node) => node !== 'X',
    },
  );
});
