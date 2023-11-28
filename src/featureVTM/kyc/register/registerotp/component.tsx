import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { type IResponseRegisterOTPStaff } from '@/featureV2/staff/invite/registerStaff/register.interface';
import { LoggerService } from '@/utils/Logger';

import { VIEW_REGISTER_VTM } from '../type';
import RegisterOTPView from './view';
interface RegisterOTPComponentProps {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  apiHandleOTP: IApiRequest;
  apiResendOtp: IApiRequest;
}

const RegisterOTPComponent = ({
  handleGetResponseSuccess,
  responseSuccess,
  apiHandleOTP,
  apiResendOtp,
}: RegisterOTPComponentProps) => {
  const funcRequestOTP = {
    handleOTPSuccess: (data: any) => {
      try {
        handleGetResponseSuccess({ data, view: VIEW_REGISTER_VTM.REGISTER_ACCOUNT });
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
        code: data?.code,
        ref: responseSuccess?.responseInfor?.data?.ref || responseSuccess?.responseInfor?.ref,
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('License execute handleGetResponseSuccess receive error', error);
    }
  };

  const handleResentOTP = () => {
    try {
      const payload = {
        ref: responseSuccess?.responseInfor?.ref || responseSuccess?.responseInfor?.data?.ref,
      };
      mutateResend(payload);
    } catch (error: any) {
      LoggerService.error('SendOTP Component execute handleResend receive error', error);
    }
  };

  const { mutate: mutateResend } = useRequest(apiResendOtp, funcRequestResendRegister);
  const { mutate } = useRequest(apiHandleOTP, funcRequestOTP);
  return (
    <RegisterOTPView
      handleResentOTP={handleResentOTP}
      handleSubmit={handleSubmit}
      responseSuccess={responseSuccess}
    />
  );
};

export default RegisterOTPComponent;
