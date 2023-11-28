import { type IApiRequest } from '@/api/api.interface';
import AuthService from '@/utils/Auth';

import { type IIndexOfViewDepositVTM } from '../type';
import StatisticsComponent from './component';
const IndexStatisticsComponent = ({ handleGetResponseSuccess, responseSuccess }: IIndexOfViewDepositVTM) => {
  const auth = AuthService.getPackageAuth();
  const apiDeposit: IApiRequest = {
    method: 'post',
    url: 'https://api-vtm.intelin.vn/vtm/topup',
    headers: {
      'Content-Type': 'application/json',
      'device-id': auth?.deviceID,
      token: auth?.token,
      checking: 'a',
    },
  };
  return (
    <StatisticsComponent
      apiDeposit={apiDeposit}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
    />
  );
};

export default IndexStatisticsComponent;
