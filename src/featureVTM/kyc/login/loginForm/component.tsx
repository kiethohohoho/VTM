import { useLogin } from '@/api/api.middleware';
import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

import { VIEW_LOGIN } from '../login.interface';
import { apiLogin } from '.';
import View from './view';

interface LoginComponentProps {
  handleBack?: (step: VIEW_LOGIN) => void;
  handleGetResponseSuccess: any;
  responseSuccess: any;
  loading?: boolean;
}

const LoginComponent = ({ handleGetResponseSuccess, responseSuccess }: LoginComponentProps) => {
  const funcRequest = {
    handleRequestLoginSuccess: (data: any) => {
      try {
        LoggerService.debug('LoginComponent execute handleRequestSuccess receive data', data);
        handleGetResponseSuccess({
          data,
          view: VIEW_LOGIN.LOGINOTP,
        });
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
    handleUserNotApproved: () => {
      try {
        LoggerService.info('LoginComponent execute handleUserNotApproved in funcRequest');

        toastDefault(ENUMS_TOAST.ERROR, <Localize tid={'account.notApprove'} />);
      } catch (error: any) {
        LoggerService.error('LoginComponent execute handleRequestError receive error', error);
      }
    },
  };
  const { mutate, isLoading } = useLogin(apiLogin, funcRequest);
  const handleSubmit = (dataItem: any) => {
    Helper.hashPasswordMD5(dataItem?.password).then(password => {
      const payload = {
        username: dataItem?.username.toLowerCase(),
        password,
      };
      mutate(payload);
      console.log('payload', payload);
    });
    console.log('submit');
  };

  return (
    <View
      responseSuccess={responseSuccess}
      handleGetResponseSuccess={handleGetResponseSuccess}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginComponent;
