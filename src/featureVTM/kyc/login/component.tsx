import { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
import { LoggerService } from '@/utils/Logger';

import { VIEW_LOGIN } from './login.interface';
import ViewLogin from './view';

const LoginComponent = () => {
  const [view, setView] = useState<VIEW_LOGIN>(VIEW_LOGIN.LOGIN);
  const [responseSuccess, setResponseSuccess] = useState<any>({});

  const handleGetResponseSuccess = (response: any) => {
    try {
      LoggerService.debug('RegisterComponent execute handleGetResponse receive response', response);
      switch (response.view) {
        case VIEW_LOGIN.LOGIN:
          setView(VIEW_LOGIN.LOGIN);
          setResponseSuccess({ ...responseSuccess, responseLogin: response?.data });
          break;
        case VIEW_LOGIN.LOGINOTP:
          setView(VIEW_LOGIN.LOGINOTP);
          setResponseSuccess({ ...responseSuccess, responseOTP: response?.data });
          break;
      }
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleBack = (step: VIEW_LOGIN) => {
    try {
      setView(step);
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleBack receive error', error);
    }
  };
  return (
    <ViewLogin
      handleBack={handleBack}
      view={view}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
      // loading={false}
    />
  );
};

export default LoginComponent;
