import { type FC, useState } from 'react';

import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { type IResponseRegisterOTPStaff, type ISendOTPPropsStaff, VIEW_REGISTER_STAFF } from '../register.interface';
import View from './view';

const SendOTPStaffComponent: FC<ISendOTPPropsStaff> = ({
  apiOtp,
  apiResendOtp,
  handleGetResponseSuccess,
  responseSuccess,
  handleBack,
}) => {
  const [resend, setResend] = useState<IResponseRegisterOTPStaff>();
  const funcRequestRegisterStaff = {
    handleRequestSuccess: (data: IResponseRegisterOTPStaff) => {
      try {
        handleGetResponseSuccess({ data, view: VIEW_REGISTER_STAFF.SEND_OTP });
        LoggerService.debug('SendOTPStaffComponent execute handleRequestSuccess in funcRequest receive data', data);
      } catch (error: any) {
        LoggerService.error('SendOTPStaffComponent execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestOTPLimited: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPLimited'} />);
      } catch (error: any) {
        LoggerService.error(
          'SendOTPStaffComponent execute handleRequestOTPLimited in funcRequest receive error',
          error,
        );
      }
    },
    handleRequestOTPExpired: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPExpired'} />);
      } catch (error: any) {
        LoggerService.error(
          'SendOTPStaffComponent execute handleRequestOTPExpired in funcRequest receive error',
          error,
        );
      }
    },
    handleRequestOTPNotMatch: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPNotMatch'} />);
      } catch (error: any) {
        LoggerService.error(
          'SendOTPStaffComponent execute handleRequestOTPNotMatch in funcRequest receive error',
          error,
        );
      }
    },
    handleRequestOTPWrongManyTime: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.OTPWrongManyTime'} />);
      } catch (error: any) {
        LoggerService.error(
          'SendOTPStaffComponent execute handleRequestOTPWrongManyTime in funcRequest receive error',
          error,
        );
      }
    },
  };
  const funcRequestResendRegisterStaff = {
    handleRequestSuccess: (data: IResponseRegisterOTPStaff) => {
      try {
        setResend(data);
      } catch (error: any) {
        LoggerService.error(
          'SendOTPStaffComponent execute handleRequestSuccess in funcRequestResend receive error',
          error,
        );
      }
    },
    handleRequestOTPLimited: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPLimited'} />);
      } catch (error: any) {
        LoggerService.error(
          'SendOTPStaffComponent execute handleRequestOTPLimited in funcRequestResend receive error',
          error,
        );
      }
    },
  };

  const { mutate, isLoading } = useRequest(apiOtp, funcRequestRegisterStaff);
  const { mutate: mutateResend } = useRequest(apiResendOtp, funcRequestResendRegisterStaff);

  const handleSubmitSendOTPRegisterStaff = (dataItem: string) => {
    try {
      const payload = {
        code: dataItem,
        otpKey: resend ? resend.otpKey : responseSuccess.responseSuccessRegisterOTP.otpKey,
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('SendOTPStaffComponent execute handleSubmit receive error', error);
    }
  };
  const handleResendSendOTPRegisterStaff = () => {
    try {
      const payload = {
        otpKey: responseSuccess.responseSuccessRegisterOTP.otpKey,
      };
      mutateResend(payload);
    } catch (error: any) {
      LoggerService.error('SendOTPStaffComponent execute handleResend receive error', error);
    }
  };
  return (
    <View
      phoneNumber={responseSuccess?.responseSuccessRegisterOTP?.contact}
      handleResendSendOTPRegisterStaff={handleResendSendOTPRegisterStaff}
      handleSubmitSendOTPRegisterStaff={handleSubmitSendOTPRegisterStaff}
      loading={isLoading}
      handleBack={handleBack}
    />
  );
};

export default SendOTPStaffComponent;
