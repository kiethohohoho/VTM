import { type IApiRequest } from '@/api/api.interface';

import { type IIndexOfViewVTM } from '../type';
import RegisterAccountComponent from './component';

const IndexRegisterAccount = ({ handleGetResponseSuccess, responseSuccess }: IIndexOfViewVTM) => {
  const apiRegisterUpdate: IApiRequest = {
    method: 'put',
    url: `https://api-vtm.intelin.vn/public/register/update`,
    headers: {},
  };

  const apiRegisterUpdateHaveData: IApiRequest = {
    method: 'post',
    url: `https://api-vtm.intelin.vn/public/register/exist`,
    headers: {},
  };

  return (
    <RegisterAccountComponent
      handleGetResponseSuccess={handleGetResponseSuccess}
      responseSuccess={responseSuccess}
      apiRegisterUpdate={apiRegisterUpdate}
      apiRegisterUpdateHaveData={apiRegisterUpdateHaveData}
    />
  );
};

export default IndexRegisterAccount;
