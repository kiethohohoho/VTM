import { type FC, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGet, useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import {
  type IFormValueRegisterOTPStaff,
  type IRegisterOTPPropsStaff,
  type IResponseRegisterOTPStaff,
  VIEW_REGISTER_STAFF,
} from '../register.interface';
import View from './view';

const RegisterOTPStaffComponent: FC<IRegisterOTPPropsStaff> = ({ api, handleGetResponseSuccess, apiCheckToken }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);

  const funcRequest = {
    handleRequestSuccess: (data: IResponseRegisterOTPStaff) => {
      try {
        handleGetResponseSuccess({ data, view: VIEW_REGISTER_STAFF.REGISTER_OTP });
        setLoading(false);
        LoggerService.debug('RegisterComponent execute handleRequestSuccess receive data', data);
      } catch (error: any) {
        LoggerService.error('RegisterComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestTokenRegisterExpired: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'staff.tokenRegisterExpired'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('RegisterComponent execute handleRequestError receive error', error);
      }
    },
    handleRequestAccountExisted: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.existed'} />);
      } catch (error: any) {
        LoggerService.error('RegisterComponent execute handleRequestError receive error', error);
      }
    },
  };
  const funcRequestCheckToken = {
    handleRequestSuccess: (data: IResponseRegisterOTPStaff) => {
      try {
        mutate({ token: searchParams.get('token') });
        LoggerService.debug('RegisterComponent execute handleRequestSuccess receive data', data);
      } catch (error: any) {
        LoggerService.error('RegisterComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestTokenRegisterExpired: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'staff.tokenRegisterExpired'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('RegisterComponent execute handleRequestError receive error', error);
      }
    },
    handleRequestTokenUsed: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'staff.tokenUsed'} />);
      } catch (error: any) {
        LoggerService.error('RegisterComponent execute handleRequestError receive error', error);
      }
    },
  };
  const { mutate } = useRequest(api, funcRequest);
  useGet(
    {
      ...apiCheckToken,
      params: {
        token: searchParams.get('token'),
      },
    },
    funcRequestCheckToken,
  );

  const handleSubmit = (dataItem: Record<string, IFormValueRegisterOTPStaff>) => {
    mutate({ token: dataItem.phone });
  };
  const handleNavigate = (url: string) => {
    navigate(url);
  };
  return (
    <View
      handleSubmit={handleSubmit}
      loading={loading}
      handleNavigate={handleNavigate}
    />
  );
};

export default RegisterOTPStaffComponent;
