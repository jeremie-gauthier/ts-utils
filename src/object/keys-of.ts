/**
 * Returns the names of the enumerable string properties and methods of an object.
 * (Note: This is just a typed wrapper around the native Object.keys method)
 * @param source Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @template K Type of the keys that composed the `source`.
 * @template V Type of the values that composed the `source`.
 * @returns An array of keys.
 */
export const keysOf = <Key extends keyof any>(
  source: Readonly<Record<Key, unknown>>,
): Key[] => Object.keys(source) as Key[];
