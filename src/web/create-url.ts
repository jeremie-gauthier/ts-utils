import { entries } from '../object/entries';

/**
 * URL parameters object type.
 */
export type URLParameters = Record<keyof any, string | number>;

/**
 * Create an URL (href) string from dynamic values.
 * @param baseURL The base URL that prefixed the parameters.
 * @param parameters The parameters of the URL.
 * @returns An href string resulting of the concatenation of the baseURL and its parameters.
 */
export const createURL = (
  baseURL: string,
  parameters: Readonly<URLParameters>,
) => {
  const url = new URL(baseURL);
  for (const [name, value] of entries(parameters)) {
    url.searchParams.append(name.toString(), value.toString());
  }
  return url.href;
};
