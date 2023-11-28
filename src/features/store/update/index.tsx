import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import DetailStoreComponent from './component';
const Index = () => {
  const config = new Config().getState();
  const auth = AuthService.getPackageAuth();

  const apiDetail: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.store,
    headers: {
      token: auth?.token,
    },
  };

  const apiUpdate: IApiRequest = {
    method: 'put',
    url: config.api.lsUser.store,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <DetailStoreComponent
      apiDetail={apiDetail}
      apiUpdate={apiUpdate}
    />
  );
};
export default Index;
