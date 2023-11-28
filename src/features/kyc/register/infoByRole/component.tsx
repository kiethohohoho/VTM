import { type FunctionComponent, useEffect, useState } from 'react';

import { LoggerService } from '@/utils/Logger';

import { SELECT_ROLE, VIEW_REGISTER } from '../type';
import View from './view';

interface ComponentInfoByRoleProps {
  handleBack: (step: VIEW_REGISTER) => void;
  handleGetResponseSuccess: any;
  responseSuccess: any;
  loading?: boolean;
}

const ComponentInfoByRole: FunctionComponent<ComponentInfoByRoleProps> = ({
  handleBack,
  handleGetResponseSuccess,
  responseSuccess,
  loading,
}) => {
  const [selectAccount, setSelectAccount] = useState<SELECT_ROLE>(SELECT_ROLE.RETAILER);

  useEffect(() => {
    if (responseSuccess.selectRole) {
      setSelectAccount(responseSuccess.selectRole);
    }
  }, [responseSuccess]);
  const handleSubmit = (dataItem: any) => {
    try {
      handleGetResponseSuccess({
        data: selectAccount === SELECT_ROLE.RETAILER ? { retailer: dataItem } : { brand: dataItem },
        view: VIEW_REGISTER.INFO_BY_ROLE,
      });
    } catch (error: any) {
      LoggerService.error('ComponentInfoByRole execute handleGetResponseSuccess receive error', error);
    }
  };
  return (
    <View
      loading={loading}
      responseSuccess={responseSuccess}
      selectAccount={selectAccount}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
    />
  );
};

export default ComponentInfoByRole;
