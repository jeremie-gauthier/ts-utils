/**
 * Returns an array of key/value pairs from an object.
 * (Note: This is just a typed wrapper around the native Object.entries method)
 * @param source Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @template Key Type of the keys that composed the `source`.
 * @template Value Type of the values that composed the `source`.
 * @returns An array of (key, value) tuples.
 */
export const entries = <Key extends keyof any, Value>(
  source: Readonly<Record<Key, Value>>,
): [Key, Value][] => Object.entries(source) as [Key, Value][];
