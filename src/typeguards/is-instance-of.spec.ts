import { isInstanceOf } from './is-instance-of';

describe('any: isInstanceOf', () => {
  class Person {
    constructor(public readonly name: string) {}
  }

  class Animal {
    constructor(public readonly species: string) {}
  }

  it('should returns false if object IS NOT instance of class', () => {
    const john = new Person('john');
    const dog = new Animal('dog');
    expect(isInstanceOf(john, Animal)).toBe(false);
    expect(isInstanceOf(dog, Person)).toBe(false);
  });

  it('should returns true if object IS instance of class', () => {
    const john = new Person('john');
    const dog = new Animal('dog');
    expect(isInstanceOf(john, Person)).toBe(true);
    expect(isInstanceOf(dog, Animal)).toBe(true);
  });
});
