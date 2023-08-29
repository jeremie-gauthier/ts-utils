import { snakeCase } from './snake-case';

describe('string: snakeCase', () => {
  it('should returns the snakeCase version of the given string', () => {
    const expected = 'foo_bar';

    expect(snakeCase('Foo Bar')).toBe(expected);
    expect(snakeCase('Foo          Bar')).toBe(expected);
    expect(snakeCase('FooBar')).toBe(expected);
    expect(snakeCase('fooBar')).toBe(expected);
    expect(snakeCase('foo.bar')).toBe(expected);
    expect(snakeCase('--FOO-BAR--')).toBe(expected);
    expect(snakeCase('fooBAR')).toBe(expected);
    expect(snakeCase('--.foo_bar--.')).toBe(expected);
    expect(snakeCase('fooBAr')).toBe('foo_b_ar');
    expect(snakeCase('Foo123Bar')).toBe('foo_123_bar');
    expect(snakeCase('foO123BAR')).toBe('fo_o_123_bar');
    expect(snakeCase('foO123BAr')).toBe('fo_o_123_b_ar');
  });

  it('should not mutate the given string', () => {
    const string = 'Foo Bar';
    snakeCase(string);

    expect(string).toBe('Foo Bar');
  });
});
