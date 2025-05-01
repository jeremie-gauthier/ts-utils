/**
 * Class constructor Type.
 * @param rest The arguments needed by the Class T for instantiation.
 * @template T The class instance returned by constructor.
 */

// biome-ignore lint/suspicious/noExplicitAny: reflecting the typing of a class
export type Class<T> = new (...rest: any[]) => T;

/**
 * TypeGuard wrapper for instanceof keyword.
 * @param instance The instance of the class to check.
 * @param entity The class to ensure the `instance` is from.
 * @template Entity The type of the `entity` class.
 * @example
 * class Person {
 * 	constructor(public name: string) {}
 * }
 *
 * const john = new Person("John");
 * isInstanceOf(john, Person);
 * // => true
 * // john is instanceof Person
 */
export const isInstanceOf = <Entity>(
  instance: unknown,
  entity: Class<Entity>,
): instance is Entity => instance instanceof entity;
