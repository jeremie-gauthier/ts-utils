/**
 * Returns an object created by key-value entries for properties and methods.
 * (Note: This is just a typed wrapper around the native Object.fromEntries method)
 * @param entries an iterable object that contains key-value entries for properties and methods.
 * @returns The object created from key-values entries.
 */
export const fromEntries = <K extends string | number | symbol, V>(
  entries: Readonly<[K, V]>[],
): Record<K, V> => Object.fromEntries(entries) as Record<K, V>;
