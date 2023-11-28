import { useLocation, useNavigate } from 'react-router-dom';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { type IResponseRegisterOTPStaff } from '@/featureV2/staff/invite/registerStaff/register.interface';
import AuthService from '@/utils/Auth';
import { EnumPathVTM } from '@/utils/Enums';
import { LoggerService } from '@/utils/Logger';

import { type VIEW_LOGIN } from '../login.interface';
import LoginOTPView from './view';
interface LoginOTPComponentProps {
  handleGetResponseSuccess?: any;
  responseSuccess?: any;
  apiLoginOTP: IApiRequest;
  apiResendOTP: IApiRequest;
  handleBack: (step: VIEW_LOGIN) => void;
}

const LoginOTPComponent = ({
  handleGetResponseSuccess,
  responseSuccess,
  apiLoginOTP,
  apiResendOTP,
  handleBack,
}: LoginOTPComponentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initiateOTPVerification = (currentRoute: any) => {
    // const fromPath = location.state?.from || '/';
    const redirectParam = currentRoute;
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    navigate(`${redirectParam}`);
    // navigate(encodeURIComponent(currentRoute));
  };
  const funcRequestOTP = {
    handleOTPSuccess: (data: any) => {
      try {
        const dataTest = {
          deviceID: responseSuccess?.responseOTP?.auth?.deviceID,
          token: responseSuccess?.responseOTP?.auth?.token,
          expireAt: Date.now() + 3600000,
          refreshAt: 2013,
          profileDetails: {
            cusName: 'string',
            status: 1,
            role: 1,
          },
        };
        AuthService.setPackageAuth(dataTest, dataTest.expireAt);
        AuthService.setPackageProfile(dataTest.profileDetails, dataTest.expireAt);
        handleGetResponseSuccess({
          data: { data },
        });
        const searchParams = new URLSearchParams(location?.search);
        console.log('searchParams', searchParams);
        const redirectDestination = searchParams.get('redirect');
        console.log('redirectDestination', redirectDestination);
        // const decodedDestination = decodeURIComponent(redirectDestination || '');
        // initiateOTPVerification(decodeURIComponent(`${redirectDestination}`));
        initiateOTPVerification(`${redirectDestination}`);
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
    handleExpireTokenLogout: () => {
      try {
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid={'logout.success'} />);
        AuthService.handleLogout();
        navigate(EnumPathVTM.LOGIN);
      } catch (error: any) {
        LoggerService.error('ListComponent execute handleRequestError receive error', error);
      }
    },
  };

  const funcRequestResendLogin = {
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
        codeOTP: data?.code,
        ref: responseSuccess?.responseOTP?.data?.otp?.ref || responseSuccess?.responseOTP?.otp?.ref,
      };
      mutate(payload);
    } catch (error: any) {
      LoggerService.error('License execute handleGetResponseSuccess receive error', error);
    }
  };
  console.log(responseSuccess?.responseOTP?.otp?.ref);
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

  const { mutate: mutateResend } = useRequest(apiResendOTP, funcRequestResendLogin);
  const { mutate, isLoading } = useRequest(apiLoginOTP, funcRequestOTP);
  return (
    <LoginOTPView
      handleResentOTP={handleResentOTP}
      handleSubmit={handleSubmit}
      handleBack={handleBack}
      responseSuccess={responseSuccess}
      isLoading={isLoading}
    />
  );
};

export default LoginOTPComponent;
