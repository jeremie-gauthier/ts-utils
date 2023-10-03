type Space = ' ' | '\t' | '\n' | '\r' | '\v' | '\f';

/**
	Takes an exact string type and returns a new string with the whitespace from both ends removed.
	@template Input The exact string type.
	@template TrimmedChars A union of string chars to trim.
	@example
  type trimmed = Trim<'  Hello World  '>
	// => type trimmed = 'Hello World'
 */
export type Trim<
  Input extends string,
  TrimmedChars extends string = Space,
> = Input extends
  | `${TrimmedChars}${infer InputSubstring}`
  | `${infer InputSubstring}${TrimmedChars}`
  ? Trim<InputSubstring, TrimmedChars>
  : Input;

type _tests = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
];
