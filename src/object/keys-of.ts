import type { RecordKey } from '../types/object.type';

/**
 * Returns the names of the enumerable string properties and methods of an object.
 * (Note: This is just a typed wrapper around the native Object.keys method)
 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @template K Type of the keys that composed the `object`.
 * @template V Type of the values that composed the `object`.
 * @returns An array of keys.
 */
export const keysOf = <K extends RecordKey, V>(
  object: Readonly<Record<K, V>>,
): (keyof typeof object)[] => Object.keys(object) as (keyof typeof object)[];
