import { type FC, useState } from 'react';

import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { type IResponseRegisterOTP, type ISendOTPRegisterProps, VIEW_REGISTER } from '../type';
import View from './view';

const SendOTPRegisterComponent: FC<ISendOTPRegisterProps> = ({
  apiOtp,
  apiResendOtp,
  handleGetResponseSuccess,
  responseSuccess,
  handleBack,
}) => {
  const [resend, setResend] = useState<IResponseRegisterOTP>();
  const funcRequestOTPRegister = {
    handleRequestSuccess: (data: IResponseRegisterOTP) => {
      try {
        handleGetResponseSuccess({ data, view: VIEW_REGISTER.SEND_OTP });
        LoggerService.debug('SendOTPRegisterComponent execute handleRequestSuccess receive data', data);
      } catch (error: any) {
        LoggerService.error('SendOTPRegisterComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestOTPLimited: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPLimited'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPRegisterComponent execute handleRequestOTPLimited receive error', error);
      }
    },
    handleRequestOTPExpired: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPExpired'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPRegisterComponent execute handleRequestOTPExpired receive error', error);
      }
    },
    handleRequestOTPNotMatch: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPNotMatch'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPRegisterComponent execute handleRequestOTPNotMatch receive error', error);
      }
    },
    handleRequestOTPWrongManyTime: () => {
      try {
        LoggerService.info('SendOTPRegisterComponent execute handleRequestOTPWrongManyTime in funcRequestOTPRegister');

        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.OTPWrongManyTime'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPRegisterComponent execute handleRequestOTPWrongManyTime receive error', error);
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
  const funcRequestResendRegister = {
    handleRequestSuccess: (data: IResponseRegisterOTP) => {
      try {
        setResend(data);
        LoggerService.debug('SendOTPRegisterComponent execute handleRequestSuccess receive data', data);
      } catch (error: any) {
        LoggerService.error('SendOTPRegisterComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestOTPLimited: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPLimited'} />);
      } catch (error: any) {
        LoggerService.error('SendOTPRegisterComponent execute handleRequestOTPLimited receive error', error);
      }
    },
  };

  const { mutate, isLoading } = useRequest(apiOtp, funcRequestOTPRegister);
  const { mutate: mutateResend } = useRequest(apiResendOtp, funcRequestResendRegister);

  const handleSubmitSendOTPRegister = (dataItem: string) => {
    try {
      const payload = {
        code: dataItem,
        otpKey: resend ? resend.otpKey : responseSuccess.responseSuccessRegisterOTP.otpKey,
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('SendOTPRegisterComponent execute handleSubmit receive error', error);
    }
  };
  const handleResendSendOTPRegister = () => {
    try {
      const payload = {
        otpKey: responseSuccess.responseSuccessRegisterOTP.otpKey,
      };
      mutateResend(payload);
    } catch (error: any) {
      LoggerService.error('SendOTPRegisterComponent execute handleSubmit receive error', error);
    }
  };
  return (
    <View
      phoneNumber={responseSuccess?.responseSuccessRegisterOTP?.contact}
      handleResendSendOTPRegister={handleResendSendOTPRegister}
      handleSubmitSendOTPRegister={handleSubmitSendOTPRegister}
      loading={isLoading}
      handleBack={handleBack}
    />
  );
};

export default SendOTPRegisterComponent;
