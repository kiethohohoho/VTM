import { type FC, useState } from 'react';

import { Localize } from '@/context/languages';
import toastDefault, { ENUMS_TOAST } from '@/core2/toast';
import { LoggerService } from '@/utils/Logger';

import { VIEW_REGISTER_STAFF } from './register.interface';
import View from './view';

const RegisterStaffComponent: FC = () => {
  const [view, setView] = useState<VIEW_REGISTER_STAFF>(VIEW_REGISTER_STAFF.REGISTER_OTP);
  const [responseSuccess, setResponseSuccess] = useState<any>({});

  const handleGetResponseSuccess = (response: any) => {
    try {
      LoggerService.debug('RegisterStaffComponent execute handleGetResponse receive response', response);

      switch (response.view) {
        case VIEW_REGISTER_STAFF.REGISTER_OTP:
          setView(VIEW_REGISTER_STAFF.SEND_OTP);
          setResponseSuccess({ responseSuccessRegisterOTP: response.data });

          break;
        case VIEW_REGISTER_STAFF.SEND_OTP:
          setView(VIEW_REGISTER_STAFF.REGISTER);
          setResponseSuccess({ ...responseSuccess, responseSuccessSendOTP: response.data });
          break;
        case VIEW_REGISTER_STAFF.REGISTER:
          toastDefault(ENUMS_TOAST.SUCCESS, <Localize tid={'account.registerSuccessfully'} />);
          setView(VIEW_REGISTER_STAFF.SUCCESS);

          break;
        default:
          break;
      }
    } catch (error: any) {
      LoggerService.error('RegisterStaffComponent execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleBack = (step: VIEW_REGISTER_STAFF) => {
    try {
      setView(step);
    } catch (error: any) {
      LoggerService.error('RegisterStaffComponent execute handleBack receive error', error);
    }
  };
  return (
    <View
      handleBack={handleBack}
      handleGetResponseSuccess={handleGetResponseSuccess}
      view={view}
      responseSuccess={responseSuccess}
    />
  );
};

export default RegisterStaffComponent;
