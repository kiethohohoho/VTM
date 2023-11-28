import { type Method } from 'axios';

export interface IApiRequest {
  method: Lowercase<Method>;
  url: string;
  payload?: any;
  params?: any;
  token?: boolean;
  host?: string;
  headers?: object;
  auth?: object;
}
export interface RequestInterface {
  data: object;
}

export interface DataResponse {
  code: string;
  data: object;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type State = Record<string, Function>;
