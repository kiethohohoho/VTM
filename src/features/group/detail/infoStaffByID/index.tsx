import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import DetailStoreComponent from './component';

const config = new Config().getState();

const Index = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'get',
    url: config.api.lsUser.staff.groupStaff,
    headers: {
      token: auth?.token,
    },
  };
  return <DetailStoreComponent api={api} />;
};
export default Index;
