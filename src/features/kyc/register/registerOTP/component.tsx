import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { type IFormValueRegisterOTP, type IRegisterOTPProps, type IResponseRegisterOTP, VIEW_REGISTER } from '../type';
import View from './view';

const RegisterOTPComponent: FC<IRegisterOTPProps> = ({ api, handleGetResponseSuccess }) => {
  const navigate = useNavigate();
  const funcRequest = {
    handleRequestSuccess: (data: IResponseRegisterOTP) => {
      try {
        handleGetResponseSuccess({ data, view: VIEW_REGISTER.REGISTER_OTP });
        LoggerService.debug('RegisterComponent execute handleRequestSuccess receive data', data);
      } catch (error: any) {
        LoggerService.error('RegisterComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestAccountExisted: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.existed'} />);
      } catch (error: any) {
        LoggerService.error('RegisterComponent execute handleRequestError receive error', error);
      }
    },
    handleRequestOTPLimited: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPLimited'} />);
      } catch (error: any) {
        LoggerService.error('RegisterComponent execute handleRequestError receive error', error);
      }
    },
  };

  const { mutate, isLoading } = useRequest(api, funcRequest);

  const handleSubmit = (dataItem: Record<string, IFormValueRegisterOTP>) => {
    mutate({ phone: dataItem.phone });
  };
  const handleNavigate = (url: string) => {
    navigate(url);
  };
  return (
    <View
      handleSubmit={handleSubmit}
      loading={isLoading}
      handleNavigate={handleNavigate}
    />
  );
};

export default RegisterOTPComponent;
