import type { BinaryHeap } from '../../../../data-structure';
import type { Coord } from '../interfaces/coord.interface';
import { Node } from '../node';

export function printGrid<TData>(
  grid: Array<Array<TData>>,
  closedSet: Set<Node['id']>,
  openSet: BinaryHeap<Node<TData>>,
  currentCoord: Coord,
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

          if (
            closedSet.has(
              new Node({ column: colIdx, row: rowIdx }, grid, -1, -1).id,
            )
          ) {
            return `\x1b[32m${node}\x1b[39m`;
          }

          if (
            openSet.search(
              new Node({ column: colIdx, row: rowIdx }, grid, -1, -1).id,
            )
          ) {
            return `\x1b[31m${node}\x1b[39m`;
          }

          return node;
        })
        .join(' '),
    )
    .join('\n');

  console.log(gridStringified, '\n');
}
