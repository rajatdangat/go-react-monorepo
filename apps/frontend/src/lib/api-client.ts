import { env } from '@/config/env';
import Axios from 'axios';
import { pipe, toPairs, map, fromPairs } from 'ramda';
import { camelCase } from 'change-case';

const mapKeysDeep = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => mapKeysDeep(item));
  } else if (obj && typeof obj === 'object') {
    return pipe(
      (obj) => toPairs(obj as Record<string, any>),
      map(([key, value]: [string, any]): [string, any] => [
        camelCase(String(key)),
        mapKeysDeep(value),
      ]),
      (pairs: [string, any][]) => fromPairs(pairs)
    )(obj);
  }
  return obj;
};

export const api = Axios.create({
  baseURL: env.API_BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = mapKeysDeep(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
