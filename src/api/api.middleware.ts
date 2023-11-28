import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContextModal } from '@/context/dialog';
import { TYPE_DIALOG, TYPE_MODAL } from '@/context/dialog/dialog.interface';
import AuthService, { type IAuth } from '@/utils/Auth';
import { EnumPath } from '@/utils/Enums';

import { type DataResponse, type IApiRequest, type State } from './api.interface';
import { request } from './request';
import ResponseCode from './responseCode';
const requestApi = async ({ method, url, payload, params, headers }: IApiRequest) =>
  await request<DataResponse>({ method, url, payload, params, headers });

/**
 *
 * @param method
 * @param url string
 * @param payload any
 * @param params object
 * @param headers object
 * @param funcRequest
 * @returns  data, refetch, isSuccess,isLoading
 */
export const useGet = (
  { method, url, payload, params, headers }: IApiRequest,
  funcRequest: State,
  key: string[] = [],
  enabled: boolean = true,
) => {
  let queryKey;
  if (key.length > 0) {
    queryKey = [key];
  } else if (params) {
    queryKey = [method, url, params];
  } else {
    queryKey = [method, url];
  }
  const { onSetView } = useContext(ContextModal);
  const navigate = useNavigate();

  const rs = useQuery({
    queryKey,
    queryFn: async () => {
      return await requestApi({ method, url, payload, params, headers });
    },
    onSuccess: data => {
      if (data.code === ResponseCode.REQUEST.ERROR_4002) {
        onSetView({
          typeDialog: TYPE_DIALOG.EXPIRED_TOKEN,
          typeModel: TYPE_MODAL.CUSTOM,
          titleDialog: 'Expired Token',
          onSubmit: () => {
            AuthService.handleLogout();
            navigate(EnumPath.LOGIN);
          },
        });
      } else {
        ResponseCode.find(data, funcRequest);
      }
    },
    enabled: !!enabled,
    refetchOnWindowFocus: false,
  });
  return rs;
};

/**
 *
 * @param method
 * @param url
 * @param headers
 * @returns data, refetch, isSuccess, isFetching
 */
export const useRequest = ({ method, url, headers }: IApiRequest, funcRequest: State, key?: string) => {
  const { onSetView } = useContext(ContextModal);
  const navigate = useNavigate();

  return useMutation(
    async (data: any) =>
      await requestApi({ method, url, payload: data, params: method === 'get' ? data : null, headers }),
    {
      onSuccess: data => {
        if (data.code === ResponseCode.REQUEST.ERROR_4002) {
          onSetView({
            typeDialog: TYPE_DIALOG.EXPIRED_TOKEN,
            typeModel: TYPE_MODAL.CONFIRM,
            titleDialog: 'Expired Token',
            onSubmit: () => {
              AuthService.handleLogout();
              navigate(EnumPath.LOGIN);
            },
          });
        } else {
          ResponseCode.find(data, funcRequest);
        }
      },
    },
  );
};
const requestApiLogin = async ({ method, url, payload, params, headers }: IApiRequest) =>
  await request<IAuth>({ method, url, payload, params, headers });
const requestApiRegister = async ({ method, url, payload, params, headers }: IApiRequest) =>
  await request<IAuth>({ method, url, payload, params, headers });
/**
 * api
 * @param method
 * @param url
 * @param headers
 * @returns data, refetch, isSuccess, isFetching
 */
export const useLogin = ({ method, url, headers }: IApiRequest, funcRequest: State) => {
  return useMutation(async (data: any) => await requestApiLogin({ method, url, payload: data, headers }), {
    onSuccess: data => {
      ResponseCode.find(data, funcRequest);
    },
  });
};

export const useRegister = ({ method, url, headers }: IApiRequest, funcRequest: State) => {
  return useMutation(async (data: any) => await requestApiRegister({ method, url, payload: data, headers }), {
    onSuccess: data => {
      ResponseCode.find(data, funcRequest);
    },
  });
};
export const useLogout = ({ method, url, headers }: IApiRequest, funcRequest: State) => {
  return useMutation(async (data: any) => await requestApi({ method, url, payload: data, headers }), {
    onSuccess: data => {
      ResponseCode.find(data, funcRequest);
    },
  });
};
