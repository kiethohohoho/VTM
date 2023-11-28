import axios, { type AxiosRequestConfig, toFormData } from 'axios';

import Config from '@/Config';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';

import { type IApiRequest } from './api.interface';
const configGet = new Config().getState();
const axiosInstance = axios.create({
  timeout: 10_000,
});

let errorMessage = 'System exception!';

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    void Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    return config?.data;
  },
  error => {
    // if needs to navigate to login page when request exception
    if (error?.message?.includes('Network Error')) {
      errorMessage = 'Network error, please check your network!';
    } else {
      errorMessage = error?.message;
    }

    error.message && toastDefault(ENUMS_TOAST.ERROR, errorMessage);

    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  },
);

export interface Response<T = any> {
  code: string;
  data: T;
  message: string;
}

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = async <T>({ method, url, payload, params, headers, host }: IApiRequest): MyResponse<T> => {
  const options: AxiosRequestConfig = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Cache-control': 'max-age=0, no-cache, no-store, must-revalidate',
      ...headers,
    },
    baseURL: host || configGet.api.host,
    url,
    data: payload,
    params,
  };

  return await axiosInstance.request(options);
};

export const postForm = async <T>({ method, url, payload, params, headers, host }: IApiRequest): MyResponse<T> => {
  const options: AxiosRequestConfig = {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    baseURL: host || configGet.api.host,
    url,
    data: payload,
    params,
  };

  return await axiosInstance.postForm(url, payload, options);
};

export const putForm = async <T>({ method, url, payload, params, headers, host }: IApiRequest): MyResponse<T> => {
  const options: AxiosRequestConfig = {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    baseURL: host || configGet.api.host,
    url,
    data: payload,
    params,
  };

  return await axiosInstance.putForm(url, payload, options);
};

export const requestForm = async <T>({ method, url, payload, params, headers, host }: IApiRequest): MyResponse<T> => {
  const options: AxiosRequestConfig = {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    baseURL: host || configGet.api.host,
    url,
    data: toFormData(payload),
    params,
  };

  return await axiosInstance.request(options);
};
