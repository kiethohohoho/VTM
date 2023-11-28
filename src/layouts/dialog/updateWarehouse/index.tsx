import { type IApiRequest } from '@/api/api.interface';
import Config from '@/Config';
import AuthService from '@/utils/Auth';

import DialogUpdateWarehouse from './component';

const config = new Config().getState();

const IndexUpdateWarehouse = () => {
  const auth = AuthService.getPackageAuth();

  const api: IApiRequest = {
    method: 'put',
    url: config.api.lsUser.warehouse._,
    headers: {
      token: auth?.token,
    },
  };
  const apiListStore: IApiRequest = {
    method: 'delete',
    url: config.api.lsUser.store,
    headers: {
      token: auth?.token,
    },
  };
  return (
    <DialogUpdateWarehouse
      api={api}
      apiListStore={apiListStore}
    />
  );
};
export default IndexUpdateWarehouse;
