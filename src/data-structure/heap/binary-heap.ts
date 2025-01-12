/**
	The type of function used to make heap's nodes comparisons.
	@param a A node of the heap.
	@param b Another node of the heap.
	@template TData The heap's nodes type.
 */
type Comparator<TData> = (a: TData, b: TData) => number;

/**
 * A data-structure class to represent a binary heap.
 * @template TData The heap's nodes type.
 * @link https://en.wikipedia.org/wiki/Binary_heap
 */
export class BinaryHeap<TData extends { id: string | number }> {
  private readonly data: Array<TData> = [];
  private size = 0;
  private existingNodes = new Map<TData['id'], number>();

  /**
   * Construct a binary heap object.
   * @param comparator The function used to make heap's nodes comparisons.
   * @template TData The heap's nodes type.
   */
  constructor(private readonly comparator: Comparator<TData>) {}

  private swap(idxA: number, idxB: number) {
    // biome-ignore lint/style/noNonNullAssertion: under control idx
    const tmpA = this.data[idxA]!;
    // biome-ignore lint/style/noNonNullAssertion: under control idx
    const tmpB = this.data[idxB]!;

    // @ts-expect-error under control idx
    this.data[idxA] = this.data[idxB];
    this.data[idxB] = tmpA;

    this.existingNodes.set(tmpA.id, idxB);
    this.existingNodes.set(tmpB.id, idxA);
  }

  private getParentIdx(idx: number) {
    return Math.floor((idx - 1) / 2);
  }

  private getLeftChildIdx(idx: number) {
    return 2 * idx + 1;
  }

  private getRightChildIdx(idx: number) {
    return 2 * idx + 2;
  }

  private heapifyUp(startingIdx: number) {
    let parentIdx = this.getParentIdx(startingIdx);
    let currentIdx = startingIdx;

    while (
      currentIdx > 0 &&
      // biome-ignore lint/style/noNonNullAssertion: parent nodes are never supposed to be undefined
      this.comparator(this.data[currentIdx]!, this.data[parentIdx]!) < 0
    ) {
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = this.getParentIdx(currentIdx);
    }
  }

  private heapifyDown(startingIdx: number) {
    const left = this.getLeftChildIdx(startingIdx);
    const right = this.getRightChildIdx(startingIdx);
    let smallest = startingIdx;

    if (
      left < this.size &&
      // biome-ignore lint/style/noNonNullAssertion: already checked
      this.comparator(this.data[left]!, this.data[startingIdx]!) < 0
    ) {
      smallest = left;
    }

    if (
      right < this.size &&
      // biome-ignore lint/style/noNonNullAssertion: already checked
      this.comparator(this.data[right]!, this.data[smallest]!) < 0
    ) {
      smallest = right;
    }

    if (smallest !== startingIdx) {
      this.swap(startingIdx, smallest);
      this.heapifyDown(smallest);
    }
  }

  /**
   * Insert a node to the heap.
   * @param element The node to insert in the heap.
   */
  public insert(element: TData) {
    this.data[this.size] = element;
    this.existingNodes.set(element.id, this.size);
    this.size += 1;
    this.heapifyUp(this.size - 1);
  }

  /**
   * Pop the first node from the heap and sort the tree accordingly.
   * @returns A node or undefined if the heap is empty.
   */
  public extract() {
    if (this.size === 0) {
      return;
    }
    if (this.size === 1) {
      this.size -= 1;
      // biome-ignore lint/style/noNonNullAssertion: under control idx
      const data = this.data[this.size]!;
      // @ts-expect-error under control idx
      this.data[this.size] = undefined;
      this.existingNodes.delete(data.id);
      return data;
    }

    // biome-ignore lint/style/noNonNullAssertion: under control idx
    const root = this.data[0]!;
    this.size -= 1;
    // @ts-expect-error under control idx
    this.data[0] = this.data[this.size];
    // @ts-expect-error under control idx
    this.data[this.size] = undefined;

    this.existingNodes.delete(root.id);

    this.heapifyDown(0);

    return root;
  }

  /**
   * Delete a node from the heap and sort the tree accordingly.
   * @param id The id of the element to delete.
   */
  public delete(id: TData['id']) {
    const elementIdx = this.existingNodes.get(id);
    if (elementIdx === undefined) return;

    // biome-ignore lint/style/noNonNullAssertion: this idx is under control
    const element = this.data[elementIdx]!;

    this.size -= 1;
    this.swap(elementIdx, this.size);
    // @ts-expect-error under control idx
    this.data[this.size] = undefined;

    this.existingNodes.delete(element.id);

    // biome-ignore lint/style/noNonNullAssertion: this idx is under control
    const comparison = this.comparator(this.data[elementIdx]!, element);
    if (comparison < 0) {
      this.heapifyUp(elementIdx);
    } else if (comparison > 0) {
      this.heapifyDown(elementIdx);
    }
  }

  /**
   * Search a node from the heap.
   * @param id The id of the searched element.
   * @returns The searched node or undefined if nothing match findPredicate.
   */
  public search(id: TData['id']) {
    const elementIdx = this.existingNodes.get(id);
    if (elementIdx === undefined) return;
    return this.data[elementIdx];
  }

  /**
   * Decrease the value of a node in the heap and sort the tree accordingly.
   * @param data The data of the element to update.
   */
  public decreaseElement(data: TData) {
    const elementIdx = this.existingNodes.get(data.id);
    if (elementIdx === undefined) return;

    this.data[elementIdx] = data;
    this.heapifyUp(elementIdx);
  }

  /**
   * Increase the value of a node in the heap and sort the tree accordingly.
   * @param data The data of the element to update.
   */
  public increaseElement(data: TData) {
    const elementIdx = this.existingNodes.get(data.id);
    if (elementIdx === undefined) return;

    this.data[elementIdx] = data;
    this.heapifyDown(elementIdx);
  }
}
