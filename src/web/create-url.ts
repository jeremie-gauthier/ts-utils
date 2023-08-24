import { entries } from '../object/entries';

type URLParametersKey = string | number;
type URLParametersValue = string | number;

export const createURL = (
  baseURL: string,
  parameters: Readonly<Record<URLParametersKey, URLParametersValue>>,
) => {
  const url = new URL(baseURL);
  for (const [name, value] of entries(parameters)) {
    url.searchParams.append(name.toString(), value.toString());
  }
  return url.href;
};
