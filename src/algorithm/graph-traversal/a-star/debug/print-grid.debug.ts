import type { BinaryHeap } from '../../../../data-structure';
import type { Coord } from '../interfaces/coord.interface';

type Node = {
  id: string | number;
};

export function printGrid<TData>(
  grid: Array<Array<TData>>,
  closedSet: Set<string | number>,
  openSet: BinaryHeap<Node>,
  currentCoord: Coord,
  getIdentifier: (coord: Coord) => string | number,
  path?: Array<Coord>,
) {
  const gridStringified = grid
    .map((row, rowIdx) =>
      row
        .map((node, colIdx) => {
          if (
            path?.find(
              (coord) => coord.column === colIdx && coord.row === rowIdx,
            )
          ) {
            return `\x1b[95m${node}\x1b[39m`;
          }

          if (rowIdx === currentCoord.row && colIdx === currentCoord.column) {
            return `\x1b[33m${node}\x1b[39m`;
          }

          if (closedSet.has(getIdentifier({ column: colIdx, row: rowIdx }))) {
            return `\x1b[32m${node}\x1b[39m`;
          }

          if (openSet.search(getIdentifier({ column: colIdx, row: rowIdx }))) {
            return `\x1b[31m${node}\x1b[39m`;
          }

          return node;
        })
        .join(' '),
    )
    .join('\n');

  console.log(gridStringified, '\n');
}
