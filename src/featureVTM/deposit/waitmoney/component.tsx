import { useEffect } from 'react';

import { VIEW_DEPOSIT_VTM } from '../type';
import WaitMoneyView from './view';

interface DepositComponentProps {
  handleGetResponseSuccess: any;
  responseSuccess: any;
}

const WaitMoneyComponent = ({ handleGetResponseSuccess, responseSuccess }: DepositComponentProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetResponseSuccess({ view: VIEW_DEPOSIT_VTM.DEPOSIT_STATISTICS });
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <WaitMoneyView
      responseSuccess={responseSuccess}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};

export default WaitMoneyComponent;
