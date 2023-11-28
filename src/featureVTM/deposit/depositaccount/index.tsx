import { type IApiRequest } from '@/api/api.interface';
import AuthService from '@/utils/Auth';

import { type IIndexOfViewDepositVTM } from '../type';
import DepositInfoComponent from './component';

const IndexDepositAccount = ({ handleGetResponseSuccess, responseSuccess }: IIndexOfViewDepositVTM) => {
  const auth = AuthService.getPackageAuth();
  const apiGetAccount: IApiRequest = {
    method: 'get',
    url: 'https://api-vtm.intelin.vn/vtm/account',
    headers: {
      'Content-Type': 'application/json',
      'device-id': auth?.deviceID,
      token: auth?.token,
      checking: 'a',
    },
  };

  return (
    <DepositInfoComponent
      apiGetAccount={apiGetAccount}
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
    />
  );
};

export default IndexDepositAccount;
