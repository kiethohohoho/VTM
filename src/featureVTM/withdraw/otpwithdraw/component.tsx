import { useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { type IResponseRegisterOTPStaff } from '@/featureV2/staff/invite/registerStaff/register.interface';
import { EnumPathVTM } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import { type VIEW_WITHDRAW_VTM } from '../type';
import OTPView from './view';

interface WithdrawOTPComponentProps {
  handleBack?: (step: VIEW_WITHDRAW_VTM) => void;
  responseSuccess: any;
  loading?: boolean;
  apiHandleOTP: IApiRequest;
  apiResendOtp: IApiRequest;
}

const OTPComponent = ({ responseSuccess, apiHandleOTP, apiResendOtp }: WithdrawOTPComponentProps) => {
  const navigate = useNavigate();
  const funcRequestOTP = {
    handleOTPSuccess: (data: any) => {
      try {
        navigate(EnumPathVTM.WITHDRAWRESULT);
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

  const funcRequestResendRegister = {
    handleResentSuccess: (data: IResponseRegisterOTPStaff) => {
      try {
        console.log('resent success');
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

  const handleSubmit = (data: any) => {
    try {
      const payload = {
        codeOTP: data?.codeOTP.toString(),
        ref: responseSuccess?.responseOTP?.otp?.ref,
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('License execute handleGetResponseSuccess receive error', error);
    }
  };
  console.log('qqq', responseSuccess);
  const handleResentOTP = () => {
    try {
      const payload = {
        ref: responseSuccess?.responseOTP?.otp?.ref,
      };
      mutateResend(payload);
    } catch (error: any) {
      LoggerService.error('SendOTP Component execute handleResend receive error', error);
    }
  };

  const { mutate: mutateResend } = useRequest(apiResendOtp, funcRequestResendRegister);
  const { mutate, isLoading } = useRequest(apiHandleOTP, funcRequestOTP);
  return (
    <OTPView
      handleSubmit={handleSubmit}
      handleResentOTP={handleResentOTP}
      isLoading={isLoading}
    />
  );
};

export default OTPComponent;
