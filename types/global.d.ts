type Expect<T extends true> = T;
type ExpectTrue<T extends true> = T;
type ExpectFalse<T extends false> = T;

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;
type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;
