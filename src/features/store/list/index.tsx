import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import ListStoreComponent from './component';

const config = new Config().getState();

const IndexListStore = () => {
  const auth = AuthService.getPackageAuth();

  const list: IApiRequest = {
    method: 'delete',
    url: config.api.lsUser.store,
    headers: {
      token: auth?.token,
    },
  };
  return <ListStoreComponent api={list} />;
};
export default IndexListStore;
