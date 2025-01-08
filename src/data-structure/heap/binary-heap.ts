/**
	The type of function used to make heap's nodes comparisons.
	@param a A node of the heap.
	@param b Another node of the heap.
	@template TData The heap's nodes type.
 */
type Comparator<TData> = (a: TData, b: TData) => number;
/**
	The type of function used to find nodes in the heap.
	@param element A node of the heap.
	@template TData The heap's nodes type.
 */
type Finder<TData> = (element: TData) => boolean;
/**
	The type of function used to update a node of the heap.
	@param element A node of the heap.
	@template TData The heap's nodes type.
 */
type Updator<TData> = (element: TData) => TData;

/**
 * A data-structure class to represent a binary heap.
 * @template TData The heap's nodes type.
 */
export class BinaryHeap<TData> {
  private readonly data: Array<TData> = [];
  private size = 0;

  /**
   * Construct a binary heap object.
   * @param comparator The function used to make heap's nodes comparisons.
   * @template TData The heap's nodes type.
   */
  constructor(private readonly comparator: Comparator<TData>) {}

  private swap(idxA: number, idxB: number) {
    const tmp = this.data[idxA];

    // @ts-expect-error under control idx
    this.data[idxA] = this.data[idxB];
    // @ts-expect-error under control idx
    this.data[idxB] = tmp;
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
      // biome-ignore lint/style/noNonNullAssertion: these idx are under control
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
      // biome-ignore lint/style/noNonNullAssertion: these idx are under control
      this.comparator(this.data[left]!, this.data[startingIdx]!) < 0
    ) {
      smallest = left;
    }

    if (
      left < this.size &&
      // biome-ignore lint/style/noNonNullAssertion: these idx are under control
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
    this.data.push(element);
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
      return this.data[0];
    }

    const root = this.data[0];
    this.size -= 1;
    // @ts-expect-error under control idx
    this.data[0] = this.data[this.size];
    // @ts-expect-error under control idx
    this.data[this.size] = undefined;

    this.heapifyDown(0);

    return root;
  }

  /**
   * Delete a node from the heap and sort the tree accordingly.
   * @param findPredicate The predicate to match with the element.
   */
  public delete(findPredicate: Finder<TData>) {
    const elementIdx = this.data.findIndex((element) => findPredicate(element));
    if (elementIdx < 0) {
      return;
    }

    // biome-ignore lint/style/noNonNullAssertion: this idx are under control
    const element = this.data[elementIdx]!;

    this.size -= 1;
    this.swap(elementIdx, this.size);
    // @ts-expect-error under control idx
    this.data[this.size] = undefined;

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
   * @param findPredicate The predicate to match with the element.
   * @returns The searched node or undefined if nothing match findPredicate.
   */
  public search(findPredicate: Finder<TData>) {
    return this.data.find((element) => findPredicate(element));
  }

  /**
   * Decrease the value of a node in the heap and sort the tree accordingly.
   * @param findPredicate The predicate to match with the element.
   * @param updator The function to update the element.
   */
  public decreaseElement(
    findPredicate: Finder<TData>,
    updator: Updator<TData>,
  ) {
    const elementIdx = this.data.findIndex((element) => findPredicate(element));
    if (elementIdx < 0) {
      return;
    }

    // biome-ignore lint/style/noNonNullAssertion: this idx is under control
    this.data[elementIdx] = updator(this.data[elementIdx]!);
    this.heapifyUp(elementIdx);
  }

  /**
   * Increase the value of a node in the heap and sort the tree accordingly.
   * @param findPredicate The predicate to match with the element.
   * @param updator The function to update the element.
   */
  public increaseElement(
    findPredicate: Finder<TData>,
    updator: Updator<TData>,
  ) {
    const elementIdx = this.data.findIndex((element) => findPredicate(element));
    if (elementIdx < 0) {
      return;
    }

    // biome-ignore lint/style/noNonNullAssertion: this idx is under control
    this.data[elementIdx] = updator(this.data[elementIdx]!);
    this.heapifyDown(elementIdx);
  }
}
