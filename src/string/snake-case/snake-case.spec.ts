import { describe, expect, it } from 'vitest';
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

  // Acronyms
  { input: 'XMLHttpRequest', expected: 'xml_http_request' },
  { input: 'CSRF_TOKEN', expected: 'csrf_token' },
  { input: 'AESEncryption', expected: 'aes_encryption' },

  // Version numbers and special chars
  { input: 'version2.0.1', expected: 'version_2_0_1' },
  { input: 'node@16.x', expected: 'node_16_x' },
  { input: 'package@^1.0.0', expected: 'package_1_0_0' },

  // Accented characters
  { input: 'étatInitial', expected: 'etat_initial' },
  { input: 'première_Classe', expected: 'premiere_classe' },

  // Complete sentences
  {
    input: 'This is a complete sentence',
    expected: 'this_is_a_complete_sentence',
  },
  {
    input: 'Convert-this-to-snake-case',
    expected: 'convert_this_to_snake_case',
  },

  // Multiple consecutive special chars
  { input: 'multiple___underscores', expected: 'multiple_underscores' },
  { input: 'dots...between', expected: 'dots_between' },
  { input: '___leading___trail___', expected: 'leading_trail' },
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
