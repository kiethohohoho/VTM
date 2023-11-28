import { type FC, useEffect, useState } from 'react';

import { STATUS_YES_NO } from '@/utils/Enums';

import {
  type IFormValueRegisterInformationComponent,
  type IRegisterInformationComponent,
  VIEW_REGISTER,
} from '../type';
import View from './view';
const RegisterInformationComponent: FC<IRegisterInformationComponent> = ({
  handleGetResponseSuccess,
  responseSuccess,
  handleBackRegisterOTP,
  loading,
}) => {
  const [activateAccount, setActivateAccount] = useState<STATUS_YES_NO>(0);
  useEffect(() => {
    if (responseSuccess.responseSuccessSendOTP) {
      setActivateAccount(responseSuccess.responseSuccessSendOTP.activateAccount);
    }
  }, [responseSuccess]);

  const handleSubmit = (dataItem: IFormValueRegisterInformationComponent) => {
    if (activateAccount === STATUS_YES_NO.NO) {
      handleGetResponseSuccess({
        data: dataItem,
        view: VIEW_REGISTER.REGISTER,
      });
    } else {
      handleGetResponseSuccess({ data: dataItem, view: VIEW_REGISTER.REGISTER });
    }
  };

  return (
    <View
      loading={loading}
      activateAccount={activateAccount}
      handleSubmit={handleSubmit}
      handleBackRegisterOTP={handleBackRegisterOTP}
    />
  );
};

export default RegisterInformationComponent;
