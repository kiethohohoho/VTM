import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { EnumPath } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import {
  newForgotPassword,
  requestForgotEmailPassword,
  requestForgotPassword,
  reSendOtpForgotPassword,
  submitOtpForgotPassword,
} from '.';
import {
  type ForgotPasswordProps,
  type ForgotPasswordState,
  type INewPasswordPayload,
  type IRequestForgotPassword,
  type IReSendOtpPayload,
  type IResponseForgotPhone,
  type ISubmitOtpPayload,
} from './types';
import View from './view';

export enum VIEW_FORGOT_PASSWORD {
  REQUEST,
  PHONE_SUCCESS,
  EMAIL_SUCCESS,
  EMAIL_ERROR,
  PHONE_ERROR,
  NEW_PASSWORD,
}
const ForgotPasswordComponent: FC<ForgotPasswordProps> = () => {
  const [state, setState] = useState<ForgotPasswordState>({ view: VIEW_FORGOT_PASSWORD.REQUEST });
  const [data, setData] = useState<IResponseForgotPhone | object>({});
  const [otpKey, setOtpKey] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const requestForgotMailCallback = {
    handleRequestSuccess: (data: IRequestForgotPassword) => {
      try {
        onStateSuccess(VIEW_FORGOT_PASSWORD.EMAIL_SUCCESS);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('requestForgotMailCallback execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        onStateError(VIEW_FORGOT_PASSWORD.EMAIL_ERROR);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('requestForgotMailCallback execute handleRequestError receive error', error);
      }
    },
    handleRequestOTPLimited: (data: IRequestForgotPassword) => {
      try {
        setLoading(false);
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'OTPlimited'} />);
      } catch (error: any) {
        LoggerService.error('requestForgotPhoneCallback execute handleRequestOtpLimited receive error', error);
      }
    },
  };

  const requestForgotPhoneCallback = {
    handleRequestSuccess: (data: IResponseForgotPhone) => {
      try {
        LoggerService.debug('requestForgotPhoneCallback execute handleRequestSuccess receive data', data);
        setData(data);
        setLoading(false);
        setOtpKey(data?.otpKey);
        onStateSuccess(VIEW_FORGOT_PASSWORD.PHONE_SUCCESS);
      } catch (error: any) {
        LoggerService.error('requestForgotPhoneCallback execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        LoggerService.info('requestForgotPhoneCallback execute handleRequestError');
        setLoading(false);
        onStateError(VIEW_FORGOT_PASSWORD.PHONE_SUCCESS);
      } catch (error: any) {
        LoggerService.error('requestForgotPhoneCallback execute handleRequestError receive error', error);
      }
    },
    handleRequestOTPLimited: () => {
      try {
        LoggerService.debug('requestForgotPhoneCallback execute handleRequestOTPLimited receive data', data);
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'OTPlimited'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('requestForgotPhoneCallback execute handleRequestOTPLimited receive error', error);
      }
    },
  };

  const resendOtpCallback = {
    handleRequestSuccess: (data: IResponseForgotPhone) => {
      try {
        LoggerService.debug('resendOtpCallback execute handleRequestSuccess receive data', data);
        setData(data);
        setLoading(false);
        setOtpKey(data?.otpKey);
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid={'otp.reSendSuccess'} />);
      } catch (error: any) {
        LoggerService.error('resendOtpCallback execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        setLoading(false);
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'resendOtpFail'} />);
      } catch (error: any) {
        LoggerService.error('resendOtpCallback execute handleRequestError receive error', error);
      }
    },
    handleRequestOTPLimited: () => {
      try {
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'OTPlimited'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('resendOtpCallback execute handleRequestOtpLimited receive error', error);
      }
    },
  };

  const submitOtpCallback = {
    handleRequestSuccess: (data: any) => {
      try {
        LoggerService.debug('submitOtpCallback execute funcPhoneRequest receive data', data);
        setToken(data.token);
        setLoading(false);
        onStateSuccess(VIEW_FORGOT_PASSWORD.NEW_PASSWORD);
      } catch (error: any) {
        LoggerService.error('submitOtpCallback execute funcPhoneRequest receive error', error);
      }
    },
    handleRequestError: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.forgotNotPhone'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('submitOtpCallback execute handleRequestError receive error', error);
      }
    },
    handleRequestOTPLimited: (data: IRequestForgotPassword) => {
      try {
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'OTPLimited'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('requestForgotPhoneCallback execute handleRequestOtpLimited receive error', error);
      }
    },
    handleRequestOTPExpired: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPExpired'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('submitOtpCallback execute handleRequestOTPExpired receive error', error);
      }
    },
    handleRequestOTPNotMatch: () => {
      try {
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPNotMatch'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('submitOtpCallback execute handleRequestOTPNotMatch receive error', error);
      }
    },
    handleRequestOTPWrongManyTime: () => {
      try {
        LoggerService.debug('requestForgotPhoneCallback execute handleRequestOTPWrongManyTime receive data', data);

        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'OTPWrongManyTime'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('submitOtpCallback execute handleRequestOTPWrongManyTime receive error', error);
      }
    },
  };

  const submitNewPassCallBack = {
    handleRequestSuccess: (data: IRequestForgotPassword) => {
      try {
        LoggerService.debug('submitNewPassCallBack execute submitNewPassCallBack receive data', data);
        handleNavigate(EnumPath.HOME);
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid={'account.forgotNewPasswordSuccess'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('submitNewPassCallBack execute submitNewPassCallBack receive error', error);
      }
    },
    handleRequestError: (data: IRequestForgotPassword) => {
      try {
        LoggerService.info('submitNewPassCallBack execute handleRequestError');
        LoggerService.debug('submitNewPassCallBack execute handleRequestError receive data', data);
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'system.error'} />);
        setLoading(false);
      } catch (error: any) {
        LoggerService.error('submitNewPassCallBack execute handleRequestError receive error', error);
      }
    },
  };

  const onStateSuccess = (type: number) => {
    switch (type) {
      case VIEW_FORGOT_PASSWORD.EMAIL_SUCCESS:
        state.view = VIEW_FORGOT_PASSWORD.EMAIL_SUCCESS;
        break;
      case VIEW_FORGOT_PASSWORD.PHONE_SUCCESS:
        state.view = VIEW_FORGOT_PASSWORD.PHONE_SUCCESS;
        break;
      case VIEW_FORGOT_PASSWORD.NEW_PASSWORD:
        state.view = VIEW_FORGOT_PASSWORD.NEW_PASSWORD;
        break;
    }
    setState({ ...state });
  };

  const onStateError = (type: number) => {
    switch (type) {
      case VIEW_FORGOT_PASSWORD.EMAIL_ERROR:
        state.view = VIEW_FORGOT_PASSWORD.EMAIL_ERROR;
        break;
      case VIEW_FORGOT_PASSWORD.PHONE_ERROR:
        state.view = VIEW_FORGOT_PASSWORD.PHONE_ERROR;
        break;
    }
    setState({ ...state });
  };

  const { mutate: muteEmail } = useRequest(requestForgotEmailPassword, requestForgotMailCallback);
  const { mutate: mutatePhone } = useRequest(requestForgotPassword, requestForgotPhoneCallback);
  const { mutate: mutateSubmitOtp } = useRequest(submitOtpForgotPassword, submitOtpCallback);
  const { mutate: mutateReSendOtp } = useRequest(reSendOtpForgotPassword, resendOtpCallback);
  const { mutate: mutateSubmitNewPassword } = useRequest(newForgotPassword, submitNewPassCallBack);

  const handleSubmit = (dataItem: any) => {
    let payload: object = {};
    switch (true) {
      case Helper.isEmail(dataItem?.phoneEmail):
        payload = {
          email: dataItem?.phoneEmail,
        };
        setLoading(true);
        muteEmail(payload);
        break;

      case Helper.isPhone(dataItem?.phoneEmail):
        payload = {
          phone: dataItem?.phoneEmail,
        };
        setPhone(dataItem?.phoneEmail);
        setLoading(true);
        mutatePhone(payload);
        break;

      default:
        toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'account.forgotWrongInput'} />);
        //  Clear data to from input
        break;
    }
  };

  const handleSubmitOtp = (code: string) => {
    const payload: ISubmitOtpPayload = {
      otpKey,
      code,
    };
    setLoading(true);
    mutateSubmitOtp(payload);
  };

  const handleReSendOtp = () => {
    const payload: IReSendOtpPayload = {
      otpKey,
    };
    mutateReSendOtp(payload);
  };

  const handleSubmitNewPassword = (dataItem: { password: string; confirmPassword: string }) => {
    if (!validatorPassword(dataItem?.password, dataItem?.confirmPassword)) {
      toastDefault(ENUMS_TOAST.WARNING, <Localize tid={'account.forgotValidPasswordFail'} />);
      return;
    }
    Helper.hashPassword(dataItem?.password).then(password => {
      const payload: INewPasswordPayload = {
        token,
        password,
      };
      setLoading(true);
      mutateSubmitNewPassword(payload);
    });
  };

  const validatorPassword = (newPassword: string, confirmPassword: string) => {
    return Helper.equalTwoString(newPassword, confirmPassword);
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const handleResetView = () => {
    state.view = VIEW_FORGOT_PASSWORD.REQUEST;
    setState({ ...state });
  };

  const handleBack = () => {
    state.view -= 1;
    setState({ ...state });
  };
  return (
    <View
      viewRequest={state.view}
      viewData={{ data, phone }}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSubmitOtp={handleSubmitOtp}
      handleResetView={handleResetView}
      handleReSendOtp={handleReSendOtp}
      handleSubmitNewPassword={handleSubmitNewPassword}
      handleNavigate={handleNavigate}
      handleBack={handleBack}
    />
  );
};

export default ForgotPasswordComponent;
