import { entries } from '../object/entries';
import type { RecordKey } from '../types/object.type';

export type URLParameters = Record<RecordKey, string | number>;

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
