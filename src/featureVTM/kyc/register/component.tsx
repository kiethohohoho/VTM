import { useState } from 'react';

// import { useNavigate } from 'react-router-dom';
import { LoggerService } from '@/utils/Logger';

import { VIEW_REGISTER_VTM } from './type';
import RegisterView from './view';

const RegisterComponent = () => {
  const [view, setView] = useState<VIEW_REGISTER_VTM>(VIEW_REGISTER_VTM.REGISTER);
  const [responseSuccess, setResponseSuccess] = useState<any>({});

  const handleGetResponseSuccess = (response: any) => {
    try {
      LoggerService.debug('RegisterComponent execute handleGetResponse receive response', response);
      switch (response.view) {
        case VIEW_REGISTER_VTM.INFO_ACCOUNT:
          setView(VIEW_REGISTER_VTM.INFO_ACCOUNT);
          setResponseSuccess({ ...responseSuccess, responseLicense: response?.data });
          break;
        case VIEW_REGISTER_VTM.REGISTER_OTP:
          setView(VIEW_REGISTER_VTM.REGISTER_OTP);
          setResponseSuccess({ ...responseSuccess, responseInfor: response?.data });
          break;
        case VIEW_REGISTER_VTM.REGISTER_ACCOUNT:
          setView(VIEW_REGISTER_VTM.REGISTER_ACCOUNT);
          setResponseSuccess({ ...responseSuccess, responseAccount: response.data });
          break;
        case VIEW_REGISTER_VTM.REGISTER_SUCCESS:
          setView(VIEW_REGISTER_VTM.REGISTER_SUCCESS);
          setResponseSuccess({ ...responseSuccess, responseUpdateSuccess: response.data });
          break;
        case VIEW_REGISTER_VTM.REGISTER:
          setView(VIEW_REGISTER_VTM.REGISTER);

          break;
      }
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleBack = (step: VIEW_REGISTER_VTM) => {
    try {
      setView(step);
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleBack receive error', error);
    }
  };
  return (
    <RegisterView
      handleBack={handleBack}
      view={view}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
      loading={false}
    />
  );
};

export default RegisterComponent;
