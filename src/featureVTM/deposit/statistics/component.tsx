import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import { LoggerService } from '@/utils/Logger';

import { VIEW_DEPOSIT_VTM } from '../type';
import StatisticsView from './view';
interface StatisticsComponentProps {
  handleGetResponseSuccess: any;
  responseSuccess: any;
  apiDeposit: IApiRequest;
}

const StatisticsComponent = ({ apiDeposit, handleGetResponseSuccess, responseSuccess }: StatisticsComponentProps) => {
  const funcRequestWithDraw = {
    handleRequestSuccess: (data: any) => {
      try {
        console.log('vao');
        handleGetResponseSuccess({ data, view: VIEW_DEPOSIT_VTM.DEPOSIT_RESULT });
        LoggerService.debug('WithdrawView execute handleRequestSuccess receive list', data);
      } catch (error: any) {
        LoggerService.error('WithdrawView execute handleRequestSuccess receive error', error);
      }
    },
  };
  const handleSubmit = () => {
    const payload = {
      creditAccount: responseSuccess?.responseWaitMoney,
      amount: 1000000,
    };
    mutate(payload);
  };
  const { mutate } = useRequest(apiDeposit, funcRequestWithDraw);

  return (
    <StatisticsView
      handleSubmit={handleSubmit}
      handleGetResponseSuccess={handleGetResponseSuccess}
    />
  );
};

export default StatisticsComponent;
