/**
 * Returns an object created from an array of key-value tuples.
 * (Note: This is just a typed wrapper around the native Object.fromEntries method)
 * @param entries an iterable object that contains key-value entries for properties and methods.
 * @template Key Type of the keys that composed the `source`.
 * @template Value Type of the values that composed the `source`.
 * @returns The object created from key-values entries.
 */
export const fromEntries = <Key extends keyof any, Value>(
  entries: Readonly<[Key, Value]>[],
): Record<Key, Value> => Object.fromEntries(entries) as Record<Key, Value>;
