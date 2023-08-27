/**
 * Returns an array of key/values of the enumerable properties of an object.
 * (Note: This is just a typed wrapper around the native Object.entries method)
 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @template K Type of the keys that composed the `object`.
 * @template V Type of the values that composed the `object`.
 * @returns An array of (key, value) tuples.
 */
export const entries = <K extends keyof any, V>(
  object: Readonly<Record<K, V>>,
): [K, V][] => Object.entries(object) as [K, V][];
