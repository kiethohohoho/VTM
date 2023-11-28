import { type FC, useState } from 'react';

import { useLogin } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import DeviceService from '@/utils/Device';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { apiLogin } from '.';
import { type IResponseLogin, type LoginParams, VIEW_LOGIN } from './login.interface';
import { type IStore } from './selectStore/view';
import View from './view';
const LoginComponent: FC = () => {
  const [view, setView] = useState<VIEW_LOGIN>(VIEW_LOGIN.LOGIN);
  const [otpKey, setOtpKey] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectRoleToken, setSelectRoleToken] = useState<string>();
  const [selectStoreToken, setSelectStoreToken] = useState<string>();
  const [listStore, setListStore] = useState<IStore[]>([]);
  const funcRequest = {
    handleRequestSuccess: (data: IResponseLogin) => {
      try {
        LoggerService.debug('LoginComponent execute handleRequestSuccess receive data', data);
        setView(VIEW_LOGIN.SEND_OTP);
        setOtpKey(data.otpKey);
        setPhoneNumber(data.contact);
      } catch (error: any) {
        LoggerService.error('LoginComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestWrongUserOrPassword: () => {
      try {
        LoggerService.info('LoginComponent execute handleRequestWrongUserOrPassword in funcRequest');

        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.loginWrong'} />);
      } catch (error: any) {
        LoggerService.error('LoginComponent execute handleRequestError receive error', error);
      }
    },
    handleRequestAccountLocked: () => {
      try {
        LoggerService.info('LoginComponent execute handleRequestAccountLocked in funcRequest');

        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.loginLocked'} />);
      } catch (error: any) {
        LoggerService.error('LoginComponent execute handleRequestError receive error', error);
      }
    },
    handleRequestOTPLimited: () => {
      try {
        LoggerService.info('LoginComponent execute handleRequestOTPLimited in funcRequest');

        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPLimited'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPComponent execute handleRequestOTPLimited receive error', error);
      }
    },
    handleRequestOTPFailed: () => {
      try {
        LoggerService.info('LoginComponent execute handleRequestOTPFailed in funcRequest');

        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPLimited'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPComponent execute handleRequestOTPLimited receive error', error);
      }
    },
  };

  const { mutate, isLoading } = useLogin(apiLogin, funcRequest);

  const handleSubmit = (dataItem: Record<string, string>) => {
    Helper.hashPassword(dataItem.password).then(password => {
      const payload: LoginParams = {
        username: dataItem.username,
        password,
        device: DeviceService.getDevice(),
      };
      mutate(payload);
    });
  };
  const handleBack = (step: VIEW_LOGIN) => {
    try {
      setView(step);
    } catch (error: any) {
      LoggerService.error('LoginComponent execute handleBack receive error', error);
    }
  };

  const handleChangeView = (step: VIEW_LOGIN) => {
    try {
      setView(step);
    } catch (error: any) {
      LoggerService.error('LoginComponent execute handleChangeView receive error', error);
    }
  };
  const handleSetSelectRoleToken = (token: string) => {
    try {
      setSelectRoleToken(token);
    } catch (error: any) {
      LoggerService.error('LoginComponent execute handleSetSelectRoleResponse receive error', error);
    }
  };
  const handleSetSelectStoreToken = (token: string) => {
    try {
      setSelectStoreToken(token);
    } catch (error: any) {
      LoggerService.error('LoginComponent execute handleSetSelectStoreToken receive error', error);
    }
  };

  const handleSetListStore = (listStore: IStore[]) => {
    try {
      setListStore(listStore);
    } catch (error: any) {
      LoggerService.error('LoginComponent execute handleSetSelectStoreToken receive error', error);
    }
  };

  return (
    <View
      view={view}
      isLoading={isLoading}
      otpKey={otpKey}
      phoneNumber={phoneNumber}
      selectRoleToken={selectRoleToken}
      selectStoreToken={selectStoreToken}
      listStore={listStore}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      handleChangeView={handleChangeView}
      handleSetSelectRoleToken={handleSetSelectRoleToken}
      handleSetSelectStoreToken={handleSetSelectStoreToken}
      handleSetListStore={handleSetListStore}
    />
  );
};

export default LoginComponent;
