import { useState } from 'react';

import { LoggerService } from '@/utils/Logger';

import { VIEW_DEPOSIT_VTM } from './type';
import DepositView from './view';

const DepositComponent = () => {
  const [view, setView] = useState<VIEW_DEPOSIT_VTM>(VIEW_DEPOSIT_VTM.DEPOSIT);
  const [responseSuccess, setResponseSuccess] = useState<any>({});

  const handleGetResponseSuccess = (response: any) => {
    try {
      LoggerService.debug('RegisterComponent execute handleGetResponse receive response', response);
      switch (response.view) {
        case VIEW_DEPOSIT_VTM.DEPOSIT:
          setView(VIEW_DEPOSIT_VTM.DEPOSIT);
          setResponseSuccess({ ...responseSuccess, responseDepositAccount: response?.data });
          break;
        case VIEW_DEPOSIT_VTM.DEPOSIT_WAIT:
          setView(VIEW_DEPOSIT_VTM.DEPOSIT_WAIT);
          setResponseSuccess({ ...responseSuccess, responseWaitMoney: response?.data });
          break;
        case VIEW_DEPOSIT_VTM.DEPOSIT_STATISTICS:
          setView(VIEW_DEPOSIT_VTM.DEPOSIT_STATISTICS);
          setResponseSuccess({ ...responseSuccess, responseStatistics: response?.data });
          break;
        case VIEW_DEPOSIT_VTM.DEPOSIT_RESULT:
          setView(VIEW_DEPOSIT_VTM.DEPOSIT_RESULT);
          setResponseSuccess({ ...responseSuccess, responseDepositResult: response?.data });
          break;
      }
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleGetResponseSuccess receive error', error);
    }
  };
  const handleBack = (step: VIEW_DEPOSIT_VTM) => {
    try {
      setView(step);
    } catch (error: any) {
      LoggerService.error('RegisterComponent execute handleBack receive error', error);
    }
  };
  return (
    <DepositView
      handleBack={handleBack}
      view={view}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
      loading={false}
    />
  );
};

export default DepositComponent;
