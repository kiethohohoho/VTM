import { type FC } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import AuthService, { type IAuth } from '@/utils/Auth';
import { LoggerService } from '@/utils/Logger';

import { VIEW_LOGIN } from '../login.interface';
import View from './view';

export interface ISendOTPLoginComponent {
  apiOtp: IApiRequest;
  phoneNumber: string;
  otpKey: string;
  handleBack: (step: VIEW_LOGIN) => void;
  handleChangeView: (step: VIEW_LOGIN) => void;
  handleSetSelectRoleToken: (token: string) => void;
}
const SendOTPLoginComponent: FC<ISendOTPLoginComponent> = ({
  apiOtp,
  otpKey,
  phoneNumber,
  handleBack,
  handleChangeView,
  handleSetSelectRoleToken,
}) => {
  const funcRequestSendOTPLogin = {
    handleRequestSuccess: (data: IAuth) => {
      try {
        handleSetSelectRoleToken(data.token);
        AuthService.setPackageProfile(data.profileDetails, data.expireAt);
        handleChangeView(VIEW_LOGIN.SELECT_ROLE);
      } catch (error: any) {
        LoggerService.error(
          'SendOTPLoginComponent execute handleRequestSuccess in funcRequestSendOTPLogin receive error',
          error,
        );
      }
    },
    handleRequestOTPLimited: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPLimited'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPLoginComponent execute handleRequestOTPLimited receive error', error);
      }
    },
    handleRequestOTPExpired: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPExpired'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPLoginComponent execute handleRequestOTPExpired receive error', error);
      }
    },
    handleRequestOTPNotMatch: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPNotMatch'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPLoginComponent execute handleRequestOTPNotMatch receive error', error);
      }
    },
    handleRequestOTPWrongManyTime: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.OTPWrongManyTime'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPLoginComponent execute handleRequestOTPWrongManyTime receive error', error);
      }
    },
  };
  const { mutate, isLoading } = useRequest(apiOtp, funcRequestSendOTPLogin);

  const handleSubmit = (dataItem: string) => {
    try {
      const payload = {
        code: dataItem,
        otpKey,
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('SendOTPLoginComponent execute handleSubmit receive error', error);
    }
  };

  return (
    <View
      handleSubmit={handleSubmit}
      loading={isLoading}
      handleBack={handleBack}
      phoneNumber={phoneNumber}
    />
  );
};

export { SendOTPLoginComponent };
