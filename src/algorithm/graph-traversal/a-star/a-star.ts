import { BinaryHeap } from '../../../data-structure';
import type { Coord } from './interfaces/coord.interface';
import { Node } from './node';

function reconstructPath<TData>(arrivalNode: Node<TData>) {
  const path: Array<Coord> = [];

  let current: Node<TData> | undefined = arrivalNode;
  while (current) {
    path.push(current.coord);
    current = current.parent;
  }
  path.reverse();
  return path;
}

type GoalPredicate<TData> = (node: TData, coord: Coord) => boolean;
type Heuristic<TData> = (node: TData, coord: Coord) => number;
type Options<TData> = {
  canVisitNode?: (node: TData) => boolean;
};

export function AStar<TData>(
  grid: Array<Array<TData>>,
  startCoord: Coord,
  hasReachGoal: GoalPredicate<TData>,
  heuristic: Heuristic<TData>,
  options?: Options<TData>,
) {
  const openSet = new BinaryHeap<Node<TData>>(
    (a, b) => a.heuristic - b.heuristic,
  );
  const startNode = new Node(startCoord, grid, 0, 0);
  openSet.insert(startNode);

  const closedSet = new Set<Node['id']>([startNode.id]);

  let current = openSet.extract();
  while (current) {
    if (hasReachGoal(current.data, current.coord)) {
      const path = reconstructPath(current);
      // debugTraversal(grid, closedSet, openSet, current.coord, path);
      return path;
    }

    const neighbourNodes = current.getNeighbourNodes();
    for (const neighbourNode of neighbourNodes) {
      // neighbour node has already been visited
      if (closedSet.has(neighbourNode.id)) continue;

      if (options?.canVisitNode && !options.canVisitNode(neighbourNode.data)) {
        continue;
      }

      neighbourNode.heuristic =
        neighbourNode.cost + heuristic(neighbourNode.data, neighbourNode.coord);

      const neighbourNodeInOpenSet = openSet.search(neighbourNode.id);
      // neighbour node is not planed to be visited yet
      if (!neighbourNodeInOpenSet) {
        openSet.insert(neighbourNode);
      }
      // neighbour node is planed to be visited via a worse path
      else if (neighbourNodeInOpenSet.heuristic > neighbourNode.heuristic) {
        // we record this better path we just found
        openSet.decreaseElement(neighbourNode);
      }
    }

    closedSet.add(current.id);
    current = openSet.extract();
  }
}
