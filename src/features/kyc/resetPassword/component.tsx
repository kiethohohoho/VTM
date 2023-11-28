import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRequest } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { EnumPath } from '@/utils/Enums';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { newForgotPassword } from '../forgotPassword';
import { type IRequestForgotPassword } from '../forgotPassword/types';
import { type ResetPasswordProps, type ResetPasswordState } from './types';
import View from './view';

export enum VIEW_RESET_PASSWORD {
  REQUEST,
  SUCCESS,
  TOKEN_EXPIRED,
}

const ResetPasswordComponent: FC<ResetPasswordProps> = props => {
  const [state, setState] = useState<ResetPasswordState>({ token: null, view: null });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitNewPassCallBack = {
    handleRequestSuccess: (data: IRequestForgotPassword) => {
      try {
        LoggerService.debug('requestForgotPhoneCallback execute handleRequestSuccess receive data', data);
        handleNavigate(EnumPath.HOME);
        setLoading(false);
        toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid={'account.forgotNewPasswordSuccess'} />);
      } catch (error: any) {
        LoggerService.error('requestForgotPhoneCallback execute handleRequestSuccess receive error', error);
      }
    },
    handleRequestError: (data: IRequestForgotPassword) => {
      try {
        LoggerService.info('requestForgotPhoneCallback execute handleRequestFail');
        LoggerService.debug('requestForgotPhoneCallback execute handleRequestOtpLimited receive data', data);
        setLoading(false);
        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'system.error'} />);
      } catch (error: any) {
        LoggerService.error('requestForgotPhoneCallback execute handleRequestFail receive error', error);
      }
    },
  };

  const { mutate: mutateSubmitNewPassword } = useRequest(newForgotPassword, submitNewPassCallBack);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    LoggerService.debug('ResetPasswordComponent execute componentDidMount params', `${params}`);
    if (params.has('token')) {
      state.token = params.get('token');
      state.view = VIEW_RESET_PASSWORD.REQUEST;
      LoggerService.debug('ResetPasswordComponent execute componentDidMount token', `${state.token}`);
    } else {
      navigate(EnumPath.LOGIN);
    }
    setState({ ...state });
  }, []);

  const handleSubmit = (dataItem: any) => {
    const { token } = state;
    setLoading(true);
    Helper.hashPassword(dataItem.password).then(password => {
      const payload = {
        token,
        password,
      };
      mutateSubmitNewPassword(payload);
    });
  };
  const handleRedirectLogin = () => {
    navigate(EnumPath.LOGIN);
  };

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <View
      handleRedirectLogin={handleRedirectLogin}
      viewEnum={state.view}
      viewData={state.token}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default ResetPasswordComponent;
