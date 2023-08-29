import { snakeCase } from './snake-case';

const fixtures = [
  // Examples with different capitalization changes
  { input: 'TypeScript', expected: 'type_script' },
  { input: 'javaScript', expected: 'java_script' },
  { input: 'snake_Case', expected: 'snake_case' },

  // Examples with numbers
  { input: 'foo123Bar', expected: 'foo_123_bar' },
  { input: 'abc456', expected: 'abc_456' },
  { input: '654cba', expected: '654_cba' },

  // Examples with non-word characters
  { input: 'my.variable', expected: 'my_variable' },
  { input: '!@#special#$%', expected: 'special' },

  // Mixed examples
  { input: 'Hello_World123', expected: 'hello_world_123' },
  { input: 'user-ID', expected: 'user_id' },

  // Edge cases
  { input: '', expected: '' }, // Empty string
  { input: ' ', expected: '' }, // Space character
  { input: '  multiple   spaces ', expected: 'multiple_spaces' }, // Multiple spaces
  { input: '_leadingUnderscore', expected: 'leading_underscore' }, // Leading underscore
  { input: 'trailingUnderscore_', expected: 'trailing_underscore' }, // Trailing underscore
];

describe('string: snakeCase', () => {
  it('should returns the snakeCase version of the given string', () => {
    for (const { input, expected } of fixtures) {
      const result = snakeCase(input);
      expect(result).toBe(expected);
    }
  });

  it('should not mutate the given string', () => {
    const string = 'Foo Bar';
    snakeCase(string);

    expect(string).toBe('Foo Bar');
  });
});
